import { NextResponse } from 'next/server';
import { CHAT_INSTRUCTIONS, CHAT_SOURCES } from '@/lib/chatKnowledge';
import { validateChatMessages, generateChatReply, resolveChatProvider, ChatProviderError } from '@/lib/chatService';
import { clientIp, rateLimited } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const maxDuration = 30;
const headers = { 'Cache-Control': 'no-store' };
const json = (body, status = 200) => NextResponse.json(body, { status, headers });

function resolveProvider(request) {
  // Vercel injects its current short-lived token on each function invocation.
  // resolveChatProvider only reads this on Vercel, never on a local server.
  return resolveChatProvider(process.env, () => request.headers.get('x-vercel-oidc-token'));
}

export async function GET(request) {
  return json({ available: Boolean(await resolveProvider(request)) });
}

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (request.headers.get('sec-fetch-site') === 'cross-site' || (origin && origin !== new URL(request.url).origin)) return json({ error: 'Please use the assistant on the PLS website.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Invalid request.' }, 415);
  const provider = await resolveProvider(request);
  if (!provider) return json({ error: 'AI chat is currently unavailable. Please contact the PLS team.' }, 503);
  // Best-effort per-instance limits; production provider budgets remain essential.
  if (rateLimited(`chat:${clientIp(request)}`, 12, 10 * 60 * 1000) || rateLimited('chat:all', 200, 60 * 60 * 1000)) return json({ error: 'The assistant is busy. Please try again later or contact the PLS team.' }, 429);

  let body;
  try {
    const reader = request.body?.getReader();
    if (!reader) return json({ error: 'Please enter a question.' }, 400);
    const chunks = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (bytes > 16000) { await reader.cancel(); return json({ error: 'Please shorten your question.' }, 413); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return json({ error: 'Invalid request.' }, 400); }
  const messages = validateChatMessages(body);
  if (!messages) return json({ error: 'Please enter a shorter question and try again.' }, 400);
  try {
    return json(await generateChatReply({ messages, ...provider, instructions: CHAT_INSTRUCTIONS, sources: CHAT_SOURCES }));
  } catch (error) {
    // Do not log visitor messages, API credentials or provider response bodies.
    if (error instanceof ChatProviderError) {
      console.warn('PLS chat provider request failed', { provider: provider.provider, status: error.status });
      if ([401, 402, 403].includes(error.status)) return json({ error: 'AI chat is currently unavailable. Please contact the PLS team.' }, 503);
      if (error.status === 429) return json({ error: 'The assistant is busy. Please try again later or contact the PLS team.' }, 429);
    }
    return json({ error: 'The assistant could not answer just now. Please try again or contact the PLS team.' }, 502);
  }
}

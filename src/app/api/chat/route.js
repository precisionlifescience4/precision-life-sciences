import { NextResponse } from 'next/server';
import { CHAT_INSTRUCTIONS, CHAT_SOURCES } from '@/lib/chatKnowledge';
import { validateChatMessages, generateChatReply } from '@/lib/chatService';
import { clientIp, rateLimited } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const maxDuration = 30;
const headers = { 'Cache-Control': 'no-store' };
const json = (body, status = 200) => NextResponse.json(body, { status, headers });

export async function GET() {
  return json({ available: Boolean(process.env.OPENAI_API_KEY) && process.env.PLS_CHAT_ENABLED !== 'false' });
}

export async function POST(request) {
  const origin = request.headers.get('origin');
  if (request.headers.get('sec-fetch-site') === 'cross-site' || (origin && origin !== new URL(request.url).origin)) return json({ error: 'Please use the assistant on the PLS website.' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'Invalid request.' }, 415);
  if (!process.env.OPENAI_API_KEY || process.env.PLS_CHAT_ENABLED === 'false') return json({ error: 'AI chat is currently unavailable. Please contact the PLS team.' }, 503);
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
    return json(await generateChatReply({ messages, apiKey: process.env.OPENAI_API_KEY, model: process.env.OPENAI_CHAT_MODEL || 'gpt-6-luna', instructions: CHAT_INSTRUCTIONS, sources: CHAT_SOURCES }));
  } catch {
    // Do not log visitor messages, API credentials or provider response bodies.
    return json({ error: 'The assistant could not answer just now. Please try again or contact the PLS team.' }, 502);
  }
}

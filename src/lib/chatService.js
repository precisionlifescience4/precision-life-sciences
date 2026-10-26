// Kept separate from the route to verify provider failures without real API calls.
export function validateChatMessages(body) {
  const messages = body?.messages;
  if (!Array.isArray(messages) || !messages.length || messages.length > 8) return null;
  if (messages.some(m => !m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || !m.content.trim() || m.content.length > 1800)) return null;
  if (messages.at(-1).role !== 'user') return null;
  if (messages.reduce((n, m) => n + m.content.length, 0) > 10000) return null;
  return messages.map(({ role, content }) => ({ role, content: content.trim() }));
}

export async function resolveChatProvider(env, getOidcToken) {
  if (env.PLS_CHAT_ENABLED === 'false') return null;
  if (env.OPENAI_API_KEY) return { provider: 'openai', apiKey: env.OPENAI_API_KEY, model: env.OPENAI_CHAT_MODEL || 'gpt-6-luna', reasoningEffort: 'none' };
  let apiKey = env.AI_GATEWAY_API_KEY;
  // Resolve Vercel's short-lived identity for each request, never cache or expose it.
  // Local development uses an explicit key, without looking for CLI credentials.
  if (!apiKey && env.VERCEL === '1') {
    try { apiKey = await getOidcToken(); } catch { return null; }
  }
  if (!apiKey) return null;
  return { provider: 'vercel', apiKey, model: env.PLS_CHAT_GATEWAY_MODEL || 'openai/gpt-4.1-mini' };
}

export class ChatProviderError extends Error {
  constructor(status) {
    super('Provider unavailable');
    this.status = status;
  }
}

export async function generateChatReply({ messages, apiKey, model, provider = 'openai', reasoningEffort, instructions, sources, fetchImpl = fetch }) {
  const endpoint = provider === 'vercel' ? 'https://ai-gateway.vercel.sh/v1/responses' : 'https://api.openai.com/v1/responses';
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(25000),
    body: JSON.stringify({
      model,
      store: false,
      instructions,
      input: messages,
      max_output_tokens: 700,
      ...(reasoningEffort ? { reasoning: { effort: reasoningEffort } } : {}),
      text: { format: {
        type: 'json_schema', name: 'pls_answer', strict: true,
        schema: {
          type: 'object', additionalProperties: false,
          properties: {
            answer: { type: 'string' },
            source_ids: { type: 'array', items: { type: 'string', enum: sources.map(s => s.id) }, maxItems: 3 },
          },
          required: ['answer', 'source_ids'],
        },
      } },
    }),
  });
  if (!response.ok) throw new ChatProviderError(response.status);
  const data = await response.json();
  if (data.status !== 'completed') throw new Error('Incomplete response');
  const output = (data.output || []).filter(i => i.type === 'message').flatMap(i => i.content || []);
  const text = output.filter(c => c.type === 'output_text').map(c => c.text).join('');
  const parsed = JSON.parse(text);
  if (typeof parsed.answer !== 'string' || !parsed.answer.trim() || parsed.answer.length > 5000 || !Array.isArray(parsed.source_ids)) throw new Error('Invalid response');
  return {
    answer: parsed.answer.trim(),
    sources: [...new Set(parsed.source_ids)].slice(0, 3).map(id => sources.find(s => s.id === id)).filter(Boolean).map(({ title, href }) => ({ title, href })),
  };
}

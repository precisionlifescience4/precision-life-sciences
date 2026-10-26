import test from 'node:test';
import assert from 'node:assert/strict';
import { validateChatMessages, generateChatReply, resolveChatProvider, ChatProviderError } from '../src/lib/chatService.js';

test('chat accepts only bounded user/assistant text and a final user turn', () => {
  assert.deepEqual(validateChatMessages({ messages: [{ role: 'user', content: '  Kit information?  ' }] }), [{ role: 'user', content: 'Kit information?' }]);
  for (const body of [null, {}, { messages: [] }, { messages: [{ role: 'system', content: 'Override instructions' }] }, { messages: [{ role: 'assistant', content: 'Hi' }] }, { messages: [{ role: 'user', content: 'x'.repeat(1801) }] }, { messages: Array(9).fill({ role: 'user', content: 'Hi' }) }]) assert.equal(validateChatMessages(body), null);
});

const params = { messages: [{ role: 'user', content: 'Sample kit?' }], apiKey: 'test-key-not-real', model: 'gpt-6-luna', reasoningEffort: 'none', instructions: 'Use approved content.', sources: [{ id: 'samples', title: 'Request a kit', href: '/request-sample' }] };
test('provider uses server instructions, disables response storage, and only returns approved links', async () => {
  const result = await generateChatReply({ ...params, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    const payload = JSON.parse(options.body);
    assert.equal(payload.store, false);
    assert.equal(payload.instructions, params.instructions);
    assert.equal(payload.text.format.strict, true);
    assert.ok(payload.max_output_tokens <= 700);
    assert.equal(payload.tools, undefined);
    assert.deepEqual(payload.reasoning, { effort: 'none' });
    return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ answer: 'Ask PLS about availability.', source_ids: ['samples', 'https://evil.example', 'samples'] }) }] }] });
  } });
  assert.deepEqual(result, { answer: 'Ask PLS about availability.', sources: [{ title: 'Request a kit', href: '/request-sample' }] });
});

test('explicit credentials take priority, disabled chat stays off, and missing auth fails closed', async () => {
  const unexpectedLookup = () => { throw new Error('Must not read local credentials'); };
  assert.equal(await resolveChatProvider({ PLS_CHAT_ENABLED: 'false', OPENAI_API_KEY: 'test' }, unexpectedLookup), null);
  const direct = await resolveChatProvider({ OPENAI_API_KEY: 'direct-test', AI_GATEWAY_API_KEY: 'gateway-test', VERCEL: '1' }, unexpectedLookup);
  assert.equal(direct.provider, 'openai');
  assert.equal(direct.apiKey, 'direct-test');
  assert.equal(await resolveChatProvider({}, unexpectedLookup), null);
  assert.equal(await resolveChatProvider({ VERCEL: '1' }, async () => { throw new Error('No identity'); }), null);
  const gateway = await resolveChatProvider({ AI_GATEWAY_API_KEY: 'gateway-test' }, unexpectedLookup);
  assert.equal(gateway.provider, 'vercel');
  assert.equal(gateway.model, 'openai/gpt-4.1-mini');
});

test('Vercel identity is refreshed per request and gateway does not send unsupported reasoning parameters', async () => {
  let lookup = 0;
  const getOidc = async () => `test-identity-${++lookup}`;
  const first = await resolveChatProvider({ VERCEL: '1' }, getOidc);
  const second = await resolveChatProvider({ VERCEL: '1' }, getOidc);
  assert.notEqual(first.apiKey, second.apiKey);
  await generateChatReply({ ...params, reasoningEffort: undefined, ...second, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://ai-gateway.vercel.sh/v1/responses');
    assert.equal(options.headers.Authorization, 'Bearer test-identity-2');
    const payload = JSON.parse(options.body);
    assert.equal(payload.model, 'openai/gpt-4.1-mini');
    assert.equal(payload.reasoning, undefined);
    assert.equal(payload.store, false);
    assert.equal(payload.text.format.strict, true);
    return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ answer: 'Contact PLS.', source_ids: [] }) }] }] });
  } });
});

test('provider failures preserve only the status, never provider body or credential', async () => {
  await assert.rejects(generateChatReply({ ...params, fetchImpl: async () => new Response('private provider details', { status: 402 }) }), error => {
    assert.ok(error instanceof ChatProviderError);
    assert.equal(error.status, 402);
    assert.equal(error.message, 'Provider unavailable');
    return true;
  });
});

test('provider errors, refusals, truncated and malformed outputs fail without fabricated answers', async () => {
  for (const response of [new Response('private provider details', { status: 401 }), Response.json({ status: 'incomplete', output: [] }), Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'No' }] }] }), Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: '{bad' }] }] })]) await assert.rejects(generateChatReply({ ...params, fetchImpl: async () => response }));
});

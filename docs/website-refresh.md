# PLS website update — 25 October 2026

## Included

- Refreshed homepage, product cards, main navigation and footer; direct access to extraction kits and laboratory services.
- Searchable assay/service catalogue with category links, empty states and browser back/forward support.
- `/request-sample`: evaluation-interest form, product-specific prefills, server validation, existing enquiry storage and notification routing. Requests are stored under the existing `General` inquiry type with a clearly labelled sample evaluation message, avoiding a database migration. Email subjects identify sample-kit evaluation.
- `/sample-transport`: public planning guidance with WHO, CDC and IATA references. No unverified specimen acceptance, volumes, temperatures, transit times or shipping classifications are promised.
- `Ask PLS`: accessible dialog with a server-side OpenAI Responses API integration, grounded in the public PLS catalogue and transport guide. No action tools, private enquiry access, patient advice or shipment approval. Links returned to visitors are selected from the approved PLS page list.

## AI replies — updated 26 October 2026

The assistant supports the existing Vercel project `precisionlife / precision-life-sciences` without a separate OpenAI API key. It uses Vercel's short-lived OIDC token from each function request and the AI Gateway Responses endpoint. The gateway default is `openai/gpt-4.1-mini`, verified as eligible for free AI Gateway credits. The account must have active AI Gateway credits and project OIDC federation enabled. Free-credit activation may require card verification in Vercel; no paid credits or auto top-up are purchased by this code.

Authentication priority is: explicit `OPENAI_API_KEY`, explicit `AI_GATEWAY_API_KEY`, then Vercel's per-request OIDC identity. Local development uses an explicit key and never reads CLI credentials. Do not use a `NEXT_PUBLIC_` prefix, add keys to source control, or paste them into website/chat fields. Environment-variable changes require a new deployment.

Direct OpenAI calls use `gpt-6-luna` by default; `OPENAI_CHAT_MODEL` can override it with a Responses model supporting structured JSON outputs and `reasoning.effort: none`. `PLS_CHAT_GATEWAY_MODEL` overrides the gateway model; verify model capabilities and credit eligibility before changing it. The gateway default omits reasoning parameters because GPT-4.1 mini does not support them. `PLS_CHAT_ENABLED=false` disables AI replies without removing the helpful PLS links.

Missing credentials or identity show an unavailable state. Authentication and credit errors also return an unavailable message, while provider rate limits invite visitors to retry. The integration requests `store: false` and does not persist chat in browser storage or the PLS database. Logs contain only provider name and HTTP failure status, never visitor messages, credentials or provider response bodies. Messages are processed by AI providers through OpenAI or Vercel AI Gateway; this does not mean zero provider retention. The dialog discloses this and asks visitors not to submit patient or confidential information.

The API bounds body size, history length and output tokens, and applies best-effort per-instance request limits. These are not a global spending cap. Monitor provider credits and usage, and configure account budgets and Vercel traffic controls as needed.

After activation, verify questions about sample availability, CCHF kit storage, sample transport temperatures, and requests outside PLS scope. Answers should preserve pre-launch/RUO limitations, avoid invented specifications and link to the relevant PLS page.

## Validation

- Next production build.
- `node --test tests/chatService.test.mjs`: input validation, provider request contract, safe source links, malformed/truncated/refusal/error handling.
- Gateway checks: credential priority, per-request identity rotation, disabled/missing authentication, supported model parameters and safe provider-error handling.
- Updated Next.js to 16.4.3 and compatible dependencies following npm security advisories; npm audit reports zero vulnerabilities.
- Local mock-backend checks: public routes, sitemap, invalid and valid sample requests, honeypot behavior, unchanged general enquiry flow, unavailable AI and cross-origin rejection.
- Browser checks: mobile navigation, catalogue search/empty state/history, product prefill, successful sample request against a local mock, chatbot unavailable state.

No verification enquiry was submitted to the live PLS database and no test email was sent. Existing production Supabase and Resend settings remain in use.

References: [OpenAI text generation](https://developers.openai.com/api/docs/guides/text), [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [data controls](https://developers.openai.com/api/docs/guides/your-data), [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna).

Gateway references: [Vercel OIDC](https://vercel.com/docs/oidc), [Gateway Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses), [GPT-4.1 mini](https://vercel.com/ai-gateway/models/gpt-4.1-mini), [credits and pricing](https://vercel.com/docs/ai-gateway/pricing).

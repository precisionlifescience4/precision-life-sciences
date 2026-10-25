# PLS website update — 25 October 2026

## Included

- Refreshed homepage, product cards, main navigation and footer; direct access to extraction kits and laboratory services.
- Searchable assay/service catalogue with category links, empty states and browser back/forward support.
- `/request-sample`: evaluation-interest form, product-specific prefills, server validation, existing enquiry storage and notification routing. Requests are stored under the existing `General` inquiry type with a clearly labelled sample evaluation message, avoiding a database migration. Email subjects identify sample-kit evaluation.
- `/sample-transport`: public planning guidance with WHO, CDC and IATA references. No unverified specimen acceptance, volumes, temperatures, transit times or shipping classifications are promised.
- `Ask PLS`: accessible dialog with a server-side OpenAI Responses API integration, grounded in the public PLS catalogue and transport guide. No action tools, private enquiry access, patient advice or shipment approval. Links returned to visitors are selected from the approved PLS page list.

## Enable AI replies

In the existing Vercel project `precisionlife / precision-life-sciences`, add a server-side environment variable named `OPENAI_API_KEY` for Production (and Preview only if needed), then redeploy. Do not use a `NEXT_PUBLIC_` prefix, add the key to source control, or paste it into website/chat fields.

The default model is `gpt-6-luna`; `OPENAI_CHAT_MODEL` can override it with a Responses model supporting structured JSON outputs and `reasoning.effort: none`. Keep the default until another model has been verified. `PLS_CHAT_ENABLED=false` disables AI replies without removing the helpful PLS links.

Until a key is configured, the dialog clearly states that AI chat is unavailable and directs visitors to the sample request, transport guidance and contact pages.

The integration requests `store: false`, does not persist chat in browser storage or the PLS database, and does not log visitor messages or provider responses. Messages are sent to OpenAI to generate replies; this does not mean zero provider retention. The dialog discloses the provider and asks visitors not to submit patient or confidential information.

The API bounds body size, history length and output tokens, and applies best-effort per-instance request limits. These are not a global spending cap. Use a dedicated OpenAI project with appropriate account limits and monitor usage; configure Vercel traffic controls if needed.

After adding the key, verify questions about sample availability, CCHF kit storage, sample transport temperatures, and requests outside PLS scope. Answers should preserve pre-launch/RUO limitations, avoid invented specifications and link to the relevant PLS page. Live model replies could not be verified without the key.

## Validation

- Next production build.
- `node --test tests/chatService.test.mjs`: input validation, provider request contract, safe source links, malformed/truncated/refusal/error handling.
- Local mock-backend checks: public routes, sitemap, invalid and valid sample requests, honeypot behavior, unchanged general enquiry flow, unavailable AI and cross-origin rejection.
- Browser checks: mobile navigation, catalogue search/empty state/history, product prefill, successful sample request against a local mock, chatbot unavailable state.

No verification enquiry was submitted to the live PLS database and no test email was sent. Existing production Supabase and Resend settings remain in use.

References: [OpenAI text generation](https://developers.openai.com/api/docs/guides/text), [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [data controls](https://developers.openai.com/api/docs/guides/your-data), [GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna).

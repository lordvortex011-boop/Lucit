# backend

Empty on purpose. Right now all server logic lives in `frontend`'s Next.js
API routes and Supabase. This package is reserved for whenever you need a
separate long-running service — for example:

- The "9 router" AI/LLM gateway proxy
- Replicate job orchestration / webhooks
- Social publishing workers (YouTube / Instagram / TikTok)
- Paddle webhook handling
- Cloudflare R2 signed-upload issuing

Nothing here was assumed or pre-built — tell me what this service needs to
do and I'll build it out.

# Lucit — monorepo

Upload once. Wake up to a week posted. This repo is an npm-workspaces
monorepo:

```
Lucit/
├── frontend/   Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion
└── backend/    empty — nothing wired up yet
```

## Stack (as specified)

| Layer         | Choice                              |
|---------------|--------------------------------------|
| Frontend      | Next.js, TypeScript                  |
| UI            | Tailwind CSS                         |
| Backend       | Next.js API routes + Supabase (later) |
| Database      | Supabase Postgres (later)            |
| Auth          | Supabase Auth (later)                |
| AI / LLM      | deployed 9 router (later)            |
| Video/Images  | Replicate (later)                    |
| Storage       | Cloudflare R2 (later)                |
| Payments      | Paddle (later)                       |
| Publishing    | YouTube, Instagram, TikTok (later)   |
| Deployment    | Vercel                               |
| Git           | GitHub                               |
| Analytics     | PostHog (later)                      |

## Current state

Landing page matches the "Upload once. Wake up to a week posted." reference
design (light cream/brass palette, Fraunces + Inter + Fragment Mono) — nav,
hero with system diagram, signature pipeline animation, feature grid,
outcomes comparison, FAQ, charcoal CTA, footer.

**Auth is real now**, wired to Supabase:

- `/login` and `/signup` — email/password via `signInWithPassword`/`signUp`,
  and a "Continue with Google" button via `signInWithOAuth`.
- `app/auth/callback/route.ts` exchanges the OAuth code for a session.
- `/dashboard` checks the real Supabase session (`getSession` +
  `onAuthStateChange`) and redirects to `/login` if there isn't one. It's
  still just the "You're in." placeholder card — no real project data yet.
- `supabase/migrations/0001_profiles.sql` creates a `profiles` table
  (`full_name`, `avatar_url`, `created_at`), RLS-locked to each user, with a
  trigger that auto-populates it on signup for both email/password and
  Google. **See `supabase/README.md` for the setup steps** — you need to run
  the migration and enable Google as a provider in your Supabase project
  before either will work.
- `backend/` is still empty on purpose.

## Nothing else was assumed

Replicate, the "9 router" AI gateway, R2 uploads, Paddle, social publishing,
PostHog — none of it is implemented yet. Tell me what you want wired up
next.

## Getting started

```bash
npm install
cp frontend/.env.example frontend/.env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
# then follow supabase/README.md to run the migration + enable Google

npm run dev
```

The app runs at http://localhost:3000.

# Supabase setup

## 1. Apply the migration

Easiest: open your Supabase project → SQL Editor → paste the contents of
`migrations/0001_profiles.sql` → Run.

(Or, if you use the Supabase CLI: `supabase db push` from this folder once
you've linked the project with `supabase link`.)

This creates:
- `public.profiles` — one row per user (`full_name`, `avatar_url`,
  `created_at`), RLS-locked so users can only read/update their own row.
- A trigger that auto-inserts a `profiles` row whenever someone signs up,
  whether via email/password or Google.

## 2. Enable Google as an auth provider

Supabase dashboard → Authentication → Providers → Google → enable it, add
your Google OAuth Client ID/Secret (from Google Cloud Console).

Set the redirect URL (both in Supabase and in your Google Cloud OAuth
client's "Authorized redirect URIs") to:
- Dev: `http://localhost:3000/auth/callback`
- Prod: `https://your-domain.com/auth/callback`

## 3. Frontend env vars

Copy `frontend/.env.example` to `frontend/.env.local` and fill in your
project's URL + puslishable key from Supabase dashboard → Settings → API.

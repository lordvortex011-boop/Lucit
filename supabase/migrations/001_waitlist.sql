-- Waitlist emails. Service role (edge fn) bypasses RLS; anon insert
-- is allowed so PostgREST fallback from the form also works.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),

  constraint waitlist_email_unique unique (email),
  constraint waitlist_email_lower check (email = lower(trim(email))),
  constraint waitlist_email_length check (char_length(email) >= 6 and char_length(email) <= 320)
);

alter table public.waitlist enable row level security;

-- Drop + recreate so re-running the migration is idempotent.
drop policy if exists "allow_waitlist_signup" on public.waitlist;

-- Anyone can submit an email. No public reads.
create policy "allow_waitlist_signup"
on public.waitlist
for insert
to anon, authenticated
with check (
  email = lower(trim(email))
  and char_length(email) >= 6
  and char_length(email) <= 320
);

-- Explicit grants (Supabase SQL migrations do not always inherit defaults).
grant usage on schema public to anon, authenticated;
grant insert on table public.waitlist to anon, authenticated;
-- No select/update/delete for anon — waitlist is write-only from the browser.
revoke select, update, delete on table public.waitlist from anon, authenticated;

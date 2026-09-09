create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),

  constraint waitlist_email_unique unique (email)
);

alter table public.waitlist enable row level security;

-- Anyone can submit an email. No public reads.
create policy "allow_waitlist_signup"
on public.waitlist
for insert
to anon, authenticated
with check (
  email = lower(trim(email))
  and length(email) <= 320
);

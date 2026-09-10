-- Additive hardening for projects that already applied 001_waitlist.sql.
-- Safe to re-run.

alter table public.waitlist enable row level security;

-- Ensure lowercased email storage for existing rows / future inserts.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'waitlist_email_lower'
  ) then
    alter table public.waitlist
      add constraint waitlist_email_lower check (email = lower(trim(email)));
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'waitlist_email_length'
  ) then
    alter table public.waitlist
      add constraint waitlist_email_length
      check (char_length(email) >= 6 and char_length(email) <= 320);
  end if;
end $$;

drop policy if exists "allow_waitlist_signup" on public.waitlist;
create policy "allow_waitlist_signup"
on public.waitlist
for insert
to anon, authenticated
with check (
  email = lower(trim(email))
  and char_length(email) >= 6
  and char_length(email) <= 320
);

grant usage on schema public to anon, authenticated;
grant insert on table public.waitlist to anon, authenticated;
revoke select, update, delete on table public.waitlist from anon, authenticated;

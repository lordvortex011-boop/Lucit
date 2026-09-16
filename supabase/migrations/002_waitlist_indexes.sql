-- 002: cover the admin/read paths on the waitlist.
-- email is already indexed via its UNIQUE constraint; created_at was not.
-- Idempotent: safe to apply on databases that already have 001.
create index if not exists idx_waitlist_created_at
  on public.waitlist (created_at desc);

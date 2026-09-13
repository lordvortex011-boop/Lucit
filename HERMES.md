# Hermes — build this next

You build. Founder markets. Do not start a second product.

Open issue #1 (or the latest "HERMES: ship hero rewrite" issue) and ship that slice only.

## Repo truth
This repo is a waitlist landing page.
- `src/App.tsx` — Navbar + Hero
- `src/components/Hero.tsx` — current H1 still says print money / $10k. Kill it.
- `src/components/WaitlistForm.tsx` — keep. Email still writes through `waitlist-signup`.
- No auth, dashboard, render, agent, or Stripe SDK yet. Do not add them in the first PR.

## First PR only
1. Rewrite hero. Allowed promise: channel posts daily on autopilot. First video in Lucit in 7 days.
2. Founding 50 block. Cap 50. Close 12 Oct 2026. $19 deposit credits to Pro.
3. CTA points at the cap. Stickman line sits under the offer.

Banned: income + time, credits system, fake proof, $9 plans.

Payment: `VITE_STRIPE_PAYMENT_LINK` only. No Stripe SDK this PR.
Counter: `VITE_FOUNDING_TAKEN` (default 1).

Branch: `hermes/founding-50`.
Done: `npm run build` + grep shows no `$10k` and no `Print money`.

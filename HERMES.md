# Hermes — build this next

You build. Founder markets. Do not start a second product.

## Repo truth
This repo is a waitlist landing page plus the Founding 50 offer.
- `src/App.tsx` — Navbar + Hero
- `src/components/Hero.tsx` — allowed promise only (daily posts on autopilot; first video in 7 days)
- `src/components/FoundingOffer.tsx` — cap 50, $19 deposit CTA, Payment Link only
- `src/components/WaitlistForm.tsx` — keep. Email still writes through `waitlist-signup`.
- No auth, dashboard, render, agent, or Stripe SDK. Do not add them until the next issued slice.

## First slice (this PR)
Shipped on `hermes/founding-50`:
1. Hero uses the allowed promise only.
2. Founding 50 block. Cap 50. Close 12 Oct 2026. $19 deposit credits to Pro.
3. CTA points at the cap. Stickman line sits under the offer.

Banned on the landing: income + time, credits system UI, fake proof, $9 plans.

Payment: `VITE_STRIPE_PAYMENT_LINK` only. No Stripe SDK this PR.
Counter: `VITE_FOUNDING_TAKEN` (default 1).

## After merge
Wait for the next HERMES issue. Do not invent dashboard, render, or agent work.

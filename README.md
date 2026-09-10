# Lucit — waitlist (React)

## Run
```
npm install
npm run dev     # http://localhost:5173
npm run build   # dist/
```

## Stack
React + TypeScript + Vite + Tailwind v4 (@tailwindcss/vite) + Motion + shadcn/ui (Radix Label/Slot + cva) + Lucide.

## Structure
```
src/
  App.tsx                    # Navbar + Hero (full-screen centered)
  index.css                  # @theme tokens + brand-mark glow
  lib/utils.ts               # cn()
  components/
    BrandMark.tsx            # clean SVG flame (transparent; PNG retired)
    BrandLockup.tsx          # optional SVG mark + Prata "Lucit" wordmark
    Navbar.tsx               # fixed, BrandLockup + theme toggle
    Hero.tsx                 # full-viewport, centered headline + waitlist
    WaitlistForm.tsx         # edge-function signup only (no PostgREST fallback)
supabase/
  functions/waitlist-signup  # service-role insert + rate limit + CORS
  migrations/                # 001/002 legacy; 003 edge-only grants
```

## Home layout
Single viewport: fixed full-screen aurora, centered headline, subtext, waitlist form. `prefers-reduced-motion` respected.

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
  index.css                  # @theme tokens (bg/paper/ink/muted/faint/accent)
  lib/utils.ts               # cn()
  components/
    BrandLockup.tsx          # flame PNG + "Lucit" wordmark (Inter, tracking -0.03)
    Navbar.tsx               # fixed, white/80 + blur, BrandLockup only
    Hero.tsx                 # full-viewport, fixed aurora, centered headline + waitlist
    WaitlistForm.tsx         # Radix Label + shadcn Input/Button, validation, Supabase
    ui/waves-shader.tsx      # WebGL aurora (full-screen, low opacity, slow drift)
public/assets/brand-mark.png # flame mark
```

## Home layout
Single viewport: fixed full-screen aurora (pure white fallback, 0.20 opacity, timeScale 0.20), centered `Turn ideas into output.` (`clamp 38–68px`), subtext, `Be the first to know...` + email form. No secondary action. `prefers-reduced-motion` disables canvas.

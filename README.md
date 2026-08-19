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
  App.tsx                    # page assembly — short, text-led
  index.css                  # @theme tokens + CSS variables (bg/ink/line/paper…)
  lib/utils.ts               # cn()
  components/
    BrandLockup.tsx          # P1 flame (supplied PNG, larger polished) + P2 custom geometric wordmark (SVG, diamond tittle + chamfered t)
    Navbar.tsx               # BrandLockup + Join waitlist (outline)
    Hero.tsx                 # lockup hero variant + headline + sub + WaitlistForm
    SectionDivider.tsx       # Motion scaleX line, respects reduced-motion
    FeatureLine.tsx          # numbered feature, in-view stagger
    Features.tsx             # 3-up grid → stacked on mobile
    WaitlistForm.tsx         # Radix Label + shadcn Input/Button, validation, loading/success, keyboard/focus/aria
    Footer.tsx
    ui/button.tsx, input.tsx, label.tsx
public/assets/brand-mark.png # supplied dark glossy flame (also in assets/)
```

## Design tokens
Single source in `src/index.css` (`@theme` + `:root`): `--bg #F1F1EF`, `--ink #0E0E10`, `--line #E7E7E5`, `--paper #FAFAF9`, etc. No scattered hex.

## Notes
- Flame: `assets/brand-mark.png` → `public/assets/brand-mark.png` at build. Rendered 28px nav / 36px hero, `border-radius: 32%`, soft shadow + top highlight — polished without glow spam.
- Wordmark: custom SVG in BrandLockup, not system text. Signature: diamond-cut diamond tittle on `i`, chamfered `t` cross — original.
- Motion only for brand lockup settle, hero stagger, divider draw, feature stagger. Button uses CSS transitions. `prefers-reduced-motion` respected.
- Auth overlay (`navigateTo`/`showPage`/`fakeLogin`/…) preserved via inline script + hidden `#authPages` in App.tsx.

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "nav" | "hero";
  className?: string;
};

/**
 * BrandLockup — P1 flame, P2 wordmark.
 * Flame: supplied dark glossy droplet (assets/brand-mark.png) rendered larger,
 * polished with refined corner radius and controlled soft shadow — no glow spam.
 * Wordmark: original geometric Lucit lettering. Bold, rounded, tight but
 * readable. Signature: diamond-cut tittle on i + chamfered tail on t,
 * plus a subtle ink-trap notch where L meets baseline. Not Instagram,
 * not a system font — custom SVG forms.
 */
export function BrandLockup({ size = "nav", className }: Props) {
  const reduce = useReducedMotion();
  const flameSize = size === "hero" ? 36 : 28;
  const wordH = size === "hero" ? 28 : 22;

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn("flex items-center gap-3 select-none", className)}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        history.pushState("", document.title, window.location.pathname);
      }}
    >
      <span
        className="relative shrink-0 overflow-hidden"
        style={{
          width: flameSize,
          height: flameSize,
          borderRadius: flameSize * 0.32,
          boxShadow:
            "0 1px 2px rgba(14,14,16,.10), 0 8px 24px rgba(14,14,16,.10)",
          background: "#0E0E10",
        }}
        aria-hidden
      >
        <img
          src="/assets/brand-mark.png"
          alt=""
          width={flameSize}
          height={flameSize}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{ display: "block" }}
          onError={(e) => {
            // fallback if public path differs
            const img = e.currentTarget;
            if (!img.src.includes("/brand-mark.png") && !img.dataset.tried) {
              img.dataset.tried = "1";
              img.src = "assets/brand-mark.png";
            }
          }}
        />
        {/* subtle top highlight for dimensional polish */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,0) 46%)",
          }}
        />
      </span>

      {/* Custom geometric wordmark — original Lucit forms */}
      <svg
        viewBox="0 0 148 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="block"
        style={{ height: wordH, width: "auto" }}
      >
        {/* L — broad base, soft outer radius, subtle baseline notch (signature) */}
        <path
          d="M3.2 4.4 H12.2 C13.75 4.4 14.95 5.6 14.95 7.1 V7.1 C14.95 8.6 13.75 9.8 12.2 9.8 H9.1 V18.55 H17.35 C18.8 18.55 20 19.75 20 21.2 V21.2 C20 22.65 18.8 23.85 17.35 23.85 H5.2 C3.0 23.85 1.7 22.65 1.7 20.45 V6.0 C1.7 4.85 2.05 4.4 3.2 4.4 Z"
          fill="currentColor"
        />
        {/* notch */}
        <path d="M9.1 23.85 L11.6 21.35 L9.1 21.35 Z" fill="var(--bg)" opacity="0.0" />
        {/* u */}
        <path
          d="M22.6 9.55 H28.3 C29.45 9.55 30.45 10.55 30.45 11.7 V17.95 C30.45 19.45 31.35 20.2 32.75 20.2 C34.15 20.2 35.05 19.45 35.05 17.95 V11.7 C35.05 10.55 36.05 9.55 37.2 9.55 H39.5 C40.65 9.55 41.65 10.55 41.65 11.7 V19.05 C41.65 22.85 38.65 25.45 33.75 25.45 C28.85 25.45 25.6 22.85 25.6 19.05 V11.7 C25.6 10.55 24.6 9.55 23.45 9.55 H22.6 Z"
          fill="currentColor"
        />
        {/* c */}
        <path
          d="M54.9 25.25 C49.1 25.25 44.25 21.85 44.25 17.25 C44.25 12.65 49.1 9.0 54.9 9.0 C58.5 9.0 61.85 10.6 63.55 13.15 C64.05 13.9 63.7 14.95 62.8 15.5 L61.5 16.25 C60.7 16.75 59.65 16.45 59.05 15.65 C58.25 14.45 56.95 13.75 54.9 13.75 C52.05 13.75 50.2 15.45 50.2 17.25 C50.2 19.05 52.05 20.5 54.9 20.5 C57.0 20.5 58.35 19.85 59.2 18.75 C59.8 17.95 60.9 17.7 61.65 18.15 L63.0 18.9 C63.85 19.4 64.15 20.4 63.6 21.2 C61.9 23.7 58.4 25.25 54.9 25.25 Z"
          fill="currentColor"
        />
        {/* i — stem with slightly rounded top, diamond tittle (signature) */}
        <path
          d="M67.1 9.55 H72.1 C73.25 9.55 74.25 10.55 74.25 11.7 V22.4 C74.25 23.55 73.25 24.55 72.1 24.55 H67.1 C65.95 24.55 64.95 23.55 64.95 22.4 V11.7 C64.95 10.55 65.95 9.55 67.1 9.55 Z"
          fill="currentColor"
        />
        <path
          d="M68.15 3.55 H71.35 C72.55 3.55 73.7 4.7 73.7 5.9 V6.35 C73.7 7.55 72.55 8.7 71.35 8.7 H68.15 C66.95 8.7 65.8 7.55 65.8 6.35 V5.9 C65.8 4.7 66.95 3.55 68.15 3.55 Z"
          fill="currentColor"
        />
        {/* diamond highlight on tittle */}
        <path d="M69.75 4.25 L70.55 5.05 L69.75 5.85 L68.95 5.05 Z" fill="white" opacity="0.0" />
        {/* t — crossbar with chamfered right end (signature), stem */}
        <path
          d="M78.35 9.55 H83.8 C84.95 9.55 85.95 10.55 85.95 11.7 V13.35 H92.25 C93.4 13.35 94.4 14.35 94.4 15.5 V16.35 C94.4 17.5 93.4 18.5 92.25 18.5 H85.95 V19.95 C85.95 21.05 86.55 21.6 87.65 21.6 H90.85 C92.0 21.6 93.0 22.6 93.0 23.75 V23.75 C93.0 24.55 92.35 25.15 91.55 25.15 C86.9 25.15 79.3 25.15 79.3 19.95 V11.7 C79.3 10.55 79.8 9.55 81.0 9.55 H78.35 Z"
          fill="currentColor"
        />
        <path
          d="M76.35 13.35 H79.3 V18.5 H76.35 C75.2 18.5 74.2 17.5 74.2 16.35 V15.5 C74.2 14.35 75.2 13.35 76.35 13.35 Z"
          fill="currentColor"
        />
        {/* soft join */}
        <rect x="75.8" y="13.35" width="10.15" height="5.15" rx="1.1" fill="currentColor" />
      </svg>
    </motion.a>
  );
}

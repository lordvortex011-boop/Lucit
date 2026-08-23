import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "nav" | "hero";
  className?: string;
};

/**
 * BrandLockup — supplied flame PNG left, plain text "Lucit" right.
 * Flame is rendered at 2x CSS px on high-DPI/4K screens (devicePixelRatio
 * scaling) so the 1024px source stays crisp; wordmark is unstyled system
 * text — no cuts, warps, or letter-spacing tricks.
 */
export function BrandLockup({ size = "nav", className }: Props) {
  const reduce = useReducedMotion();
  const flameSize = size === "hero" ? 64 : 48;

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn("flex select-none", className)}
      style={{ alignItems: "center" }}
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        history.pushState("", document.title, window.location.pathname);
      }}
    >
      <img
        src="/assets/brand-mark.png"
        alt="Lucit flame logo"
        width={flameSize}
        height={flameSize}
        decoding="async"
        fetchPriority="high"
        className="shrink-0 rounded-[12px] object-cover align-middle"
        style={{ display: "block", width: flameSize, height: flameSize }}
        onError={(e) => {
          // fallback if public path differs
          const img = e.currentTarget;
          if (!img.src.includes("/brand-mark.png") && !img.dataset.tried) {
            img.dataset.tried = "1";
            img.src = "assets/brand-mark.png";
          }
        }}
      />
      <span className="ml-3 whitespace-nowrap leading-none text-ink">
        Lucit
      </span>
    </motion.a>
  );
}

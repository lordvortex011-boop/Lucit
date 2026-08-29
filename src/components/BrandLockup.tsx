import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "nav" | "hero";
  className?: string;
};

/**
 * BrandLockup — flame mark + Prata 700 wordmark.
 * Prata serif with 700 weight + 0.1em tracking + uppercase.
 * Wordmark width locked to flameSize for solid lockup.
 * ponytail: PNG @ 64/88. Beyond 88 hero → SVG/srcset.
 */
export function BrandLockup({ size = "nav", className }: Props) {
  const reduce = useReducedMotion();
  const flameSize = size === "hero" ? 88 : 64;
  const wordmarkClass = size === "hero" ? "text-[23px]" : "text-[17px]";

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn(
        "flex select-none items-center gap-4 max-[380px]:gap-3",
        size === "hero" && "gap-5",
        className
      )}
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
        alt=""
        aria-hidden
        width={flameSize}
        height={flameSize}
        decoding="async"
        fetchPriority="high"
        className="shrink-0 rounded-[16px] object-cover max-[380px]:rounded-xl"
        style={{
          display: "block",
          width: flameSize,
          height: flameSize,
          imageRendering: "auto" as const,
        }}
      />
      <span
        className={cn(
          "whitespace-nowrap uppercase tracking-[0.1em] font-bold leading-none text-zinc-900 antialiased dark:text-zinc-50",
          wordmarkClass
        )}
        style={{
          fontFamily: "'Prata', serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          width: flameSize,
          display: 'inline-block',
          textAlign: 'center',
          transform: 'translateY(1px)',
          fontVariantLigatures: "none",
        }}
      >
        Lucit
      </span>
    </motion.a>
  );
}

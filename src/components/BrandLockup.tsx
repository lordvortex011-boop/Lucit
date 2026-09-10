import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "nav" | "hero";
  className?: string;
};

/**
 * BrandLockup — flame mark + serif wordmark (Prata, title case).
 * Icon is sized a touch larger than the wordmark cap-height so the
 * lockup balances on light and dark themes.
 */
export function BrandLockup({ size = "nav", className }: Props) {
  const reduce = useReducedMotion();
  // Nav: icon ~48px; hero: ~84px — slightly larger than prior lockup
  // so the mark holds weight next to bold serif type.
  const flameSize = size === "hero" ? 84 : 48;
  const wordmarkClass = size === "hero" ? "text-[28px]" : "text-[20px]";
  // Flame art carries dead space — crop in paint larger than layout box.
  const artScale = 1.2;

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn(
        "flex select-none items-center gap-2.5 leading-none max-[380px]:gap-2",
        size === "hero" && "gap-3.5",
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
      <span
        aria-hidden
        className="block shrink-0 overflow-hidden rounded-[12px] max-[380px]:rounded-[10px]"
        style={{ width: flameSize, height: flameSize }}
      >
        <img
          src="/assets/brand-mark.png"
          alt=""
          width={flameSize * 2}
          height={flameSize * 2}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="block h-full w-full object-cover"
          style={{
            transform: `scale(${artScale})`,
            imageRendering: "auto" as const,
          }}
        />
      </span>
      <span
        className={cn(
          // Deep navy/charcoal on light; near-white on dark — matches wordmark ref.
          "whitespace-nowrap font-normal antialiased text-[#0A111F] dark:text-zinc-50",
          wordmarkClass
        )}
        style={{
          fontFamily: "'Prata', 'Times New Roman', serif",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          transform: "translateY(1px)",
          fontVariantLigatures: "none",
        }}
      >
        Lucit
      </span>
    </motion.a>
  );
}

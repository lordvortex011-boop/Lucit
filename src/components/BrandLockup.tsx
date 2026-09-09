import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  size?: "nav" | "hero";
  className?: string;
};

/**
 * BrandLockup — flame mark + wordmark.
 * Deliberate lockup: icon and type share one optical baseline,
 * cap-height aligned, tight tracking, uppercase for the premium feel.
 * ponytail: PNG @ 64/88. Beyond 88 hero → SVG/srcset.
 */
export function BrandLockup({ size = "nav", className }: Props) {
  const reduce = useReducedMotion();
  const flameSize = size === "hero" ? 72 : 40;
  const wordmarkClass = size === "hero" ? "text-[21px]" : "text-[15px]";
  // Flame art carries dead space — crop in paint larger than layout box.
  const artScale = 1.18;

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn(
        "flex select-none items-center gap-2.5 leading-none max-[380px]:gap-2",
        size === "hero" && "gap-3",
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
        className="block shrink-0 overflow-hidden rounded-[11px] max-[380px]:rounded-[9px]"
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
          "whitespace-nowrap uppercase font-bold text-zinc-900 antialiased dark:text-zinc-50",
          wordmarkClass
        )}
        style={{
          fontFamily: "'Bricolage Grotesque', 'Inter', system-ui, sans-serif",
          fontWeight: 800,
          letterSpacing: "0.32em",
          textIndent: "0.32em", // recenter tracking so caps sit on the optical axis
          lineHeight: 1,
          transform: "translateY(0.5px)",
          fontVariantLigatures: "none",
        }}
      >
        Lucit
      </span>
    </motion.a>
  );
}

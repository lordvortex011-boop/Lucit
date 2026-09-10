import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type Props = {
  size?: "nav" | "hero";
  /** Optional clean SVG mark beside the wordmark. Default true. */
  showMark?: boolean;
  className?: string;
};

/**
 * BrandLockup — optional clean SVG mark + full-text serif wordmark (Prata).
 * No PNG wordmark (avoids cream/texture/compression). Transparent; theme-aware ink.
 * Distinctive large circular i-dot via dotless-i + CSS tittle.
 */
export function BrandLockup({ size = "nav", showMark = true, className }: Props) {
  const reduce = useReducedMotion();
  const markSize = size === "hero" ? 52 : 36;
  const wordmarkClass = size === "hero" ? "text-[32px]" : "text-[22px]";

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
      {showMark ? <BrandMark size={markSize} className="block shrink-0" /> : null}
      <span
        className={cn(
          "whitespace-nowrap font-normal antialiased text-[#0A111F] dark:text-zinc-50",
          wordmarkClass
        )}
        style={{
          fontFamily: "'Prata', 'Times New Roman', serif",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          transform: "translateY(1px)",
          fontVariantLigatures: "none",
        }}
      >
        Luc
        <span className="relative inline-block">
          ı
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 block rounded-full bg-current"
            style={{
              width: "0.32em",
              height: "0.32em",
              transform: "translate(-50%, -0.08em)",
            }}
          />
        </span>
        t
      </span>
    </motion.a>
  );
}

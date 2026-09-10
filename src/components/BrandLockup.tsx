import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type Props = {
  size?: "nav" | "hero";
  /** Droplet mark beside the wordmark. Default true. */
  showMark?: boolean;
  className?: string;
};

/**
 * BrandLockup — real droplet mark + larger Prata text wordmark.
 * Text is intentionally bigger than the mark (not matched height/length).
 * Wordmark is CSS text (no PNG cream/compression). Light + dark ink.
 */
export function BrandLockup({ size = "nav", showMark = true, className }: Props) {
  const reduce = useReducedMotion();
  // Mark stays compact; wordmark leads the lockup.
  const markSize = size === "hero" ? 44 : 28;
  const wordmarkClass =
    size === "hero"
      ? "text-[clamp(36px,5vw,52px)]"
      : "text-[28px] max-[380px]:text-[24px]";

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn(
        "flex select-none items-center gap-3 leading-none max-[380px]:gap-2.5",
        size === "hero" && "gap-4",
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
          letterSpacing: "-0.04em",
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
              width: "0.3em",
              height: "0.3em",
              transform: "translate(-50%, -0.06em)",
            }}
          />
        </span>
        t
      </span>
    </motion.a>
  );
}

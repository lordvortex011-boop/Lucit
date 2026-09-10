import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type Props = {
  size?: "nav" | "hero";
  showMark?: boolean;
  className?: string;
};

/**
 * BrandLockup — droplet mark + Prata "Lucit" wordmark.
 * Mark is sized to read clearly; wordmark uses a normal "i" (no custom giant tittle).
 */
export function BrandLockup({ size = "nav", showMark = true, className }: Props) {
  const reduce = useReducedMotion();
  const markSize = size === "hero" ? 64 : 44;
  const wordmarkClass =
    size === "hero"
      ? "text-[clamp(40px,5.5vw,56px)]"
      : "text-[26px] max-[380px]:text-[22px]";

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
        Lucit
      </span>
    </motion.a>
  );
}

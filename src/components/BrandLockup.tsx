import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

type Props = {
  size?: "nav" | "hero";
  showMark?: boolean;
  className?: string;
};

/**
 * BrandLockup — top-left nav droplet + Prata "Lucit".
 * Nav sizes are intentionally large so the lockup reads clearly.
 */
export function BrandLockup({ size = "nav", showMark = true, className }: Props) {
  const reduce = useReducedMotion();
  // Top-left: big mark + big wordmark. Hero size kept for reuse but unused on landing.
  const markSize = size === "hero" ? 72 : 56;
  const wordmarkClass =
    size === "hero"
      ? "text-[clamp(44px,6vw,60px)]"
      : "text-[34px] max-[760px]:text-[30px] max-[380px]:text-[26px]";

  return (
    <motion.a
      href="#"
      aria-label="Lucit home"
      className={cn(
        "flex select-none items-center gap-3.5 leading-none max-[760px]:gap-3 max-[380px]:gap-2.5",
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

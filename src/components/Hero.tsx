import { motion, useReducedMotion } from "motion/react";
import { BrandLockup } from "./BrandLockup";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  const reduce = useReducedMotion();
  const stagger = reduce
    ? undefined
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[760px] px-7 py-[88px] pt-[168px] max-[760px]:px-[18px] max-[760px]:py-11 max-[760px]:pt-[128px]">
        {/* P1–P2 lockup — strongest element */}
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } })}
          className="flex justify-start"
        >
          <BrandLockup size="hero" />
        </motion.div>

        <motion.p
          className="mt-5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint"
          {...(reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 } })}
        >
          Automated system
        </motion.p>

        {/* P3 headline */}
        <motion.h1
          className="mt-4 text-balance font-[--sans] text-[clamp(40px,6.2vw,64px)] font-extrabold leading-[0.88] tracking-[-0.06em] text-ink"
          {...(reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 } })}
        >
          <span className="block">Turn ideas</span>
          <span className="block">into output.</span>
        </motion.h1>

        {/* P4 supporting */}
        <motion.p
          className="mt-4 max-w-[460px] text-[13.5px] leading-[1.65] text-muted"
          {...(reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.22 } })}
        >
          Automated tools for creating, shaping, and publishing content.
        </motion.p>

        {/* P5 form — utility */}
        <motion.div
          className="mt-8"
          {...(reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 } })}
        >
          <WaitlistForm id="heroEmail" />
        </motion.div>
      </div>
    </header>
  );
}

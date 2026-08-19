import { motion } from "motion/react";

export function Hero() {
  return (
    <header className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[760px] px-7 py-[88px] pt-[168px] max-[760px]:px-[18px] max-[760px]:py-11 max-[760px]:pt-[128px]">
        {/* P3 headline */}
        <motion.h1
          className="mt-0 text-center font-[--sans] text-[clamp(28px,6vw,60px)] font-extrabold leading-tight tracking-[-0.05em] text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        >
          Turn ideas into output.
        </motion.h1>
      </div>
    </header>
  );
}

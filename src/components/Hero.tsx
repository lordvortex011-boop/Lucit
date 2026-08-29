import { motion } from "motion/react";
import { WaitlistForm } from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section className="flex w-full min-h-[100dvh] flex-col items-center justify-center px-7 py-24 max-[760px]:px-[18px] max-[760px]:py-16">
      <div className="flex w-full max-w-[760px] flex-col items-center">
        <motion.h1
          className="text-center font-['Prata'] text-[clamp(38px,5.6vw,68px)] font-extrabold leading-[0.96] tracking-[-0.05em] text-zinc-900 dark:text-zinc-50"
          style={{ fontFamily: "'Prata', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          Print money with faceless YouTube channels.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-[520px] text-center font-[--font-sans] text-[17px] leading-relaxed tracking-[-0.01em] text-zinc-500 dark:text-zinc-400 max-[760px]:mt-4 max-[760px]:text-[15.5px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          Scale your faceless channel to $10k/mo with the 24/7 factory for viral content.
        </motion.p>

        <motion.div
          className="mt-12 flex w-full flex-col items-center max-[760px]:mt-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
        >
          <p className="text-center font-[--font-sans] text-[13.5px] font-normal italic tracking-[-0.01em] text-zinc-500 dark:text-zinc-400">
            Be the first to know when Lucit opens.
          </p>
          <div className="mt-3.5 w-full max-w-[420px]">
            <WaitlistForm id="waitlistEmail" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

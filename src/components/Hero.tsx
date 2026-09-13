import { motion } from "motion/react";
import { FoundingOffer } from "@/components/FoundingOffer";
import { WaitlistForm } from "@/components/WaitlistForm";

export function Hero() {
  return (
    <section className="flex w-full min-h-[100dvh] flex-col items-center justify-center px-7 py-24 max-[760px]:px-[18px] max-[760px]:py-16">
      <div className="flex w-full max-w-[760px] flex-col items-center">
        <motion.p
          className="text-center font-[--font-sans] text-[12.5px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        >
          Founding 50 · doors close 12 Oct 2026
        </motion.p>

        <motion.h1
          className="mt-4 text-center font-['Prata'] text-[clamp(38px,5.6vw,68px)] font-extrabold leading-[0.96] tracking-[-0.05em] text-zinc-900 dark:text-zinc-50"
          style={{ fontFamily: "'Prata', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        >
          Your faceless channel posts daily on autopilot.
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-[520px] text-center font-[--font-sans] text-[17px] leading-relaxed tracking-[-0.01em] text-zinc-500 dark:text-zinc-400 max-[760px]:mt-4 max-[760px]:text-[15.5px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          First video built in Lucit in 7 days. Pick a niche. Lucit runs the queue.
        </motion.p>

        <motion.div
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
        >
          <FoundingOffer />

          <p className="mx-auto mt-6 max-w-[480px] text-center font-[--font-sans] text-[14px] leading-relaxed tracking-[-0.01em] text-zinc-600 dark:text-zinc-300">
            You run a faceless channel? Drop a topic after you grab a spot. Stickman Explains is first.
          </p>

          <div className="mt-8 flex w-full flex-col items-center max-[760px]:mt-6">
            <p className="text-center font-[--font-sans] text-[13.5px] font-normal italic tracking-[-0.01em] text-zinc-500 dark:text-zinc-400">
              Or join the list if you are not ready to deposit.
            </p>
            <div className="mt-3.5 w-full max-w-[420px]">
              <WaitlistForm id="waitlistEmail" />
            </div>
            <p className="mt-1 text-center font-[--font-sans] text-[11.5px] leading-snug text-zinc-400">
              No spam. No income promises. Deposit refunds if we miss launch day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

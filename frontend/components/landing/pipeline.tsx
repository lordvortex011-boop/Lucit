"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = [
  { n: 1, title: "Upload", desc: "Drop one long video. Any length, any topic.", when: "30 SECONDS" },
  { n: 2, title: "Clip", desc: "Lucit finds the 6 strongest moments. No filler cuts.", when: "AUTO" },
  { n: 3, title: "Caption", desc: "Burned-in captions, reframed 9:16, hook on frame one.", when: "AUTO" },
  { n: 4, title: "Post", desc: "Scheduled across TikTok, Reels & Shorts. Already live.", when: "WHILE YOU SLEEP" },
];

export function Pipeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="relative mx-auto mt-10 max-w-[900px] pb-2 pt-6">
      <div className="relative hidden grid-cols-4 items-start sm:grid">
        <div className="pointer-events-none absolute inset-x-[12%] top-7 h-px overflow-hidden bg-lucit-line">
          <motion.i
            className="absolute inset-y-0 left-0 block origin-left bg-lucit-brass"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%" }}
          />
        </div>

        {STEPS.map((step, i) => (
          <PipeStep key={step.n} step={step} index={i} inView={inView} isLast={i === STEPS.length - 1} />
        ))}
      </div>

      {/* mobile: no connecting line, stacked */}
      <div className="flex flex-col gap-[18px] sm:hidden">
        {STEPS.map((step, i) => (
          <PipeStep key={step.n} step={step} index={i} inView={inView} isLast={i === STEPS.length - 1} />
        ))}
      </div>
    </div>
  );
}

function PipeStep({
  step,
  index,
  inView,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  inView: boolean;
  isLast: boolean;
}) {
  const delay = 0.3 + index * 0.42;

  return (
    <div className="relative px-2.5 text-center">
      <motion.div
        className={cn(
          "relative z-10 mx-auto mb-3.5 grid h-14 w-14 place-items-center rounded-full border border-lucit-line2 bg-lucit-paper transition-shadow"
        )}
        animate={
          inView
            ? { borderColor: "rgba(184,147,95,.35)", boxShadow: "0 4px 20px rgba(184,147,95,.14)" }
            : {}
        }
        transition={{ delay, duration: 0.4 }}
      >
        <b className="font-serif text-lg font-medium tracking-[-.02em]">{step.n}</b>
        <motion.small
          className="absolute -bottom-1 -right-1 grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-lucit-bg bg-lucit-brass text-[10px] text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={!isLast && inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: delay + 0.1, duration: 0.4 }}
        >
          ✓
        </motion.small>
      </motion.div>
      <h4 className="text-sm tracking-[-.01em]">{step.title}</h4>
      <p className="mt-1 text-[12.5px] leading-[1.5] text-lucit-muted">{step.desc}</p>
      <div className="mt-2 font-mono text-[10px] tracking-[.08em] text-lucit-muted2">{step.when}</div>
    </div>
  );
}

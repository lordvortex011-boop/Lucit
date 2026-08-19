import { motion, useReducedMotion } from "motion/react";

type Props = {
  index: number;
  children: string;
};

export function FeatureLine({ index, children }: Props) {
  const reduce = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");
  if (reduce) {
    return (
      <div className="flex flex-col gap-2.5 border-r border-line px-7 py-1 max-[760px]:border-b max-[760px]:border-r-0 max-[760px]:px-0 max-[760px]:py-5 last:border-0">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
          {num}
        </span>
        <p className="font-[--sans] text-[17px] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
          {children}
        </p>
      </div>
    );
  }
  return (
    <motion.div
      className="flex flex-col gap-2.5 border-r border-line px-7 py-1 max-[760px]:border-b max-[760px]:border-r-0 max-[760px]:px-0 max-[760px]:py-5 last:border-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -28px 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
    >
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
        {num}
      </span>
      <p className="font-[--sans] text-[17px] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
        {children}
      </p>
    </motion.div>
  );
}

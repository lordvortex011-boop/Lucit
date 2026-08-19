import { motion, useReducedMotion } from "motion/react";

type Props = { delay?: number; className?: string };

export function SectionDivider({ delay = 0, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`h-px bg-line ${className ?? ""}`} aria-hidden />;
  return (
    <motion.div
      aria-hidden
      className={`h-px origin-left bg-line ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay }}
    />
  );
}

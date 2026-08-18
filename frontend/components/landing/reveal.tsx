"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Replicates the original site's `.reveal` / `.reveal.in` scroll animation
 * (opacity 0 -> 1, translateY 18px -> 0, cubic-bezier(.16,1,.3,1), staggered
 * delay), but via Framer Motion's whileInView instead of a manual
 * IntersectionObserver + class toggle.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

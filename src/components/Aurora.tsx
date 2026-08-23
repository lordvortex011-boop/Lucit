import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Aurora — very subtle atmosphere behind all content.
 * Three huge blurred radial fields in near-white / pale silver / cool grey.
 * Slow independent drift (18–30s alternate loops) + gentle scroll parallax
 * (spring-smoothed ±40px). Under prefers-reduced-motion: static fields,
 * no drift, no parallax. Fixed, -z-10, pointer-events-none — never blocks
 * or covers text contrast-wise (max alpha ~0.55 on near-white tones).
 */
export function Aurora() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const raw1 = useTransform(scrollY, [0, 2000], [0, 44]);
  const raw2 = useTransform(scrollY, [0, 2000], [0, -32]);
  const sy1 = useSpring(raw1, { stiffness: 24, damping: 30 });
  const sy2 = useSpring(raw2, { stiffness: 24, damping: 30 });

  const drift = (delay: number, duration: number) =>
    reduce
      ? {}
      : {
          animate: {
            x: [0, 26, -18, 0],
            y: [0, -22, 16, 0],
            scale: [1, 1.07, 0.96, 1],
            opacity: [0.75, 0.95, 0.7, 0.75],
          },
          transition: { duration, delay, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-[22%] -left-[12%] h-[62vmax] w-[62vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(214,222,228,0.55), rgba(214,222,228,0) 72%)",
          ...(reduce ? {} : { y: sy1 }),
        }}
        {...drift(0, 26)}
      />
      <motion.div
        className="absolute top-[30%] -right-[16%] h-[54vmax] w-[54vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(228,232,236,0.50), rgba(228,232,236,0) 70%)",
          ...(reduce ? {} : { y: sy2 }),
        }}
        {...drift(4, 30)}
      />
      <motion.div
        className="absolute -bottom-[24%] left-[18%] h-[58vmax] w-[58vmax] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(236,240,240,0.55), rgba(236,240,240,0) 74%)",
        }}
        {...drift(9, 22)}
      />
    </div>
  );
}

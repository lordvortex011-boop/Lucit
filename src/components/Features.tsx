import { motion, useReducedMotion } from "motion/react";
import { FeatureLine } from "@/components/FeatureLine";

const FEATURES = [
  "Long-form to short-form",
  "Idea to publish-ready content",
  "Always-on creation",
] as const;

export function Features() {
  const reduce = useReducedMotion();
  return (
    <section aria-label="Features" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1180px] px-7 max-[760px]:px-[18px]">
        <div className="grid grid-cols-3 max-[760px]:grid-cols-1">
          {FEATURES.map((f, i) => (
            <FeatureLine key={f} index={i}>
              {f}
            </FeatureLine>
          ))}
        </div>
      </div>
    </section>
  );
}

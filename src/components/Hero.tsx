import { motion } from "motion/react";
import { ShaderBackground } from "@/components/ui/waves-shader";

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Shader layer: absolute behind content, pointer-events none */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white"
      >
        {/* pale static fallback visible under reduced-motion (canvas hidden via CSS) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 55%, #F2F3F5 100%)",
          }}
        />
        <ShaderBackground
          className="absolute inset-0 h-full w-full"
          opacity={0.42}
        />
      </div>
      {/* Content above shader */}
      <div className="relative z-10 mx-auto max-w-[760px] px-7 py-[88px] pt-[168px] max-[760px]:px-[18px] max-[760px]:py-11 max-[760px]:pt-[128px]">
        {/* P3 headline */}
        <motion.h1
          className="mt-0 text-center font-[--sans] text-[clamp(28px,6vw,60px)] font-extrabold leading-tight tracking-[-0.05em] text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
        >
          Turn ideas into output.
        </motion.h1>
        {/* Supporting sentence — directly beneath headline, calm sans */}
        <motion.p
          className="mx-auto mt-6 max-w-[520px] text-center font-[--sans] text-[17px] leading-relaxed tracking-[-0.01em] text-muted max-[760px]:mt-5 max-[760px]:text-[15.5px]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
        >
          Automated tools for building and running faceless channels.
        </motion.p>
      </div>
    </header>
  );
}

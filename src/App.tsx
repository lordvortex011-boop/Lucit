import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function App() {
  return (
    <AuroraBackground
      animationSpeed={18}
      className="min-h-[100dvh] text-zinc-900 antialiased dark:text-zinc-50"
    >
      <a
        href="#main"
        className="sr-only left-3 top-3 z-50 bg-zinc-900 px-4 py-2 text-white focus:not-sr-only focus:absolute dark:bg-white dark:text-zinc-900"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex min-h-[100dvh] flex-col">
        <Hero />
      </main>
    </AuroraBackground>
  );
}

import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Pipeline } from "@/components/landing/pipeline";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { Outcomes } from "@/components/landing/outcomes";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />

        <section className="border-t border-lucit-line py-[72px]" id="pipeline">
          <div className="container text-center">
            <div className="mb-3.5 font-mono text-[10.5px] tracking-[.16em] text-lucit-muted2">
              ZERO TOUCH — ONE ORCHESTRATED MOMENT
            </div>
            <h2 className="text-balance font-serif text-[clamp(32px,4.6vw,52px)] font-normal leading-[.95] tracking-[-.04em]">
              You upload.
              <br />
              <em className="not-italic italic font-normal text-lucit-brass2">Lucit posts.</em>
            </h2>
            <p className="mx-auto mt-3.5 max-w-[560px] text-[16.5px] leading-[1.65] tracking-[-.01em] text-lucit-muted">
              No timeline. No exports. No scheduler tab. The pipeline runs once,
              end to end, then goes still — because done is better than busy.
            </p>

            <Pipeline />
            <FeaturesGrid />
          </div>
        </section>

        <Outcomes />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

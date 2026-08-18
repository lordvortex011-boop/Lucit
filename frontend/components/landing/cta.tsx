import Link from "next/link";

export function Cta() {
  return (
    <section className="border-t border-lucit-ink bg-lucit-ink py-[72px] text-lucit-bg">
      <div className="container text-center">
        <h2 className="text-balance font-serif text-[clamp(32px,4.6vw,52px)] font-normal leading-[.95] tracking-[-.04em]">
          Record one.
          <br />
          <em className="not-italic italic font-normal text-lucit-brass">We post the week.</em>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[560px] text-[16.5px] leading-[1.65] tracking-[-.01em] text-lucit-bg/[.68]">
          Start free. Upload your next long video and wake up to content already live.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full border border-lucit-bg bg-lucit-bg px-[22px] py-[13px] text-sm font-medium text-lucit-ink transition-all hover:bg-white hover:-translate-y-px"
          >
            Start Posting
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-lucit-bg/[.18] bg-transparent px-[22px] py-[13px] text-sm text-lucit-bg transition-colors hover:border-lucit-bg/[.35]"
          >
            Log in
          </Link>
        </div>

        <div className="mt-3.5 font-mono text-[10.5px] tracking-[.08em] text-lucit-bg/50">
          No credit card · Cancel anytime · Posted, not just generated
        </div>
      </div>
    </section>
  );
}

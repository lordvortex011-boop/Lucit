import Link from "next/link";

const CLIPS = [1, 2, 3, 4, 5, 6];

export function Hero() {
  return (
    <header className="border-b border-lucit-line pt-28">
      <div className="mx-auto max-w-[1160px] px-6">
        <div className="mx-auto max-w-[760px] py-[72px] pb-12 text-center">
          <div className="mb-[18px] inline-flex items-center gap-2.5 font-mono text-[10.5px] tracking-[.16em] text-lucit-muted2 before:block before:h-px before:w-[18px] before:bg-lucit-linebrass">
            FOR SOLO FACELESS CREATORS — NOT HOBBYISTS
          </div>

          <h1 className="text-balance font-serif text-[clamp(40px,6.2vw,68px)] font-normal leading-[.92] tracking-[-.045em]">
            Upload once.
            <br />
            <em className="not-italic font-normal italic text-lucit-brass2 tracking-[-.05em]">
              Wake up to a week posted.
            </em>
          </h1>

          <p className="mx-auto mt-[18px] max-w-[560px] text-[17px] leading-[1.6] tracking-[-.01em] text-lucit-muted">
            One long video in. Six finished shorts out — clipped, captioned, and
            already posted to TikTok, Reels &amp; Shorts.{" "}
            <b className="font-medium text-lucit-ink">Never open an editor again.</b>
          </p>

          <div className="mt-[26px] flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full border border-lucit-ink bg-lucit-ink px-[22px] py-[13px] text-sm font-medium text-lucit-bg transition-all hover:bg-[#2A2622] hover:-translate-y-px"
            >
              Start Posting
            </Link>
          </div>

          <div className="mt-3.5 font-mono text-[10.5px] tracking-[.08em] text-lucit-muted2">
            No editor. No scheduling. No backlog.{" "}
            <b className="font-normal text-lucit-muted">Posted, not just generated.</b>
          </div>
        </div>
      </div>

      {/* SYSTEM DIAGRAM */}
      <div className="border-t border-lucit-line bg-lucit-paper py-7">
        <div className="mx-auto max-w-[1160px] px-6">
          <div className="mx-auto max-w-[980px] overflow-hidden rounded-[18px] border border-lucit-line bg-lucit-paper">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lucit-line px-[18px] py-3.5">
              <div>
                <b className="text-[13px] tracking-[-.01em]">1 in → 6 out, posted</b>{" "}
                <span className="text-[12.5px] text-lucit-muted">
                  · clipped · captioned · reframed · scheduled
                </span>
              </div>
              <em className="rounded-full border border-lucit-linebrass bg-lucit-brass/10 px-2 py-1 font-mono text-[10px] not-italic tracking-[.08em] text-lucit-brass2">
                STRUCTURE, NOT A SCREENSHOT
              </em>
            </div>

            <div className="grid grid-cols-1 items-stretch md:grid-cols-[280px_72px_1fr]">
              {/* source */}
              <div className="flex flex-col gap-3.5 border-b border-lucit-line p-5 md:border-b-0 md:border-r">
                <div className="font-mono text-[10px] tracking-[.14em] text-lucit-muted2">
                  YOUR LONG VIDEO
                </div>
                <div className="relative grid aspect-video place-items-center rounded-xl border border-lucit-line bg-lucit-bg after:pointer-events-none after:absolute after:inset-3 after:rounded-lg after:border after:border-dashed after:border-lucit-ink/10">
                  <div className="relative z-10 grid h-[38px] w-[38px] place-items-center rounded-full border border-lucit-line2 bg-lucit-paper text-[13px] text-lucit-muted">
                    ▷
                  </div>
                </div>
                <div>
                  <b className="block text-[13px] tracking-[-.01em]">One file. Any length.</b>
                  <span className="mt-0.5 block text-[12.5px] leading-[1.5] text-lucit-muted">
                    Upload once — talking head, voiceover, screen share. Close the tab after.
                  </span>
                  <small className="mt-2 block font-mono text-[10px] tracking-[.06em] text-lucit-muted2">
                    INPUT · 10 MIN → 2 HOURS
                  </small>
                </div>
              </div>

              {/* bridge */}
              <div className="relative flex items-center justify-center border-b border-lucit-line p-4 md:border-b-0 md:border-r">
                <div className="absolute inset-x-[14%] top-1/2 h-px bg-lucit-linebrass md:inset-x-auto md:inset-y-[14%] md:left-1/2 md:top-[14%] md:h-auto md:w-px" />
                <div className="relative z-10 grid h-9 w-9 place-items-center rounded-full border border-lucit-brass/[.28] bg-lucit-paper">
                  <span className="block h-1.5 w-1.5 rounded-full bg-lucit-brass" />
                </div>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-lucit-line bg-lucit-paper px-1.5 py-0.5 font-mono text-[9px] tracking-[.14em] text-lucit-brass2">
                  LUCIT DOES THE REST
                </span>
              </div>

              {/* output */}
              <div className="flex flex-col gap-3 p-[18px] pb-4">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <b className="font-mono text-xs font-normal tracking-[.08em] text-lucit-ink">
                    SIX SHORTS — 9:16, READY SCHEDULED
                  </b>
                  <span className="text-xs text-lucit-muted">TikTok · Reels · Shorts</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                  {CLIPS.map((n) => (
                    <div key={n} className="flex flex-col overflow-hidden rounded-xl border border-lucit-line bg-lucit-bg">
                      <div className="relative aspect-[9/16] overflow-hidden border-b border-lucit-line bg-[#0E0D0C] after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:from-45% after:to-black/[.42]">
                        <span className="absolute left-2 top-2 z-10 rounded-full border border-black/[.06] bg-white/[.92] px-1.5 py-[3px] font-mono text-[9px] tracking-[.08em] text-lucit-ink">
                          {String(n).padStart(2, "0")}
                        </span>
                        <span className="absolute inset-x-2.5 bottom-2.5 z-10 flex flex-col gap-1">
                          <i className="block h-0.5 rounded-full bg-white/[.88]" />
                          <i className="block h-0.5 w-[78%] rounded-full bg-white/[.68]" />
                          <i className="block h-0.5 w-[56%] rounded-full bg-white/[.38]" />
                        </span>
                      </div>
                      <div className="bg-lucit-paper px-2 py-2 text-center">
                        <b className="block font-mono text-[9.5px] font-normal tracking-[.06em] text-lucit-muted">
                          CLIP {String(n).padStart(2, "0")}
                        </b>
                        <span className="mt-px block text-[11px] text-lucit-muted2">18–34s</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-0.5 text-xs leading-[1.5] text-lucit-muted">
                  Each clip is auto-cut, reframed 9:16, burned-in captions, hook on frame
                  one — titled, captioned, and scheduled to watch-time windows. No
                  timeline, no exports.
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-3.5 max-w-[980px] px-3 text-center font-mono text-[10px] leading-[1.6] tracking-[.06em] text-lucit-muted2">
            Diagram shows structure, not a real customer&apos;s video. After upload your
            dashboard shows these same six slots — captioned, scheduled, already
            posting. No fake thumbnails, no invented titles.
          </p>
        </div>
      </div>
    </header>
  );
}

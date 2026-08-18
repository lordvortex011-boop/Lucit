import { Reveal } from "./reveal";

export function Outcomes() {
  return (
    <section className="border-t border-lucit-line py-[72px] pt-10" id="outcomes">
      <div className="container">
        <Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[18px] border border-lucit-line bg-lucit-paper p-[26px]">
              <h4 className="mb-[18px] font-mono text-[10.5px] tracking-[.14em] text-lucit-muted/70">
                NOT FOR
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Hobbyists collecting drafts and templates",
                  "Teams who love the timeline",
                  "Anyone who wants “AI tools” — not results",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-lucit-line bg-lucit-ink/[.04] px-3 py-2.5 text-[13.5px] leading-[1.5]"
                  >
                    <span className="mt-px flex-shrink-0 text-xs text-lucit-muted2">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[18px] border border-lucit-ink bg-lucit-ink p-[26px] text-lucit-bg">
              <h4 className="mb-[18px] font-mono text-[10.5px] tracking-[.14em] text-lucit-bg/60">
                FOR SOLO FACELESS CREATORS
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  "You record once a week — that’s the whole job",
                  "You want a calendar that’s full, not a folder that’s full",
                  "You’re building toward monetization, not likes",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[.08] bg-white/[.06] px-3 py-2.5 text-[13.5px] leading-[1.5] text-lucit-bg"
                  >
                    <span className="mt-px flex-shrink-0 text-xs text-lucit-brass">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

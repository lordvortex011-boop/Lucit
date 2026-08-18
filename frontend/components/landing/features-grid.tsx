import { Reveal } from "./reveal";

const FEATURES = [
  {
    title: "Never open an editor again",
    desc: "No Premiere. No CapCut. No “just one more tweak.” Your job is to record — ours is to ship.",
    num: "01 — EDITING = 0",
  },
  {
    title: "Posted, not “generated”",
    desc: "Drafts don’t get monetized. Every clip is titled, captioned, scheduled — and posted.",
    num: "02 — OUTCOME = POSTED",
  },
  {
    title: "Built for monetization",
    desc: "Hooks, retention cuts, and posting windows tuned for watch time — not vanity views.",
    num: "03 — GOAL = WATCH TIME",
  },
];

export function FeaturesGrid() {
  return (
    <Reveal>
      <div className="mt-9 grid grid-cols-1 overflow-hidden rounded-[18px] border border-lucit-line bg-lucit-paper md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="border-b border-lucit-line px-[26px] py-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <h4 className="mb-1.5 flex items-center gap-2 text-[15px] tracking-[-.01em]">
              <i className="inline-block h-1.5 w-1.5 rounded-full bg-lucit-brass" />
              {f.title}
            </h4>
            <p className="text-[13.5px] leading-[1.6] text-lucit-muted">{f.desc}</p>
            <span className="mt-3.5 block font-mono text-[10px] tracking-[.1em] text-lucit-muted2">
              {f.num}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

import { Reveal } from "./reveal";

const FAQS = [
  {
    q: "Do I need to edit anything?",
    a: "No. Captions, reframe, cuts, titles, hashtags, scheduling — Lucit handles it. You review only if you want to; posting doesn’t wait for you.",
  },
  {
    q: "What do I upload?",
    a: "One long video per week — talking head, screen share, voiceover, whatever your channel is. 10 minutes to 2 hours, we handle the rest.",
  },
  {
    q: "Where does it post?",
    a: "TikTok, Instagram Reels, YouTube Shorts. One toggle per platform. We schedule for watch-time windows, not all at once.",
  },
  {
    q: "What if I don’t like a clip?",
    a: "Skip it with one tap — the rest still posts. No re-editing, no re-exporting.",
  },
  {
    q: "Is this for beginners chasing trends?",
    a: "No. It’s for solo faceless creators treating this like a business and aiming to get monetized. Consistency beats tricks.",
  },
];

export function Faq() {
  return (
    <section className="border-y border-lucit-line bg-lucit-bg2 py-[72px]" id="faq">
      <div className="container text-center">
        <div className="mb-3.5 font-mono text-[10.5px] tracking-[.16em] text-lucit-muted2">
          STRAIGHT ANSWERS
        </div>
        <h2 className="text-balance font-serif text-[clamp(32px,4.6vw,52px)] font-normal leading-[.95] tracking-[-.04em]">
          No filler.
          <br />
          <em className="not-italic italic font-normal text-lucit-brass2">Just posted.</em>
        </h2>

        <Reveal>
          <div className="mx-auto mt-9 max-w-[760px] overflow-hidden rounded-[18px] border border-lucit-line bg-lucit-paper text-left">
            {FAQS.map((item) => (
              <div key={item.q} className="border-b border-lucit-line px-[22px] py-5 last:border-b-0">
                <b className="block text-sm tracking-[-.01em]">{item.q}</b>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-lucit-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

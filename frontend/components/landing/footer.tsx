export function Footer() {
  return (
    <footer className="border-t border-lucit-line bg-lucit-bg py-9 pb-7">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-start justify-between gap-8 px-6">
        <div>
          <div className="font-serif text-[28px] tracking-[-.04em]">Lucit</div>
          <span className="mt-1.5 block max-w-[280px] text-[12.5px] leading-[1.5] tracking-[-.01em] text-lucit-muted">
            From <em className="font-serif italic text-lucit-brass2">lux</em> — light.
            We turn one recording into a week of light, already posted.
          </span>
        </div>

        <div className="flex flex-wrap gap-7">
          <a href="#pipeline" className="text-[13px] text-lucit-muted hover:text-lucit-ink transition-colors">
            How it works
          </a>
          <a href="#outcomes" className="text-[13px] text-lucit-muted hover:text-lucit-ink transition-colors">
            Outcomes
          </a>
          <a href="#faq" className="text-[13px] text-lucit-muted hover:text-lucit-ink transition-colors">
            FAQ
          </a>
          <a href="/login" className="text-[13px] text-lucit-muted hover:text-lucit-ink transition-colors">
            Log in
          </a>
        </div>
      </div>

      <div className="mx-auto mt-7 flex max-w-[1160px] flex-wrap justify-between gap-3 border-t border-lucit-line px-6 pt-4">
        <span className="font-mono text-[10.5px] tracking-[.08em] text-lucit-muted2">
          © 2026 Lucit
        </span>
        <span className="font-mono text-[10.5px] tracking-[.08em] text-lucit-muted2">
          Notion-calm. Brass-lit. Posted, not promised.
        </span>
      </div>
    </footer>
  );
}

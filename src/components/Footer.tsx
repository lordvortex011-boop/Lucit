export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-7 py-6 max-[760px]:px-[18px]">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
          <img
            src="/assets/brand-mark.png"
            alt=""
            width={14}
            height={14}
            loading="lazy"
            className="h-3.5 w-3.5 rounded-[4.5px] object-cover opacity-95"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.tried) {
                img.dataset.tried = "1";
                img.src = "assets/brand-mark.png";
              }
            }}
          />
          Lucit
        </span>
        <span className="text-[11.5px] text-faint">
          Automated tools for creating, shaping, and publishing content.
        </span>
      </div>
    </footer>
  );
}

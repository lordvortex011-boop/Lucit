import { BrandLockup } from "./BrandLockup";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1180px] items-center justify-between px-7 py-[14px] max-[760px]:px-[18px] max-[760px]:py-3"
      >
        <BrandLockup size="nav" />
        <a
          href="#waitlist"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-full px-5 py-2 text-[14px] font-semibold tracking-[-0.01em] text-ink transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-ink"
        >
          Get early access
        </a>
      </nav>
    </header>
  );
}

import { BrandLockup } from "./BrandLockup";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-[14px] supports-[backdrop-filter]:bg-bg/80">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-7 py-[14px] max-[760px]:px-[18px] max-[760px]:py-3"
      >
        <BrandLockup size="nav" />
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-line2 bg-paper px-4 py-2 text-[12px] font-medium tracking-[-0.02em] hover:border-ink hover:bg-white"
          onClick={() => {
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Join waitlist
        </Button>
      </nav>
    </header>
  );
}

import { BrandLockup } from "./BrandLockup";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className="pointer-events-auto mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-7 py-4 max-[760px]:px-[18px] max-[760px]:py-3"
      >
        <BrandLockup size="nav" />
        <ThemeToggle />
      </nav>
    </header>
  );
}

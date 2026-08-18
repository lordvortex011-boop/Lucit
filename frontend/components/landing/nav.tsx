"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-lucit-line bg-lucit-bg/[.72] backdrop-blur-[14px] backdrop-saturate-[1.1]">
      <nav className="mx-auto flex max-w-[1160px] items-center justify-between gap-5 px-6 py-3.5">
        <Link href="/" className="font-serif text-[22px] tracking-[-.04em] font-medium">
          Lucit
        </Link>

        <div
          className={cn(
            "hidden items-center gap-7 sm:flex",
            mobileOpen &&
              "absolute right-3 top-14 z-10 flex flex-col rounded-2xl border border-lucit-line2 bg-lucit-paper p-3 shadow-[0_12px_32px_rgba(0,0,0,.08)] sm:hidden"
          )}
        >
          <a href="#pipeline" className="text-[13.5px] tracking-[-.01em] text-lucit-muted hover:text-lucit-ink transition-colors">
            How it works
          </a>
          <a href="#outcomes" className="text-[13.5px] tracking-[-.01em] text-lucit-muted hover:text-lucit-ink transition-colors">
            Outcomes
          </a>
          <a href="#faq" className="text-[13.5px] tracking-[-.01em] text-lucit-muted hover:text-lucit-ink transition-colors">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="px-3.5 py-2 text-[13.5px] text-lucit-muted hover:text-lucit-ink transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 rounded-full border border-lucit-ink bg-lucit-ink px-4 py-[9px] text-[13.5px] font-medium text-lucit-bg transition-all hover:bg-[#2A2622] hover:-translate-y-px"
          >
            Start Posting
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="sm:hidden rounded-full border border-lucit-line2 bg-lucit-paper px-3.5 py-2 text-[13px] text-lucit-ink"
          >
            Menu
          </button>
        </div>
      </nav>
    </div>
  );
}

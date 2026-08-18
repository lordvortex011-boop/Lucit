"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DashboardClient() {
  const router = useRouter();
  const supabase = createClient();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-lucit-bg text-lucit-muted">
        Checking session…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lucit-bg p-6">
      <div className="w-full max-w-[560px] rounded-[20px] border border-lucit-line2 bg-lucit-paper px-7 py-9 shadow-[0_12px_40px_rgba(28,26,23,.06)]">
        <h1 className="font-serif text-[30px] leading-none tracking-[-.03em]">
          You&apos;re in.
        </h1>
        <p className="my-2 mb-6 text-sm text-lucit-muted">
          Pipeline connected. Drop a long video to fill the week.
        </p>

        <div className="my-[18px] rounded-[14px] border border-dashed border-lucit-line2 bg-lucit-bg p-[18px]">
          <b className="text-[13px]">Demo project</b>
          <p className="mt-1 text-[13px] leading-[1.5] text-lucit-muted">
            Auth is real now (Supabase), but nothing else is wired up yet.
            Your upload would appear here as 6 scheduled shorts.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-full border border-lucit-line2 bg-lucit-paper py-3.5 text-sm font-medium text-lucit-ink transition-colors hover:bg-lucit-bg"
        >
          Log out
        </button>

        <p className="mt-4">
          <Link href="/" className="text-[13.5px] text-lucit-brass2 hover:underline">
            ← Back to landing
          </Link>
        </p>
      </div>
    </div>
  );
}

const CAP = 50;

function parseTaken(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "1", 10);
  if (!Number.isFinite(n)) return 1;
  return Math.min(CAP, Math.max(0, n));
}

const LINES = [
  "$19 deposit today. Credits to Pro at launch.",
  "First month of Pro is $80, not $99.",
  "If we miss 12 Oct 2026, we refund the $19.",
  "Guarantee: pick one niche, finish setup, ship one queued video in 7 days or we refund.",
  "18+ only. You pay with your own card.",
];

export function FoundingOffer() {
  const taken = parseTaken(import.meta.env.VITE_FOUNDING_TAKEN);
  const left = CAP - taken;
  const full = taken >= CAP;
  const paymentLink = (import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? "").trim();
  const canPay = Boolean(paymentLink) && !full;

  return (
    <div className="mt-10 w-full max-w-[520px] rounded-2xl border border-zinc-200/80 bg-white/60 px-6 py-6 text-left backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40 max-[760px]:mt-8 max-[760px]:px-5 max-[760px]:py-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-[--font-sans] text-[15px] font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
          Founding 50
        </h2>
        <p className="font-[--font-sans] text-[12.5px] tabular-nums tracking-[-0.01em] text-zinc-500 dark:text-zinc-400">
          {full ? "Founding 50 is full." : `${left} of ${CAP} left`}
        </p>
      </div>

      <ul className="mt-4 space-y-2">
        {LINES.map((line) => (
          <li
            key={line}
            className="font-[--font-sans] text-[13.5px] leading-snug tracking-[-0.01em] text-zinc-600 dark:text-zinc-300"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        {canPay ? (
          <a
            href={paymentLink}
            target="_self"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-900 px-6 text-[13.5px] font-semibold leading-none text-white hover:bg-zinc-800 active:scale-[0.99] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Hold my spot · $19
          </a>
        ) : (
          <>
            <button
              type="button"
              disabled={full}
              aria-disabled
              className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-zinc-900 px-6 text-[13.5px] font-semibold leading-none text-white opacity-50 dark:bg-white dark:text-zinc-900"
            >
              {full ? "Founding 50 is full." : "Hold my spot · $19"}
            </button>
            {!full ? (
              <p className="mt-2 text-center font-[--font-sans] text-[12px] leading-snug text-zinc-500 dark:text-zinc-400">
                Deposit link goes live this week. Join the list so we can send it.
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

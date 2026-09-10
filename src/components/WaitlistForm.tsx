import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JOINED_KEY = "lucit_joined_email";

// Anon key is public by design; waitlist writes go only through the edge function
// (service role). Service-role key must never appear here.
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "";
const FUNCTION_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/waitlist-signup` : "";

const GENERIC_ERROR = "Could not save. Try again.";
const CONFIG_ERROR = "Waitlist is not configured yet.";

type SubmitResult = { ok: true } | { ok: false; error: string };

async function submitViaEdge(email: string): Promise<SubmitResult> {
  if (!FUNCTION_URL || !SUPABASE_ANON_KEY) {
    return { ok: false, error: CONFIG_ERROR };
  }
  try {
    const res = await fetch(FUNCTION_URL, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (res.ok || res.status === 409) return { ok: true };
    const data = await res.json().catch(() => null);
    return {
      ok: false,
      error:
        typeof data?.error === "string" && data.error.length < 120 ? data.error : GENERIC_ERROR,
    };
  } catch {
    return { ok: false, error: "Network error. Try again." };
  }
}

export function WaitlistForm({ id = "waitlistEmail", className }: Props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [honeypot, setHoneypot] = React.useState("");
  const lastSubmit = React.useRef(0);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    () =>
      typeof sessionStorage !== "undefined" && sessionStorage.getItem(JOINED_KEY)
        ? "success"
        : "idle"
  );

  const invalid = touched && value.trim().length > 0 && !EMAIL_RE.test(value.trim());

  function validate(v: string) {
    const t = v.trim();
    if (!t) return "Enter your email.";
    if (t.length > 320) return "Enter a valid email.";
    if (!EMAIL_RE.test(t)) return "Enter a valid email.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Honeypot: bots fill it — fake success, send nothing.
    if (honeypot) {
      setValue("");
      setStatus("success");
      return;
    }
    const msg = validate(value);
    if (msg) {
      setError(msg);
      setTouched(true);
      return;
    }
    // Client-side throttle: one submit per 5s.
    if (Date.now() - lastSubmit.current < 5_000) return;
    lastSubmit.current = Date.now();
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setServerError(CONFIG_ERROR);
      return;
    }
    setError(null);
    setServerError(null);
    setStatus("loading");
    try {
      const email = value.trim().toLowerCase();
      const result = await submitViaEdge(email);
      if (result.ok) {
        try {
          sessionStorage.setItem(JOINED_KEY, email);
        } catch {}
        setValue("");
        setStatus("success");
      } else {
        setServerError(result.error);
        setStatus("idle");
      }
    } catch {
      setServerError("Network error. Try again.");
      setStatus("idle");
    }
  }

  const shownError = error || serverError;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("mx-auto flex max-w-[420px] flex-col gap-2", className)}
      aria-describedby={shownError ? `${id}-error` : undefined}
    >
      {/* Honeypot — invisible to humans, catches bots. */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden
        className="absolute h-px w-px overflow-hidden opacity-0"
      />
      <div className="flex gap-2.5 max-[520px]:flex-col">
        <div className="min-w-0 flex-1">
          <Label htmlFor={id} className="sr-only">
            Email address
          </Label>
          <Input
            id={id}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setServerError(null);
              if (error) setError(validate(e.target.value));
            }}
            onBlur={() => {
              setTouched(true);
              if (value) setError(validate(value));
            }}
            aria-invalid={!!shownError || invalid}
            aria-describedby={shownError ? `${id}-error` : undefined}
            disabled={status === "loading"}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="shrink-0 max-[520px]:w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden /> Joining…
            </>
          ) : status === "success" ? (
            <>
              <Check aria-hidden /> You’re in
            </>
          ) : (
            "Join waitlist"
          )}
        </Button>
      </div>

      <div className="min-h-[18px] text-left">
        {shownError ? (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-xs leading-none text-red-600"
          >
            {shownError}
          </p>
        ) : invalid ? (
          <p className="text-xs leading-none text-red-600">Enter a valid email.</p>
        ) : status === "success" ? (
          <p role="status" className="text-xs font-medium leading-none text-zinc-900 dark:text-white">
            You&apos;re on the list.
          </p>
        ) : (
          <p className="text-[11.5px] leading-none text-zinc-400">
            No spam. Just the launch.
          </p>
        )}
      </div>
    </form>
  );
}

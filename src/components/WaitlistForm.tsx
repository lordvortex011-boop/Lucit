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

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const READY = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

const GENERIC_ERROR = "Could not save. Try again.";

export function WaitlistForm({ id = "waitlistEmail", className }: Props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
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
    if (!EMAIL_RE.test(t)) return "Enter a valid email.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validate(value);
    if (msg) {
      setError(msg);
      setTouched(true);
      return;
    }
    if (!READY) {
      setServerError(GENERIC_ERROR);
      return;
    }
    setError(null);
    setServerError(null);
    setStatus("loading");
    try {
      const email = value.trim().toLowerCase();
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY as string,
          authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "content-type": "application/json",
          prefer: "return=minimal",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok || res.status === 409) {
        try {
          sessionStorage.setItem(JOINED_KEY, email);
        } catch {}
        setValue("");
        setStatus("success");
      } else {
        setServerError(GENERIC_ERROR);
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
            disabled={status === "loading" || !READY}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading" || !READY}
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
        {!READY ? (
          <p className="text-xs leading-none text-zinc-400">
            Waitlist unavailable right now.
          </p>
        ) : shownError ? (
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
            You&apos;re on the list. We&apos;ll be in touch.
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

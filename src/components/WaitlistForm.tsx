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
// Session-scoped so a refresh keeps the joined state without exposing data.
const JOINED_KEY = "lucit_joined_email";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const READY = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

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
    setError(null);
    setServerError(null);
    setStatus("loading");
    try {
      // ponytail: direct PostgREST insert with the anon key — RLS is the
      // gatekeeper; add an edge function when duplicate handling needs
      // server-side policy beyond PK uniqueness.
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "content-type": "application/json",
          prefer: "resolution=ignore-duplicates,return=minimal",
        },
        body: JSON.stringify({
          email: value.trim().toLowerCase(),
          created_at: new Date().toISOString(),
        }),
      });
      if (res.ok || res.status === 409) {
        try {
          sessionStorage.setItem(JOINED_KEY, value.trim().toLowerCase());
        } catch {}
        setValue("");
        setStatus("success");
      } else {
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.message ? ` (${data.message})` : "";
        } catch {}
        setServerError(`Could not save. Try again.${detail}`);
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
            "Get early access."
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
          <p role="status" className="text-xs leading-none text-emerald-600">
            You’re on the list — we’ll email when Lucit opens.
          </p>
        ) : (
          <p className="text-[11.5px] leading-none text-faint">One email. No spam.</p>
        )}
      </div>
    </form>
  );
}

export { READY };

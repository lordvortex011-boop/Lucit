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

export function WaitlistForm({ id = "waitlistEmail", className }: Props) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">(
    "idle"
  );

  const invalid = touched && value.trim().length > 0 && !EMAIL_RE.test(value.trim());

  function validate(v: string) {
    const t = v.trim();
    if (!t) return "Enter your email.";
    if (!EMAIL_RE.test(t)) return "Enter a valid email.";
    return null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validate(value);
    if (msg) {
      setError(msg);
      setTouched(true);
      return;
    }
    setError(null);
    setStatus("loading");
    // simulate async — keeps UI honest without backend
    window.setTimeout(() => {
      try {
        const list = JSON.parse(localStorage.getItem("lucit_waitlist") || "[]");
        const t = value.trim();
        if (!list.includes(t)) list.push(t);
        localStorage.setItem("lucit_waitlist", JSON.stringify(list));
      } catch {}
      setStatus("success");
      setValue("");
    }, 520);
  }

  React.useEffect(() => {
    if (status !== "success") return;
    const t = window.setTimeout(() => setStatus("idle"), 2600);
    return () => window.clearTimeout(t);
  }, [status]);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn("mx-auto flex max-w-[420px] flex-col gap-2", className)}
      aria-describedby={error ? `${id}-error` : undefined}
    >
      <div className="flex gap-2.5 max-[520px]:flex-col">
        <div className="min-w-0 flex-1">
          <Label htmlFor={id} className="sr-only">
            Email address
          </Label>
          <Input
            id={id}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your email."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(validate(e.target.value));
            }}
            onBlur={() => {
              setTouched(true);
              if (value) setError(validate(value));
            }}
            aria-invalid={!!error || invalid}
            aria-describedby={error ? `${id}-error` : undefined}
            disabled={status === "loading" || status === "success"}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading" || status === "success"}
          aria-busy={status === "loading"}
          className="shrink-0 max-[520px]:w-full"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" aria-hidden /> Joining…
            </>
          ) : status === "success" ? (
            <>
              <Check aria-hidden /> Joined
            </>
          ) : (
            "Join the waitlist"
          )}
        </Button>
      </div>

      <div className="min-h-[18px] text-left">
        {error ? (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-xs leading-none text-red-600"
          >
            {error}
          </p>
        ) : invalid && !error ? (
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

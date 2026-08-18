"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

export function AuthCard({ mode }: { mode: Mode }) {
  const router = useRouter();
  const supabase = createClient();
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError(isLogin ? "Check email and password." : "Check your details.");
      return;
    }

    setError(null);
    setNotice(null);
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        setError(
          error.message === "Email not confirmed"
            ? "Confirm your email first — check your inbox for the link."
            : error.message,
        );
        return;
      }
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmation is required, signUp succeeds but returns no
    // session — there's nothing to redirect to yet.
    if (!data.session) {
      setNotice("Check your email to confirm your account, then log in.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogle() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lucit-bg p-6">
      <div className="w-full max-w-[420px] rounded-[20px] border border-lucit-line2 bg-lucit-paper px-7 py-9 shadow-[0_12px_40px_rgba(28,26,23,.06)]">
        <h1 className="font-serif text-[30px] leading-none tracking-[-.03em]">
          {isLogin ? "Welcome back." : "Create your account."}
        </h1>
        <p className="my-2 mb-6 text-sm text-lucit-muted">
          {isLogin ? "Continue with Lucit." : "One upload → a week posted."}
        </p>

        <button
          type="button"
          onClick={handleGoogle}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-lucit-line2 bg-lucit-paper py-3 text-sm font-medium text-lucit-ink transition-colors hover:bg-lucit-bg"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-lucit-line" />
          <span className="font-mono text-[10px] tracking-[.12em] text-lucit-muted2">
            OR
          </span>
          <div className="h-px flex-1 bg-lucit-line" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {!isLogin && (
            <input
              className="mb-3 w-full rounded-xl border border-lucit-line2 bg-lucit-bg px-3.5 py-3 text-sm text-lucit-ink placeholder:text-lucit-muted2 focus:outline-none focus:ring-2 focus:ring-lucit-brass/[.35] focus:border-lucit-brass"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          )}
          <input
            className="mb-3 w-full rounded-xl border border-lucit-line2 bg-lucit-bg px-3.5 py-3 text-sm text-lucit-ink placeholder:text-lucit-muted2 focus:outline-none focus:ring-2 focus:ring-lucit-brass/[.35] focus:border-lucit-brass"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            className="mb-3 w-full rounded-xl border border-lucit-line2 bg-lucit-bg px-3.5 py-3 text-sm text-lucit-ink placeholder:text-lucit-muted2 focus:outline-none focus:ring-2 focus:ring-lucit-brass/[.35] focus:border-lucit-brass"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            minLength={6}
          />

          {notice && (
            <p className="mb-3 text-sm text-lucit-brass2" role="status">
              {notice}
            </p>
          )}

          {error && (
            <p className="mb-3 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full border border-lucit-ink bg-lucit-ink py-3.5 text-sm font-medium text-lucit-bg transition-colors hover:bg-[#2A2622] disabled:opacity-60"
          >
            {loading
              ? isLogin
                ? "Logging in…"
                : "Creating account…"
              : isLogin
                ? "Log in →"
                : "Create account →"}
          </button>
        </form>

        <p className="mt-[18px] text-[13.5px] text-lucit-muted">
          {isLogin ? (
            <>
              No account?{" "}
              <Link
                href="/signup"
                className="text-lucit-brass2 hover:underline"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Have an account?{" "}
              <Link href="/login" className="text-lucit-brass2 hover:underline">
                Log in
              </Link>
            </>
          )}{" "}
          ·{" "}
          <Link href="/" className="text-lucit-brass2 hover:underline">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.3h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.54-5.17 3.54-8.59z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.35A7.2 7.2 0 0 1 4.9 12c0-.82.14-1.61.4-2.35V6.56H1.3A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.3 5.44l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.3 6.56l4.01 3.09C6.25 6.85 8.89 4.75 12 4.75z"
      />
    </svg>
  );
}

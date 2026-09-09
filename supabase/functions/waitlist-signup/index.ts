// POST /functions/v1/waitlist-signup { email }
// Env (server-side only, never in browser):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, WAITLIST_NOTIFICATION_EMAIL,
//   RESEND_API_KEY (optional — notifications skipped if unset),
//   ALLOWED_ORIGIN (comma-separated, e.g. https://lucit.vercel.app)
// ponytail: notify via Resend. Swap provider by replacing the fetch below.
import { createClient } from "npm:@supabase/supabase-js@2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED = (Deno.env.get("ALLOWED_ORIGIN") ?? "").split(",").map((s) => s.trim()).filter(Boolean);

// In-memory sliding window per IP (per isolate). Platform limiting still applies.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 10_000) hits.clear();
  return arr.length > 10;
}

function cors(origin: string) {
  const ok = ALLOWED.length === 0 || ALLOWED.includes(origin);
  return {
    "access-control-allow-origin": ok ? origin : ALLOWED[0] ?? "",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "authorization, apikey, content-type",
    "access-control-max-age": "86400",
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const headers = { "content-type": "application/json", ...cors(origin) };
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
  }
  if (ALLOWED.length > 0 && !ALLOWED.includes(origin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers });
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "x";
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Too many attempts. Try again later." }), { status: 429, headers });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), { status: 400, headers });
  }
  const raw = typeof (body as Record<string, unknown>)?.email === "string"
    ? ((body as Record<string, string>).email as string)
    : "";
  // Honeypot from client passes nothing here — bots posting `website` get fake success.
  if (typeof (body as Record<string, unknown>)?.website === "string" && (body as Record<string, string>).website) {
    return new Response(JSON.stringify({ ok: true }), { headers });
  }
  const email = raw.trim().toLowerCase();
  if (email.length < 6 || email.length > 320 || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: "Enter a valid email." }), { status: 400, headers });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { error } = await supabase.from("waitlist").insert({ email });
  if (error) {
    // Duplicate → same success shape (no account enumeration).
    if (error.code === "23505") return new Response(JSON.stringify({ ok: true }), { headers });
    console.error("waitlist insert failed", error.code);
    return new Response(JSON.stringify({ error: "Could not save. Try again." }), { status: 500, headers });
  }

  // Notify owner. Best-effort — signup already succeeded.
  try {
    const to = Deno.env.get("WAITLIST_NOTIFICATION_EMAIL");
    const key = Deno.env.get("RESEND_API_KEY");
    if (to && key) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: "Lucit waitlist <onboarding@resend.dev>",
          to,
          subject: "New waitlist signup",
          text: `New signup: ${email}`,
        }),
      });
    }
  } catch (e) {
    console.error("notify failed", e);
  }

  return new Response(JSON.stringify({ ok: true }), { headers });
});

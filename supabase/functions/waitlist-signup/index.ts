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
    "access-control-allow-origin": ok ? (origin || "*") : ALLOWED[0] ?? "",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "authorization, apikey, content-type",
    "access-control-max-age": "86400",
  };
}

function json(status: number, body: Record<string, unknown>, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), { status, headers });
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const headers = { "content-type": "application/json", ...cors(origin) };
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" }, headers);
  }
  if (ALLOWED.length > 0 && origin && !ALLOWED.includes(origin)) {
    return json(403, { error: "Forbidden" }, headers);
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "x";
  if (rateLimited(ip)) {
    return json(429, { error: "Too many attempts. Try again later." }, headers);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Bad request" }, headers);
  }
  const record = (body && typeof body === "object") ? body as Record<string, unknown> : {};
  // Honeypot from client — bots posting `website` get fake success.
  if (typeof record.website === "string" && record.website) {
    return json(200, { ok: true }, headers);
  }
  const raw = typeof record.email === "string" ? record.email : "";
  const email = raw.trim().toLowerCase();
  if (email.length < 6 || email.length > 320 || !EMAIL_RE.test(email)) {
    return json(400, { error: "Enter a valid email." }, headers);
  }

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    console.error("missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return json(500, { error: "Could not save. Try again." }, headers);
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("waitlist").insert({ email });
  if (error) {
    // Duplicate → 409 so clients can treat as success without enumeration.
    if (error.code === "23505") return json(409, { ok: true, duplicate: true }, headers);
    console.error("waitlist insert failed", error.code, error.message);
    return json(500, { error: "Could not save. Try again." }, headers);
  }

  // Notify owner. Best-effort — signup already succeeded.
  try {
    const to = Deno.env.get("WAITLIST_NOTIFICATION_EMAIL");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (to && resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
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

  return json(200, { ok: true }, headers);
});

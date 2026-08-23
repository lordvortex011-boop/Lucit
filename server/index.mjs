// ponytail: stdlib-only API + static server (node:sqlite). Upgrade path: swap to
// Postgres + server-side Google Sheet sync job when email comms go live.
// No waitlist read route exists — the public can only INSERT via POST.
import { createServer } from "node:http";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT || 8787);
// Comma-separated allowlist. First entry is the canonical allowed origin.
const ORIGINS = (process.env.ALLOWED_ORIGIN || "http://localhost:5173,http://localhost:8787")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const DB_PATH = process.env.LUCIT_DB || "server/data/lucit.db";
const RATE_MAX = Number(process.env.RATE_MAX || 10);
const RATE_WINDOW_MS = Number(process.env.RATE_WINDOW_MS || 10 * 60_000);
const SUCCESS = "You're on the list — we'll email when Lucit opens.";

mkdirSync(join(DB_PATH, ".."), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`CREATE TABLE IF NOT EXISTS waitlist (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  consent TEXT NOT NULL DEFAULT 'implicit',
  status TEXT NOT NULL DEFAULT 'pending'
)`);
const insert = db.prepare(
  "INSERT OR IGNORE INTO waitlist (email, created_at) VALUES (?, ?)"
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validEmail(raw) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return null;
  const local = email.split("@")[0];
  if (!local || local.length > 64) return null;
  return EMAIL_RE.test(email) ? email : null;
}

// ponytail: in-memory sliding window keyed by client IP. Spoofable
// x-forwarded-for is acceptable here (honeypot + email uniqueness still hold);
// use platform-level limiting when abuse becomes real.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 10_000) hits.clear();
  return arr.length > RATE_MAX;
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

function send(res, code, body, type = "application/json") {
  res.writeHead(code, { "content-type": type, "cache-control": "no-store" });
  res.end(body);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (url.pathname === "/api/waitlist") {
    if (req.method !== "POST") {
      return send(res, 405, JSON.stringify({ ok: false, error: "Method not allowed" }));
    }
    const origin = (req.headers.origin || req.headers.referer || "").replace(/\/$/, "");
    const refererBase = origin.startsWith("http")
      ? origin
      : "";
    const allowed = ORIGINS.some(
      (o) => refererBase === o || refererBase.startsWith(o + "/")
    );
    if (!allowed) return send(res, 403, JSON.stringify({ ok: false, error: "Forbidden" }));

    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "x")
      .split(",")[0]
      .trim();
    if (rateLimited(ip)) {
      return send(res, 429, JSON.stringify({ ok: false, error: "Too many attempts. Try again later." }));
    }

    let body = "";
    req.on("data", (c) => {
      body += c;
      if (body.length > 2000) req.destroy();
    });
    req.on("end", () => {
      try {
        const { email: raw, website } = JSON.parse(body || "{}");
        // Honeypot: bots fill the hidden field. Fake success, store nothing.
        if (website) return send(res, 200, JSON.stringify({ ok: true, message: SUCCESS }));
        const email = validEmail(raw);
        if (!email) return send(res, 400, JSON.stringify({ ok: false, error: "Enter a valid email." }));
        // INSERT OR IGNORE: duplicates are a no-op; response identical either way.
        insert.run(email, new Date().toISOString());
        return send(res, 200, JSON.stringify({ ok: true, message: SUCCESS }));
      } catch {
        return send(res, 400, JSON.stringify({ ok: false, error: "Bad request" }));
      }
    });
    return;
  }

  // Static: serve dist/ with SPA fallback.
  let p = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  let file = join("dist", p);
  if (!existsSync(file) || statSync(file).isDirectory() || extname(file) === "") {
    file = join("dist", "index.html");
  }
  try {
    const data = readFileSync(file);
    res.writeHead(200, {
      "content-type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
      "x-content-type-options": "nosniff",
    });
    res.end(data);
  } catch {
    send(res, 404, "Not found", "text/plain");
  }
});

server.listen(PORT, () => {
  console.log(`lucit server on http://localhost:${PORT} (db: ${DB_PATH})`);
});

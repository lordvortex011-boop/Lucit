// One runnable check: exercises every waitlist rule against a live server.
import { spawn } from "node:child_process";
const PORT = 8999;
const env = { ...process.env, PORT: String(PORT), LUCIT_DB: "server/data/test.db", ALLOWED_ORIGIN: `http://localhost:${PORT}` };
const srv = spawn("node", ["server/index.mjs"], { env, stdio: "ignore" });
await new Promise(r => setTimeout(r, 800));
const O = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
async function post(body, headers = {}) {
  const res = await fetch(O + "/api/waitlist", { method: "POST", headers: { "content-type": "application/json", origin: O, ...headers }, body: JSON.stringify(body) });
  return { code: res.status, ...(await res.json().catch(() => ({}))) };
}
function check(name, cond) { cond ? pass++ : (fail++, console.log("FAIL:", name)); }
try {
  let r;
  r = await post({ email: "User@Example.com  " });
  check("valid email saves (normalized lowercase)", r.code === 200 && r.ok);
  r = await post({ email: "user@example.com" });
  check("duplicate returns safe success, no error", r.code === 200 && r.ok && !/duplicate|exists/i.test(r.message || ""));
  r = await post({ email: "second@example.com" });
  check("second distinct email saves", r.code === 200 && r.ok);
  r = await post({ email: "not-an-email" });
  check("invalid rejected 400", r.code === 400);
  r = await post({ email: "" });
  check("blank rejected 400", r.code === 400);
  r = await post({ website: "http://spam.tld", email: "bot@x.com" });
  check("honeypot fakes success without storing", r.code === 200 && r.ok);
  for (let i = 0; i < 6; i++) r = await post({ email: `burst${i}@x.com` });
  check("rate limit kicks in (429)", r.code === 429);
  const foreign = await fetch(O + "/api/waitlist", { method: "POST", body: "{}", headers: { "content-type": "application/json", origin: "http://evil.example" } });
  check("foreign origin blocked 403", foreign.status === 403);
  const noDb = await fetch(O + "/api/waitlist", { method: "GET", headers: { origin: O } });
  check("no read route (405)", noDb.status === 405);
  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync("server/data/test.db");
  db.exec("DELETE FROM waitlist WHERE email LIKE 'burst%'");
  const rows = db.prepare("SELECT email FROM waitlist ORDER BY email").all();
  check("exactly the two unique valid emails", JSON.stringify(rows.map(x=>x.email)) === JSON.stringify(["second@example.com","user@example.com"]));
  check("honeypot bot email NOT stored", !rows.find(x => x.email === "bot@x.com"));
  console.log(`${pass} passed, ${fail} failed`);
} finally { srv.kill(); }
process.exit(fail ? 1 : 0);

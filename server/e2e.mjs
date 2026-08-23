// ponytail: one-shot Playwright E2E — delete when UI stabilizes.
import { chromium } from "playwright";

const BASE = "http://localhost:8787";
let pass = 0, fail = 0;
const check = (name, cond) => (cond ? pass++ : (fail++, console.log("FAIL:", name)));

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(BASE, { waitUntil: "networkidle" });

  // 1. Nav lockup: flame img + "Lucit" text, flame bigger, same row
  const flame = page.locator("header a img[src*='brand-mark']");
  check("nav flame visible", await flame.isVisible());
  const fb = await flame.boundingBox();
  // Wordmark is now a text span "LUCIT" beside the flame
  const txt = page.locator("header a span", { hasText: "LUCIT" });
  const tb = await txt.boundingBox();
  check("flame larger than text", fb.height > tb.height);
  check(
    "flame + text vertically centered",
    Math.abs(fb.y + fb.height / 2 - (tb.y + tb.height / 2)) <= 1
  );
  const crisp = await flame.evaluate((el) => {
    const r = el.getBoundingClientRect();
    return r.width * window.devicePixelRatio >= 40;
  });
  check("flame >=40 CSS px (4K-crisp source)", crisp);

  // 2. No lower logo/LUCIT text outside nav: exactly one flame img and one
  //    LUCIT wordmark span on the whole page
  const flameCount = await page.locator("img[src*='brand-mark']").count();
  const lucitSpanCount = await page
    .locator("span", { hasText: /^LUCIT$/ })
    .count();
  check("exactly one lockup (1 flame + 1 LUCIT span)", flameCount === 1 && lucitSpanCount === 1);

  // 3. White bg, no visible borders/dividers
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor
  );
  check("pure white body background", bg === "rgb(255, 255, 255)");
  const visibleBorders = await page.evaluate(() => {
    let n = 0;
    document.querySelectorAll("body *").forEach((el) => {
      if (el.closest("#authPages")) return;
      for (const s of ["Top", "Bottom"]) {
        const w = parseFloat(getComputedStyle(el)["border" + s + "Width"]);
        const c = getComputedStyle(el)["border" + s + "Color"];
        if (w > 0 && c !== "rgba(0, 0, 0, 0)") n++;
      }
    });
    return n;
  });
  check("no visible grey divider borders", visibleBorders === 0);

  // 4. Closing note gone
  const bodyText = await page.locator("body").innerText();
  check("no closing-note label", !/closing note/i.test(bodyText));
  check("no closing sentence", !/quieter way to keep publishing/i.test(bodyText));

  // 5. Waitlist last meaningful content before footer
  const order = await page.evaluate(() => {
    const els = [
      ["hero", "#main header"],
      ["waitlist", "#waitlist"],
      ["footer", "footer"],
    ].map(([k, sel]) => {
      const el = document.querySelector(sel);
      return [k, el ? el.getBoundingClientRect().top : -1];
    });
    return els;
  });
  const tops = Object.fromEntries(order);
  check(
    "order hero < waitlist < footer",
    tops.hero < tops.waitlist && tops.waitlist < tops.footer
  );

  // 6. Form: empty input, placeholder, button label, no demo prefill
  const input = page.locator("#waitlistEmail");
  check("input empty on load", (await input.inputValue()) === "");
  check(
    'placeholder "Enter your email"',
    (await input.getAttribute("placeholder")) === "Enter your email"
  );
  const btnText = await page
    .locator('#waitlist button[type="submit"]')
    .innerText();
  check('button "Join the waitlist"', btnText.trim() === "Join the waitlist");

  // 7. Invalid email rejected client-side
  await input.fill("not-an-email");
  await page.locator('#waitlist button[type="submit"]').click();
  check("invalid email shows error", await page.getByText("Enter a valid email.").isVisible());
  await input.fill("");

  // 8. Valid email saves; success state survives reload (sessionStorage)
  await input.fill("E2E@Example.com");
  await page.locator('#waitlist button[type="submit"]').click();
  await page.waitForSelector('[role="status"]', { timeout: 5000 });
  check("success message shown", true);
  await page.reload({ waitUntil: "networkidle" });
  check(
    "refresh keeps success state",
    await page.locator('[role="status"]').isVisible()
  );

  // 9. Mobile layout works
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto(BASE, { waitUntil: "networkidle" });
  await mob.locator("#waitlistEmail").fill("mobile@example.com");
  await mob.locator('#waitlist button[type="submit"]').click();
  await mob.waitForSelector('[role="status"]', { timeout: 5000 });
  check("mobile flow joins successfully", true);

  console.log(`${pass} passed, ${fail} failed`);
} finally {
  await browser.close();
}
process.exit(fail ? 1 : 0);

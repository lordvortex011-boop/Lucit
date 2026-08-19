import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-dvh bg-bg text-ink antialiased">
      <a
        href="#main"
        className="sr-only left-3 top-3 z-50 bg-ink px-4 py-2 text-white focus:not-sr-only focus:absolute"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <SectionDivider />
        <section
          id="waitlist"
          aria-label="Waitlist"
          className="border-b border-line bg-bg px-7 py-12 text-center max-[760px]:px-[18px] max-[760px]:py-10"
        >
          <div className="mx-auto max-w-[760px]">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-faint">
              Waitlist
            </p>
            <h2 className="mt-3.5 text-balance font-[--sans] text-[22px] font-bold leading-none tracking-[-0.04em] text-ink">
              Get early access.
            </h2>
            <div className="mt-5">
              <WaitlistForm id="waitlistEmail" />
            </div>
          </div>
        </section>
        <SectionDivider />
        <section
          aria-label="Closing"
          className="bg-bg px-7 py-10 text-center max-[760px]:px-[18px] max-[760px]:py-8"
        >
          <div className="mx-auto max-w-[760px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              A closing note
            </span>
            <p className="mt-2.5 font-serif text-[17px] italic leading-[1.4] tracking-[-0.02em] text-muted">
              A quieter way to keep publishing.
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Auth overlay — preserved behind hash routing, plain HTML to avoid React clash */}
      <div id="authPages" style={{ display: "none" }}>
        <div
          id="loginPage"
          style={{
            display: "none",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 16,
              padding: "32px 28px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--sans)",
                fontSize: 24,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              Welcome back
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 13, margin: "8px 0 22px" }}>
              Log in to continue.
            </p>
            <input
              id="loginEmail"
              placeholder="Email"
              autoComplete="email"
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "12px 16px",
                fontSize: 14,
                marginBottom: 10,
              }}
            />
            <input
              id="loginPass"
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "12px 16px",
                fontSize: 14,
                marginBottom: 10,
              }}
            />
            <button
              onClick={() => (window as any).fakeLogin?.()}
              style={{
                width: "100%",
                background: "var(--ink)",
                color: "#fff",
                padding: 12,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                border: "1px solid var(--ink)",
                cursor: "pointer",
              }}
            >
              Log in
            </button>
            <p style={{ marginTop: 18, fontSize: 13, color: "var(--muted)" }}>
              No account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).navigateTo?.("signup");
                }}
                style={{
                  color: "var(--ink)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Get Started
              </a>{" "}
              ·{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).navigateTo?.("home");
                }}
                style={{
                  color: "var(--ink)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Back to site
              </a>
            </p>
          </div>
        </div>
        <div
          id="signupPage"
          style={{
            display: "none",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 16,
              padding: "32px 28px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--sans)",
                fontSize: 24,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              Create your account
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 13, margin: "8px 0 22px" }}>
              Get started with Lucit.
            </p>
            <input
              id="signupName"
              placeholder="Name"
              autoComplete="name"
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "12px 16px",
                fontSize: 14,
                marginBottom: 10,
              }}
            />
            <input
              id="signupEmail"
              placeholder="Email"
              autoComplete="email"
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "12px 16px",
                fontSize: 14,
                marginBottom: 10,
              }}
            />
            <input
              id="signupPass"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              style={{
                width: "100%",
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 999,
                padding: "12px 16px",
                fontSize: 14,
                marginBottom: 10,
              }}
            />
            <button
              onClick={() => (window as any).fakeSignup?.()}
              style={{
                width: "100%",
                background: "var(--ink)",
                color: "#fff",
                padding: 12,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                border: "1px solid var(--ink)",
                cursor: "pointer",
              }}
            >
              Get Started
            </button>
            <p style={{ marginTop: 18, fontSize: 13, color: "var(--muted)" }}>
              Have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).navigateTo?.("login");
                }}
                style={{
                  color: "var(--ink)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Log in
              </a>{" "}
              ·{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).navigateTo?.("home");
                }}
                style={{
                  color: "var(--ink)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Back to site
              </a>
            </p>
          </div>
        </div>
        <div
          id="appPage"
          style={{
            display: "none",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "var(--bg)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 560,
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: 16,
              padding: "32px 28px",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--sans)",
                fontSize: 24,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              You’re in
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 13, margin: "8px 0 22px" }}>
              This is a preview. The app lands here.
            </p>
            <button
              onClick={() => (window as any).fakeLogout?.()}
              style={{
                width: "100%",
                background: "var(--paper)",
                color: "var(--ink)",
                padding: 12,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                border: "1px solid var(--line2)",
                cursor: "pointer",
              }}
            >
              Log out
            </button>
            <p style={{ marginTop: 16 }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  (window as any).navigateTo?.("home");
                }}
              >
                ← Back to site
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

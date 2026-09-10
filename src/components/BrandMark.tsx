/**
 * Lucit droplet mark — theme-aware SVG.
 * Light: dark body + soft white eyes.
 * Dark: light body + dark eyes (avoids scary white glow-eyes on black).
 */
export function BrandMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      style={{ overflow: "visible", display: "block", flexShrink: 0 }}
    >
      {/* Soft outer halo — muted in dark so it doesn't scream */}
      <ellipse
        cx="32"
        cy="36"
        rx="21"
        ry="25"
        className="fill-zinc-900/10 dark:fill-white/10"
      />
      {/* Droplet body */}
      <path
        d="M32 6C32 6 14 28 14 40.5C14 50.165 22.059 58 32 58C41.941 58 50 50.165 50 40.5C50 28 32 6 32 6Z"
        className="fill-[#12141A] dark:fill-zinc-100"
      />
      {/* Specular highlight */}
      <path
        d="M24.5 28C26.2 22.5 29.5 16.5 32 12.5C28.5 20 22.5 30.5 23.2 38.5C23.5 34.2 23.8 30.5 24.5 28Z"
        className="fill-white/25 dark:fill-zinc-900/15"
      />
      {/* Eyes — inverted in dark mode (no piercing white voids) */}
      <ellipse
        cx="26.5"
        cy="40"
        rx="3.1"
        ry="5.2"
        className="fill-zinc-50 dark:fill-zinc-800"
      />
      <ellipse
        cx="37.5"
        cy="40"
        rx="3.1"
        ry="5.2"
        className="fill-zinc-50 dark:fill-zinc-800"
      />
    </svg>
  );
}

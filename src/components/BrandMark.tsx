/**
 * Clean vector flame/droplet mark — transparent, no baked background/noise.
 * Soft glow keeps the dark body legible on light and dark themes.
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
      style={{ overflow: "visible" }}
    >
      {/* Outer glow */}
      <ellipse className="brand-mark-glow" cx="32" cy="36" rx="20" ry="24" fill="#ffffff" />
      <ellipse className="brand-mark-glow-soft" cx="32" cy="38" rx="15" ry="19" fill="#ffffff" />
      {/* Droplet / flame body */}
      <path
        d="M32 6C32 6 14 28 14 40.5C14 50.165 22.059 58 32 58C41.941 58 50 50.165 50 40.5C50 28 32 6 32 6Z"
        fill="#12141A"
      />
      {/* Specular highlight */}
      <path
        d="M24.5 28C26.2 22.5 29.5 16.5 32 12.5C28.5 20 22.5 30.5 23.2 38.5C23.5 34.2 23.8 30.5 24.5 28Z"
        fill="#ffffff"
        opacity="0.22"
      />
      {/* Eyes */}
      <ellipse cx="26.5" cy="40" rx="3.1" ry="5.2" fill="#ffffff" />
      <ellipse cx="37.5" cy="40" rx="3.1" ry="5.2" fill="#ffffff" />
    </svg>
  );
}

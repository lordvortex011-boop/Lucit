/**
 * Lucit droplet mark — transparent PNG (white bg removed from source art).
 * Uses /assets/brand-mark.png (full data-URI BrandMark.tsx is ~50KB; re-push that file from a larger MCP payload path).
 * Orphan brandMarkPart*.ts on main are unused leftovers from a partial split attempt.
 */
const MARK_SRC = "/assets/brand-mark.png";

export function BrandMark({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <img
      src={MARK_SRC}
      alt=""
      width={size}
      height={size}
      decoding="async"
      draggable={false}
      className={className}
      aria-hidden
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}

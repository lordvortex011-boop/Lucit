/**
 * Lucit droplet mark — transparent PNG (white bg removed from source art).
 * Served from public/assets (monolithic data-URI embed exceeded MCP push size).
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

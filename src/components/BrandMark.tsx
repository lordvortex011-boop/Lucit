/**
 * Lucit droplet mark — transparent PNG (white bg removed from source art).
 * Embedded small asset so deploy works without a binary GitHub upload.
 */
import { P0 } from "./brandMarkPart0";
import { P1 } from "./brandMarkPart1";

const MARK_SRC = P0 + P1;

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

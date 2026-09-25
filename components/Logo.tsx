import { MARK_OUTLINE, MARK_PETALS, WORDMARK, WORDMARK_ASCENT, WORDMARK_WIDTH } from "./logo-paths";

type MarkProps = {
  /** "outline" = lime ring on dark (primary). "filled" = black petals with a lime star. */
  variant?: "outline" | "filled";
  className?: string;
  title?: string;
};

export function Mark({ variant = "outline", className, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {variant === "outline" ? (
        <path fill="currentColor" fillRule="evenodd" d={MARK_OUTLINE} />
      ) : (
        <>
          <circle cx="50" cy="50" r="47.6" fill="#C1FF72" />
          <path fill="#0A0A0A" d={MARK_PETALS} />
        </>
      )}
    </svg>
  );
}

// Lockup proportions match the brand sheet: wordmark ascender = 0.64 × mark, gap = 0.24 × mark.
const SCALE = 64 / WORDMARK_ASCENT;
const LOCKUP_WIDTH = 124 + WORDMARK_WIDTH * SCALE;

/** Lime mark + wordmark in currentColor. Size it with a height class, e.g. "h-7". */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${LOCKUP_WIDTH.toFixed(1)} 100`} className={className} role="img" aria-label="Flowwork">
      <path fill="#C1FF72" fillRule="evenodd" d={MARK_OUTLINE} />
      <path fill="currentColor" transform={`translate(124 82) scale(${SCALE.toFixed(6)})`} d={WORDMARK} />
    </svg>
  );
}

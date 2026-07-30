import styles from "./BrandMark.module.css";

type BrandMarkProps = {
  variant: "wordmark" | "monogram";
  /** Sits inside a link or button that already carries the accessible name. */
  className?: string;
};

/**
 * The Adada & Kabbani lockup.
 *
 * Set typographically in the display face rather than loaded as artwork, so it
 * stays crisp at every size, inherits `currentColor` for the header's
 * oxblood/bone contrast switching, and costs no request.
 *
 * BRAND SWAP: when the approved logo artwork is supplied, drop the SVGs in
 * `public/assets/brand/` and replace the spans below with inline SVG. Keep
 * `currentColor` on the paths so the header and menu keep switching tone
 * automatically.
 */
export function BrandMark({ variant, className }: BrandMarkProps) {
  if (variant === "monogram") {
    return (
      <span
        className={[styles.monogram, className].filter(Boolean).join(" ")}
        aria-hidden="true"
      >
        AK
      </span>
    );
  }

  return (
    <span
      className={[styles.wordmark, className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <span className={styles.word}>Adada</span>
      <span className={styles.amp}>&amp;</span>
      <span className={styles.word}>Kabbani</span>
    </span>
  );
}

import styles from "./Chevron.module.css";

type ChevronProps = {
  open: boolean;
  /** Rendered size in px. Desktop header uses 11. */
  size?: number;
  className?: string;
};

/**
 * Dropdown indicator — spec section 7.
 * A thin open chevron, never a filled triangle. Rotates 180° when its parent
 * disclosure is open. Purely decorative: the parent button carries the label
 * and the aria-expanded state.
 */
export function Chevron({ open, size = 11, className }: ChevronProps) {
  return (
    <svg
      className={[styles.chevron, className].filter(Boolean).join(" ")}
      data-open={open ? "true" : "false"}
      viewBox="0 0 12 12"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.2 4.5 6 8.1l3.8-3.6" />
    </svg>
  );
}

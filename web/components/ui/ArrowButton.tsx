"use client";

import styles from "./ArrowButton.module.css";

export type ArrowButtonProps = {
  direction: "left" | "right";
  variant: "outline" | "solid";
  disabled?: boolean;
  /** Accessible name, e.g. "Previous service". */
  label: string;
  onClick: () => void;
};

export function ArrowButton({
  direction,
  variant,
  disabled = false,
  label,
  onClick,
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      data-variant={variant}
      data-direction={direction}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        className={styles.arrow}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        aria-hidden="true"
        focusable="false"
      >
        {direction === "right" ? (
          <>
            <path d="M4 12h15" />
            <path d="M13.4 6.6 19 12l-5.6 5.4" />
          </>
        ) : (
          <>
            <path d="M20 12H5" />
            <path d="M10.6 6.6 5 12l5.6 5.4" />
          </>
        )}
      </svg>
    </button>
  );
}

import Link from "next/link";
import styles from "./TextLink.module.css";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  /** `right` for in-page and index routes, `diagonal` for outward actions. */
  arrow?: "right" | "diagonal";
  tone?: "dark" | "light" | "oxblood";
  /** Larger setting for the Contact CTA action. */
  size?: "sm" | "md";
  className?: string;
};

/**
 * The editorial text link — spec section 16.
 * A fine underline that extends on hover and an arrow that shifts with it.
 * Never a filled rectangle, never a pill.
 */
export function TextLink({
  href,
  children,
  arrow = "right",
  tone = "oxblood",
  size = "sm",
  className,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={[styles.link, className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-size={size}
      data-arrow={arrow}
    >
      <span className={styles.label}>
        {children}
        <span className={styles.rule} aria-hidden="true" />
      </span>
      <svg
        className={styles.arrow}
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
        aria-hidden="true"
        focusable="false"
      >
        {arrow === "diagonal" ? (
          <>
            <path d="M4.4 11.6 11.6 4.4" />
            <path d="M5.6 4.4h6v6" />
          </>
        ) : (
          <>
            <path d="M1.5 8h12" />
            <path d="M9.4 3.9 13.5 8l-4.1 4.1" />
          </>
        )}
      </svg>
    </Link>
  );
}

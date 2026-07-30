import { activeSocialLinks, type SocialPlatform } from "@/data/social";
import styles from "./SocialLinks.module.css";

const glyphs: Record<SocialPlatform, React.ReactNode> = {
  x: <path d="M5 5l14 14M19 5L5 19" />,
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="1.4" />
      <path d="M7.4 10.3V17" />
      <path d="M7.4 7.3h.01" />
      <path d="M11.4 17v-3.9a2.5 2.5 0 0 1 5 0V17" />
    </>
  ),
  facebook: (
    <>
      <path d="M16.4 6.4h-1.7a2.9 2.9 0 0 0-2.9 2.9V21" />
      <path d="M9 12.9h5.9" />
    </>
  ),
};

type SocialLinksProps = {
  tone?: "light" | "dark";
  className?: string;
  /** Accessible name for the list, e.g. "Adada & Kabbani on social media". */
  label?: string;
};

/**
 * Monochrome line icons — spec section 14.
 *
 * Renders nothing at all when no profile URL has been approved yet, rather
 * than shipping dead links. Fill in `data/social.ts` and the row appears.
 */
export function SocialLinks({
  tone = "light",
  className,
  label = "Adada & Kabbani on social media",
}: SocialLinksProps) {
  if (activeSocialLinks.length === 0) return null;

  return (
    <ul
      className={[styles.list, className].filter(Boolean).join(" ")}
      data-tone={tone}
      aria-label={label}
    >
      {activeSocialLinks.map((link) => (
        <li key={link.id}>
          <a
            className={styles.link}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Adada & Kabbani on ${link.label} (opens in a new tab)`}
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {glyphs[link.id]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

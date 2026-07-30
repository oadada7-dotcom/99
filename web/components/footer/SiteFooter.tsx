import Link from "next/link";
import {
  companyStatement,
  footerCapabilities,
  footerLocations,
  footerNavigation,
  legalLine,
} from "@/data/footer";
import { establishedLine } from "@/data/menu";
import { BrandMark } from "@/components/ui/BrandMark";
import { SocialLinks } from "@/components/ui/SocialLinks";
import styles from "./SiteFooter.module.css";

/**
 * Footer — spec section 14.
 *
 * Compact and content-driven: the height is whatever the content needs. The
 * wordmark opens it, the social row sits directly beneath, and the two
 * addresses close the grid. Contact rows with no approved value are omitted
 * rather than filled with a placeholder.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer} data-header-tone="light">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link
            className={styles.brandMark}
            href="/"
            aria-label="Adada & Kabbani — home"
          >
            <BrandMark variant="wordmark" className={styles.wordmark} />
          </Link>
          <SocialLinks tone="light" className={styles.social} />
        </div>

        <hr className={styles.rule} />

        <div className={styles.grid}>
          <div className={styles.statementColumn}>
            <p className={styles.statement}>{companyStatement}</p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <h2 className={styles.columnTitle}>Navigation</h2>
            <ul className={styles.list}>
              {footerNavigation.map((link) => (
                <li key={link.label}>
                  <Link className={styles.link} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Capabilities</h2>
            <ul className={styles.list}>
              {footerCapabilities.map((link) => (
                <li key={link.label}>
                  <Link className={styles.link} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerLocations.map((location) => (
            <div key={location.id} className={styles.column}>
              <h2 className={styles.columnTitle}>{location.label}</h2>
              <address className={styles.address}>
                {location.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                {location.phone ? (
                  <a className={styles.link} href={`tel:${location.phone}`}>
                    {location.phone}
                  </a>
                ) : null}
                {location.email ? (
                  <a className={styles.link} href={`mailto:${location.email}`}>
                    {location.email}
                  </a>
                ) : null}
              </address>
            </div>
          ))}
        </div>

        <hr className={styles.rule} />

        <div className={styles.legal}>
          <p className={styles.legalText}>{legalLine}</p>
          <p className={styles.established}>{establishedLine}</p>
        </div>
      </div>
    </footer>
  );
}

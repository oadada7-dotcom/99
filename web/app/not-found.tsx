import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import styles from "./not-found.module.css";

/**
 * Branded fallback for the routes the landing page points at that have not
 * been built yet — so a nav item never lands on an unstyled 404, and no link
 * on the page has to be a dead `#`.
 */
export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={`shell ${styles.inner}`}>
        <SectionLabel as="p" className={styles.label}>
          In preparation
        </SectionLabel>
        <h1 className={styles.heading}>
          This page is
          <br />
          being prepared.
        </h1>
        <p className={styles.text}>
          The section you followed is not published yet. In the meantime, the
          landing page carries an overview of every discipline we deliver.
        </p>
        <TextLink href="/" className={styles.link}>
          Return to the homepage
        </TextLink>
      </div>
    </section>
  );
}

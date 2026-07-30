import { routes } from "@/data/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import styles from "./ContactCTA.module.css";

/**
 * Contact CTA — spec section 13.
 *
 * The heading, the supporting paragraph, the location and the action all live
 * in the same right-hand column, stacked beneath one another. The left column
 * carries only the label, so the paragraph is never stranded away from the
 * heading it belongs to. Height is content-driven — no viewport minimum.
 */
export function ContactCTA() {
  return (
    <section
      id="contact"
      className={styles.section}
      data-header-tone="light"
      aria-labelledby="contact-heading"
    >
      <div className={`shell ${styles.inner}`}>
        <SectionLabel as="p" tone="light" className={styles.label}>
          Start a Project
        </SectionLabel>

        <div className={styles.content}>
          <h2 id="contact-heading" className={styles.heading}>
            Begin a conversation
            <br />
            about your project.
          </h2>

          <div className={styles.details}>
            <div className={styles.detailsText}>
              <p className={styles.support}>
                From private residences to hospitality and professional culinary
                environments, our team brings design, manufacturing and delivery
                together.
              </p>
              <p className={styles.location}>Jeddah, Saudi Arabia</p>
            </div>

            <TextLink
              href={routes.contact}
              arrow="diagonal"
              tone="light"
              size="md"
              className={styles.action}
            >
              Contact us
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}

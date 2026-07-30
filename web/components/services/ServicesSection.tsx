import { routes } from "@/data/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { ServicesCarousel } from "./ServicesCarousel";
import styles from "./ServicesSection.module.css";

/**
 * What We Deliver — spec section 11.
 *
 * A stable two-column composition. The introduction is a sibling grid cell,
 * not an overlay, so it is structurally incapable of being covered, collapsed
 * or faded by the carousel beside it.
 */
export function ServicesSection() {
  return (
    <section
      id="what-we-deliver"
      className={styles.section}
      data-header-tone="dark"
      aria-labelledby="what-we-deliver-heading"
    >
      <div className={`shell ${styles.inner}`}>
        <div className={styles.intro}>
          <SectionLabel as="p" className={styles.introLabel}>
            What We Deliver
          </SectionLabel>

          <h2 id="what-we-deliver-heading" className={styles.introHeading}>
            Every interior
            <br />
            discipline,
            <br />
            brought together.
          </h2>

          <p className={styles.introText}>
            From complete fit-out to specialist kitchens and bespoke joinery,
            each division is delivered with one standard of precision.
          </p>

          <TextLink href={routes.capabilities} className={styles.introLink}>
            Explore all capabilities
          </TextLink>
        </div>

        <ServicesCarousel />
      </div>
    </section>
  );
}

import { routes } from "@/data/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/TextLink";
import { ProjectCarousel } from "./ProjectCarousel";
import styles from "./SelectedWorkSection.module.css";

/**
 * Selected Work — spec section 12.
 *
 * Sits directly against What We Deliver on a distinctly warmer stone ground,
 * separated by a single hairline rather than a gap, so the two sections read as
 * consecutive spreads in one document.
 */
export function SelectedWorkSection() {
  return (
    <section
      id="selected-work"
      className={styles.section}
      data-header-tone="dark"
      aria-labelledby="selected-work-heading"
    >
      <div className={`shell ${styles.inner}`}>
        <div className={styles.intro}>
          <SectionLabel as="p" className={styles.introLabel}>
            Selected Work
          </SectionLabel>

          <h2 id="selected-work-heading" className={styles.introHeading}>
            Projects shaped by
            <br />
            material, precision
            <br />
            and place.
          </h2>

          <TextLink href={routes.selectedWork} className={styles.introLink}>
            View all projects
          </TextLink>
        </div>

        <ProjectCarousel />
      </div>
    </section>
  );
}

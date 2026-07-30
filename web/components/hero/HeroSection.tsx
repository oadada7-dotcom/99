"use client";

import { useRef } from "react";
import { heroChapters, heroIntro } from "@/data/hero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { HeroMedia } from "./HeroMedia";
import { useHeroScrub } from "./useHeroScrub";
import styles from "./HeroSection.module.css";

/**
 * Full-bleed pinned hero — spec section 8.
 *
 * The stage stays full bleed from the first frame to the last: it never
 * contracts into a framed card at the end of the sequence. Chapter captions
 * are pre-rendered and crossfaded by the timeline, so the whole scrub runs
 * without a single React render.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = useReducedMotion();

  useHeroScrub({ sectionRef, videoRef, reducedMotion });

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      data-header-tone="light"
      aria-label="Adada & Kabbani — from the measured drawing to the finished room"
    >
      <div className={styles.stage} data-hero-stage>
        <HeroMedia videoRef={videoRef} reducedMotion={reducedMotion} />

        <div className={styles.content}>
          <div className={styles.intro} data-hero-intro>
            <SectionLabel tone="light" className={styles.introLabel}>
              {heroIntro.label}
            </SectionLabel>
            <h1 className={styles.introHeading}>{heroIntro.heading}</h1>
            <p className={styles.introSupport}>{heroIntro.support}</p>
          </div>

          <div className={styles.footerRow} data-hero-footer>
            <div className={styles.captions}>
              {heroChapters.map((chapter) => (
                <p
                  key={chapter.id}
                  className={styles.caption}
                  data-hero-caption={chapter.id}
                  data-start={chapter.start}
                  data-end={chapter.end}
                  /* The first caption is visible at rest; the timeline fades
                     the others in on their boundaries. */
                  style={{ opacity: chapter.start === 0 ? 1 : 0 }}
                >
                  <span className={styles.captionIndex}>{chapter.index}</span>
                  <span className={styles.captionRule} aria-hidden="true" />
                  <span className={styles.captionText}>{chapter.caption}</span>
                </p>
              ))}
            </div>

            <p className={styles.cue} data-hero-cue>
              <span>{heroIntro.scrollCue}</span>
              <span className={styles.cueRule} aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

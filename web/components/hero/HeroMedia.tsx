"use client";

import Image from "next/image";
import type { RefObject } from "react";
import {
  drawingHandoverEnd,
  drawingRevealEnd,
  heroChapters,
  heroMaster,
  heroPoster,
} from "@/data/hero";
import styles from "./HeroSection.module.css";

type HeroMediaProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  reducedMotion: boolean;
};

const handoverSpan = drawingHandoverEnd - drawingRevealEnd;

/**
 * The hero media stack — spec section 8.
 *
 * Bottom to top:
 *   1. A charcoal material base. Never removed, so the hero can never flash
 *      empty at any point, on any connection.
 *   2. The measured drawing, revealed by clip path across 0–12%.
 *   3. The four photographic chapters, each crossfading on its boundary.
 *      These are the fallback sequence, and they double as the underlay for
 *      the video — which is why the fallback needs no branching logic.
 *   4. One persistent <video>, never unmounted, never display:none. Its own
 *      opacity is gated on `data-ready`, so it can only appear once it has
 *      frames; the layer's timeline opacity multiplies with it.
 *   5. A limited legibility scrim for the overlaid type.
 *
 * Every layer uses the identical cover crop, so the composition never jumps
 * between drawing, poster, video and fallback frame.
 */
export function HeroMedia({ videoRef, reducedMotion }: HeroMediaProps) {
  const [drawing, ...photographic] = heroChapters;

  return (
    <div className={styles.media}>
      <span className={styles.mediaBase} aria-hidden="true" />

      <div className={styles.layer} data-hero-layer="drawing">
        <Image
          className={styles.mediaImage}
          src={drawing.still}
          alt={drawing.alt}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          draggable={false}
        />
      </div>

      {photographic.map((chapter, index) => {
        /* The villa exterior resolves exactly as the drawing clears; later
           chapters crossfade tightly around their own boundary. */
        const isHandover = index === 0;
        const at = isHandover
          ? drawingRevealEnd + handoverSpan / 2
          : chapter.start;
        const fade = isHandover ? handoverSpan : 0.06;

        return (
          <div
            key={chapter.id}
            className={styles.layer}
            data-hero-still={chapter.id}
            data-at={at}
            data-fade={fade}
          >
            <Image
              className={styles.mediaImage}
              src={chapter.still}
              alt={chapter.alt}
              fill
              sizes="100vw"
              priority={isHandover}
              fetchPriority={isHandover ? "high" : "auto"}
              draggable={false}
            />
          </div>
        );
      })}

      {/*
        Under reduced motion the sequence runs on the stills alone, so the
        clip is not requested at all.
      */}
      {reducedMotion ? null : (
        <div className={styles.layer} data-hero-video-layer>
          <video
            ref={videoRef}
            className={styles.mediaVideo}
            muted
            playsInline
            preload="auto"
            poster={heroPoster}
            aria-hidden="true"
            tabIndex={-1}
            data-ready="false"
          >
            <source src={heroMaster} type="video/mp4" />
          </video>
        </div>
      )}

      <span className={styles.scrim} aria-hidden="true" />
    </div>
  );
}

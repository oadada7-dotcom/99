"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./EditorialImage.module.css";

export type EditorialImageTone = "stone" | "bone" | "charcoal";

type EditorialImageProps = {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the wrapper, e.g. "16 / 9". Omit when `cover`. */
  ratio?: string;
  sizes: string;
  /**
   * Above-the-fold or first-in-carousel. Renders eagerly at full opacity with
   * high fetch priority and no fade, so the first paint is the photograph
   * itself rather than a transition — spec section 12.
   */
  priority?: boolean;
  /** Fills the positioned parent instead of establishing its own ratio box. */
  cover?: boolean;
  /** Tone of the material panel that sits beneath the photograph. */
  tone?: EditorialImageTone;
  className?: string;
  /** Applied to the <img> itself, for crop or transform overrides. */
  imageClassName?: string;
  quality?: number;
};

/**
 * A photograph on a permanent material panel.
 *
 * The panel is a tonal surface rendered *beneath* the image and never removed.
 * That is what guarantees the two behaviours the brief calls out repeatedly:
 * the container can never flash empty before the media resolves, and a missing
 * or failed asset degrades to an intentional warm surface rather than a broken
 * image. The wrapper also owns the aspect ratio, so nothing shifts on load.
 */
export function EditorialImage({
  src,
  alt,
  ratio,
  sizes,
  priority = false,
  cover = false,
  tone = "stone",
  className,
  imageClassName,
  quality,
}: EditorialImageProps) {
  const [state, setState] = useState<"pending" | "ready" | "failed">(
    priority ? "ready" : "pending",
  );

  return (
    <div
      className={[styles.frame, cover ? styles.cover : "", className]
        .filter(Boolean)
        .join(" ")}
      data-tone={tone}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <span className={styles.panel} aria-hidden="true" />
      {state !== "failed" ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          draggable={false}
          className={[styles.image, imageClassName].filter(Boolean).join(" ")}
          data-state={state}
          onLoad={() => setState("ready")}
          onError={() => setState("failed")}
        />
      ) : null}
    </div>
  );
}

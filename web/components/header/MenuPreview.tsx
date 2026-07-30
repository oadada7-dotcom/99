"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { menuPreviews, type MenuPreview as PreviewData } from "@/data/menu-previews";
import styles from "./FullscreenMenu.module.css";

type MenuPreviewProps = {
  /** The entry the pointer or keyboard is currently on. */
  activeId: string;
  /** Falls back to this whenever nothing is hovered or focused. */
  defaultId: string;
  reducedMotion: boolean;
};

const CROSSFADE_MS = 540;

/**
 * The persistent right-hand preview — spec section 15.
 *
 * Two layers, never one. The displayed photograph stays put in the base layer
 * while the incoming one loads in the layer above at zero opacity, and the
 * crossfade only begins once that image reports decoded. The panel therefore
 * cannot flash empty — not on a slow connection, not on a missing file, not
 * when the pointer sweeps down the whole list at speed.
 */
export function MenuPreview({
  activeId,
  defaultId,
  reducedMotion,
}: MenuPreviewProps) {
  const resolve = (id: string): string =>
    menuPreviews[id] ? id : defaultId;

  const [shownId, setShownId] = useState(() => resolve(defaultId));
  const [incomingId, setIncomingId] = useState<string | null>(null);
  const swapTimer = useRef<number | null>(null);

  const wanted = resolve(activeId);

  useEffect(() => {
    if (wanted === shownId) {
      // Sweeping back to the displayed entry cancels any pending change.
      setIncomingId(null);
      return;
    }
    setIncomingId(wanted);
  }, [wanted, shownId]);

  useEffect(
    () => () => {
      if (swapTimer.current !== null) window.clearTimeout(swapTimer.current);
    },
    [],
  );

  /* Promote the incoming layer only after its crossfade has completed, so the
     base layer is already showing a cached image when it takes over. */
  const onIncomingReady = (id: string) => {
    if (swapTimer.current !== null) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(
      () => {
        setShownId(id);
        setIncomingId((current) => (current === id ? null : current));
      },
      reducedMotion ? 160 : CROSSFADE_MS,
    );
  };

  return (
    <div className={styles.preview}>
      <span className={styles.previewBase} aria-hidden="true" />

      <PreviewLayer
        key={`base-${shownId}`}
        id={shownId}
        preview={menuPreviews[shownId]}
        visible
        reducedMotion={reducedMotion}
      />

      {incomingId && incomingId !== shownId ? (
        <PreviewLayer
          key={`incoming-${incomingId}`}
          id={incomingId}
          preview={menuPreviews[incomingId]}
          visible={false}
          reducedMotion={reducedMotion}
          onReady={() => onIncomingReady(incomingId)}
        />
      ) : null}
    </div>
  );
}

type PreviewLayerProps = {
  id: string;
  preview: PreviewData;
  /** The base layer is visible immediately; an incoming layer fades itself in. */
  visible: boolean;
  reducedMotion: boolean;
  onReady?: () => void;
};

function PreviewLayer({
  id,
  preview,
  visible,
  reducedMotion,
  onReady,
}: PreviewLayerProps) {
  const [ready, setReady] = useState(visible);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /* Only the layer on screen plays; nothing loops off-screen. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    if (ready || visible) {
      void video.play().catch(() => {
        /* Autoplay refusal is fine — the poster carries the frame. */
      });
    } else {
      video.pause();
    }
  }, [ready, visible, reducedMotion]);

  return (
    <div
      className={styles.previewLayer}
      data-ready={ready ? "true" : "false"}
      data-reduced={reducedMotion ? "true" : "false"}
      aria-hidden="true"
    >
      {failed ? null : (
        <Image
          className={styles.previewImage}
          src={preview.poster}
          alt=""
          fill
          sizes="(max-width: 1024px) 0px, 38vw"
          draggable={false}
          onLoad={() => {
            setReady(true);
            onReady?.();
          }}
          onError={() => {
            /* Drop the element so it cannot render a broken-image glyph, and
               report ready so the crossfade sequence never stalls. The
               charcoal base beneath stays as the surface. */
            setFailed(true);
            setReady(true);
            onReady?.();
          }}
        />
      )}

      {preview.video && !reducedMotion ? (
        <video
          ref={videoRef}
          className={styles.previewVideo}
          src={preview.video}
          poster={preview.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          data-key={id}
        />
      ) : null}
    </div>
  );
}

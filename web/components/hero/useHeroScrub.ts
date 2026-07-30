"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  drawingHandoverEnd,
  drawingRevealEnd,
  heroScrollPercent,
} from "@/data/hero";

/**
 * Hero scroll controller — spec section 8.
 *
 * Design notes that matter:
 *
 * 1. Setup never waits on the video. Pinning, the drawing reveal, the still
 *    chapter progression and the header collapse are all established on mount.
 *    If the video never becomes seekable the hero still works, in both
 *    directions, because the still layers carry the sequence on their own and
 *    the video simply never fades in on top of them.
 *
 * 2. Nothing here touches React state. Progress lives in refs and is written
 *    straight to the DOM, so scrubbing costs no renders.
 *
 * 3. Seeks are coalesced. While the element is seeking, the newest target is
 *    parked in `pendingSeekRef` and applied once on `seeked` — so a fast
 *    flick produces one catch-up seek rather than a queue of stale ones.
 */

type Options = {
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  reducedMotion: boolean;
};

function isVideoUsable(video: HTMLVideoElement): boolean {
  return (
    video.readyState >= HTMLMediaElement.HAVE_METADATA &&
    Number.isFinite(video.duration) &&
    video.duration > 0
  );
}

export function useHeroScrub({ sectionRef, videoRef, reducedMotion }: Options) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const videoReadyRef = { current: false };
    const targetTimeRef = { current: 0 };
    const pendingSeekRef = { current: null as number | null };

    const requestSeek = (video: HTMLVideoElement, nextTime: number) => {
      if (!videoReadyRef.current) return;
      if (!Number.isFinite(nextTime)) return;

      const safeTime = Math.max(
        0,
        Math.min(nextTime, Math.max(0, video.duration - 0.001)),
      );

      // Sub-frame moves are not worth a seek.
      if (Math.abs(video.currentTime - safeTime) < 0.015) return;

      if (video.seeking) {
        pendingSeekRef.current = safeTime;
        return;
      }

      video.currentTime = safeTime;
    };

    const context = gsap.context(() => {
      const select = gsap.utils.selector(section);
      const stage = select("[data-hero-stage]")[0];
      const drawing = select("[data-hero-layer='drawing']")[0];
      const videoLayer = select("[data-hero-video-layer]")[0];
      const chapterStills = select("[data-hero-still]");
      const captions = select("[data-hero-caption]");
      const intro = select("[data-hero-intro]")[0];
      const scrollCue = select("[data-hero-cue]")[0];

      /* Timeline length is fixed at 1 so every position below reads directly
         as a fraction of scroll progress — the mapping in spec section 8. */
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${heroScrollPercent}%`,
          scrub: true,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const video = videoRef.current;
            if (!video || reducedMotion) return;

            const progress = self.progress;
            const span = 1 - drawingHandoverEnd;

            /* The master clip begins at the villa exterior: the drawing is a
               separate still, so the video owns the remaining scroll span. */
            const videoProgress =
              span <= 0
                ? 0
                : Math.min(1, Math.max(0, (progress - drawingHandoverEnd) / span));

            /* Duration is read live, never hardcoded. */
            targetTimeRef.current = videoProgress * video.duration;
            requestSeek(video, targetTimeRef.current);
          },
        },
      });

      timeline.to({}, { duration: 1 }, 0);

      /* 0 → 12%: the measured drawing plots in. A clip reveal, not a fade,
         so it reads as a drawing being produced. */
      timeline.fromTo(
        drawing,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: drawingRevealEnd },
        0,
      );

      /* 12 → 20%: drawing hands over to the villa exterior. */
      const handover = drawingHandoverEnd - drawingRevealEnd;
      timeline.to(
        drawing,
        { opacity: 0, duration: handover },
        drawingRevealEnd,
      );

      /* Each chapter still crossfades in around its boundary. These carry the
         sequence when the video is unavailable, and sit harmlessly beneath it
         when it is not. */
      chapterStills.forEach((still) => {
        const at = Number.parseFloat(still.getAttribute("data-at") ?? "0");
        const fade = Number.parseFloat(still.getAttribute("data-fade") ?? "0.06");
        timeline.fromTo(
          still,
          { opacity: 0 },
          { opacity: 1, duration: fade },
          Math.max(0, at - fade / 2),
        );
      });

      /* The video layer opens just before the handover completes. Its inner
         <video> carries a second opacity driven by readiness, so the two
         multiply: the clip can only appear once it actually has frames. */
      if (!reducedMotion && videoLayer) {
        timeline.fromTo(
          videoLayer,
          { opacity: 0 },
          { opacity: 1, duration: handover },
          drawingRevealEnd,
        );
      }

      /* Chapter captions crossfade on their boundaries — no React state. */
      captions.forEach((caption) => {
        const start = Number.parseFloat(caption.getAttribute("data-start") ?? "0");
        const end = Number.parseFloat(caption.getAttribute("data-end") ?? "1");
        const fade = 0.035;

        if (start > 0) {
          timeline.fromTo(
            caption,
            { opacity: 0 },
            { opacity: 1, duration: fade },
            Math.max(0, start - fade / 2),
          );
        }
        if (end < 1) {
          timeline.to(caption, { opacity: 0, duration: fade }, end - fade / 2);
        }
      });

      /* The opening statement clears early so the imagery can take over. */
      if (intro) {
        timeline.to(
          intro,
          reducedMotion
            ? { opacity: 0, duration: 0.06 }
            : { opacity: 0, y: -28, duration: 0.09 },
          0.015,
        );
      }

      if (scrollCue) {
        timeline.to(scrollCue, { opacity: 0, duration: 0.05 }, 0.01);
      }

      /* The caption row clears during the final frame hold. Without this it is
         still on screen as the hero unpins and travels up under the fixed
         header, where it would collide with the monogram — spec section 7
         requires the monogram's zone to stay clear of section labels. */
      const footerRow = select("[data-hero-footer]")[0];
      if (footerRow) {
        timeline.to(footerRow, { opacity: 0, duration: 0.05 }, 0.94);
      }
    }, section);

    /* ---------------------------------------------------------------------
       Video readiness. Bound after the timeline exists, never gating it.
       --------------------------------------------------------------------- */
    const video = videoRef.current;
    let detachMedia = () => {};

    if (video && !reducedMotion) {
      const markReady = () => {
        const ready = isVideoUsable(video);
        if (ready === videoReadyRef.current) return;
        videoReadyRef.current = ready;
        video.dataset.ready = ready ? "true" : "false";

        if (ready) {
          // Land on the frame the current scroll position implies.
          requestSeek(video, targetTimeRef.current);
          ScrollTrigger.refresh();
        }
      };

      const onSeeked = () => {
        const pending = pendingSeekRef.current;
        pendingSeekRef.current = null;
        // Only the newest target is honoured; stale ones are dropped.
        if (pending !== null) requestSeek(video, pending);
      };

      const onFailure = () => {
        videoReadyRef.current = false;
        pendingSeekRef.current = null;
        video.dataset.ready = "false";
      };

      const readyEvents = [
        "loadedmetadata",
        "durationchange",
        "loadeddata",
        "canplay",
      ] as const;

      readyEvents.forEach((event) => video.addEventListener(event, markReady));
      video.addEventListener("seeked", onSeeked);
      video.addEventListener("error", onFailure);
      video.addEventListener("emptied", onFailure);
      video.addEventListener("stalled", markReady);

      /* Called exactly once, on mount — never during scroll updates. */
      video.load();
      markReady();

      detachMedia = () => {
        readyEvents.forEach((event) =>
          video.removeEventListener(event, markReady),
        );
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onFailure);
        video.removeEventListener("emptied", onFailure);
        video.removeEventListener("stalled", markReady);
      };
    }

    /* Metrics change once webfonts settle; recompute the pin then. */
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      detachMedia();
      context.revert();
    };
  }, [sectionRef, videoRef, reducedMotion]);
}

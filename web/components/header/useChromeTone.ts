"use client";

import { useEffect } from "react";
import { useChrome } from "@/components/chrome/ChromeContext";

/**
 * Keeps the fixed chrome legible against whatever is beneath it.
 *
 * Every major section declares `data-header-tone`. This watches a 1px-tall
 * detection band across the viewport at the header's optical centre and adopts
 * the tone of whichever section is crossing it, so the monogram and controls
 * switch between warm bone and oxblood independently of the hero timeline —
 * spec section 7.
 *
 * Deliberately *not* built on scroll-position triggers. The hero pin adds
 * roughly 5000px to the document after the header has already mounted, and any
 * precomputed start/end offsets are stale from that moment on — which showed up
 * as the header reading "dark" over the hero and "light" over the bone
 * sections. A viewport-relative band has no offsets to invalidate.
 *
 * Cost is a threshold crossing, not a scroll handler: nothing runs while
 * scrolling within a single section.
 */
export function useChromeTone() {
  const { setTone } = useChrome();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let resizeTimer = 0;

    const build = () => {
      observer?.disconnect();

      const headerHeight =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--header-height",
          ),
        ) || 104;

      const line = Math.round(headerHeight / 2);
      const below = Math.max(0, window.innerHeight - line - 1);

      observer = new IntersectionObserver(
        (entries) => {
          const crossing = entries.filter((entry) => entry.isIntersecting);
          if (crossing.length === 0) return;

          /* Sections are sequential, so at most one truly crosses the band.
             If a boundary lands exactly on it, the lower section wins. */
          const winner = crossing.reduce((lowest, entry) =>
            entry.boundingClientRect.top > lowest.boundingClientRect.top
              ? entry
              : lowest,
          );

          setTone(
            winner.target.getAttribute("data-header-tone") === "dark"
              ? "dark"
              : "light",
          );
        },
        { rootMargin: `-${line}px 0px -${below}px 0px`, threshold: 0 },
      );

      document
        .querySelectorAll<HTMLElement>("[data-header-tone]")
        .forEach((section) => observer?.observe(section));
    };

    build();

    /* The band's height depends on the viewport, including dvh changes when
       mobile browser chrome shows and hides. */
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [setTone]);
}

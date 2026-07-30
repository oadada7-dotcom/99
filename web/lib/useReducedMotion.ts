"use client";

import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion`. Starts `false` so server and first client
 * render agree, then corrects in an effect — the transition-based fallbacks in
 * CSS already cover the first frame.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

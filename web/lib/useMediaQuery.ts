"use client";

import { useEffect, useState } from "react";

/**
 * Matches a media query on the client.
 *
 * Always `false` on the server and on first paint, so markup is deterministic.
 * The only consumer is the fullscreen menu, which is closed at that moment —
 * so the correction after hydration is never visible.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

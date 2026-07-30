"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";

type SwipeHandlers = {
  onNext: () => void;
  onPrevious: () => void;
};

/**
 * Horizontal swipe for the carousels.
 *
 * Deliberately conservative: a gesture only counts if it travels far enough
 * horizontally and stays mostly horizontal, so vertical page scrolling is never
 * hijacked. Returns props for the element that should receive the gesture.
 */
export function useSwipe({ onNext, onPrevious }: SwipeHandlers) {
  const origin = useRef<{ x: number; y: number; id: number } | null>(null);

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return;
    origin.current = {
      x: event.clientX,
      y: event.clientY,
      id: event.pointerId,
    };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = origin.current;
    origin.current = null;
    if (!start || start.id !== event.pointerId) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) < 44) return;
    if (Math.abs(dx) < Math.abs(dy) * 1.4) return;

    if (dx < 0) onNext();
    else onPrevious();
  };

  return {
    onPointerDown,
    onPointerUp,
    onPointerCancel: () => {
      origin.current = null;
    },
  };
}

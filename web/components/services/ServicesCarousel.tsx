"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/data/services";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { useSwipe } from "@/lib/useSwipe";
import styles from "./ServicesSection.module.css";

const pad = (value: number) => String(value + 1).padStart(2, "0");
const total = String(services.length).padStart(2, "0");

/**
 * Service carousel — spec section 11.
 *
 * A single translated track inside a clipped viewport. That one mechanism gives
 * the brief's whole choreography for free: on Next the active card travels left
 * and disappears *within* the carousel viewport while the following card takes
 * the active position and a fresh neighbour enters from the right; on Previous
 * the reverse. Nothing can pass beneath the intro column, because the intro is
 * a sibling grid cell and the viewport clips its own contents.
 *
 * The card aspect never changes during movement, the control group never
 * animates, and only the active card is reachable by keyboard.
 */
export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const lockRef = useRef(false);

  const lastIndex = services.length - 1;

  /* One transition at a time — a repeated click cannot stack movements. */
  const goNext = useCallback(() => {
    setIndex((current) => {
      if (lockRef.current || current >= lastIndex) return current;
      lockRef.current = true;
      return current + 1;
    });
  }, [lastIndex]);

  const goPrevious = useCallback(() => {
    setIndex((current) => {
      if (lockRef.current || current <= 0) return current;
      lockRef.current = true;
      return current - 1;
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const release = () => {
      lockRef.current = false;
    };

    track.addEventListener("transitionend", release);
    /* Safety net for the case where the transition never fires — a reduced
       motion setting, or a tab backgrounded mid-move. */
    const timer = window.setTimeout(release, 900);

    return () => {
      track.removeEventListener("transitionend", release);
      window.clearTimeout(timer);
    };
  }, [index]);

  const swipe = useSwipe({ onNext: goNext, onPrevious: goPrevious });

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.viewport}
        role="group"
        aria-roledescription="carousel"
        aria-label="Our disciplines"
        onKeyDown={onKeyDown}
        {...swipe}
      >
        <ul
          ref={trackRef}
          className={styles.track}
          style={{ transform: `translate3d(calc(${-index} * var(--card-step)), 0, 0)` }}
        >
          {services.map((service, position) => {
            const isActive = position === index;

            return (
              <li
                key={service.id}
                className={styles.card}
                data-active={isActive ? "true" : "false"}
                aria-roledescription="slide"
                aria-label={`${pad(position)} of ${total} — ${service.title}`}
                /* Off-position cards stay rendered but unreachable, so the
                   keyboard can never land on a card outside the viewport. */
                inert={!isActive}
              >
                <EditorialImage
                  src={service.image}
                  alt={service.alt}
                  cover
                  tone="charcoal"
                  sizes="(max-width: 900px) 88vw, (max-width: 1280px) 56vw, 46vw"
                  priority={position === 0}
                />

                <span className={styles.cardScrim} aria-hidden="true" />
                <span className={styles.cardGhost} aria-hidden="true">
                  {pad(position)}
                </span>

                <div className={styles.cardBody}>
                  <span className={styles.cardNumber}>{pad(position)}</span>
                  <h3 className={styles.cardTitle}>
                    <Link className={styles.cardLink} href={service.href}>
                      {service.title}
                    </Link>
                  </h3>
                  <p className={styles.cardText}>{service.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Announced politely, so a screen reader hears the change without the
          controls stealing focus — spec section 18. */}
      <p className="sr-only" aria-live="polite">
        {`Service ${pad(index)} of ${total}: ${services[index].title}`}
      </p>

      <div className={styles.controls}>
        <p className={styles.counter}>
          <span className={styles.counterCurrent}>{pad(index)}</span>
          <span className={styles.counterDivider} aria-hidden="true">
            /
          </span>
          <span className={styles.counterTotal}>{total}</span>
        </p>

        <div className={styles.buttons}>
          <span className={styles.buttonSlot}>
            <ArrowButton
              direction="left"
              variant="outline"
              label="Previous discipline"
              disabled={index === 0}
              onClick={goPrevious}
            />
            <span className={styles.buttonCaption} aria-hidden="true">
              Prev
            </span>
          </span>

          <span className={styles.buttonSlot}>
            <ArrowButton
              direction="right"
              variant="solid"
              label="Next discipline"
              disabled={index === lastIndex}
              onClick={goNext}
            />
            <span className={styles.buttonCaption} aria-hidden="true">
              Next
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

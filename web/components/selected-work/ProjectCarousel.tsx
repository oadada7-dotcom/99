"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { TextLink } from "@/components/ui/TextLink";
import { useSwipe } from "@/lib/useSwipe";
import styles from "./SelectedWorkSection.module.css";

const pad = (value: number) => String(value + 1).padStart(2, "0");
const total = String(projects.length).padStart(2, "0");

/**
 * Selected Work carousel — spec section 12.
 *
 * Every project's photograph stays mounted in a stacked 16:9 frame and is
 * crossfaded with a short directional offset. Keeping them mounted is what
 * removes the blank flash entirely: a photograph that has already decoded is
 * never re-requested when you come back to it.
 *
 * Loading order is deliberate. The first photograph is eager, high priority and
 * rendered at full opacity — it must be resolved before the section scrolls into
 * view. Only once it reports ready does its immediate neighbour begin loading;
 * everything after that stays lazy.
 */
export function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [firstReady, setFirstReady] = useState(false);
  /* A photograph that cannot load is removed rather than left to render the
     browser's broken-image glyph over the warm-stone ground. */
  const [failed, setFailed] = useState<Record<string, true>>({});
  const lockRef = useRef(false);
  const lastIndex = projects.length - 1;

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
    const timer = window.setTimeout(() => {
      lockRef.current = false;
    }, 860);
    return () => window.clearTimeout(timer);
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

  const active = projects[index];

  return (
    <div className={styles.carousel}>
      <div
        className={styles.media}
        role="group"
        aria-roledescription="carousel"
        aria-label="Selected projects"
        onKeyDown={onKeyDown}
        {...swipe}
      >
        {projects.map((project, position) => {
          const isActive = position === index;
          const isFirst = position === 0;
          /* The neighbour is fetched only after the opening frame is ready. */
          const isNeighbour = Math.abs(position - index) === 1;
          const eager = isFirst || (firstReady && isNeighbour);

          return (
            <div
              key={project.id}
              className={styles.mediaLayer}
              data-active={isActive ? "true" : "false"}
              data-side={
                position === index ? "active" : position < index ? "before" : "after"
              }
              aria-hidden={!isActive}
            >
              {failed[project.id] ? null : (
                <Image
                  className={styles.mediaImage}
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, (max-width: 1280px) 62vw, 56vw"
                  priority={isFirst}
                  loading={eager ? "eager" : "lazy"}
                  fetchPriority={isFirst ? "high" : "auto"}
                  draggable={false}
                  onLoad={isFirst ? () => setFirstReady(true) : undefined}
                  onError={() => {
                    setFailed((current) => ({ ...current, [project.id]: true }));
                    /* Don't strand the neighbour's preload behind a file that
                       will never arrive. */
                    if (isFirst) setFirstReady(true);
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <dl className={styles.meta}>
        <div className={styles.metaCell}>
          <dt className={styles.metaValue}>{active.name}</dt>
          <dd className={styles.metaKey}>{active.type}</dd>
        </div>
        <div className={styles.metaCell}>
          <dt className={styles.metaValue}>{active.location}</dt>
          <dd className={styles.metaKey}>Location</dd>
        </div>
        <div className={styles.metaCell}>
          <dt className={styles.metaValue}>{active.discipline}</dt>
          <dd className={styles.metaKey}>Discipline</dd>
        </div>
        <div className={styles.metaCell}>
          <dt className={styles.metaValue}>{active.year}</dt>
          <dd className={styles.metaKey}>Year</dd>
        </div>
      </dl>

      <p className="sr-only" aria-live="polite">
        {`Project ${pad(index)} of ${total}: ${active.name}, ${active.location}`}
      </p>

      <div className={styles.controls}>
        <TextLink href={active.href} arrow="diagonal" tone="dark">
          View project
        </TextLink>

        <div className={styles.controlsRight}>
          <p className={styles.counter}>
            <span className={styles.counterCurrent}>{pad(index)}</span>
            <span aria-hidden="true" className={styles.counterDivider}>
              /
            </span>
            <span className={styles.counterTotal}>{total}</span>
          </p>

          <div className={styles.buttons}>
            <ArrowButton
              direction="left"
              variant="outline"
              label="Previous project"
              disabled={index === 0}
              onClick={goPrevious}
            />
            <ArrowButton
              direction="right"
              variant="solid"
              label="Next project"
              disabled={index === lastIndex}
              onClick={goNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

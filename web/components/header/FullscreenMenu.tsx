"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { establishedLine, menuEntries, menuMetadata } from "@/data/menu";
import { defaultPreviewId, menuPreviews } from "@/data/menu-previews";
import { contactHref } from "@/data/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { Chevron } from "@/components/ui/Chevron";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useChrome } from "@/components/chrome/ChromeContext";
import { gsap } from "@/lib/gsap";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MenuPreview } from "./MenuPreview";
import styles from "./FullscreenMenu.module.css";

const pad = (value: number) => String(value + 1).padStart(2, "0");

/**
 * Fullscreen navigation overlay — spec section 15.
 *
 * Stays mounted for its whole lifecycle. `menuOpen` (shared chrome state) is
 * the intent; `visible` is what is actually in the DOM tree, and it only drops
 * once the closing timeline has finished — so the overlay is never torn out
 * from under its own animation.
 */
export function FullscreenMenu() {
  const { menuOpen, closeMenu, menuTriggerRef } = useChrome();
  const reducedMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 1024px)");
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const preloaded = useRef(false);

  useFocusTrap(containerRef, visible && menuOpen);

  /* Mount before animating in. */
  useEffect(() => {
    if (menuOpen) setVisible(true);
  }, [menuOpen]);

  /* Move focus into the dialog on open. Without this it would sit on the burger
     the moment the header goes inert, leaving the browser to relocate it. */
  useEffect(() => {
    if (!visible || !menuOpen) return;
    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [visible, menuOpen]);

  /* Escape closes from anywhere inside the overlay. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeMenu();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  /* Body scroll lock, with the scrollbar's width compensated so the page
     beneath cannot shift sideways as it disappears. */
  useEffect(() => {
    if (!menuOpen) return;

    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty("--scrollbar-gap", `${gap}px`);
    document.body.dataset.scrollLocked = "true";

    return () => {
      delete document.body.dataset.scrollLocked;
      document.documentElement.style.removeProperty("--scrollbar-gap");
    };
  }, [menuOpen]);

  /* Preload the default preview and the first few entries — only once, and
     only when the menu is actually opened. */
  useEffect(() => {
    if (!menuOpen || preloaded.current) return;
    preloaded.current = true;

    const ids = [
      defaultPreviewId,
      ...menuEntries.slice(0, 3).map((entry) => entry.id),
    ];

    new Set(ids).forEach((id) => {
      const preview = menuPreviews[id];
      if (!preview) return;
      const image = new window.Image();
      image.decoding = "async";
      image.src = preview.poster;
    });
  }, [menuOpen]);

  /* Open and close timelines. */
  useEffect(() => {
    if (!visible) return;

    const container = containerRef.current;
    if (!container) return;

    let timeline: gsap.core.Timeline | null = null;

    const context = gsap.context(() => {
      const select = gsap.utils.selector(container);
      const shell = select("[data-menu-shell]");
      const preview = select("[data-menu-preview]");
      const items = select("[data-menu-item]");
      const trailing = select("[data-menu-trailing]");

      if (menuOpen) {
        timeline = gsap.timeline();

        if (reducedMotion) {
          timeline
            .fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.2 })
            .fromTo(
              [...items, ...preview, ...trailing],
              { opacity: 0 },
              { opacity: 1, duration: 0.2 },
              0,
            );
        } else {
          timeline
            .fromTo(
              container,
              { opacity: 0 },
              { opacity: 1, duration: 0.34, ease: "power2.out" },
            )
            .fromTo(
              shell,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, ease: "none" },
              0.04,
            )
            /* Preview arrives from the right. */
            .fromTo(
              preview,
              { xPercent: 9, opacity: 0 },
              {
                xPercent: 0,
                opacity: 1,
                duration: 0.78,
                ease: "power3.out",
              },
              0.06,
            )
            /* Navigation staggers upward. */
            .fromTo(
              items,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.62,
                ease: "power3.out",
                stagger: 0.048,
              },
              0.14,
            )
            /* Social links and metadata last. */
            .fromTo(
              trailing,
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: "none" },
              0.5,
            );
        }
      } else {
        timeline = gsap.timeline({
          onComplete: () => {
            setVisible(false);
            setHoverId(null);
            setExpandedId(null);
            /* Focus returns to the control that opened the overlay. */
            menuTriggerRef.current?.focus();
          },
        });

        if (reducedMotion) {
          timeline.to(container, { opacity: 0, duration: 0.18 });
        } else {
          timeline
            .to(items, { opacity: 0, duration: 0.22, ease: "none" })
            .to(
              preview,
              { xPercent: 4, opacity: 0, duration: 0.34, ease: "power2.in" },
              0.04,
            )
            .to(trailing, { opacity: 0, duration: 0.2, ease: "none" }, 0)
            .to(
              container,
              { opacity: 0, duration: 0.3, ease: "power2.in" },
              0.16,
            );
        }
      }
    }, container);

    return () => {
      timeline?.kill();
      context.revert();
    };
  }, [visible, menuOpen, reducedMotion, menuTriggerRef]);

  const activePreviewId = hoverId ?? defaultPreviewId;

  const onEntryFocus = useCallback((id: string) => setHoverId(id), []);

  return (
    <div
      id="ak-fullscreen-menu"
      ref={containerRef}
      className={styles.menu}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      data-surface="dark"
      data-visible={visible ? "true" : "false"}
      data-closing={visible && !menuOpen ? "true" : "false"}
      inert={!visible}
    >
      <div className={styles.shell} data-menu-shell>
        <div className={styles.top}>
          <Link
            className={styles.topMark}
            href="/"
            aria-label="Adada & Kabbani — home"
            onClick={closeMenu}
          >
            <BrandMark variant="monogram" />
          </Link>

          <div className={styles.topActions}>
            <Link
              className={styles.iconButton}
              href={contactHref}
              aria-label="Contact us"
              onClick={closeMenu}
            >
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4.4 11.6 11.6 4.4" />
                <path d="M5.6 4.4h6v6" />
              </svg>
            </Link>

            <button
              ref={closeButtonRef}
              type="button"
              className={`${styles.iconButton} ${styles.close}`}
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="square"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <nav
            className={styles.nav}
            aria-label="Site"
            onMouseLeave={() => setHoverId(null)}
          >
            <ol className={styles.navList}>
              {menuEntries.map((entry, position) => {
                const isCurrent = entry.href === pathname;
                const isExpanded = expandedId === entry.id;

                return (
                  <li
                    key={entry.id}
                    className={styles.navItem}
                    data-menu-item
                    data-expanded={isExpanded ? "true" : "false"}
                  >
                    <div className={styles.navRow}>
                      <span className={styles.navIndex} aria-hidden="true">
                        {pad(position)}
                      </span>

                      {entry.children ? (
                        isCompact ? (
                          <button
                            type="button"
                            className={styles.navLabel}
                            aria-expanded={isExpanded}
                            aria-controls={`menu-group-${entry.id}`}
                            onClick={() =>
                              setExpandedId(isExpanded ? null : entry.id)
                            }
                            onFocus={() => onEntryFocus(entry.id)}
                            onMouseEnter={() => setHoverId(entry.id)}
                          >
                            <span className={styles.navText}>{entry.label}</span>
                            <Chevron
                              open={isExpanded}
                              size={16}
                              className={styles.navChevron}
                            />
                          </button>
                        ) : (
                          /* On desktop the children are always shown, so the
                             parent is a label rather than a control. */
                          <span
                            className={styles.navLabel}
                            data-static="true"
                            onMouseEnter={() => setHoverId(entry.id)}
                          >
                            <span className={styles.navText}>{entry.label}</span>
                          </span>
                        )
                      ) : (
                        <Link
                          className={styles.navLabel}
                          href={entry.href ?? "/"}
                          aria-current={isCurrent ? "page" : undefined}
                          onFocus={() => onEntryFocus(entry.id)}
                          onMouseEnter={() => setHoverId(entry.id)}
                          onClick={closeMenu}
                        >
                          <span className={styles.navText}>{entry.label}</span>
                          {isCurrent ? (
                            <span
                              className={styles.currentMark}
                              aria-hidden="true"
                            />
                          ) : null}
                        </Link>
                      )}
                    </div>

                    {entry.children ? (
                      <div
                        id={`menu-group-${entry.id}`}
                        className={styles.children}
                        data-open={!isCompact || isExpanded ? "true" : "false"}
                      >
                        <ul className={styles.childList}>
                          {entry.children.map((child) => {
                            const childCurrent = child.href === pathname;
                            return (
                              <li key={child.id}>
                                <Link
                                  className={styles.childLink}
                                  href={child.href}
                                  aria-current={
                                    childCurrent ? "page" : undefined
                                  }
                                  onFocus={() => onEntryFocus(child.id)}
                                  onMouseEnter={() => setHoverId(child.id)}
                                  onClick={closeMenu}
                                  tabIndex={!isCompact || isExpanded ? 0 : -1}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className={styles.previewColumn} data-menu-preview>
            <MenuPreview
              activeId={activePreviewId}
              defaultId={defaultPreviewId}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        <div className={styles.bottom} data-menu-trailing>
          <SocialLinks tone="light" className={styles.bottomSocial} />
          <p className={styles.bottomMeta}>{menuMetadata}</p>
          <p className={styles.bottomEst}>{establishedLine}</p>
        </div>
      </div>
    </div>
  );
}

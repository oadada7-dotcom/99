"use client";

import Link from "next/link";
import { useEffect } from "react";
import { contactHref } from "@/data/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { useChrome } from "@/components/chrome/ChromeContext";
import { DesktopNavigation } from "./DesktopNavigation";
import { useChromeTone } from "./useChromeTone";
import styles from "./SiteHeader.module.css";

/**
 * Fixed global header — spec section 7.
 *
 * Top of page: full wordmark, centred navigation, CONTACT US.
 * Scrolled:    AK monogram, contact action, burger.
 *
 * The header owns a reserved fixed zone at the top of the viewport and is
 * positioned relative to the viewport only — never to a content section — so
 * the monogram can never collide with a section label or heading.
 */
export function SiteHeader() {
  const { collapsed, setCollapsed, tone, menuOpen, openMenu, menuTriggerRef } =
    useChrome();

  useChromeTone();

  /**
   * Collapse is driven by a plain scroll threshold rather than by the hero
   * timeline, so it works identically whether or not the hero video ever
   * becomes seekable — spec section 8 requires the collapse to survive the
   * fallback path.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setCollapsed(window.scrollY > 24);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [setCollapsed]);

  return (
    <header
      className={styles.header}
      data-collapsed={collapsed ? "true" : "false"}
      data-tone={tone}
      /* The open menu supersedes the header; hiding it prevents two stacked
         monograms and keeps the menu's focus trap honest. */
      data-hidden={menuOpen ? "true" : "false"}
      inert={menuOpen}
    >
      <div className={styles.inner}>
        <Link
          className={styles.mark}
          href="/"
          aria-label="Adada & Kabbani — home"
        >
          <span className={styles.markWordmark}>
            <BrandMark variant="wordmark" />
          </span>
          <span className={styles.markMonogram}>
            <BrandMark variant="monogram" />
          </span>
        </Link>

        <DesktopNavigation />

        <div className={styles.actions}>
          <Link className={styles.contactText} href={contactHref}>
            Contact Us
          </Link>

          <Link
            className={styles.iconButton}
            href={contactHref}
            aria-label="Contact us"
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
            ref={menuTriggerRef}
            type="button"
            className={`${styles.iconButton} ${styles.burger}`}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="ak-fullscreen-menu"
            onClick={openMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

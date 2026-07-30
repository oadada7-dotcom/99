"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/data/navigation";
import { Chevron } from "@/components/ui/Chevron";
import styles from "./SiteHeader.module.css";

/**
 * Centred primary navigation — spec section 7.
 *
 * Parents that own children are a single focusable trigger carrying both the
 * label and the chevron. Only `Interior Living` and `Integrated Solutions`
 * have children, so only those two render an indicator.
 *
 * The disclosure opens on hover and on click/Enter, closes on Escape, and
 * closes when focus or the pointer leaves the item — one `openId` for the whole
 * bar, so two panels can never be open at once.
 */
export function DesktopNavigation() {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  /* A short grace period lets the pointer travel from label to panel. */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenId(null), 130);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!openId) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenId(null);
      // Return focus to the trigger that owned the open panel.
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(
        `[data-trigger="${openId}"]`,
      );
      trigger?.focus();
    };

    const onFocusIn = (event: FocusEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenId(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [openId]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Primary">
      <ul className={styles.navList}>
        {primaryNavigation.map((item) => {
          if (!item.children) {
            return (
              <li key={item.id}>
                <Link className={styles.navLink} href={item.href ?? "/"}>
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openId === item.id;
          const panelId = `nav-panel-${item.id}`;

          return (
            <li
              key={item.id}
              className={styles.navItemWithPanel}
              onMouseEnter={() => {
                cancelClose();
                setOpenId(item.id);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={styles.navLink}
                data-trigger={item.id}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                {item.label}
                <Chevron open={isOpen} />
              </button>

              <div
                id={panelId}
                className={styles.panel}
                data-open={isOpen ? "true" : "false"}
                /* Out of the tab order and the a11y tree while closed, without
                   ever unmounting — the CSS also applies visibility: hidden. */
                inert={!isOpen}
              >
                <ul className={styles.panelList}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link className={styles.panelLink} href={child.href}>
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

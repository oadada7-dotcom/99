"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

export type ChromeTone = "light" | "dark";

type ChromeValue = {
  /** True once the page has left the top of the hero. */
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  /**
   * Which ink the fixed chrome needs for contrast against whatever sits under
   * it. `light` = warm bone on dark media, `dark` = oxblood/charcoal on bone.
   */
  tone: ChromeTone;
  setTone: (tone: ChromeTone) => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  /** The burger, so focus can be restored when the menu closes. */
  menuTriggerRef: RefObject<HTMLButtonElement | null>;
};

const ChromeContext = createContext<ChromeValue | null>(null);

/**
 * One state system for the whole fixed chrome — spec section 22 forbids
 * duplicates. The header, the hero scroll controller and the fullscreen menu
 * all read and write here rather than each keeping their own copy.
 *
 * `collapsed` and `tone` flip on threshold crossings, never per scroll frame,
 * so no React work happens while scrubbing.
 */
export function ChromeProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = useState(false);
  const [tone, setToneState] = useState<ChromeTone>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Guarded setters: identical values must not trigger a re-render.
  const setCollapsed = useCallback((next: boolean) => {
    setCollapsedState((current) => (current === next ? current : next));
  }, []);

  const setTone = useCallback((next: ChromeTone) => {
    setToneState((current) => (current === next ? current : next));
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const value = useMemo<ChromeValue>(
    () => ({
      collapsed,
      setCollapsed,
      tone,
      setTone,
      menuOpen,
      openMenu,
      closeMenu,
      menuTriggerRef,
    }),
    [collapsed, setCollapsed, tone, setTone, menuOpen, openMenu, closeMenu],
  );

  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>;
}

export function useChrome(): ChromeValue {
  const value = useContext(ChromeContext);
  if (!value) {
    throw new Error("useChrome must be used inside ChromeProvider");
  }
  return value;
}

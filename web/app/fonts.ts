import { Inter, Newsreader } from "next/font/google";

/**
 * Two families only, used consistently across every section.
 *
 * `--font-display` — editorial serif for display headings and long-form
 *   support copy. Optical sizing keeps the 106px hero heading and the 19px
 *   paragraph on the same voice without either looking mechanical.
 * `--font-meta` — neutral face reserved for wide-tracked uppercase labels,
 *   metadata, counters and control text. Never used for display.
 *
 * BRAND SWAP: Adada & Kabbani's approved display face is Optima. When the
 * licensed webfont files are supplied, drop them in
 * `public/assets/brand/fonts/` and replace the `newsreader` declaration below
 * with a `next/font/local` declaration exposing the same
 * `--font-display` variable. Nothing else in the codebase needs to change.
 */
export const displaySerif = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

export const metaSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-meta",
});

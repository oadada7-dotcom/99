# Adada &amp; Kabbani — Landing Page

A standalone, dependency-free implementation of the **Adada & Kabbani Landing**
design (imported from the Claude Design project *"Design Taste Frontend"*,
file `Adada & Kabbani Landing.dc.html`).

The original was a Claude **design-container** file (`.dc.html`) that relied on a
proprietary `support.js` runtime (`<x-dc>` custom element, `style-hover`
attributes, a `DCLogic` React component). This version is a plain static site
with **no runtime dependency** — open `index.html` in any browser.

## Run

```bash
# any static server, e.g.
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Opening `index.html` directly via `file://` also works, though a local server is
recommended so the fonts and `<video>` load without cross-origin quirks.

## What was ported from the design container

The `.dc.html` runtime features were reimplemented in vanilla JS (inline at the
bottom of `index.html`):

- **`style-hover` → `:hover`** — a small compiler scans every `style-hover="…"`
  attribute at load, generates a scoped class, and inserts a matching
  `:hover` rule with each declaration marked `!important` (mirroring the original
  `support.js` `pseudoClass` behaviour). 46 hover states, exactly as authored.
- **`DCLogic` component → plain class** — the component logic (sticky/condensing
  header with per-section light/dark theming, scroll reveals, mega-menu &
  dropdowns with focus trapping, magnetic buttons, the hero video, the animated
  six-stage "Process" timeline, newsletter form) runs on `DOMContentLoaded` with
  the design's default props (`showScrollBadge`, `enableReveal`,
  `showDuplicateCulinary` all `true`).
- **Reduced-motion** — the original `prefers-reduced-motion` handling is preserved.

Everything else (markup, the full `<style>` block, `@font-face` Optima faces,
section structure 01–11) is carried over verbatim from the source.

## Assets

Real, pixel-for-pixel assets pulled from the design project:

| File | Notes |
|------|-------|
| `fonts/Optima-{Regular,Italic,Medium,Bold}.ttf` | brand typeface |
| `assets/logo-full.png`, `assets/logo-full-white.png` | wordmark |
| `assets/monogram-oxblood.png`, `assets/monogram-white.png` | monogram / favicon |

### Placeholder images (need swap-in)

The large photographic assets and the hero video exceeded the design API's
per-file transfer limit, so the following are **on-brand placeholders** generated
at the exact manifest aspect ratios (charcoal gradient + warm glow + film grain +
oxblood tick + label). Drop the real files in with the **same filenames** and the
page picks them up with **zero code changes**:

| File | Ratio · size | Slot |
|------|--------------|------|
| `assets/hero-kitchen.mp4` | 16:9 | hero background video *(missing — poster shows meanwhile; this is the one 404 in the console)* |
| `assets/hero-kitchen.png` | 16:9 · 2880×1620 | hero poster |
| `assets/about-workshop.png` | 4:5 · 1200×1500 | 02 About |
| `assets/banner-fit-out.png` | 4:3 · 1600×1200 | 03 The Fit Out |
| `assets/banner-kitchen.png` | 4:3 · 1600×1200 | 04 The Kitchen |
| `assets/banner-closet.png` | 4:3 · 1600×1200 | 05 The Closet |
| `assets/banner-culinary.png` | 4:3 · 1600×1200 | 06 Professional Culinary |
| `assets/banner-timber.png` | 4:3 · 1600×1200 | 07 Timber & Joinery |
| `assets/featured-kitchen.png` | 3:2 · 1800×1200 | 08 Featured Kitchen |

Art direction for each slot is documented in the original
`AK_Landing_Image_Manifest.md` in the design project.

## Palette & type

- Bone `#F4F1EA` · Charcoal `#49413E` · Oxblood `#9A2A2C`
- Optima (with Candara / Segoe UI fallbacks)

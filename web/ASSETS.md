# Assets & content still needed

Everything below has a **fixed path already wired into the code**. Drop a file at
the stated path with the stated filename and it appears with **zero code
changes** — no imports to add, no data files to edit.

Until a file arrives, its slot renders an intentional warm material panel (a
tonal surface with a faint directional weave). Nothing shows a broken image, an
empty box, or a placeholder bracket. The page is presentable as it stands; it
just isn't photographed yet.

Sizes below are targets, not limits. Everything is served through
`next/image`, which generates responsive WebP variants automatically — so supply
the **largest good original** and let the build downscale.

---

## 1. Hero — the scroll-scrubbed sequence

The hero is one continuous journey: measured drawing → villa exterior → living
room → modern kitchen → classic closet. Scroll position drives playback.

### 1a. The master clip (the one asset that matters most)

| Path | Notes |
|------|-------|
| `public/assets/hero/ak-hero-master.mp4` | Single merged MP4, villa exterior → living room → modern kitchen → classic closet, in that order |

The drawing is a **separate still** (1b), not part of the clip. The clip starts
at the villa exterior.

Encoding requirements — these are not cosmetic, scrubbing breaks without them:

- **H.264**, `yuv420p`
- **Faststart** — `-movflags +faststart` (metadata at the front)
- **Frequent keyframes** — `-g 12` at 24fps, i.e. every 0.5s. A default 250-frame
  GOP makes seeking visibly laggy.
- **One consistent frame rate** across all four segments (24fps unless you have
  a reason otherwise)
- **One resolution** across all segments (1920×1080 is plenty; 2560×1440 max)
- **One colour treatment** across all segments — the four clips must feel like
  one continuous shot, not a reel
- No audio track (it is muted anyway; dropping it saves bandwidth)

A reference encode:

```bash
ffmpeg -i merged-source.mov \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -r 24 -g 12 -keyint_min 12 -sc_threshold 0 \
  -crf 20 -movflags +faststart -an \
  public/assets/hero/ak-hero-master.mp4
```

**Hosting caveat:** the host must answer HTTP **range requests** for this file.
Scrubbing is byte-range seeking. Vercel, Netlify, Cloudflare and S3/R2 all do
this correctly. If a host cannot, put the file on a CDN and change the single
`heroMaster` constant in `data/hero.ts` to the absolute URL.

Direction notes for the two new chapters are in
[§ Clip direction](#clip-direction) below.

### 1b. Hero stills

These are the fallback sequence **and** the poster frames. If the video never
becomes seekable, the hero still progresses through all five chapters on these
alone, in both directions, with pinning and header collapse intact. They are not
optional.

| Path | Ratio | Target | Slot |
|------|-------|--------|------|
| `public/assets/hero/ak-villa-measured-drawing.png` | 16:9 | 2560×1440 | Chapter 01 — measured architectural elevation. Reveals by clip path, so keep the linework clean against a plain ground. PNG for crisp lines. |
| `public/assets/hero/ak-villa-exterior.jpg` | 16:9 | 2560×1440 | Chapter 02 — also the video's poster frame. Should match the clip's **first frame** as closely as possible. |
| `public/assets/hero/ak-villa-living-room.jpg` | 16:9 | 2560×1440 | Chapter 03 |
| `public/assets/hero/ak-modern-kitchen.jpg` | 16:9 | 2560×1440 | Chapter 04 |
| `public/assets/hero/ak-classic-closet.jpg` | 16:9 | 2560×1440 | Chapter 05 — the final held frame |

Keep each under roughly 400 KB after compression; all five sit in the pinned
viewport.

---

## 2. What We Deliver — service cards

Portrait-ish crops. Title and description sit over the lower third, so keep that
area calm and reasonably dark — a busy or bright base there costs legibility.

| Path | Target | Discipline |
|------|--------|------------|
| `public/assets/services/service-fit-out.webp` | 1600×2000 | The Fit-Out |
| `public/assets/services/service-kitchen.webp` | 1600×2000 | The Kitchen |
| `public/assets/services/service-closet.webp` | 1600×2000 | The Closet |
| `public/assets/services/service-professional-culinary.webp` | 1600×2000 | Professional Culinary |
| `public/assets/services/service-timber-joinery.webp` | 1600×2000 | Timber & Joinery |

Alt text is already written per service in `data/services.ts` — correct it there
if a photograph shows something different.

---

## 3. Selected Work — project photography

**16:9, and the image dominates the section.** One file per project.

| Path | Target | Project |
|------|--------|---------|
| `public/assets/projects/project-villa-m.webp` | 2400×1350 | Villa M |

### Additional projects — content needed, not just images

Only **Villa M** is currently in `data/projects.ts`, because it is the only
project record supplied in the brief. The carousel, metadata grid, keyboard
navigation, swipe and neighbour-preloading all scale to any number of projects
with no code changes — but project records are factual claims about real
delivered work, so nothing was invented to pad it out. With one project the
prev/next controls correctly render disabled.

For each further project, send:

- Name as it should read (e.g. "Villa M")
- Type / sub-line (e.g. "Private Residence")
- Location (city, country)
- Discipline (e.g. "Architectural Fit-Out")
- Year
- One 16:9 photograph
- Whether it may be named publicly at all

Then add an entry to the `projects` array in `data/projects.ts` and drop the
image at `public/assets/projects/project-<slug>.webp`.

---

## 4. Fullscreen menu — preview panel

The right-hand panel crossfades as you move down the menu. Portrait crops
(roughly 3:4); the panel is tall and narrow.

| Path | Menu entry |
|------|-----------|
| `public/assets/menu/preview-about.webp` | About Us — showroom, factory floor, or an integrated interior *(this is also the default preview shown when nothing is hovered)* |
| `public/assets/menu/preview-interior-living.webp` | Interior Living |
| `public/assets/menu/preview-kitchen.webp` | The Kitchen |
| `public/assets/menu/preview-closet.webp` | The Closet |
| `public/assets/menu/preview-integrated-solutions.webp` | Integrated Solutions |
| `public/assets/menu/preview-fit-out.webp` | The Fit-Out |
| `public/assets/menu/preview-timber-joinery.webp` | Timber & Joinery |
| `public/assets/menu/preview-professional-culinary.webp` | Professional Culinary |
| `public/assets/menu/preview-selected-work.webp` | Selected Work |
| `public/assets/menu/preview-materials-finishes.webp` | Materials & Finishes |
| `public/assets/menu/preview-virtual-showroom.webp` | Virtual Showroom |
| `public/assets/menu/preview-partners.webp` | Partners |
| `public/assets/menu/preview-contact.webp` | Contact — showroom entrance |

Target 1200×1600, ~150 KB each. Only the default plus the first few entries are
preloaded, and only when the menu is opened — the rest load on demand.

**Optional muted looping clips.** Any entry can carry a short silent loop layered
over its poster. Add a `video` field beside the `poster` in
`data/menu-previews.ts`; the poster stays beneath it so the panel cannot flash
empty while the clip buffers. Keep loops under ~4 s and ~1.5 MB.

---

## 5. Brand

| Path | Notes |
|------|-------|
| `public/assets/brand/wordmark.svg` | Full "Adada & Kabbani" lockup |
| `public/assets/brand/monogram.svg` | AK monogram |
| `public/assets/brand/favicon.svg` (or `.png`) | Tab icon |

**Currently the wordmark and monogram are set typographically** in
`components/ui/BrandMark.tsx` rather than loaded as artwork — so they stay crisp
at any size, inherit the header's oxblood/bone contrast switching, and cost no
request. To swap in the real artwork, replace the spans in that one file with
inline SVG and **keep `currentColor` on the paths**, so the tone switching keeps
working automatically.

### Typeface

The display face is currently **Newsreader** (an editorial serif, self-hosted
via `next/font`), paired with **Inter** for the small wide-tracked labels and
metadata.

If Optima is the approved brand face, send the **licensed webfont files**
(`.woff2`, weights ~200–500, plus italic) and confirm the licence covers web
embedding. Then drop them in `public/assets/brand/fonts/` and replace the
`Newsreader` declaration in `app/fonts.ts` with a `next/font/local` declaration
exposing the same `--font-display` variable. Nothing else changes — every
heading on the site reads from that one variable.

---

## 6. Content still needed (not images)

### Social profile URLs — **the footer and menu social rows are hidden until these arrive**

`data/social.ts` holds four entries with `href: null`. Social URLs are not
something to guess at, so the rows render nothing rather than ship dead links.
Paste the real profile URLs in and both rows appear immediately, styled and
wired (new tab, `rel="noopener noreferrer"`, descriptive `aria-label`).

- X — `href`
- Instagram — `href`
- LinkedIn — `href`
- Facebook — `href`

### Contact details

`data/footer.ts` has `phone: null` and `email: null` on both locations. Those
lines are omitted from the render entirely while null. Supply any that should be
public and they render as proper `tel:` / `mailto:` links. The two street
addresses are exactly as given in the brief; no street numbers were invented.

### Routes

Navigation points at real paths (`/about`, `/interior-living/the-kitchen`,
`/selected-work`, `/contact`, …) rather than `#` placeholders. Those pages do not
exist yet, so they currently land on a branded "This page is being prepared"
screen instead of an unstyled 404. Confirm the final URL structure and the
paths in `data/navigation.ts` and `data/menu.ts` can be adjusted in one place.

---

## Clip direction

Reference notes for the two chapters being produced.

### Modern kitchen

Preserve: warm-white palette; pale natural oak; large rounded island;
continuous warm LED under worktop and plinth; full-height handleless cabinetry;
curved end panels; integrated fireplace; pale timber dining extension; three
globe pendants; soft daylight from the left; pale limestone flooring; minimal
styling.

Motion: slow stabilised forward dolly; extremely subtle drift right; island
remains the visual anchor; fireplace flame moves naturally; outdoor foliage
moves minimally; cabinetry, chairs, pendants and objects stay static.

### Classic closet

Preserve: symmetrical frontal composition; curved fluted wardrobe ends;
bronze-framed glass wardrobes; dark figured timber interiors; central rounded
island; pale stone top; warm integrated lighting; perimeter ceiling cove;
sculptural crystal installation; pale polished floor; organic rug; warm evening
atmosphere.

Motion: slow forward dolly on the central axis; no lateral drift; strict
one-point perspective; subtle crystal shimmer only; no moving garments; no
changing joinery; no opening doors; no light flicker.

---

## Priority order

If assets arrive in stages, this order makes the biggest visual difference
first:

1. **Hero stills** (§1b) — five files, and the hero becomes fully presentable
   even with no video at all
2. **Service cards** (§2) — five files, the largest block of the page
3. **Villa M photograph** (§3)
4. **Social URLs** (§6) — four strings, unhides two rows
5. **Hero master clip** (§1a) — the scrub upgrade over the stills
6. **Menu previews** (§4) — only visible once the menu is opened
7. **Brand SVGs and Optima licence** (§5)

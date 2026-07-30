# Adada & Kabbani — landing page

Next.js App Router · TypeScript · GSAP ScrollTrigger · CSS Modules.

Built from scratch. Not derived from the earlier static page in `../site`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

TypeScript is pinned to `^6` — Next 16 does not accept TypeScript 7's compiler
API.

**Assets and remaining content are listed in [`ASSETS.md`](./ASSETS.md).** Every
slot has a fixed path already wired in; dropping a file at that path needs no
code change. Until then each slot renders an intentional warm material panel
rather than a broken image or an empty box.

---

## Page order

Hero → What We Deliver → Selected Work → Contact CTA, with the fixed header,
fullscreen menu and footer as site-wide chrome in `app/layout.tsx`.

## Structure

```
app/
  layout.tsx          chrome + fonts + metadata
  page.tsx            section order
  globals.css         tokens, typography, layout shell, primitives
  fonts.ts            the two families (one-line swap to Optima)
  not-found.tsx       branded fallback for unbuilt routes
components/
  chrome/             ChromeContext — one state system for the whole chrome
  header/             SiteHeader, DesktopNavigation, FullscreenMenu, MenuPreview
  hero/               HeroSection, HeroMedia, useHeroScrub
  services/           ServicesSection, ServicesCarousel
  selected-work/      SelectedWorkSection, ProjectCarousel
  contact/            ContactCTA
  footer/             SiteFooter
  ui/                 ArrowButton, TextLink, SectionLabel, Chevron,
                      EditorialImage, SocialLinks, BrandMark
data/                 navigation, menu, menu-previews, services, projects,
                      hero, footer, social
lib/                  gsap registration, useReducedMotion, useMediaQuery,
                      useFocusTrap, useSwipe
```

All copy, ordering, routes and media paths live in `data/`. No component holds
content.

---

## Decisions worth knowing

**One state system for the chrome.** `ChromeContext` owns header collapse, chrome
tone and menu open state. The header, hero controller and menu all read and write
there. Its setters ignore no-op writes, and both values change only on threshold
crossings — never per scroll frame.

**Chrome tone uses a viewport band, not scroll offsets.** Each major section
declares `data-header-tone`; an `IntersectionObserver` watches a 1px band at the
header's optical centre. Scroll-offset triggers were tried first and were wrong:
the hero pin adds ~5000px to the document *after* the header mounts, which
invalidates any precomputed offset. A viewport-relative band has nothing to go
stale.

**The hero fallback needs no branching.** The five chapters are stacked still
layers that the timeline always crossfades. The video, when it becomes seekable,
simply fades in on top and is scrubbed. So "video works" and "video missing" are
the same code path — the stills carry the sequence either way, in both
directions, with pinning and header collapse intact. Under reduced motion the
video is never requested at all.

**Hero scrub uses refs, not state.** Progress, readiness and pending seeks live in
refs and are written straight to the DOM; the entire scrub causes zero React
renders. Seeks are coalesced — while the element is seeking the newest target is
parked and applied once on `seeked`, so a fast flick produces one catch-up seek
rather than a queue of stale ones. `video.duration` is read live; no frame times
are hardcoded. `video.load()` is called once on mount, never during scroll.

**Pin length is a percentage, not `vh`.** ScrollTrigger does not parse `vh` in a
relative `end` value — `"+=560vh"` silently collapses the pin to zero length.
`heroScrollPercent` in `data/hero.ts` is expressed in the `%` unit it does parse.

**Services cards cannot reach the intro.** The intro is a sibling grid cell, not
an overlay, and the carousel viewport clips its own contents. Both grid tracks are
`minmax(0, …)`, so the carousel can never push the intro column. A single
translated track produces the whole specified choreography in both directions.

**Carousel images stay mounted.** Selected Work stacks every project's photograph
in one 16:9 frame and crossfades with a small directional offset. A photograph
that has already decoded is never re-requested, which is what removes the blank
flash. The first is eager and high-priority at full opacity; its neighbour begins
loading only once the first reports ready.

**Media never resolves to nothing.** Every image slot has a permanent tonal panel
beneath it, and a file that fails to load has its `<img>` removed so the browser
cannot draw a broken-image glyph over it. The menu preview goes further: the
incoming image loads in a second layer at zero opacity and the crossfade begins
only once it reports decoded.

**Unapproved content is absent, not faked.** Social URLs, phone numbers and email
addresses are typed as nullable and render nothing while null — no placeholder
brackets, no dead links. Project records are factual claims about real delivered
work, so only the supplied one is present; the carousel handles any count.

---

## Accessibility

Semantic landmarks; real buttons for every control; 44px minimum targets;
`aria-live` announcements on both carousels; `aria-current="page"`; visible focus
rings that switch to warm bone on dark surfaces; Escape closes the menu and each
dropdown; focus trapped in the menu and restored to the burger on close; body
scroll locked with scrollbar-width compensation so the page cannot shift
sideways; off-position carousel cards and closed dropdowns are `inert`, so the
keyboard cannot reach anything off screen.

Text contrast was audited with alpha composited against the actual surface — the
first pass measured un-composited colours and passed everything, which was wrong.
Several muted labels were below AA once blended and were corrected; the
`--ak-body-muted` token exists for exactly that reason. Two things remain
intentionally below the threshold and are exempt: the oversized decorative
numerals on the service cards, which are `aria-hidden` and duplicate the real
number rendered beside the title, and the close button's oxblood hover state,
which is specified — its boundary keeps a bone tint so the control stays
identifiable.

Under `prefers-reduced-motion` translations, scale and stagger are dropped for
short fades, the hero runs on stills only, and no content is removed.

---

## Verified

Production build, then driven in Chromium at 1728 / 1440 / 1280 / 1024 / 768 /
390:

- no horizontal overflow at any breakpoint, at the top or at the footer
- no JS errors, no hydration errors, no non-asset console errors
- hero pins and stays full bleed; all five chapters resolve in order; released
  cleanly at the end
- header collapses to the monogram; tone correct against every section
- caption row clears before the hero passes under the header, so the monogram's
  reserved zone stays clear
- services intro stationary and visible through every navigation; cards clipped
  inside the carousel
- Selected Work ground distinct from Services; frame exactly 16:9
- Contact CTA and footer both well under viewport height
- menu: opens, locks scroll, traps focus across 41 tabs, preview swaps on hover,
  Escape closes, focus returns to the burger
- mobile menu: side preview dropped, groups expand
- reduced motion: no video requested, stills progress, all content reachable

/**
 * Hero — spec section 8.
 *
 * The hero is one continuous architectural journey: measured drawing → villa
 * exterior → living room → modern kitchen → classic closet. The kitchen and
 * closet are hero chapters, not separate page sections.
 *
 * `master` is the production asset: a single merged MP4 containing the whole
 * sequence, scrubbed by scroll. `chapters[].still` is the fallback frame used
 * when the video is unavailable or never becomes seekable — the sequence still
 * progresses, and pinning, header collapse and reverse scrolling all survive.
 *
 * `start`/`end` are scroll-progress fractions, not hardcoded frame times. The
 * video itself is scrubbed linearly against `video.duration`, read at runtime;
 * these fractions only drive captions and still-frame selection, so they are
 * the single place to nudge if the merged clip lengths shift.
 */

export const heroMaster = "/assets/hero/ak-hero-master.mp4";

/** Shown beneath the video until the first usable frame is ready. */
export const heroPoster = "/assets/hero/ak-villa-exterior.jpg";

export type HeroChapter = {
  id: string;
  index: string;
  caption: string;
  still: string;
  alt: string;
  start: number;
  end: number;
};

export const heroChapters: HeroChapter[] = [
  {
    id: "drawing",
    index: "01",
    caption: "The Measured Drawing",
    still: "/assets/hero/ak-villa-measured-drawing.png",
    alt: "Measured architectural elevation drawing of a villa",
    start: 0,
    end: 0.2,
  },
  {
    id: "exterior",
    index: "02",
    caption: "The Villa",
    still: "/assets/hero/ak-villa-exterior.jpg",
    alt: "Villa exterior in warm daylight",
    start: 0.2,
    end: 0.48,
  },
  {
    id: "living-room",
    index: "03",
    caption: "The Living Room",
    still: "/assets/hero/ak-villa-living-room.jpg",
    alt: "Villa living room with integrated joinery and stone flooring",
    start: 0.48,
    end: 0.68,
  },
  {
    id: "kitchen",
    index: "04",
    caption: "The Kitchen",
    still: "/assets/hero/ak-modern-kitchen.jpg",
    alt: "Modern kitchen in warm white and pale oak with a rounded island",
    start: 0.68,
    end: 0.84,
  },
  {
    id: "closet",
    index: "05",
    caption: "The Closet",
    still: "/assets/hero/ak-classic-closet.jpg",
    alt: "Classic dressing room with bronze-framed glass wardrobes and a central island",
    start: 0.84,
    end: 1,
  },
];

/**
 * Point in scroll progress at which the drawing has fully given way to the
 * villa exterior. The drawing reveal runs from 0 to `drawingRevealEnd`, and
 * the crossfade completes by `drawingHandoverEnd` — spec section 8 mapping.
 */
export const drawingRevealEnd = 0.12;
export const drawingHandoverEnd = 0.2;

/**
 * Pinned scroll length, as a percentage of viewport height — spec section 8
 * recommends 500–650vh. Expressed in the `%` unit ScrollTrigger actually
 * parses in a relative `end` value; `vh` there is silently ignored and
 * collapses the pin to zero length.
 */
export const heroScrollPercent = 560;

export const heroIntro = {
  label: "Adada & Kabbani — Est. 1959",
  heading: "From the measured drawing to the finished room.",
  support:
    "An integrated interiors house working across architecture, manufacturing and delivery from Jeddah and Makkah.",
  scrollCue: "Scroll",
} as const;

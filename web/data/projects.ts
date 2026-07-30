/**
 * Selected Work — spec section 12.
 *
 * CONTENT RULE (spec section 20): project records describe real delivered work
 * for a real company, so nothing here is invented. Only records confirmed by
 * the client appear in `projects`. Villa M is the one record supplied in the
 * brief. Additional projects belong in `projects` once their name, type,
 * location, discipline, year and photography are approved — the carousel,
 * metadata grid, keyboard navigation and preloading all scale to any count
 * without code changes.
 */

export type Project = {
  id: string;
  /** Displayed name, e.g. "Villa M". */
  name: string;
  /** Sub-line beneath the name, e.g. "Private Residence". */
  type: string;
  location: string;
  discipline: string;
  year: string;
  image: string;
  alt: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "villa-m",
    name: "Villa M",
    type: "Private Residence",
    location: "Jeddah, Saudi Arabia",
    discipline: "Architectural Fit-Out",
    year: "2024",
    image: "/assets/projects/project-villa-m.webp",
    alt: "Villa M interior — double-height living space with timber panelling and stone floor",
    href: "/selected-work/villa-m",
  },
];

/** Labels for the metadata grid, kept beside the data they describe. */
export const projectMetaLabels = {
  name: "Private Residence",
  location: "Location",
  discipline: "Discipline",
  year: "Year",
} as const;

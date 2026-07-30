/**
 * Footer — spec section 14.
 *
 * CONTENT RULE (spec section 20): no invented email addresses, phone numbers
 * or street numbers. The two addresses below are exactly as supplied in the
 * brief. `phone` and `email` stay `null`; the footer omits those lines
 * entirely rather than rendering a placeholder.
 */

export const companyStatement =
  "Bespoke interiors, kitchens, closets, professional culinary environments and architectural joinery, designed and delivered through one integrated team.";

export type FooterLink = { label: string; href: string };

export const footerNavigation: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Selected Work", href: "/selected-work" },
  { label: "Contact", href: "/contact" },
];

export const footerCapabilities: FooterLink[] = [
  { label: "The Fit-Out", href: "/integrated-solutions/the-fit-out" },
  { label: "The Kitchen", href: "/interior-living/the-kitchen" },
  { label: "The Closet", href: "/interior-living/the-closet" },
  { label: "Professional Culinary", href: "/professional-culinary" },
  { label: "Timber & Joinery", href: "/integrated-solutions/timber-and-joinery" },
];

export type FooterLocation = {
  id: string;
  label: string;
  lines: string[];
  /** Awaiting approved contact details — omitted from the render while null. */
  phone: string | null;
  email: string | null;
};

export const footerLocations: FooterLocation[] = [
  {
    id: "jeddah-showroom",
    label: "Jeddah Showroom",
    lines: ["Saud Al Faisal Street", "Al Rawdah, Jeddah", "Saudi Arabia"],
    phone: null,
    email: null,
  },
  {
    id: "makkah-factory",
    label: "Makkah Factory",
    lines: ["12,000 m² manufacturing facility", "Makkah, Saudi Arabia"],
    phone: null,
    email: null,
  },
];

export const legalLine = `© ${new Date().getFullYear()} Adada & Kabbani. All rights reserved.`;

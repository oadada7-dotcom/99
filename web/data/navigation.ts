/**
 * Header navigation — spec section 7.
 *
 * Parent items that own children are disclosure triggers, not links: the label
 * and chevron form a single focusable button. Only `Interior Living` and
 * `Integrated Solutions` carry children, so only those two render a chevron.
 */

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  /** Present only on leaf items. Parents with children are buttons. */
  href?: string;
  children?: NavChild[];
};

export const primaryNavigation: NavItem[] = [
  { id: "about", label: "About Us", href: "/about" },
  {
    id: "interior-living",
    label: "Interior Living",
    children: [
      { label: "The Kitchen", href: "/interior-living/the-kitchen" },
      { label: "The Closet", href: "/interior-living/the-closet" },
    ],
  },
  {
    id: "integrated-solutions",
    label: "Integrated Solutions",
    children: [
      { label: "The Fit-Out", href: "/integrated-solutions/the-fit-out" },
      {
        label: "Timber & Joinery",
        href: "/integrated-solutions/timber-and-joinery",
      },
    ],
  },
  {
    id: "professional-culinary",
    label: "Professional Culinary",
    href: "/professional-culinary",
  },
  { id: "selected-work", label: "Selected Work", href: "/selected-work" },
  { id: "virtual-showroom", label: "Virtual Showroom", href: "/virtual-showroom" },
  { id: "partners", label: "Partners", href: "/partners" },
];

/**
 * The header and menu jump to the Contact CTA already on this page, so that
 * target is a real in-page anchor. The CTA's own action then leads outward to
 * the contact page proper.
 */
export const contactHref = "#contact";

export const routes = {
  capabilities: "/capabilities",
  selectedWork: "/selected-work",
  contactSection: contactHref,
  contact: "/contact",
} as const;

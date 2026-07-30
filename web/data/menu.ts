/**
 * Fullscreen menu — spec section 15.
 * Order is fixed. Children render beneath their parent in smaller type;
 * the overlay never opens floating dropdown boxes.
 */

export type MenuChild = {
  id: string;
  label: string;
  href: string;
};

export type MenuEntry = {
  id: string;
  label: string;
  href?: string;
  children?: MenuChild[];
};

export const menuEntries: MenuEntry[] = [
  { id: "about", label: "About Us", href: "/about" },
  {
    id: "interior-living",
    label: "Interior Living",
    children: [
      {
        id: "kitchen",
        label: "The Kitchen",
        href: "/interior-living/the-kitchen",
      },
      {
        id: "closet",
        label: "The Closet",
        href: "/interior-living/the-closet",
      },
    ],
  },
  {
    id: "integrated-solutions",
    label: "Integrated Solutions",
    children: [
      {
        id: "fit-out",
        label: "The Fit-Out",
        href: "/integrated-solutions/the-fit-out",
      },
      {
        id: "timber-joinery",
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
  {
    id: "materials-finishes",
    label: "Materials & Finishes",
    href: "/materials-and-finishes",
  },
  { id: "virtual-showroom", label: "Virtual Showroom", href: "/virtual-showroom" },
  { id: "partners", label: "Partners", href: "/partners" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const menuMetadata =
  "Bespoke Interiors · Kitchens · Closets · Fit-Out · Joinery";

export const establishedLine = "Est. 1959 · Makkah";

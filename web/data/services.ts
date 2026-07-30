/**
 * What We Deliver — spec section 11.
 * One array, consumed by both the section and the carousel. Order is fixed.
 */

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "fit-out",
    title: "The Fit-Out",
    description:
      "Complete interior delivery, from structural coordination and services to the final surface. One team carries the drawing through to handover.",
    image: "/assets/services/service-fit-out.webp",
    href: "/integrated-solutions/the-fit-out",
    alt: "Completed residential interior with continuous timber wall panelling and stone flooring",
  },
  {
    id: "kitchen",
    title: "The Kitchen",
    description:
      "Bespoke kitchens engineered around how a room is actually used — handleless cabinetry, honest materials, tolerances measured in millimetres.",
    image: "/assets/services/service-kitchen.webp",
    href: "/interior-living/the-kitchen",
    alt: "Pale oak handleless kitchen with a rounded island and integrated worktop lighting",
  },
  {
    id: "closet",
    title: "The Closet",
    description:
      "Dressing rooms built as architecture: fluted ends, bronze-framed glass, figured timber interiors and lighting designed into the joinery.",
    image: "/assets/services/service-closet.webp",
    href: "/interior-living/the-closet",
    alt: "Bronze-framed glass wardrobes with figured timber interiors and a central dressing island",
  },
  {
    id: "professional-culinary",
    title: "Professional Culinary",
    description:
      "Commercial kitchens for hospitality and institutional operators, planned around service flow, hygiene standards and sustained daily load.",
    image: "/assets/services/service-professional-culinary.webp",
    href: "/professional-culinary",
    alt: "Stainless steel professional kitchen line with overhead extraction and preparation stations",
  },
  {
    id: "timber-joinery",
    title: "Timber & Joinery",
    description:
      "Our Makkah facility manufactures the screens, doors, soffits and panelling that hold an interior together — cut, finished and fitted in-house.",
    image: "/assets/services/service-timber-joinery.webp",
    href: "/integrated-solutions/timber-and-joinery",
    alt: "Slatted timber screen and panelled doors under warm directional light",
  },
];

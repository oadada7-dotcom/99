/**
 * Fullscreen-menu live preview — spec section 15.
 *
 * One persistent panel crossfades between these entries on hover or keyboard
 * focus. Every entry carries a `poster`; `video` is optional. When a video is
 * present the poster still renders beneath it, so the panel can never flash
 * empty while the clip buffers.
 */

export type MenuPreview = {
  poster: string;
  /** Optional muted looping clip layered over the poster. */
  video?: string;
  alt: string;
};

export const defaultPreviewId = "about";

export const menuPreviews: Record<string, MenuPreview> = {
  about: {
    poster: "/assets/menu/preview-about.webp",
    alt: "Adada & Kabbani workshop floor with timber stock and assembly benches",
  },
  "interior-living": {
    poster: "/assets/menu/preview-interior-living.webp",
    alt: "Warm residential living space with integrated joinery",
  },
  kitchen: {
    poster: "/assets/menu/preview-kitchen.webp",
    alt: "Pale oak handleless kitchen with rounded island",
  },
  closet: {
    poster: "/assets/menu/preview-closet.webp",
    alt: "Dressing room with bronze-framed glass wardrobes",
  },
  "integrated-solutions": {
    poster: "/assets/menu/preview-integrated-solutions.webp",
    alt: "Completed interior at handover, fully fitted out",
  },
  "fit-out": {
    poster: "/assets/menu/preview-fit-out.webp",
    alt: "Completed interior with continuous wall panelling and stone floor",
  },
  "timber-joinery": {
    poster: "/assets/menu/preview-timber-joinery.webp",
    alt: "Slatted timber screens and panelled doors",
  },
  "professional-culinary": {
    poster: "/assets/menu/preview-professional-culinary.webp",
    alt: "Stainless steel commercial kitchen line",
  },
  "selected-work": {
    poster: "/assets/menu/preview-selected-work.webp",
    alt: "Completed villa interior",
  },
  "materials-finishes": {
    poster: "/assets/menu/preview-materials-finishes.webp",
    alt: "Composition of timber, stone and metal finish samples",
  },
  "virtual-showroom": {
    poster: "/assets/menu/preview-virtual-showroom.webp",
    alt: "Digitally rendered showroom interior",
  },
  partners: {
    poster: "/assets/menu/preview-partners.webp",
    alt: "Specified appliances and fittings within a finished interior",
  },
  contact: {
    poster: "/assets/menu/preview-contact.webp",
    alt: "Entrance to the Adada & Kabbani Jeddah showroom",
  },
};

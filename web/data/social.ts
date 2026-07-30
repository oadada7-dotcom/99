/**
 * Social profiles — spec sections 14 and 20.
 *
 * CONTENT RULE: social URLs must never be invented. Each entry stays `null`
 * until the real profile URL is supplied. `activeSocialLinks` filters those
 * out, and both the footer and the menu hide the row entirely when nothing is
 * active — so no placeholder, bracket or dead link ever reaches production.
 *
 * TO ENABLE: paste the confirmed profile URL into `href` for each platform.
 */

export type SocialPlatform = "x" | "instagram" | "linkedin" | "facebook";

export type SocialLink = {
  id: SocialPlatform;
  /** Used for the accessible name, e.g. "Adada & Kabbani on Instagram". */
  label: string;
  href: string | null;
};

export const socialLinks: SocialLink[] = [
  { id: "x", label: "X", href: null },
  { id: "instagram", label: "Instagram", href: null },
  { id: "linkedin", label: "LinkedIn", href: null },
  { id: "facebook", label: "Facebook", href: null },
];

export type ActiveSocialLink = SocialLink & { href: string };

export const activeSocialLinks: ActiveSocialLink[] = socialLinks.filter(
  (link): link is ActiveSocialLink => typeof link.href === "string" && link.href.length > 0,
);

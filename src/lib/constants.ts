// ---------------------------------------------------------------------------
// Site-wide constants — IBC Academy
// ---------------------------------------------------------------------------

export const SITE_NAME = 'IBC Academy';
export const SITE_URL = 'https://ibcacademy.org';
export const SITE_DESCRIPTION =
  'Free education on the Infinite Banking Concept. Master IBC through structured learning paths, interactive tools, and expert guidance.';

/** Social / community profile links. "#" = placeholder until live. */
export const SOCIAL_LINKS = {
  skool: 'https://skool.com/ibc-academy',
  youtube: '#',
  instagram: '#',
  facebook: '#',
  twitter: '#',
} as const;

/** Primary navigation links rendered in the Header component. */
export const NAV_LINKS = [
  { label: 'Learn', href: '/learn/start-here' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blog', href: '/blog' },
  { label: 'Tools', href: '/tools' },
  { label: 'Academy', href: '/academy' },
] as const;

// ---------------------------------------------------------------------------
// Environment-driven values (safe to import at build time)
// ---------------------------------------------------------------------------

/** Plausible analytics domain — empty string disables the script tag. */
export const PLAUSIBLE_DOMAIN: string =
  (import.meta as any).env?.PLAUSIBLE_DOMAIN ?? '';

/** Formspree endpoint ID for the newsletter signup form. */
export const FORMSPREE_NEWSLETTER_ID: string =
  (import.meta as any).env?.PUBLIC_FORMSPREE_NEWSLETTER_ID ?? '';

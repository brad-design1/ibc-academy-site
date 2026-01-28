// ---------------------------------------------------------------------------
// SEO helpers — IBC Academy
// ---------------------------------------------------------------------------

import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants';

// ---------------------------------------------------------------------------
// JSON-LD: Organization schema (homepage)
// ---------------------------------------------------------------------------

/**
 * Returns a JSON-LD `Organization` object suitable for embedding in a
 * `<script type="application/ld+json">` tag on the homepage.
 */
export function generateOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    founder: {
      '@type': 'Person',
      name: 'Brad Raschke',
    },
  };
}

// ---------------------------------------------------------------------------
// Page title formatter
// ---------------------------------------------------------------------------

/**
 * Formats a page-level title into the canonical `Page | Site` pattern.
 *
 * - If `pageTitle` is a non-empty string the result is `"pageTitle | IBC Academy"`.
 * - If `pageTitle` is empty / undefined the result is just `"IBC Academy"`.
 */
export function formatTitle(pageTitle?: string): string {
  const trimmed = pageTitle?.trim();
  if (trimmed) {
    return `${trimmed} | ${SITE_NAME}`;
  }
  return SITE_NAME;
}

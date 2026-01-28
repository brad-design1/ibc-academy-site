# ibcacademy.org — Sprint 1 Build

## Context
Read `docs/ARCHITECTURE.md` first. It's a 2,768-line architecture document that specifies everything — design tokens, component APIs, page layouts, content schemas, the works. This is the single source of truth. Follow it precisely.

## What You're Building
ibcacademy.org — an Astro 5 static education platform for the Infinite Banking Concept. Sprint 1 is the foundation: project scaffolding, design system, core components, and 5 live pages.

## Sprint 1 Scope (build ALL of this)

### 1. Project Setup
- Astro 5.x with `output: 'static'`
- Tailwind CSS v4 (using `@tailwindcss/vite` plugin and `@theme` directive for design tokens)
- React 19 integration (`@astrojs/react`) for islands
- Vercel adapter (`@astrojs/vercel`)
- TypeScript strict mode
- Self-hosted fonts: Playfair Display (700) + Inter (400, 500, 600) — download .woff2 files to `public/fonts/`
- Plausible analytics script (stubbed with `PLAUSIBLE_DOMAIN` env var)

### 2. Design Tokens & Base Styles
Follow Section 3.1 and 3.3 of the architecture doc exactly:
- All color tokens as CSS custom properties via Tailwind v4 `@theme`
- Typography scale (H1-H4, body, caption, button, nav)
- Spacing scale, border radius, shadows, transitions, z-index
- `global.css` with base styles, font-face declarations, Tailwind imports
- `tokens.css` with all design tokens
- Dark mode tokens for IBC Academy (Section 8.3 if present, otherwise use sensible defaults with the navy/gold palette)

### 3. Layouts
- `BaseLayout.astro` — HTML shell, meta tags, self-hosted font preloads, Plausible script, View Transitions
- `PageLayout.astro` — extends Base, adds Header + Footer + main content slot

### 4. Components (follow the architecture doc's component specs exactly)
**UI Components (Astro, zero JS):**
- `Button.astro` — variants: primary, secondary, ghost, outline. Sizes: sm, md, lg. Renders as `<a>` if href provided.
- `Card.astro` — with image slot, title, description, optional badge, hover animation
- `Badge.astro` — variant colors, small label component

**Sections (Astro, zero JS):**
- `Hero.astro` — full-viewport hero section with title, subtitle, dual CTAs, gradient background
- `Section.astro` — generic section wrapper with padding, optional background color, optional title/subtitle
- `SplitContent.astro` — two-column layout (image + text), reversible
- `CTABanner.astro` — full-width colored banner with heading, description, and CTA button

**Animation (CSS + vanilla JS):**
- `ScrollReveal.astro` — IntersectionObserver-based reveal with direction variants (up/down/left/right/fade), respects `prefers-reduced-motion`, uses `data-threshold` attribute properly
- `CountUp.astro` — animated number counter on scroll (vanilla JS, IntersectionObserver)

**Layout Components:**
- `Header.astro` — logo, navigation links (Learn, Resources, Blog, Tools, Academy), "Start Learning" CTA button, mobile hamburger menu with full-screen overlay
- `Footer.astro` — logo, site map columns, legal links, newsletter signup placeholder, social links, copyright

### 5. Pages

**Homepage (`/`):**
Follow the homepage wireframe in Section 4.3 exactly:
- Hero section with "Master the Infinite Banking Concept" headline
- Social proof bar with CountUp stats (500+ Students, 19 Modules, 1,000+ Hours, NNI Certified)
- Learning paths section (3 cards: Foundations, Mechanics, Advanced)
- "What is IBC?" explainer (SplitContent)
- Featured blog posts section (placeholder — 3 cards)
- Lead magnet CTA banner ("Download the Free IBC Starter Guide")
- Interactive tools preview section
- Skool classroom CTA
- Footer

**About (`/about`):**
- Brad's story (use brad-headshot-formal.jpg from `reference-assets/`)
- Mission statement
- Credentials (NNI badge, IBC Authorized Practitioner badge — use images from `reference-assets/`)
- Philosophy section

**Start Here (`/learn/start-here`):**
- Beginner's guide to IBC
- Learning path overview with 3 path cards
- "Where to begin" guidance
- CTA to first lesson

**Newsletter (`/newsletter`):**
- Email signup form (stub with Formspree — use `FORMSPREE_NEWSLETTER_ID` env var)
- Lead magnet description
- Social proof

**Legal pages:**
- `/legal/disclaimer` — financial disclaimer (Brad is a licensed insurance professional, educational purposes only)
- `/legal/privacy` — privacy policy (Plausible analytics, no cookies, form data handling)

### 6. Content Collections Setup
Define the schemas in `src/content/config.ts` per the architecture doc (Section 4.3):
- `learn` collection (MDX)
- `blog` collection (MDX)
- `case-studies` collection (MDX)
- `glossary` collection (data/JSON)

Create one sample entry for each to validate the schemas work.

### 7. CI & Config
- `.github/workflows/lighthouse.yml` — Lighthouse CI on PRs (threshold: 95)
- `robots.txt` — allow all except /legal/
- `.env.example` with all required env vars documented
- `README.md` with setup, dev, and deploy instructions

### 8. SEO
- Proper `<title>` and `<meta description>` on every page
- Open Graph tags (og:title, og:description, og:image)
- Structured data (Organization schema on homepage)
- Canonical URLs

## Assets
Images are in `reference-assets/`:
- `brad-headshot-formal.jpg` — Brad's professional photo (use on /about)
- `brad-headshot-outdoor.jpg` — Brad's casual photo
- `nni-logo.jpg` — Nelson Nash Institute logo
- `ibc-authorized-practitioner-badge.jpg` — IBC Practitioner credential
- `byob-book-cover.jpg` — "Becoming Your Own Banker" book cover

Copy these to `public/images/` during setup and reference them from components.

## Technical Constraints
- `output: 'static'` — no server functions, everything is SSG
- Zero JS on static pages — only React islands ship JavaScript
- All fonts self-hosted (NO Google Fonts CDN)
- Mobile-first responsive design
- `prefers-reduced-motion` respected everywhere
- Lighthouse 95+ target on all pages
- Semantic HTML throughout (proper heading hierarchy, landmarks, ARIA)

## Style Guide
- Navy (`#1B2A4A`) is the primary color — headers, nav, footer
- Gold (`#C8962E`) is the accent — CTAs, links, highlights
- Cream (`#FBF8F3`) for alternate section backgrounds
- Playfair Display for headings, Inter for body text
- Warm, educational, approachable tone
- Content max-width: 1200px, full-bleed sections at 1440px

## When Done
- Run `npm run build` and verify it succeeds
- Run `npm run dev` to verify all pages render
- Commit everything with descriptive commit messages
- Then run: `clawdbot gateway wake --text "Done: ibcacademy.org Sprint 1 complete — 5 pages, design system, all components built" --mode now`

# IBC Academy — ibcacademy.org

An Astro 5 static education platform for the Infinite Banking Concept (IBC). Built with Astro, Tailwind CSS v4, React 19 islands, and deployed on Vercel.

## Tech Stack

- **Framework:** Astro 5 (static site generation)
- **Styling:** Tailwind CSS v4 with `@theme` design tokens
- **UI Islands:** React 19 (forms, calculators)
- **Content:** MDX content collections (blog, learn paths, case studies, glossary)
- **Fonts:** Self-hosted Playfair Display + Inter (woff2)
- **Analytics:** Plausible (privacy-focused, no cookies)
- **Forms:** Formspree (newsletter signup)
- **Hosting:** Vercel (static deployment)

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# Clone the repository
git clone https://github.com/L0v3Chrix/ibc-academy-site.git
cd ibc-academy-site

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values
```

### Development

```bash
# Start the dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `PLAUSIBLE_DOMAIN` | Your Plausible Analytics domain (e.g., `ibcacademy.org`) | No |
| `PUBLIC_FORMSPREE_NEWSLETTER_ID` | Formspree form ID for newsletter signup | No |

## Project Structure

```
src/
  components/
    animation/     # ScrollReveal, CountUp
    layout/        # Header, Footer
    sections/      # Hero, Section, SplitContent, CTABanner
    ui/            # Button, Card, Badge
  content/
    blog/          # MDX blog posts
    case-studies/  # MDX case studies
    glossary/      # JSON glossary entries
    learn/         # MDX learning path content
  layouts/         # BaseLayout, PageLayout
  lib/             # Constants, SEO helpers
  pages/           # Route pages
  styles/          # Global CSS, design tokens
public/
  fonts/           # Self-hosted woff2 fonts
  images/          # Static images
```

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, learning paths, social proof |
| `/about` | Brad's story, mission, credentials |
| `/learn/start-here` | Beginner's guide and learning path overview |
| `/newsletter` | Email signup and lead magnet |
| `/legal/disclaimer` | Financial disclaimer |
| `/legal/privacy` | Privacy policy |

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

## Deployment

The site auto-deploys to Vercel on push to the `main` branch. Preview deployments are created for pull requests.

## License

All rights reserved. This is a proprietary project for IBC Academy.

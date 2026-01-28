# Website Architecture Document
## ibcacademy.org & 1322legacystrategies.com

**Version:** 1.1
**Date:** January 27, 2026
**Authors:** Mabel (Architecture & Specification), Brad Raschke (Strategy & Content), Chris (Development)  
**Status:** APPROVED FOR DEVELOPMENT  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Overview & Funnel Architecture](#2-system-overview--funnel-architecture)
3. [Brand System](#3-brand-system)
4. [Site 1: ibcacademy.org — Education Platform](#4-site-1-ibcacademyorg--education-platform)
5. [Site 2: 1322legacystrategies.com — Advisory Practice](#5-site-2-1322legacystrategiescom--advisory-practice)
6. [Technical Architecture](#6-technical-architecture)
7. [Component Library](#7-component-library)
8. [Design System & Modern Techniques](#8-design-system--modern-techniques)
9. [Content Architecture](#9-content-architecture)
10. [SEO Strategy](#10-seo-strategy)
11. [Accessibility Requirements](#11-accessibility-requirements)
12. [Analytics & Tracking Plan](#12-analytics--tracking-plan)
13. [Deployment Architecture](#13-deployment-architecture)
14. [Phased Implementation Plan](#14-phased-implementation-plan)
15. [Dependencies & Cross-Site Integration](#15-dependencies--cross-site-integration)
16. [Appendices](#16-appendices)

---

## 1. Executive Summary

### The Problem

Brad Raschke is an Authorized IBC Practitioner building a two-part digital presence: a public education platform and a private advisory practice. These two sites serve distinct roles in a single acquisition funnel — one attracts and educates, the other qualifies and converts. They must look different, feel related, and work together seamlessly.

### The Solution

Two Astro-powered static websites deployed on Vercel, sharing a component foundation but expressing distinct brand identities:

| Property | ibcacademy.org | 1322legacystrategies.com |
|---|---|---|
| **Role** | Education megaphone | Advisory door |
| **Audience** | General public, IBC-curious | Pre-qualified prospects only |
| **Tone** | Warm, educational, approachable | Professional, premium, trustworthy |
| **Content Volume** | High (250K+ words target) | Low (focused, intentional) |
| **SEO Priority** | Maximum — designed to rank | Minimal — lowkey by design |
| **Visibility** | All social media points here | No social links; prospects arrive via funnel |
| **Model** | retirementresearcher.com (Wade Pfau) | griggscapitalstrategies.com (Ryan Griggs) + mcleanam.com |
| **Product Discussion** | Never | Only with qualified prospects |

### Strategic Context

Brad is currently employed at Retirement Understood (under Randy Haeuser at Futurity First Insurance Group). The advisory site **must remain lowkey** — no social media presence, no SEO optimization, no public advertising. It exists solely as a destination for prospects who have been educated through IBC Academy and are ready to begin the client journey. This separation is not optional — it's a compliance and employment constraint.

### Decision Makers

- **Brad Raschke** — Strategy, content, brand approval, business decisions
- **Chris** — Development, deployment, technical implementation (Vercel team: chrix-5697)
- **Mabel** — Architecture, content drafting, project coordination

---

## 2. System Overview & Funnel Architecture

### The Acquisition Funnel

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ACQUISITION FUNNEL                                   │
│                                                                             │
│  ┌───────────────────┐                                                      │
│  │   SOCIAL MEDIA    │  Instagram, Facebook, X, YouTube, TikTok             │
│  │  @ibcacademy      │  (All accounts branded IBC Academy)                  │
│  └────────┬──────────┘                                                      │
│           │                                                                 │
│           ▼                                                                 │
│  ┌───────────────────────────────────────────────────────────────┐          │
│  │              ibcacademy.org                                    │          │
│  │              EDUCATION PLATFORM                                │          │
│  │                                                                │          │
│  │  Blog ─── Learn Paths ─── Resources ─── Tools ─── Videos      │          │
│  │       │                                                        │          │
│  │       ├──→ Lead Magnet (email capture)                         │          │
│  │       │        │                                               │          │
│  │       │        ▼                                               │          │
│  │       │   Email Nurture Sequence                               │          │
│  │       │                                                        │          │
│  │       └──→ Skool CTA ("Deepen your education")                 │          │
│  └───────────────┬───────────────────────────────────────────────┘          │
│                  │                                                           │
│                  ▼                                                           │
│  ┌───────────────────────────────────────────────────────────────┐          │
│  │         Skool Classroom                                        │          │
│  │         skool.com/ibc-academy                                  │          │
│  │                                                                │          │
│  │  19-Module IBC Curriculum                                      │          │
│  │  Community Discussion                                          │          │
│  │  Office Hours                                                  │          │
│  │                                                                │          │
│  │  Exit CTA: "Ready to implement? →"                             │          │
│  └───────────────┬───────────────────────────────────────────────┘          │
│                  │                                                           │
│                  ▼                                                           │
│  ┌───────────────────────────────────────────────────────────────┐          │
│  │      1322legacystrategies.com                                  │          │
│  │      ADVISORY PRACTICE                                         │          │
│  │                                                                │          │
│  │  /get-started ──→ Intake Form (screening)                      │          │
│  │       │                                                        │          │
│  │       ▼                                                        │          │
│  │  Triage: GREEN / YELLOW / RED                                  │          │
│  │       │                                                        │          │
│  │       ▼ (GREEN)                                                │          │
│  │  Discovery Call (30 min)                                       │          │
│  │       │                                                        │          │
│  │       ▼                                                        │          │
│  │  Design Meeting (1 hour)                                       │          │
│  │       │                                                        │          │
│  │       ▼                                                        │          │
│  │  Application → Underwriting → Policy Delivery → CLIENT         │          │
│  └───────────────────────────────────────────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### System Data Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW                                       │
│                                                                           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                │
│  │ ibcacademy   │    │   Skool      │    │  1322legacy  │                │
│  │   .org       │    │  Classroom   │    │ strategies   │                │
│  └──────┬───────┘    └──────────────┘    └──────┬───────┘                │
│         │                                        │                        │
│         ▼                                        ▼                        │
│  ┌──────────────┐                         ┌──────────────┐               │
│  │  Newsletter  │                         │ Intake Form  │               │
│  │  Signup Form │                         │ Submission   │               │
│  └──────┬───────┘                         └──────┬───────┘               │
│         │                                        │                        │
│         ▼                                        ▼                        │
│  ┌─────────────────────────────────────────────────────┐                 │
│  │                    Formspree                          │                 │
│  │         (Form Processing & Routing Layer)            │                 │
│  └──────┬──────────────────────┬───────────────────────┘                 │
│         │                      │                                          │
│         ▼                      ▼                                          │
│  ┌──────────────┐      ┌──────────────┐                                  │
│  │  Email List  │      │    Notion    │                                  │
│  │ (ConvertKit) │      │  Database    │                                  │
│  │              │      │  (CRM)      │                                  │
│  └──────────────┘      └──────────────┘                                  │
│         │                      │                                          │
│         ▼                      ▼                                          │
│  ┌──────────────┐      ┌──────────────┐                                  │
│  │   Nurture    │      │   Brad's     │                                  │
│  │  Sequence    │      │   Triage     │                                  │
│  │  (automated) │      │  (manual)    │                                  │
│  └──────────────┘      └──────────────┘                                  │
│                                │                                          │
│                                ▼                                          │
│                        ┌──────────────┐                                  │
│                        │   Notion     │                                  │
│                        │  Calendar    │                                  │
│                        │  Booking     │                                  │
│                        └──────────────┘                                  │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Brand System

### 3.1 IBC Academy Brand

**Personality:** Warm educator. Think friendly professor, not corporate institution. Approachable without being casual. Authoritative without being stiff.

**Color Palette:**

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#1B2A4A` | Primary — headers, nav, footer, primary buttons |
| `--gold` | `#C8962E` | Accent — CTAs, highlights, hover states, links |
| `--white` | `#FFFFFF` | Background, text on dark |
| `--cream` | `#FBF8F3` | Alternate section backgrounds, card surfaces |
| `--navy-light` | `#2A3F6B` | Hover state for navy elements |
| `--navy-dark` | `#0F1D35` | Footer background, deep sections |
| `--gold-light` | `#E8B94A` | Hover state for gold elements |
| `--gold-dark` | `#A67B22` | Active state for gold elements |
| `--text-primary` | `#1B2A4A` | Body text on light backgrounds |
| `--text-secondary` | `#5A6B8A` | Supporting text, captions |
| `--text-muted` | `#8A96AD` | Placeholder text, disabled states |
| `--success` | `#2D8F5E` | Form success, progress indicators |
| `--error` | `#C53030` | Form errors, alerts |
| `--warning` | `#D69E2E` | Warning states |

**Typography:**

| Element | Font | Weight | Size (Desktop) | Size (Mobile) |
|---|---|---|---|---|
| H1 (Hero) | Playfair Display | 700 | 64px / 4rem | 40px / 2.5rem |
| H2 (Section) | Playfair Display | 700 | 48px / 3rem | 32px / 2rem |
| H3 (Subsection) | Playfair Display | 600 | 32px / 2rem | 24px / 1.5rem |
| H4 (Card Title) | Inter | 600 | 24px / 1.5rem | 20px / 1.25rem |
| Body | Inter | 400 | 18px / 1.125rem | 16px / 1rem |
| Body Small | Inter | 400 | 16px / 1rem | 14px / 0.875rem |
| Caption | Inter | 500 | 14px / 0.875rem | 12px / 0.75rem |
| Button | Inter | 600 | 16px / 1rem | 16px / 1rem |
| Nav Link | Inter | 500 | 16px / 1rem | 16px / 1rem |

**Line Heights:** Headings: 1.2 | Body: 1.7 | Captions: 1.5

**Max Content Width:** 1200px (content), 1440px (full-bleed sections)

**Letter Spacing:** Headings: -0.02em | Body: 0 | Caps/Labels: 0.05em

### 3.2 1322 Legacy Strategies Brand

**Personality:** Boutique advisor. Think wealth management firm that also happens to be deeply personal. Premium without pretension. Warm without being folksy. The Proverbs 13:22 DNA should feel like bedrock — not a marketing gimmick.

**Color Palette:**

| Token | Hex | Usage |
|---|---|---|
| `--navy-deep` | `#0F1D35` | Primary — headers, hero backgrounds, nav |
| `--gold` | `#C8962E` | Accent — CTAs, highlights, elegant details |
| `--cream` | `#FBF8F3` | Primary background, warmth |
| `--white` | `#FFFFFF` | Card surfaces, clean sections |
| `--navy-medium` | `#1B2A4A` | Secondary text, borders |
| `--charcoal` | `#2D3748` | Body text |
| `--gold-subtle` | `#C8962E1A` | Gold at 10% opacity — subtle background washes |
| `--border` | `#E2D9CC` | Warm borders, dividers |
| `--surface` | `#F7F2EB` | Card backgrounds, form fields |

**Typography:**

| Element | Font | Weight | Size (Desktop) | Size (Mobile) |
|---|---|---|---|---|
| H1 (Hero) | Cormorant Garamond | 700 | 56px / 3.5rem | 36px / 2.25rem |
| H2 (Section) | Cormorant Garamond | 600 | 42px / 2.625rem | 28px / 1.75rem |
| H3 (Subsection) | Cormorant Garamond | 600 | 28px / 1.75rem | 22px / 1.375rem |
| Body | Source Sans 3 | 400 | 18px / 1.125rem | 16px / 1rem |
| Quote/Verse | Cormorant Garamond | 400 italic | 24px / 1.5rem | 20px / 1.25rem |
| Button | Source Sans 3 | 600 | 16px / 1rem | 16px / 1rem |

**Special Element — Proverbs 13:22:**
- Used as a subtle watermark, footer motto, or section divider
- Set in Cormorant Garamond italic, gold color, reduced opacity (0.6)
- Never preachy, never prominent — woven into the fabric like a family crest

### 3.3 Shared Design Tokens

Both sites share the gold accent (`#C8962E`) and cream background (`#FBF8F3`), creating visual kinship without identical appearance. A user moving from ibcacademy.org to 1322legacystrategies.com should feel a sense of "same family, different room."

**Shared Token Source:** Both repos consume these tokens. When any shared token value changes, update both repos. Consider extracting to a shared `tokens.json` file (Git submodule or published artifact) when component sharing matures in Phase 2.

```css
/* Shared Tailwind v4 theme tokens (CSS custom properties) */
/* Both sites extend these with their own overrides */

@theme {
  /* Shared Tokens */
  --color-gold: #C8962E;
  --color-gold-light: #E8B94A;
  --color-gold-dark: #A67B22;
  --color-cream: #FBF8F3;
  --color-white: #FFFFFF;
  --color-success: #2D8F5E;
  --color-error: #C53030;
  --color-warning: #D69E2E;

  /* Spacing Scale */
  --space-xs: 0.25rem;    /* 4px */
  --space-sm: 0.5rem;     /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --space-5xl: 8rem;      /* 128px */

  /* Border Radius */
  --radius-sm: 0.375rem;  /* 6px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
  --shadow-glow: 0 0 20px rgba(200, 150, 46, 0.15);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-Index Scale */
  --z-base: 0;
  --z-elevated: 10;
  --z-dropdown: 20;
  --z-sticky: 30;
  --z-overlay: 40;
  --z-modal: 50;
  --z-toast: 60;
}
```

---

## 4. Site 1: ibcacademy.org — Education Platform

### 4.1 Site Purpose & Strategy

IBC Academy is Brad's megaphone. Every piece of social media content, every YouTube video, every podcast appearance points here. The site's job is threefold:

1. **Attract** — Rank in search for IBC-related queries, capture organic traffic
2. **Educate** — Deliver structured learning paths that build understanding progressively
3. **Convert** — Capture emails via lead magnets, nurture prospects, and funnel the educated ones to Skool and eventually to 1322legacystrategies.com

The site never sells a product. It never discusses specific policies, premium amounts, or insurance carriers. It is purely educational — a content moat that establishes Brad (via IBC Academy) as a trusted authority in the IBC space.

### 4.2 Site Map (Complete)

```
ibcacademy.org
│
├── /                              Homepage
│
├── /learn/                        Education Hub
│   ├── /learn/start-here          Beginner's Guide to IBC
│   ├── /learn/foundations          Core Concepts (maps to Skool 1-8)
│   │   ├── /learn/foundations/banking-function
│   │   ├── /learn/foundations/grocery-store-analogy
│   │   ├── /learn/foundations/five-human-problems
│   │   ├── /learn/foundations/creating-the-entity
│   │   ├── /learn/foundations/honest-money
│   │   ├── /learn/foundations/your-money-or-your-life
│   │   ├── /learn/foundations/opportunity-cost
│   │   └── /learn/foundations/thinking-like-a-banker
│   ├── /learn/mechanics            Policy Mechanics (maps to Skool 9-14)
│   │   ├── /learn/mechanics/whole-life-101
│   │   ├── /learn/mechanics/mutual-vs-stock
│   │   ├── /learn/mechanics/base-premium-pua
│   │   ├── /learn/mechanics/dividends-explained
│   │   ├── /learn/mechanics/policy-loans
│   │   └── /learn/mechanics/direct-vs-non-direct
│   ├── /learn/advanced             Advanced Topics (maps to Skool 15-19)
│   │   ├── /learn/advanced/capitalizing-your-system
│   │   ├── /learn/advanced/family-banking
│   │   ├── /learn/advanced/business-applications
│   │   ├── /learn/advanced/real-estate-ibc
│   │   └── /learn/advanced/multi-generational
│   └── /learn/glossary             IBC Terminology Glossary
│
├── /resources/                    Resource Library
│   ├── /resources/byob            BYOB Reading Guide & Purchase Link
│   ├── /resources/videos          Video Library (YouTube embeds)
│   ├── /resources/podcasts        Podcast Recommendations
│   └── /resources/books           Recommended Reading List
│
├── /blog/                         Blog Index (MDX Content Collection)
│   └── /blog/[slug]              Individual Blog Posts
│
├── /case-studies/                 Case Study Index
│   └── /case-studies/[slug]      Individual Case Studies
│
├── /tools/                        Interactive Tools Hub
│   ├── /tools/interest-bleed      Interest Bleed Calculator
│   ├── /tools/family-bank         Family Bank Projector
│   └── /tools/opportunity-cost    Opportunity Cost Comparison
│
├── /academy                       Skool Classroom Landing Page
│
├── /about                         About IBC Academy & Brad's Mission
│
├── /newsletter                    Email Signup + Lead Magnet
│
├── /webinar                       Monthly Webinar Registration
│
├── /legal/disclaimer              Legal Disclaimer
├── /legal/privacy                 Privacy Policy
└── /legal/terms                   Terms of Use
```

### 4.3 Page Specifications

#### Homepage (`/`)

**Purpose:** First impression. Communicate who we are, what we teach, and where to start — in 5 seconds or less.

**Layout (top to bottom):**

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Learn ▾ | Resources ▾ | Blog | Tools | Academy │
│                                          [Start Learning →]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  HERO SECTION (fullscreen viewport)                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │   Kinetic Typography:                                       │ │
│  │   "Master the Infinite Banking Concept"                     │ │
│  │                                                             │ │
│  │   Subtitle: "Free education that transforms how you         │ │
│  │   think about money, banking, and generational wealth."     │ │
│  │                                                             │ │
│  │   [Start Here — It's Free]    [Watch Intro Video ▶]        │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SOCIAL PROOF BAR (scroll-reveal)                               │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐               │
│  │ 500+   │  │ 19     │  │ 1,000+ │  │ NNI    │               │
│  │Students│  │Modules │  │Hours   │  │Certified│               │
│  └────────┘  └────────┘  └────────┘  └────────┘               │
│  (CountUp animation on scroll)                                   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LEARNING PATHS (3 cards, staggered reveal)                     │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐  │
│  │  🌱 FOUNDATIONS │ │  ⚙️ MECHANICS   │ │  🚀 ADVANCED    │  │
│  │                 │ │                  │ │                  │  │
│  │  Start here if  │ │  How the policy  │ │  Family banking, │  │
│  │  you're new to  │ │  actually works  │ │  business apps,  │  │
│  │  IBC concepts   │ │  under the hood  │ │  multi-gen wealth│  │
│  │                 │ │                  │ │                  │  │
│  │  8 Lessons      │ │  6 Lessons       │ │  5 Lessons       │  │
│  │  [Begin →]      │ │  [Begin →]       │ │  [Begin →]       │  │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  "WHAT IS IBC?" EXPLAINER (SplitContent)                        │
│  ┌──────────────────────┬─────────────────────────────────────┐ │
│  │                      │                                      │ │
│  │   [Animated          │  "The Infinite Banking Concept is    │ │
│  │    illustration      │  a process — not a product.          │ │
│  │    or video]         │  It's a way of recapturing the       │ │
│  │                      │  banking function in your life..."   │ │
│  │                      │                                      │ │
│  │                      │  [Read the Full Guide →]             │ │
│  └──────────────────────┴─────────────────────────────────────┘ │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FEATURED BLOG POSTS (3 latest, card layout)                    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  LEAD MAGNET CTA (full-width, gold accent)                      │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📘 Download the Free IBC Starter Guide                    │ │
│  │  "Everything you need to know before you read the book."   │ │
│  │  [Email] [Get the Guide →]                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INTERACTIVE TOOLS PREVIEW                                      │
│  "See what IBC can do for you"                                  │
│  [Interest Bleed Calculator] [Family Bank Projector]            │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SKOOL CLASSROOM CTA                                            │
│  "Ready to go deeper? Join 500+ students in the free            │
│   IBC Academy classroom."                                        │
│  [Join the Classroom →]                                          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FOOTER                                                          │
│  Logo | Site Map | Legal | Social Links | Newsletter Signup     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Education Hub (`/learn`)

**Purpose:** Central navigation for all learning paths. Visual progress tracking. Gateway to structured curriculum.

**Key Features:**
- Three learning path cards with progress indicators (using localStorage for anonymous tracking)
- "Start Here" prominence for new visitors
- Breadcrumb navigation throughout all `/learn/*` pages
- Each sub-topic page includes: concept explanation (MDX), embedded video (if available), key takeaways box, "Next Lesson" navigation, link to corresponding Skool module
- Sidebar navigation showing full curriculum outline with current position highlighted

**Content Collection Schema:**

```typescript
// src/content/config.ts (ibcacademy.org)
import { defineCollection, z } from 'astro:content';

const learnCollection = defineCollection({
  type: 'content', // MDX
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.enum(['foundations', 'mechanics', 'advanced']),
    order: z.number(),
    skoolModule: z.number().optional(),     // Maps to Skool module number
    estimatedMinutes: z.number(),
    videoUrl: z.string().url().optional(),
    prerequisites: z.array(z.string()).optional(),
    keyTakeaways: z.array(z.string()),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Brad Raschke'),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    category: z.enum([
      'foundations', 'mechanics', 'case-studies',
      'austrian-economics', 'mindset', 'news'
    ]),
    tags: z.array(z.string()),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonical: z.string().url().optional(),
  }),
});

const caseStudyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    clientType: z.string(),          // "Business Owner", "Young Professional", etc.
    scenario: z.string(),            // Brief one-line scenario
    publishedAt: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const glossaryCollection = defineCollection({
  type: 'data', // JSON/YAML
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    relatedTerms: z.array(z.string()).optional(),
    source: z.string().optional(),  // "Nash, BYOB p.42"
    category: z.enum([
      'core-concept', 'policy-mechanics', 'economics',
      'insurance-term', 'ibc-specific'
    ]),
  }),
});

export const collections = {
  learn: learnCollection,
  blog: blogCollection,
  'case-studies': caseStudyCollection,
  glossary: glossaryCollection,
};
```

#### Blog (`/blog`)

**Purpose:** SEO content moat. 250K+ words target. Every post designed to rank and educate.

**Index Page Features:**
- Featured post (hero card, full-width)
- Category filter (tabs or pills): All, Foundations, Mechanics, Case Studies, Austrian Economics, Mindset
- Search (client-side via pagefind or Fuse.js)
- Pagination (12 posts per page)
- Tag cloud sidebar (desktop) or expandable section (mobile)

**Individual Post Features:**
- Estimated reading time
- Table of contents (auto-generated from headings, sticky sidebar on desktop)
- Social share buttons
- Author byline with avatar
- Related posts (3, based on tags/category)
- CTA at bottom: newsletter signup or Skool classroom
- Structured data (Article schema for SEO)

#### Tools (`/tools/*`)

**Purpose:** Interactive calculators that demonstrate IBC concepts with the user's own numbers. High engagement, high shareability, email capture gate (optional).

**Interest Bleed Calculator (`/tools/interest-bleed`):**
- Inputs: auto loan balance, mortgage balance, student loans, credit cards, interest rates
- Output: total interest paid to external banks per month/year/lifetime
- Visual: animated counter showing money leaving the user's system
- CTA: "What if you could recapture this? Start learning →"

**Family Bank Projector (`/tools/family-bank`):**
- Inputs: monthly premium, years of capitalization, family members
- Output: projected family bank value, number of loans recaptured, generational growth
- Visual: tree diagram showing multi-generational growth
- Disclaimer: "This is an educational illustration, not a policy projection"

**Opportunity Cost Calculator (`/tools/opportunity-cost`):**
- Inputs: purchase price, financing method (bank loan vs. IBC loan)
- Output: side-by-side comparison showing total cost, interest paid, and where the interest goes
- Visual: split-screen animation

**Technical Note:** All calculators are React islands (`client:visible`). No user data is stored or transmitted. Calculations happen client-side. Optional email gate: "Get your full report emailed to you" captures email before showing detailed results.

#### Academy Landing (`/academy`)

**Purpose:** Bridge page between ibcacademy.org and Skool. Sells the value of the classroom without being salesy.

**Content:**
- What the classroom includes (19 modules overview)
- Student count / social proof
- Sample module preview (video embed)
- FAQ about the classroom
- Large CTA: "Join the Free Classroom →" (links to skool.com/ibc-academy)

### 4.4 Navigation Structure

**Primary Navigation (Desktop):**

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [LOGO]  │  Learn ▾  │  Resources ▾  │  Blog  │  Tools  │  Academy   │
│          │           │               │        │         │             │
│          │           │               │        │         │ [Start      │
│          │           │               │        │         │  Learning]  │
└──────────┴───────────┴───────────────┴────────┴─────────┴─────────────┘
```

**Learn Mega Menu:**

```
┌───────────────────────────────────────────────────────────────┐
│  LEARNING PATHS                                                │
│                                                                │
│  🌱 Foundations          ⚙️ Mechanics         🚀 Advanced     │
│  ─────────────          ──────────          ──────────       │
│  Start Here             Whole Life 101       Capitalizing     │
│  Banking Function       Mutual vs Stock      Family Banking   │
│  Grocery Store          Base & PUA           Business Apps    │
│  Five Problems          Dividends            Real Estate      │
│  Creating Entity        Policy Loans         Multi-Gen        │
│  ...                    ...                                    │
│                                                                │
│  📖 Glossary            📚 All Lessons                         │
└───────────────────────────────────────────────────────────────┘
```

**Resources Mega Menu:**

```
┌───────────────────────────────────────────────────────────────┐
│  RESOURCES                                                     │
│                                                                │
│  📖 BYOB Reading Guide    🎥 Video Library                    │
│  The foundational text     YouTube lessons organized by topic  │
│                                                                │
│  🎙️ Podcasts              📚 Recommended Books                │
│  IBC-related podcasts      Austrian economics & IBC reading    │
│                                                                │
│  📊 Case Studies           🔧 Interactive Tools                │
│  Real-world IBC examples   Calculators & projectors            │
└───────────────────────────────────────────────────────────────┘
```

**Mobile Navigation:**
- Hamburger menu (top-right)
- Full-screen overlay with accordion sections
- "Start Learning" CTA always visible (fixed bottom bar on mobile)

---

## 5. Site 2: 1322legacystrategies.com — Advisory Practice

### 5.1 Site Purpose & Strategy

This is the door, not the megaphone. Visitors arrive here only after being educated through IBC Academy. The site's job:

1. **Confirm credibility** — Brad's story, credentials, and approach
2. **Prepare** — Walk prospects through the client journey before they begin it
3. **Qualify** — The intake form screens for readiness and red flags
4. **Convert** — Book qualified Discovery Calls

**Critical constraint:** This site stays lowkey. No social media presence, no aggressive SEO, no advertising. Traffic comes exclusively through the funnel (ibcacademy.org → Skool → here).

### 5.2 Site Map (Complete)

```
1322legacystrategies.com
│
├── /                              Homepage
│
├── /about                         Brad's Story
│   └── /about/process             Client Journey (visual timeline)
│
├── /get-started                   Intake Form
│   └── /get-started/thank-you     Confirmation + Next Steps
│
├── /journey/                      New Client Preparation Guide
│   ├── /journey/discovery-call    Step 1: Discovery Call
│   ├── /journey/education         Step 2: Education Phase
│   ├── /journey/design-meeting    Step 3: Design Meeting
│   ├── /journey/application       Step 4: Application & Underwriting
│   ├── /journey/policy-delivery   Step 5: Policy Delivery
│   └── /journey/client-support    Step 6: Ongoing Support
│
├── /resources                     Recommended Reading
│
├── /faq                           Common Questions
│
├── /legal/disclaimer              Legal Disclaimer
├── /legal/privacy                 Privacy Policy
└── /legal/terms                   Terms of Use
```

### 5.3 Page Specifications

#### Homepage (`/`)

**Purpose:** Professional first impression. Establish trust immediately. One clear CTA.

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | About | Journey | FAQ | Resources               │
│                                        [Get Started →]          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  HERO SECTION                                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │   "A good man leaves an inheritance                         │ │
│  │    to his children's children."                             │ │
│  │              — Proverbs 13:22                               │ │
│  │                                                             │ │
│  │   Your family's financial legacy begins with                │ │
│  │   a single, deliberate decision.                            │ │
│  │                                                             │ │
│  │   [Begin Your Journey →]                                    │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Background: Soft gradient, warm tones, subtle organic shapes    │
│  NO stock photos. Texture and color only.                        │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BRAD'S STORY (condensed)                                       │
│  ┌──────────────────────┬─────────────────────────────────────┐ │
│  │                      │                                      │ │
│  │   [Brad's photo      │  "My grandfather funded the college  │ │
│  │    — professional    │  education of all 9 grandchildren    │ │
│  │    but warm]         │  through life insurance policies he  │ │
│  │                      │  quietly designed decades earlier.   │ │
│  │                      │  I didn't have a name for what he    │ │
│  │                      │  did until I read Becoming Your      │ │
│  │                      │  Own Banker..."                      │ │
│  │                      │                                      │ │
│  │                      │  [Read the Full Story →]             │ │
│  └──────────────────────┴─────────────────────────────────────┘ │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  THE PROCESS (6 steps, horizontal timeline)                     │
│                                                                  │
│  ①────②────③────④────⑤────⑥                                    │
│  Discovery  Education  Design  Application  Policy   Ongoing    │
│  Call                  Meeting              Delivery  Support    │
│                                                                  │
│  [Learn About the Journey →]                                     │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CREDENTIALS & TRUST                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │  NNI     │  │ Authorized│  │ Mutual   │                      │
│  │Certified │  │ IBC      │  │Companies │                      │
│  │          │  │Practitioner│ │  Only    │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  CTA (full-width, premium feel)                                 │
│  "Ready to explore IBC for your family?"                         │
│  [Get Started — Request a Discovery Call →]                      │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  FOOTER                                                          │
│  Logo | Proverbs 13:22 quote | Legal | Minimal site map        │
│  NO social media links                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Intake Form (`/get-started`)

**Purpose:** The gatekeeper. Multi-step form that screens prospects while feeling respectful and warm.

**Technical Implementation:** React island (`client:load`) with CSS transitions between steps.

**Form Steps:**

```
Step 1: About You
├── Legal First Name *
├── Legal Middle Name
├── Legal Last Name *
├── Preferred Name
├── Phone Number *
├── Email Address *
├── U.S. Citizen/Resident? * (radio)
├── State of Residence * (dropdown)
├── Age * (number)
├── Marital Status * (radio)
└── Employment Status * (checkbox, multi-select)

Step 2: Screening (THE GATES)
├── Insurance Licensing? * (radio) — RED FLAG FIELD
│   └── [Conditional: If "Yes" → text field for details]
├── Own BYOB? * (radio, 3 options) — SECOND GATE
│   └── [Conditional: If "No" → inline message with purchase link]
└── IBC Academy Classroom completion? * (radio, 4 options)

Step 3: Your Situation
├── Existing Life Insurance * (checkbox, multi-select)
├── Primary Financial Goal * (textarea, 1000 char)
└── What caused you to reach out? * (textarea, 2000 char)

Step 4: Discovery & Attribution
├── How did you hear about us? * (checkbox, multi-select)
│   └── [Conditional: If "Referral" → "Who referred you?" text field]
├── IBC Educational Experience * (checkbox, multi-select)
└── Self-assessed understanding * (radio, 4 levels)

Step 5: Scheduling
├── Want to schedule a Discovery Call? * (radio, 3 options)
├── General availability * (checkbox, multi-select)
└── Anything else? (textarea, optional, 1000 char)

→ Submit → /get-started/thank-you
```

**Hidden Fields (anti-spam):**
```
├── _gotcha (honeypot — hidden via CSS `position: absolute; left: -9999px`,
│            NOT `display: none` — bots detect that)
```

**Form Behavior:**
- Progress bar at top showing current step (1 of 5)
- Smooth transitions between steps (CSS opacity + translateX, 300ms ease-out)
- Inline validation with helpful error messages (not red screaming)
- Form field data stored in `sessionStorage` (cleared when the tab closes). Only the current step number and form start timestamp are stored in `localStorage` (non-PII metadata for abandonment tracking). No PII is persisted in browser storage beyond the active tab session.
- Submit → Formspree AJAX endpoint → Brad's email + Notion database (via Formspree webhook or Zapier)
- All form data encrypted in transit (HTTPS)
- Client-side Zod validation provides UX feedback. Formspree provides server-side validation, spam filtering, and rate limiting. Both layers are required.

**Form Security:**
- **Honeypot field:** `_gotcha` hidden input (see above). Formspree silently discards submissions that fill this field.
- **reCAPTCHA:** Formspree invisible reCAPTCHA v2 enabled on the form endpoint. No user-facing CAPTCHA UI unless triggered by suspicious behavior.
- **Server-side validation:** Formspree validates required fields and field types. Client-side Zod schemas enforce the same rules for instant UX feedback, but Formspree is the source of truth.
- **Rate limiting:** Formspree applies built-in rate limits per IP. No additional server-side rate limiting needed for v1.
- **Sanitization:** Free-text fields (financial goals, motivation, additional notes) are submitted as plain text. Formspree and Notion both escape content on ingestion — no raw HTML rendering.

**Error Handling:**
- Form submission uses AJAX (`fetch()` to Formspree endpoint), not native form POST, to control error handling.
- On submission failure: `try/catch` fires Plausible custom event `intake_form_error` with props `{ error_type, step_number, http_status }`. User sees a friendly error message with a retry button.
- On second consecutive failure: display Brad's direct email address as a fallback ("Having trouble? Email brad@1322legacystrategies.com directly").
- Sentry error boundary wraps the IntakeForm component to capture React rendering errors and JavaScript exceptions in production.

**Triage Rules (automated in Notion or email template):**

| Signal | Classification | Action |
|---|---|---|
| Not licensed + Read BYOB + Clear goals + Wants to schedule | 🟢 GREEN | Send booking link within 24h |
| Owns BYOB but hasn't read | 🟡 YELLOW | Email: encourage reading, follow up in 2-3 weeks |
| Doesn't own BYOB | 🟡 YELLOW | Email: purchase link, point to Skool, follow up 3-4 weeks |
| Licensed or considering licensure | 🔴 RED | Investigate before any call |
| Claims IBC Practitioner | 🔴 RED | Why is a practitioner filling out a client form? |
| Self-assessment >> actual education | 🔴 RED | Mismatch — proceed with caution |

#### Client Journey (`/journey/*`)

**Purpose:** The New Client Preparation Guide as a web experience. Each step is its own page, creating a narrative flow through the client journey.

**Design:**
- Consistent sidebar or top navigation showing all 6 steps
- Current step highlighted
- Each page is a rich, content-driven experience (not just text — includes illustrations, timelines, checklists)
- Printable/downloadable as PDF (CSS print styles or PDF generation)
- Visual timeline at top of each page showing where this step fits

**Content source:** `C:\Users\bradl\clawd\drafts\new-client-preparation-guide-v1.md` (already drafted, 8 pages)

### 5.4 Navigation Structure

**Primary Navigation (Desktop):**

```
┌─────────────────────────────────────────────────────────────────┐
│  [LOGO]  │  About  │  Journey  │  FAQ  │  Resources            │
│          │         │           │       │                        │
│          │         │           │       │     [Get Started →]    │
└──────────┴─────────┴───────────┴───────┴────────────────────────┘
```

Simple. Clean. No mega menus needed. The site is small and intentional.

**Mobile Navigation:**
- Hamburger menu, full-screen overlay
- "Get Started" CTA always visible (fixed bottom bar)

---

## 6. Technical Architecture

### 6.1 Technology Stack

```
┌──────────────────────────────────────────────────────────────────────┐
│                        TECHNOLOGY STACK                                │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  FRAMEWORK          Astro 5.x (latest stable)                   │ │
│  │                     Output: static (SSG)                         │ │
│  │                     View Transitions: enabled                    │ │
│  │                     Islands: React (for interactive components)  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  STYLING            Tailwind CSS v4                              │ │
│  │                     CSS custom properties for design tokens      │ │
│  │                     @theme directive for token definitions        │ │
│  │                     No component library — custom-built          │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  UI FRAMEWORK       React 19 (islands only)                     │ │
│  │                     Used for: forms, calculators, filters        │ │
│  │                     NOT used for: static content, nav, footer    │ │
│  │                     Directive: client:visible (lazy) or          │ │
│  │                               client:load (forms)                │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  ANIMATION          CSS transitions (React island step changes)  │ │
│  │                     CSS animations (non-React sections)          │ │
│  │                     IntersectionObserver (scroll reveals)        │ │
│  │                     View Transitions API (page transitions)      │ │
│  │                     Respects prefers-reduced-motion              │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  CONTENT            MDX (blog, learn pages, case studies)       │ │
│  │                     Astro Content Collections (typed schemas)    │ │
│  │                     JSON/YAML (glossary, structured data)        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  SEARCH             Pagefind (static search, zero-JS at rest)   │ │
│  │                     Built at build time, loaded on demand        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  FORMS              Formspree (managed form processing)          │ │
│  │                     AJAX submissions, honeypot + reCAPTCHA       │ │
│  │                     Submissions → Brad's email + Notion          │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  HOSTING            Vercel (team: chrix-5697)                   │ │
│  │                     Auto-deploy from GitHub on push to main      │ │
│  │                     Preview deployments on PRs                   │ │
│  │                     Static output — no server functions needed   │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  ANALYTICS          Plausible Analytics (privacy-focused)       │ │
│  │                     No cookies, GDPR compliant, lightweight     │ │
│  │                     Custom events for form submissions,          │ │
│  │                     calculator usage, CTA clicks                 │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  EMAIL              ConvertKit (Kit) — newsletter + nurture      │ │
│  │                     Transactional confirmations: Formspree       │ │
│  │                                                                  │ │
│  │  ERROR TRACKING     Sentry (free tier) — React island errors    │ │
│  │                     Error boundaries on IntakeForm + calculators │ │
│  │                                                                  │ │
│  │  UPTIME             UptimeRobot (free tier) — HTTPS checks      │ │
│  │                     Monitors both sites + Formspree endpoint     │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

**ConvertKit (Kit) Integration Points:**

| Integration | Site | Mechanism |
|---|---|---|
| Newsletter signup | ibcacademy.org | ConvertKit form embed (or API via `CONVERTKIT_FORM_ID`). Subscriber tagged `source:academy`. |
| Lead magnet download | ibcacademy.org | ConvertKit form with automation: deliver PDF via email, tag `lead-magnet:starter-guide`, enter nurture sequence. |
| Webinar registration | ibcacademy.org | ConvertKit form, tag `webinar:registered`, trigger reminder sequence. |
| Intake form submission | 1322legacystrategies.com | Formspree webhook → Zapier → ConvertKit API. Subscriber created with tags: `source:intake-form`, `triage:{green\|yellow\|red}`. Triggers appropriate nurture sequence. |

**ConvertKit Subscriber Tags:**
- `source:academy` — signed up via ibcacademy.org newsletter
- `source:intake-form` — submitted intake form on 1322legacystrategies.com
- `lead-magnet:starter-guide` — downloaded the IBC Starter Guide
- `completed:skool-classroom` — completed the Skool curriculum (manual tag or Zapier)
- `triage:green`, `triage:yellow`, `triage:red` — intake form triage classification
- `intake-submitted` — master tag for all intake form submissions, triggers nurture

**Uptime Monitoring (UptimeRobot):**

| Endpoint | Check Type | Interval | Alert Recipients |
|---|---|---|---|
| `https://ibcacademy.org` | HTTPS | 5 min | Brad, Chris (email) |
| `https://1322legacystrategies.com` | HTTPS | 5 min | Brad, Chris (email) |
| Formspree submission endpoint | HTTP keyword | 15 min | Chris (email) |

### 6.2 Astro Configuration

```javascript
// astro.config.mjs (ibcacademy.org)
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://ibcacademy.org',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/legal/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ['img.youtube.com'],
  },
  prefetch: {
    defaultStrategy: 'viewport',  // Prefetch links in viewport — balances speed with mobile bandwidth
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  // View Transitions enabled per-page via <ViewTransitions /> component
});
```

```javascript
// astro.config.mjs (1322legacystrategies.com)
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://1322legacystrategies.com',
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    imageService: true,
  }),
  integrations: [
    react(),
    // No MDX — this site has minimal content pages
    // No sitemap — lowkey by design, minimal SEO
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  prefetch: {
    defaultStrategy: 'viewport',  // Prefetch links in viewport — balances speed with mobile bandwidth
  },
});
```

### 6.3 Performance Architecture

**Target Metrics:**

| Metric | Target | How We Achieve It |
|---|---|---|
| Lighthouse Performance | 100 | Static HTML, zero JS on content pages, optimized images |
| Lighthouse Accessibility | 100 | Semantic HTML, ARIA, focus management, color contrast |
| Lighthouse Best Practices | 100 | HTTPS, no console errors, modern APIs |
| Lighthouse SEO | 100 | Meta tags, structured data, sitemap, robots.txt |
| First Contentful Paint | <1.0s | Static HTML, inline critical CSS, font preloading |
| Largest Contentful Paint | <2.0s | Optimized hero images (AVIF/WebP), above-fold priority |
| Total Blocking Time (static pages) | 0ms | No JS on static pages |
| Total Blocking Time (lazy islands) | <100ms | `client:visible` islands hydrate on scroll |
| Total Blocking Time (eager islands) | <200ms | `client:load` islands (intake form) hydrate immediately |
| Cumulative Layout Shift | 0 | Explicit dimensions on images, font-display: swap with size-adjust |
| Mobile PageSpeed | 95+ | Mobile-first CSS, lazy loading, image optimization |

**Image Optimization Strategy:**

```astro
---
// Use Astro's built-in <Image /> component
import { Image } from 'astro:assets';
import heroImage from '../assets/images/hero.jpg';
---

<!-- Astro automatically generates: -->
<!-- - AVIF format (primary) -->
<!-- - WebP format (fallback) -->
<!-- - Multiple widths (responsive) -->
<!-- - Proper width/height attributes (no CLS) -->
<Image
  src={heroImage}
  alt="Descriptive alt text for accessibility"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
  loading="eager"  <!-- Only for above-fold images -->
  quality={80}
/>
```

**Font Loading Strategy:**

```html
<!-- Preload critical self-hosted fonts in <head> -->
<!-- All fonts are self-hosted — no external font service dependencies -->

<!-- ibcacademy.org: Playfair Display (headings) + Inter (body) -->
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/playfair-display-700.woff2" crossorigin />
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/inter-400.woff2" crossorigin />

<!-- 1322legacystrategies.com: Cormorant Garamond (headings) + Source Sans 3 (body) -->
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/cormorant-garamond-700.woff2" crossorigin />
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/source-sans-3-400.woff2" crossorigin />

<!-- Use font-display: swap with size-adjust to prevent CLS -->
```

**JavaScript Budget:**

| Page Type | JS Budget | Notes |
|---|---|---|
| Static content (blog, learn, about) | 0 KB | Zero JS shipped. Pure HTML + CSS. |
| Pages with newsletter form | ~15 KB | React island, loaded on scroll into view |
| Calculator pages | ~30 KB | React island, loaded on visibility |
| Intake form page | ~25 KB | React + Zod island, loaded immediately (critical path) |
| Resource filter page | ~20 KB | React island, loaded on visibility |

### 6.4 Repository Structure

```
github.com/L0v3Chrix/ibc-academy-site/
├── .github/
│   └── workflows/
│       └── lighthouse.yml          # CI Lighthouse audits on PRs
├── public/
│   ├── fonts/                      # Self-hosted web fonts
│   ├── images/                     # Static images (favicons, OG images)
│   ├── downloads/                  # Lead magnets (PDFs)
│   ├── robots.txt
│   ├── sitemap.xml                 # Auto-generated by @astrojs/sitemap
│   └── _redirects                  # Redirect rules
├── src/
│   ├── assets/                     # Processed images (Astro Image pipeline)
│   │   └── images/
│   ├── components/
│   │   ├── layout/                 # Header, Footer, Nav, MobileMenu
│   │   ├── ui/                     # Button, Card, Badge, Accordion, Tabs, Toast
│   │   ├── sections/               # Hero, Section, SplitContent, CTABanner
│   │   ├── animation/              # ScrollReveal, CountUp, TypeWriter, StaggeredList
│   │   ├── islands/                # React components (forms, calculators, filters)
│   │   │   ├── NewsletterSignup.tsx
│   │   │   ├── WebinarRegistration.tsx
│   │   │   ├── InterestBleedCalc.tsx
│   │   │   ├── FamilyBankProjector.tsx
│   │   │   ├── OpportunityCostCalc.tsx
│   │   │   └── ResourceFilter.tsx
│   │   └── seo/                    # StructuredData, MetaTags, OGImage
│   ├── content/
│   │   ├── learn/                  # MDX learning path content
│   │   │   ├── foundations/
│   │   │   ├── mechanics/
│   │   │   └── advanced/
│   │   ├── blog/                   # MDX blog posts
│   │   ├── case-studies/           # MDX case studies
│   │   └── glossary/               # JSON glossary entries
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, meta, fonts, analytics
│   │   ├── PageLayout.astro        # Standard page (header + footer)
│   │   ├── LearnLayout.astro       # Learning pages (sidebar nav + progress)
│   │   ├── BlogLayout.astro        # Blog post (TOC sidebar + author)
│   │   └── ToolLayout.astro        # Calculator pages
│   ├── lib/
│   │   ├── utils.ts                # Helper functions
│   │   ├── constants.ts            # Site-wide constants
│   │   └── seo.ts                  # SEO helpers (structured data generators)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── learn/
│   │   │   ├── index.astro
│   │   │   ├── start-here.astro
│   │   │   ├── glossary.astro
│   │   │   ├── foundations/
│   │   │   │   └── [...slug].astro  # Dynamic routes from content collection
│   │   │   ├── mechanics/
│   │   │   │   └── [...slug].astro
│   │   │   └── advanced/
│   │   │       └── [...slug].astro
│   │   ├── resources/
│   │   │   ├── index.astro
│   │   │   ├── byob.astro
│   │   │   ├── videos.astro
│   │   │   ├── podcasts.astro
│   │   │   └── books.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── [...slug].astro
│   │   │   └── [...page].astro      # Pagination
│   │   ├── case-studies/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── tools/
│   │   │   ├── index.astro
│   │   │   ├── interest-bleed.astro
│   │   │   ├── family-bank.astro
│   │   │   └── opportunity-cost.astro
│   │   ├── academy.astro
│   │   ├── about.astro
│   │   ├── newsletter.astro
│   │   ├── webinar.astro
│   │   └── legal/
│   │       ├── disclaimer.astro
│   │       ├── privacy.astro
│   │       └── terms.astro
│   └── styles/
│       ├── global.css              # Tailwind imports, base styles, font-face
│       ├── tokens.css              # Design tokens (@theme)
│       └── print.css               # Print stylesheet
├── astro.config.mjs
├── tailwind.config.ts              # (or inline in CSS with v4)
├── tsconfig.json
├── package.json
└── README.md
```

```
github.com/L0v3Chrix/1322-legacy-site/
├── .github/
│   └── workflows/
│       └── lighthouse.yml
├── public/
│   ├── fonts/
│   ├── images/
│   └── robots.txt                  # Minimal — not optimized for crawlers
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── layout/                 # Header, Footer, Nav
│   │   ├── ui/                     # Button, Card, Accordion, Timeline
│   │   ├── sections/               # Hero, Section, SplitContent, ProcessTimeline
│   │   ├── animation/              # ScrollReveal, CountUp
│   │   └── islands/
│   │       └── IntakeForm.tsx      # The multi-step intake form (React)
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   └── JourneyLayout.astro     # Client journey pages (step indicator)
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── formSchema.ts           # Zod validation schemas for intake form
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about/
│   │   │   ├── index.astro
│   │   │   └── process.astro
│   │   ├── get-started/
│   │   │   ├── index.astro
│   │   │   └── thank-you.astro
│   │   ├── journey/
│   │   │   ├── index.astro
│   │   │   ├── discovery-call.astro
│   │   │   ├── education.astro
│   │   │   ├── design-meeting.astro
│   │   │   ├── application.astro
│   │   │   ├── policy-delivery.astro
│   │   │   └── client-support.astro
│   │   ├── resources.astro
│   │   ├── faq.astro
│   │   └── legal/
│   │       ├── disclaimer.astro
│   │       ├── privacy.astro
│   │       └── terms.astro
│   └── styles/
│       ├── global.css
│       ├── tokens.css
│       └── print.css
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 7. Component Library

### 7.1 Component Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                      COMPONENT HIERARCHY                              │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ LAYOUTS (Astro — server-rendered, zero JS)                      │ │
│  │                                                                  │ │
│  │  BaseLayout → PageLayout → LearnLayout / BlogLayout / etc.      │ │
│  │                                                                  │ │
│  │  Responsibility: HTML shell, meta tags, fonts, analytics,        │ │
│  │                  header/footer, View Transitions                  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                           │                                           │
│                           ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ SECTIONS (Astro — server-rendered, zero JS)                     │ │
│  │                                                                  │ │
│  │  Hero, Section, SplitContent, CTABanner, ProcessTimeline        │ │
│  │                                                                  │ │
│  │  Responsibility: Page sections, content structure, grid/layout   │ │
│  │                  Includes scroll-reveal via CSS animations       │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                           │                                           │
│                           ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ UI COMPONENTS (Astro — server-rendered, zero JS)                │ │
│  │                                                                  │ │
│  │  Button, Card, Badge, Accordion, Tabs, Progress, Toast          │ │
│  │                                                                  │ │
│  │  Responsibility: Atomic UI elements, styling, variants           │ │
│  │  Note: Accordion/Tabs use <details>/<summary> or CSS-only        │ │
│  │        toggles for zero-JS interactivity                         │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                           │                                           │
│                           ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ ANIMATION (Astro + CSS — minimal/zero JS)                       │ │
│  │                                                                  │ │
│  │  ScrollReveal, CountUp, StaggeredList                           │ │
│  │                                                                  │ │
│  │  Responsibility: Entrance animations, scroll-triggered effects   │ │
│  │  Implementation: CSS @keyframes + IntersectionObserver           │ │
│  │                  (vanilla JS, no framework dependency)            │ │
│  │  Respects: prefers-reduced-motion media query                    │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                           │                                           │
│                           ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ ISLANDS (React — client-side, JS shipped only for these)        │ │
│  │                                                                  │ │
│  │  IntakeForm, Calculator(s), NewsletterSignup,                   │ │
│  │  WebinarRegistration, ResourceFilter                             │ │
│  │                                                                  │ │
│  │  Responsibility: Interactive features requiring state management │ │
│  │  Hydration: client:visible (lazy) or client:load (critical)      │ │
│  │  Animations: CSS transitions (no framework dependency)            │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 7.2 Key Component Specifications

#### `<Button />` (Astro)

```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;          // Renders as <a> if provided
  icon?: string;          // Icon name (optional trailing icon)
  fullWidth?: boolean;
  class?: string;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  icon,
  fullWidth = false,
  class: className = '',
} = Astro.props;

const Tag = href ? 'a' : 'button';

const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';

const variants = {
  primary: 'bg-gold text-white hover:bg-gold-dark active:scale-[0.98] shadow-md hover:shadow-lg',
  secondary: 'bg-navy text-white hover:bg-navy-light active:scale-[0.98]',
  ghost: 'text-gold hover:bg-gold/10 active:scale-[0.98]',
  outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white active:scale-[0.98]',
};

const sizes = {
  sm: 'text-sm px-4 py-2 gap-2',
  md: 'text-base px-6 py-3 gap-2',
  lg: 'text-lg px-8 py-4 gap-3',
};
---

<Tag
  href={href}
  class:list={[baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className]}
>
  <slot />
  {icon && <span class="icon" aria-hidden="true">{icon}</span>}
</Tag>
```

#### `<ScrollReveal />` (Astro + Vanilla JS)

```astro
---
// src/components/animation/ScrollReveal.astro
interface Props {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;       // ms
  duration?: number;    // ms
  threshold?: number;   // 0-1
  class?: string;
}

const {
  direction = 'up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  class: className = '',
} = Astro.props;
---

<div
  class:list={['scroll-reveal', `reveal-${direction}`, className]}
  data-delay={delay}
  data-duration={duration}
  data-threshold={threshold}
>
  <slot />
</div>

<style>
  .scroll-reveal {
    opacity: 0;
    transition-property: opacity, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .scroll-reveal.revealed {
    opacity: 1;
    transform: none;
  }

  .reveal-up { transform: translateY(30px); }
  .reveal-down { transform: translateY(-30px); }
  .reveal-left { transform: translateX(30px); }
  .reveal-right { transform: translateX(-30px); }
  .reveal-fade { transform: none; }

  @media (prefers-reduced-motion: reduce) {
    .scroll-reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>

<script>
  // Vanilla JS — no framework dependency
  // Each element can specify its own threshold via data-threshold
  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    const threshold = parseFloat((el as HTMLElement).dataset.threshold || '0.1');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = parseInt(target.dataset.delay || '0');
            const duration = parseInt(target.dataset.duration || '600');

            target.style.transitionDuration = `${duration}ms`;
            target.style.transitionDelay = `${delay}ms`;

            setTimeout(() => target.classList.add('revealed'), 10);
            observer.unobserve(target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
  });
</script>
```

#### `<IntakeForm />` (React Island)

```tsx
// src/components/islands/IntakeForm.tsx
// Multi-step form with validation, conditional fields, and CSS transitions

import { useState, useEffect } from 'react';
import { z } from 'zod';

// Step schemas using Zod
const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  preferredName: z.string().optional(),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  usCitizen: z.enum(['yes', 'no']),
  state: z.string().min(1, 'State is required'),
  age: z.number().min(18).max(120),
  maritalStatus: z.enum(['single', 'relationship', 'married', 'divorced', 'widowed']),
  employment: z.array(z.string()).min(1, 'Select at least one'),
});

const step2Schema = z.object({
  insuranceLicensed: z.enum(['yes', 'no']),
  licensingDetails: z.string().optional(),  // Required if licensed = yes
  ownsbyob: z.enum(['read', 'own-unread', 'no']),
  classroomCompletion: z.enum(['all', 'some', 'aware', 'new']),
});

// ... additional step schemas

// Form component uses:
// - CSS transitions for step animations (opacity + translateX, 300ms)
// - Zod for per-step validation
// - sessionStorage for form field persistence (PII cleared on tab close)
// - localStorage for non-PII only (current step number, form start timestamp)
// - Formspree AJAX submission with error handling and retry
// - Honeypot field (_gotcha) for spam protection
// - Sentry error boundary for production error tracking
// - Conditional rendering based on answers (e.g., licensing details)
// - Progress bar component at top
// - "Back" and "Next" navigation
// - Final "Submit" with loading state and error handling

export default function IntakeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [transitioning, setTransitioning] = useState(false);
  const totalSteps = 5;

  const goToStep = (nextStep: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(nextStep);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? 'bg-gold' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Honeypot — hidden from humans, catches bots */}
      <input
        type="text"
        name="_gotcha"
        style={{ position: 'absolute', left: '-9999px' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Step content with CSS transitions */}
      <div
        className={`transition-all duration-300 ease-out ${
          transitioning
            ? 'opacity-0 translate-x-[-20px]'
            : 'opacity-100 translate-x-0'
        }`}
      >
        {/* Step content rendered here based on `step` state */}
      </div>
    </div>
  );
}
```

### 7.3 Component Sharing Strategy

Both sites share design DNA but are separate codebases. Initial approach:

**Phase 1 (now):** Copy shared components between repos. Both sites are small enough that duplication is manageable. Components like `Button`, `ScrollReveal`, `Card` are simple enough to maintain in two places.

**Phase 2 (when warranted):** Extract shared components into a private npm package (`@ibc/ui`) or Git submodule. This makes sense only when:
- Both sites are live and stable
- Shared components are mature and API-stable
- Maintenance burden of duplication exceeds setup cost of shared package

**What's shared vs. site-specific:**

| Shared (both sites) | ibcacademy.org only | 1322legacy only |
|---|---|---|
| Button | ResourceFilter | IntakeForm |
| Card | Calculator(s) | ProcessTimeline |
| ScrollReveal | NewsletterSignup | JourneyLayout |
| Accordion | WebinarRegistration | |
| Badge | BlogLayout | |
| Toast | LearnLayout | |
| Header (structure) | SearchOverlay | |
| Footer (structure) | Pagination | |
| SplitContent | CategoryFilter | |

---

## 8. Design System & Modern Techniques

### 8.1 Animation System

All animations serve a purpose. Nothing is decorative-only. Every animation should answer: "Does this help the user understand the content better or navigate the interface more intuitively?"

**Animation Hierarchy:**

| Type | Purpose | Implementation | JS Required? |
|---|---|---|---|
| Page transitions | Smooth navigation between pages | Astro View Transitions API | No (native) |
| Scroll reveals | Progressive disclosure, narrative flow | CSS + IntersectionObserver | Minimal (vanilla) |
| Hover micro-interactions | Feedback, affordance | CSS transitions | No |
| Form transitions | Step-to-step flow in multi-step forms | CSS opacity + translateX transitions | No (CSS only) |
| Counter animations | Engagement, social proof | CSS @property + IntersectionObserver | Minimal |
| Kinetic typography | Hero energy, brand personality (IBC Academy only) | CSS animations | No |
| Loading states | Feedback during form submission | CSS transitions + React state | Minimal (React island) |

**Reduced Motion Support (mandatory):**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 8.2 Modern Design Patterns Applied

**Organic Shapes (both sites):**
- Soft blob shapes as background decorations (CSS clip-path or SVG)
- Wavy section dividers instead of hard horizontal lines
- Rounded cards and containers (border-radius: 12-16px)
- Gradient overlays on hero sections (not flat colors)

**Glass Morphism (used sparingly):**
- Navigation bar backdrop-filter on scroll
- Floating CTA cards
- Modal overlays

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**Anti-Grid Layouts (IBC Academy only):**
- Homepage hero: text offset left, decorative element bleeding right
- Blog index: featured post breaks the grid (spans 2 columns)
- Learning path cards: staggered vertical offset
- Not every section is symmetric — visual rhythm through variety

**Kinetic Typography (IBC Academy hero only):**
- Main headline characters animate in sequentially (staggered fade-up)
- Subtitle text typing animation (TypeWriter component)
- Scroll-responsive: headline text subtly shifts on scroll (parallax)

### 8.3 Dark/Light Mode

**Implementation:** CSS custom properties with `prefers-color-scheme` media query and manual toggle.

```css
/* Light mode (default) */
:root {
  --bg-primary: var(--color-white);
  --bg-secondary: var(--color-cream);
  --text-primary: var(--color-navy);
  --text-secondary: #5A6B8A;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg-primary: #0F1520;
    --bg-secondary: #1A2235;
    --text-primary: #E8E6E3;
    --text-secondary: #A0A8B8;
    --color-gold: #D4A43A;          /* Lightened for dark backgrounds — passes AA at 4.5:1+ */
    --color-gold-light: #E8C064;
    --color-gold-dark: #C8962E;
    --color-cream: #1E2636;          /* Inverted — dark surface for alternating sections */
    --color-success: #3DAF6E;
    --color-error: #E05050;
    --color-warning: #E8B84A;
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    --shadow-glow: 0 0 20px rgba(212, 164, 58, 0.2);
  }
}

/* Manual override */
[data-theme="dark"] {
  --bg-primary: #0F1520;
  --bg-secondary: #1A2235;
  --text-primary: #E8E6E3;
  --text-secondary: #A0A8B8;
  --color-gold: #D4A43A;
  --color-gold-light: #E8C064;
  --color-gold-dark: #C8962E;
  --color-cream: #1E2636;
  --color-success: #3DAF6E;
  --color-error: #E05050;
  --color-warning: #E8B84A;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px rgba(212, 164, 58, 0.2);
}

/* Dark mode contrast note: Gold (#C8962E) on dark navy (#0F1520) yields ~4.8:1 —
   passes AA for large text only. Dark mode uses lightened gold (#D4A43A) which
   yields ~6.2:1 — passes AA for all text sizes. Verify with a contrast checker
   any time gold or background values change. */
```

**Priority for IBC Academy:** Support both modes from launch. The education platform will be used for extended reading sessions — dark mode is a real accessibility win.

**Priority for 1322 Legacy:** Light mode only at launch. The site is small, visited briefly, and the warm cream/gold palette doesn't translate naturally to dark mode. Add dark mode in Phase 3 if requested.

### 8.4 Responsive Breakpoints

```css
/* Mobile-first approach — all base styles are mobile */
/* sm: 640px  — large phones, small tablets */
/* md: 768px  — tablets */
/* lg: 1024px — small laptops */
/* xl: 1280px — desktops */
/* 2xl: 1536px — large desktops */

/* Content max-width: 1200px */
/* Full-bleed sections: 100vw with internal max-width */
```

**Mobile-Specific Design Decisions:**

| Element | Mobile | Desktop |
|---|---|---|
| Navigation | Hamburger menu + full-screen overlay | Horizontal nav with mega menus |
| Hero | Single column, smaller typography | Full viewport, kinetic typography |
| Cards | Single column stack | 2-3 column grid |
| Split content | Stack (image above text) | Side-by-side |
| Calculator | Full width, simplified inputs | Side-by-side input/output |
| Learning sidebar | Hidden, accessible via hamburger | Visible sticky sidebar |
| Blog TOC | Collapsible top section | Sticky right sidebar |
| Intake form | Full width, larger touch targets | Centered, max-width 600px |

---

## 9. Content Architecture

### 9.1 Content Sources & Pipeline

```
┌──────────────────────────────────────────────────────────────────────┐
│                     CONTENT PIPELINE                                  │
│                                                                       │
│  ┌─────────────────────┐     ┌─────────────────────┐                 │
│  │  IBC Knowledge Base │     │  Skool Scripts       │                 │
│  │  (notebook-lm/)     │     │  (19 modules)        │                 │
│  │                     │     │                      │                 │
│  │  • core-ibc/        │     │  Module scripts      │                 │
│  │  • client-education/│     │  become /learn/*     │                 │
│  │  • policy-illust./  │     │  content pages        │                 │
│  │  • sales-objections/│     │                      │                 │
│  │  • case-studies/    │     │                      │                 │
│  │  • compliance/      │     │                      │                 │
│  └────────┬────────────┘     └──────────┬───────────┘                │
│           │                              │                            │
│           ▼                              ▼                            │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    CONTENT CREATION                              │ │
│  │                                                                  │ │
│  │  Brad writes / Mabel drafts → Brad reviews → MDX file created   │ │
│  │                                                                  │ │
│  │  Blog post workflow:                                              │ │
│  │  1. Topic from knowledge base or social content                  │ │
│  │  2. Draft in MDX with frontmatter                                │ │
│  │  3. Brad reviews for voice and accuracy                          │ │
│  │  4. Cross-reference with Nash/Murphy/Griggs                     │ │
│  │  5. Add images, links, CTAs                                     │ │
│  │  6. Commit to content/blog/ directory                           │ │
│  │  7. Auto-deploy on push to main                                  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                           │                                           │
│                           ▼                                           │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │                    DISTRIBUTION                                  │ │
│  │                                                                  │ │
│  │  Blog post → Social media snippets (posting pipeline)            │ │
│  │  Social posts → ibcacademy.org (drive traffic)                  │ │
│  │  YouTube videos → /resources/videos (embed)                     │ │
│  │  Lead magnets → /newsletter (email capture)                     │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 9.2 Blog Content Strategy (ibcacademy.org)

**Target:** 250,000+ words across 200+ articles within 12 months of launch.

**Content Pillars:**

| Pillar | % of Content | SEO Value | Example Topics |
|---|---|---|---|
| IBC Foundations | 25% | High — targets beginners | "What Is IBC?", "How the Banking Function Works", "BYOB Summary" |
| Policy Mechanics | 20% | High — targets research phase | "Base Premium vs PUA", "Direct vs Non-Direct Recognition", "Dividends Explained" |
| Myths & Objections | 20% | Very High — targets skeptics | "Is Whole Life Insurance a Scam?", "IBC vs 401k", "Dave Ramsey Is Wrong About Whole Life" |
| Case Studies | 15% | Medium — builds trust | "How a Chiropractor Uses IBC", "Family Banking: A Real Example" |
| Austrian Economics | 10% | Medium — unique angle, authority | "What Nelson Nash Learned from Austrian Economics", "Sound Money Principles" |
| Mindset & Philosophy | 10% | Low — loyalty & depth | "Think Like a Banker", "The Grocery Store Analogy Explained" |

**Publishing Cadence:** 3-4 posts per week (target), minimum 2 per week.

**Content Length Targets:**

| Type | Word Count | Purpose |
|---|---|---|
| Pillar content | 3,000-5,000 words | Comprehensive guides that rank for broad terms |
| Standard blog | 1,500-2,500 words | Regular publishing cadence, specific topics |
| Quick hits | 500-1,000 words | Glossary expansions, news commentary, responses |
| Case studies | 2,000-3,000 words | Detailed real-world examples |

### 9.3 MDX Authoring Guide

Every blog post follows this structure:

```mdx
---
title: "How the Banking Function Actually Works"
description: "Most people never think about who controls the banking function in their life. Nelson Nash did — and what he discovered changes everything."
author: "Brad Raschke"
publishedAt: 2026-02-15
category: "foundations"
tags: ["banking function", "nelson nash", "byob", "ibc basics"]
image:
  src: "/images/blog/banking-function-hero.jpg"
  alt: "Illustration of money flowing between banks and individuals"
featured: false
draft: false
seoTitle: "The Banking Function Explained: What Nelson Nash Discovered About Money"
seoDescription: "Learn how the banking function works and why controlling it is the foundation of the Infinite Banking Concept (IBC)."
---

import { CalloutBox, KeyTakeaway, CTABanner } from '../../components/mdx';

## Introduction

Hook paragraph that draws the reader in...

## Main Content

<CalloutBox type="insight">
  Nelson Nash said: "The banking function is the most important thing in your life."
</CalloutBox>

Content sections with clear H2/H3 structure...

<KeyTakeaway>
  - The banking function exists in every financial transaction
  - Whoever controls it profits from it
  - You can recapture it using dividend-paying whole life insurance
</KeyTakeaway>

## Conclusion

Wrap-up with next steps...

<CTABanner
  heading="Ready to learn more?"
  text="Start the free IBC Academy curriculum"
  href="/learn/start-here"
  buttonText="Start Learning →"
/>
```

### 9.4 Content Authoring Workflow

A separate content authoring guide (`docs/CONTENT-GUIDE.md`) should be created during Sprint 2 covering:

- **MDX frontmatter template** — copy-paste starter with all required fields
- **Local preview** — `npm run dev` command, hot reload behavior
- **Validation errors** — what happens when frontmatter is invalid (Astro build fails with a typed error message pointing to the file and field). How to diagnose and fix.
- **PR workflow** — create branch, add MDX file to `src/content/blog/`, commit, open PR. Lighthouse CI and axe-core run automatically. Merge to `main` triggers Vercel deploy.
- **Image workflow** — add images to `src/assets/images/`, reference via import in MDX, Astro handles optimization
- **Publishing cadence** — 3-4 posts/week target. Mabel drafts, Brad reviews for voice and accuracy, Chris merges.

---

## 10. SEO Strategy

### 10.1 ibcacademy.org SEO Plan

**Goal:** Become the #1 educational resource for IBC-related search queries within 18 months.

**Primary Target Keywords:**

| Keyword | Monthly Volume (est.) | Difficulty | Target Page |
|---|---|---|---|
| infinite banking concept | 8,100 | Medium | /learn/start-here |
| infinite banking | 6,600 | Medium | / (homepage) |
| becoming your own banker | 3,600 | Low | /resources/byob |
| what is infinite banking | 2,400 | Low | /learn/start-here |
| infinite banking pros and cons | 1,900 | Medium | /blog/[post] |
| IBC whole life insurance | 1,300 | Low | /learn/mechanics/whole-life-101 |
| nelson nash banking concept | 1,000 | Low | /learn/foundations/banking-function |
| is infinite banking a scam | 880 | Medium | /blog/[post] |
| whole life insurance banking | 720 | Low | /learn/start-here |
| dave ramsey whole life insurance | 1,600 | Medium | /blog/[post] |
| infinite banking calculator | 590 | Low | /tools/interest-bleed |
| family banking concept | 480 | Low | /learn/advanced/family-banking |

**Long-Tail Strategy:** Target 500+ long-tail keywords through blog content. Every blog post targets a specific long-tail query.

### 10.2 Technical SEO Implementation

**Meta Tags (every page):**

```html
<head>
  <title>{seoTitle || title} | IBC Academy</title>
  <meta name="description" content="{seoDescription || description}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{canonical || currentUrl}" />

  <!-- Open Graph -->
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{ogImage}" />
  <meta property="og:url" content="{currentUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="IBC Academy" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@theibcacademy" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />
  <meta name="twitter:image" content="{ogImage}" />
</head>
```

**Structured Data (JSON-LD):**

```typescript
// Organization schema (homepage)
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "IBC Academy",
  "url": "https://ibcacademy.org",
  "description": "Free education platform for the Infinite Banking Concept",
  "founder": {
    "@type": "Person",
    "name": "Brad Raschke",
    "jobTitle": "Authorized IBC Practitioner"
  },
  "sameAs": [
    "https://instagram.com/ibcacademy",
    "https://facebook.com/ibcacademy",
    "https://x.com/theibcacademy",
    "https://youtube.com/@ibcacademy"
  ]
}

// Article schema (blog posts)
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{description}",
  "author": {
    "@type": "Person",
    "name": "Brad Raschke"
  },
  "publisher": {
    "@type": "EducationalOrganization",
    "name": "IBC Academy"
  },
  "datePublished": "{publishedAt}",
  "dateModified": "{updatedAt}",
  "image": "{image}",
  "mainEntityOfPage": "{url}"
}

// Course schema (learning paths)
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "IBC Foundations",
  "description": "Core concepts of the Infinite Banking Concept",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "IBC Academy"
  },
  "numberOfLessons": 8,
  "isAccessibleForFree": true
}

// FAQ schema (FAQ page and blog posts with Q&A)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Infinite Banking Concept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

**Additional SEO Requirements:**
- XML sitemap auto-generated (exclude /legal/* pages)
- robots.txt allowing all crawlers
- Proper heading hierarchy (one H1 per page, logical H2-H6)
- Internal linking strategy (every post links to 3+ other posts/pages)
- Alt text on all images (no decorative images without alt="")
- Clean URL structure (no query parameters, no trailing slashes — pick one and be consistent)
- 301 redirects for any changed URLs
- Page speed optimization (directly impacts ranking)

### 10.3 1322legacystrategies.com SEO Approach

**Intentionally minimal.** This site should NOT rank for anything. It exists as a destination, not a discovery point.

```
# robots.txt for 1322legacystrategies.com
User-agent: *
Disallow: /get-started/
Disallow: /journey/
# Allow homepage and about for basic discoverability
Allow: /
Allow: /about
```

No sitemap submission to Google Search Console. No structured data beyond basic Organization schema. No blog. No content optimization. This site is a closed door — you only find it if someone hands you the key.

---

## 11. Accessibility Requirements

### 11.1 WCAG 2.1 AA Compliance (Minimum)

Both sites must meet WCAG 2.1 Level AA. This is non-negotiable — it's both ethically correct and legally prudent for a financial services website.

**Checklist:**

| Requirement | Implementation |
|---|---|
| **Color Contrast** | 4.5:1 minimum for normal text, 3:1 for large text. All brand colors tested against backgrounds. |
| **Keyboard Navigation** | All interactive elements accessible via Tab, Enter, Space, Escape. Visible focus indicators on all focusable elements. |
| **Screen Reader Support** | Semantic HTML (nav, main, article, aside, section, header, footer). ARIA labels where semantics are insufficient. Aria-live regions for dynamic content (form errors, toast notifications). |
| **Focus Management** | Focus trapped in modals. Focus returned to trigger on modal close. Logical tab order follows visual order. Skip-to-content link as first focusable element. |
| **Form Accessibility** | Every input has a visible label. Error messages associated via aria-describedby. Required fields marked with aria-required. Form errors announced to screen readers. |
| **Image Accessibility** | All content images have descriptive alt text. Decorative images have alt="". Complex images (charts, diagrams) have long descriptions. |
| **Motion Accessibility** | prefers-reduced-motion respected universally. No auto-playing video with audio. No content that flashes more than 3 times per second. |
| **Text Accessibility** | Text resizable to 200% without content loss. No text in images (except logos). Minimum 16px body text. Line height ≥ 1.5 for body text. |
| **Link Accessibility** | Links distinguishable from surrounding text (underline or color + additional indicator). Link text descriptive ("Read the full guide" not "click here"). External links indicated. |
| **Responsive** | Content accessible and functional at all viewport sizes. Touch targets ≥ 44x44px on mobile. No horizontal scrolling at any supported viewport. |

### 11.2 Testing Protocol

| Tool | What It Tests | When |
|---|---|---|
| axe DevTools | Automated WCAG violations | Every PR (CI) |
| Lighthouse Accessibility | Automated score | Every PR (CI) |
| VoiceOver (macOS) | Screen reader experience | Manual, quarterly |
| NVDA (Windows) | Screen reader experience | Manual, quarterly |
| Keyboard-only navigation | Tab order, focus management | Manual, every sprint |
| Color contrast checker | Brand color compliance | Design phase, any palette change |

---

## 12. Analytics & Tracking Plan

### 12.1 Analytics Platform: Plausible Analytics

**Why Plausible over Google Analytics:**
- Privacy-focused (no cookies, GDPR compliant by default)
- Lightweight script (~1KB vs ~45KB for GA4)
- No impact on Lighthouse performance score
- Simple, actionable dashboard
- No consent banner required
- Brad doesn't need enterprise analytics — he needs clear answers to "what's working?"

**Cost:** ~$9/month for both sites

### 12.2 Tracking Plan

**ibcacademy.org Events:**

| Event Name | Trigger | Properties |
|---|---|---|
| `pageview` | Every page load | path, referrer |
| `newsletter_signup` | Form submission | source_page |
| `lead_magnet_download` | PDF download click | document_name |
| `calculator_use` | Calculator form submitted | calculator_type |
| `calculator_email_capture` | Email entered for calculator results | calculator_type |
| `skool_click` | Click on Skool/Academy CTA | source_page |
| `video_play` | YouTube embed played | video_title |
| `resource_click` | External resource link clicked | resource_name, resource_type |
| `blog_read_complete` | Scrolled to bottom of blog post | post_slug, estimated_time |
| `webinar_register` | Webinar form submitted | — |
| `search_query` | Site search used | query_text |
| `learn_path_start` | Clicked "Begin" on learning path | path_name |
| `learn_lesson_complete` | Reached bottom of learn page | lesson_slug, path_name |
| `legacy_site_click` | Click on any 1322legacystrategies.com link | source_page |

**1322legacystrategies.com Events:**

| Event Name | Trigger | Properties |
|---|---|---|
| `pageview` | Every page load | path, referrer |
| `intake_form_start` | Form page loaded / first field focused | — |
| `intake_form_step` | Completed a form step | step_number |
| `intake_form_submit` | Form successfully submitted | — |
| `intake_form_abandon` | Left form without submitting | last_step_completed |
| `intake_form_error` | Form submission failed | error_type, step_number, http_status |
| `booking_link_click` | Clicked booking/scheduling link | source_page |
| `journey_page_view` | Viewed a /journey/* page | step_name |
| `resource_click` | External resource link clicked | resource_name |
| `ibcacademy_click` | Click on any ibcacademy.org link | source_page |

### 12.3 Implementation

```html
<!-- Plausible Analytics Script (both sites) -->
<script
  defer
  data-domain="ibcacademy.org"
  src="https://plausible.io/js/script.tagged-events.js"
></script>

<!-- Custom event tracking example -->
<a
  href="/downloads/ibc-starter-guide.pdf"
  class="plausible-event-name=lead_magnet_download plausible-event-document_name=starter-guide"
>
  Download Free Guide
</a>

<!-- Or via JavaScript for dynamic events -->
<script>
  function trackEvent(name, props) {
    if (window.plausible) {
      window.plausible(name, { props });
    }
  }
</script>
```

### 12.4 UTM Strategy

All traffic sources use consistent UTM parameters:

| Source | UTM Example |
|---|---|
| Instagram bio | `?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Instagram post | `?utm_source=instagram&utm_medium=social&utm_campaign=post-{date}` |
| YouTube description | `?utm_source=youtube&utm_medium=video&utm_campaign={video-slug}` |
| Email newsletter | `?utm_source=email&utm_medium=newsletter&utm_campaign={issue-date}` |
| Skool community | `?utm_source=skool&utm_medium=community&utm_campaign=classroom` |
| ibcacademy → 1322 | `?utm_source=ibcacademy&utm_medium=website&utm_campaign=get-started` |

---

## 13. Deployment Architecture

### 13.1 Infrastructure

```
┌──────────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT ARCHITECTURE                           │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │                    GitHub (L0v3Chrix)                         │     │
│  │                                                               │     │
│  │  ┌──────────────────┐    ┌──────────────────┐                │     │
│  │  │ ibc-academy-site │    │ 1322-legacy-site │                │     │
│  │  │                  │    │                  │                │     │
│  │  │  main ──────────►│    │  main ──────────►│                │     │
│  │  │  (production)    │    │  (production)    │                │     │
│  │  │                  │    │                  │                │     │
│  │  │  dev  ──────────►│    │  dev  ──────────►│                │     │
│  │  │  (preview)       │    │  (preview)       │                │     │
│  │  └────────┬─────────┘    └────────┬─────────┘                │     │
│  └───────────┼──────────────────────┼───────────────────────────┘     │
│              │                      │                                  │
│              ▼                      ▼                                  │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                 Vercel (Team: chrix-5697)                     │    │
│  │                                                               │    │
│  │  ┌──────────────────────┐  ┌──────────────────────┐          │    │
│  │  │ ibcacademy.org       │  │ 1322legacystrategies │          │    │
│  │  │                      │  │ .com                 │          │    │
│  │  │ Production: main     │  │ Production: main     │          │    │
│  │  │ Preview: PR branches │  │ Preview: PR branches │          │    │
│  │  │                      │  │                      │          │    │
│  │  │ Edge: Global CDN     │  │ Edge: Global CDN     │          │    │
│  │  │ Build: ~30-60s       │  │ Build: ~15-30s       │          │    │
│  │  └──────────────────────┘  └──────────────────────┘          │    │
│  │                                                               │    │
│  │  Environment Variables:                                       │    │
│  │  ├── FORMSPREE_ENDPOINT                                       │    │
│  │  ├── PLAUSIBLE_DOMAIN                                         │    │
│  │  ├── NOTION_API_KEY (if API routes used)                      │    │
│  │  └── RESEND_API_KEY (if email service used)                   │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                   DNS Configuration                           │    │
│  │                                                               │    │
│  │  ibcacademy.org          → Vercel (CNAME/A record)           │    │
│  │  www.ibcacademy.org      → redirect to ibcacademy.org        │    │
│  │  1322legacystrategies.com → Vercel (CNAME/A record)          │    │
│  │  www.1322legacystrategies.com → redirect to non-www          │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 13.2 CI/CD Pipeline

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build

      - name: Lighthouse Audit
        uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: ./lighthouserc.json
          uploadArtifacts: true

      - name: Assert Scores
        run: |
          # Fail PR if any score below 95
          echo "Checking Lighthouse scores..."

      - name: Accessibility Audit (axe-core)
        run: |
          npx @axe-core/cli ./dist --exit
          # Fails on "critical" or "serious" violations
          # Warnings are logged but don't fail the build
```

```json
// lighthouserc.json (ibcacademy.org)
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    },
    "collect": {
      "staticDistDir": "./dist",
      "url": [
        "/",
        "/learn",
        "/learn/foundations/banking-function",
        "/blog",
        "/blog/[first-post-slug]",
        "/tools/interest-bleed",
        "/about",
        "/academy"
      ]
    }
  }
}
```

```json
// lighthouserc.json (1322legacystrategies.com)
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    },
    "collect": {
      "staticDistDir": "./dist",
      "url": [
        "/",
        "/about",
        "/get-started",
        "/journey/discovery-call",
        "/faq"
      ]
    }
  }
}
```

### 13.3 Environment Variables

| Variable | ibcacademy.org | 1322legacy | Description |
|---|---|---|---|
| `PUBLIC_SITE_URL` | `https://ibcacademy.org` | `https://1322legacystrategies.com` | Canonical site URL |
| `PUBLIC_PLAUSIBLE_DOMAIN` | `ibcacademy.org` | `1322legacystrategies.com` | Analytics domain |
| `FORMSPREE_ENDPOINT` | `https://formspree.io/f/xxx` | `https://formspree.io/f/yyy` | Form submission endpoint |
| `CONVERTKIT_FORM_ID` | (newsletter form ID) | — | ConvertKit form embed ID |
| `NOTION_API_KEY` | — | (if needed) | Notion CRM integration |
| `SENTRY_DSN` | (project DSN) | (project DSN) | Sentry error tracking for React islands |
| `PUBLIC_SKOOL_URL` | `https://skool.com/ibc-academy` | `https://skool.com/ibc-academy` | Skool classroom link |

---

## 14. Phased Implementation Plan

### Phase 1: Foundation (Weeks 1-3)
**Goal:** Both sites live with core pages. Minimal viable presence.

**ibcacademy.org — Sprint 1:**
- [ ] Repository setup, Astro + Tailwind + React configured
- [ ] Design tokens and base styles (colors, typography, spacing)
- [ ] BaseLayout, PageLayout components
- [ ] Header component (desktop + mobile navigation)
- [ ] Footer component
- [ ] Homepage (hero, learning paths cards, lead magnet CTA, Skool CTA)
- [ ] /about page
- [ ] /learn/start-here (first learning page)
- [ ] /newsletter (basic email signup — Formspree)
- [ ] /legal/disclaimer, /legal/privacy
- [ ] ScrollReveal animation component
- [ ] Button, Card, Badge UI components
- [ ] Plausible analytics integration
- [ ] Deploy to Vercel, connect domain
- [ ] Lighthouse CI pipeline

**1322legacystrategies.com — Sprint 1:**
- [ ] Repository setup, Astro + Tailwind + React configured
- [ ] Design tokens and base styles
- [ ] BaseLayout, PageLayout components
- [ ] Header + Footer
- [ ] Homepage (hero with Proverbs 13:22, Brad intro, process overview, CTA)
- [ ] /about (Brad's story)
- [ ] /get-started (intake form — full multi-step React island)
- [ ] /get-started/thank-you
- [ ] /legal/disclaimer, /legal/privacy
- [ ] Form submission to Formspree → Brad's email
- [ ] Deploy to Vercel, connect domain
- [ ] Plausible analytics

**Deliverable:** Both sites live. IBC Academy has homepage + start-here page + newsletter. 1322 Legacy has homepage + about + working intake form.

### Phase 2: Content Engine (Weeks 4-6)
**Goal:** IBC Academy education hub fully built. 1322 Legacy client journey complete.

**ibcacademy.org — Sprint 2:**
- [ ] /learn hub page with learning path cards + progress tracking
- [ ] All /learn/foundations/* pages (8 lessons)
- [ ] All /learn/mechanics/* pages (6 lessons)
- [ ] All /learn/advanced/* pages (5 lessons)
- [ ] LearnLayout with sidebar navigation + breadcrumbs
- [ ] /learn/glossary page
- [ ] /resources hub page
- [ ] /resources/byob page
- [ ] /resources/videos page (YouTube embeds)
- [ ] /academy landing page (Skool bridge)
- [ ] Blog infrastructure (Content Collection, BlogLayout, index + pagination)
- [ ] First 10 blog posts published
- [ ] Dark mode support
- [ ] Mega menu navigation
- [ ] View Transitions enabled

**1322legacystrategies.com — Sprint 2:**
- [ ] /journey hub page (New Client Preparation Guide)
- [ ] /journey/discovery-call
- [ ] /journey/education
- [ ] /journey/design-meeting
- [ ] /journey/application
- [ ] /journey/policy-delivery
- [ ] /journey/client-support
- [ ] JourneyLayout with step indicator + sidebar
- [ ] /about/process (visual timeline)
- [ ] /faq page (Accordion component)
- [ ] /resources page (recommended reading)
- [ ] Print stylesheet for journey pages

**Deliverable:** IBC Academy is a full education platform with 19+ learning pages and 10 blog posts. 1322 Legacy has the complete client journey experience.

### Phase 3: Interactive & Polish (Weeks 7-9)
**Goal:** Calculators live. Search working. Animations polished. Both sites feel premium.

**ibcacademy.org — Sprint 3:**
- [ ] /tools hub page
- [ ] Interest Bleed Calculator (React island)
- [ ] Family Bank Projector (React island)
- [ ] Opportunity Cost Calculator (React island)
- [ ] Pagefind site search integration
- [ ] Resource filter (React island)
- [ ] Case studies section (content collection + pages)
- [ ] /webinar registration page
- [ ] 10 more blog posts (20 total)
- [ ] Kinetic typography hero animation
- [ ] CountUp component for stats
- [ ] OG image generation (per page)
- [ ] Full structured data (JSON-LD) on all pages
- [ ] Accessibility audit + fixes
- [ ] Performance optimization pass

**1322legacystrategies.com — Sprint 3:**
- [ ] Intake form refinements (conditional logic, sessionStorage persistence)
- [ ] Notion integration for form submissions (if desired)
- [ ] ProcessTimeline animation (6 steps with scroll-trigger)
- [ ] Polish animations across all pages
- [ ] Accessibility audit + fixes
- [ ] Performance optimization pass

**Deliverable:** Both sites fully polished and production-ready. Interactive tools live. Accessibility verified.

### Phase 4: Content Scale (Weeks 10-16)
**Goal:** Content moat. Blog publishing machine running. Cross-site integration refined.

**ibcacademy.org — Ongoing:**
- [ ] 3-4 blog posts per week
- [ ] Case studies (2 per month)
- [ ] Video content integration (as YouTube publishes)
- [ ] Newsletter automation (ConvertKit sequences)
- [ ] Social content → blog post pipeline
- [ ] Email nurture sequence for lead magnet downloaders
- [ ] Monthly webinar infrastructure

**Both Sites:**
- [ ] Cross-site link audit
- [ ] UTM tracking verification
- [ ] Analytics review and optimization
- [ ] User feedback integration
- [ ] Shared component extraction (if warranted)

### Implementation Timeline (Visual)

```
Week:  1    2    3    4    5    6    7    8    9    10   11   12+
       ├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────►
       │         │         │         │         │
       │ PHASE 1 │ PHASE 2 │ PHASE 3 │ PHASE 4 │
       │Foundation│ Content │Interactive│ Scale  │
       │         │ Engine  │ & Polish │         │
       │         │         │         │         │
IBC    │ ██████████████████████████████████████████████████████████
Academy│ Homepage │ Learn  │ Tools   │ 3-4 posts/week
       │ Start   │ Blog   │ Search  │ Case studies
       │ Newslttr│ Paths  │ Polish  │ Videos
       │         │         │         │
1322   │ ████████████████████████████████████████
Legacy │ Homepage │Journey │ Polish  │ Maintenance
       │ Intake  │ FAQ    │ A11y    │
       │ About   │Resources│         │
```

---

## 15. Dependencies & Cross-Site Integration

### 15.1 Dependency Map

```
┌──────────────────────────────────────────────────────────────────────┐
│                     CROSS-SITE DEPENDENCIES                           │
│                                                                       │
│  ibcacademy.org                    1322legacystrategies.com           │
│  ──────────────                    ────────────────────────           │
│                                                                       │
│  /academy ──────────────────►  skool.com/ibc-academy                 │
│                                     │                                 │
│                                     ▼                                 │
│                                /get-started (intake form)             │
│                                     │                                 │
│  /learn/education ◄────────── /journey/education (links back)        │
│                                                                       │
│  /resources/byob ◄────────── /resources (links back for BYOB)       │
│                                                                       │
│  /tools/* ◄──────────────── (no direct link — prospects may          │
│                               return to Academy for tools)            │
│                                                                       │
│  Newsletter signup ─────────► Email nurture ─────► 1322/get-started  │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### 15.2 Cross-Site Links

| From | To | Context |
|---|---|---|
| ibcacademy.org/academy | skool.com/ibc-academy | "Join the classroom" |
| ibcacademy.org (subtle footer link) | 1322legacystrategies.com/get-started | "Ready to implement? Work with an advisor →" |
| 1322legacystrategies.com/journey/education | ibcacademy.org/learn | "Complete your education at IBC Academy" |
| 1322legacystrategies.com/resources | ibcacademy.org/resources/byob | BYOB purchase/reading guide |
| Email nurture (final email) | 1322legacystrategies.com/get-started | "Ready for the next step?" |

**Important:** The link from ibcacademy.org to 1322legacystrategies.com should be subtle — a footer link or a specific CTA on the /academy page, not a primary navigation item. The funnel flows through Skool first, not directly.

**Cross-Site Link Validation:** CI includes a weekly GitHub Actions cron job that validates all cross-site links return 200. Broken cross-site links fail the check and notify Brad and Chris via email.

**Skool Contingency:** The funnel routes through Skool (ibcacademy.org → Skool → 1322legacystrategies.com). If Skool becomes unavailable or changes its structure, redirect academy CTAs to an internal curriculum overview page on ibcacademy.org with a waitlist signup form.

### 15.3 Shared Assets

| Asset | Location | Used By |
|---|---|---|
| Brad's headshot | Both repos (public/images/) | Both sites |
| NNI Practitioner badge | Both repos | About pages |
| Gold accent color | Design tokens | Both sites |
| Cream background color | Design tokens | Both sites |
| Legal disclaimer text | Shared draft | Both /legal/disclaimer pages |
| Privacy policy text | Shared draft | Both /legal/privacy pages |

### 15.4 Build Order

1. **ibcacademy.org first.** This is the public-facing site that all social media points to. It needs to be live before any content marketing begins. The 1322 Legacy site can wait a few weeks because prospects need time to go through education before they'd ever arrive there.

2. **1322legacystrategies.com second.** Can launch 1-2 weeks after IBC Academy. The intake form is the critical feature — everything else can iterate.

3. **Cross-site links last.** Only add the ibcacademy.org → 1322legacystrategies.com links once both sites are live and the intake form is tested.

**Build Time Monitoring:** Monitor Vercel build times as content scales. IBC Academy initial builds should be ~30-60s. If builds exceed 3 minutes (likely around 200+ blog posts with image processing), enable Astro Content Layer caching and investigate incremental build strategies.

---

## 16. Appendices

### Appendix A: Model Site Analysis

**retirementresearcher.com (Wade Pfau) — What to emulate for IBC Academy:**
- Structured learning approach (not just a blog dump)
- RISA® assessment tool → our calculators
- Clear "Start Here" path for newcomers
- Academy upsell (free content → paid content)
- Professional but approachable tone
- Resource library with categorization
- Newsletter as primary conversion mechanism

**griggscapitalstrategies.com (Ryan Griggs) — What to emulate for 1322 Legacy:**
- Clean, minimal advisory site
- Intake form with screening questions (insurance licensing gate)
- GCS 101 mini-course → our Skool classroom
- New Client Preparation Guide → our /journey pages
- Client preparation emphasis (education before meetings)
- Professional without being corporate
- No fluff — every page has a purpose

**mcleanam.com (McLean Asset Management) — What to emulate for 1322 Legacy:**
- Premium but warm visual design
- Clear process visualization
- Team/advisor credibility page
- Professional photography/imagery
- Minimal navigation (only what's needed)
- Trust signals above the fold

### Appendix B: Compliance Notes

Both sites exist in a regulated space. Key considerations:

1. **No specific product recommendations on ibcacademy.org.** Educational only. No carrier names, no premium amounts, no illustration examples. This keeps the education site clean of compliance issues.

2. **1322legacystrategies.com disclaimers.** Footer disclaimer on every page: "Brad Raschke is a licensed insurance professional. This website is not intended as insurance or financial advice. Products mentioned are offered through [carrier name]. Consult your own financial and legal advisors."

3. **No guaranteed returns language.** Never say "guaranteed returns." Say "contractual guarantees" (which is accurate for whole life cash value guarantees).

4. **No comparison to securities.** IBC is not an investment. Never compare it to stocks, bonds, mutual funds, or 401k performance in a way that implies it's a competing investment product.

5. **Calculator disclaimers.** All interactive tools must include: "This calculator is for educational purposes only and does not represent any specific insurance product or policy illustration."

6. **Testimonials.** When added (future), must comply with state regulations. No implied guarantees of results.

7. **Data Handling & Retention.**
   - **Intake form submissions** are stored in Notion (CRM). Active prospect records are retained indefinitely. Records with no activity for 12 months are archived. Records are deleted on request. Access is limited to Brad.
   - **Formspree** retains form submissions per their data retention policy (see [Formspree Privacy Policy](https://formspree.io/legal/privacy-policy/)). Submissions are also forwarded to Brad's email.
   - **ConvertKit** retains subscriber data (email, tags, sequences) per their privacy policy. Subscribers can unsubscribe at any time; unsubscribed records are retained for 30 days then purged.
   - **Browser storage:** No PII is persisted in browser storage beyond the active tab session. `sessionStorage` holds form field data (cleared on tab close). `localStorage` holds only non-PII metadata (current step number, form start timestamp, theme preference).
   - **Plausible Analytics** collects no PII. No cookies. No IP addresses stored. Fully GDPR compliant.
   - **Sentry** may capture error context (browser, URL, stack trace) but does not capture form field values. PII scrubbing is enabled by default.

### Appendix C: Future Enhancements (Not in Scope for v1)

| Enhancement | Site | Phase | Description |
|---|---|---|---|
| Member portal | ibcacademy.org | Future | Login, progress tracking across devices, saved resources |
| Podcast | ibcacademy.org | Future | Embedded podcast player, episode pages |
| Client portal | 1322legacy | Future | Existing client login, document access, policy dashboard |
| Automated triage | 1322legacy | Future | Mabel auto-classifies intake form submissions |
| A/B testing | Both | Future | Test hero variants, CTA copy, form layouts |
| Multilingual | ibcacademy.org | Far future | Spanish translation (growing IBC audience) |
| Webinar replays | ibcacademy.org | Future | Gated replay library |
| Community forum | ibcacademy.org | Future | Integrated discussion (or Skool remains primary) |
| Shared component package | Both | Phase 2+ | `@ibc/ui` npm package |

### Appendix D: Quality Gates

Before any page goes live, it must pass:

| Gate | Requirement | Automated? |
|---|---|---|
| Lighthouse Performance | ≥ 95 | Yes (CI) |
| Lighthouse Accessibility | ≥ 95 | Yes (CI) |
| Lighthouse Best Practices | ≥ 95 | Yes (CI) |
| Lighthouse SEO | ≥ 95 | Yes (CI) |
| axe-core accessibility | 0 critical/serious violations | Yes (CI — `@axe-core/cli`) |
| Keyboard navigation | All interactive elements reachable and operable | Manual (every sprint) |
| Mobile responsive | Renders correctly at 320px, 375px, 768px, 1024px, 1440px | Manual (every sprint) |
| Cross-browser | Chrome, Firefox, Safari, Edge (latest 2 versions) | Manual (every sprint) |
| Content review | Brad has approved all copy | Manual (per publish) |
| Link check | All internal and external links valid | Yes (CI — weekly cross-site check) |
| Image optimization | All images in AVIF/WebP with proper alt text | Yes (Astro build) |
| Print stylesheet | Content pages print cleanly (ibcacademy.org blog, 1322legacy journey) | Manual (per layout change) |
| Uptime monitoring | Both sites + Formspree endpoint responding | Yes (UptimeRobot, 5-min interval) |

### Appendix E: Glossary of Technical Terms

| Term | Definition |
|---|---|
| **SSG** | Static Site Generation — HTML built at build time, not on each request |
| **Islands Architecture** | Only interactive components ship JavaScript; rest is static HTML |
| **Content Collection** | Astro's typed content management system using local files |
| **MDX** | Markdown + JSX — write content in Markdown with embedded components |
| **View Transitions API** | Browser-native API for smooth page-to-page animations |
| **Hydration** | Process of making server-rendered HTML interactive with JavaScript |
| **client:visible** | Astro directive — hydrate component when it scrolls into viewport |
| **client:load** | Astro directive — hydrate component immediately on page load |
| **Pagefind** | Static search library that indexes at build time, zero server needed |
| **Formspree** | Third-party form handling service (no backend required) |
| **Plausible** | Privacy-focused analytics platform (no cookies) |
| **CLS** | Cumulative Layout Shift — how much the page visually jumps during load |
| **LCP** | Largest Contentful Paint — when the largest visible element finishes rendering |
| **FCP** | First Contentful Paint — when the first content appears on screen |

---

## Document History

| Version | Date | Author | Changes |
|---|---|---|---|
| 1.0 | 2026-01-28 | Mabel | Initial architecture document |
| 1.1 | 2026-01-27 | Mabel | Architecture audit resolution — resolved 20 risks (2 P0, 8 P1, 10 P2). Decided form stack (Formspree), email service (ConvertKit), storage model (sessionStorage for PII). Added form security, error handling, data retention, uptime monitoring, axe-core CI, dark mode tokens. Removed Framer Motion, Resend, and all "Option A/B" language. |

---

*This document is the single source of truth for building ibcacademy.org and 1322legacystrategies.com. All development decisions should reference this document. If something isn't covered here, ask before building.*

*"A good man leaves an inheritance to his children's children." — Proverbs 13:22*

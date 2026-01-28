import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const learn = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/learn" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.enum(['foundations', 'mechanics', 'advanced']),
    order: z.number(),
    skoolModule: z.number().optional(),
    estimatedMinutes: z.number(),
    videoUrl: z.string().url().optional(),
    prerequisites: z.array(z.string()).optional(),
    keyTakeaways: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Brad Raschke'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(['foundations', 'mechanics', 'case-studies', 'austrian-economics', 'mindset', 'news']),
    tags: z.array(z.string()),
    image: z.object({ src: z.string(), alt: z.string() }).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonical: z.string().url().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    clientType: z.string(),
    scenario: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/glossary" }),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    relatedTerms: z.array(z.string()).optional(),
    source: z.string().optional(),
    category: z.enum(['core-concept', 'policy-mechanics', 'economics', 'insurance-term', 'ibc-specific']),
  }),
});

export const collections = { learn, blog, 'case-studies': caseStudies, glossary };

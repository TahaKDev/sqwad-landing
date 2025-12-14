import { defineCollection, z } from 'astro:content';

/**
 * Schema for agent skills
 */
const skillSchema = z.object({
  name: z.string(),
  description: z.string(),
});

/**
 * Schema for use cases
 */
const useCaseSchema = z.object({
  title: z.string(),
  description: z.string(),
});

/**
 * Schema for code examples
 */
const codeExampleSchema = z.object({
  title: z.string(),
  code: z.string(),
  lang: z.string().default('bash'),
});

/**
 * Agents collection - Data about each AI agent
 */
const agents = defineCollection({
  type: 'data',
  schema: z.object({
    // Basic info
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),

    // Visual
    accentColor: z.string(),
    emoji: z.string().optional(),

    // Content
    about: z.array(z.string()),
    specialties: z.array(z.string()),
    skills: z.array(skillSchema),
    useCases: z.array(useCaseSchema),
    codeExamples: z.array(codeExampleSchema),

    // Do's and Don'ts
    does: z.array(z.string()),
    doesNot: z.array(z.string()),

    // Configuration
    mcpTools: z.array(z.string()).optional(),

    // Philosophy
    philosophy: z.object({
      quote: z.string(),
      explanation: z.array(z.string()),
    }),

    // Meta
    draft: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { agents };

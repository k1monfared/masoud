import { defineCollection, z } from 'astro:content';

const goals = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    order: z.number(),
    intro: z.string().optional(),
    image: z.string().optional(),
  }),
});

const programs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    goal: z.string(),
    category: z.string(),
    order: z.number(),
    summary: z.string(),
    processingTime: z.string().optional(),
    languageRequirement: z.string().optional(),
    governmentFeeRange: z.string().optional(),
    eligibilityBullets: z.array(z.string()).optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
  }),
});

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string(),
    tag: z.string().optional(),
  }),
});

export const collections = { goals, programs, resources };

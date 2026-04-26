import { defineCollection, z } from 'astro:content';

const goals = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    icon: z.string(),
    order: z.number(),
    intro: z.string().optional(),
  }),
});

const programs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    goal: z.string(),
    category: z.string(),
    order: z.number(),
    summary: z.string(),
  }),
});

export const collections = { goals, programs };

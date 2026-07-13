import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const selections = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/selections" }),
    schema: z.object({
        title: z.string(),
        producer: z.string(),
        vintage: z.string(),
        country: z.string(),
        region: z.string(),
        type: z.enum(["Red", "White", "Sparkling", "Rosé", "Dessert"]),
        grapes: z.string(),
        price: z.string(),
        date: z.coerce.date(),
        tastingDate: z.coerce.date(),
        tags: z.array(z.string()),
        vibe: z.string(),
        metrics: z.object({
            liveliness: z.number().min(0).max(2),
            drinkability: z.number().min(0).max(2),
            balance: z.number().min(0).max(2),
            complexity: z.number().min(0).max(2),
            emotion: z.number().min(0).max(2),
        }),
        excerpt: z.string(),
        image: z.string().default("/favicon.png"),
    }),
});

const portraits = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/portraits" }),
    schema: z.object({
        title: z.string(),
        role: z.string(),
        location: z.string(),
        tags: z.array(z.string()),
        excerpt: z.string(),
        date: z.coerce.date(),
        hero: z.object({
            src: z.string(),
            srcSmall: z.string(),
            alt: z.string(),
            caption: z.string(),
        }).optional(),
    }),
});

const essays = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/essays" }),
    schema: z.object({
        title: z.string(),
        type: z.enum(["Culture", "Terroir", "Travel", "Journal"]),
        location: z.string().optional(),
        tags: z.array(z.string()),
        vibe: z.string(),
        image: z.string().optional(),
        excerpt: z.string(),
        date: z.coerce.date(),
    }),
});

export const collections = { selections, portraits, essays };

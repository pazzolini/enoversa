import { defineCollection, z } from 'astro:content';

const selections = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		producer: z.string(),
		vintage: z.string(), 
		country: z.string(),
		region: z.string(),
		type: z.enum(['Red', 'White', 'Sparkling', 'Rosé', 'Orange', 'Pet Nat']),
		grapes: z.string(),
		price: z.string(),
		date: z.date(),
		tastingDate: z.date(),
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
		image: z.string().default('/images/placeholder-wine.jpg'),
	}),
});

const portraits = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		role: z.string(),
		location: z.string(),
		tags: z.array(z.string()),
		vibe: z.string(),
		excerpt: z.string(),
		date: z.date(),
	}),
});

const essays = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		// THE NEW CLEAN TYPES:
		type: z.enum(['Culture', 'Terroir', 'Travel', 'Journal']), 
		location: z.string().optional(),
		tags: z.array(z.string()),
		vibe: z.string(),
		image: z.string().optional(),
		excerpt: z.string(),
		date: z.date(),
	}),
});

export const collections = { selections, portraits, essays };

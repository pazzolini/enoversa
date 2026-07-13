import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const collections = await Promise.all([
    getCollection('selections'),
    getCollection('portraits'),
    getCollection('essays'),
  ]);

  const sectionPaths = ['selections', 'portraits', 'essays'];
  const items = collections
    .flatMap((entries, collectionIndex) =>
      entries.map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.excerpt,
        link: `/${sectionPaths[collectionIndex]}/${entry.id}`,
      })),
    )
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Enoversa',
    description: 'Narratives of Soil & Craft. A digital journal exploring low-intervention wines.',
    site: context.site,
    items,
    customData: '<language>en-gb</language>',
  });
}

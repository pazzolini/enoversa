import { expect, test } from '@playwright/test';

test('the main navigation reaches the selections index', async ({ page }) => {
  await page.goto('/');

  const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
  await menuButton.click();
  await page.getByRole('link', { name: '01 Selections' }).click();

  await expect(page).toHaveURL(/\/selections$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Selections' })).toBeVisible();
});

test('the selections filters work and update the URL', async ({ page }) => {
  await page.goto('/selections');
  await page.getByRole('button', { name: '[ FILTER ]' }).click();
  await page.locator('button[data-category="country"][data-value="Spain"]').click();

  await expect(page).toHaveURL(/country=Spain/);
  await expect(page.locator('.selection-card:not(.hidden)')).not.toHaveCount(0);
  await expect(page.locator('.selection-card.hidden')).not.toHaveCount(0);
});

test('the portrait hero loads without horizontal overflow', async ({ page }) => {
  await page.goto('/portraits/claudio-miguel-marzagana-elementales');

  const hero = page.locator('main > figure img');
  await expect(hero).toBeVisible();
  await expect
    .poll(() => hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0))
    .toBe(true);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('RSS and sitemap endpoints are generated', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.ok()).toBe(true);
  expect(rss.headers()['content-type']).toContain('xml');
  expect(await rss.text()).toContain('<title>Enoversa</title>');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('<sitemapindex');
});

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

test('the addresses map filters places and fits a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/addresses');

  await expect(page.getByRole('heading', { level: 1, name: 'Addresses' })).toBeVisible();
  await expect(page.locator('.maplibregl-canvas')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Zoom in' })).toBeVisible();
  await page.getByRole('button', { name: 'Bar', exact: true }).click();

  await expect(page.locator('[data-place-card]:visible')).toHaveCount(3);
  await expect(page.getByRole('heading', { level: 3, name: 'Cera — Bistro & Wine Bar' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Madame! Wine Shop & Bar' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Junior Wine Bar & Cheese Shop' })).toBeVisible();

  const madame = page.locator('[data-place-card]:visible').filter({ hasText: 'Madame!' });
  await madame.getByRole('button', { name: 'Show on map ↑' }).click();
  await expect(madame).toHaveAttribute('data-active', 'true');

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test('the homepage addresses section is an interactive map', async ({ page }) => {
  await page.goto('/');

  const map = page.getByRole('region', { name: /Interactive preview of Enoversa addresses/ });
  await map.scrollIntoViewIfNeeded();
  await expect(map.locator('.maplibregl-canvas')).toBeVisible();
  await expect(map.locator('[data-home-place-marker]')).toHaveCount(4);
  await expect(map.getByRole('link', { name: /Marzagana Elementales/ })).toHaveAttribute(
    'href',
    '/addresses#place-marzagana-elementales',
  );
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

import { expect, test } from '@playwright/test';

test('the main navigation reaches the selections index', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
  const menuButton = page.locator('#menu-btn');
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

test('selection classification and typed tag filters stay separate', async ({ page }) => {
  await page.goto('/selections');
  await page.getByRole('button', { name: '[ FILTER ]' }).click();

  await expect(page.locator('button[data-category="colour"][data-value="Red"]')).toBeVisible();
  await expect(page.locator('button[data-category="effervescence"][data-value="Sparkling"]')).toBeVisible();
  await expect(page.locator('button[data-category="tag"][data-value="Carbonic Maceration"]')).toBeVisible();
  await expect(page.locator('button[data-category="tag"][data-value="Co-fermented"]')).toHaveCount(0);

  await page.locator('button[data-category="colour"][data-value="Red"]').click();
  await page.locator('button[data-category="tag"][data-value="Carbonic Maceration"]').click();

  await expect(page).toHaveURL(/colour=Red/);
  await expect(page).toHaveURL(/tag=Carbonic\+Maceration/);
  await expect(page.locator('.selection-card:not(.hidden)')).toHaveCount(2);
  await expect(page.locator('.selection-card:not(.hidden)[data-colour="Red"]')).toHaveCount(2);
});

test('an individual selection groups factual tags apart from the vibe', async ({ page }) => {
  await page.goto('/selections/domaine-matassa-french-disko-2023');

  await expect(page.getByText('Colour', { exact: true })).toBeVisible();
  await expect(page.getByText('Effervescence', { exact: true })).toBeVisible();
  await expect(page.getByText('Vinification', { exact: true })).toBeVisible();
  await expect(page.getByText('Carbonic Maceration', { exact: true })).toBeVisible();
  await expect(page.getByText('Natural', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 2, name: 'REDCURRANT. SANGUINE. WEIGHTLESS.' })).toBeVisible();
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

  const expectedBarCount = await page.locator('[data-place-card][data-place-categories*="Bar"]').count();
  await expect(page.locator('[data-place-card]:visible')).toHaveCount(expectedBarCount);
  await expect(page.getByRole('heading', { level: 3, name: 'Cera — Bistro & Wine Bar' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Madame! Wine Shop & Bar' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Junior Wine Bar & Cheese Shop' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'ajar' })).toBeVisible();

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
  const expectedPlaceCount = JSON.parse((await map.getAttribute('data-places')) ?? '[]').length;
  await expect(map.locator('[data-home-place-marker]')).toHaveCount(expectedPlaceCount);
  await expect(map.getByRole('link', { name: /Marzagana Elementales/ })).toHaveAttribute(
    'href',
    '/addresses#place-marzagana-elementales',
  );
});

test('the homepage reflows at tablet widths and a 200%-zoom equivalent viewport', async ({ page }) => {
  for (const width of [640, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Narratives of Soil & Craft.' })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow, `horizontal overflow at ${width}px`).toBe(false);
  }
});

test('keyboard users can skip content and operate the navigation menu', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);

  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeVisible();
  const menuButton = page.locator('#menu-btn');
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  const firstMenuLink = page.getByRole('link', { name: '00 A New Beginning' });
  await expect(firstMenuLink).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(firstMenuLink).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await expect(menuButton).toBeFocused();
});

test('standalone navigation targets meet the 24px minimum', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();

  const undersizedHomeTargets = await page.locator('[data-touch-target]:visible').evaluateAll((targets) =>
    targets
      .map((target) => {
        const bounds = target.getBoundingClientRect();
        return {
          label: target.getAttribute('aria-label') ?? target.textContent?.trim() ?? '',
          width: bounds.width,
          height: bounds.height,
        };
      })
      .filter(({ width, height }) => width < 24 || height < 24),
  );
  expect(undersizedHomeTargets).toEqual([]);

  await page.goto('/addresses');
  const undersizedAddressTargets = await page.locator('[data-touch-target]:visible').evaluateAll((targets) =>
    targets
      .map((target) => {
        const bounds = target.getBoundingClientRect();
        return {
          label: target.textContent?.trim() ?? '',
          width: bounds.width,
          height: bounds.height,
        };
      })
      .filter(({ width, height }) => width < 24 || height < 24),
  );
  expect(undersizedAddressTargets).toEqual([]);
});

test('reduced motion removes smooth scrolling and perceptible CSS motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const motionStyles = await page.evaluate(() => {
    const pulse = document.querySelector('.animate-pulse');
    if (!pulse) throw new Error('Expected homepage pulse indicator');

    return {
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      animationDuration: Number.parseFloat(getComputedStyle(pulse).animationDuration),
      transitionDuration: Number.parseFloat(getComputedStyle(pulse).transitionDuration),
    };
  });

  expect(motionStyles.scrollBehavior).toBe('auto');
  expect(motionStyles.animationDuration).toBeLessThanOrEqual(0.00001);
  expect(motionStyles.transitionDuration).toBeLessThanOrEqual(0.00001);
});

test('the homepage map exposes a useful failure state', async ({ page }) => {
  await page.route('https://tiles.openfreemap.org/**', (route) => route.abort('failed'));
  await page.goto('/');

  const map = page.getByRole('region', { name: /Interactive preview of Enoversa addresses/ });
  await map.scrollIntoViewIfNeeded();
  await expect(map).toHaveAttribute('data-error', 'true', { timeout: 5_000 });
  await expect(map.getByRole('status')).toContainText('Interactive map unavailable');
  await expect(page.getByRole('link', { name: 'Open all addresses →' })).toBeVisible();

  await page.goto('/addresses');
  const addressMap = page.getByRole('region', { name: /Interactive map of selected addresses/ });
  await expect(addressMap).toHaveAttribute('data-error', 'true', { timeout: 5_000 });
  await expect(addressMap.getByRole('status')).toContainText('The address list and external map links remain available.');
  await expect(page.getByRole('heading', { level: 3, name: 'Cera — Bistro & Wine Bar' })).toBeVisible();
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

import { test, expect } from '@playwright/test';

const BASE = '/masoud';
const ROUTES = ['/', '/about', '/resources', '/contact', '/immigrate/cec'];

test.describe('book consultation FAB', () => {
  test.use({ viewport: { width: 1024, height: 800 } });

  for (const route of ROUTES) {
    test(`book consultation FAB visible on ${route}`, async ({ page }) => {
      await page.goto(route === '/' ? BASE : `${BASE}${route}`);
      const fab = page.locator('a.bookfab').first();
      await expect(fab).toBeVisible();
      await expect(fab).toHaveText(/Book consultation/i);
      const href = await fab.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href!.endsWith('/contact') || href!.startsWith('http')).toBe(true);
    });
  }
});

test('about page heading visible', async ({ page }) => {
  await page.goto(`${BASE}/about`);
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).not.toHaveText('');
});

test('resources index links to a renderable article', async ({ page }) => {
  await page.goto(`${BASE}/resources`);
  const cards = page.locator('a.article');
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  await cards.first().click();
  await expect(page).toHaveURL(/\/resources\/[a-z0-9-]+$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

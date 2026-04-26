import { test, expect } from '@playwright/test';

const BASE = '/masoud';

test('homepage to detail page in two taps', async ({ page }) => {
  await page.goto(BASE);
  // homepage is just the goal grid; first goal tile must be present
  await expect(page.locator('.goaltile').first()).toBeVisible();

  // tap 1: choose goal
  await page.locator('.goaltile').filter({ hasText: 'Immigrate to Canada' }).click();
  await expect(page.getByRole('heading', { name: 'Immigrate to Canada' })).toBeVisible();

  // tap 2: choose program (scope to main, avoids related-programs / footer matches)
  await page.locator('main').getByRole('link', { name: 'Canadian Experience Class' }).first().click();
  await expect(page.getByRole('heading', { name: 'Canadian Experience Class' })).toBeVisible();

  // back link visible
  await expect(page.getByRole('link', { name: /All Express Entry programs/ })).toBeVisible();

  // Book FAB always present (floats over the page)
  await expect(page.locator('a.bookfab').first()).toBeVisible();
});

test('every homepage tile leads somewhere', async ({ page }) => {
  await page.goto(BASE);
  const tiles = page.locator('.goaltile');
  const count = await tiles.count();
  expect(count).toBeGreaterThanOrEqual(9);
  for (let i = 0; i < count; i++) {
    const href = await tiles.nth(i).getAttribute('href');
    expect(href).not.toBeNull();
  }
});

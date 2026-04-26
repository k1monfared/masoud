import { test, expect } from '@playwright/test';

test('homepage to detail page in two taps', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'I want to...' })).toBeVisible();

  // tap 1: choose goal
  await page.getByRole('link', { name: /Immigrate to Canada/ }).click();
  await expect(page.getByRole('heading', { name: 'Immigrate to Canada' })).toBeVisible();

  // tap 2: choose program
  await page.getByRole('link', { name: /Canadian Experience Class/ }).click();
  await expect(page.getByRole('heading', { name: 'Canadian Experience Class' })).toBeVisible();

  // back link visible
  await expect(page.getByRole('link', { name: /All Express Entry programs/ })).toBeVisible();

  // CTA visible
  await expect(page.getByRole('link', { name: /Book a consultation/ })).toBeVisible();
});

test('every homepage tile leads somewhere', async ({ page }) => {
  await page.goto('/');
  const tiles = page.locator('.goaltile');
  const count = await tiles.count();
  expect(count).toBeGreaterThanOrEqual(9);
  for (let i = 0; i < count; i++) {
    const href = await tiles.nth(i).getAttribute('href');
    expect(href).not.toBeNull();
  }
});

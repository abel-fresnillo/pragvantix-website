import { expect, test } from '@playwright/test';

// Relative luminance of an "rgb(r, g, b)" colour, 0 (black) to 1 (white).
function luminance(rgb: string): number {
  const [r, g, b] = rgb.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

test.describe('phone-width screen', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Home does not scroll horizontally', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('the navigation menu opens from the Menu button', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    const about = nav.getByRole('link', { name: 'About' });
    await expect(about).toBeHidden();
    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(about).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Contact' })).toBeVisible();
  });
});

test.describe('colour scheme', () => {
  test('shows the dark theme when the device prefers dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(luminance(bg)).toBeLessThan(0.2);
  });

  test('shows the light theme when the device prefers light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(luminance(bg)).toBeGreaterThan(0.8);
  });
});

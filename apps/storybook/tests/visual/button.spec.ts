import { test, expect } from '@playwright/test';

const stories = [
  'components-button--default',
  'components-button--variants',
  'components-button--sizes',
  'components-button--with-icons',
  'components-button--shapes',
  'components-button--loading',
  'components-button--as-link',
  'components-button--full-width',
  'components-button--custom-text-color'
];

test.describe('Visual Regression Tests - Button', () => {
  for (const story of stories) {
    test(`visual test for ${story}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`);
      const rootLocator = page.locator('#storybook-root');
      await rootLocator.waitFor({ state: 'visible' });
      await page.waitForTimeout(500);
      const screenshot = await rootLocator.screenshot({ animations: 'disabled' });
      expect(screenshot).toMatchSnapshot(`${story}.png`);
    });
  }
});

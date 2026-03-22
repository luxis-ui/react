import { test, expect } from '@playwright/test';

const stories = [
  'components-accordion--default',
  'components-accordion--bordered',
  'components-accordion--separated',
  'components-accordion--flush',
  'components-accordion--allow-multiple',
  'components-accordion--plus-minus',
  'components-accordion--small-size',
  'components-accordion--large-size',
  'components-accordion--compact',
  'components-accordion--disabled',
  'components-accordion--loading',
  'components-accordion--chevron-left'
];

test.describe('Visual Regression Tests - Accordion', () => {
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

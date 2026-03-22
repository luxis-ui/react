import { test, expect } from '@playwright/test';

const stories = [
  'components-alert--default',
  'components-alert--success',
  'components-alert--error-alert',
  'components-alert--warning',
  'components-alert--info',
  'components-alert--neutral',
  'components-alert--filled',
  'components-alert--outlined',
  'components-alert--subtle',
  'components-alert--left-accent',
  'components-alert--small-size',
  'components-alert--medium-size',
  'components-alert--large-size',
  'components-alert--dismissible',
  'components-alert--no-icon',
  'components-alert--with-children',
  'components-alert--with-action',
  'components-alert--full-width',
  'components-alert--all-variants',
  'components-alert--all-styles'
];

test.describe('Visual Regression Tests - Alert', () => {
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

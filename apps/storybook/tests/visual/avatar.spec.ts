import { test, expect } from '@playwright/test';

const stories = [
  'components-avatar--playground',
  'components-avatar--with-image',
  'components-avatar--with-fallback-text',
  'components-avatar--with-fallback-icon',
  'components-avatar--image-error',
  'components-avatar--sizes',
  'components-avatar--shapes',
  'components-avatar--status-positions',
  'components-avatar--status-colors',
  'components-avatar--small',
  'components-avatar--large',
  'components-avatar--circular',
  'components-avatar--rounded',
  'components-avatar--square',
  'components-avatar--avatar-group'
];

test.describe('Visual Regression Tests - Avatar', () => {
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

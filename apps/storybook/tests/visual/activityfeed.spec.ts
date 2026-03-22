import { test, expect } from '@playwright/test';

const stories = [
  'widgets-activityfeed--standard',
  'widgets-activityfeed--without-card',
  'widgets-activityfeed--empty-state'
];

test.describe('Visual Regression Tests - ActivityFeed', () => {
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

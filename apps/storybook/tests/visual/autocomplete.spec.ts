import { test, expect } from '@playwright/test';

const stories = [
  'components-autocomplete--playground',
  'components-autocomplete--default',
  'components-autocomplete--with-search-icon',
  'components-autocomplete--clearable',
  'components-autocomplete--with-descriptions',
  'components-autocomplete--small',
  'components-autocomplete--large',
  'components-autocomplete--full-width',
  'components-autocomplete--required',
  'components-autocomplete--with-helper-text',
  'components-autocomplete--with-error',
  'components-autocomplete--with-success',
  'components-autocomplete--loading',
  'components-autocomplete--no-options',
  'components-autocomplete--disabled',
  'components-autocomplete--with-disabled-option',
  'components-autocomplete--min-search-length',
  'components-autocomplete--custom-render-option',
  'components-autocomplete--sizes',
  'components-autocomplete--validation-states'
];

test.describe('Visual Regression Tests - Autocomplete', () => {
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

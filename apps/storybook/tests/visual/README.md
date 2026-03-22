# Visual Regression Testing with Playwright

This directory contains the visual regression tests for Luxis UI, utilizing Playwright.
We capture screenshots of individual components rendered via Storybook and compare them to stored baseline snapshots.

## Running Tests

To run the visual regression tests locally, use the following npm script:

```sh
pnpm run test:visual
```

This will:
1. Build storybook locally.
2. Spin up a local static server to host the build (`http://localhost:6006`).
3. Iterate through configured components and capture their screenshots.
4. Compare the captured screenshots against existing baseline snapshots.

If any snapshot does not match the baseline, the test will fail, and an HTML report will be generated showing the image diff.

## Updating Snapshots

When you intentionally change the UI of a component, its visual test will fail. To update the baseline snapshots to match the new UI, run:

```sh
pnpm run test:visual:update
```

Review the updated snapshots locally and ensure they look correct before committing them.

## Folder Structure

* `tests/visual/components.spec.ts`: The main test script iterating through components.
* `tests/visual/__snapshots__/`: Contains the baseline screenshots. Do not modify these manually. Playwright will generate and update these.

## Best Practices for Screenshot Stability

Visual tests can be flaky if not carefully managed. Here are some best practices we follow to ensure stability:

1. **Test the isolated iframe**: We test the `/iframe.html?id=...` URL directly rather than the full Storybook UI (`/?path=/story/...`) to avoid flakiness caused by the Storybook navigation and sidebars rendering differently.
2. **Disable Animations**: Playwright automatically disables CSS animations and transitions when taking a screenshot using the `animations: 'disabled'` option, ensuring that the component is captured in its final state.
3. **Wait for Network Idle / Visibility**: We explicitly wait for the `#storybook-root` to be visible before capturing the screenshot, ensuring the component is fully mounted. We also add a small delay to allow web fonts or external assets to load if needed.
4. **Scope Screenshots**: We capture the `#storybook-root` element rather than the entire page (`page.screenshot()`) to avoid capturing unnecessary whitespace that might differ slightly across resolutions or browsers.
5. **Tolerance**: A small `maxDiffPixelRatio` (e.g., `0.05`) is configured in `playwright.config.ts` to allow for minute sub-pixel anti-aliasing differences that can occur when tests are run in different environments (e.g., local macOS vs CI Linux).
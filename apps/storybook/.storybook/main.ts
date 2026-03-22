import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/@luxis-ui/react/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '@luxis-ui/react/theme/base.css',
            replacement: path.resolve(__dirname, '../../../packages/@luxis-ui/react/src/theme/base.css'),
          },
          {
            find: '@luxis-ui/react/styles',
            replacement: path.resolve(__dirname, '../../../packages/@luxis-ui/react/src/theme/base.css'),
          },
          {
            find: '@luxis-ui/react',
            replacement: path.resolve(__dirname, '../../../packages/@luxis-ui/react/src/index.ts'),
          },
        ],
      },
    });
  },
};
export default config;
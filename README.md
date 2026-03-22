<div align="center">

<img src="https://luxisui.com/img/logo.webp" alt="Luxis UI" width="72" height="72" />

# Luxis UI — Design System

**A modern, accessible, fully themeable React component library.**  
Built with TypeScript. Powered by CSS variables. Zero runtime overhead.

[![npm version](https://img.shields.io/npm/v/@luxis-ui/react?color=0c6b58&style=flat-square)](https://www.npmjs.com/package/@luxis-ui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./packages/luxis-ui/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb?style=flat-square)](https://react.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./packages/luxis-ui/CONTRIBUTING.md)

[Documentation](https://luxisui.com) · [Storybook](https://storybook.luxisui.com) · [Innostes Solutions](https://innostes-solutions.com)

</div>

![Luxis UI Demo](https://raw.githubusercontent.com/luxis-ui/react/main/raw/demo.gif)

---

## Repository Structure

This is a **pnpm workspace monorepo** managed with [Turbo](https://turbo.build).

```
lxs-ui/
├── packages/
│   └── luxis-ui/             # Core component library (@luxis-ui/react)
│       ├── src/
│       │   ├── components/   # 42 React components
│       │   ├── theme/        # ThemeProvider, tokens, CSS variables, base.css
│       │   ├── hooks/        # useTheme and custom hooks
│       │   ├── hoc/          # Higher-order components (withParsedClasses)
│       │   ├── icons/        # Built-in icon components
│       │   └── utils/        # Internal utilities (parseClass, etc.)
│       ├── tsup.config.ts    # Build configuration (ESM + CJS + Types)
│       └── package.json
├── apps/
│   ├── storybook/            # Storybook dev environment + visual tests
│   └── examples/
│       ├── saas-dashboard-react/   # Vite + React example app
│       └── saas-dashboard-next/    # Next.js example app
├── pnpm-workspace.yaml
├── tsconfig.json             # Root TypeScript config with path aliases
└── package.json              # Root workspace config with Turbo
```

---

## Components (42)

| Layout | Data Entry | Data Display | Feedback | Navigation | Overlay |
|--------|-----------|--------------|----------|------------|---------|
| Box | Input | Accordion | Alert | Breadcrumb | Modal |
| Container | Textarea | Avatar | Badge | Link | Tooltip |
| Flex | Select | Card | Chip | Menu | Toast |
| Grid | MultiSelect | DataGrid | Skeleton | SideMenu | |
| Divider | Checkbox | Table | Rating | Tabs | |
| | CheckboxGroup | Timeline | | Header | |
| | Radio | Image | | | |
| | RadioGroup | Typography | | | |
| | DatePicker | | | | |
| | FileUpload | | | | |
| | Autocomplete | | | | |
| | ToggleButton | | | | |
| | RichTextEditor | | | | |
| | FormControl | | | | |
| | Button | | | | |

---

## Prerequisites

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org) | 18+ |
| [pnpm](https://pnpm.io) | 10+ |

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/luxis-ui/react
cd luxis-ui

# 2. Install all dependencies
pnpm install

# 3. Build the core library
pnpm --filter luxis-ui build

# 4. Start Storybook (development)
pnpm --filter storybook storybook
```

Storybook will be available at **http://localhost:6006**.

---

## Scripts

### Root

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all workspace dependencies |

### Core Library (`packages/luxis-ui`)

| Command | Description |
|---------|-------------|
| `pnpm build` | Production build (ESM + CJS + type declarations) |
| `pnpm dev` | Watch mode — rebuilds on file changes |

### Storybook (`apps/storybook`)

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Start Storybook dev server on port 6006 |
| `pnpm build-storybook` | Build static Storybook site |
| `pnpm dev` | Start Vite dev server |
| `pnpm lint` | Run ESLint |

### Example Apps (`apps/examples/*`)

| Command | App | Description |
|---------|-----|-------------|
| `pnpm dev` | saas-dashboard-react | Vite dev server |
| `pnpm dev` | saas-dashboard-next | Next.js dev server |
| `pnpm build` | Both | Production build |

---

## Quick Start (for consumers)

```bash
npm install @luxis-ui/react
```

```tsx
import { ThemeProvider, Button } from '@luxis-ui/react';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Get Started</Button>
    </ThemeProvider>
  );
}
```

**That's it.** No extra CSS imports needed — styles are auto-injected when the JS loads.

For custom theming:

```tsx
import { ThemeProvider, createCustomTokens } from '@luxis-ui/react';

const tokens = createCustomTokens({
  colors: {
    primary: '#6d28d9',   // Auto-generates 50–900 shades
    secondary: '#059669',
  },
});

<ThemeProvider customTokens={tokens}>
  <App />
</ThemeProvider>
```

See the full [library README](./packages/luxis-ui/README.md) for detailed theming, dark mode, framework setup (Next.js, Vite), and API docs.

---

## Build Architecture

The library is built with [tsup](https://tsup.egoist.dev) (powered by esbuild):

| Output | Path | Format |
|--------|------|--------|
| ESM | `dist/esm/index.js` | ES Modules (tree-shakeable) |
| CJS | `dist/cjs/index.js` | CommonJS (Node / legacy bundlers) |
| Types | `dist/types/index.d.ts` | TypeScript declarations |

**CSS auto-injection**: All component CSS is extracted during build, then embedded into the JS bundle via a post-build step. When the module loads, a `<style>` tag is injected into `<head>` automatically. Consumers never need to manually import CSS files.

---

## Workspace Dependencies

```
storybook ──────────────┐
saas-dashboard-react ───┤── @luxis-ui/react (workspace:*)
saas-dashboard-next ────┘
```

All apps reference the core library via `workspace:*`, meaning they always use the local source during development.

The Storybook app uses Vite aliases to point directly to source files, enabling HMR without rebuilding the library:

```
@luxis-ui/react → packages/luxis-ui/src/index.ts
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 5.9 |
| UI Framework | React 18 / 19 |
| Build Tool | tsup (esbuild) |
| Monorepo | pnpm workspaces + Turbo |
| Component Dev | Storybook 10 |
| Testing | Vitest + Playwright |
| Styling | CSS custom properties (zero-runtime) |
| Linting | ESLint 9 |

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./packages/luxis-ui/CONTRIBUTING.md) before submitting a PR.

```bash
git clone https://github.com/innostes-solutions/luxis-ui.git
cd luxis-ui
pnpm install
pnpm --filter luxis-ui dev      # Watch mode for library
pnpm --filter storybook storybook  # Storybook at http://localhost:6006
```

Please follow our [Code of Conduct](./packages/luxis-ui/CODE_OF_CONDUCT.md) in all interactions.  
Report security issues privately via [SECURITY.md](./packages/luxis-ui/SECURITY.md).

---

## License

MIT License — Copyright (c) 2026 [Innostes Solutions](https://innostes-solutions.com)

See [LICENSE](./packages/luxis-ui/LICENSE) for the full text.

---

<div align="center">

Made with ♥ by [Innostes Solutions](https://innostes-solutions.com)

[Website](https://innostes-solutions.com) · [npm](https://www.npmjs.com/package/@luxis-ui/react) · [Documentation](https://luxisui.com) · [GitHub](https://github.com/innostes-solutions/luxis-ui)

</div>

# seo_lib - AI Development Guide

## Overview

`@sudobility/seo_lib` is a React component library providing SEO (Search Engine Optimization) and AEO (Answer Engine Optimization) components and utilities for Web3 applications. It offers ready-to-use React components for meta tags, structured data (JSON-LD), semantic HTML elements with ARIA accessibility, and AI training metadata generation -- all tailored for blockchain/Web3 email platforms.

- **Package name**: `@sudobility/seo_lib`
- **Version**: `0.0.2`
- **License**: BUSL-1.1
- **Package manager**: Bun (always use `bun` instead of `npm`/`yarn`)
- **Module format**: ESM only
- **Author**: John Q Huang
- **Repository**: https://github.com/sudobility/seo_lib.git

## Project Structure

```
src/
├── index.ts                          # Library entry point; re-exports components/ and utils/
├── components/
│   ├── index.ts                      # Barrel export for all components
│   ├── AIMeta.tsx                    # AI-specific meta tags via react-helmet-async
│   ├── AIMeta.test.tsx               # Tests for AIMeta
│   ├── AITrainingEnhancer.tsx        # Wrapper component for AI training content
│   ├── SEO.tsx                       # Comprehensive SEO meta/OG/Twitter/JSON-LD component
│   ├── SEO.test.tsx                  # Tests for SEO
│   ├── SemanticHTML.tsx              # 20+ semantic HTML wrapper components with ARIA
│   └── SemanticHTML.test.tsx         # Tests for SemanticHTML
├── utils/
│   ├── index.ts                      # Barrel export for all utilities
│   ├── advancedSEO.ts               # Schema.org structured data generators (Product, Article, FAQ, OG, Twitter, AI meta)
│   ├── advancedSEO.test.ts          # Tests for advancedSEO
│   ├── aiTrainingMetadata.ts         # AI training metadata, concept graphs, Q&A pair generation
│   ├── aiTrainingMetadata.test.ts    # Tests for aiTrainingMetadata
│   ├── seo-headings.ts              # Semantic heading utility with validation and Web3 presets
│   └── seo-headings.test.ts         # Tests for seo-headings
└── test/
    └── setup.ts                      # Vitest setup: jest-dom matchers, react-helmet-async mock, window.location mock
```

## Key Components

### React Components (from `src/components/`)

| Export | File | Description |
|--------|------|-------------|
| `SEO` | `SEO.tsx` | Full-featured SEO component managing `<title>`, meta description, keywords, canonical URL, Open Graph, Twitter Card, JSON-LD structured data, and custom meta/link tags via `react-helmet-async` |
| `SEOProps` | `SEO.tsx` | Props interface for `SEO` (title, description, keywords, canonical, ogType, ogImage, noIndex, structuredData, twitterCard, twitterSite, config, meta, links) |
| `SEOConfig` | `SEO.tsx` | Configuration interface (appName, baseUrl, defaultDescription, defaultOgImage, defaultTwitterSite) |
| `AIMeta` | `AIMeta.tsx` | Renders AI-specific meta tags (`ai:content-type`, `ai:summary`, `ai:complexity`) via Helmet |
| `AIMetaProps` | `AIMeta.tsx` | Props interface with fields for blockchain networks, token support, wallet requirements, use cases, audiences, etc. |
| `AITrainingEnhancer` | `AITrainingEnhancer.tsx` | Passthrough wrapper component for AI training content enhancement |

### Semantic HTML Components (from `src/components/SemanticHTML.tsx`)

All components accept `children`, `className`, `id`, and relevant ARIA attributes:

| Component | HTML Element | ARIA Role | Notes |
|-----------|-------------|-----------|-------|
| `Main` | `<main>` | `main` | Main content area |
| `Article` | `<article>` | article | Article content |
| `Section` | `<section>` | region | Content section |
| `Nav` | `<nav>` | `navigation` | Requires `aria-label` |
| `Header` | `<header>` | `banner` | Page/section header |
| `Footer` | `<footer>` | `contentinfo` | Page/section footer |
| `Aside` | `<aside>` | `complementary` | Sidebar/related content |
| `Figure` | `<figure>` | figure | Accepts optional `caption` prop for `<figcaption>` |
| `H1`, `H2`, `H3`, `H4` | `<h1>`-`<h4>` | heading | Heading hierarchy components |
| `OrderedList` | `<ol>` | list | Ordered list |
| `UnorderedList` | `<ul>` | list | Unordered list |
| `SemanticButton` | `<button>` | button | Variants: `primary`, `secondary`, `danger`; sets `aria-disabled` |
| `SemanticLink` | `<a>` | link | `external` prop adds `target="_blank"`, `rel="noopener noreferrer"`, and screen reader text |
| `SkipLink` | `<a>` | link | Accessibility skip-to-main-content link |
| `SearchRegion` | `<div>` | `search` | Search landmark region |
| `BannerRegion` | `<div>` | `banner` | Banner landmark region |
| `ComplementaryRegion` | `<div>` | `complementary` | Complementary landmark region |
| `SemanticForm` | `<form>` | form | Form with ARIA label support |
| `SemanticInput` | `<input>` + `<label>` | textbox | Auto-generated IDs, `label`, `error`, `helpText` props; sets `aria-invalid` and `aria-describedby` |
| `ScreenReaderOnly` | `<span>` | -- | Visually hidden text (`.sr-only`) |
| `SemanticLoading` | `<div>` | `status` | Loading spinner with `aria-live="polite"`; sizes: `sm`, `md`, `lg` |

### Utility Functions (from `src/utils/`)

#### advancedSEO.ts -- Schema.org Structured Data Generators

| Export | Type | Description |
|--------|------|-------------|
| `createWeb3ProductSchema(config)` | Function | Generates `SoftwareApplication` schema with offers, features, blockchain networks, wallet support |
| `createTechnicalArticleSchema(config)` | Function | Generates `TechnicalArticle` schema with author, publisher, educational level, reading time |
| `createEnhancedFAQSchema(faqs, branding)` | Function | Generates `FAQPage` schema from Q&A array |
| `createAIOptimizedSchema(config)` | Function | Generates `WebPage` schema optimized for AI/LLM crawlers with significant links and mentions |
| `createEnhancedOpenGraph(config)` | Function | Returns Open Graph meta tag key-value object |
| `createEnhancedTwitterCard(config)` | Function | Returns Twitter Card meta tag key-value object |
| `createAIMetaTags(config)` | Function | Returns custom AI/LLM/Web3/semantic meta tags (ai:*, web3:*, llm:*, semantic:*, content:*) |
| `generateAdvancedSEO(config)` | Function | All-in-one: returns `{ structuredData, openGraph, twitterCard, aiMetaTags, jsonLD }` |
| `pageSEOConfigs` | Object | Pre-built SEO configs for `homepage`, `documentation`, and `earnPoints` pages |
| `AdvancedSEOConfig` | Interface | Config interface (title, description, keywords, category, audience, complexity, contentType, branding, pathname, etc.) |
| `AppBrandingConfig` | Interface | Branding config (appName, baseUrl, twitterHandle?, emailDomain?) |

#### aiTrainingMetadata.ts -- AI Training Data Utilities

| Export | Type | Description |
|--------|------|-------------|
| `generateAIMetadata(config)` | Function | Generates `LearningResource` schema.org object |
| `generateConceptGraph(concepts)` | Function | Builds a graph with nodes and edges (related_to, synonym_of relationships) |
| `generateTrainingExamples(concept)` | Function | Produces labeled training examples (positive, contextual, definition) with confidence scores |
| `generateQAPairs(concepts)` | Function | Generates Q&A pairs ("What is X?", "How does X work?", "Examples of X?", "Related to X?") |
| `WEB3_CONCEPTS` | Constant | Array of 8 pre-defined `ConceptDefinition` objects (Web3 Email, Wallet Auth, ENS Email, SNS Email, Smart Contract Integration, Multi-Chain Support, DAO Email Delegation, Web2/Web3 Bridge) |
| `AI_TRAINING_CONFIGS` | Object | Pre-built training configs for `homepage`, `documentation`, and `governance` |
| `AITrainingConfig` | Interface | Training config (domain, category, concepts, difficulty, estimatedTime, etc.) |
| `ConceptDefinition` | Interface | Concept definition (term, definition, category, synonyms, relatedTerms, examples, context) |

#### seo-headings.ts -- Semantic Heading Utility

| Export | Type | Description |
|--------|------|-------------|
| `createSemanticHeading(config)` | Function | Creates a React heading element (h1-h6) with SEO-optimized classes, contextual styling, auto-generated slug IDs, and `aria-level` |
| `WEB3_HEADING_PATTERNS` | Object | Factory functions: `pageTitle`, `majorSection`, `feature`, `benefit`, `step`, `subFeature` |
| `validateHeadingStructure(headings)` | Function | Validates heading hierarchy (single H1, no level skips, text length); returns `{ isValid, errors, suggestions }` |
| `WEB3_EMAIL_HEADINGS` | Object | Pre-built heading configs for common Web3 email pages (walletConnection, emailBenefits, securityFeature, ensIntegration, multiChain, passwordless, setupStep1-3) |
| `HeadingConfig` | Interface | Config for headings (level 1-6, text, className?, id?, semanticContext?) |

## Development Commands

```bash
bun install              # Install dependencies
bun run build            # Vite library build + TypeScript declaration emit (tsc -p tsconfig.build.json)
bun run dev              # Vite build in watch mode
bun run clean            # Remove dist/
bun run type-check       # TypeScript type check only (tsc --noEmit)
bun run test             # Run Vitest once (--passWithNoTests)
bun run test:watch       # Vitest in watch mode
bun run lint             # ESLint on src/
bun run lint:fix         # ESLint auto-fix on src/
bun run format           # Prettier write on src/**/*.{ts,tsx,js,jsx,json}
bun run format:check     # Prettier check (no write)
bun run prepublishOnly   # Runs build before npm publish
```

**Pre-commit check** (no `verify` or `check-all` script; run manually):
```bash
bun run lint && bun run type-check && bun run test
```

## Architecture / Patterns

### Build Pipeline
- **Vite** in library mode (`lib.entry = src/index.ts`) outputs a single ES module bundle (`dist/index.js`) with source maps, no minification.
- **TypeScript** declarations are emitted separately via `tsc -p tsconfig.build.json` (`emitDeclarationOnly: true`) into `dist/`.
- `vite-plugin-dts` also generates declaration files during the Vite build step.
- External dependencies (`react`, `react-dom`, `react/jsx-runtime`, `react-helmet-async`) are excluded from the bundle.

### TypeScript Configuration
- **Target**: ES2020 with DOM libs.
- **Module resolution**: `bundler`.
- **Strict mode** enabled with `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`.
- **Path alias**: `@/*` maps to `./src/*`.
- Two tsconfig files: `tsconfig.json` (development, `noEmit: true`) and `tsconfig.build.json` (build, `emitDeclarationOnly: true`).

### Testing
- **Vitest** with `jsdom` environment and `globals: true`.
- **Setup file**: `src/test/setup.ts` imports `@testing-library/jest-dom` matchers, mocks `react-helmet-async` (Helmet and HelmetProvider render children directly), and mocks `window.location`.
- Tests use `@testing-library/react` for component rendering and `@testing-library/jest-dom` for DOM assertions.
- Test files are co-located with source files using the `.test.ts` / `.test.tsx` suffix.

### Linting & Formatting
- **ESLint 9** flat config with `@typescript-eslint`, `eslint-plugin-prettier`, `eslint-config-prettier`.
- Key rules: Prettier enforced as error, `no-explicit-any` off, unused vars with `_` prefix ignored, `prefer-const`, `no-var`, `object-shorthand`, `prefer-template`, sorted imports.
- Test files have relaxed rules (no-explicit-any off, no-console off).
- **Prettier**: single quotes, trailing commas (es5), 80 char width, 2-space indent, LF line endings, no parens on single arrow params.

### Code Patterns
- All React components are typed with `React.FC<Props>` and use named exports.
- Components that manage `<head>` tags use `react-helmet-async`'s `<Helmet>` component.
- Semantic HTML components apply Tailwind CSS utility classes for built-in styling.
- Utility functions return plain objects (schema.org JSON-LD, meta tag key-value maps) -- they do not render React elements (except `createSemanticHeading` which returns a `React.createElement` call).
- SSR-safe: `advancedSEO.ts` uses a `getCurrentPathname()` helper that checks for `window` existence before accessing `window.location.pathname`, with a `pathname` prop override.
- Default exports are provided in `advancedSEO.ts`, `aiTrainingMetadata.ts`, and `seo-headings.ts` as object literals grouping key exports, but the barrel files use named `export *` re-exports.

### CI/CD
- GitHub Actions workflow on `main` and `develop` branches (push + PR).
- Delegates to a reusable workflow at `johnqh/workflows/.github/workflows/unified-cicd.yml@main`.
- Configured for public NPM publishing with provenance (`id-token: write`).

## Gotchas / Known Issues

- **No `bun run verify` script**: Unlike other Sudobility projects, there is no combined verify/check-all command. Run `bun run lint && bun run type-check && bun run test` manually before committing.
- **Helmet mock in tests**: Tests mock `react-helmet-async` so that `<Helmet>` renders children directly into the DOM. This means test assertions check rendered meta tags as DOM elements, not actual `<head>` modifications.
- **SemanticInput random IDs**: `SemanticInput` generates random IDs with `Math.random()` which is not deterministic. Provide an explicit `id` prop in tests.
- **`createEnhancedFAQSchema` uses `Math.random()`**: The FAQ schema generator includes randomized `upvoteCount` values, making output non-deterministic. This is intentional for SEO variation but complicates snapshot testing.
- **Web3-specific content**: Many schema generators and presets contain hardcoded Web3 email platform content (blockchain networks, wallet types, ENS/SNS references). Consumers should provide their own `branding` config and consider overriding the preset content.
- **AIMeta props gap**: The `AIMetaProps` interface defines many optional props (blockchainNetworks, features, useCase, etc.) but the `AIMeta` component only renders three meta tags (`ai:content-type`, `ai:summary`, `ai:complexity`), ignoring most props.

## Common Tasks

### Adding a new React component
1. Create `src/components/MyComponent.tsx` with a typed `React.FC<Props>` component.
2. Export it from `src/components/index.ts`.
3. Create `src/components/MyComponent.test.tsx` using `@testing-library/react`.
4. Run `bun run test` to verify and `bun run lint` to check style.

### Adding a new utility function
1. Create or extend a file in `src/utils/`.
2. Export the function from `src/utils/index.ts`.
3. Add tests in a co-located `.test.ts` file.
4. Run `bun run type-check` to verify types.

### Adding structured data for a new page type
1. In `src/utils/advancedSEO.ts`, create a new schema generator function following the existing pattern (accept `AdvancedSEOConfig`, use `getBranding()` and `ensureArray()` helpers).
2. Optionally add a preset to `pageSEOConfigs`.
3. Export from `src/utils/index.ts` (already covered by the `export *` barrel).

### Publishing
1. Update `version` in `package.json`.
2. Run `bun run build` (or rely on `prepublishOnly`).
3. Publish: `npm publish` (scoped `@sudobility`, public access configured).

## Peer / Key Dependencies

### Peer Dependencies (consumers must install)
| Package | Version |
|---------|---------|
| `react` | `^18.0.0 \|\| ^19.0.0` |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `react-helmet-async` | `>=2.0.0` |

### Key Dev Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.1.12 | Library-mode bundler |
| `@vitejs/plugin-react` | ^5.1.0 | React JSX transform for Vite |
| `vite-plugin-dts` | ^4.5.4 | Declaration file generation during Vite build |
| `typescript` | ^5.9.3 | Type checking and declaration emit |
| `vitest` | ^3.2.4 | Test runner (Vite-native) |
| `jsdom` | ^26.1.0 | DOM environment for Vitest |
| `@testing-library/react` | ^16.3.0 | Component test rendering |
| `@testing-library/jest-dom` | ^6.9.1 | DOM assertion matchers |
| `eslint` | ^9.38.0 | Linting (flat config) |
| `@typescript-eslint/*` | ^8.44.1 | TypeScript ESLint parser and plugin |
| `prettier` | ^3.6.2 | Code formatting |
| `eslint-plugin-prettier` | ^5.5.4 | Run Prettier as ESLint rule |
| `eslint-plugin-react-hooks` | ^7.0.0 | React Hooks linting |
| `eslint-plugin-react-refresh` | ^0.4.0 | React Refresh (HMR) validation |
| `ajv` | ^8.17.1 | JSON Schema validation (dev tooling) |

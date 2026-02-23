# Improvement Plans for @sudobility/seo_lib

## Priority 1 - High Impact, Low Effort

### 1.1 Render all AIMetaProps in AIMeta component
The `AIMetaProps` interface defines 14 props but only 3 are rendered (`contentType`, `aiSummary`, `technicalComplexity`). Either render the remaining props as meta tags or remove unused props from the interface to avoid misleading consumers.

### 1.2 Add a combined `verify` or `check-all` script
Other Sudobility projects have a `bun run verify` command. Adding one to `package.json` would align with ecosystem conventions:
```json
"verify": "bun run lint && bun run type-check && bun run test"
```

### 1.3 Replace Math.random() in SemanticInput with deterministic ID generation
`SemanticInput` generates IDs via `Math.random()`, which is non-deterministic and not SSR-safe. Use a counter, `useId()` (React 18+), or accept a required `id` prop.

### 1.4 Replace Math.random() in createEnhancedFAQSchema
The FAQ schema generator uses `Math.random()` for `upvoteCount`, making output non-deterministic and untestable with snapshots. Either accept counts as parameters or remove the random values.

## Priority 2 - Medium Impact, Medium Effort

### 2.1 Decouple Web3-specific content from generic SEO utilities
`advancedSEO.ts` and `aiTrainingMetadata.ts` contain hardcoded Web3 email platform content (blockchain networks, wallet types, ENS/SNS references). Refactor to:
- Extract Web3-specific presets into a separate file (e.g., `web3-presets.ts`)
- Make the core schema generators fully generic
- Allow consumers to provide their own domain-specific content

### 2.2 Add Storybook or example app
There is no way to visually preview the semantic HTML components. Adding Storybook (or a minimal Vite example app) would improve developer experience and serve as living documentation.

### 2.3 Add test coverage reporting
The Vitest config does not include coverage configuration. Adding `@vitest/coverage-v8` with threshold enforcement would ensure quality standards:
```typescript
coverage: {
  provider: 'v8',
  thresholds: { global: { branches: 80, functions: 80, lines: 80, statements: 80 } },
}
```

### 2.4 Export SemanticSectionProps interface
`SemanticSectionProps`, `HeadingProps`, `ListProps`, `LandmarkProps`, `LoadingProps`, `FigureProps`, `ButtonProps`, and `LinkProps` are not exported. Consumers cannot type-safely extend these components without access to their prop types.

## Priority 3 - Lower Impact, Higher Effort

### 3.1 Add SSR integration tests
While `advancedSEO.ts` has an SSR-safe `getCurrentPathname()` helper, there are no actual SSR integration tests. Add tests that verify behavior when `window` is undefined (Node.js environment without jsdom).

### 3.2 Add JSON-LD schema validation in tests
Use `ajv` (already a devDependency) to validate generated JSON-LD against Schema.org schemas in test files. This ensures schema compliance as generators evolve.

### 3.3 Support additional heading levels (H5, H6)
The `SemanticHTML.tsx` only exports `H1` through `H4`. The `HeadingConfig` interface supports levels 1-6, but the `SemanticHTML` components do not include `H5` and `H6`.

### 3.4 Add React Server Components compatibility
The library imports `react-helmet-async` which requires client-side rendering. Consider adding RSC-compatible alternatives (e.g., Next.js `metadata` export pattern) or documenting the `"use client"` directive requirement.

### 3.5 Create a README.md
The project has no README.md (only CLAUDE.md). Adding a consumer-facing README would improve discoverability on npm and GitHub.

## Priority 4 - Nice to Have

### 4.1 Add `aria-current` support to Nav component
The Nav component could accept a `currentPath` prop and automatically set `aria-current="page"` on matching child links.

### 4.2 Add dark mode variant support to SemanticButton
`SemanticButton` has basic Tailwind classes but does not include dark mode variants. The heading utility (`seo-headings.ts`) already uses `dark:` prefixes.

### 4.3 Add `generateBreadcrumbSchema` utility
A Schema.org BreadcrumbList generator would complement the existing schema generators and is commonly needed for SEO.

### 4.4 Consider tree-shaking optimization
Currently the library outputs a single ES bundle. With 20+ components and many utility functions, consumers may benefit from preserving module boundaries for better tree-shaking (e.g., `preserveModules: true` in Rollup config).

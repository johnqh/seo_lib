# @sudobility/seo_lib

React component library providing SEO (Search Engine Optimization) and AEO (Answer Engine Optimization) components, structured data generators, and semantic HTML elements with ARIA accessibility.

## Installation

```bash
bun add @sudobility/seo_lib
```

### Peer Dependencies

- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0
- `react-helmet-async` >= 2.0.0

## Usage

```tsx
import { SEO, AIMeta, Main, Article, Section, Nav } from '@sudobility/seo_lib';
import { generateAdvancedSEO, createWeb3ProductSchema } from '@sudobility/seo_lib';

// SEO meta tags via react-helmet-async
<SEO title="Page Title" description="Description" canonical="/page" ogType="website" />

// AI-specific meta tags
<AIMeta contentType="documentation" summary="API docs" complexity="intermediate" />

// Semantic HTML with ARIA
<Main><Article><Section>Content</Section></Article></Main>

// Structured data generation
const seo = generateAdvancedSEO({ title, description, keywords, branding });
// Returns: { structuredData, openGraph, twitterCard, aiMetaTags, jsonLD }
```

## API

### React Components

| Component | Description |
|-----------|-------------|
| `SEO` | Full SEO: title, meta, OG, Twitter Card, JSON-LD via Helmet |
| `AIMeta` | AI-specific meta tags (content-type, summary, complexity) |
| `AITrainingEnhancer` | Wrapper for AI training content enhancement |

### Semantic HTML (20+ components)

`Main`, `Article`, `Section`, `Nav`, `Header`, `Footer`, `Aside`, `Figure`,
`H1`-`H4`, `OrderedList`, `UnorderedList`, `SemanticButton`, `SemanticLink`,
`SkipLink`, `SearchRegion`, `SemanticForm`, `SemanticInput`, `SemanticLoading`,
`ScreenReaderOnly`

### Utility Functions

| Function | Description |
|----------|-------------|
| `generateAdvancedSEO(config)` | All-in-one structured data, OG, Twitter, AI meta |
| `createWeb3ProductSchema(config)` | Schema.org SoftwareApplication |
| `createTechnicalArticleSchema(config)` | Schema.org TechnicalArticle |
| `createEnhancedFAQSchema(faqs, branding)` | Schema.org FAQPage |
| `generateAIMetadata(config)` | LearningResource schema.org object |
| `generateConceptGraph(concepts)` | Concept graph with nodes and edges |
| `createSemanticHeading(config)` | SEO-optimized heading element (h1-h6) |
| `validateHeadingStructure(headings)` | Validates heading hierarchy |

### Presets

`pageSEOConfigs` (homepage, documentation, earnPoints), `WEB3_HEADING_PATTERNS`, `WEB3_EMAIL_HEADINGS`

## Development

```bash
bun run build        # Vite library build + tsc declarations
bun run dev          # Vite watch mode
bun run test         # Run Vitest once
bun run test:watch   # Vitest watch mode
bun run lint         # ESLint
bun run type-check   # TypeScript check (note: hyphenated)
bun run format       # Prettier
```

Pre-commit:

```bash
bun run lint && bun run type-check && bun run test
```

## License

BUSL-1.1

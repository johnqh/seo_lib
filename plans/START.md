# SEO Library Migration Plan

## Overview

Create `@sudobility/seo_lib` at `./seo_lib` and move all SEO/AEO code from `mail_box_components`. This is a **breaking change** - no re-exports.

## Configuration Summary

| Setting | Value |
|---------|-------|
| Package name | `@sudobility/seo_lib` |
| react-helmet-async | Peer dependency |
| Files to move | All 8 from `mail_box_components/src/seo/` |
| Backward compat | None (breaking change) |
| Build setup | Vite + TypeScript 5.9+ + Bun + Vitest |

---

## Phase 1: Create seo_lib Package

### 1.1 Create directory structure

```
seo_lib/
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
├── .prettierrc
├── eslint.config.js
├── src/
│   ├── index.ts
│   ├── components/
│   │   ├── index.ts
│   │   ├── SEO.tsx
│   │   ├── AIMeta.tsx
│   │   ├── SemanticHTML.tsx
│   │   └── AITrainingEnhancer.tsx
│   └── utils/
│       ├── index.ts
│       ├── advancedSEO.ts
│       ├── seo-headings.ts
│       └── aiTrainingMetadata.ts
└── plans/
    └── START.md (this file)
```

### 1.2 Create package.json

```json
{
  "name": "@sudobility/seo_lib",
  "version": "0.0.1",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "react-helmet-async": ">=2.0.0"
  }
}
```

### 1.3 Copy source files

From `mail_box_components/src/seo/`:
- `SEO.tsx` → `seo_lib/src/components/SEO.tsx`
- `AIMeta.tsx` → `seo_lib/src/components/AIMeta.tsx`
- `SemanticHTML.tsx` → `seo_lib/src/components/SemanticHTML.tsx`
- `AITrainingEnhancer.tsx` → `seo_lib/src/components/AITrainingEnhancer.tsx`
- `advancedSEO.ts` → `seo_lib/src/utils/advancedSEO.ts`
- `seo-headings.ts` → `seo_lib/src/utils/seo-headings.ts`
- `aiTrainingMetadata.ts` → `seo_lib/src/utils/aiTrainingMetadata.ts`

### 1.4 Fix advancedSEO.ts browser-only API

`advancedSEO.ts` uses `location.pathname` which fails in SSR. Fix by adding parameter:

```typescript
// Before:
mainEntityOfPage: {
  '@id': `${branding.baseUrl}${location.pathname}`,
}

// After:
export const createTechnicalArticleSchema = (config: AdvancedSEOConfig, pathname?: string) => {
  const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  // ...
  mainEntityOfPage: {
    '@id': `${branding.baseUrl}${currentPath}`,
  }
}
```

---

## Phase 2: Remove SEO from mail_box_components

### 2.1 Delete directory

Delete: `mail_box_components/src/seo/` (entire directory)

### 2.2 Update mail_box_components/src/index.ts

Remove line:
```typescript
export * from './seo';
```

### 2.3 Update mail_box_components/package.json

Remove from `peerDependencies`:
```json
"react-helmet-async": ">=2.0.0",
```

Remove from `devDependencies`:
```json
"react-helmet-async": "^2.0.5",
```

Bump version to `5.0.0` (breaking change).

### 2.4 Update mail_box_components/vite.config.ts

Remove from `external` array:
```typescript
'react-helmet-async',
```

Remove from `globals`:
```typescript
'react-helmet-async': 'ReactHelmetAsync',
```

---

## Phase 3: Update Consumer Apps

### 3.1 mail_box (./mail_box)

**package.json** - Add:
```json
"@sudobility/seo_lib": "^0.0.1"
```

**Update imports in these files:**
- `src/components/SEOHead.tsx` - change `createAIMetaTags` import
- `src/pages/PointsPage.tsx` - change `AIMeta` import
- `src/pages/Web3EmailGuidePage.tsx` - change `AIMeta` import
- `src/pages/TokenPage.tsx` - change `AIMeta` import
- `src/pages/TemplatesPage.tsx` - change `AIMeta` import
- `src/pages/ConnectWalletPage.tsx` - change `AIMeta` import
- `src/pages/ManagePreferencesPage.tsx` - change `AIMeta` import

```typescript
// FROM:
import { AIMeta, createAIMetaTags } from '@sudobility/components';

// TO:
import { AIMeta, createAIMetaTags } from '@sudobility/seo_lib';
```

### 3.2 mail_box_wallet_landing (./mail_box_wallet_landing)

**package.json** - Add:
```json
"@sudobility/seo_lib": "^0.0.1"
```

Has local `SEOHead.tsx` - optionally migrate to library.

### 3.3 shapeshyft_app (~/shapeshyft/shapeshyft_app)

Has local `src/components/seo/SEO.tsx` with i18n features - keep local or extend library.

**package.json** - Add (if migrating):
```json
"@sudobility/seo_lib": "^0.0.1",
"react-helmet-async": "^2.0.5"
```

### 3.4 sudojo_app (~/sudojo/sudojo_app)

No current SEO imports - no changes required.

### 3.5 whisperly_app (~/whisperly/whisperly_app)

No current SEO imports - no changes required.

### 3.6 sudobility (~/sudobility)

Has local `src/components/SEO.tsx` - keep local or migrate to library.

---

## Phase 4: Build & Publish

```bash
# 1. Build seo_lib
cd /Users/johnhuang/0xmail/seo_lib
bun install
bun run build
npm publish --access public

# 2. Rebuild mail_box_components
cd /Users/johnhuang/0xmail/mail_box_components
bun install
bun run build
npm publish

# 3. Update consumer apps
cd /Users/johnhuang/0xmail/mail_box
bun install
bun run build
```

---

## Verification

### seo_lib
```bash
cd /Users/johnhuang/0xmail/seo_lib
bun run typecheck   # No type errors
bun run lint        # No lint errors
bun run build       # Builds successfully
ls dist/            # Contains index.js, index.d.ts
```

### mail_box_components
```bash
cd /Users/johnhuang/0xmail/mail_box_components
bun run typecheck   # No type errors (no seo imports)
bun run build       # Builds without react-helmet-async
```

### mail_box
```bash
cd /Users/johnhuang/0xmail/mail_box
bun run build       # No import errors
bun run dev         # Test SEO components render correctly
```

---

## Critical Files

| File | Action |
|------|--------|
| `mail_box_components/src/seo/*` | Move to seo_lib |
| `mail_box_components/src/index.ts` | Remove seo export |
| `mail_box_components/package.json` | Remove react-helmet-async, bump to v5 |
| `mail_box_components/vite.config.ts` | Remove react-helmet-async external |
| `mail_box/src/components/SEOHead.tsx` | Update import |
| `mail_box/src/pages/*.tsx` | Update AIMeta imports |

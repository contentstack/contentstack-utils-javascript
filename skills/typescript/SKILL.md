---
name: typescript
description: TypeScript version, src layout, ESLint and Prettier, strictness, and build-time assets for @contentstack/utils
---

# TypeScript – @contentstack/utils

## When to use

- Editing or adding `.ts` under `src/` or `__test__/`.
- Changing compiler options, lint rules, or formatting scope.

## Instructions

### Tooling

- **TypeScript ~4.9** (`package.json`, `tsconfig.json`).
- **Emit:** `tsc` → `dist/lib`, declarations → `dist/types/`; **Rollup** → `dist/index.es.js` (`rollup.config.js`).
- **Strict:** `strict: true` with **`strictNullChecks: false`** — avoid unnecessary null/undefined leaks in public APIs when touching types.

### Layout

- **Library:** `src/**/*.ts` only (`tsconfig.json` `include`).
- **Tests:** `__test__/` (excluded from `tsc` `include`; Jest/ts-jest type-checks test files).
- **Public API:** single barrel — **`src/index.ts`** unless you intentionally add another entry.

### Style and lint

- Match existing naming (PascalCase types, camelCase functions; folders `Models/`, `nodes/`, `helper/`, `options/`).
- **ESLint:** `eslint.config.js` — `@typescript-eslint` recommended rules for `__test__/`; `js.configs.recommended` for other TS files.
- **Prettier:** `npm run format` covers `src/**/*.ts`; keep tests consistently formatted when you edit them.

### Build-time JSON

- **`src/assets/regions.json`:** Used by `src/endpoints.ts`; filled by **`npm run download-regions`** in `prebuild`. Listed in **`.gitignore`** — clones may need a successful build (or a local file) before tests pass.

### Logging

- No shared logger; avoid noisy `console` in library code unless consistent with nearby patterns.

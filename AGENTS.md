# Contentstack Utils JavaScript – Agent guide

**Universal entry point** for anyone automating or assisting work in this repo—AI agents (Cursor, Copilot, CLI tools), reviewers, and contributors. Conventions and detailed guidance live in **`skills/*/SKILL.md`**, not in editor-specific config, so the same instructions apply whether or not you use Cursor.

## What this repo is

- **Name:** [`@contentstack/utils`](https://www.npmjs.com/package/@contentstack/utils) — [contentstack/contentstack-utils-javascript](https://github.com/contentstack/contentstack-utils-javascript)
- **Purpose:** TypeScript/JavaScript **utilities** for Contentstack: JSON RTE / Supercharged RTE to HTML (`jsonToHTML`), embedded entry and asset rendering (`render`, `renderContent`), GraphQL helpers (`GQL`, `updateAssetURLForGQL`), Live Preview–style editable tags (`addEditableTags`), region endpoint lookup (`getContentstackEndpoint`), and variant-related helpers (`getVariantAliases`, `getVariantMetadataTags`). Used **with** the [Content Delivery API](https://www.contentstack.com/docs/developers/apis/content-delivery-api/) and delivery-shaped JSON (see root `README.md` and [`@contentstack/delivery-sdk`](https://www.npmjs.com/package/@contentstack/delivery-sdk) usage patterns).
- **Out of scope:** This package does **not** ship HTTP clients, stack credentials, or the full CDA/CMA SDK surface. Apps fetch content with the Delivery SDK or other clients, then pass entry JSON into these helpers. Runtime API calls are **not** part of the library; `regions.json` for endpoint lookup is a **build-time** asset.

## Tech stack (at a glance)

| Area | Details |
|------|---------|
| Language | TypeScript **4.9** (`tsconfig.json`: `strict: true`, `strictNullChecks: false`) |
| Build | `tsc` → `dist/lib` + declarations in `dist/types/`; **Rollup** → `dist/index.es.js` (`rollup.config.js`). `prebuild` runs `download-regions` for `src/assets/regions.json`. |
| Tests | **Jest 29** + **ts-jest**, **jsdom** (`jest.config.ts`). Tests under **`__test__/**/*.test.ts`**, mocks in **`__test__/mock/`**. |
| Lint / coverage | **ESLint 9** flat config (`eslint.config.js`); **Prettier 3** (`npm run format`). Coverage under `reports/coverage/` when running `npm test`. |
| Runtime | No HTTP client dependency; pure transforms + bundled `regions.json` for endpoints. |

## Commands (quick reference)

```bash
npm run build && npm test
npx eslint src __test__
npm run format
npm run download-regions   # regions.json only (also run as part of prebuild)
```

`npm test` runs **`pretest` → `npm run build`**, then Jest with coverage; outputs under **`reports/`**. Use **`npm run test:debug`** for Jest watch mode (`--runInBand`).

**CI:** `.github/workflows/ci.yml` (unit tests / coverage on `development`, `master`). Publish: `.github/workflows/npm-publish.yml` (GitHub **Release** created for tag `v*`; draft releases are skipped). Back-merge automation: `.github/workflows/back-merge-pr.yml`.

Install: `npm i @contentstack/utils` — see root **`README.md`** and **`package.json`** for the current version.

## Where the real documentation lives: skills

Read these **`SKILL.md` files** for full conventions—**this is the source of truth** for implementation and review:

| Skill | Path | What it covers |
|-------|------|----------------|
| **Development workflow** | [`skills/dev-workflow/SKILL.md`](skills/dev-workflow/SKILL.md) | Branches, CI, build/test/lint, Husky (Snyk/Talisman, commitlint), PR expectations, releases |
| **TypeScript (layout & tooling)** | [`skills/typescript/SKILL.md`](skills/typescript/SKILL.md) | Compiler settings, `src/` layout, ESLint/Prettier, `regions.json` / `.gitignore` |
| **Contentstack Utils (package)** | [`skills/contentstack-utils/SKILL.md`](skills/contentstack-utils/SKILL.md) | Public API and domain: exports from `src/index.ts`, RTE/embed/GQL/endpoints/Live Preview/variants—not the full CDA/CMA SDK; no network layer |
| **Testing** | [`skills/testing/SKILL.md`](skills/testing/SKILL.md) | Jest, mocks, coverage/report paths, `pretest` build, offline unit tests (no stack credentials) |
| **Code review** | [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | PR checklist (API docs, compatibility, errors, deps/SCA, tests), Blocker/Major/Minor, terminology |

There is **no** `skills/framework/` folder: this repo does not ship a shared HTTP client, retry layer, or native build system beyond npm/TypeScript/Rollup.

## Using Cursor

If you use **Cursor**, [`.cursor/rules/README.md`](.cursor/rules/README.md) only points to **`AGENTS.md`**—same source of truth as everyone else; no separate `.mdc` rule files.

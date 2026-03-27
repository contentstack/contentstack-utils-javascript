# Agent guidance — `@contentstack/utils`

## What this package is

**[@contentstack/utils](https://www.npmjs.com/package/@contentstack/utils)** (`contentstack-utils-javascript`) is a **JavaScript/TypeScript utilities library** for Contentstack. It is **not** the Content Delivery API (CDA) SDK or the Content Management API (CMA) SDK. It focuses on **JSON RTE / Supercharged RTE** rendering (`jsonToHTML`), **embedded entry and asset** rendering (`render`, `renderContent`), **GraphQL-oriented helpers** (`GQL`, `updateAssetURLForGQL`), **Live Preview–style editable tags** (`addEditableTags` / `addTags`), and **region endpoint lookup** (`getContentstackEndpoint`). Typical usage is **alongside** the Delivery SDK (see repository `README.md` examples with `@contentstack/delivery-sdk`).

- **Repository:** [github.com/contentstack/contentstack-utils-javascript](https://github.com/contentstack/contentstack-utils-javascript)

## Tech stack

| Area | Details |
|------|---------|
| Language | TypeScript **4.9** (`tsconfig.json`, `strict: true`, `strictNullChecks: false`) |
| Build | **TypeScript** (`tsc`) → `dist/lib`; **Rollup** (`rollup -c`) → `dist/index.es.js`; types in `dist/types/` |
| Test | **Jest 29** + **ts-jest**, **jsdom** environment (`jest.config.ts`) |
| Lint / format | **ESLint 9** flat config (`eslint.config.js`); **Prettier 3** (`npm run format`) — there is **no** `lint` npm script; use `npx eslint` as needed |
| Runtime HTTP / JSON for API calls | **None** in library code; `regions.json` is a **build-time** asset (see below) |

## Source layout and public API

| Role | Path |
|------|------|
| Public entry (sources) | `src/index.ts` |
| Options / render types | `src/options/` |
| RTE / node model | `src/Models/`, `src/nodes/` |
| Helpers | `src/helper/` |
| GQL + asset URL rewrite | `src/gql.ts`, `src/updateAssetURLForGQL.ts` |
| Endpoints helper | `src/endpoints.ts` + `src/assets/regions.json` (generated; see build) |
| Published bundle | `dist/` (per `package.json` `main` / `types`) |

## Common commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Cleans `dist`, ensures `src/assets/regions.json` (download or warning), runs `tsc` + Rollup |
| `npm test` | Runs `pretest` → **build**, then Jest with coverage; outputs under `reports/` |
| `npm run test:debug` | Jest watch, in-band |
| `npm run format` | Prettier on `src/**/*.ts` |
| `npm run download-regions` | Fetches `regions.json` only (used by `prebuild`) |

**Tests:** Unit tests only, under `__test__/**/*.test.ts`, with mocks in `__test__/mock/`. There are **no** live/integration tests requiring stack credentials in this repository.

## Credentials / environment

- **Unit tests:** No API keys or `.env` required.
- **Build:** `download-regions` calls a public URL (`artifacts.contentstack.com`); offline builds may warn and rely on an existing `src/assets/regions.json`. Note `regions.json` is listed in `.gitignore`; clones may need a successful `npm run build` (or manual file) before tests pass.
- **Publish:** GitHub release workflow uses `NPM_TOKEN` / `GIT_TOKEN` secrets (maintainers only).

## More detail for AI / IDE rules

- [`.cursor/rules/README.md`](.cursor/rules/README.md) — Cursor rules index (`alwaysApply`, globs, when to use).
- [`skills/README.md`](skills/README.md) — Topic skills (testing, code review, package mental model).

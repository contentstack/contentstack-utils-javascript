---
description: Branching, CI, local commands, commit hooks, and release flow for contentstack-utils-javascript
alwaysApply: false
---

# Dev workflow — `@contentstack/utils`

## Branches and PRs

- **CI** (`Unit-Test-CI`) runs on **push/PR** to `development`, `staging`, and `master` (see `.github/workflows/ci.yml`).
- **Branch protection:** A workflow fails PRs that target **`staging`** when the head branch is **not** `development` (see `.github/workflows/check-branch.yml`). Prefer **`development`** as the integration branch when contributing upstream.
- Target the branch your team uses for integration; align with maintainers if unsure.

## Local development

| Task | Command / note |
|------|----------------|
| Build | `npm run build` (runs `prebuild`: clean `dist`, `download-regions`, then `tsc` + Rollup) |
| Test | `npm test` (includes `pretest` → build; Jest + coverage; `reports/`) |
| Format | `npm run format` (Prettier: `src/**/*.ts`) |
| ESLint | No `lint` script in `package.json`; run e.g. `npx eslint src __test__` using `eslint.config.js` |

## Git hooks (Husky)

- **`commit-msg`:** [Conventional Commits](https://www.conventionalcommits.org/) via **`commitlint`** (`.commitlintrc.json`).
- **`pre-commit`:** Requires **Snyk** (`snyk test --all-projects`) and **Talisman** installed locally. Set `SKIP_HOOK=1` to bypass (documented in the hook).

## PR expectations

- **`npm test`** passes (build + unit tests).
- **CHANGELOG.md** updated for user-visible changes when maintainers expect it.
- **Dependencies:** Be mindful of Snyk/SCA workflows; security-relevant bumps should be justified.

## Releases and versioning

- **Package version** lives in **`package.json`** (also reflected in **`CHANGELOG.md`**).
- **`prepublishOnly`** runs **`npm test`** before publish.
- **NPM / GitHub Packages:** Publishing is driven by **GitHub release `created`** (`.github/workflows/npm-publish.yml`); requires maintainer secrets (`NPM_TOKEN`, `GIT_TOKEN`). Bump version and changelog in the same change set as the release your team uses.

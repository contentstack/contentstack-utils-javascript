---
name: dev-workflow
description: Branches, CI, build/test/lint commands, git hooks, PR expectations, and releases for contentstack-utils-javascript
---

# Dev workflow – @contentstack/utils

## When to use

- Choosing a base branch or opening a PR.
- Running build/tests locally or debugging CI.
- Cutting releases or bumping versions.

## Instructions

### Branches and PRs

- **CI** (`Unit-Test-CI`) runs on **push/PR** to `development` and `master` (`.github/workflows/ci.yml`).
- Feature/fix PRs should target **`development`**. Release PRs are raised directly from **`development`** to **`master`**.
- Confirm target branch with maintainers if unsure.

### Commands

| Task | Command / note |
|------|----------------|
| Build | `npm run build` — `prebuild`: clean `dist`, `download-regions`, then `tsc` + Rollup |
| Test | `npm test` — `pretest` → build, then Jest + coverage → `reports/` |
| Format | `npm run format` — Prettier on `src/**/*.ts` |
| ESLint | No `npm run lint`; use e.g. `npx eslint src __test__` (`eslint.config.js`) |

### Git hooks (Husky)

- **`commit-msg`:** [Conventional Commits](https://www.conventionalcommits.org/) via **commitlint** (`.commitlintrc.json`).
- **`pre-commit`:** **Snyk** (`snyk test --all-projects`) and **Talisman** must be available locally, or set `SKIP_HOOK=1` to bypass (see hook script).

### PR expectations

- `npm test` passes (full build + unit tests).
- **CHANGELOG.md** for user-visible changes when maintainers expect it.
- Dependency changes: consider Snyk/SCA workflows.

### Releases

- Version in **`package.json`** and **`CHANGELOG.md`**.
- **`prepublishOnly`** runs **`npm test`**.
- **npm / GitHub Packages:** `.github/workflows/npm-publish.yml` on **tag push (`v*`)**; secrets `NPM_TOKEN`, `GIT_TOKEN` (maintainers).

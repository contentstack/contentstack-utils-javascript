# Skill: Testing — `@contentstack/utils`

## When to use

Setting up locally, debugging failures, or adding tests.

## Commands

- **`npm test`** — Runs **`pretest`** (→ **`npm run build`**) then **Jest** with coverage. Builds **`dist/`** and ensures `regions.json` flow runs.
- **`npm run test:debug`** — Jest **`--watchAll`** in **`--runInBand`** mode.

## Environment

- **No API keys or `.env`** for tests—all **unit** tests with fixtures under **`__test__/mock/`**.
- First-time or clean machines: if **`src/assets/regions.json`** is missing, **`prebuild`** attempts **`download-regions`**; failures print a warning—see **`AGENTS.md`** / **package.json** `download-regions`.

## Naming and layout

- Tests live in **`__test__/**/*.test.ts`** (see **`jest.config.ts` `testMatch`**).
- Reuse **`__test__/mock/`** patterns (`entry-mock.ts`, `json-element-mock.ts`, etc.).

## Reports

- **Coverage:** `reports/coverage/`
- **HTML summary:** `reports/html/`
- **JUnit:** `reports/junit/`
- **CI** consumes junit / coverage patterns in `.github/workflows/ci.yml` and `code.cov.yml`.

## Mocks

- Prefer explicit mock objects over live fetches—this package does not ship an HTTP client; do not introduce network calls in tests unless the project later adds gated integration tests.

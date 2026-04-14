---
name: testing
description: Jest setup, test layout and mocks, coverage reports, pretest build, and no live API tests
---

# Testing – @contentstack/utils

## When to use

- Running or debugging tests, adding new tests, or understanding why `npm test` runs a build first.

## Instructions

### Framework and config

- **Jest 29** + **ts-jest** (`jest.config.ts`).
- **Environment:** `jsdom` (HTML/DOM-oriented assertions where relevant).

### Commands

| Command | Behavior |
|---------|----------|
| `npm test` | Runs **`pretest`** → **`npm run build`**, then Jest with coverage; reports under **`reports/`** |
| `npm run test:debug` | Jest `--watchAll` with `--runInBand` |

### Discovery and naming

- **Match:** `**/__test__/**/?(*.)+(spec|test).[jt]s?(x)` — this repo uses **`__test__/**/*.test.ts`**.
- **Mocks / fixtures:** **`__test__/mock/`** (e.g. `entry-mock.ts`, `json-element-mock.ts`).

### Coverage and reports

- **Coverage** from `src/**` excluding `src/index.ts` (`collectCoverageFrom` in `jest.config.ts`).
- Outputs: **`reports/coverage/`**, **`reports/html/`**, **`reports/junit/`**, **`reports/report.json`** (from the `npm test` script).

### Credentials and integration tests

- **No API keys or `.env`** for unit tests.
- **No** live/integration tests against a stack in this repository.

### Build dependency

- **`pretest` always builds** — ensure **`src/assets/regions.json`** exists or can be downloaded (`download-regions` in `prebuild`) so `endpoints` and related tests behave consistently.

### Mocks

- Prefer explicit objects over network calls—this library does not ship an HTTP client; avoid introducing network I/O in tests unless the project adds gated integration tests later.

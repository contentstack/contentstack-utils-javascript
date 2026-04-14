---
name: code-review
description: PR checklist for @contentstack/utils — public API docs, compatibility, errors, tests, terminology, Blocker/Major/Minor
---

# Code review – @contentstack/utils

## When to use

- Final pass before merge, or self-review while authoring a PR.

## Instructions

Use severity labels (**Blocker / Major / Minor**) when triaging findings.

### Public API and documentation

- **Blocker/Major:** New or changed **exports** from `src/index.ts` need accurate **JSDoc** (or clear type names) matching runtime behavior.
- **Major:** **README** / **CHANGELOG** updates when behavior is user-visible or migration is needed.

### Backward compatibility

- **Blocker:** Unplanned breaking changes to **function signatures** or **default behavior** consumed by Delivery SDK integrations or documented `renderOption` contracts.
- **Major:** Stricter throwing on inputs that previously passed (especially `getContentstackEndpoint`, RTE traversals).

### Errors

- This package uses **plain `Error`** (e.g. `endpoints.ts`); new code should keep messages actionable.
- **Major:** Silent failures where callers need to detect bad input.

### Null safety and RTE edge cases

- **Major:** Missing guards on **null/undefined** node or entry fragments (historically sensitive in `entry-editable` / RTE paths).
- **Minor:** Align with **`strictNullChecks: false`** legacy but avoid widening undefined leaks into public types.

### Dependencies and SCA

- **Major:** New runtime deps are rare—justify any addition; **`prepublishOnly`** and hooks assume **`npm test`** and Snyk-friendly trees.
- Follow org policy for **`npm audit` / Snyk**.

### Tests

- **Blocker:** Behavioral fixes or new branches without **`__test__`** coverage when risk is high (RTE nesting, GQL URL rewriting, endpoint resolution).
- **Minor:** Snapshot-only tests where a small assertion would be clearer.

### Terminology

- **Major:** Docs/comments must describe this as **utils** alongside **CDA / Delivery / JSON RTE / GraphQL**, not as **CMA** unless the change is explicitly management-related.

### Severity rubric (examples)

| Level | Examples |
|-------|-----------|
| **Blocker** | Breaks published API; removes critical-path tests; ships breaking change without semver plan |
| **Major** | Missing docs for new export; behavior change without tests; confusing errors |
| **Minor** | Naming nits; internal refactors with equivalent coverage |

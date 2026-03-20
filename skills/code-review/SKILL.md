# Skill: Code review — `@contentstack/utils`

## When to use

Final pass before merge, or when authoring a PR to self-check against team expectations.

## Checklist (expanded)

### Public API and docs

- Exported symbols from **`src/index.ts`** stay coherent: names match behavior, types match real JSON RTE / entry shapes from **delivery** content.
- **JSDoc** on public functions (`getContentstackEndpoint`, `jsonToHTML`, `render`, GQL helpers, etc.) matches parameters, throws, and return shapes.
- **README.md** examples remain valid for **`@contentstack/delivery-sdk`** + **`Contentstack.Utils`** style usage when touching those flows.

### Backward compatibility

- Avoid breaking **`RenderOption`** callback contracts or default HTML output without a major version plan and **CHANGELOG** entry.
- Changes to **`regions.json`** / endpoint keys must stay aligned with upstream region definitions.

### Errors

- Prefer clear **`Error`** messages for invalid regions, missing services, or malformed internal state—callers often log these verbatim.

### Security and dependencies

- New **npm dependencies** need justification (`package.json` is dev-heavy already).
- No secrets or tokens in code; **Talisman** pre-commit enforces secret scanning locally for contributors with hooks installed.

### Tests

- **`npm test`** must pass (includes full **build**).
- Add or update **`__test__`** cases for RTE edge cases, GQL URL rewriting, and endpoint error paths when logic changes.

### Severity rubric (optional)

| Level | Examples |
|-------|-----------|
| **Blocker** | Breaks published API, break consumers without semver major, removes tests on critical path |
| **Major** | Missing docs for new export, behavior change without tests, confusing error surfaces |
| **Minor** | Naming nits, internal refactors with equivalent coverage |

### Terminology

- Use **delivery / CDA / JSON RTE / GraphQL / Live Preview** context—not **CMA**—unless the work truly relates to management APIs.

# Cursor rules — `@contentstack/utils`

This folder holds project-specific rules for AI assistants working in **contentstack-utils-javascript**. For the full project overview, see **[`AGENTS.md`](../../AGENTS.md)** at the repository root.

## How rules are picked up

Each rule is a `.md`/`.mdc` file. Files with YAML frontmatter can set `description`, `globs`, and `alwaysApply`. Cursor uses these to decide when a rule is included in context.

### Referencing rules in chat

In Cursor, you can **`@`-mention** a rule file (e.g. type `@` and choose the rule from the list) to force its guidance into the conversation. The file name (without extension) is the usual handle, e.g. **`typescript`**, **`testing`**, **`code-review`**.

## Rule index

| File | `alwaysApply` | Globs | When it applies |
|------|----------------|-------|------------------|
| [`dev-workflow.md`](dev-workflow.md) | no | *(none)* | Branching, CI alignment, commits, releases, and day-to-day commands for this repo. |
| [`typescript.mdc`](typescript.mdc) | no | `src/**/*.ts`, `__test__/**/*.ts` | TypeScript version, layout, ESLint/Prettier, strictness, imports. |
| [`typescript-contentstack-utils.mdc`](typescript-contentstack-utils.mdc) | no | `src/**/*.ts` | Delivery-oriented utils only: RTE rendering, GQL helpers, endpoints JSON, Live Preview tags—**not** full CDA/CMA SDK surface. |
| [`testing.mdc`](testing.mdc) | no | `__test__/**/*.ts` | Jest, jsdom, mocks, coverage output paths, no live-test env. |
| [`code-review.mdc`](code-review.mdc) | **yes** | *(global)* | PR checklist: public API docs, compatibility, errors, dependencies, terminology (utils + delivery context). |

## Related

- **[`AGENTS.md`](../../AGENTS.md)** — Single entry point (package purpose, stack, commands).
- **[`skills/README.md`](../../skills/README.md)** — Longer-form skill docs for the same themes.

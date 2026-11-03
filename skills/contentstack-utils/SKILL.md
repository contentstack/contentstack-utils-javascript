---
name: contentstack-utils
description: Public API, delivery-oriented domain model, and where to change JSON RTE, embeds, GQL, endpoints, and Live Preview tags
---

# @contentstack/utils (package domain) – Agent guide

## When to use

- Designing or reviewing changes to exports, RTE rendering, embeddings, GraphQL helpers, region endpoints, or Live Preview tags.
- Clarifying how this package relates to CDA/CMA/Delivery SDK.

## Instructions

### What this package is

**`@contentstack/utils`** is a **utility library**, not the **CDA** or **CMA** SDK. It transforms **entry JSON** already obtained via **Content Delivery** (REST or **GraphQL**) into HTML or enriched structures. It does **not** configure stacks, tokens, or HTTP—callers fetch JSON elsewhere and pass it in.

### Public entry (sources)

| Role | Path |
|------|------|
| Exports | `src/index.ts` |
| Render options / types | `src/options/` |
| RTE nodes / document | `src/nodes/`, `src/Models/` |
| Helpers | `src/helper/` |
| JSON RTE → HTML | `src/json-to-html.ts` |
| Embedded rendering | `src/render-embedded-objects.ts` |
| GraphQL | `src/gql.ts`, `src/updateAssetURLForGQL.ts` |
| Live Preview / CSLP-style tags | `src/entry-editable.ts` |
| Region endpoints | `src/endpoints.ts` + `src/assets/regions.json` |
| Entry variants (aliases / metadata tags) | `src/variant-aliases.ts` |

**Exported symbols** (see `src/index.ts`) include: `jsonToHTML`, `render`, `renderContent`, `GQL`, `updateAssetURLForGQL`, `addEditableTags` (from `addTags` in `entry-editable`), `getContentstackEndpoint`, `getVariantAliases`, `getVariantMetadataTags`, node/mark/document types, `RenderOption`, and related models.

### Domain anchors

| Area | Where | Notes |
|------|--------|--------|
| Render callbacks | `src/options/`, `src/render-embedded-objects.ts` | `RenderOption` maps: nodes, marks, `block` / `inline`, `reference`, `display`, `default`. |
| Supercharged RTE | `src/json-to-html.ts`, `src/nodes/*`, `src/helper/*` | Nested fields via `paths` arrays (see root `README.md`). |
| Embedded types | `src/Models/embedded-object.ts`, `src/Models/json-rte-model.ts` | Align with **delivery** entry JSON shapes. |
| GraphQL | `src/gql.ts`, `src/updateAssetURLForGQL.ts` | Intended for use **after** GraphQL responses; asset URL rewriting matches response shape. |
| Live Preview | `src/entry-editable.ts` | Preserve attribute/locale behavior when changing tag generation. |
| Endpoints | `src/endpoints.ts` | `getContentstackEndpoint(region, service?, omitHttps?)` reads bundled JSON; throws plain **`Error`** with clear messages for invalid region/service. |

### Terminology

- Use **delivery / CDA / JSON RTE / GraphQL / Live Preview** in docs—not **CMA** unless the change is explicitly management-related.
- Disambiguate “SDK”: this **utils** package vs **`@contentstack/delivery-sdk`**.

### I/O model

- Mostly **synchronous** transforms; **no** retry/rate-limit layer. Do not add HTTP clients without an explicit product decision.

### Official docs

- Align behavior with Contentstack **Delivery**, **Live Preview**, and **JSON RTE** documentation; cite docs in PRs when semantics are ambiguous.

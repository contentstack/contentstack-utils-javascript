# Skill: TypeScript — `@contentstack/utils` mental model

## When to use

Onboarding, feature design, or refactors touching RTE rendering, embeddings, GQL, or endpoints.

## What this package is

**`@contentstack/utils`** is a **TypeScript utility library**, not the **CDA** or **CMA** SDK. It transforms **entry JSON** already fetched via **Content Delivery** (REST or **GraphQL**) into HTML or enriched structures.

## Where to change things

| Goal | Start here |
|------|------------|
| Supercharged RTE / JSON → HTML | `src/json-to-html.ts`, `src/nodes/`, `src/helper/` |
| Custom element / embed rendering | `src/options/`, `src/render-embedded-objects.ts` |
| GraphQL-specific RTE or assets | `src/gql.ts`, `src/updateAssetURLForGQL.ts` |
| Live Preview / `data-cslp`-style tags | `src/entry-editable.ts` |
| Region → base URL lookup | `src/endpoints.ts`, `src/assets/regions.json` (build) |
| Public surface | `src/index.ts` only |

## Data flow (conceptual)

```mermaid
flowchart LR
  subgraph external [Caller]
    Delivery[Delivery SDK or GraphQL client]
  end
  subgraph utils [@contentstack/utils]
    JSON[RTE JSON / entry object]
    HTML[HTML string or tagged entry]
  end
  Delivery --> JSON
  JSON --> HTML
```

## Conventions

- Match existing **options** patterns (`RenderOption`, path arrays for nested fields).
- Preserve **pure** transform style—no hidden network I/O.
- Terminology in comments should say **delivery / JSON RTE / GraphQL**, not **CMA**, unless you explicitly touch management concerns (unlikely in this repo).

## Docs

- **Contentstack** product docs for **Delivery**, **Live Preview**, and **Rich Text / JSON RTE** are the authority for expected JSON shapes.

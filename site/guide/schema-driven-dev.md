---
layout: guide
title: Schema-Driven Development
description: How schemas propagate through Go, TypeScript, and the API surface.
---

<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/guide/">Guide</a> <span>/</span> Schema-Driven Development</div>

# Schema-Driven Development

<p class="page-desc">
  Meshery follows schema-driven development (SDD): every API contract, Go struct, and TypeScript type
  originates from a single OpenAPI YAML definition. Change the schema and the code changes with it.
</p>

## The core idea

In most projects, the API contract exists in three places simultaneously — a Go struct, a TypeScript interface, and some informal documentation — and they drift apart over time. Meshery eliminates the drift by treating a single OpenAPI YAML file as the canonical definition and generating everything else from it.

```
schemas/constructs/v1beta1/connection/
  api.yml          ← source of truth
  connection.yaml  ← entity schema (response shape)
```

From these two files the build pipeline produces:

- **Go struct** — `models/v1beta1/connection/connection.go`
- **TypeScript type** — `typescript/generated/v1beta1/connection/`
- **RTK Query client** — `typescript/rtk/`

No hand-editing of generated files. Ever.

---

## Propagation path

```
OpenAPI YAML
     │
     ├─── oapi-codegen ──────► Go structs (models/)
     │
     ├─── openapi-typescript ─► TypeScript types (typescript/generated/)
     │
     └─── rtk-query codegen ──► RTK Query hooks (typescript/rtk/)
```

All three outputs are committed to this repository and published as packages consumed by downstream repositories (`meshery/meshery`, `layer5io/meshery-cloud`).

---

## The three layers

Every property in a schema lives at exactly one layer. Understanding the layers is the prerequisite for getting naming right.

| Layer | Convention | Who reads it |
|---|---|---|
| **Wire / JSON** | `camelCase` | API clients, RTK Query, JSON responses |
| **Database / ORM** | `snake_case` | GORM, Buffalo Pop, SQL columns |
| **Go struct field** | `PascalCase` (Go idiomatic) | Go compiler, JSON/DB tags |

The schema property name is the **wire name**. It becomes the `json:` tag verbatim. The DB column lives separately in `x-oapi-codegen-extra-tags.db`.

```yaml
# In api.yml — one property, three layers declared together
userId:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  x-oapi-codegen-extra-tags:
    json: "userId"       # wire — camelCase
    db:   "user_id"      # database column — snake_case
    yaml: "userId"
```

Generated Go:

```go
// The ORM is the sole translation boundary
UserID uuid.UUID `json:"userId" db:"user_id" yaml:"userId"`
```

---

## Dual-schema pattern

Every entity that has write operations needs two schemas:

**Entity schema** (`connection.yaml`) — the full server-side object returned in `GET` responses. Includes server-generated fields: `id`, `created_at`, `updated_at`, `deleted_at`.

**Payload schema** (`ConnectionPayload` in `api.yml`) — the client-writable subset used as the `POST`/`PUT` request body. No server-generated timestamps. `id` is optional (for upsert patterns).

> This separation means clients never have to supply fields they can't set. It also means the API surface is explicit about what is mutable.

See [Add a Construct](/guide/add-a-construct/) for the full implementation pattern.

---

## Cross-repo impact

A schema change in this repo propagates to:

| Repo | What changes |
|---|---|
| `meshery/meshery` | Go import paths, Go struct field access |
| `layer5io/meshery-cloud` | Same Go impact + UI TypeScript types |
| `layer5labs/meshery-extensions` | TypeScript types, RTK Query hooks |

This is why the build must pass (`make build`, `go test ./...`) before any PR merges. A broken schema breaks downstream compilation.

---

## Further reading

- [Add a Construct](/guide/add-a-construct/) — put this into practice
- [Naming Rules](/guide/naming-rules/) — the full casing reference
- [Build Pipeline](/guide/build-pipeline/) — what `make build` does step by step

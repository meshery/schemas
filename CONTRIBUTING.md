# <a name="contributing">Contributing to Meshery Schemas</a>

## 👋 Welcome!

Thank you for your interest in contributing to Meshery Schemas — we're thrilled to have you here! Whether you're fixing a typo, proposing a new schema, or diving deep into code generation, every contribution matters and is genuinely appreciated.

Meshery Schemas is the central repository for all schema definitions used across Meshery's components. It follows a schema-driven development model where OpenAPI schemas are used to auto-generate Go structs, TypeScript types, and API clients.

## 📚 Detailed Contributing Guidelines

For comprehensive, step-by-step instructions on schema-driven development — including how to create and modify schemas, understand the build pipeline, and follow project conventions — please visit:

### 👉 [docs.meshery.io](https://docs.meshery.io)

You'll find detailed guides covering:
- Schema structure and conventions
- Code generation workflow (`make build`)
- What to commit (and what not to)
- OpenAPI best practices for this project

## Schema Design: The Dual-Schema Pattern

The single most important rule when contributing a new entity schema:

> **The `<construct>.yaml` file is a response schema. POST/PUT bodies always use a separate `*Payload` schema.**

### Why this matters

These schemas drive Go struct generation (`oapi-codegen`) and TypeScript client generation. If the full entity schema (which has `id`, `created_at`, `updated_at` in `required`) is used as a POST request body, generated clients will incorrectly require clients to supply server-generated fields.

### Rules

1. **`<construct>.yaml`** — represents the persisted object as returned from the API:
   - Must have `additionalProperties: false`
   - Must include all server-generated fields (`id`, `created_at`, `updated_at`, `deleted_at`) in `properties`
   - Server-generated fields that are always present in responses belong in `required`

2. **`{Construct}Payload` in `api.yml`** — used as `requestBody` for `POST`/`PUT`:
   - Contains only client-settable fields
   - `id` is optional (with `json:"id,omitempty"`) for upsert patterns, or absent for create-only
   - Never includes `created_at`, `updated_at`, `deleted_at`

3. **`POST`/`PUT` operations** must reference `{Construct}Payload` — never the full entity schema

4. **`GET` responses** reference the full entity schema

### Reference implementations

- `schemas/constructs/v1beta1/connection/` — `Connection` + `ConnectionPayload`
- `schemas/constructs/v1beta1/key/` — `Key` + `KeyPayload`
- `schemas/constructs/v1beta1/team/` — `team.yaml` + `teamPayload` / `teamUpdatePayload`
- `schemas/constructs/v1beta1/environment/` — `environment.yaml` + `environmentPayload`

See the [Schema Design Principles](./README.md#schema-design-principles-the-dual-schema-pattern) section in the README for full examples and a contributor checklist.

---

## 🚀 Quick Start

```bash
make setup && npm install   # install dependencies
make build                  # generate Go, TypeScript, and RTK code
npm run build               # build the TypeScript distribution
```

## 🤝 Getting Help

- [GitHub Issues](https://github.com/meshery/schemas/issues) - report bugs or request features
- [Community Slack](https://slack.meshery.io) - chat with maintainers and contributors
- [Weekly Meetings](https://meshery.io/community/calendar) - join our community calls

---

> For general Meshery contribution guidelines, see the [Meshery Contributing Guide](https://github.com/meshery/meshery/blob/master/CONTRIBUTING.md).

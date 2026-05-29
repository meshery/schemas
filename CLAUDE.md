# Meshery Schemas — Coding Agent Instructions

This is the central schema repository for the Meshery platform. Schemas here drive Go struct generation, TypeScript type generation, and RTK Query client generation. Mistakes in schema design propagate into generated code across multiple downstream repos (meshery/meshery, layer5io/meshery-cloud).

> **This file is a routing and policy overview.** The critical rules — the
> dual-schema pattern, naming, and generated-artifact warnings — live inline
> below. Long-form reference material lives in `docs/` and is linked from the
> [Detailed references](#detailed-references) section. Keep this file concise:
> Claude Code warns when it exceeds 40k characters.

## Source of Truth

The source of truth for a construct's API contract depends on where it is in the migration lifecycle:

1. **Pre-migration** — While a construct is being migrated from a downstream repository (e.g., `layer5io/meshery-cloud`) into meshery/schemas, the downstream implementation is the reference for field discovery: field names, types, JSON tags, and database column mappings.
2. **Post-migration** — Once a construct has been fully migrated and its schema is defined here, **meshery/schemas becomes the permanent, authoritative source of truth.** Downstream repositories must conform to the contract defined here, not the reverse.

For constructs that have been migrated:

- When a downstream repository's implementation diverges from the schema contract defined here, **this repository is correct** and the downstream code must be updated.
- When cross-construct consistency requires a change that conflicts with current downstream implementation, make the breaking change here and open issues in affected repositories documenting the required migration.
- Do not weaken schema contracts, skip validation rules, or introduce inconsistent patterns to accommodate legacy downstream code.

## Build

```bash
make build       # generate Go structs + TypeScript types + RTK clients
make validate-schemas  # run repository schema validation rules
npm run build    # build TypeScript distribution (dist/)
```

Generated artifacts (`models/`, `typescript/generated/`) are committed by automation on `master`. The TypeScript distribution in `dist/` is produced by the npm build/publish workflow and is not committed to this repo. Do not edit generated artifacts by hand, and do not manually commit regenerated output in normal PRs unless the change explicitly requires it.

**Never hand-edit generated output:**

- ❌ Generated Go code in `models/`
- ❌ Generated TypeScript in `typescript/generated/`
- ❌ Built files in `dist/`

Always run `make build`, `go test ./...`, and `npm run build` before committing schema changes. See [Common Mistakes](docs/schema-review-checklist.md#common-mistakes-to-avoid) and the [Checklist for Schema Changes](docs/schema-review-checklist.md#checklist-for-schema-changes) for the full pre-PR list.

## The Dual-Schema Pattern (REQUIRED)

This is the most critical design rule in this repo. Every agent or contributor MUST follow it.

### Rule 1: `<construct>.yaml` = response schema only

The YAML file for an entity represents the **full server-side object** as returned in API responses. It is NOT a request body schema.

**Required properties of every entity `.yaml`:**

- `additionalProperties: false` at the top level
- All server-generated fields defined in `properties`: `id`, `created_at`, `updated_at`, `deleted_at`
- Server-generated fields that are always present belong in `required`

```yaml
# CORRECT: keychain.yaml
type: object
additionalProperties: false
required:
  - id
  - name
  - owner
  - created_at
  - updated_at
properties:
  id:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  name:
    type: string
  owner:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  deleted_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/nullTime
```

### Rule 2: Every writable entity needs a `*Payload` schema in `api.yml`

For any entity that has `POST` or `PUT` operations, define a `{Construct}Payload` schema in `api.yml` that:

- Contains **only client-settable fields** — no `created_at`, `updated_at`, `deleted_at`
- Makes `id` optional with `json:"id,omitempty"` for upsert patterns
- Is the schema referenced by all `requestBody` entries for `POST`/`PUT`

```yaml
# CORRECT: in api.yml
components:
  schemas:
    KeychainPayload:
      type: object
      description: Payload for creating or updating a keychain.
      required:
        - name
      properties:
        id:
          $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
          description: Existing keychain ID for updates; omit on create.
          x-oapi-codegen-extra-tags:
            json: "id,omitempty"
        name:
          type: string
        owner:
          $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
          x-oapi-codegen-extra-tags:
            json: "owner,omitempty"
```

### Rule 3: POST/PUT requestBody MUST reference `*Payload`, never the entity schema

```yaml
# WRONG — forces clients to supply server-generated fields
post:
  requestBody:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Keychain"

# CORRECT — separate payload type for writes
post:
  requestBody:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/KeychainPayload"
```

### Canonical reference implementations

When uncertain, model new schemas on these:

- `schemas/constructs/v1beta1/connection/` — `connection.yaml` + `ConnectionPayload` in `api.yml`
- `schemas/constructs/v1beta1/key/` — `key.yaml` + `KeyPayload` in `api.yml`
- `schemas/constructs/v1beta1/team/` — `team.yaml` + `teamPayload`/`teamUpdatePayload` in `api.yml`
- `schemas/constructs/v1beta1/environment/` — `environment.yaml` + `environmentPayload` in `api.yml`

## Checklist for new entity schemas

Before opening a PR, verify:

- [ ] `<construct>.yaml` has `additionalProperties: false`
- [ ] `<construct>.yaml` lists all server-generated fields in `properties` and appropriate ones in `required`
- [ ] `api.yml` defines `{Construct}Payload` with only client-settable fields
- [ ] All `POST`/`PUT` `requestBody` entries reference `{Construct}Payload`
- [ ] `GET` responses reference the full `{Construct}` entity schema

## Naming conventions

> **Casing is the single most error-prone area.** The full authority — the
> per-layer casing table and its compatibility caveats — lives in
> [`docs/casing-rules.md`](docs/casing-rules.md). The reader-friendly
> cross-repo directory (26-row before/after table) is in
> [`docs/identifier-naming-contributor-guide.md`](docs/identifier-naming-contributor-guide.md).

**The contract in one sentence:** *Wire is camelCase everywhere; DB is snake_case; Go fields follow Go idiom; the ORM layer is the sole translation boundary.*

- Property names: for **newly authored API versions**, use **camelCase on the wire, uniformly.** New schema properties and their JSON tags use `camelCase`. For DB-backed fields, the `x-oapi-codegen-extra-tags.db` tag carries the snake_case DB column name separately from the wire identifier. For an already-published API version that publishes `snake_case` on the wire, additions to that same version must preserve the version's published wire casing until the resource is version-bumped; do not perform partial casing migrations within a version.
- ID-suffix fields: `lowerCamelCase` + `Id` (`modelId`, `registrantId`)
- New enum values: lowercase words (`enabled`, `ignored`, `duplicate`); preserve published enum literals as-is within the same API version
- Object names: singular nouns (`model`, `component`, `design`)
- `components/schemas` names: PascalCase nouns (`Model`, `Component`, `KeychainPayload`)
- Files/folders: lowercase (`api.yml`, `keychain.yaml`, `templates/keychain_template.json`)
- Endpoint paths: `/api` prefix, kebab-case, plural nouns (`/api/workspaces`, `/api/environments`)
- Path params: camelCase with `Id` suffix (`{subscriptionId}`, `{connectionId}`, `{orgId}` — NOT `{orgID}`, NOT `{org_id}`)
- `operationId`: lower camelCase verbNoun (`createKeychain`, `updateEnvironment` — NOT `CreateKeychain`, NOT `UpdateEnvironment`)

**Partial casing migrations are forbidden.** Do not recase selected fields within a published API version. If the wire format must change, introduce a new API version and migrate the resource consistently there. See [`docs/casing-rules.md`](docs/casing-rules.md).

## File structure for a construct

```shell
schemas/constructs/v1beta1/<construct>/
  api.yml                          # OpenAPI spec: endpoints + all schema definitions
  <construct>.yaml                 # Entity (response) schema
  templates/
    <construct>_template.json      # Example instance
    <construct>_template.yaml
  forms/                           # (optional) RJSF form schemas
    <action>.json                  # RJSF JSON Schema (source of truth)
    <action>.ui.json               # RJSF UI Schema (presentation hints)
```

Auto-generated Go structs live in `models/<version>/<construct>/<construct>.go` (**do not edit**); manual helpers in `<construct>_helper.go` (SQL driver, `Entity` interface, `TableName()`). See [Go helper files](docs/schema-authoring-reference.md#go-helper-files).

## x-internal annotation

**Required on every operation.** The bundler and validate-schemas Rule 14 reject operations that omit it:

- `x-internal: ["cloud"]` — cloud-only (`_openapi_build/cloud_openapi.yml`)
- `x-internal: ["meshery"]` — Meshery-only (`_openapi_build/meshery_openapi.yml`)
- `x-internal: ["cloud", "meshery"]` — both bundled outputs

## Detailed references

Long-form reference material has been moved to `docs/` to keep this file concise. Consult these when you need the full detail:

- **[`docs/casing-rules.md`](docs/casing-rules.md)** — the authoritative per-layer casing table (DB / Go / wire / URL / operationId / TS) and its compatibility caveats.
- **[`docs/identifier-naming-contributor-guide.md`](docs/identifier-naming-contributor-guide.md)** — reader-friendly cross-repo naming directory with before/after examples.
- **[`docs/http-api-design.md`](docs/http-api-design.md)** — HTTP method semantics, response codes, bulk-delete-via-POST, resource grouping, path structure.
- **[`docs/schema-authoring-reference.md`](docs/schema-authoring-reference.md)** — per-property validation rules (37–42), `x-id-format: external`, RJSF form schemas + enforcement tests, Go helper files, `x-internal`, SQL driver (`Scan`/`Value`) rules.
- **[`docs/schema-review-checklist.md`](docs/schema-review-checklist.md)** — intentional design decisions (do not flag), the 26 common mistakes, and the full pre-PR schema-change checklist.
- **[`docs/schema-tooling.md`](docs/schema-tooling.md)** — identifier-naming migration status, advisory baseline, consumer audit tooling and CI behavior.

## Questions?

If you're unsure about any schema modification:

1. Check existing schemas for patterns (e.g., `environment.yaml`, `connection.yaml`)
2. Look at `schemas/constructs/v1alpha1/core/api.yml` for available core schema definitions
3. Examine any construct's `api.yml` to see how subschemas are referenced and endpoints are defined
4. Check generated `.d.ts` files for actual type/property names
5. Review this document and the linked `docs/` references for guidelines
6. Test your changes with `make build` before committing

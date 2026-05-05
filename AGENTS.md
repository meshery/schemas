# Meshery Schemas — Coding Agent Instructions

This is the central schema repository for the Meshery platform. Schemas here drive Go struct generation, TypeScript type generation, and RTK Query client generation. Mistakes in schema design propagate into generated code across multiple downstream repos (meshery/meshery, layer5io/meshery-cloud).

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

> Canonical naming contract — see [`docs/identifier-naming-contributor-guide.md`](docs/identifier-naming-contributor-guide.md) for the full directory (26-row table with before/after and do/don't examples). The rules below remain the inline authority; the guide is the reader-friendly cross-repo reference.

- Property names: for **newly authored API versions**, use **camelCase on the wire, uniformly.** New schema properties and their JSON tags use `camelCase`. For DB-backed fields, the `x-oapi-codegen-extra-tags.db` tag carries the snake_case DB column name separately from the wire identifier — the ORM layer is the sole translation boundary. For an already-published API version that publishes `snake_case` on the wire, additions to that same version must preserve the version's published wire casing until the resource is version-bumped; do not perform partial casing migrations within a version (see §Casing rules at a glance and the [identifier-naming migration plan](docs/identifier-naming-migration.md)).
- ID-suffix fields: `lowerCamelCase` + `Id` (`modelId`, `registrantId`)
- New enum values: lowercase words (`enabled`, `ignored`, `duplicate`); preserve published enum literals as-is within the same API version
- Object names: singular nouns (`model`, `component`, `design`)
- `components/schemas` names: PascalCase nouns (`Model`, `Component`, `KeychainPayload`)
- Files/folders: lowercase (`api.yml`, `keychain.yaml`, `templates/keychain_template.json`)
- Endpoint paths: `/api` prefix, kebab-case, plural nouns (`/api/workspaces`, `/api/environments`)
- Path params: camelCase with `Id` suffix (`{subscriptionId}`, `{connectionId}`, `{orgId}` — NOT `{orgID}`, NOT `{org_id}`)
- `operationId`: lower camelCase verbNoun (`createKeychain`, `updateEnvironment` — NOT `CreateKeychain`, NOT `UpdateEnvironment`)

## Casing rules at a glance

> This section is the inline authority; for the reader-friendly directory, see [`docs/identifier-naming-contributor-guide.md`](docs/identifier-naming-contributor-guide.md).

Within a given API version / resource version, every element has exactly one correct casing. The table below is the single authoritative reference for **newly authored (canonical-casing) API versions.** Already-published legacy API versions retain their published wire casing until the resource receives its next canonical-casing version bump — do not recase their fields in-place.

**The one-sentence rule (target state):** *Wire is camelCase everywhere; DB is snake_case; Go fields follow Go idiom; the ORM layer is the sole translation boundary.*

| Layer / element | Casing | Example | Counter-example |
|---|---|---|---|
| DB column / `db:` tag | `snake_case` | `user_id`, `org_id`, `created_at`, `pattern_file` | ~~`userId`~~, ~~`orgID`~~ |
| Go struct field | `PascalCase` with Go-idiomatic initialisms | `UserID`, `OrgID`, `WorkspaceID`, `CreatedAt` | ~~`User_id`~~, ~~`UserIdentifier`~~ |
| JSON tag / schema property / wire form | `camelCase` (DB-backed **and** non-DB-backed alike) | `json:"userId"`, `json:"orgId"`, `json:"patternFile"`, `json:"createdAt"` | ~~`json:"user_id"`~~, ~~`json:"orgID"`~~ |
| ID-suffix properties | `camelCase + Id` (lowercase `d`) | `modelId`, `registrantId`, `userId` | ~~`modelID`~~, ~~`model_id`~~ |
| New enum values | lowercase | `enabled`, `ignored` | ~~`Enabled`~~, ~~`ENABLED`~~ |
| `components/schemas` type names | PascalCase | `ModelDefinition`, `KeychainPayload` | ~~`modelDefinition`~~ |
| File and folder names | lowercase | `api.yml`, `keychain.yaml` | ~~`Keychain.yaml`~~ |
| URL path segments | kebab-case, plural nouns | `/api/role-holders`, `/api/workspaces` | ~~`/api/roleHolders`~~ |
| URL path params + ID-like query params | `camelCase + Id` | `{orgId}`, `?userId=…`, `?workspaceId=…` | ~~`{orgID}`~~, ~~`{org_id}`~~, ~~`?workspace_id=…`~~ |
| Shared pagination/search/sort/filter query params | `camelCase` | `?page=…`, `?pageSize=…`, `?search=…`, `?order=…`, `?filter=…` | ~~`?pagesize=…`~~, ~~`?page_size=…`~~ |
| `operationId` | lower camelCase verbNoun | `getAllRoles`, `createWorkspace`, `getWorkspaces` | ~~`GetAllRoles`~~, ~~`get_all_roles`~~ |
| TypeScript property / RTK arg | camelCase | `response.userId`, `queryArg.orgId` | ~~`response.user_id`~~, ~~`queryArg.orgID`~~ |
| Go type names | PascalCase (generated) | `Connection`, `KeychainPayload` | — |
| TypeScript type names | PascalCase (generated) | `Connection`, `KeychainPayload` | — |

**The database naming is the ORM boundary, not a wire-format dictator.** In newly authored (canonical-casing) API versions, every JSON tag / schema property name — DB-backed or not — is camelCase. For legacy published API versions that publish snake_case on the wire, retain the published wire casing until that resource receives its next API-version bump; do not "fix" snake_case wire properties in-place. In canonical-casing versions, when a property is DB-backed, the snake_case DB column name lives *only* in `x-oapi-codegen-extra-tags.db` (and in the generated Go field's `db:` struct tag); it does not propagate to the JSON tag, the OpenAPI schema property name, URL parameters, or any other wire form. On DB-backed fields the `json:` and `db:` tags differ by design.

**Partial casing migrations are forbidden.** Do not rename selected fields within the same resource from snake_case to camelCase while leaving other published fields unchanged. If the wire format must change, introduce a new API version and migrate the resource consistently there. See the [identifier-naming migration plan](docs/identifier-naming-migration.md) for the per-resource rollout.

**Existing enum wire values are compatibility-sensitive.** Use lowercase for newly introduced enum literals, but do not recase published enum values in-place within the same API version. The validator exempts legacy enum values that already exist on the baseline branch.

**Pagination envelope fields (`page`, `page_size`, `total_count`) are on a deprecation path, not a perpetual exception.** Current forms remain accepted for backward compatibility within an existing API version; each resource migrates to `pageSize` / `totalCount` at its next canonical-casing API-version bump (per the Phase 3 per-resource plan). On a freshly authored API version, use camelCase directly. The field `page` stays `page` under the canonical contract (it's already a camelCase-compatible single-word identifier).

**`pageSize` / `page_size` properties must have `minimum: 1`.** A page size of zero is never valid. The validator enforces this (Rule 41) on all properties named `page_size`, `pagesize`, or `pageSize`.

## Per-Property Validation Constraints

The schema validator (`validation/` Go package, invoked via `go run ./cmd/validate-schemas`) enforces per-property constraints as advisory rules (Rules 37–42). These do not block CI but are reported on `--warn` runs and should be resolved in new schemas.

| Rule | What it checks |
|---|---|
| 37 | Every property has a `description` |
| 38 | String properties have `minLength`, `maxLength`, `pattern`, `format`, or `const` |
| 39 | Numeric properties have `minimum`, `maximum`, or `const` |
| 40 | ID-like properties (`id`, `*_id`, `*Id`) have `format: uuid` or `$ref` to a UUID type |
| 41 | Page-size properties (`page_size`, `pagesize`, `pageSize`) have `minimum: 1` |
| 42 | `format` values must be from the known OpenAPI 3.0 / JSON Schema set (e.g., `date-time`, `email`, `uri`, `uuid`) |

### `x-id-format: external` — exempting non-UUID IDs

Some ID properties hold external system identifiers (e.g., Stripe subscription IDs, coupon codes) that are not UUIDs. To exempt these from Rule 40, annotate the property with `x-id-format: external`:

```yaml
billing_id:
  type: string
  description: Billing ID from the external payment processor.
  x-id-format: external
  maxLength: 500
  pattern: '^[A-Za-z0-9_\-]+$'
```

The annotation is self-documenting: the exemption lives with the schema property where the domain knowledge is, not in a hardcoded allowlist. Use it only for properties that genuinely hold non-UUID external identifiers.

## HTTP API Design Principles

These rules govern how endpoints are structured. They are enforced in part by `make validate-schemas`.

### HTTP method semantics

| Use case | Method | Example |
|---|---|---|
| Create a resource | `POST` | `POST /api/workspaces` → 201 |
| Upsert a resource | `POST` | `POST /api/keys` → 200 |
| Update an existing resource | `PUT` or `PATCH` | `PUT /api/workspaces/{workspaceId}` → 200 |
| Non-CRUD action on a resource | `POST` to a sub-resource path | `POST /api/invitations/{invitationId}/accept` |
| Bulk delete | `POST` to a `/delete` sub-resource | `POST /api/designs/delete` → 200 |
| Single delete | `DELETE` | `DELETE /api/keys/{keyId}` → 204 |

**Do NOT use `DELETE` with a request body for bulk operations.** REST semantics do not define a request body for `DELETE`; many HTTP clients and proxies strip it silently. Use a `POST /api/{resources}/delete` sub-resource instead:

```yaml
# WRONG — DELETE with a request body
delete:
  operationId: deletePatterns
  requestBody:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatternIds'

# CORRECT — POST sub-resource for bulk delete
post:
  operationId: deletePatterns
  summary: Bulk delete patterns by ID
  requestBody:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatternIds'
  responses:
    "200":
      description: Patterns deleted
```

### HTTP response codes

| Code | Meaning | When to use |
|---|---|---|
| 200 | OK | Request succeeded; body contains the result (queries, upserts, actions) |
| 201 | Created | A new resource was created; body contains the new resource |
| 202 | Accepted | Request received; operation will complete asynchronously |
| 204 | No Content | Request succeeded; no response body (e.g., a single-resource `DELETE`) |

Use **201** (not 200) for `POST` endpoints that exclusively create a new resource. Use **200** for upsert operations where the resource may already exist.

Response descriptions and response message text must not include the word `successfully`. Use neutral wording such as `Connection deleted`, `Webhook processed`, or `Plans response`.

### Resource grouping and path structure

Endpoints are grouped into logical categories under `/api`:

| Category prefix | Domain |
|---|---|
| `/api/identity/` | Users, orgs, roles, teams, invitations |
| `/api/integrations/` | Connections, environments, credentials |
| `/api/content/` | Designs, views, components, models |
| `/api/entitlement/` | Plans, subscriptions, features |
| `/api/auth/` | Tokens, keychains, keys |

New endpoints must be placed in the appropriate category. Path segments must be kebab-case plural nouns matching the resource name.

## File structure for a construct

```shell
schemas/constructs/v1beta1/<construct>/
  api.yml                          # OpenAPI spec: endpoints + all schema definitions
  <construct>.yaml                 # Entity (response) schema
  templates/
    <construct>_template.json      # Example instance
    <construct>_template.yaml
```

## Canonical RJSF form schemas

[`@rjsf/core`](https://github.com/rjsf-team/react-jsonschema-form) form
schemas live under `typescript/forms/<version>/<construct>/`. They are
the authoritative source for every catalog-publish, design-import,
credential-create, etc. modal rendered across the Meshery UI surface
(meshery-cloud, meshery, sistent). The migration tracking issue is
[meshery/schemas#866](https://github.com/meshery/schemas/issues/866);
the rollout plan is at [`docs/form-schemas-roadmap.md`](docs/form-schemas-roadmap.md).

### Layout

```shell
typescript/forms/
  <version>/
    <construct>/
      <action>.json           # RJSF JSON Schema for the form  (source of truth)
      <action>.ui.json        # RJSF UI Schema (presentation hints)
      index.ts                # typed re-exports under canonical names
  index.ts                    # top-level barrel
  types.ts                    # local RJSFSchema / UiSchema types
```

`index.ts` re-exports each form schema under
`<Construct><Action>RjsfSchemaV<Version>` (and `…UiSchema…`), e.g.
`CatalogPublishRjsfSchemaV1Beta2`. Top-level `typescript/index.ts`
re-exports from `typescript/forms/` so consumers reach them via:

```ts
import {
  CatalogPublishRjsfSchemaV1Beta2,
  CatalogPublishRjsfUiSchemaV1Beta2,
} from "@meshery/schemas";
```

### What goes in a form schema

A form schema is a **strict subset** of the corresponding canonical
OpenAPI construct, capturing only the fields the user fills in.
Server-generated fields (`publishedVersion`, `class`, `snapshotURL`,
audit timestamps, ids, …) are intentionally absent. Presentation
hints — `x-rjsf-grid-area`, `format: textarea`, `x-encode-in-uri`,
default values — layer on top.

A form schema **must not**:
- introduce a property not present in the canonical construct;
- declare a `type` that disagrees with the canonical;
- list an enum value (top-level or in `items.enum`) that the
  canonical does not allow;
- require a field the canonical does not define.

### Enforcement

`validation/forms_test.go` (`TestFormSchemasAreSubsetOfCanonical`)
walks every entry in its case table and asserts each of the four
rules above. Add new constructs to the case table in the same PR
that introduces them. Run via `go test ./validation/...` (or
`make validate-schemas`).

A second test, `TestFormSchemasIndexExportsExist`, walks the
`typescript/forms/` tree and fails if a `*.json` file lacks a
sibling `index.ts` that imports it under the canonical name.

### Authoring checklist

When adding a new form schema:

1. Identify the canonical OpenAPI construct (e.g.
   `schemas/constructs/v1beta3/workspace/workspace.yaml`).
2. Create `typescript/forms/<version>/<construct>/<action>.json`
   with only the user-input subset of fields, plus presentation
   hints. Use the same field names, types, and enum values as the
   canonical.
3. Create `typescript/forms/<version>/<construct>/<action>.ui.json`
   for `ui:order`, `ui:widget`, etc.
4. Create or extend `typescript/forms/<version>/<construct>/index.ts`
   with typed `<Construct><Action>RjsfSchemaV<Version>` /
   `<Construct><Action>RjsfUiSchemaV<Version>` exports.
5. Re-export from `typescript/forms/index.ts` and from
   `typescript/index.ts`.
6. Add a row to the `cases` table in
   `validation/forms_test.go::TestFormSchemasAreSubsetOfCanonical`.
7. Run `go test ./validation/...` and `npm run build` locally.

## Go helper files

Auto-generated Go structs (`models/<version>/<construct>/<construct>.go`) are committed by the artifact-generation workflow on `master`. Do not edit them by hand; the manually written helpers below are the files contributors should maintain directly:

```shell
models/v1beta1/<construct>/
  <construct>.go          # Auto-generated — DO NOT edit
  <construct>_helper.go   # Manual — add SQL driver, Entity interface, TableName(), etc.
```

Always add `// This is not autogenerated.` at the top of helper files.

Use `x-generate-db-helpers: true` on a schema component to auto-generate `Scan`/`Value` SQL driver methods for types stored as JSON blobs in a single DB column. Do NOT use this for types mapped to full DB tables.

## x-internal annotation

**Required on every operation.** The bundler and validate-schemas Rule 14 reject operations that omit it. Use the annotation to declare which bundled outputs include the path:

- `x-internal: ["cloud"]` — cloud-only (`_openapi_build/cloud_openapi.yml`)
- `x-internal: ["meshery"]` — Meshery-only (`_openapi_build/meshery_openapi.yml`)
- `x-internal: ["cloud", "meshery"]` — both bundled outputs

See [The Dual-Schema Pattern](#the-dual-schema-pattern-required) above for the canonical entity/payload rules and reference examples used throughout this repo.

---

## SQL Driver (`Scan`/`Value`) Implementation Rules

When manually implementing `sql.Scanner` and `driver.Valuer` for map-like types:

### Preferred rule: serialize instead of returning SQL NULL from `Value()`

`core.Map` marshals nil maps to the JSON string `"null"` instead of SQL NULL. Prefer the same behavior for new or updated helpers unless the column is explicitly nullable and the nil-vs-empty distinction is required and documented.

```go
// CORRECT — matches core.Map pattern
func (m MapObject) Value() (driver.Value, error) {
    b, err := json.Marshal(m)
    if err != nil {
        return nil, err
    }
    return string(b), nil
}

// WRONG — writes SQL NULL, inconsistent with core.Map
func (m MapObject) Value() (driver.Value, error) {
    if m == nil {
        return nil, nil   // <- do not do this
    }
    ...
}
```

### Preferred rule: zero the receiver on nil src in `Scan()`

When `src` is nil (SQL NULL), new or updated `Scan` implementations should explicitly zero the receiver. Some legacy helpers return early, but clearing the receiver avoids stale data if the same struct is reused across rows.

```go
// CORRECT
case nil:
    *m = nil
    return nil

// WRONG — leaves stale data
case nil:
    return nil
```

---

## Intentional Design Decisions (Do Not Flag)

These patterns are deliberate. Do not suggest changes during code review:

1. **`SqlNullTime` vs `NullTime`** — Some entities use `SqlNullTime` for backward compatibility with v1beta1 and downstream GORM/Pop consumers. Do not suggest switching unless the entire entity is being migrated.
2. **Core Go package** — All core types (both generated scalars like `Uuid`, `Time`, `Id` and manual utilities like `Map`, `NullTime`, `MapObject`) live in a single package: `github.com/meshery/schemas/models/core`. Generator output path overrides and Go import overrides map all schema core versions (`v1alpha1/core`, `v1beta1/core`, `v1beta2/core`) to this single package. Schema `x-go-type-import` for any core type must use `models/core` with alias `core`.
3. **`x-enum-casing-exempt: true`** — Enums with this annotation contain published values that will never be lowercased (e.g., `PlanName`, `FeatureName`). Do not suggest lowercasing.
4. **`page_size` / `total_count` — deprecation list, not a perpetual exception.** These snake_case envelope fields remain accepted for backward compatibility within an existing API version. Each resource migrates its pagination envelope to `pageSize` / `totalCount` at its next canonical-casing API-version bump (per the [Phase 3 plan](docs/identifier-naming-migration.md)). On a newly authored API version, use camelCase directly. `page` stays `page` (already a camelCase-compatible single-word identifier).
5. **Deprecated v1beta1 constructs** — Files with `x-deprecated: true` are kept for backward compatibility. Known casing violations are fixed in the next canonical-casing version. Do not flag issues in deprecated constructs.
6. **Target-state wire form: camelCase regardless of DB backing.** Under the canonical contract, a property like `subType` is camelCase on every wire (JSON tag, OpenAPI property name, TS field) whether or not it is DB-backed. When it is DB-backed, the snake_case column name lives only in `x-oapi-codegen-extra-tags.db` (e.g., `db: "sub_type"`); the JSON tag stays `subType`. The legacy pattern of DB-backed fields using snake_case on the wire is retired per-resource across Phase 3; legacy resources that still publish `sub_type` on the wire migrate at their next API-version bump, not in-place.
7. **`x-id-format: external`** — ID properties annotated with this hold external system identifiers (e.g., Stripe IDs) that are not UUIDs. The validator skips `format: uuid` enforcement for these. Do not remove the annotation or add `format: uuid`.

## Common Mistakes to Avoid

1. ❌ Hand-editing generated Go code in `models/` directory
2. ❌ Hand-editing generated TypeScript code in `typescript/generated/` directory
3. ❌ Hand-editing built files in `dist/` directory
4. ❌ Using deprecated `core.json` references
5. ❌ Adding redundant `x-oapi-codegen-extra-tags` when using schema references
6. ❌ Forgetting to update template files in the `templates/` subdirectory with default values
7. ❌ Not testing the build process after schema changes
8. ❌ Placing template files outside the `templates/` subdirectory
9. ❌ Using `.d.ts` extension in TypeScript import paths
10. ❌ Assuming schema property names are PascalCase (check actual generated `.d.ts` files)
11. ❌ Adding `x-generate-db-helpers` on individual properties — it must be at the schema component level
12. ❌ Using `x-generate-db-helpers` on amorphous types without a fixed schema — use `x-go-type: "core.Map"` instead
13. ❌ Using the full entity schema as a `POST`/`PUT` `requestBody` — always use a separate `*Payload` schema
14. ❌ Omitting `additionalProperties: false` from entity `<construct>.yaml` files
15. ❌ Adding new `Value()` implementations that return `(nil, nil)` unless SQL NULL behavior is explicitly required and documented
16. ❌ In new `Scan()` implementations, returning without zeroing the receiver when `src` is nil
17. ❌ Using PascalCase for new `operationId` values — always lower camelCase (`getPatterns`, not `GetPatterns`)
18. ❌ Using SCREAMING\_CASE path parameters (`{orgID}`, `{roleID}`) — always camelCase with `Id` suffix (`{orgId}`, `{roleId}`)
19. ❌ Using `DELETE` with a request body for bulk operations — use `POST /api/{resources}/delete` instead
20. ❌ Returning 200 from a `POST` that exclusively creates a new resource — use 201
21. ❌ Using all-lowercase `id`/`url` suffixes in parameter names — always capitalize (`workspaceId`, not `workspaceid`; `pageUrl`, not `pageurl`)
22. ❌ Template files with wrong value types — if schema says `type: array`, use `[]` not `{}`; if `type: string`, use `""` not `{}`
23. ❌ Adding `format: uuid` to ID properties that hold external system identifiers (Stripe IDs, etc.) — use `x-id-format: external` instead
24. ❌ Setting `minimum: 0` on page-size properties — page size must be at least 1
25. ❌ Omitting `tags` from operations — every operation must have at least one tag for API documentation and client generation
26. ❌ In newly authored / canonical-casing API-version work, introducing a `json:` tag that matches the `db:` tag on a new DB-backed field — under the canonical contract wire is camel and DB is snake, so they differ by design on DB-backed fields. `db: "user_id"` pairs with `json: "userId"`, never `json: "user_id"`. Legacy published constructs may intentionally retain matching `json:` and `db:` tags for wire compatibility and should not be flagged on that basis alone.

## Checklist for Schema Changes

- [ ] Modified only schema JSON/YAML files (not generated code)
- [ ] Updated corresponding template files in `templates/` subdirectory with default values
- [ ] Used non-deprecated `v1alpha1/core/api.yml` references
- [ ] If adding new schemas, referenced them from `api.yml` (the construct index file)
- [ ] Removed redundant tags when using schema references
- [ ] If a schema type is stored as a JSON blob in a DB column AND has a dedicated schema definition, used `x-generate-db-helpers: true` at the schema component level (not per-property)
- [ ] Ran `make build` successfully
- [ ] Ran `go test ./...` successfully
- [ ] Ran `npm run build` successfully
- [ ] Verified only schema JSON/YAML files are in the commit
- [ ] If updating `typescript/index.ts`, verified import paths are correct
- [ ] (New entity) `<construct>.yaml` has `additionalProperties: false`
- [ ] (New entity) `<construct>.yaml` includes all server-generated fields in `properties` and `required`
- [ ] (New entity with writes) `api.yml` defines a `{Construct}Payload` with only client-settable fields
- [ ] (New entity with writes) All `POST`/`PUT` `requestBody` entries reference `{Construct}Payload`, not `{Construct}`
- [ ] (New SQL driver) `Value()` always marshals — never returns `(nil, nil)`
- [ ] (New SQL driver) Prefer `Scan()` implementations that set `*m = nil` when `src` is nil; some legacy drivers may still return early
- [ ] (New endpoint) `operationId` is lower camelCase verbNoun
- [ ] (New endpoint) Path parameters are camelCase with `Id` suffix (e.g., `{workspaceId}`, not `{workspaceID}`)
- [ ] (New endpoint) No `DELETE` operation has a `requestBody` — bulk deletes use `POST .../delete`
- [ ] (New `POST` for creation only) Response code is 201, not 200
- [ ] (New property) String properties have `description`, `maxLength`, and where appropriate `minLength` or `pattern`
- [ ] (New property) Numeric properties have `minimum`, `maximum`, or `const`
- [ ] (New property) ID properties have `format: uuid` (or `$ref` to UUID type), OR `x-id-format: external` if they hold non-UUID external identifiers
- [ ] (New property) Page-size properties have `minimum: 1`
- [ ] (New endpoint) Operation has at least one `tags` entry matching the construct's top-level tag definition
- [ ] (New property, canonical-casing version) JSON tag and OpenAPI schema property name are camelCase **regardless of DB backing**; when DB-backed, the snake_case column name lives only in `x-oapi-codegen-extra-tags.db` (and must differ from the `json:` tag)
- [ ] (New resource version) Pagination envelope uses `pageSize` / `totalCount` (not `page_size` / `total_count`) — the deprecated forms are accepted only within existing API versions until Phase 3 migrates each resource

## Identifier-naming migration (complete; v1beta1 retained for back-compat)

> **Identifier-naming overhaul status (2026-04-28):** Complete across `meshery/schemas` (`v1.2.6`), `meshery/meshery` (`v1.0.14`), `meshery/meshkit` (`v1.0.7`), `layer5io/sistent` (`v0.20.1`), and `layer5io/meshery-cloud` (master HEAD, rolling). **`layer5labs/meshery-extensions` is deferred** pending lift of the layer5labs billing block — see [`docs/identifier-naming-migration.md` §21](docs/identifier-naming-migration.md#21-status-as-of-2026-04-28) for the post-completion landed-PR + tagged-release inventory and the re-engagement trigger for the deferred work.

The uniform **camelCase-on-the-wire** identifier-naming migration has landed. Every resource in the §9.1 inventory of [`docs/identifier-naming-migration.md`](docs/identifier-naming-migration.md) now has a canonical-casing target-version directory; Phase 4.A was administratively closed on 2026-04-23 **without physical deletion of the deprecated directories.** The authoritative execution plan remains operative reading for historical context, and §8 of [`docs/identifier-naming-impact-report.md`](docs/identifier-naming-impact-report.md) is the canonical index of the retained legacy directories that external consumers may still pin.

**The contract in one sentence:** *Wire is camelCase everywhere; DB is snake_case; Go fields follow Go idiom; the ORM layer is the sole translation boundary.*

**Phase 4.A non-deletion policy.** The original plan (§10 Agent 4.A) called for physical deletion of each deprecated `schemas/constructs/<old-version>/<resource>/` directory after one release cycle. The maintainer has explicitly overridden that step: the three in-repo consumers (`meshery/meshery`, `layer5io/meshery-cloud`, `layer5labs/meshery-extensions`) have all migrated, but **external consumers that pin deprecated versions cannot be enumerated from the in-repo consumer graph**, and stranding them is not acceptable. Every deprecated directory therefore stays on `master` indefinitely, gated by its `info.x-deprecated: true` + `info.x-superseded-by: <new-version>` markers (the OpenAPI bundler reads those markers to exclude the legacy path from the merged spec, so path-space collisions are avoided). Any future decision to physically remove a deprecated directory is a separate maintainer action — it is not scheduled and will not be implicit in any Phase 4 follow-up.

**What this means for contributors.** Do not recase fields in-place inside a published API version — introduce a new version instead, as during the migration. Do not delete or modify `x-deprecated: true` markers on the retained legacy trees; they are the compatibility signal that documents why the directory is still present. When adding a new resource or a new version of an existing resource, follow the canonical-casing contract at §Casing rules at a glance — the validator and the doc are now aligned.

Baseline metrics and the per-resource consumer graph captured in Phase 0 live under [`validation/baseline/`](validation/baseline/) and can be regenerated with:

```bash
make baseline-field-count
make baseline-tag-divergence  MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud
make baseline-consumer-audit  MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud
make baseline-consumer-graph  MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud EXTENSIONS_REPO=../meshery-extensions
```

## Advisory baseline

`make audit-schemas` suppresses violations listed in `build/validate-schemas.advisory-baseline.txt` (one `file\tmessage` per line, `#` comments allowed). This file holds the *pre-canonical* backlog so the `advisory-audit` CI job stays green while Phases 2–3 migrate each resource. **New violations introduced after the baseline was last refreshed block CI** — the baseline is subtractive, not additive, and it is intentional that any new `json:"snake_case"` tag or missing `orgIdQuery` ref on a list endpoint fails the advisory-audit workflow.

To resolve a baselined violation, migrate the affected resource per the [Phase 3 plan](docs/identifier-naming-migration.md#9-phase-3-agents--per-resource-versioned-wire-migration) and then refresh the baseline:

```bash
make audit-schemas-style-full \
  | awk '/^  schemas\// { f=$1; next } /^    → / { sub(/^    → /, "", $0); if (f) print f "\t" $0 }' \
  | sort -u > build/validate-schemas.advisory-baseline.txt
```

Do not add new entries to the baseline by hand — every entry must correspond to a real audit finding that is deferred to a Phase 3 migration.

## Consumer audit

The consumer audit joins the schemas endpoint index against the routers and RTK Query clients of the downstream repos, producing a per-endpoint coverage and drift report. Three parsers are registered:

- **Gorilla (Go)** — `meshery/meshery`'s `server/router/server.go`.
- **Echo (Go)** — `meshery-cloud`'s `server/router/router.go` and related handler files.
- **TypeScript (RTK Query)** — `meshery/meshery/ui/rtk-query`, `meshery-cloud/ui/api` + `meshery-cloud/ui/rtk-query`, and `meshery-extensions/meshmap/src/rtk-query`.

The TS consumer is intentionally regex-based per the Phase 1.F charter; full TypeScript semantic analysis would require the TS compiler. It extracts `builder.query({url, params})` and `builder.mutation({url, params, body})` sites and flags three finding kinds:

- `case-flip` — a wire key that re-introduces SCREAMING or mixed-case identifiers the camelCase schema contract forbids (e.g. `orgID: queryArg.orgId`).
- `snake-case-wrapper` — a body wrapper keyed in snake_case (`pattern_data`, `k8s_manifest`) instead of the camelCase schema contract.
- `snake-case-param` — a params key in snake_case outside the reserved pagination envelope (`page_size`, `total_count` are exempt).

Run it against any or all downstream repos:

```bash
make consumer-audit MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud \
                    EXTENSIONS_REPO=../meshery-extensions
```

Each `*_REPO` variable is optional; consumers whose path is not provided are silently skipped. Override the TS scan path independently when the UI lives outside the Go checkout via `MESHERY_REPO_UI=` / `CLOUD_REPO_UI=`. Add `VERBOSE=1` to print the full schema-only / consumer-only lists after the summary.

The TS findings section appears below the main audit report and is grouped by repo so reviewers can focus on one downstream at a time.

### CI behavior (blocking)

The `consumer-audit` job in `.github/workflows/schema-audit.yml` runs the audit against all three downstream repos on every `pull_request` event (and on `workflow_dispatch`). Per Phase 4.B of the [identifier-naming migration plan](docs/identifier-naming-migration.md), the job is **blocking**: a non-zero exit from `make consumer-audit` fails CI and blocks the PR. The Phase 1.H advisory wrapper (`set +e` around the make target plus a trailing `exit 0`) has been removed; the Go tool's exit status propagates directly.

The Go tool (`cmd/consumer-audit/main.go`) still exits 0 on pure data divergence — it returns non-zero only on operational errors (missing repo root, bad flag combinations, failed sheet credentials, parser errors). That's intentional: Phase 4.B tightens the CI contract while keeping the tool's local-dev ergonomics unchanged. The practical effect is that divergence counts continue to flow through the PR comment, but any future regression that causes the tool itself to error (e.g., malformed schema, missing endpoint index) now halts the merge rather than being swallowed.

On each run the job:

1. Checks out `meshery/schemas` (the repo under test), then `meshery/meshery`, `layer5io/meshery-cloud`, and `layer5labs/meshery-extensions` under `./_consumer/`. The sibling checkouts use a PAT secret named `CI_CONSUMER_PAT` for private-repo access (`meshery-cloud` and `meshery-extensions` are private). Each sibling checkout has `continue-on-error: true`, so a missing PAT, insufficient scopes, or a temporary GitHub outage simply results in that column being skipped — the job still runs and posts a comment against whatever consumers *are* available. A skipped checkout does not fail the audit itself: the Go tool treats an unset `*_REPO` path as "not provided", not as an error.
2. Invokes `make consumer-audit MESHERY_REPO=_consumer/meshery CLOUD_REPO=_consumer/meshery-cloud EXTENSIONS_REPO=_consumer/meshery-extensions VERBOSE=1` and pipes the output to both `/tmp/consumer-audit.txt` and the job log via `tee`. A non-zero exit fails the step — and therefore the job.
3. Uploads the captured output as a build artifact named `consumer-audit-output` (retained for 14 days) so reviewers can download the raw per-endpoint list. This step runs on `if: always()`, so the artifact is available even when the audit step fails.
4. Posts a summary comment on the PR listing the per-repo totals (`Total Endpoints`, `Schema Backed`, `Consumer Only`) pulled from the audit report table, plus a rolled-up count of TypeScript findings by kind (`case-flip`, `snake-case-wrapper`, `snake-case-param`) and the set of repos those findings span. The comment step also runs on `if: always()` so reviewers see the divergence summary that explains why CI went red. The comment is keyed by an HTML marker and is upserted across runs so repeat pushes to the same PR update the existing comment rather than spamming new ones. Any sibling repo whose checkout failed is surfaced in a "Skipped consumer checkouts" note under the table so a zero in that column cannot be mistaken for perfect alignment.

### Provisioning `CI_CONSUMER_PAT`

The secret is **provisioned** on `meshery/schemas` and authorises all three sibling checkouts. It must be a fine-grained or classic PAT with read access to:

- `meshery/meshery` (public — read access is implicit, but including the repo in the PAT's scope list keeps all three checkouts on a single credential path)
- `layer5io/meshery-cloud` (private — PAT must be a member of the `layer5io` org with `contents: read`)
- `layer5labs/meshery-extensions` (private — PAT must be a member of the `layer5labs` org with `contents: read`)

If the secret is ever removed or becomes under-scoped, `actions/checkout@v4` receives an empty `token:` input and falls back to unauthenticated access. The public `meshery/meshery` checkout still succeeds; both private siblings will fail and — thanks to `continue-on-error: true` — be skipped cleanly. The job remains green, the comment surfaces only the public column, and the "Skipped consumer checkouts" note lists which consumers were omitted. When the PAT nears expiry it must be rotated in the repo secrets; the workflow itself needs no change.

## Questions?

If you're unsure about any schema modification:

1. Check existing schemas for patterns (e.g., `environment.yaml`, `connection.yaml`)
2. Look at `schemas/constructs/v1alpha1/core/api.yml` for available core schema definitions
3. Examine any construct's `api.yml` to see how subschemas are referenced and endpoints are defined
4. Check generated `.d.ts` files for actual type/property names
5. Review this document for guidelines
6. Test your changes with `make build` before committing

---
name: openapi-schema-best-practices
description: 'Create, audit, and maintain OpenAPI schemas in meshery/schemas following established conventions. Use this skill whenever working with OpenAPI YAML files, adding new API constructs, reviewing schema consistency, checking naming conventions, validating $ref patterns, or understanding how schemas flow through the Go and TypeScript code generators. Also trigger when the user mentions schema audits, API consistency checks, schema linting, construct definitions, or asks about the build pipeline (bundle-openapi, generate-golang, generate-typescript). If the user is creating a schema from a Golang model, prefer the create-openapi-schemas-from-golang-models skill instead.'
---

# OpenAPI Schema Best Practices

You are an expert in Meshery's Schema-Driven Development (SDD) system. Your job is to help create new OpenAPI schemas, audit existing ones for consistency, and ensure the entire schema ecosystem stays coherent as it grows.

Before doing any schema work, read `.claude/agents/code-contributor.md` and `AGENTS.md` in the repository root — they contain critical constraints you must follow (especially: never commit generated code).

## How this repository works

Meshery defines its data model as OpenAPI 3.0 YAML schemas under `schemas/constructs/`. A build pipeline then generates Go structs and TypeScript types from those schemas automatically. The schemas are the single source of truth — never hand-edit generated files.

### Build pipeline overview

```
schemas/constructs/**/*.{yaml,yml}  (you write these)
    │
    ▼
  bundle-openapi.js           (bundles + dereferences via swagger-cli)
    │
    ▼
  _openapi_build/**/*.json    (intermediate bundled JSON)
    │
    ├──▶ generate-golang.js     (reads source api.yml packages + reachable refs)
    │      └──▶ models/**/*.go  (oapi-codegen)
    ├──▶ generate-typescript.js → typescript/generated/  (openapi-typescript)
    └──▶ generate-rtk.js        → typescript/rtk/        (RTK Query hooks)
```

Note: `generate-golang.js` reads source `api.yml` files directly (not the bundled JSON), but the standard build (`make build`) still runs `bundle-openapi` first because Go generation depends on it in both the Makefile and `build/index.js`.

Understanding this pipeline matters because schema design decisions directly affect the quality of generated code. A poorly structured schema produces awkward Go structs and confusing TypeScript types.

### How code generators consume schemas

**Go generator** (`build/generate-golang.js`):
- Reads source `schemas/constructs/**/api.yml` packages directly
- Stages temporary package-local specs and rewrites reachable cross-package refs
- Generates Go structs with JSON + YAML struct tags
- Collects `x-oapi-codegen-extra-tags`, `x-go-name`, and `x-go-type` metadata across direct `$ref` and `allOf` composition
- Builds import mappings from external `$ref` targets so cross-package types resolve correctly
- Rewrites external import aliases using explicit `x-go-type-import.name` values when provided
- Derives repetitive Go helper methods from generated package/type structure instead of relying on a hand-maintained package manifest
- Uses `oapi-codegen` v2.x (pinned via `tool` directive in `go.mod`) under the hood

**TypeScript generator** (`build/generate-typescript.js`):
- Reads the same bundled JSON
- Produces TypeScript type definitions via `openapi-typescript`
- Also exports JSON schema as TypeScript const objects (`*Schema.ts`)

**RTK Query generator** (`build/generate-rtk.js`):
- Reads filtered merged specs (`cloud_openapi.yml`, `meshery_openapi.yml`)
- Generates RTK Query hooks from the `paths` defined in `api.yml` files
- Tags endpoints using `x-internal` to split between cloud and meshery APIs

### Package discovery

The build system discovers packages dynamically by walking `schemas/constructs/<version>/` and finding directories that contain an `api.yml` file. This means:
- Every new construct needs an `api.yml` to be picked up by the build
- The directory name becomes the package name (with some overrides, e.g. `design` → `pattern`)
- Some packages are excluded from merging: `v1alpha1/core` and `v1alpha1/capability`

## Directory structure for a construct

```
schemas/constructs/<version>/<construct>/
├── api.yml                          # Index file (required): aggregates subschemas + defines API paths
├── <construct>.yaml                 # Subschema: main data definitions
├── <construct>_core.yml             # Subschema: core definitions (optional)
└── templates/
    ├── <construct>_template.json    # Default-value template
    ├── <construct>_template.yaml    # YAML variant (optional)
    └── <construct>_minimal_template.json  # Minimal variant (optional)
```

The `api.yml` is the entry point. It references subschemas via `$ref` and defines REST endpoints under `paths:`. Code generators only read `api.yml` — subschemas are pulled in through references.

## Naming conventions

These conventions apply to all new additions (properties, paths, operationIds, etc.) for consistency across APIs. Some legacy and DB-mirrored fields are explicit exceptions, as noted below:

| Element | Convention | Examples |
|---------|-----------|----------|
| Non-DB-mirrored schema property names | camelCase | `schemaVersion`, `displayName`, `componentsCount` |
| Identifier fields | camelCase + "Id" suffix | `modelId`, `registrantId`, `categoryId` |
| New enum values | lowercase | `enabled`, `ignored`, `duplicate` |
| Schema component names | PascalCase | `ModelDefinition`, `ComponentDefinition` |
| File/folder names | lowercase, underscores OK | `model.yaml`, `model_core.yml`, `api.yml` |
| API paths | `/api` prefix, kebab-case, plural nouns | `/api/workspaces`, `/api/environments` |
| Path parameters | camelCase | `{subscriptionId}`, `{connectionId}` |
| operationId | lower camelCase verbNoun | `getAllRoles`, `listUsers` |
| Version strings | k8s-style | `v1alpha1`, `v1beta1` |
| schemaVersion | group/version | `models.meshery.io/v1beta1` |

Path parameters must use camelCase with the `Id` suffix — never SCREAMING\_CASE or snake\_case:

| Correct | Wrong |
|---|---|
| `{orgId}` | `{orgID}`, `{org_id}` |
| `{workspaceId}` | `{workspaceID}` |
| `{connectionId}` | `{connectionID}`, `{connection_id}` |

## Casing rules — single authoritative reference

Every element has exactly one correct casing. Use this table for all decisions:

| Element | Casing | Example | Counter-example |
|---|---|---|---|
| Schema property names (non-DB) | camelCase | `schemaVersion`, `displayName` | ~~`schema_version`~~, ~~`SchemaVersion`~~ |
| ID-suffix properties | camelCase + `Id` | `modelId`, `registrantId` | ~~`modelID`~~, ~~`model_id`~~ |
| **DB-backed / DB-mirrored fields** | **exact snake\_case db column name** | `created_at`, `updated_at`, `user_id`, `first_name`, `plan_id` | ~~`createdAt`~~, ~~`firstName`~~, ~~`planId`~~ |
| New enum values | lowercase | `enabled`, `ignored` | ~~`Enabled`~~, ~~`ENABLED`~~ |
| `components/schemas` names | PascalCase | `ModelDefinition`, `KeychainPayload` | ~~`modelDefinition`~~ |
| File and folder names | lowercase | `api.yml`, `keychain.yaml` | ~~`Keychain.yaml`~~ |
| Path segments | kebab-case plural nouns | `/api/role-holders` | ~~`/api/roleHolders`~~ |
| Path parameters | camelCase + `Id` suffix | `{orgId}`, `{workspaceId}` | ~~`{orgID}`~~, ~~`{org_id}`~~ |
| `operationId` | lower camelCase verbNoun | `getAllRoles`, `createWorkspace` | ~~`GetAllRoles`~~, ~~`get_all_roles`~~ |
| Go type names | PascalCase (generated) | `Connection`, `KeychainPayload` | — |
| TypeScript type names | PascalCase (generated) | `Connection`, `KeychainPayload` | — |

**The database naming is the compatibility boundary.** If a property has `x-oapi-codegen-extra-tags.db` and that `db` value is snake_case, then the schema property name and JSON tag must use that exact snake_case name. Do not camelize DB-backed fields in-place within an existing API version.

**Partial casing migrations are forbidden.** Do not rename selected fields within the same resource from snake_case to camelCase while leaving other published fields unchanged. If the wire format must change, introduce a new API version and migrate the resource consistently there.

**Existing enum wire values are compatibility-sensitive.** Use lowercase for newly introduced enum literals, but do not recase published enum values in-place within the same API version. The validator exempts legacy enum values that already exist on the baseline branch.

**Pagination envelopes are fixed API contract fields** — use `page`, `page_size`, and `total_count`, not `pageSize` or `totalCount`.

**Exceptions for DB-mirrored/system fields**

Some fields intentionally remain `snake_case` to mirror existing database columns and historical schemas. Common examples are `created_at`, `updated_at`, and `user_id`. Do **not** rename these to camelCase in existing schemas. These DB-mirrored/system fields are the only allowed `snake_case` properties; all other (non-DB-mirrored) property names MUST follow the camelCase rules above.

## Common schema references

The `v1alpha1/core/api.yml` file defines reusable building blocks. Always reference these instead of redefining them:

```yaml
# Timestamps — use the core refs, not inline definitions
created_at:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
  x-order: 14
updated_at:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
  x-order: 15

# UUIDs
id:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid

# Version strings
version:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/versionString

# Semver
semver:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/semverString
```

When using a `$ref` to a core schema that already defines `x-oapi-codegen-extra-tags`, do NOT add redundant tags — they're already in the core definition.

For schemas in `v1alpha3`, the relative path is shorter: `../v1alpha1/core/api.yml#/...`

## Schema design patterns

## HTTP API Design Principles

These rules govern how endpoints are structured. Violations are caught by `make validate-schemas`.

### HTTP method semantics

| Use case | Method | Example |
|---|---|---|
| Create a resource | `POST` | `POST /api/workspaces` → **201** |
| Upsert (create or update) | `POST` | `POST /api/keys` → 200 |
| Update an existing resource | `PUT` or `PATCH` | `PUT /api/workspaces/{workspaceId}` → 200 |
| Non-CRUD action | `POST` to a sub-resource | `POST /api/invitations/{invitationId}/accept` → 200 |
| Bulk delete | `POST` to a `/delete` sub-resource | `POST /api/designs/delete` → 200 |
| Single delete | `DELETE` | `DELETE /api/keys/{keyId}` → 204 |

**Critical: Never use `DELETE` with a request body.** REST semantics don't define request bodies for `DELETE`; HTTP clients and proxies may strip them silently. Bulk deletes must use `POST /api/{resources}/delete`.

```yaml
# WRONG — DELETE with a body; clients/proxies may silently strip it
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
| 200 | OK | Request succeeded; body contains result (queries, upserts, actions) |
| 201 | Created | A new resource was created; body contains the new resource |
| 202 | Accepted | Request accepted; operation completes asynchronously |
| 204 | No Content | Request succeeded; no response body (e.g., single-resource `DELETE`) |

Use 201 (not 200) when a `POST` endpoint exclusively creates a new resource.

Response descriptions and response message text must not include the word `successfully`. Use neutral wording such as `Connection deleted`, `Webhook processed`, or `Plans response`.

### Resource grouping

Endpoints are grouped into logical categories:

| Category prefix | Domain |
|---|---|
| `/api/identity/` | Users, orgs, roles, teams, invitations |
| `/api/integrations/` | Connections, environments, credentials |
| `/api/content/` | Designs, views, components, models |
| `/api/entitlement/` | Plans, subscriptions, features |
| `/api/auth/` | Tokens, keychains, keys |

New endpoints must be placed in the appropriate category. Path segments are kebab-case plural nouns.

---

### The Dual-Schema Pattern (REQUIRED for all entity schemas)

Every persisted entity MUST follow this pattern. Violating it causes generated Go structs and API clients in downstream repos (`meshery/meshery`, `layer5io/meshery-cloud`) to require clients to supply server-generated fields.

#### Rule 1 — `<construct>.yaml` is a response schema only

The YAML file is the **full server-side object** as returned in API responses. It is never a request body.

Requirements:
- `additionalProperties: false` at the top level
- All server-generated fields (`id`, `created_at`, `updated_at`, `deleted_at`) in `properties`
- Server-generated fields that are always present in responses listed in `required`

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

#### Rule 2 — Define a `{Construct}Payload` in `api.yml` for every writable entity

Every entity with `POST` or `PUT` operations needs a dedicated `{Construct}Payload` schema in `api.yml`:
- Contains only client-settable fields — never `created_at`, `updated_at`, `deleted_at`
- `id` is optional with `json:"id,omitempty"` for upsert patterns; absent entirely for create-only
- Referenced by all `requestBody` entries for `POST`/`PUT`

```yaml
# In api.yml — components/schemas
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

#### Rule 3 — `POST`/`PUT` requestBody must reference `*Payload`, not the entity schema

```yaml
# WRONG — exposes server-generated required fields to clients
post:
  requestBody:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/Keychain"

# CORRECT — payload for write, full entity for response
post:
  requestBody:
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/KeychainPayload"
  responses:
    "200":
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Keychain"
```

#### Canonical reference implementations

| Construct | Entity schema | Payload schema |
|-----------|--------------|----------------|
| connection | `connection.yaml` | `ConnectionPayload` in `api.yml` |
| key | `key.yaml` | `KeyPayload` in `api.yml` |
| team | `team.yaml` | `teamPayload` + `teamUpdatePayload` in `api.yml` |
| environment | `environment.yaml` | `environmentPayload` in `api.yml` |

Run `make validate-schemas` to catch dual-schema violations automatically.

---

### SQL Driver (`Scan`/`Value`) Rules for Manual Helper Files

When writing `sql.Scanner` / `driver.Valuer` implementations in manual `*_helper.go` files:

#### `Value()` — always serialize, never return SQL NULL

The established pattern (`core.Map`) always marshals. A nil map produces JSON `"null"` — not SQL NULL. All implementations must match this.

```go
// CORRECT — matches core.Map; nil → JSON "null", never SQL NULL
func (m MapObject) Value() (driver.Value, error) {
    b, err := json.Marshal(m)
    if err != nil {
        return nil, err
    }
    return string(b), nil
}

// WRONG — writes SQL NULL; inconsistent with core.Map
func (m MapObject) Value() (driver.Value, error) {
    if m == nil {
        return nil, nil   // ← never do this
    }
    ...
}
```

#### `Scan()` — zero the receiver when `src` is nil

```go
// CORRECT — prevents stale data when struct is reused across rows
case nil:
    *m = nil
    return nil

// WRONG — leaves stale data from previous row
case nil:
    return nil
```

Note: `x-generate-db-helpers`-generated helpers in `zz_generated.helpers.go` already follow both rules correctly. These rules apply only to **manually written** helper files.

---

### `allOf` decision rule

Use `allOf` only when one of these is true:

1. You are composing or extending an object schema with additional properties or requirements.
2. You are defining a reusable named schema component that wraps a referenced schema and the wrapper itself must carry its own description or `x-*` vendor extensions.
3. You are preserving an established generator-compatibility case where PR `#629` proved that array item refs must stay wrapped to preserve generated cross-package types. Today that exception is limited to the design schema's `components.items` and `relationships.items` entries.

Do not add a single-entry `allOf` around ordinary object properties just to reference another schema. For normal properties, keep the direct `$ref` and put `description`, `x-go-type`, `x-go-name`, and `x-oapi-codegen-extra-tags` on the property itself.

Use this direct property pattern by default:

```yaml
plan:
  $ref: "../plan/api.yml#/components/schemas/Plan"
  x-go-type: "planv1beta1.Plan"
  x-go-type-import:
    path: "github.com/meshery/schemas/models/v1beta1/plan"
    name: planv1beta1
  x-oapi-codegen-extra-tags:
    json: "plan,omitempty"
```

Use a single-entry wrapper only for reusable alias components that need local metadata:

```yaml
AcademyCurriculaBadgeId:
  allOf:
    - $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
  description: ID of the badge awarded on completion of the curricula
  x-oapi-codegen-extra-tags:
    db: "badge_id"
    json: "badge_id"
    yaml: "badge_id"
```

### Pagination response

Every list endpoint should return a paginated wrapper:

```yaml
<Construct>Page:
  type: object
  properties:
    page:
      type: integer
    data:
      type: array
      items:
        $ref: '#/components/schemas/<Construct>'
    totalCount:
      type: integer
    pageSize:
      type: integer
```

### Nullable time fields

```yaml
deletedAt:
  x-go-type: "core.NullTime"
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/deleted_at"
  x-oapi-codegen-extra-tags:
    db: "deleted_at"
```

### Cross-construct references

When referencing types from another construct, use both `$ref` and Go type hints so the generated code imports correctly:

```yaml
Invitation:
  $ref: "../invitation/api.yml#/components/schemas/Invitation"
  x-go-type: "invitationv1beta1.Invitation"
  x-go-type-import:
    path: "github.com/meshery/schemas/models/v1beta1/invitation"
    name: invitationv1beta1
```

Always set `x-go-type-import.name` when `x-go-type` uses an alias prefix. PR `#629` updated the Go generator to preserve explicit aliases, so the alias in `x-go-type` and the alias in `x-go-type-import.name` must match.

### Custom Go types for complex fields

```yaml
metadata:
  type: object
  additionalProperties: true
  x-go-type: "core.Map"
  x-go-type-skip-optional-pointer: true
  x-oapi-codegen-extra-tags:
    db: "metadata"
```

### Generated helper policy

Keep helper generation implicit whenever possible.

- `EventCategory` helpers should come from package/type conventions, not from a central handwritten package list.
- `Scan` and `Value` helpers should be inferred from generated Go structs and DB-tagged local struct usage.
- If a helper is not safely inferable, keep only that narrow exception handwritten in the package helper file and explain the exception in code or docs.
- Do not introduce new hand-maintained generator manifests for package/type-level helper behavior unless the schema and generated type information genuinely cannot express the rule.

### `x-generate-db-helpers` — explicit JSON-blob helper generation

`x-generate-db-helpers: true` is a **schema-level** OpenAPI vendor extension (declared on a named schema component, not on individual properties). It explicitly instructs the Go generator to produce `Scan()` and `Value()` SQL driver methods for that type in `zz_generated.helpers.go`.

**Use it when** both of the following are true:
1. The type has a **dedicated OpenAPI schema component** with well-defined, named properties.
2. The type is **persisted as a JSON blob in a single database column** — not in a dedicated table with one column per property.

**Do not use it** for amorphous objects with no fixed property set (e.g., a freeform `metadata` field). Those should use `x-go-type: "core.Map"` instead. Do not use it for types that correspond to a proper relational table.

```yaml
# ✅ Correct: dedicated schema, stored as a JSON blob in one DB column
Quiz:
  x-generate-db-helpers: true
  type: object
  properties:
    id:
      $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
    title:
      type: string

# ❌ Wrong: amorphous map — use x-go-type: "core.Map" instead
metadata:
  type: object
  additionalProperties: true
  x-go-type: "core.Map"
  x-go-type-skip-optional-pointer: true
  x-oapi-codegen-extra-tags:
    db: "metadata"
```

The annotation feeds into `build/lib/generated-go-helpers.js` via `collectSchemaAnnotatedDbHelperTypes()`, which merges annotated types with types already inferred from DB-tagged struct fields. The resulting `Scan`/`Value` pair enables the type to round-trip as JSON through any `database/sql`-compatible driver.

### String arrays (pq.StringArray for PostgreSQL)

```yaml
roleNames:
  type: array
  items:
    type: string
  x-go-type: "pq.StringArray"
  x-go-type-import:
    path: "github.com/lib/pq"
```

### Internal API marking

Use `x-internal` to scope endpoints to specific deployments:

```yaml
x-internal: ["cloud"]    # Cloud-only endpoint
x-internal: ["meshery"]  # Meshery OSS-only endpoint
```

The build pipeline uses these tags to produce separate merged specs (`cloud_openapi.yml` vs `meshery_openapi.yml`).

## Creating a new schema

### Step 1: Create the construct directory

```bash
mkdir -p schemas/constructs/v1beta1/<construct>/templates
```

### Step 2: Write the subschema (`<construct>.yaml`)

Map each field to its OpenAPI type. Include `x-oapi-codegen-extra-tags` for fields that need custom Go struct tags (json, yaml, db, gorm):

```yaml
type: object
properties:
  id:
    $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
    x-oapi-codegen-extra-tags:
      json: "id,omitempty"
      yaml: "id,omitempty"
      db: "id"
  name:
    type: string
    description: Human-readable name
    x-oapi-codegen-extra-tags:
      json: "name,omitempty"
      yaml: "name,omitempty"
      db: "name"
  created_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
    x-order: 14
  updated_at:
    $ref: ../../v1alpha1/core/api.yml#/components/schemas/updated_at
    x-order: 15
```

### Step 3: Write the API index (`api.yml`)

```yaml
openapi: 3.0.0
info:
  title: <Construct> API
  version: v1beta1

paths:
  /api/<constructs>:
    get:
      operationId: getAll<Constructs>
      # ... parameters, responses
    post:
      operationId: create<Construct>
      # ... requestBody, responses

components:
  schemas:
    <Construct>:
      $ref: './<construct>.yaml'
    <Construct>Page:
      # ... pagination wrapper
```

### Step 4: Create template files

Templates provide default values for programmatic creation:

```json
{
  "id": "00000000-0000-0000-0000-000000000000",
  "name": "",
  "created_at": "0001-01-01T00:00:00Z",
  "updated_at": "0001-01-01T00:00:00Z"
}
```

### Step 5: Build and verify

```bash
make build          # Bundles schemas and generates all code
go test ./...       # Run Go tests
npm run build       # Build TypeScript package
```

Only commit the schema YAML files and template files. The generated code is produced by CI.

## Auditing schemas for consistency

When reviewing or auditing schemas, check every item on this list:

### HTTP API audit

- [ ] All `operationId` values are lower camelCase verbNoun (not `GetPatterns`, not `get_patterns`)
- [ ] Path parameters are camelCase with `Id` suffix (`{workspaceId}`, not `{workspaceID}`, not `{workspace_id}`)
- [ ] No `DELETE` operation has a `requestBody` — bulk deletes use `POST .../delete`
- [ ] `POST` endpoints that exclusively create a new resource return 201, not 200
- [ ] `DELETE` endpoints with no response body return 204
- [ ] Long-running async operations return 202

### Naming audit

- [ ] All non-DB-mirrored property names are camelCase (DB-mirrored fields like `created_at`, `updated_at`, `user_id` are explicit exceptions)
- [ ] Identifier fields end with "Id" suffix (e.g., `modelId` not `model_id` or `modelID`)
- [ ] New enum values are lowercase; existing published enum values are left as-is unless you are versioning the API
- [ ] Schema component names under `components/schemas` are PascalCase
- [ ] API paths use kebab-case with plural nouns under `/api`
- [ ] Path parameters are camelCase with `Id` suffix
- [ ] `operationId` values follow lower camelCase VerbNoun pattern

### Reference audit

- [ ] No references to deprecated `core.json` — all use `v1alpha1/core/api.yml`
- [ ] Timestamps use `$ref` to core schemas (not inline type definitions)
- [ ] UUIDs use `$ref` to core `uuid` schema
- [ ] No redundant `x-oapi-codegen-extra-tags` on fields that already have them in the referenced schema
- [ ] Cross-construct refs include `x-go-type` and `x-go-type-import` for proper Go imports
- [ ] Alias-prefixed `x-go-type` values have a matching `x-go-type-import.name`

### Structure audit

- [ ] Every construct directory has an `api.yml` index file
- [ ] Subschemas are referenced from `api.yml` via `$ref`
- [ ] Template files exist in `templates/` subdirectory with sensible defaults
- [ ] `openapi: 3.0.0` version is declared (not 3.1.0 — `oapi-codegen` requires 3.0.x)
- [ ] Each construct defines `info.title` and `info.version`
- [ ] Single-entry `allOf` wrappers are limited to reusable alias schemas or documented compatibility exceptions; ordinary property refs stay direct

### Consistency across constructs

- [ ] Pagination responses follow the standard `<Construct>Page` pattern
- [ ] Similar fields across constructs use the same types (don't define `status` as string in one and enum in another without reason)
- [ ] `x-internal` tags are applied consistently for cloud vs meshery endpoints
- [ ] `x-order` values don't collide within the same schema

### Code generation readiness

- [ ] Schema will produce clean Go structs (check for ambiguous `oneOf`/`anyOf` that create unwieldy union types)
- [ ] Fields that store JSON blobs in the database use `x-go-type: "core.Map"` with `x-go-type-skip-optional-pointer: true`
- [ ] Array fields backed by PostgreSQL use `x-go-type: "pq.StringArray"` where appropriate
- [ ] Nullable database fields use proper nullable markers
- [ ] New generator behavior is inferred from schema/type conventions rather than a hand-maintained package manifest unless there is a documented exception
- [ ] Schema components that are stored as JSON blobs in a DB column AND have a dedicated schema definition carry `x-generate-db-helpers: true` at the schema level (not on individual properties)
- [ ] Amorphous JSON blob fields (no fixed schema) use `x-go-type: "core.Map"` rather than `x-generate-db-helpers`

## What NOT to do

These are the most common mistakes. If you catch yourself doing any of them, stop:

1. **Committing generated code** — files in `models/`, `typescript/generated/`, `dist/`, or `_openapi_build/` are auto-generated. Only commit schema YAML and template files.
2. **Using deprecated core.json references** — always use `v1alpha1/core/api.yml`.
3. **Defining timestamps inline** — use `$ref` to core schema timestamps.
4. **Adding redundant extra tags** — if the `$ref` target already has `x-oapi-codegen-extra-tags`, don't duplicate them.
5. **Using OpenAPI 3.1.0** — the code generators require 3.0.x.
6. **Placing templates outside `templates/`** — they belong in the `templates/` subdirectory.
7. **Using `.d.ts` extension in TypeScript imports** — use extensionless paths.
8. **Forgetting to update `typescript/index.ts`** — when adding a new construct, add the import and type export to this manually-maintained file.

## Validation commands

```bash
# Run schema design validator (enforces all naming/casing/design rules)
node build/validate-schemas.js          # fails on violations
node build/validate-schemas.js --warn   # reports only

# Lint a specific schema
npx @redocly/cli lint schemas/constructs/v1beta1/<construct>/api.yml

# Full build (validates + generates everything — validator is step 1)
make build

# Run Go tests
go test ./...

# Run TypeScript build
npm run build

# See all available make targets
make
```

### What the validator enforces

The validator (`build/validate-schemas.js`) checks 34 rules covering every naming convention, structural requirement, code-generation annotation, template accuracy, and API design principle. By default, blocking violations fail the build (exit 1). Use `--warn` to report advisories without failing (exit 0). Deprecated constructs (`x-deprecated: true`) are skipped entirely.

**Naming rules (1-11):**
- `additionalProperties: false` on entity schemas
- Server-generated fields excluded from requestBody `required`
- `operationId` lower camelCase verbNoun; `Id` not `ID`
- Path parameter camelCase with `Id` suffix
- No `DELETE` with requestBody
- Schema property names camelCase (snake_case only for DB-mirrored allowlist); `Id` not `ID`
- `components/schemas` names PascalCase
- New enum values lowercase; existing published enum values exempt
- Query/header parameter names camelCase
- Path segments kebab-case
- `x-generate-db-helpers` at schema component level only

**Structural and annotation rules (12-22):**
- `openapi: 3.0.x` required (not 3.1.0 — oapi-codegen requirement)
- `info.title` and `info.version` required in every `api.yml`
- `x-internal` must be omitted or `["cloud"]` / `["meshery"]` (lowercase, array form)
- Cross-construct `$ref` must have `x-go-type` + `x-go-type-import` for Go imports
- Alias prefix in `x-go-type` must match `x-go-type-import.name`
- `x-go-type: "core.Map"` must pair with `x-go-type-skip-optional-pointer: true`
- Template files must exist in `templates/` subdirectory
- No unnecessary single-entry `allOf` wrappers on plain property refs
- Entity `.yaml` must have both `properties` and `required` sections
- `GET` responses must not reference `*Payload` schemas
- Manual `*_helper.go` files must contain "not autogenerated" marker

**API design rules (23-30):**
- Every operation defines standard error responses (`401`, `500`; `400` for writes; `404` for parameterized paths)
- `api.yml` with operations declares `components/securitySchemes` and applies valid security requirements
- List endpoints (`GET` returning arrays/paged responses) reference standard pagination parameters (`page`, `pagesize`)
- Inline schemas with 4+ properties should be extracted to `components/schemas`
- `x-oapi-codegen-extra-tags`: `db:` values are snake_case; `json:` matches property name; no manual `yaml:` tags
- HTTP response codes match method semantics (`201` for create POST, `204` for single-resource DELETE)
- Duplicate schema structures across constructs detected (should use `$ref`)
- Success response schemas with inline array items (3+ properties) should use `$ref`

**Additional rules (31-34):**
- Response descriptions must not include the word "successfully"
- DB-backed property names must exactly match snake_case db tags (also checks `gorm: column:` tags)
- Pagination envelopes must use `page_size` and `total_count` (not `pageSize`/`totalCount`)
- Template file values must match schema property types (Rule 34: catches `{}` where schema says `string`/`array`)

**DB-mirrored allowlist**: `created_at`, `updated_at`, `deleted_at`, `user_id`, `org_id`, `organization_id`, `environment_id`, `workspace_id`, `team_id`, `design_id`, `credential_id`, `connection_id`, `system_id`, `operation_id`, `view_id`, `general_id`, `invite_id`, `content_id`, `badge_id`, `plan_id`, `access_expires_at`, `avatar_url`, `accepted_terms_at`. Only these may use snake_case.

## Related resources

- **Agent guidelines**: `.claude/agents/code-contributor.md` — detailed contributor rules
- **Repository guidelines**: `AGENTS.md` — complete checklist for schema changes
- **Existing skill**: `.github/skills/create-openapi-schemas-from-golang-models/` — specialized workflow for creating schemas from Go models in `layer5io/meshery-cloud`
- **Build scripts**: `build/` directory — the bundler and all code generators
- **Core schemas**: `schemas/constructs/v1alpha1/core/api.yml` — reusable building blocks
- **Example constructs**: `schemas/constructs/v1beta1/model/`, `schemas/constructs/v1beta1/environment/` — well-established patterns to follow

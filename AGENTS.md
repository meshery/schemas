# Meshery Schemas — Coding Agent Instructions

This is the central schema repository for the Meshery platform. Schemas here drive Go struct generation, TypeScript type generation, and RTK Query client generation. Mistakes in schema design propagate into generated code across multiple downstream repos (meshery/meshery, layer5io/meshery-cloud).

## Build

```bash
make build       # generate Go structs + TypeScript types + RTK clients
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

- Property names: preserve published wire-format casing; new non-DB properties use `camelCase`, DB-backed properties use the exact snake_case database column name
- ID-suffix fields: `lowerCamelCase` + `Id` (`modelId`, `registrantId`)
- New enum values: lowercase words (`enabled`, `ignored`, `duplicate`); preserve published enum literals as-is within the same API version
- Object names: singular nouns (`model`, `component`, `design`)
- `components/schemas` names: PascalCase nouns (`Model`, `Component`, `KeychainPayload`)
- Files/folders: lowercase (`api.yml`, `keychain.yaml`, `templates/keychain_template.json`)
- Endpoint paths: `/api` prefix, kebab-case, plural nouns (`/api/workspaces`, `/api/environments`)
- Path params: camelCase with `Id` suffix (`{subscriptionId}`, `{connectionId}`, `{orgId}` — NOT `{orgID}`, NOT `{org_id}`)
- `operationId`: lower camelCase verbNoun (`createKeychain`, `updateEnvironment` — NOT `CreateKeychain`, NOT `UpdateEnvironment`)

## Casing rules at a glance

Every element in the API has exactly one correct casing. The table below is the single authoritative reference:

| Element | Casing | Example | Counter-example |
|---|---|---|---|
| Schema property names (non-DB) | camelCase | `schemaVersion`, `displayName` | ~~`schema_version`~~, ~~`SchemaVersion`~~ |
| ID-suffix properties | camelCase + `Id` | `modelId`, `registrantId` | ~~`modelID`~~, ~~`model_id`~~ |
| DB-backed / DB-mirrored fields | exact snake_case db column name | `created_at`, `updated_at`, `user_id`, `first_name`, `plan_id` | ~~`createdAt`~~, ~~`firstName`~~, ~~`planId`~~ |
| New enum values | lowercase | `enabled`, `ignored` | ~~`Enabled`~~, ~~`ENABLED`~~ |
| `components/schemas` names | PascalCase | `ModelDefinition`, `KeychainPayload` | ~~`modelDefinition`~~ |
| File and folder names | lowercase | `api.yml`, `keychain.yaml` | ~~`Keychain.yaml`~~ |
| Path segments | kebab-case, plural nouns | `/api/role-holders` | ~~`/api/roleHolders`~~ |
| Path parameters | camelCase + `Id` | `{orgId}`, `{workspaceId}` | ~~`{orgID}`~~, ~~`{org_id}`~~ |
| `operationId` | lower camelCase verbNoun | `getAllRoles`, `createWorkspace` | ~~`GetAllRoles`~~, ~~`get_all_roles`~~ |
| Go type names | PascalCase (generated) | `Connection`, `KeychainPayload` | — |
| Go field names | PascalCase (generated) | `CreatedAt`, `UpdatedAt` | — |
| TypeScript type names | PascalCase (generated) | `Connection`, `KeychainPayload` | — |

**The database naming is the compatibility boundary.** If a property has `x-oapi-codegen-extra-tags.db` and that `db` value is snake_case, then the schema property name and JSON tag must use that exact snake_case name. Do not camelize DB-backed fields in-place within an existing API version.

**Partial casing migrations are forbidden.** Do not rename selected fields within the same resource from snake_case to camelCase while leaving other published fields unchanged. If the wire format must change, introduce a new API version and migrate the resource consistently there.

**Existing enum wire values are compatibility-sensitive.** Use lowercase for newly introduced enum literals, but do not recase published enum values in-place within the same API version. The validator exempts legacy enum values that already exist on the baseline branch.

**Pagination envelopes are fixed API contract fields** — use `page`, `page_size`, and `total_count`, not `pageSize` or `totalCount`.

**`page_size` properties must have `minimum: 1`.** A page size of zero is never valid. The validator enforces this (Rule 41) on all properties named `page_size`, `pagesize`, or `pageSize`.

## Per-Property Validation Constraints

The schema validator (`build/validate-schemas.js`) enforces per-property constraints as advisory rules (Rules 37–41). These do not block CI but are reported on `--warn` runs and should be resolved in new schemas.

| Rule | What it checks |
|---|---|
| 37 | Every property has a `description` |
| 38 | String properties have `minLength`, `maxLength`, `pattern`, `format`, or `const` |
| 39 | Numeric properties have `minimum`, `maximum`, or `const` |
| 40 | ID-like properties (`id`, `*_id`, `*Id`) have `format: uuid` or `$ref` to a UUID type |
| 41 | Page-size properties (`page_size`, `pagesize`, `pageSize`) have `minimum: 1` |

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

Control which bundled output includes an API path:

- `x-internal: ["cloud"]` — cloud-only (`_openapi_build/cloud_openapi.yml`)
- `x-internal: ["meshery"]` — Meshery-only (`_openapi_build/meshery_openapi.yml`)
- Omit `x-internal` — included in both bundled outputs

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
4. **`page_size` / `total_count`** — Pagination envelope fields use snake_case as a published API contract, not because they are database-backed. Do not suggest `pageSize`/`totalCount`.
5. **Deprecated v1beta1 constructs** — Files with `x-deprecated: true` are kept for backward compatibility. Known casing violations are fixed in v1beta2. Do not flag issues in deprecated constructs.
6. **Same field name, different casing across constructs** — A property like `subType` may be camelCase in one construct (not DB-backed) and `sub_type` in another (DB-backed with `db: "sub_type"`). Both are correct. Casing is determined per-property by whether it maps to a database column in that specific construct, not by what other constructs use.
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
23. ❌ Omitting `tags` from operations — every operation must have at least one tag for API documentation and client generation

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

## Questions?

If you're unsure about any schema modification:

1. Check existing schemas for patterns (e.g., `environment.yaml`, `connection.yaml`)
2. Look at `schemas/constructs/v1alpha1/core/api.yml` for available core schema definitions
3. Examine any construct's `api.yml` to see how subschemas are referenced and endpoints are defined
4. Check generated `.d.ts` files for actual type/property names
5. Review this document for guidelines
6. Test your changes with `make build` before committing

# Copilot Review Instructions for meshery/schemas

## Intentional Design Decisions (Do Not Flag)

The following patterns are intentional and should not be flagged as issues during code review:

### 1. `SqlNullTime` vs `NullTime`

Some entities (e.g., `Subscription.deleted_at`) use `SqlNullTime` instead of `NullTime`. This is intentional for backward compatibility with v1beta1 entities and downstream GORM/Pop consumers. Do not suggest switching to `NullTime` unless the entire entity is being migrated.

### 2. Single core Go package

All shared core types live in a single unversioned package: `github.com/meshery/schemas/models/core`. This includes both generated scalars (`Uuid`, `Time`, `Id`) and manual utility types (`Map`, `NullTime`, `MapObject`, SQL helpers). Schema `x-go-type-import` for any core type must use `models/core` with alias `core`. Do not reference `models/v1alpha1/core` — all core types are consolidated in the unversioned package.

### 3. `x-enum-casing-exempt: true`

Enum schemas annotated with `x-enum-casing-exempt: true` contain published enum values that will never be lowercased (e.g., `PlanName`: `"Free"`, `"Team Designer"`; `FeatureName`: `"ComponentsInDesign"`). Do not suggest lowercasing these values.

### 4. `page_size` and `total_count` in pagination envelopes

Pagination envelope fields use `page_size` and `total_count` (snake_case) as a published API contract. These are NOT database-backed fields — the snake_case is a deliberate exception. Do not suggest renaming to `pageSize`/`totalCount`.

### 5. Shared query parameter names `page`, `pagesize`, `search`, `order`

The shared query parameters defined in `core/api.yml` (`page`, `pagesize`, `search`, `order`, `filter`) use their current casing as a published contract. `pagesize` is intentionally all-lowercase (not `pageSize`) because it is a live wire-format parameter name referenced across all list endpoints. Do not suggest renaming.

### 6. Deprecated v1beta1 constructs

Files with `x-deprecated: true` in their `info` section are intentionally kept for backward compatibility. They contain known style/casing violations that are fixed in the v1beta2 replacement. Do not flag issues in deprecated constructs.

### 7. `deleted_at` in entity `required` lists

Some entity schemas (e.g., `AcademyCurricula`) list `deleted_at`/`deletedAt` as required. This is intentional — server-generated fields that are always present in API responses belong in `required` per AGENTS.md, even when the value is null for non-deleted resources.

### 8. Same field name, different casing across constructs

A property with the same semantic name may use different casing in different constructs, depending on whether it maps to a database column in that specific construct. For example: `Connection.sub_type` is snake_case (DB-backed with `db: "sub_type"`), while `RelationshipDefinition.subType` is camelCase (not DB-backed — no `db:` or `gorm:` tag). Both are correct. Do not flag one as inconsistent with the other.

## Schema Validation Rules

This repository enforces 34 schema validation rules via `build/validate-schemas.js`. For full details, see:
- `AGENTS.md` — casing rules, HTTP design principles, dual-schema pattern
- `specs/casing-rules.md` — definitive casing reference with ORM implications
- `build/validate-schemas.js` — rule implementations (header comments document each rule)

Key casing rules:
- DB-backed fields: exact snake_case matching the database column name
- Non-DB fields: camelCase
- Schema component names: PascalCase
- operationId: lower camelCase verbNoun
- Path segments: kebab-case
- Path parameters: camelCase with `Id` suffix

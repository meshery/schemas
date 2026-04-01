# Schema / Database Audit — Remaining Findings

Cross-reference audit performed 2026-03-31 against `meshery-cloud/database/migrations/20190402165033_create_initial_schema.postgres.up.sql`. Findings below were not fixed in PR #678 because they are either intentional design decisions, require broader migration planning, or need server-side changes first.

## Event Schema (v1beta1 + v1beta2)

**Files**: `schemas/constructs/v1beta1/event/api.yml`, `schemas/constructs/v1beta2/event/event.yaml`

- Schema includes `firstName`, `lastName`, `email`, `provider` — none are columns in `event_trackers` table
- Schema is missing 8 DB columns: `id`, `updated_at`, `deleted_at`, `acted_upon`, `operation_id`, `severity`, `status`, `metadata`
- **Why not fixed**: Event schemas are lightweight API DTOs designed for event publishing, not full entity mappings of the `event_trackers` table. The missing columns are server-internal. A full entity schema for events would be a new feature, not a bug fix.

## User Schema — Computed Field JSON Tags

**File**: `schemas/constructs/v1beta1/user/api.yml`

- `role_names` has `json: "role_names"` (snake_case) but server uses `json:"roleNames"` (camelCase)
- `teams` and `organizations` have `db:` tags but are not columns in the `users` table — they are computed/joined fields from query results
- **Why not fixed**: These are Pop/sqlx scan aliases for SQL query results, not ORM table mappings. The `db:` tags enable result scanning. Changing them would break downstream query code. The JSON tag mismatch (`role_names` vs `roleNames`) is a wire format divergence between schema-generated types and server hand-written types; reconciling requires a coordinated change across meshery-cloud.

## Category Schema — Missing Timestamps

**File**: `schemas/constructs/v1beta1/category/category.yaml`

- DB table `categories` has `created_at`, `updated_at`, `deleted_at` columns
- Schema only defines `id`, `name`, `metadata`
- **Why not fixed**: The `category.yaml` is used as a lightweight metadata schema for model components, not as a full DB entity mapping. Adding timestamps would expand the generated Go struct and affect all model/component code that embeds it. Needs coordination with downstream consumers.

## Subcategory Schema — String Enum vs Relational Table

**File**: `schemas/constructs/v1beta1/subcategory/subcategory.yaml`

- DB table `subcategories` has full relational structure: `id`, `name`, `metadata`, `category_id`, `created_at`, `updated_at`, `deleted_at`
- Schema defines subcategory as a simple string enum
- **Why not fixed**: The schema represents the subcategory concept as used in model metadata (a string label), not the relational entity. Creating a full entity schema for subcategories would be a new construct, not a bug fix.

## Cadence Enum Divergence

**Files**: `schemas/constructs/v1beta1/plan/api.yml`, `schemas/constructs/v1beta2/plan/api.yml`

- v1beta1 uses `yearly`; v1beta2 uses `annually` and adds `none`
- **Why not fixed**: This is a deliberate API version migration. v1beta1 is the published wire format; v1beta2 introduces the corrected naming. Per AGENTS.md, published enum values are not recased within the same API version.

## Organization Schema — Optional `invite_id`

**File**: `schemas/constructs/v1beta1/organization/api.yml`

- DB table has `invite_id uuid` column
- Schema includes `invite_id` as a property but not in `required`
- **Why not fixed**: `invite_id` is nullable in the DB (no NOT NULL constraint) and not always populated. Keeping it optional in the schema is correct.

## Role Schema — Timestamps Not Required

**File**: `schemas/constructs/v1beta1/role/api.yml`

- `created_at` and `updated_at` exist as properties but are not in `required`
- **Why not fixed**: Some legacy entities omit server-generated timestamps from `required`. Adding them is a tightening change that could break existing API consumers sending partial role objects. Should be migrated as part of a v1beta2 role schema.

## Top-Level Tag Definitions

Several api.yml files that already existed before this PR use operation-level tags without defining them at the document root. This PR fixed it for design, academy, and subscription. Remaining files to audit:

- `schemas/constructs/v1beta1/evaluation/api.yml` — uses `Evaluation` tag (added in this PR)
- `schemas/constructs/v1beta1/model/api.yml` — uses `Models` tag (added in this PR)
- `schemas/constructs/v1beta1/organization/api.yml` — uses `Organizations` tag (added in this PR)
- Other v1beta1 constructs may need the same treatment

**Action**: Sweep all api.yml files and ensure every file that uses operation-level tags also declares them at the document root.

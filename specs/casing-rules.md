# Meshery Schemas Casing Rules — Definitive Reference

This document is the single authoritative source for casing decisions across the Meshery schema ecosystem. It governs OpenAPI schema definitions, Go code generation (oapi-codegen), TypeScript type generation (openapi-typescript), and the two primary downstream ORM consumers: **GORM** (meshery/meshery) and **Buffalo Pop** (layer5io/meshery-cloud).

## The Core Principle

**The OpenAPI property name IS the JSON wire-format name.** Both code generators (`oapi-codegen` for Go, `openapi-typescript` for TypeScript) use the schema property name verbatim as the `json:"..."` tag value and TypeScript property name respectively. No casing transformation occurs. This means the casing decision is made once — in the schema — and propagated identically to Go, TypeScript, and all API consumers.

## The Two Authorities

Every property name in a schema is governed by exactly one of two authorities:

### Authority 1: The Database Column (snake_case)

If a field maps to a database column, the **database column name is the authority**. The schema property name, the `json` tag, the `yaml` tag, and the `db` tag must all use the exact same snake_case string as the database column.

This is because:
- **Buffalo Pop** reads `db:"column_name"` tags to map Go struct fields to database columns. The tag value must exactly match the column name.
- **GORM** reads `gorm:"column:column_name"` or falls back to converting the Go field name to snake_case. Explicit `db` tags ensure correctness.
- The `json` tag must match because the API response body is the serialized form of the same struct that was read from the database. If `json:"camelCase"` but `db:"snake_case"`, the struct field has one name over the wire and a different name in the database, creating a split identity that breaks when either consumer updates independently.

**Example — correct:**
```yaml
# Schema property name = db column name = json wire name
credential_id:
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
  x-oapi-codegen-extra-tags:
    db: credential_id
```

Generated Go:
```go
CredentialID *uuid.UUID `db:"credential_id" json:"credential_id,omitempty" yaml:"credential_id"`
```

Generated TypeScript:
```typescript
credential_id?: string;
```

### Authority 2: The API Design (camelCase)

If a field does NOT map to a database column, it follows standard API naming: **camelCase**. This includes:
- Computed/derived fields
- Payload-only fields (fields in `*Payload` schemas that don't persist directly)
- Fields with `db:"-"` or `gorm:"-"` (explicitly excluded from persistence)
- Schema-only metadata like `schemaVersion`

**Example — correct:**
```yaml
schemaVersion:
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/versionString"
```

Generated Go:
```go
SchemaVersion string `gorm:"-" db:"-" json:"schemaVersion" yaml:"schemaVersion"`
```

Generated TypeScript:
```typescript
schemaVersion: string;
```

## Complete Casing Table

| Element | Casing | Authority | Example | Counter-example |
|---|---|---|---|---|
| DB-backed schema property | `snake_case` | Database column name | `created_at`, `org_id`, `credential_id` | ~~`createdAt`~~, ~~`orgId`~~ |
| Non-DB schema property | `camelCase` | API design convention | `schemaVersion`, `displayName` | ~~`schema_version`~~, ~~`display_name`~~ |
| Pagination envelope fields | `snake_case` | Published contract | `page_size`, `total_count` | ~~`pageSize`~~, ~~`totalCount`~~ |
| `components/schemas` names | `PascalCase` | OpenAPI convention | `Connection`, `KeychainPayload` | ~~`connection`~~, ~~`keychainPayload`~~ |
| `operationId` | `lowerCamelCase` verbNoun | REST convention | `createConnection`, `getPatterns` | ~~`CreateConnection`~~, ~~`get_patterns`~~ |
| Path segments | `kebab-case` plural nouns | REST convention | `/api/role-holders` | ~~`/api/roleHolders`~~ |
| Path parameters | `camelCase` + `Id` suffix | REST convention | `{orgId}`, `{connectionId}` | ~~`{orgID}`~~, ~~`{org_id}`~~ |
| Query/header parameters | `camelCase` | REST convention | `pageSize`, `orgId` | ~~`page_size`~~, ~~`orgID`~~ |
| Enum values | `lowercase` | Convention for new values | `enabled`, `ignored` | ~~`Enabled`~~, ~~`ENABLED`~~ |
| Go struct field names | `PascalCase` | Go export convention (generated) | `CreatedAt`, `CredentialID` | — |
| TypeScript property names | Same as schema property | No transformation (generated) | `credential_id`, `schemaVersion` | — |
| `json:"..."` tag value | Same as schema property | Direct copy (generated) | `json:"credential_id"`, `json:"schemaVersion"` | — |
| `yaml:"..."` tag value | Same as `json` tag | Duplicated from json (generated) | `yaml:"credential_id"` | — |
| `db:"..."` tag value | Database column name | Declared via `x-oapi-codegen-extra-tags` | `db:"credential_id"` | — |
| `gorm:"..."` tag value | Varies | Hand-coded in helper files | `gorm:"column:type"`, `gorm:"foreignKey:ModelId"` | — |

## How Each Code Generator Decides

### Go (oapi-codegen + build/generate-golang.js)

The Go generation pipeline has 8 stages:

1. **oapi-codegen** reads the OpenAPI spec and generates structs. It converts property names to PascalCase for Go field names (e.g., `credential_id` → `CredentialID`) and uses the schema property name verbatim as the `json:"..."` tag.

2. **addYamlTags()** copies the `json` tag value to a `yaml` tag (e.g., `json:"credential_id"` → add `yaml:"credential_id"`).

3. **addSchemaExtraTags()** reads `x-oapi-codegen-extra-tags` from the schema and merges `db`, `gorm`, `fk_id`, `belongs_to`, etc. into the struct tag string.

4. **rewriteExternalRefAliases()** normalizes import aliases from opaque names to readable ones (e.g., `externalRef1` → `corev1alpha1`).

5. **validateReadableImportAliases()** verifies no opaque aliases remain.

6. **addCompatibilityParameterAliases()** adds backward-compatible parameter type aliases.

7. **validateGeneratedDbTags()** verifies that every `db:` tag declared in the schema is present in the generated Go code.

8. **validateGeneratedJsonTags()** verifies that every `json:` tag in the generated Go code matches the corresponding schema property name. This is the belt-and-suspenders check that catches oapi-codegen regressions or post-processing bugs.

9. **writeGeneratedHelperFile()** generates `zz_generated.helpers.go` with `Scan()`/`Value()` methods for types marked with `x-generate-db-helpers: true`.

**The key insight:** The property name is the single source of truth. oapi-codegen reads it verbatim (stage 1) and `validateGeneratedJsonTags` confirms it survived the pipeline unchanged (stage 8). `db` tags come from `x-oapi-codegen-extra-tags` and must match the property name for DB-backed fields, ensuring GORM and Pop see identical column names.

### TypeScript (openapi-typescript)

TypeScript generation is simpler:

1. `openapi-typescript` reads the bundled OpenAPI spec.
2. Property names are used **verbatim** — no casing transformation.
3. Types are inferred from OpenAPI types (`string` → `string`, `integer` → `number`, etc.).
4. Optional/required follows the schema's `required` array.

**The key insight:** Whatever you name a property in the schema is exactly what appears in TypeScript. If you name it `credential_id`, TypeScript consumers write `obj.credential_id`. If you name it `credentialId`, they write `obj.credentialId`. Changing the name is a breaking change for all TypeScript consumers.

## ORM Implications

### Buffalo Pop (layer5io/meshery-cloud)

Pop maps Go struct fields to database columns using `db:"column_name"` tags:

```go
type Connection struct {
    ID           uuid.UUID `db:"id"`
    Name         string    `db:"name"`
    CredentialID uuid.UUID `db:"credential_id"`
    SubType      string    `db:"sub_type"`
}
```

Pop reads the `db` tag to determine the SQL column name. If `db:"credential_id"` and the column is `credential_id`, it works. If the `db` tag is wrong or missing, Pop cannot find the column.

**Rule:** Every DB-backed field MUST have `x-oapi-codegen-extra-tags: { db: "exact_column_name" }` in the schema.

### GORM (meshery/meshery)

GORM uses multiple tag sources in priority order:
1. `gorm:"column:column_name"` — explicit column override
2. `db:"column_name"` — Pop-compatible tag (GORM reads this too)
3. Go field name → automatic snake_case conversion (fallback)

For this repo, GORM-specific tags (`gorm:"foreignKey:..."`, `gorm:"type:bytes;serializer:json"`) are only used in manually-maintained helper files, not in generated code. The generated code uses `db` tags which both GORM and Pop understand.

**Rule:** `gorm:` tags are hand-coded in `*_helper.go` files only. Generated code uses `db:` tags for column mapping.

## Why json and db Tags Must Match for DB-Backed Fields

Consider what happens when they differ:

```go
// WRONG: json and db tags disagree
CredentialSecret core.Map `db:"credential_secret" json:"credentialSecret"`
```

1. **Pop** writes to column `credential_secret` (from `db` tag).
2. **API response** serializes to `{"credentialSecret": ...}` (from `json` tag).
3. **API request** expects `{"credentialSecret": ...}` (from `json` tag).
4. **Pop query** reads from column `credential_secret` and populates `CredentialSecret` field.
5. This works — but the API wire format (`credentialSecret`) diverges from the database format (`credential_secret`).

The problem: **downstream consumers in meshery/meshery and layer5io/meshery-cloud may also directly query the database.** When the wire format says `credentialSecret` but the database column is `credential_secret`, code that builds SQL queries from API field names breaks. Additionally, many GORM query patterns use `json` tag names for `Where()` clauses.

**The correct rule:** For DB-backed fields, `property name = json tag = db tag = yaml tag = database column name`. All must be the same snake_case string.

## How the Validator Enforces This

### Rule 6 (Style — advisory)
Checks that non-DB property names are camelCase. Allows snake_case only for:
- Fields in the `DB_MIRRORED_FIELDS` allowlist (well-known columns like `created_at`, `user_id`)
- Fields with `x-oapi-codegen-extra-tags.db` that match the snake_case property name

### Rule 27 (Blocking)
Checks `x-oapi-codegen-extra-tags` consistency:
- `db:` values must be snake_case
- `json:` values must match the property name

### Rule 32 (Blocking)
Checks DB-backed property name stability:
- If a property has `x-oapi-codegen-extra-tags.db` with a snake_case value, the property name MUST equal the `db` value
- If the `json` tag differs from the `db` tag, it's a blocking error

### Rule 33 (Blocking)
Pagination envelope fields `page_size` and `total_count` must use snake_case (published contract).

## Decision Flowchart

When naming a new property in a schema:

```
Is this field stored in a database column?
├── YES → Use the exact database column name (snake_case)
│         ├── Add x-oapi-codegen-extra-tags: { db: "column_name" }
│         ├── Schema property name = column_name
│         └── json tag = yaml tag = db tag = column_name
│
└── NO  → Is this a pagination envelope field (page_size, total_count)?
    ├── YES → Use snake_case (published contract exception)
    │
    └── NO  → Use camelCase
              ├── No db tag needed
              └── json tag = yaml tag = property name (camelCase)
```

## Published Wire-Format Stability

**Once a field name is published in a released API version, it cannot be changed in that version.** This applies to:
- Schema property names (they become `json` tags and TypeScript property names)
- Query parameter `name:` values (they become URL query string keys)
- Path parameter names
- Enum values

If a casing fix is needed on a published field, it must be done in a new API version (e.g., v1beta2) with a full consistent migration. Partial migrations within the same version are forbidden.

## x-oapi-codegen-extra-tags Patterns

### DB-backed entity field
```yaml
credential_id:
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
  x-oapi-codegen-extra-tags:
    db: credential_id
```

### DB-backed entity field with omitempty
```yaml
credential_id:
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
  x-oapi-codegen-extra-tags:
    db: credential_id
    json: "credential_id,omitempty"
```

### Non-persisted field (excluded from ORM)
```yaml
schemaVersion:
  $ref: "../../v1alpha1/core/api.yml#/components/schemas/versionString"
```
No extra tags needed. oapi-codegen generates `json:"schemaVersion"` automatically.

### GORM relationship field (hand-coded in helpers)
```yaml
environments:
  type: array
  items:
    $ref: "../environment/api.yml#/components/schemas/Environment"
  x-oapi-codegen-extra-tags:
    db: "-"
    gorm: "-"
```

### Payload field (no DB mapping)
```yaml
# In *Payload schema — camelCase, no db tag
credentialSecret:
  type: object
  x-go-type: core.Map
```

## Common Mistakes

1. Renaming `credential_secret` to `credentialSecret` in a DB-backed field — breaks Pop column mapping and API wire format
2. Using `json:"camelCase"` with `db:"snake_case"` — creates split identity between API and database
3. Adding `db:` tags to `*Payload` schemas — payloads are not directly persisted
4. Using `pageSize` instead of `page_size` in pagination envelopes — breaks published contract
5. Changing any published wire-format name within the same API version — breaks all consumers

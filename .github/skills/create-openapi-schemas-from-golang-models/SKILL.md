---
name: create-openapi-schemas-from-golang-models
description: 'Create OpenAPI schemas from Golang models in Layer5 Cloud, generating schema artifacts in Meshery Schemas repository. Handles cross-repository schema creation workflow with proper naming conventions, Go code generation, and backwards compatibility validation.'
---

# Create OpenAPI Schemas from Golang Models

## Overview

This skill guides you through creating OpenAPI schemas from existing Golang models in Layer5 Cloud (layer5io/meshery-cloud), with the generated schemas stored in Meshery Schemas (meshery/schemas). This cross-repository workflow ensures consistent API contracts between the two projects.

## Prerequisites

### Required Repositories

Both repositories must be locally cloned and available:

- **Layer5 Cloud**: `/Users/l/code/meshery-cloud` (https://github.com/layer5io/meshery-cloud)
- **Meshery Schemas**: `/Users/l/code/schemas` (https://github.com/meshery/schemas)

### Required Knowledge

1. Read the `meshery/schemas` README.md and uphold all directives, including naming conventions
2. Read AGENTS.md in both repositories
3. Treat the Golang models in `layer5io/meshery-cloud` as the **source of truth**
4. Ignore any existing schemas in `meshery/schemas` for constructs being worked on
5. Ignore any existing tests in `layer5io/meshery-cloud` for constructs being worked on

## Naming Conventions

### OpenAPI Schema Naming

| Element | Convention | Example |
|---------|------------|---------|
| Property names | Preserve published wire-format casing: DB-backed fields use exact snake_case db names; new non-DB fields use camelCase | `first_name`, `organization_id`, `schemaVersion` |
| Identifier fields | camelCase + "Id" suffix | `roleId`, `userId`, `keychainId` |
| Enums | lowercase | `admin`, `user`, `enabled` |
| Object names | singular nouns | `role`, `keychain`, `user` |
| Schema components | PascalCase | `Role`, `RolesPage`, `RoleHolderRequest` |
| Files/folders | lowercase | `role.yaml`, `api.yml` |

### Endpoint Naming

| Element | Convention | Example |
|---------|------------|---------|
| Paths | `/api` + kebab-case plurals | `/api/identity/orgs/{orgId}/roles` |
| Operations | camelCase VerbNoun | `GetAllRoles`, `UpsertRoles` |

If a property has `x-oapi-codegen-extra-tags.db` and that `db` value is snake_case, the schema property name and JSON tag must use that exact snake_case name. Do not camelize DB-backed fields in-place within an existing API version. Pagination envelopes must use `page`, `page_size`, and `total_count`.
| Non-CRUD actions | append verb | `.../keychains/{keychainId}` |

Response descriptions and response message text must not include the word `successfully`. Use neutral wording such as `Role deleted`, `Webhook processed`, or `Roles response`.

## Workflow

### Task 1: Create Schema Artifacts

In `meshery/schemas`, create these files for the target construct:

> **Dual-Schema Pattern (required):** Every entity needs two schemas — `<construct>.yaml` (full response entity) and `{Construct}Payload` in `api.yml` (write request body). Never use the entity schema as a `POST`/`PUT` requestBody. See AGENTS.md § "The Dual-Schema Pattern" for full rules.

```
schemas/constructs/v1beta1/<construct_name>/
├── <construct_name>.yaml          # Schema definition
├── api.yml                        # Endpoint definitions + page/payload schemas
└── templates/
    └── <construct_name>_template.json   # Example usage
```

#### Schema Definition (`<construct_name>.yaml`)

This is the **response schema** — the full persisted object as the API returns it. It must:
- Have `additionalProperties: false` at the top level
- Include all server-generated fields (`id`, `created_at`, `updated_at`, `deleted_at`) in `properties` and `required`

Map Golang struct fields to OpenAPI properties:

```yaml
# Example: role.yaml
type: object
additionalProperties: false
required:
  - id
  - roleName
  - created_at
  - updated_at
properties:
  id:
    type: string
    format: uuid
    x-oapi-codegen-extra-tags:
      json: "id,omitempty"
      yaml: "id,omitempty"
      db: "id"
  roleName:
    type: string
    x-oapi-codegen-extra-tags:
      json: "role_name,omitempty"
      yaml: "role_name,omitempty"
      db: "role_name"
  description:
    type: string
  createdAt:
    type: string
    format: date-time
  updatedAt:
    type: string
    format: date-time
  deletedAt:
    type: string
    format: date-time
    nullable: true
```

#### API Definition (`api.yml`)

Define endpoints matching the Layer5 Cloud router. All `POST`/`PUT` operations **must** use a `{Construct}Payload` request body — never the full entity schema.

```yaml
openapi: 3.0.3
info:
  title: Role API
  version: v1beta1

paths:
  /api/identity/orgs/{orgId}/roles:
    get:
      operationId: getAllRoles
      parameters:
        - name: orgId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: page
          in: query
          schema:
            type: integer
        - name: pagesize
          in: query
          schema:
            type: integer
      responses:
        '200':
          description: List of roles
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RolesPage'
    post:
      operationId: upsertRole
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RolePayload'  # ← Payload, NOT Role
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Role'       # ← full entity in response

components:
  schemas:
    Role:
      $ref: './role.yaml'                               # full response entity
    RolePayload:
      type: object                                      # write request body
      description: Payload for creating or updating a role.
      required:
        - roleName
      properties:
        id:
          type: string
          format: uuid
          x-oapi-codegen-extra-tags:
            json: "id,omitempty"                        # optional — for upsert
        roleName:
          type: string
        description:
          type: string
    RolesPage:
      type: object
      properties:
        page:
          type: integer
        roles:
          type: array
          items:
            $ref: '#/components/schemas/Role'
        totalCount:
          type: integer
        pageSize:
          type: integer
```

#### Go Type Hints

For cross-schema references, use `x-go-type` to avoid redundant structs:

```yaml
registrant:
  x-go-type: "RegistrantReference"
  x-go-import-path: "github.com/meshery/schemas/models/v1beta1/core"
  $ref: "#/components/schemas/RegistrantReference"
```

### Task 2: Generate Go Models

In the `meshery/schemas` repository:

```bash
cd /Users/l/code/schemas
make generate-golang
```

**Verification Steps:**

1. Ensure generated models are in `models/v1beta1/<construct_name>/`
2. If a schema type within the construct is stored as a **JSON blob in a database column** and has a **dedicated schema definition with explicit properties**, add `x-generate-db-helpers: true` at the schema component level in `api.yml`. This instructs the generator to produce `Scan()` and `Value()` SQL driver methods automatically in `zz_generated.helpers.go` — no manual `helpers.go` is needed for that type.

   ```yaml
   # In api.yml, under components/schemas:
   Quiz:
     x-generate-db-helpers: true   # ← schema-level, not per-property
     type: object
     properties:
       id:
         $ref: "../../v1alpha1/core/api.yml#/components/schemas/uuid"
       title:
         type: string
   ```

   For amorphous JSON blob fields that lack a fixed schema definition (e.g., a freeform `metadata` map), use `x-go-type: "core.Map"` on the property instead — do not use `x-generate-db-helpers` for those.

3. If helpers are still needed for non-generated behavior (e.g., `TableName()`, custom business logic), create `helpers.go` manually. When implementing `Scan`/`Value`, follow these rules (see AGENTS.md § "SQL Driver Rules"):
   - `Value()` must always marshal — never return `(nil, nil)`. A nil map produces JSON `"null"`, not SQL NULL.
   - `Scan()` must zero the receiver (`*m = nil`) when `src` is nil, not silently return.

```go
// helpers.go - NOT autogenerated
package role

import (
    "database/sql/driver"
    "encoding/json"
)

func (r Role) TableName() string {
    return "roles"
}

// Value implements driver.Valuer. Always marshals — never returns SQL NULL.
func (r Role) Value() (driver.Value, error) {
    b, err := json.Marshal(r)
    if err != nil {
        return nil, err
    }
    return string(b), nil
}
```

3. Create/update tests:

```bash
go test ./models/v1beta1/<construct_name>/...
```

4. Run full test suite:

```bash
go test ./...
```

### Task 3: Validate Backwards Compatibility

Compare generated models with Layer5 Cloud models:

**Source**: `layer5io/meshery-cloud/server/models/<construct>.go`
**Generated**: `meshery/schemas/models/v1beta1/<construct_name>/<construct_name>.go`

**Validation Checklist:**

- [ ] All fields present with matching types
- [ ] JSON tags match the schema property name exactly; do not treat `snake_case` and `camelCase` as interchangeable for DB-backed fields
- [ ] `omitempty` behavior preserved
- [ ] Nullable fields handled correctly
- [ ] Array/slice types match

## Common Patterns

### Pagination Response

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

### UUID Fields

```yaml
id:
  type: string
  format: uuid
  x-oapi-codegen-extra-tags:
    json: "id,omitempty"
    db: "id"
```

### Nullable Time Fields

```yaml
deletedAt:
  type: string
  format: date-time
  nullable: true
  x-go-type: "sql.NullTime"
  x-go-import-path: "database/sql"
```

### String Arrays (pq.StringArray)

```yaml
roleNames:
  type: array
  items:
    type: string
  x-go-type: "pq.StringArray"
  x-go-import-path: "github.com/lib/pq"
```

## Exemplar: Academy Construct

The **Academy** construct in `meshery/schemas` serves as the primary exemplar for this workflow. Study these files:

### Reference Files

| File | Location | Purpose |
|------|----------|---------|
| `api.yml` | [assets/academy-api.yml](assets/academy-api.yml) | Complete OpenAPI schema with paths and components |
| `helpers.go` | [assets/academy-helpers.go](assets/academy-helpers.go) | Custom driver methods (NOT auto-generated) |
| Documentation | [references/meshery-schemas-academy.md](references/meshery-schemas-academy.md) | Detailed patterns and explanations |

### Key Patterns from Academy

1. **Cross-schema references** using `$ref` with external files
2. **Custom Go type mappings** with `x-go-type` and `x-go-type-import`
3. **Nullable fields** using `core.NullTime`
4. **Enum definitions** with proper Go type hints
5. **SQL Scanner/Valuer** implementations in helpers.go

### Source Repository

- **Schema**: https://github.com/meshery/schemas/blob/master/schemas/constructs/v1beta1/academy/api.yml
- **Go Models**: https://github.com/meshery/schemas/tree/master/models/v1beta1/academy

---

## Example: Role Construct

### Source Files in Layer5 Cloud

- Model: `server/models/roles.go`
- Handler: `server/handlers/roles.go`
- DAO: `server/dao/roles_dao.go`
- Routes: `server/router/router.go` (search for "roles")

### Key Endpoints

| Method | Path | Handler |
|--------|------|---------|
| GET | `/api/identity/orgs/:orgID/roles` | `GetAllRoles` |
| POST | `/api/identity/orgs/:orgID/roles` | `UpsertRoles` |
| GET | `/api/identity/orgs/:orgID/roles/:roleID/keychains` | `GetKeychainsByRoleID` |
| POST | `/api/identity/orgs/:orgID/roles/:roleID/keychains/:keychainID` | `AssignKeychainToRole` |
| DELETE | `/api/identity/orgs/:orgID/roles/:roleID/keychains/:keychainID` | `UnAssignKeychainFromRole` |

### Key Models to Schema-ify

- `Role` - Core role entity
- `RolesPage` - Paginated response
- `UserWithRole` - User with role assignments
- `RoleHolderRequest` - Request payload for role assignment

## Validation Commands

```bash
# Run schema validation
cd /Users/l/code/schemas
make validate-schemas

# Full build (validates + generates)
make build

# Test generated Go code
go test ./models/v1beta1/<construct>/...
```

## Tips

1. **Start with the Golang struct** - It's the source of truth
2. **Match JSON tags exactly** - Critical for API compatibility
3. **Use `x-oapi-codegen-extra-tags`** - Preserves db and yaml tags
4. **Check router for all endpoints** - Don't miss any routes
5. **Run `make build`** - Validates everything at once

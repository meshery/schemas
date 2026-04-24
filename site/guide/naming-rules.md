---
layout: guide
title: Naming Rules
description: The authoritative casing and naming reference for Meshery Schemas.
---

<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/guide/">Guide</a> <span>/</span> Naming Rules</div>

# Naming Rules

<p class="page-desc">
  The single authoritative casing reference for every layer of the Meshery schema ecosystem.
  When in doubt, come here first.
</p>

<div class="callout tip">
  <div><strong>One-sentence rule:</strong> Wire is camelCase everywhere; DB is snake_case; Go fields follow Go idiom; the ORM layer is the sole translation boundary.</div>
</div>

---

## Casing at a glance

| Layer / element | Casing | Correct | Wrong |
|---|---|---|---|
| DB column / `db:` tag | `snake_case` | `user_id`, `created_at` | ~~`userId`~~, ~~`orgID`~~ |
| Go struct field | `PascalCase` + Go initialisms | `UserID`, `OrgID`, `CreatedAt` | ~~`UserId`~~, ~~`User_id`~~ |
| JSON tag / wire / schema property | `camelCase` | `userId`, `orgId`, `createdAt` | ~~`user_id`~~, ~~`orgID`~~ |
| ID-suffix properties | `camelCase` + `Id` | `modelId`, `registrantId` | ~~`modelID`~~, ~~`model_id`~~ |
| `components/schemas` type names | `PascalCase` | `ModelDefinition`, `KeychainPayload` | ~~`modelDefinition`~~ |
| File and folder names | lowercase | `api.yml`, `keychain.yaml` | ~~`Keychain.yaml`~~ |
| URL path segments | kebab-case, plural | `/api/role-holders` | ~~`/api/roleHolders`~~ |
| URL path params | `camelCase` + `Id` | `{orgId}`, `{workspaceId}` | ~~`{orgID}`~~, ~~`{org_id}`~~ |
| Query params (pagination) | `camelCase` | `?pageSize=`, `?page=` | ~~`?page_size=`~~ |
| `operationId` | lower camelCase verbNoun | `getWorkspaces`, `createKeychain` | ~~`GetWorkspaces`~~, ~~`get_workspaces`~~ |
| New enum values | lowercase | `enabled`, `ignored` | ~~`Enabled`~~, ~~`ENABLED`~~ |
| TypeScript property | `camelCase` | `response.userId` | ~~`response.user_id`~~ |

---

## Wire vs DB — DB-backed fields

For a field that maps to a database column, the **wire name and the DB name deliberately differ**. The schema property (wire) is camelCase; the `db:` tag is snake_case.

```yaml
# CORRECT — wire camelCase, DB snake_case
userId:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  x-oapi-codegen-extra-tags:
    json: "userId"     # wire — camelCase
    db:   "user_id"    # database column — snake_case
```

```yaml
# WRONG — wire matches DB (legacy pattern, retired)
user_id:
  $ref: ../../v1alpha1/core/api.yml#/components/schemas/uuid
  x-oapi-codegen-extra-tags:
    json: "user_id"    # ← wire should be camelCase
    db:   "user_id"
```

<div class="callout warn">
  <div>Legacy published API versions may still use <code>snake_case</code> on the wire for DB-backed fields. Do not recase them in-place — introduce a new API version. See <a href="/guide/versioning/">Versioning</a>.</div>
</div>

---

## ID-suffix fields

Always `camelCase` + lowercase `d` suffix:

| Correct | Wrong |
|---|---|
| `modelId` | ~~`modelID`~~ |
| `registrantId` | ~~`registrantID`~~ |
| `orgId` | ~~`orgID`~~, ~~`org_id`~~ |
| `workspaceId` | ~~`workspaceID`~~ |

This applies to: schema property names, JSON tags, URL path parameters, and query parameters.

---

## operationId

Lower camelCase, verb then noun. The verb is typically one of: `get`, `create`, `update`, `delete`, `list`.

| Correct | Wrong |
|---|---|
| `getKeychains` | ~~`GetKeychains`~~ |
| `createEnvironment` | ~~`CreateEnvironment`~~, ~~`create_environment`~~ |
| `updateWorkspace` | ~~`UpdateWorkspace`~~ |
| `deleteConnection` | ~~`DeleteConnection`~~ |
| `getAllRoles` | ~~`GetAllRoles`~~ |

---

## HTTP method semantics

| Use case | Method | Status |
|---|---|---|
| Create a resource | `POST` | **201** |
| Upsert a resource | `POST` | 200 |
| Update an existing resource | `PUT` or `PATCH` | 200 |
| Non-CRUD action | `POST` to sub-resource | 200 |
| Bulk delete | `POST /api/{resources}/delete` | 200 |
| Single delete | `DELETE` | 204 |

**Never use `DELETE` with a request body** — use `POST /api/{resources}/delete` instead.

---

## URL path structure

| Category | Prefix | Example |
|---|---|---|
| Users, orgs, roles, teams | `/api/identity/` | `/api/identity/users` |
| Connections, environments | `/api/integrations/` | `/api/integrations/connections` |
| Designs, components, models | `/api/content/` | `/api/content/designs` |
| Plans, subscriptions | `/api/entitlement/` | `/api/entitlement/plans` |
| Tokens, keychains, keys | `/api/auth/` | `/api/auth/keychains` |

Path segments must be **kebab-case plural nouns**.

---

## Enum values

New enum values must be **lowercase**:

```yaml
# CORRECT
status:
  type: string
  enum: [enabled, disabled, ignored]

# WRONG
status:
  type: string
  enum: [Enabled, Disabled, IGNORED]
```

Do not recase published enum values in an existing API version — they are a wire contract.

---

## Non-UUID external IDs

Properties that hold external system identifiers (Stripe IDs, coupon codes, etc.) are not UUIDs. Mark them with `x-id-format: external` to exempt them from the UUID format rule:

```yaml
billingId:
  type: string
  description: Billing ID from the external payment processor.
  x-id-format: external
  maxLength: 500
  pattern: '^[A-Za-z0-9_\-]+$'
```

---

## Partial migrations are forbidden

Do not rename selected fields in a published API version from `snake_case` to `camelCase` while leaving others unchanged. If the wire format must change, introduce a new API version. See [Versioning](/guide/versioning/).

---

## CI failure self-diagnosis

When `make validate-schemas` or the advisory audit CI job fails, match the error message to the table below to understand what went wrong and how to fix it.

### Blocking rule failures

| Error message contains | Rule | Cause | Fix |
|---|---|---|---|
| `missing x-internal` | 14 | An operation has no `x-internal` annotation | Add `x-internal: ["meshery"]`, `["cloud"]`, or `["meshery","cloud"]` to every operation |
| `operationId is PascalCase` or `UpperCase` | 6 | `operationId` starts with a capital letter | Change to lower camelCase: `GetWorkspaces` → `getWorkspaces` |
| `property name does not match db tag` | 32 | Schema property uses camelCase but `db:` tag is snake_case on a **legacy** published version | File under Phase 3 migration — do not recase in-place on an existing version |
| `page_size missing minimum: 1` | 41 | A page-size property has no `minimum` constraint (or has `minimum: 0`) | Add `minimum: 1` to the property |
| `DELETE operation has requestBody` | — | A `DELETE` endpoint has a `requestBody` | Replace with `POST /api/{resources}/delete` |
| `POST returns 200 for creation` | — | A create-only `POST` returns 200 | Change response code to `201 Created` |
| `path param not camelCase` | — | Path parameter is `{orgID}` or `{org_id}` | Rename to `{orgId}` (camelCase + `Id`) |
| `missing tags` | 25 | An operation has no `tags` array | Add at least one tag matching the construct's tag definition |

### Advisory rule failures (Rules 37–42)

These do not block the build but must be resolved in new schemas (new violations break the advisory baseline):

| Rule | Error | Fix |
|---|---|---|
| 37 | `property has no description` | Add a `description:` field to the schema property |
| 38 | `string property has no length/pattern/format constraint` | Add `minLength`, `maxLength`, `pattern`, or `format` |
| 39 | `numeric property has no range constraint` | Add `minimum` and/or `maximum` |
| 40 | `id property has no uuid format` | Add `format: uuid` or `$ref` to the UUID type, or `x-id-format: external` for non-UUID IDs |
| 41 | `page_size minimum must be >= 1` | Set `minimum: 1` (not `0`) |
| 42 | `unknown format value` | Use a standard OpenAPI format: `date-time`, `uuid`, `email`, `uri`, `int64`, `float`, etc. |

### Consumer audit failures

These appear in the `consumer-audit` CI job (checking `meshery/meshery`, `meshery-cloud`, `meshery-extensions`):

| Finding kind | Meaning | Fix in the downstream repo |
|---|---|---|
| `case-flip` | A TypeScript query/mutation maps `orgId` (camelCase schema) → `orgID` (wrong) | Change the RTK Query arg key to match the camelCase schema contract |
| `snake-case-wrapper` | A request body is wrapped under a snake_case key (`pattern_data`) | Change wrapper key to camelCase (`patternData`) |
| `snake-case-param` | A query param is snake_case outside the pagination envelope | Change to camelCase (e.g. `workspace_id` → `workspaceId`) |

<div class="callout tip">
  <div>Run <code>make validate-schemas-strict</code> locally before pushing. It reports both blocking and advisory rules. New advisory violations introduced after the baseline was last refreshed will fail the <code>advisory-audit</code> CI job.</div>
</div>

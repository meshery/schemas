# Identifier Naming - Contributor Guide

> The canonical, evergreen reference for identifier naming across every Meshery component and repository - Go, TypeScript, OpenAPI, SQL, URLs, file names, error codes. If you're contributing code or reviewing a PR in any repo, this document tells you the right form for every element type.

---

## The contract, in one sentence

Wire is **camelCase** everywhere; the database is **snake_case**; Go fields follow **Go idiom** (`PascalCase` with initialisms like `ID`, `URL`, `API`); the ORM layer is the **only** translation boundary.

That sentence resolves almost every naming question. The table below resolves the rest.

---

## Canonical Naming Directory

This is the authoritative, per-element, per-layer naming convention. Use this table whenever you introduce a new schema property, Go struct, TypeScript type, URL, query parameter, operation ID, file name, enum value, or error code.

### Code elements

| # | Element | Convention | Example | Counter-example |
|---|---|---|---|---|
| 1 | Database column name | `snake_case` | `user_id`, `created_at`, `pattern_file`, `view_count` | ~~`userId`~~, ~~`orgID`~~ |
| 2 | Go `db:` struct tag | `snake_case` (matches column) | `` `db:"user_id"` ``, `` `db:"created_at"` `` | ~~`` `db:"userId"` ``~~ |
| 3 | Go struct field (exported) | `PascalCase` + Go-idiomatic initialisms | `UserID`, `OrgID`, `WorkspaceID`, `CreatedAt` | ~~`User_id`~~, ~~`UserIdentifier`~~ |
| 4 | Go struct field (unexported) | `camelCase` + Go-idiomatic initialisms | `userID`, `orgID`, `createdAt` | ~~`user_id`~~, ~~`userId`~~ |
| 5 | JSON tag on Go field | `camelCase` (regardless of DB backing) | `` `json:"userId"` ``, `` `json:"createdAt"` `` | ~~`` `json:"user_id"` ``~~, ~~`` `json:"orgID"` ``~~ |
| 6 | OpenAPI schema property name | `camelCase` | `userId:`, `patternFile:`, `createdAt:` | ~~`user_id:`~~, ~~`pattern_file:`~~ |
| 7 | TypeScript property / RTK query arg | `camelCase` | `response.userId`, `queryArg.orgId` | ~~`response.user_id`~~, ~~`queryArg.orgID`~~ |
| 8 | Enum value (new) | `lowercase` words | `enabled`, `ignored`, `duplicate` | ~~`Enabled`~~, ~~`ENABLED`~~ |
| 9 | Go type name (generated or hand-written) | `PascalCase` | `Workspace`, `KeychainPayload`, `MesheryPattern` | ~~`workspacePayload`~~ |
| 10 | TypeScript type name (generated or hand-written) | `PascalCase` | `Workspace`, `KeychainPayload` | ~~`workspacePayload`~~ |
| 11 | OpenAPI `components/schemas` entry | `PascalCase` nouns | `Model`, `Component`, `KeychainPayload` | ~~`keychainPayload`~~ |
| 12 | OpenAPI `operationId` | `camelCase` verbNoun | `createKeychain`, `getWorkspaces`, `updateEnvironment` | ~~`CreateKeychain`~~, ~~`get_all_roles`~~ |
| 13 | OpenAPI tag name | Single lowercase words where possible, else kebab | `connection`, `workspace`, `role-holder` | ~~`Connection`~~, ~~`roleHolder`~~ |
| 14 | URL path segment | `kebab-case`, plural nouns | `/api/workspaces`, `/api/role-holders`, `/api/environments` | ~~`/api/roleHolders`~~, ~~`/api/workspace`~~ |
| 15 | URL path parameter | `camelCase` with `Id` suffix (lowercase `d`) | `{workspaceId}`, `{orgId}`, `{roleId}` | ~~`{orgID}`~~, ~~`{org_id}`~~, ~~`{orgid}`~~ |
| 16 | URL query parameter | `camelCase` | `?userId=…`, `?orgId=…`, `?pageSize=25`, `?order=updatedAt%20desc` | ~~`?user_id=…`~~, ~~`?orgID=…`~~, ~~`?page_size=…`~~ |
| 17 | Pagination envelope fields | `camelCase` on new versions: `page`, `pageSize`, `totalCount` | `{ "page": 1, "pageSize": 25, "totalCount": 237 }` | ~~`page_size`~~, ~~`total_count`~~ (legacy, deprecated) |
| 18 | HTTP response status for create | `201 Created` | `POST /api/workspaces` → 201 + new resource in body | ~~`POST` → 200~~ |
| 19 | HTTP response status for upsert | `200 OK` | `POST /api/keys` (upsert) → 200 | - |
| 20 | HTTP response status for single delete | `204 No Content` | `DELETE /api/keys/{keyId}` → 204, no body | ~~200 with echoed body~~ |
| 21 | HTTP method for bulk delete | `POST .../delete`, never `DELETE` with body | `POST /api/designs/delete` with JSON body listing IDs | ~~`DELETE /api/designs` with body~~ |
| 22 | Error code (mesheryctl) | `mesheryctl-NNNN` format, each code unique | `mesheryctl-1232` | two `ErrXxxCode` constants with the same `NNNN` |
| 23 | File name | `lowercase`, descriptive | `api.yml`, `keychain.yaml`, `sql-utils.go`, `context_helpers.go` | ~~`Keychain.yaml`~~, ~~`SqlUtils.go`~~ |
| 24 | Folder name | `lowercase`, singular | `schemas/constructs/v1beta3/keychain/`, `ui/components/identity/` | ~~`Schemas/Constructs/`~~ |
| 25 | Template file | `<construct>_template.json` / `.yaml`, inside `templates/` | `templates/keychain_template.json` | template alongside the schema file |
| 26 | RTK Query generated endpoint name | `camelCase` verbNoun, matches `operationId` | `useGetWorkspacesQuery`, `useCreateKeychainMutation` | hand-written `useGetMyCustomQuery` paralleling a generated one |

### Wire-field casing - a closer look

On newly authored (canonical-casing) API versions, **every JSON tag is camelCase, regardless of whether the field is DB-backed.** The snake-case DB column name lives exclusively in `x-oapi-codegen-extra-tags.db` on the OpenAPI side and in the `db:` Go struct tag on the generated code. On DB-backed fields, the `json:` and `db:` tags differ by design:

```yaml
# OpenAPI - canonical form for a DB-backed field
patternFile:
  type: string
  description: Stored as a JSON blob.
  x-oapi-codegen-extra-tags:
    db: "pattern_file"
```

```go
// Generated Go
PatternFile string `json:"patternFile" db:"pattern_file"`
```

```typescript
// Generated TypeScript
patternFile: string;
```

This is a **retirement** of the older rule that said "when a field is DB-backed, its JSON tag should match its DB column name." That rule is gone. Wire is camelCase; DB is snake_case; the ORM layer is the only translation.

### Pagination envelope - the legacy exception

Pagination envelope fields historically used `snake_case` on the wire (`page_size`, `total_count`). On **newly authored API versions**, use `pageSize` and `totalCount`. On legacy resources that still publish the snake form, do not recase them in-place - that is a partial-casing migration and is forbidden by validator Rule 45. The snake forms attrite as resources migrate to their next canonical-casing version bump.

The field `page` is already a single-word identifier and stays `page` in both legacy and canonical forms.

---

## Before / after - concrete examples

| | Before | After |
|---|---|---|
| Workspace request body | `{ "organization_id": "..." }` | `{ "organizationId": "..." }` |
| Design response field | `{ "view_count": 42, "design_type": "Helm Chart" }` | `{ "viewCount": 42, "designType": "Helm Chart" }` |
| List query parameter | `GET /api/workspaces?organization_id=X&page_size=25` | `GET /api/workspaces?orgId=X&pageSize=25` |
| Path parameter | `GET /api/workspaces/{workspaceID}` | `GET /api/workspaces/{workspaceId}` |
| OpenAPI `operationId` | `GetAllRoles`, `get_workspaces` | `getAllRoles`, `getWorkspaces` |
| Go struct JSON tag | `LastRun *time.Time \`json:"last_run,omitempty"\`` | `LastRun *time.Time \`json:"lastRun,omitempty"\`` |
| OpenAPI response property | `user_id: { $ref: "..." }` | `userId: { $ref: "..." }` |
| Sort parameter | `?order=view_count%20desc` | `?order=viewCount%20desc` |
| RTK Query hook argument | `useGetUserTokensQuery({ isOAuth: true })` | `useGetUserTokensQuery({ isOauth: true })` |
| Error code constant | two `Err…Code` values pointing at `mesheryctl-1231` | each `Err…Code` has a unique `mesheryctl-NNNN` |

---

## Dual-accept policy

During the migration, several server-side handlers were fitted with mechanisms that accept **both** the canonical camelCase wire form **and** the legacy snake_case form for the same field, converging to the canonical form internally. As of the current `master` tree, these mechanisms are still in place.

### What exists today

| Mechanism | Where | Effect |
|---|---|---|
| `server/utils.CamelToSnake` via `sanitizeOrderInput` | `layer5io/meshery-cloud` `server/dao/sql-utils.go` | `?order=viewCount desc` and `?order=view_count desc` both emit the same SQL `ORDER BY view_count desc`. |
| `server/utils.CamelToSnake` via `normalizeOrderClause` | `layer5io/meshery-cloud` `server/handlers/context_helpers.go` | Same, for table-qualified + `_raw`-suffixed sort clauses. |
| `utils.QueryParam(q, "camelName", "snake_name")` | `layer5io/meshery-cloud` `server/handlers/users.go` and other Phase 2-touched handlers | Either query key resolves to the same value. Camel wins when both present. |
| `*PayloadWire` `UnmarshalJSON` shims | `meshery/meshery` `server/handlers/workspace_handlers.go`, `environments_handlers.go`, `server_events_configuration_handler.go`, `k8sconfig_handler.go` | Either JSON body key parses into the same Go struct field. Camel wins when both present. |

### Is it permanent?

No - it was framed as "one deprecation cycle." There is currently no calendar-scheduled removal. Phase 4.A (legacy-version sunset) closed administratively without physical deletion of `v1beta1/` and `v1beta2/` directories; by extension, the dual-accept shims behave as **retained compatibility**, not transitional scaffolding waiting to be deleted.

Practically: they will remain until a future maintainer decision schedules their retirement. Do not plan around them disappearing next release.

### Policy for **new** code

- **Do not add new dual-accept shims** on new canonical-version endpoints. New endpoints accept only the canonical camelCase form. The wire contract for a newly authored API version is single-cased - any legacy-form ambiguity has no justification when the endpoint is new.
- **Do not copy the existing `*PayloadWire` pattern** as a template for unrelated endpoints. Its design point was one-time: it lets previously-snake_case clients keep calling a canonical endpoint during the migration overlap. A fresh endpoint has no such clients.
- **Do reference the existing shims as historical examples** when asked how we handled the migration (e.g., in ADRs, architectural overviews).

### Policy for **existing** shims

- Leave them in place.
- Don't "clean them up" in routine PRs. Their removal is a coordinated act that needs to happen when (a) the telemetry shows no callers are using the snake form for that resource, AND (b) a maintainer signs off on dropping compatibility. Neither condition is tested in CI today.
- If the shim interacts with your PR (e.g., you're renaming a field it bridges), preserve it.

---

## If you're contributing new code

### Do

- Read the [Canonical Naming Directory](#canonical-naming-directory) above. It's the authoritative reference.
- Default your new JSON tags to **camelCase**.
- Put new DB-backed fields' `db:` tag in `x-oapi-codegen-extra-tags` on the OpenAPI side. The Go generator handles the rest.
- Name URL path parameters `{workspaceId}` etc. - not `{workspaceID}`, not `{workspace_id}`.
- Run `make validate-schemas` before opening a schemas PR - Rule 6, Rule 45, Rule 46, Rule 4 all block non-compliant changes.
- Consult the per-repo `AGENTS.md` files for repo-specific conventions - all four consumer repos adopted the identifier-naming mandate in Phase 4.C.

### Don't

- Don't re-case fields in-place on an already-published API version. That is a **partial-casing migration** and is forbidden by validator Rule 45. If the wire must change, introduce a new API version and migrate the resource consistently there.
- Don't copy an existing legacy schema as a starting template if you can help it - prefer canonical-version files (anything under `v1beta3/`, or `v1beta2/` directories not marked `info.x-deprecated: true`).
- Don't add a `DELETE` endpoint with a request body for bulk operations. REST clients and proxies silently strip `DELETE` bodies. Use `POST /api/{resources}/delete` (HTTP method cell #21 in the directory).
- Don't return HTTP `200` from a `POST` that exclusively creates a new resource - use `201 Created`.
- Don't add new dual-accept shims on new endpoints (see the [Dual-accept policy](#dual-accept-policy) above).
- Don't allocate a `mesheryctl-NNNN` error code without confirming the number is free. The `MeshKit Error Codes Utility Runner` CI check will catch the collision, but it's cleaner to check `mesheryctl/internal/cli/.../error.go` files yourself first.

### If you find a violation

- Fix it in the same PR that touches the code if possible.
- If the violation predates this migration and is living in retained-legacy code, it's **expected debt** - the `v1beta1/` and `v1beta2/` directories retain their historical wire form under `info.x-deprecated: true`. External consumers pinning legacy versions depend on those markers being stable.

---

## References

| Document | Purpose |
|---|---|
| [`docs/casing-rules.md`](casing-rules.md) | Inline casing authority extracted from `AGENTS.md`; the per-layer table for canonical API versions. |
| [`docs/schema-tooling.md`](schema-tooling.md) | Migration status, advisory baseline, and consumer-audit mechanics. |
| [`AGENTS.md`](../AGENTS.md) | Repo-specific conventions reference; its "Casing rules at a glance" section mirrors this document. |
| [`validation/`](../validation) | Validator rule implementations and advisory baseline. |
| [`validation/baseline/`](../validation/baseline/) | Phase 0 baseline artifacts that anchored the migration. |

---

*Evergreen reference. The source of truth for the naming contract is `AGENTS.md` / `CLAUDE.md` in `meshery/schemas`. If this document falls out of sync with the enforced contract, the enforced contract wins and this document should be corrected.*

# Casing Rules at a Glance

> Detailed casing reference extracted from the top-level agent
> instructions (`AGENTS.md` / `CLAUDE.md`). This is the inline authority
> for casing; for the reader-friendly cross-repo directory (26-row table
> with before/after and do/don't examples), see
> [`identifier-naming-contributor-guide.md`](identifier-naming-contributor-guide.md).

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

**Partial casing migrations are forbidden.** Do not rename selected fields within the same resource from snake_case to camelCase while leaving other published fields unchanged. If the wire format must change, introduce a new API version and migrate the resource consistently there.

**Existing enum wire values are compatibility-sensitive.** Use lowercase for newly introduced enum literals, but do not recase published enum values in-place within the same API version. The validator exempts legacy enum values that already exist on the baseline branch.

**Pagination envelope fields (`page`, `page_size`, `total_count`) are on a deprecation path, not a perpetual exception.** Current forms remain accepted for backward compatibility within an existing API version; each resource migrates to `pageSize` / `totalCount` at its next canonical-casing API-version bump (per the Phase 3 per-resource plan). On a freshly authored API version, use camelCase directly. The field `page` stays `page` under the canonical contract (it's already a camelCase-compatible single-word identifier).

**`pageSize` / `page_size` properties must have `minimum: 1`.** A page size of zero is never valid. The validator enforces this (Rule 41) on all properties named `page_size`, `pagesize`, or `pageSize`.

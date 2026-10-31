# Changelog

See https://docs.meshery.io/project/releases

## Unreleased

- **Hosted MCP tools (schemas)**: new operation extension `x-mcp` (`expose`, optional `title`, required `scope`), defined by `schemas/extensions/mcp-operation.yaml` and enforced by validate-schemas Rule 48 (an `operationId`, a 2xx JSON response schema, a defined scope, the optional `X-Current-Orgid` header, never `approveRequest`, `denyRequest` or a DELETE). It marks exactly six reads: `listContentItems`, `getContentItem`, `getConnections`, `getEvents`, `getUser` (the account profile) and `getFeaturesByOrganization`. Seven generic OAuth scopes (`content:read`, `content:write`, `schedule:read`, `schedule:write`, `connections:read`, `events:read`, `account:read`) each name one new keychain; `build/oauth-scopes.json` maps scope to keychain to keys and `make generate-permissions` emits `OAuthScopeGrants` (Go) and `OAuthScopes` (TypeScript). New shared header parameters `currentOrgId` (`X-Current-Orgid`) and `idempotencyKey` (`Idempotency-Key`, optional, 24 hour replay) in `v1beta2/core`; `insertContentItem` and `createSchedule` take the latter. Contract: `docs/mcp-operation-contract.md`.

- **Content items (v1beta3), additive**: typed `approved` (boolean, in the entity and the payload; the server's agent-write policy may override it) and server-set `createdByClient` (OAuth client ID of the AI app that created the item, not in the payload). The free-form `Approved?` data column stays readable for one release. Contract: `docs/content-item-contract.md`.

- **Requests (v1beta3), new construct**: `request` is the generic request for a decision, with `listRequests`, `getRequest`, `approveRequest` and `denyRequest`. The first and only kind is `content_item_approval`; each kind names the permission key that decides it (`x-decision-key`). Approve and deny carry no `x-mcp`. New permission keys: View Requests, Decide Content Item Approvals. Contract: `docs/request-contract.md`.

- **Organization (v1beta2), additive**: `updateOrgSchedulePause` (`PUT /api/identity/orgs/{orgId}/schedule-pause`) sets and lifts `schedulePause` and nothing else, reusing `SchedulePausePayload` and `SchedulePause`. It is gated by the new key Pause schedules, in the Schedule Edit keychain, seeded to the organization admin role. `patchOrgPreferences` and `updateOrg` are unchanged. Contract: `docs/schedule-pause-contract.md`.

- **Media assets (v1beta3), new construct**: `media_asset` stores image and video files so a content item can post a file without a link, referring to it by ID. `createMediaAsset` answers a `pending` asset with a short-lived upload URL (`MediaAssetUpload`), `completeMediaAsset` checks size, sniffed type and SHA-256 (`ready`, or `409` and `rejected`), and `getMediaAssetDownload` mints a fresh download URL (`MediaAssetTransfer`) per use. `listMediaAssets`, `getMediaAsset`, `updateMediaAsset` (retention only), `deleteMediaAsset` and `getMediaAssetQuota` complete the set. `backend` is `r2` (the provider's storage) or `gdrive` (the person's Drive, downloaded through the signed `getMediaAssetContent` relay); it is required on create with no default, and the client picks it from `MediaAssetQuota.backends`, the only statement of what a provider serves (breaking against v1.3.109, where an omitted `backend` meant `r2`; hard cut-over, no consumer implements it yet). No field carries a storage credential or a stored URL. `locationStripped` records whether the client removed location metadata. The operations reuse the Content Items permission keys and declare `429`. Requested by Blowhorn (drop a file into New order). Contract: `docs/media-asset-contract.md`.

- **Posture (v1beta3), breaking**: the `risk_profile` construct is renamed to `posture` as a hard cut-over, by maintainer decision: no superseded construct, no alias property, no transition period. The component is `Posture` (Go package `models/v1beta3/posture`, type `Posture`; TypeScript `constructs/v1beta3/posture`), and `models/v1beta3/risk_profile` and its TypeScript output are removed. On `Schedule` and `SchedulePayload` (v1beta3) the optional `riskProfile` property becomes `posture` (json `posture`, db column `posture`, Go `*posturev1beta3.Posture`). The preset values `cautious`, `standard` and `brisk` are unchanged. Consumers must move in step with the release that carries this: servers rename the `risk_profile` column to `posture` and read and write `posture`; clients send and read `posture`.
- **Content items (v1beta3), additive**: optional `rulesOfEngagement` (`ContentItemRulesOfEngagement`: a Posture `preset` plus optional `dials` - `pace`, `minDelaySeconds`, `quietHours`, `capFraction`, `noMouseMove`), which can only tighten the rules the item's profile and platform run under. The server validates and stores it; the client resolves it. On update an omitted value keeps the stored one and `null` clears it. The fingerprint covers it when set. Thread fields `threadId` (the root), `replyToId` (the direct parent) and `threadIndex` (the root is 0), set on insert, checked against the organization's live items (`400`; duplicate position `409`) and fixed afterwards. `listContentItems` takes `threadId` and returns the whole thread. Optional `mediaAssetIds` (up to 20 distinct media asset ids, in posting order) on `ContentItem` and `ContentItemPayload`; omitted on update keeps the stored list and `[]` clears it, and the fingerprint covers it when set. A reply waiting for its parent's read-back link is client behaviour, not a claim rule. Requested by Blowhorn (#1319, #1323, #1328). Contract: `docs/content-item-contract.md`.

- **Mention aliases (v1beta3), new construct**: `mentionAlias` records how an organization names a tagged entity on each platform, unique on (organization, lower(`entity`), `platform`). `getMentionAliases` (`GET /api/mention-aliases`, paged, repeatable `entity` and `platform` filters), `upsertMentionAliases` (`POST /api/mention-aliases`, all-or-nothing upsert of `MentionAliasesPayload`, answers 200 with the stored aliases) and `deleteMentionAlias` (`DELETE /api/mention-aliases/{mentionAliasId}`). Organization from the session; guarded by the content item keys. Requested by Blowhorn (blowhorn-ai/blowhorn#1318). Contract: `docs/mention-alias-contract.md`.

- **Profiles (v1beta3), additive**: the user a profile represents (`userId`) can read it without View Profiles (description only). New `getProfileConnectionMappings` (`GET /api/profiles/connections`) returns the connection links of every profile whose connections the caller may list (as `getProfileConnections`) in one paged `ProfileConnectionMappingPage`. `getProfileById` and `updateProfile` answer an `ETag`, and `updateProfile` accepts `If-Match` and answers 412 when stale. `getProfiles` takes `name` (exact, case-insensitive). `getProfileConnections` takes a repeatable `kind`. Requested by Blowhorn's profiles API migration (asks A1 to A5).

- **Connections (v1beta3)**: `Connection.organizationId` is required on read again, with a non-pointer Go type (`core.Uuid`, no `omitempty`). v1.3.105 made it nullable on read (`*core.Uuid`); that is withdrawn because an organization reference is never NULL. Servers backfill the organization of legacy connections they can trace and delete the rest. Consumers that adopted the v1.3.105 pointer type must move back to the value type. Contract: `docs/connection-design-organization-contract.md`.

- **Connections and designs (v1beta3)**: `Connection.organizationId` and `MesheryPattern.organizationId` (`meshery_patterns`) are required. The server assigns the organization from the session (`X-Current-Orgid`, then the selected organization). Write payloads do not accept it. `MesheryPattern.organizationId` and `ConnectionSummary.organizationId` are read-only. `Connection.organizationId` is not marked read-only, because the entity is inlined into registry registration requests and `readOnly` there drops unrelated fields from the generated RTK client. A workspace a design is assigned to must belong to the design's organization. Superseded v1beta1 connection and pattern shapes that live responses still embed gain an optional `organizationId`. Contract: `docs/connection-design-organization-contract.md`.

- **Events (v1beta3)**: `Event.organizationId` is required and read-only. The server assigns the organization (the session organization for a user action, the resource's organization for a system event, or the provider organization when a provider-level system event has no tenant) and `EventPayload` does not accept it. The `getEvents` page item (`EventResult`) carries it read-only. `GET /api/events/list` (`getEvents`) takes `scope` (`user`, the default, or `organization`). `organization` returns every member's events in the session organization and requires organization administration permission there; callers without it get 403. Contract: `docs/event-organization-contract.md`.

- **Organization (v1beta2)**: hierarchical organizations. Adds `GET` and `POST /api/identity/orgs/{orgId}/children` (`getChildOrgs`, `createChildOrg`), the closed `ChildOrganization` projection (`id`, `name`, `description`, `country`, `region`, `domain`, optional `parentId`, `createdAt`, `updatedAt`) and the `ChildOrganizationsPage` wrapper (`organizations`, `totalCount`), and declares `409` on `deleteOrg` for a parent that still has live children. The parent is the path; `OrganizationPayload` and the public organization read do not grow `parentId`. Contract: `docs/organization-hierarchy-contract.md`.

- **RTK Query**: error responses from Meshery Server (and any backend emitting MeshKit JSON errors) now surface structured fields on `error.meshkit` — `code`, `severity`, `message`, `probableCause`, `suggestedRemediation`, `longDescription`. Both `cloudBaseApi` and `mesheryBaseApi` wrap their `fetchBaseQuery` with a transform that maps the snake_case wire envelope (`error`, `code`, `severity`, `probable_cause`, `suggested_remediation`, `long_description`) to camelCase JS-side fields, leaving `error.data` (the raw body) untouched for backward compatibility. New exported types: `MeshkitError`, `MeshkitFetchBaseQueryError`. Pairs with the `meshery/meshery` server migration that promotes every non-2xx response from `text/plain` to `application/json`. See `docs/superpowers/plans/2026-04-24-plaintext-response-migration.md` in the meshery/meshery repo for full context.

## v1.1.0 — Phase 1 of the identifier-naming migration

Marks the completion of Phase 1 of the [identifier-naming migration](docs/identifier-naming-migration.md).
Phase 1 is governance- and tooling-only: no wire-format changes are made in this release.
The validator, advisory baseline, CI jobs, and docs have been realigned so that every
subsequent per-resource rollout (Phase 2 non-breaking alignment, Phase 3 versioned migrations)
has a single source of truth and a single rule surface to reason against.

### The canonical-casing contract

In one sentence: *wire is camelCase everywhere; DB is snake_case; Go fields follow Go
idiom; the ORM layer is the sole translation boundary.* Concretely, every JSON tag and
every OpenAPI schema property — DB-backed or not — is camelCase; the snake_case DB
column name lives only in `x-oapi-codegen-extra-tags.db`. URL path and query parameters
are camelCase with an `Id` suffix (`{orgId}`, `?userId=...`). The earlier conditional
rule "JSON tag matches `db:` tag when the field is DB-backed" has been retired. Legacy
resources retain their published wire casing until their next API-version bump; new
API versions adopt the canonical contract uniformly.

See [`docs/identifier-naming-migration.md` §1](docs/identifier-naming-migration.md) for
the full contract table and [`AGENTS.md` § Casing rules at a glance](AGENTS.md) for the
per-layer rules enforced by the validator.

### Phase 1 landings

- **1.A — `AGENTS.md` identifier-naming amendment** (#788): Replaced the "DB-backed =
  snake on the wire" rule with the canonical camelCase-on-wire contract; converted
  `page_size` / `total_count` from a perpetual exception to a deprecation list; added
  `§ Identifier-naming migration` pointing at the executable plan.
- **1.B — Rule 6 inversion / Rule 32 retirement** (#791): Rewrote the schema-property
  casing rule to require camelCase unconditionally; removed the DB-backing exception
  path and retired the superseded rule that enforced snake-on-DB-backed tags.
- **1.C — "Partial casing migrations forbidden" rule (Rule 45)** (#792): New rule
  walks every `components/schemas/<Entity>` and fails any struct that mixes JSON-tag
  conventions across its properties (camel + snake + `ID`). Catches the
  `OrgID`/`workspace_id`/`user_id` drift class on a single struct.
- **1.D — "Sibling-endpoint parameter parity" rule (Rule 46)** (#793): New rule
  flags `GET /api/<entity>` siblings that omit `orgIdQuery` when their peers declare
  it — the class of drift that produced the workspaces-400 incident.
- **1.E — Query-parameter casing (Rule 4 extension)** (#794): Extended the path-param
  casing rule to query parameters so `user_id`, `organizationId`, and any `orgID` that
  slips into `parameters: [{in: query}]` is flagged at the same severity as path
  parameters.
- **1.F — TypeScript consumer auditor** (#795): Added `validation/consumer_ts.go` and
  wired it into `make consumer-audit`. Parses RTK Query `builder.query` /
  `builder.mutation` call sites across `meshery/meshery/ui`, `meshery-cloud/ui`, and
  `meshery-extensions/meshmap` and reports three finding classes (`case-flip`,
  `snake-case-wrapper`, `snake-case-param`) against the schemas endpoint index.
- **1.G — Advisory baseline refresh** (#796): Regenerated
  `build/validate-schemas.advisory-baseline.txt` against the new rule surface so the
  `advisory-audit` CI job stays green while Phases 2–3 migrate each resource. The
  baseline is subtractive — any *new* violation introduced after this snapshot blocks
  CI.
- **1.H — CI workflow wiring** (#797): Adds a non-blocking `consumer-audit` job to
  `.github/workflows/schema-audit.yml` that checks out the downstream repos and runs
  `make consumer-audit` on every PR, posting divergence counts per downstream repo.
  Advisory-only; lands alongside this 1.I release.

### Dependency on this version

Every Phase 2 agent pins its target repo's `@meshery/schemas` dependency to this
version — no Phase 2 PR runs until this release is available on npm and as a Go module
tag. The Phase 3 per-resource rollouts (22 resources in parallel) likewise depend on
consumers reaching this version. Downstream repositories pin as follows:

```sh
# TypeScript / npm consumers (meshery, meshery-cloud, meshery-extensions UI):
npm install @meshery/schemas@1.1.0

# Go module consumers (meshery server, meshery-cloud server):
go mod edit -require github.com/meshery/schemas@v1.1.0
go mod tidy
```

After merging this release, downstream repos can begin Phase 2 non-breaking alignment
work (handler query-param casing, outbound URL alignment, local-type displacement) and
Phase 3 per-resource API-version authoring. See the [orchestration DAG in §11 of the
plan](docs/identifier-naming-migration.md) for the dependency ordering.

### Breaking changes

None. Phase 1 is a governance and tooling release; all wire contracts published in
prior releases remain accepted. Existing `json:"snake_case"` tags on DB-backed fields
in already-published API versions remain valid until their resource is migrated to a
new API version under Phase 3.

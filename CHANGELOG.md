# Changelog

See https://docs.meshery.io/project/releases

## Unreleased

- **OAuth consent requests (v1beta3), new construct**: cloud-only `oauth_consent_request` backs the consent page for dynamically registered OAuth clients. `getOauthConsentRequest` (`GET /api/identity/oauth/consent-requests?consentChallenge=...`) answers the pending `OauthConsentRequest` (`consentChallenge`, `client`, `requestedScopes`), whose `OauthConsentClient` names the client (`clientId`, `clientName`), where it can send the user in two deduplicated lists that are never both empty (`redirectHosts`, the network hosts of its https and loopback redirects, in IDNA A-label (punycode) form; `appSchemes`, the private-use schemes of its app redirects, so an app is never shown as a host; registration accepts a private-use scheme only when it is on the server-side app-scheme allowlist read from configuration, defaults `vscode` and `cursor`, so `appSchemes` only ever holds allowlisted schemes) and the `verified` mark, the only trust mark, derived only from the client's redirect targets and never from `clientName` or `clientId`: it is true only when every redirect URI of the client matches one operator-listed known-client entry (its https hosts or its app schemes). `acceptOauthConsentRequest` and `rejectOauthConsentRequest` (`POST .../accept`, `POST .../reject`) take `OauthConsentDecisionPayload` (`consentChallenge`, optional `remember`, default `false`) and answer `OauthConsentRedirect` (`redirectTo`), which the browser must navigate to. Only the signed-in user the challenge was issued for may read or decide it (`403`), a challenge is single use (`404` once decided or expired), an accept grants only what the client requested, and `verified` marks trust and never blocks. Refusals `400`, `403`, `404`, `500` and `503` (identity provider unreachable; on a decision the outcome is unknown, and a retry that answers `404` means it was already decided) carry the MeshKit JSON error body. The decisions are tagged `oauthConsentDecisions`, apart from the read's `oauthConsentRequests`, so the generated RTK client does not refetch the consumed challenge after a decision. Contract: `docs/oauth-consent-request-contract.md`.

- **Tokens (v1beta3), additive**: defines the token and session routes Meshery Cloud already serves on its bare router: `revokeToken` (`POST /revoke`) revokes an OAuth access or refresh token issued by the identity provider or a user-created API token, answering `200` (also for an unknown or already-revoked token), `400`, `500` when the OAuth2 server fails (an error response or unreachable), or `503` when signing keys or the token store are unavailable and the caller should retry; `introspectToken` (`POST /introspect`) checks an access token (`200`, `400` for a malformed or empty body, `401` for an invalid or revoked token, or `503` when it cannot be checked and the caller should retry), both taking the new `TokenPayload` with `security: []`, and `logoutUser` (`GET /logout`) signs a browser out through the new `sessionCookie` and `providerTokenCookie` cookie security schemes, answering `303` or `302` to `/login`, or an empty `500`. See `docs/http-api-design.md`.

- **Content items (v1beta3), approval on a content edit**: `updateContentItem` re-resolves an item's approval, with the rule insert uses, when a content edit changes `profile`, `rowNumber`, `data` (without the server-owned `Approved?` mirror), `rulesOfEngagement` or `mediaAssetIds` against the stored values. A write-back that sends the stored content unchanged is not an edit. When approval resolves to required, an approved item is reset to unapproved. Any content edit supersedes the item's open request, if any, and an item it leaves unapproved gets a fresh pending `content_item_approval` request for the content as it now is, whatever the resolved approval. When it resolves to not required, `approved` is kept and an approved item opens no request. `approvalRequired` and `approvalPolicySource` are rewritten on each such edit. Applies to every writer. Contract: `docs/content-item-contract.md`, "Approval on a content edit".

- **Content items (v1beta3), open-request invariant**: an unapproved live item (not soft-deleted) always has an open pending `content_item_approval` request. A soft-delete is the exception: it closes the request as `superseded` and opens none. Every write that leaves an item unapproved with none open opens one in the same transaction, whatever its resolved approval, including a policy change under either result and a write after a denial. Contract: `docs/content-item-contract.md`, "The open-request invariant".

- **Requests (v1beta3), superseded**: `RequestStatus` gains `superseded` (lowercase, final, like `approved` and `denied`). A content edit to an item whose request is pending closes that request as `superseded` in the same transaction: `decidedAt` is set to the edit time, `decidedBy` and `note` are omitted. A soft-delete of the item does the same, and opens no new request. `approveRequest` and `denyRequest` on a soft-deleted subject answer `409`. A fresh pending request opens for the content as it now is when the edit leaves the item unapproved, whatever the resolved approval. `approveRequest` and `denyRequest` answer `409` on a superseded request and change nothing. Contract: `docs/request-contract.md`, "Superseded requests".

- **Content items (v1beta3), approval on a policy change**: a change to `approvalPolicy` alone whose result is required (`required`, or `inherit` or absent, which resolves to required in the interim) resets an approved item to unapproved and opens a pending request in the same transaction (a pending request, if any, is kept). A change whose result is not required changes no `approved` and closes no request. Only a caller with Decide Content Item Approvals may make the change (existing `403` rule). Contract: `docs/content-item-contract.md`, "Approval on an `approvalPolicy` change".

- **Idempotency-Key, in flight**: a retry with the same `Idempotency-Key` that arrives while the first request with that key is still being processed answers `409` with the body `{code: idempotency_key_in_flight, message}` (`IdempotencyKeyInFlightError` in `v1beta2/core`) and creates nothing. Declared on `insertContentItem` and `createSchedule`, the latter through the shared `IdempotencyKeyInFlight` response in `v1beta2/core`. Only a final response that is not a `5xx` is stored: a `5xx` releases the key's claim, so a retry with that key is processed as new. An in-flight claim expires 24 hours after it was taken, the same TTL as the stored response; a retry after that is processed as new. Contract: `docs/mcp-operation-contract.md`, "`Idempotency-Key`".

- **Organization selector (hosted MCP operations)**: an operation that takes an organization in its path and does not declare `X-Current-Orgid`, such as `updateOrgSchedulePause`, checks that the caller is a live member of that organization, and a caller who is not receives `404`. The header rule covers only operations that declare `X-Current-Orgid`. Contract: `docs/mcp-operation-contract.md`, "The organization selector".

- **Content items (v1beta3), insert conflicts**: the insert's `409` is a JSON body whose `code` is `row_number_taken` or `thread_index_taken` (`ContentItemInsertConflict`), or, for an in-flight retry, `idempotency_key_in_flight` (the shared `IdempotencyKeyInFlightError` in `v1beta2/core`), so a client tells a permanent conflict from an in-flight retry. The shared `409` of update and delete no longer mentions the in-flight case.

- **Requests (v1beta3), subject gone**: `approveRequest` and `denyRequest` answer `404` when the subject content item is hard-deleted and `409` when it is soft-deleted, and change nothing in either case. Contract: `docs/request-contract.md`, "Deciding a request whose subject is gone".

- **Content items (v1beta3), approval source enum**: `approvalPolicySource` lists every planned level, in order `item`, `workspace`, `profile`, `organization`, `platform`, `fallback`. Only `item` and `fallback` are active during the interim; the other levels become active as the approval hierarchy lands.

- **Hosted MCP tools (schemas)**: new operation extension `x-mcp` (`expose`, optional `title`, required `scope`), defined by `schemas/extensions/mcp-operation.yaml` and enforced by validate-schemas Rule 48 (an `operationId`, a 2xx JSON response schema, a defined scope, the optional `X-Current-Orgid` header, never `approveRequest`, `denyRequest` or a DELETE). It marks exactly six reads: `listContentItems`, `getContentItem`, `getConnections`, `getEvents`, `getUser` (the account profile) and `getFeaturesByOrganization`. Seven generic OAuth scopes (`content:read`, `content:write`, `schedule:read`, `schedule:write`, `connections:read`, `events:read`, `account:read`) each name one new keychain; `build/oauth-scopes.json` maps scope to keychain to keys and `make generate-permissions` emits `OAuthScopeGrants` (Go) and `OAuthScopes` (TypeScript). New shared header parameters `currentOrgId` (`X-Current-Orgid`) and `idempotencyKey` (`Idempotency-Key`, optional, 24 hour replay) in `v1beta2/core`; `insertContentItem` and `createSchedule` take the latter. Contract: `docs/mcp-operation-contract.md`.

- **Build (permissions)**: `build/lib/permissions.js` now fails closed: generation throws when the OAuth scope map (`build/oauth-scopes.json`) is missing, instead of emitting empty scope outputs.

- **Content items (v1beta3), approval policy**: optional `approvalPolicy` on `ContentItem` and `ContentItemPayload`, an `ApprovalPolicy` enum of `required`, `not_required` and `inherit` with no default (absent means inherit). A caller without Decide Content Item Approvals gets 403 and nothing changes if it sends a value that would change the stored one: on insert, `required` or `not_required` (`inherit` and absent are accepted); on update, a value different from the stored one. Sending back the unchanged stored value is accepted. An explicit value wins. `inherit` or absent inherits from higher-level settings (platform, workspace, profile), hierarchy defined in https://github.com/layer5io/meshery-cloud/issues/6365, and approval is required when no level sets a value. Interim: until the upstream policies exist, `inherit` or absent resolves to `required` (source `fallback`), no higher level is read, and the user preference `agentsActWithoutApproval` (added by a separate PR) is not consulted. The effective approval is resolved at insert: a required item lands `approved` false with a pending `content_item_approval` request, and a not-required item lands `approved` true with no request. New read-only `approvalRequired` and `approvalPolicySource` on the entity, never in a payload, stored at insert in the `approval_required` and `approval_policy_source` columns so a later policy change does not alter them. Contract: `docs/content-item-contract.md`, Approval policy.

- **Content items (v1beta3), additive**: typed `approved` (boolean, server-set and read-only: in the entity, not in `ContentItemPayload`; an item whose approval is required lands unapproved and only `approveRequest` sets it) and server-set `createdByClient` (OAuth client ID of the AI app that created the item, not in the payload). The free-form `Approved?` data column stays readable for one release, mirrored by the server; a client-written `Approved?` never approves an item. Contract: `docs/content-item-contract.md`.

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

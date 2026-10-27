# HTTP API Design Principles

> Detailed reference extracted from the top-level agent instructions
> (`AGENTS.md` / `CLAUDE.md`). These rules govern how endpoints are
> structured and are enforced in part by `make validate-schemas`.

## HTTP method semantics

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
# WRONG - DELETE with a request body
delete:
  operationId: deletePatterns
  requestBody:
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PatternIds'

# CORRECT - POST sub-resource for bulk delete
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

## HTTP response codes

| Code | Meaning | When to use |
|---|---|---|
| 200 | OK | Request succeeded; body contains the result (queries, upserts, actions) |
| 201 | Created | A new resource was created; body contains the new resource |
| 202 | Accepted | Request received; operation will complete asynchronously |
| 204 | No Content | Request succeeded; no response body (e.g., a single-resource `DELETE`) |

Use **201** (not 200) for `POST` endpoints that exclusively create a new resource. Use **200** for upsert operations where the resource may already exist. A create `POST` that accepts an `idempotencyKey` (for example `createEvent`) answers **201** on first creation and **200** with the originally recorded resource when the same caller repeats the key.

Response descriptions and response message text must not include the word `successfully`. Use neutral wording such as `Connection deleted`, `Webhook processed`, or `Plans response`.

Error responses are shared: `schemas/constructs/v1beta2/core/api.yml#/components/responses` defines
`400`, `401`, `403`, `404`, `409`, `500` and `502` (bad gateway - an upstream service such as
GitHub could not be reached or rejected the request). Reference them - directly, or through an
alias under the construct's own `components/responses` as the v1beta3 design construct does -
rather than redefining an error response inline. The one exception is a shared response whose
description is wrong for the operation: the shared `409` reads "Publish request already exists",
so a construct whose conflict means something else (`claim`, `schedule`) declares its own `409` with the
same `text/plain` body and a description that names its conflict.

Those shared responses declare a `text/plain` body. An operation whose server answers its refusals
as a MeshKit JSON error body - `{error, code, severity, probableCause, suggestedRemediation}`, as
Meshery Cloud does from its GitHub integration, invitation-write, invitation-acceptance and
events-aggregate routes - references `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`,
`MeshkitError500` or `MeshkitError502` instead, which carry the `MeshkitError` schema as
`application/json`. The four design operations that reach GitHub use `MeshkitError403` and
`MeshkitError502` for those two refusals, and `registerConnection`/`updateConnection` use
`MeshkitError409`. Three existing contracts changed when these were introduced: the `403` and `502`
bodies of the four design operations - `refreshPatternFromSource`, `updatePatternSource`,
`importGithubRepository` and `getGithubRepositoryBranches` - the `400`, `403` and `500` bodies
of `createInvitation` and `updateInvitation` (plus `updateInvitation`'s `404`), and the `400`,
`404` and `500` bodies of `acceptInvitation` moved from `text/plain` to the MeshKit JSON
error body. The rest were new responses: the connection `409`, the `getEventsAggregate` `403`, and
the MeshKit refusals of the new `v1beta3/github` operations. Every other error response, including the
shared `401`, keeps its plain-text body. Descriptions name a MeshKit refusal by its meaning, never by its numeric `code`: codes
are the emitting service's internal allocation and are renumbered. Two generator constraints shape these:

- Every `$ref` to a `v1beta2/core` schema generates a Go reference into the unversioned
  `models/core` package, which is generated from `v1alpha1/core`. `MeshkitError` is therefore
  mirrored, identically, in `v1alpha1/core`, as `MapObject` and `Endpoint` are.
- Inside `v1beta2/core`, the `MeshkitError*` responses write their schema `$ref` in the
  external form (`../../v1beta2/core/api.yml#/components/schemas/MeshkitError`). Written as a local
  `#/...` ref, a consumer that aliases the response would generate an unqualified `MeshkitError`
  its own package does not define.

`validation/github_integration_contract_test.go` (`TestMeshkitErrorContract`) pins both.

### Rate limiting (429)

`MeshkitError429` in `v1beta2/core` is the shared rate-limit response: the `MeshkitError` JSON
body plus a required `Retry-After` header carrying the integer number of seconds the caller must
wait before retrying. Reference it, through a `MeshkitError429` alias under the construct's own
`components/responses`, from every operation whose server applies a per-user rate limit. Layer5
Cloud rate-limits the Blowhorn route families per user, so every operation of the v1beta3
`claim`, `schedule`, `ledger`, `content_item`, `event`, `profile`, `provider_capability` and
`blowhorn_health` constructs declares it, as do the desktop `registerConnection`,
`recordConnectionHeartbeat` and `deregisterDesktopConnection` connection operations. A client
that receives `429` waits `Retry-After` seconds and retries; it does not treat the response as a
refusal of the request itself. `validation/rate_limit_contract_test.go` pins the response and its
references.

## Resource grouping and path structure

Endpoints are grouped into logical categories under `/api`:

| Category prefix | Domain |
|---|---|
| `/api/identity/` | Users, orgs, roles, teams, invitations |
| `/api/integrations/` | Connections, environments, credentials |
| `/api/content/` | Designs, views, components, models |
| `/api/content-items` | Content items (kebab-case collection outside `/api/content/`; the deprecated `/api/content/pieces` alias is a Cloud routing concern, not in the schema) |
| `/api/entitlement/` | Plans, subscriptions, features |
| `/api/auth/` | Tokens, keychains, keys |
| `/api/system/` | Operational endpoints (database, version, session sync, adapters, meshsync, telemetry config, file IO, GraphQL transport) |

New endpoints must be placed in the appropriate category. Path segments must be kebab-case plural nouns matching the resource name.

### Declared paths are absolute - there is no implicit `/api` prefix

The path key in `api.yml` is the **complete path the server serves**, `/api` included. Nothing in
the bundler, the Go generator, or the RTK generator prepends a prefix at build time: whatever the
key says is verbatim what the generated client requests.

Getting this wrong does not fail the build and does not fail schema validation. It produces a
generated client that compiles, type-checks, and 404/405s at runtime against every environment.
That is exactly how `meshery/schemas#1123` happened - the v1beta3 event write operations were
declared as `/events*` while meshery-cloud serves them under `/api/events*`, so once meshery-cloud
switched from its hand-authored endpoint to the generated `useCreateEventMutation`, every
`create_session` audit event silently 405'd for three weeks.

Before adding or editing a path, confirm the served route in the consumer. In meshery-cloud, Echo
groups supply the prefix, so the registration line alone is not the served path:

```go
authedAPI := s.e.Group("/api")        // every route below is served under /api
authedAPI.POST("/events", ...)        // served path: /api/events
s.e.POST("/user/schedules", ...)      // served path: /user/schedules - no group, no prefix
```

`make consumer-audit` cross-checks declared paths against the routes it parses out of the consumer
repos. A path declared with the wrong prefix shows up on **both** sides of that report - as
`Spec only (no handlers)` for the path you declared, and as `Handler only (no spec)` for the path
the server actually serves. Two entries that differ only by a leading `/api` are that defect, not
two unrelated gaps.

`/api` is the convention for the authenticated API surface, but it is not universal. The
`schedule` construct's `/user/schedules` paths are declared without it because the server
genuinely registers them on the bare router outside the `/api` group. Match the server; do not
add `/api` reflexively.

Most `/api/system/` operations are Meshery-only (`x-internal: ["meshery"]`); they act on the running Meshery server instance itself rather than on a user-facing logical construct. Existing shared exceptions must be annotated truthfully, such as public version metadata exposed by both Meshery and Meshery Cloud. Some pre-existing `/api/system/*` paths use singular nouns (e.g. `/api/system/database`) and embed verbs (e.g. `/api/system/database/reset`); these predate the canonical kebab-case-plural convention and are documented as-implemented. New `/api/system/*` paths should still follow the canonical conventions.

### A construct is an RTK cache-tag boundary

The path prefix says which area serves an operation; the construct an operation is declared in
decides which RTK Query cache it joins. The bundler prefixes every operation tag with its
construct's `info.title` (`prefixTags` in `build/bundle-openapi.js`), so a `designs` tag in the
`Design` construct becomes the `Design_designs` cache tag, and the generated hooks provide and
invalidate only that prefixed tag. Constructs with different titles therefore never share a cache
tag, whatever their operations are tagged.

So declare an operation in the construct whose cache it must stay coherent with, even when its
path lives under another category. The GitHub import operations of the v1beta3 design construct
are the worked example: `getGithubImportedDesigns` and `importGithubRepository` are served under
`/api/integrations/github/`, but they list and write designs, so they are declared in
`v1beta3/design` with the `designs` tag. An import, a `refreshPatternFromSource` or an
`updatePatternSource` (source remap) then refetches every design list, and a `deletePattern`
refetches the imported-designs inventory, with no consumer-side tag wiring.

The tag picks the cache within a construct, so an operation that must stay out of it takes its own
tag. `getGithubRepositoryBranches` sits beside the import operations in `v1beta3/design` but reads
only GitHub, so it is tagged `github` (`Design_github`): a design write does not refetch the branch
list. `validation/design_github_import_contract_test.go` pins each operation's tag.

The GitHub integration operations that touch no design - the connection status, an installation's
repositories, a repository's file tree, the Kanvas workflow check and install, and the two browser
navigations of the authorization trip - are declared in their own `v1beta3/github` construct, so
they share the `GitHub_github` tag: a workflow install refetches the status, repository and tree
reads, and no design write refetches any of them. `validation/github_integration_contract_test.go`
pins them.

## GitHub integration: verified installations

Every Meshery Cloud GitHub integration operation acts only through the caller's own verified GitHub
App installations - the installations GitHub lists for the caller's own GitHub account when they
authorize the App, which the server stores on the caller's GitHub connection
(`GithubConnectionMetadata` in `v1beta3/github`). The contract that follows from it:

- A repository or installation the caller cannot reach that way is refused with one uniform `403`,
  whether the App is not installed on the repository's account or is installed there for someone
  else, so no route reveals where the App is installed. A distinct `403`, whose MeshKit
  error says the connection must be re-authorized, means the connection predates verification.
- The authorization trip starts at `startGithubAuthorization` (`GET
  /api/integrations/github/authorize?flow=install|authorize`), which issues a single-use state the
  callback (`githubAppCallback`) must present; the UI never links to GitHub directly. Both are
  browser navigations answering `302`, not data calls. The callback's `installation_id` and
  `setup_action` query parameters keep GitHub's names, the one deliberate exception to camelCase
  query parameters in the construct.
- `registerConnection` and `updateConnection` refuse with a `409` MeshKit error a write
  that would give a connection the GitHub App connection's identity (name `GitHub App`, sub_type
  `git`), and an edit of that connection cannot set or erase its server-written installation keys.

## Native client sign-in (loopback + PKCE)

Local native clients (CLIs, desktop agents) sign in with the RFC 8252 loopback
pattern bound by RFC 7636 PKCE, defined in `v1beta3/token`:

1. `GET /api/identity/native/authorize` requires the session cookie of a
   signed-in user and the Create Token permission. It validates `clientName`,
   `port`, `codeChallenge`, `codeChallengeMethod=S256` and `state`. Optional
   `client` and `clientVersion` name the client application and its version;
   when that version is below the provider minimum, an update page is rendered
   with `426` and nothing is issued. Otherwise the call stores a single-use
   code (60 second TTL) bound to the user, client name and challenge, then
   redirects to `http://127.0.0.1:{port}/callback?code=...&state=...`. The
   redirect host is always the 127.0.0.1 literal; no token or cookie is in the
   redirect, and no consent page is shown.
2. The client calls `POST /api/identity/native/token` with `code` and
   `codeVerifier`. The code is consumed on the first redemption attempt; on a
   verifier match an API token is minted with `name` and `purpose` set to the
   client name.

The construct is client-agnostic: no client is named in the schema.

## Schedules and claims

`v1beta3/schedule` serves organization schedules at `/api/schedules`, linked to workspaces through
`/api/workspaces/{workspaceId}/schedules[/{scheduleId}]`. A schedule is a job: an `action` with
a typed target (`targetType`, `targetId`) and `params`, a due time, an optional `recurrence`
(empty, `once`, `none`, `hourly`, `daily`, `weekly`, `monthly` or `every:<minutes>`) kept in an
IANA `timezone`, an owner (`createdBy`), a retry budget and a `status` (`pending`,
`scheduled`, `assigned`, `claimed`, `running`, `retrying`, `completed`, `failed`, `cancelled`).
The per-user `/user/schedules` routes of `v1beta2/schedule` remain as a deprecated alias for
Meshery Server's persist-schedules capability.

Workers take a schedule through a **claim**, the generic `v1beta3/claim` construct: a time-bound
hold by one connection (`claimantConnectionId`, on behalf of the session user
`claimantUserId`) on one resource (`resourceType`, `resourceId`), with `claimedAt`,
`expiresAt`, `renewedAt`, `status` (`active`, `released`, `expired`) and, once released, an
`outcome`. Released and expired claims are kept as history ([claim contract](claim-contract.md)). There
is one claim path: a schedule is claimed at `POST /api/claims` with `resourceType` `schedule`,
and renewed and released at `/api/claims/{claimId}/renew` and `/release`. The schedule carries its
live claim as the read-only `claim` field. Releasing a schedule's claim records the run's outcome
on the schedule in the same transaction (`lastRunAt`, `lastError`, `status`, `retryCount`,
`nextRunAt`), and deleting a schedule expires its live claim. `GET /api/schedules/{scheduleId}`
answers an `ETag`; send it as `If-Match` on `PUT` to make the update conditional (412 when stale).
The rules a consumer must enforce:

- The race is decided server-side in one statement; of two racing claimants exactly one wins.
- Only the holding connection renews. The holder (from any of its connections) or a member holding
  "Release claims of other members" releases; anyone else gets 409 and the claim is never taken back.
- A claim past `expiresAt` reads as `expired` and the resource is claimable again; at most one claim
  per resource is active in an organization.
- Only organization admins may set or lift the organization-wide pause. A create or update that
  changes `schedulePause` from anyone else is refused with 403. Omitting `schedulePause` from a
  preferences write keeps the current pause unchanged. Lifting it (`paused` false) clears
  `reason`, `pausedAt` and `pausedBy`, so a stored `paused` false never carries a stale pause.
- Pause state is data, never a path segment: a schedule is paused or resumed by setting `paused`
  (and optionally `pauseReason`) on `PUT /api/schedules/{scheduleId}`, and the organization-wide
  pause is set or lifted by updating the organization's preferences. There are no `/pause` or
  `/resume` routes.
- To change one preference member without resending the others, use
  `PATCH /api/identity/orgs/{orgId}/preferences` (`PreferencesPatchPayload`): a present member
  replaces that member, an omitted one stays unchanged. Send the `ETag` from the preferences read
  back as `If-Match` to make the write conditional (412 when the preferences changed since).
- On schedule payloads, the claim, `pausedAt`, `pausedBy`, `retryCount`, `lastRunAt`, `lastError`,
  `organizationId` and the timestamps are server-managed and ignored on input, not refused. A
  schedule payload accepts `status` only as `pending`, `scheduled` or `cancelled`, so the
  claim-set statuses are rejected. Organization preference writes use the closed
  `PreferencesPayload` (or the closed `PreferencesPatchPayload` on PATCH), whose `schedulePause` is
  `SchedulePausePayload` (`paused` required, `reason` only): an echoed `pausedAt` or `pausedBy` is
  refused with 400.
- Servers MUST omit `preferences.schedulePause` from the unauthenticated `getOrgByDomain` response.

`v1beta3/job_lease` was removed in favour of these two constructs; no consumer served or called it.

## Desktop app connections

A desktop app install registers as a connection of kind `desktop`, using the
registration, heartbeat and deregistration routes under
`/api/integrations/connections`. The request and response contract, including
the deduplication key, organization handling and `lastSeenAt` semantics, is
owned by `schemas/constructs/v1beta3/connection/api.yml` and
`DesktopConnectionMetadata` there.

## Provider capabilities document

`GET /{version}/capabilities` (`v1beta3/provider_capability`) is the first
call a native client makes after it authenticates. Besides the provider's
features and their endpoints, it carries `contractVersion` (`MAJOR.MINOR`;
a client refuses a different major) and, on an authenticated request that
sends `X-Current-Orgid`, `membership { organizationId, bound }`. The three
cases stay distinguishable: no `contractVersion` means an older provider, no
`membership` means the request was not authenticated or named no
organization, and `bound: false` means the caller is signed in but not a live
member. A client that sends `client` also receives `compatibility`, whether
its `{version}` meets the provider's minimum for that client; an outdated
client still gets `200` with `compatible: false` and must update before it
registers or keeps a connection alive. An authenticated request also receives
`session` (the caller's roles, plan and entitlements, and the organization's
plan, entitlements and device usage for a live member of `X-Current-Orgid`).
A client reads paths from `capabilities` instead of hard-coding them, and does
not use a separate health endpoint.

## Ledgers

`v1beta3/ledger` is one generic, organization-scoped construct for "has this
been done" sets shared by several workers. Record is `POST
/api/ledgers/{ledger}/entries` and is idempotent on (organization, ledger,
entryKey): `201` for a new key, `200` with the stored entry, unchanged, for an
existing one.

`POST /api/ledgers/{ledger}/claims` (body: `entryKey`, `connectionId`,
optional `value`) gives a key to exactly one connection. `connectionId` must be
the caller's own live connection in the session organization (for example the
connection a desktop client registered for its machine); any other connection
is `404`. `value` is stored only when the claim creates the entry and is
ignored otherwise. The claim lives on its own collection so it cannot collide
with the `{entryKey}` route. It returns `201` when it created the entry, `200`
when the connection now holds an existing entry or already held it, and `409`
when another live connection holds it. The holder is returned as
`claimedByConnectionId`, a reference to `connections.id`; a claim ends when the
entry is deleted or the holding connection is deleted.

`GET`, `PUT` and `DELETE /api/ledgers/{ledger}/entries/{entryKey}` read,
replace and release a key; a key outside that ledger is `404`. `PUT`
(`updateLedgerEntry`) replaces `value` wholesale and advances `updatedAt`
(strictly increasing, so it works as a version token). It never changes
`entryKey`, `claimedByConnectionId`, `claimedAt`, `createdAt` or `id`, does
not create a missing key, and does not check who holds a claim. Optional
`expectedValue` and `expectedUpdatedAt` make the write conditional: JSON
equality for the value (key order and whitespace do not matter) and exact
equality for `updatedAt`. Both may be sent, and then both must hold. With
neither, the update is unconditional. A mismatch is `412` and changes
nothing. Recording still never changes an existing entry; changing a value
is this update. Product data such as contacts is a
ledger with a composite key (for example `platform:handle`) and a JSON value,
not its own route tree.

`GET /api/ledgers/{ledger}/entries` (`listLedgerEntries`) lists a ledger with
the shared list conventions: the core `page`, `pageSize`, `search` and `order`
parameters and a `LedgerEntryPage` envelope (`page`, `pageSize`, `totalCount`,
`ledgerEntries`). `search` matches entry keys containing the term, ignoring
case; `order` takes `entryKey`, `createdAt` or `updatedAt` and defaults to
`entryKey asc`. An empty ledger is an empty page; a non-member gets `404`.

Ledgers are organization-shared bookkeeping: any member of the session
organization may record, claim, list, read, update and delete. A claim is
bound to a connection the caller owns, so one member cannot claim on behalf
of another member's machine; a delete or an update is not checked against
who holds the key.

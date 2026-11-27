# MCP operation contract (`x-mcp`)

The hosted MCP server builds its tools from the schemas in this repository,
not from hand-written code. An operation becomes a tool when it carries the
operation-level extension `x-mcp`. This page is the contract for that
extension, the OAuth scopes it names, and the lint that enforces it.

## Where the pieces live

| Piece | Location |
| --- | --- |
| The shape of the `x-mcp` value (JSON Schema) | [`schemas/extensions/mcp-operation.yaml`](../schemas/extensions/mcp-operation.yaml) |
| The scope strings | `definitions.McpScope.enum` in the same file, defined once |
| Scope to keychain to permission keys | [`build/oauth-scopes.json`](../build/oauth-scopes.json) |
| The keychains and the keys | `build/permissions.csv` (Security Management / Keychains, and the key rows) |
| The generated map | `OAuthScopeGrants` in `models/permissions` (Go), `OAuthScopes` in `typescript/permissions.ts` |
| The lint | validate-schemas Rule 48, `validation/rules_mcp.go` |

**Why not `schemas/constructs/v1beta3/mcp/`.** A construct directory is
discovered by its `api.yml`: the Go validator walks every construct for entity
files, templates and an `api.yml`, and the bundler and generators discover
packages by `api.yml`. A directory with a JSON Schema and a README but no
`api.yml` would be validated as an entity with no templates. `x-mcp` is an
extension, not a construct, so its schema sits under `schemas/extensions/`,
next to `schemas/constructs/` inside the embedded `schemas` tree (so a Go
server can read it through `schemas.Schemas`), and this page lives in `docs/`
with the other contracts.

## The extension

```yaml
get:
  operationId: listContentItems
  x-internal: ["cloud"]
  x-mcp:
    expose: true
    title: List content items
    scope: content:read
    description: >-
      Read-only. Returns a paginated list of the live content items ...
  parameters:
    - $ref: "#/components/parameters/currentOrgId"
```

| Field | Type | Meaning |
| --- | --- | --- |
| `expose` | boolean, required | The hosted server lists and serves the operation as a tool. `false` keeps it annotated and hidden. Same name as the local MCP server's `x-mcp.expose`. |
| `title` | string, optional | Tool title shown to the person connecting an AI app. Defaults to the operation's `summary`. |
| `description` | string, optional, 1-2000 characters | The tool description shown to the connecting app. When present it replaces the operation's OpenAPI `description` (or `summary` when there is none); when absent the tool falls back to those. |
| `scope` | enum, required | The OAuth scope a token needs to call the operation. |

The value is closed: `expose`, `title`, `scope` and `description` are the only
keys. There is no `readOnly` or `destructive` flag, and the
lint refuses one.

**The tool name is the `operationId`.** **Hints derive from the HTTP method**:
GET is read-only, POST and PUT are not destructive, and a create that declares
the `Idempotency-Key` header is idempotent. Nothing is written by hand.

**Descriptions.** MCP clients never see HTTP response headers; the hosted
server maps only the JSON body into the tool result. A shared OpenAPI
description may therefore say things that are true of the HTTP API and wrong
for a tool (`getScheduleById` names the `ETag` header). `x-mcp.description`
is the MCP-facing text, so the shared description stays accurate for HTTP
clients. Every GET tool's MCP description starts with "Read-only." (Rule 48
enforces it), and must not advertise an HTTP-only header such as `ETag` unless the tool
result actually includes it. Every operation annotated today sets one.

## What the lint enforces (Rule 48)

An operation with `x-mcp` fails `make validate-schemas` unless:

1. It has an `operationId`.
2. It has a 2xx response whose `application/json` content has a schema (the
   tool's output schema).
3. `scope` is present and is one of the defined scopes.
4. It is not `approveRequest` or `denyRequest`. Approving and denying a
   request is a human act in the app and never a tool, so an AI app cannot
   decide its own request.
5. It is not a DELETE. The hosted server exposes no delete tool.
6. It accepts the optional `X-Current-Orgid` header (below).
7. Its value matches the extension schema: `expose` is a boolean, `title` is a
   non-empty string when present, `description` is a non-empty string of at
   most 2000 characters that, on a GET, starts with "Read-only." when present, and no
   other key appears.

The rule scans every non-deprecated construct `api.yml` of every version, not
only the newest version of each construct, because an operation can be served
from an older version (`getUser` is in `v1beta2/user`). A spec that fails to
load is reported as a blocking Rule 12 violation by the main audit and is
excluded from this scan to avoid a duplicate Rule 48 finding, so a broken spec
cannot silently hide unchecked operations; only a spec that loads and carries
`x-deprecated` is skipped. The tests are in
`validation/rules_mcp_test.go` (each failure case and the passing case) and
`validation/mcp_operation_contract_test.go` (the real tree).

## The nine operations that carry it

| `operationId` | Version | Route | Scope |
| --- | --- | --- | --- |
| `listContentItems` | v1beta3/content_item | `GET /api/content-items` | `content:read` |
| `getContentItem` | v1beta3/content_item | `GET /api/content-items/{contentItemId}` | `content:read` |
| `getConnections` | v1beta3/connection | `GET /api/integrations/connections` | `connections:read` |
| `getEvents` | v1beta3/event | `GET /api/events/list` | `events:read` |
| `listSchedules` | v1beta3/schedule | `GET /api/schedules` | `schedule:read` |
| `getScheduleById` | v1beta3/schedule | `GET /api/schedules/{scheduleId}` | `schedule:read` |
| `getUser` | v1beta2/user | `GET /api/identity/users/profile` | `account:read` |
| `getFeaturesByOrganization` | v1beta1/feature | `GET /api/entitlement/subscriptions/organizations/{orgId}/features` | `account:read` |
| `getPlatformSessions` | v1beta3/connection | `GET /api/integrations/platform-sessions` | `connections:read` |

`getPlatformSessions` answers "where is this social account signed in?"; its
contract is [platform-session-contract.md](platform-session-contract.md).

`getUser` is the account profile read. Its published `operationId` is
`getUser`, and renaming a published operation changes generated client names,
so the tool is named `getUser` and its `title` says "Get the current user
profile". A test pins this set: a later change that adds a tool adds one
annotation and one line to that test.

## Scopes are keychains

A scope is a keychain (decision 6 of the hosted MCP design). Each scope names
exactly one new keychain, and the keychain carries the existing permission keys
its tools need. A token's effective keys are the user's keys in the request's
organization intersected with the keys of the keychains its scopes name.

| Scope | Keychain | Keys it carries |
| --- | --- | --- |
| `content:read` | Content View | View Content Items |
| `content:write` | Content Edit | Create Content Item, Edit Content Item |
| `schedule:read` | Schedule View | View Schedules |
| `schedule:write` | Schedule Edit | Create schedule, Edit schedule, Pause schedules |
| `connections:read` | Connection View | View Connections (Workspace Management) |
| `events:read` | Event View | View Events |
| `account:read` | Account View | View Profile |

Rules the map keeps (`validation/mcp_operation_contract_test.go`):

- The scope set in `build/oauth-scopes.json` equals the enum in the extension
  schema.
- Every keychain is defined in `build/permissions.csv` and no two scopes share
  one.
- No scope carries a delete key, and none carries a key that decides a
  request (`Decide Content Item Approvals`), so no AI app can approve.
- No scope, keychain or key name contains a product name.

`make generate-permissions` reads the map and emits `OAuthScopeGrants` (Go) and
`OAuthScopes` (TypeScript). It fails when a scope names a keychain or key the
permissions source does not define.

**Routes with no key today.** Connections, events and the organization
features are not gated by a permission key in Cloud (membership only). The
seeds above are the closest existing keys. Until Cloud keys them (decision 12,
U9 step S4), a token scoped to `connections:read` or `events:read` is refused
outright with 403 on those routes: layer5io/meshery-cloud#6369 installs a
default-deny gate, so a scoped token on a route that makes no permission-key
decision is refused there. `account:read` does not cover
the organization features read until then.

## The organization selector

Every `x-mcp` operation accepts the optional `X-Current-Orgid` header, the
organization the call acts in (decision 5). It is defined once, as
`components.parameters.currentOrgId` in `v1beta2/core/api.yml`, and each
construct aliases it with a `$ref`. Cloud's membership and permission checks
run in that organization exactly as for any other call.

**How the acting organization is resolved.** A server resolves it per request,
in this order:

1. the `X-Current-Orgid` header (the `organizationId` tool argument), when sent;
2. otherwise the path or query `orgId`, on an operation that takes one, when sent;
3. otherwise the caller's selected organization, when it is not nil;
4. otherwise server-side defaulting among the caller's live memberships.

When exactly one live organization qualifies, it is used. A server never uses
an organization the caller is not a live member of. When the call needs an
acting organization, the caller named none and several qualify, an operation
that declares the `OrganizationSelectionRequired` response answers `409` with
the body
`OrganizationSelectionRequiredError` in `v1beta2/core`: `code` is always
`organization_selection_required`, `message` is the sentence the caller is
shown, and `choices` lists at least two of the caller's own live organizations,
each with its `id`, `name` and `description` (the fields of the
`AvailableOrganization` row of `GET /api/identity/orgs`). The caller repeats
the call with one `choices[].id` as `X-Current-Orgid`. Like the in-flight body
it is not a `MeshkitError`, because a MeshKit `code` is an unstable
component-scoped identifier. Each `choices` item is an
`OrganizationSelectionChoice`, a named schema in `v1beta2/core` mirrored
identically in `v1alpha1/core`, so generated Go carries a named struct and
`choices` is a slice of it. Generated TypeScript exports the standalone
`OrganizationSelectionChoice` type, but its generator dereferences every `$ref`,
so `OrganizationSelectionRequiredError.choices` there is still the inline
`{id, name, description}` shape, structurally identical to the named type.
`OrganizationSelectionChoice` copies the `id`, `name` and `description` fields
of `AvailableOrganization` rather than referring to it, since the organization
construct refers to core and a reference back would be a cycle.

A missing organization is never answered `401`: `401` stays reserved for token
and audience failures. Every hosted read that accepts `X-Current-Orgid` declares
the `409` through the shared `OrganizationSelectionRequired` response in
`v1beta2/core`, aliased in each construct. `getFeaturesByOrganization` does not,
because its path `orgId` always names the acting organization. Declaring the
`409` does not oblige an operation to demand an organization: a call that can
run without one, such as `getUser`, runs without one. `TestOrganizationSelectionRequiredIsDeclared`
pins the body, the named `OrganizationSelectionChoice` item and its
`v1alpha1/core` mirror, and the declaration.

`getUserCredentials` (`GET /api/integrations/credentials`, `v1beta2/credential`)
is not a hosted MCP read but follows the same selector. It lists the caller's own
credentials in the acting organization (designated for it via `orgOwner`, or used
by the owner's own live connection in it) plus credentials linked to no
organization. It takes `X-Current-Orgid` and declares `403` (no organization
qualifies), `404` (the named organization is not one the caller is a live member
of, the same answer as an unknown one) and the shared `409`.
`TestGetUserCredentialsDeclaresOrganizationSelection` pins it.

An operation that also takes an organization in its path or query (`orgId`:
`getFeaturesByOrganization` in its path, `getConnections` in its query) must
name the same organization as `X-Current-Orgid` when both are sent. A mismatch
answers `400` and returns nothing; neither value wins, so the header never
overrides the path or query `orgId`. When the header is omitted, a path or
query `orgId` that is sent names the acting organization: it is still subject
to the live-membership rule and does not have to equal a selected organization.
The comparison, when both are sent, is on the parsed UUID and is
case-insensitive, so the same organization written in upper or lower case
matches; the raw strings are never compared. Both operation descriptions
reference this section and declare the `400`. A `403` on these operations is a
membership or permission refusal, not a mismatch against a selected organization.

A UUID-constrained parameter that is not a UUID answers `400` on every hosted
read: `X-Current-Orgid` on every x-mcp read, `threadId` on `listContentItems`. Each
hosted read declares the `400`, as does `getRequest` for `requestId`.

This rule covers the operations that declare `X-Current-Orgid`. An operation
that takes an organization in its path and does not declare the header, such
as `updateOrgSchedulePause`, checks instead that the caller is a live member of
the organization in its path: a caller who is not receives `404`, the same
answer as an unknown resource, and the operation's permission check runs in
that organization.

## `Idempotency-Key`

`components.parameters.idempotencyKey` in `v1beta2/core/api.yml` is an
optional header on `insertContentItem` and `createSchedule`. The server keeps
the organization, the user, the key, a hash of the request and the final
response for 24 hours. Only a final response that is not a `5xx` is stored:

- the same key with the same request hash returns the stored response and
  creates nothing again;
- the same key with a different request hash answers `422` and creates nothing;
- a retry with the same key that arrives while the first request with that key
  is still being processed answers `409` and creates nothing; once the first
  request has finished without a `5xx`, a retry receives the stored response, and
  after a `5xx` a retry is processed as new;
- a `5xx` is answered only after the server has rolled back the write. A `5xx`
  it answers is not stored: it releases the key's claim, so a retry with the
  same key is processed as new. A response the server has committed is final
  and is stored, even if a gateway in front of the server later fails the
  client's connection;
- no key means no deduplication.

**Precedence.** While the first request with a key is in flight, every retry
with that key answers `409` whatever its body. Only once the first request has
finished does a retry with a different body answer `422`.

**In-flight expiry.** An in-flight claim lasts 24 hours from when it was taken,
the same TTL as the stored response. The repository has no shorter in-flight
lease. If the first request never finishes (its process died, say), its claim
expires after those 24 hours, and a retry after that is processed as new. Until
then, every retry with that key answers `409`.

**The `409` body.** The in-flight `409` is a JSON body of its own,
`IdempotencyKeyInFlightError` in `v1beta2/core`: `code` is always
`idempotency_key_in_flight` and `message` is the sentence the caller is shown.
It is not a `MeshkitError`, because a MeshKit `code` is an unstable
component-scoped identifier and cannot carry a contract value. Clients tell the
in-flight case by that `code`.

- `createSchedule` declares the shared `IdempotencyKeyInFlight` response, which
  carries that body.
- `insertContentItem` declares its own `InsertConflict` response. Its body is
  either `ContentItemInsertConflict`, whose `code` is one of the two permanent
  codes, or the shared `IdempotencyKeyInFlightError` from `v1beta2/core`, whose
  `code` is `idempotency_key_in_flight`. The permanent codes are the insert's
  other `409`s: `row_number_taken` for a `rowNumber` a live item holds, and
  `thread_index_taken` for a `threadIndex` a live item of the same thread holds.
  The in-flight code is distinct from both.

Both operations declare the `422` and the `409` responses. A test pins that
only those two operations declare the header, that both declare the `409`, and
that the in-flight code is declared on both and is distinct from the permanent
insert codes.

## Adding a tool

1. Add `x-mcp` to the operation, with a `scope` from the table.
2. Add the optional `currentOrgId` parameter.
3. Run `make validate-schemas`. Rule 48 names anything missing.
4. Add the operation to `hostedMcpReads` in
   `validation/mcp_operation_contract_test.go`.

A new scope is a new keychain: add the keychain and keys to
`build/permissions.csv` (and the canonical sheet), the scope to the extension
schema enum and to `build/oauth-scopes.json`.

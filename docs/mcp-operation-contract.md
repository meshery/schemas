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
  parameters:
    - $ref: "#/components/parameters/currentOrgId"
```

| Field | Type | Meaning |
| --- | --- | --- |
| `expose` | boolean, required | The hosted server lists and serves the operation as a tool. `false` keeps it annotated and hidden. Same name as the local MCP server's `x-mcp.expose`. |
| `title` | string, optional | Tool title shown to the person connecting an AI app. Defaults to the operation's `summary`. |
| `scope` | enum, required | The OAuth scope a token needs to call the operation. |

The value is closed. There is no `readOnly` or `destructive` flag, and the
lint refuses one.

**The tool name is the `operationId`.** **Hints derive from the HTTP method**:
GET is read-only, POST and PUT are not destructive, and a create that declares
the `Idempotency-Key` header is idempotent. Nothing is written by hand.

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
   non-empty string when present, and no other key appears.

The rule scans every non-deprecated construct `api.yml` of every version, not
only the newest version of each construct, because an operation can be served
from an older version (`getUser` is in `v1beta2/user`). The tests are in
`validation/rules_mcp_test.go` (each failure case and the passing case) and
`validation/mcp_operation_contract_test.go` (the real tree).

## The six operations that carry it

| `operationId` | Version | Route | Scope |
| --- | --- | --- | --- |
| `listContentItems` | v1beta3/content_item | `GET /api/content-items` | `content:read` |
| `getContentItem` | v1beta3/content_item | `GET /api/content-items/{contentItemId}` | `content:read` |
| `getConnections` | v1beta3/connection | `GET /api/integrations/connections` | `connections:read` |
| `getEvents` | v1beta3/event | `GET /api/events/list` | `events:read` |
| `getUser` | v1beta2/user | `GET /api/identity/users/profile` | `account:read` |
| `getFeaturesByOrganization` | v1beta1/feature | `GET /api/entitlement/subscriptions/organizations/{orgId}/features` | `account:read` |

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
seeds above are the closest existing keys. A token scoped to
`connections:read` or `events:read` has nothing to narrow on those routes until
Cloud keys them (decision 12, U9 step S4), and `account:read` does not cover
the organization features read until then.

## The organization selector

Every `x-mcp` operation accepts the optional `X-Current-Orgid` header, the
organization the call acts in (decision 5). It is defined once, as
`components.parameters.currentOrgId` in `v1beta2/core/api.yml`, and each
construct aliases it with a `$ref`. Cloud's membership and permission checks
run in that organization exactly as for any other call.

## `Idempotency-Key`

`components.parameters.idempotencyKey` in `v1beta2/core/api.yml` is an
optional header on `insertContentItem` and `createSchedule`. The server keeps
the organization, the user, the key, a hash of the request and the response
for 24 hours:

- the same key with the same request hash returns the stored response and
  creates nothing again;
- the same key with a different request hash answers `422` and creates nothing;
- no key means no deduplication.

Both operations declare the `422` response (plain text). A test pins that only
those two operations declare the header.

## Adding a tool

1. Add `x-mcp` to the operation, with a `scope` from the table.
2. Add the optional `currentOrgId` parameter.
3. Run `make validate-schemas`. Rule 48 names anything missing.
4. Add the operation to `hostedMcpReads` in
   `validation/mcp_operation_contract_test.go`.

A new scope is a new keychain: add the keychain and keys to
`build/permissions.csv` (and the canonical sheet), the scope to the extension
schema enum and to `build/oauth-scopes.json`.

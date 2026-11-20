# Platform session contract

A social account that Blowhorn acts as lives in a browser session on one
computer. Cloud already knows the account (a connection of kind `x`,
`linkedin` or `reddit`, mapped to a profile) and the computer (a `desktop`
connection with a host name and a heartbeat). It did not know which computer
holds which account, in which Chrome profile, or when the sign-in was last
checked. This contract adds that link, so an agent connected to the hosted MCP
server can answer "where is X @blowhorn_ai signed in?".

Everything here is in `schemas/constructs/v1beta3/connection/api.yml`.

## The pieces

| Piece | Operation | Who calls it |
| --- | --- | --- |
| The report | `PUT /api/integrations/connections/desktop/{installationId}/platform-sessions` (`reportDesktopPlatformSessions`) | the desktop app, with its own API token |
| The answer | `GET /api/integrations/platform-sessions` (`getPlatformSessions`, `x-mcp`, scope `connections:read`) | an agent, through the hosted MCP server |

No new store: the report is kept in the `desktop` connection's metadata, in the
two server-written fields `platformSessions` and `platformSessionsReportedAt`,
as `tokenId` is. A `desktop` registration and `updateConnection` both ignore a
value for either (the server carries them forward from the stored row), so a
reconnect or an edit never wipes a report; only the report writes them.

## What a session carries

`PlatformSession` is the unit, and the only one the desktop writes:

| Field | Meaning |
| --- | --- |
| `platform` | `x`, `linkedin`, `reddit`, and so on, lowercase |
| `handle` | the account handle without a leading `@`; absent when the check could not read it |
| `state` | `signed_in`, `signed_out` or `unknown` |
| `lastVerifiedAt` | when the install last checked the sign-in |
| `blowhornProfile` | the name of the Blowhorn profile the account is mapped to on that computer |
| `chromeProfile` | `directory` (for example `Profile 1`) and `displayName`, the Chrome profile that holds the sign-in |
| `identity` | `ok`, `drift`, `missing` or `unknown`: whether the Chrome profile still shows the expected account |
| `socialConnectionId` | the id of the connection that is the account itself, when mapped |

The desktop builds each entry from what it already reads locally: `profile
status --check-platform`, `chrome profiles` and `profile accounts`. The schema
is the contract; the desktop projects its own output onto it.

## Never in a session

A cookie, a token, a credential, a session directory path, a lock pid, or the
Google account email of a Chrome profile. Every shape sets
`additionalProperties: false`, so a body that names any other key is refused,
`handle`, `blowhornProfile` and `displayName` refuse an `@` so an email cannot
ride in them, and `TestPlatformSessionShapesCarryNoSecrets` fails when a
property with a secret-looking name is added.

## Tenancy

Multi-tenancy is enforced in Blowhorn Cloud and nowhere else. The hosted
gateway and the MCP tool pass the caller's token and the organization selector
(`X-Current-Orgid`, the tool's `organizationId` argument) through unchanged and
filter nothing. Cloud runs the same membership and permission checks as
`getConnections`:

- the organization is the selector's, else the caller's selected one;
- a caller who is not a live member of it gets `404`, as for an unknown
  organization;
- a member without the permission for the route gets `403`;
- only sessions reported by `desktop` connections of that organization that
  the caller may see are returned: the caller's own installs, and every
  install in the organization for an administrator. Another user's install is
  never returned to a non-administrator, and no filter widens that scope;
- the report is scoped the same way: an install reports only to the caller's
  own connection, in one organization, and a connection of another user is 404.

The permission is `View Connections` (Workspace Management), the key behind the
`connections:read` scope. Cloud does not key Connections routes today (see
[mcp-operation-contract.md](mcp-operation-contract.md), "Routes with no key
today"), so Cloud must key both new routes with it; until then the default-deny
gate refuses a scoped token with 403 on the read.

Cloud tests must show each of these, and at least the three that matter most:
another user's install is never returned to a non-administrator, a
non-member organization is 404, and a member without permission is refused.
`totalCount` is counted after the scoping and the filters, so it never reveals
another user's installs. Rows are ordered by `lastVerifiedAt` (the install's
own clock), newest first, then by `connectionId`, `platform` and `handle`.

## Read rules

`getPlatformSessions` reads `metadata.platformSessions` of the session
organization's live `desktop` connections and returns of their metadata only
those sessions, `platformSessionsReportedAt`, `hostname`, `os` and
`lastSeenAt`. (`getConnections`, also a tool, returns a connection's full
metadata, `platformSessions` included, to its owner and organization admins:
the same visibility.) It follows the visibility rule of `DesktopConnectionMetadata`: a
caller sees the connections it owns and, as an organization admin, all of the
organization's. The
computer's `status` and `lastSeenAt` follow the heartbeat rule, so a client can
tell that a session was reported by a computer that is offline now.

`state: signed_in` with an old `lastVerifiedAt` is a claim, not proof. A client
that needs a fresh answer asks the computer to check (a write, which no hosted
tool does today).

## Example answer

```json
{
  "locations": [
    {
      "desktop": {
        "connectionId": "0b9c1f7e-3d4a-4e8b-a6c2-5f7d8e9a1b23",
        "installationId": "3f1c2d4e-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
        "hostname": "MacBook-Air.local",
        "os": "macos",
        "status": "connected",
        "lastSeenAt": "2026-11-20T21:31:10Z",
        "reportedAt": "2026-11-20T21:30:02Z"
      },
      "session": {
        "platform": "x",
        "handle": "blowhorn_ai",
        "state": "signed_in",
        "lastVerifiedAt": "2026-11-20T21:30:00Z",
        "blowhornProfile": "blowhorn",
        "chromeProfile": { "directory": "Profile 1", "displayName": "Blowhorn" },
        "identity": "ok"
      }
    }
  ],
  "totalCount": 1,
  "page": 0,
  "pageSize": 10
}
```

An account that no computer reported answers `{"locations": [], "totalCount": 0, ...}`.
That means "no report", not "signed out": the account may be signed in on a
computer whose app has not reported yet.

## What each owner does

- **Schemas (this repository)**: the contract, the lint and the tests.
- **Cloud**: validate and store the report (replace in full, owner-scoped,
  organization-scoped, 404 when nothing matches, 400 for duplicates, an
  unknown `socialConnectionId` or an extra key, 403 for an MCP-only token),
  carry the two fields forward in a registration and in `updateConnection`,
  key both routes with `View Connections`, serve `getPlatformSessions` with the
  visibility rule, and add the tool to the hosted catalog.
- **Desktop app**: send the report after each session check and after each
  Chrome mapping change, and once on connect.
- **Hosted MCP gateway and docs**: nothing in the Worker (it forwards the
  tool unchanged); the tool list and counts in the public docs change when
  Cloud serves the tool.

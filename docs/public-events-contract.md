# Public events projection contract

`GET /api/public/events` (operationId `getPublicEvents`, v1beta3 `event`
construct) serves a public projection of recent completed scheduled runs
without authentication, as social proof on public sites. It is not a
separate construct: `PublicEvent` and `PublicEventPage` live in
`schemas/constructs/v1beta3/event/api.yml`, as `PublicUser` lives in the
user construct.

## Source data

There is no table of its own. Producers record each completed run through
the existing events tracker, `POST /api/events`, with category `schedule`,
action `completed`, and these free-form metadata keys:

| Key | Required | Use |
| --- | --- | --- |
| `platform` | yes | served as `platform` |
| `role` | yes | served as `role` |
| `roleResult` | yes | served as `roleResult` |
| `networks` | no | served as `networks` (array of names) |

The server serves only category `schedule` and action `completed`. The
optional `category` and `action` query parameters accept only those values.
Raw `metadata` and `description` are never served. A stored event whose
metadata lacks a valid `platform`, `role` or `roleResult` is skipped; it
never fails the response.

## Identity

Identity comes from the authenticated caller, never from event metadata.
For events with category `schedule` and action `completed`, the server sets
the event's `owner` to the authenticated caller, overriding any client-sent
value. `PublicEvent.owner` is that event owner. The organization is the
event's server-set acting organization, if any.

## Ordering

Newest first by the event's server-recorded `createdAt`. No completion time
from metadata orders the response.

## Visibility

Visibility is a public/private setting kept in the user's existing
free-form preferences; this repository defines no typed field for it.
`public` shows the user's runs; `private` excludes them. Absent means
`public`, but only for a live user: runs of a deleted user are never
served. The preference is read live on every fetch and never snapshotted
into events. A failed read of the setting is not absence: that user's runs
are omitted. When a user switches to `private`, all of their runs drop out
of the next response the server builds; a shared cache may keep serving the
previous body until its max-age (30 seconds or less) expires. The exact
preference key is defined by the server that stores preferences.

## PublicEvent fields

Always: `id` (the event ID), `category`, `action`, `owner`, `createdAt`,
`platform`, `role`, `roleResult`. Optional: `networks`.

Resolved at read time: `displayName` (the user's public username, same as
`PublicUser.username`, never a real name), `avatarUrl`, `publicProfileUrl`,
`organizationName` (omitted when the event has none or it no longer
resolves).

Email addresses, real names, raw metadata and description are never served.

## Transport

- No auth.
- Per-IP rate limit; 429 with `Retry-After` over the limit.
- Paginated: `page` and `pagesize` query parameters (`pagesize` 1 to 50,
  default 20; never more than 50 items), plus `order`. Response
  `PublicEventPage` with `page`, `pageSize`, `totalCount` and `data`.
- `Cache-Control: public, max-age=N` always sent, N 30 or less; 30 by
  default.

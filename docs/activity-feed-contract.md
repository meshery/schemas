# Public activity feed contract

`GET /api/public/activity-feed` (v1beta3 `activity_feed`) serves recent
completed scheduled runs without authentication, as social proof on public
sites.

## Source data

The feed has no table or event construct of its own. Producers record each
completed run through the existing events tracker, `POST /api/events`, with
category `schedule`, action `completed`, and these free-form metadata keys:

| Key | Required | Use |
| --- | --- | --- |
| `scheduleId` | yes | informational |
| `userId` | yes | informational only, see Identity |
| `orgId` | no | informational only, see Identity |
| `platform` | yes | served as `platform` |
| `role` | yes | served as `role` |
| `roleResult` | yes | served as `roleResult` |
| `networks` | no | served as `networks` (array of names) |
| `completedAt` | yes | served as `completedAt`, display only |

Events carry no visibility key.

## Identity

Identity comes from the authenticated caller, never from event metadata.

- For events with category `schedule` and action `completed`, the server
  sets the event's `owner` to the authenticated caller (session or token
  owner), overriding any client-sent `owner`. An item's `userId` is that
  `owner`.
- The item's organization is the event's server-set acting organization, if
  any.
- Metadata `userId` and `orgId` are informational and ignored.

## Ordering

The feed is ordered by the event's server-recorded creation time, newest
first. `completedAt` is display only and never orders the feed; a value
later than the event's creation time is clamped to it.

## Visibility

Visibility is a Public/Private activity-feed setting kept in the user's
existing free-form preferences; this repository defines no typed field for
it. `public` shows the user's runs on the public feed; `private` excludes
them. Absent means `public`. This change adds no organization-scoped feed.

The feed reads the preference live on every fetch and never snapshots it
into events. When a user switches to `private`, all of their runs,
including ones already shown, drop out of the next response the server
builds. Because the response is publicly cacheable, a shared cache may keep
serving the previous body until its max-age (30 seconds or less) expires.

The exact preference key is defined by the server that stores the
preferences, not by this repository. A failed read of the setting is not
absence: the feed omits that user's runs from the response.

Absent means `public` only for a live user. Runs of a deleted user are never served.

## Item fields

Always: `id` (the event ID), `userId`, `platform`, `role`, `roleResult`,
`completedAt`. Optional: `networks`.

Resolved at read time for users whose setting is `public`:

- `displayName`: the user's public username, the same value as `username`
  on the public users directory (`PublicUser`). Never a real name.
- `avatarUrl`, `publicProfileUrl`: from the user's public profile.
- `organizationName`: the name of the event's acting organization; omitted
  when the event has none or it no longer resolves to a named organization.

Email addresses and real names are never served.

A stored event whose metadata lacks a valid `platform`, `role`, `roleResult` or
`completedAt` is skipped; it never fails the feed.

## Transport

- No auth.
- A per-IP rate limit; 429 with `Retry-After` over the limit.
- Paginated like the other list endpoints: `page` and `pageSize` query
  parameters (`pageSize` 1 to 50, default 20; the server never returns more
  than 50 items), response `ActivityFeedPage` with `page`, `pageSize`, `totalCount` and
  `data`, the same shape as `PublicUsersPage` on the public users
  directory.
- `Cache-Control: public, max-age=N` (always sent), N 30 seconds or less;
  30 by default.

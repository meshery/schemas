# Event feed contract

`GET /api/events/feed` (operationId `getEventFeed`, v1beta3 `event`
construct) serves an unauthenticated, generic feed of public events. The
route and its `EventFeedItem` and `EventFeedPage` schemas are defined in
`schemas/constructs/v1beta3/event/api.yml`.

## Visibility and eligibility

`Event.visibility` is `private` or `public`, and defaults to `private`.
Private events are visible only inside their organization. Layer5 Cloud sets
the default; clients such as Blowhorn decide whether to mark their own events
public when creating them. The default does not prevent a client from opting
its own event into public visibility.

An event appears in the feed only when its visibility is `public` and its
owner's account-wide `Preference.shareActivityPublicly` is on. The preference
is read at feed time. If it is absent, it means on. Turning it off hides all
of that owner's previously public events from the next response; events are
never rewritten. A shared cache may continue serving the previous response
until its `max-age` expires, which is at most 30 seconds.

## Feed data

The feed can include multiple event categories and actions. Its query
parameters optionally filter by `category` and `action`; results are ordered
newest first by the event's `createdAt`, not by a timestamp in metadata.

Client-specific display data is carried in typed event metadata, not in core
Event fields. `ScheduleCompletedEventMetadata` describes metadata for
category `schedule`, action `completed`, using exactly these keys:
`platform`, `role`, `line`, and optional `networks`. The platform is one of
`linkedin`, `x`, `reddit`, `hacker-news`, `slack`, `bluesky`, or `github`.
The feed projects these values into `EventFeedItem`; the core Event carries
no client-specific field names. Events without valid required metadata are
skipped. A future client can add its own typed metadata template and feed
projection without adding client-specific fields to the core Event.

`EventFeedItem.userId` is the Cloud user ID of the event owner. Optional
`displayName`, `avatarUrl`, `organizationName`, and `publicProfileUrl` values
are resolved by Cloud at read time and are included only when the user's
profile is public. `displayName` is a public username, never a real name.
The feed never exposes email, `firstName`, `lastName`, `description`,
`provider`, or raw metadata.

## Transport and paging

- The route requires no authentication.
- Requests are rate limited per IP. A 429 response documents and returns
  `Retry-After`.
- `page` selects the page. `pagesize` is from 1 to 50 and defaults to 20.
  `category` and `action` are optional string filters, each up to 500
  characters. The response is an `EventFeedPage` containing `page`,
  `pageSize`, `totalCount`, and `data`; it contains at most 50 items.
- Every 200 response includes `Cache-Control: public, max-age=N`, where N is
  from 0 to 30. Shared caches may therefore serve an earlier feed body for
  up to 30 seconds after a preference changes.
- Browsers may call the route cross-origin. The server answers CORS for
  `GET` and its `OPTIONS` preflight only, without credentials, for the
  origins it allows, and exposes `Retry-After`. No other events route
  changes its CORS behavior.

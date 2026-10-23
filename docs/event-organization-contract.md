# Event organization contract

`schemas/constructs/v1beta3/event` is the wire contract for a recorded event
(`event_trackers`) and for listing those events. `organizationId` says which
organization an event belongs to. `getEvents` `scope` says whose events a
caller is allowed to list.

## `organizationId`

`Event.organizationId` is required and read-only. The server sets it and
clients never send it:

- A user action is recorded in the organization selected in the session.
- A system event that refers to a resource belongs to that resource's
  organization.
- A provider-level system event with no tenant belongs to the provider
  organization.

The wire name is `organizationId`. The database column is `organization_id`.
The value is a UUID and is always present, so generated Go uses a non-pointer
UUID (`x-go-type-skip-optional-pointer: true` on the required field). It is
absent from `EventPayload` and from every request body in this construct.
`createEvent` says the server assigns the organization from the session.

`EventResult` (`event.yaml`) is the page item `getEvents` returns. It joins
user profile fields (`firstName`, `lastName`, `email`, `provider`) and also
carries a read-only `organizationId`, so an organization-scope listing shows
which organization each row belongs to. It is optional there because the list
is a projection; the server fills it for every row.

## `getEvents` scope

`GET /api/events/list` (`getEvents`) takes the `eventsScope` query parameter
(`name: scope`, not required):

| Value | Meaning |
| --- | --- |
| `user` | Default. Only the caller's own events. Same behavior as before this parameter existed. |
| `organization` | Every member's events in the caller's session organization. Requires organization administration permission in that organization. Callers without it get `403`. |

The `403` uses `MeshkitError403`, the same response `getEventsAggregate`
uses. Omitting `scope` is `user`.

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

The same page item carries, as optional properties, the row fields Layer5
Cloud's `getEvents` serves on every row: `id`, `actedUpon`, `operationId`,
`severity`, `status`, `metadata` (the same nullable free-form object as
`Event.metadata`. On an error event, `metadata.error` is an EventError when
present, except that a design validation event whose operation did not
complete (`status` `error`) carries it as a DesignEventOperationError. Rows
recorded before EventError carry MeshKit's Go field names instead (`Code`,
`Severity` as a number, `ShortDescription`, `LongDescription`,
`ProbableCause` and `SuggestedRemediation` as lists); readers fall back to
those keys when `code` is absent and treat their flat lists as unpaired),
`updatedAt` and `deletedAt`. They are not required, so a row recorded
without them still validates. (#1353)

## `getEvents` scope

`GET /api/events/list` (`getEvents`) takes the `eventsScope` query parameter
(`name: scope`, not required):

| Value | Meaning |
| --- | --- |
| `user` | Default. Only the caller's own events. Same behavior as before this parameter existed. |
| `organization` | Every member's events in the caller's session organization. Requires organization administration permission in that organization. Callers without it get `403`. |

The `403` uses `MeshkitError403`, the same response `getEventsAggregate`
uses. Omitting `scope` is `user`.

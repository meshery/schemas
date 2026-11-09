# Schedule visibility and public activity-feed contract

This document defines the contract for schedule visibility and the public
activity feed introduced in `v1beta3/schedule` (issue #1346).

## Schedule visibility

`Schedule.visibility` is an enum with three values:
- `public` (default)
- `org`
- `private`

### Semantics

- **`public`**: Completed runs of the schedule are eligible to appear on public,
  anonymous activity feeds and social-proof surfaces if the schedule owner has
  the account-wide `shareActivityPublicly` preference enabled at read time.
- **`org`**: Activity is restricted to members within the schedule's owning
  organization.
- **`private`**: Activity is restricted to the schedule owner.

### Persistence and updates

- **Wire casing**: camelCase property `visibility` in JSON.
- **Database mapping**: Persisted in the `schedules` table via column
  `visibility` (annotated with `x-oapi-codegen-extra-tags.db: visibility`).
- **Mutability**: `visibility` is client-settable on creation and update via
  `SchedulePayload` (the same class of mutable operational properties as
  `paused`).
- **Response entity**: `Schedule` in `schemas/constructs/v1beta3/schedule/schedule.yaml`
  includes `visibility` as a required field with default `"public"`.

## Public activity feed

`GET /api/public/activity-feed` (operationId `getPublicActivityFeed`) serves an
unauthenticated, cached, rate-limited feed of recently completed schedule runs
for anonymous social-proof surfaces.

### Route properties

- **Authentication**: None (`security: []`). Accessible anonymously.
- **Target environment**: Cloud only (`x-internal: ["cloud"]`).
- **Caching**: Responses include `Cache-Control: public, max-age=N` (N up to 30
  seconds). Shared caches may serve recent responses up to 30 seconds.
- **Rate limiting**: Requests are rate-limited per IP. Excessive requests receive
  `429 Too Many Requests` with a `Retry-After` header.
- **Pagination**:
  - `page` (integer, query, minimum 1, default 1): Page number.
  - `pageSize` (integer, query, minimum 1, maximum 50, default 20): Items per page.

### Response schema

The response schema is `PublicActivityFeed` (aliased to `PublicActivityFeedPage`):

```json
{
  "page": 1,
  "pageSize": 20,
  "totalCount": 42,
  "data": [
    {
      "userId": "11111111-2222-3333-4444-555555555555",
      "platform": "linkedin",
      "roleResult": "DevOps Engineer deployed canary build successfully",
      "completedAt": "2026-11-06T12:00:00Z",
      "visibility": "public",
      "displayName": "Alex Cloud",
      "avatarUrl": "https://avatar.example.com/alex.png",
      "organizationName": "Acme Corp",
      "publicProfileUrl": "https://meshery.io/users/alex_cloud"
    }
  ]
}
```

### Feed item fields and privacy rules

Each item in `data` represents a `PublicActivityFeedItem`:

1. **Always present**:
   - `userId` (uuid): Cloud user ID of the actor.
   - `platform` (string): Target platform or channel where the schedule ran (one of
     `linkedin`, `x`, `reddit`, `hacker-news`, `slack`, `bluesky`, `github`).
   - `roleResult` (string): Short summary line combining role and completion result.
   - `completedAt` (date-time): Timestamp when the run completed.
   - `visibility` (string): Always `public` in this feed.

2. **Conditional on public profile**:
   - `displayName` (string): Same public display name as `PublicUser.username` (trimmed first and last name, or a non-PII fallback). Never email. No separate handle field.
   - `avatarUrl` (string): Public avatar image URL.
   - `organizationName` (string): Name of the organization.
   - `publicProfileUrl` (string): Link to the actor's public profile page.

   These fields are resolved dynamically by Layer5 Cloud when serving the feed and
   are populated *only* when the actor has a public profile and permits public
   activity sharing.

3. **Privacy invariants**:
   - **Item-level inclusion**: An item is included in the feed only when the schedule's
     `visibility` is `public` and the owner's account-wide `shareActivityPublicly`
     preference is on at read time. Turning it off excludes the entire item (including
     the `userId` and the run) from subsequent feed responses; runs are never rewritten.
   - **No email addresses**: Email addresses are never exposed in feed responses.
   - **No private schedules**: Runs from schedules with `visibility: "org"` or
     `visibility: "private"` must never appear in this feed.
   - **No sensitive execution data**: Passwords, tokens, payload contents, or error
     traces are strictly excluded.

## Migration and backward compatibility

### Pre-existing schedules

When existing schedules are migrated to `v1beta3`:
- In the database and API responses, `Schedule.visibility` defaults to `"public"`
  (existing rows are backfilled with `"public"` to satisfy the required response contract).
- Public feed eligibility is safely gated: completed runs are included in the public
  feed only if the schedule owner's account-wide `shareActivityPublicly` preference
  is on at read time.
- Users or organizations wishing to restrict their schedules can update `visibility`
  to `"org"` or `"private"` at any time via `SchedulePayload`, or disable
  `shareActivityPublicly` in their user preferences.
- Tenants with strict privacy policies may optionally backfill legacy schedules to
  `"org"` or `"private"` prior to enabling public activity feed surfaces.

## Out of scope (event constructs)

No new event construct or closed event-metadata schema is introduced for this
feed. Schedule execution engines continue recording completion events in the
existing event tracker with free-form metadata (`scheduleId`, `userId`, `orgId`,
`visibility`, `platform`, `roleResult`, `completedAt`). Layer5 Cloud projects
eligible completed events matching `visibility == "public"` into the
`PublicActivityFeed` contract.

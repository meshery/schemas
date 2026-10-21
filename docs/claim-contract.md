# Claim contract

`schemas/constructs/v1beta3/claim` is a generic, time-bound hold that one
connection takes on one resource so competing workers never act on it twice.
It is the "in progress" set. The ledger (`v1beta3/ledger`) stays the
"already done" set and is not a lease.

## Holder

- A claim is held by a **connection** (`claimantConnectionId`, a
  `connections.id`) on behalf of the **session user** (`claimantUserId`).
- The request names the connection (`connectionId`); it must be the caller's
  own live connection in the session organization. Anything else is `404`,
  the same answer as a missing claim, so another member's or organization's
  connections are never disclosed.
- `claimantUserId` comes from the session and never from the body.
- Either field may be omitted on a history row whose connection or user was
  later purged (the foreign keys are `ON DELETE SET NULL`).

## Lifecycle

| Status | Meaning |
| --- | --- |
| `active` | Held. At most one per (organization, `resourceType`, `resourceId`). |
| `released` | Let go with an `outcome` (`completed`, `failed`, `cancelled`), `releasedAt` and `releasedBy`. |
| `expired` | `expiresAt` passed without a renewal, or the holding connection was deleted. |

- Expiry is evaluated **when the claim is read and when a new claim is taken**,
  not by a sweeper. A claim never reads `active` past `expiresAt`.
- Released and expired claims are **kept as history**. A handoff is derived,
  not stored: an `expired` claim followed by an `active` claim on the same
  resource.
- Renew moves `expiresAt` and sets `renewedAt`, for the holding connection
  only. A claim that is not active answers `409`.
- Release takes the outcome (`ClaimReleasePayload`). The holder may release
  from any of its connections. A member holding "Release claims of other
  members" may release anyone's. An expired claim cannot be released (`409`).
  Releasing an already released claim returns it unchanged.
- `outcomeEventId` points at the event that records the run. That event's
  `systemId` is the connection ID of the machine that ran it (see the event
  construct).

## Resource types

`resourceType` is the construct name in snake_case. A provider verifies the
types it serves and refuses others with `400`. Layer5 Cloud serves
`content_item` (the hold a desktop client takes on an activity) and verifies
that the content item is live in the session organization.

## Permission keys (build/permissions.csv, "Workflow Management / Claims")

| Key | ID | Roles |
| --- | --- | --- |
| View Claims | `93696d4c-48db-415e-aac9-778390896093` | User, Team Admin, Workspace Admin, Org Admin, Provider Admin |
| Take and renew claims | `1450f30c-6664-4107-9818-eca7508182d5` | same |
| Release claim | `6789de53-1b28-407f-90dc-bf290eb28cf6` | same |
| Release claims of other members | `2ae5e1c0-8f91-4777-a3b4-bc5cf662ecb7` | Org Admin, Provider Admin |

No anonymous role holds any of them.

## Related changes

- `v1beta3/connection`: `GET /api/integrations/connections/desktop`
  (`getDesktopConnectionsOfOrganization`) lets any live member read a
  `ConnectionSummary` (`id`, `name`, `kind`, `owner`, `status`,
  `lastSeenAt`) of every desktop connection in the organization. Nothing else
  of another member's connection is exposed.
- `v1beta3/content_item`: `createdBy`, the session user who created it.
- `v1beta3/schedule`: the schedule claim requests name `connectionId` in place
  of the free-text `claimant`, matching the nested claim.

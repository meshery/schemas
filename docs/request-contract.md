# Request contract

`schemas/constructs/v1beta3/request` is a generic request for a decision: one
thing that a person with the right to decide it has been asked to decide, about
a subject. It is the one request construct. Other kinds of request (catalog
publish, sign-up) are separate Cloud constructs today and may move onto it in a
later change; this construct is defined here only once.

## Shape

| Field | Meaning |
| --- | --- |
| `id` | Server-generated. |
| `organizationId` | The organization of the subject. Never client-settable. |
| `kind` | What is being decided. `content_item_approval` is the only kind. |
| `subjectType`, `subjectId` | The subject, by construct name in snake_case and ID. Fixed by the kind. |
| `requesterId` | The user on whose behalf the write was made. |
| `createdByClient` | OAuth client ID of the AI app behind the write. Empty for a person. |
| `status` | `pending`, `approved` or `denied`. Decided once, then final. |
| `decidedBy`, `decidedAt` | The deciding user and time. Absent while pending. |
| `note` | The note the decider left. Optional. |
| `createdAt`, `updatedAt` | Timestamps. |

There is no `deletedAt`: decided requests are kept as history.

Requests are created by the server, not by a client call, so the construct has
no create operation and no create payload. The only payload is
`RequestDecisionPayload` (`note`, optional), taken by approve and deny.

## Operations

| Operation | Route | Notes |
| --- | --- | --- |
| `listRequests` | `GET /api/requests` | Filters `kind` and `status`. Paged with `page` and `pageSize`, newest first. |
| `getRequest` | `GET /api/requests/{requestId}` | |
| `approveRequest` | `POST /api/requests/{requestId}/approve` | Optional note. `409` when not pending. |
| `denyRequest` | `POST /api/requests/{requestId}/deny` | Optional note. `409` when not pending. |

All four are `x-internal: ["cloud"]` and carry no `x-mcp`. The schema lint
(Rule 48) refuses `x-mcp` on `approveRequest` and `denyRequest`: deciding is a
human act in the app, so no AI app tool can approve or deny.

## Kinds name the key that decides them

`RequestKind` carries two maps keyed by kind: `x-decision-key`, the generated
constant name (in `models/permissions`) of the permission key that may decide
the kind, and `x-subject-type`. A kind is added together with its deciding key
and its handling here.

| Kind | Subject | Deciding key | Roles |
| --- | --- | --- | --- |
| `content_item_approval` | `content_item` | Decide Content Item Approvals (Catalog Management / Content Items) | Org Admin, Provider Admin |

Reading requests (`listRequests`, `getRequest`) takes View Requests (Workflow
Management / Requests), seeded to User, Team Admin, Workspace Admin, Org Admin
and Provider Admin. `validation/mcp_operation_contract_test.go` checks that each
kind names an existing key and that no OAuth scope keychain carries a deciding
key.

## `content_item_approval`

1. An AI app writes a content item (`createdByClient` set). Cloud's agent-write
   policy lands it with `approved` false, unless the creating user turned on
   acting without approval, and creates a `pending` request whose subject is the
   item and whose `requesterId` and `createdByClient` come from the token.
2. A person with the deciding key calls `approveRequest`. In one transaction the
   request becomes `approved` and the item's `approved` becomes true. `denyRequest`
   makes the request `denied` and leaves the item unapproved.
3. The client that runs the queue reads the item's typed `approved` field, never
   the request.

A request is decided once. A second decision answers `409` and changes nothing.

## Consumers

- **Cloud** creates the requests, decides them in a transaction with the
  subject, checks the kind's deciding key in the session organization, and
  serves the four routes.
- **Desktop and web apps** list pending requests and call approve or deny.
- **The hosted MCP server** never exposes these operations.

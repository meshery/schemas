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
| `status` | `pending`, `approved`, `denied` or `superseded`. Decided once, or superseded once, then final. |
| `decidedBy`, `decidedAt` | The deciding user and time. Absent while pending. A superseded request has `decidedAt` (the edit time) and no `decidedBy`. |
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
| `approveRequest` | `POST /api/requests/{requestId}/approve` | Optional note. `409` when not pending (decided or superseded) or when the subject is soft-deleted; `404` when the subject is gone. |
| `denyRequest` | `POST /api/requests/{requestId}/deny` | Optional note. `409` when not pending (decided or superseded) or when the subject is soft-deleted; `404` when the subject is gone. |

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

1. Any client inserts a content item, a person in the app or an AI app
   (`createdByClient` set). `approved` is not in `ContentItemPayload`. The
   insert resolves the item's effective approval
   ([Approval policy](content-item-contract.md#approval-policy)). When it is
   required, the item lands `approved` false and Cloud creates a `pending`
   request in the same transaction as the item (if either write fails, neither
   is kept, so an unapproved item always has its request) whose subject is the
   item and whose `requesterId` and `createdByClient` come from the session or
   token. When it is not required, the item lands `approved` true and no
   request is created. A content edit re-resolves the approval the same way
   ([Approval on a content edit](content-item-contract.md#approval-on-a-content-edit)):
   one that resolves to required supersedes the open request, if any, and opens
   a fresh pending one; one that resolves to not required supersedes the open
   request and opens none. A change to `approvalPolicy` alone re-resolves the
   approval too ([Approval on an `approvalPolicy` change](content-item-contract.md#approval-on-an-approvalpolicy-change)):
   only one that makes approval required resets an approved item, which then
   opens a pending request unless one is pending.
2. A person with the deciding key calls `approveRequest`. In one transaction the
   request becomes `approved` and the item's `approved` becomes true. `denyRequest`
   makes the request `denied` and leaves the item unapproved.
3. The client that runs the queue reads the item's typed `approved` field, never
   the request.

`approveRequest` is the only way an item's `approved` becomes true. No content
item request body carries it, and the free-form `data["Approved?"]` column never
sets it (see
[`content-item-contract.md`](content-item-contract.md#migrating-from-the-approved-column)).
Deciding needs Decide Content Item Approvals and is never an AI app tool, so an
AI app cannot approve any item, including one it wrote.

A request is decided once, or superseded once (see below). A decision on a
request that is not `pending` answers `409` and changes nothing.

## Superseded requests

A content edit changes what the request is about, so the request no longer
describes the content. In the same transaction as the edit, the server closes
the item's open request as `superseded`: `decidedAt` is set to the edit time,
`decidedBy` and `note` are omitted, and nothing is approved. When approval is
still required after the edit, a fresh pending request opens for the content as
it now is. When approval is no longer required, no new request opens and the
item stays unapproved.

Approving or denying a superseded request answers `409` and changes nothing, so
an approval always applies to the content as of the open request. A policy change
alone never supersedes a request, because the content did not change.

## Deciding a request whose subject is gone

`approveRequest` and `denyRequest` read the subject in the same transaction as
the decision and answer as follows. Every answer that is not a decision changes
nothing: the request stays as it was.

| The request | The subject content item | Answer |
| --- | --- | --- |
| Pending | Live | `200`, decided |
| Not pending (decided or superseded) | Any | `409` |
| Pending | Soft-deleted (`deletedAt` set) | `409` |
| Pending | Hard-deleted (no row) | `404` |
| Unknown, or in another organization | Any | `404` |

A soft-deleted subject answers `409` because its row still exists: the request
is not decided and stays pending, so it still appears in `listRequests`. A
hard-deleted subject answers `404`, the same answer as an unknown request.
Neither case approves anything: `approved` is set only on a live subject.

## Consumers

- **Cloud** creates a request for each inserted content item whose effective
  approval is required, for each content edit that resolves to required (after
  superseding the open request), and for each policy change that makes approval
  required on an approved item. It supersedes the open request on each content
  edit, and decides requests in a transaction with the subject,
  answers `404` and `409` as in the table above, checks the kind's deciding key
  in the session organization, and serves the four routes.
- **Desktop and web apps** list pending requests and call approve or deny. A
  superseded request is shown as closed, with no decider.
- **The hosted MCP server** never exposes these operations.

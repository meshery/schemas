# Content item contract

`schemas/constructs/v1beta3/content_item` is an organization's queue of
content: fingerprinted values keyed by organization and row number, with
conditional updates. The posting client is its consumer. This page records the two
typed extensions on top of the free-form `data` blob, rules of engagement
and threads, and why each rule sits where it does.

## Why typed fields, not `data`

`data` is the item's content values, stored as given. The server never reads
inside it. Rules of engagement and thread links are different: the server
validates the first and has to check the second against other rows. Neither
fits in an opaque blob, and a key in `data` would be a local contract that no
generated type carries.

## Rules of engagement

`rulesOfEngagement` is an order's own limit on how hard one item pushes:

| Field | Type | Meaning |
| --- | --- | --- |
| `preset` | `Posture` (`v1beta3/posture`) | Required. `cautious`, `standard` or `brisk`. |
| `dials.pace` | `slow`, `normal`, `fast` | Typing and interaction pace. |
| `dials.minDelaySeconds` | integer, 0 to 86400 | Least time between two public actions on one platform for one profile. |
| `dials.quietHours` | `{start, end}`, hours 0 to 23 | Local hours with no public actions, wrapping past midnight when `end` is earlier than `start`. |
| `dials.capFraction` | number, above 0, at most 1 | Share of each built-in daily cap. |
| `dials.noMouseMove` | boolean | Run without pointer movement. |

`dials` is present only when the order changed a dial for this item. Its
presence is what marks the item's rules "adjusted".

**The rules only tighten.** The client that runs the item applies the more
cautious of `preset` and the preset its profile and platform resolve to.
Each dial applies only where it is stricter than that preset's own value.
The warm-up and the pause after a sign-in challenge apply regardless. The
schedule's `posture` is a different carrier: there, the preset replaces
the resolution (see the schedule construct's `posture`).

**The server stores and validates; it does not resolve.** The resolution
needs the profile and platform settings, the warm-up and the challenge
history together, and only the client that runs the item holds all of them.
The server refuses a value outside the schema with `400` and otherwise
stores it as given.

**Writes.** `insertContentItem` sets it. On `updateContentItem`, an omitted
`rulesOfEngagement` keeps the stored value and `null` clears it. Omission
must keep the value because clients released before the field existed send
the whole item without it on every write-back. The generated Go
`ContentItemPayload` field carries `omitempty`, so a Go client with no value
omits the key (keeps the stored value) instead of sending `null` (clears it);
only a TypeScript caller can send `null`. The fingerprint covers
`rulesOfEngagement` when it is set, so a stale write cannot overwrite it. An
item without it hashes exactly as it did before, so stored fingerprints stay
valid.

## Threads

A thread is a root item plus the items that follow it: the parts of a post
split across several posts (X and Bluesky threads), or the replies of a
conversation between profiles (the posting client's radio net). Three fields describe
it:

| Field | Meaning |
| --- | --- |
| `threadId` | The root item's ID. Omitted on a standalone item and on the root itself. |
| `replyToId` | The item this one answers directly: the root, or another item of the same thread. |
| `threadIndex` | Position in the thread, at least 1; the root counts as 0. |

### Reconciling the two proposals

Blowhorn #1328 (activity threads) proposed `parentId` for the root, plus
`replyToId` and `threadIndex`. Blowhorn #1323 (radio net) proposed the same
relation named `threadId`. The construct uses `threadId`. "Parent" usually
means the direct parent, which here is `replyToId`, so `parentId` for the
root would have given two fields that both read as "parent".

Both proposals need the root and the direct parent as separate fields. In a
split thread each part answers the part before it, while in a radio net
each reply answers the transmission above it. Both need one query to read a
whole thread.

### Rules the server enforces on insert

In the same transaction as the insert:

- `threadId` names a live item of the organization that is not itself part
  of a thread. Threads do not nest.
- `replyToId` requires `threadId` and names that root or a live item whose
  `threadId` is the same.
- `threadIndex` is present exactly when `threadId` is, and is greater than
  the position of the item `replyToId` names.
- An item of another organization, a deleted item and a missing one all get
  the same `400`, so another organization's items are never disclosed.
- A `threadIndex` another live item of the thread already holds gets a
  `409`.

`threadId` without `replyToId` is allowed. It covers an item that belongs to
a thread without answering any one post in it.

### Fixed at insert

On update, the thread fields must be omitted or equal to the stored values.
Any other value gets a `400`. Moving a posted item to another thread would
detach it from the post it answered. Ignoring the change silently would hide
the writer's mistake.

### Reading a thread

`listContentItems?threadId=<root>` returns the root and every live item of
the thread, ordered by `threadIndex` with the root first. This is the one
read per pass the Activity screen and the scheduler need.

### Deleting

Deleting an item does not change the references other items hold to it. A
reply whose parent is deleted still names the parent, and the client treats
that parent as stood down.

Deleting an item also closes its open `content_item_approval` request, if it
has one, as `superseded` in the same transaction, the same way a content edit
does ([request contract](request-contract.md#superseded-requests)): `decidedAt`
is set to the delete time, and no `decidedBy` and no `note` are set. The
request is then final. `approveRequest` and `denyRequest` on it answer `409`
and change nothing, as for any request that is not pending, so a soft-deleted
item can never be approved through its old request.

## A reply waits for its parent's link: client behaviour, not a claim rule

The radio net needs a reply to be held until the post it answers has a link
that was read back from the platform, and held for a person when the parent
was clicked but its outcome was not read. Blowhorn #1323 proposed that Cloud
enforce this in the claim. This rule is the client's, and neither the claim
contract nor Cloud enforces it:

1. **The condition lives where the server does not look.** Whether a
   parent's link was read back, or recorded as "clicked, outcome not read",
   is recorded in the parent's `data` in the client's own column vocabulary.
   A server rule would have to parse that blob, which would make Cloud
   depend on one client's column names. Typing the read-back outcome is a
   separate change.
2. **A claim is exclusion, not readiness.** The claim construct is a
   generic hold that answers "is someone already doing this?". It does not
   answer "is this ready to do?". A precondition specific to one resource
   type would make the claim contract know every resource's domain rules
   ([`claim-contract.md`](claim-contract.md#claims-are-exclusion-not-readiness)).
3. **The claim would not even gate it.** The posting client's scheduler claims the
   `schedule` that runs an item, not the `content_item`, so a rule attached
   to content item claims would never be checked on that path.
4. **The hold has several outcomes and the client already decides them.**
   The parent may still be pending (wait), its link may have been read (post
   the reply under it), it may have been clicked with its outcome unread
   (hold the rest of the chain for a person), or it may have failed or been
   stood down (hold the chain). A claim refusal can express only "not now".
   The client re-reads the parent after any claim, so a server gate would be
   a second, weaker copy of the same check.

What the schema provides is enough for the client to decide in one read:
the typed `replyToId` to find the parent, and the `threadId` filter to read
the whole chain.

## Media assets

`mediaAssetIds` is an optional, ordered list of up to 20 distinct media asset
ids (`media_asset`, see `docs/media-asset-contract.md`): the files the item
posts, in posting order. An item refers to an asset by id, never by URL.

- Each id must name a media asset of the session organization, else `400`.
  A missing, another organization's and a deleted asset get the same `400`.
- The server does not require the asset to be `ready` at write time. Deleting
  an asset does not check content item references, so an item can name an
  asset that is gone; the item is refused by name when it posts, and the
  posting client checks readiness.
- On update an omitted `mediaAssetIds` keeps the stored list and `[]` clears
  it, for the same reason as `rulesOfEngagement`: old clients send the whole
  item without it.
- The fingerprint covers it when set; an item without it hashes as before.
- The generated Go payload omits an empty `mediaAssetIds`, so a Go client cannot clear the list through it, while TypeScript clients can send `[]`.

## Approval policy

`approvalPolicy` says whether an item needs a person's approval before it
runs. Its values are `required`, `not_required` and `inherit`, defined once as
the `ApprovalPolicy` schema in `content_item/api.yml`, which higher-level
settings reuse. The schema declares no default: an absent value means
`inherit`.

**The rules (target model).**

- An explicit `required` or `not_required` on the item always wins. Nothing
  higher overrides it.
- `inherit`, or an absent value, inherits from higher-level settings
  (platform, workspace, profile), hierarchy defined in
  https://github.com/layer5io/meshery-cloud/issues/6365. This page does not fix
  their order; the server reads them in the order that issue defines.
- The user preference `agentsActWithoutApproval` is one profile-level source
  in that hierarchy, for activities written by AI apps: `true` means
  `not_required`, `false` means `required`, and an absent value sets nothing.
  It is not yet in the v1beta3 Preference schema of this repository, and a
  separate PR adds it. Where it sits relative to platform and workspace
  settings is defined in the same issue.
- If no level sets a value, approval is required (fail closed). This fallback
  is still open for confirmation in the same issue.
- AI apps can never set `approved`. `approvalPolicy` only says whether
  approval is needed; `approved` is still set only as described under
  [Approval and the client that created an item](#approval-and-the-client-that-created-an-item).

**Interim behavior.** The upstream platform, workspace and profile policies do
not exist yet, so the server applies this interim rule until they do, and this
PR is not blocked on the hierarchy issue:

- An explicit `required` or `not_required` wins, as above. Its source is `item`.
- `inherit`, or an absent value, resolves to `required` with source `fallback`.
- No higher level is read. `agentsActWithoutApproval` is not consulted during
  the interim, even when a profile sets it.
- So during the interim `approvalPolicySource` is only `item` or `fallback`.
  The other sources (`workspace`, `profile`, `organization`, `platform`) stay in
  the enum for the target model and appear once those policies exist.

**Who may write it.** Only a person holding Decide Content Item Approvals in
the session organization may write a value that changes the stored
`approvalPolicy`. Any other caller who sends a changing value gets `403`, and
nothing changes. No OAuth scope keychain carries that key, so an AI app token
can never change the policy.

- **Insert.** `required` or `not_required` is a change, so a caller without the
  key who sends either on insert gets `403` and nothing is inserted. Omitted or
  `inherit` stores null, so the item inherits.
- **Update.** Omitted keeps the stored value and is not a change, so it is never
  refused. An explicit value different from the stored one is a change, and
  `inherit` returns the item to inheriting. Absent, null and `inherit` are one
  value: the server stores `inherit` as null, so writing `inherit` over an
  inheriting item changes nothing and is never refused.
- **Write-back.** A caller without the key that reads an item and writes it back
  whole is not refused when the policy comes back unchanged. Sending back the
  stored value is accepted and changes nothing. Only a different value, or an
  explicit `required` or `not_required` on insert, is refused with `403`.

**The insert effect.** The effective approval is resolved when the item is
inserted, and again at each content edit (see
[Approval on a content edit](#approval-on-a-content-edit)):

- Effective required: `approved` is false and a `pending`
  `content_item_approval` request is opened (see
  [`request-contract.md`](request-contract.md)).
- Effective not required: the server sets `approved` true itself and opens no
  request.

A change to `approvalPolicy` alone re-resolves the approval too; see
[Approval on an `approvalPolicy` change](#approval-on-an-approvalpolicy-change).
The result is returned read-only as `approvalRequired` (the effective value)
and `approvalPolicySource` (the level that decided it: `item`, `workspace`,
`profile`, `organization`, `platform` or `fallback`; the higher levels are
listed in their planned order, and the hierarchy issue defines them). Both are
stored in the `approval_required` and `approval_policy_source` columns. They
are written at insert, at each content edit and at each policy change, so they
always describe the stored policy. Neither is in any write payload. Items
inserted before this field shipped have neither.

## The open-request invariant

After every content edit and every `approvalPolicy` change, an unapproved item
has exactly one open pending `content_item_approval` request. This is the one
statement of the rule; the approval sections below and the operation
descriptions refer back to it.

- **Insert** establishes it: a required item lands unapproved with its request,
  and a not-required item lands approved with none.
- **A content edit or `approvalPolicy` change keeps it.** A write of either kind
  that leaves an item unapproved with no open request opens a fresh pending one
  in the same transaction, whatever the item's resolved approval. An approved
  item has no request to keep.
- **A write that changes nothing opens no request and closes none.** That
  includes a whole-item write-back of the stored content and policy, so the
  invariant does not apply to it.
- **A denial** closes the request as `denied` and leaves the item unapproved
  with no open request. It stays that way through no-change writes; the next
  content edit or `approvalPolicy` change that leaves it unapproved opens a new
  request.

The request is what a decider acts on. An unapproved item is left without an
open request only after a denial, and only until the next content edit or
policy change.

## Approval on a content edit

An update that changes what the item will run or publish re-resolves its
effective approval in the same transaction as the write, with the same rule as
insert: the `approvalPolicy` the update stores, then the higher-level settings
(interim: `inherit` or absent resolves to `required`). It records
`approvalRequired` and `approvalPolicySource` again.

**Content fields.** An update is a content edit when it changes one of these,
compared with the stored value. They are the fields the fingerprint covers:

| Field | Why it counts |
| --- | --- |
| `profile` | The profile the item runs as. |
| `rowNumber` | The item's place in the queue. Counted because the fingerprint covers it, which fails closed: a renumbered item is re-approved. |
| `data`, without the `Approved?` mirror | The content values the item posts. The server-owned mirror is not content. |
| `rulesOfEngagement` | How hard the item pushes. |
| `mediaAssetIds` | The files the item posts. |

**Bookkeeping fields.** These never make a write a content edit: `approvalPolicy`
(a change to it alone is handled in its own section below), `expectedFingerprint`
(a precondition, not stored), `id` (ignored on update) and the thread fields
(`threadId`, `replyToId`, `threadIndex`, fixed at insert). A content field
omitted from the payload keeps its stored value, so it is not a change.

A write-back that sends the stored content unchanged is not an edit. Older
clients send the whole item on every write, and that must not reset approval.

**The outcome of a content edit.** `approved` is never set to true by an
update. The rows below are the outcomes of an edit, applied in the same
transaction as the write, and a failed write keeps neither change:

| Before the edit | The edit resolves to | `approved` after | Request after |
| --- | --- | --- | --- |
| approved | required | false | the open request, if any, is superseded; a fresh pending request opens |
| approved | not required | true (unchanged) | none opens; an open request, if any, is superseded |
| not approved, with a pending request | required | false | the pending request is superseded; a fresh pending request opens |
| not approved, with no pending request | required | false | a new pending request |
| not approved, with a pending request | not required | false (unchanged) | the pending request is superseded; a fresh pending request opens |
| not approved, with no pending request | not required | false (unchanged) | a new pending request |
| any, no content change, no policy change (a no-change write) | any | unchanged | unchanged; no request opens or closes, so a denied item stays denied |

A superseded request is closed with `status` `superseded`, `decidedAt` set to
the edit time, and no `decidedBy` and no `note`. It is final. `approveRequest`
and `denyRequest` answer `409` on it and change nothing, so an approval always
applies to the content as of the open request. A content edit that leaves the
item unapproved always opens a new request for the content it wrote, in the same
transaction, so no approval is carried over from the content it replaced. This
is the [open-request invariant](#the-open-request-invariant) at work: a
not-required edit does not approve the item, so it must ask again.

**Who.** The rule applies to every writer, a person included. An edit made by
a person with Decide Content Item Approvals is re-approved the same way, so a
person cannot edit an approved item into running without a decision.

The table below is the target model. During the interim, the only sources are
`item` and `fallback`, so the rows that name a higher level do not occur yet.

| Item `approvalPolicy` | Higher level sets | `approvalRequired` | `approvalPolicySource` | Insert effect |
| --- | --- | --- | --- | --- |
| `required` | `not_required` | true | `item` | `approved` false, pending request |
| `not_required` | `required` | false | `item` | `approved` true, no request |
| absent or `inherit` | `not_required` | false | the level that set it | `approved` true, no request |
| absent or `inherit` | nothing, or `inherit` only | true | `fallback` | `approved` false, pending request |

The higher level in the examples stands for whichever level the hierarchy
issue places there; the table does not fix the order. The interim rows are the
`item` rows and the absent-or-`inherit` `fallback` row: an explicit value
decides with source `item`, and `inherit` or absent resolves to `required`.

## Approval on an `approvalPolicy` change

A write that changes the stored `approvalPolicy` and changes no content
re-resolves the approval the same way, in the same transaction as the write.
Only a caller with Decide Content Item Approvals may make that change (any
other caller gets a `403` and nothing changes). Sending back the stored value
re-resolves nothing.

| Before the change | The change resolves to | `approved` after | Request after |
| --- | --- | --- | --- |
| approved | required | false | a pending request opens, unless one is already pending |
| approved | not required | true (unchanged) | none |
| not approved | required | false (unchanged) | the open request stays as it is; a new one opens if there is none |
| not approved | not required | false (unchanged) | the open request stays pending; a new one opens if there is none |

A change whose result is required resets an approved item, because its
approval must now be given again. That covers `not_required` to `required`, and
also `required` to `inherit` or absent during the interim, which resolves to
required. A change whose result is not required never changes `approved` and
never closes a request: an unapproved item stays unapproved, and its open
request stays pending, so a decider can still decide it. An unapproved item
with no open request, after a denial for example, gets a fresh one under either
result, by the
[open-request invariant](#the-open-request-invariant). `approvalRequired` and
`approvalPolicySource` are rewritten to the new result, so they match the stored
policy.

## Approval and the client that created an item

Two typed fields carry what the hosted MCP server and the apps need to read
without parsing `data`:

| Field | Type | Meaning |
| --- | --- | --- |
| `approved` | boolean | Whether a person approved the item to run. Server-set and read-only. The client that runs the queue reads it. |
| `createdByClient` | string | OAuth client ID of the AI app that created the item. Server-set from the access token; empty or absent for an item a person created. |

**`approved` is in the entity only, never in a request body.**
`ContentItemPayload`, the body of both `insertContentItem` and
`updateContentItem`, has no `approved` property, so no client, person or AI
app, can approve an item by writing it. An insert sets `approved` from its
effective approval (see [Approval policy](#approval-policy)): false when
approval is required, true with no request when it is not. An update never
sets `approved` to true; a content edit that resolves to required sets it
back to false ([Approval on a content edit](#approval-on-a-content-edit)), and a
policy change that makes approval required does the same to an approved item
([Approval on an `approvalPolicy` change](#approval-on-an-approvalpolicy-change)). A
server ignores an `approved` that
an older client still sends, because the payload is not closed. The generated
Go and TypeScript payloads have no such field.

**Approval goes only through the request construct.** Inserting an item whose
effective approval is required creates a `pending` `content_item_approval`
request for it (see [`request-contract.md`](request-contract.md)). An item
whose approval is not required opens no request. After insert, `approveRequest`
is the only operation that sets the item's `approved` to true, in the same
transaction that decides the request; `denyRequest` leaves it false. Both need the Decide Content
Item Approvals key and carry no `x-mcp`, and no OAuth scope keychain carries
that key, so an AI app can never approve an item, its own or another's. The
request is never what the queue reads.

**`createdByClient` is not in the payload.** It is server-set and never changed
by an update, like `createdBy`. It is optional in the entity.

**Retrying an insert.** `insertContentItem` takes the optional `Idempotency-Key`
header ([`mcp-operation-contract.md`](mcp-operation-contract.md#idempotency-key)):
within 24 hours the same key and request hash return the first response and
insert nothing, the same key with a different hash answers `422`, and a retry
that arrives while the first request with that key is still being processed
answers `409` with the body `code` `idempotency_key_in_flight` and inserts
nothing. The in-flight claim of a request that never finished expires 24 hours
after it was taken, the same TTL as the stored response, and a retry after that
is processed as new. Only a final response that is not a `5xx` is stored: a
`5xx` releases the key, so a retry after one is processed as new. The permanent
`409`s of insert carry `row_number_taken` or `thread_index_taken`, so the
in-flight case is told apart by its `code`.

### Migrating from the `Approved?` column

Until now approval was the `Approved?` column inside the item's `data`, a
client-specific column that a generic construct should not read. It stays readable for
one release so the queue-running client and the desktop app move over without a flag day:

1. **Release N (this one).** Writers stop setting approval: they send neither
   `approved` nor `data["Approved?"]`, and approve through `approveRequest`
   instead. The server owns `data["Approved?"]`: on every write it replaces
   whatever the client sent there with the stored `approved`, so a
   client-written `Approved?` never approves an item and an older reader still
   sees the true value.
2. **Release N+1.** Readers read `approved` only. Servers stop mirroring into
   `data`, and the column is no longer part of the contract.

A row written before this release has no stored `approved`. Servers backfill it
once from `Approved?` (truthy values: `true`, `yes`, `1`, `x`, case-insensitive)
when the column is added, so every row carries a non-null `approved`. The
backfill is the only time `Approved?` sets `approved`.

## Consumers

- **layer5io/meshery-cloud** must add the columns (`approved` boolean not null
  default false, `created_by_client` text, `rules_of_engagement`
  jsonb, `thread_id` and `reply_to_id` uuid referencing `content_items`,
  `thread_index` integer, `media_asset_ids` uuid[], `approval_policy` text
  nullable, with a check constraint that admits only `required`
  and `not_required`; null means inherit and the server stores a written
  `inherit` as null, `approval_required`
  boolean nullable, and `approval_policy_source` text nullable, with a check
  constraint that admits only `item`, `workspace`, `profile`, `organization`,
  `platform` and `fallback`; the two approval results are null on rows inserted
  before this field shipped), `superseded` in the request status check
  constraint, indexes on `(organization_id, thread_id)` and
  `(organization_id, reply_to_id)`, and a partial unique index on
  `(organization_id, thread_id, thread_index)` over live rows. It must also
  enforce the insert and update rules above: never take `approved` from a
  request body; open the item's pending `content_item_approval` request on
  insert only when the effective approval is required, and set `approved`
  true with no request when it is not; resolve `approvalPolicy` at insert, at
  each content edit and at each change to the stored policy, and write
  `approval_required` and `approval_policy_source` at those times; on a content
  edit that resolves to required, reset `approved` to false, supersede the
  item's open request and, when the item is left unapproved, open a fresh pending
  one (for not required as well as required); on a policy change that resolves to
  required, reset an approved item to false and open a pending request unless one
  is already pending, and open one for any unapproved item with none open, under
  either result (the [open-request invariant](#the-open-request-invariant));
  on a delete, close the item's open request as `superseded` in the delete
  transaction;
  never set `approved` on an update; refuse with a 403 an
  `approvalPolicy` change from a caller without Decide Content Item Approvals
  (`required` or `not_required` on insert; on update, a value different from the
  stored one, with absent, null and `inherit` as one value); and own
  `data["Approved?"]` while it is mirrored. Also tell an omitted
  `rulesOfEngagement` from `null` on update, extend the fingerprint, serve the
  `threadId` filter, and answer `409` with `code` `idempotency_key_in_flight`
  to an `Idempotency-Key` still in flight.
- **The posting client** vendors the release, adds the fields to its `ContentItem`
  reads and `ContentItemPayload` sends, and implements the tightening and
  the reply hold in the engine.

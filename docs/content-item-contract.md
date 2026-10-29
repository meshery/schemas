# Content item contract

`schemas/constructs/v1beta3/content_item` is an organization's queue of
content: fingerprinted values keyed by organization and row number, with
conditional updates. Blowhorn is its consumer. This page records the two
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
| `preset` | `RiskProfile` (`v1beta3/risk_profile`) | Required. `cautious`, `standard` or `brisk`. |
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
schedule's `riskProfile` is a different carrier: there, the preset replaces
the resolution (see the schedule construct's `riskProfile`).

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
conversation between profiles (Blowhorn's radio net). Three fields describe
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
3. **The claim would not even gate it.** Blowhorn's scheduler claims the
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

## Consumers

- **layer5io/meshery-cloud** must add the columns (`rules_of_engagement`
  jsonb, `thread_id` and `reply_to_id` uuid referencing `content_items`,
  `thread_index` integer), indexes on `(organization_id, thread_id)` and
  `(organization_id, reply_to_id)`, and a partial unique index on
  `(organization_id, thread_id, thread_index)` over live rows. It must also
  enforce the insert and update rules above, tell an omitted
  `rulesOfEngagement` from `null` on update, extend the fingerprint, and
  serve the `threadId` filter.
- **Blowhorn** vendors the release, adds the fields to its `ContentItem`
  reads and `ContentItemPayload` sends, and implements the tightening and
  the reply hold in the engine.

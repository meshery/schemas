# Event correlation contract

`schemas/constructs/v1beta3/event` lets an event report one occurrence of an
ongoing **condition**: for example, a connection that keeps failing. Repeated
occurrences count on one open event instead of recording a row each, and the
event is closed when the condition clears (meshery/meshery#20879,
meshery/schemas#1334). The same change adds the fields that say where an event
came from (`source`), CloudEvents-compatible `type` and `specversion`, and W3C
trace context (`traceId`, `parentId`).

Every new field is optional, on `EventPayload`, `Event` and `EventResult`
alike. A producer that sends none of them sees no change.

## Fields

| Field | Type | DB column | Meaning |
| --- | --- | --- | --- |
| `correlationKey` | string, 1-255 | `correlation_key` | Names the condition (see [Choosing a key](#choosing-a-correlationkey)). |
| `occurrenceCount` | integer, minimum 1 | `occurrence_count` | On a payload: how many occurrences this create reports (default 1). On an event: that payload count when recorded (1 when omitted), growing as later occurrences are counted. |
| `firstSeenAt` | date-time | `first_seen_at` | First counted occurrence. |
| `lastSeenAt` | date-time | `last_seen_at` | Latest counted occurrence. On a payload, omitted while opening a condition means `firstSeenAt`; omitted while counting an open condition means the time of receipt. |
| `resolvedAt` | date-time | `resolved_at` | When the condition cleared. Absent while it is open. |
| `source` | string, `uri-reference`, 1-255 | `source` | Which surface emitted the event. |
| `type` | string, 1-255 | `type` | CloudEvents-compatible type, for example `io.meshery.user.signup`. |
| `specversion` | `"1.0"` | `specversion` | The CloudEvents version the event is compatible with. |
| `traceId` | 32 lowercase hex | `trace_id` | W3C `trace-id` of the operation. |
| `parentId` | 16 lowercase hex | `parent_id` | W3C `parent-id` of the sub-operation that emitted the event. |

`createEvent` answers an `Event`, and `getEvents` lists `EventResult`s; both
carry every field. `EventResult` is closed (`additionalProperties: false`), so
a server that persists the columns returns them in listings without breaking
strict readers.

## `createEvent` semantics

`POST /api/events` keeps its `operationId` and path. Each create resolves in
this order:

1. **Replay.** When the payload carries an `idempotencyKey` the authenticated
   caller already used, nothing is recorded or changed. The answer is `200`
   with the event the key is bound to (`Event-Disposition: replayed`). This
   runs first, so a retried create never counts an occurrence twice.
2. **No `correlationKey`**, or a call that identifies no user: a new event is
   recorded (`201`, `created`). The correlation fields are stored as sent.
3. **`correlationKey` without `resolvedAt`**:
   - When the caller has an **open** event with that key (one with no
     `resolvedAt`), nothing new is recorded. The open event's
     `occurrenceCount` grows by the payload's `occurrenceCount` (1 when
     omitted). Its `lastSeenAt` becomes the later of its own value and the
     payload's `lastSeenAt` (the time of receipt when omitted). Its
     `updatedAt` advances. Every other field keeps the value it was first
     recorded with. The answer is `200` (`incremented`).
   - Otherwise a new event is recorded, which opens the condition.
     `occurrenceCount` defaults to 1. `firstSeenAt` is the payload's
     `firstSeenAt`, else its `lastSeenAt`, else the time of receipt.
     `lastSeenAt` is the payload's `lastSeenAt`, else `firstSeenAt`. The
     answer is `201` (`created`).
4. **`correlationKey` with `resolvedAt`**, a resolution:
   - When the caller has an open event with that key, nothing new is
     recorded. That event gets the `resolvedAt`. Its `severity` and
     `description` become the payload's, so the closed condition reads as
     cleared. Its `lastSeenAt` becomes the later of its own value and the
     payload's `lastSeenAt` (the time of receipt when omitted). Its
     `updatedAt` advances. Every other field keeps the value it was recorded
     with. The answer is `200` with the closed event (`resolved`).
   - Otherwise the payload is recorded as a new event that is already
     resolved (`201`, `created`).
5. **Binding.** When the create also carried an `idempotencyKey`, that key is
   bound to the event step 2, 3 or 4 recorded, incremented or resolved. A
   retry then answers `200` with that event and changes nothing.

### Scope and invariant

Correlation is scoped like `idempotencyKey`: to the authenticated caller's
organization and user, never to the client-settable `owner`. A caller has at
most one open event per `correlationKey`. Servers enforce this atomically, for
example with a unique index on (organization, user, `correlation_key`) over
rows whose `resolved_at` is null, so two concurrent first occurrences cannot
both open the condition. A call that identifies no user (such as the public
token) records the event without correlating it.

### Server-side deduplication

A server may deduplicate events on its own, without a client key. Layer5
Cloud, for example, derives an hourly key for `error` and `critical` events
sent without an `idempotencyKey`. That deduplication must not swallow an
occurrence of an event that carries a `correlationKey`: the occurrence counts
instead (step 3).

### `Event-Disposition`

Every `200` and `201` from a server that implements correlation carries the
`Event-Disposition` response header: `created`, `replayed`, `incremented` or
`resolved`. A server that predates correlation omits it; there `201` means
created and `200` means replayed. A server answering browsers on another origin
lists the header in `Access-Control-Expose-Headers`.

### What this operation does not decide

Whether a counted occurrence notifies anyone again is the reader's policy, and
so is whether a severity change deserves a new condition. Both belong to the
suppression policy of meshery/meshery#20879, not to this contract. A producer
that wants a change to notify again resolves the condition, or uses a new key.

## Resolution events

A producer closes a condition by creating an event with:

- the condition's `correlationKey` and the `resolvedAt` time it cleared,
- the condition's `category`,
- a severity and description that say what cleared, for example severity
  `success` and `Connection to cluster prod-1 restored`.

When the caller has an open event with that key, nothing new is recorded.
The open event gets the `resolvedAt`, and its `severity` and `description`
become the payload's, so the closed condition reads as cleared. Its
`lastSeenAt` becomes the later of its own value and the payload's
`lastSeenAt` (the time of receipt when omitted), and its `updatedAt`
advances. It sends a resolution only when the condition changes from present
to cleared, never on every healthy check: with no open condition, a
resolution is recorded as its own already-resolved event. Once closed, the
next occurrence opens a new condition with a new event and a new
`firstSeenAt`.

## Choosing a `correlationKey`

The key names the condition, not the occurrence. It is qualified by the
emitting source and component, then the subject and the kind of condition:

```text
meshery-server/k8s-connection/5b0b1c2d-3e4f-4a5b-8c6d-7e8f9a0b1c2d/unreachable
```

Never use an error code alone. Codes are scoped to the component that owns
them, may overlap between components, and one code can describe many
subjects. `idempotencyKey` and `correlationKey` are different tools: the first
makes one create safe to retry, the second spans many creates.

## `source`, `type` and `specversion`

`source` says which surface emitted the event: `meshery-server`,
`meshery-ui`, `mesheryctl`, `meshery-adapter-<name>` (for example
`meshery-adapter-istio`), `layer5-cloud`, or another client's name. It is an
open set and a CloudEvents `source` (a URI reference). `systemId` says which
instance; `source` says which kind of client. A failure a person caused in the
UI is then told apart from the same failure from the CLI.

`type` is a reverse-DNS name such as `io.meshery.user.signup`. It sits beside
`category` and `action` and does not replace them. Those stay two free
strings, never a composite enum, so a new category needs no schema version.

`specversion` is `"1.0"` when the producer sets `source`, `type` and `id` as
CloudEvents attributes. A Meshery event is CloudEvents compatible, but it is
not called a CloudEvent. `severity` stays a first-class field on the eight-level
ladder (`emergency`, `alert`, `critical`, `error`, `warning`,
`informational`, `debug`, `success`).

## Trace context

`traceId` is a W3C Trace Context `trace-id`: 32 lowercase hex digits, not all
zeros. It names the user-level operation, and joins the event to the
OpenTelemetry trace that operation recorded. `parentId` is the W3C
`parent-id`: 16 lowercase hex digits, not all zeros, naming the span of the
sub-operation that emitted the event, so the events of one operation form its
tree. `operationId` keeps its role of grouping the events of one operation.

The client that starts the operation mints both values. Every event of the
operation carries the same `traceId`. A server never mints them when it
persists an event, because an identifier minted at persist time never reaches
the copy the server has already broadcast (meshery/meshery#20879).

## Consumers

- **MeshKit**: `models/events.Event` adopts these optional fields, with these
  JSON names, in the MeshKit follow-up to this schema release (companion to
  meshery/meshkit#1138, which tracks errorutil remediations). The event
  builder lets producers set them.
- **Layer5 Cloud** persists the columns above, implements steps 1 to 5 on its
  `createEvent` handler, sends `Event-Disposition`, and stops its derived
  deduplication from swallowing correlated occurrences.
- **Meshery Server** sets `source`, `correlationKey` and trace context when it
  sends events to the remote provider, and applies the same semantics in its
  local event persister.
- **Blowhorn** re-vendors `schemas/constructs/v1beta3/event/api.yml` (and,
  for `EventError`, `schemas/constructs/v1beta3/error/api.yml`) under the
  released tag and re-projects `EventPayload`, `Event` and `EventsPage`.

Tests: `validation/event_correlation_contract_test.go`.

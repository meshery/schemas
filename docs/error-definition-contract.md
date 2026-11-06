# Error definition contract

`schemas/constructs/v1beta3/error` defines an error code's definition: the
registry entry behind a code such as `meshery-server-1033`. Each probable
cause carries the remediations that answer it, and each remediation can carry
an action a client may run and the policy for running it. The construct also
defines `ErrorReferenceIndex`, the machine-readable list of every code that
docs.meshery.io publishes. `EventError` in the event construct is one
occurrence of a definition, carried as an error event's `metadata.error`
(meshery/schemas#1334).

| Surface | Where |
| --- | --- |
| Schema | `schemas/constructs/v1beta3/error/api.yml`, `error.yaml` |
| Go | `github.com/meshery/schemas/models/v1beta3/errorcode` (package `errorcode`, not `error`, so importers keep the predeclared `error` type) |
| TypeScript types | `v1beta3.ErrorDefinition`, `v1beta3.ProbableCause`, `v1beta3.Remediation`, `v1beta3.ActionPolicy`, `v1beta3.ErrorComponent`, `v1beta3.ErrorSeverity`, `v1beta3.ErrorReferenceIndex`, `v1beta3.EventError`, `v1beta3.EventMatchedCause` from `@meshery/schemas` |
| Helpers | Go `errorcode.FlattenProbableCauses`, `ErrorDefinition.Validate`, `ErrorReferenceIndex.Validate`, and `event.EventError.Validate`; TypeScript `flattenProbableCauses`, `validateErrorDefinition`, `validateErrorReferenceIndex`, `validateEventError` |

## No endpoints, no stored row

No server stores a definition. The component that owns a code declares it in
source (MeshKit's `errors.NewV3`, meshery/meshkit#1138). MeshKit's `errorutil`
exports it, and the docs build publishes it. `api.yml` has `paths: {}`, and
`ErrorDefinition` declares no `id`, `createdAt`, `updatedAt` or `deletedAt`:
the code is its key. Nothing writes a definition over HTTP, so it has no
`*Payload`.

## ErrorDefinition

| Field | Required | Notes |
| --- | --- | --- |
| `code` | yes | `<component.name>-<numericCode>`, for example `meshery-server-1033`. Pattern `^[a-z][a-z0-9]*(-[a-z0-9]+)*-[0-9]+$`. |
| `moniker` | yes | The name in source, for example `ErrCreatingUUIDInstanceCode` (MeshKit's export calls it `name`). Pattern `^Err[A-Z][A-Za-z0-9]*$`. |
| `component` | yes | `ErrorComponent`: `type` (open set: `component`, `adapter`, `library`, `client`, ...) and `name` (`meshery-server`, `meshkit`, `mesheryctl`, ...). |
| `numericCode` | yes | The digits at the end of `code`, kept as a string so leading zeros survive. |
| `severity` | no | `ErrorSeverity`. Omitted for MeshKit's `None`. |
| `shortDescription` | no | One line. MeshKit's lines are joined with `. `. |
| `longDescription` | no | Omitted when only run-time text exists. |
| `probableCauses` | no | `ProbableCause[]`, most likely first. Omitted for a code declared with the flat `errors.New`. |
| `probableCause`, `suggestedRemediation` | no | The flat lists (see [Flattening](#flattening)). |
| `referenceUrl` | no | The code's docs page. Always present in the published index. |
| `retired` | no | The code is no longer emitted. It stays listed so the number is never reused and links still resolve. |

`ErrorSeverity` maps MeshKit's severities one to one: `Emergency` to
`emergency`, `Alert` to `alert`, `Critical` to `critical`, `Fatal` to `fatal`.
`None` is an omitted severity. `error`, `warning`, `informational` and `debug`
are the lower levels of the event severity ladder, for components that use
them. The event that reports an occurrence carries its own `severity` on the
event ladder.

### Causes and remediations are nested

```yaml
probableCauses:
  - id: cluster-unreachable
    description: The cluster's API server is not reachable from Meshery Server.
    remediations:
      - id: check-network
        description: Check that Meshery Server can reach the cluster's API server address.
        actionPolicy: manual
      - id: reconnect                      # shared
        description: Reconnect the connection once the cluster is reachable.
        action: connection.reconnect
        actionPolicy: requiresApproval
  - id: credentials-expired
    description: The connection's credentials for the cluster have expired.
    remediations:
      - id: refresh-credentials
        description: Refresh the connection's credentials from its credential store.
        action: connection.refresh-credentials
        actionPolicy: automatic
      - id: reconnect                      # the same remediation, repeated
        description: Reconnect the connection once the cluster is reachable.
        action: connection.reconnect
        actionPolicy: requiresApproval
```

Each remediation sits under the cause it addresses. Causes and remediations
are never two parallel lists. A remediation that answers more than one cause
is repeated under each cause with the same `id` and identical fields. The
pairing is explicit, the text is written once in source (MeshKit repeats one
`Remediation` value), and readers know it is one remediation.

Ids are lowercase words joined by hyphens. They are stable once published,
because events (`matchedCauses`) and docs anchors refer to them. Cause ids are
unique within a definition, and so are remediation ids, apart from the
repeats of a shared remediation. `probableCauses` and `remediations` are
never empty lists: a cause names at least one remediation.

### Action policy

| `actionPolicy` | A client may |
| --- | --- |
| `automatic` | run `action` on its own, then tell the person it did. |
| `requiresApproval` | run `action` only after a person approves. |
| `manual` (also when omitted) | show the remediation. A person applies it, and the client runs nothing. |

`automatic` and `requiresApproval` need an `action`, an identifier made of
dot-separated lowercase words such as `service.start`. The client that runs
the action owns what it means; the definition only names it. A reader treats a
policy it does not know as `manual`, so nothing is run by mistake. MeshKit's
constructor treats an empty policy as `manual` and refuses an unknown one.

### Rules JSON Schema cannot state

The helpers check these rules, and so must any producer that does not use
them:

1. `code` is `component.name`, a hyphen, then `numericCode`.
2. Cause ids are unique within a definition.
3. A remediation id repeated under several causes has identical fields
   wherever it appears. Two different remediations never share an id.
4. A remediation whose `actionPolicy` is `automatic` or `requiresApproval`
   has an `action`.
5. When `probableCauses` is present, the flat lists, if present, equal the
   lists derived from it.

## Flattening

Earlier consumers read two flat lists: `probableCause[]` and
`suggestedRemediation[]` (MeshKit's `ProbableCause` and
`SuggestedRemediation`, the `MeshkitError` envelope, and the Notification
Center). Both are derived from `probableCauses`:

- `probableCause` is each cause's `description`, in order.
- `suggestedRemediation` is each remediation's `description`, walking the
  causes in order and each cause's remediations in order, with each
  remediation `id` kept the first time it appears.

For the sample above, the derivation gives the lists a MeshKit error has today:

```json
{
  "probableCause": [
    "The cluster's API server is not reachable from Meshery Server.",
    "The connection's credentials for the cluster have expired."
  ],
  "suggestedRemediation": [
    "Check that Meshery Server can reach the cluster's API server address.",
    "Reconnect the connection once the cluster is reachable.",
    "Refresh the connection's credentials from its credential store."
  ]
}
```

A definition or event that has only flat lists is **unpaired**. Nothing pairs
its entries by position.

## ErrorReferenceIndex

```json
{ "schemaVersion": 2, "generatedAt": "2026-11-06T00:00:00Z", "errors": [ /* ErrorDefinition */ ] }
```

docs.meshery.io publishes it at
`https://docs.meshery.io/reference/error-codes/index.json`, built from every
component's export (meshery/meshery#22743). Each code appears once, identified
by its component and `code`. Every entry carries `referenceUrl`. The docs
build orders entries by `referenceUrl`. `schemaVersion` `2` is this format.
Version `1` is the flat format the docs build first published (entries with
`componentType`, `componentName`, `name`, the numeric `code`, and joined
`probableCause` and `suggestedRemediation` strings); a reader reads it as
unpaired definitions.

A component's nested export from MeshKit's `errorutil` is a new file,
`*_errors_index.json`, in the same format, holding that component's
definitions. `referenceUrl` may be absent there, because the docs build assigns
it when it merges the exports. The legacy `*_errors_export.json` is unchanged:
it keeps its snake_case `errors_export` shape (`component_name`,
`component_type`, and `errors` keyed by code, with joined `probable_cause` and
`suggested_remediation` strings), because the docs error-codes workflow and its
Hugo shortcodes read it. It is not an `ErrorReferenceIndex`.
`ErrorReferenceIndex.Validate` (Go) and `validateErrorReferenceIndex`
(TypeScript) check each definition and that no code repeats. The published
index also needs every `referenceUrl`; pass `requireReferenceUrl`.

## EventError: `metadata.error` on an error event

An event that reports an error carries one occurrence of a definition as
`metadata.error`. `Event.metadata` stays a free-form map, so the shape is named
in the event construct, like the design event metadata shapes
([design-event-metadata-contract.md](design-event-metadata-contract.md)), and
it has no `*Payload` twin.

| Field | Notes |
| --- | --- |
| `code` | Required. The full code. |
| `component`, `severity` | The definition's (`ErrorComponent`, `ErrorSeverity`). The event's own `severity` is the level this occurrence was recorded at. |
| `shortDescription`, `longDescription` | Rendered for this occurrence. |
| `probableCauses` | The definition's causes that can apply, nested with their remediations, in the definition's order. At most 20. |
| `matchedCauses` | `EventMatchedCause[]` (`causeId`, optional `confidence` from 0 to 1): the causes most likely this time, most likely first. When `probableCauses` is present, each `causeId` is one of its ids. At most 20. |
| `probableCause`, `suggestedRemediation` | The flat lists. With `probableCauses`, they equal the derivation. Without it, they are unpaired. |
| `referenceUrl` | The code's docs page. |
| `details` | The values the descriptions were rendered from, such as a connection name. Never secrets, credentials, design contents or request bodies. The 16 KB metadata guard applies. |

The shape is closed. It holds only the error, never the design, the request or
the response that failed.

Producers that have the nested form send `probableCauses`, and should also
send the derived flat lists for readers that predate the nesting. Producers
that have only MeshKit's flat lists send `probableCause` and
`suggestedRemediation` alone. Both validate.

Exception: a design validation event whose operation did not complete carries
`metadata.error` as a `DesignEventOperationError` (`code`, `message`); see the
design event metadata contract.

Rows recorded before `EventError` carry MeshKit's `errors.Error` as Go
serializes it, with Go field names: `Code`, `Severity` (a number),
`ShortDescription`, `LongDescription`, `ProbableCause` and
`SuggestedRemediation` (lists of lines). Readers fall back to those keys when
`code` is absent, and treat their lists as unpaired. The rows still validate
as `Event`, because `metadata` is free-form.

## Consumers

- **MeshKit** (meshery/meshkit#1138): `Cause`, `Remediation` and
  `ActionPolicy` carry the fields above, with JSON names matching this
  schema, and switch to `errorcode` types once released. `GetCause` and
  `GetRemedy` return the derived flat lists. `errorutil` writes the
  component's definitions to `*_errors_index.json` as an
  `ErrorReferenceIndex`, and keeps writing the legacy `*_errors_export.json`
  unchanged.
- **Meshery Server** sends `metadata.error` as an `EventError`, with
  `matchedCauses` when it can tell which cause applies.
- **docs.meshery.io** (meshery/meshery#22743) publishes `index.json` as an
  `ErrorReferenceIndex` with `schemaVersion` 2, and a page per code that shows
  each cause with its own remediations.
- **Blowhorn** retires its `upstream-pending` error definition and projects
  `ErrorDefinition` from the released tag. Its `approvalPolicy` becomes
  `actionPolicy` (`requiresApproval`, `automatic`, `manual`). Its codes take
  the form `<component.name>-<numericCode>`.

Tests: `validation/error_definition_contract_test.go`,
`models/v1beta3/errorcode/errorcode_helper_test.go`,
`models/v1beta3/event/event_error_helper_test.go`,
`typescript/errors/errorDefinition.test.ts`.

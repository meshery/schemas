# Design event metadata contract

`Event.metadata` (`schemas/constructs/v1beta3/event`) is a free-form map: its
structure varies by event kind, and its type, `Event` and `EventPayload` do not
change. Design events fill it with one of the named shapes below, so Meshery
Server (Go) and Kanvas (TypeScript) build and read it from the same generated
types (meshery/meshery#22764, meshery/schemas#1335).

The rule behind every shape: **event metadata names a design, it never carries
one.**

## Which event uses which shape

| Event (category / action) | Metadata shape |
| --- | --- |
| `relationship` / `evaluation` | `RelationshipEvaluationEventMetadata` |
| `pattern` / `validate`, `deploy`, `undeploy`, `dry-run` | `DesignValidationEventMetadata` |
| `pattern` / `create`, `update` (design saved) | `DesignSavedEventMetadata` |
| Any error event | `metadata.error` holds only the MeshKit error (see below) |

`DesignEventIdentity` is the set of fields that identify the design:

| Field | Type | Notes |
| --- | --- | --- |
| `designId` | string, `uuid` | Required. |
| `designName` | string | |
| `designVersion` | string | Optional; omitted when the producer does not know it. |
| `designLink` | string, `uri` | Designer view, `<base>/extension/meshmap?mode=design&design=<designId>`. |
| `viewLink` | string, `uri` | Optional. Operator view, `<base>/extension/meshmap?mode=operator&type=view&design_id=<designId>`. |

`RelationshipEvaluationEventMetadata` is the identity fields plus
`historyTitle`, `evaluatedAt` (date-time), `relationshipsAdded`,
`relationshipsRemoved`, `relationshipsUpdated`, `evaluationStatus` and
`evaluationDurationMs` (milliseconds). Counts are integers, minimum 0.

`DesignValidationEventMetadata` is the identity fields plus `status`,
`errorCount`, `errors` and `truncated`:

- `errorCount` is the total number of errors found. It may exceed the length
  of `errors`.
- `errors` lists at most 20 `DesignValidationEventError` entries, each
  `{code, componentId}`. `code` is required; `componentId` is omitted when the
  error is about the design as a whole.
- `truncated` is true when `errorCount` is greater than the number of entries
  in `errors`.

`DesignSavedEventMetadata` is `historyTitle` plus `design`
(`DesignSavedEventDesign`: `id` and `name` only). `design` and `design.id` are
required. The `doclink` key current Meshery Server writes on this event is not
part of the shape; producers drop it when they adopt the type.

Every shape is closed (`additionalProperties: false`), camelCase on the wire,
and declares no server-generated fields (`id`, `createdAt`, `updatedAt`,
`deletedAt`). `DesignSavedEventDesign.id` is the saved design's ID, not a field
the events service generates. Only `designId` (and, on the saved shape,
`design.id`) is required: everything else may be absent, because the 16 KB
guard can reduce metadata to the identity fields.

## Banned keys

Never put design contents into event metadata. None of these keys may appear,
at any depth:

`designFile`, `patternFile`, `components`, `relationships`, `trace`,
`evaluationResponse`, the raw `summary`, `validationResult`.

A design event that needs more detail than its shape holds links to the design
(`designLink`, `viewLink`) instead of copying it.

## The 16 KB guard

Meshery Server applies a 16 KB guard to design event metadata: metadata larger
than 16 KB is dropped down to the identity fields (`designId`, `designName`,
`designVersion`, `designLink`, `viewLink`). Readers must therefore treat every
non-identity field as optional, which is why no shape requires one.

The guard is introduced by meshery/meshery#22764. The events service itself
does not validate `metadata`; the shapes bind producers through their generated
types, and the guard bounds whatever a producer still gets wrong.

## Error codes: validator keyword or MeshKit code

`DesignValidationEventError.code` is one of two kinds:

- a JSON-schema validator keyword, such as `required` or `type`, when design
  validation (for example AJV) rejected the design; or
- a MeshKit error code (for example `meshery-server-1130`) when a server-side
  step such as deploy failed.

Both are strings in one field. Consumers must tolerate codes they do not know.
`componentId` is the component's ID as the design names it. It is not checked
as a UUID (`x-id-format: external`), because an invalid design can carry any
value there and one bad value must not make the whole event unreadable.

## Error events

On an error event, `metadata.error` holds only the MeshKit error, never the
design, the request body or the failed operation's response. No new error
schema is defined for it; it is MeshKit's error as MeshKit serializes it.

## Legacy keys on old Cloud rows

Events recorded before the camelCase flip may still carry snake_case keys in
Meshery Cloud. Readers fall back to them when the camelCase key is absent:

| Current key | Legacy key |
| --- | --- |
| `designName` | `design_name` |
| `viewLink` | `view_link` |

Producers never write the legacy keys, and the generated types have no fields
for them, so a reader that must handle old rows checks the raw map for the
legacy key before (or after) decoding into a generated type.

## Why the shapes have no `*Payload` twins

Event-metadata constructs (`follower_metrics` and its siblings,
[schema-authoring-reference.md](schema-authoring-reference.md#event-metadata-constructs-have-no-server-generated-fields))
each have their own directory and pair an entity with a `{Construct}Payload`
carrying the same field set. These design shapes are different: they are
sub-shapes of `Event.metadata` inside the event construct, not standalone
constructs. They have no endpoints of their own, nothing in them is
server-generated, and the producer builds exactly what the reader decodes. A
twin would be a second hand-maintained copy with nothing to differ by, so each
shape is declared once and used for both writing and reading. `validate-schemas`
does not require twins for non-entity component schemas.

## Composition: restated, not `allOf`

The identity fields are restated in `RelationshipEvaluationEventMetadata` and
`DesignValidationEventMetadata` rather than composed with `allOf` and a `$ref`
to `DesignEventIdentity`. `allOf` does not mix with `additionalProperties:
false` (each branch rejects the other's properties), and restating gives a
flat, closed struct in Go and a flat type in TypeScript.

## Generated types

- Go, package `github.com/meshery/schemas/models/v1beta3/event`:
  `DesignEventIdentity`, `RelationshipEvaluationEventMetadata`,
  `DesignValidationEventMetadata`, `DesignValidationEventError`,
  `DesignSavedEventMetadata`, `DesignSavedEventDesign`. Fields: `DesignID`
  (`uuid.UUID`), `DesignName`, `DesignVersion`, `DesignLink`, `ViewLink`,
  `ComponentID`, `EvaluationDurationMs` and so on; optional fields are pointers
  with `omitempty`.
- TypeScript: `components["schemas"]["<Shape>"]` in
  `@meshery/schemas/constructs/v1beta3/event/Event`, also exported by name from
  the package root as `v1beta3.<Shape>` (for example
  `v1beta3.DesignValidationEventMetadata`).

## Tests

`validation/design_event_metadata_contract_test.go` pins the contract: each
shape is closed, camelCase, carries a description and `x-go-name` per property
and no server-generated or banned keys; the identity fields agree across
shapes and only `designId` is required; `errors` is capped at 20;
`Event.metadata` stays a free-form map; and each sample template under `event/templates/` validates
against its shape, while design contents, a missing `designId`, 21 errors and
negative counts are rejected.

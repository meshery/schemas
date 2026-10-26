# Connection and design organization contract

Every connection and every design belongs to exactly one organization. The
server assigns that organization. Clients do not send it.

`schemas/constructs/v1beta3/connection` is the connection wire contract Meshery
Cloud returns. `schemas/constructs/v1beta3/design` `MesheryPattern` is the
design wire contract for a `meshery_patterns` row. `v1beta1` and `v1beta2` of
both constructs are `x-deprecated` and are not the merged API. Two live
responses still embed the superseded v1beta1 shapes, and those shapes carry
an optional `organizationId` so the server can return it there. The pattern
field is read-only. The connection field is not, for the RTK reason below.
v1beta2 connection and v1beta2 design are not embedded in a live response, so
they are unchanged.

## `organizationId`

The wire name is `organizationId`. The database column is `organization_id`.
The value is a UUID.

On v1beta3 `Connection` and v1beta3 `MesheryPattern` the field is required.
Generated Go uses a non-pointer UUID (`x-go-name: OrganizationID`,
`x-go-type-skip-optional-pointer: true`, `$ref` to the v1beta2 core `Uuid`
schema). The server sets it from the session organization: the
`X-Current-Orgid` header when the client sends it, otherwise the caller's
selected organization. It is absent from `ConnectionPayload`,
`ConnectionRegistrationEvent`, `ConnectionActionRequest`,
`MesheryPatternPayload`, and the design import bodies. `registerConnection`
and `upsertPattern` say the server assigns it from the session. An update
does not move the resource to another organization.

The field is required on read as well as on write: a server never returns a
connection without one. v1.3.105 briefly made `Connection.organizationId`
nullable on read, because Meshery Cloud recorded no organization for
connections before 2026-10-20. That was withdrawn in favour of the tenancy
rule that an organization reference is never NULL. A server holding such
rows assigns each one the organization it can trace (the single organization
of the environments it is mapped into, else the owner's only organization,
else the only one the owner owns among their memberships) and deletes the
rows it cannot trace, then enforces NOT NULL in its database. Meshery Cloud
does this in migration `20261026060521_connections_organization_backfill`.

When the session names no organization, a server may assign the caller's
only organization (else the only one the caller owns among their
memberships), and must not guess between several: Meshery Cloud answers 400.

`MesheryPattern.organizationId` is `readOnly`. `Connection.organizationId` is
not. `RegistrantData.connection` inlines the connection entity into
`registerRegistryComponent` and `registerRegistryRelationship`, and the
superseded connection shape is inlined into
`POST /api/registry/relationships/evaluate` through a component model's
`registrant`. `readOnly` on either of those objects deletes an unrelated
field from the generated RTK client (`connection`, or `design`). The same
constraint is why `Environment.purpose` is not `readOnly`. A value sent on
those inlined connections is ignored.

Kind `desktop` still requires `X-Current-Orgid` on `registerConnection`. A
desktop registration without that header is refused with `400`. Other kinds
use the same session organization, including when the header is absent and
the caller has a selected organization.

`ConnectionSummary` (`additionalProperties: false`) is the page item
`getDesktopConnectionsOfOrganization` returns. It carries a required
read-only `organizationId`, so that closed listing can return the
connection's organization. The summary is not a request body, so `readOnly`
is safe there. `ConnectionPage` items are the full `Connection`, so they
carry it too.

`MesheryPatternPage`, catalog pattern items, and `GithubImportResponse`
patterns are `MesheryPattern`, so each of those reads carries
`organizationId`. Create paths that return a design (save, file or URL
import, GitHub import) assign the organization the same way. The design
document (`design.yaml` / `PatternFile`) is not a `meshery_patterns` row and
does not gain the field.

## Workspace

Workspace assignment is unchanged. A design is still linked to a workspace
through the workspace design mapping, not through a new column on the design.
A workspace the design is assigned to must belong to the design's
organization: `Workspace.organizationId` equals `MesheryPattern.organizationId`.
The server enforces that when it assigns the design. Clients do not send the
design's organization on the assignment routes.

`GET /api/workspaces/{workspaceId}/designs` still returns
`MesheryDesignPage`, whose items are the superseded v1beta1 `MesheryPattern`.
That item lists its fields explicitly, so it now carries an optional
read-only `organizationId`. It is optional there because that shape is also
the body of the deprecated design write. A client value on that deprecated
write is ignored. The canonical design read is v1beta3, where the field is
required.

## Embeds that are not the v1beta3 resource

`v1beta2` model responses embed a v1beta1 `Connection` as `registrant`. That
connection schema is `additionalProperties: false`, so it now declares an
optional `organizationId`. It is not `readOnly`, for the evaluate-request
reason above. v1beta1 `ConnectionPayload` does not accept it.

`RegistrantData.connection` inlines the v1beta3 `Connection` entity into
registry registration. The server ignores a client-supplied `organizationId`
on that object and uses the session organization when it creates a
connection, or the connection's stored organization when the object only
identifies an existing registrant. The field stays on that object:
registration sends the connection, and splitting a second connection schema
just to drop one field would be a breaking change for that request. No
connection or design write payload had an `organizationId` property to
remove.

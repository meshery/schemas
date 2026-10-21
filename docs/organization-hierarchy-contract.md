# Organization hierarchy contract

The `v1beta2` organization construct
(`schemas/constructs/v1beta2/organization/api.yml`) declares the wire contract
for hierarchical organizations: one organization record may have one parent,
with no limit on depth. This document records what that contract is, why the
child listing is a separate projection rather than a reuse of the existing
organization page types, and what each consumer must hold for the contract to
mean what it says.

The build plan this contract is read from is
`docs/plans/2026-09-25-hierarchical-organizations-implementation.md` in
[layer5io/meshery-cloud](https://github.com/layer5io/meshery-cloud) (issue
[#3659](https://github.com/layer5io/meshery-cloud/issues/3659)), sections 4,
5 and 6. Where this document and that plan disagree, this repository is the
authority for the wire shape and the plan is the authority for server
behaviour, per [Source of Truth](../AGENTS.md#source-of-truth).

## The model in one paragraph

Any deployment of Layer5 Cloud has exactly one Provider Organization. Under it
sit any number of top-level organizations, each of which may have children,
which may have children, and so on. The record gains one nullable `parent_id`.
A top-level organization is one whose `parent_id` is NULL and it sits directly
under the Provider Organization; the Provider Organization itself is never
written as anyone's `parent_id`. Membership and permission keys remain the only
authorization system: nothing is inherited down the tree and nothing walks
ancestors. The parent is stamped at creation and is never changed.

## Operations

Both live beside the existing `/api/identity/orgs/{orgId}` operations, carry
`x-internal: ["cloud", "meshery"]` like their siblings, require `jwt`, and are
tagged `Organizations`.

| Operation | Method and path | Key, evaluated in the parent | Success |
| --- | --- | --- | --- |
| `getChildOrgs` | `GET /api/identity/orgs/{orgId}/children` | View Organizations in `orgId` | `200` `ChildOrganizationsPage` |
| `createChildOrg` | `POST /api/identity/orgs/{orgId}/children` | Create Organization in `orgId` | `201` `OrganizationPage`, the same wrapper `createOrg` returns |

`getChildOrgs` takes the construct's shared `page` and `pageSize` query
parameters. The plan spells the second one `pagesize`; this API version
publishes camelCase on the wire and already owns a `pageSize` parameter, so
the operation references that one. Declaring a lowercase twin would be a
partial casing migration inside a published version, which
[`casing-rules.md`](casing-rules.md) forbids.

`createChildOrg` takes the existing `organizationPayload` request body: `name`,
`country`, `region`, `description`. The parent is the path. There is no
`parentId` in the body, and `OrganizationPayload` must not grow one, because
`updateOrg` shares that payload and reparenting after create is not part of
the contract.

### Denials

| Code | `getChildOrgs` | `createChildOrg` |
| --- | --- | --- |
| `400` | - | Empty `name` (the table's `not_empty` constraint, surfaced before insert) |
| `401` | No or invalid token | No or invalid token |
| `403` | Caller lacks View Organizations in the parent | Caller lacks Create Organization in the parent; or the parent is the Provider Organization or the `all` scope, which are never valid parents |
| `404` | Parent missing or soft-deleted | Parent missing or soft-deleted; the body does not say which |

The `403` on `getChildOrgs` is answered by the permission middleware before any
lookup, so the route cannot be used to confirm a foreign organization's
existence. A parent the caller may see that has no children is `200` with an
empty page, not `404`.

### The delete guard

`deleteOrg` (`DELETE /api/identity/orgs/{orgId}`) now declares `409`. A parent
that still has live children is refused and nothing is deleted. Children are
neither reparented nor cascade-deleted; the caller deletes or leaves them
first. Delete behaviour for every other caller and organization is unchanged.

## `ChildOrganization` is a projection, not the entity

The list query the server runs is, by contract:

```sql
SELECT id, name, description, country, region, domain, created_at, updated_at
FROM organizations
WHERE parent_id = ? AND deleted_at IS NULL
ORDER BY name
```

`ChildOrganization` carries exactly those columns plus an optional `parentId`,
and is closed with `additionalProperties: false`. `ChildOrganizationsPage`
carries only `organizations` and `totalCount`, both required.

It does not reuse `OrganizationsPage` or `AvailableOrganization`, for one
reason: every holder of View Organizations in the parent can read this list,
and those types carry `owner`, `metadata`, and (through the server's
`changeToOrgPage`) `inviteId`. An invitation id is an organization's join code.
A projection whose property set is closed cannot pick one of those up by
accident when a column is added to the row.

`parentId` is optional on the wire because the projection is a general child
shape; in practice this listing only ever returns rows that have one.

## What stays off the wire

- **The public organization read does not expose the parent.** `Organization`
  (`organization.yaml`) and `AvailableOrganization` do not declare `parentId`.
  An organization id in `GET /api/identity/orgs/{orgId}` is already a
  disclosure boundary; a parent id would name a second organization the caller
  did not ask for. The server keeps `parent_id` on its stored model with
  `json:"-"` for the same reason.
- **The membership listing is not a tree.** `getOrgs` lists the caller's
  memberships and does not start returning children.
- **No `parentId` on `OrganizationPayload`.** See above.

## What each consumer must enforce

The schema says what the bytes are. For the contract to hold, the server must:

1. Evaluate the key in the **parent** named by the path, through a path
   resolver that fails closed on `all`, empty, and malformed ids, and never
   falls back to the caller's ambient organization.
2. Refuse the Provider Organization and the `all` sentinel as a parent with
   `403`, before any insert.
3. Select only the projection's columns in the list query, so the Go
   `ChildOrganization` cannot be populated from a wider scan.
4. Grant the creator Organization Admin in the new child, in the same
   transaction as the insert and the default workspace.
5. Refuse delete of an organization with live children with `409`.

Consumers must use the generated types, `ChildOrganization` and
`ChildOrganizationsPage` in `models/v1beta2/organization` and the `getChildOrgs`
and `createChildOrg` RTK endpoints, and must not hand-author a second child
organization shape; [Source of Truth](../AGENTS.md#source-of-truth) is the
general rule.

## Tests that pin this

`validation/child_organizations_test.go` fails when:

- either operation is missing, renamed, retargeted off `OrganizationPage` or
  `ChildOrganizationsPage`, loses `jwt`, or loses the shared `x-internal`
  marker;
- `ChildOrganization` opens up, grows a property outside the closed set, or
  gains `owner`, `metadata`, `inviteId` or `deletedAt`;
- `OrganizationPayload`, `Organization` or `AvailableOrganization` grows
  `parentId`;
- `getChildOrgs` declares an inline pagination parameter instead of the shared
  ones;
- `deleteOrg` drops its `409`.

# Environment `purpose` contract

`Environment.purpose` (`schemas/constructs/v1beta3/environment/environment.yaml`)
designates what an environment exists for. It is the authority that resolvers of
organization-level configuration key on.

| Value | Meaning |
| --- | --- |
| `user` | An ordinary environment. People create these to logically group Connections and their Credentials. This is what an environment is unless something says otherwise. |
| `administrative` | An environment the platform itself provisions to hold organization-level configuration. Resolvers of that configuration trust it. |
| absent | Identical to `user`. Every environment written before the column existed is in this state. |

The property is optional on the wire and omitted when empty. It is deliberately
**not** in the entity's `required` list, and carries neither `default:` nor
`readOnly:` - see [Two annotations this property deliberately does not
carry](#two-annotations-this-property-deliberately-does-not-carry).

## Why a typed property and not a name

Environments that hold organization-level configuration were previously
identified by a well-known name.

**A name is a convention, and a convention is not an enforcement point.** `name`
is a free-text field that callers must be able to set, because naming their own
environments is the point of the field. Anything that grants authority based on
its value grants that authority to whoever can write it.

Reserving the well-known name - refusing it on create - was considered and
rejected. It keeps the same mechanism and adds a denylist to it: the authority
still rides on a free-text field, and every future privileged environment needs
another reserved string.

A distinct typed property can carry the authority instead, precisely because it
can be excluded from the surface a caller writes to. That is the whole design:
the property is worth having only for as long as it stays off that surface.
Other behaviours can then hang off it - the designation is a first-class fact
about the environment rather than something inferred from how it was spelled.

## The requirement that makes this worth doing

**Whoever can create an environment must not be able to make it administrative.**
If that does not hold, the original escalation ships again under a new spelling.

Two independent things enforce it, and they are not substitutes for each other.

### 1. Schema: `purpose` is off every client-supplied surface

- `EnvironmentPayload` in `api.yml` has no `purpose` property, and it is the
  schema every `POST` and `PUT` `requestBody` references. Generated Go, TypeScript
  and RTK clients therefore have no field for it, and a body that supplies one
  decodes to nothing.
- `forms/createOrEdit.json` (the RJSF create-or-edit modal) has no `purpose`
  field, so no UI control offers it.
- The property description states the obligation, so it travels into every
  generated artifact and into the published OpenAPI documentation.

`validation/environment_purpose_test.go` fails if any of those change.

The entity property is **not** marked `readOnly: true`, which is the annotation a
reader will expect. See
[Two annotations this property deliberately does not carry](#two-annotations-this-property-deliberately-does-not-carry).

### 2. Servers: each consumer refuses it independently

**A schema annotation is a codegen and documentation hint. It is never access
control.** Nothing in a schema stops a server that copies a request body into an
entity struct - rather than through the payload type - from honouring a supplied
`purpose`. The payload exclusion removes the field from generated clients; it
does not remove it from a hand-rolled request.

Every consumer that persists environments must therefore, on its own side:

1. Decode create and update bodies through `EnvironmentPayload`, never through
   `Environment`. Never populate `Purpose` from anything reaching the server as
   request input.
2. Set `Purpose` only from server-side provisioning code or a data migration.
3. On update, preserve the stored `Purpose` rather than rewriting it from the
   decoded payload - an ORM that saves the decoded struct whole will otherwise
   clear it.
4. Gate the provisioning path on the privilege that actually corresponds to
   administering an organization, not on the privilege to create an environment.

## Reading the value

Use the positive test. `EnvironmentPurpose` is a bare string type, so its zero
value is `""` - the state of every row written before the column existed and of
any consumer that has not yet migrated its storage. `Purpose != user` answers
"administrative" for that empty value and for every purpose a later schema adds,
which grants authority by accident.

Go consumers call `models/v1beta3/environment.Environment.IsAdministrative()`.
TypeScript consumers compare against the literal `"administrative"`.

## Uniqueness

**At most one live environment per organization may carry any single non-`user`
purpose.**

- **Schema** cannot express it. JSON Schema and OpenAPI constrain one document;
  this is a cross-row constraint. It is stated here and in the property
  description, and enforced nowhere in this repo.
- **Database** is where it is enforced: a partial unique index over
  (`organization_id`, `purpose`), restricted to live rows with a non-`user`
  purpose. Each consumer adds it in its own migration.
- **Resolvers** must still fail closed. A resolver that selects an environment
  by purpose returns an error when more than one live row matches, rather than
  taking whichever row the database happened to return first. The index makes
  duplicates unlikely; the fail-closed read is what stops an unordered
  single-row fetch from silently promoting one of them if the index is missing,
  is being added, or is dropped during a migration. Do not rely on the index
  alone.

Resolution therefore has three outcomes a caller must distinguish: exactly one
match, no match (which is the ordinary state for most organizations and is not
an error), and more than one match (which is an error).

## Extending the enum

Additional administrative purposes are additional enum values, not additional
boolean columns. The uniqueness invariant generalises to each new value
unchanged, and a resolver keyed on a specific value keeps selecting the right
environment when a second administrative purpose appears - which a single
boolean could not do, since it would leave the two indistinguishable and force
a fall back to name matching.

`x-enum-varnames` is positional, so a new value is appended and the existing
order is not disturbed.

## Migration

Environments that are administrative by naming convention today are migrated by
each consumer, **never through the API**:

1. Add the column as `NOT NULL DEFAULT 'user'`, so existing rows become
   explicitly ordinary and no row is ever NULL.
2. Set `purpose = 'administrative'` on the rows that the previous name-based
   convention selected, scoped per organization.
3. Add the partial unique index. If step 2 produced a duplicate for any
   organization, the index creation fails - resolve that data before the
   migration lands rather than dropping the index.
4. Repoint the resolver at `purpose` and delete the name-based lookup. Until the
   resolver is repointed, the flag is inert and the name is still the
   enforcement point.

Steps 1 to 3 change shared state and must land only after the matching code
change is committed and deployed, so a rollback does not leave the database
ahead of the code.

## Two annotations this property deliberately does not carry

### `readOnly: true`

This is the annotation the property *should* have, and the one a reviewer will
try to add. It breaks the generated RTK client.

`@rtk-query/codegen-openapi` builds request types through `oazapfts`, whose
`checkSchemaOnlyMode()` propagates `readOnly` **up** the containment tree: a
schema counts as read-only if any property nested anywhere beneath it is
read-only. It stops at `$ref` boundaries, but the bundler inlines aggressively,
so in practice it climbs a long way. `getTypeFromProperties()`, generating a
request type, then keeps a property only when it is write-only or not read-only -
so it drops any property whose subtree contains a single read-only leaf.

Environment is inlined into the registrant connection carried by
`registerRegistryComponent` and `registerRegistryRelationship`. Marking `purpose`
read-only deleted the entire `connection` field from both request types: a
required field vanishing from a published client, with no build failure, no
validation failure, and a diff that reads as an unrelated regeneration.

`tests/readonly-request-body.test.js` pins the repo-wide invariant that no schema
reachable from a `requestBody` carries `readOnly`. Nothing relies on one today.

Losing the annotation costs less than it appears to. `readOnly` was never
enforcement - the payload exclusion is what keeps the property off client-settable
surfaces, and it is strictly stronger, because it removes the field from generated
clients rather than only asking them not to send it.

### `default: user`

openapi-typescript reads a `default` on a response property as a promise that the
server always sends the field, and emits the property non-optional. That is untrue
for every row written before the column existed, which omits it - so the generated
TypeScript would claim a guarantee the data does not make.

The absent-means-`user` rule is stated in the property description instead, and the
column-level `DEFAULT 'user'` belongs in each consumer's migration, which is where
a storage default actually takes effect.

## Consumers of this contract

| Repo | Surface | What it must do | Tracked |
| --- | --- | --- | --- |
| `layer5io/meshery-cloud` | `server/dao/environment_identity_providers.go`, environment handlers, Pop/Postgres migrations | See [meshery-cloud](#meshery-cloud) below. | Follow-up |
| `meshery/meshery` (server) | `server/models/system_migration.go`, `server/models/environment_persister.go`, `server/models/default_local_provider.go` | Point `SystemDatabaseModels()` at `v1beta3` so the column is created (it currently registers the `v1beta1` struct while the persister queries the `v1beta3` one), and never populate `Purpose` from `EnvironmentPayload` - including on update, which rebuilds the entity from the payload and persists it whole. | [meshery/meshery#21802](https://github.com/meshery/meshery/issues/21802) |
| `meshery/meshery` (UI) | `ui/components/environments/` | Surface administrative environments as such; add no form control that sets the property. The create-or-edit modal already renders the canonical RJSF schema, which omits it. | [meshery/meshery#21803](https://github.com/meshery/meshery/issues/21803) |
| `meshery/meshery` (mesheryctl) | `mesheryctl/internal/cli/root/environments/` | Move off the superseded `v1beta1` import to `v1beta3`, display the purpose, and expose no flag that sets it. | [meshery/meshery#21804](https://github.com/meshery/meshery/issues/21804) |

### meshery-cloud

The resolver that reads an organization's identity-provider configuration
currently selects its environment by name.

1. **Replace the name-based lookup with a purpose-based one.** Select on
   `purpose` and `organization_id`, not on `name`. Delete the name constant's
   role as a selector once nothing reads it; keep it only if something still
   needs the display string.
2. **Fail closed on multiple live matches.** The existing lookup takes the first
   row of an unordered single-row fetch. Replace that with a query that
   distinguishes three outcomes: exactly one match, no match (the ordinary state
   for most organizations, and not an error - the cloud-brokered fallback chain
   depends on it staying a non-error signal), and more than one match, which must
   return an error rather than a row.
3. **Migrate existing rows** per [Migration](#migration): add the column
   `NOT NULL DEFAULT 'user'`, set `purpose = 'administrative'` on the rows the
   name convention selected, then add the partial unique index. Never through the
   API.
4. **Gate provisioning on organization administration**, not on the privilege to
   create an environment. Creating an environment and designating one
   administrative are different capabilities and must be authorised separately -
   this is the requirement the whole property exists to satisfy.

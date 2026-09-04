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
  schema every environment `POST` and `PUT` `requestBody` references. The
  generated Go, TypeScript and RTK clients therefore have no field for it on the
  environment create and update endpoints, and a body that supplies one decodes
  to nothing.
- `forms/createOrEdit.json` (the RJSF create-or-edit modal) has no `purpose`
  field, so no UI control offers it.
- The property description states the obligation, so it travels into every
  generated artifact and into the published OpenAPI documentation.

`validation/environment_purpose_test.go` fails if the payload exclusion, the
entity property's declared shape, or the form omission changes. It does not
assert the wording of the description. The `blocking-validation` job in
`.github/workflows/schema-audit.yml` runs it, the helper tests under `models/`,
and `make test-rtk` on every pull request, so a change that removes one of these
guarantees is caught before merge rather than after it.

**The environment endpoints are not the only request surface.** `RegistrantData`
inlines the full `Environment` entity through the registrant connection
(`connection.yaml`), so `registerRegistryComponent` and
`registerRegistryRelationship` do carry `purpose` in a request type, and each
consumer must refuse it on input there. That is the same inlining path described
under [`readOnly: true`](#readonly-true), and it is consistent with what this
contract already says rather than an exception to it: payload exclusion is a
codegen guarantee, never access control, so the server-side refusal required by
[2. Servers: each consumer refuses it
independently](#2-servers-each-consumer-refuses-it-independently) applies
whatever surface a value arrives on. That obligation is assigned, not merely
stated: the registrant handler is named in the Meshery Server row of
[Consumers of this contract](#consumers-of-this-contract), under the same issue
as the payload path, so one maintainer closes both surfaces together.

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

This generalises beyond Go, and beyond reads. **Every predicate that selects
privileged environments names the privileged values explicitly.** It holds for
resolver queries, for the database index predicate under
[Uniqueness](#uniqueness), and for each privileged value the enum later gains. A
`<> 'user'` predicate matches `''` as well, and `''` means ordinary.

## Uniqueness

**At most one live environment per organization may carry any single privileged
purpose** - `administrative`, and each privileged value the enum later gains.

The rule is stated over the privileged values rather than as "not `user`", for
the reason given under [Reading the value](#reading-the-value): `''` is a real
stored value that means ordinary, and a negative predicate sweeps it in.

- **Schema** cannot express it. JSON Schema and OpenAPI constrain one document;
  this is a cross-row constraint. It is stated here and in the property
  description, and enforced nowhere in this repo.
- **Database** is where it is enforced: a partial unique index over
  (`organization_id`, `purpose`) restricted to live rows carrying a privileged
  purpose - `WHERE deleted_at IS NULL AND purpose = 'administrative'`, widened
  to an `IN` list as further privileged values are added. Each consumer adds it
  in its own migration. `WHERE purpose <> 'user'` is the predicate to avoid: it
  indexes ordinary rows stored as `''`, so the second ordinary environment an
  organization creates collides with the first and fails to insert.
- **Writers** must normalise. A consumer persisting an environment whose purpose
  is absent stores `user`, not `''`;
  `models/v1beta3/environment.Environment.EffectivePurpose()` returns the value
  to store. The index predicate only decides which rows are constrained - it
  does not repair rows already written as `''`.
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
   explicitly ordinary and no row is ever NULL. The entity property carries
   `gorm:"not null;default:user"`, so a GORM `AutoMigrate` of the `v1beta3`
   struct creates the column with that constraint; consumers whose migrations
   are hand-written (Pop, raw SQL) must state it themselves.

   Neither half of that constrains what later writes store. The `gorm` tag is
   inert outside GORM - a Pop-based consumer such as meshery-cloud names every
   `db`-tagged column in its `INSERT`, so the column `DEFAULT` never fires and
   an environment created through the API, correctly carrying no purpose
   because `EnvironmentPayload` has no such field, stores `''`. `NOT NULL` does
   not reject `''` either. Normalising on write is what keeps the column
   holding `user`; see [Uniqueness](#uniqueness).
2. Set `purpose = 'administrative'` on the rows that the previous name-based
   convention selected, scoped per organization.
3. Add the partial unique index over the privileged values -
   `... WHERE deleted_at IS NULL AND purpose = 'administrative'`, not
   `WHERE purpose <> 'user'`. If step 2 produced a duplicate for any
   organization, the index creation fails - resolve that data before the
   migration lands rather than dropping the index.
4. Repoint the resolver at `purpose` and delete the name-based lookup. Until the
   resolver is repointed, the flag is inert and the name is still the
   enforcement point.

**Step 1 comes first, before the schemas dependency bump is deployed.** Adding
the column is not a step that can wait for the code to ship: a consumer's model
gains `purpose` the moment it bumps `meshery/schemas`, and from that moment its
queries may name a column its table does not have. See [Sequencing against the
schemas dependency bump](#sequencing-against-the-schemas-dependency-bump).

Steps 2 and 3 are the ones the after-the-code rule is actually right for. A
backfilled value and an index the previous code does not know about change shared
state in the direction a rollback would strand, so they land only after the
matching code change is committed and deployed.

### Sequencing against the schemas dependency bump

**The column has to exist before the bump reaches the consumer.** Both consumers
break in the window between the two, on different paths and for different
reasons.

**`meshery/meshery`.** `purpose` is the first `db`-tag divergence between
`models/v1beta1/environment`, which `server/models/system_migration.go` registers
for `AutoMigrate`, and `models/v1beta3/environment`, which
`server/models/environment_persister.go` queries - every other column matches
today. While that mismatch stands, the table Meshery Server creates has no
`purpose` column even though the struct it writes names one, so
`DB.Create(environment)` emits an `INSERT` naming a column that does not exist and
environment creation fails at runtime. Reads survive, because GORM issues
`SELECT *`.
[meshery/meshery#21802](https://github.com/meshery/meshery/issues/21802)
therefore has to land **before the next `meshery/schemas` release is cut**, not
"before `meshery/meshery` decides to bump" - the bump is not a decision a Meshery
maintainer initiates. This repo's own release fan-out opens it:
`.github/workflows/notify-dependents.yml`, job `bump-meshery`, checks out
meshery/meshery on every release, runs `go get github.com/meshery/schemas@vX.Y.Z`
against the root and `server/policies/wasm` modules, and opens
`[Chore]: Bump meshery/schemas to vX.Y.Z` as a non-draft pull request assigned to
meshery-ci. The failing sequence therefore requires no mistake by anyone: a
release is cut before #21802 lands, the bot opens a routine-looking chore PR, a
maintainer merges it as the ordinary bump it appears to be,
`SystemDatabaseModels()` still registers the `v1beta1` struct while
`environment_persister.go` queries `v1beta3`, and `DB.Create` emits an `INSERT`
naming `purpose` against a table `AutoMigrate` created without it - environment
creation fails at runtime.

`layer5io/meshery-cloud` is **not** in that fan-out, which bumps only
meshery/meshery and meshery/meshkit. Its sequencing genuinely stays manual, so
this release-gating constraint applies to the meshery row alone.

**`layer5io/meshery-cloud`.** Reads fail as well as writes. `purpose` carries
`db:"purpose"`, and `server/models/model_environment.go` aliases the schemas
struct directly (`type Environment = schemasEnvironment.Environment`), so the bump
adds the field to the Pop model itself. Pop names every `db`-tagged column
explicitly instead of issuing `SELECT *`, so every environment lookup selects
`environments.purpose` and every insert names it too - against a table whose
initial-schema definition has no such column and which no later migration alters.
Every environment read **and** write fails with `column environments.purpose does
not exist` until the migration lands. It must therefore be deployed ahead of the
bump, not after it.

**If you are adding a row to [Consumers of this
contract](#consumers-of-this-contract), check your own query builder rather than
inheriting an assumption from the consumers already listed.** A model that knows a
column its table lacks is survivable under one ORM and fatal under another: GORM's
`SELECT *` keeps reads working and fails only on write; Pop's explicit column list
fails both. A sequencing rule derived from one consumer's ORM is not valid for
another's. That is a property of the ORM, not of this column - it recurs for every
field this repo adds to a shared entity.

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
| `layer5io/meshery-cloud` | Environment resolution, environment handlers, Pop/Postgres migrations | See [meshery-cloud](#meshery-cloud) below. | Follow-up |
| `meshery/meshery` (server) | `server/models/system_migration.go`, `server/models/environment_persister.go`, `server/models/default_local_provider.go`, `server/handlers/component_handler.go` (`RegisterMeshmodelComponents`) | Point `SystemDatabaseModels()` at `v1beta3` so the column is created (it currently registers the `v1beta1` struct while the persister queries the `v1beta3` one), and refuse `purpose` on input from **both** request surfaces: never populate `Purpose` from `EnvironmentPayload` - including on update, which rebuilds the entity from the payload and persists it whole - and discard the `purpose` carried inside `RegistrantData.connection.environments[]` on the registrant path rather than letting it reach persistence if those environments are ever persisted. Must land before the next schemas release is cut, because the bump pull request is opened automatically by this repo's release fan-out rather than initiated by a Meshery maintainer - see [Sequencing against the schemas dependency bump](#sequencing-against-the-schemas-dependency-bump). | [meshery/meshery#21802](https://github.com/meshery/meshery/issues/21802) |
| `meshery/meshery` (UI) | `ui/components/environments/` | Surface administrative environments as such; add no form control that sets the property. The create-or-edit modal already renders the canonical RJSF schema, which omits it. | [meshery/meshery#21803](https://github.com/meshery/meshery/issues/21803) |
| `meshery/meshery` (mesheryctl) | `mesheryctl/internal/cli/root/environments/` | Move off the superseded `v1beta1` import to `v1beta3`, display the purpose, and expose no flag that sets it. | [meshery/meshery#21804](https://github.com/meshery/meshery/issues/21804) |

### meshery-cloud

The obligations below are the target state. The specifics of the current
implementation are carried in the tracking issue rather than here, because this
repository is public and the consumer change has not landed yet.

1. **Resolve the environment on `purpose` and `organization_id`.** The
   designation, not the name, is what selects an environment holding
   organization-level configuration. Retain the name constant only if something
   still needs it as a display string, not as a selector.
2. **Fail closed on multiple live matches.** Resolution must distinguish three
   outcomes: exactly one match; no match, which is the ordinary state for most
   organizations and must stay a non-error signal, because the cloud-brokered
   fallback chain depends on it; and more than one match, which must return an
   error rather than any row. A single-row fetch without a total order over a
   duplicated purpose is not an acceptable resolution.
3. **Add the column before the schemas bump is deployed, not after.**
   `server/models/model_environment.go` aliases the schemas struct, and Pop names
   every `db`-tagged column explicitly, so from the moment the bump lands both
   the environment `SELECT` and the environment insert name
   `environments.purpose`. Against a table without that column, every environment
   read and write fails - not only writes. See [Sequencing against the schemas
   dependency bump](#sequencing-against-the-schemas-dependency-bump).
4. **Migrate existing rows** per [Migration](#migration): add the column
   `NOT NULL DEFAULT 'user'`, set `purpose = 'administrative'` on the rows the
   name convention selected, then add the partial unique index over the
   privileged values. Never through the API. Pop never lets that column
   `DEFAULT` fire on insert, so normalise an absent purpose to `user` on write
   with `EffectivePurpose()`; otherwise ordinary environments store `''` and
   land inside any `<> 'user'` index.
5. **Gate provisioning on organization administration**, not on the privilege to
   create an environment. Creating an environment and designating one
   administrative are different capabilities and must be authorised separately -
   this is the requirement the whole property exists to satisfy.

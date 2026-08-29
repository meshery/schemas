# Registration identity: how models and relationships are content-addressed

The registration helpers (`ModelDefinition.Create`, `RelationshipDefinition.Create`)
derive each entity's ID from its **semantic coordinates** rather than minting a
random UUID per registration. Registering the same definition twice - a server
re-seeding on restart, a `mesheryctl model import` of a package the registry has
already seen - resolves to the same ID and persists exactly one row.

## Identity fields

Changing any identity field produces a **new identity** (a new row on next
registration; the old row remains). Changing a non-identity field does **not**
update an already-registered row - re-registration is a no-op that returns the
existing row's ID.

| Entity | Identity fields (hashed) | Excluded (volatile/cosmetic) |
|---|---|---|
| Model (`v1beta1/model`) | `registrant`, `version`, `schemaVersion`, `name`, `model.version` | `id`, `displayName`, `description`, `metadata`, `status`, category |
| Relationship (`v1alpha3/relationship`) | `schemaVersion`, `version`, `kind`, `type`, `subType`, `modelId`, `evaluationQuery`, `selectors` | `id`, `status`, `metadata` (description, styles), `capabilities` |

The hash is `md5(json.Marshal(identifier-struct))` mapped into a UUID, so field
ordering is fixed by the struct, not by the incoming document. The relationship
identifier is a dedicated struct (`relationshipIdentity`) with its own JSON
tags rather than the entity type: the entity tags `modelId` as `json:"-"`, and
hashing the entity would silently drop it, letting the same relationship
shipped by two models collapse onto one ID. Model identity is host-agnostic by
design (`registrant` is part of the hash; `hostID` is not) and predates this
contract; changing it would re-identify every registered model.

## Contract for callers

- `Create` **adopts the persisted identity onto the receiver**: after it
  returns, the receiver's `ID` (and for models `CategoryId`/`RegistrantId`) is
  the stored row's identity, whether the row was inserted by this call or
  already existed. Callers such as meshkit's `registration.register()` rely on
  this to stamp `ModelId` onto every component and relationship in a package;
  before this contract was enforced, registering into an already-known model
  orphaned everything under the nil UUID (meshery/schemas#1168).
- **Re-registration is a no-op**, not an update. To change a registered
  definition's metadata, change an identity field (typically `version`) or
  update the row through the registry's own update paths.
- **Cross-process safety**: the exists-check plus insert cannot be serialized
  across processes by the in-process creation locks alone, so the relationship
  insert uses `ON CONFLICT DO NOTHING`. A registration that loses the race
  becomes a no-op, and because the ID is content-addressed the winner's row is
  the same definition, so the computed ID is returned either way.

## Compatibility

Rows created before content-addressing (random v4 relationship IDs, and
relationship rows orphaned with a nil `model_id`) are not rewritten by these
helpers; cleaning them up is a consumer-side migration (tracked in
meshery/meshery). New registrations neither collide with nor depend on those
legacy rows.

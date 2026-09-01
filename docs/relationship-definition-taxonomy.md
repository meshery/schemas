# Relationship definition taxonomy

Canonical `kind` / `type` / `subType` combinations for Meshery relationship definitions. The schema is `schemas/constructs/v1beta3/relationship/` (`relationships.meshery.io/v1beta3`).

`kind` is an enum: `hierarchical` | `edge` | `sibling`. `type` and `subType` are **open strings**. Do not enum-lock them; copy an established combination. A new `subType` needs a visual paradigm and usually an OPA `evaluationQuery`.

Contributor skill and pedagogical JSON: `meshery/meshery` `.agents/skills/gen-relationship/`. Human docs: https://docs.meshery.io/concepts/logical/relationships and https://docs.meshery.io/project/contributing/contributing-relationships.

## Canonical combinations

| kind | type | subType | Meaning |
|---|---|---|---|
| `edge` | `non-binding` | `reference` | Logical name/id pointer (Deployment → ConfigMap) |
| `edge` | `non-binding` | `network` | Documented L3/L4/L7 selection (Service → Deployment) |
| `edge` | `non-binding` | `firewall` | Policy that allows or denies traffic (NetworkPolicy → Pod) |
| `edge` | `non-binding` | `permission` | Mentions a role or identity without binding it |
| `edge` | `non-binding` | `alias` | Named stand-in, not nested ownership |
| `edge` | `non-binding` | `annotation` | Designer-only line; `metadata.isAnnotation: true`; no patch |
| `edge` | `non-binding` | `inventory` | Rare peer index; prefer hierarchical parent inventory for containment |
| `edge` | `binding` | `permission` | Assigns identities (Role → ServiceAccount) |
| `edge` | `binding` | `mount` | Storage or device attachment (PVC → Pod) |
| `edge` | `binding` | `network` | Connecting provisions or rewrites network identity (rare) |
| `hierarchical` | `parent` | `inventory` | Parent contains/scopes children; parent identity patched onto child |
| `hierarchical` | `parent` | `alias` | Child is a nested object inside the parent (Container → Pod) |
| `hierarchical` | `parent` | `wallet` | Child configuration is held/patched into the parent (WASMFilter → EnvoyFilter) |
| `hierarchical` | `sibling` | `matchlabels` | **In-tree tagsets encoding.** Shared labels; no patch |
| `sibling` | `matchlabels` | `tagsets` | **Schema-native tagsets.** Do not mix with the in-tree encoding in one model |

`badge` is a visual-paradigm name only. There is no in-tree `kind`/`type`/`subType` encoding. Do not invent `subType: badge` without a visualization and evaluation policy.

## Hierarchical from / to

`from` is the child. `to` is the parent.

| subType | Data flow |
|---|---|
| `inventory` | Parent **mutates** the child |
| `alias` | Child **mutates** the parent |
| `wallet` | Child **mutates** the parent |

## Actions

`mutatorRef` is the **source** (value to read). `mutatedRef` is the **sink** (field to patch). Both are `string[][]`. Sequence lengths must match: index `i` of `mutatorRef` copies onto index `i` of `mutatedRef`.

Omit `patch` when the relationship only matches (tagsets, annotation).

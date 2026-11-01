# Mention alias contract

`schemas/constructs/v1beta3/mention_alias` is an organization's memory of
who's who across platforms. A message tags an entity (a person, company, page
or community) as `@entity`. One message goes to several platforms, and each
names the same entity its own way: a plain name on LinkedIn, `@handle` on X,
`@name.domain` on Bluesky, `u/` or `r/` on Reddit, a member ID on Slack. A
mention alias records one confirmed answer, so the next message that tags the
entity starts from it instead of a guess.

It is not a ledger entry. A ledger is "has this been done" bookkeeping with no
typed value; an alias needs its uniqueness, its platform set and its handle
rules in the contract, so it is its own construct.

## Shape

| Field | Owner | Notes |
| --- | --- | --- |
| `id`, `createdAt`, `updatedAt` | server | `createdAt` is the first confirmation; `updatedAt` the last. |
| `organizationId` | server | From the session. Never in a path or body. |
| `entity` | client | The tag after `@`, without it. 1-100 characters, the tag grammar `^[A-Za-z0-9_](?:[A-Za-z0-9_.-]*[A-Za-z0-9_])?$`. Compared ignoring case; stored in the casing of the last write. |
| `platform` | client | `MentionAliasPlatform`: `linkedin`, `x`, `bluesky`, `reddit`, `slack`. Closed; a platform joins by adding a value. |
| `handle` | client | 0-200 characters, no surrounding whitespace. Empty is a confirmed answer: send the name as plain text. The server does not check the value against the platform's handle rules. |
| `confirmedBy` | server | The user whose session last wrote the alias. Omitted once that user is purged. |

There is no `deletedAt`: a delete removes the row, so its key can be written
again.

**Unique key:** (`organizationId`, lower(`entity`), `platform`).

## Routes

| Route | Operation | Notes |
| --- | --- | --- |
| `GET /api/mention-aliases` | `getMentionAliases` | Paged (`page`, `pageSize`, `search`, `order`), answers `MentionAliasPage` (`page`, `pageSize`, `totalCount`, `mentionAliases`). Repeatable `entity` (at most 100, each compared ignoring case) returns the aliases for every tag in one message in one read. Repeatable `platform` narrows by platform. Default order `entity asc`, then `platform asc`. |
| `POST /api/mention-aliases` | `upsertMentionAliases` | Body `MentionAliasesPayload { mentionAliases: MentionAliasPayload[] }`, 1-250 entries. Upsert by the unique key, all or nothing. Answers `200` with the stored aliases in request order. |
| `DELETE /api/mention-aliases/{mentionAliasId}` | `deleteMentionAlias` | `204`. |

Fitting the original proposal (blowhorn-ai/blowhorn#1318) to this repo's rules
changed four things:

- **No `{orgId}` in the path.** Like the other organization-scoped constructs
  (`content_item`, `ledger`, `claim`), the organization is the session's
  (`X-Current-Orgid`, then the selected organization). A path organization
  would need a second authorization rule and could turn another
  organization's id into a `403` instead of the uniform `404`.
- **The upsert is `POST`, not `PUT`.** `PUT` on a collection would replace the
  collection; this write merges keys into it. The repo's method table puts an
  upsert on `POST` answering `200`.
- **The body is an object around the array**, so the payload schema stays one
  alias (`MentionAliasPayload`) and the request can grow fields later
  without a breaking change.
- **`confirmedAt` is dropped.** It would always equal `updatedAt`, because
  every write is a confirmation.

## Writes

- A new key creates the alias. An existing key replaces `handle` and the
  `entity` casing, sets `confirmedBy` to the caller and advances `updatedAt`,
  even when the handle is unchanged. `id`, `organizationId` and `createdAt`
  never change.
- `handle` is required: the write replaces it, so omitting it cannot mean
  "keep what is stored".
- The request runs in one transaction. A validation failure, or a key named
  twice in one body, is `400` and stores nothing.

## Access

Every operation needs a live membership of the session organization and one
of the content item keys (Catalog Management / Content Items), because
aliases only describe how content items tag people:

| Key | Moniker | Guards |
| --- | --- | --- |
| View Content Items | `CatalogManagementViewContentItems` | `getMentionAliases` |
| Edit Content Item | `CatalogManagementEditContentItem` | `upsertMentionAliases` |
| Delete Content Item | `CatalogManagementDeleteContentItem` | `deleteMentionAlias` |

A caller without the key gets `403` before any row is read. An id that is not
an alias of the session organization, and a caller who is not a live member,
get the same `404`. Every operation declares `429` (`MeshkitError429`), like
the other Blowhorn route families. All operations are `x-internal: ["cloud"]`.

Dedicated mention alias keys would have to start in the Features &
Permissions sheet, which `build/permissions.csv` is refreshed from daily. Rows
added only to the CSV would be dropped by the next refresh, so this construct
reuses the existing keys.

## Consumers

| Repo | What it must do |
| --- | --- |
| `layer5io/meshery-cloud` | Add a `mention_aliases` table (`id`, `organization_id`, `entity`, `platform`, `handle`, `confirmed_by` with `ON DELETE SET NULL`, `created_at`, `updated_at`) with a unique index on (`organization_id`, `lower(entity)`, `platform`). Serve the three routes under the `/api` group with the keys above, scoping every statement to the session organization and a live membership. |
| Blowhorn | Read the aliases for a message's tags with one `getMentionAliases` call per order and write the confirmed answers with `upsertMentionAliases`. |

`validation/mention_alias_contract_test.go` pins the payload, entity shape,
routes and platform enum.

# Verifying consumers are off a superseded construct version

When a construct gains `x-superseded-by` (see the annotations added in
[#1094](https://github.com/meshery/schemas/pull/1094)), the follow-up question is always
"is anyone still on the old version?" This document records **how to answer that
correctly**, because the obvious method - grepping consumer code for
`v1beta1/<construct>` - is only valid for one of the two consumption surfaces.

## The trap: version is invisible on the TypeScript surface

Successive versions of a construct routinely declare **identical `operationId`s and
near-identical paths**. For example `v1beta1/view` and `v1beta2/view` both declare
`createView`, `getViews`, `shareView`, `getViewById`, `updateView`, `deleteView` on
exactly the same paths.

`build/bundle-openapi.js` merges **every** construct version into one spec, then filters
by `x-internal` into `cloud_openapi.yml` / `meshery_openapi.yml`. The generated RTK
clients (`@meshery/schemas/cloudApi`, `/mesheryApi`) are produced from those bundles, so
for any colliding operation **exactly one version wins and the other is absent from the
published client entirely**.

Consequences, **scoped to the generated RTK clients only**:

- A UI importing `@meshery/schemas/cloudApi` cannot tell you its construct version from
  the import path or the hook name - `useGetViewByIdQuery` exists once, for the winner.
- Conversely, a consumer **cannot** reach the superseded version of a merged construct
  *through those clients*, because the losing shape is not in them.

So for the bundled-client surface the question is not "what does the consumer import" but
**"which version won the merge"** - a property of this repo, not of the consumer.

### The merge argument does not cover all of npm

`package.json` also exports `./constructs/*`, and the published package ships **every**
version, superseded ones included - `dist/constructs/v1beta1/badge/Badge.d.ts` and its
eight siblings are all present. So `@meshery/schemas/constructs/v1beta1/badge/Badge` is a
perfectly valid import.

A consumer therefore reaches this package through **two independent npm sub-surfaces**, and
clearing one says nothing about the other:

| npm sub-surface | Can it reach a superseded construct? | How to clear it |
| --- | --- | --- |
| `cloudApi` / `mesheryApi` | No - the loser is absent from the client | Discriminator (which version won) |
| `constructs/*` deep import | **Yes** - all versions are published | Grep for version-qualified deep imports |

Never conclude "npm-only consumer, so the merge argument covers it" - that skips the
deep-import check, which is the only one of the two that can actually find a superseded use.

## Per-surface method

Every predicate below is written to be run from a consumer repo root and is
self-contained - the exclusions are part of the command, not a reminder you have to
remember to apply. `docs/` is excluded because prose citing a schema path is not
consumption, and the nested-worktree exclusion keeps sibling checkouts from
double-counting.

| Surface | Where version lives | Predicate (run from consumer repo root) |
| --- | --- | --- |
| Go | Import path is version-qualified | `grep -rE '"github\.com/meshery/schemas/models/<ver>/<construct>"' --include='*.go' --exclude-dir=vendor --exclude-dir=docs --exclude-dir=.git .` |
| TS deep import | Path is version-qualified | `grep -rhoE '@meshery/schemas/(typescript/)?constructs/v1[a-z0-9]+/[a-zA-Z0-9_]+' --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' --exclude-dir=node_modules --exclude-dir=docs --exclude-dir=.git .` |
| TS bundle (`cloudApi`/`mesheryApi`) | **Not in the import.** Baked into the generated client | Use a *discriminator* - below |

`--exclude-dir` matches by directory name at any depth, so `--exclude-dir=node_modules`
also covers nested `ui/node_modules`. Add `--exclude-dir=worktrees` (or the agent-worktree
directory your checkout uses, e.g. `.claude`) when the repo keeps sibling checkouts inside
itself, or the same file is counted once per worktree.

### Choosing a discriminator

Pick a token that exists in exactly one of the two versions, then count it in
`_openapi_build/cloud_openapi.yml` (source of truth) or in a consumer's installed
`node_modules/@meshery/schemas/dist/cloudApi.d.ts` (what that consumer actually resolves):

- **Path-parameter rename** - `/api/organizations/badges/{id}` (v1beta1) vs `{badgeId}` (v1beta2).
  In the generated `.d.ts` this appears as the ApiArg field: `id: string` vs `badgeId: string`.
- **Casing migration** - newer versions use camelCase on the wire per
  [`casing-rules.md`](casing-rules.md): `accepted_by` vs `acceptedBy`, `price_per_unit` vs
  `pricePerUnit`. Prefer construct-unique fields; `created_at`/`updatedAt` appear across many
  constructs and will not discriminate.
- **Operations added in the successor** - e.g. `v1beta3/event` adds `createEvent`,
  `deleteEvent`, `bulkDeleteEvents`, `bulkUpdateEventStatus`, `updateEventStatus`; the
  presence of those `operationId`s proves v1beta3 won.
- **Operations absent in the predecessor** - `v1beta1/keychain` declares paths but no
  `operationId`s at all, so any `getKeychains` in the bundle is v1beta2.

### Always run a positive control

A count of zero is meaningless unless the same predicate demonstrably matches when the
string *is* present. Two cheap controls:

1. Run the exact predicate against a scratch file containing the import you claim is absent.
2. List what the superseded namespace *does* match in that repo, e.g.
   `grep -rhoE '"github\.com/meshery/schemas/models/v1beta1/[a-z_]+"' --include='*.go' --exclude-dir=vendor --exclude-dir=docs --exclude-dir=.git .`
   If that returns other constructs, v1beta1 imports are findable and the zero is real.

## Result as of 2026-07-28 (schemas v1.3.41)

All nine constructs annotated in #1094, across all three consumers - **no consumer is on a
superseded version**. Go evidence is the version-qualified import. The npm surface needed
both checks: no consumer deep-imports a version-qualified superseded construct, *and* the
successor won the bundle merge for all nine, so the superseded shape is not in the
generated clients.

| Construct | Superseded | meshery-cloud | meshery | meshery-extensions |
| --- | --- | --- | --- | --- |
| badge | v1beta1 | Go v1beta2 (6 files) | not used | no Go dep |
| credential | v1beta1 | Go v1beta2 (2) | Go v1beta2 (1) | no Go dep |
| key | v1beta1 | Go v1beta2 (2) | Go v1beta2 (1) | no Go dep |
| keychain | v1beta1 | Go v1beta2 (2) | not used | no Go dep |
| view | v1beta1 | not used | Go v1beta2 (1) | no Go dep |
| event | v1beta2 | Go v1beta3 (2) | not used | no Go dep |
| invitation | v1beta2 | Go v1beta3 (10), TS `constructs/v1beta3/invitation` | not used | no Go dep |
| plan | v1beta2 | Go v1beta3 (16) | not used | no Go dep |
| subscription | v1beta2 | Go v1beta3 (12) | not used | no Go dep |

`meshery-extensions` consumes `@meshery/schemas` from npm only - no `go.mod` dependency and
no schemas import in any of its 32 Go files. Being npm-only is **not** on its own a clean
bill: the `constructs/*` deep-import path could still reach a superseded schema. It was
cleared by running that check too, which returned zero version-qualified deep imports.

**v1beta2 is on both lists** - successor for badge/credential/key/keychain/view and
superseded for event/invitation/plan/subscription. Never collapse this into a single
"is v1beta2 used" check. Enumerating the namespace per repo keeps the two roles distinct:
in meshery-cloud, `models/v1beta2/*` resolves to badge, credential, key, keychain,
organization, role, team, user - all successor uses, and none of the four superseded
constructs appear.

## Maintaining this document

Refresh the result table when `x-superseded-by` is added to further constructs. The
method section is version-independent; keep it that way.

# Canonical RJSF Form Schemas — Migration Roadmap

**Tracking issue:** [meshery/schemas#866](https://github.com/meshery/schemas/issues/866)

## Background

The Meshery UI surface (meshery, meshery-cloud, layer5io/sistent)
renders many modal forms — design publishing, model import, credential
create/edit, environment / workspace edit, support requests — using
[`@rjsf/core`](https://github.com/rjsf-team/react-jsonschema-form). For
years, those form schemas were hand-authored under
[`layer5io/sistent`](https://github.com/layer5io/sistent)'s
`src/schemas/<construct>/schema.tsx` and consumed by name from
`@sistent/sistent`.

That arrangement made Sistent the de-facto source of truth for catalog
publish forms, design import forms, credential forms — even though
canonical OpenAPI definitions for every one of those constructs already
live in `meshery/schemas`. The result was concrete drift. As of
2026-05-04:

| Field | Canonical [`v1beta2/catalog/catalog.yaml`](../schemas/constructs/v1beta2/catalog/catalog.yaml) | Sistent `publishCatalogItemSchema` (now superseded) |
|---|---|---|
| `compatibility` | array, items enum: `["kubernetes"]` | array, items enum: `["kubernetes"]` ✅ |
| `type` | string, enum (8 values) | string, enum (8 values) ✅ |
| `patternCaveats` | string | string ✅ |
| `patternInfo` | string | string ✅ |
| `publishedVersion` | string | (intentionally absent — server-set) |
| `class` | string, oneOf | (intentionally absent — server-set) |
| `snapshotURL` | array | (intentionally absent — server-generated) |

Sistent's copy was structurally aligned for that snapshot, but nothing
guaranteed it stayed aligned as the canonical Catalog construct
evolved. A new required field on the canonical (or a new permitted
`compatibility` value, or a renamed property) would not have surfaced
to the form, silently shipping a UI that misrepresents the construct.

## Goal

Move every hand-authored form schema from
`layer5io/sistent/src/schemas/<construct>/schema.tsx` into
`meshery/schemas` under `typescript/forms/<version>/<construct>/` so
that:

1. The canonical OpenAPI construct and the form rendered to the user
   share a single repo, with a Go test (`validation/forms_test.go`)
   asserting the form is a strict subset of the construct.
2. Sistent flips its `*Schema` exports to re-exports from
   `@meshery/schemas`. Consumer source code (in `meshery`,
   `meshery-cloud`, etc.) stays unchanged because the export names
   don't move; only their origin does.
3. `meshery-cloud`'s ESLint guard + Jest architecture test
   ([AGENTS.md § Form Schema Source-of-Truth](https://github.com/layer5io/meshery-cloud/blob/master/AGENTS.md))
   ratchets shut as each pending file's import flips to
   `@meshery/schemas` directly. (`AGENTS.md` is symlinked from
   `CLAUDE.md` in that repo, so either path resolves to the same
   document.)

## Scope — 10 forms

| Sistent local schema | Canonical home |
|---|---|
| `publishCatalogItem` | `v1beta2/catalog` |
| `importDesign` | `v1beta3/design` |
| `importModel` | `v1beta2/model` |
| `importFilter` | filter is part of catalog/design |
| `createAndEditEnvironment` | `v1beta3/environment` |
| `createAndEditWorkspace` | `v1beta3/workspace` |
| `kubernetesCredential` | `v1beta1/credential` |
| `grafanaCredential` | `v1beta1/credential` |
| `prometheusCredential` | `v1beta1/credential` |
| `helmConnection` | `v1beta2/connection` |

Sistent's `helpAndSupportModal` is **out of scope**. It's a UI-only
support form with no canonical construct and stays under
`layer5io/sistent/src/schemas/`.

## Phases

### Phase 1 — Framework + first form (this repo, this PR)

- [x] Layout: form schemas co-located with their construct as
      `schemas/constructs/<version>/<construct>/forms/{<action>.json, <action>.ui.json}`,
      sitting alongside the existing `api.yml`, `<construct>.yaml`,
      and `templates/`
- [x] Top-level barrel: `typescript/forms/index.ts` imports each
      JSON via relative path and re-exports under the canonical
      `<Construct><Action>RjsfSchemaV<Version>` naming;
      `typescript/index.ts` re-exports from there
- [x] Local types in `typescript/forms/types.ts` so consumers don't pull
      `@rjsf/utils` transitively
- [x] Go subset-validator: `validation/forms_test.go` 
      (`TestFormSchemasAreSubsetOfCanonical` and
      `TestFormSchemasIndexExportsExist`)
- [x] AGENTS.md `## Canonical RJSF form schemas` section with authoring
      checklist
- [x] First migrated form: `CatalogPublishRjsfSchemaV1Beta2` +
      `CatalogPublishRjsfUiSchemaV1Beta2`

### Phase 2 — Remaining 9 forms (this repo, follow-up PRs)

Each PR adds one (or a small batch of related) form(s) under
`typescript/forms/<version>/<construct>/`, extends the case table in
`validation/forms_test.go`, and re-exports from
`typescript/forms/index.ts`. Suggested batching:

1. `importDesign`, `importFilter` (catalog-family imports)
2. `importModel` (registry-family)
3. `createAndEditEnvironment`, `createAndEditWorkspace`
4. `kubernetesCredential`, `grafanaCredential`, `prometheusCredential`
5. `helmConnection`

After all 10 land, cut a `@meshery/schemas` minor release (e.g.
`1.3.0`).

### Phase 3 — Sistent flip (`layer5io/sistent`)

In `layer5io/sistent`:

- [ ] Bump `@meshery/schemas` to the release that ships all 10 forms.
- [ ] Replace each `src/schemas/<construct>/schema.tsx` with a re-export
      from `@meshery/schemas`. Example:
      ```ts
      // BEFORE: hand-authored object literal
      // AFTER:
      export {
        CatalogPublishRjsfSchemaV1Beta2 as default,
      } from "@meshery/schemas";
      ```
- [ ] Keep `src/schemas/<construct>/uiSchema.tsx` as the local UI hints
      (or also flip if the upstream form ships hints). Either way, the
      Sistent-published export name stays the same so consumers don't
      need source changes.
- [ ] Cut a `@sistent/sistent` minor release.

### Phase 4 — Downstream cascade

- [ ] `meshery/meshery` — bump `@sistent/sistent` to the new release.
      No source changes required because Sistent's export names did
      not move.
- [ ] `meshery-cloud` — bump `@sistent/sistent` AND flip the 7 files in
      [`KNOWN_PENDING_UPSTREAM_MIGRATION`](https://github.com/layer5io/meshery-cloud/blob/master/ui/__tests__/architecture/schema-source-of-truth.test.ts)
      to import directly from `@meshery/schemas`. Remove the matching
      `eslint-disable` block comments and remove the entries from the
      allowlist. The cloud's stale-allowlist guard
      (`schema-source-of-truth.test.ts`) makes the last step
      mandatory.

## Non-goals

- We are **not** generating form schemas from OpenAPI at build time
  in this iteration. Hand-authored JSON files (with the subset Go
  test as a guard) are simpler to land and review. Generation is a
  reasonable Phase 5+ improvement once we have the case-table audit
  practice.
- We are **not** migrating UI hints (`uiSchema.tsx`) to canonical
  unless the upstream layout calls for it. Hints are presentation,
  not contract.
- We are **not** changing Sistent's published export names. The
  flip is purely an import-source change.

## Authoring rules

See [`AGENTS.md` § Canonical RJSF form schemas](../AGENTS.md) for the
authoring checklist and the four subset rules
(`TestFormSchemasAreSubsetOfCanonical`).

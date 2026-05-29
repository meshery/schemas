# Schema Authoring Reference

> Detailed authoring reference extracted from the top-level agent
> instructions (`AGENTS.md` / `CLAUDE.md`). The dual-schema pattern,
> naming conventions, and the generated-artifact warnings remain inline
> in the top-level file; everything below is the long-form detail.

## File structure for a construct

```shell
schemas/constructs/v1beta1/<construct>/
  api.yml                          # OpenAPI spec: endpoints + all schema definitions
  <construct>.yaml                 # Entity (response) schema
  templates/
    <construct>_template.json      # Example instance
    <construct>_template.yaml
```

## Per-Property Validation Constraints

The schema validator (`validation/` Go package, invoked via `go run ./cmd/validate-schemas`) enforces per-property constraints as advisory rules (Rules 37–42). These do not block CI but are reported on `--warn` runs and should be resolved in new schemas.

| Rule | What it checks |
|---|---|
| 37 | Every property has a `description` |
| 38 | String properties have `minLength`, `maxLength`, `pattern`, `format`, or `const` |
| 39 | Numeric properties have `minimum`, `maximum`, or `const` |
| 40 | ID-like properties (`id`, `*_id`, `*Id`) have `format: uuid` or `$ref` to a UUID type |
| 41 | Page-size properties (`page_size`, `pagesize`, `pageSize`) have `minimum: 1` |
| 42 | `format` values must be from the known OpenAPI 3.0 / JSON Schema set (e.g., `date-time`, `email`, `uri`, `uuid`) |

### `x-id-format: external` — exempting non-UUID IDs

Some ID properties hold external system identifiers (e.g., Stripe subscription IDs, coupon codes) that are not UUIDs. To exempt these from Rule 40, annotate the property with `x-id-format: external`:

```yaml
billing_id:
  type: string
  description: Billing ID from the external payment processor.
  x-id-format: external
  maxLength: 500
  pattern: '^[A-Za-z0-9_\-]+$'
```

The annotation is self-documenting: the exemption lives with the schema property where the domain knowledge is, not in a hardcoded allowlist. Use it only for properties that genuinely hold non-UUID external identifiers.

## Canonical RJSF form schemas

[`@rjsf/core`](https://github.com/rjsf-team/react-jsonschema-form) form
schemas are co-located with their construct under
`schemas/constructs/<version>/<construct>/forms/`. They sit alongside
`api.yml`, `<construct>.yaml`, and `templates/` so every artifact
about a construct lives in one directory. The migration tracking
issue is [meshery/schemas#866](https://github.com/meshery/schemas/issues/866).

### Layout

```shell
schemas/constructs/<version>/<construct>/
  api.yml                       # OpenAPI spec
  <construct>.yaml              # entity (response) schema
  templates/
    <construct>_template.json   # example instance
  forms/                        # RJSF form schemas (this section)
    <action>.json               # RJSF JSON Schema (source of truth)
    <action>.ui.json            # RJSF UI Schema (presentation hints)

typescript/forms/
  index.ts                      # imports every forms/*.json and
                                # re-exports under canonical names
  types.ts                      # local RJSFSchema / UiSchema types
```

`typescript/forms/index.ts` imports each JSON file directly via
relative path (`../../schemas/constructs/<version>/<construct>/forms/<action>.json`)
and re-exports under `<Construct><Action>RjsfSchemaV<Version>` (and
`…UiSchema…`), e.g. `CatalogPublishRjsfSchemaV1Beta2`. Top-level
`typescript/index.ts` re-exports those names so consumers reach them via:

```ts
import {
  CatalogPublishRjsfSchemaV1Beta2,
  CatalogPublishRjsfUiSchemaV1Beta2,
} from "@meshery/schemas";
```

### What goes in a form schema

A form schema is a **strict subset** of the corresponding canonical
OpenAPI construct, capturing only the fields the user fills in.
Server-generated fields (`publishedVersion`, `class`, `snapshotURL`,
audit timestamps, ids, …) are intentionally absent. Presentation
hints — `x-rjsf-grid-area`, `format: textarea`, `x-encode-in-uri`,
default values — layer on top.

A form schema **must not**:
- introduce a property not present in the canonical construct;
- declare a `type` that disagrees with the canonical;
- list an enum value (top-level or in `items.enum`) that the
  canonical does not allow;
- require a field the canonical does not define.

### Enforcement

The form-schema contract is enforced by five Go tests in
`validation/forms_test.go`. All run as part of `go test ./validation/...`
(or `make validate-schemas`). Drift in any one of them is a CI
blocker.

| Test | What it gates |
|---|---|
| `TestFormSchemasAreSubsetOfCanonical` | Each form is a strict subset of its canonical OpenAPI construct: every form property exists in canonical with matching `type`; every top-level / `items.enum` value is a subset of the canonical's enum; every `required` name exists in canonical. Recursive into nested objects + array items, gated on canonical having structure to compare against. Walks the package-level `formCases` slice. |
| `TestEveryFormJsonHasCaseTableEntry` | Every `schemas/constructs/<v>/<c>/forms/*.json` (excluding `.ui.json`) appears in `formCases`. Catches the silent-failure case where a form ships AND gets exported but the subset rule is never asserted for it. |
| `TestEveryFormHasUiSchemaPair` | Every `<action>.json` is paired with an `<action>.ui.json` and vice versa. Catches half-authored forms. |
| `TestFormExportsFollowVersionConvention` | Every export in `typescript/forms/index.ts` bound to a form-JSON import ends in `RjsfSchemaV<Version>` (or `RjsfUiSchemaV<Version>`), with `<Version>` matching the version directory of the imported file (e.g. `V1Beta2` from `.../v1beta2/...`). Catches version-suffix drift between the path and the export name. |
| `TestFormSchemasIndexExportsExist` | Every `schemas/constructs/<v>/<c>/forms/*.json` is imported by `typescript/forms/index.ts`. Catches the "added a JSON but forgot to wire it up" mistake. |

### Authoring checklist

When adding a new form schema:

1. Identify the canonical OpenAPI construct (e.g.
   `schemas/constructs/v1beta3/workspace/workspace.yaml`).
2. Create `schemas/constructs/<version>/<construct>/forms/<action>.json`
   with only the user-input subset of fields, plus presentation
   hints. Use the same field names, types, and enum values as the
   canonical.
3. Create `schemas/constructs/<version>/<construct>/forms/<action>.ui.json`
   for `ui:order`, `ui:widget`, etc.
4. Add an `import` and a typed `<Construct><Action>RjsfSchemaV<Version>` /
   `<Construct><Action>RjsfUiSchemaV<Version>` re-export in
   `typescript/forms/index.ts`. The version segment in the export
   name (e.g. `V1Beta2`) must match the version directory of the
   imported JSON (`.../v1beta2/...`); the
   `TestFormExportsFollowVersionConvention` guard enforces this.
5. Append a row to `formCases` in `validation/forms_test.go`. This
   is mandatory — `TestEveryFormJsonHasCaseTableEntry` will fail
   the build if you ship a form file without a corresponding
   subset assertion.
6. Run `go test ./validation/...` and `npm run build` locally.
   The full guard set is steps 1–5 above; tests will tell you
   which one you missed.

## Go helper files

Auto-generated Go structs (`models/<version>/<construct>/<construct>.go`) are committed by the artifact-generation workflow on `master`. Do not edit them by hand; the manually written helpers below are the files contributors should maintain directly:

```shell
models/v1beta1/<construct>/
  <construct>.go          # Auto-generated — DO NOT edit
  <construct>_helper.go   # Manual — add SQL driver, Entity interface, TableName(), etc.
```

Always add `// This is not autogenerated.` at the top of helper files.

Use `x-generate-db-helpers: true` on a schema component to auto-generate `Scan`/`Value` SQL driver methods for types stored as JSON blobs in a single DB column. Do NOT use this for types mapped to full DB tables.

## x-internal annotation

**Required on every operation.** The bundler and validate-schemas Rule 14 reject operations that omit it. Use the annotation to declare which bundled outputs include the path:

- `x-internal: ["cloud"]` — cloud-only (`_openapi_build/cloud_openapi.yml`)
- `x-internal: ["meshery"]` — Meshery-only (`_openapi_build/meshery_openapi.yml`)
- `x-internal: ["cloud", "meshery"]` — both bundled outputs

## SQL Driver (`Scan`/`Value`) Implementation Rules

When manually implementing `sql.Scanner` and `driver.Valuer` for map-like types:

### Preferred rule: serialize instead of returning SQL NULL from `Value()`

`core.Map` marshals nil maps to the JSON string `"null"` instead of SQL NULL. Prefer the same behavior for new or updated helpers unless the column is explicitly nullable and the nil-vs-empty distinction is required and documented.

```go
// CORRECT — matches core.Map pattern
func (m MapObject) Value() (driver.Value, error) {
    b, err := json.Marshal(m)
    if err != nil {
        return nil, err
    }
    return string(b), nil
}

// WRONG — writes SQL NULL, inconsistent with core.Map
func (m MapObject) Value() (driver.Value, error) {
    if m == nil {
        return nil, nil   // <- do not do this
    }
    ...
}
```

### Preferred rule: zero the receiver on nil src in `Scan()`

When `src` is nil (SQL NULL), new or updated `Scan` implementations should explicitly zero the receiver. Some legacy helpers return early, but clearing the receiver avoids stale data if the same struct is reused across rows.

```go
// CORRECT
case nil:
    *m = nil
    return nil

// WRONG — leaves stale data
case nil:
    return nil
```

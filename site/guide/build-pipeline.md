---
layout: guide
title: Build Pipeline
description: What make build does and how schemas become Go structs, TypeScript types, and RTK Query clients.
---

<div class="breadcrumb"><a href="/">Home</a> <span>/</span> <a href="/guide/">Guide</a> <span>/</span> Build Pipeline</div>

# Build Pipeline

<p class="page-desc">
  A complete map of what <code>make build</code> does — from OpenAPI YAML to generated Go,
  TypeScript, and RTK Query client code.
</p>

## Overview

<div class="pipeline-diagram" aria-label="Build pipeline flow diagram">
  <div class="pd-col pd-source">
    <div class="pd-label">Source</div>
    <div class="pd-box pd-box--source">
      <code>schemas/constructs/</code><br>
      <span class="pd-sub">api.yml + *.yaml per construct</span>
    </div>
  </div>
  <div class="pd-arrow">▶</div>
  <div class="pd-col pd-validate">
    <div class="pd-label">Stage 1</div>
    <div class="pd-box pd-box--validate">
      <strong>Validate</strong><br>
      <span class="pd-sub">make validate-schemas</span>
    </div>
  </div>
  <div class="pd-arrow">▶</div>
  <div class="pd-col pd-bundle">
    <div class="pd-label">Stage 2</div>
    <div class="pd-box pd-box--bundle">
      <strong>Bundle</strong><br>
      <span class="pd-sub">make bundle-openapi</span><br>
      <span class="pd-out">meshery_openapi.yml<br>cloud_openapi.yml</span>
    </div>
  </div>
  <div class="pd-arrow">▶</div>
  <div class="pd-col pd-gen">
    <div class="pd-label">Stages 3 – 5</div>
    <div class="pd-box pd-box--gen">
      <div class="pd-gen-row">
        <strong>Go structs</strong>
        <span class="pd-sub">oapi-codegen → models/</span>
      </div>
      <div class="pd-gen-row">
        <strong>TS types</strong>
        <span class="pd-sub">openapi-typescript → typescript/generated/</span>
      </div>
      <div class="pd-gen-row">
        <strong>RTK hooks</strong>
        <span class="pd-sub">rtk-query-codegen → typescript/rtk/</span>
      </div>
    </div>
  </div>
  <div class="pd-arrow">▶</div>
  <div class="pd-col pd-output">
    <div class="pd-label">Packages</div>
    <div class="pd-box pd-box--output">
      <div class="pd-out-row">github.com/meshery/schemas</div>
      <div class="pd-out-row">@meshery/schemas (npm)</div>
    </div>
  </div>
</div>

<style>
.pipeline-diagram {
  display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
  margin: 1.25rem 0 1.75rem; padding: 1.25rem 1rem;
  background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius);
  overflow-x: auto;
}
.pd-col { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; min-width: 120px; }
.pd-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
.pd-box {
  border-radius: var(--radius); padding: 0.6rem 0.75rem; font-size: 0.75rem;
  line-height: 1.45; text-align: center; width: 100%;
}
.pd-box--source { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
.pd-box--validate { background: #fefce8; border: 1px solid #fde68a; color: #78350f; }
.pd-box--bundle { background: #f0fdf9; border: 1px solid #a7f3d0; color: #065f46; }
.pd-box--gen { background: #f5f3ff; border: 1px solid #ddd6fe; color: #4c1d95; text-align: left; }
.pd-box--output { background: var(--darker); border: 1px solid #444e57; color: rgba(255,255,255,0.85); }
.pd-sub { font-size: 0.68rem; color: inherit; opacity: 0.7; display: block; }
.pd-out { font-size: 0.68rem; display: block; margin-top: 0.25rem; font-family: var(--mono); }
.pd-gen-row { margin-bottom: 0.35rem; }
.pd-gen-row:last-child { margin-bottom: 0; }
.pd-out-row { font-family: var(--mono); font-size: 0.7rem; margin-bottom: 0.2rem; }
.pd-arrow { font-size: 1rem; color: var(--muted); flex-shrink: 0; }
</style>

Running `make build` executes all stages in order.

---

## Stage 1 — Validate (`make validate-schemas`)

Runs the Go validator in `validation/` against every schema file. Rules are classed as:

| Severity | Behaviour |
|---|---|
| `Blocking` | Fails the build. PR cannot merge. |
| `Advisory` | Reported but does not fail the build. Listed in `build/validate-schemas.advisory-baseline.txt`. |

Common blocking rules:

| Rule | What it checks |
|---|---|
| Rule 14 | Every operation has `x-internal` |
| Rule 32 | DB-backed property names match their `db:` tag |
| Rule 41 | Page-size properties have `minimum: 1` |

Run it standalone:

```bash
make validate-schemas          # blocking rules only
make validate-schemas-strict   # blocking + advisory
make audit-schemas             # advisory, suppressing baselined violations
```

---

## Stage 2 — Bundle (`make bundle-openapi`)

Merges all per-construct `api.yml` files into two self-contained bundled specs:

- `_openapi_build/meshery_openapi.yml` — operations marked `x-internal: ["meshery"]`
- `_openapi_build/cloud_openapi.yml` — operations marked `x-internal: ["cloud"]`

The bundler resolves all `$ref` paths and inlines them. The bundled outputs are what downstream code generators consume.

---

## Stage 3 — Go structs (`make generate-golang`)

Uses [`oapi-codegen`](https://github.com/deepmap/oapi-codegen) to generate Go types from each construct's `api.yml`.

**Output:** `models/<version>/<construct>/<construct>.go`

Do not edit generated files. Add custom logic to the `_helper.go` sibling:

<div class="file-tree">
models/v1beta1/connection/<br>
&nbsp;&nbsp;connection.go<span class="note">← AUTO-GENERATED. Do not edit.</span><br>
&nbsp;&nbsp;connection_helper.go<span class="note">← Manual. Add Scan/Value, TableName(), etc.</span>
</div>

Helper files must start with `// This is not autogenerated.`

**`x-generate-db-helpers: true`** — add to a schema component (not a property) to auto-generate `Scan` and `Value` SQL driver methods for types stored as JSON blobs in a single DB column:

```yaml
components:
  schemas:
    ConnectionSubType:
      x-generate-db-helpers: true
      type: object
      properties:
        kind: { type: string }
```

---

## Stage 4 — TypeScript types (`make generate-ts`)

Uses [`openapi-typescript`](https://github.com/drwpow/openapi-typescript) to generate TypeScript types.

**Output:** `typescript/generated/<version>/<construct>/`

Types are re-exported from `typescript/index.ts` and published as the `@meshery/schemas` npm package.

---

## Stage 5 — RTK Query clients (`make generate-rtk`)

Generates RTK Query API hooks from the bundled OpenAPI specs.

**Output:** `typescript/rtk/`

Consumed by `meshery/meshery` and `layer5io/meshery-cloud` UI code.

---

## Running the full build

```bash
make build          # all stages
go test ./...       # verify generated Go compiles and tests pass
npm run build       # verify TypeScript dist compiles
```

---

## Schema validation rules reference

Advisory per-property rules (Rules 37–42) are reported on `--warn` runs:

| Rule | What it checks |
|---|---|
| 37 | Every property has a `description` |
| 38 | String properties have `minLength`, `maxLength`, `pattern`, `format`, or `const` |
| 39 | Numeric properties have `minimum`, `maximum`, or `const` |
| 40 | ID-like properties have `format: uuid` or `$ref` to a UUID type |
| 41 | Page-size properties have `minimum: 1` |
| 42 | `format` values are from the known OpenAPI 3.0 set |

---

## Troubleshooting

**`make build` fails with "unknown field"**
The schema uses a property name that conflicts with `oapi-codegen` reserved fields. Rename the property.

**`go test ./...` fails with import errors**
A schema change renamed or removed a type. Check the generated `models/` files and update any `_helper.go` references.

**Advisory rule fires for a new field**
Add the required constraint (`description`, `minLength`, etc.) to the schema property. Do not add new entries to the baseline manually.

**`validate-schemas` fires Rule 32**
A DB-backed field's schema property name doesn't match its `db:` tag. This is expected during the camelCase migration — file it under Phase 3 per the [identifier-naming migration plan](https://github.com/meshery/schemas/blob/master/docs/identifier-naming-migration.md).

# Code Generator Reference

Detailed reference for how the build scripts consume OpenAPI schemas and produce generated code.

## Table of Contents

1. [Bundle OpenAPI](#bundle-openapi)
2. [Go Generator](#go-generator)
3. [TypeScript Generator](#typescript-generator)
4. [RTK Query Generator](#rtk-query-generator)
5. [Package Discovery](#package-discovery)
6. [Troubleshooting](#troubleshooting)

## Bundle OpenAPI

**Script**: `build/bundle-openapi.js`
**Dependencies**: `swagger-cli`, `@redocly/cli`

### What it does

1. Walks `schemas/constructs/` and discovers packages (directories with `api.yml`)
2. Bundles each `api.yml` with `swagger-cli bundle --dereference` into JSON
3. Merges all bundles (minus excluded packages) using `@redocly/cli join`
4. Filters the merged spec by `x-internal` tags into separate outputs

### Outputs

| File | Contents |
|------|----------|
| `_openapi_build/constructs/<version>/<package>/merged-openapi.json` | Per-package bundled JSON |
| `_openapi_build/merged_openapi.yml` | Complete merged spec |
| `_openapi_build/cloud_openapi.yml` | Endpoints tagged `x-internal: cloud` |
| `_openapi_build/meshery_openapi.yml` | Endpoints tagged `x-internal: meshery` |

### Excluded from merge

- `v1alpha1/core` — reusable definitions, not a standalone API
- `v1alpha1/capability` — capability schemas

## Go Generator

**Script**: `build/generate-golang.js`
**Dependency**: `oapi-codegen` v2.5.1
**Prerequisite**: none beyond the source schemas themselves; `make build` still runs bundling as part of the full pipeline

### Go generator flow

1. Discovers schema packages directly from `schemas/constructs/**/api.yml`
2. Stages temporary package-local specs from the source schemas and reachable refs
3. Rewrites cross-package subschema refs so reuse points at package `api.yml` component refs
4. Builds import mappings from reachable external `$ref` targets
5. Collects `x-oapi-codegen-extra-tags`, `x-go-name`, and `x-go-type` metadata across direct `$ref` and `allOf` composition
6. Generates Go structs via `oapi-codegen` with both JSON and YAML struct tags
7. Rewrites external import aliases to readable names and preserves explicit `x-go-type-import.name` aliases
8. Infers repetitive helper methods from the generated package types and existing handwritten helpers
9. Applies extra tags and field-name/type overrides post-generation

### Output location

`models/<version>/<package>/<package>.go`

### Key behaviors

- **YAML tag mirroring**: After `oapi-codegen` runs, `build/generate-golang.js` runs a regex-based `addYamlTags()` pass that scans for `json:"fieldName,omitempty"` struct tags and appends matching `yaml:"fieldName,omitempty"` tags. This is a text-only transform that mirrors the JSON tag value verbatim and may miss unconventional or hand-edited tag layouts.
- **Extra tags**: `x-oapi-codegen-extra-tags` values are injected as additional struct tags
- **Import mappings**: External `$ref` targets are mapped to Go import paths so cross-package types compile
- **Composed-schema inheritance**: Property metadata is collected through both direct `$ref` and `allOf`, so composed object schemas inherit field tags and overrides
- **Explicit alias preservation**: When `x-go-type-import.name` is set, the generator rewrites imported aliases to match that exact name
- **Implicit helper discovery**: Repetitive helpers should be discovered from generated type structure and DB-tagged local struct usage, not from a hand-maintained package/type manifest
- **Union types**: `oneOf` schemas generate union types using `json.RawMessage` + helper methods
- **Package naming**: Directory name becomes Go package name (with overrides, e.g., `design` → `pattern`)

### Schema features that affect Go output

| Schema feature | Go result |
|---------------|-----------|
| `type: string, format: uuid` | `openapi_types.UUID` |
| `x-go-type: "core.Map"` | Uses the specified Go type directly |
| `x-go-type-import` | Adds the specified import |
| `x-go-type-skip-optional-pointer` | Skips `*` prefix on optional fields |
| `x-oapi-codegen-extra-tags` | Adds custom struct tags |
| `allOf` | Inherits property tags and overrides from composed subschemas during post-processing |
| `oneOf` / `anyOf` | Union type with `RawMessage` |
| `$ref` to external schema | Import from the referenced package |
| `nullable: true` | Pointer type |

### Helper generation guidance

The preferred order for Go helper generation is:

1. Infer from generated struct shapes and tags.
2. Infer from stable package/type naming conventions.
3. Leave a narrow handwritten exception in the package helper file only when the relationship cannot be derived safely.

Avoid central manifests that enumerate packages or types just to tell the generator which helper methods to emit.

## TypeScript Generator

**Script**: `build/generate-typescript.js`
**Dependency**: `openapi-typescript` (via npx)
**Prerequisite**: `bundle-openapi.js` must run first

### TypeScript generator flow

1. Reads bundled JSON from `_openapi_build/constructs/`
2. Generates TypeScript type definitions via `openapi-typescript`
3. Also exports the raw JSON schema as a TypeScript const

### Output files

| File | Contents |
|------|----------|
| `typescript/generated/<version>/<package>/<Package>.ts` | Type definitions |
| `typescript/generated/<version>/<package>/<Package>Schema.ts` | JSON schema as const |

### Important: typescript/index.ts

This file is **manually maintained** and defines the public API surface for the npm package. When adding a new construct, you must update this file:

```typescript
// Add type import
import { components as NewComponents } from "./generated/v1beta1/newconstruct/Newconstruct";

// Add to namespace
export namespace v1beta1 {
  export type NewConstruct = NewComponents["schemas"]["NewConstruct"];
}
```

Note: The property name in `["schemas"]["..."]` matches the schema component name, which may differ in casing from what you expect. Check the generated `.ts` file to confirm.

## RTK Query Generator

**Script**: `build/generate-rtk.js`
**Dependency**: `@rtk-query/codegen-openapi`
**Prerequisite**: `bundle-openapi.js` must run first (uses filtered merged specs)

### Config files

| Config | Input spec | Output |
|--------|-----------|--------|
| `typescript/rtk/cloud-rtk-config.ts` | `cloud_openapi.yml` | `typescript/rtk/cloud.ts` |
| `typescript/rtk/meshery-rtk-config.ts` | `meshery_openapi.yml` | `typescript/rtk/meshery.ts` |

### How x-internal affects RTK

- Endpoints tagged `x-internal: ["cloud"]` go into `cloud.ts` hooks
- Endpoints tagged `x-internal: ["meshery"]` go into `meshery.ts` hooks
- Endpoints with no `x-internal` tag are included by `filterOpenapiByTag.js` (when unset in both `cloud_openapi.yml` and `meshery_openapi.yml`) and can generate RTK hooks, potentially in both `cloud.ts` and `meshery.ts`

## Package Discovery

**Module**: `build/lib/config.js`

The algorithm:

1. Walk `schemas/constructs/<version>/`
2. Find directories containing `api.yml`
3. Apply exclusions (`core`, `capability`)
4. Apply name overrides (`design` → `pattern`)
5. Return `{version, package}` tuples

This means:

- **Adding a new construct**: just create the directory with `api.yml` — it's auto-discovered
- **The directory name matters**: it becomes the Go package name and TypeScript module path
- **No registration needed**: the build system finds new constructs automatically

## Troubleshooting

### "Schema validation error" during bundle

Usually means invalid `$ref` path. Check:

- Relative path is correct from the current file's location
- Referenced file and schema name exist
- No typos in the component name after `#/components/schemas/`

### Go compilation errors after generation

- Missing imports: add `x-go-type-import` to the schema field
- Alias mismatch after generation: set `x-go-type-import.name` and make the alias prefix in `x-go-type` match it exactly
- Type conflicts: two schemas might define the same type name — use `x-go-type` to disambiguate
- Extra tags not appearing: ensure `x-oapi-codegen-extra-tags` is at the property level, or intentionally use a single-entry `allOf` wrapper for a reusable alias schema component
- Unsure about `allOf`: use it for schema composition, reusable alias wrappers, or the known PR `#629` design array-item compatibility case; otherwise keep a direct property `$ref`
- New helper behavior seems to require a package list: first check whether the rule can be derived from generated struct tags, local type references, or naming conventions; only keep irreducible exceptions handwritten

### TypeScript build errors

- Import path issues: don't use `.d.ts` extension in imports
- Missing exports: update `typescript/index.ts` manually
- Schema name mismatch: check the generated `.ts` file for the actual names

### Package not discovered by build

- Ensure `api.yml` exists in the construct directory (not just `<construct>.yaml`)
- Check if the directory is in the exclusion list in `build/lib/config.js`

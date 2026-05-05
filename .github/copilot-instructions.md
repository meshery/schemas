# Copilot instructions for `meshery/schemas`

This repository is the schema source of truth for Meshery APIs. OpenAPI under `schemas/constructs/` drives Go models, TypeScript types, runtime schema exports, and RTK Query clients that downstream repos consume. Prefer changing schema sources and manual helper/export files; avoid editing generated output directly.

## Build, test, and validation commands

```bash
# Initial setup
make setup

# Primary validation and generation flow
make validate-schemas
make build
npm run build

# Focused generation steps
make bundle-openapi
make generate-golang
make generate-rtk
npm run generate:types
node build/index.js bundle
node build/index.js golang
node build/index.js rtk
node build/index.js types
node build/index.js all

# Lint
make golangci

# Go tests
go test ./...
go test ./validation/...
go test ./validation/... -run TestRuleName

# Node tests
make test-rtk
node --test tests/generate-rtk.test.js
node --test --test-name-pattern="guardOptionalQueryParams" tests/generate-rtk.test.js
node --test tests/validate-schemas-generate-golang.test.js

# Advisory and strict validation modes
make audit-schemas
make audit-schemas-full
make audit-schemas-style-full
make audit-schemas-debt-full
make validate-schemas-strict

# Cross-repo drift audit (optional sibling checkouts)
make consumer-audit MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud EXTENSIONS_REPO=../meshery-extensions
```

`make test-rtk` is the only Node regression test wired into the `Makefile`; the other `.test.js` files under `tests/` are run directly with `node --test`.

## High-level architecture

1. **Schema source layout:** each construct lives under `schemas/constructs/<version>/<construct>/`. `api.yml` is the construct entrypoint used for discovery, endpoint definitions, and `$ref` wiring. Sibling `*.yaml` files hold entity/subschemas, and `templates/` holds example JSON/YAML instances that must stay in sync with schema changes.
2. **Discovery and bundling:** the JavaScript build layer auto-discovers constructs by walking `schemas/constructs/` for directories containing `api.yml` (`build/lib/config.js`). `bundle-openapi.js` dereferences each construct into `_openapi_build/constructs/<version>/<package>/merged-openapi.json`, then merges non-deprecated APIs into `_openapi_build/merged_openapi.yml` plus filtered `cloud_openapi.yml` and `meshery_openapi.yml`.
3. **Code generation:** bundled specs feed `generate-golang.js`, `generate-typescript.js`, and `generate-rtk.js`, producing `models/`, `typescript/generated/`, and `typescript/rtk/`. `npm run build` then packages the published TypeScript distribution in `dist/` via `tsup`.
4. **Manual export surface:** `typescript/index.ts` is not generated. It decides which generated types and schema objects are publicly exported, and some large schema imports stay commented out intentionally to keep the bundle smaller.
5. **Validation and audits:** `validation/` is a dependency-leaf Go package used for build-time schema auditing (`cmd/validate-schemas`), runtime OpenAPI document validation in downstream consumers, and `cmd/consumer-audit`, which compares schemas against Meshery and Meshery Cloud routers plus RTK Query clients in Meshery, Meshery Cloud, and Meshery Extensions to catch API drift.

## Key conventions

- **Dual-schema pattern is the target pattern for entity constructs:** `<construct>.yaml` is the response schema for the full persisted entity. New or version-bumped writable entity APIs should usually use a separate `*Payload` schema in `api.yml`, but existing published versions may still use `*Request` bodies. Never use the entity schema as a `POST` or `PUT` request body.
- **`api.yml` is the construct index:** adding a new subschema file is not enough; it must be referenced from that construct's `api.yml` or generation/validation will miss it.
- **Treat generated output as derived artifacts:** do not hand-edit `models/`, `typescript/generated/`, or `dist/`. Manual extension points are schema YAML files, `models/*/*_helper.go`, `models/core/*`, `typescript/index.ts`, build scripts, and validation code.
- **The shared Go core package is unversioned:** schema references still use `schemas/constructs/v1alpha1/core/api.yml`, but Go type imports for core types must resolve to `github.com/meshery/schemas/models/core` with alias `core`.
- **Canonical wire naming targets camelCase:** see `docs/identifier-naming-contributor-guide.md` for the full directory. For newly authored API versions, JSON/schema/query identifiers and path parameters use camelCase, path/query IDs use an `Id` suffix, schema component names use PascalCase, and path segments use kebab-case, while DB column names stay snake_case in `db:` tags. Legacy published versions may intentionally retain snake_case on the wire, and list endpoints may still reference shared core query params such as `pagesize`; follow the contract actually used by that version rather than partially recasing it.
- **Every operation needs `x-internal`:** it controls whether an endpoint lands in the Meshery bundle, the Cloud bundle, or both. Missing `x-internal` fails validation and bundling.
- **Keep templates updated:** when schema shapes or defaults change, update the matching `templates/*_template.json` and `templates/*_template.yaml`.
- **`x-generate-db-helpers` is schema-level only:** use it on named schema components stored as JSON blobs in one DB column. For amorphous objects, prefer `x-go-type: "core.Map"` instead.
- **SQL helper behavior is type-family specific:** `core.Map`-style JSON helpers serialize nil values to JSON `"null"`, `core.NullTime` returns SQL `NULL`, and some slice helpers persist empty arrays. Match the existing helper family's nil/zero-value semantics, and make new `Scan()` implementations reset the receiver in a way that matches the type's zero value when `src` is nil.
- **HTTP design is enforced by validation:** create-only `POST` endpoints should return `201`; bulk deletes use `POST .../delete`, not `DELETE` with a request body; `operationId` must be lower camelCase verbNoun.
- **Two repo-specific exceptions matter:** `schemas/constructs/v1beta1/design/` generates the Go/TS package name `pattern`, and deprecated constructs remain in-tree for compatibility even when excluded from merged OpenAPI bundles.
- **Migration rule:** while a construct is actively being migrated into this repo, the downstream implementation is the field-discovery reference. Once the schema is established here, this repo becomes authoritative and downstream code should conform to it.

## Intentional design decisions

- `SqlNullTime` is still valid in some entities for backward compatibility with v1beta1 and downstream ORM consumers.
- `x-enum-casing-exempt: true` marks published enum values that must not be lowercased.
- `x-id-format: external` is the correct escape hatch for non-UUID identifiers such as external billing IDs.
- Deprecated constructs marked with `info.x-deprecated: true` stay in the repository for compatibility; they are excluded from merged OpenAPI output dynamically rather than being deleted.
- Legacy pagination fields like `page_size` and `total_count` may remain in existing published API versions, but new canonical-casing versions should use `pageSize` and `totalCount`.

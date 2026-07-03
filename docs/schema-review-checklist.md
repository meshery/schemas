# Schema Review Checklist & Conventions

> Detailed review reference extracted from the top-level agent
> instructions (`AGENTS.md` / `CLAUDE.md`). Use this when reviewing or
> opening a PR that touches schemas.

## Intentional Design Decisions (Do Not Flag)

These patterns are deliberate. Do not suggest changes during code review:

1. **`SqlNullTime` vs `NullTime`** - Some entities use `SqlNullTime` for backward compatibility with v1beta1 and downstream GORM/Pop consumers. Do not suggest switching unless the entire entity is being migrated.
2. **Core Go package** - All core types (both generated scalars like `Uuid`, `Time`, `Id` and manual utilities like `Map`, `NullTime`, `MapObject`) live in a single package: `github.com/meshery/schemas/models/core`. Generator output path overrides and Go import overrides map all schema core versions (`v1alpha1/core`, `v1beta1/core`, `v1beta2/core`) to this single package. Schema `x-go-type-import` for any core type must use `models/core` with alias `core`.
3. **`x-enum-casing-exempt: true`** - Enums with this annotation contain published values that will never be lowercased (e.g., `PlanName`, `FeatureName`). Do not suggest lowercasing.
4. **`page_size` / `total_count` - deprecation list, not a perpetual exception.** These snake_case envelope fields remain accepted for backward compatibility within an existing API version. Each resource migrates its pagination envelope to `pageSize` / `totalCount` at its next canonical-casing API-version bump. On a newly authored API version, use camelCase directly. `page` stays `page` (already a camelCase-compatible single-word identifier).
5. **Deprecated v1beta1 constructs** - Files with `x-deprecated: true` are kept for backward compatibility. Known casing violations are fixed in the next canonical-casing version. Do not flag issues in deprecated constructs.
6. **Target-state wire form: camelCase regardless of DB backing.** Under the canonical contract, a property like `subType` is camelCase on every wire (JSON tag, OpenAPI property name, TS field) whether or not it is DB-backed. When it is DB-backed, the snake_case column name lives only in `x-oapi-codegen-extra-tags.db` (e.g., `db: "sub_type"`); the JSON tag stays `subType`. The legacy pattern of DB-backed fields using snake_case on the wire is retired per-resource across Phase 3; legacy resources that still publish `sub_type` on the wire migrate at their next API-version bump, not in-place.
7. **`x-id-format: external`** - ID properties annotated with this hold external system identifiers (e.g., Stripe IDs) that are not UUIDs. The validator skips `format: uuid` enforcement for these. Do not remove the annotation or add `format: uuid`.

## Common Mistakes to Avoid

1. ❌ Hand-editing generated Go code in `models/` directory
2. ❌ Hand-editing generated TypeScript code in `typescript/generated/` directory
3. ❌ Hand-editing built files in `dist/` directory
4. ❌ Using deprecated `core.json` references
5. ❌ Adding redundant `x-oapi-codegen-extra-tags` when using schema references
6. ❌ Forgetting to update template files in the `templates/` subdirectory with default values
7. ❌ Not testing the build process after schema changes
8. ❌ Placing template files outside the `templates/` subdirectory
9. ❌ Using `.d.ts` extension in TypeScript import paths
10. ❌ Assuming schema property names are PascalCase (check actual generated `.d.ts` files)
11. ❌ Adding `x-generate-db-helpers` on individual properties - it must be at the schema component level
12. ❌ Using `x-generate-db-helpers` on amorphous types without a fixed schema - use `x-go-type: "core.Map"` instead
13. ❌ Using the full entity schema as a `POST`/`PUT` `requestBody` - always use a separate `*Payload` schema
14. ❌ Omitting `additionalProperties: false` from entity `<construct>.yaml` files
15. ❌ Adding new `Value()` implementations that return `(nil, nil)` unless SQL NULL behavior is explicitly required and documented
16. ❌ In new `Scan()` implementations, returning without zeroing the receiver when `src` is nil
17. ❌ Using PascalCase for new `operationId` values - always lower camelCase (`getPatterns`, not `GetPatterns`)
18. ❌ Using SCREAMING\_CASE path parameters (`{orgID}`, `{roleID}`) - always camelCase with `Id` suffix (`{orgId}`, `{roleId}`)
19. ❌ Using `DELETE` with a request body for bulk operations - use `POST /api/{resources}/delete` instead
20. ❌ Returning 200 from a `POST` that exclusively creates a new resource - use 201
21. ❌ Using all-lowercase `id`/`url` suffixes in parameter names - always capitalize (`workspaceId`, not `workspaceid`; `pageUrl`, not `pageurl`)
22. ❌ Template files with wrong value types - if schema says `type: array`, use `[]` not `{}`; if `type: string`, use `""` not `{}`
23. ❌ Adding `format: uuid` to ID properties that hold external system identifiers (Stripe IDs, etc.) - use `x-id-format: external` instead
24. ❌ Setting `minimum: 0` on page-size properties - page size must be at least 1
25. ❌ Omitting `tags` from operations - every operation must have at least one tag for API documentation and client generation
26. ❌ In newly authored / canonical-casing API-version work, introducing a `json:` tag that matches the `db:` tag on a new DB-backed field - under the canonical contract wire is camel and DB is snake, so they differ by design on DB-backed fields. `db: "user_id"` pairs with `json: "userId"`, never `json: "user_id"`. Legacy published constructs may intentionally retain matching `json:` and `db:` tags for wire compatibility and should not be flagged on that basis alone.

## Checklist for Schema Changes

- [ ] Modified only schema JSON/YAML files (not generated code)
- [ ] Updated corresponding template files in `templates/` subdirectory with default values
- [ ] Used non-deprecated `v1alpha1/core/api.yml` references
- [ ] If adding new schemas, referenced them from `api.yml` (the construct index file)
- [ ] Removed redundant tags when using schema references
- [ ] If a schema type is stored as a JSON blob in a DB column AND has a dedicated schema definition, used `x-generate-db-helpers: true` at the schema component level (not per-property)
- [ ] Ran `make build` successfully
- [ ] Ran `go test ./...` successfully
- [ ] Ran `npm run build` successfully
- [ ] Verified only schema JSON/YAML files are in the commit
- [ ] If updating `typescript/index.ts`, verified import paths are correct
- [ ] (New entity) `<construct>.yaml` has `additionalProperties: false`
- [ ] (New entity) `<construct>.yaml` includes all server-generated fields in `properties` and `required`
- [ ] (New entity with writes) `api.yml` defines a `{Construct}Payload` with only client-settable fields
- [ ] (New entity with writes) All `POST`/`PUT` `requestBody` entries reference `{Construct}Payload`, not `{Construct}`
- [ ] (New entity) `GET` responses reference the full `{Construct}` entity schema
- [ ] (New SQL driver) `Value()` always marshals - never returns `(nil, nil)`
- [ ] (New SQL driver) Prefer `Scan()` implementations that set `*m = nil` when `src` is nil; some legacy drivers may still return early
- [ ] (New endpoint) `operationId` is lower camelCase verbNoun
- [ ] (New endpoint) Path parameters are camelCase with `Id` suffix (e.g., `{workspaceId}`, not `{workspaceID}`)
- [ ] (New endpoint) No `DELETE` operation has a `requestBody` - bulk deletes use `POST .../delete`
- [ ] (New `POST` for creation only) Response code is 201, not 200
- [ ] (New property) String properties have `description`, `maxLength`, and where appropriate `minLength` or `pattern`
- [ ] (New property) Numeric properties have `minimum`, `maximum`, or `const`
- [ ] (New property) ID properties have `format: uuid` (or `$ref` to UUID type), OR `x-id-format: external` if they hold non-UUID external identifiers
- [ ] (New property) Page-size properties have `minimum: 1`
- [ ] (New endpoint) Operation has at least one `tags` entry matching the construct's top-level tag definition
- [ ] (New property, canonical-casing version) JSON tag and OpenAPI schema property name are camelCase **regardless of DB backing**; when DB-backed, the snake_case column name lives only in `x-oapi-codegen-extra-tags.db` (and must differ from the `json:` tag)
- [ ] (New resource version) Pagination envelope uses `pageSize` / `totalCount` (not `page_size` / `total_count`) - the deprecated forms are accepted only within existing API versions until Phase 3 migrates each resource

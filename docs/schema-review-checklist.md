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
26. ❌ Adding `format: uuid` to an ID property that identifies a **content page rather than a database row** - use `x-id-format: external`. `format: uuid` generates `uuid.UUID` in Go, so one record whose id is not a UUID fails `json.Unmarshal` and aborts the entire response, taking down a whole endpoint. Decide per field on evidence: what writes the value, and is there a `uuid` column behind it? A field carrying both `format: uuid` and `maxLength` well above 36 is the tell that it was never really a UUID. See the v1beta3 academy construct, where `Quiz.id`, `Parent.id`, `Question.id`, `QuestionOption.id`, `SubmittedAnswer.questionId` and `CurriculaCurrentItemData.id` hold Hugo page and quiz-item identifiers, while `orgId`, `userId` and `registrationId` on the same schemas are genuine row UUIDs and keep the format.
27. ❌ Forcing a single scalar type on a field whose real payloads are genuinely polymorphic. If two producers or two eras of stored data disagree - as with `Quiz.timeLimit`, a JSON number from the current content build and a string (including the sentinel `"infinite"`) in older persisted rows - model the union with `oneOf` and give it an `x-go-type` that decodes both. Picking either scalar alone just moves the outage from one set of records to the other.
28. ❌ In newly authored / canonical-casing API-version work, introducing a `json:` tag that matches the `db:` tag on a new DB-backed field - under the canonical contract wire is camel and DB is snake, so they differ by design on DB-backed fields. `db: "user_id"` pairs with `json: "userId"`, never `json: "user_id"`. Legacy published constructs may intentionally retain matching `json:` and `db:` tags for wire compatibility and should not be flagged on that basis alone.
29. ❌ Marking an identifier `required` on a schema that is **persisted verbatim from a client payload** into a JSON/JSONB column. `required` on a non-nullable scalar makes absence unrepresentable, so a client that omits the field writes `""` - and `""` then fails `json.Unmarshal` into `uuid.UUID`, taking down every read of the whole table. The tell is a schema that is simultaneously a `requestBody` and the `x-go-type` of a `db:`-tagged column, as with `QuizSubmission` in the v1beta3 academy construct (`submitQuiz` body and `TestSubmission.submissionData`). Judge each identifier on whether the row is authoritative for it elsewhere: `registrationId` and `userId` are a redundant echo of `TestSubmission.registrationId`/`.userId` (the `registration_id` and `owner` `uuid NOT NULL` columns), so they are `nullable: true` and optional, generating `*uuid.UUID` with `,omitempty`; `testSessionId` is load-bearing - the handler looks the row up by it before writing - so it stays `required`. Make absence expressible as `null` or an omitted property; never widen the contract to accept `""` as a valid identifier, which decodes the bad rows by permanently erasing the difference between a record that knows whose it is and one that does not.
30. ❌ Declaring a success response as a `{ message: string }` envelope, or as a single object, when the handler marshals the resource itself - or a slice of it. A response schema is a claim about bytes the server already writes, so read it off the handler rather than inferring it from the operation's name. `importDesign` (`POST /api/pattern/import`) declared `{ message?: string }` while both provider paths marshal a one-element slice: meshery's local provider returns `marshalMesheryPatterns([]MesheryPattern{*pattern})`, and its remote provider proxies meshery-cloud's `UpsertPattern`, which writes `json.NewEncoder(res).Encode([]models.MesheryPattern{*patternPayload})`. Nothing in this repo catches that on its own - an inline response schema generates no Go model (generation is `models: true`, so only `components/schemas` become types), and neither the bundler nor `validate-schemas` can see the server - so the wrong type is merely *unused* rather than obviously wrong, and consumers quietly stop typing the response and read it untyped, which is the exact drift canonical sourcing exists to prevent (meshery/schemas#1128). Trace the handler to the bytes it writes; `$ref` the canonical entity schema as the array's `items` instead of inlining a local shape; and when the array is always single-element, say so in the `description` so consumers know `[0]` is safe.

31. ❌ Writing a `*Payload` from the entity schema, or from the operation's name, when the handler pins or ignores part of what the client sends. A write payload is the set of fields the server actually *reads off the body*, which is narrower than the entity and often narrower than the name implies. Three consequences, all visible on `upsertSubscription` (`POST /api/entitlement/subscriptions`, meshery-cloud `server/handlers/subscriptions.go` + `subscription_authorization.go`): (a) a field the server overwrites from the stored row belongs **out** of the payload entirely - `orgId`, `billingId`, `status`, `startDate` and `endDate` are pinned by `pinServerOwnedSubscriptionFields`, and listing them would advertise a write that silently does not happen, which is worse than not documenting them; (b) a route whose name says "upsert" may be update-**only** - this one refuses a body with no `id` (`400`, `ErrSubscriptionCreateNotSupported`) because every real subscription is minted from the payment processor's response, so the payload is an update payload and the description has to say the create is refused; (c) when the write is a full replacement rather than a partial merge - here `pop.Save` writes the decoded struct, so an omitted `planId` or `quantity` stores its zero value rather than preserving the stored one - every unpinned writable field is `required`, because "optional" in a full-replacement body means "silently zero this column". Note the interaction with Rule 2: `id` is a server-generated field, so the validator **blocks** it in a `requestBody`'s `required` even on an update-only route where it is the row selector rather than a value the client invents. Carry that mandatory-ness in the property and operation `description` (and the documented `400`) instead of fighting the rule.
32. ❌ Deriving an operation's denial codes from the handler body alone. A route can deny in two independent places and the two are not interchangeable: its **middleware** runs first, authorizing against the organization the route names in its `:orgId` path param - or, when the route has no such param, against the caller's ambient current-org selection - while the **handler** gate is evaluated against the *target row's own* organization. Those are different organizations whenever the route carries no `:orgId`, which is exactly the tenant-isolation gap layer5io/meshery-cloud#5913 closed. Both denials are reachable on the same request, so both belong in `responses`. `upsertSubscription` (`POST /api/entitlement/subscriptions`) is the worked example: `server/router/router.go` registers it with `AuthorizationMiddlewareForOrgAdminAndOrgOwner`, and because that route carries no `:orgId` the middleware answers `403` against the caller's selected organization before the body is read, after which `authorizeSubscriptionByID` answers `404` against the subscription's own; `getSubscriptionById` is registered on the same group with **no** middleware, so `403` is unreachable there and declaring it would be fiction. That asymmetry is invisible in the handlers - it lives in the route registration - so read the router, not just the handler body. Reading only the handler is exactly how the `403` was missed when these two operations were first written. Separately, keep the *handler* gate's denial uniform where the identifier is a join key to another tenant's record: answering `403` on a row that exists and `404` on one that does not turns the route into an existence oracle, so `authorizeSubscriptionByID` returns the same `404` and body for "not yours" and "not there" by design. Say in the operation `description` which denial means what, and that the `404` is deliberately indistinguishable - otherwise an integrator reads the spec, sees `404`, and retries or reports a bug against behaviour that is working exactly as intended.

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
- [ ] (New or changed endpoint) The success response schema matches the bytes the handler serving that endpoint actually writes - verified by reading the handler, not assumed. If it marshals a slice, the schema is `type: array` with `items` `$ref`-ing the canonical entity schema; a `{ message: string }` envelope is only correct when the handler really writes one
- [ ] (New property, canonical-casing version) JSON tag and OpenAPI schema property name are camelCase **regardless of DB backing**; when DB-backed, the snake_case column name lives only in `x-oapi-codegen-extra-tags.db` (and must differ from the `json:` tag)
- [ ] (New resource version) Pagination envelope uses `pageSize` / `totalCount` (not `page_size` / `total_count`) - the deprecated forms are accepted only within existing API versions until Phase 3 migrates each resource

# Changelog

See https://docs.meshery.io/project/releases

## Unreleased

- **RTK Query**: error responses from Meshery Server (and any backend emitting MeshKit JSON errors) now surface structured fields on `error.meshkit` — `code`, `severity`, `message`, `probableCause`, `suggestedRemediation`, `longDescription`. Both `cloudBaseApi` and `mesheryBaseApi` wrap their `fetchBaseQuery` with a transform that maps the snake_case wire envelope (`error`, `code`, `severity`, `probable_cause`, `suggested_remediation`, `long_description`) to camelCase JS-side fields, leaving `error.data` (the raw body) untouched for backward compatibility. New exported types: `MeshkitError`, `MeshkitFetchBaseQueryError`. Pairs with the `meshery/meshery` server migration that promotes every non-2xx response from `text/plain` to `application/json`. See `docs/superpowers/plans/2026-04-24-plaintext-response-migration.md` in the meshery/meshery repo for full context.

## v1.1.0 — Phase 1 of the identifier-naming migration

Marks the completion of Phase 1 of the [identifier-naming migration](docs/identifier-naming-migration.md).
Phase 1 is governance- and tooling-only: no wire-format changes are made in this release.
The validator, advisory baseline, CI jobs, and docs have been realigned so that every
subsequent per-resource rollout (Phase 2 non-breaking alignment, Phase 3 versioned migrations)
has a single source of truth and a single rule surface to reason against.

### The canonical-casing contract

In one sentence: *wire is camelCase everywhere; DB is snake_case; Go fields follow Go
idiom; the ORM layer is the sole translation boundary.* Concretely, every JSON tag and
every OpenAPI schema property — DB-backed or not — is camelCase; the snake_case DB
column name lives only in `x-oapi-codegen-extra-tags.db`. URL path and query parameters
are camelCase with an `Id` suffix (`{orgId}`, `?userId=...`). The earlier conditional
rule "JSON tag matches `db:` tag when the field is DB-backed" has been retired. Legacy
resources retain their published wire casing until their next API-version bump; new
API versions adopt the canonical contract uniformly.

See [`docs/identifier-naming-migration.md` §1](docs/identifier-naming-migration.md) for
the full contract table and [`AGENTS.md` § Casing rules at a glance](AGENTS.md) for the
per-layer rules enforced by the validator.

### Phase 1 landings

- **1.A — `AGENTS.md` identifier-naming amendment** (#788): Replaced the "DB-backed =
  snake on the wire" rule with the canonical camelCase-on-wire contract; converted
  `page_size` / `total_count` from a perpetual exception to a deprecation list; added
  `§ Identifier-naming migration` pointing at the executable plan.
- **1.B — Rule 6 inversion / Rule 32 retirement** (#791): Rewrote the schema-property
  casing rule to require camelCase unconditionally; removed the DB-backing exception
  path and retired the superseded rule that enforced snake-on-DB-backed tags.
- **1.C — "Partial casing migrations forbidden" rule (Rule 45)** (#792): New rule
  walks every `components/schemas/<Entity>` and fails any struct that mixes JSON-tag
  conventions across its properties (camel + snake + `ID`). Catches the
  `OrgID`/`workspace_id`/`user_id` drift class on a single struct.
- **1.D — "Sibling-endpoint parameter parity" rule (Rule 46)** (#793): New rule
  flags `GET /api/<entity>` siblings that omit `orgIdQuery` when their peers declare
  it — the class of drift that produced the workspaces-400 incident.
- **1.E — Query-parameter casing (Rule 4 extension)** (#794): Extended the path-param
  casing rule to query parameters so `user_id`, `organizationId`, and any `orgID` that
  slips into `parameters: [{in: query}]` is flagged at the same severity as path
  parameters.
- **1.F — TypeScript consumer auditor** (#795): Added `validation/consumer_ts.go` and
  wired it into `make consumer-audit`. Parses RTK Query `builder.query` /
  `builder.mutation` call sites across `meshery/meshery/ui`, `meshery-cloud/ui`, and
  `meshery-extensions/meshmap` and reports three finding classes (`case-flip`,
  `snake-case-wrapper`, `snake-case-param`) against the schemas endpoint index.
- **1.G — Advisory baseline refresh** (#796): Regenerated
  `build/validate-schemas.advisory-baseline.txt` against the new rule surface so the
  `advisory-audit` CI job stays green while Phases 2–3 migrate each resource. The
  baseline is subtractive — any *new* violation introduced after this snapshot blocks
  CI.
- **1.H — CI workflow wiring** (#797): Adds a non-blocking `consumer-audit` job to
  `.github/workflows/schema-audit.yml` that checks out the downstream repos and runs
  `make consumer-audit` on every PR, posting divergence counts per downstream repo.
  Advisory-only; lands alongside this 1.I release.

### Dependency on this version

Every Phase 2 agent pins its target repo's `@meshery/schemas` dependency to this
version — no Phase 2 PR runs until this release is available on npm and as a Go module
tag. The Phase 3 per-resource rollouts (22 resources in parallel) likewise depend on
consumers reaching this version. Downstream repositories pin as follows:

```sh
# TypeScript / npm consumers (meshery, meshery-cloud, meshery-extensions UI):
npm install @meshery/schemas@1.1.0

# Go module consumers (meshery server, meshery-cloud server):
go mod edit -require github.com/meshery/schemas@v1.1.0
go mod tidy
```

After merging this release, downstream repos can begin Phase 2 non-breaking alignment
work (handler query-param casing, outbound URL alignment, local-type displacement) and
Phase 3 per-resource API-version authoring. See the [orchestration DAG in §11 of the
plan](docs/identifier-naming-migration.md) for the dependency ordering.

### Breaking changes

None. Phase 1 is a governance and tooling release; all wire contracts published in
prior releases remain accepted. Existing `json:"snake_case"` tags on DB-backed fields
in already-published API versions remain valid until their resource is migrated to a
new API version under Phase 3.

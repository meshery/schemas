# Schema Tooling: Migration Status, Advisory Baseline & Consumer Audit

> Operational reference extracted from the top-level agent instructions
> (`AGENTS.md` / `CLAUDE.md`). Covers the identifier-naming migration
> status, the advisory baseline, and the consumer audit tooling.

## Identifier-naming migration (complete; v1beta1 retained for back-compat)

> **Identifier-naming overhaul status (2026-04-28):** Complete across `meshery/schemas` (`v1.2.6`), `meshery/meshery` (`v1.0.14`), `meshery/meshkit` (`v1.0.7`), `layer5io/sistent` (`v0.20.1`), and `layer5io/meshery-cloud` (master HEAD, rolling). **`layer5labs/meshery-extensions` is deferred** pending lift of the layer5labs billing block.

The uniform **camelCase-on-the-wire** identifier-naming migration has landed. Every resource now has a canonical-casing target-version directory; Phase 4.A was administratively closed on 2026-04-23 **without physical deletion of the deprecated directories.** The deprecated directories are retained on `master` so external consumers that pin legacy versions are not stranded.

**The contract in one sentence:** *Wire is camelCase everywhere; DB is snake_case; Go fields follow Go idiom; the ORM layer is the sole translation boundary.*

**Phase 4.A non-deletion policy.** The original plan (§10 Agent 4.A) called for physical deletion of each deprecated `schemas/constructs/<old-version>/<resource>/` directory after one release cycle. The maintainer has explicitly overridden that step: the three in-repo consumers (`meshery/meshery`, `layer5io/meshery-cloud`, `layer5labs/meshery-extensions`) have all migrated, but **external consumers that pin deprecated versions cannot be enumerated from the in-repo consumer graph**, and stranding them is not acceptable. Every deprecated directory therefore stays on `master` indefinitely, gated by its `info.x-deprecated: true` + `info.x-superseded-by: <new-version>` markers (the OpenAPI bundler reads those markers to exclude the legacy path from the merged spec, so path-space collisions are avoided). Any future decision to physically remove a deprecated directory is a separate maintainer action - it is not scheduled and will not be implicit in any Phase 4 follow-up.

**What this means for contributors.** Do not recase fields in-place inside a published API version - introduce a new version instead, as during the migration. Do not delete or modify `x-deprecated: true` markers on the retained legacy trees; they are the compatibility signal that documents why the directory is still present. When adding a new resource or a new version of an existing resource, follow the canonical-casing contract in [`casing-rules.md`](casing-rules.md) - the validator and the doc are now aligned.

Baseline metrics and the per-resource consumer graph captured in Phase 0 live under [`validation/baseline/`](../validation/baseline/) and can be regenerated with:

```bash
make baseline-field-count
make baseline-tag-divergence  MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud
make baseline-consumer-audit  MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud
make baseline-consumer-graph  MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud EXTENSIONS_REPO=../meshery-extensions
```

## Advisory baseline

`make audit-schemas` suppresses violations listed in `build/validate-schemas.advisory-baseline.txt` (one `file\tmessage` per line, `#` comments allowed). This file holds the *pre-canonical* backlog so the `advisory-audit` CI job stays green while Phases 2–3 migrate each resource. **New violations introduced after the baseline was last refreshed block CI** - the baseline is subtractive, not additive, and it is intentional that any new `json:"snake_case"` tag or missing `orgIdQuery` ref on a list endpoint fails the advisory-audit workflow.

To resolve a baselined violation, migrate the affected resource to the canonical-casing contract and then refresh the baseline:

```bash
make audit-schemas-style-full \
  | awk '/^  schemas\// { f=$1; next } /^    → / { sub(/^    → /, "", $0); if (f) print f "\t" $0 }' \
  | sort -u > build/validate-schemas.advisory-baseline.txt
```

Do not add new entries to the baseline by hand - every entry must correspond to a real audit finding that is deferred to a Phase 3 migration.

## Environment connection response types

`getEnvironmentConnections` (`GET /api/environments/{environmentId}/connections`)
uses the canonical v1beta3 `Connection` response schema for each item in
`EnvironmentConnectionsPage.connections`, matching the items returned by
`getConnections`. Consumers can use `GetEnvironmentConnectionsApiResponse` from
`@meshery/schemas/cloudApi` or `@meshery/schemas/mesheryApi` to read typed connection
fields such as `id`, `name`, and the connection-status union. The pagination
envelope retains `page`, `pageSize`, `totalCount`, and `connections`.

The array's `x-go-type` preserves the existing Go map representation because the
Go `connection` package already imports `environment`; importing it in the
opposite direction would create a package cycle. TypeScript follows `items.$ref`.

This listing is distinct from `EnvironmentConnectionMappingPage`, whose items
describe environment-to-connection junction records for assignment operations.
Run `make test-rtk` to bundle the OpenAPI specs and check schema
reuse and compile a consumer of freshly generated RTK response types, including
rejected invalid IDs, names, statuses, and unknown properties. Running
`node --test tests/environment-connections-response.test.js` directly needs the
bundled specs built first.

## TypeScript unit tests

`make test-ts` (`npm test`) runs every `typescript/**/*.test.ts` under Node's native test runner. It needs Node 22.18 or later, where type stripping is on by default: 22.6 to 22.17 have it only behind `--experimental-strip-types`, which `npm test` does not pass. The `blocking-validation` job in `.github/workflows/schema-audit.yml` runs it on every pull request that touches `typescript/`, `schemas/`, `package.json` or `package-lock.json`, right after `npm ci`, and `generate-artifacts-from-schemas.yml` runs it again on `master` after `make build`.

The pull-request run happens before any build, so a test reads schema YAML from source and imports generated output only with `import type`, which is erased at runtime. A test that needs runtime generated code would read the committed output, which is stale on a schema change until `master` regenerates it. Keep that kind of test in `generate-artifacts-from-schemas.yml`.

## Consumer audit

The consumer audit joins the schemas endpoint index against the routers and RTK Query clients of the downstream repos, producing a per-endpoint coverage and drift report. Three parsers are registered:

- **Gorilla (Go)** - `meshery/meshery`'s `server/router/server.go`.
- **Echo (Go)** - `meshery-cloud`'s `server/router/router.go` and related handler files.
- **TypeScript (RTK Query)** - `meshery/meshery/ui/rtk-query`, `meshery-cloud/ui/api` + `meshery-cloud/ui/rtk-query`, and `meshery-extensions/meshmap/src/rtk-query`.

The TS consumer is intentionally regex-based per the Phase 1.F charter; full TypeScript semantic analysis would require the TS compiler. It extracts `builder.query({url, params})` and `builder.mutation({url, params, body})` sites and flags three finding kinds:

- `case-flip` - a wire key that re-introduces SCREAMING or mixed-case identifiers the camelCase schema contract forbids (e.g. `orgID: queryArg.orgId`).
- `snake-case-wrapper` - a body wrapper keyed in snake_case (`pattern_data`, `k8s_manifest`) instead of the camelCase schema contract.
- `snake-case-param` - a params key in snake_case outside the reserved pagination envelope (`page_size`, `total_count` are exempt).

Run it against any or all downstream repos:

```bash
make consumer-audit MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud \
                    EXTENSIONS_REPO=../meshery-extensions
```

Each `*_REPO` variable is optional; consumers whose path is not provided are silently skipped. Override the TS scan path independently when the UI lives outside the Go checkout via `MESHERY_REPO_UI=` / `CLOUD_REPO_UI=`. Add `VERBOSE=1` to print the full schema-only / consumer-only lists after the summary.

The TS findings section appears below the main audit report and is grouped by repo so reviewers can focus on one downstream at a time.

### CI behavior (blocking)

The `consumer-audit` job in `.github/workflows/schema-audit.yml` runs the audit against all three downstream repos on every `pull_request` event (and on `workflow_dispatch`). Per Phase 4.B of the identifier-naming migration, the job is **blocking**: a non-zero exit from `make consumer-audit` fails CI and blocks the PR. The Phase 1.H advisory wrapper (`set +e` around the make target plus a trailing `exit 0`) has been removed; the Go tool's exit status propagates directly.

The Go tool (`cmd/consumer-audit/main.go`) still exits 0 on pure data divergence - it returns non-zero only on operational errors (missing repo root, bad flag combinations, failed sheet credentials, parser errors). That's intentional: Phase 4.B tightens the CI contract while keeping the tool's local-dev ergonomics unchanged. The practical effect is that divergence counts continue to flow through the PR comment, but any future regression that causes the tool itself to error (e.g., malformed schema, missing endpoint index) now halts the merge rather than being swallowed.

On each run the job:

1. Checks out `meshery/schemas` (the repo under test), then `meshery/meshery`, `layer5io/meshery-cloud`, and `layer5labs/meshery-extensions` under `./_consumer/`. The sibling checkouts use a PAT secret named `CI_CONSUMER_PAT` for private-repo access (`meshery-cloud` and `meshery-extensions` are private). Each sibling checkout has `continue-on-error: true`, so a missing PAT, insufficient scopes, or a temporary GitHub outage simply results in that column being skipped - the job still runs and posts a comment against whatever consumers *are* available. A skipped checkout does not fail the audit itself: the Go tool treats an unset `*_REPO` path as "not provided", not as an error.
2. Invokes `make consumer-audit MESHERY_REPO=_consumer/meshery CLOUD_REPO=_consumer/meshery-cloud EXTENSIONS_REPO=_consumer/meshery-extensions VERBOSE=1` and pipes the output to both `/tmp/consumer-audit.txt` and the job log via `tee`. A non-zero exit fails the step - and therefore the job.
3. Uploads the captured output as a build artifact named `consumer-audit-output` (retained for 14 days) so reviewers can download the raw per-endpoint list. This step runs on `if: always()`, so the artifact is available even when the audit step fails.
4. Posts a summary comment on the PR listing the per-repo metrics pulled from the audit report table (see [summary metrics](#summary-metrics) below), plus a rolled-up count of TypeScript findings by kind (`case-flip`, `snake-case-wrapper`, `snake-case-param`) and the set of repos those findings span. The comment includes a one-line note distinguishing the two "missing handler" metrics. The comment step also runs on `if: always()` so reviewers see the divergence summary that explains why CI went red. The comment is keyed by an HTML marker and is upserted across runs so repeat pushes to the same PR update the existing comment rather than spamming new ones. Any sibling repo whose checkout failed is surfaced in a "Skipped consumer checkouts" note under the table so a zero in that column cannot be mistaken for perfect alignment.

### Summary metrics

The CLI (`cmd/consumer-audit`) and the PR comment share the same metric labels. Columns are sources: **Schema** (OpenAPI ops in this repo), **Meshery** (Gorilla routes), **Cloud** (Echo routes). Most labels are self-explanatory. The only pair that needs disambiguation:

```
Note:
Spec only (no handlers) --> no matching handler in any audited consumer.
Spec without consumer handler --> this consumer is missing it (may exist elsewhere).
```

### Provisioning `CI_CONSUMER_PAT`

The secret is **provisioned** on `meshery/schemas` and authorises all three sibling checkouts. It must be a fine-grained or classic PAT with read access to:

- `meshery/meshery` (public - read access is implicit, but including the repo in the PAT's scope list keeps all three checkouts on a single credential path)
- `layer5io/meshery-cloud` (private - PAT must be a member of the `layer5io` org with `contents: read`)
- `layer5labs/meshery-extensions` (private - PAT must be a member of the `layer5labs` org with `contents: read`)

If the secret is ever removed or becomes under-scoped, `actions/checkout@v7` receives an empty `token:` input and falls back to unauthenticated access. The public `meshery/meshery` checkout still succeeds; both private siblings will fail and - thanks to `continue-on-error: true` - be skipped cleanly. The job remains green, the comment surfaces only the public column, and the "Skipped consumer checkouts" note lists which consumers were omitted. When the PAT nears expiry it must be rotated in the repo secrets; the workflow itself needs no change.

## Python client generation (pilot, issue #1240)

Typed Python clients are generated from the already-bundled `_openapi_build` specs with [`openapi-python-client`](https://github.com/openapi-generators/openapi-python-client), pinned to an exact version in `build/lib/config.js` (`config.python`) together with the `ruff` version that runs its post-processing (fix + format), so committed output reproduces byte-for-byte. That object is the single source of truth for both pins, the pilot scope, and the warning allow-list; the CI install steps read the pins from it rather than duplicating them, and `build/generate-python.js` refuses to run against any other generator or ruff version.

The full Meshery bundle preserves component references for `v1alpha1/controllers_config`. Its GET and PUT responses share `MesheryOperatorConfig`; expanding those references duplicates nested model names in `openapi-python-client` 0.29.1 and silently omits both `200` response parsers. Other construct bundles remain dereferenced because component names can overlap across versions. If another active controllers-config version is added, version-scope its components before merging it alongside these references; merged component names currently use the construct title only.

- **Pilot scope:** `config.python.pilotPackages` (currently `v1beta2/key` - the current canonical-casing key construct; `v1beta1/key` is `x-deprecated` and excluded from the merged bundles, so it is not piloted). `build/generate-python.js` resolves the pilot through the shared `build/lib/config.js` discovery and requires `bundle-openapi` first, like the other generators.
- **Layout:** one `meshery-schemas` distribution under `python/generated/` (hatchling build, `src/` layout). `pyproject.toml` and `src/meshery_schemas/__init__.py` are hand-maintained scaffolding; each pilot construct lands as a generated subpackage (`src/meshery_schemas/key/`, PEP 561 `py.typed` included). The pinned generator cannot emit a hatchling project itself, so generation runs with `--meta none` into a temp staging dir and the script assembles the tree. Never hand-edit the generated `src/meshery_schemas/<construct>/` subpackages or `.python-gen-manifest.json` - automation owns them on `master`, same as `models/` and `typescript/generated/`.
- **Warnings-as-errors:** generation fails before touching `python/generated/` on any generator warning without an allow-list entry in `config.python.warningAllowlist`. The pilot allow-list is empty: the key construct generates warning-free. The manifest (`.python-gen-manifest.json`) records the generator and ruff pins, spec digests, per-file digests of the generated subpackages (paths relative to `python/generated/`), and warnings per construct.
- **Tests:** `tests/generate-python.test.js` pins the warning parser/matcher, the exact generator and ruff pins, pilot discovery, the committed output against the manifest (bundled-spec digests and generated-file digests, so stale output or a hand-edit under `src/meshery_schemas/<construct>/` fails), and tree invariants; `python/tests/test_key_round_trip.py` is a pytest suite that installs the distribution, checks its identity and hatch wheel `packages` table by parsing `pyproject.toml` with `tomllib`, and round-trips the `Key` model through `key_template.json` (including the camelCase-wire mapping check for newer API versions) and the `KeyPage` response model through a representative paginated wire payload.
- **Make targets:** `make generate-python` (regenerate + enforce warnings-as-errors) refreshes the committed output; `make test-python` (guard test + `pip install ./python/generated` + pytest) depends only on `bundle-openapi`, so it guards the committed tree rather than freshly regenerated output. Both are standalone targets, not part of `make build`, so the Python toolchain is not required for other schema work. Local toolchain setup:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install \
  "openapi-python-client==$(node -p "require('./build/lib/config.js').python.generatorVersion")" \
  "ruff==$(node -p "require('./build/lib/config.js').python.ruffVersion")" \
  pytest
make generate-python test-python
```

- **PR contract:** any change that alters a bundled pilot spec, or the generator or ruff pin in `config.python`, must run `make generate-python` and commit the refreshed `python/generated/` output, including `.python-gen-manifest.json`, in the same PR. This is the explicitly-requires-it exception to the "automation commits generated artifacts" rule. To check whether a change is affected, run `make generate-python` and `git diff python/generated/`; any diff must be committed. The blocking `schema-audit.yml` job runs `make test-python` against the committed tree and fails on stale spec or file digests. `generate-artifacts-from-schemas.yml` still refreshes the output on `master` through its explicit `make generate-python` step.
- **CI:** the `blocking-validation` job in `.github/workflows/schema-audit.yml` runs `make test-python` against the committed output (same guard level as Go/TS); `generate-artifacts-from-schemas.yml` runs `make generate-python` then `make test-python` after `make build` and self-commits refreshed output on `master`. Do not wire the full cloud/meshery bundles or PyPI publishing yet (Phases 2-4 of #1240).
- **Phase 2 entry points:** the full-bundle warning baselines are tracked in the Phase 0 hardening issues (bare `type: array` without `items`: [#1241](https://github.com/meshery/schemas/issues/1241); non-JSON download responses: [#1242](https://github.com/meshery/schemas/issues/1242); duplicate inline response model names: [#1243](https://github.com/meshery/schemas/issues/1243)); each must be resolved or explicitly allow-listed before the pilot scope expands. The `cloud` + `meshery` API subpackage split lands with the pre-split full bundles.

## Rust client generation (pilot)

The Rust pilot mirrors the Python pilot above: same pilot scope, same committed-output and manifest model, same make-target and CI shape. A Rust consumer gets models and a typed async client from the same `_openapi_build` bundles the Go, TypeScript and Python outputs come from.

- **Generator:** [`progenitor`](https://github.com/oxidecomputer/progenitor) (Oxide), which turns an OpenAPI 3.0 document into a `reqwest` client and uses [`typify`](https://github.com/oxidecomputer/typify) for the models. It is pinned to an exact version (`=0.17.0`) in `build/rust-gen/Cargo.toml`, with `build/rust-gen/Cargo.lock` committed, and restated in `build/lib/config.js` (`config.rust`). `build/generate-rust.js` and `tests/generate-rust.test.js` refuse any other version. `typify` alone was rejected because it emits models only, and `openapi-generator`'s `rust` target needs a JVM and a second template set to maintain. The `cargo-progenitor` binary is not used: in 0.17.0 it formats with the nightly-only rustfmt options `normalize_doc_attributes` and `wrap_comments` and panics on a stable toolchain. `build/rust-gen/` is the thin replacement. It is about one screen of Rust, makes the same library calls as `cargo-progenitor` (positional interface, merged tags, `progenitor-client` as a dependency), and runs the stable rustfmt with no options, so doc comments stay `#[doc = "..."]` attributes.
- **Toolchain:** `rust-toolchain.toml` at the repository root pins the exact Rust release, with `rustfmt`, `clippy` and the `wasm32-unknown-unknown` target. rustfmt runs as part of generation, so this pin shapes the committed output, the way the ruff pin does for Python. `build/generate-rust.js` checks that `rustc` reports the pinned release. The manifest records the pin, and the guard test compares the two.
- **Host target for the glue:** the glue binary runs on the machine that builds it, so `build/generate-rust.js` builds it with `--target` set to the host triple read from `rustc -vV`, and locates the binary in Cargo's JSON artifact report rather than assuming `target/debug`. An inherited `CARGO_BUILD_TARGET` naming another target therefore cannot produce a glue binary the host cannot execute; the command-line `--target` wins over the environment variable and `.cargo/config.toml`. The guard test covers both a non-host `CARGO_BUILD_TARGET` setting and the setting being unset.
- **Pilot scope:** `config.rust.pilotPackages`, which must equal `config.python.pilotPackages` (currently `v1beta2/key`). The guard test enforces that.
- **Layout:** `rust/` is a crate named `meshery-schemas` (lib `meshery_schemas`) that is not published yet. The name follows `@meshery/schemas` (npm), `meshery-schemas` (PyPI) and `github.com/meshery/schemas` (Go). `Cargo.toml`, `Cargo.lock`, `src/lib.rs`, `README.md` and `tests/` are hand-maintained scaffolding. Each pilot construct lands as a generated module, `src/<construct>/`, which holds `mod.rs` (the `Client`, one async method per operation) and `types/` (the models). Every generated file opens with a `Code generated by build/generate-rust.js ... DO NOT EDIT.` header. The header deliberately avoids the `@generated` marker, because rustfmt skips files that carry it and the output must stay under `cargo fmt --check`. Never hand-edit `src/<construct>/` or `.rust-gen-manifest.json`. Automation owns them on `master`, the same as `python/generated/src/meshery_schemas/<construct>/`.
- **Errors, not warnings:** progenitor reports a spec it cannot handle as an error, so there is no warning allow-list. Generation also fails on any stderr output from the glue, and when `rust/Cargo.toml` does not declare, verbatim, a dependency line the generated code needs. Nothing under `rust/` is written in either case. The manifest records the generator and toolchain pins, the spec digests, the per-file digests of the generated modules (paths relative to `rust/`), and each construct's required dependency lines.
- **Spec adjustments:** none. progenitor takes the bundled `merged-openapi.json` of the pilot construct as is (OpenAPI 3.0.0, `x-` extensions ignored), the same file the Python pilot reads.
- **wasm32:** the whole library, client included, builds for `wasm32-unknown-unknown` (`reqwest` uses the browser's `fetch` there), so the client needs no feature gate. `make test-rust` builds it for that target.
- **TLS:** the generated client depends on `reqwest` without a TLS backend, as progenitor emits it. For `https://` base URLs on native targets, enable the crate's `rustls` or `native-tls` feature, or a TLS feature on your own `reqwest` dependency. `meshery_schemas::reqwest` re-exports the version the client is built on, so callers can configure it, for example with a default `Authorization` header passed to `Client::new_with_client`.
- **Wire behaviour to know:** the generated client trims a trailing slash from the base URL, so `https://host.example/meshery/` and `https://host.example/meshery` request the same paths. A nullable member that is not required (for example `Key.deletedAt`) is an `Option`. An explicit `null` and an absent member read the same way, and `None` is serialized by omission. Python keeps `null` and unset apart, Rust does not. Models of schemas with `additionalProperties: false` reject members they do not declare (`deny_unknown_fields`), and string limits such as `maxLength` are enforced when deserializing. Every request carries an `api-version` header with the spec's `info.version` (`v1beta2`), which progenitor always adds. The bundles are dereferenced, so request and response bodies get operation-named copies of the models (`UpsertKeyBody`, `GetKeyByIdResponse`) next to `Key` and `KeyPayload`, as they do in the Python client.
- **Tests:** `tests/generate-rust.test.js` covers the helpers, the exact generator and toolchain pins and their agreement with `Cargo.lock`, pilot discovery and parity with the Python pilot, the committed output against the manifest (spec digests and generated-file digests, so stale output or a hand-edit under `src/<construct>/` fails), the scaffold's dependency lines, and tree invariants (generated headers, scaffold markers, `target/` ignored, lockfiles tracked). `rust/tests/key_round_trip.rs` round-trips `Key` through the construct's own `key_template.json` and checks the camelCase wire mapping, the closed model, string limits and the `KeyPayload` upsert shape. `rust/tests/key_client.rs` drives the generated client against a local `wiremock` server and checks the method, path, `Authorization` header and JSON body of the request, and that the response decodes.
- **Make targets:** `make generate-rust` regenerates the output and enforces the checks above. `make test-rust` runs the guard test, then `cargo fmt --check` and `cargo clippy --locked --all-targets -- -D warnings` on `build/rust-gen/` and `rust/`, then `cargo test --locked` and `cargo build --locked --lib --target wasm32-unknown-unknown` in `rust/`. It depends only on `bundle-openapi`, so it guards the committed tree. Both targets are standalone and not part of `make build`. Local setup, after installing [rustup](https://rustup.rs):

```bash
rustup toolchain install   # from the repository root; installs what rust-toolchain.toml pins
make generate-rust test-rust
```

- **PR contract:** any change that alters a bundled pilot spec, the progenitor pin, or `rust-toolchain.toml` must run `make generate-rust` and commit the refreshed `rust/` output, including `.rust-gen-manifest.json`, in the same PR. This is the same exception the Python pilot has. To check whether a change is affected, run `make generate-rust` and then `git diff rust/`. Commit any diff.
- **CI:** the `blocking-validation` job in `.github/workflows/schema-audit.yml` installs the pinned toolchain and runs `make test-rust` against the committed output. `generate-artifacts-from-schemas.yml` runs `make generate-rust` and then `make test-rust` after the Python steps and self-commits refreshed output on `master`. crates.io publishing is not wired.

### Adding a construct to the Rust output

1. Add its `version/dirName` key to both `config.python.pilotPackages` and `config.rust.pilotPackages` in `build/lib/config.js`. The two pilots widen together.
2. Declare the generated module in `rust/src/lib.rs` (`pub mod <construct>;`, with a one-line doc comment). The module name is the construct's package name, as in `python/generated/src/meshery_schemas/<construct>/`.
3. Run `make generate-rust`. If it reports missing dependency lines, add them verbatim to `[dependencies]` in `rust/Cargo.toml` and run it again.
4. Add `rust/tests/<construct>_round_trip.rs`, which reads the construct's template from `schemas/constructs/<version>/<construct>/templates/`, and a client test against `wiremock` for at least one operation.
5. Run `make test-rust` and commit the scaffold changes, the generated `rust/src/<construct>/` and `rust/.rust-gen-manifest.json` together.

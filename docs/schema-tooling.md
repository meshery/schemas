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

If the secret is ever removed or becomes under-scoped, `actions/checkout@v4` receives an empty `token:` input and falls back to unauthenticated access. The public `meshery/meshery` checkout still succeeds; both private siblings will fail and - thanks to `continue-on-error: true` - be skipped cleanly. The job remains green, the comment surfaces only the public column, and the "Skipped consumer checkouts" note lists which consumers were omitted. When the PAT nears expiry it must be rotated in the repo secrets; the workflow itself needs no change.

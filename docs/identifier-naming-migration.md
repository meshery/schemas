# Identifier-Naming Standardization — Migration Plan

**Canonical plan — fully executable by an orchestrated system of agents.**

| Field | Value |
|---|---|
| Status | **Complete (2026-04-23)** — Phases 0–4 landed across `meshery/schemas`, `meshery/meshery`, `layer5io/meshery-cloud`, `meshery/meshkit`, and `layer5io/sistent`; `layer5labs/meshery-extensions` deferred (billing-blocked); see [§21 Status as of 2026-04-28](#21-status-as-of-2026-04-28) for the post-completion landed-PR + tagged-release inventory; legacy directories retained on master (§10 Agent 4.A administrative close) |
| Authority | `meshery/schemas/AGENTS.md` after Phase 1.A |
| Scope | `meshery/schemas`, `meshery/meshery`, `layer5io/meshery-cloud`, `layer5labs/meshery-extensions` |
| Contract | camelCase on wire, snake_case only at the DB/ORM boundary |
| Supersedes | Earlier three-layer audit report (the conditional "DB-backed → snake_case JSON tag" rule is retired) |
| Effective | On merge of Phase 1.A |
| Sunset | Old wire forms retired per resource over one release cycle after Phase 3; Phase 4.A physical deletion **overridden by maintainer decision** — deprecated directories stay on master under `x-deprecated: true` indefinitely (see §10 Agent 4.A and §20) |

---

## 1. The Contract

One contract, one rule per layer. The ORM boundary is the only translation layer.

| Layer | Convention | Canonical examples | Counter-examples (forbidden) |
|---|---|---|---|
| DB column / `db:` tag | **snake_case** | `user_id`, `org_id`, `workspace_id`, `created_at`, `pattern_file` | `userId`, `orgID` |
| Go struct field | **PascalCase with Go-idiomatic initialisms** | `UserID`, `OrgID`, `WorkspaceID`, `CreatedAt` | `User_id`, `userId` (unexported), `UserIdentifier` |
| JSON tag / wire property | **camelCase** | `json:"userId"`, `json:"orgId"`, `json:"patternFile"`, `json:"createdAt"` | `json:"user_id"`, `json:"orgID"`, `json:"UserId"` |
| URL query / path param | **camelCase, `Id` suffix** (lowercase `d`) | `{orgId}`, `?userId=...`, `?workspaceId=...` | `{orgID}`, `{org_id}`, `?organizationId=...` |
| TypeScript property / RTK arg | **camelCase** | `response.userId`, `queryArg.orgId` | `response.user_id`, `queryArg.orgID` |
| OpenAPI schema property | **camelCase** | `userId:`, `patternFile:`, `createdAt:` | `user_id:`, `patternFile` with snake sibling |
| OpenAPI `operationId` | **lower camelCase verbNoun** | `getWorkspaces`, `createEnvironment` | `GetWorkspaces`, `get_workspaces`, `getByID` |
| `components/schemas` type name | **PascalCase** | `WorkspacePayload`, `MesheryPattern` | `workspacePayload` |
| Go generated type name | PascalCase (from `oapi-codegen`) | `Workspace`, `MesheryPattern` | — |
| TypeScript generated type name | PascalCase (from RTK codegen) | `Workspace`, `MesheryPattern` | — |

**The one-sentence rule:** *Wire is camelCase everywhere; DB is snake_case; Go fields follow Go idiom; the ORM layer is the sole translation boundary.*

The earlier conditional "JSON tag matches `db:` tag when the field is DB-backed" is **retired**. All JSON tags on all fields — DB-backed or not — are camelCase. The `db:` tag in `x-oapi-codegen-extra-tags` remains snake_case and is the only place snake_case persists above the DB layer.

---

## 2. Objectives (measurable)

1. **Single conditional eliminated.** `validation/casing.go` retires the DB-backed exception path; every wire property is checked against one camelCase rule, not a case-by-case DB lookup.
2. **Zero in-repo drift-masking workarounds.** `utils.QueryParam(q, "orgId", "orgID")`-style fallbacks are removed after one deprecation release.
3. **Zero locally-declared types that duplicate schemas.** `MesheryPattern`, `MesheryPatternRequestBody`, `MesheryFilter`, `MesheryApplication`, and the named locally-declared RTK endpoints are displaced by schemas-generated equivalents (or the schemas equivalent is added).
4. **Consumer auditor in CI.** `make consumer-audit` runs on every PR in `meshery/schemas` with advisory output; promoted to blocking after Phase 3.
5. **TypeScript consumer auditor exists.** `validation/consumer_ts.go` parses `ui/rtk-query/*.ts` across all four repos and diffs against the schemas endpoint index.
6. **Repo-level governance pinned.** Every repo's `AGENTS.md` and `CLAUDE.md` mandates adherence to this plan and links to `schemas/AGENTS.md § Casing rules at a glance` as the authoritative reference.
7. **Before/after metrics published.** Count of validator rules, drift-masking sites, locally-declared duplicates, CI gates; measured before and after.

---

## 3. Repo Scope Matrix

| Repo | Role | In-scope work |
|---|---|---|
| `meshery/schemas` | Source of truth | `AGENTS.md` amendment; `validation/` rule authoring; `consumer_ts.go` authoring; CI wiring; per-resource API-version authoring in Phase 3; version-bump + publish |
| `meshery/meshery` | Server (Go) + UI (TypeScript) + `mesheryctl` (CLI) | Query-param extraction alignment; outbound URL alignment; local-model displacement (`MesheryPattern`, `MesheryFilter`, `MesheryApplication`); RTK hook unification; CLI flag casing audit |
| `layer5io/meshery-cloud` | Remote provider (Go) + UI (TypeScript) | Handler query-param constants; `utils.QueryParam` dual-accept removal; 9 mapping-model JSON tag fixes; `ContentID` JSON tag fix; `users.go MesheryPatternRequestBody` displacement; UI `api.ts` endpoint dedup vs. `@meshery/schemas/cloudApi` |
| `layer5labs/meshery-extensions` | Kanvas (React/TS) + GraphQL plugin (Go) | Kanvas RTK catalog/designs case-flip removal; `SaveDesign` wrapper alignment (`pattern_data` → `patternData`); `mesherySdk` event-type casing; `collab/config` user-ID duality resolution; any GraphQL schema adjustments |

---

## 4. Phase Structure

| Phase | Goal | Dependency | Duration estimate |
|---|---|---|---|
| **0** | Plan authored + baseline metrics collected | none | 1–2 days |
| **1** | `schemas` governance doc + validator rules + CI wiring + package republish | Phase 0 complete | 1–2 weeks |
| **2** | Non-breaking alignment across downstream repos (no API-version bump needed) | Phase 1 complete, new `@meshery/schemas` version available | 2–3 weeks (parallel) |
| **3** | Per-resource versioned wire migration (one new API version per resource) | Phase 2 landed | 6–10 weeks (parallel per resource) |
| **4** | Deprecation sunset + consumer-audit promoted to blocking + final AGENTS.md/CLAUDE.md updates | Phase 3 complete per resource, one release cycle elapsed | 2 weeks |

Total: ~12–17 weeks. Phases 2 and 3 are heavily parallel.

> **Phase 4.A administratively closed on 2026-04-23 — legacy directories retained on master.** The one-release-cycle safety window defined in this table was explicitly overridden by the maintainer, and physical deletion of the deprecated `schemas/constructs/<old-version>/<resource>/` directories is **not slated**. The three in-repo consumers (`meshery/meshery`, `layer5io/meshery-cloud`, `layer5labs/meshery-extensions`) have all migrated, but external consumers that pin a deprecated version cannot be enumerated from the in-repo consumer graph and must not be stranded. Every deprecated directory remains on `master` indefinitely behind its existing `info.x-deprecated: true` + `info.x-superseded-by: <new-version>` markers (the OpenAPI bundler uses those markers to exclude the legacy path from the merged spec; path-space collisions are prevented). Any future physical deletion requires a separate maintainer decision. See §10 Agent 4.A for the updated charter and §20 for the dated decision entry. The canonical index of retained legacy directories lives at §8 of [`identifier-naming-impact-report.md`](identifier-naming-impact-report.md).

---

## 5. Common Agent Protocol

Every agent in this plan, regardless of phase, follows the Common Agent Protocol. Each agent specification in sections 6–10 references this protocol; do not re-state these steps per-agent.

### 5.1 Preconditions (every agent verifies before starting)
1. Clean working tree on a fresh branch cut from the target repo's default branch (typically `master` or `main`).
2. The `gh` CLI authenticated for the repo.
3. Required toolchain installed: Go 1.25+, Node 20+, the repo's Makefile targets runnable.
4. `TaskList` checked to confirm no blocking task is pending.

### 5.2 Execution loop (ordered)
1. **Plan** — post a `TaskUpdate` with the plan summary, affected files, and acceptance criteria. Set task `in_progress`.
2. **Implement** — make the changes described in the agent's charter.
3. **Build locally** — run the repo's default build target (`make build` / `make server` / `npm run build` / `go build ./...`). Must succeed before committing. If it does not, diagnose, fix, re-run. Do not commit broken state.
4. **Test locally** — run the repo's full test suite for the packages touched (`go test ./...` for Go; `npm test` for TypeScript). New behavior must have new tests; modified behavior must have updated tests.
5. **Update documentation** — every code change updates the relevant docs in the same PR (§12 for the mandate).
6. **Lint + format** — repo-required linters and formatters must pass (`make kanvas-lint`, `make graphql-lint`, `gofmt -l`, `golangci-lint run`, ESLint+Prettier). Hooks must pass; never pass `--no-verify`.
7. **Commit** — signoff required (`git commit -s`). Descriptive commit messages in imperative mood; body explains *why*, not *what*.
8. **Push + PR** — push branch to upstream (not a fork), open PR via `gh pr create` with the standard PR body template (§5.6).
9. **Wait for automated review** — `copilot-pull-request-reviewer` and `gemini-code-assist` post automatically. Do not proceed to merge before both have reviewed or reviews have timed out (30 min).
10. **Iterate on review** — address or refute each review comment:
    - If valid: fix in new commit; reply to thread explaining the fix.
    - If false positive: reply to thread explaining why, citing file:line evidence.
    - Never silently ignore bot review feedback.
11. **Re-run CI** — on each push, watch CI until green. Use `uv run ~/.claude/skills/iterate-pr/scripts/fetch_pr_checks.py` to poll.
12. **Merge when criteria met** (§5.5). Arm auto-merge (`gh pr merge --auto`) as early as safe.
13. **Task close** — `TaskUpdate status=completed` with the merge-commit SHA in the task comment.

### 5.3 Review & iteration protocol (detailed)
Automated reviewers on every PR:
- **`copilot-pull-request-reviewer`** — focuses on correctness, edge cases, test gaps.
- **`gemini-code-assist`** — focuses on structure, idiom, consistency with repo conventions.

The agent must:
- Reply to every inline thread with a `thread_id` using `~/.claude/skills/iterate-pr/scripts/reply_to_thread.py`.
- Treat review-bot comments at medium or higher priority the same as human review: verify, then fix or refute with evidence.
- Never add signatures, attribution, or tool-identity lines to replies.
- Re-run the local test suite after every push that results from a review fix.

Human reviewer required before merge for:
- Any change to `meshery/schemas/AGENTS.md`
- Any change to `schemas/validation/` that adds or inverts a blocking rule
- Any Phase 3 per-resource API-version authoring PR
- Any deprecation-sunset PR that removes an API version

For non-governance changes, human reviewer optional; auto-merge can fire as soon as CI + bot review are green.

### 5.4 Build + validation requirements
Every PR must include:
- **Compilation** — `go build ./...` clean (Go) or `npm run build` clean (TS); no warnings escalated.
- **Unit tests** — touched packages pass; new behavior has new tests (§13).
- **Linter** — `make <repo>-lint` / `golangci-lint run` / `eslint --max-warnings=0` all green.
- **Format** — `gofmt`, `prettier --check` green.
- **Integration smoke** — for handler or endpoint changes: verify against the schemas `consumer-audit` output (advisory) and verify the route-level change with a curl or unit test.
- **Documentation** — touched feature's docs updated in the same PR (§12).

### 5.5 Merge criteria (auto-merge armed when all met)
- All required CI checks passing.
- Every review-bot thread replied to (fix or refutation).
- Human-review gate satisfied for governance changes.
- Doc + test updates included in the PR.
- No `[WIP]`, `[DO NOT MERGE]`, `Draft:` markers remain.
- Branch rebase-current against target (or auto-rebase enabled).

### 5.6 Standard PR body template

```markdown
## Summary
- 1–3 bullets describing the change.

## Why
- The governance rationale, linked to §<section> of identifier-naming-migration.md

## Changes
- File-level diff summary.

## Tests
- [ ] Unit tests added/updated (list)
- [ ] Local build clean: `<build command>`
- [ ] Local test suite clean: `<test command>`
- [ ] Lint clean: `<lint command>`

## Docs
- [ ] Touched feature's docs updated (list paths)
- [ ] AGENTS.md / CLAUDE.md updated if the change establishes a new convention

## Migration impact
- Breaking / non-breaking
- API-version bump required: yes/no
- Consumer repos that must be updated: list

## Rollback
- How to revert safely.
```

### 5.7 Failure escalation
An agent stops and escalates (posts to the parent task with `status=in_progress` preserved and a blocking comment) when:
- Same failure recurs across 3 push attempts.
- Review feedback requires a design decision outside the charter.
- Build or test infrastructure is broken (not repaired by the agent's own work).
- A dependency agent's prerequisite output is missing.

Escalation comment format: `BLOCKED: <one-line reason>. <What I tried>. <What I need>.`

---

## 6. Phase 0 Agents

Baseline metrics collection. Read-only. Output drives Phase 1 rule authoring and Phase 3 sequencing.

### Agent 0.A — Field-count baseline (@meshery/schemas)
**Charter:** Enumerate every JSON tag across `meshery/schemas` OpenAPI files (`schemas/constructs/v*/*/api.yml` and `*.yaml`), classify by current form (snake / camel / mixed), and produce a per-resource migration-surface count.

**Outputs (committed to `meshery/schemas/validation/baseline/field-count.json`):**
- Total JSON tags in scope
- Count by form: snake_case, camelCase, PascalCase, other
- Count DB-backed vs non-DB-backed (from `x-oapi-codegen-extra-tags.db`)
- Per-resource row: `{resource, version, total_tags, snake_tags_to_migrate, camel_tags_stable}`

**Acceptance:** JSON report commits; numbers match manual spot-check of three resources (workspace, environment, design).

### Agent 0.B — Tag-divergence baseline (meshery + meshery-cloud Go)
**Charter:** Scan every Go struct in `meshery/server/models/` and `meshery-cloud/server/models/` with `json:` and `db:` tags. Report every struct where: (i) JSON tag differs from `db:` tag (either form), (ii) multiple JSON-tag conventions appear on one struct, (iii) the `json:` tag is ALL CAPS.

**Outputs (`meshery/schemas/validation/baseline/tag-divergence.json`):**
- Array of `{repo, file, line, type, field, json_tag, db_tag, classification}`
- Summary counts by classification

**Acceptance:** Every struct flagged in the original audit is present; summary aligns with §15 impact report numbers.

### Agent 0.C — Route-parity baseline (consumer-audit dry run)
**Charter:** Run `cd /Users/l/code/schemas && make consumer-audit MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud` (extend `Makefile` to accept `EXTENSIONS_REPO=` if not already there) against current-state repos. Capture output verbatim.

**Outputs:** `meshery/schemas/validation/baseline/consumer-audit.txt` (verbatim) plus a summary of divergence classes.

**Acceptance:** Output captured; known divergences (workspaces `orgID`, environments `orgId`, 9 mapping-model `json:"ID"`, etc.) present.

### Agent 0.D — Consumer dependency graph
**Charter:** For each downstream repo, identify which `@meshery/schemas` import sites use which schema resources. Build a DAG of `resource → consuming files` so Phase 3 sequencing can prioritize resources whose consumers are simple.

**Outputs:** `meshery/schemas/validation/baseline/consumer-graph.json` — `{resource: {consuming_files: [], complexity_score: int}}`

**Acceptance:** Graph covers all 22 resources in §9's inventory; complexity score uses a documented heuristic.

---

## 7. Phase 1 Agents — Schemas governance & validator hardening

Serial execution; each depends on the prior landing. All work in `meshery/schemas`.

### Agent 1.A — `AGENTS.md` identifier-naming amendment
**Charter:** Replace `§ Casing rules at a glance`, `§ Intentional Design Decisions (Do Not Flag)`, and related paragraphs with the canonical contract from §1 of this plan.

**Files:** `meshery/schemas/AGENTS.md` (symlinked as `CLAUDE.md`).

**Specific changes:**
1. In `§ Casing rules at a glance`, replace the "DB-backed / DB-mirrored fields | exact snake_case db column name" row with: "JSON tag on DB-backed fields | **camelCase**; `db:` tag in `x-oapi-codegen-extra-tags` carries the snake_case DB column name separately".
2. In `§ Intentional Design Decisions (Do Not Flag)`, convert `page_size`/`total_count` from a perpetual exception to a **deprecation list** — current forms accepted; migrates to `pageSize`/`totalCount` at the next API-version bump per resource.
3. Add a new `§ Identifier-naming migration` section linking to this plan at `docs/identifier-naming-migration.md` within the same repo as the operative execution document.
4. Add to `§ Common Mistakes to Avoid`: "❌ Introducing a `json:` tag that matches the `db:` tag on a new field — wire is camel, DB is snake; they differ by design on DB-backed fields."
5. Update `§ Checklist for Schema Changes` to reflect the inverted rule.

**Testing:** No code change; manual sanity check that examples in the amendment match the new table. Run `make validate-schemas` to confirm the doc-only change does not trip any rule.

**Docs:** Self-documenting; this IS the doc.

**Review:** Human governance review required (maintainer). Auto-merge disabled on this PR.

**Acceptance:** Amendment merged; validator rules not yet changed but run green.

### Agent 1.B — `validation/rules_naming.go` Rule 6 inversion
**Charter:** Rewrite Rule 6 (schema property-name casing) to require camelCase unconditionally. Remove the DB-backing exception. Keep `knownLowercaseSuffixViolations` (detects `userid` → should be `userId`) and `screamingIDRE` (detects `orgID` → should be `orgId`).

**Files:**
- `meshery/schemas/validation/rules_naming.go` — `checkRule6ForAPI`, `checkRule6ForEntity` (and sibling in `rules_entity.go`).
- `meshery/schemas/validation/casing.go` — the `dbMirroredFields` set stays but is repurposed: fields present here are now **legacy debt tracked via `--style-debt` flag**, not exceptions to Rule 6.
- New test cases in `meshery/schemas/validation/casing_test.go` and `rules_property_test.go`: (i) a DB-backed field with snake JSON tag now fails Rule 6, (ii) a DB-backed field with camel JSON tag passes, (iii) non-DB-backed snake still fails.

**Testing:** `cd /Users/l/code/schemas && go test ./validation/ -run "TestCasing|TestRule6"` — green. `make validate-schemas` — current schemas will now surface a large number of violations; these get baselined in Agent 1.G.

**Docs:** In the Go file, the docstring for `checkRule6ForAPI` documents the camelCase-wire rule inversion and links to `AGENTS.md § Identifier-naming migration`.

**Acceptance:** Tests pass; Rule 6 now flags the legacy schemas; baseline pending (1.G).

### Agent 1.C — "Partial casing migrations forbidden" rule
**Charter:** Author a new rule (call it Rule 45) that walks every `components/schemas/<Entity>` object and flags structs that mix JSON-tag conventions (some camel, some snake, some ALL CAPS) on their properties.

**Files:**
- `meshery/schemas/validation/rules_naming.go` (new `checkRule45`).
- `meshery/schemas/validation/rules_naming_test.go` (new test file if not present, else extend).

**Testing:** Test fixtures: (i) all-camel struct → pass, (ii) all-snake struct → pass (legacy, caught by Rule 6 but not Rule 45), (iii) mixed camel+snake on one struct → fail Rule 45 with a message citing each non-matching field.

**Docs:** Rule description in the Go docstring references `AGENTS.md § Casing rules at a glance` and notes this rule catches the `MesheryPattern.OrgID json:"orgId"` + `WorkspaceID json:"workspace_id"` + `UserID json:"user_id"` class of drift.

**Acceptance:** Rule 45 fires on fixtures; runs green against the post-migration schemas once Phase 3 completes.

### Agent 1.D — "Sibling-endpoint parameter parity" rule
**Charter:** Author Rule 46 — when two sibling paths in the same API version follow the pattern `GET /api/<entity-plural>`, and one declares `$ref: "#/components/parameters/orgIdQuery"`, the sibling should too. Covers the workspaces-missing-`orgIdQuery` class of omission.

**Files:** `meshery/schemas/validation/rules_naming.go` or new `rules_parity.go`; matching test file.

**Testing:** Fixtures: (i) all siblings declare `orgIdQuery` → pass, (ii) one sibling omits → fail with message identifying the missing sibling.

**Docs:** Rule docstring explains the class of production bug this catches (workspaces 400 from dropped `orgId`).

**Acceptance:** Rule fires on a crafted fixture; `v1beta1/workspace/api.yml` is flagged in the baseline output (will be fixed in Phase 3.Workspace).

### Agent 1.E — Query-parameter casing rule (extend Rule 4)
**Charter:** Rule 4 currently checks path parameters. Extend it to `parameters: [{in: query, name: ...}]` — query parameter names must be camelCase with `Id` suffix. Flags `user_id` (v1beta1/token), `organizationId` (v1beta1/feature + v1beta2/invitation:322), any `orgID` that slips through.

**Files:** `meshery/schemas/validation/rules_naming.go` `checkRule4`.

**Testing:** Fixtures covering path param, query param, header param (last one untouched).

**Acceptance:** Rule flags the known outliers; they're baselined in 1.G.

### Agent 1.F — `validation/consumer_ts.go` authoring
**Charter:** Parse TypeScript RTK endpoint definitions from the downstream repos and diff against the schemas endpoint index. The TS parser reads `ui/rtk-query/*.ts` (and equivalents in Cloud UI and Kanvas) to find `builder.query({url, params})` and `builder.mutation({url, params, body})` sites.

**Files:**
- `meshery/schemas/validation/consumer_ts.go` (new).
- `meshery/schemas/validation/consumer_ts_test.go` (new).
- `meshery/schemas/validation/consumer.go` (update) — register the TS consumer alongside echo/gorilla.
- `meshery/schemas/cmd/consumer-audit/main.go` (update) — accept `--extensions-repo` / `--meshery-repo-ui` flags.
- `meshery/schemas/Makefile` (update) — `consumer-audit` target accepts `EXTENSIONS_REPO=`, `MESHERY_REPO=`, `CLOUD_REPO=` and iterates all registered consumers.

**Testing:**
- Unit tests with inline TS fixtures (no external repos).
- Integration test that runs against `../meshery-extensions` fixture directories and produces deterministic output.

**Docs:** `meshery/schemas/validation/doc.go` extended with a paragraph on TS consumer auditing. `meshery/schemas/AGENTS.md § Consumer audit` added describing the new target.

**Acceptance:** Running `make consumer-audit EXTENSIONS_REPO=../meshery-extensions` produces output naming the `catalog.ts:110` case-flip, the `designs.ts:308` wrapper mismatch, and the `user.ts` hook inconsistencies.

### Agent 1.G — Advisory baseline refresh
**Charter:** Run `make audit-schemas-full` and the new `make consumer-audit` against the current state of all four repos. Write every violation that fires under the new rules to the advisory baseline file so CI stays green while Phases 2–3 proceed. New violations introduced after this baseline block CI.

**Files:**
- `meshery/schemas/validation/baseline/advisory.yaml` (or whatever format `baseline.go` uses — follow its convention).
- `meshery/schemas/validation/baseline/consumer-advisory.yaml` (new for consumer findings).

**Testing:** `make validate-schemas` runs green; `make audit-schemas-full` reports 0 "new" advisory issues (backlog captured in the baseline); introducing a test violation (e.g., edit one test schema to add `json:"orgID"`) makes CI fail.

**Docs:** `meshery/schemas/AGENTS.md § Advisory baseline` — add paragraph explaining the baseline workflow: new violations block; baselined violations require intentional resolution via Phase 3 migrations.

**Acceptance:** `make validate-schemas` and `make audit-schemas-full` both exit 0 on the current repo state; adding a fresh violation fails CI.

### Agent 1.H — CI workflow wiring (consumer-audit advisory)
**Charter:** Add a `consumer-audit` job to `.github/workflows/schema-audit.yml` that checks out the three downstream repos (using `actions/checkout` with `repository:` and a PAT secret for private-repo access if needed) and runs `make consumer-audit`. Exit 0 regardless — advisory only. Output posted as a PR comment summarizing divergence counts.

**Files:** `meshery/schemas/.github/workflows/schema-audit.yml`.

**Testing:** Trigger a throwaway PR; verify the new job runs and the comment posts. Repro locally with `act` if available.

**Docs:** `meshery/schemas/AGENTS.md § Consumer audit` — document the CI behavior.

**Acceptance:** On PR open, all three jobs (`blocking-validation`, `advisory-audit`, `consumer-audit`) run; `consumer-audit` posts a comment with the divergence counts per downstream repo.

### Agent 1.I — Package version bump + publish
**Charter:** Bump `@meshery/schemas` npm package minor version to mark Phase 1 complete; bump the Go module version; publish to npm; cut a GitHub release with notes linking this plan.

**Files:** `meshery/schemas/package.json`, `CHANGELOG.md`, git tag.

**Testing:** `npm pack` locally; inspect package contents; `go mod tidy` in a consumer repo against the new version.

**Docs:** Release notes cover the canonical contract, link to this plan, note that Phase 2 downstream fixes depend on this version.

**Acceptance:** Version published; downstream repos can `npm install @meshery/schemas@<new-version>` and `go mod edit -require github.com/meshery/schemas@<new-tag>`.

---

## 8. Phase 2 Agents — Non-breaking alignment fixes

All agents in this phase pin their target repo's `@meshery/schemas` dependency to the Phase 1.I version. Agents 2.A–2.J run in parallel (no inter-dependencies), each producing one PR.

### Agent 2.A — Meshery server query-param extraction alignment
**Repo:** `meshery/meshery`  
**Branch:** `fix/handler-orgid-casing-alignment`  
**Charter:** Change `q.Get("orgID")` to `q.Get("orgId")` in every handler that reads the org-ID query parameter. Ensure the change is consistent across sibling endpoints.

**Files:**
- `server/handlers/workspace_handlers.go` (lines 24, 46) — `orgID` → `orgId`.
- `server/handlers/meshery_pattern_handler.go:557` — `q["orgID"]` → `q["orgId"]`.
- Any other `q.Get("orgID")` or `q["orgID"]` sites turned up by `grep -rn 'Get("orgID")\|\["orgID"\]' server/`.
- `environments_handlers.go` already uses `orgId` — leave unchanged.
- Corresponding error messages (`"WorkspaceID or OrgID cannot be empty"`) updated to reflect the canonical `orgId` form.

**Testing:**
- `cd server && go test ./handlers/...` — green.
- New handler test: `TestGetWorkspacesHandler_RequiresOrgIdCaseSensitive` — asserts that `?orgID=abc` (legacy case) now fails the new extraction, and `?orgId=abc` succeeds.
- `go build ./...` — green.

**Docs:**
- `docs/` in-repo (if any mention) updated.
- OpenAPI spec at `server/helpers/swagger.yaml` (if present) aligned.

**Acceptance:** PR merged; `make consumer-audit` from schemas repo no longer flags these handlers for wrong casing.

### Agent 2.B — Meshery server outbound URL alignment
**Repo:** `meshery/meshery`  
**Branch:** `fix/remote-provider-outbound-orgid-casing`  
**Charter:** Change every outbound `q.Set("orgID", ...)` in `server/models/remote_provider.go` to `q.Set("orgId", ...)`. Confirm receiving (meshery-cloud) side accepts `orgId` (it does — Cloud middleware already uses `utils.QueryParam(..., "orgId", "orgID")`).

**Files:**
- `server/models/remote_provider.go` — lines 5174, 5215, 5607, 5671 (confirm via `grep -n 'q.Set("orgID"' server/models/remote_provider.go`).
- Any other `q.Set("org`-flavored sites.

**Testing:**
- `go build ./...` — green.
- Existing tests for `GetEnvironments`, `GetWorkspaces`, `GetCatalogMesheryPatterns`, `GetUsersKeys` remain green.
- New test: verify the outbound URL contains `?orgId=` (not `?orgID=`) using `httptest.NewServer` that asserts the request URL.

**Acceptance:** PR merged; outbound URLs from meshery to cloud now use `orgId`.

### Agent 2.C — Meshery-cloud `QueryParamOrganizationID` constant + dual-accept retirement (two PRs)
**Repo:** `layer5io/meshery-cloud`  
**Branches:** `fix/query-param-org-id-constant` then `chore/retire-org-id-dual-accept`  
**Charter, PR 1:** `server/utils/constants.go:138` `QueryParamOrganizationID = "orgID"` → `"orgId"`. Cascade: update all callers.  
**Charter, PR 2 (one release later):** Remove `utils.QueryParam(q, "orgId", "orgID")` fallback; keep only `"orgId"`.

**Files PR 1:**
- `server/utils/constants.go:138`.
- Every consumer of the constant — find with `grep -rn QueryParamOrganizationID server/`.
- Middleware `server/handlers/middlewares_authz_scope.go:241` — verify behavior unchanged.

**Files PR 2:**
- Every `utils.QueryParam(q, "orgId", "orgID")` — simplify to `q.Get("orgId")` or equivalent.
- Sites found: `server/handlers/meshery_patterns.go:542`, `meshery_views.go:123`, `flow_emails.go:245`, `middlewares_authz_scope.go:241`, plus any others turned up by `grep -rn 'QueryParam.*"orgId".*"orgID"' server/`.

**Testing:**
- `go build ./...` — green.
- `go test ./server/...` — green.
- Integration test against a live staging Cloud: `curl -H "Cookie: ..." "https://<host>/api/workspaces?orgId=<uuid>"` returns 200 (or the existing business-logic response) and `orgID` returns 400/400 (legacy form no longer accepted in PR 2).

**Docs:** `server/docs/` (if present) or README API examples updated to use `orgId`.

**Acceptance:** PR 1 merged with no behavior change on happy path; PR 2 merged one release later after downstream clients (meshery-server Agents 2.A+2.B, Cloud UI Agent 2.E, Kanvas Agent 2.G) all emit `orgId`.

### Agent 2.D — Meshery-cloud mapping-model JSON tags (`json:"ID"` → `json:"id"`)
**Repo:** `layer5io/meshery-cloud`  
**Branch:** `fix/mapping-model-id-json-tag-lowercase`  
**Charter:** All 9 mapping models use `json:"ID"` (ALL CAPS) on their `ID` primary-key field. AGENTS.md mandates lowercase `json:"id"`. Apply uniformly.

**Files (all in `server/models/`):**
- `model_environment_connection_mapping.go`
- `model_workspaces_teams_mapping.go`
- `model_users_organizations_mapping.go`
- `model_workspaces_designs_mapping.go`
- `model_resource_access_mapping.go`
- `model_workspaces_environments_mapping.go`
- `model_users_teams_mapping.go`
- `model_workspaces_views_mapping.go`
- `model_keychain_filter.go` (`roleID` — check JSON tag, align to `id`)

**Testing:**
- `go build ./...` — green.
- `go test ./...` — green.
- **API-breaking potential.** Survey consumers: is any API response body consumer reading `.ID` field via JSON? If yes, a one-release deprecation notice is required; emit both `ID` and `id` fields via a custom `MarshalJSON` for one release, then drop `ID`.
  - Consumer survey method: grep the three downstream repos for `.ID` property access on these types' API-returned JSON. Record findings in the PR description.

**Docs:** `meshery-cloud/CHANGELOG.md` entry; if any `server/docs/` exists, update the sample response bodies.

**Acceptance:** PR merged; Agent 2.D's consumer survey documented; deprecation shim in place if any consumer reads `ID`.

### Agent 2.E — Meshery-cloud `ContentID` JSON tag alignment
**Repo:** `layer5io/meshery-cloud`  
**Branch:** `fix/content-id-json-tag-alignment`  
**Charter:** `CatalogRequest.ContentID` at `server/models/users.go:246` currently declares `json:"contentId" db:"content_id"`. Under the canonical contract: `ContentID` Go field + `json:"contentId"` + `db:"content_id"` — this is actually **already correct** under the canonical contract. Agent's task is to verify, and if correct, mark the previously-flagged finding as resolved.

**Testing:** `go test ./...` green; search schemas consumer-audit output for `CatalogRequest`/`ContentID` — no findings.

**Docs:** PR description explains that the original audit misclassified this as a violation; under the canonical contract it is canonical.

**Acceptance:** Confirmed correct; no code change; baseline updated to retire the stale finding.

### Agent 2.F — Cloud UI `ui/api/api.ts` endpoint dedup vs. `@meshery/schemas/cloudApi`
**Repo:** `layer5io/meshery-cloud`  
**Branch:** `refactor/cloud-ui-api-dedup`  
**Charter:** Audit each of the 30+ hand-rolled endpoints in `meshery-cloud/ui/api/api.ts`. For each:
1. Check if `@meshery/schemas/cloudApi` exposes an equivalent endpoint (same URL + method + params, under the canonical contract).
2. If yes: displace — import and re-export the generated hook; remove the hand-rolled definition.
3. If no (legitimate customization): document the reason inline (`// LOCAL: <reason>`) and open a follow-up issue in `meshery/schemas` to consider exporting.

**Additional:** Remove the input-`orgId` → URL-`orgID` case-flip transformation at lines 1264, 1272, 1201, ~96. Under the canonical contract both sides of the wire are `orgId`.

**Testing:** `npm run build`, `npm test`, `eslint --max-warnings=0` all green. Integration-test one representative flow (workspaces list) in a dev environment to confirm no regression.

**Docs:** `ui/api/README.md` (or similar) — document the displacement pattern; `ui/CONTRIBUTING.md` — note that new endpoints should use generated `cloudApi`, not hand-rolled.

**Acceptance:** PR merged; `consumer_ts.go` reports ≥N fewer hand-rolled TS endpoints than before; the specific case-flip sites are gone.

### Agent 2.G — Kanvas `catalog.ts` RTK case-flip removal + `designs.ts` wrapper alignment
**Repo:** `layer5labs/meshery-extensions`  
**Branch:** `fix/kanvas-rtk-camelcase-alignment`  
**Charter:** Two related Kanvas fixes that go together:
1. `meshmap/src/rtk-query/catalog.ts:110` `getWorkspaceForCatalog` — remove the `orgID: queryArg.orgId` transform; emit `orgId` in the URL directly.
2. `meshmap/src/rtk-query/catalog.ts:58-59` `getPatternsPerUser` — unify to canonical names.
3. `meshmap/src/rtk-query/designs.ts:308` `uploadPatternBySourceType` body wrapper — change `{ pattern_data: {...} }` to `{ patternData: {...} }` to match the `SaveMesheryPattern` wire contract already established by PR #18856.
4. `meshmap/src/rtk-query/designs.ts:336-342` `patternFiletoCytoJson` body — align to camelCase throughout.
5. `meshmap/src/rtk-query/designs.ts:188` `k8sYamlToPattern` body — `{ k8s_manifest: ... }` → `{ k8sManifest: ... }`.

**Coordination:** Changes 3–5 require the receiving side (meshery server's `meshery_pattern_handler.go` etc.) to accept the new wrapper key. Verify acceptance before merge — either the handler already accepts camelCase (check by reading the handler's unmarshal target struct's JSON tags) or a companion PR in meshery server adds a dual-accept during the deprecation window.

**Testing:**
- `cd meshmap && npm run build && npm test` — green.
- Manual smoke: in a dev Meshery instance, save a design from Kanvas. Verify success at the server level (PR #18856's existing test can be re-run).
- E2E test under `tests/` (playwright) — the save-design flow.

**Docs:** Kanvas Developer Guide updated where it references wrapper keys; `AGENTS.md`/`CLAUDE.md` updated (see §14).

**Acceptance:** PR merged; design save works; `consumer_ts.go` no longer flags the catalog case-flip or the `pattern_data` wrapper inconsistency.

### Agent 2.H — Meshery UI RTK hook unification (`ui/rtk-query/`)
**Repo:** `meshery/meshery`  
**Branch:** `refactor/ui-rtk-query-orgid-alignment`  
**Charter:** In `ui/rtk-query/user.ts`, `ui/rtk-query/design.ts`, and any sibling hook files, unify every `orgID` → `orgId`. Remove wrapper hooks that exist only to alias `orgId` through.

**Specific sites:**
- `ui/rtk-query/user.ts:87` — `orgID: selectedOrganization?.id` → `orgId: ...`.
- `ui/rtk-query/design.ts:49` — same.
- `ui/rtk-query/environments.ts:11-21` — thin wrapper; eliminate; have callers use `useSchemasGetEnvironmentsQuery` directly.
- `ui/rtk-query/workspace.ts:19-80` — custom `queryFn` stays until Phase 3.Workspace (the schemas-generated client gains `orgIdQuery` there); in the meantime, ensure the custom queryFn passes `orgId` (not `orgID`) in its URL construction.

**Testing:** `cd ui && npm run build && npm test` — green. The `environments` wrapper removal touches many call sites; every import of `useGetEnvironmentsQuery` from the local wrapper must be updated to import from `@meshery/schemas/mesheryApi`. Compile-error-driven; TypeScript's type system catches misses.

**Docs:** `ui/CONTRIBUTING.md` adds a paragraph: "Do not wrap schemas-generated hooks solely to alias parameter names; propagate the canonical identifier."

**Acceptance:** PR merged; no same-file `orgID`/`orgId` mix remains; thin wrappers eliminated.

### Agent 2.I — Kanvas `mesherySdk` event-type casing alignment
**Repo:** `layer5labs/meshery-extensions`  
**Branch:** `fix/mesherysdk-event-type-camelcase`  
**Charter:** In `meshmap/src/globals/mesherySdk.ts`, convert event-payload field names from snake_case to camelCase to match dispatcher signatures on the same file.

**Specific sites:**
- Event types at lines 30, 38, 46: `design_id` → `designId`, `view_id` → `viewId`.
- All event publishers in `meshmap/src/` that construct these events (grep for `design_id:` and `view_id:` in `*.ts`/`*.tsx`).
- The backend-response mapping at `meshmap/src/modules/editor/modes/designer/designActor.ts:308-311` reads `event.output.workspace_id` and `event.output.org_id` — these are from an HTTP response (snake_case preserved by the wire until Phase 3.Design). Keep the snake→camel mapping at the boundary; refactor to a helper function that documents the intentional boundary crossing.

**Testing:** `cd meshmap && npm run build && npm test` — green. TS type checks enforce correctness of the field renames across event-consumer code.

**Docs:** Kanvas Developer Guide event-bus section updated; the boundary-mapping helper has a one-line `// why:` comment pointing at this plan's §1.

**Acceptance:** PR merged; same-file casing split in `mesherySdk.ts` resolved.

### Agent 2.J — Kanvas `collab/config.ts` user-ID duality resolution
**Repo:** `layer5labs/meshery-extensions`  
**Branch:** `fix/kanvas-collab-user-id-canonical`  
**Charter:** `meshmap/src/modules/editor/collab/config.ts:32-40` currently declares both `user_id` and `id` on the user interface — ambiguous canonical key. Pick one (`id`, matching `AGENTS.md` property-default casing for short-form identifiers) and remove the other. Update all consumers.

**Testing:** `cd meshmap && npm run build && npm test` — green. Manual smoke: two-user collaboration session; verify presence indicators render correctly.

**Docs:** Collaboration section of Kanvas Developer Guide updated.

**Acceptance:** PR merged; interface declares one canonical field; no grep hits for `user_id` on the collab type.

---

## 9. Phase 3 Agents — Per-resource versioned wire migration

One agent per resource. Agents may run in parallel across resources. Each agent publishes a new API version for its resource in `meshery/schemas`, regenerates clients, and migrates downstream consumers onto the new version.

### 9.1 Resource inventory (22 resources)

Sequenced by Agent 0.D's complexity score (lowest first). Resource names match `schemas/constructs/v1beta*/<resource>/api.yml` directories.

| Priority | Resource | Current version | New version | Est. consumer count |
|---|---|---|---|---|
| 1 | workspace | v1beta1 | v1beta3 | medium |
| 2 | environment | v1beta1 | v1beta3 | medium |
| 3 | organization | v1beta1 | v1beta2 (first bump) | high |
| 4 | user | v1beta1 | v1beta2 (first bump) | high |
| 5 | design / pattern | v1beta1, v1beta2 | v1beta3 | very high |
| 6 | connection | v1beta1, v1beta2 | v1beta3 | high |
| 7 | team | v1beta1 | v1beta2 (first bump) | medium |
| 8 | role | v1beta1 | v1beta2 (first bump) | low |
| 9 | credential | v1beta1 | v1beta2 (first bump) | medium |
| 10 | event | v1beta1, v1beta2 | v1beta3 | medium |
| 11 | view | v1beta1 | v1beta2 (first bump) | medium |
| 12 | key | v1beta1 | v1beta2 (first bump) | low |
| 13 | keychain | v1beta1 | v1beta2 (first bump) | low |
| 14 | invitation | v1beta1, v1beta2 | v1beta3 | low |
| 15 | plan | v1beta2 | v1beta3 | low |
| 16 | subscription | v1beta1, v1beta2 | v1beta3 | low |
| 17 | token | v1beta1, v1beta2 | v1beta3 | low |
| 18 | badge | v1beta1 | v1beta2 (first bump) | low |
| 19 | schedule | v1beta1 | v1beta2 (first bump) | low |
| 20 | model | v1beta1 | v1beta2 (first bump) | high |
| 21 | component | v1beta2 | v1beta3 | very high |
| 22 | relationship | v1beta1, v1beta2, v1alpha3 | v1beta3 | high |

### 9.2 Per-resource agent template (Agent 3.<Resource>)

Every Phase 3 resource agent follows this template. Variable substitutions in `{braces}`.

**Charter:** Author a new API version `{new-version}` for `{resource}` in `meshery/schemas` with 100% camelCase JSON tags on all schema properties, canonical query/path parameter names, and sibling-endpoint parameter parity. Regenerate the Go and TypeScript clients. Migrate every downstream consumer (identified by Agent 0.D's graph) onto the new version. Mark the previous version deprecated with a sunset target of one release cycle after 100% consumer migration.

**Repos touched (one PR per repo, chained):**
1. `meshery/schemas` — author new version, regenerate clients, publish.
2. `meshery/meshery` — consume new version in server handlers and UI hooks.
3. `layer5io/meshery-cloud` — same.
4. `layer5labs/meshery-extensions` — same.

**Schemas PR:**
- Files: `schemas/constructs/{new-version}/{resource}/` (new directory), copied from previous version and updated.
- **Every JSON tag** in schemas properties: camelCase. DB-backed primitives retain their snake `db:` tag via `x-oapi-codegen-extra-tags`.
- **Every query/path parameter**: camelCase with `Id` suffix.
- **Every operationId**: lower camelCase verbNoun.
- If applicable, add the missing parameter references (e.g., `orgIdQuery` for workspace GET).
- Regenerate: `make generate-golang && make generate-rtk && make build-ts && make publish-ts` (published as a new semver minor).
- Run validators: `make validate-schemas` green; `make audit-schemas-full` shows the new version as clean.

**Downstream PRs (one per repo):**
- Repoint imports from `github.com/meshery/schemas/models/{old-version}/{resource}` to `.../{new-version}/...` (Go).
- Repoint imports from `@meshery/schemas/models/{old-version}/{resource}` to `.../{new-version}/...` (TS), or adjust the RTK hook names if the client generation renames them.
- Update handler query-param extraction to read the new canonical names (no-op if Phase 2 already aligned).
- Update outbound URL construction similarly.
- Update UI hook calls and prop types.
- Update tests and fixtures.
- Update sample API request/response docs under `docs/` or `README.md`.

**Test plan per repo:**
- Full build + test suite green.
- Integration test hitting the new URL/params + body shape.
- Backward-compat smoke: old client version still works against its old endpoints (which are still served until sunset).

**Documentation:**
- `AGENTS.md`/`CLAUDE.md` in each repo — note the migration done.
- API docs that show response bodies updated for the new version.
- `CHANGELOG.md` entry with migration notes for external clients.

**Deprecation:**
- Old version's `api.yml` annotated with `deprecated: true` on every operation.
- OpenAPI `x-sunset-date` header annotation set to one release cycle out.

**Acceptance per resource:**
- New version green in validators.
- All downstream consumers on new version.
- Old version deprecated but still functional.
- `consumer-audit` reports no wire-casing divergence on this resource.

### 9.3 Specific priority-1 resource: Agent 3.Workspace

This is the smallest worked example, and it closes the production-hot workspaces-`orgId` bug.

**Schemas changes (`schemas/constructs/v1beta3/workspace/api.yml`):**
- Copy `v1beta1/workspace/api.yml`.
- Add `- $ref: "#/components/parameters/orgIdQuery"` to GET `/api/workspaces` parameters (the fix that was missing in v1beta1).
- Flip any snake_case JSON tags on `Workspace` / `WorkspacePayload` properties to camelCase.
- Verify `db:` tags in `x-oapi-codegen-extra-tags` remain snake (unchanged).

**Schemas regeneration:**
- `make generate-golang && make generate-rtk && make build-ts`.
- The new generated `getWorkspaces` includes `orgId` as an optional URL param, closing the prior omission.

**Meshery server consumer PR:**
- `server/models/meshery_pattern.go` and any other struct that has a `Workspace` association — import from `v1beta3` if the struct is shared; otherwise retain local struct until Phase 3.Design also lands.
- Handler updates if any.

**Meshery UI consumer PR:**
- `ui/rtk-query/workspace.ts` — if the schemas-generated client now covers the orgId case with the correct shape, retire the custom `queryFn` in favor of the generated hook.
- Component updates where types have changed (compile-error-driven).

**Meshery-cloud server:**
- Handlers at `server/handlers/workspaces.go` updated to consume the new models package.
- Middleware `middlewares_authz_scope.go:241` — can now drop the `orgID` fallback once all consumers are on v1beta3.

**Meshery-cloud UI:**
- `ui/api/api.ts:1255-1272` — displace with the generated hook from `cloudApi`.

**Kanvas:**
- No direct workspace endpoint usage in Kanvas (workspace modal is provided by Meshery UI). Indirect exposure via `mesherySdk.ts` message shapes — update snake-cased fields.

**Testing:**
- New handler test: `GET /api/workspaces?orgId=<uuid>` returns 200 (was 400 in v1beta1 due to the schema omission).
- Integration test against live staging — design save + workspace list flow.

**Docs:**
- Kanvas Developer Guide — any section mentioning workspace URL shape.
- Meshery docs — API reference.

**Acceptance:**
- Workspaces 400 bug observed in PR #18858's context no longer reproduces.
- `consumer-audit` clean on workspace.

### 9.4 Priority-1 through priority-22 agents

The remaining 21 agents follow the template in §9.2 with per-resource file paths. Authoring each agent's full prompt inline would bloat this doc without adding execution signal; the orchestrator spawns each using the template + resource name as the substitution. The per-resource complexity score from Agent 0.D determines the order.

**Invariant across all Phase 3 agents:** no single PR modifies more than one resource's API version. Multi-resource changes are forbidden — they make review and rollback harder.

---

## 10. Phase 4 Agents — Deprecation & finalization

### Agent 4.A — Deprecated-version retirement (administrative close; **no physical deletion**)
**Status:** Administratively closed on 2026-04-23 per maintainer decision. **Do not delete any `schemas/constructs/v*/<resource>/` directory as part of this agent's work.**

**Original charter (superseded):** Remove deprecated API version files from `meshery/schemas` once every consumer repo has migrated to the new version. Regenerate clients. Publish.

**Revised charter:** Retire deprecated-version files **administratively** — mark the phase closed in governance docs and confirm the retained legacy trees remain behind their existing `x-deprecated: true` / `x-superseded-by:` markers. The deprecated directories stay on `master` indefinitely so external consumers (outside the three in-repo consumers) that still pin `v1beta1` or `v1beta2` are not stranded.

**Rationale for the override:**
- The in-repo consumer graph covers only `meshery/meshery`, `layer5io/meshery-cloud`, and `layer5labs/meshery-extensions`; all three have migrated to the canonical-casing target versions, so the plan's original acceptance criteria are satisfied for those consumers.
- External consumers — forks, third-party integrations, archived CI pipelines, published SDK downstreams — cannot be enumerated from the in-repo audit. Physical deletion would break their pinned imports with no migration path.
- The OpenAPI bundler (`build/lib/config.js::isDeprecatedPackage`) already excludes directories carrying `info.x-deprecated: true` from the merged spec, so retaining the legacy trees has no effect on the bundled path space or on client-generator output for the canonical versions.
- Retention cost is low (source YAML only; the bundler keeps them out of generated artefacts) and the safety win is high.

**Files:** None modified under `schemas/constructs/`. Governance docs only: this agent's work is the change-log entry in §20 of this plan, the status row in §2 of [`identifier-naming-impact-report.md`](identifier-naming-impact-report.md), §8 of the same report (retained-legacy-directories index), and the `AGENTS.md` § Identifier-naming migration section.

**Testing:** `make validate-schemas`, `make audit-schemas`, `make consumer-audit MESHERY_REPO=../meshery CLOUD_REPO=../meshery-cloud EXTENSIONS_REPO=../meshery-extensions` — all green. Because no schema content changes, the expected outcome is no delta in any validator or auditor output.

**Docs:**
- `AGENTS.md` § Identifier-naming migration — retitled from "(in flight)" to "(complete; v1beta1 retained for back-compat)".
- `docs/identifier-naming-migration.md` — this section (Phase 4.A), §4 Phase Structure, and §20 Revision history.
- `docs/identifier-naming-impact-report.md` — status banner, §2 per-resource status column, new §8 retained-legacy-directories index, revision history.

**Acceptance:** Governance docs reflect the administrative close; no file under `schemas/constructs/v1beta1/` or `schemas/constructs/v1beta2/` has been deleted; every retained directory's `x-deprecated: true` marker is untouched; the canonical versions continue to serve all bundled clients. Any future physical deletion requires a separate maintainer decision documented in this plan's §20.

### Agent 4.B — Consumer-audit promoted to blocking
**Charter:** In `meshery/schemas/.github/workflows/schema-audit.yml`, change the `consumer-audit` job to exit non-zero on divergence. This permanently closes the drift door.

**Files:** `.github/workflows/schema-audit.yml`.

**Testing:** Introduce a deliberate drift (e.g., add an `orgID` param to a test schema) on a throwaway PR; verify CI now fails. Revert.

**Docs:** `AGENTS.md § Consumer audit` updated to reflect blocking status.

**Acceptance:** Drift introduced in a test PR fails CI; reverted, green.

### Agent 4.C — Universal `AGENTS.md` + `CLAUDE.md` updates across every repo
**Charter:** In each of the four repos (`meshery/schemas`, `meshery/meshery`, `layer5io/meshery-cloud`, `layer5labs/meshery-extensions`), ensure `AGENTS.md` and `CLAUDE.md` (symlinked or duplicated) contain the identifier-naming mandate with a strong "MUST" / "MUST NOT" section referencing `schemas/AGENTS.md § Casing rules at a glance` as the authority. Boilerplate text in §14 of this plan.

**Files (per repo):**
- `AGENTS.md`
- `CLAUDE.md` (if separate file)
- `.claude/CLAUDE.md` (project-level, if present)

**Testing:** No code change; the PR is documentation-only. Reviewers verify text adherence to §14's boilerplate.

**Acceptance:** All four repos merged with matching boilerplate; any future contributor (human or AI) reading the doc sees the same rule set.

### Agent 4.D — Final validator rule pruning
**Status:** Complete (2026-04-23) — `knownLowercaseSuffixViolations` retired in `validation/casing.go`; unused `lowercaseSuffixPattern` regex removed; `GetCamelCaseIssues` now no-ops the lowercase-suffix branch. The `screamingIDRE` detector, Rule 4 (URL parameters), Rule 6 (schema property names), Rule 45 (partial-casing migrations), and Rule 46 (sibling-endpoint parity) are retained permanently as forward-looking guardrails. No rule enum was removed (Rule 32 remains the sole retired rule number from Phase 1.B). Test `TestGetCamelCaseIssues` expectation for `userid` updated from 1 issue → 0, with an in-test comment pointing at the new guardrails (`screamingIDRE`, `IsBadPathParam`) that still catch the regression shape.

**Charter:** After Phase 3 completes, several validator rules become dead weight (every resource is compliant; the rule has nothing to flag). Retire: `knownLowercaseSuffixViolations` legacy checks on now-compliant resources. Keep `screamingIDRE` and Rule 45 (partial-casing-migrations) permanently — they're forward-looking guardrails.

**Files changed:** `validation/casing.go` (allowlist emptied, unused regex removed, file-level + inline retirement comments added), `validation/casing_test.go` (table row updated).

**Rationale:** The audit walker (`validation/audit.go::walkValidatedConstructSpecs`) skips any api.yml marked `info.x-deprecated: true` and processes only the latest non-deprecated version per construct. After Phase 4.A administratively closed with every legacy directory carrying the deprecation marker, none of the historical lowercase-suffix identifiers (`userid`, `orgid`, `workspaceid`, `pageurl`, `avatarurl`, …) can reach the audit on any live resource — the only occurrences are inside the retained-but-bundler-gated legacy trees. The allowlist is therefore a no-op map at runtime; carrying it forward would just be latent maintenance surface. A brand-new `teamid`-shaped path/query parameter introduced in a canonical-casing version is still caught by Rule 4's `IsBadPathParam`, and the common SCREAMING-case regression (`orgID`) is caught by `screamingIDRE`; we deliberately do not retain a pattern-based lowercase-suffix detector because it would misfire on legitimate single-word identifiers like `id` and `url` standing alone.

**Testing (all green locally before PR):**
- `make validate-schemas` — no blocking violations.
- `make audit-schemas-full` — 530 advisory issues (unchanged from master baseline); no new findings introduced or masked.
- `make audit-schemas` (baseline-aware) — 255 issues unaffected; advisory baseline file (`build/validate-schemas.advisory-baseline.txt`, 1827 entries) did not need to shrink because the retired allowlist was not contributing any entries.
- `go test ./validation/...` — all pre-existing passing tests still pass; pre-existing `TestConsumerTS_IntegrationAgainstMesheryExtensions` failure on `master` is unchanged (it depends on a sibling repo fixture unrelated to this PR).

**Acceptance:** Validator has the minimum rule set that enforces the canonical contract going forward; the retirement stub pattern established for Rule 32 in Phase 1.B is mirrored here (public signatures preserved, empty map + in-file rationale), and 4.E's impact-report refresh can record the rule-surface reduction.

### Agent 4.E — Before/after impact report publication
**Status:** Complete (2026-04-23) — final refresh landed on top of Phase 4.D with the Phase 2 tail PRs accounted for. Consumer-audit TypeScript findings: meshery-cloud 17 → 0 (PR #5092), meshery 6 → 0 (PR #18904), meshery-extensions already 0; total 23 → 0 across the three downstream trees post-merge. `docs/identifier-naming-impact-report.md` §2 rows for drift-masking sites, locally-declared Go duplicates, cloud UI `api.ts` hand-rolled endpoints, same-file casing contradictions, SCREAMING `ID` on wire were refreshed; a new §2 row was added to track live consumer-audit TypeScript findings; §5 "what remains" was updated to zero scheduled Phase 2 sweep work; the revision history gained one final entry. The top-level `Status` field of this plan is now `Complete (2026-04-23)`.

**Charter:** Re-run the baseline agents (0.A–0.D) to produce "after" numbers. Publish the before/after report per §15 of this plan; commit to `meshery/schemas/docs/` as the governance artifact.

**Files:** `meshery/schemas/docs/identifier-naming-impact-report.md`.

**Acceptance:** Report published; metrics confirm §2 objectives met.

---

## 11. Orchestration DAG

```
                          ┌─────────────────────────────┐
                          │ Phase 0: baseline metrics   │
                          │ (0.A, 0.B, 0.C, 0.D)        │
                          └──────────────┬──────────────┘
                                         │
                                         ▼
                          ┌─────────────────────────────┐
                          │ Phase 1: schemas governance │
                          │ 1.A → 1.B → 1.C → 1.D → 1.E │
                          │     → 1.F → 1.G → 1.H → 1.I │
                          └──────────────┬──────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
      ┌──────────────────────────┐          ┌─────────────────────────────┐
      │ Phase 2: non-breaking    │          │ Phase 3: per-resource       │
      │ alignment (parallel)     │          │ migrations (parallel)       │
      │ 2.A 2.B 2.C 2.D 2.E 2.F  │          │ 3.Workspace, 3.Environment, │
      │ 2.G 2.H 2.I 2.J          │          │ 3.Organization, ... (22)    │
      └──────────┬───────────────┘          └──────────────┬──────────────┘
                 │                                         │
                 └──────────────────┬──────────────────────┘
                                    │
                                    ▼
                          ┌─────────────────────────────┐
                          │ Phase 4: finalization       │
                          │ 4.A → 4.B → 4.C → 4.D → 4.E │
                          └─────────────────────────────┘
```

**Dependency rules:**
- No Phase 2 agent runs before Phase 1.I publishes the new schemas version.
- No Phase 3 resource agent runs before Phase 1.I AND the resource's Phase 2 non-breaking precursors (if any) are merged. Phase 3 resources may run in parallel with each other.
- Phase 4 agents run only after all Phase 3 resources are merged AND one release cycle has elapsed. *Exception:* Phase 4.A's one-release-cycle window was **explicitly overridden by the maintainer on 2026-04-23** and Phase 4.A was closed administratively rather than by physical deletion (see §10 Agent 4.A, §20). Other Phase 4 agents (4.B consumer-audit blocking, 4.C AGENTS.md boilerplate, 4.D validator pruning, 4.E impact report) retained their original cadence.

**Orchestrator responsibilities:**
- Track every agent's PR URL, CI status, merge SHA in a shared ledger (TaskList + optionally a Google Sheet).
- Enforce the DAG — do not dispatch blocked agents.
- Handle escalations (§5.7) by pausing downstream agents until resolved.

---

## 12. Documentation mandate

Every agent's PR includes documentation updates whenever its change affects user-visible behavior. Three categories:

1. **Code-level documentation** — Go/TS docstrings on changed public symbols. Explain *why*, not *what*. Reference this plan's §1 for the canonical rule.
2. **In-repo developer docs** — `docs/` directory in each repo; Kanvas Developer Guide for Kanvas; `server/docs/` or API reference for Meshery server and Cloud.
3. **External user docs** — `layer5io/docs` (for the public Meshery docs site) updated whenever an API shape changes that external users consume.

**Per-PR doc checklist:**
- [ ] Public symbol docstrings updated
- [ ] Repo `docs/` touched where the feature is described
- [ ] External user docs linked or updated (PR to `layer5io/docs` if needed)
- [ ] `CHANGELOG.md` entry

**Explicit doc sites whose names and URLs will change under the canonical contract:**
- API reference sample bodies (`{ "user_id": "..." }` → `{ "userId": "..." }`).
- Query-string examples (`?orgID=` → `?orgId=`).
- Go import paths (version bumps).

---

## 13. Testing mandate

Each agent's PR must contain proportional tests. Non-negotiable minimums:

| Change type | Test requirement |
|---|---|
| New validator rule | Unit test with fixture covering pass + fail; regression test ensuring existing fixtures still pass |
| Handler casing fix | Handler-level test asserting the new param name works and the old does not (post-deprecation) |
| JSON tag change | Serialization round-trip test (`json.Marshal`+`json.Unmarshal`) asserting the new wire shape |
| RTK hook change | Hook integration test using mock server asserting the URL and body shape |
| Wrapper-key change | Mock-server test asserting outbound body wrapper; companion test on the receiving side asserting acceptance |
| Per-resource version bump | End-to-end integration covering happy path on new version; backward-compat smoke on old version (until sunset) |
| Doc-only PR | None required, but CI must be clean |

**Running tests locally is mandatory before PR open** (§5.2 step 4). The agent must not rely on CI alone — CI catches regressions, but local runs catch the agent's own bugs.

---

## 14. Per-repo `AGENTS.md` + `CLAUDE.md` mandate

Every repo's `AGENTS.md` (symlinked as `CLAUDE.md`) must contain the following boilerplate section, placed immediately after the repo's "Repository Overview" section:

```markdown
## Identifier Naming Conventions — MANDATORY

This repository adheres to the canonical camelCase-wire identifier-naming contract
defined authoritatively in `meshery/schemas/AGENTS.md § Casing rules at a
glance`. The contract is **not optional**; deviations block PRs via the
schemas consumer-audit CI gate.

### The rule in one sentence

*Wire is camelCase everywhere; DB is snake_case; Go fields follow Go
idiom; the ORM layer is the sole translation boundary.*

### Per-layer canonical forms

| Layer | Form |
|---|---|
| DB column / `db:` tag | `snake_case` — `user_id`, `org_id`, `created_at` |
| Go struct field | `PascalCase` with Go-idiomatic initialisms — `UserID`, `OrgID`, `CreatedAt` |
| JSON tag | `camelCase` — `json:"userId"`, `json:"orgId"`, `json:"createdAt"` |
| URL query/path param | `camelCase + Id` — `{orgId}`, `?userId=...` |
| TypeScript property | `camelCase` — `response.userId`, `queryArg.orgId` |
| OpenAPI schema property | `camelCase` |
| OpenAPI `operationId` | `lower camelCase verbNoun` — `getWorkspaces` |
| `components/schemas` type name | `PascalCase` — `WorkspacePayload` |

### Forbidden (MUST NOT)

- MUST NOT introduce a `json:` tag that matches the `db:` tag on a new
  DB-backed field. Wire is camel; DB is snake; they differ by design.
- MUST NOT declare an RTK query endpoint hand-rolled when
  `@meshery/schemas/{mesheryApi,cloudApi}` provides a canonical equivalent.
- MUST NOT locally redeclare a Go type that has an equivalent in
  `github.com/meshery/schemas/models/...`.
- MUST NOT use `ID` (ALL CAPS) in URL query parameters, JSON tags, or
  TypeScript properties. `Id` (camelCase) is canonical.
- MUST NOT mix casing conventions within a single resource. If wire
  format must change, introduce a new API version per
  `schemas/AGENTS.md § Dual-Schema Pattern`.

### Required on every PR

- MUST run the schemas validator locally before pushing:
  `cd ../schemas && make validate-schemas && make consumer-audit`.
- MUST include test updates for any casing or tag change.
- MUST include doc updates for any user-visible API change.
- MUST sign off commits (`git commit -s`).

### Authority

`meshery/schemas/AGENTS.md` is authoritative. On any conflict between
this repo's documentation and the schemas AGENTS.md, schemas wins. File
discrepancies as issues against `meshery/schemas`, not locally.

### Migration

The identifier-naming migration is tracked at
`meshery/schemas/docs/identifier-naming-migration.md`. All
contributors — human and AI agents — MUST read this plan before making
any schema-aware change.
```

Each repo's AGENTS.md also retains its repo-specific sections (build, tools, tests). The identifier-naming section is additive.

---

## 15. Before/after impact report (projected; actual numbers filled by Agent 4.E)

### 15.1 Metrics table

| Metric | Before | After (projected) | Delta |
|---|---|---|---|
| Distinct JSON-tag conventions in wire models | 3 (snake, camel, mixed) | 1 (camel) | −2 |
| Conditional rules in validator | 1 (DB-backed → snake) | 0 | −1 |
| Validator rules total | ~20 encoded + gaps | ~24 encoded (Rule 45, 46, 4-ext, consumer_ts) | +4 / 0 gaps |
| Drift-masking workarounds (`utils.QueryParam` dual-accept) | ≥6 sites | 0 (after Phase 2.C PR 2) | −6 |
| Locally-declared Go types duplicating schemas | 5+ (MesheryPattern ×2, MesheryPatternRequestBody, MesheryFilter, MesheryApplication) | 0 | −5 |
| Hand-rolled RTK endpoints duplicating generated clients | 30+ in Cloud UI, 3+ in Kanvas, 2+ in Meshery UI | 0 to <5 (documented legitimate customizations only) | −30+ |
| CI gates on schema conventions | 2 (blocking-validation, advisory-audit) | 4 (blocking-validation, advisory-audit, consumer-audit advisory then blocking, consumer-audit-ts) | +2 |
| Same-file casing contradictions | ≥8 (user.ts, design.ts, mesherySdk.ts, meshery_pattern.go, etc.) | 0 | −8 |
| ALL-CAPS `ID` on wire | ~70 sites (`orgID`, `json:"ID"`, etc.) | 0 | −70+ |
| API versions with snake-case-on-wire JSON tags | ~20 | 0 after Phase 3 sunset | −20 |

### 15.2 Narrative impact

**Cognitive overhead per contributor:** reduced from "remember three conventions, know DB-backing per field, recall intentional exceptions" to "camel on wire, snake at DB, PascalCase in Go". One rule, one DB boundary, one Go idiom. A new contributor reading `AGENTS.md § Identifier-naming migration` has everything they need in one screen.

**AI-audit false-positive rate:** the conditional "DB-backed → snake" rule is the single largest source of false positives in automated reviewers. Removing it collapses the rule surface and removes the ambiguity that produces the false-positive class.

**Validator rule count:** counter-intuitively rises slightly (+4 net), because the new rules are strict (partial-casing-migrations, sibling-parity, query-param casing, TS consumer). But total enforcement *scope* — the set of drifts that can reach production — shrinks dramatically because the consumer auditor becomes blocking in Phase 4.B.

**CI latency:** the new `consumer-audit` job adds ~60s to every PR in the schemas repo. Acceptable.

**Migration cost:** ~50 JSON-tag flips across 22 resources, concentrated in ID primitives (`user_id` → `userId`, `org_id` → `orgId`, `created_at` → `createdAt`). Per-resource versioning means no big-bang — each resource migrates independently, consumers opt in, old versions sunset after one release.

**End-state uniformity:** any identifier, in any repo, in any layer, has exactly one canonical form derivable from the layer name alone. No conditional, no per-field DB lookup, no partial-migration forgiveness. A reader seeing `json:"org_id"` on a new field knows it's wrong without consulting any other file.

---

## 16. Rollback & resilience

### 16.1 Per-phase rollback
- **Phase 1:** Revert schemas version bump (1.I); downstream repos pin to the pre-bump version until fixed. Validator rule changes (1.B–1.F) are additive under the advisory baseline — rolling back one rule is safe.
- **Phase 2:** Each PR is independent; revert individually. No cross-PR state.
- **Phase 3:** Per-resource rollback = delete the new API-version directory in schemas and revert each downstream consumer PR. Old version still serves traffic; no outage.
- **Phase 4:** Deprecation sunset (4.A) is reversible for one release cycle by restoring the deleted version directory from git history.

### 16.2 Failure modes per agent
Each agent has explicit escalation per §5.7. Additional per-class guidance:
- **Validator rule triggers unexpected volume:** baseline the violations in `validation/baseline/advisory.yaml`; file follow-up issues; do not revert the rule.
- **Consumer audit misidentifies a route:** capture the false positive in `consumer_*.go` test fixtures; fix the parser; no downstream rollback needed.
- **Schema regeneration produces broken Go:** revert the version bump; diagnose `oapi-codegen` incompatibility; address before re-attempt.
- **Downstream PR breaks production:** standard incident response — revert PR; coordinate a fix; verify; re-land.

### 16.3 Live-traffic safety
- Phase 3 migrations never remove an endpoint; they add a new versioned one. Old traffic continues.
- Phase 4.A sunsets only after consumer-migration telemetry confirms no remaining callers (e.g., via server-side logging of API version headers).
- Canary deploy every downstream PR that touches handler logic before full rollout.

---

## 17. Success criteria & sign-off gates

### Phase 1 sign-off
- [ ] `AGENTS.md` identifier-naming amendment merged; maintainer-approved.
- [ ] Rules 4-extended, 45, 46 encoded with tests.
- [ ] `consumer_ts.go` authoring complete with tests.
- [ ] Advisory baseline refreshed; `make validate-schemas` and `make audit-schemas-full` green.
- [ ] `consumer-audit` job wired as advisory in CI.
- [ ] `@meshery/schemas` version published to npm and Go module registry.

### Phase 2 sign-off
- [ ] All 10 Phase 2 PRs merged across three repos.
- [ ] Schemas `consumer-audit` shows a reduced but non-zero divergence count (the remaining divergences are Phase 3's domain).
- [ ] No open high-priority review-bot comments across the 10 PRs.

### Phase 3 sign-off (per resource)
- [ ] New version authored in schemas; validators green.
- [ ] Each downstream repo's consumer PR merged.
- [ ] Old version annotated deprecated; sunset date set.
- [ ] End-to-end integration test green on new version.
- [ ] `consumer-audit` clean on this resource.

### Phase 3 sign-off (overall)
- [ ] All 22 resources migrated.
- [ ] Aggregate `consumer-audit` shows 0 wire-casing divergences.
- [ ] One release cycle elapsed since the last resource migration.

### Phase 4 sign-off
- [ ] All deprecated versions removed from schemas.
- [ ] `consumer-audit` promoted to blocking; a test drift reliably fails CI.
- [ ] All four repos' AGENTS.md and CLAUDE.md contain the boilerplate from §14.
- [ ] Unused validator rules pruned.
- [ ] Before/after impact report published.

### Overall success (all phases)
- [ ] Every identifier in every repo, in every layer, has exactly one canonical form derivable from the §1 contract.
- [ ] No same-file casing contradictions remain.
- [ ] No locally-declared types duplicating schemas remain (or each has a `// LOCAL:` justification and an open schemas-export issue).
- [ ] Reviewers (human + AI) have one rule table to consult.
- [ ] Drift re-entry is prevented by the now-blocking consumer audit.

---

## 18. Appendix A — Resource migration template (Phase 3.{Resource})

Reusable spec; substitute `{resource}`, `{new-version}`, `{old-version}`. Dispatch to the Agent tool with this prompt:

```
You are Phase 3.{Resource} agent.

CHARTER
Migrate the {resource} resource from {old-version} to {new-version}
under the canonical contract defined in
meshery/schemas/docs/identifier-naming-migration.md §1.

STEPS
1. In /Users/l/code/schemas, create schemas/constructs/{new-version}/{resource}/
   by copying from schemas/constructs/{old-version}/{resource}/.
2. In the new api.yml and {resource}.yaml:
   - Convert every JSON tag on every component schema property to camelCase.
   - Every DB-backed field keeps its `db:` tag in x-oapi-codegen-extra-tags;
     the `json:` tag is camelCase regardless.
   - Every query/path parameter: camelCase with `Id` suffix.
   - Every operationId: lower camelCase verbNoun.
   - Add any missing parameter references identified by the sibling-parity
     audit.
   - Mark the old version's operations `deprecated: true` and set
     `x-sunset-date` to (today + one release cycle).
3. Regenerate: cd /Users/l/code/schemas && make generate-golang &&
   make generate-rtk && make build-ts.
4. Run validators: make validate-schemas && make audit-schemas-full.
   Both green (new version clean; old version's deprecation is baselined).
5. Bump schemas package version (semver minor) and publish.
6. Open a PR on meshery/schemas. Follow the Common Agent Protocol (§5)
   for review/iterate/merge.
7. For each consumer repo in
   [meshery/meshery, layer5io/meshery-cloud, layer5labs/meshery-extensions]:
   a. Create a branch fix/{resource}-{new-version}-consume.
   b. Update go.mod / package.json to the new schemas version.
   c. Repoint imports from {old-version} to {new-version} for the
      {resource} type and its related types.
   d. Update handlers / hooks / UI / tests accordingly.
   e. Update docs / CHANGELOG.
   f. Follow the Common Agent Protocol.
8. Verify end-to-end integration in a dev environment.
9. Mark the task complete with the merge SHA of each PR and the
   deprecation sunset date.

ACCEPTANCE
- New-version schemas validators green.
- All 3 consumer PRs merged.
- Old version deprecated and still functional.
- consumer-audit shows 0 divergences on {resource}.
```

---

## 19. Appendix B — Repository map & key paths

| Repo | Path | Notes |
|---|---|---|
| `meshery/schemas` | `/Users/l/code/schemas` | Source of truth |
| — AGENTS.md | `AGENTS.md` (symlink `CLAUDE.md`) | Authoritative conventions |
| — Validation framework | `validation/` | Rule files, casing helpers, consumer auditors |
| — Makefile targets | `Makefile` lines 85–130 | `validate-schemas`, `audit-schemas-*`, `consumer-audit*` |
| — CI workflow | `.github/workflows/schema-audit.yml` | Blocking + advisory jobs |
| — OpenAPI sources | `schemas/constructs/v*/` | One subdir per resource per version |
| — Generated Go models | `models/v*/` | From `oapi-codegen` |
| — Generated TS clients | `dist/` | From RTK codegen |
| `meshery/meshery` | `/Users/l/code/meshery` | Server + UI + `mesheryctl` |
| — Server handlers | `server/handlers/` | Query-param extraction |
| — Server models | `server/models/` | Local types (candidates for schemas displacement) |
| — Remote provider | `server/models/remote_provider.go` | Outbound URL construction |
| — UI RTK query | `ui/rtk-query/` | Hook aliases |
| — UI components | `ui/components/` | Hook call sites |
| — CLAUDE.md | `CLAUDE.md` | Project instructions |
| `layer5io/meshery-cloud` | `/Users/l/code/meshery-cloud` | Remote provider |
| — Server handlers | `server/handlers/` | Plain-text 400 error paths (see PR #18858) |
| — Server models | `server/models/` | Mapping models, locally-declared types |
| — Constants | `server/utils/constants.go:138` | `QueryParamOrganizationID` |
| — Middleware | `server/handlers/middlewares_authz_*.go` | `utils.QueryParam` dual-accept |
| — UI RTK | `ui/api/api.ts` | 30+ hand-rolled endpoints |
| — CLAUDE.md | `CLAUDE.md` (verify present) | |
| `layer5labs/meshery-extensions` | `/Users/l/code/meshery-extensions` | Kanvas |
| — Kanvas source | `meshmap/src/` | |
| — Kanvas RTK query | `meshmap/src/rtk-query/` | `catalog.ts`, `designs.ts`, `user.ts`, `views.ts` |
| — SDK (cross-boundary) | `meshmap/src/globals/mesherySdk.ts` | Event-type ↔ dispatcher boundary |
| — GraphQL plugin | `meshmap/graphql/` | Go side; `schema.graphql` |
| — CLAUDE.md | `CLAUDE.md` | Project instructions |
| — Plan (this file) | `docs/identifier-naming-migration.md` | Canonical execution reference |

---

## 20. Revision history

| Revision | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-04-22 | Lee Calcote (via orchestrator) | Initial authoring. camelCase-on-wire decision recorded. Phases 0–4 defined. Agent templates inlined. |
| 1.1 | 2026-04-23 | Lee Calcote (via Phase 4.A administrative-close agent) | Phase 4.A administratively closed. One-release-cycle safety window overridden by maintainer decision; physical deletion of deprecated `schemas/constructs/v1beta1/` and `schemas/constructs/v1beta2/` directories is **not slated**. Deprecated directories remain on `master` indefinitely behind `x-deprecated: true` / `x-superseded-by:` markers so external consumers that pin legacy versions are not stranded. Status banner (§0), Phase Structure table (§4), Agent 4.A charter (§10), and DAG dependency rules (§11) updated to reflect the non-deletion policy. See [`identifier-naming-impact-report.md`](identifier-naming-impact-report.md) §8 for the canonical index of retained legacy directories. Any future physical deletion is a separate maintainer decision, not scheduled. |
| 1.2 | 2026-04-28 | Lee Calcote (via Phase 4-7 documentation-sweep agent) | Added [§21 Status as of 2026-04-28](#21-status-as-of-2026-04-28) recording the canonical-naming overhaul as **complete across the in-scope cluster** (`meshery/schemas`, `meshery/meshery`, `layer5io/meshery-cloud`, `meshery/meshkit`, `layer5io/sistent`) with tagged releases (`schemas v1.2.6`, `meshery v1.0.14`, `meshkit v1.0.7`, `sistent v0.20.1`) and **`layer5labs/meshery-extensions` formally deferred** pending lift of the layer5labs billing block. Status header (§0) updated to point at §21 for the post-completion landed-PR and tagged-release inventory. No changes to the contract, the agent charters, or §10 Agent 4.A's non-deletion policy. |

---

## 21. Status as of 2026-04-28

The canonical-naming overhaul has **landed in production** across every in-scope repo except `layer5labs/meshery-extensions`. This section is the authoritative inventory of what shipped and what remains deferred. It supplements §0 (the status banner) and §20 (revision history); it does **not** modify any agent charter, validator rule, or non-deletion policy.

> **2026-05-05 update (§21.A):** layer5labs billing block lifted. Deferred slice closed via `layer5labs/meshery-extensions#4228`. See [§21.A](#21a-meshery-extensions-deferred-slice-closed-2026-05-05) below for the full inventory of what landed, the cluster-wide audit follow-ups (`layer5io/meshery-cloud#5206`, `#5207`, `#5209`), and the two remaining cross-repo follow-ups (sistent `useRoomActivity` parameter rename; schemas `getSubscriptions` `planId` exposure).

### Landed releases

| Repo | Release tag | Notes |
|---|---|---|
| `meshery/schemas` | `v1.2.6` | Validator rules, advisory baseline, and consumer-audit gates active per §16 (Validator rules) and §18 (CI). All deprecated v1beta1 directories retained per §10 Agent 4.A. |
| `meshery/meshery` | `v1.0.14` | Server, UI, and `mesheryctl` aligned to camelCase wire; dual-accept shims retained per `identifier-naming-contributor-guide.md § Dual-accept policy`. |
| `meshery/meshkit` | `v1.0.7` | Canonical wire applied to shared event/error/logging surfaces; `docs/event-streaming.md` updated alongside the canonical flip. |
| `layer5io/meshery-cloud` | (master HEAD; rolling) | Phase-4 tail wire flips for Credential / Organization / Team / MesheryFilter siblings landed; consumer-audit at zero TS findings. No tagged release because `meshery-cloud` ships from `master` continuously. |
| `layer5io/sistent` | `v0.20.1` | Component prop names aligned to canonical camelCase; identifier-naming impact was small (UI surface, not wire). |

### Deferred

| Repo | Status | Reason | Re-engagement trigger |
|---|---|---|---|
| `layer5labs/meshery-extensions` | **Closed 2026-05-05** (was deferred) | layer5labs billing block — the org's GitHub Actions / repo write access is administratively suspended; PR landings are blocked until billing is restored. | Billing reinstated → re-run §10 Agent 3 charter for the deferred resources (Kanvas RTK catalog/designs case-flip removal; `SaveDesign` wrapper alignment `pattern_data` → `patternData`; `mesherySdk` event-type casing; `collab/config` user-ID duality). **Re-engaged via `layer5labs/meshery-extensions#4228` on 2026-05-05.** |

### What this means in practice

- **For new code in any in-scope repo:** the canonical contract at §1 applies in full. Validator Rule 6 / 45 / 46 in `meshery/schemas` block re-introduction of snake_case wire on canonical-version constructs.
- **For new code in `meshery-extensions`:** until the billing block lifts, the repo continues to ship pre-canonical wire forms for any field the deferred Phase-3 work would have flipped. Coordinated changes that cross `meshery-extensions` and another in-scope repo must align on the **canonical** form on the meshery-side and accept the temporary case-flip on the extensions-side; do **not** re-introduce snake_case in the in-scope repo to "match" extensions.
- **For external consumers pinning a v1beta1 / v1beta2 version:** §10 Agent 4.A guarantees those directories remain on `master` indefinitely under `info.x-deprecated: true` + `info.x-superseded-by:` markers. No physical deletion is scheduled.

### Documentation refreshed in this status pass

- `meshery/schemas` — this section (§21) plus header status update (§0).
- `meshery/meshery` — `docs/content/en/reference/graphql-apis.md` Rakefile reference replaced with the schemas-bundle source-of-truth pointer; `docs/content/en/project/contributing/build-and-release.md` Jekyll versioning steps rewritten for Hugo; `docs/content/en/reference/extensibility/providers/index.md` capability example wire form updated to match `server/models/providers.go` canonical JSON tags.
- `meshery/meshkit` — verified `docs/event-streaming.md` reflects canonical wire (no further changes; PR #999 already aligned this in Phase 6a).
- `layer5io/meshery-cloud` — `docs/USER_MODEL_COMPARISON.md` and `docs/USER_SCHEMA_INTEGRATION.md` wire-format snippets updated to camelCase to match `server/models/users.go` post-canonical state.
- `layer5io/docs` (public docs site) — verified no wire-format references stale (only a v0.8.228 release-note historical reference to `orgID`, which is an immutable historical artifact).
- Per-repo `AGENTS.md` / `CLAUDE.md` — short status note added pointing to this section.

---

## 21.A. meshery-extensions deferred slice closed (2026-05-05)

The deferred slice on `layer5labs/meshery-extensions` (see §21 row above) re-engaged on 2026-05-05 once the layer5labs billing block lifted. This subsection inventories what landed, the cluster-wide audit follow-ups it surfaced, and the two remaining cross-repo follow-ups still open.

### What landed

| PR | Repo | Coverage |
|---|---|---|
| [`#4228`](https://github.com/layer5labs/meshery-extensions/pull/4228) | `layer5labs/meshery-extensions` | All four §21 deferred items in a single branch: Kanvas RTK catalog/designs case-flip removal; `SaveDesign` wrapper alignment (already canonical at audit time); `mesherySdk` event-type casing; `collab/config` user-ID duality. **25 files, two commits**, surfaced **12 silently-broken paths** in production extensions UX (HTTP 400 from validation events, sort dropdown was a no-op, `viewIsOwnedByUser` always false, visibility update silently dropped catalog metadata, `anonymousUserID` URL param always empty, `providerUrl` undefined at 4 call sites, catalog cards always defaulted, K8s context lookups silently empty, etc.). |
| [`#5206`](https://github.com/layer5io/meshery-cloud/pull/5206) | `layer5io/meshery-cloud` | Parallel cloud-side audit that re-engaged the slice. ~130 wire-format reads across 60 UI files plus the `paymentprocessor.Invoice` Go struct + `VerifyRepositoryResponse.FileURL` flips. Test fixtures, RTK args, and one-line drift fixes (the catalog-widget bug that triggered the audit). |
| [`#5207`](https://github.com/layer5io/meshery-cloud/pull/5207) | `layer5io/meshery-cloud` | Cloud follow-up surfaced by Copilot+Gemini review on the audit: orphan `keychainId` column on the security/keys table; `forecastedAmount` typo + colViews drift on the subscriptions table; NaN-guard on the forecasted-bill arithmetic. |
| [`#5209`](https://github.com/layer5io/meshery-cloud/pull/5209) | `layer5io/meshery-cloud` | Cloud follow-up: `getSubscriptions` server handler dual-accepts canonical `planId` (was `plan_id` only); UI drops three silently-dropped query args (`organization_id`, `search`, `planId` waiting on the schemas-side OpenAPI exposure tracked below). |

### Cluster-wide canonical-casing follow-ups still open

These are non-blocking but tracked here so they don't slip again:

| Item | Owning repo | Status |
|---|---|---|
| `getSubscriptions` OpenAPI exposes `planId` (array, query) so the generated RTK client forwards it. | `meshery/schemas` (this PR) | This PR. Once shipped, `meshery-cloud` bumps `@meshery/schemas` and the UI `planId` arg in #5209 starts filtering server-side. |
| `useRoomActivity` hook parameter `provider_url` → `providerUrl`. | `layer5io/sistent` | Open. The cluster-wide canonical contract (row 7) requires this. The current snake parameter forced `meshery-extensions` to keep an outer `provider_url:` key in the call site at `ExpandedDesignerDrawer/index.tsx`, even after the inner read was canonicalized in #4228. When sistent flips, that outer key flips with it. |
| v1beta1 TypeScript namespace cleanup so `meshery-extensions` `colabActor.ts` can annotate `AwarenessModel.user` against a canonical-cased `User` instead of a stale stub. | `meshery/schemas` | Tracked separately at [`#866`](https://github.com/meshery/schemas/issues/866). Not blocking #4228 — the runtime accesses already work because the type is loose (the package emits `firstName`/`lastName` on `User` per `v1beta2`, but the namespace export only surfaces `v1beta1`). |

### Out-of-scope debt surfaced during the audit

Not part of identifier-naming, but called out so future migrations have a starting inventory:

- **JSONB internal map keys** (`metadata->>'kubernetes_server_id'`, user-prefs `notification_preferences`, etc.). Cluster has dual-read fallbacks in place; flipping to canonical-only requires a coordinated DB migration and is **not** within the identifier-naming charter.
- **Academy resources are uniformly snake-legacy in `@meshery/schemas`**: ~44 snake reads under `meshery-cloud/ui/components/academy/` plus extensions. Closing this requires a v1beta3 academy schema cut → cloud server flip → UI flip in lockstep — separate workstream.
- **`MemberFormOne.Firstname/Lastname` webhook payload** (`meshery-cloud/server/models/webhooks_payload.go`): forwarded verbatim to an external help-and-support receiver via `WEBHOOK_HELP_AND_SUPPORT`. Flipping requires external receiver coordination first.
- **Subscriptions table client-side search**: cloud DAO has no search predicate; the table's search input was vestigial UI removed in #5209. If the product wants search on subscriptions, the DAO needs a `LIKE` predicate (probably across plan name + status + start-date string) and the schema needs a `search` query param.

### Tagged releases

| Repo | Tag | Date | Contents |
|---|---|---|---|
| `layer5labs/meshery-extensions` | `v1.0.18-2` (or whichever bump the maintainer chooses) | TBD after #4228 merges | Bundles #4228 fixes for the extensions-packages downstream pipeline. |

End of §21.A.

---

End of plan.

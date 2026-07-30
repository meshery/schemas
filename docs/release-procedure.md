# Release Procedure

> Detailed release reference extracted from the top-level agent
> instructions (`AGENTS.md` / `CLAUDE.md`). For step-by-step usage of the
> `meshery-schemas-release` skill (verification commands, troubleshooting),
> see [`release-procedure-skill.md`](release-procedure-skill.md).

**Use the `meshery-schemas-release` skill** to cut releases. Invoke with `/meshery-schemas-release` - it automates the entire procedure and includes safeguards.

**CRITICAL: Do not manually create releases.** Releases are managed by automated workflows.

## Proper Release Flow

1. **Push commits to master** - your changes trigger the automation chain on `master`
2. **Wait for `generate-artifacts-from-schemas.yml` to complete** - it runs `make build`, generates the repo's Go and TypeScript artifacts, and self-commits them back to `master`
3. **Wait for `release-drafter.yml` to complete after that artifact self-commit** - release drafter must refresh the draft release from the final `master` head
   - Reads commit messages for categorization (features, bugs, chores, docs, security)
   - Auto-increments version using `$NEXT_PATCH_VERSION` (bugfix version)
   - Generates release notes from commit categories
4. **Review draft release** - visit GitHub Releases tab to review generated notes
5. **Publish the draft** - manually click "Publish release" on the draft
6. **Automated workflows trigger** on publish:
   - `publish-schemas.yml` updates schema versions in `base_cloud.yml` and `base_meshery.yml`
   - Performs the npm publish through `publish-npm-package.yml`
   - Notifies downstream repositories via `notify-dependents.yml`, which opens `go get`-based dependency-bump PRs against `meshery/meshery` (including the nested `server/policies/wasm` module) and `meshery/meshkit`. A `wait-for-module` gate polls `proxy.golang.org` and `sum.golang.org` until the freshly-tagged version is indexed before any `go get` runs, so the bump jobs no longer fail on their first attempt with a transient `sum.golang.org` 500 while the checksum database catches up. If a bump job ever does fail, re-run it with `gh run rerun --failed <run-id>` once indexing settles.
   - Publishes OpenAPI documentation

## What NOT to Do

- ❌ Do NOT use `gh release create` manually
- ❌ Do NOT hand-edit release notes (let release-drafter template handle it)
- ❌ Do NOT bump minor/major versions manually (use `$NEXT_PATCH_VERSION` only)
- ❌ Do NOT publish releases before `generate-artifacts-from-schemas.yml` finishes self-committing and `release-drafter.yml` finishes its update
- ❌ Do NOT run `npm publish` manually; `publish-schemas.yml` handles it
- ❌ Do NOT create releases before downstream PR feedback is resolved

## Versioning

Meshery Schemas uses semantic versioning (MAJOR.MINOR.PATCH):

- **PATCH** (bugfix): Schema fixes, property renames, db tag updates that require downstream code changes
- **MINOR**: New constructs, new API endpoints
- **MAJOR**: Breaking API changes across multiple constructs

Release-drafter increments PATCH by default (e.g., v1.3.9 -> v1.3.10).

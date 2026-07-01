# Cutting Releases with meshery-schemas-release Skill

This document explains how to use the `meshery-schemas-release` skill to properly cut releases for meshery/schemas.

## Quick Start

Once your schema changes are committed to `master`:

```bash
/meshery-schemas-release
```

The skill will guide you through the proper release procedure.

## Why Use This Skill?

Releasing meshery/schemas requires strict adherence to procedure:

1. **Wait for `generate-artifacts-from-schemas.yml` to finish** — This workflow generates the repo's Go and TypeScript artifacts and normally self-commits them back to `master`. Releases without that completed artifact pass are incomplete.

2. **Wait for `release-drafter.yml` after the artifact self-commit** — Release drafter must refresh the draft release from the final `master` head, not from the pre-artifact commit.

3. **Let `publish-schemas.yml` handle npm publication** — Publishing the GitHub release triggers the repo's publication workflow, which performs the npm publish through automation.

4. **Use release automation end-to-end** — Manual release creation or manual npm publishing bypasses required automation and can publish stale bundles.

## Procedure Overview

### 1. Commit Schema Changes to Master

Make all schema changes, test locally, and commit to master:

```bash
git add schemas/constructs/...
git commit -s -m "feat: description of change"
git push origin master
```

### 2. Wait for Artifact Generation and Self-Commit (2-5 minutes)

The `generate-artifacts-from-schemas.yml` workflow automatically runs on push. It:
- Runs `make build`
- Generates the repo's Go and TypeScript artifacts
- Self-commits generated code to `master` with `Generate build artifacts from schemas`

**Verify completion:**
```bash
gh run list --workflow generate-artifacts-from-schemas.yml --limit 1
# Expected: status = completed, result = success

gh api repos/meshery/schemas/commits/master --jq '.commit.message'
# Expected: Generate build artifacts from schemas
```

Do **not** publish a release before this workflow has completed its generation and self-commit step.

### 3. Wait for Release-Drafter to Refresh the Draft (2-5 minutes)

After the artifact self-commit lands on `master`, `release-drafter.yml` must run again and update the draft release from that latest repo state. It:
- Auto-increments patch version (e.g., v1.3.9 → v1.3.10)
- Categorizes commits (features, bugs, chores, docs, security)
- Generates release notes from commit messages

**Verify the release-drafter update completed:**
```bash
gh run list --workflow release-drafter.yml --limit 1
# Expected: status = completed, result = success
```

**Then verify a draft release exists:**
```bash
gh release list --limit 1
# Expected: status = Draft, version = vX.X.(X+1)
```

### 4. Review Draft (Optional)

Review the auto-generated release notes:

```bash
gh release view <TAG> --json name,body
```

The release-drafter template should have properly categorized your commits. Do NOT hand-edit the notes or publish a draft that predates the artifact self-commit.

### 5. Publish the Draft Release

Publish the draft release after both prior workflows have completed:

```bash
gh release edit <TAG> --draft=false
```

The release is now published and visible to consumers.

### 6. Verify Downstream Workflows

Check that publication triggered the downstream cascade:

```bash
gh run list --workflow publish-schemas.yml --limit 1
# Expected: status = completed

gh run list --workflow notify-dependents.yml --limit 1
# Expected: status = completed
```

`publish-schemas.yml` updates the base schema version files, invokes `publish-npm-package.yml` for the npm publish, then fans out to the downstream notification and docs workflows.

## What NOT to Do

❌ **Never use `gh release create` manually**
- Bypasses release-drafter automation
- Causes versioning errors
- Prevents notification workflows from running

❌ **Never hand-edit release notes**
- Let release-drafter template generate them from commit messages
- Edited notes can cause confusion about what changed

❌ **Never publish before artifact generation completes and self-commits**
- Release will be incomplete or may lag generated Go/TypeScript artifacts
- Release drafter may still be working from the wrong repo head
- Verify with: `gh run list --workflow generate-artifacts-from-schemas.yml`

❌ **Never publish before release-drafter finishes its post-artifact update**
- The draft release can lag the final `master` state
- Verify with: `gh run list --workflow release-drafter.yml`

❌ **Never run `npm publish` manually**
- `publish-schemas.yml` triggers the npm publish automatically
- Manual npm publishing bypasses the repository release flow

## Troubleshooting

### Artifact generation workflow didn't run

The workflow skips commits from `ci@meshery.io` (automated commits) to prevent loops. If your commits are from your own account, the workflow should run. Check:

```bash
gh run list --workflow generate-artifacts-from-schemas.yml --limit 3
```

If missing, manually trigger:

```bash
gh workflow run generate-artifacts-from-schemas.yml
```

### Release-drafter has not updated after the artifact self-commit

If the artifact self-commit is on `master` but the draft still reflects the older head:

```bash
gh run list --workflow release-drafter.yml --limit 3
```

Wait for the newest run to finish. If needed, re-run `release-drafter.yml`. Do not publish until it completes successfully for the latest `master` head.

### Release-drafter created wrong version

The version should increment PATCH only (e.g., v1.3.9 → v1.3.10). If it's wrong:

1. Delete the draft: `gh release delete <TAG> --yes`
2. Check `.github/release-drafter.yml` configuration
3. Verify the last published tag: `git tag --list | sort -V | tail -1` (or use `git tag --sort=-v:refname | head -n 1`)
4. Report the issue; do not manually adjust versions

### Artifact generation or publish workflow failed

Check the detailed logs:

```bash
gh run view <RUN_ID> --log
```

Common issues:
- Dependency installation failures (Node/Go)
- oapi-codegen not found (check PATH in workflow)
- Git auth issues (check MESHERY_CI token)

Contact the team if the error is not obvious.

## References

- **CLAUDE.md** - "Release Procedure" section with detailed guidelines
- **AGENTS.md** - "Release Procedure" section with detailed guidelines
- **Workflows**:
  - `.github/workflows/generate-artifacts-from-schemas.yml` - Generates artifacts
  - `.github/workflows/release-drafter.yml` - Creates draft release
  - `.github/workflows/publish-schemas.yml` - Updates versions and triggers npm publish
  - `.github/workflows/publish-npm-package.yml` - Publishes to npm
  - `.github/workflows/notify-dependents.yml` - Notifies downstream repos
  - `.github/skills/meshery-schemas-release/SKILL.md` - Canonical skill instructions

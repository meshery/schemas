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

1. **Wait for "Generate artifacts from schemas" workflow** — This generates and commits Go structs, TypeScript types, and RTK Query clients. Releases without these artifacts are incomplete.

2. **Use release-drafter automation** — The `release-drafter` workflow auto-generates versioning and release notes. Manual releases bypass this and cause errors.

3. **Publish immediately** — Once artifacts are generated, publish the release as Latest. Do not leave it as a draft.

4. **Notify downstream repos** — The `notify-dependents` workflow automatically creates issues in meshery/meshery, meshery/meshkit, and layer5io/meshery-cloud.

## Procedure Overview

### 1. Commit Schema Changes to Master

Make all schema changes, test locally, and commit to master:

```bash
git add schemas/constructs/...
git commit -s -m "feat: description of change"
git push origin master
```

### 2. Wait for Artifact Generation (2-5 minutes)

The `generate-artifacts-from-schemas` workflow automatically runs on push. It:
- Runs `make build`
- Commits generated code: "Generate build artifacts from schemas"

**Verify completion:**
```bash
gh run list --workflow generate-artifacts-from-schemas.yml --limit 1
# Expected: status = completed, result = success
```

### 3. Release-Drafter Auto-Creates Draft (2-5 minutes)

The `release-drafter` workflow creates a draft release:
- Auto-increments patch version (e.g., v1.3.9 → v1.3.10)
- Categorizes commits (features, bugs, chores, docs, security)
- Generates release notes from commit messages

**Verify draft was created:**
```bash
gh release list --limit 1
# Expected: status = Draft, version = vX.X.(X+1)
```

### 4. Review Draft (Optional)

Review the auto-generated release notes:

```bash
gh release view <TAG> --json name,body
```

The release-drafter template should have properly categorized your commits. Do NOT hand-edit the notes.

### 5. Publish as Latest

Publish the draft release immediately:

```bash
gh release edit <TAG> --draft=false
```

The release is now Latest and visible to all consumers.

### 6. Verify Downstream Workflows

Check that publication triggered the downstream cascade:

```bash
gh run list --workflow publish-schemas.yml --limit 1
# Expected: status = completed

gh run list --workflow notify-dependents.yml --limit 1
# Expected: status = completed
```

The `notify-dependents` workflow creates issues in downstream repos with change notifications.

## What NOT to Do

❌ **Never use `gh release create` manually**
- Bypasses release-drafter automation
- Causes versioning errors
- Prevents notification workflows from running

❌ **Never hand-edit release notes**
- Let release-drafter template generate them from commit messages
- Edited notes can cause confusion about what changed

❌ **Never publish before artifact generation completes**
- Release will be incomplete (missing Go/TypeScript artifacts)
- Downstream repos will receive broken imports
- Verify with: `gh run list --workflow generate-artifacts-from-schemas.yml`

❌ **Never leave release as draft**
- Downstream workflows don't trigger on draft releases
- Notification issues won't be created
- Publish immediately: `gh release edit <TAG> --draft=false`

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
  - `.github/workflows/publish-schemas.yml` - Updates versions, publishes
  - `.github/workflows/publish-npm-package.yml` - Publishes to npm
  - `.github/workflows/notify-dependents.yml` - Notifies downstream repos

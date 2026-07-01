---
name: meshery-schemas-release
description: 'Publish a meshery/schemas release only after generated artifacts have self-committed to master and release-drafter has refreshed the draft release; then publish the draft and let publish-schemas handle npm publishing.'
---

# Meshery Schemas Release

Use this skill when the task is to cut, publish, or verify a release for `meshery/schemas`.

## Golden Rule

Do **not** publish a repository release until both automation stages have finished on `master`:

1. `generate-artifacts-from-schemas.yml` completed successfully and finished self-committing the generated Go and TypeScript bundles back to `master`.
2. `release-drafter.yml` completed after that `master` update and refreshed the draft release.

Publishing before both stages finish can ship a release whose generated artifacts or drafted notes lag the repository head.

## Required Release Order

1. Push or merge the intended changes to `master`.
2. Wait for `generate-artifacts-from-schemas.yml` to finish.
   - It runs `make build`.
   - It generates the Go and TypeScript artifacts that belong in the repo.
   - It normally self-commits them to `master` with the message `Generate build artifacts from schemas`.
3. Wait for `release-drafter.yml` to run again against that updated `master` head and refresh the draft release.
4. Review the existing draft release if needed.
5. Publish the existing draft release.
6. After publish, let `publish-schemas.yml` run:
   - it updates `schemas/base_cloud.yml` and `schemas/base_meshery.yml`
   - it calls `publish-npm-package.yml`, which performs the npm publish
   - it notifies downstream repositories and publishes OpenAPI docs

## Required Checks

Use `gh` CLI. Do **not** use `gh release create`.

```bash
gh run list --workflow generate-artifacts-from-schemas.yml --branch master --limit 1
gh api repos/meshery/schemas/commits/master --jq '.commit.message'
gh run list --workflow release-drafter.yml --branch master --limit 1
gh release list --limit 1
```

Only publish when all of the following are true:

- the latest `generate-artifacts-from-schemas.yml` run is `completed` with `success`
- the artifact-generation self-commit has landed on `master`, or the workflow shows there were no generated changes to commit
- the latest `release-drafter.yml` run is `completed` with `success` for the current `master` head
- the target release already exists as a draft

Publish the draft release with:

```bash
gh release edit <TAG> --draft=false
```

## Never Do This

- Never use `gh release create`
- Never run `npm publish` manually; `publish-schemas.yml` does that through `publish-npm-package.yml`
- Never publish while `generate-artifacts-from-schemas.yml` is still running or failing
- Never publish while `release-drafter.yml` is still running or failing
- Never publish a draft that has not been refreshed after the generated-artifact self-commit

## Failure Handling

- If `generate-artifacts-from-schemas.yml` fails, inspect the run logs and stop. No release should be published.
- If artifact generation succeeds but the expected self-commit is missing, confirm from the workflow output whether it had nothing to commit before proceeding.
- If `release-drafter.yml` has not refreshed the draft after the latest `master` update, wait or re-run that workflow; do not publish until it finishes.
- If no draft release exists after `release-drafter.yml` succeeds, investigate the workflow/configuration instead of creating a release manually.

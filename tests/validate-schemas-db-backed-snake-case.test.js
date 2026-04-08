const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "..");
const draftConstructsDir = path.join(repoRoot, "schemas", "constructs", "v1beta2-draft");

function writeTempConstruct(t, name, apiSource) {
  const constructDir = path.join(draftConstructsDir, name);
  fs.mkdirSync(constructDir, { recursive: true });
  fs.writeFileSync(path.join(constructDir, "api.yml"), apiSource);
  t.after(() => fs.rmSync(constructDir, { recursive: true, force: true }));
  return path.relative(repoRoot, path.join(constructDir, "api.yml")).split(path.sep).join("/");
}

function runValidatorWarn() {
  return spawnSync("node", ["build/validate-schemas.js", "--warn", "--no-baseline", "--style-debt"], {
    cwd: repoRoot,
    encoding: "utf8",
  });
}

test("allows explicitly annotated snake_case contract fields", (t) => {
  const relativeApiPath = writeTempConstruct(
    t,
    "zz-db-backed-contract-pass",
    `openapi: 3.0.0
info:
  title: Temp snake_case pass API
  version: v1beta2-draft
paths: {}
components:
  schemas:
    ExamplePage:
      type: object
      properties:
        created_at:
          $ref: ../../v1alpha1/core/api.yml#/components/schemas/created_at
        page_size:
          x-db-backed: true
          type: integer
          description: Number of items per page.
          minimum: 1
`,
  );

  const result = runValidatorWarn();

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.equal(result.stdout.includes(relativeApiPath), false);
});

test("reports unannotated snake_case properties", (t) => {
  const relativeApiPath = writeTempConstruct(
    t,
    "zz-db-backed-contract-fail",
    `openapi: 3.0.0
info:
  title: Temp snake_case fail API
  version: v1beta2-draft
paths: {}
components:
  schemas:
    Example:
      type: object
      properties:
        raw_snake:
          type: string
          description: Unannotated snake_case field.
          maxLength: 32
`,
  );

  const result = runValidatorWarn();

  assert.equal(result.status, 0);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, new RegExp(relativeApiPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(result.stderr, /property "raw_snake" uses snake_case/);
});

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { ensureRequiredImports } = require("../build/generate-golang");
const { generateGoFile } = require("../build/lib/permissions");

test("ensureRequiredImports injects google uuid when generated code references uuid.UUID", (t) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "uuid-import-"));
  const goFile = path.join(tempDir, "example.go");
  t.after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

  fs.writeFileSync(
    goFile,
    [
      "package example",
      "",
      "import (",
      '\t"encoding/json"',
      ")",
      "",
      "type Example struct {",
      "\tID uuid.UUID",
      "}",
      "",
    ].join("\n"),
    "utf-8",
  );

  ensureRequiredImports(goFile);

  const generated = fs.readFileSync(goFile, "utf-8");
  assert.match(generated, /"github\.com\/google\/uuid"/);
});

test("generateGoFile emits google uuid imports and MustParse constants", () => {
  const content = generateGoFile(
    [{ name: "TestPermission", uuid: "123e4567-e89b-12d3-a456-426614174000", feature: "" }],
    "index-id",
  );

  assert.match(content, /import "github\.com\/google\/uuid"/);
  assert.match(content, /uuid\.MustParse\("123e4567-e89b-12d3-a456-426614174000"\)/);
  assert.doesNotMatch(content, /uuid\.FromString/);
});

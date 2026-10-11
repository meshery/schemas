const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { formatGoFile } = require("../build/lib/gofmt");
const { commandExists } = require("../build/lib/exec");

const skip = commandExists("gofmt") ? false : "gofmt is not installed";

function withTempGoFile(contents, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "schemas-gofmt-"));
  const filePath = path.join(dir, "sample.go");
  fs.writeFileSync(filePath, contents, "utf-8");
  try {
    return fn(filePath);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("formatGoFile canonicalizes import order and struct tag alignment in place", { skip }, () => {
  const unformatted = [
    "package sample",
    "",
    "import (",
    '\t"github.com/meshery/schemas/models/core"',
    '\t"github.com/gofrs/uuid"',
    ")",
    "",
    "type AvailableTeam struct {",
    '\tID uuid.UUID `json:"id"`',
    '\tName string `json:"name"`',
    '\tDescription core.Text `json:"description"`',
    "}",
    "",
  ].join("\n");

  const expected = [
    "package sample",
    "",
    "import (",
    '\t"github.com/gofrs/uuid"',
    '\t"github.com/meshery/schemas/models/core"',
    ")",
    "",
    "type AvailableTeam struct {",
    '\tID          uuid.UUID `json:"id"`',
    '\tName        string    `json:"name"`',
    '\tDescription core.Text `json:"description"`',
    "}",
    "",
  ].join("\n");

  withTempGoFile(unformatted, (filePath) => {
    formatGoFile(filePath);
    assert.equal(fs.readFileSync(filePath, "utf-8"), expected);
  });
});

test("formatGoFile is idempotent on already-canonical Go", { skip }, () => {
  const canonical = ["package sample", "", "func Noop() {}", ""].join("\n");

  withTempGoFile(canonical, (filePath) => {
    formatGoFile(filePath);
    formatGoFile(filePath);
    assert.equal(fs.readFileSync(filePath, "utf-8"), canonical);
  });
});

test("formatGoFile throws with the offending file path for invalid Go", { skip }, () => {
  const invalid = "package sample\n\nfunc Broken( {\n";

  withTempGoFile(invalid, (filePath) => {
    assert.throws(
      () => formatGoFile(filePath),
      (err) => err instanceof Error && err.message.includes(filePath),
    );
    assert.equal(fs.readFileSync(filePath, "utf-8"), invalid);
  });
});

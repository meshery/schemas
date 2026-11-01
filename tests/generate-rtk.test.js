const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  encodePathParams,
  findUnguardedQueryParamAccesses,
  guardOptionalQueryParams,
} = require("../build/generate-rtk");

function withFixtureCopy(fixtureName, run) {
  const fixturePath = path.join(__dirname, "fixtures", fixtureName);
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guard-optional-query-params-"));
  const workingPath = path.join(tempDir, "generated.ts");
  fs.copyFileSync(fixturePath, workingPath);

  try {
    return run(workingPath);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

test("guardOptionalQueryParams guards dot and bracket query params without touching path/body access", () => {
  withFixtureCopy("guard-optional-query-params.fixture.ts", (workingPath) => {
    const rewriteCount = guardOptionalQueryParams(workingPath);
    const output = fs.readFileSync(workingPath, "utf8");

    assert.equal(rewriteCount, 4);
    assert.match(output, /page:\s*queryArg\?\.page/);
    assert.match(output, /type:\s*queryArg\?\.\["type"\]/);
    assert.match(output, /filter:\s*queryArg\?\.filter/);
    assert.match(output, /class:\s*queryArg\?\.\["class"\]/);
    assert.match(output, /url: `\/api\/designs\/\$\{queryArg\.itemId\}`/);
    assert.match(output, /body: queryArg\.body/);
    assert.deepEqual(findUnguardedQueryParamAccesses(output), []);
  });
});

test("guardOptionalQueryParams fails loudly when a params block still contains a bare queryArg access", () => {
  withFixtureCopy("guard-optional-query-params-unguarded.fixture.ts", (workingPath) => {
    assert.throws(
      () => guardOptionalQueryParams(workingPath),
      /unguarded queryArg access\(es\) remain/,
    );
  });
});

test("encodePathParams URL-encodes path parameter interpolations so reserved characters address their own entry", () => {
  const generated =
    "query: (queryArg) => ({ url: `/api/ledgers/${queryArg.ledger}/entries/${queryArg.entryKey}` }),";
  const rewritten = encodePathParams(generated);
  const build = new Function(
    `const queryArg = { ledger: "processed-profiles", entryKey: "a/b c" };
     const q = ${rewritten.replace(/^query: /, "").replace(/,$/, "")};
     return q(queryArg).url;`,
  );
  assert.equal(build(), "/api/ledgers/processed-profiles/entries/a%2Fb%20c");
});

test("encodePathParams leaves non-ledger path interpolations unchanged", () => {
  const generated =
    "query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}/entries/${queryArg.entryKey}` }),";
  assert.equal(encodePathParams(generated), generated);
});

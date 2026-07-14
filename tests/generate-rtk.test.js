const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  addCrossConstructInvalidation,
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

test("addCrossConstructInvalidation adds Environment_environments to all cross-construct connection operations", () => {
  withFixtureCopy("cross-construct-invalidation.fixture.ts", (workingPath) => {
    const patchedCount = addCrossConstructInvalidation(workingPath);
    const output = fs.readFileSync(workingPath, "utf8");

    assert.equal(patchedCount, 4);
    assert.match(
      output,
      /addConnectionToEnvironment:[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environments"\]/,
    );
    assert.match(
      output,
      /removeConnectionFromEnvironment:[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environments"\]/,
    );
    assert.match(
      output,
      /deleteConnection:[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environments"\]/,
    );
    assert.match(
      output,
      /deleteMesheryConnection:[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environments"\]/,
    );
    // performConnectionAction is not a cross-construct target and must be untouched.
    assert.match(
      output,
      /performConnectionAction:[\s\S]*?invalidatesTags: \["Connection_API_Connections"\]/,
    );
  });
});

test("addCrossConstructInvalidation is idempotent on a second run", () => {
  withFixtureCopy("cross-construct-invalidation.fixture.ts", (workingPath) => {
    const firstRun = addCrossConstructInvalidation(workingPath);
    const secondRun = addCrossConstructInvalidation(workingPath);
    const output = fs.readFileSync(workingPath, "utf8");

    assert.equal(firstRun, 4);
    assert.equal(secondRun, 0);
    // 1 pre-existing occurrence (getEnvironmentConnections' own providesTags)
    // + 4 injected into the target mutations' invalidatesTags. A second run
    // must not add any more.
    const tagOccurrences = output.match(/"Environment_environments"/g) || [];
    assert.equal(tagOccurrences.length, 5);
  });
});

test("addCrossConstructInvalidation is robust to spacing, quote style, and substring tag names", () => {
  withFixtureCopy("cross-construct-invalidation-robustness.fixture.ts", (workingPath) => {
    const patchedCount = addCrossConstructInvalidation(workingPath);
    const output = fs.readFileSync(workingPath, "utf8");

    // All four targets patched despite the formatting variations.
    assert.equal(patchedCount, 4);
    // Extra spaces around the `:` after the op name must not defeat matching.
    assert.match(
      output,
      /addConnectionToEnvironment[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environments"\]/,
    );
    // Single-quoted tags: the injected tag matches the file's quote style.
    assert.match(
      output,
      /removeConnectionFromEnvironment:[\s\S]*?invalidatesTags: \['Connection_API_Connections', 'Environment_environments'\]/,
    );
    // A tag that merely CONTAINS the target as a substring must not be treated
    // as already-present; the exact tag is still injected.
    assert.match(
      output,
      /deleteConnection:[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environmentsLegacy", "Environment_environments"\]/,
    );
    assert.match(
      output,
      /deleteMesheryConnection:[\s\S]*?invalidatesTags: \["Connection_API_Connections", "Environment_environments"\]/,
    );
  });
});

test("addCrossConstructInvalidation fails loudly when a target operation cannot be located", () => {
  withFixtureCopy("cross-construct-invalidation-missing-op.fixture.ts", (workingPath) => {
    assert.throws(
      () => addCrossConstructInvalidation(workingPath),
      /cross-construct invalidation target\(s\) could not be located.*deleteMesheryConnection/,
    );
  });
});

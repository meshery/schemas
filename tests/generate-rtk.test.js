const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const ts = require("typescript");

const {
  encodePathParams,
  findOptionalRequestBodyOperations,
  findUnguardedQueryParamAccesses,
  guardOptionalQueryParams,
  markOptionalRequestBodies,
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

// Type-check `source` in memory under --strict and return its diagnostics.
function typeCheck(source) {
  const fileName = "consumer.ts";
  const options = { strict: true, noEmit: true, noLib: true, types: [] };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, languageVersion, ...rest) =>
    name === fileName
      ? ts.createSourceFile(fileName, source, languageVersion)
      : getSourceFile(name, languageVersion, ...rest);
  const program = ts.createProgram([fileName], options, host);
  return ts
    .getPreEmitDiagnostics(program)
    .filter((d) => d.file && d.file.fileName === fileName)
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}

// Shape emitted by @rtk-query/codegen-openapi, which marks every body required.
const generatedArgs = `export type GenerateTokenApiArg = {
  name: string;
  purpose?: string;
  body: {
    keychainIds?: string[];
    expiresAt?: string | null;
  };
};
export type CreateKeyApiArg = {
  body: {
    name: string;
  };
};
`;

const spec = {
  components: { requestBodies: { tokenCreate: { required: false, content: {} } } },
  paths: {
    "/api/identity/tokens": {
      post: { operationId: "generateToken", requestBody: { $ref: "#/components/requestBodies/tokenCreate" } },
    },
    "/api/keys": {
      post: { operationId: "createKey", requestBody: { required: true, content: {} } },
      get: { operationId: "getKeys" },
    },
  },
};

test("findOptionalRequestBodyOperations lists operations whose resolved requestBody is not required", () => {
  assert.deepEqual(findOptionalRequestBodyOperations(spec), ["generateToken"]);
});

test("markOptionalRequestBodies lets a body-less call type-check only where the body is optional", () => {
  const callers = `
const legacy: GenerateTokenApiArg = { name: "ci", purpose: "automation" };
const scoped: GenerateTokenApiArg = { name: "ci", body: { keychainIds: ["k"] } };
const missingKeyBody: CreateKeyApiArg = {};
`;
  const before = typeCheck(generatedArgs + callers);
  assert.ok(before.some((m) => /'body' is missing.*GenerateTokenApiArg/.test(m)), before.join("\n"));

  const { content, rewrites } = markOptionalRequestBodies(
    generatedArgs,
    findOptionalRequestBodyOperations(spec),
  );
  assert.equal(rewrites, 1);
  const after = typeCheck(content + callers);
  assert.equal(after.length, 1, after.join("\n"));
  assert.match(after[0], /'body' is missing.*CreateKeyApiArg/);

  assert.deepEqual(markOptionalRequestBodies(content, ["generateToken"]), { content, rewrites: 0 });
});

test("markOptionalRequestBodies handles CRLF output from the codegen formatter", () => {
  const crlf = generatedArgs.replace(/\n/g, "\r\n");
  const { content, rewrites } = markOptionalRequestBodies(crlf, ["generateToken"]);
  assert.equal(rewrites, 1);
  assert.deepEqual(typeCheck(`${content}const legacy: GenerateTokenApiArg = { name: "ci" };\n`), []);
});

test("markOptionalRequestBodies fails loudly when the expected ApiArg type is missing", () => {
  assert.throws(
    () => markOptionalRequestBodies(generatedArgs, ["addTeamToOrg"]),
    /AddTeamToOrgApiArg type literal not found/,
  );
});

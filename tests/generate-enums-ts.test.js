const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  collectEnumsFromSpec,
  renderConstructFile,
  renderIndexFile,
  toCamelCaseKey,
} = require("../build/generate-enums-ts");

function specWith(schemas) {
  return { components: { schemas } };
}

test("collectEnumsFromSpec picks up only schemas that opt in with x-ts-const", () => {
  const enums = collectEnumsFromSpec(
    specWith({
      // Opted in.
      CoreKind: {
        type: "string",
        description: "Core kinds",
        "x-ts-const": "CoreConnectionKinds",
        enum: ["meshery", "kubernetes"],
      },
      // A string enum WITHOUT the extension stays type-only.
      ConnectionStatusValue: {
        type: "string",
        enum: ["discovered", "connected"],
      },
      // Not an enum at all.
      Connection: { type: "object", properties: {} },
    }),
    "v1beta3/connection",
  );

  assert.equal(enums.length, 1);
  assert.equal(enums[0].constName, "CoreConnectionKinds");
  assert.equal(enums[0].typeName, "CoreKind");
  assert.deepEqual(enums[0].values, ["meshery", "kubernetes"]);
});

test("collectEnumsFromSpec honours x-ts-type when the TS type name differs from the schema name", () => {
  // Go names are scoped by their construct package (connection.CoreKind); the TS
  // names are exported from the @meshery/schemas root and need more qualification.
  const [withOverride] = collectEnumsFromSpec(
    specWith({
      CoreKind: {
        type: "string",
        "x-ts-const": "CoreConnectionKinds",
        "x-ts-type": "CoreConnectionKind",
        enum: ["kubernetes"],
      },
    }),
    "v1beta3/connection",
  );
  assert.equal(withOverride.typeName, "CoreConnectionKind");
  assert.equal(withOverride.schemaName, "CoreKind");

  // Absent the override, the schema name is used verbatim.
  const [withoutOverride] = collectEnumsFromSpec(
    specWith({
      SomeKind: { type: "string", "x-ts-const": "SomeKinds", enum: ["a"] },
    }),
    "v1beta3/connection",
  );
  assert.equal(withoutOverride.typeName, "SomeKind");

  // The doc comment still cites the SCHEMA name, so the generated file points
  // back at the api.yml entry it came from.
  const output = renderConstructFile("v1beta3/connection", [withOverride]);
  assert.match(output, /Source: v1beta3\/connection components\.schemas\.CoreKind/);
  assert.match(output, /export type CoreConnectionKind =/);
});

test("collectEnumsFromSpec fails loudly when x-ts-const is put on a non-string-enum schema", () => {
  assert.throws(
    () =>
      collectEnumsFromSpec(
        specWith({ Broken: { type: "object", "x-ts-const": "Broken" } }),
        "v1beta3/connection",
      ),
    /declares x-ts-const but is not a string enum/,
  );
});

test("renderConstructFile emits a frozen const plus a type derived from it", () => {
  const output = renderConstructFile("v1beta3/connection", [
    {
      constName: "CoreConnectionKinds",
      typeName: "CoreKind",
      description: "First class kinds",
      values: ["meshery", "kubernetes"],
    },
  ]);

  assert.match(output, /DO NOT EDIT/);
  assert.match(output, /Source: v1beta3\/connection components\.schemas\.CoreKind/);
  assert.match(output, /export const CoreConnectionKinds = \{/);
  assert.match(output, /^ {2}meshery: "meshery",$/m);
  assert.match(output, /^ {2}kubernetes: "kubernetes",$/m);
  assert.match(output, /\} as const;/);
  assert.match(
    output,
    /export type CoreKind =\s*\n\s*\(typeof CoreConnectionKinds\)\[keyof typeof CoreConnectionKinds\];/,
  );
});

test("toCamelCaseKey camelCases multi-word enum values", () => {
  assert.equal(toCamelCaseKey("kubernetes"), "kubernetes");
  assert.equal(toCamelCaseKey("not found"), "notFound");
  assert.equal(toCamelCaseKey("in_cluster"), "inCluster");
  assert.equal(toCamelCaseKey("out-of-cluster"), "outOfCluster");
});

test("renderConstructFile rejects two enum values that collide on one key", () => {
  assert.throws(
    () =>
      renderConstructFile("v1beta3/connection", [
        {
          constName: "Colliding",
          typeName: "Collide",
          values: ["not found", "not_found"],
        },
      ]),
    /both map to key "notFound"/,
  );
});

test("renderIndexFile re-exports every emitted construct file", () => {
  const output = renderIndexFile([
    { relativeImport: "./v1beta3/connection" },
    { relativeImport: "./v1beta1/system" },
  ]);

  assert.match(output, /export \* from "\.\/v1beta3\/connection";/);
  assert.match(output, /export \* from "\.\/v1beta1\/system";/);
});

test("the committed CoreConnectionKinds output matches the schema it is generated from", () => {
  const root = path.join(__dirname, "..");

  // The api.yml enum is the single source of truth; the committed TS constants
  // and the Go constants must not drift from it.
  const apiYml = fs.readFileSync(
    path.join(root, "schemas/constructs/v1beta3/connection/api.yml"),
    "utf8",
  );
  const enumBlock = apiYml
    .split("CoreKind:")[1]
    .split("x-enum-varnames:")[0];
  const kinds = [...enumBlock.matchAll(/^\s+- (\w+)$/gm)].map((m) => m[1]);
  assert.ok(kinds.length > 0, "no enum values parsed out of api.yml");

  const ts = fs.readFileSync(
    path.join(root, "typescript/constants/v1beta3/connection.ts"),
    "utf8",
  );
  for (const kind of kinds) {
    assert.match(
      ts,
      new RegExp(`^ {2}${kind}: "${kind}",$`, "m"),
      `typescript/constants is missing "${kind}" — re-run \`make generate-enums-ts\``,
    );
  }

  const go = fs.readFileSync(
    path.join(root, "models/v1beta3/connection/connection.go"),
    "utf8",
  );
  for (const kind of kinds) {
    const goName = "CoreKind" + kind[0].toUpperCase() + kind.slice(1);
    assert.match(
      go,
      new RegExp(`${goName}\\s+CoreKind = "${kind}"`),
      `models/v1beta3/connection is missing ${goName} — re-run \`make generate-golang\``,
    );
  }
});

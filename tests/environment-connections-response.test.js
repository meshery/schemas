const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");
const yaml = require("js-yaml");
const { generateEndpoints } = require("@rtk-query/codegen-openapi");
const { dereferenceOpenapiSpec } = require("../build/bundle-openapi");

const root = path.join(__dirname, "..");
const environmentSpec = path.join(root, "schemas/constructs/v1beta3/environment/api.yml");
const rtkDir = path.join(root, "typescript/rtk");

test("environment connection listings reuse the canonical Connection response", async () => {
  const source = yaml.load(fs.readFileSync(environmentSpec, "utf8"));
  assert.equal(
    path.resolve(path.dirname(environmentSpec),
      source.components.schemas.EnvironmentConnectionsPage.properties.connections.items.$ref),
    path.join(root, "schemas/constructs/v1beta3/connection/connection.yaml"),
  );
  const environment = await dereferenceOpenapiSpec(environmentSpec);
  const connection = await dereferenceOpenapiSpec(
    path.join(root, "schemas/constructs/v1beta3/connection/api.yml"),
  );
  const operation = environment.paths["/api/environments/{environmentId}/connections"].get;
  const page = operation.responses["200"].content["application/json"].schema;
  const connectionPage = connection.paths["/api/integrations/connections"].get
    .responses["200"].content["application/json"].schema;

  assert.deepEqual(operation["x-internal"], ["cloud", "meshery"]);
  assert.deepEqual(Object.keys(page.properties), ["page", "pageSize", "totalCount", "connections"]);
  const item = page.properties.connections.items;
  const canonical = connectionPage.properties.connections.items;
  assert.deepEqual(item.required, canonical.required);
  for (const field of ["id", "name", "type", "subType", "kind", "status", "metadata", "createdAt", "updatedAt"]) {
    assert.deepEqual(item.properties[field], canonical.properties[field], field);
  }
  // Assignment responses still contain junction records, not Connection objects.
  assert.ok(environment.components.schemas.EnvironmentConnectionMappingPage
    .properties.environmentConnectionMapping.items.properties.connectionId);
});

test("generated environment connection fields are checked rather than any", async () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "environment-connections-"));
  try {
    const generated = await generateEndpoints({
      schemaFile: environmentSpec,
      apiFile: path.join(root, "typescript/rtk/api.ts"),
      apiImport: "cloudBaseApi",
      filterEndpoints: ["getEnvironmentConnections"],
      hooks: false,
    });
    assert.equal(typeof generated, "string");
    fs.writeFileSync(path.join(temporary, "generated.ts"), generated);
    assertConnectionResponseTypes(temporary, "generated");
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

for (const target of ["cloud", "meshery"]) {
  test(`generated ${target} RTK client preserves environment connection response types`, async () => {
    // `make test-rtk` builds both bundled specs before running this test.
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), `${target}-rtk-`));
    try {
      const { default: config } = require(path.join(rtkDir, `${target}-rtk-config.ts`));
      await generateEndpoints({
        ...config,
        schemaFile: path.resolve(rtkDir, config.schemaFile),
        apiFile: path.resolve(rtkDir, config.apiFile).replaceAll(path.sep, "/"),
        outputFile: path.join(temporary, `${target}.ts`),
      });
      assertConnectionResponseTypes(temporary, target);
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}

function assertConnectionResponseTypes(directory, client) {
  const consumer = path.join(directory, "consumer.ts");
  fs.writeFileSync(consumer, `
import type { GetEnvironmentConnectionsApiResponse } from "./${client}";
type Connection = NonNullable<GetEnvironmentConnectionsApiResponse["connections"]>[number];
type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assert<T extends true> = T;
type IdIsChecked = Assert<IsAny<Connection["id"]> extends false ? true : false>;
type NameIsChecked = Assert<IsAny<Connection["name"]> extends false ? true : false>;
declare const connection: Connection;
const id: string = connection.id;
const name: string = connection.name;
const requiredStatus: string = connection.status;
const statuses: Connection["status"][] = [
  "discovered",
  "registered",
  "connected",
  "ignored",
  "maintenance",
  "disconnected",
  "deleted",
  "not found",
];
// @ts-expect-error IDs are strings.
const invalidId: Connection["id"] = 123;
// @ts-expect-error Names are strings.
const invalidName: Connection["name"] = false;
// @ts-expect-error Status is the canonical connection status union.
const invalidStatus: Connection["status"] = "not-a-status";
// @ts-expect-error Connection does not expose arbitrary properties.
connection.nonexistent;
`);
  const program = ts.createProgram([consumer], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    esModuleInterop: true,
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: (file) => file,
    getCurrentDirectory: () => root,
    getNewLine: () => "\n",
  }));
}

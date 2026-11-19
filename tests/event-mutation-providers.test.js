const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { generateEndpoints } = require("@rtk-query/codegen-openapi");
const { bundleConstructSpec, mergeOpenapiSpec } = require("../build/bundle-openapi");
const { filterOpenapiByTag } = require("../build/filterOpenapiByTag");

const root = path.join(__dirname, "..");
// These are Cloud contracts. Meshery Server instead serves /api/system/events,
// with different bulk-delete semantics and empty delete/status responses.
// See #1134 and meshery/meshery server/router/server.go.
const mutations = [
  ["createEvent", "/api/events", "post"],
  ["deleteEvent", "/api/events/{eventId}", "delete"],
  ["bulkDeleteEvents", "/api/events/delete", "post"],
  ["updateEventStatus", "/api/events/{eventId}/status", "put"],
  ["bulkUpdateEventStatus", "/api/events/status", "put"],
];

async function eventBundle(target) {
  const construct = await bundleConstructSpec(
    path.join(root, "schemas/constructs/v1beta3/event/api.yml"),
    { version: "v1beta3", dirName: "event" },
  );
  const base = {
    openapi: "3.0.0",
    info: { title: "Event provider regression", version: "1.0.0" },
    paths: {},
    components: {},
  };
  return filterOpenapiByTag(mergeOpenapiSpec(base, construct), target, base);
}

test("Meshery bundle excludes the five unsupported Cloud event mutations", async () => {
  const spec = await eventBundle("meshery");
  const exposed = mutations.filter(([, route, method]) => spec.paths[route]?.[method]);
  assert.deepEqual(exposed.map(([name]) => name), []);
});

test("Cloud bundle retains event mutation request and response contracts", async () => {
  const spec = await eventBundle("cloud");
  for (const [name, route, method] of mutations) {
    assert.equal(spec.paths[route]?.[method]?.operationId, name);
  }
  assert.ok(spec.paths["/api/events"].post.responses["201"].content["application/json"]);
  assert.ok(spec.paths["/api/events/{eventId}"].delete.responses["204"]);
  assert.ok(spec.paths["/api/events/status"].put.responses["200"].content["application/json"]);
});

for (const target of ["cloud", "meshery"]) {
  test(`complete ${target} bundle does not reintroduce mutations from older event versions`, () => {
    // make test-rtk produces the full provider bundles before running this file.
    const yaml = require("js-yaml");
    const spec = yaml.load(fs.readFileSync(path.join(root, "_openapi_build", `${target}_openapi.yml`), "utf8"));
    const names = new Set(mutations.map(([name]) => name));
    const exposed = Object.values(spec.paths).flatMap((item) =>
      Object.values(item)
        .filter((operation) => names.has(operation?.operationId))
        .map((operation) => operation.operationId),
    );
    assert.deepEqual(exposed.sort(), target === "cloud" ? [...names].sort() : []);
  });

  test(`generated ${target} client exposes event mutations only for the right provider`, async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "event-providers-"));
    try {
      const schemaFile = path.join(directory, "events.json");
      fs.writeFileSync(schemaFile, JSON.stringify(await eventBundle(target)));
      const generated = await generateEndpoints({
        schemaFile,
        apiFile: path.join(root, "typescript/rtk/api.ts").replaceAll(path.sep, "/"),
        apiImport: `${target}BaseApi`,
        hooks: false,
      });
      let definitions;
      const api = {
        enhanceEndpoints: () => api,
        injectEndpoints: ({ endpoints }) => {
          definitions = endpoints({ query: (definition) => definition, mutation: (definition) => definition });
          return api;
        },
      };
      const javascript = ts.transpileModule(generated, {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
      }).outputText;
      // Capture the generated endpoint definitions at the RTK boundary;
      // execute their query builders without network requests or credentials.
      vm.runInNewContext(javascript, {
        exports: {},
        require: (moduleName) => {
          assert.ok(moduleName.endsWith("/api"), `unexpected generated import: ${moduleName}`);
          return { cloudBaseApi: api, mesheryBaseApi: api };
        },
      });
      for (const [name] of mutations) {
        assert.equal(typeof definitions[name], target === "cloud" ? "object" : "undefined", name);
      }
      if (target === "cloud") {
        assert.deepEqual(JSON.parse(JSON.stringify(definitions.deleteEvent.query({ eventId: "fixture-id" }))), {
          url: "/api/events/fixture-id",
          method: "DELETE",
        });
      }
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });
}

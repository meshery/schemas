const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");
const yaml = require("js-yaml");
const { generateEndpoints } = require("@rtk-query/codegen-openapi");

const root = path.join(__dirname, "..");
const viewDir = path.join(root, "schemas/constructs/v1beta2/view");
const apiSpec = path.join(viewDir, "api.yml");
const entitySpec = path.join(viewDir, "view.yaml");
const rtkDir = path.join(root, "typescript/rtk");
const expectedFilters = ["k8sclusterIds", "kinds", "models", "namespaces", "labels", "search"];

test("view response, location response, and payload reuse the typed filters schema", () => {
  const api = yaml.load(fs.readFileSync(apiSpec, "utf8"));
  const entity = yaml.load(fs.readFileSync(entitySpec, "utf8"));
  const filters = api.components.schemas.ViewFilters;

  assert.ok(filters, "api.yml should declare the ViewFilters component");
  assert.equal(filters.additionalProperties, true);
  assert.deepEqual(Object.keys(filters.properties), expectedFilters);
  assert.deepEqual(filters.required, ["k8sclusterIds", "kinds", "models", "namespaces", "labels"]);
  assert.equal(filters.properties.k8sclusterIds.items.format, "uuid");
  assert.deepEqual(entity.properties.filters.$ref, "./api.yml#/components/schemas/ViewFilters");
  assert.deepEqual(
    api.components.schemas.MesheryViewWithLocation.properties.filters.$ref,
    "#/components/schemas/ViewFilters",
  );
  assert.deepEqual(api.components.schemas.ViewPayload.properties.filters.$ref, "#/components/schemas/ViewFilters");
  assert.equal(entity.properties.metadata.additionalProperties, true);
  assert.equal(api.components.schemas.MesheryViewWithLocation.properties.metadata.additionalProperties, true);
  assert.equal(api.components.schemas.ViewPayload.properties.metadata.additionalProperties, true);
});

test("generated view client exposes filter fields on responses and write payloads", async () => {
  const generated = await generateEndpoints({
    schemaFile: apiSpec,
    apiFile: path.join(rtkDir, "api.ts"),
    apiImport: "cloudBaseApi",
    filterEndpoints: ["createView", "getViews", "getViewById", "updateView"],
    hooks: false,
  });
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "view-filters-"));
  try {
    fs.writeFileSync(path.join(temporary, "view.ts"), generated);
    assertViewTypes(temporary);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

function assertViewTypes(directory) {
  const consumer = path.join(directory, "consumer.ts");
  fs.writeFileSync(
    consumer,
    `
import type {
  CreateViewApiArg,
  GetViewByIdApiResponse,
  GetViewsApiResponse,
  UpdateViewApiArg,
} from "./view";

type Filters = NonNullable<GetViewByIdApiResponse["filters"]>;
type ListFilters = NonNullable<NonNullable<GetViewsApiResponse["views"]>[number]["filters"]>;
type CreateFilters = NonNullable<CreateViewApiArg["viewPayload"]["filters"]>;
type UpdateFilters = NonNullable<UpdateViewApiArg["viewPayload"]["filters"]>;

const filters: Filters = {
  k8sclusterIds: ["00000000-0000-0000-0000-000000000000"],
  kinds: ["Pod"],
  models: ["kubernetes"],
  namespaces: ["default"],
  labels: ["app=meshery"],
  search: "cluster",
};
const listFilters: ListFilters = filters;
const createFilters: CreateFilters = filters;
const updateFilters: UpdateFilters = filters;
const kinds: string[] = filters.kinds;
const search: string | undefined = filters.search;
const metadata: NonNullable<GetViewByIdApiResponse["metadata"]> = {
  custom: { enabled: true },
};
// @ts-expect-error Filter arrays contain strings.
const invalidKinds: Filters["kinds"] = [42];
void [listFilters, createFilters, updateFilters, kinds, search, metadata, invalidKinds];
`,
  );
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
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    }),
  );
}

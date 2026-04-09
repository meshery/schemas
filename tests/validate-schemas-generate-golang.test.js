const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const config = require("../build/lib/config");
const { buildImportMappings, loadYamlFile } = require("../build/generate-golang");

const projectRoot = config.getProjectRoot();

function getSchemaPackage(version, dirName) {
  const pkg = config
    .getSchemaPackages()
    .find((candidate) => candidate.version === version && candidate.dirName === dirName);
  assert.ok(pkg, `expected schema package ${version}/${dirName} to exist`);
  return pkg;
}

test("v1beta1 component capability refs map to the v1beta1 capability Go package", () => {
  const currentPkg = getSchemaPackage("v1beta1", "component");
  const entryPath = path.join(
    projectRoot,
    "schemas/constructs/v1beta1/component/component.yaml",
  );

  const importMappings = buildImportMappings(currentPkg, entryPath);

  assert.equal(
    importMappings["../capability/api.yml"],
    "github.com/meshery/schemas/models/v1beta1/capability",
  );
});

test("v1beta1 component schema imports capability from v1beta1", () => {
  const document = loadYamlFile(
    path.join(projectRoot, "schemas/constructs/v1beta1/component/component.yaml"),
  );

  assert.equal(
    document.properties.capabilities.items["x-go-type-import"].path,
    "github.com/meshery/schemas/models/v1beta1/capability",
  );
  assert.equal(
    document.properties.capabilities.items["x-go-type"],
    "capabilityv1beta1.Capability",
  );
});

test("v1beta1 design relationships import the v1beta2 relationship package", () => {
  const document = loadYamlFile(
    path.join(projectRoot, "schemas/constructs/v1beta1/design/design.yaml"),
  );

  assert.equal(
    document.properties.relationships["x-go-type-import"].path,
    "github.com/meshery/schemas/models/v1beta2/relationship",
  );
});

test("v1beta2 relationship schema keeps metadata mapped to the legacy metadata column", () => {
  const document = loadYamlFile(
    path.join(projectRoot, "schemas/constructs/v1beta2/relationship/relationship.yaml"),
  );

  assert.equal(
    document.properties.metadata["x-oapi-codegen-extra-tags"].gorm,
    "column:metadata;type:bytes;serializer:json",
  );
});

test("v1beta2 relationship schema imports capabilities from v1beta1", () => {
  const document = loadYamlFile(
    path.join(projectRoot, "schemas/constructs/v1beta2/relationship/relationship.yaml"),
  );

  assert.equal(
    document.properties.capabilities.items["x-go-type-import"].path,
    "github.com/meshery/schemas/models/v1beta1/capability",
  );
  assert.equal(
    document.properties.capabilities.items["x-go-type"],
    "capabilityv1beta1.Capability",
  );
});

test("v1beta2 component schema imports capabilities from v1beta1", () => {
  const document = loadYamlFile(
    path.join(projectRoot, "schemas/constructs/v1beta2/component/component.yaml"),
  );

  assert.equal(
    document.properties.capabilities.items["x-go-type-import"].path,
    "github.com/meshery/schemas/models/v1beta1/capability",
  );
  assert.equal(
    document.properties.capabilities.items["x-go-type"],
    "capabilityv1beta1.Capability",
  );
});

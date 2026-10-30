const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");

const config = require("../build/lib/config");
const paths = require("../build/lib/paths");
const {
  collectPythonWarnings,
  findUnlistedPythonWarnings,
  generatedFileDigests,
  getPilotPackages,
  normalizePythonWarning,
  specDigest,
} = require("../build/generate-python");

// Recorded from a real openapi-python-client 0.29.1 run against a spec with
// a bare `type: array` response (no `items`). Memory addresses in the tool's
// `UntrustedString object at 0x...` reprs differ per run and per machine.
const BARE_ARRAY_SAMPLE = `Warning(s) encountered while generating. Client was generated, but some pieces may be missing
Generating /tmp/py-bad

WARNING parsing GET /things within default.

Cannot parse response for status code <openapi_python_client.schema.untrusted_string.UntrustedString object at 0x10731f680> (type array must have items or prefixItems defined), response will be omitted from generated client

{
  "type": "array"
}

If you believe this was a mistake or this tool is missing a feature you need, please open an issue at https://github.com/openapi-generators/openapi-python-client/issues/new/choose
`;

test("normalizePythonWarning masks per-run memory addresses", () => {
  const first = normalizePythonWarning(
    "WARNING parsing GET /things within default. <openapi_python_client.schema.untrusted_string.UntrustedString object at 0x10731f680>",
  );
  const second = normalizePythonWarning(
    "WARNING parsing GET /things within default. <openapi_python_client.schema.untrusted_string.UntrustedString object at 0x102cbf200>",
  );

  assert.equal(first, second);
  assert.match(first, /^WARNING parsing GET \/things within default\./);
});

test("collectPythonWarnings keeps WARNING headers and drops summary/detail/footer lines", () => {
  assert.deepEqual(collectPythonWarnings(BARE_ARRAY_SAMPLE), ["WARNING parsing GET /things within default."]);
  assert.deepEqual(collectPythonWarnings("Generating /tmp/py-key\n"), []);
  assert.deepEqual(collectPythonWarnings(""), []);
});

test("findUnlistedPythonWarnings fails on warnings with no allow-list entry", () => {
  const warnings = ["WARNING parsing GET /things within default."];

  assert.deepEqual(findUnlistedPythonWarnings(warnings, warnings), []);
  assert.deepEqual(findUnlistedPythonWarnings(warnings, []), warnings);
  assert.deepEqual(findUnlistedPythonWarnings([], []), []);
});

test("python generator and ruff pins are exact versions", () => {
  assert.equal(config.python.generatorPackage, "openapi-python-client");
  assert.match(config.python.generatorVersion, /^\d+\.\d+\.\d+$/);
  assert.match(config.python.ruffVersion, /^\d+\.\d+\.\d+$/);
  assert.ok(Array.isArray(config.python.warningAllowlist));
});

test("python pilot constructs resolve through shared discovery", () => {
  const pilot = getPilotPackages();

  assert.ok(pilot.length > 0);
  for (const pkg of pilot) {
    assert.ok(config.python.pilotPackages.includes(`${pkg.version}/${pkg.dirName}`));
  }
});

test("committed python output matches its manifest spec and generated-file digests", () => {
  const distRoot = paths.fromRoot(config.paths.pythonDir);
  const manifestPath = path.join(distRoot, ".python-gen-manifest.json");
  assert.ok(
    paths.fileExists(manifestPath),
    `missing ${config.paths.pythonDir}/.python-gen-manifest.json; run 'make generate-python' first`,
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  const pinHint = "committed python manifest pins differ from build/lib/config.js; run 'make generate-python'";
  assert.equal(manifest.generator, config.python.generatorPackage, pinHint);
  assert.equal(manifest.generatorVersion, config.python.generatorVersion, pinHint);
  assert.equal(manifest.ruffVersion, config.python.ruffVersion, pinHint);

  for (const [key, entry] of Object.entries(manifest.specs)) {
    const specPath = paths.fromRoot(entry.spec);
    assert.ok(
      paths.fileExists(specPath),
      `bundled spec for ${key} not found at ${entry.spec}; run 'node build/bundle-openapi.js' first`,
    );
    assert.equal(
      specDigest(specPath),
      entry.sha256,
      `committed python client for ${key} is stale (spec digest mismatch); run 'make generate-python'`,
    );
  }

  const subpackageDirs = getPilotPackages().map((pkg) => path.join(distRoot, "src", config.python.packageName, pkg.name));
  assert.deepEqual(
    generatedFileDigests(distRoot, subpackageDirs),
    manifest.files,
    "committed generated python files differ from the manifest digests (hand-edited or stale); run 'make generate-python'",
  );

  const recorded = Object.values(manifest.warnings).flat();
  assert.deepEqual(findUnlistedPythonWarnings(recorded, manifest.warningAllowlist), []);
  assert.deepEqual(findUnlistedPythonWarnings(recorded, config.python.warningAllowlist), []);
});

test("committed python tree keeps scaffold/generated separation and no tool state", () => {
  const distRoot = paths.fromRoot(config.paths.pythonDir);

  assert.ok(
    paths.fileExists(path.join(distRoot, "src", config.python.packageName, "key", "models", "key.py")),
    "generated key model is missing; run 'make generate-python'",
  );

  const offenders = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if ([".ruff_cache", "__pycache__", ".pytest_cache"].includes(entry.name) || entry.name.endsWith(".egg-info")) {
        offenders.push(path.relative(distRoot, full));
      } else if (entry.isDirectory()) {
        walk(full);
      }
    }
  };
  walk(distRoot);
  assert.deepEqual(offenders, []);
});

test("model constructs define items for relationships and components arrays (#1241)", () => {
  for (const version of ["v1beta1", "v1beta2"]) {
    const modelPath = paths.fromRoot("schemas", "constructs", version, "model", "model.yaml");
    const modelDef = yaml.load(fs.readFileSync(modelPath, "utf-8"));
    assert.deepEqual(modelDef.properties.relationships.items, {}, `${version} model relationships must define items schema`);
    assert.deepEqual(modelDef.properties.components.items, {}, `${version} model components must define items schema`);
  }
});

test("bundled openapi specs contain no bare array schemas without items (#1241)", () => {
  for (const bundle of ["meshery_openapi.yml", "cloud_openapi.yml"]) {
    const specPath = paths.fromRoot(config.paths.buildDir, bundle);
    if (!paths.fileExists(specPath)) continue;
    const spec = yaml.load(fs.readFileSync(specPath, "utf-8"));
    const bareArrays = [];

    const walk = (node, trail, depth) => {
      if (node == null || depth > 100) return;
      if (Array.isArray(node)) {
        node.forEach((item, index) => walk(item, `${trail}[${index}]`, depth + 1));
        return;
      }
      if (typeof node !== "object") return;
      if (node.type === "array" && !node.items && !node.prefixItems) {
        bareArrays.push(trail);
      }
      for (const key of Object.keys(node)) {
        walk(node[key], `${trail}/${key}`, depth + 1);
      }
    };

    walk(spec, "", 0);
    assert.deepEqual(bareArrays, [], `bare array schema without items found in ${bundle}`);
  }
});

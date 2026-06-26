const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  DEFAULT_OUTPUT_RELATIVE_PATH,
  buildSiteData,
  collectXInternalTags,
  parseLatestConstructs,
  resolveConstructClassification,
  resolveOutputPath,
  resolveSchemaHref,
  writeSiteData,
} = require("../build/generate-site-data");

const API_WITH_TAGS = [
  "paths:",
  "  /api/things:",
  "    get:",
  "      x-internal:",
  "        - meshery",
  "      operationId: listThings",
  "    post:",
  "      x-internal: [\"cloud\"]",
  "      operationId: createThing",
  "",
].join("\n");

const API_CLOUD_ONLY = [
  "paths:",
  "  /api/things:",
  "    get:",
  "      x-internal:",
  "        - cloud",
  "      operationId: listThings",
  "",
].join("\n");

const API_NO_OPERATIONS = ["components:", "  schemas:", "    Thing:", "      type: object", ""].join("\n");

const repoRoot = path.resolve(__dirname, "..");

function withTempRepo(files, callback) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "meshery-site-data-"));

  try {
    for (const [relativePath, contents] of Object.entries(files)) {
      const filePath = path.join(tempDir, relativePath);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, contents);
    }

    callback(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

test("parseLatestConstructs parses the make target output", () => {
  const latestConstructs = parseLatestConstructs("academy              v1beta3\ncore                 v1beta2\n");

  assert.deepEqual(latestConstructs, [
    { construct: "academy", version: "v1beta3" },
    { construct: "core", version: "v1beta2" },
  ]);
});

test("resolveOutputPath defaults to the Jekyll data file", () => {
  const outputPath = resolveOutputPath([], repoRoot);

  assert.equal(path.relative(repoRoot, outputPath), DEFAULT_OUTPUT_RELATIVE_PATH);
});

test("resolveSchemaHref selects the construct schema when it exists", () => {
  withTempRepo({
    "schemas/constructs/v1/test-construct/test-construct.yaml": "",
    "schemas/constructs/v1/test-construct/api.yml": "",
  }, (tempRepoRoot) => {
    assert.equal(
      resolveSchemaHref(tempRepoRoot, "v1", "test-construct"),
      "/schemas/constructs/v1/test-construct/test-construct.yaml",
    );
  });
});

test("resolveSchemaHref falls back to the first non-api YAML file when the construct schema is missing", () => {
  withTempRepo({
    "schemas/constructs/v1/test-construct/alternate.yaml": "",
    "schemas/constructs/v1/test-construct/api.yml": "",
  }, (tempRepoRoot) => {
    assert.equal(
      resolveSchemaHref(tempRepoRoot, "v1", "test-construct"),
      "/schemas/constructs/v1/test-construct/alternate.yaml",
    );
  });
});

test("resolveSchemaHref uses api.yml when it is the only YAML file", () => {
  withTempRepo({
    "schemas/constructs/v1/test-construct/api.yml": "",
  }, (tempRepoRoot) => {
    assert.equal(
      resolveSchemaHref(tempRepoRoot, "v1", "test-construct"),
      "/schemas/constructs/v1/test-construct/api.yml",
    );
  });
});

test("resolveSchemaHref throws when no valid schema file exists", () => {
  withTempRepo({
    "schemas/constructs/v1/test-construct/README.md": "",
  }, (tempRepoRoot) => {
    assert.throws(
      () => resolveSchemaHref(tempRepoRoot, "v1", "test-construct"),
      /No valid schema file found/,
    );
  });
});

test("collectXInternalTags gathers tags across all operations and styles", () => {
  withTempRepo({
    "schemas/constructs/v1/thing/api.yml": API_WITH_TAGS,
  }, (tempRepoRoot) => {
    const tags = collectXInternalTags(tempRepoRoot, "v1", "thing");
    assert.deepEqual([...tags].sort(), ["cloud", "meshery"]);
  });
});

test("collectXInternalTags returns an empty set when api.yml is absent", () => {
  withTempRepo({
    "schemas/constructs/v1/thing/thing.yaml": "",
  }, (tempRepoRoot) => {
    assert.equal(collectXInternalTags(tempRepoRoot, "v1", "thing").size, 0);
  });
});

test("resolveConstructClassification maps meshery to Core and cloud to Extension", () => {
  withTempRepo({
    "schemas/constructs/v1/thing/api.yml": API_WITH_TAGS,
  }, (tempRepoRoot) => {
    assert.deepEqual(resolveConstructClassification(tempRepoRoot, "v1", "thing"), {
      core: true,
      extension: true,
    });
  });
});

test("resolveConstructClassification marks cloud-only constructs as Extension", () => {
  withTempRepo({
    "schemas/constructs/v1/thing/api.yml": API_CLOUD_ONLY,
  }, (tempRepoRoot) => {
    assert.deepEqual(resolveConstructClassification(tempRepoRoot, "v1", "thing"), {
      core: false,
      extension: true,
    });
  });
});

test("resolveConstructClassification leaves schema-only constructs unclassified", () => {
  withTempRepo({
    "schemas/constructs/v1/thing/thing.yaml": "",
    "schemas/constructs/v1/thing/api.yml": API_NO_OPERATIONS,
  }, (tempRepoRoot) => {
    assert.deepEqual(resolveConstructClassification(tempRepoRoot, "v1", "thing"), {
      core: false,
      extension: false,
    });
  });
});

test("buildSiteData returns Jekyll-friendly schema rows", () => {
  withTempRepo({
    "schemas/constructs/v1/academy/academy.yaml": "",
    "schemas/constructs/v1/academy/api.yml": API_CLOUD_ONLY,
    "schemas/constructs/v2/core/api.yml": API_NO_OPERATIONS,
  }, (tempRepoRoot) => {
    const siteData = buildSiteData(tempRepoRoot, [
      { construct: "academy", version: "v1" },
      { construct: "core", version: "v2" },
    ]);

    assert.deepEqual(siteData, [
      {
        construct: "academy",
        version: "v1",
        href: "/schemas/constructs/v1/academy/academy.yaml",
        core: false,
        extension: true,
      },
      {
        construct: "core",
        version: "v2",
        href: "/schemas/constructs/v2/core/api.yml",
        core: false,
        extension: false,
      },
    ]);
  });
});

test("writeSiteData writes JSON for Jekyll to consume", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "meshery-site-data-"));
  const outputPath = path.join(tempDir, DEFAULT_OUTPUT_RELATIVE_PATH);
  const siteData = buildSiteData(repoRoot, [
    { construct: "academy", version: "v1beta3" },
    { construct: "core", version: "v1beta2" },
  ]);

  try {
    writeSiteData(outputPath, siteData);

    const writtenData = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    assert.deepEqual(writtenData, siteData);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

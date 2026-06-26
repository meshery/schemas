const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  DEFAULT_OUTPUT_RELATIVE_PATH,
  buildSiteData,
  parseLatestConstructs,
  resolveConstructAudience,
  resolveOutputPath,
  resolveSchemaHref,
  writeSiteData,
} = require("../build/generate-site-data");

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

test("resolveConstructAudience reuses x-internal filtering to classify constructs", () => {
  withTempRepo({
    "schemas/constructs/v1/test-construct/api.yml": `paths:
  /core:
    get:
      x-internal:
        - meshery
  /extension:
    get:
      x-internal:
        - cloud
`,
  }, (tempRepoRoot) => {
    assert.deepEqual(resolveConstructAudience(tempRepoRoot, "v1", "test-construct"), {
      isCore: true,
      isExtension: true,
    });
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

test("buildSiteData returns Jekyll-friendly schema rows", () => {
  withTempRepo({
    "schemas/constructs/v1/academy/academy.yaml": "",
    "schemas/constructs/v1/academy/api.yml": `paths:
  /academy:
    get:
      x-internal:
        - cloud
`,
    "schemas/constructs/v2/core/api.yml": `paths:
  /core:
    get:
      x-internal:
        - meshery
`,
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
        isCore: false,
        isExtension: true,
      },
      {
        construct: "core",
        version: "v2",
        href: "/schemas/constructs/v2/core/api.yml",
        isCore: true,
        isExtension: false,
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

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  DEFAULT_OUTPUT_RELATIVE_PATH,
  buildSiteData,
  collectXInternalTags,
  loadExistingDocsHrefs,
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

test("collectXInternalTags resolves $ref path items under paths", () => {
  const apiWithRef = [
    "paths:",
    "  /api/things:",
    "    $ref: \"./thing_operations.yml#/collection\"",
    "",
  ].join("\n");

  const operations = [
    "collection:",
    "  get:",
    "    x-internal: [\"cloud\"]",
    "    operationId: listThings",
    "",
  ].join("\n");

  withTempRepo({
    "schemas/constructs/v1/thing/api.yml": apiWithRef,
    "schemas/constructs/v1/thing/thing_operations.yml": operations,
  }, (tempRepoRoot) => {
    const tags = collectXInternalTags(tempRepoRoot, "v1", "thing");
    assert.deepEqual([...tags], ["cloud"]);
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

test("loadExistingDocsHrefs returns empty object when file does not exist", () => {
  assert.deepEqual(loadExistingDocsHrefs("/nonexistent/path.json"), {});
});

test("loadExistingDocsHrefs extracts docs_href entries keyed by construct", () => {
  const existing = [
    { construct: "component", version: "v1beta3", href: "/schemas/constructs/v1beta3/component/component.yaml", docs_href: "https://docs.meshery.io/concepts/logical/components", core: false, extension: false },
    { construct: "connection", version: "v1beta3", href: "/schemas/constructs/v1beta3/connection/connection.yaml", docs_href: "https://docs.meshery.io/concepts/logical/connections", core: true, extension: true },
    { construct: "academy",   version: "v1beta3", href: "/schemas/constructs/v1beta3/academy/academy.yaml", core: false, extension: true },
  ];

  withTempRepo({ "data.json": JSON.stringify(existing) }, (tempDir) => {
    assert.deepEqual(loadExistingDocsHrefs(path.join(tempDir, "data.json")), {
      component: "https://docs.meshery.io/concepts/logical/components",
      connection: "https://docs.meshery.io/concepts/logical/connections",
    });
  });
});

test("loadExistingDocsHrefs throws when file contains invalid JSON", () => {
  withTempRepo({ "data.json": "not valid json" }, (tempDir) => {
    assert.throws(
      () => loadExistingDocsHrefs(path.join(tempDir, "data.json")),
      /Failed to load existing docs hrefs/,
    );
  });
});

test("loadExistingDocsHrefs throws when file contains a non-array", () => {
  withTempRepo({ "data.json": JSON.stringify({ construct: "component" }) }, (tempDir) => {
    assert.throws(
      () => loadExistingDocsHrefs(path.join(tempDir, "data.json")),
      /Failed to load existing docs hrefs/,
    );
  });
});

test("buildSiteData includes docs_href when provided", () => {
  withTempRepo({
    "schemas/constructs/v1/component/component.yaml": "",
    "schemas/constructs/v1/component/api.yml": API_CLOUD_ONLY,
  }, (tempRepoRoot) => {
    const siteData = buildSiteData(
      tempRepoRoot,
      [{ construct: "component", version: "v1" }],
      { component: "https://docs.meshery.io/concepts/logical/components" }
    );

    assert.deepEqual(siteData, [
      {
        construct: "component",
        version: "v1",
        href: "/schemas/constructs/v1/component/component.yaml",
        docs_href: "https://docs.meshery.io/concepts/logical/components",
        core: false,
        extension: true,
      },
    ]);
  });
});

test("buildSiteData omits docs_href when not in map", () => {
  withTempRepo({
    "schemas/constructs/v1/academy/academy.yaml": "",
    "schemas/constructs/v1/academy/api.yml": API_NO_OPERATIONS,
  }, (tempRepoRoot) => {
    const siteData = buildSiteData(
      tempRepoRoot,
      [{ construct: "academy", version: "v1" }],
      {}
    );

    assert.equal("docs_href" in siteData[0], false);
  });
});

test("docs_href values survive a full regeneration cycle", () => {
  withTempRepo({
    "schemas/constructs/v1/component/component.yaml": "",
    "schemas/constructs/v1/component/api.yml": API_CLOUD_ONLY,
    "schemas/constructs/v1/academy/academy.yaml": "",
    "schemas/constructs/v1/academy/api.yml": API_NO_OPERATIONS,
  }, (tempRepoRoot) => {
    const outputPath = path.join(tempRepoRoot, "data.json");

    // Simulate the committed file with docs_href on component only
    const initial = [
      { construct: "component", version: "v1", href: "/schemas/constructs/v1/component/component.yaml", docs_href: "https://docs.meshery.io/concepts/logical/components", core: false, extension: true },
      { construct: "academy",   version: "v1", href: "/schemas/constructs/v1/academy/academy.yaml", core: false, extension: false },
    ];
    fs.writeFileSync(outputPath, JSON.stringify(initial));

    // Simulate what CI does: read existing docs_href, regenerate, write
    const docsHrefs = loadExistingDocsHrefs(outputPath);
    const regenerated = buildSiteData(
      tempRepoRoot,
      [{ construct: "component", version: "v1" }, { construct: "academy", version: "v1" }],
      docsHrefs
    );
    writeSiteData(outputPath, regenerated);

    const result = JSON.parse(fs.readFileSync(outputPath, "utf8"));
    assert.equal(result.find((e) => e.construct === "component").docs_href, "https://docs.meshery.io/concepts/logical/components");
    assert.equal("docs_href" in result.find((e) => e.construct === "academy"), false);
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

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const {
  DEFAULT_OUTPUT_RELATIVE_PATH,
  buildSiteData,
  loadLatestConstructs,
  parseLatestConstructs,
  resolveOutputPath,
  resolveSchemaHref,
  writeSiteData,
} = require("../build/generate-site-data");

const repoRoot = path.resolve(__dirname, "..");

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
  const latestConstructs = loadLatestConstructs(repoRoot);
  const academy = latestConstructs.find((schema) => schema.construct === "academy");

  assert.ok(academy);
  assert.equal(
    resolveSchemaHref(repoRoot, academy.version, academy.construct),
    `/schemas/constructs/${academy.version}/academy/academy.yaml`,
  );
});

test("resolveSchemaHref falls back to api.yml when there is no construct schema file", () => {
  const latestConstructs = loadLatestConstructs(repoRoot);
  const core = latestConstructs.find((schema) => schema.construct === "core");

  assert.ok(core);
  assert.equal(
    resolveSchemaHref(repoRoot, core.version, core.construct),
    `/schemas/constructs/${core.version}/core/api.yml`,
  );
});

test("buildSiteData returns Jekyll-friendly schema rows", () => {
  const siteData = buildSiteData(repoRoot, [
    { construct: "academy", version: "v1beta3" },
    { construct: "core", version: "v1beta2" },
  ]);

  assert.deepEqual(siteData, [
    {
      construct: "academy",
      version: "v1beta3",
      href: "/schemas/constructs/v1beta3/academy/academy.yaml",
    },
    {
      construct: "core",
      version: "v1beta2",
      href: "/schemas/constructs/v1beta2/core/api.yml",
    },
  ]);
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

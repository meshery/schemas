#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const paths = require("./lib/paths");

const DEFAULT_OUTPUT_RELATIVE_PATH = path.join("_data", "latest_schema_versions.json");

function resolveOutputPath(argv = process.argv.slice(2), repoRoot = paths.getProjectRoot()) {
  const outputFlagIndex = argv.indexOf("--output");
  if (outputFlagIndex === -1) {
    return path.join(repoRoot, DEFAULT_OUTPUT_RELATIVE_PATH);
  }

  const requestedPath = argv[outputFlagIndex + 1];
  if (!requestedPath) {
    throw new Error("Missing path after --output");
  }

  return path.resolve(repoRoot, requestedPath);
}

function parseLatestConstructs(output) {
  return output
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\S+)\s+(\S+)$/);
      if (!match) {
        throw new Error(`Unexpected line from make schemas-versions-latest: ${line}`);
      }

      const [, construct, version] = match;
      return { construct, version };
    });
}

function loadLatestConstructs(repoRoot) {
  const output = execFileSync("make", ["schemas-versions-latest"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  return parseLatestConstructs(output);
}

function resolveSchemaHref(repoRoot, version, construct) {
  const constructDir = path.join(repoRoot, "schemas", "constructs", version, construct);
  if (!fs.existsSync(constructDir)) {
    throw new Error(`Missing construct directory: ${constructDir}`);
  }

  const expectedNames = [`${construct}.yaml`, `${construct}.yml`];
  for (const fileName of expectedNames) {
    const filePath = path.join(constructDir, fileName);
    if (fs.existsSync(filePath)) {
      return path.posix.join("/schemas/constructs", version, construct, fileName);
    }
  }

  const fallback = fs
    .readdirSync(constructDir)
    .filter((entry) => (entry.endsWith(".yaml") || entry.endsWith(".yml")) && entry !== "api.yml")
    .sort()[0];

  const fileName = fallback || "api.yml";
  return path.posix.join("/schemas/constructs", version, construct, fileName);
}

function buildSiteData(repoRoot, constructs) {
  return constructs.map(({ construct, version }) => ({
    construct,
    version,
    href: resolveSchemaHref(repoRoot, version, construct),
  }));
}

function writeSiteData(outputPath, siteData) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(siteData, null, 2)}\n`);
}

function main(argv = process.argv.slice(2)) {
  const repoRoot = paths.getProjectRoot();
  const outputPath = resolveOutputPath(argv, repoRoot);
  const constructs = loadLatestConstructs(repoRoot);
  const siteData = buildSiteData(repoRoot, constructs);

  writeSiteData(outputPath, siteData);
  process.stdout.write(`Wrote ${path.relative(repoRoot, outputPath)}\n`);
}

if (require.main === module) {
  main();
}

module.exports = {
  DEFAULT_OUTPUT_RELATIVE_PATH,
  buildSiteData,
  loadLatestConstructs,
  main,
  parseLatestConstructs,
  resolveOutputPath,
  resolveSchemaHref,
  writeSiteData,
};

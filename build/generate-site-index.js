#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const githubBlobBase = "https://github.com/meshery/schemas/blob/master";

function resolveOutputPath() {
  const outputFlagIndex = process.argv.indexOf("--output");
  if (outputFlagIndex === -1) {
    return path.join(repoRoot, "index.html");
  }

  const requestedPath = process.argv[outputFlagIndex + 1];
  if (!requestedPath) {
    throw new Error("Missing path after --output");
  }

  return path.resolve(repoRoot, requestedPath);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function latestConstructs() {
  const output = execFileSync("make", ["schemas-versions-latest"], {
    cwd: repoRoot,
    encoding: "utf8",
  });

  return output
    .trim()
    .split("\n")
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

function schemaPath(version, construct) {
  const constructDir = path.join(repoRoot, "schemas", "constructs", version, construct);
  const expectedNames = [`${construct}.yaml`, `${construct}.yml`];

  for (const name of expectedNames) {
    const filePath = path.join(constructDir, name);
    if (fs.existsSync(filePath)) {
      return `schemas/constructs/${version}/${construct}/${name}`;
    }
  }

  const fallback = fs
    .readdirSync(constructDir)
    .filter((entry) => (entry.endsWith(".yaml") || entry.endsWith(".yml")) && entry !== "api.yml")
    .sort()[0];

  const fileName = fallback || "api.yml";
  return `schemas/constructs/${version}/${construct}/${fileName}`;
}

function githubBlobUrl(relativePath) {
  return `${githubBlobBase}/${relativePath}`;
}

function renderSchemaLines(constructs) {
  const longestConstructName = constructs.length > 0 ? Math.max(...constructs.map(({ construct }) => construct.length)) : 0;

  return constructs
    .map(({ construct, version }) => {
      const paddedConstruct = construct.padEnd(longestConstructName + 2, " ");
      const latestHref = githubBlobUrl(schemaPath(version, construct));

      return `${escapeHtml(paddedConstruct)}<a href="${escapeHtml(latestHref)}">${escapeHtml(version)}</a>`;
    })
    .join("\n");
}

function renderPage(constructs) {
  const schemaLines = renderSchemaLines(constructs);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Meshery Schemas</title>
    <meta
      name="description"
      content="Latest Meshery schema resource versions."
    >
  </head>
  <body>
    <main>
      <h1>Meshery Schemas</h1>
      <p>Latest schema version for each Meshery resource.</p>
      <pre>
${schemaLines}
      </pre>
      <p><a href="https://docs.meshery.io/project/contributing/contributing-schemas/">Meshery schemas documentation</a></p>
    </main>
  </body>
</html>
`;
}

const outputPath = resolveOutputPath();
const html = renderPage(latestConstructs());
fs.writeFileSync(outputPath, html);
process.stdout.write(`Wrote ${path.relative(repoRoot, outputPath)}\n`);

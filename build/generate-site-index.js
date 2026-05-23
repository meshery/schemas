#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const yaml = require("js-yaml");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const githubBlobBase = "https://github.com/meshery/schemas/blob/master";
const restEndpointsBase = "https://docs.meshery.io/reference/rest-apis/endpoints/";
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

const GUIDE_LINKS = {
  schemas: {
    label: "Schemas guide",
    url: "https://docs.meshery.io/project/contributing/contributing-schemas",
  },
  models: {
    label: "Models guide",
    url: "https://docs.meshery.io/project/contributing/contributing-models",
  },
  components: {
    label: "Components guide",
    url: "https://docs.meshery.io/project/contributing/contributing-components",
  },
  relationships: {
    label: "Relationships guide",
    url: "https://docs.meshery.io/project/contributing/contributing-relationships",
  },
  uiSchemas: {
    label: "UI schemas guide",
    url: "https://docs.meshery.io/project/contributing/contributing-ui-schemas/",
  },
};

const GUIDE_BY_CONSTRUCT = {
  badge: GUIDE_LINKS.models,
  capability: GUIDE_LINKS.models,
  catalog: GUIDE_LINKS.models,
  catalog_data: GUIDE_LINKS.models,
  category: GUIDE_LINKS.models,
  component: GUIDE_LINKS.components,
  model: GUIDE_LINKS.models,
  relationship: GUIDE_LINKS.relationships,
  selector: GUIDE_LINKS.models,
  subcategory: GUIDE_LINKS.models,
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function titleCase(value) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function githubBlobUrl(relativePath) {
  return `${githubBlobBase}/${relativePath}`;
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

function findSchemaFile(version, construct) {
  const constructDir = path.join(repoRoot, "schemas", "constructs", version, construct);
  const expectedNames = [`${construct}.yaml`, `${construct}.yml`];

  for (const name of expectedNames) {
    const filePath = path.join(constructDir, name);
    if (fs.existsSync(filePath)) {
      return name;
    }
  }

  const fallback = fs
    .readdirSync(constructDir)
    .filter((entry) => (entry.endsWith(".yaml") || entry.endsWith(".yml")) && entry !== "api.yml")
    .sort()[0];

  return fallback || null;
}

function findApiPaths(version, construct) {
  const apiPath = path.join(repoRoot, "schemas", "constructs", version, construct, "api.yml");
  const content = fs.readFileSync(apiPath, "utf8");
  const parsed = yaml.load(content);
  return Object.keys((parsed && parsed.paths) || {}).filter((entry) => entry.startsWith("/api/"));
}

function constructKeywords(construct) {
  const keywords = new Set([construct, construct.replaceAll("_", "")]);

  if (construct.endsWith("y")) {
    keywords.add(`${construct.slice(0, -1)}ies`);
  } else {
    keywords.add(`${construct}s`);
  }

  if (construct.includes("_")) {
    for (const part of construct.split("_")) {
      keywords.add(part);
      if (part.endsWith("y")) {
        keywords.add(`${part.slice(0, -1)}ies`);
      } else {
        keywords.add(`${part}s`);
      }
    }
  }

  if (construct === "design") {
    keywords.add("pattern");
    keywords.add("designs");
    keywords.add("patterns");
  }

  if (construct === "performance_profile") {
    keywords.add("perf");
    keywords.add("profile");
    keywords.add("profiles");
  }

  return [...keywords];
}

function primaryApiPath(version, construct) {
  const paths = findApiPaths(version, construct);
  if (paths.length === 0) {
    return null;
  }

  const keywords = constructKeywords(construct);

  return paths.sort((left, right) => {
    const normalizedLeft = left.replace(/\{[^}]+\}/g, "");
    const normalizedRight = right.replace(/\{[^}]+\}/g, "");
    const leftScore = keywords.filter((keyword) => normalizedLeft.includes(keyword)).length;
    const rightScore = keywords.filter((keyword) => normalizedRight.includes(keyword)).length;

    if (leftScore !== rightScore) {
      return rightScore - leftScore;
    }

    const segmentDelta = normalizedLeft.split("/").length - normalizedRight.split("/").length;

    if (segmentDelta !== 0) {
      return segmentDelta;
    }

    return normalizedLeft.localeCompare(normalizedRight);
  })[0];
}

function endpointAnchor(pathValue) {
  return pathValue.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function endpointDocsUrl(pathValue) {
  return `${restEndpointsBase}#${endpointAnchor(pathValue)}`;
}

function renderRows(constructs) {
  return constructs
    .map(({ construct, version }) => {
      const schemaFile = findSchemaFile(version, construct);
      const operationPath = primaryApiPath(version, construct);
      const apiPath = `schemas/constructs/${version}/${construct}/api.yml`;
      const apiHref = githubBlobUrl(apiPath);
      const schemaHref = schemaFile ? githubBlobUrl(`schemas/constructs/${version}/${construct}/${schemaFile}`) : null;
      const guide = GUIDE_BY_CONSTRUCT[construct] || GUIDE_LINKS.schemas;
      const operationsHref = operationPath ? endpointDocsUrl(operationPath) : null;

      return `        <tr>
          <td><a href="${escapeHtml(guide.url)}">${escapeHtml(titleCase(construct))}</a></td>
          <td><a href="${escapeHtml(apiHref)}">${escapeHtml(version)}</a></td>
          <td>${schemaHref ? `<a href="${escapeHtml(schemaHref)}">${escapeHtml(schemaFile)}</a>` : "n/a"}</td>
          <td>${operationsHref ? `<a href="${escapeHtml(operationsHref)}">${escapeHtml(operationPath)}</a>` : "n/a"}</td>
        </tr>`;
    })
    .join("\n");
}

function renderPage(constructs) {
  const rows = renderRows(constructs);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Meshery Schemas</title>
    <meta
      name="description"
      content="Latest Meshery schema constructs, their latest API versions, and links to the canonical contributor guides."
    >
    <style>
      :root {
        color-scheme: light;
        --sistent-green: #00b39f;
        --sistent-green-dark: #0b7f73;
        --sistent-ink: #293237;
        --sistent-slate: #3c494f;
        --sistent-line: #c6d2d8;
      }

      body {
        margin: 24px;
        font: 16px/1.5 Arial, Helvetica, sans-serif;
        color: var(--sistent-ink);
        background: #fff;
      }

      main {
        max-width: 1100px;
      }

      h2 {
        margin-top: 28px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
      }

      th,
      td {
        padding: 8px;
        border: 1px solid var(--sistent-line);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: #eef8f6;
      }

      a {
        color: var(--sistent-green-dark);
      }

      @media (max-width: 720px) {
        body {
          margin: 12px;
          font-size: 14px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <h1 style="color: var(--sistent-slate);">Meshery Schemas</h1>
      <p>Latest construct versions, schema links, and Meshery Docs contribution guides.</p>

      <h2 id="contributor-guides">Contributor Guides</h2>
      <ul>
          <li><a href="${escapeHtml(GUIDE_LINKS.schemas.url)}">${escapeHtml(GUIDE_LINKS.schemas.label)}</a></li>
          <li><a href="${escapeHtml(GUIDE_LINKS.models.url)}">${escapeHtml(GUIDE_LINKS.models.label)}</a></li>
          <li><a href="${escapeHtml(GUIDE_LINKS.components.url)}">${escapeHtml(GUIDE_LINKS.components.label)}</a></li>
          <li><a href="${escapeHtml(GUIDE_LINKS.relationships.url)}">${escapeHtml(GUIDE_LINKS.relationships.label)}</a></li>
          <li><a href="${escapeHtml(GUIDE_LINKS.uiSchemas.url)}">${escapeHtml(GUIDE_LINKS.uiSchemas.label)}</a></li>
      </ul>

      <h2 id="latest-constructs">Latest Construct Versions</h2>
      <p>Resource links open Meshery Docs guides. Version and construct links open GitHub. Operations links open Meshery REST API reference.</p>
      <table>
        <thead>
          <tr>
            <th>Resource</th>
            <th>Latest version</th>
            <th>Construct</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
${rows}
        </tbody>
      </table>
    </main>
  </body>
</html>
`;
}

const outputPath = resolveOutputPath();
const html = renderPage(latestConstructs());
fs.writeFileSync(outputPath, html);
process.stdout.write(`Wrote ${path.relative(repoRoot, outputPath)}\n`);

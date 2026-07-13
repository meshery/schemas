#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const yaml = require("js-yaml");

const paths = require("./lib/paths");

const DEFAULT_OUTPUT_RELATIVE_PATH = path.join("site", "_data", "latest_schema_versions.json");

// OpenAPI operation keys whose `x-internal` arrays classify a construct.
const OPENAPI_OPERATION_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "patch",
  "head",
  "options",
  "trace",
];

// `x-internal` tags map to a consumer-facing classification:
//   "meshery" -> Core      (operations bundled into meshery_openapi.yml)
//   "cloud"   -> Extension (operations bundled into cloud_openapi.yml)
const X_INTERNAL_CORE = "meshery";
const X_INTERNAL_EXTENSION = "cloud";

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
  const output = execFileSync("make", ["--no-print-directory", "schemas-versions-latest"], {
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
  const filePath = path.join(constructDir, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`No valid schema file found in ${constructDir}`);
  }

  return path.posix.join("/schemas/constructs", version, construct, fileName);
}

function collectXInternalTags(repoRoot, version, construct) {
  const apiPath = path.join(repoRoot, "schemas", "constructs", version, construct, "api.yml");
  if (!fs.existsSync(apiPath)) {
    return new Set();
  }

  let doc;
  try {
    doc = yaml.load(fs.readFileSync(apiPath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to parse ${apiPath}: ${error.message}`);
  }

  const tags = new Set();
  const pathItems = (doc && doc.paths) || {};

  // Check top-level x-internal and info.x-internal
  const addTags = (val) => {
    if (Array.isArray(val)) {
      for (const tag of val) {
        tags.add(tag);
      }
    } else if (typeof val === "string") {
      tags.add(val);
    }
  };
  
  if (doc) {
    if (doc.info) {
      addTags(doc.info["x-internal"]);
    }
  }

  const resolvePathItem = (pathItem) => {
    const ref = pathItem && typeof pathItem === "object" ? pathItem.$ref : undefined;
    if (typeof ref !== "string") {
      return pathItem;
    }

    const [refFile, refPointer = ""] = ref.split("#");
    if (!refFile) {
      return undefined;
    }

    const refPath = path.resolve(path.dirname(apiPath), refFile);
    let refDoc;
    try {
      refDoc = yaml.load(fs.readFileSync(refPath, "utf8"));
    } catch (error) {
      throw new Error(`Failed to parse ${refPath}: ${error.message}`);
    }

    if (!refPointer) {
      return refDoc;
    }

    const segments = refPointer.replace(/^\/+/, "").split("/").filter(Boolean);
    let node = refDoc;
    for (const segment of segments) {
      const key = segment.replace(/~1/g, "/").replace(/~0/g, "~");
      node = node && typeof node === "object" ? node[key] : undefined;
    }

    return node;
  };

  for (const rawPathItem of Object.values(pathItems)) {
    const pathItem = resolvePathItem(rawPathItem);
    if (!pathItem || typeof pathItem !== "object") {
      continue;
    }

    for (const method of OPENAPI_OPERATION_METHODS) {
      const operation = pathItem[method];
      const xInternal = operation && operation["x-internal"];
      if (Array.isArray(xInternal)) {
        for (const tag of xInternal) {
          tags.add(tag);
        }
      }
    }
  }

  return tags;
}

// A construct is classified by the union of `x-internal` tags across all of its
// operations: any "meshery" operation makes it Core, any "cloud" operation makes
// it an Extension. A construct can be both (shared APIs) or neither (schema-only
// definitions with no operations).
function resolveConstructClassification(repoRoot, version, construct) {
  const tags = collectXInternalTags(repoRoot, version, construct);
  return {
    core: tags.has(X_INTERNAL_CORE),
    extension: tags.has(X_INTERNAL_EXTENSION),
  };
}

function buildSiteData(repoRoot, constructs) {
  return constructs.map(({ construct, version }) => ({
    construct,
    version,
    href: resolveSchemaHref(repoRoot, version, construct),
    ...resolveConstructClassification(repoRoot, version, construct),
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
  collectXInternalTags,
  loadLatestConstructs,
  main,
  parseLatestConstructs,
  resolveConstructClassification,
  resolveOutputPath,
  resolveSchemaHref,
  writeSiteData,
};

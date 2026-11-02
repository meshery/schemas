#!/usr/bin/env node
/**
 * bundle-openapi.js - OpenAPI Schema Bundling and Merging Script
 *
 * DESCRIPTION:
 *   Bundles individual OpenAPI YAML schemas into merged JSON files and creates
 *   unified API specifications for cloud and meshery consumers. This script
 *   prepares the _openapi_build/ directory that other scripts depend on.
 *
 *   Schemas are discovered dynamically by walking the schemas/constructs directory
 *   and looking for directories containing an api.yml file (the index file for each construct).
 *
 * WHAT IT DOES:
 *   1. Discovers all schema packages by walking schemas/constructs/
 *   2. Bundles individual OpenAPI YAML schemas into dereferenced JSON files
 *   3. Merges eligible construct OpenAPI specs into a unified merged_openapi.yml
 *   4. Filters merged specs by x-internal tag to create cloud_openapi.yml and meshery_openapi.yml
 *
 * USAGE:
 *   node build/bundle-openapi.js
 *
 * OUTPUT:
 *   - _openapi_build/constructs/<version>/<package>/merged-openapi.json
 *   - _openapi_build/merged_openapi.yml
 *   - _openapi_build/cloud_openapi.yml
 *   - _openapi_build/meshery_openapi.yml
 */

const fs = require("fs");
const path = require("path");
const $RefParser = require("@apidevtools/json-schema-ref-parser");
const yaml = require("js-yaml");
const { execSync } = require("child_process");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");

function toPrefix(title) {
  return String(title || "").trim().replace(/\s+/g, "_");
}

function prefixComponentRef(ref, prefix) {
  return typeof ref === "string"
    ? ref.replace(
        /^#\/components\/([^/]+)\/([^/]+)$/,
        (_, section, name) => `#/components/${section}/${prefix}_${name}`,
      )
    : ref;
}

function prefixSecurityRequirement(requirement, prefix) {
  if (!requirement || typeof requirement !== "object" || Array.isArray(requirement)) {
    return requirement;
  }

  return Object.fromEntries(
    Object.entries(requirement).map(([name, value]) => [`${prefix}_${name}`, value]),
  );
}

function prefixTags(tags, prefix) {
  if (!Array.isArray(tags)) {
    return tags;
  }

  return tags.map((tag) => {
    if (typeof tag === "string") {
      return `${prefix}_${tag}`;
    }

    if (tag && typeof tag === "object") {
      return { ...tag, name: `${prefix}_${tag.name}` };
    }

    return tag;
  });
}

function prefixInternalReferences(value, prefix) {
  if (Array.isArray(value)) {
    return value.map((item) => prefixInternalReferences(item, prefix));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, currentValue]) => {
      if (key === "$ref" && typeof currentValue === "string") {
        return [key, prefixComponentRef(currentValue, prefix)];
      }

      if (key === "tags") {
        return [key, prefixTags(currentValue, prefix)];
      }

      if (key === "security" && Array.isArray(currentValue)) {
        return [
          key,
          currentValue.map((requirement) => prefixSecurityRequirement(requirement, prefix)),
        ];
      }

      return [key, prefixInternalReferences(currentValue, prefix)];
    }),
  );
}

function prefixComponents(components, prefix) {
  if (!components || typeof components !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(components).map(([section, definitions]) => [
      section,
      Object.fromEntries(
        Object.entries(definitions || {}).map(([name, value]) => [`${prefix}_${name}`, value]),
      ),
    ]),
  );
}

function mergeComponentMaps(baseComponents, incomingComponents) {
  for (const [section, definitions] of Object.entries(incomingComponents || {})) {
    const currentSection = (baseComponents[section] ??= {});

    for (const [name, value] of Object.entries(definitions || {})) {
      currentSection[name] = value;
    }
  }
}

/**
 * Route ownership across construct versions.
 *
 * Every version of a construct is merged into one cloud spec, so a route that a
 * newer version moves can be declared twice. The newer operation names the
 * version it replaces with the `x-supersedes` operation extension (for example
 * `x-supersedes: v1beta2`), and the merge keeps that declaration. The collision
 * resolves only when both declarations belong to the same construct (same
 * title), the owner names exactly the other's version and is newer than it, the
 * superseded declaration carries no `x-supersedes` (ownership does not chain),
 * and the operationIds match. Any other duplicate throws. The result does not
 * depend on merge order.
 */
const SUPERSEDES_EXTENSION = "x-supersedes";
const MERGE_ORIGIN = Symbol("mergeOrigin");
const VERSION_PATTERN = /^v(\d+)(alpha|beta)(\d+)$/;
const STABILITY_RANK = { alpha: 0, beta: 1 };

function versionRank(version) {
  const match = VERSION_PATTERN.exec(String(version || ""));
  if (!match) {
    return null;
  }
  return [Number(match[1]), STABILITY_RANK[match[2]], Number(match[3])];
}

function isNewerVersion(version, other) {
  const rank = versionRank(version);
  const otherRank = versionRank(other);
  if (!rank || !otherRank) {
    return false;
  }
  for (let i = 0; i < rank.length; i += 1) {
    if (rank[i] !== otherRank[i]) {
      return rank[i] > otherRank[i];
    }
  }
  return false;
}

// Origin metadata lives on a non-enumerable symbol so YAML and JSON output and
// deep equality checks never see it.
function attachMergeOrigin(operation, origin) {
  if (operation && typeof operation === "object" && !Array.isArray(operation)) {
    Object.defineProperty(operation, MERGE_ORIGIN, { value: origin, configurable: true });
  }
  return operation;
}

function mergeOriginOf(operation) {
  return operation && typeof operation === "object" ? operation[MERGE_ORIGIN] : undefined;
}

function declareOperation(route, method, operation, origin) {
  const supersedes = operation?.[SUPERSEDES_EXTENSION];
  if (supersedes !== undefined && typeof supersedes !== "string") {
    throw new Error(`${SUPERSEDES_EXTENSION} on ${route} ${method} must be a version string`);
  }
  return attachMergeOrigin(operation, {
    prefix: origin.prefix,
    version: origin.version,
    operationId: operation?.operationId,
    supersedes,
  });
}

/**
 * Decide which of two declarations of one route and method keeps the route.
 * Returns "existing" or "incoming", or throws the duplicate error.
 */
function resolveRouteOwner(route, method, existing, incoming) {
  const fail = (reason) => {
    throw new Error(
      `Duplicate path operation during merge: ${route} ${method}${reason ? ` (${reason})` : ""}`,
    );
  };
  const current = mergeOriginOf(existing);
  const next = mergeOriginOf(incoming);
  if (!current || !next || current.prefix !== next.prefix || current.version === next.version) {
    fail();
  }
  if (!current.operationId || current.operationId !== next.operationId) {
    fail("operationIds differ");
  }

  const ownerOf = (owner, superseded) => {
    if (owner.supersedes !== superseded.version) {
      return false;
    }
    if (superseded.supersedes !== undefined) {
      fail(`ownership does not chain: ${superseded.version} carries ${SUPERSEDES_EXTENSION}`);
    }
    if (!isNewerVersion(owner.version, superseded.version)) {
      fail(`${owner.version} is not newer than ${superseded.version}`);
    }
    return true;
  };

  if (ownerOf(next, current)) {
    return "incoming";
  }
  if (ownerOf(current, next)) {
    return "existing";
  }
  if (current.supersedes !== undefined || next.supersedes !== undefined) {
    fail(`${SUPERSEDES_EXTENSION} does not name the other declaration's version`);
  }
  fail();
}

function mergePaths(basePaths, incomingPaths, origin) {
  for (const [route, pathItem] of Object.entries(incomingPaths || {})) {
    const currentPath = (basePaths[route] ??= {});

    for (const [method, operation] of Object.entries(pathItem || {})) {
      const declared = declareOperation(route, method, operation, origin);

      if (!Object.prototype.hasOwnProperty.call(currentPath, method)) {
        currentPath[method] = declared;
        continue;
      }

      if (resolveRouteOwner(route, method, currentPath[method], declared) === "incoming") {
        currentPath[method] = declared;
      }
    }
  }
}

function mergeTags(baseTags, incomingTags) {
  const seen = new Set(baseTags.map((tag) => tag.name));

  for (const tag of incomingTags || []) {
    if (!tag?.name || seen.has(tag.name)) {
      continue;
    }

    baseTags.push(tag);
    seen.add(tag.name);
  }
}

function mergeOpenapiSpec(baseSpec, specToMerge) {
  const prefix = toPrefix(specToMerge?.info?.title);
  if (!prefix) {
    throw new Error("Cannot merge OpenAPI spec without info.title");
  }

  const origin = { prefix, version: specToMerge?.info?.version };
  const normalizedSpec = prefixInternalReferences(specToMerge, prefix);

  mergeTags(baseSpec.tags ?? (baseSpec.tags = []), normalizedSpec.tags || []);
  mergePaths(baseSpec.paths ?? (baseSpec.paths = {}), normalizedSpec.paths || {}, origin);
  mergeComponentMaps(
    baseSpec.components ?? (baseSpec.components = {}),
    prefixComponents(normalizedSpec.components, prefix),
  );

  return baseSpec;
}

async function dereferenceOpenapiSpec(inputPath) {
  return $RefParser.dereference(inputPath);
}

/**
 * Bundle a single OpenAPI schema
 * @param {Object} pkg - Package definition
 * @returns {Promise<void>}
 */
async function bundleSchema(pkg) {
  const inputPath = paths.fromRoot(config.getInputSchemaPath(pkg));
  const outputPath = paths.fromRoot(config.getBundledOutputPath(pkg));

  // Verify input exists
  if (!paths.fileExists(inputPath)) {
    throw new Error(`Schema not found: ${inputPath}`);
  }

  // Ensure output directory exists
  paths.ensureParentDir(outputPath);

  logger.step(`Bundling: ${pkg.name} (${pkg.version})...`);

  const dereferencedSpec = await dereferenceOpenapiSpec(inputPath);
  fs.writeFileSync(outputPath, `${JSON.stringify(dereferencedSpec, null, 2)}\n`, "utf-8");

  logger.success(`Bundled: ${paths.relativePath(outputPath)}`);
}

/**
 * Merge all bundled schemas into a single OpenAPI spec
 * @returns {Promise<void>}
 */
async function mergeSchemas() {
  logger.header("🔗 Merging OpenAPI specifications...");

  const baseSpec = paths.fromRoot(config.paths.baseCloudSpec);
  const outputPath = paths.fromRoot(config.paths.mergedOpenapi);

  // Get packages to merge (dynamically discovered, excluding those in excludeFromMerge)
  const mergePackages = config.getMergePackages();

  if (mergePackages.length === 0) {
    logger.warn("No packages found to merge!");
    return;
  }

  logger.info(`Merging ${mergePackages.length} packages...`);

  // Build list of bundled specs to merge
  const specsToMerge = mergePackages.map((pkg) =>
    paths.fromRoot(config.getBundledOutputPath(pkg)),
  );

  // Verify all specs exist
  for (const spec of specsToMerge) {
    if (!paths.fileExists(spec)) {
      throw new Error(`Bundled spec not found: ${spec}. Run bundling first.`);
    }
  }

  paths.ensureParentDir(outputPath);

  const mergedSpec = yaml.load(fs.readFileSync(baseSpec, "utf-8"));

  for (const spec of specsToMerge) {
    const specDocument = JSON.parse(fs.readFileSync(spec, "utf-8"));
    mergeOpenapiSpec(mergedSpec, specDocument);
  }

  fs.writeFileSync(outputPath, yaml.dump(mergedSpec, { noRefs: true, lineWidth: 120 }), "utf-8");

  logger.success(`Created: ${paths.relativePath(outputPath)}`);
}

/**
 * Filter the merged OpenAPI spec by x-internal tag
 * @param {string} tag - Tag to filter by
 * @param {string} outputFile - Output filename
 * @returns {Promise<void>}
 */
async function filterByTag(tag, outputFile, baseSpec) {
  const inputPath = paths.fromRoot(config.paths.mergedOpenapi);
  const outputPath = paths.fromRoot(outputFile);
  const baseSpecPath = baseSpec ? paths.fromRoot(baseSpec) : undefined;

  // Use the existing filterOpenapiByTag.js script
  const filterScript = paths.fromRoot("build/filterOpenapiByTag.js");

  const args = ['"' + filterScript + '"', '"' + inputPath + '"', '"' + outputPath + '"', '"' + tag + '"'];
  if (baseSpecPath) {
    args.push(`"${baseSpecPath}"`);
  }

  execSync(`node ${args.join(" ")}`, {
    stdio: "inherit",
  });
}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now();

  try {
    // Change to project root
    process.chdir(paths.getProjectRoot());

    logger.header("📦 Starting OpenAPI bundling...");

    // Discover and display packages
    const schemaPackages = config.getSchemaPackages();
    logger.info(`Discovered ${schemaPackages.length} schema packages`);

    if (schemaPackages.length === 0) {
      logger.error("No schema packages found!");
      process.exit(1);
    }

    // Bundle all schemas
    for (const pkg of schemaPackages) {
      await bundleSchema(pkg);
    }

    // Merge schemas
    await mergeSchemas();

    // Filter by tags
    logger.header("🔍 Filtering OpenAPI by x-internal tags...");

    await filterByTag("cloud", config.paths.cloudOpenapi, config.paths.baseCloudSpec);
    logger.success(`Created: ${config.paths.cloudOpenapi}`);

    await filterByTag("meshery", config.paths.mesheryOpenapi, config.paths.baseMesherySpec);
    logger.success(`Created: ${config.paths.mesheryOpenapi}`);

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`OpenAPI bundling complete! (${duration}s)`);
    logger.outputFiles([
      config.paths.mergedOpenapi,
      config.paths.cloudOpenapi,
      config.paths.mesheryOpenapi,
    ]);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  dereferenceOpenapiSpec,
  mergeOpenapiSpec,
  prefixComponentRef,
  prefixInternalReferences,
  prefixComponents,
  prefixSecurityRequirement,
  prefixTags,
  toPrefix,
};

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
 * DEPENDENCIES:
 *   - swagger-cli (via npx)
 *   - @redocly/cli (via npx)
 *
 * OUTPUT:
 *   - _openapi_build/constructs/<version>/<package>/merged-openapi.json
 *   - _openapi_build/merged_openapi.yml
 *   - _openapi_build/cloud_openapi.yml
 *   - _openapi_build/meshery_openapi.yml
 */

const path = require("path");
const { execSync } = require("child_process");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");
const { npx } = require("./lib/exec");

// Disable telemetry for @redocly/cli
process.env.REDOCLY_TELEMETRY = "off";

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

  await npx("swagger-cli", [
    "bundle",
    "--dereference",
    inputPath,
    "-o",
    outputPath,
  ]);

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

  await npx("@redocly/cli", [
    "join",
    baseSpec,
    ...specsToMerge,
    "-o",
    outputPath,
    "--prefix-tags-with-info-prop",
    "title",
    "--prefix-components-with-info-prop",
    "title",
  ]);

  logger.success(`Created: ${paths.relativePath(outputPath)}`);
}

/**
 * Filter the merged OpenAPI spec by x-internal tag
 * @param {string} tag - Tag to filter by
 * @param {string} outputFile - Output filename
 * @returns {Promise<void>}
 */
async function filterByTag(tag, outputFile) {
  const inputPath = paths.fromRoot(config.paths.mergedOpenapi);
  const outputPath = paths.fromRoot(outputFile);

  // Use the existing filterOpenapiByTag.js script
  const filterScript = paths.fromRoot("build/filterOpenapiByTag.js");

  execSync(`node "${filterScript}" "${inputPath}" "${outputPath}" ${tag}`, {
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

    await filterByTag("cloud", config.paths.cloudOpenapi);
    logger.success(`Created: ${config.paths.cloudOpenapi}`);

    await filterByTag("meshery", config.paths.mesheryOpenapi);
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

main();

#!/usr/bin/env node
/**
 * generate-golang.js - Go Code Generation Script
 *
 * DESCRIPTION:
 *   Generates Go structs from bundled OpenAPI specifications using oapi-codegen.
 *   This script focuses solely on Go code generation and depends on the
 *   _openapi_build/ directory being populated by bundle-openapi.js.
 *
 *   Schemas are discovered dynamically by walking the schemas/constructs directory
 *   and looking for directories containing an openapi.yml file.
 *
 * WHAT IT DOES:
 *   1. Discovers all schema packages from _openapi_build/constructs/
 *   2. Generates Go structs with JSON and YAML struct tags using oapi-codegen
 *   3. Outputs Go files to models/<version>/<package>/
 *
 * USAGE:
 *   node build/generate-golang.js
 *
 * PREREQUISITES:
 *   Run bundle-openapi.js first to generate the bundled OpenAPI specs:
 *   node build/bundle-openapi.js
 *
 * DEPENDENCIES:
 *   - oapi-codegen (Go tool)
 *
 * OUTPUT:
 *   - models/<version>/<package>/<package>.go
 */

const fs = require("fs");
const { execSync } = require("child_process");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");
const { commandExists } = require("./lib/exec");

/**
 * Add YAML struct tags alongside JSON ones in generated Go file
 * @param {string} filePath - Path to Go file
 */
function addYamlTags(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Add yaml struct tags matching the json tags
  // Pattern: json:"fieldName" -> json:"fieldName" yaml:"fieldName"
  content = content.replace(
    /json:"([^"]*)"(\s+yaml:"[^"]*")?/g,
    'json:"$1" yaml:"$1"',
  );

  fs.writeFileSync(filePath, content, "utf-8");
}

/**
 * Generate Go models for a single package
 * @param {Object} pkg - Package definition
 * @returns {Promise<void>}
 */
async function generateGoModels(pkg) {
  const inputPath = paths.fromRoot(config.getBundledOutputPath(pkg));
  const outputPath = paths.fromRoot(config.getGoOutputPath(pkg));
  const configPath = paths.fromRoot(config.paths.openapiConfig);

  // Verify input exists
  if (!paths.fileExists(inputPath)) {
    logger.warn(`Bundled schema not found: ${inputPath}, skipping ${pkg.name}`);
    return;
  }

  // Ensure output directory exists
  paths.ensureParentDir(outputPath);

  logger.step(`Generating Go models: ${pkg.name} (${pkg.version})...`);

  try {
    execSync(
      `oapi-codegen --config "${configPath}" ` +
        `--package "${pkg.name}" ` +
        `-generate types ` +
        `--include-tags all ` +
        `-o "${outputPath}" ` +
        `"${inputPath}"`,
      { stdio: "inherit" },
    );

    // Add YAML struct tags
    addYamlTags(outputPath);

    logger.success(`Generated: ${paths.relativePath(outputPath)}`);
  } catch (err) {
    throw new Error(
      `Go model generation failed for ${pkg.name}: ${err.message}`,
    );
  }
}

/**
 * Check prerequisites
 */
function checkPrerequisites() {
  // Check for oapi-codegen
  if (!commandExists("oapi-codegen")) {
    logger.error("oapi-codegen not found.");
    logger.info(
      "Install it with: go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest",
    );
    process.exit(1);
  }

  // Check for _openapi_build directory
  const buildDir = paths.fromRoot(config.paths.buildDir);
  if (!paths.dirExists(buildDir)) {
    logger.error("_openapi_build/ directory not found.");
    logger.info("Run 'node build/bundle-openapi.js' first.");
    process.exit(1);
  }
}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now();

  try {
    // Change to project root
    process.chdir(paths.getProjectRoot());

    // Add Go bin to PATH
    const goPath = process.env.GOPATH || `${process.env.HOME}/go`;
    process.env.PATH = `${goPath}/bin:${process.env.PATH}`;

    logger.header("🔧 Starting Go code generation...");

    // Check prerequisites
    checkPrerequisites();

    // Discover packages dynamically
    const schemaPackages = config.getSchemaPackages();
    logger.info(`Discovered ${schemaPackages.length} schema packages`);

    if (schemaPackages.length === 0) {
      logger.error("No schema packages found!");
      process.exit(1);
    }

    // Generate Go models for all packages
    for (const pkg of schemaPackages) {
      await generateGoModels(pkg);
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`Go code generation complete! (${duration}s)`);
    logger.outputFiles(["models/<version>/<package>/*.go"]);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

main();

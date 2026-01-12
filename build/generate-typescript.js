#!/usr/bin/env node
/**
 * generate-typescript.js - TypeScript Type Definition Generator
 *
 * DESCRIPTION:
 *   Generates TypeScript type definitions from bundled OpenAPI specifications.
 *   This script focuses on TypeScript code generation and depends on the
 *   _openapi_build/ directory being populated by bundle-openapi.js.
 *
 *   Schemas are discovered dynamically by walking the schemas/constructs directory
 *   and looking for directories containing an api.yml file (the index file for each construct).
 *
 * WHAT IT DOES:
 *   1. Discovers all schema packages from _openapi_build/constructs/
 *   2. Generates TypeScript type definitions using openapi-typescript
 *   3. Generates raw JSON schema exports for each construct
 *   4. Outputs files to typescript/<version>/<package>/
 *
 * USAGE:
 *   node build/generate-typescript.js
 *
 * PREREQUISITES:
 *   Run bundle-openapi.js first to generate the bundled OpenAPI specs:
 *   node build/bundle-openapi.js
 *
 * DEPENDENCIES:
 *   - openapi-typescript (via npx)
 *
 * OUTPUT:
 *   - typescript/<version>/<package>/<Package>.ts - TypeScript type definitions
 *   - typescript/<version>/<package>/<Package>.json - Raw JSON schema
 */

const fs = require("fs");
const { execSync } = require("child_process");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");

/**
 * Convert string to PascalCase
 * @param {string} str - String to convert
 * @returns {string} PascalCase string
 */
function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
    .replace(/^(.)/, (m) => m.toUpperCase());
}

/**
 * Get the TypeScript output path for a package
 * @param {Object} pkg - Package definition
 * @returns {string} Path to TypeScript output file (relative to project root)
 */
function getTypescriptOutputPath(pkg) {
  const pascalName = toPascalCase(pkg.name);
  return `${config.paths.typescriptDir}/${pkg.version}/${pkg.name}/${pascalName}.ts`;
}

/**
 * Get the JSON schema output path for a package
 * @param {Object} pkg - Package definition
 * @returns {string} Path to JSON output file (relative to project root)
 */
function getJsonOutputPath(pkg) {
  const pascalName = toPascalCase(pkg.name);
  return `${config.paths.typescriptDir}/${pkg.version}/${pkg.name}/${pascalName}Schema.ts`;
}

/**
 * Generate TypeScript types for a single package
 * @param {Object} pkg - Package definition
 * @returns {Promise<void>}
 */
async function generateTypescriptTypes(pkg) {
  const inputPath = paths.fromRoot(config.getBundledOutputPath(pkg));
  const tsOutputPath = paths.fromRoot(getTypescriptOutputPath(pkg));
  const jsonOutputPath = paths.fromRoot(getJsonOutputPath(pkg));

  // Verify input exists
  if (!paths.fileExists(inputPath)) {
    logger.warn(`Bundled schema not found: ${inputPath}, skipping ${pkg.name}`);
    return;
  }

  // Ensure output directory exists
  paths.ensureParentDir(tsOutputPath);

  logger.step(`Generating TypeScript types: ${pkg.name} (${pkg.version})...`);

  try {
    // Generate TypeScript type definitions
    execSync(
      `npx --yes openapi-typescript "${inputPath}" --output "${tsOutputPath}"`,
      { stdio: "pipe" },
    );

    logger.success(`Generated: ${paths.relativePath(tsOutputPath)}`);
  } catch (err) {
    logger.warn(`Failed to generate TypeScript types for ${pkg.name}`);
    if (err.stderr) {
      logger.debug(err.stderr.toString());
    }
    return;
  }

  // Generate the JSON schema as a TypeScript const export
  try {
    const jsonContent = fs.readFileSync(inputPath, "utf-8").trim();
    const pascalName = toPascalCase(pkg.name);
    const tsContent =
      `/**\n` +
      ` * This file was automatically generated from OpenAPI schema.\n` +
      ` * Do not manually modify this file.\n` +
      ` */\n\n` +
      `const ${pascalName}Schema = ` +
      jsonContent +
      ` as const;\n\nexport default ${pascalName}Schema;\n`;
    fs.writeFileSync(jsonOutputPath, tsContent, "utf-8");
    logger.success(`Generated: ${jsonOutputPath}`);
  } catch (err) {
    logger.warn(`Failed to copy JSON schema for ${pkg.name}`);
    if (err.message) {
      logger.debug(err.message);
    }
  }
}

/**
 * Check prerequisites
 */
function checkPrerequisites() {
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

    logger.header("📝 Starting TypeScript code generation...");

    // Check prerequisites
    checkPrerequisites();

    // Discover packages dynamically
    const schemaPackages = config.getSchemaPackages();
    logger.info(`Discovered ${schemaPackages.length} schema packages`);

    if (schemaPackages.length === 0) {
      logger.error("No schema packages found!");
      process.exit(1);
    }

    // Generate TypeScript types for all packages
    for (const pkg of schemaPackages) {
      await generateTypescriptTypes(pkg);
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`TypeScript code generation complete! (${duration}s)`);
    logger.outputFiles([
      "typescript/<version>/<package>/<Package>.ts",
      "typescript/<version>/<package>/<Package>.json",
    ]);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

main();

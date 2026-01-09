#!/usr/bin/env node
/**
 * generate-rtk.js - RTK Query Client Generation Script
 *
 * DESCRIPTION:
 *   Generates RTK Query API clients from OpenAPI specifications for use in
 *   TypeScript/React applications. Creates type-safe API hooks for both
 *   cloud and meshery APIs.
 *
 * WHAT IT DOES:
 *   1. Reads RTK Query configuration files from typescript/rtk/
 *   2. Generates RTK Query API clients from filtered OpenAPI specs
 *   3. Outputs TypeScript files with auto-generated API hooks
 *
 * USAGE:
 *   node build/generate-rtk.js
 *
 * PREREQUISITES:
 *   Run bundle-openapi.js first to generate the OpenAPI specs in _openapi_build/
 *
 * DEPENDENCIES:
 *   - @rtk-query/codegen-openapi (via npx)
 *
 * CONFIGURATION:
 *   - typescript/rtk/cloud-rtk-config.ts - Configuration for cloud API
 *   - typescript/rtk/meshery-rtk-config.ts - Configuration for meshery API
 *
 * OUTPUT:
 *   - typescript/rtk/cloudApi.ts - RTK Query client for cloud API
 *   - typescript/rtk/mesheryApi.ts - RTK Query client for meshery API
 */

const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");
const { npx } = require("./lib/exec");

/**
 * RTK Query configurations to process
 */
const rtkConfigs = [
  {
    name: "cloud",
    configFile: config.paths.cloudRtkConfig,
    requiredSpec: config.paths.cloudOpenapi,
    outputDescription: "typescript/rtk/cloudApi.ts",
  },
  {
    name: "meshery",
    configFile: config.paths.mesheryRtkConfig,
    requiredSpec: config.paths.mesheryOpenapi,
    outputDescription: "typescript/rtk/mesheryApi.ts",
  },
];

/**
 * Check prerequisites for RTK generation
 */
function checkPrerequisites() {
  // Check for _openapi_build directory
  const buildDir = paths.fromRoot(config.paths.buildDir);
  if (!paths.dirExists(buildDir)) {
    logger.error("_openapi_build/ directory not found.");
    logger.info("Run 'node build/bundle-openapi.js' first.");
    process.exit(1);
  }

  // Check for required OpenAPI specs
  for (const rtk of rtkConfigs) {
    const specPath = paths.fromRoot(rtk.requiredSpec);
    if (!paths.fileExists(specPath)) {
      logger.error(`${rtk.requiredSpec} not found.`);
      logger.info("Run 'node build/bundle-openapi.js' first.");
      process.exit(1);
    }
  }

  // Check for RTK config files
  for (const rtk of rtkConfigs) {
    const configPath = paths.fromRoot(rtk.configFile);
    if (!paths.fileExists(configPath)) {
      logger.error(`RTK config not found: ${rtk.configFile}`);
      process.exit(1);
    }
  }
}

/**
 * Generate RTK Query client for a single configuration
 * @param {Object} rtk - RTK configuration object
 * @returns {Promise<void>}
 */
async function generateRtkClient(rtk) {
  const configPath = paths.fromRoot(rtk.configFile);

  logger.step(`Generating ${rtk.name} API client...`);

  try {
    await npx("@rtk-query/codegen-openapi", [configPath]);
    logger.success(`Generated: ${rtk.outputDescription}`);
  } catch (err) {
    throw new Error(
      `Failed to generate ${rtk.name} API client: ${err.message}`,
    );
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

    logger.header("🔧 Generating RTK Query clients...");

    // Check prerequisites
    checkPrerequisites();

    // Generate RTK clients
    for (const rtk of rtkConfigs) {
      await generateRtkClient(rtk);
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`RTK Query client generation complete! (${duration}s)`);
    logger.outputFiles(rtkConfigs.map((rtk) => rtk.outputDescription));
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

main();

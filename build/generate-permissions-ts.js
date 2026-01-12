#!/usr/bin/env node
/**
 * generate-permissions-ts.js - TypeScript Permission Keys Code Generation Script
 *
 * DESCRIPTION:
 *   Generates TypeScript constants for permission keys from a CSV source.
 *   Each constant is named using the Category (Theme) + Function columns in PascalCase,
 *   with the Key ID (UUID) as the value and Feature as a JSDoc comment.
 *
 * WHAT IT DOES:
 *   1. Reads permissions from a CSV source (local file, URL, or Google Sheets)
 *   2. Parses each row to extract Category, Function, Feature, and Key ID
 *   3. Generates TypeScript constants with proper naming conventions
 *   4. Outputs to the specified location (default: typescript/permissions.ts)
 *
 * USAGE:
 *   node build/generate-permissions-ts.js [options]
 *
 * OPTIONS:
 *   --source, -s    CSV source: local file path, URL, or Google Sheets URL
 *                   (default: permissions.csv)
 *   --output, -o    Output file path (default: typescript/permissions.ts)
 *   --gid           Google Sheets tab GID (optional, for multi-tab sheets)
 *   --help, -h      Show this help message
 *
 * EXAMPLES:
 *   # Use local CSV file (default)
 *   node build/generate-permissions-ts.js
 *
 *   # Use a specific local file
 *   node build/generate-permissions-ts.js --source ./data/permissions.csv
 *
 *   # Download from Google Sheets
 *   node build/generate-permissions-ts.js --source "https://docs.google.com/spreadsheets/d/SHEET_ID/edit"
 *
 *   # Specify output location
 *   node build/generate-permissions-ts.js --output ./src/constants/permissions.ts
 *
 * OUTPUT:
 *   - TypeScript file with PermissionKey type and constants
 */

const fs = require("fs");
const logger = require("./lib/logger");
const paths = require("./lib/paths");
const {
  loadPermissions,
  generateTypeScriptFile,
} = require("./lib/permissions");

// Default values
const DEFAULT_SOURCE = "build/permissions.csv";
const DEFAULT_OUTPUT = "typescript/permissions.ts";

/**
 * Parse command line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    source: DEFAULT_SOURCE,
    output: DEFAULT_OUTPUT,
    gid: null,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case "--source":
      case "-s":
        options.source = args[++i];
        break;
      case "--output":
      case "-o":
        options.output = args[++i];
        break;
      case "--gid":
        options.gid = args[++i];
        break;
      case "--help":
      case "-h":
        options.help = true;
        break;
      default:
        // If no flag, treat first positional arg as source
        if (!arg.startsWith("-") && options.source === DEFAULT_SOURCE) {
          options.source = arg;
        }
        break;
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Usage: node build/generate-permissions-ts.js [options]

Options:
  --source, -s    CSV source: local file path, URL, or Google Sheets URL
                  (default: ${DEFAULT_SOURCE})
  --output, -o    Output file path (default: ${DEFAULT_OUTPUT})
  --gid           Google Sheets tab GID (optional, for multi-tab sheets)
  --help, -h      Show this help message

Examples:
  # Use local CSV file (default)
  node build/generate-permissions-ts.js

  # Use a specific local file
  node build/generate-permissions-ts.js --source ./data/permissions.csv

  # Download from Google Sheets
  node build/generate-permissions-ts.js --source "https://docs.google.com/spreadsheets/d/SHEET_ID/edit"

  # Specify output location
  node build/generate-permissions-ts.js --output ./src/constants/permissions.ts
`);
}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now();

  try {
    // Parse command line arguments
    const options = parseArgs();

    if (options.help) {
      printHelp();
      process.exit(0);
    }

    // Change to project root
    process.chdir(paths.getProjectRoot());

    logger.header("🔑 Generating TypeScript permission key constants...");

    // Resolve source path (make relative paths absolute from project root)
    let source = options.source;
    if (!source.startsWith("http") && !source.startsWith("/")) {
      source = paths.fromRoot(source);
    }

    // Load and parse permissions
    const permissions = await loadPermissions(source, { gid: options.gid });
    logger.info(`Parsed ${permissions.length} permission keys`);

    if (permissions.length === 0) {
      logger.error("No permissions found in source!");
      process.exit(1);
    }

    // Generate TypeScript file
    const tsContent = generateTypeScriptFile(permissions);

    // Resolve output path
    let outputPath = options.output;
    if (!outputPath.startsWith("/")) {
      outputPath = paths.fromRoot(outputPath);
    }

    paths.ensureParentDir(outputPath);
    fs.writeFileSync(outputPath, tsContent, "utf-8");

    logger.success(`Generated: ${paths.relativePath(outputPath)}`);

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(
      `TypeScript permission keys generation complete! (${duration}s)`,
    );
    logger.info(`Total constants generated: ${permissions.length}`);
    logger.outputFiles([paths.relativePath(outputPath)]);
  } catch (err) {
    logger.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

main();

#!/usr/bin/env node
/**
 * compile-types.js - TypeScript Type Definition Generator
 *
 * DESCRIPTION:
 *   Generates TypeScript type definitions (.d.ts files) from JSON schema files.
 *   Also converts OpenAPI YAML files to TypeScript-compatible JSON exports.
 *
 * WHAT IT DOES:
 *   1. Traverses the input directory for JSON schema files
 *   2. Generates TypeScript type definitions using json2ts
 *   3. Converts OpenAPI YAML files to TypeScript JSON exports
 *   4. Skips template files (*_template.json, *_template.yaml)
 *
 * USAGE:
 *   node build/compile-types.js <input_directory> <output_directory> <templates_output_directory>
 *
 *   Example:
 *   node build/compile-types.js schemas/constructs typescript/constructs typescript/templates
 *
 * DEPENDENCIES:
 *   - json2ts (via npx)
 *   - openapi-typescript (via npx)
 *
 * OUTPUT:
 *   - <output_directory>/**\/*.d.ts - TypeScript type definitions
 *   - <output_directory>/**\/openapi.d.ts - OpenAPI TypeScript definitions
 *   - <output_directory>/**\/*OpenApiSchema.ts - OpenAPI JSON schema exports
 *
 * NOTE:
 *   Templates are manually maintained in templates/ subdirectories.
 *   This script is typically invoked via `make generate-ts`
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const logger = require("./lib/logger");
const paths = require("./lib/paths");

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error(
    "Usage: node build/compile-types.js <input_directory> <output_directory> <templates_output_directory>"
  );
  process.exit(1);
}

const [inputDirArg, outputDirArg, templatesDirArg] = args;

/**
 * Check if a file is a template file
 * @param {string} filePath - Path to file
 * @returns {boolean} True if file is a template
 */
function isTemplateFile(filePath) {
  const basename = path.basename(filePath);
  return (
    basename.includes("_template.json") ||
    basename.includes("_template.yaml") ||
    basename.includes("_template.yml")
  );
}

/**
 * Convert string to PascalCase with Schema suffix
 * @param {string} str - String to convert
 * @returns {string} PascalCase string with Schema suffix
 */
function toPascalCaseSchema(str) {
  return (
    str
      .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
      .replace(/^(.)/, (char) => char.toUpperCase()) + "Schema"
  );
}

/**
 * Find all JSON files in a directory recursively
 * @param {string} dir - Directory to search
 * @param {string[]} results - Accumulated results
 * @returns {string[]} Array of JSON file paths
 */
function findJsonFiles(dir, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findJsonFiles(fullPath, results);
    } else if (stat.isFile() && item.endsWith(".json")) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Find all OpenAPI YAML files in a directory recursively
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of OpenAPI YAML file paths
 */
function findOpenapiFiles(dir) {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  function walk(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (
        stat.isFile() &&
        (item === "openapi.yml" || item === "openapi.yaml")
      ) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Generate TypeScript type definition for a JSON schema file
 * @param {string} jsonFile - Path to JSON file
 * @param {string} inputDir - Input directory root
 * @param {string} outputDir - Output directory root
 */
function generateTypeDefinition(jsonFile, inputDir, outputDir) {
  if (isTemplateFile(jsonFile)) {
    return;
  }

  const relativePath = path.relative(inputDir, jsonFile);
  const dir = path.dirname(relativePath);
  const filename = path.basename(jsonFile, ".json");
  const outputPath = path.join(outputDir, dir, `${filename}.d.ts`);

  // Ensure output directory exists
  paths.ensureDir(path.dirname(outputPath));

  // Change to the directory containing the JSON file for proper $ref resolution
  const originalDir = process.cwd();
  process.chdir(path.dirname(jsonFile));

  try {
    execSync(
      `npx --yes json2ts --unreachableDefinitions --input "${path.basename(
        jsonFile
      )}" --output "${outputPath}"`,
      { stdio: "pipe" }
    );
    logger.step(`Generated types: ${relativePath}`);
  } catch (err) {
    logger.warn(`Failed to generate types for: ${relativePath}`);
    if (err.stderr) {
      logger.debug(err.stderr.toString());
    }
  } finally {
    process.chdir(originalDir);
  }
}

/**
 * Generate schema export file for a JSON file
 * @param {string} jsonFile - Path to JSON file
 * @param {string} inputDir - Input directory root
 * @param {string} outputDir - Output directory root
 */
function generateSchemaExport(jsonFile, inputDir, outputDir) {
  if (isTemplateFile(jsonFile)) {
    return;
  }

  const relativePath = path.relative(inputDir, jsonFile);
  const dir = path.dirname(relativePath);
  const filename = path.basename(jsonFile, ".json");
  const schemaName = toPascalCaseSchema(filename);
  const outputPath = path.join(outputDir, dir, `${schemaName}.ts`);

  // Ensure output directory exists
  paths.ensureDir(path.dirname(outputPath));

  try {
    const content = fs.readFileSync(jsonFile, "utf-8");
    const tsContent = `// Generated from ${relativePath}
// This file exports the original JSON schema

const schema = ${content}

export default schema;
`;

    fs.writeFileSync(outputPath, tsContent, "utf-8");
    logger.step(`Generated schema export: ${relativePath}`);
  } catch (err) {
    logger.warn(`Failed to generate schema export for: ${relativePath}`);
  }
}

/**
 * Convert OpenAPI YAML file to TypeScript JSON export
 * @param {string} openapiFile - Path to OpenAPI YAML file
 * @param {string} inputDir - Input directory root
 * @param {string} outputDir - Output directory root
 */
function convertOpenapiToJson(openapiFile, inputDir, outputDir) {
  const relativePath = path.relative(inputDir, path.dirname(openapiFile));
  const outputPath = path.join(outputDir, relativePath);

  // Ensure output directory exists
  paths.ensureDir(outputPath);

  try {
    const converterScript = path.join(__dirname, "convert-openapi-yml-to-json.js");
    execSync(`node "${converterScript}" "${openapiFile}" "${outputPath}"`, {
      stdio: "pipe",
    });
    logger.step(`Converted OpenAPI: ${path.relative(inputDir, openapiFile)}`);
  } catch (err) {
    logger.warn(`Failed to convert OpenAPI: ${openapiFile}`);
  }
}

/**
 * Generate OpenAPI TypeScript definitions
 * @param {string} inputDir - Input directory
 * @param {string} outputDir - Output directory
 */
function generateOpenapiTypes(inputDir, outputDir) {
  const openapiFile = path.join(inputDir, "openapi.yml");

  if (!fs.existsSync(openapiFile)) {
    logger.warn(`OpenAPI file not found: ${openapiFile}`);
    return;
  }

  const outputPath = path.join(outputDir, "openapi.d.ts");
  paths.ensureDir(outputDir);

  try {
    execSync(
      `npx --yes openapi-typescript "${openapiFile}" --output "${outputPath}"`,
      { stdio: "pipe" }
    );
    logger.step(`Generated OpenAPI types: openapi.d.ts`);
  } catch (err) {
    logger.warn(`Failed to generate OpenAPI types`);
  }
}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now();

  try {
    // Resolve paths
    const inputDir = path.resolve(inputDirArg);
    const outputDir = path.resolve(outputDirArg);
    const templatesDir = path.resolve(templatesDirArg);

    // Validate input directory
    if (!fs.existsSync(inputDir)) {
      logger.error(`Input directory does not exist: ${inputDir}`);
      process.exit(1);
    }

    // Create output directories
    paths.ensureDir(outputDir);
    paths.ensureDir(templatesDir);

    logger.header("📝 Generating TypeScript type definitions...");

    // Step 1: Generate TypeScript type definitions from JSON schemas
    logger.info("Step 1: Generating TypeScript type definitions...");
    const jsonFiles = findJsonFiles(inputDir);
    for (const jsonFile of jsonFiles) {
      generateTypeDefinition(jsonFile, inputDir, outputDir);
    }

    // Step 2: Skip template generation (templates are manually maintained)
    logger.info("Step 2: Skipping template generation (manually maintained)...");

    // Step 3: Generate schema exports
    logger.info("Step 3: Generating schema exports...");
    for (const jsonFile of jsonFiles) {
      generateSchemaExport(jsonFile, inputDir, outputDir);
    }

    // Step 4: Generate OpenAPI types
    logger.info("Step 4: Generating OpenAPI types...");
    generateOpenapiTypes(inputDir, outputDir);

    // Step 5: Convert OpenAPI YAML files to TypeScript JSON exports
    logger.info("Step 5: Converting OpenAPI YAML to TypeScript JSON...");
    const openapiFiles = findOpenapiFiles(inputDir);
    for (const openapiFile of openapiFiles) {
      convertOpenapiToJson(openapiFile, inputDir, outputDir);
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`TypeScript generation complete! (${duration}s)`);
    logger.outputFiles([`${outputDirArg}/**/*.d.ts`, `${outputDirArg}/**/*Schema.ts`]);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

main();
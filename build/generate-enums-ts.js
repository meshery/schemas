#!/usr/bin/env node
/**
 * generate-enums-ts.js - TypeScript Runtime Constants from OpenAPI String Enums
 *
 * DESCRIPTION:
 *   openapi-typescript (build/generate-typescript.js) turns a string `enum` into a
 *   TYPE-ONLY union: `"meshery" | "kubernetes" | ...`. That is erased at runtime,
 *   so a consumer that needs to *compare against* an enum member still has to
 *   hand-write the literal - which is exactly the drift this repo exists to
 *   prevent. Go has no such gap: oapi-codegen already emits real constants.
 *
 *   This script closes it by emitting a frozen runtime object (plus its derived
 *   type) for every enum that opts in with `x-ts-const`.
 *
 * WHAT IT DOES:
 *   1. Walks the bundled construct specs in _openapi_build/constructs/
 *   2. Collects every `components.schemas.*` entry that is a string enum AND
 *      declares `x-ts-const: <ExportedName>`
 *   3. Writes typescript/constants/<version>/<construct>.ts with one
 *      `export const <ExportedName>` + `export type <SchemaName>` per enum
 *   4. Writes typescript/constants/index.ts re-exporting all of them, which
 *      typescript/index.ts re-exports in turn (`export * from "./constants"`)
 *
 *   Keys are camelCased from the enum value ("not found" -> notFound), matching
 *   the repo's camelCase wire convention; values are the literals verbatim.
 *
 *   Output lives OUTSIDE typescript/generated/ on purpose: build/generate-schema-dts.js
 *   copies everything under typescript/generated/ verbatim into dist/ as .d.ts,
 *   which is only valid for type-only files. These files declare runtime values,
 *   so they are bundled by tsup's main (dts: true) entry via typescript/index.ts.
 *
 * USAGE:
 *   node build/generate-enums-ts.js
 *
 * PREREQUISITES:
 *   Run bundle-openapi.js first to populate _openapi_build/.
 *
 * OUTPUT:
 *   - typescript/constants/<version>/<construct>.ts
 *   - typescript/constants/index.ts
 */

const fs = require("fs");
const path = require("path");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");

const OUTPUT_DIR = "typescript/constants";
const OPT_IN_EXTENSION = "x-ts-const";
// Optional. The emitted TypeScript type name, when it should differ from the
// schema name. Go names are scoped by their construct package (connection.CoreKind)
// but these are exported from the @meshery/schemas root, so a schema name that
// reads fine in Go can be too generic in TypeScript.
const TYPE_NAME_EXTENSION = "x-ts-type";

const HEADER =
  `/**\n` +
  ` * This file was automatically generated from the OpenAPI schemas by\n` +
  ` * build/generate-enums-ts.js. DO NOT EDIT.\n` +
  ` *\n` +
  ` * To change these values, edit the enum's \`${OPT_IN_EXTENSION}\` schema in\n` +
  ` * schemas/constructs/ and re-run \`make generate-enums-ts\`.\n` +
  ` */\n`;

/**
 * Convert an enum value to a safe camelCase object key.
 * "not found" -> "notFound", "in_cluster" -> "inCluster", "K8s" -> "k8s"
 * @param {string} value - Enum value
 * @returns {string} camelCase identifier
 */
function toCamelCaseKey(value) {
  const words = String(value)
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean);

  if (words.length === 0) {
    throw new Error(`Enum value ${JSON.stringify(value)} has no identifier characters`);
  }

  const [first, ...rest] = words;
  const key =
    first.toLowerCase() +
    rest.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");

  // A leading digit is not a valid identifier start; the emitter quotes those.
  return key;
}

/**
 * @param {string} key - Candidate object key
 * @returns {string} The key, quoted if it is not a bare identifier
 */
function quoteKeyIfNeeded(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

/**
 * Collect opted-in string enums from a parsed OpenAPI spec.
 * @param {Object} spec - Parsed OpenAPI document
 * @param {string} label - "<version>/<construct>", used in error messages
 * @returns {Array<{constName: string, typeName: string, schemaName: string, description: string|undefined, values: string[]}>}
 */
function collectEnumsFromSpec(spec, label) {
  const schemas = (spec && spec.components && spec.components.schemas) || {};
  const collected = [];

  for (const [schemaName, schema] of Object.entries(schemas)) {
    if (!schema || typeof schema !== "object") continue;

    const constName = schema[OPT_IN_EXTENSION];
    if (!constName) continue;

    if (schema.type !== "string" || !Array.isArray(schema.enum)) {
      throw new Error(
        `${label}: ${schemaName} declares ${OPT_IN_EXTENSION} but is not a string enum`,
      );
    }

    collected.push({
      constName,
      typeName: schema[TYPE_NAME_EXTENSION] || schemaName,
      schemaName,
      description: schema.description,
      values: schema.enum.map(String),
    });
  }

  return collected.sort((a, b) => a.constName.localeCompare(b.constName));
}

/**
 * Collect opted-in string enums from a bundled construct spec on disk.
 * @param {Object} pkg - Package definition from config.getSchemaPackages()
 * @returns {Array} Enums, see collectEnumsFromSpec
 */
function collectEnums(pkg) {
  const inputPath = paths.fromRoot(config.getBundledOutputPath(pkg));
  if (!paths.fileExists(inputPath)) {
    return [];
  }

  let spec;
  try {
    spec = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  } catch (err) {
    logger.warn(`Could not parse ${paths.relativePath(inputPath)}: ${err.message}`);
    return [];
  }

  return collectEnumsFromSpec(spec, `${pkg.version}/${pkg.name}`);
}

/**
 * Render one construct's constants file.
 * @param {string} label - "<version>/<construct>", cited in the source comment
 * @param {Array} enums - Enums collected for the construct
 * @returns {string} File contents
 */
function renderConstructFile(label, enums) {
  const blocks = enums.map((e) => {
    const seen = new Map();
    const entries = e.values.map((value) => {
      const key = toCamelCaseKey(value);
      if (seen.has(key)) {
        throw new Error(
          `${label}: ${e.typeName} values ${JSON.stringify(seen.get(key))} and ${JSON.stringify(value)} both map to key "${key}"`,
        );
      }
      seen.set(key, value);
      return `  ${quoteKeyIfNeeded(key)}: ${JSON.stringify(value)},`;
    });

    const source = `${label} components.schemas.${e.schemaName || e.typeName}`;
    const doc = e.description
      ? `/**\n * ${e.description.replace(/\n/g, "\n * ")}\n *\n * Source: ${source}\n */\n`
      : `/** Source: ${source} */\n`;

    return (
      doc +
      `export const ${e.constName} = {\n${entries.join("\n")}\n} as const;\n\n` +
      `export type ${e.typeName} =\n` +
      `  (typeof ${e.constName})[keyof typeof ${e.constName}];\n`
    );
  });

  return `${HEADER}\n${blocks.join("\n")}`;
}

/**
 * Render the aggregating index re-exported by typescript/index.ts.
 * @param {Array<{relativeImport: string}>} files - Emitted construct files
 * @returns {string} File contents
 */
function renderIndexFile(files) {
  const lines = files.map((f) => `export * from "${f.relativeImport}";`);
  return `${HEADER}\n${lines.join("\n")}\n`;
}

/**
 * Remove stale generated files so a deleted/renamed enum does not linger.
 * @param {Set<string>} keepPaths - Absolute paths that were just written
 */
function pruneStaleFiles(keepPaths) {
  const root = paths.fromRoot(OUTPUT_DIR);
  if (!paths.dirExists(root)) return;

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
      } else if (entry.name.endsWith(".ts") && !keepPaths.has(full)) {
        fs.unlinkSync(full);
        logger.info(`Removed stale: ${paths.relativePath(full)}`);
      }
    }
  };

  walk(root);
}

/**
 * Check prerequisites
 */
function checkPrerequisites() {
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
function main() {
  const startTime = Date.now();

  try {
    process.chdir(paths.getProjectRoot());

    logger.header("🔢 Generating TypeScript enum constants...");

    checkPrerequisites();

    const written = [];
    const keepPaths = new Set();
    let enumCount = 0;

    for (const pkg of config.getSchemaPackages()) {
      const enums = collectEnums(pkg);
      if (enums.length === 0) continue;

      const relativePath = `${OUTPUT_DIR}/${pkg.version}/${pkg.name}.ts`;
      const outputPath = paths.fromRoot(relativePath);
      paths.ensureParentDir(outputPath);
      fs.writeFileSync(
        outputPath,
        renderConstructFile(`${pkg.version}/${pkg.name}`, enums),
        "utf-8",
      );

      keepPaths.add(outputPath);
      written.push({ relativeImport: `./${pkg.version}/${pkg.name}` });
      enumCount += enums.length;

      logger.success(
        `Generated: ${relativePath} (${enums.map((e) => e.constName).join(", ")})`,
      );
    }

    const indexPath = paths.fromRoot(`${OUTPUT_DIR}/index.ts`);
    paths.ensureParentDir(indexPath);
    // Sorted so the file is stable regardless of package discovery order.
    written.sort((a, b) => a.relativeImport.localeCompare(b.relativeImport));
    fs.writeFileSync(indexPath, renderIndexFile(written), "utf-8");
    keepPaths.add(indexPath);

    pruneStaleFiles(keepPaths);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(
      `Enum constant generation complete: ${enumCount} enum(s) across ${written.length} construct(s) (${duration}s)`,
    );
    logger.outputFiles([`${OUTPUT_DIR}/<version>/<construct>.ts`, `${OUTPUT_DIR}/index.ts`]);
  } catch (err) {
    logger.error(err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

module.exports = {
  collectEnumsFromSpec,
  main,
  renderConstructFile,
  renderIndexFile,
  toCamelCaseKey,
};

if (require.main === module) {
  main();
}

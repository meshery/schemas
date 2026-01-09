/**
 * config.js - Shared Configuration for Build Scripts
 *
 * Central configuration for all schema packages, versions, and build settings.
 * This is the single source of truth for which schemas get processed.
 */

/**
 * Schema package definitions
 * Each entry defines a package to be processed by the build scripts.
 *
 * @typedef {Object} SchemaPackage
 * @property {string} name - Package name (used for output directory and Go package)
 * @property {string} version - Schema version (e.g., "v1beta1", "v1alpha1")
 * @property {string} [inputOverride] - Optional override for input schema path
 */

/** @type {SchemaPackage[]} */
const schemaPackages = [
  { name: "badge", version: "v1beta1" },
  { name: "capability", version: "v1alpha1" },
  { name: "category", version: "v1beta1" },
  { name: "subcategory", version: "v1beta1" },
  { name: "model", version: "v1beta1" },
  { name: "component", version: "v1beta1" },
  {
    name: "pattern",
    version: "v1beta1",
    inputOverride: "schemas/constructs/v1beta1/design/openapi.yml",
  },
  { name: "core", version: "v1alpha1" },
  { name: "catalog", version: "v1alpha2" },
  { name: "subscription", version: "v1beta1" },
  { name: "plan", version: "v1beta1" },
  { name: "feature", version: "v1beta1" },
  { name: "evaluation", version: "v1beta1" },
  { name: "workspace", version: "v1beta1" },
  { name: "environment", version: "v1beta1" },
  { name: "user", version: "v1beta1" },
  { name: "academy", version: "v1beta1" },
  { name: "event", version: "v1beta1" },
  { name: "organization", version: "v1beta1" },
  { name: "connection", version: "v1beta1" },
  { name: "invitation", version: "v1beta1" },
];

/**
 * Packages to include in the merged OpenAPI spec
 * Order matters for the merge operation
 */
const mergePackages = [
  { name: "pattern", version: "v1beta1" },
  { name: "component", version: "v1beta1" },
  { name: "model", version: "v1beta1" },
  { name: "subscription", version: "v1beta1" },
  { name: "plan", version: "v1beta1" },
  { name: "feature", version: "v1beta1" },
  { name: "workspace", version: "v1beta1" },
  { name: "environment", version: "v1beta1" },
  { name: "catalog", version: "v1alpha2" },
  { name: "evaluation", version: "v1beta1" },
  { name: "user", version: "v1beta1" },
  { name: "academy", version: "v1beta1" },
  { name: "invitation", version: "v1beta1" },
  { name: "badge", version: "v1beta1" },
];

/**
 * Build output directories
 */
const paths = {
  // Root directories
  schemasDir: "schemas/constructs",
  buildDir: "_openapi_build",
  modelsDir: "models",
  typescriptDir: "typescript",

  // Build config files
  openapiConfig: "build/openapi.config.yml",
  baseCloudSpec: "schemas/base_cloud.yml",

  // Output files
  mergedOpenapi: "_openapi_build/merged_openapi.yml",
  cloudOpenapi: "_openapi_build/cloud_openapi.yml",
  mesheryOpenapi: "_openapi_build/meshery_openapi.yml",

  // RTK config files
  cloudRtkConfig: "typescript/rtk/cloud-rtk-config.ts",
  mesheryRtkConfig: "typescript/rtk/meshery-rtk-config.ts",
};

/**
 * Merged construct filename (must be JSON for RTK query generation)
 */
const mergedConstructFilename = "merged-openapi.json";

/**
 * Get the input schema path for a package
 * @param {SchemaPackage} pkg - Package definition
 * @returns {string} Path to input schema
 */
function getInputSchemaPath(pkg) {
  if (pkg.inputOverride) {
    return pkg.inputOverride;
  }
  return `${paths.schemasDir}/${pkg.version}/${pkg.name}/openapi.yml`;
}

/**
 * Get the bundled output path for a package
 * @param {SchemaPackage} pkg - Package definition
 * @returns {string} Path to bundled output
 */
function getBundledOutputPath(pkg) {
  return `${paths.buildDir}/constructs/${pkg.version}/${pkg.name}/${mergedConstructFilename}`;
}

/**
 * Get the Go output path for a package
 * @param {SchemaPackage} pkg - Package definition
 * @returns {string} Path to Go output file
 */
function getGoOutputPath(pkg) {
  return `${paths.modelsDir}/${pkg.version}/${pkg.name}/${pkg.name}.go`;
}

module.exports = {
  schemaPackages,
  mergePackages,
  paths,
  mergedConstructFilename,
  getInputSchemaPath,
  getBundledOutputPath,
  getGoOutputPath,
};
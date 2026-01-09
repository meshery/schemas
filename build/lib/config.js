/**
 * config.js - Shared Configuration for Build Scripts
 *
 * Dynamically discovers schema packages by walking the schemas/constructs directory.
 * Looks for directories containing an openapi.yml file.
 *
 * Special cases and merge configuration can be defined in the overrides section.
 */

const fs = require("fs");
const path = require("path");

/**
 * Build paths configuration
 */
const paths = {
  // Root directories (relative to project root)
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
 * Package name overrides
 * Maps directory name to a different package name for Go code generation
 * Key: "version/dirname", Value: package name
 */
const packageNameOverrides = {
  "v1beta1/design": "pattern",
};

/**
 * Packages to EXCLUDE from processing
 * These directories will be skipped even if they contain openapi.yml
 */
const excludePackages = [
  // Add any packages to exclude here
  // Example: "v1beta2-draft/somepkg"
];

/**
 * Packages to EXCLUDE from the merged OpenAPI spec
 * These will still be processed for Go generation but not included in the merge
 */
const excludeFromMerge = [
  "v1alpha1/core",
  "v1alpha1/capability",
  // Add any other packages that shouldn't be in the merged spec
];

/**
 * Get the project root directory
 * @returns {string} Absolute path to project root
 */
function getProjectRoot() {
  return path.resolve(__dirname, "../..");
}

/**
 * Discover all schema packages by walking the schemas directory
 * Looks for directories containing an openapi.yml file
 *
 * @returns {Array<{name: string, version: string, dirName: string, openapiPath: string}>}
 */
function discoverSchemaPackages() {
  const projectRoot = getProjectRoot();
  const schemasRoot = path.join(projectRoot, paths.schemasDir);
  const packages = [];

  if (!fs.existsSync(schemasRoot)) {
    console.warn(`Schemas directory not found: ${schemasRoot}`);
    return packages;
  }

  // Get all version directories
  const versionDirs = fs.readdirSync(schemasRoot).filter((item) => {
    const itemPath = path.join(schemasRoot, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const version of versionDirs) {
    const versionPath = path.join(schemasRoot, version);
    const packageDirs = fs.readdirSync(versionPath).filter((item) => {
      const itemPath = path.join(versionPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const dirName of packageDirs) {
      const openapiPath = path.join(versionPath, dirName, "openapi.yml");
      const packageKey = `${version}/${dirName}`;

      // Skip excluded packages
      if (excludePackages.includes(packageKey)) {
        continue;
      }

      // Check if openapi.yml exists
      if (fs.existsSync(openapiPath)) {
        // Get package name (use override if exists, otherwise use directory name)
        const packageName = packageNameOverrides[packageKey] || dirName;

        packages.push({
          name: packageName,
          version: version,
          dirName: dirName,
          openapiPath: path.relative(projectRoot, openapiPath),
        });
      }
    }
  }

  return packages;
}

/**
 * Get all schema packages (cached)
 * @returns {Array<{name: string, version: string, dirName: string, openapiPath: string}>}
 */
let _cachedPackages = null;
function getSchemaPackages() {
  if (_cachedPackages === null) {
    _cachedPackages = discoverSchemaPackages();
  }
  return _cachedPackages;
}

/**
 * Get packages that should be included in the merged OpenAPI spec
 * @returns {Array<{name: string, version: string, dirName: string, openapiPath: string}>}
 */
function getMergePackages() {
  return getSchemaPackages().filter((pkg) => {
    const packageKey = `${pkg.version}/${pkg.dirName}`;
    return !excludeFromMerge.includes(packageKey);
  });
}

/**
 * Get the input schema path for a package
 * @param {Object} pkg - Package definition
 * @returns {string} Path to input schema (relative to project root)
 */
function getInputSchemaPath(pkg) {
  return pkg.openapiPath;
}

/**
 * Get the bundled output path for a package
 * @param {Object} pkg - Package definition
 * @returns {string} Path to bundled output (relative to project root)
 */
function getBundledOutputPath(pkg) {
  return `${paths.buildDir}/constructs/${pkg.version}/${pkg.name}/${mergedConstructFilename}`;
}

/**
 * Get the Go output path for a package
 * @param {Object} pkg - Package definition
 * @returns {string} Path to Go output file (relative to project root)
 */
function getGoOutputPath(pkg) {
  return `${paths.modelsDir}/${pkg.version}/${pkg.name}/${pkg.name}.go`;
}

/**
 * Clear the cached packages (useful for testing)
 */
function clearCache() {
  _cachedPackages = null;
}

/**
 * Print discovered packages (for debugging)
 */
function printDiscoveredPackages() {
  const packages = getSchemaPackages();
  console.log(`\nDiscovered ${packages.length} schema packages:\n`);
  for (const pkg of packages) {
    const overridden = pkg.name !== pkg.dirName ? ` (from ${pkg.dirName})` : "";
    console.log(`  - ${pkg.version}/${pkg.name}${overridden}`);
  }
  console.log("");
}

module.exports = {
  paths,
  mergedConstructFilename,
  packageNameOverrides,
  excludePackages,
  excludeFromMerge,
  getProjectRoot,
  discoverSchemaPackages,
  getSchemaPackages,
  getMergePackages,
  getInputSchemaPath,
  getBundledOutputPath,
  getGoOutputPath,
  clearCache,
  printDiscoveredPackages,
};

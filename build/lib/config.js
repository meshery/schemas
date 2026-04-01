/**
 * config.js - Shared Configuration for Build Scripts
 *
 * Dynamically discovers schema packages by walking the schemas/constructs directory.
 * Looks for directories containing an api.yml file (the index file for each construct).
 *
 * The api.yml file serves as the index for each construct:
 * - References all subschemas via $ref
 * - Defines all API endpoints for the construct
 * - Acts as the entry point for code generation tools
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
  typescriptDir: "typescript/generated",

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
 * These directories will be skipped even if they contain api.yml
 */
const excludePackages = [
  // Deprecated v1beta1/relationship has circular $ref aliases in api.yml.
  // Use v1alpha3 Go models instead.
  "v1beta1/relationship",
];

/**
 * Packages to EXCLUDE from Go code generation only.
 * These are still discovered and available for bundling/$ref resolution,
 * but oapi-codegen is not run on them.
 */
const excludeFromGoGeneration = [
  // Core is a bundled base schema. The v1alpha1/core Go package provides
  // the generated types. v1beta1/core and v1beta2/core schemas exist for
  // $ref resolution but don't need their own Go packages.
  "v1beta1/core",
  "v1beta2/core",
  // v1beta2/catalog: excluded from Go generation. Catalog Go models
  // exist at models/v1alpha2/catalog (original) and models/v1beta1/catalog
  // (promoted). The GO_IMPORT_OVERRIDES in generate-golang.js routes
  // v1beta2/catalog imports to models/v1alpha2/catalog.
  "v1beta2/catalog",
];

/**
 * Packages to EXCLUDE from the merged OpenAPI spec
 * These will still be processed for Go generation but not included in the merge
 */
/**
 * Static exclusions: non-API base schemas that should never appear in the
 * merged OpenAPI spec regardless of version.
 */
const excludeFromMergeStatic = new Set([
  "v1alpha1/core",
  "v1alpha1/capability",
  "v1beta1/core",
  "v1beta1/capability",
  "v1beta1/selector",
  "v1beta2/core",
  "v1beta2/selector",
]);

/**
 * Dynamic exclusion: constructs marked x-deprecated: true in their api.yml
 * are excluded from the merged spec (their v1beta2 replacement takes
 * precedence). This is computed at discovery time, not hardcoded.
 */
function isDeprecatedPackage(pkg) {
  const projectRoot = getProjectRoot();
  const apiPath = path.join(projectRoot, pkg.openapiPath);
  try {
    const yaml = require("js-yaml");
    const doc = yaml.load(fs.readFileSync(apiPath, "utf-8"));
    return doc?.info?.["x-deprecated"] === true;
  } catch {
    return false;
  }
}

// Legacy compat — getMergePackages uses this for static exclusions.
const excludeFromMerge = [...excludeFromMergeStatic];

/**
 * Get the project root directory
 * @returns {string} Absolute path to project root
 */
function getProjectRoot() {
  return path.resolve(__dirname, "../..");
}

/**
 * Discover all schema packages by walking the schemas directory
 * Looks for directories containing an api.yml file (the construct index file)
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

  // Get all version directories (sorted for deterministic discovery order)
  const versionDirs = fs.readdirSync(schemasRoot).filter((item) => {
    const itemPath = path.join(schemasRoot, item);
    return fs.statSync(itemPath).isDirectory();
  }).sort();

  for (const version of versionDirs) {
    const versionPath = path.join(schemasRoot, version);
    const packageDirs = fs.readdirSync(versionPath).filter((item) => {
      const itemPath = path.join(versionPath, item);
      return fs.statSync(itemPath).isDirectory();
    }).sort();

    for (const dirName of packageDirs) {
      const openapiPath = path.join(versionPath, dirName, "api.yml");
      const packageKey = `${version}/${dirName}`;

      // Skip excluded packages
      if (excludePackages.includes(packageKey)) {
        continue;
      }

      // Check if api.yml exists (the construct index file)
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
    // Static exclusions: non-API base schemas
    if (excludeFromMergeStatic.has(packageKey)) return false;
    // Dynamic exclusion: deprecated constructs (x-deprecated: true)
    if (isDeprecatedPackage(pkg)) return false;
    return true;
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
/**
 * Go output path overrides for packages where the Go models should be
 * generated at a different location than the default version-scoped path.
 */
const goOutputPathOverrides = {
  // Core types are unversioned — generated to models/core/ alongside
  // manual utility types (Map, NullTime, MapObject, helpers).
  "v1alpha1/core": "models/core/core.go",
};

function getGoOutputPath(pkg) {
  const key = `${pkg.version}/${pkg.dirName}`;
  return goOutputPathOverrides[key] || `${paths.modelsDir}/${pkg.version}/${pkg.name}/${pkg.name}.go`;
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
  excludeFromGoGeneration,
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

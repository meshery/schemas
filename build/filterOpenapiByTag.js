#!/usr/bin/env node
/**
 * filterOpenapiByTag.js - OpenAPI Specification Filter by x-internal Tag
 *
 * DESCRIPTION:
 *   Filters an OpenAPI specification to include only operations that match
 *   a specified x-internal tag. This is used to create separate API specs
 *   for different consumers (cloud vs meshery).
 *
 * WHAT IT DOES:
 *   1. Reads an OpenAPI YAML specification
 *   2. Iterates through all paths and HTTP methods
 *   3. Filters operations based on the x-internal field
 *   4. Includes operations whose x-internal array contains the specified tag
 *   5. Writes the filtered specification to a new file
 *
 *   x-internal is required on every operation (enforced by validate-schemas
 *   Rule 14). Operations missing x-internal are excluded from every bundled
 *   output and the script exits non-zero so the build fails loudly instead of
 *   silently defaulting them into both consumers.
 *
 * USAGE:
 *   node build/filterOpenapiByTag.js <input.yml> <output.yml> [tag] [base.yml]
 *
 *   Example:
 *   node build/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/cloud_openapi.yml cloud schemas/base_cloud.yml
 *   node build/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/meshery_openapi.yml meshery schemas/base_meshery.yml
 *
 * ARGUMENTS:
 *   input.yml  - Path to the input OpenAPI specification
 *   output.yml - Path to write the filtered specification
 *   tag        - Tag to filter by (default: "meshery")
 *   base.yml   - Optional base spec whose top-level metadata should be applied
 *
 * DEPENDENCIES:
 *   - js-yaml - For parsing and writing YAML files
 *
 * OUTPUT:
 *   A filtered OpenAPI YAML file containing only operations matching the tag.
 *
 * NOTE:
 *   This script is called by bundle-openapi.js to create cloud_openapi.yml
 *   and meshery_openapi.yml from the merged OpenAPI specification.
 */

const fs = require("fs");
const yaml = require("js-yaml");

const httpMethods = [
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
];

function loadYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, "utf8"));
}

function applyBaseMetadata(doc, baseDoc) {
  if (!baseDoc || typeof baseDoc !== "object") {
    return doc;
  }

  if (baseDoc.openapi) {
    doc.openapi = baseDoc.openapi;
  }
  if (baseDoc.info) {
    doc.info = baseDoc.info;
  }
  if (baseDoc.servers) {
    doc.servers = baseDoc.servers;
  }

  return doc;
}

function filterOpenapiByTag(doc, tagToInclude = "meshery", baseDoc) {
  const missingXInternal = [];

  const filteredPaths = Object.entries(doc.paths || {}).reduce(
    (acc, [path, pathItem]) => {
      const filteredMethods = Object.entries(pathItem).reduce(
        (methodsAcc, [method, operation]) => {
          if (!httpMethods.includes(method)) return methodsAcc;

          const xInternal = operation["x-internal"];
          if (!Array.isArray(xInternal) || xInternal.length === 0) {
            missingXInternal.push(`${method.toUpperCase()} ${path}`);
            return methodsAcc;
          }

          if (xInternal.includes(tagToInclude)) {
            methodsAcc[method] = operation;
          }

          return methodsAcc;
        },
        {},
      );

      if (Object.keys(filteredMethods).length > 0) {
        acc[path] = filteredMethods;
      }

      return acc;
    },
    {},
  );

  if (missingXInternal.length > 0) {
    const err = new Error(
      `${missingXInternal.length} operation(s) missing x-internal — required on every operation`,
    );
    err.missingXInternal = missingXInternal;
    throw err;
  }

  return applyBaseMetadata({ ...doc, paths: filteredPaths }, baseDoc);
}

function main() {
  const [inputFile, outputFile, tagToInclude = "meshery", baseFile] = process.argv.slice(2);

  if (!inputFile || !outputFile) {
    console.error(
      "Usage: node build/filterOpenapiByTag.js <input.yml> <output.yml> [tag] [base.yml]",
    );
    process.exit(1);
  }

  try {
    const doc = loadYaml(inputFile);
    const baseDoc = baseFile ? loadYaml(baseFile) : undefined;
    const filteredDoc = filterOpenapiByTag(doc, tagToInclude, baseDoc);
    fs.writeFileSync(outputFile, yaml.dump(filteredDoc, { noRefs: true, lineWidth: 120 }), "utf8");
    console.log(`✅ Filtered OpenAPI written to ${outputFile}`);
  } catch (err) {
    if (Array.isArray(err.missingXInternal) && err.missingXInternal.length > 0) {
      console.error(`❌ ${err.message}`);
      for (const op of err.missingXInternal) console.error(`   - ${op}`);
      process.exit(1);
    }
    throw err;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  applyBaseMetadata,
  filterOpenapiByTag,
  httpMethods,
  loadYaml,
};

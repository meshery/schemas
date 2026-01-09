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
 *   4. Includes operations where x-internal is not set, or contains the specified tag
 *   5. Writes the filtered specification to a new file
 *
 * USAGE:
 *   node build/filterOpenapiByTag.js <input.yml> <output.yml> [tag]
 *
 *   Example:
 *   node build/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/cloud_openapi.yml cloud
 *   node build/filterOpenapiByTag.js _openapi_build/merged_openapi.yml _openapi_build/meshery_openapi.yml meshery
 *
 * ARGUMENTS:
 *   input.yml  - Path to the input OpenAPI specification
 *   output.yml - Path to write the filtered specification
 *   tag        - Tag to filter by (default: "meshery")
 *
 * DEPENDENCIES:
 *   - js-yaml - For parsing and writing YAML files
 *
 * OUTPUT:
 *   A filtered OpenAPI YAML file containing only operations matching the tag.
 *
 * NOTE:
 *   This script is called by generate-golang.sh to create cloud_openapi.yml
 *   and meshery_openapi.yml from the merged OpenAPI specification.
 */

const fs = require("fs");
const yaml = require("js-yaml");

const [inputFile, outputFile, tagToInclude = "meshery"] = process.argv.slice(2);

if (!inputFile || !outputFile) {
  console.error(
    "Usage: node filter-openapi-by-x-internal.js <input.yml> <output.yml> [tag]",
  );
  process.exit(1);
}

const doc = yaml.load(fs.readFileSync(inputFile, "utf8"));

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

const filteredPaths = Object.entries(doc.paths).reduce(
  (acc, [path, pathItem]) => {
    const filteredMethods = Object.entries(pathItem).reduce(
      (methodsAcc, [method, operation]) => {
        if (!httpMethods.includes(method)) return methodsAcc; // Skip non-method keys

        const xInternal = operation["x-internal"];
        const shouldInclude =
          !xInternal ||
          (Array.isArray(xInternal) && xInternal.includes(tagToInclude));

        if (shouldInclude) {
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

doc.paths = filteredPaths;

fs.writeFileSync(outputFile, yaml.dump(doc), "utf8");

console.log(`✅ Filtered OpenAPI written to ${outputFile}`);

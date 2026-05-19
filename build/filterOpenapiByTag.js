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

function collectRefs(node, out) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const v of node) collectRefs(v, out);
    return;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k === "$ref" && typeof v === "string" && v.startsWith("#/components/")) {
      out.add(v);
    } else if (k === "security" && Array.isArray(v)) {
      for (const requirement of v) {
        if (requirement && typeof requirement === "object") {
          for (const name of Object.keys(requirement)) {
            out.add(`#/components/securitySchemes/${name}`);
          }
        }
      }
    } else {
      collectRefs(v, out);
    }
  }
}

function pruneComponents(components, rootRefs) {
  if (!components || typeof components !== "object") return components;

  const reached = new Set();
  const queue = [...rootRefs];
  while (queue.length) {
    const ref = queue.pop();
    if (reached.has(ref)) continue;
    reached.add(ref);
    const [, , section, name] = ref.split("/");
    const node = components[section]?.[name];
    if (node === undefined) continue;
    const nested = new Set();
    collectRefs(node, nested);
    for (const r of nested) if (!reached.has(r)) queue.push(r);
  }

  const pruned = {};
  for (const [section, defs] of Object.entries(components)) {
    if (!defs || typeof defs !== "object") continue;
    const kept = {};
    for (const [name, def] of Object.entries(defs)) {
      if (reached.has(`#/components/${section}/${name}`)) kept[name] = def;
    }
    if (Object.keys(kept).length > 0) pruned[section] = kept;
  }
  return pruned;
}

function filterOpenapiByTag(doc, tagToInclude = "meshery", baseDoc) {
  const missingXInternal = [];

  const filteredPaths = Object.entries(doc.paths || {}).reduce(
    (acc, [path, pathItem]) => {
      const pathLevelEntries = Object.entries(pathItem).filter(
        ([key]) => !httpMethods.includes(key),
      );
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
        acc[path] = { ...Object.fromEntries(pathLevelEntries), ...filteredMethods };
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

  const rootRefs = new Set();
  collectRefs(filteredPaths, rootRefs);
  collectRefs(doc.security, rootRefs);
  const filteredComponents = pruneComponents(doc.components, rootRefs);

  const filteredDoc = { ...doc, paths: filteredPaths };
  if (filteredComponents !== undefined) {
    filteredDoc.components = filteredComponents;
  }

  return applyBaseMetadata(filteredDoc, baseDoc);
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
  collectRefs,
  filterOpenapiByTag,
  httpMethods,
  loadYaml,
  pruneComponents,
};

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

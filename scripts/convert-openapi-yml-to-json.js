const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const $RefParser = require("@apidevtools/json-schema-ref-parser");
var { openapiSchemaToJsonSchema: toJsonSchema } = require("@openapi-contrib/openapi-schema-to-json-schema");

// Get input and output paths from command line arguments
const inputPath = process.argv[2];
const outputDir = process.argv[3];

/**
 * Convert OpenAPI YAML schema to TypeScript
 * @param {string} openapiPath - Path to the OpenAPI YAML file
 * @param {string} outputDirectory - Directory to output the TypeScript file
 */
async function convertSchemas(openapiPath, outputDirectory = null) {
  try {
    const raw = fs.readFileSync(openapiPath, "utf8");
    const yamlDoc = yaml.load(raw);

    // Resolve all $refs (internal + external)
    const schemas = await $RefParser.dereference(openapiPath, yamlDoc);

    if (!schemas) {
      console.log(`⚠️  No schemas found in: ${openapiPath}`);
      return;
    }

    const fileDir = outputDirectory || path.dirname(openapiPath);
    const dirName = path.basename(path.dirname(openapiPath));
    const fileName = _pascalCase(dirName);

    // Ensure output directory exists
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    const jsonSchema = toJsonSchema(schemas);

    // Convert to JSON string for embedding in TypeScript file
    const jsonContent = JSON.stringify(jsonSchema, null, 2);

    // Create a TypeScript file with a const export
    const tsContent =
      `/**\n` +
      ` * This file was automatically generated from OpenAPI schema.\n` +
      ` * Do not manually modify this file.\n` +
      ` */\n\n` +
      `const schema = ` +
      jsonContent +
      `;\n\nexport default schema;\n`;

    const tsOutputPath = path.join(fileDir, `${fileName}OpenApiSchema.ts`);

    // Write TypeScript file
    fs.writeFileSync(tsOutputPath, tsContent);
  } catch (err) {
    console.error(`❌ Error Generating TypeScript file from openapi file: ${openapiPath}`, err);
  }
}

// Convert string to PascalCase
function _pascalCase(str) {
  return str.replace(/[-_](.)/g, (_, group1) => group1.toUpperCase()).replace(/^(.)/, (m) => m.toUpperCase());
}

async function main() {
  // If specific file is provided, process only that file
  if (inputPath) {
    await convertSchemas(inputPath, outputDir);
    return;
  }
}

main();


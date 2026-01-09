/**
 * compile-json-schema.mjs - JSON Schema Template Generator
 *
 * DESCRIPTION:
 *   Generates JSON template files from JSON schema definitions by resolving
 *   all $ref references and populating default values and empty strings.
 *
 * WHAT IT DOES:
 *   1. Loads a JSON schema file
 *   2. Resolves all $ref references (internal and external)
 *   3. Generates default values using json-schema-default
 *   4. Fills empty strings using json-schema-empty-strings
 *   5. Merges the results into a final template file
 *
 * USAGE:
 *   node build/compile-json-schema.mjs <input_schema.json> <output_template.json>
 *
 *   Example:
 *   node build/compile-json-schema.mjs schemas/constructs/v1beta1/model/model.json templates/model_template.json
 *
 * DEPENDENCIES:
 *   - @apidevtools/json-schema-ref-parser - For resolving $ref references
 *   - lodash.merge - For deep merging objects
 *   - json-schema-default - For extracting default values from schema
 *   - json-schema-empty-strings - For generating empty string placeholders
 *
 * OUTPUT:
 *   A JSON file containing a template instance of the schema with all
 *   default values populated and references resolved.
 *
 * NOTE:
 *   This script is called by compile-types.sh via `npm run generate:json`
 *   Templates are now manually maintained in templates/ subdirectories,
 *   so this script may be used for initial template generation only.
 */

import path from "path";
import * as fs from "fs";
import process from "process";
import merge from "lodash.merge";
import { jsonDefault } from "json-schema-default";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { jsonEmptyStrings } from "json-schema-empty-strings";

// save current dir
const __dirname = process.cwd();

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

// directory of the input file
const inputFileDirName = path.dirname(inputFilePath);

const loadJSON = (filePath) =>
  JSON.parse(fs.readFileSync(new URL(filePath, import.meta.url)));
const schema = await loadJSON(inputFilePath);

// change directory to properly resolve relative $ref in json schema
process.chdir(inputFileDirName);
const resolvedSchema = await $RefParser.dereference(schema);
// change back directory
process.chdir(__dirname);

const inputData = {};
const finalData = merge(
  {},
  jsonEmptyStrings(resolvedSchema),
  jsonDefault(resolvedSchema),
  inputData,
);

fs.writeFileSync(outputFilePath, JSON.stringify(finalData, null, 2), "utf-8");

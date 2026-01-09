import path from 'path';
import * as fs from 'fs';
import process from 'process';
import merge from 'lodash.merge'
import { jsonDefault } from 'json-schema-default'
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { jsonEmptyStrings } from 'json-schema-empty-strings'

// save current dir
const __dirname = process.cwd();

const inputFilePath = process.argv[2]
const outputFilePath = process.argv[3]

// directory of the input file
const inputFileDirName = path.dirname(inputFilePath)

const loadJSON = (filePath) => JSON.parse(fs.readFileSync(new URL(filePath, import.meta.url)));
const schema = await loadJSON(inputFilePath);

// change directory to properly resolve relative $ref in json schema
process.chdir(inputFileDirName)
const resolvedSchema = await $RefParser.dereference(schema);
// change back directory
process.chdir(__dirname)


const inputData = {}
const finalData = merge({}, jsonEmptyStrings(resolvedSchema), jsonDefault(resolvedSchema), inputData)

fs.writeFileSync(outputFilePath,  JSON.stringify(finalData, null, 2), "utf-8");
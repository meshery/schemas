import * as fs from 'fs';
import merge from 'lodash.merge'
import { jsonDefault } from 'json-schema-default'
import { jsonEmptyStrings } from 'json-schema-empty-strings'


const inputFilePath = process.argv[2]
const outputFilePath = process.argv[3]

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const schema = await loadJSON(inputFilePath);

const inputData = {}
const finalData = merge({}, jsonEmptyStrings(schema), jsonDefault(schema), inputData)

fs.writeFileSync(outputFilePath,  JSON.stringify(finalData, null, 2), "utf-8");
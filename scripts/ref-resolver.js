var parser = require("@apidevtools/json-schema-ref-parser")
var fs = require("fs");
var path = require("path")

const schemaPath = process.env["SCHEMA_PATH"]
if (!schemaPath) {
    console.error("proivde a schema directory to resolve the references.")
    return
}

async function resolveRef(schema) {
    const path = schema;
    try {
        let result = await parser.dereference(schema);
        return result;
    } catch (e) {
        console.error(e);
        console.log("schema path : ", path)
    }
}

const isDir = fileName => {
    return fs.lstatSync(fileName).isDirectory();
};

function walk(fullPath) {
    if (isDir(fullPath)) {
        fs.readdirSync(fullPath).map(entry => {
            let abosolutePath = path.join(fullPath, entry)

            console.log(`Processing ${abosolutePath}...`)
            if (abosolutePath.includes("openapi") || abosolutePath.includes("draft")) {
                return;
            }
            if (isDir(abosolutePath)) {
                walk(abosolutePath);
                return
            }
            processFile(abosolutePath);
        })
    } else {
        processFile(fullPath)
    }
}

async function processFile(path) {
    let resolvedSchema = await resolveRef(path);
    if (!!resolvedSchema && resolvedSchema["properties"]) {
        resolvedSchema["properties"] = addAdditionalTagsToSchema(resolvedSchema["properties"]);

        try {
            fs.writeFileSync(path, JSON.stringify(resolvedSchema, null, "  "))
        } catch (err) {
            console.error(err);
            console.log("error writing the resolved schema to file: ", resolvedSchema)
        }
    }
}

function addAdditionalTagsToSchema(object) {
    walkObject(object);
    return object;
}

function walkObject(object) {
    try {
        Object.keys(object).forEach(key => {
            Object.values(object[key]).forEach(val => {
                if (object[key]["type"] == "object" && !!object[key]["properties"]) {
                    object[key]["properties"] = walkObject(object[key]["properties"])
                } else if (object[key]["type"] == "array") {
                    if (object[key]["items"]["type"] == "object" && !!object[key]["items"]["properties"]) {
                        object[key]["items"]["properties"] = walkObject(object[key]["items"]["properties"])
                    } else {

                        let existingTags = getExistingExtraTags(object[key]["items"]);

                        object[key]["items"]["x-oapi-codegen-extra-tags"] = {
                            ...existingTags,
                            "yaml": key,
                            "json": key
                        }
                    }
                } else {
                    let existingTags = getExistingExtraTags(object[key]);
                    object[key]["x-oapi-codegen-extra-tags"] = {
                        ...existingTags,
                        "yaml": key,
                        "json": key
                    }
                }
                return val;
            })
            return object;
        })
    } catch (e) {
        console.error(e);
        console.log("error adding additional tags to the object: ", object)
    }

    return object;
}

function getExistingExtraTags(object) {
    let existingTags = {};
    if (!!object["x-oapi-codegen-extra-tags"]) {
        existingTags = object["x-oapi-codegen-extra-tags"];
    }
    return existingTags;
}

walk(schemaPath)
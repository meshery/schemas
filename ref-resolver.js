var parser = require("@apidevtools/json-schema-ref-parser")
var fs = require("fs");
var path = require("path")


async function resolveRef(schema) {

    try {
        let result = await parser.dereference(schema);
        // note - by default, mySchema is modified in place, and the returned value is a reference to the same object
        // console.log(result);
        
        // // if you want to avoid modifying the original schema, you can disable the `mutateInputSchema` option
        // let clonedSchema = await parser.dereference(schema, { mutateInputSchema: true });
        // // let resutl = await clonedSchema;
        // console.log(clonedSchema);
        return result;
    } catch (err) {
        console.error(err);
    }
}

const readFile = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8');
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

const isDir = fileName => {
    return fs.lstatSync(fileName).isDirectory();
};

function walk(directory) {
    fs.readdirSync(directory).map(async entry => {
        if (directory == "openapi" || directory.includes("draft")) {
            return;
        }
        let fullPath = path.join(directory, entry)
        if (isDir(fullPath)) {
            walk(fullPath);
            return;
        }

        let resolvedSchema = await resolveRef(fullPath);
        // console.log("PATH: ", fulklPath);
        addAdditionalTags(resolvedSchema);
        // fs.writeFileSync(fullPath, JSON.stringify(resolvedSchema))
    })
}

function addAdditionalTags(object) {

   console.log(typeof object);

}

function walkObject(object) {

}

walk("./schemas/constructs")
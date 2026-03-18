const fs = require("fs");
const path = require("path");

function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, group1) => group1.toUpperCase())
    .replace(/^(.)/, (m) => m.toUpperCase());
}

function normalizeGoTypeToken(typeToken) {
  if (typeof typeToken !== "string" || typeToken.length === 0) {
    return null;
  }

  let normalized = typeToken.trim();
  while (normalized.startsWith("*")) {
    normalized = normalized.slice(1);
  }
  while (normalized.startsWith("[]")) {
    normalized = normalized.slice(2);
  }

  if (
    normalized.length === 0 ||
    normalized.includes(".") ||
    normalized.startsWith("map[") ||
    normalized.startsWith("struct{")
  ) {
    return null;
  }

  return normalized;
}

function collectGeneratedStructInfo(filePath) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const localStructTypes = new Set();
  const dbReferencedLocalStructs = new Set();
  let currentStructName = null;
  let structDepth = 0;

  for (const line of lines) {
    const structMatch = line.match(/^type\s+(\w+)\s+struct\s*\{$/);
    if (structMatch) {
      currentStructName = structMatch[1];
      localStructTypes.add(currentStructName);
      structDepth = 1;
      continue;
    }

    if (!currentStructName) {
      continue;
    }

    if (structDepth === 1) {
      const fieldMatch = line.match(/^\s*\w+\s+(\S+)\s+`([^`]*)`/);
      if (fieldMatch) {
        const fieldType = normalizeGoTypeToken(fieldMatch[1]);
        const rawTags = fieldMatch[2];
        const dbMatch = rawTags.match(/\bdb:"([^"]*)"/);
        if (fieldType && dbMatch && dbMatch[1] !== "-") {
          dbReferencedLocalStructs.add(fieldType);
        }
      }
    }

    const opens = (line.match(/\bstruct\s*\{/g) || []).length;
    const closes = /^\s*}/.test(line) ? 1 : 0;
    structDepth += opens - closes;

    if (structDepth <= 0) {
      currentStructName = null;
      structDepth = 0;
    }
  }

  return {
    localStructTypes,
    dbReferencedLocalStructs: new Set(
      [...dbReferencedLocalStructs].filter((typeName) => localStructTypes.has(typeName)),
    ),
  };
}

function collectExistingHelperMethods(outputDir) {
  const helperMethods = new Map();
  const goFiles = fs
    .readdirSync(outputDir)
    .filter((name) => name.endsWith(".go") && name !== "zz_generated.helpers.go");

  for (const fileName of goFiles) {
    const filePath = path.join(outputDir, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const methodMatches = content.matchAll(/func\s*\(\s*\w+\s+\*?(\w+)\s*\)\s+(EventCategory|Scan|Value)\b/g);

    for (const [, typeName, methodName] of methodMatches) {
      const methods = helperMethods.get(typeName) || new Set();
      methods.add(methodName);
      helperMethods.set(typeName, methods);
    }
  }

  return helperMethods;
}

function inferHelperSpec(pkg, outputPath, outputDir) {
  const { localStructTypes, dbReferencedLocalStructs } = collectGeneratedStructInfo(outputPath);
  const existingHelperMethods = collectExistingHelperMethods(outputDir);
  const primaryType = toPascalCase(pkg.name);
  const mapStructTypes = [...dbReferencedLocalStructs].filter(
    (typeName) => !existingHelperMethods.get(typeName)?.has("Scan") && !existingHelperMethods.get(typeName)?.has("Value"),
  );
  const eventCategories = {};

  if (
    localStructTypes.has(primaryType) &&
    !existingHelperMethods.get(primaryType)?.has("EventCategory")
  ) {
    eventCategories[primaryType] = pkg.name;
  }

  return {
    eventCategories,
    mapStructTypes,
  };
}

function renderEventCategoryMethods(eventCategories) {
  return Object.entries(eventCategories)
    .map(
      ([typeName, eventCategory]) => `func (*${typeName}) EventCategory() string {
\treturn ${JSON.stringify(eventCategory)}
}`,
    )
    .join("\n\n");
}

function renderMapStructMethods(typeName) {
  return `func (value *${typeName}) Scan(src interface{}) error {
\tif src == nil {
\t\t*value = ${typeName}{}
\t\treturn nil
\t}

\tmapVal := core.Map{}
\tif err := mapVal.Scan(src); err != nil {
\t\treturn err
\t}

\treturn core.MapToStruct(mapVal, value)
}

func (value ${typeName}) Value() (driver.Value, error) {
\tmapVal, err := core.StructToMap(value)
\tif err != nil {
\t\treturn nil, err
\t}

\treturn core.Map(mapVal).Value()
}`;
}

function renderGeneratedHelperFile(pkg, spec) {
  const imports = new Map();
  const sections = [];

  if (spec.mapStructTypes?.length) {
    imports.set("database/sql/driver", null);
    imports.set("github.com/meshery/schemas/models/core", "core");
    sections.push(spec.mapStructTypes.map(renderMapStructMethods).join("\n\n"));
  }

  if (spec.eventCategories && Object.keys(spec.eventCategories).length > 0) {
    sections.push(renderEventCategoryMethods(spec.eventCategories));
  }

  if (sections.length === 0) {
    return null;
  }

  const importBlock = imports.size
    ? `import (\n${[...imports.entries()]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([importPath, alias]) =>
          alias ? `\t${alias} ${JSON.stringify(importPath)}` : `\t${JSON.stringify(importPath)}`,
        )
        .join("\n")}\n)\n\n`
    : "";

  return `// Code generated by build/generate-golang.js; DO NOT EDIT.\npackage ${pkg.name}\n\n${importBlock}${sections.join("\n\n")}\n`;
}

function writeGeneratedHelperFile(pkg, outputDir) {
  const filePath = path.join(outputDir, "zz_generated.helpers.go");
  const outputPath = path.join(outputDir, `${pkg.name}.go`);
  if (!fs.existsSync(outputPath)) {
    return null;
  }

  const spec = inferHelperSpec(pkg, outputPath, outputDir);
  const content = renderGeneratedHelperFile(pkg, spec);
  if (!content) {
    return null;
  }

  if (!content) {
    if (fs.existsSync(filePath)) {
      fs.rmSync(filePath, { force: true });
    }
    return null;
  }

  fs.writeFileSync(filePath, content, "utf-8");
  return filePath;
}

module.exports = {
  writeGeneratedHelperFile,
};
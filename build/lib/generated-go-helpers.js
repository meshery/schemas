const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

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
  const lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
  const localStructTypes = new Set();
  const dbReferencedLocalStructs = new Set();
  let currentStructName = null;
  let structDepth = 0;

  for (const line of lines) {
    const structMatch = line.match(/^type\s+(\w+)\s+struct\s*\{\s*$/);
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
    const closes = (line.match(/}/g) || []).length;
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
    .filter((name) => name.endsWith(".go") && name !== "zz_generated.helpers.go")
    .sort();

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

function collectDeclaredIdentifiers(outputDir) {
  const identifiers = new Set();
  const goFiles = fs
    .readdirSync(outputDir)
    .filter((name) => name.endsWith(".go") && name !== "zz_generated.helpers.go")
    .sort();

  for (const fileName of goFiles) {
    const filePath = path.join(outputDir, fileName);
    const lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
    let constOrVarBlock = false;

    for (const line of lines) {
      const typeMatch = line.match(/^type\s+(\w+)\b/);
      if (typeMatch) {
        identifiers.add(typeMatch[1]);
      }

      const funcMatch = line.match(/^func(?:\s*\([^)]*\))?\s+(\w+)\b/);
      if (funcMatch) {
        identifiers.add(funcMatch[1]);
      }

      const singleValueMatch = line.match(/^(?:const|var)\s+(\w+)\b(?!\s*\()/);
      if (singleValueMatch) {
        identifiers.add(singleValueMatch[1]);
      }

      if (/^(?:const|var)\s*\($/.test(line)) {
        constOrVarBlock = true;
        continue;
      }

      if (constOrVarBlock) {
        if (/^\s*\)/.test(line)) {
          constOrVarBlock = false;
          continue;
        }

        const blockEntryMatch = line.match(/^\s*(\w+)\b/);
        if (blockEntryMatch) {
          identifiers.add(blockEntryMatch[1]);
        }
      }
    }
  }

  return identifiers;
}

function collectCompatibilityEnumAliases(outputPath, outputDir) {
  const lines = fs.readFileSync(outputPath, "utf-8").split(/\r?\n/);
  const declaredIdentifiers = collectDeclaredIdentifiers(outputDir);
  const enumAliases = {};
  let currentConstEntries = [];

  function flushConstEntries() {
    const entriesByType = new Map();

    for (const entry of currentConstEntries) {
      const typedEntries = entriesByType.get(entry.typeName) || [];
      typedEntries.push(entry);
      entriesByType.set(entry.typeName, typedEntries);
    }

    for (const [typeName, entries] of entriesByType.entries()) {
      if (!typeName.endsWith("Value")) {
        continue;
      }

      const aliases = [];
      for (const entry of entries) {
        if (!entry.name.startsWith(typeName)) {
          continue;
        }

        const shortName = entry.name.slice(typeName.length);
        if (!shortName || declaredIdentifiers.has(shortName)) {
          continue;
        }

        aliases.push({
          shortName,
          canonicalName: entry.name,
        });
        declaredIdentifiers.add(shortName);
      }

      if (aliases.length > 0) {
        enumAliases[typeName] = aliases;
      }
    }

    currentConstEntries = [];
  }

  for (const line of lines) {
    if (/^const\s*\($/.test(line)) {
      currentConstEntries = [];
      continue;
    }

    if (currentConstEntries.length > 0 || /^\s*\w+\s+\w+\s+=\s+/.test(line)) {
      if (/^\s*\)/.test(line)) {
        flushConstEntries();
        continue;
      }

      const constMatch = line.match(/^\s*(\w+)\s+(\w+)\s+=\s+/);
      if (constMatch) {
        currentConstEntries.push({
          name: constMatch[1],
          typeName: constMatch[2],
        });
      }
    }
  }

  if (currentConstEntries.length > 0) {
    flushConstEntries();
  }

  return enumAliases;
}

function collectSchemaAnnotatedDbHelperTypes(pkg) {
  const schemaPath = path.resolve(__dirname, "../..", pkg.openapiPath);
  if (!fs.existsSync(schemaPath)) {
    return new Set();
  }

  try {
    const doc = yaml.load(fs.readFileSync(schemaPath, "utf-8"));
    const schemas = doc?.components?.schemas;
    if (!schemas || typeof schemas !== "object") {
      return new Set();
    }

    const annotatedTypes = new Set();
    for (const [schemaName, schemaDef] of Object.entries(schemas)) {
      if (schemaDef?.["x-generate-db-helpers"] === true) {
        annotatedTypes.add(schemaName);
      }
    }

    return annotatedTypes;
  } catch {
    return new Set();
  }
}

function inferHelperSpec(pkg, outputPath, outputDir) {
  const { localStructTypes, dbReferencedLocalStructs } = collectGeneratedStructInfo(outputPath);
  const existingHelperMethods = collectExistingHelperMethods(outputDir);
  const primaryType = toPascalCase(pkg.name);
  const enumAliases = collectCompatibilityEnumAliases(outputPath, outputDir);
  const schemaAnnotatedTypes = collectSchemaAnnotatedDbHelperTypes(pkg);

  // Merge db-referenced types with schema-annotated types (x-generate-db-helpers: true)
  const candidateTypes = new Set([
    ...dbReferencedLocalStructs,
    ...[...schemaAnnotatedTypes].filter((typeName) => localStructTypes.has(typeName)),
  ]);

  const mapStructTypes = [...candidateTypes].filter(
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
    enumAliases,
    eventCategories,
    mapStructTypes,
  };
}

function renderEventCategoryMethods(eventCategories) {
  return Object.entries(eventCategories)
    .sort(([a], [b]) => a.localeCompare(b))
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

function renderCompatibilityEnumAliases(enumAliases) {
  return Object.entries(enumAliases)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([typeName, aliases]) => {
      const lines = [
        `// Deprecated aliases for ${typeName} constants.`,
        `const (`,
      ];

      for (const { shortName, canonicalName } of aliases) {
        lines.push(`\t// Deprecated: Use ${canonicalName} instead.`);
        lines.push(`\t${shortName} = ${canonicalName}`);
      }

      lines.push(`)`);
      return lines.join("\n");
    })
    .join("\n\n");
}

function renderGeneratedHelperFile(pkg, spec) {
  const imports = new Map();
  const sections = [];

  if (spec.enumAliases && Object.keys(spec.enumAliases).length > 0) {
    sections.push(renderCompatibilityEnumAliases(spec.enumAliases));
  }

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

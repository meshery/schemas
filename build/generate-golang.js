#!/usr/bin/env node
/**
 * generate-golang.js - Go Code Generation Script
 *
 * DESCRIPTION:
 *   Generates Go structs from source OpenAPI specifications using oapi-codegen.
 *   For each package, the script builds a temporary oapi-codegen configuration
 *   with import mappings derived from reachable external $ref targets so shared
 *   types can be reused across generated Go packages.
 *
 *   Schemas are discovered dynamically by walking the schemas/constructs directory
 *   and looking for directories containing an api.yml file (the index file for each construct).
 *
 * WHAT IT DOES:
 *   1. Discovers all schema packages from schemas/constructs/
 *   2. Generates Go structs with JSON and YAML struct tags using oapi-codegen
 *   3. Outputs Go files to models/<version>/<package>/
 *
 * USAGE:
 *   node build/generate-golang.js
 *
 * DEPENDENCIES:
 *   - oapi-codegen (Go tool)
 *
 * OUTPUT:
 *   - models/<version>/<package>/<package>.go
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execSync } = require("child_process");
const yaml = require("js-yaml");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");
const { commandExists } = require("./lib/exec");
const { writeGeneratedHelperFile } = require("./lib/generated-go-helpers");

/**
 * Add YAML struct tags alongside JSON ones in generated Go file
 * @param {string} filePath - Path to Go file
 */
/**
 * Remove self-referential type aliases like "type NullTime = NullTime".
 * These occur when x-go-type references a type defined manually in the
 * same package (e.g., core.NullTime in models/core/).
 */
function removeSelfReferentialAliases(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const selfRefPattern = /^type (\w+) = \1\s*$/gm;
  const cleaned = content.replace(selfRefPattern, "// type $1 — defined in manual helper file");
  if (cleaned !== content) {
    fs.writeFileSync(filePath, cleaned);
  }
}

/**
 * Ensure required Go imports are present. When oapi-codegen inlines
 * x-go-type values like uuid.UUID, it may omit the package import
 * in the consuming file.
 */
function ensureRequiredImports(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const needs = [];
  if (/\buuid\.UUID\b/.test(content) && !content.includes('"github.com/gofrs/uuid"')) {
    needs.push('\t"github.com/gofrs/uuid"');
  }
  if (needs.length === 0) return;
  // Insert into the import block that follows the package declaration.
  // Match the first "import (" ... ")" block only, not arbitrary ")".
  const importBlockRe = /(import\s*\([\s\S]*?)(\n\))/;
  content = content.replace(importBlockRe, `$1\n${needs.join("\n")}$2`);
  fs.writeFileSync(filePath, content);
}

function addYamlTags(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Add yaml struct tags matching the json tags
  // Pattern: json:"fieldName" -> json:"fieldName" yaml:"fieldName"
  content = content.replace(
    /json:"([^"]*)"(\s+yaml:"[^"]*")?/g,
    'json:"$1" yaml:"$1"',
  );

  fs.writeFileSync(filePath, content, "utf-8");
}

function sanitizeGoIdentifier(value) {
  const sanitized = value.replace(/[^A-Za-z0-9_]/g, "");
  if (!sanitized) {
    return "ref";
  }

  if (/^[0-9]/.test(sanitized)) {
    return `ref${sanitized}`;
  }

  return sanitized;
}

function exportGoIdentifier(value) {
  const sanitized = sanitizeGoIdentifier(value);
  return sanitized.charAt(0).toUpperCase() + sanitized.slice(1);
}

function buildReadableImportAlias(importPath, usedAliases) {
  const match = importPath.match(/\/models\/(v[^/]+)\/([^/]+)$/);
  let candidate;

  if (match) {
    const [, version, packageName] = match;
    candidate = `${sanitizeGoIdentifier(packageName)}${sanitizeGoIdentifier(version)}`;
  } else {
    const baseName = importPath.split("/").pop() || "ref";
    candidate = sanitizeGoIdentifier(baseName);
  }

  let alias = candidate;
  let suffix = 2;
  while (usedAliases.has(alias)) {
    alias = `${candidate}${suffix}`;
    suffix += 1;
  }

  usedAliases.add(alias);
  return alias;
}

function rewriteGoTypeAlias(goType, importInfo) {
  if (typeof goType !== "string" || goType.length === 0) {
    return null;
  }

  if (!importInfo?.path || typeof importInfo?.name !== "string" || importInfo.name.length === 0) {
    return goType;
  }

  return goType.replace(
    /([A-Za-z_][A-Za-z0-9_]*)\.(\w+(?:\.\w+)*)/,
    `${importInfo.name}.$2`,
  );
}

function parseOptionalPointerOverride(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return null;
}

function applyGoTypeOverride(currentFieldType, desiredGoType, optionalPointerOverride) {
  if (typeof desiredGoType !== "string" || desiredGoType.length === 0) {
    return currentFieldType;
  }

  if (desiredGoType.startsWith("*")) {
    return desiredGoType;
  }

  if (optionalPointerOverride === true) {
    return desiredGoType;
  }

  if (optionalPointerOverride === false || currentFieldType.startsWith("*")) {
    return `*${desiredGoType}`;
  }

  return desiredGoType;
}

function chooseImportAlias(importPath, preferredAliases, usedAliases) {
  const preferredAlias = preferredAliases.get(importPath);
  if (preferredAlias && !usedAliases.has(preferredAlias)) {
    usedAliases.add(preferredAlias);
    return preferredAlias;
  }

  return buildReadableImportAlias(importPath, usedAliases);
}

function schemaNodeToGoType(schemaNode) {
  if (!schemaNode || typeof schemaNode !== "object") {
    return null;
  }

  if (typeof schemaNode["x-go-type"] === "string" && schemaNode["x-go-type"].length > 0) {
    return rewriteGoTypeAlias(schemaNode["x-go-type"], schemaNode["x-go-type-import"]);
  }

  if (typeof schemaNode.type === "string") {
    switch (schemaNode.type) {
      case "boolean":
        return "bool";
      case "integer":
        return "int";
      case "number":
        return "float64";
      case "string":
        return "string";
      default:
        return null;
    }
  }

  return null;
}

function resolveParameterAliasType(parameterDefinition, options) {
  if (!parameterDefinition || typeof parameterDefinition !== "object") {
    return null;
  }

  if (typeof parameterDefinition.$ref === "string") {
    const resolvedParameter = resolveSchemaRef(parameterDefinition.$ref, options);
    return resolveParameterAliasType(resolvedParameter, {
      ...options,
      seenRefs: new Set([...(options.seenRefs || []), parameterDefinition.$ref]),
    });
  }

  if (parameterDefinition.schema && typeof parameterDefinition.schema === "object") {
    if (typeof parameterDefinition.schema.$ref === "string") {
      const resolvedSchema = resolveSchemaRef(parameterDefinition.schema.$ref, options);
      return schemaNodeToGoType(resolvedSchema);
    }

    return schemaNodeToGoType(parameterDefinition.schema);
  }

  return null;
}

function rewriteExternalRefAliases(filePath, inputPath) {
  let content = fs.readFileSync(filePath, "utf-8");
  const importBlockMatch = content.match(/import \(([^]*?)\n\)/m);
  if (!importBlockMatch) {
    return;
  }

  function parseImportEntries(block) {
    return block
      .split("\n")
      .map((line) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
          return null;
        }

        const importMatch = trimmedLine.match(/^(?:(\w+)\s+)?"([^"]+)"$/);
        if (!importMatch) {
          return null;
        }

        const [, explicitAlias, importPath] = importMatch;
        return {
          explicitAlias,
          importPath,
          resolvedAlias: explicitAlias || sanitizeGoIdentifier(path.basename(importPath)),
        };
      })
      .filter(Boolean);
  }

  const usedAliases = new Set();
  const aliasMappings = [];
  const aliasByImportPath = new Map();
  const preferredAliases = collectPreferredImportAliases(inputPath);
  const originalImportBlock = importBlockMatch[1];
  const originalImportEntries = parseImportEntries(originalImportBlock);

  for (const { explicitAlias, importPath } of originalImportEntries) {
    const reservedAlias = explicitAlias || sanitizeGoIdentifier(path.basename(importPath));
    if (reservedAlias && !/^externalRef\d+$/.test(reservedAlias)) {
      usedAliases.add(reservedAlias);
      aliasByImportPath.set(importPath, reservedAlias);
    }
  }

  const importBlock = importBlockMatch[1].replace(
    /^(\s*)(externalRef\d+)\s+"([^"]+)"$/gm,
    (_, indent, alias, importPath) => {
      const readableAlias =
        aliasByImportPath.get(importPath) ||
        chooseImportAlias(importPath, preferredAliases, usedAliases);
      aliasByImportPath.set(importPath, readableAlias);
      aliasMappings.push({ alias, readableAlias });
      return `${indent}${readableAlias} "${importPath}"`;
    },
  );

  if (aliasMappings.length === 0) {
    return;
  }

  const seenImportPaths = new Set();
  const normalizedImportBlock = importBlock
    .split("\n")
    .filter((line) => {
      const importPathMatch = line.match(/"([^"]+)"/);
      if (!importPathMatch) {
        return true;
      }

      const importPath = importPathMatch[1];
      if (seenImportPaths.has(importPath)) {
        return false;
      }

      seenImportPaths.add(importPath);
      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+/, "\n")
    .replace(/\n+$/, "");

  const canonicalAliasByImportPath = new Map(
    parseImportEntries(normalizedImportBlock).map((entry) => [entry.importPath, entry.resolvedAlias]),
  );

  for (const { importPath, resolvedAlias } of originalImportEntries) {
    const canonicalAlias = canonicalAliasByImportPath.get(importPath);
    if (canonicalAlias && resolvedAlias !== canonicalAlias) {
      aliasMappings.push({ alias: resolvedAlias, readableAlias: canonicalAlias });
    }
  }

  content = content.replace(importBlockMatch[0], `import (${normalizedImportBlock}\n)`);

  const uniqueAliasMappings = [...new Map(aliasMappings.map((entry) => [entry.alias, entry])).values()];

  for (const { alias, readableAlias } of uniqueAliasMappings) {
    content = content.replace(new RegExp(`\\b${alias}\\b`, "g"), readableAlias);
    content = content.replace(
      new RegExp(`\\b${exportGoIdentifier(alias)}(?=[A-Z])`, "g"),
      exportGoIdentifier(readableAlias),
    );
  }

  fs.writeFileSync(filePath, content, "utf-8");
}

function setOrReplaceStructTag(rawTags, tagName, tagValue) {
  const sanitizedValue = String(tagValue).replace(/"/g, '\\"');
  const nextTag = `${tagName}:"${sanitizedValue}"`;
  const tagPattern = new RegExp(`(^|\\s)${tagName}:"(?:\\\\.|[^"])*"`);

  if (tagPattern.test(rawTags)) {
    return rawTags.replace(tagPattern, (match, leadingWhitespace) => `${leadingWhitespace}${nextTag}`);
  }

  return `${nextTag} ${rawTags}`;
}

function resolveSchemaRef(ref, options) {
  const {
    document,
    inputDir,
    inputPath,
    resolvedSchemaCache,
    seenRefs = new Set(),
    missingFile = "null",
  } = options;

  if (seenRefs.has(ref)) {
    return null;
  }

  if (resolvedSchemaCache.has(ref)) {
    return resolvedSchemaCache.get(ref);
  }

  const { refPath, fragment } = splitRef(ref);
  let targetDocument = document;

  if (refPath) {
    if (/^https?:\/\//.test(refPath)) {
      return null;
    }

    const resolvedRefPath = path.resolve(inputDir, refPath);
    if (!fs.existsSync(resolvedRefPath)) {
      if (missingFile === "throw") {
        throw new Error(`Unable to resolve referenced schema file '${refPath}' from ${inputPath}`);
      }
      return null;
    }

    targetDocument = loadYamlFile(resolvedRefPath);
  }

  let resolvedNode;
  try {
    resolvedNode = getNodeByFragment(targetDocument, fragment, ref);
  } catch (err) {
    if (missingFile === "throw") {
      throw err;
    }
    return null;
  }

  resolvedSchemaCache.set(ref, resolvedNode);
  return resolvedNode;
}

function collectSchemaExtraTags(inputPath) {
  const extraTagsByStruct = new Map();
  const document = loadYamlFile(inputPath) || {};
  const inputDir = path.dirname(inputPath);
  const resolvedSchemaCache = new Map();

  function createPropertyTagEntry(propertyName, propertyDefinition) {
    if (!propertyDefinition || typeof propertyDefinition !== "object") {
      return null;
    }

    const extraTags = propertyDefinition["x-oapi-codegen-extra-tags"];
    const normalizedExtraTags = extraTags && typeof extraTags === "object" ? { ...extraTags } : {};
    const propertyGoType =
      typeof propertyDefinition["x-go-type"] === "string"
        ? rewriteGoTypeAlias(
            propertyDefinition["x-go-type"],
            propertyDefinition["x-go-type-import"],
          )
        : null;
    const itemGoType =
      !propertyGoType &&
      propertyDefinition.type === "array" &&
      propertyDefinition.items &&
      typeof propertyDefinition.items === "object" &&
      typeof propertyDefinition.items["x-go-type"] === "string"
        ? `[]${rewriteGoTypeAlias(
            propertyDefinition.items["x-go-type"],
            propertyDefinition.items["x-go-type-import"],
          )}`
        : null;
    const goType = propertyGoType || itemGoType;
    const goName =
      typeof propertyDefinition["x-go-name"] === "string" &&
      propertyDefinition["x-go-name"].length > 0
        ? propertyDefinition["x-go-name"]
        : propertyName === "id"
          ? "ID"
          : null;
    const optionalPointerOverride = parseOptionalPointerOverride(
      propertyDefinition["x-go-type-skip-optional-pointer"],
    );

    if (
      Object.keys(normalizedExtraTags).length === 0 &&
      !goName &&
      !goType &&
      optionalPointerOverride === null
    ) {
      return null;
    }

    const candidateJsonNames = new Set([propertyName]);
    if (typeof normalizedExtraTags.json === "string" && normalizedExtraTags.json.length > 0) {
      candidateJsonNames.add(normalizedExtraTags.json);
      candidateJsonNames.add(normalizedExtraTags.json.split(",", 1)[0]);
    }

    return {
      propertyName,
      candidateJsonNames: [...candidateJsonNames],
      extraTags: normalizedExtraTags,
      goName,
      goType,
      optionalPointerOverride,
    };
  }

  function collectPropertyTags(schemaDefinition, seenRefs = new Set()) {
    if (!schemaDefinition || typeof schemaDefinition !== "object") {
      return [];
    }

    const propertyTags = new Map();

    if (typeof schemaDefinition.$ref === "string") {
      const resolvedSchema = resolveSchemaRef(schemaDefinition.$ref, {
        document,
        inputDir,
        inputPath,
        resolvedSchemaCache,
        seenRefs,
        missingFile: "throw",
      });
      for (const entry of collectPropertyTags(resolvedSchema, new Set([...seenRefs, schemaDefinition.$ref]))) {
        propertyTags.set(entry.propertyName, entry);
      }
    }

    if (Array.isArray(schemaDefinition.allOf)) {
      for (const subschema of schemaDefinition.allOf) {
        for (const entry of collectPropertyTags(subschema, new Set(seenRefs))) {
          propertyTags.set(entry.propertyName, entry);
        }
      }
    }

    if (schemaDefinition.properties && typeof schemaDefinition.properties === "object") {
      for (const [propertyName, propertyDefinition] of Object.entries(schemaDefinition.properties)) {
        const entry = createPropertyTagEntry(propertyName, propertyDefinition);
        if (entry) {
          propertyTags.set(propertyName, entry);
        }
      }
    }

    return [...propertyTags.values()];
  }

  function appendPropertyTags(structName, schemaDefinition) {
    if (!schemaDefinition || typeof schemaDefinition !== "object") {
      return;
    }

    const propertyTags = collectPropertyTags(schemaDefinition);

    if (propertyTags.length > 0) {
      extraTagsByStruct.set(structName, propertyTags);
    }
  }

  function toGeneratedStructName(schemaName) {
    if (!schemaName) {
      return schemaName;
    }

    return schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
  }
  const componentSchemas = document.components?.schemas || {};

  for (const [schemaName, schemaDefinition] of Object.entries(componentSchemas)) {
    if (!schemaDefinition || typeof schemaDefinition !== "object") {
      continue;
    }

    appendPropertyTags(schemaName, schemaDefinition);
    appendPropertyTags(toGeneratedStructName(schemaName), schemaDefinition);
  }

  return extraTagsByStruct;
}

function collectGeneratedStructTags(filePath) {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const generatedTagsByStruct = new Map();
  let currentStructName = null;
  let structDepth = 0;
  const anonymousStructFields = [];

  for (const line of lines) {
    const structMatch = line.match(/^type\s+(\w+)\s+struct\s*\{$/);
    if (structMatch) {
      currentStructName = structMatch[1];
      structDepth = 1;
      if (!generatedTagsByStruct.has(currentStructName)) {
        generatedTagsByStruct.set(currentStructName, new Map());
      }
      continue;
    }

    if (!currentStructName) {
      continue;
    }

    const anonymousStructEndMatch = line.match(/^\s*}\s*`([^`]*)`/);
    if (anonymousStructEndMatch && anonymousStructFields.length > 0) {
      const rawTags = anonymousStructEndMatch[1];
      const jsonMatch = rawTags.match(/json:"([^",]+)(?:,[^"]*)?"/);
      const fieldName = anonymousStructFields.pop();
      if (jsonMatch) {
        generatedTagsByStruct
          .get(currentStructName)
          .set(jsonMatch[1], {
            rawTags,
            fieldName,
          });
      }
    }

    if (structDepth === 1) {
      const anonymousStructStartMatch = line.match(/^\s*(\w+)\s+.+\bstruct\s*\{$/);
      if (anonymousStructStartMatch) {
        anonymousStructFields.push(anonymousStructStartMatch[1]);
      }

      const fieldMatch = line.match(/^\s*\w+[^`]*`([^`]*)`/);
      if (fieldMatch) {
        const rawTags = fieldMatch[1];
        const jsonMatch = rawTags.match(/json:"([^",]+)(?:,[^"]*)?"/);
        if (jsonMatch) {
          generatedTagsByStruct
            .get(currentStructName)
            .set(jsonMatch[1], {
              rawTags,
              fieldName: line.trim().split(/\s+/, 2)[0],
            });
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

  return generatedTagsByStruct;
}

function addSchemaExtraTags(filePath, inputPath) {
  const extraTagsByStruct = collectSchemaExtraTags(inputPath);
  if (extraTagsByStruct.size === 0) {
    return;
  }

  function mergeTag(rawTags, tagName, tagValue) {
    const sanitizedValue = String(tagValue).replace(/"/g, '\\"');
    const tagPattern = new RegExp(`${tagName}:"[^"]*"`);

    if (tagPattern.test(rawTags)) {
      return rawTags.replace(tagPattern, `${tagName}:"${sanitizedValue}"`);
    }

    return `${tagName}:"${sanitizedValue}" ${rawTags}`;
  }

  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  let currentStructName = null;
  let structDepth = 0;
  const anonymousStructFields = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const structMatch = line.match(/^type\s+(\w+)\s+struct\s*\{$/);
    if (structMatch) {
      currentStructName = structMatch[1];
      structDepth = 1;
      continue;
    }

    if (!currentStructName) {
      continue;
    }

    const anonymousStructEndMatch = line.match(/^(\s*})\s*`([^`]*)`/);
    if (anonymousStructEndMatch && anonymousStructFields.length > 0) {
      const rawTags = anonymousStructEndMatch[2];
      const jsonMatch = rawTags.match(/json:"([^",]+)(?:,[^"]*)?"/);
      const propertyTags = jsonMatch
        ? extraTagsByStruct
            .get(currentStructName)
            ?.find((entry) => entry.candidateJsonNames.includes(jsonMatch[1]))
        : null;

      if (propertyTags) {
        let updatedTags = rawTags;

        for (const [tagName, tagValue] of Object.entries(propertyTags.extraTags)) {
          updatedTags = setOrReplaceStructTag(updatedTags, tagName, tagValue);
        }

        if (updatedTags !== rawTags) {
          lines[index] = line.replace(`\`${rawTags}\``, `\`${updatedTags}\``);
        }
      }

      anonymousStructFields.pop();
    }

    if (structDepth === 1) {
      const anonymousStructStartMatch = line.match(/^\s*(\w+)\s+.+\bstruct\s*\{$/);
      if (anonymousStructStartMatch) {
        anonymousStructFields.push(anonymousStructStartMatch[1]);
      }

      const fieldMatch = line.match(/^\s*\w+[^`]*`([^`]*)`/);
      if (fieldMatch) {
        const rawTags = fieldMatch[1];
        const jsonMatch = rawTags.match(/json:"([^",]+)(?:,[^"]*)?"/);
        if (jsonMatch) {
          const propertyTags = extraTagsByStruct
            .get(currentStructName)
            ?.find((entry) => entry.candidateJsonNames.includes(jsonMatch[1]));

          if (propertyTags) {
            let updatedLine = line;
            let updatedTags = rawTags;

            if (propertyTags.goName) {
              const fieldNameMatch = updatedLine.match(/^(\s*)(\w+)(\s+.+`[^`]*`)$/);
              if (fieldNameMatch && fieldNameMatch[2] !== propertyTags.goName) {
                updatedLine = `${fieldNameMatch[1]}${propertyTags.goName}${fieldNameMatch[3]}`;
              }
            }

            if (propertyTags.goType) {
              const fieldTypeMatch = updatedLine.match(/^(\s*\w+\s+)(\S+)(\s+`[^`]*`.*)$/);
              if (fieldTypeMatch) {
                const nextFieldType = applyGoTypeOverride(
                  fieldTypeMatch[2],
                  propertyTags.goType,
                  propertyTags.optionalPointerOverride,
                );

                if (fieldTypeMatch[2] !== nextFieldType) {
                  updatedLine = `${fieldTypeMatch[1]}${nextFieldType}${fieldTypeMatch[3]}`;
                }
              }
            }

            for (const [tagName, tagValue] of Object.entries(propertyTags.extraTags)) {
              updatedTags = setOrReplaceStructTag(updatedTags, tagName, tagValue);
            }

            if (updatedTags !== rawTags) {
              updatedLine = updatedLine.replace(`\`${rawTags}\``, `\`${updatedTags}\``);
            }

            lines[index] = updatedLine;
          }
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

  fs.writeFileSync(filePath, lines.join("\n"), "utf-8");
}

function addCompatibilityParameterAliases(filePath, inputPath) {
  const document = loadYamlFile(inputPath) || {};
  const inputDir = path.dirname(inputPath);
  const resolvedSchemaCache = new Map();
  const parameterNames = Object.keys(document.components?.parameters || {});
  if (parameterNames.length === 0) {
    return;
  }

  let content = fs.readFileSync(filePath, "utf-8");

  function extractTypeQualifier(typeExpression) {
    if (typeof typeExpression !== "string") {
      return null;
    }

    const normalizedType = typeExpression.replace(/^\*+/, "").replace(/^\[\]/, "");
    const qualifierMatch = normalizedType.match(/^([A-Za-z_][A-Za-z0-9_]*)\./);
    return qualifierMatch ? qualifierMatch[1] : null;
  }

  function hasImportAlias(typeQualifier) {
    if (!typeQualifier) {
      return true;
    }

    const importBlockMatch = content.match(/import \(([^]*?)\n\)/m);
    if (!importBlockMatch) {
      return false;
    }

    return importBlockMatch[1]
      .split("\n")
      .some((line) => line.trim().startsWith(`${typeQualifier} `));
  }

  for (const parameterName of parameterNames) {
    const exportedName = exportGoIdentifier(parameterName);
    const aliasPattern = new RegExp(`(^// .*\\n)?^type (\\w+${exportedName}) = (.+)$`, "m");
    const aliasMatch = content.match(aliasPattern);
    if (!aliasMatch || aliasMatch[2] === exportedName) {
      continue;
    }

    const schemaTypeExpression = resolveParameterAliasType(document.components.parameters[parameterName], {
      document,
      inputDir,
      inputPath,
      resolvedSchemaCache,
      seenRefs: new Set(),
      missingFile: "throw",
    });
    const currentTypeExpression = aliasMatch[3].trim();
    const nextTypeExpression = schemaTypeExpression || currentTypeExpression;
    const currentQualifier = extractTypeQualifier(currentTypeExpression);
    const nextQualifier = extractTypeQualifier(nextTypeExpression);
    const typeExpression = !hasImportAlias(nextQualifier) && hasImportAlias(currentQualifier)
      ? currentTypeExpression
      : nextTypeExpression;
    const directAliasPattern = new RegExp(
      `(^// ${exportedName} defines model for ${parameterName}\\.\\n)?^type ${exportedName} = .+$`,
      "m",
    );
    const directAlias = `// ${exportedName} defines model for ${parameterName}.\ntype ${exportedName} = ${typeExpression}`;

    if (directAliasPattern.test(content)) {
      content = content.replace(directAliasPattern, directAlias);
      content = content.replace(new RegExp(`${aliasMatch[0]}\\n+`, "m"), "");
      continue;
    }

    content = content.replace(aliasPattern, directAlias);
  }

  fs.writeFileSync(filePath, content, "utf-8");
}

function validateReadableImportAliases(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const opaqueAliases = [...content.matchAll(/\bexternalRef\d+\b/g)].map((match) => match[0]);

  if (opaqueAliases.length > 0) {
    throw new Error(
      `Generated Go file still contains opaque import aliases: ${[...new Set(opaqueAliases)].join(", ")}`,
    );
  }
}
function validateGeneratedDbTags(filePath, inputPath) {
  const extraTagsByStruct = collectSchemaExtraTags(inputPath);
  const generatedTagsByStruct = collectGeneratedStructTags(filePath);
  const failures = [];

  for (const [structName, propertyTags] of extraTagsByStruct.entries()) {
    const generatedPropertyTags = generatedTagsByStruct.get(structName);
    if (!generatedPropertyTags) {
      continue;
    }

    for (const entry of propertyTags) {
      const { propertyName, candidateJsonNames, extraTags } = entry;
      const generatedField = candidateJsonNames
        .map((candidateName) => generatedPropertyTags.get(candidateName))
        .find(Boolean);

      if (Object.prototype.hasOwnProperty.call(extraTags, "db")) {
        const expectedDbTag = `db:"${String(extraTags.db).replace(/"/g, '\\"')}"`;
        if (!generatedField || !generatedField.rawTags.includes(expectedDbTag)) {
          failures.push(
            `${structName}.${propertyName} expected ${expectedDbTag} in generated tags`,
          );
        }
      }

      if (entry.goName && generatedField && generatedField.fieldName !== entry.goName) {
        failures.push(
          `${structName}.${propertyName} expected field name ${entry.goName} but generated ${generatedField.fieldName}`,
        );
      } else if (entry.goName && !generatedField) {
        failures.push(
          `${structName}.${propertyName} expected field name ${entry.goName} but no generated field was found`,
        );
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(
      "Generated Go structs do not match schema-declared tags or field names:\n" +
        failures.map((failure) => `  - ${failure}`).join("\n"),
    );
  }
}

/**
 * Verify that every schema property's json tag in the generated Go code
 * matches the schema property name. This is the belt-and-suspenders check
 * that catches oapi-codegen regressions or post-processing bugs.
 *
 * The property name IS the json tag (oapi-codegen hardcodes this). When
 * x-oapi-codegen-extra-tags.json is declared it may replace the tag, but
 * Rule 27 in the validator already ensures it equals the property name.
 * This function confirms the generated output is consistent end-to-end.
 */
function validateGeneratedJsonTags(filePath, inputPath) {
  const generatedTagsByStruct = collectGeneratedStructTags(filePath);
  const document = loadYamlFile(inputPath) || {};
  const componentSchemas = document.components?.schemas || {};
  const failures = [];

  function toStructName(schemaName) {
    if (!schemaName) return schemaName;
    return schemaName.charAt(0).toUpperCase() + schemaName.slice(1);
  }

  for (const [schemaName, schemaDef] of Object.entries(componentSchemas)) {
    if (!schemaDef || typeof schemaDef !== "object") continue;

    const structName = toStructName(schemaName);
    const generatedProps = generatedTagsByStruct.get(structName);
    if (!generatedProps) continue;

    // Collect all property names from this schema (including allOf)
    const propertyNames = new Set();
    function collectProps(def) {
      if (!def || typeof def !== "object") return;
      if (def.properties) {
        for (const name of Object.keys(def.properties)) {
          propertyNames.add(name);
        }
      }
      if (Array.isArray(def.allOf)) {
        for (const sub of def.allOf) {
          // Only collect inline properties, not $ref schemas (those become
          // their own structs and are validated separately).
          if (!sub.$ref) collectProps(sub);
        }
      }
    }
    collectProps(schemaDef);

    for (const propName of propertyNames) {
      // The expected json tag base name. If x-oapi-codegen-extra-tags.json
      // is declared, it may differ (e.g. adding omitempty or suppressing
      // with "-"). In those cases the explicit tag is authoritative and
      // Rule 27 validates it matches the property name, so we skip here.
      const propDef = schemaDef.properties?.[propName];
      const explicitJson = propDef?.["x-oapi-codegen-extra-tags"]?.json;
      if (explicitJson !== undefined) {
        // Explicit override — validated by Rule 27; skip here.
        continue;
      }

      // Fields excluded from serialization (json:"-") are not expected.
      const generatedField = generatedProps.get(propName);
      if (!generatedField) {
        // Property may be from a $ref that oapi-codegen inlines differently,
        // or a property that maps to an embedded struct. Not finding it in
        // the flat struct fields is not necessarily an error — skip.
        continue;
      }

      // Verify the json tag base name matches the property name.
      const jsonMatch = generatedField.rawTags.match(/json:"([^",]+)(?:,[^"]*)?"/);
      if (!jsonMatch) {
        failures.push(
          `${structName}.${propName} — no json tag found in generated tags: \`${generatedField.rawTags}\``,
        );
        continue;
      }

      const generatedJsonName = jsonMatch[1];
      if (generatedJsonName !== propName && generatedJsonName !== "-") {
        failures.push(
          `${structName}.${propName} — json tag "${generatedJsonName}" does not match ` +
            `schema property name "${propName}"`,
        );
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(
      "Generated Go json tags do not match schema property names:\n" +
        failures.map((f) => `  - ${f}`).join("\n"),
    );
  }
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function splitRef(ref) {
  const hashIndex = ref.indexOf("#");
  if (hashIndex === -1) {
    return { refPath: ref, fragment: "" };
  }

  return {
    refPath: ref.slice(0, hashIndex),
    fragment: ref.slice(hashIndex + 1),
  };
}

function decodeJsonPointerSegment(segment) {
  return segment.replace(/~1/g, "/").replace(/~0/g, "~");
}

function getNodeByFragment(targetDocument, fragment, ref) {
  if (!fragment) {
    return targetDocument;
  }

  if (!fragment.startsWith("/")) {
    throw new Error(`Unsupported JSON pointer fragment '${fragment}' in ref '${ref}'`);
  }

  let currentNode = targetDocument;
  for (const segment of fragment.slice(1).split("/").map(decodeJsonPointerSegment)) {
    if (!currentNode || typeof currentNode !== "object" || !(segment in currentNode)) {
      throw new Error(`Unable to resolve ref '${ref}' while generating Go models`);
    }
    currentNode = currentNode[segment];
  }

  return currentNode;
}

function loadYamlFile(filePath) {
  try {
    return yaml.load(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    throw new Error(`Failed to parse schema file ${filePath}: ${err.message}`);
  }
}

function collectPreferredImportAliases(inputPath) {
  const preferredAliases = new Map();
  const document = loadYamlFile(inputPath) || {};
  const inputDir = path.dirname(inputPath);
  const resolvedSchemaCache = new Map();

  function visitNode(node, seenRefs = new Set()) {
    if (Array.isArray(node)) {
      for (const item of node) {
        visitNode(item, seenRefs);
      }
      return;
    }

    if (!node || typeof node !== "object") {
      return;
    }

    if (
      node["x-go-type-import"] &&
      typeof node["x-go-type-import"] === "object" &&
      typeof node["x-go-type-import"].path === "string" &&
      typeof node["x-go-type-import"].name === "string" &&
      node["x-go-type-import"].name.length > 0
    ) {
      preferredAliases.set(node["x-go-type-import"].path, node["x-go-type-import"].name);
    }

    if (typeof node.$ref === "string") {
      const resolved = resolveSchemaRef(node.$ref, {
        document,
        inputDir,
        inputPath,
        resolvedSchemaCache,
        seenRefs,
        missingFile: "null",
      });
      if (resolved) {
        visitNode(resolved, new Set([...seenRefs, node.$ref]));
      }
    }

    for (const value of Object.values(node)) {
      visitNode(value, seenRefs);
    }
  }

  visitNode(document);
  return preferredAliases;
}

function collectRefs(node, refs = new Set()) {
  if (Array.isArray(node)) {
    for (const item of node) {
      collectRefs(item, refs);
    }
    return refs;
  }

  if (!node || typeof node !== "object") {
    return refs;
  }

  if (typeof node.$ref === "string") {
    refs.add(node.$ref);
  }

  for (const value of Object.values(node)) {
    collectRefs(value, refs);
  }

  return refs;
}

function getPackageRoot(pkg) {
  return path.dirname(paths.fromRoot(pkg.openapiPath));
}

function getPackageKey(pkg) {
  return `${pkg.version}/${pkg.dirName}`;
}

/**
 * Go import overrides for packages where the Go models live at a
 * different path than the schema version would imply.
 */
const GO_IMPORT_OVERRIDES = {
  // Core types are unversioned — all versions resolve to models/core.
  "v1alpha1/core": "github.com/meshery/schemas/models/core",
  "v1beta1/core": "github.com/meshery/schemas/models/core",
  "v1beta2/core": "github.com/meshery/schemas/models/core",
  "v1beta1/capability": "github.com/meshery/schemas/models/v1alpha1/capability",
  "v1beta2/catalog": "github.com/meshery/schemas/models/v1alpha2/catalog",
};

function getPackageImportPath(pkg) {
  const key = `${pkg.version}/${pkg.dirName}`;
  return GO_IMPORT_OVERRIDES[key] || `github.com/meshery/schemas/models/${pkg.version}/${pkg.name}`;
}

function findPackageForFile(filePath) {
  const resolvedFile = fs.existsSync(filePath)
    ? fs.realpathSync(filePath)
    : path.resolve(filePath);
  const packages = config
    .getSchemaPackages()
    .map((pkg) => ({ ...pkg, root: getPackageRoot(pkg) }))
    .sort((left, right) => right.root.length - left.root.length);

  return (
    packages.find((pkg) => {
      const packageRoot = pkg.root;
      return (
        resolvedFile === packageRoot ||
        resolvedFile.startsWith(`${packageRoot}${path.sep}`)
      );
    }) || null
  );
}

const componentRefCache = new Map();

function findPackageComponentRef(targetPkg, targetFile, fragment = "") {
  const cacheKey = `${getPackageKey(targetPkg)}:${targetFile}#${fragment}`;
  if (componentRefCache.has(cacheKey)) {
    return componentRefCache.get(cacheKey);
  }

  const apiPath = paths.fromRoot(targetPkg.openapiPath);
  const apiDocument = loadYamlFile(apiPath) || {};
  const components = apiDocument.components || {};
  const matches = [];

  for (const [kind, definitions] of Object.entries(components)) {
    if (!definitions || typeof definitions !== "object") {
      continue;
    }

    for (const [name, definition] of Object.entries(definitions)) {
      if (!definition || typeof definition !== "object") {
        continue;
      }

      if (typeof definition.$ref !== "string" || definition.$ref.startsWith("#")) {
        continue;
      }

      const { refPath, fragment: componentFragment } = splitRef(definition.$ref);
      const resolvedComponentRef = path.resolve(path.dirname(apiPath), refPath);
      const resolvedTarget = fs.existsSync(targetFile)
        ? fs.realpathSync(targetFile)
        : path.resolve(targetFile);

      if (
        resolvedComponentRef === resolvedTarget &&
        componentFragment === fragment
      ) {
        matches.push({ kind, name });
      }
    }
  }

  if (matches.length > 1) {
    throw new Error(
      `Multiple component refs found for ${targetFile} in ${targetPkg.openapiPath}`,
    );
  }

  const match = matches[0] || null;
  componentRefCache.set(cacheKey, match);
  return match;
}

function transformRefs(node, transformRef) {
  if (Array.isArray(node)) {
    for (const item of node) {
      transformRefs(item, transformRef);
    }
    return;
  }

  if (!node || typeof node !== "object") {
    return;
  }

  if (typeof node.$ref === "string") {
    node.$ref = transformRef(node.$ref);
  }

  for (const value of Object.values(node)) {
    transformRefs(value, transformRef);
  }
}

function stagePackageSources(currentPkg, sourceInputPath) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), `meshery-oapi-src-${currentPkg.name}-`));
  const tempConstructsRoot = path.join(tempDir, "schemas", "constructs");
  const realConstructsRoot = paths.fromRoot(config.paths.schemasDir);
  const versionDirs = fs.readdirSync(realConstructsRoot, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));

  for (const versionEntry of versionDirs) {
    if (!versionEntry.isDirectory()) {
      continue;
    }

    const versionName = versionEntry.name;
    const realVersionPath = path.join(realConstructsRoot, versionName);
    const tempVersionPath = path.join(tempConstructsRoot, versionName);
    fs.mkdirSync(tempVersionPath, { recursive: true });

    for (const entry of fs.readdirSync(realVersionPath, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const realEntryPath = path.join(realVersionPath, entry.name);
      const tempEntryPath = path.join(tempVersionPath, entry.name);
      const isCurrentPackage =
        versionName === currentPkg.version && entry.name === currentPkg.dirName;

      if (isCurrentPackage) {
        fs.cpSync(realEntryPath, tempEntryPath, { recursive: true });
        continue;
      }

      fs.symlinkSync(realEntryPath, tempEntryPath);
    }
  }

  const stagedPackageRoot = path.join(
    tempConstructsRoot,
    currentPkg.version,
    currentPkg.dirName,
  );
  const stagedFiles = paths.findFiles(stagedPackageRoot, /\.(yml|yaml)$/);

  for (const stagedFile of stagedFiles) {
    const document = loadYamlFile(stagedFile);
    if (!document || typeof document !== "object") {
      continue;
    }

    transformRefs(document, (ref) => {
      if (typeof ref !== "string" || ref.startsWith("#") || /^https?:\/\//.test(ref)) {
        return ref;
      }

      const { refPath, fragment } = splitRef(ref);
      if (!refPath) {
        return ref;
      }

      const resolvedRef = path.resolve(path.dirname(stagedFile), refPath);
      const targetPkg = findPackageForFile(resolvedRef);
      if (!targetPkg || getPackageKey(targetPkg) === getPackageKey(currentPkg)) {
        return ref;
      }

      if (path.basename(resolvedRef) === "api.yml") {
        return ref;
      }

      const componentRef = findPackageComponentRef(targetPkg, resolvedRef, fragment);
      if (!componentRef) {
        return ref;
      }

      const targetApiPath = path.join(
        tempConstructsRoot,
        targetPkg.version,
        targetPkg.dirName,
        "api.yml",
      );
      const relativeApiPath = toPosixPath(
        path.relative(path.dirname(stagedFile), targetApiPath),
      );

      return `${relativeApiPath}#/components/${componentRef.kind}/${componentRef.name}`;
    });

    fs.writeFileSync(stagedFile, yaml.dump(document), "utf-8");
  }

  return {
    tempDir,
    inputPath: path.join(stagedPackageRoot, path.basename(sourceInputPath)),
  };
}

function resolveGoInputSchemaPath(pkg) {
  const defaultInputPath = paths.fromRoot(config.getInputSchemaPath(pkg));

  if (pkg.version === "v1alpha3" && pkg.name === "relationship") {
    const relationshipSourcePath = path.join(
      path.dirname(defaultInputPath),
      "relationship.yaml",
    );

    if (paths.fileExists(relationshipSourcePath)) {
      return relationshipSourcePath;
    }
  }

  return defaultInputPath;
}

function buildImportMappings(currentPkg, entryPath) {
  const currentPackageKey = getPackageKey(currentPkg);
  const currentPackageRoot = path.dirname(entryPath);
  const visitedFiles = new Set();
  const pendingFiles = [path.resolve(entryPath)];
  const importMappings = {};

  while (pendingFiles.length > 0) {
    const currentFile = pendingFiles.pop();
    if (visitedFiles.has(currentFile)) {
      continue;
    }

    visitedFiles.add(currentFile);
    const document = loadYamlFile(currentFile);
    const refs = collectRefs(document);

    for (const ref of refs) {
      if (typeof ref !== "string" || ref.startsWith("#")) {
        continue;
      }

      const [refPath] = ref.split("#", 1);
      if (!refPath || /^https?:\/\//.test(refPath)) {
        continue;
      }

      const resolvedRef = path.resolve(path.dirname(currentFile), refPath);
      if (!fs.existsSync(resolvedRef)) {
        throw new Error(
          `Unable to resolve external reference '${refPath}' from ${currentFile}`,
        );
      }

      const isCurrentPackageRef =
        resolvedRef === currentPackageRoot ||
        resolvedRef.startsWith(`${currentPackageRoot}${path.sep}`);

      if (isCurrentPackageRef) {
        importMappings[toPosixPath(refPath)] = "-";

        pendingFiles.push(resolvedRef);
        continue;
      }

      const targetPkg = findPackageForFile(resolvedRef);
      if (!targetPkg) {
        pendingFiles.push(resolvedRef);
        continue;
      }

      if (getPackageKey(targetPkg) === currentPackageKey) {
        importMappings[toPosixPath(refPath)] = "-";

        pendingFiles.push(resolvedRef);
        continue;
      }

      const normalizedRefPath = toPosixPath(refPath);
      const importPath = getPackageImportPath(targetPkg);
      const existingImportPath = importMappings[normalizedRefPath];

      if (existingImportPath && existingImportPath !== importPath) {
        throw new Error(
          `Conflicting import mappings for '${normalizedRefPath}': ` +
            `${existingImportPath} vs ${importPath}`,
        );
      }

      importMappings[normalizedRefPath] = importPath;
    }
  }

  return importMappings;
}

function createGeneratorConfig(pkg, inputPath, tempDir) {
  const baseConfigPath = paths.fromRoot(config.paths.openapiConfig);
  const baseConfig = loadYamlFile(baseConfigPath) || {};
  const tempConfigPath = path.join(tempDir, "openapi.config.yml");
  const generatedConfig = {
    ...baseConfig,
    package: pkg.name,
    "import-mapping": {
      ...(baseConfig["import-mapping"] || {}),
      ...buildImportMappings(pkg, inputPath),
    },
  };

  fs.writeFileSync(tempConfigPath, yaml.dump(generatedConfig), "utf-8");

  return { tempDir, tempConfigPath };
}

/**
 * Generate Go models for a single package
 * @param {Object} pkg - Package definition
 * @returns {Promise<void>}
 */
async function generateGoModels(pkg) {
  const outputPath = paths.fromRoot(config.getGoOutputPath(pkg));
  const outputDir = path.dirname(outputPath);
  const sourceInputPath = resolveGoInputSchemaPath(pkg);

  // Verify input exists
  if (!paths.fileExists(sourceInputPath)) {
    logger.warn(`Schema not found: ${sourceInputPath}, skipping ${pkg.name}`);
    return;
  }

  // Ensure output directory exists
  paths.ensureParentDir(outputPath);

  logger.step(`Generating Go models: ${pkg.name} (${pkg.version})...`);

  let tempDir;
  try {
    const stagedSources = stagePackageSources(pkg, sourceInputPath);
    tempDir = stagedSources.tempDir;

    const inputPath = stagedSources.inputPath;
    const generatedConfig = createGeneratorConfig(pkg, inputPath, tempDir);

    execSync(
      `oapi-codegen --config "${generatedConfig.tempConfigPath}" ` +
        `--package "${pkg.name}" ` +
        `-generate types ` +
        `--include-tags all ` +
        `-o "${outputPath}" ` +
        `"${inputPath}"`,
      { stdio: "inherit" },
    );

    // Add YAML struct tags and restore any schema-declared extra tags that
    // oapi-codegen omits for referenced object fields.
    addYamlTags(outputPath);
    // Remove self-referential type aliases (type X = X) that occur when
    // x-go-type references a type defined manually in the same package.
    removeSelfReferentialAliases(outputPath);
    addSchemaExtraTags(outputPath, inputPath);
    rewriteExternalRefAliases(outputPath, inputPath);
    validateReadableImportAliases(outputPath);
    addCompatibilityParameterAliases(outputPath, inputPath);
    ensureRequiredImports(outputPath);
    validateGeneratedDbTags(outputPath, inputPath);
    validateGeneratedJsonTags(outputPath, inputPath);
    writeGeneratedHelperFile(pkg, outputDir);

    logger.success(`Generated: ${paths.relativePath(outputPath)}`);
  } catch (err) {
    throw new Error(
      `Go model generation failed for ${pkg.name}: ${err.message}`,
    );
  } finally {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }
}

/**
 * Check prerequisites
 */
function checkPrerequisites() {
  // Check for oapi-codegen
  if (!commandExists("oapi-codegen")) {
    logger.error("oapi-codegen not found.");
    logger.info(
      "Install it with: go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest",
    );
    process.exit(1);
  }

}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now();

  try {
    // Change to project root
    process.chdir(paths.getProjectRoot());

    // Add Go bin to PATH
    const goPath = process.env.GOPATH || `${process.env.HOME}/go`;
    process.env.PATH = `${goPath}/bin:${process.env.PATH}`;

    logger.header("🔧 Starting Go code generation...");

    // Check prerequisites
    checkPrerequisites();

    // Discover packages dynamically
    const packageFilter = process.env.SCHEMA_PACKAGE
      ? new Set(
          process.env.SCHEMA_PACKAGE.split(",")
            .map((value) => value.trim())
            .filter(Boolean),
        )
      : null;
    const excludeFromGo = new Set(config.excludeFromGoGeneration || []);
    const schemaPackages = config.getSchemaPackages().filter((pkg) => {
      const packageKey = `${pkg.version}/${pkg.dirName}`;
      if (excludeFromGo.has(packageKey)) {
        return false;
      }
      if (!packageFilter) {
        return true;
      }

      return (
        packageFilter.has(pkg.name) ||
        packageFilter.has(pkg.dirName) ||
        packageFilter.has(packageKey)
      );
    });
    logger.info(`Discovered ${schemaPackages.length} schema packages`);

    if (schemaPackages.length === 0) {
      logger.error("No schema packages found!");
      process.exit(1);
    }

    // Generate Go models for all packages
    for (const pkg of schemaPackages) {
      await generateGoModels(pkg);
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`Go code generation complete! (${duration}s)`);
    logger.outputFiles(["models/<version>/<package>/*.go"]);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  addYamlTags,
  buildImportMappings,
  collectRefs,
  createGeneratorConfig,
  findPackageForFile,
  generateGoModels,
  loadYamlFile,
  main,
  stagePackageSources,
};

if (require.main === module) {
  main();
}

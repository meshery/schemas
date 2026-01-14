/**
 * permissions.js - Shared Permissions Parsing Library
 *
 * Provides utilities for parsing permissions from CSV data and generating
 * permission key constants for Go and TypeScript.
 */

const logger = require("./logger");
const { parseCSV, loadCSV, toPascalCase, isValidUUID } = require("./csv");

// CSV column indices (0-based)
const COL_CATEGORY = 1;
const COL_FUNCTION = 2;
const COL_FEATURE = 3;
const COL_KEY_ID = 29;

// Default number of header rows to skip in permissions CSV
const DEFAULT_SKIP_ROWS = 2;

/**
 * Generate constant name from category and function
 * @param {string} category - Category/Theme column value
 * @param {string} func - Function column value
 * @returns {string} PascalCase constant name
 */
function generateConstantName(category, func) {
  const categoryPascal = toPascalCase(category);
  const funcPascal = toPascalCase(func);
  return `${categoryPascal}${funcPascal}`;
}

/**
 * Parse permissions from CSV content
 * @param {string} csvContent - Raw CSV content
 * @param {Object} [options] - Parse options
 * @param {number} [options.skipRows=2] - Number of header rows to skip
 * @returns {Array<{name: string, uuid: string, feature: string}>} Parsed permissions
 */
function parsePermissions(csvContent, options = {}) {
  const { skipRows = DEFAULT_SKIP_ROWS } = options;
  const rows = parseCSV(csvContent, { skipRows });
  const permissions = [];
  const seenNames = new Set();

  for (let i = 0; i < rows.length; i++) {
    const fields = rows[i];
    const rowNum = i + skipRows + 1; // 1-based row number for logging

    const category = fields[COL_CATEGORY] || "";
    const func = fields[COL_FUNCTION] || "";
    const feature = fields[COL_FEATURE] || "";
    const keyId = fields[COL_KEY_ID] || "";

    // Skip rows without valid data
    if (!category || !func || !keyId) {
      continue;
    }

    // Validate UUID
    if (!isValidUUID(keyId)) {
      logger.warn(`Skipping row ${rowNum}: Invalid UUID format "${keyId}"`);
      continue;
    }

    const constantName = generateConstantName(category, func);

    // Handle duplicate names
    if (seenNames.has(constantName)) {
      logger.warn(
        `Skipping duplicate constant name: ${constantName} (row ${rowNum})`,
      );
      continue;
    }
    seenNames.add(constantName);

    permissions.push({
      name: constantName,
      uuid: keyId,
      feature: feature,
    });
  }

  return permissions;
}

/**
 * Load and parse permissions from a source (file path, URL, or Google Sheets)
 * @param {string} source - Local file path, URL, or Google Sheets URL
 * @param {Object} [options] - Load options
 * @param {string} [options.gid] - Optional Google Sheets tab GID
 * @param {number} [options.skipRows=2] - Number of header rows to skip
 * @returns {Promise<Array<{name: string, uuid: string, feature: string}>>} Parsed permissions
 */
async function loadPermissions(source, options = {}) {
  const csvContent = await loadCSV(source, options);
  const lines = csvContent.split("\n").length;
  logger.info(`Loaded CSV content (${lines} lines)`);
  return parsePermissions(csvContent, options);
}

/**
 * Generate Go file content for permissions
 * @param {Array<{name: string, uuid: string, feature: string}>} permissions - Parsed permissions
 * @returns {string} Go file content
 */
function generateGoFile(permissions) {
  const lines = [
    "// Package permissions contains auto-generated permission key constants.",
    "// This file is generated from permissions.csv - DO NOT EDIT MANUALLY.",
    "// To regenerate, run: node build/generate-permission-golang.js",
    "package permissions",
    "",
    'import "github.com/gofrs/uuid"',
    "",
    "// PermissionKey represents a permission key identifier.",
    "type PermissionKey uuid.UUID",
    "",
    "// PermissionKeyFromUUID converts a uuid.UUID to PermissionKey.",
    "func PermissionKeyFromUUID(id uuid.UUID) PermissionKey {",
    "\treturn PermissionKey(id)",
    "}",
    "",
    "// UUID returns the underlying uuid.UUID value.",
    "func (p PermissionKey) UUID() uuid.UUID {",
    "\treturn uuid.UUID(p)",
    "}",
    "",
    "// String returns the string representation of the permission key.",
    "func (p PermissionKey) String() string {",
    "\treturn uuid.UUID(p).String()",
    "}",
    "",
    "var (",
  ];

  for (const perm of permissions) {
    lines.push(
      `\t// ${perm.name} - ${perm.feature || "No description available"}`,
    );
    lines.push(
      `\t${perm.name} = PermissionKey(uuid.Must(uuid.FromString("${perm.uuid}")))`,
    );
    lines.push("");
  }

  lines.push(")");
  lines.push("");

  return lines.join("\n");
}

/**
 * Escape special characters for JSDoc comments
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeJSDocComment(str) {
  return str.replace(/\*\//g, "*\\/").replace(/\n/g, " ");
}

/**
 * Generate TypeScript file content for permissions
 * @param {Array<{name: string, uuid: string, feature: string}>} permissions - Parsed permissions
 * @returns {string} TypeScript file content
 */
function generateTypeScriptFile(permissions) {
  const lines = [
    "/**",
    " * Permission key constants generated from permissions.csv",
    " * This file is auto-generated - DO NOT EDIT MANUALLY.",
    " * To regenerate, run: node build/generate-permissions-ts.js",
    " */",
    "",
    "/**",
    " * A branded type representing a permission key UUID.",
    " * This provides type safety while remaining compatible with string operations.",
    " */",
    "export type PermissionKey = string & { readonly __brand: 'PermissionKey' };",
    "",
    "/**",
    " * Creates a PermissionKey from a UUID string.",
    " * @param uuid - The UUID string to convert",
    " * @returns The branded PermissionKey",
    " */",
    "export function createPermissionKey(uuid: string): PermissionKey {",
    "  return uuid as PermissionKey;",
    "}",
    "",
    "/**",
    " * Permission key constants.",
    " * Each key represents a unique permission identified by its UUID.",
    " */",
    "export const PermissionKeys = {",
  ];

  for (let i = 0; i < permissions.length; i++) {
    const perm = permissions[i];
    const isLast = i === permissions.length - 1;
    const comma = isLast ? "" : ",";

    lines.push(`  /**`);
    lines.push(
      `   * ${escapeJSDocComment(perm.feature || "No description available")}`,
    );
    lines.push(`   */`);
    lines.push(`  ${perm.name}: "${perm.uuid}" as PermissionKey${comma}`);
    if (!isLast) {
      lines.push("");
    }
  }

  lines.push("} as const;");
  lines.push("");
  lines.push("/**");
  lines.push(" * Type representing all valid permission key names.");
  lines.push(" */");
  lines.push("export type PermissionKeyName = keyof typeof PermissionKeys;");
  lines.push("");
  lines.push("/**");
  lines.push(" * Type representing all valid permission key values.");
  lines.push(" */");
  lines.push(
    "export type PermissionKeyValue = typeof PermissionKeys[PermissionKeyName];",
  );
  lines.push("");
  lines.push("/**");
  lines.push(" * Array of all permission keys for iteration.");
  lines.push(" */");
  lines.push("export const AllPermissionKeys = Object.values(PermissionKeys);");
  lines.push("");
  lines.push("/**");
  lines.push(" * Array of all permission key names for iteration.");
  lines.push(" */");
  lines.push(
    "export const AllPermissionKeyNames = Object.keys(PermissionKeys) as PermissionKeyName[];",
  );
  lines.push("");

  return lines.join("\n");
}

module.exports = {
  COL_CATEGORY,
  COL_FUNCTION,
  COL_FEATURE,
  COL_KEY_ID,
  DEFAULT_SKIP_ROWS,
  generateConstantName,
  parsePermissions,
  loadPermissions,
  generateGoFile,
  generateTypeScriptFile,
  escapeJSDocComment,
};

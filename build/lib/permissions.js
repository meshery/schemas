/**
 * permissions.js - Shared Permissions Parsing Library
 *
 * Provides utilities for parsing permissions from CSV data and generating
 * permission key constants for Go and TypeScript.
 */

const logger = require("./logger");
const { parseCSV, loadCSV, toPascalCase, isValidUUID } = require("./csv");

// CSV column indices (0-based)
const COL_KEYCHAIN_ID = 0;
const COL_FUNCTION = 2;
const COL_FEATURE = 3;
const COL_KEY_ID = 29;
const COL_KEYCHAIN_DEFINITION_ID = 27;

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

    const category = fields[COL_KEYCHAIN_ID] || "";
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
      category: category,
      subcategory: fields[1] || "",
      function: func,
      description: feature,
    });
  }

  // Duplicate-UUID guard (shrink-only). A key UUID is a permission's
  // authorization identity: two distinct constants sharing one UUID means a
  // grant of either silently grants both. Fail generation when a UUID maps to
  // more than one constant name, unless the UUID is in the frozen allowlist
  // below. The allowlist is SHRINK-ONLY — remove an entry once the source
  // sheet assigns the colliding functions distinct UUIDs; never add a new one
  // (fix new collisions in the sheet). Tracked in meshery/schemas#930.
  const KNOWN_DUPLICATE_UUIDS = new Set([]);
  const uuidToNames = new Map();
  for (const p of permissions) {
    const u = p.uuid.toLowerCase();
    if (!uuidToNames.has(u)) uuidToNames.set(u, new Set());
    uuidToNames.get(u).add(p.name);
  }
  const unexpectedDupes = [];
  for (const [uuid, names] of uuidToNames) {
    if (names.size > 1 && !KNOWN_DUPLICATE_UUIDS.has(uuid)) {
      unexpectedDupes.push(`  ${uuid} -> ${[...names].join(", ")}`);
    }
  }
  if (unexpectedDupes.length > 0) {
    throw new Error(
      "Duplicate permission UUID(s): one UUID maps to multiple permission " +
        "constants. Each permission needs a unique UUID — assign distinct " +
        "UUIDs in the source sheet (meshery/schemas#930):\n" +
        unexpectedDupes.join("\n"),
    );
  }
  const staleAllowlist = [...KNOWN_DUPLICATE_UUIDS].filter(
    (u) => (uuidToNames.get(u)?.size ?? 0) <= 1,
  );
  if (staleAllowlist.length > 0) {
    throw new Error(
      "KNOWN_DUPLICATE_UUIDS is shrink-only: these entries no longer collide " +
        "and must be removed from the allowlist:\n  " +
        staleAllowlist.join("\n  "),
    );
  }

  return permissions;
}

// Keychain rows sit in the "Security Management / Keychains" category: the
// keychain name is the Function column and its ID is the Keychain ID column.
const KEYCHAIN_CATEGORY = "Security Management";
const KEYCHAIN_SUBCATEGORY = "Keychains";

/**
 * Parse the keychain definitions from CSV content
 * @param {string} csvContent - Raw CSV content
 * @param {Object} [options] - Parse options
 * @param {number} [options.skipRows=2] - Number of header rows to skip
 * @returns {Map<string, {name: string, id: string, description: string}>} Keychains by name
 */
function parseKeychains(csvContent, options = {}) {
  const { skipRows = DEFAULT_SKIP_ROWS } = options;
  const keychains = new Map();
  for (const fields of parseCSV(csvContent, { skipRows })) {
    if (fields[0] !== KEYCHAIN_CATEGORY || fields[1] !== KEYCHAIN_SUBCATEGORY) continue;
    const name = fields[COL_FUNCTION] || "";
    const id = fields[COL_KEYCHAIN_DEFINITION_ID] || "";
    if (!name || !isValidUUID(id)) continue;
    keychains.set(name, { name, id, description: fields[COL_FEATURE] || "" });
  }
  return keychains;
}

/**
 * Resolve the OAuth scope map (build/oauth-scopes.json) against the keychains
 * and permission keys of the permissions source. Every scope names one
 * keychain defined in the source, no two scopes share a keychain, and every
 * key is an existing generated constant.
 * @param {Object} scopeFile - Parsed oauth-scopes.json
 * @param {Array<{name: string, uuid: string}>} permissions - Parsed permission keys
 * @param {Map<string, {name: string, id: string}>} keychains - Parsed keychains
 * @returns {Array<{scope: string, description: string, keychain: string, keychainId: string, keys: Array<{name: string, uuid: string}>}>}
 */
function resolveOAuthScopes(scopeFile, permissions, keychains) {
  const byName = new Map(permissions.map((p) => [p.name, p]));
  const usedKeychains = new Map();
  const resolved = [];
  for (const [scope, entry] of Object.entries(scopeFile?.scopes || {})) {
    if (!/^[a-z][a-z0-9]*:[a-z][a-z0-9]*$/.test(scope)) {
      throw new Error(`OAuth scope "${scope}" must be lowercase words joined as resource:action`);
    }
    const keychain = keychains.get(entry.keychain);
    if (!keychain) {
      throw new Error(
        `OAuth scope "${scope}" names keychain "${entry.keychain}", which is not defined in the permissions source (Security Management / Keychains)`,
      );
    }
    if (usedKeychains.has(keychain.name)) {
      throw new Error(
        `OAuth scopes "${usedKeychains.get(keychain.name)}" and "${scope}" share keychain "${keychain.name}"; a scope is exactly one keychain`,
      );
    }
    usedKeychains.set(keychain.name, scope);
    const keys = (entry.keys || []).map((name) => {
      const key = byName.get(name);
      if (!key) {
        throw new Error(`OAuth scope "${scope}" lists permission key "${name}", which is not in the permissions source`);
      }
      return { name: key.name, uuid: key.uuid };
    });
    resolved.push({
      scope,
      description: entry.description || "",
      keychain: keychain.name,
      keychainId: keychain.id,
      keys,
    });
  }
  return resolved;
}

/**
 * Load the OAuth scope grants for a permissions source
 * @param {string} csvContent - Permissions CSV content, already loaded once by the caller
 * @param {Object} [options] - Parse options (skipRows)
 * @param {string} [scopeFilePath] - Path to oauth-scopes.json
 * @returns {Array} Resolved scopes, empty when there is no scope file
 */
function loadOAuthScopes(csvContent, options = {}, scopeFilePath) {
  const file = scopeFilePath || paths.fromRoot("build/oauth-scopes.json");
  if (!fs.existsSync(file)) return [];
  const permissions = parsePermissions(csvContent, options);
  const keychains = parseKeychains(csvContent, options);
  return resolveOAuthScopes(JSON.parse(fs.readFileSync(file, "utf-8")), permissions, keychains);
}

/**
 * PascalCase identifier for a scope string, for example content:read -> ContentRead
 * @param {string} scope - Scope string
 * @returns {string} PascalCase suffix
 */
function scopeIdentifier(scope) {
  return scope
    .split(":")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Generate the Go declarations for the OAuth scopes
 * @param {Array} scopes - Resolved scopes
 * @returns {string[]} Go source lines
 */
function generateGoScopeLines(scopes) {
  if (!scopes || scopes.length === 0) return [];
  const lines = [
    "",
    "// OAuthScope is an OAuth scope string. A scope names exactly one keychain.",
    "type OAuthScope string",
    "",
    "const (",
  ];
  for (const s of scopes) {
    lines.push(`\t// OAuthScope${scopeIdentifier(s.scope)} - ${s.description || "No description available"}`);
    lines.push(`\tOAuthScope${scopeIdentifier(s.scope)} OAuthScope = "${s.scope}"`);
    lines.push("");
  }
  lines.push(")");
  lines.push("");
  lines.push("// OAuthScopeGrant is the keychain a scope names and the permission keys that keychain carries for it.");
  lines.push("type OAuthScopeGrant struct {");
  lines.push("\tKeychain   string");
  lines.push("\tKeychainID uuid.UUID");
  lines.push("\tKeys       []PermissionKey");
  lines.push("}");
  lines.push("");
  lines.push("// OAuthScopeGrants maps each OAuth scope to its keychain and permission keys.");
  lines.push("var OAuthScopeGrants = map[OAuthScope]OAuthScopeGrant{");
  for (const s of scopes) {
    lines.push(`\tOAuthScope${scopeIdentifier(s.scope)}: {`);
    lines.push(`\t\tKeychain:   "${s.keychain}",`);
    lines.push(`\t\tKeychainID: uuid.Must(uuid.FromString("${s.keychainId}")),`);
    lines.push("\t\tKeys: []PermissionKey{");
    for (const k of s.keys) lines.push(`\t\t\t${k.name},`);
    lines.push("\t\t},");
    lines.push("\t},");
  }
  lines.push("}");
  lines.push("");
  return lines;
}

/**
 * Generate the TypeScript declarations for the OAuth scopes
 * @param {Array} scopes - Resolved scopes
 * @returns {string[]} TypeScript source lines
 */
function generateTypeScriptScopeLines(scopes) {
  if (!scopes || scopes.length === 0) return [];
  const lines = [
    "/**",
    " * OAuth scopes. A scope names exactly one keychain and lists the permission",
    " * keys that keychain carries for it. Generated from build/oauth-scopes.json.",
    " */",
    "export const OAuthScopes = {",
  ];
  for (const s of scopes) {
    lines.push(`  "${s.scope}": {`);
    lines.push(`    description: ${JSON.stringify(s.description)},`);
    lines.push(`    keychain: ${JSON.stringify(s.keychain)},`);
    lines.push(`    keychainId: "${s.keychainId}",`);
    lines.push(`    keys: [${s.keys.map((k) => `PermissionKeys.${k.name}`).join(", ")}],`);
    lines.push("  },");
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("/**");
  lines.push(" * Type representing all valid OAuth scope strings.");
  lines.push(" */");
  lines.push("export type OAuthScope = keyof typeof OAuthScopes;");
  lines.push("");
  return lines;
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
 * Load the permissions source once and parse it, returning the raw CSV too so
 * the OAuth scope map resolves against the same revision of the source.
 * @param {string} source - Local file path, URL, or Google Sheets URL
 * @param {Object} [options] - Load options (gid, skipRows)
 * @returns {Promise<{csvContent: string, permissions: Array}>}
 */
async function loadPermissionsSource(source, options = {}) {
  const csvContent = await loadCSV(source, options);
  const lines = csvContent.split("\n").length;
  logger.info(`Loaded CSV content (${lines} lines)`);
  return { csvContent, permissions: parsePermissions(csvContent, options) };
}

/**
 * Generate Go file content for permissions
 * @param {Array<{name: string, uuid: string, feature: string}>} permissions - Parsed permissions
 * @returns {string} Go file content
 */
function generateGoFile(permissions, indexId, scopes = []) {
  const lines = [
    "// Package permissions contains auto-generated permission key constants.",
    "// This file is generated from permissions.csv - DO NOT EDIT MANUALLY.",
    "// To regenerate, run: node build/generate-permission-golang.js",
    "package permissions",
    'import "github.com/gofrs/uuid"',
    "",
    `// Index ID used to generate this file\nconst IndexID = "${indexId}"`,
    "",
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
  lines.push(...generateGoScopeLines(scopes));

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
function generateTypeScriptFile(permissions, indexId, scopes = []) {
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
    " * Interface representing a Key conforming to the Key schema.",
    " */",
    "export interface Key {",
    "  readonly id: PermissionKey;",
    "  readonly category: string;",
    "  readonly subcategory: string;",
    "  readonly function: string;",
    "  readonly description: string;",
    "}",
    "",
    "/**",
    " * Permissions Index ID used for this generated file.",
    " */",
    `export const PERMISSIONS_INDEX_ID = "${indexId}" as const;`,
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
    " * Keys conforming to the Key schema.",
    " */",
    "export const Keys = {",
  ];

  for (let i = 0; i < permissions.length; i++) {
    const perm = permissions[i];
    const isLast = i === permissions.length - 1;
    const comma = isLast ? "" : ",";

    lines.push(`  /**`);
    lines.push(
      `   * ${escapeJSDocComment(perm.description || perm.feature || "No description available")}`,
    );
    lines.push(`   */`);
    lines.push(`  ${perm.name}: {`);
    lines.push(`    id: "${perm.uuid}" as PermissionKey,`);
    lines.push(`    category: "${perm.category ? perm.category.replace(/"/g, '\\"') : ""}",`);
    lines.push(`    subcategory: "${perm.subcategory ? perm.subcategory.replace(/"/g, '\\"') : ""}",`);
    lines.push(`    function: "${perm.function ? perm.function.replace(/"/g, '\\"') : ""}",`);
    lines.push(`    description: "${perm.description || perm.feature ? (perm.description || perm.feature).replace(/"/g, '\\"') : ""}"`);
    lines.push(`  }${comma}`);
    if (!isLast) {
      lines.push("");
    }
  }

  lines.push("} as const;");
  lines.push("");
  lines.push("/**");
  lines.push(" * Permission key constants.");
  lines.push(" * Each key represents a unique permission identified by its UUID.");
  lines.push(" */");
  lines.push("export const PermissionKeys = {");

  for (let i = 0; i < permissions.length; i++) {
    const perm = permissions[i];
    const isLast = i === permissions.length - 1;
    const comma = isLast ? "" : ",";

    lines.push(`  /**`);
    lines.push(
      `   * ${escapeJSDocComment(perm.description || perm.feature || "No description available")}`,
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
  lines.push(...generateTypeScriptScopeLines(scopes));

  return lines.join("\n");
}

const path = require("path");
const fs = require("fs");
const paths = require("./paths");

const crypto = require("crypto");

function computeIndexId(permissions) {
  // Stable canonical string using sorted name+uuid, ignoring feature
  const entries = permissions
    .map((p) => ({ name: p.name, uuid: p.uuid }))
    .sort((a, b) =>
      a.name === b.name
        ? a.uuid.localeCompare(b.uuid)
        : a.name.localeCompare(b.name),
    )
    .map((e) => `${e.name}:${e.uuid}`)
    .join("\n");
  return crypto.createHash("sha256").update(entries).digest("hex");
}

function buildIndex(permissions) {
  const id = computeIndexId(permissions);
  return {
    id,
    // createdAt: new Date().toISOString(),
    count: permissions.length,
    items: permissions.map((p) => ({
      name: p.name,
      uuid: p.uuid,
      feature: p.feature,
      category: p.category,
      subcategory: p.subcategory,
      function: p.function,
      description: p.description,
    })),
  };
}

function saveIndex(index) {
  const dir = paths.fromRoot("permissions_history");
  paths.ensureDir(dir);
  const file = path.join(dir, `${index.id}-permissions_index.json`);
  fs.writeFileSync(file, JSON.stringify(index, null, 2), "utf-8");
  return file;
}

function loadIndex(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function diffIndexes(oldIndex, newIndex) {
  const oldById = new Map(oldIndex.items.map((i) => [i.uuid, i]));
  const newById = new Map(newIndex.items.map((i) => [i.uuid, i]));

  const added = [];
  const removed = [];
  const updated = [];

  // Added and updated (by id)
  for (const [id, item] of newById.entries()) {
    if (!oldById.has(id)) {
      added.push({ id, name: item.name });
    } else {
      const prev = oldById.get(id);
      if (prev.name !== item.name) {
        updated.push({ id, old_name: prev.name, new_name: item.name });
      }
    }
  }

  // Removed (by id)
  for (const [id, item] of oldById.entries()) {
    if (!newById.has(id)) {
      removed.push({ id, name: item.name });
    }
  }

  return { added, removed, updated };
}

module.exports = {
  COL_CATEGORY: COL_KEYCHAIN_ID,
  COL_FUNCTION,
  COL_FEATURE,
  COL_KEY_ID,
  DEFAULT_SKIP_ROWS,
  generateConstantName,
  parsePermissions,
  parseKeychains,
  resolveOAuthScopes,
  loadOAuthScopes,
  loadPermissionsSource,
  loadPermissions,
  generateGoFile,
  generateTypeScriptFile,
  escapeJSDocComment,
  computeIndexId,
  buildIndex,
  saveIndex,
  loadIndex,
  diffIndexes,
};

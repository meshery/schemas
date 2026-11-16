#!/usr/bin/env node
/**
 * generate-rtk.js - RTK Query Client Generation Script
 *
 * DESCRIPTION:
 *   Generates RTK Query API clients from OpenAPI specifications for use in
 *   TypeScript/React applications. Creates type-safe API hooks for both
 *   cloud and meshery APIs.
 *
 * WHAT IT DOES:
 *   1. Reads RTK Query configuration files from typescript/rtk/
 *   2. Generates RTK Query API clients from filtered OpenAPI specs
 *   3. Outputs TypeScript files with auto-generated API hooks
 *
 * USAGE:
 *   node build/generate-rtk.js
 *
 * PREREQUISITES:
 *   Run bundle-openapi.js first to generate the OpenAPI specs in _openapi_build/
 *
 * DEPENDENCIES:
 *   - @rtk-query/codegen-openapi (via npx)
 *
 * CONFIGURATION:
 *   - typescript/rtk/cloud-rtk-config.ts - Configuration for cloud API
 *   - typescript/rtk/meshery-rtk-config.ts - Configuration for meshery API
 *
 * OUTPUT:
 *   - typescript/rtk/cloudApi.ts - RTK Query client for cloud API
 *   - typescript/rtk/mesheryApi.ts - RTK Query client for meshery API
 */

const fs = require("fs");
const yaml = require("js-yaml");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");
const { npx } = require("./lib/exec");

/**
 * RTK Query configurations to process
 */
const rtkConfigs = [
  {
    name: "cloud",
    configFile: config.paths.cloudRtkConfig,
    requiredSpec: config.paths.cloudOpenapi,
    outputFile: "typescript/rtk/cloud.ts",
    outputDescription: "typescript/rtk/cloudApi.ts",
  },
  {
    name: "meshery",
    configFile: config.paths.mesheryRtkConfig,
    requiredSpec: config.paths.mesheryOpenapi,
    outputFile: "typescript/rtk/meshery.ts",
    outputExportName: "mesheryApi",
    outputDescription: "typescript/rtk/mesheryApi.ts",
  },
];

/**
 * Check prerequisites for RTK generation
 */
function checkPrerequisites() {
  // Check for _openapi_build directory
  const buildDir = paths.fromRoot(config.paths.buildDir);
  if (!paths.dirExists(buildDir)) {
    logger.error("_openapi_build/ directory not found.");
    logger.info("Run 'node build/bundle-openapi.js' first.");
    process.exit(1);
  }

  // Check for required OpenAPI specs
  for (const rtk of rtkConfigs) {
    const specPath = paths.fromRoot(rtk.requiredSpec);
    if (!paths.fileExists(specPath)) {
      logger.error(`${rtk.requiredSpec} not found.`);
      logger.info("Run 'node build/bundle-openapi.js' first.");
      process.exit(1);
    }
  }

  // Check for RTK config files
  for (const rtk of rtkConfigs) {
    const configPath = paths.fromRoot(rtk.configFile);
    if (!paths.fileExists(configPath)) {
      logger.error(`RTK config not found: ${rtk.configFile}`);
      process.exit(1);
    }
  }
}

/**
 * Find any unguarded `queryArg` property or element accesses that remain
 * inside generated `params: { ... }` blocks.
 *
 * This is the fail-loud regression guard for upstream RTK codegen shape
 * drift: if the rewrite pass misses a new access form, the generated file
 * must fail here instead of silently shipping a synchronous runtime throw.
 *
 * @param {string} content - Generated RTK file contents
 * @returns {Array<{block: number, access: string}>} remaining bare accesses
 */
function findUnguardedQueryParamAccesses(content) {
  const paramsBlockRe = /(params:\s*\{)([\s\S]*?)(\n\s*\},)/g;
  const bareAccessPatterns = [
    /\bqueryArg(?!\s*\?\s*\.)\s*\.\s*[A-Za-z_$][A-Za-z0-9_$]*/g,
    /\bqueryArg(?!\s*\?\s*\.)\s*\[\s*(['"])[^'"\]]+\1\s*\]/g,
  ];
  const matches = [];
  let block = 0;
  let paramsMatch;

  while ((paramsMatch = paramsBlockRe.exec(content)) !== null) {
    block += 1;
    const body = paramsMatch[2];

    for (const pattern of bareAccessPatterns) {
      let accessMatch;
      while ((accessMatch = pattern.exec(body)) !== null) {
        matches.push({
          block,
          access: accessMatch[0].replace(/\s+/g, " ").trim(),
        });
      }
    }
  }

  return matches;
}

/**
 * Post-process a generated RTK file to guard optional query-param accesses
 * against an `undefined` queryArg.
 *
 * Upstream `@rtk-query/codegen-openapi` (tracked in reduxjs/redux-toolkit#5018)
 * emits query functions that dereference `queryArg.<name>` for every query
 * parameter, e.g.:
 *
 *   query: (queryArg) => ({
 *     url: `/api/identity/badges`,
 *     params: { orgId: queryArg.orgId },
 *   }),
 *
 * When every parameter of an endpoint is optional, the generated
 * `*ApiArg` type marks every field `?`. Consumers relying on that type
 * may legitimately invoke the hook with no argument (e.g.
 * `useGetAvailableBadgesQuery()`), at which point RTK hands the query
 * function `queryArg === undefined` and `queryArg.orgId` throws
 * synchronously with `TypeError: Cannot read properties of undefined`.
 *
 * The fix is to emit `queryArg?.<name>` (or `queryArg?.["<name>"]`
 * for bracket-notation accesses, which the codegen uses when the
 * property name is a JS reserved word such as `type` or `class`)
 * inside `params: { ... }` blocks. `fetchBaseQuery` already filters
 * `undefined` param values from the URL, so wire behaviour for a
 * no-arg call is unchanged. Path- and body-parameter accesses are
 * left untouched because those are required by the endpoint contract
 * and a `TypeError` there signals a real caller bug that must not be
 * silently swallowed.
 *
 * Cross-reference:
 *   - Upstream issue: https://github.com/reduxjs/redux-toolkit/issues/5018
 *   - Downstream hotfix (to be reverted after this lands):
 *
 * @param {string} filePath - Absolute path to the generated TS file
 * @returns {number} count of `queryArg.X` / `queryArg["X"]` rewrites applied
 */
function guardOptionalQueryParams(filePath) {
  if (!paths.fileExists(filePath)) {
    logger.warn(`Post-process skipped: ${filePath} not found.`);
    return 0;
  }
  const content = fs.readFileSync(filePath, "utf8");

  // Match every `params: { ... }` block emitted by the RTK codegen
  // inside a `query: (queryArg) => ({ ... })` arrow. Within each block,
  // rewrite both access forms the codegen emits so an `undefined`
  // queryArg produces an `undefined` param value (filtered by
  // fetchBaseQuery) rather than throwing:
  //
  //   queryArg.<id>       → queryArg?.<id>
  //   queryArg["<id>"]    → queryArg?.["<id>"]        (reserved-word keys)
  //   queryArg['<id>']    → queryArg?.['<id>']
  //
  // Important: this only runs on text inside `params: { ... }` blocks.
  // It must NOT rewrite:
  //   - path-parameter template literals (`${queryArg.X}` or
  //     `${queryArg["X"]}`), because `${undefined}` stringifies to
  //     "undefined" and silently corrupts the URL rather than
  //     surfacing the caller bug;
  //   - `body: queryArg.X` assignments, because a missing body is a
  //     real caller error for mutations that require one.
  //
  // Generated `params` blocks are flat (OpenAPI query params cannot be
  // nested objects), so a non-greedy match up to the closing `}` is
  // safe. The codegen does not (currently) enable `encodeQueryParams`
  // in either cloud or meshery configs, so the values inside are plain
  // property/element accesses off `queryArg`.
  let totalRewrites = 0;
  const paramsBlockRe = /(params:\s*\{)([\s\S]*?)(\n\s*\},)/g;
  const patched = content.replace(paramsBlockRe, (match, open, body, close) => {
    let localRewrites = 0;
    const rewrittenBody = body
      // Dot access: queryArg.foo → queryArg?.foo
      .replace(
        /\bqueryArg\.([A-Za-z_$][A-Za-z0-9_$]*)/g,
        (_hit, prop) => {
          localRewrites += 1;
          return `queryArg?.${prop}`;
        }
      )
      // Bracket access (reserved-word keys): queryArg["foo"] → queryArg?.["foo"].
      // The regex requires `[` immediately after `queryArg` so an already-
      // optional `queryArg?.[...]` is not re-matched.
      .replace(
        /\bqueryArg(\[(['"])[^'"\]]+\2\])/g,
        (_hit, bracket) => {
          localRewrites += 1;
          return `queryArg?.${bracket}`;
        }
      );
    totalRewrites += localRewrites;
    return `${open}${rewrittenBody}${close}`;
  });

  const unguardedAccesses = findUnguardedQueryParamAccesses(patched);
  if (unguardedAccesses.length > 0) {
    throw new Error(
      `Post-process failed: unguarded queryArg access(es) remain in \`params: { ... }\` blocks of ${filePath}: ` +
        unguardedAccesses
          .map(({ block, access }) => `block ${block} -> ${access}`)
          .join(", ")
    );
  }

  if (totalRewrites === 0) {
    logger.info(
      `Post-process note: no optional query-param rewrites were needed in ${filePath}.`
    );
    return 0;
  }

  fs.writeFileSync(filePath, patched, "utf8");
  logger.success(
    `Post-processed: guarded ${totalRewrites} optional query-param access(es) in ${filePath}`
  );
  return totalRewrites;
}

/**
 * Collect the operationIds whose request body is optional in an OpenAPI
 * document, i.e. whose resolved `requestBody` does not declare
 * `required: true` (OpenAPI defaults `required` to false).
 *
 * @param {Object} spec - Parsed OpenAPI document
 * @returns {string[]} operationIds with an optional request body
 */
function findOptionalRequestBodyOperations(spec) {
  const resolveRef = (ref) =>
    ref
      .replace(/^#\//, "")
      .split("/")
      .reduce((node, key) => (node == null ? node : node[key]), spec);
  const operationIds = [];

  for (const pathItem of Object.values(spec.paths || {})) {
    for (const operation of Object.values(pathItem || {})) {
      if (!operation || typeof operation !== "object" || !operation.requestBody) {
        continue;
      }
      const requestBody = operation.requestBody.$ref
        ? resolveRef(operation.requestBody.$ref)
        : operation.requestBody;
      if (!requestBody) {
        throw new Error(
          `Unresolvable requestBody $ref ${operation.requestBody.$ref} on ${operation.operationId}`
        );
      }
      if (requestBody.required !== true) {
        operationIds.push(operation.operationId);
      }
    }
  }

  return operationIds;
}

/**
 * Mark the `body` member of generated `*ApiArg` types optional for every
 * operation whose request body is optional.
 *
 * Upstream `@rtk-query/codegen-openapi` hard-codes `required: true` for every
 * request body and ignores `requestBody.required: false`, so an operation such
 * as `generateToken` (whose body is omitted for an unrestricted token) gets
 * `body: {...}` and a body-less call fails to type-check. `fetchBaseQuery`
 * already sends no body when `queryArg.body` is undefined, so only the type
 * needs correcting. Fails loudly when an expected `*ApiArg` type or its
 * top-level `body` member is missing, so upstream shape drift cannot silently
 * reintroduce the mistyping.
 *
 * @param {string} content - Generated RTK file contents
 * @param {string[]} operationIds - operationIds with an optional request body
 * @returns {{content: string, rewrites: number}} patched source and rewrite count
 */
function markOptionalRequestBodies(content, operationIds) {
  let patched = content;
  let rewrites = 0;

  for (const operationId of operationIds) {
    const typeName = `${operationId.charAt(0).toUpperCase()}${operationId.slice(1)}ApiArg`;
    // The codegen emits CRLF or LF line endings depending on its formatter.
    const blockRe = new RegExp(`export type ${typeName} = \\{\\r?\\n[\\s\\S]*?\\r?\\n\\};`);
    const blockMatch = blockRe.exec(patched);
    if (!blockMatch) {
      throw new Error(`Post-process failed: ${typeName} type literal not found.`);
    }
    const block = blockMatch[0];
    if (/\n {2}body\?: /.test(block)) {
      continue;
    }
    if (!/\n {2}body: /.test(block)) {
      throw new Error(`Post-process failed: ${typeName} has no top-level body member.`);
    }
    patched =
      patched.slice(0, blockMatch.index) +
      block.replace(/\n {2}body: /, "\n  body?: ") +
      patched.slice(blockMatch.index + block.length);
    rewrites += 1;
  }

  return { content: patched, rewrites };
}

/**
 * Percent-encode path parameter interpolations in generated ledger URL templates.
 * Ledger entry keys are arbitrary client strings, so a key such as `a/b` would
 * otherwise address a different path. Wrapping each `${queryArg.X}` in
 * `encodeURIComponent` keeps the value a single path segment.
 * @param {string} content - Generated TS source
 * @returns {string} source with ledger path parameter interpolations encoded
 */
function encodePathParams(content) {
  return content.replace(/`\/api\/ledgers\/[^`]*`/g, (template) =>
    template.replace(
      /\$\{queryArg\.([A-Za-z_$][A-Za-z0-9_$]*)\}/g,
      (_hit, prop) => `\${encodeURIComponent(queryArg.${prop})}`
    )
  );
}

/**
 * Post-process a generated RTK file to add extra named exports.
 * The codegen only emits `export { injectedRtkApi as <exportName> }`.
 * For consumers that import `injectedRtkApi` by its original internal name
 * we rewrite that line to also export the raw name so both imports resolve.
 * @param {string} filePath - Absolute path to the generated TS file
 * @param {string} exportName - The alias used in the generated export (e.g. "mesheryApi")
 */
function addInjectedRtkApiExport(filePath, exportName) {
  if (!paths.fileExists(filePath)) {
    logger.warn(`Post-process skipped: ${filePath} not found.`);
    return;
  }
  const content = fs.readFileSync(filePath, "utf8");
  const original = `export { injectedRtkApi as ${exportName} };`;
  const patched = `export { injectedRtkApi as ${exportName}, injectedRtkApi };`;
  if (content.includes(patched)) {
    return;
  }
  if (!content.includes(original)) {
    logger.warn(`Post-process skipped: expected export pattern not found in ${filePath}.`);
    return;
  }
  fs.writeFileSync(filePath, content.replace(original, patched), "utf8");
  logger.success(`Post-processed: added injectedRtkApi named export to ${filePath}`);
}

/**
 * Generate RTK Query client for a single configuration
 * @param {Object} rtk - RTK configuration object
 * @returns {Promise<void>}
 */
async function generateRtkClient(rtk) {
  const configPath = paths.fromRoot(rtk.configFile);

  logger.step(`Generating ${rtk.name} API client...`);

  try {
    await npx("@rtk-query/codegen-openapi", [configPath]);
    logger.success(`Generated: ${rtk.outputDescription}`);
    if (rtk.outputFile) {
      const outputPath = paths.fromRoot(rtk.outputFile);
      if (paths.fileExists(outputPath)) {
        const source = fs.readFileSync(outputPath, "utf8");
        const spec = yaml.load(fs.readFileSync(paths.fromRoot(rtk.requiredSpec), "utf8"));
        const { content, rewrites } = markOptionalRequestBodies(
          encodePathParams(source),
          findOptionalRequestBodyOperations(spec)
        );
        fs.writeFileSync(outputPath, content, "utf8");
        if (rewrites > 0) {
          logger.success(`Post-processed: marked ${rewrites} optional request body(ies) in ${outputPath}`);
        }
      }
      guardOptionalQueryParams(outputPath);
    }
    if (rtk.outputFile && rtk.outputExportName) {
      addInjectedRtkApiExport(paths.fromRoot(rtk.outputFile), rtk.outputExportName);
    }
  } catch (err) {
    throw new Error(
      `Failed to generate ${rtk.name} API client: ${err.message}`,
    );
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

    logger.header("🔧 Generating RTK Query clients...");

    // Check prerequisites
    checkPrerequisites();

    // Generate RTK clients
    for (const rtk of rtkConfigs) {
      await generateRtkClient(rtk);
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`RTK Query client generation complete! (${duration}s)`);
    logger.outputFiles(rtkConfigs.map((rtk) => rtk.outputDescription));
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  addInjectedRtkApiExport,
  checkPrerequisites,
  encodePathParams,
  findOptionalRequestBodyOperations,
  findUnguardedQueryParamAccesses,
  generateRtkClient,
  guardOptionalQueryParams,
  main,
  markOptionalRequestBodies,
};

if (require.main === module) {
  main();
}

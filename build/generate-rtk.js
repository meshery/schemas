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
    // Fail loud: after a successful codegen the output file must exist. A
    // missing file means the RTK codegen output path has drifted (e.g. the
    // config's outputFile changed), so silently skipping would let `make
    // build`/CI stay green while this post-processing quietly stops applying.
    throw new Error(`Post-process failed: expected generated file not found: ${filePath}.`);
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
 * Post-process a generated RTK file to add cross-construct cache invalidation
 * for operations whose OpenAPI tags cannot express it.
 *
 * `addConnectionToEnvironment` / `removeConnectionFromEnvironment` /
 * `deleteConnection` / `deleteMesheryConnection` live in the `connection`
 * construct (schemas/constructs/<version>/connection/api.yml), so
 * bundle-openapi.js's prefixTags() namespaces their tags under
 * `Connection_API_*`. There is no mechanism for a tag declared in one
 * construct file to resolve to another construct's namespace, so these
 * mutations can never automatically invalidate `Environment_environments`,
 * the tag `getEnvironmentConnections` provides -- even though assigning,
 * removing, or deleting a connection changes exactly that data (a Connection
 * embeds its own `environments` membership -- see connection.yaml). Without
 * this, the Environment UI's "Assigned Connections" count silently goes
 * stale after every assign/remove/delete action. Both generated clients
 * define these operations identically, so this runs against both
 * typescript/rtk/meshery.ts and typescript/rtk/cloud.ts.
 *
 * This manually injects the missing tag into `invalidatesTags` for the
 * affected operations after codegen runs. Every target operation must
 * either already carry the tag (from a prior run) or be successfully
 * patched -- if upstream codegen ever renames an operation or reshapes its
 * output so a target can't be matched, this throws rather than silently
 * shipping a file missing the fix (mirroring guardOptionalQueryParams's
 * fail-loud contract above).
 *
 * @param {string} filePath - Absolute path to the generated TS file
 * @returns {number} count of operations patched (excludes operations that
 *   already carried the tag from a prior run)
 */
function addCrossConstructInvalidation(filePath) {
  if (!paths.fileExists(filePath)) {
    // Fail loud: after a successful codegen the output file must exist. A
    // missing file means the RTK codegen output path has drifted (e.g. the
    // config's outputFile changed), so silently skipping would let `make
    // build`/CI stay green while this post-processing quietly stops applying.
    throw new Error(`Post-process failed: expected generated file not found: ${filePath}.`);
  }
  const content = fs.readFileSync(filePath, "utf8");

  const targets = [
    "addConnectionToEnvironment",
    "removeConnectionFromEnvironment",
    "deleteConnection",
    "deleteMesheryConnection",
  ];
  const extraTag = "Environment_environments";

  let patched = content;
  let count = 0;
  const unmatched = [];

  for (const opName of targets) {
    // Find the operation's starting position, then look for invalidatesTags
    // within a bounded window right after it. This avoids both the original
    // cross-operation matching risk and the inner-brace false-match issue
    // (query blocks close with their own "}),", which a naive block regex
    // can match before reaching the operation's actual invalidatesTags line).
    // Match the operation start with a regex rather than a fixed string so
    // arbitrary spacing around the `:` (e.g. a prettier/codegen config change)
    // doesn't silently stop matching. `\b` prevents a shorter target name from
    // matching inside a longer one.
    const opMatch = new RegExp(`\\b${opName}\\s*:\\s*build\\.mutation`).exec(patched);
    if (!opMatch) {
      unmatched.push(`${opName} (operation not found)`);
      continue;
    }
    const opStart = opMatch.index;
    const searchWindow = patched.slice(opStart, opStart + 2000);
    const tagsMatch = /invalidatesTags:\s*\[([^\]]*)\]/.exec(searchWindow);
    if (!tagsMatch) {
      unmatched.push(`${opName} (no invalidatesTags array within range)`);
      continue;
    }
    const existingTags = tagsMatch[1].trim();
    // Compare per tag (quotes stripped) so a tag whose name merely *contains*
    // `extraTag` as a substring can't yield a false "already present".
    const currentTags = existingTags
      .split(",")
      .map((t) => t.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
    if (currentTags.includes(extraTag)) {
      continue;
    }
    // Match the file's quote style so the injected tag stays consistent with
    // whatever the codegen/formatter emits.
    const quote = existingTags.includes("'") ? "'" : '"';
    const newTagsInner = existingTags.length > 0
      ? `${existingTags}, ${quote}${extraTag}${quote}`
      : `${quote}${extraTag}${quote}`;
    const oldFull = tagsMatch[0];
    const newFull = `invalidatesTags: [${newTagsInner}]`;
    const absoluteIndex = opStart + tagsMatch.index;
    patched = patched.slice(0, absoluteIndex) + newFull + patched.slice(absoluteIndex + oldFull.length);
    count += 1;
  }

  // Fail loud: a target that can't be found or patched means this file is
  // shipping without the fix it needs, silently. Match
  // guardOptionalQueryParams's contract above rather than letting `make
  // build`/CI stay green while the stale-cache bug this exists to fix
  // quietly regresses.
  if (unmatched.length > 0) {
    throw new Error(
      `Post-process failed: cross-construct invalidation target(s) could not be located in ${filePath}: ${unmatched.join(", ")}`,
    );
  }

  if (count > 0) {
    fs.writeFileSync(filePath, patched, "utf8");
    logger.success(
      `Post-processed: added cross-construct invalidatesTags to ${count} operation(s) in ${filePath}`,
    );
  } else {
    logger.info(`Post-process note: cross-construct invalidatesTags already present in ${filePath}.`);
  }
  return count;
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
    // Fail loud (see the other post-processors): a missing output file after
    // codegen means the path drifted, and skipping the export injection would
    // silently ship a client without its `injectedRtkApi` export.
    throw new Error(`Post-process failed: expected generated file not found: ${filePath}.`);
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
      guardOptionalQueryParams(paths.fromRoot(rtk.outputFile));
    }
    if ((rtk.name === "meshery" || rtk.name === "cloud") && rtk.outputFile) {
      addCrossConstructInvalidation(paths.fromRoot(rtk.outputFile));
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
  addCrossConstructInvalidation,
  addInjectedRtkApiExport,
  checkPrerequisites,
  findUnguardedQueryParamAccesses,
  generateRtkClient,
  guardOptionalQueryParams,
  main,
};

if (require.main === module) {
  main();
}

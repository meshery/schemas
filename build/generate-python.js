#!/usr/bin/env node
/**
 * generate-python.js - Python Client Generation Script (pilot)
 *
 * DESCRIPTION:
 *   Generates a typed Python client from the bundled OpenAPI specifications
 *   using openapi-python-client (pinned to an exact version in
 *   build/lib/config.js). This is the Phase 1 pilot for issue #1240:
 *   only the pilot constructs listed in config.python.pilotPackages are
 *   generated. Phase 2 expands generation to the full cloud/meshery bundles
 *   (with cloud + meshery API subpackages); the pilot ships the key client
 *   as the first subpackage.
 *
 * WHAT IT DOES:
 *   1. Resolves pilot constructs via build/lib/config.js discovery
 *   2. Generates each pilot spec with --meta none into a temp staging dir
 *   3. Fails on any generator warning that is not allow-listed in
 *      config.python.warningAllowlist (warnings-as-errors; nothing is
 *      written on failure)
 *   4. Assembles python/generated/src/meshery_schemas/<construct>/ from the
 *      staged output plus a PEP 561 py.typed marker
 *   5. Records generator, spec digests, generated-file digests, and
 *      warnings in python/generated/.python-gen-manifest.json
 *
 * USAGE:
 *   node build/generate-python.js
 *
 * PREREQUISITES:
 *   Run bundle-openapi.js first to generate the OpenAPI specs in _openapi_build/.
 *   Install the pinned toolchain once:
 *     python3 -m pip install \
 *       "openapi-python-client==$(node -p "require('./build/lib/config.js').python.generatorVersion")" \
 *       "ruff==$(node -p "require('./build/lib/config.js').python.ruffVersion")"
 *   Generated code requires Python >= 3.11.
 *
 * OWNERSHIP:
 *   python/generated/src/ and .python-gen-manifest.json are machine-owned:
 *   do not hand-edit them. python/generated/pyproject.toml and
 *   python/generated/src/meshery_schemas/__init__.py are hand-maintained
 *   scaffolding (hatchling build, distribution identity); this script
 *   refuses to run when they are missing rather than creating them.
 *
 * OUTPUT:
 *   - python/generated/src/meshery_schemas/<construct>/ - generated client
 *   - python/generated/.python-gen-manifest.json - generation record
 */

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const logger = require("./lib/logger");
const config = require("./lib/config");
const paths = require("./lib/paths");

const MANIFEST_FILENAME = ".python-gen-manifest.json";
const PYPROJECT_FILENAME = "pyproject.toml";
const PACKAGE_INIT = "__init__.py";
const PY_TYPED = "py.typed";

/**
 * Normalize one generator warning line so allow-list entries are stable
 * across runs. Collapses whitespace and masks memory addresses (the tool
 * prints `UntrustedString object at 0x...` reprs that differ per run).
 *
 * @param {string} line - Raw warning line
 * @returns {string} Normalized warning record
 */
function normalizePythonWarning(line) {
  return String(line)
    .replace(/0x[0-9a-fA-F]+/g, "0xADDR")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Collect generator warning records from combined generator output.
 * Records are the `WARNING ...` header lines (one per affected
 * endpoint/response); the `Warning(s) encountered` summary line and the
 * multi-line detail bodies are informational and not records.
 *
 * @param {string} output - Combined stdout+stderr of the generator
 * @returns {string[]} Normalized warning records in output order
 */
function collectPythonWarnings(output) {
  const records = [];
  for (const line of String(output).split("\n")) {
    if (/^WARNING\b/.test(line.trim())) {
      const record = normalizePythonWarning(line);
      if (!records.includes(record)) {
        records.push(record);
      }
    }
  }
  return records;
}

/**
 * Find warnings that are not covered by the allow-list.
 *
 * @param {string[]} warnings - Normalized warning records
 * @param {string[]} allowlist - Explicitly accepted warning records
 * @returns {string[]} Warnings with no allow-list entry
 */
function findUnlistedPythonWarnings(warnings, allowlist) {
  const accepted = new Set(allowlist.map(normalizePythonWarning));
  return warnings.filter((warning) => !accepted.has(warning));
}

/**
 * Resolve the pilot constructs from shared discovery.
 *
 * @returns {Array<{name: string, version: string, dirName: string, openapiPath: string}>}
 */
function getPilotPackages() {
  const wanted = new Set(config.python.pilotPackages);
  const found = config.getSchemaPackages().filter((pkg) => wanted.has(`${pkg.version}/${pkg.dirName}`));
  const missing = [...wanted].filter(
    (key) => !found.some((pkg) => `${pkg.version}/${pkg.dirName}` === key),
  );
  if (missing.length > 0) {
    throw new Error(`Python pilot constructs not discovered: ${missing.join(", ")}`);
  }
  return found;
}

/**
 * Digest a file with SHA-256 (hex).
 *
 * @param {string} absolutePath - File to digest
 * @returns {string} Hex digest
 */
function specDigest(absolutePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolutePath)).digest("hex");
}

/**
 * Digest every file under each generated subpackage, keyed by path
 * relative to python/generated/ (POSIX separators, sorted).
 *
 * @param {string} distRoot - python/generated/ directory
 * @param {string[]} subpackageDirs - Generated subpackage directories
 * @returns {Object<string, string>} Relative path -> SHA-256 hex digest
 */
function generatedFileDigests(distRoot, subpackageDirs) {
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else {
        files.push(full);
      }
    }
  };
  subpackageDirs.forEach(walk);

  const digests = {};
  for (const relative of files.map((full) => path.relative(distRoot, full).split(path.sep).join("/")).sort()) {
    digests[relative] = specDigest(path.join(distRoot, relative));
  }
  return digests;
}

/**
 * Check the Python toolchain: python3 >= 3.11, the pinned
 * openapi-python-client on PATH, and the pinned ruff on PATH (ruff powers
 * the generator's post-processing step, so its version shapes the output).
 *
 * @returns {{python: string, generator: string, ruff: string}} Observed versions
 */
function checkPythonToolchain() {
  const pin = `${config.python.generatorPackage}==${config.python.generatorVersion}`;
  const ruffPin = `ruff==${config.python.ruffVersion}`;
  const installHint = `Install the pinned toolchain once:\n  python3 -m pip install "${pin}" "${ruffPin}"`;

  const python = spawnSync("python3", ["--version"], { encoding: "utf-8" });
  const pythonVersion = `${python.stdout || ""}${python.stderr || ""}`.trim();
  const versionMatch = pythonVersion.match(/Python (\d+)\.(\d+)\./);
  if (!versionMatch || Number(versionMatch[1]) < 3 || (Number(versionMatch[1]) === 3 && Number(versionMatch[2]) < 11)) {
    throw new Error(`python3 >= 3.11 is required for Python client generation (saw: ${pythonVersion || "none"}).`);
  }

  const generator = spawnSync("openapi-python-client", ["--version"], { encoding: "utf-8" });
  const generatorVersion = `${generator.stdout || ""}${generator.stderr || ""}`.trim();
  if (generator.error || generator.status !== 0) {
    throw new Error(
      `openapi-python-client is not on PATH. ${installHint}`,
    );
  }
  if (!generatorVersion.endsWith(config.python.generatorVersion)) {
    throw new Error(
      `openapi-python-client ${config.python.generatorVersion} is required (saw: ${generatorVersion}).\n${installHint}`,
    );
  }

  const ruff = spawnSync("ruff", ["--version"], { encoding: "utf-8" });
  const ruffVersion = `${ruff.stdout || ""}${ruff.stderr || ""}`.trim();
  if (ruff.error || ruff.status !== 0) {
    throw new Error(`ruff is not on PATH. ${installHint}`);
  }
  if (ruffVersion !== `ruff ${config.python.ruffVersion}`) {
    throw new Error(`ruff ${config.python.ruffVersion} is required (saw: ${ruffVersion}).\n${installHint}`);
  }

  return { python: pythonVersion, generator: generatorVersion, ruff: ruffVersion };
}

/**
 * Check generation prerequisites: bundled specs and hand-maintained scaffolding.
 *
 * @param {Array} pilotPackages - Resolved pilot constructs
 */
function checkPythonPrerequisites(pilotPackages) {
  const buildDir = paths.fromRoot(config.paths.buildDir);
  if (!paths.dirExists(buildDir)) {
    logger.error("_openapi_build/ directory not found.");
    logger.info("Run 'node build/bundle-openapi.js' first.");
    process.exit(1);
  }

  for (const pkg of pilotPackages) {
    const specPath = paths.fromRoot(config.getBundledOutputPath(pkg));
    if (!paths.fileExists(specPath)) {
      logger.error(`${config.getBundledOutputPath(pkg)} not found.`);
      logger.info("Run 'node build/bundle-openapi.js' first.");
      process.exit(1);
    }
  }

  // Hand-maintained scaffolding must already exist; generation never creates it.
  for (const scaffold of [PYPROJECT_FILENAME, `src/${config.python.packageName}/${PACKAGE_INIT}`]) {
    const scaffoldPath = paths.fromRoot(config.paths.pythonDir, scaffold);
    if (!paths.fileExists(scaffoldPath)) {
      throw new Error(`Hand-maintained scaffold missing: ${config.paths.pythonDir}/${scaffold}`);
    }
  }
}

/**
 * Generate one pilot construct into a staging directory.
 *
 * @param {Object} pkg - Package definition
 * @param {string} stagingRoot - Temp directory holding per-package output
 * @returns {{output: string, warnings: string[], stagedDir: string}} Generator record
 */
function generatePilotPackage(pkg, stagingRoot) {
  const specPath = paths.fromRoot(config.getBundledOutputPath(pkg));
  const stagedDir = path.join(stagingRoot, `${pkg.version}-${pkg.name}`);
  paths.ensureDir(stagedDir);

  logger.step(`Generating Python client: ${pkg.name} (${pkg.version})...`);

  const result = spawnSync(
    "openapi-python-client",
    ["generate", "--path", specPath, "--output-path", stagedDir, "--meta", "none", "--overwrite"],
    { encoding: "utf-8" },
  );
  const output = `${result.stdout || ""}\n${result.stderr || ""}`;

  if (result.error || result.status !== 0) {
    throw new Error(`Failed to generate Python client for ${pkg.version}/${pkg.name}:\n${output}`);
  }

  const warnings = collectPythonWarnings(output);
  for (const warning of warnings) {
    logger.warn(warning);
  }
  logger.success(`Generated: ${pkg.version}/${pkg.name} (${warnings.length} warning(s))`);
  return { output, warnings, stagedDir };
}

/**
 * Copy a staged client tree into its distribution subpackage, skipping
 * dotfiles and dot-directories (ruff caches and similar tool state must
 * never land in the committed output).
 *
 * @param {string} src - Staged package root
 * @param {string} dest - Distribution subpackage directory
 */
function copyStagedTree(src, dest) {
  paths.ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyStagedTree(from, to);
    } else if (entry.isFile()) {
      fs.copyFileSync(from, to);
    }
  }
}

/**
 * Assemble the distribution from staged output. Enforcement first: any
 * warning without an allow-list entry aborts before python/generated/
 * is touched. Then each pilot subpackage is replaced wholesale (stale
 * files cannot linger) and the manifest is rewritten with the digests of
 * every assembled file.
 *
 * @param {Array} pilotPackages - Resolved pilot constructs
 * @param {Map} stagedByKey - "version/dirName" -> generator record
 * @param {{python: string, generator: string, ruff: string}} toolchain - Observed versions
 */
function assembleDistribution(pilotPackages, stagedByKey, toolchain) {
  const allowlist = config.python.warningAllowlist;
  const warningsByPackage = {};
  const unlisted = [];

  for (const pkg of pilotPackages) {
    const key = `${pkg.version}/${pkg.dirName}`;
    const record = stagedByKey.get(key);
    warningsByPackage[key] = record.warnings;
    for (const warning of findUnlistedPythonWarnings(record.warnings, allowlist)) {
      unlisted.push(`${key}: ${warning}`);
    }
  }

  if (unlisted.length > 0) {
    throw new Error(
      `Python client generation emitted ${unlisted.length} warning(s) with no allow-list entry ` +
        `(see warningAllowlist in build/lib/config.js):\n${unlisted.map((line) => `  - ${line}`).join("\n")}`,
    );
  }

  const distRoot = paths.fromRoot(config.paths.pythonDir);
  const specs = {};
  const subpackageDirs = [];
  for (const pkg of pilotPackages) {
    const key = `${pkg.version}/${pkg.dirName}`;
    const record = stagedByKey.get(key);
    const specRelative = config.getBundledOutputPath(pkg);
    specs[key] = {
      spec: specRelative,
      sha256: specDigest(paths.fromRoot(specRelative)),
    };

    const destDir = path.join(distRoot, "src", config.python.packageName, pkg.name);
    paths.removeDir(destDir);
    copyStagedTree(record.stagedDir, destDir);
    fs.writeFileSync(path.join(destDir, PY_TYPED), "", "utf-8");
    subpackageDirs.push(destDir);
    logger.success(`Assembled: ${paths.relativePath(destDir)}`);
  }

  const manifest = {
    generator: config.python.generatorPackage,
    generatorVersion: config.python.generatorVersion,
    ruffVersion: config.python.ruffVersion,
    meta: "none",
    specs,
    files: generatedFileDigests(distRoot, subpackageDirs),
    warnings: warningsByPackage,
    warningAllowlist: allowlist,
  };
  const manifestPath = path.join(distRoot, MANIFEST_FILENAME);
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");
  logger.success(`Wrote: ${paths.relativePath(manifestPath)}`);
  logger.info(`Toolchain: ${toolchain.python} / ${toolchain.generator} / ${toolchain.ruff}`);
}

/**
 * Main entry point
 */
async function main() {
  const startTime = Date.now();

  try {
    // Change to project root
    process.chdir(paths.getProjectRoot());

    logger.header("🐍 Generating Python clients (pilot)...");

    const pilotPackages = getPilotPackages();
    logger.info(`Pilot constructs: ${pilotPackages.map((pkg) => `${pkg.version}/${pkg.dirName}`).join(", ")}`);

    checkPythonPrerequisites(pilotPackages);
    const toolchain = checkPythonToolchain();

    const stagingRoot = fs.mkdtempSync(path.join(os.tmpdir(), "meshery-python-client-"));
    try {
      const stagedByKey = new Map();
      for (const pkg of pilotPackages) {
        stagedByKey.set(`${pkg.version}/${pkg.dirName}`, generatePilotPackage(pkg, stagingRoot));
      }
      assembleDistribution(pilotPackages, stagedByKey, toolchain);
    } finally {
      fs.rmSync(stagingRoot, { recursive: true, force: true });
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`Python client generation complete! (${duration}s)`);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  checkPythonPrerequisites,
  checkPythonToolchain,
  collectPythonWarnings,
  copyStagedTree,
  findUnlistedPythonWarnings,
  generatePilotPackage,
  generatedFileDigests,
  getPilotPackages,
  normalizePythonWarning,
  specDigest,
  main,
};

if (require.main === module) {
  main();
}

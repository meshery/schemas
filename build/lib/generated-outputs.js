/**
 * generated-outputs.js - Prune generated output whose construct was removed
 *
 * The Go and TypeScript generators write one directory per construct:
 * models/<version>/<package>/ and typescript/generated/<version>/<package>/.
 * They only ever add and rewrite files, so deleting a construct from
 * schemas/constructs/ left its output behind: the removed package stayed in
 * the Go module, and tsup (which globs typescript/generated/) kept publishing
 * its types to npm under constructs/<version>/<package>.
 *
 * Each generator now prunes the output it owns after a full run. A directory
 * is an orphan when no construct directory with an api.yml maps to it (see
 * config.getConstructOutputKeys). Constructs in excludePackages still count
 * as present, so their published output is kept.
 */

const fs = require("fs");
const path = require("path");
const config = require("./config");

const VERSION_DIR = /^v\d+(alpha|beta)\d+$/;
const GENERATED_MARKER = /Code generated .* DO NOT EDIT/;

/**
 * The marker sits in a file's leading comment block, so only the head is read;
 * a hand-written file that quotes the marker further down is not mistaken for
 * generated output.
 * @param {string} filePath - Absolute path
 * @returns {boolean}
 */
function isGeneratedGoFile(filePath) {
  return GENERATED_MARKER.test(fs.readFileSync(filePath, "utf-8").slice(0, 512));
}

/**
 * Find output directories (<outputDir>/<version>/<package>) with no construct.
 * @param {string} projectRoot - Checkout root
 * @param {string} outputDir - Output root relative to projectRoot
 * @returns {string[]} Orphaned directories, relative to projectRoot, sorted
 */
function findOrphanedOutputDirs(projectRoot, outputDir) {
  const outputRoot = path.join(projectRoot, outputDir);
  if (!fs.existsSync(outputRoot)) return [];

  const keep = config.getConstructOutputKeys(projectRoot);
  const orphans = [];
  for (const version of fs.readdirSync(outputRoot)) {
    const versionPath = path.join(outputRoot, version);
    if (!VERSION_DIR.test(version) || !fs.statSync(versionPath).isDirectory()) continue;
    for (const name of fs.readdirSync(versionPath)) {
      if (!fs.statSync(path.join(versionPath, name)).isDirectory()) continue;
      if (!keep.has(`${version}/${name}`)) orphans.push(path.join(outputDir, version, name));
    }
  }
  return orphans.sort();
}

/**
 * Delete the Go files the generator wrote for removed constructs.
 *
 * Only files carrying the generated-code marker are deleted. A hand-written
 * file left in an orphaned package would reference types that no longer
 * exist, so it fails the run rather than being deleted or kept silently.
 *
 * @param {string} projectRoot - Checkout root
 * @returns {string[]} Removed directories, relative to projectRoot
 */
function pruneOrphanedGoOutputs(projectRoot) {
  const removed = [];
  const handWritten = [];
  for (const dir of findOrphanedOutputDirs(projectRoot, config.paths.modelsDir)) {
    const fullDir = path.join(projectRoot, dir);
    for (const file of fs.readdirSync(fullDir)) {
      const fullPath = path.join(fullDir, file);
      if (fs.statSync(fullPath).isFile() && isGeneratedGoFile(fullPath)) {
        fs.unlinkSync(fullPath);
      } else {
        handWritten.push(path.join(dir, file));
      }
    }
    if (fs.readdirSync(fullDir).length === 0) {
      fs.rmdirSync(fullDir);
      removed.push(dir);
    }
  }
  if (handWritten.length > 0) {
    throw new Error(
      "Hand-written files remain in Go packages whose construct was removed. " +
        "Delete or move them with the construct:\n  " +
        handWritten.join("\n  "),
    );
  }
  return removed;
}

/**
 * Delete the TypeScript output of removed constructs. Everything under
 * typescript/generated/ is generator-owned.
 * @param {string} projectRoot - Checkout root
 * @returns {string[]} Removed directories, relative to projectRoot
 */
function pruneOrphanedTypescriptOutputs(projectRoot) {
  const orphans = findOrphanedOutputDirs(projectRoot, config.paths.typescriptDir);
  for (const dir of orphans) {
    fs.rmSync(path.join(projectRoot, dir), { recursive: true, force: true });
  }
  return orphans;
}

module.exports = {
  findOrphanedOutputDirs,
  pruneOrphanedGoOutputs,
  pruneOrphanedTypescriptOutputs,
};

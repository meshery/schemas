/**
 * paths.js - Shared Path Utilities for Build Scripts
 *
 * Provides utilities for path resolution, directory creation, and
 * file existence checking. Ensures consistent path handling across
 * all build scripts.
 */

const fs = require("fs");
const path = require("path");

/**
 * Get the project root directory (parent of build/)
 * @returns {string} Absolute path to project root
 */
function getProjectRoot() {
  return path.resolve(__dirname, "../..");
}

/**
 * Resolve a path relative to the project root
 * @param {...string} segments - Path segments to join
 * @returns {string} Absolute path
 */
function fromRoot(...segments) {
  return path.join(getProjectRoot(), ...segments);
}

/**
 * Ensure a directory exists, creating it if necessary
 * @param {string} dirPath - Path to directory
 * @returns {void}
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Ensure the parent directory of a file exists
 * @param {string} filePath - Path to file
 * @returns {void}
 */
function ensureParentDir(filePath) {
  ensureDir(path.dirname(filePath));
}

/**
 * Check if a file exists
 * @param {string} filePath - Path to file
 * @returns {boolean} True if file exists
 */
function fileExists(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

/**
 * Check if a directory exists
 * @param {string} dirPath - Path to directory
 * @returns {boolean} True if directory exists
 */
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

/**
 * Get all files in a directory matching a pattern (recursive)
 * @param {string} dirPath - Directory to search
 * @param {RegExp} pattern - Pattern to match filenames
 * @returns {string[]} Array of matching file paths
 */
function findFiles(dirPath, pattern) {
  const results = [];

  if (!dirExists(dirPath)) {
    return results;
  }

  function walk(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (stat.isFile() && pattern.test(item)) {
        results.push(fullPath);
      }
    }
  }

  walk(dirPath);
  return results;
}

/**
 * Remove a directory and all its contents
 * @param {string} dirPath - Directory to remove
 * @returns {void}
 */
function removeDir(dirPath) {
  if (dirExists(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Remove a file if it exists
 * @param {string} filePath - File to remove
 * @returns {void}
 */
function removeFile(filePath) {
  if (fileExists(filePath)) {
    fs.unlinkSync(filePath);
  }
}

/**
 * Copy a file to a destination
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @returns {void}
 */
function copyFile(src, dest) {
  ensureParentDir(dest);
  fs.copyFileSync(src, dest);
}

/**
 * Read a file as string
 * @param {string} filePath - Path to file
 * @returns {string} File contents
 */
function readFile(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Write content to a file
 * @param {string} filePath - Path to file
 * @param {string} content - Content to write
 * @returns {void}
 */
function writeFile(filePath, content) {
  ensureParentDir(filePath);
  fs.writeFileSync(filePath, content, "utf-8");
}

/**
 * Get relative path from project root
 * @param {string} absolutePath - Absolute path
 * @returns {string} Relative path from project root
 */
function relativePath(absolutePath) {
  return path.relative(getProjectRoot(), absolutePath);
}

module.exports = {
  getProjectRoot,
  fromRoot,
  ensureDir,
  ensureParentDir,
  fileExists,
  dirExists,
  findFiles,
  removeDir,
  removeFile,
  copyFile,
  readFile,
  writeFile,
  relativePath,
};
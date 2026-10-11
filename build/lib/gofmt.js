/**
 * gofmt.js - Shared gofmt Helper for Go Code Generators
 *
 * Generators in this repo emit Go source by templating and by post-processing
 * oapi-codegen output with line-oriented rewrites. Neither approach can keep
 * struct field/tag column alignment or import grouping canonical on its own, so
 * every generator runs its finished file through `gofmt` as the last step.
 *
 * Formatting is applied to the final bytes only - it never changes the tokens a
 * generator emitted, so it cannot alter generated semantics.
 */

const { execFileSync } = require("child_process");
const { commandExists } = require("./exec");

/**
 * Format a generated Go file in place with gofmt.
 * @param {string} filePath - Path to the Go file to format
 */
function formatGoFile(filePath) {
  try {
    execFileSync("gofmt", ["-w", filePath], { stdio: ["ignore", "ignore", "pipe"] });
  } catch (err) {
    const details = err.stderr ? err.stderr.toString().trim() : err.message;
    throw new Error(`gofmt failed for ${filePath}: ${details}`);
  }
}

/**
 * Verify gofmt is available, exiting with guidance when it is not.
 * @param {Object} logger - Logger with error/info methods
 */
function requireGofmt(logger) {
  if (!commandExists("gofmt")) {
    logger.error("gofmt not found.");
    logger.info("gofmt ships with the Go toolchain: https://go.dev/dl/");
    process.exit(1);
  }
}

module.exports = {
  formatGoFile,
  requireGofmt,
};

/**
 * logger.js - Shared Logging Utilities for Build Scripts
 *
 * Provides colored console output for consistent logging across all build scripts.
 * Supports info, success, error, warning, and step logging.
 */

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",

  // Foreground colors
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

/**
 * Log an informational message (cyan)
 * @param {string} message - Message to log
 */
function info(message) {
  console.log(`${colors.cyan}${message}${colors.reset}`);
}

/**
 * Log a success message (green with checkmark)
 * @param {string} message - Message to log
 */
function success(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

/**
 * Log an error message (red with X)
 * @param {string} message - Message to log
 */
function error(message) {
  console.error(`${colors.red}❌ ${message}${colors.reset}`);
}

/**
 * Log a warning message (yellow)
 * @param {string} message - Message to log
 */
function warn(message) {
  console.warn(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

/**
 * Log a step/progress message (cyan with arrow)
 * @param {string} message - Message to log
 */
function step(message) {
  console.log(`${colors.cyan}🔹 ${message}${colors.reset}`);
}

/**
 * Log a section header (bold cyan)
 * @param {string} message - Message to log
 */
function header(message) {
  console.log("");
  console.log(`${colors.bold}${colors.cyan}${message}${colors.reset}`);
  console.log("");
}

/**
 * Log a dimmed/debug message
 * @param {string} message - Message to log
 */
function debug(message) {
  console.log(`${colors.dim}${message}${colors.reset}`);
}

/**
 * Log a blank line
 */
function blank() {
  console.log("");
}

/**
 * Log final output files
 * @param {string[]} files - Array of file paths to display
 */
function outputFiles(files) {
  files.forEach((file) => {
    console.log(`${colors.green}   📁 ${file}${colors.reset}`);
  });
}

module.exports = {
  colors,
  info,
  success,
  error,
  warn,
  step,
  header,
  debug,
  blank,
  outputFiles,
};
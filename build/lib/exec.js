/**
 * exec.js - Shared Command Execution Utilities for Build Scripts
 *
 * Provides promise-based wrappers for executing shell commands with
 * consistent error handling and output formatting.
 */

const { spawn, execSync } = require("child_process");
const logger = require("./logger");

/**
 * Execute a command and return a promise
 * @param {string} command - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options] - Spawn options
 * @param {boolean} [options.silent] - Suppress output
 * @param {string} [options.cwd] - Working directory
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
function exec(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const { silent = false, cwd = process.cwd() } = options;

    const proc = spawn(command, args, {
      cwd,
      shell: true,
      stdio: silent ? "pipe" : "inherit",
    });

    let stdout = "";
    let stderr = "";

    if (silent && proc.stdout) {
      proc.stdout.on("data", (data) => {
        stdout += data.toString();
      });
    }

    if (silent && proc.stderr) {
      proc.stderr.on("data", (data) => {
        stderr += data.toString();
      });
    }

    proc.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code });
      } else {
        reject(new Error(`Command failed with code ${code}: ${command} ${args.join(" ")}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * Execute an npx command
 * @param {string} packageName - NPM package to run
 * @param {string[]} args - Command arguments
 * @param {Object} [options] - Execution options
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
function npx(packageName, args = [], options = {}) {
  return exec("npx", ["--yes", packageName, ...args], options);
}

/**
 * Execute a command synchronously and return stdout
 * @param {string} command - Command to execute
 * @param {Object} [options] - execSync options
 * @returns {string} Command output
 */
function execSyncSafe(command, options = {}) {
  try {
    return execSync(command, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      ...options,
    }).trim();
  } catch (err) {
    return "";
  }
}

/**
 * Check if a command exists in PATH
 * @param {string} command - Command to check
 * @returns {boolean} True if command exists
 */
function commandExists(command) {
  try {
    execSync(`command -v ${command}`, { stdio: "pipe" });
    return true;
  } catch {
    // Try Windows 'where' command
    try {
      execSync(`where ${command}`, { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Run multiple commands in sequence, stopping on first failure
 * @param {Array<{command: string, args: string[], options?: Object}>} commands
 * @returns {Promise<void>}
 */
async function execSequence(commands) {
  for (const { command, args, options } of commands) {
    await exec(command, args, options);
  }
}

/**
 * Run a command with a descriptive step message
 * @param {string} description - Step description
 * @param {string} command - Command to execute
 * @param {string[]} args - Command arguments
 * @param {Object} [options] - Execution options
 * @returns {Promise<{stdout: string, stderr: string, code: number}>}
 */
async function execStep(description, command, args = [], options = {}) {
  logger.step(description);
  try {
    const result = await exec(command, args, options);
    return result;
  } catch (err) {
    logger.error(`Failed: ${description}`);
    throw err;
  }
}

module.exports = {
  exec,
  npx,
  execSyncSafe,
  commandExists,
  execSequence,
  execStep,
};
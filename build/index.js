#!/usr/bin/env node
/**
 * index.js - Build Scripts CLI Entry Point
 *
 * DESCRIPTION:
 *   Unified CLI for running Meshery schema build scripts.
 *   Can run individual scripts or the full build pipeline.
 *
 * USAGE:
 *   node build/index.js <command>
 *
 * COMMANDS:
 *   bundle      - Bundle and merge OpenAPI specifications
 *   golang      - Generate Go structs from OpenAPI specs
 *   rtk         - Generate RTK Query clients
 *   types       - Generate TypeScript type definitions
 *   all         - Run full build pipeline (bundle → golang → rtk → types)
 *   help        - Show this help message
 *
 * EXAMPLES:
 *   node build/index.js bundle
 *   node build/index.js golang
 *   node build/index.js all
 */

const { spawn } = require("child_process");
const path = require("path");

const logger = require("./lib/logger");
const paths = require("./lib/paths");

/**
 * Available commands and their configurations
 */
const commands = {
  bundle: {
    description: "Bundle and merge OpenAPI specifications",
    script: "bundle-openapi.js",
  },
  golang: {
    description: "Generate Go structs from OpenAPI specs",
    script: "generate-golang.js",
    dependsOn: "bundle",
  },
  rtk: {
    description: "Generate RTK Query clients",
    script: "generate-rtk.js",
    dependsOn: "bundle",
  },
  types: {
    description: "Generate TypeScript type definitions",
    script: "generate-typescript.js",
    dependsOn: "bundle",
  },
  all: {
    description: "Run full build pipeline",
    pipeline: ["bundle", "golang", "rtk", "types"],
  },
};

/**
 * Run a script and return a promise
 * @param {string} scriptPath - Path to script
 * @param {string[]} args - Arguments to pass
 * @returns {Promise<void>}
 */
function runScript(scriptPath, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn("node", [scriptPath, ...args], {
      cwd: paths.getProjectRoot(),
      stdio: "inherit",
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script exited with code ${code}`));
      }
    });

    proc.on("error", reject);
  });
}

/**
 * Run a single command
 * @param {string} commandName - Command to run
 * @param {Set<string>} [completed] - Set of already completed commands
 * @returns {Promise<void>}
 */
async function runCommand(commandName, completed = new Set()) {
  const command = commands[commandName];

  if (!command) {
    throw new Error(`Unknown command: ${commandName}`);
  }

  // Skip if already completed (for dependency resolution)
  if (completed.has(commandName)) {
    return;
  }

  // Handle pipeline commands
  if (command.pipeline) {
    for (const subCommand of command.pipeline) {
      await runCommand(subCommand, completed);
    }
    return;
  }

  // Run dependencies first
  if (command.dependsOn && !completed.has(command.dependsOn)) {
    await runCommand(command.dependsOn, completed);
  }

  // Run the script
  const scriptPath = path.join(__dirname, command.script);
  const args = command.args || [];

  await runScript(scriptPath, args);
  completed.add(commandName);
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Meshery Schemas Build CLI

USAGE:
  node build/index.js <command>

COMMANDS:`);

  for (const [name, config] of Object.entries(commands)) {
    const deps = config.dependsOn ? ` (requires: ${config.dependsOn})` : "";
    console.log(`  ${name.padEnd(12)} ${config.description}${deps}`);
  }

  console.log(`  ${"help".padEnd(12)} Show this help message`);

  console.log(`
EXAMPLES:
  node build/index.js bundle    # Bundle OpenAPI specs only
  node build/index.js golang    # Generate Go code (auto-runs bundle)
  node build/index.js all       # Run full build pipeline
`);
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "help";

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    process.exit(0);
  }

  if (!commands[command]) {
    logger.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }

  try {
    const startTime = Date.now();
    logger.header(`🚀 Running: ${command}`);

    await runCommand(command);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.blank();
    logger.success(`Build completed successfully! (${duration}s)`);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

main();

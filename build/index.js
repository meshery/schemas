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
 *   validate    - Validate schemas with the Go validator (via make validate-schemas)
 *   bundle      - Bundle and merge OpenAPI specifications
 *   golang      - Generate Go structs from OpenAPI specs
 *   rtk         - Generate RTK Query clients
 *   python      - Generate Python client (pilot constructs)
 *   types       - Generate TypeScript type definitions
 *   all         - Run full build pipeline (validate → bundle → golang → rtk → python → types)
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
  validate: {
    description: "Validate schemas with the Go validator (via make validate-schemas)",
    exec: ["make", "validate-schemas"],
  },
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
  python: {
    description: "Generate Python client (pilot constructs)",
    script: "generate-python.js",
    dependsOn: "bundle",
  },
  types: {
    description: "Generate TypeScript type definitions",
    script: "generate-typescript.js",
    dependsOn: "bundle",
  },
  perms_ts: {
    description: "Generate TS permission keys from CSV (2-phase)",
    script: "generate-permissions-ts.js",
  },
  perms_go: {
    description: "Generate Go permission keys from CSV (2-phase)",
    script: "generate-permission-golang.js",
  },
  perms_diff: {
    description: "Diff two permissions index files",
    script: "diff-permissions.js",
  },
  perms_apply: {
    description: "Apply permission renames from diff JSON",
    script: "apply-permissions-updates.js",
  },
  all: {
    description: "Run full build pipeline",
    pipeline: ["validate", "bundle", "golang", "rtk", "python", "types"],
  },
};

/**
 * Run a process and return a promise
 * @param {string} command - Executable to run
 * @param {string[]} args - Arguments to pass
 * @param {{ label?: string }} [options] - Optional label for diagnostics
 * @returns {Promise<void>}
 */
function runProcess(command, args = [], { label } = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: paths.getProjectRoot(),
      stdio: "inherit",
    });

    const displayCommand = [command, ...args].join(" ");
    const prefix = label ? `${label} (${displayCommand})` : displayCommand;

    proc.on("close", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      const reason = signal
        ? `terminated by signal ${signal}`
        : `exited with code ${code}`;
      reject(new Error(`${prefix} ${reason}`));
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

  // Run either a raw exec command or a node script
  if (command.exec) {
    if (!Array.isArray(command.exec) || command.exec.length === 0) {
      throw new Error(
        `Command '${commandName}' has an invalid 'exec' (expected non-empty array)`,
      );
    }
    await runProcess(command.exec[0], command.exec.slice(1), {
      label: commandName,
    });
  } else if (command.script) {
    const scriptPath = path.join(__dirname, command.script);
    const args = command.args || [];
    await runProcess("node", [scriptPath, ...args], { label: commandName });
  } else {
    throw new Error(
      `Command '${commandName}' has neither 'exec' nor 'script'`,
    );
  }
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

#!/usr/bin/env node
/**
 * diff-permissions.js - Compare two permissions index files and show migration plan
 */
const fs = require("fs");
const paths = require("./lib/paths");
const logger = require("./lib/logger");
const { loadIndex, diffIndexes } = require("./lib/permissions");

function usage() {
  console.log("Usage: node build/diff-permissions.js <old_index.json> <new_index.json>");
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    usage();
    process.exit(1);
  }
  const oldPath = args[0];
  const newPath = args[1];

  const oldIndex = loadIndex(oldPath);
  const newIndex = loadIndex(newPath);

  const diff = diffIndexes(oldIndex, newIndex);

  console.log(JSON.stringify({
    oldIndexId: oldIndex.id,
    newIndexId: newIndex.id,
    summary: {
      added: diff.added.length,
      removed: diff.removed.length,
      updated: diff.updated.length,
    },
    // Diff is strictly by id (uuid). Feature is ignored.
    added: diff.added,        // [{ id, name }]
    removed: diff.removed,    // [{ id, name }]
    updated: diff.updated,    // [{ id, old_name, new_name }]
    migrationPlan: {
      actions: [
        "Add new permission ids with their names",
        "Remove permissions with ids no longer present",
        "Rename keys locally where id stayed the same but name changed",
      ],
    },
  }, null, 2));
}

main();

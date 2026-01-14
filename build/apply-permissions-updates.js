#!/usr/bin/env node
/**
 * apply-permissions-updates.js (simplified)
 *
 * Uses Unix tools (fd/rg + sed) to apply renames from a permissions diff JSON.
 * Only processes `updated`: [{ id, old_name, new_name }].
 *
 * Usage:
 *   node build/apply-permissions-updates.js <diff.json> [--path <dir>] [--dry]
 *
 * Notes:
 * - Requires `fd` (or falls back to recursive scan) and `sed`.
 * - Performs global replacements: s/old_name/new_name/g
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const logger = require("./lib/logger");
const paths = require("./lib/paths");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    diffPath: null,
    dir: paths.getProjectRoot(),
    dry: false,
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!opts.diffPath) { opts.diffPath = a; continue; }
    if (a === "--path") { opts.dir = args[++i]; continue; }

    if (a === "--dry") { opts.dry = true; continue; }
  }
  if (!opts.diffPath) {
    console.error("Usage: node build/apply-permissions-updates.js <diff.json> [--path <dir>] [--ext <csv>] [--dry]");
    process.exit(1);
  }
  if (!path.isAbsolute(opts.dir)) { opts.dir = path.join(paths.getProjectRoot(), opts.dir); }
  return opts;
}

function readDiff(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const diff = JSON.parse(raw);
  const updates = Array.isArray(diff.updated) ? diff.updated : [];
  return updates.filter((u) => u && u.old_name && u.new_name && u.old_name !== u.new_name);
}

function grepFilesContaining(dir, term) {
  // Use rg if available, else grep -rl
  let res = spawnSync("rg", ["-l", term, dir], { encoding: "utf-8" });
  if (res.status !== 0) {
    res = spawnSync("grep", ["-R", "-l", term, dir], { encoding: "utf-8" });
  }
  if (res.status === 0) {
    return res.stdout.split("\n").filter(Boolean);
  }
  return [];
}

function escapeSed(str) {
  return str.replace(/[\\/]/g, (m) => `\\${m}`);
}

function applyWithSed(file, oldName, newName, dry) {
  const search = escapeSed(oldName);
  const replace = escapeSed(newName);
  const sedExpr = `s/${search}/${replace}/g`;
  if (dry) {
    const res = spawnSync("grep", ["-n", oldName, file], { encoding: "utf-8" });
    if (res.status === 0 && res.stdout) {
      logger.info(`Would update ${oldName} -> ${newName} in ${paths.relativePath(file)}`);
      return true;
    }
    return false;
  }
  const res = spawnSync("sed", ["-i", sedExpr, file], { encoding: "utf-8" });
  if (res.status !== 0) {
    logger.warn(`sed failed on ${paths.relativePath(file)}: ${res.stderr || res.status}`);
    return false;
  }
  logger.info(`Updated ${oldName} -> ${newName} in ${paths.relativePath(file)}`);
  return true;
}

function main() {
  const opts = parseArgs();
  const updates = readDiff(opts.diffPath);
  if (!updates.length) { logger.warn("No updates found in diff."); process.exit(0); }

  logger.header(`✏️ Applying ${updates.length} permission renames (sed)`);
  let changedFiles = 0;
  for (const u of updates) {
    const files = grepFilesContaining(opts.dir, u.old_name);
    for (const f of files) {
      if (applyWithSed(f, u.old_name, u.new_name, opts.dry)) changedFiles++;
    }
  }

  logger.blank();
  if (opts.dry) logger.success(`Dry-run complete. ${changedFiles} files would be updated.`);
  else logger.success(`Updates applied. ${changedFiles} files modified.`);
}

main();

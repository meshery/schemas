import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Packaging guard for meshery/schemas#1154.
 *
 * Root exports of construct documents carry the construct version in the
 * identifier, so a consumer can see which edition it is getting at the import
 * site. Exactly two did not: `BadgeSchema` and `InvitationSchema` read as *the*
 * schema for their construct while resolving to the retired v1beta1 edition.
 *
 * That edition still carries the snake_case identifiers (`image_url`, `org_id`,
 * `owner_id`, `expires_at`). A consumer addressing the live camelCase names got
 * no error anywhere - property lookups against the wrong document simply return
 * nothing - so the failure surfaced only as a form field that never rendered
 * (layer5io/meshery-cloud#5917).
 *
 * These assertions fail if a new version-ambiguous root export is introduced.
 */

const indexSource = readFileSync(join(import.meta.dirname, "index.ts"), "utf-8");

/**
 * Version-ambiguous root exports retained as deprecated aliases for one
 * release. Nothing may be added here - entries only leave, when the alias is
 * dropped.
 */
const DEPRECATED_AMBIGUOUS_EXPORTS = new Set(["BadgeSchema", "InvitationSchema"]);

/**
 * Local binding -> the generated construct path it resolves to, following the
 * `const alias = binding;` indirection the deprecated aliases are declared with.
 */
function importedConstructPaths(): Map<string, string> {
  const paths = new Map<string, string>();
  const importLine = /^import\s+(\w+)\s+from\s+"(\.\/generated\/[^"]+)";$/gm;
  for (const [, binding, path] of indexSource.matchAll(importLine)) {
    paths.set(binding, path);
  }

  const constAlias = /^const\s+(\w+)\s*=\s*(\w+);$/gm;
  for (const [, alias, target] of indexSource.matchAll(constAlias)) {
    const path = paths.get(target);
    if (path) paths.set(alias, path);
  }

  return paths;
}

/** The `export { ... }` block that publishes the construct documents. */
function rootSchemaExports(): Array<{ local: string; exported: string }> {
  const blockStart = indexSource.indexOf("// Export schemas");
  assert.notEqual(blockStart, -1, "expected an '// Export schemas' block in index.ts");

  const open = indexSource.indexOf("export {", blockStart);
  const close = indexSource.indexOf("};", open);
  assert.ok(open !== -1 && close !== -1, "expected a closed export block");

  const body = indexSource
    .slice(open + "export {".length, close)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");

  return body
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [local, exported] = entry.split(/\s+as\s+/).map((part) => part.trim());
      return { local, exported: exported ?? local };
    });
}

/** "v1beta2" -> "V1Beta2", matching the identifier convention. */
function versionToken(path: string): string | null {
  const match = path.match(/\/generated\/(v1)(alpha|beta)(\d+)\//);
  if (!match) return null;
  const [, v, stage, ordinal] = match;
  return `${v.toUpperCase()}${stage[0].toUpperCase()}${stage.slice(1)}${ordinal}`;
}

test("every root construct-document export names the construct version it resolves to", () => {
  const paths = importedConstructPaths();
  const ambiguous: string[] = [];

  for (const { local, exported } of rootSchemaExports()) {
    if (!exported.endsWith("Schema")) continue;
    if (DEPRECATED_AMBIGUOUS_EXPORTS.has(exported)) continue;

    const path = paths.get(local);
    if (!path) continue;

    const version = versionToken(path);
    assert.ok(version, `could not read a construct version out of ${path}`);

    if (!exported.includes(version)) {
      ambiguous.push(`${exported} -> ${path} (expected the name to contain ${version})`);
    }
  }

  assert.deepEqual(
    ambiguous,
    [],
    `version-ambiguous root export(s) added. A consumer cannot tell which construct edition ` +
      `these resolve to, and reading the wrong edition fails silently:\n  ${ambiguous.join("\n  ")}`,
  );
});

test("each deprecated alias is still exported and still pinned to v1beta1", () => {
  const paths = importedConstructPaths();
  const exports = new Map(rootSchemaExports().map(({ exported, local }) => [exported, local]));

  for (const alias of DEPRECATED_AMBIGUOUS_EXPORTS) {
    const local = exports.get(alias);
    assert.ok(local, `${alias} is no longer exported - drop it from DEPRECATED_AMBIGUOUS_EXPORTS`);

    const path = paths.get(local);
    assert.ok(path, `${alias} does not resolve to a generated construct document`);
    assert.equal(
      versionToken(path),
      "V1Beta1",
      `${alias} was repointed to ${path}. That is a breaking change for consumers still ` +
        `reading the v1beta1 identifiers - it needs to be deliberate, not incidental.`,
    );
  }
});

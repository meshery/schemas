const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  parsePermissions,
  parseKeychains,
  resolveOAuthScopes,
  generateGoFile,
  generateTypeScriptFile,
  buildIndex,
} = require("../build/lib/permissions");

const root = path.join(__dirname, "..");
const csv = fs.readFileSync(path.join(root, "build/permissions.csv"), "utf-8");
const scopeFile = JSON.parse(fs.readFileSync(path.join(root, "build/oauth-scopes.json"), "utf-8"));

const permissions = parsePermissions(csv);
const keychains = parseKeychains(csv);

test("every scope in build/oauth-scopes.json resolves to one keychain and existing keys", () => {
  const scopes = resolveOAuthScopes(scopeFile, permissions, keychains);
  assert.deepEqual(
    scopes.map((s) => s.scope),
    [
      "content:read",
      "content:write",
      "schedule:read",
      "schedule:write",
      "connections:read",
      "events:read",
      "account:read",
    ],
  );
  assert.equal(new Set(scopes.map((s) => s.keychain)).size, scopes.length);
  for (const s of scopes) {
    assert.match(s.keychainId, /^[0-9a-f-]{36}$/);
    assert.ok(s.keys.length > 0, `${s.scope} carries at least one key`);
  }
  const pause = scopes.find((s) => s.scope === "schedule:write").keys.map((k) => k.name);
  assert.ok(pause.includes("WorkflowManagementPauseSchedules"));
});

test("a scope that names an undefined keychain is refused", () => {
  const broken = { scopes: { "content:read": { keychain: "No Such Keychain", keys: [] } } };
  assert.throws(() => resolveOAuthScopes(broken, permissions, keychains), /not defined in the permissions source/);
});

test("a scope that lists an undefined key is refused", () => {
  const broken = { scopes: { "content:read": { keychain: "Content View", keys: ["NoSuchKey"] } } };
  assert.throws(() => resolveOAuthScopes(broken, permissions, keychains), /not in the permissions source/);
});

test("two scopes cannot share a keychain", () => {
  const broken = {
    scopes: {
      "content:read": { keychain: "Content View", keys: [] },
      "content:write": { keychain: "Content View", keys: [] },
    },
  };
  assert.throws(() => resolveOAuthScopes(broken, permissions, keychains), /exactly one keychain/);
});

test("a scope string must be resource:action in lowercase", () => {
  const broken = { scopes: { "Content-Read": { keychain: "Content View", keys: [] } } };
  assert.throws(() => resolveOAuthScopes(broken, permissions, keychains), /must be lowercase/);
});

test("the Go and TypeScript outputs carry the scope map", () => {
  const scopes = resolveOAuthScopes(scopeFile, permissions, keychains);
  const index = buildIndex(permissions);
  const go = generateGoFile(index.items, index.id, scopes);
  assert.match(go, /OAuthScopeContentRead OAuthScope = "content:read"/);
  assert.match(go, /var OAuthScopeGrants = map\[OAuthScope\]OAuthScopeGrant\{/);
  assert.match(go, /Keychain:\s+"Schedule Edit"/);
  assert.match(go, /WorkflowManagementPauseSchedules,/);
  const ts = generateTypeScriptFile(index.items, index.id, scopes);
  assert.match(ts, /export const OAuthScopes = \{/);
  assert.match(ts, /"account:read": \{/);
  assert.match(ts, /export type OAuthScope = keyof typeof OAuthScopes;/);
  assert.equal(generateGoFile(index.items, index.id).includes("OAuthScope"), false, "no scopes, no scope declarations");
});

test("no scope or keychain carries a product name", () => {
  const scopes = resolveOAuthScopes(scopeFile, permissions, keychains);
  for (const s of scopes) {
    for (const value of [s.scope, s.keychain, ...s.keys.map((k) => k.name)]) {
      assert.doesNotMatch(value, /meshery|layer5|kanvas/i, value);
    }
  }
});

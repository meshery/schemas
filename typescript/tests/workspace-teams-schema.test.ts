import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

/**
 * Regression guard for meshery/schemas#1143: getTeamsOfWorkspace's 200 response
 * used to $ref the v1beta1 TeamPage, which is snake_case (page_size, total_count,
 * created_at/updated_at/deleted_at) and doesn't match what meshery-cloud actually
 * serves post the Phase 4 wire-format flip (camelCase, v1beta2 TeamPage). The
 * mismatch was silent — consumers just got undefined for those fields.
 *
 * This resolves the schema straight from the YAML source
 * (schemas/constructs/v1beta3/workspace/api.yml) and follows its $ref chain by
 * hand, rather than importing the generated TypeScript artifact. That way the
 * guard always reflects the schema contract itself and can't drift out of sync
 * with a stale generated snapshot (see review discussion on #1149).
 */

type YamlNode = Record<string, any>;

function loadYaml(absPath: string): YamlNode {
  return yaml.load(fs.readFileSync(absPath, "utf-8")) as YamlNode;
}

/** Resolves a single "$ref" (either "./other.yml#/a/b" or "#/a/b") relative to the document it appears in. */
function resolveRef(
  ref: string,
  currentDoc: YamlNode,
  currentAbsPath: string,
): { node: YamlNode; doc: YamlNode; absPath: string } {
  const [filePart, pointerPart] = ref.split("#");
  let doc: YamlNode;
  let absPath: string;
  if (filePart) {
    absPath = path.resolve(path.dirname(currentAbsPath), filePart);
    doc = loadYaml(absPath);
  } else {
    doc = currentDoc;
    absPath = currentAbsPath;
  }
  const pointer = (pointerPart || "").split("/").filter(Boolean);
  let node: YamlNode = doc;
  for (const key of pointer) node = node[key];
  return { node, doc, absPath };
}

test("getTeamsOfWorkspace's 200 response resolves to the camelCase v1beta2 TeamPage shape", () => {
  const repoRoot = process.cwd();
  const workspaceAbs = path.resolve(repoRoot, "schemas/constructs/v1beta3/workspace/api.yml");
  const workspaceDoc = loadYaml(workspaceAbs);

  const responseRef =
    workspaceDoc.paths["/api/workspaces/{workspaceId}/teams"].get.responses["200"].content[
      "application/json"
    ].schema["$ref"];

  assert.ok(
    responseRef.includes("/v1beta2/team/"),
    `expected getTeamsOfWorkspace to $ref the v1beta2 team construct, got: ${responseRef}`,
  );

  let step = resolveRef(responseRef, workspaceDoc, workspaceAbs);
  const teamPage = step.node;
  const pageProps = teamPage.properties;

  assert.ok("pageSize" in pageProps, "expected camelCase 'pageSize' on the teams page response");
  assert.ok("totalCount" in pageProps, "expected camelCase 'totalCount' on the teams page response");
  assert.ok(
    !("page_size" in pageProps),
    "found stale snake_case 'page_size' — did getTeamsOfWorkspace get re-pointed at v1beta1/team?",
  );
  assert.ok(
    !("total_count" in pageProps),
    "found stale snake_case 'total_count' — did getTeamsOfWorkspace get re-pointed at v1beta1/team?",
  );

  // Follow teams[] -> Team -> team.yaml to check the per-team timestamp fields.
  step = resolveRef(pageProps.teams.items["$ref"], step.doc, step.absPath);
  step = resolveRef(step.node["$ref"], step.doc, step.absPath);
  const teamProps = step.node.properties;

  for (const camel of ["createdAt", "updatedAt", "deletedAt"]) {
    assert.ok(camel in teamProps, `expected camelCase '${camel}' on each team in the teams page response`);
  }
  for (const snake of ["created_at", "updated_at", "deleted_at"]) {
    assert.ok(
      !(snake in teamProps),
      `found stale snake_case '${snake}' — did getTeamsOfWorkspace get re-pointed at v1beta1/team?`,
    );
  }
});

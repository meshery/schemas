import { test } from "node:test";
import assert from "node:assert/strict";
import WorkspaceSchema from "../generated/v1beta3/workspace/WorkspaceSchema.ts";

/**
 * Regression guard for meshery/schemas#1143: getTeamsOfWorkspace's 200 response
 * used to $ref the v1beta1 TeamPage, which is snake_case (page_size, total_count,
 * created_at/updated_at/deleted_at) and doesn't match what meshery-cloud actually
 * serves post the Phase 4 wire-format flip (camelCase, v1beta2 TeamPage). The
 * mismatch was silent — consumers just got undefined for those fields.
 *
 * This asserts the generated schema for getTeamsOfWorkspace resolves to the
 * canonical camelCase field names, so a future re-point back to v1beta1 (or any
 * other snake_case regression on this operation) fails here instead of shipping
 * silently again.
 */
test("getTeamsOfWorkspace's 200 response resolves to the camelCase v1beta2 TeamPage shape", () => {
  const schema = WorkspaceSchema as Record<string, any>;
  const responseSchema =
    schema.paths["/api/workspaces/{workspaceId}/teams"].get.responses["200"].content[
      "application/json"
    ].schema;

  const pageProps = responseSchema.properties;
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

  const teamProps = pageProps.teams.items.properties;
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

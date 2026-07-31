import { test } from "node:test";
import assert from "node:assert/strict";
import type { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { withMeshkitErrorTransform } from "./meshkitError.ts";

/**
 * Builds a stub inner BaseQueryFn that resolves to a non-2xx error carrying the
 * given JSON body, so we can drive it through withMeshkitErrorTransform.
 */
function innerReturning(data: unknown): BaseQueryFn<unknown, unknown, FetchBaseQueryError> {
  return async () => ({
    error: { status: 500, data } as FetchBaseQueryError,
  });
}

async function run(data: unknown) {
  const wrapped = withMeshkitErrorTransform(innerReturning(data));
  const result = await wrapped({}, {} as never, {});
  return (result.error as { meshkit?: Record<string, unknown> }).meshkit;
}

// Regression guard for meshery/schemas#1081: the server emits the MeshKit error
// envelope in camelCase, but the transform used to read snake_case, so
// probableCause / suggestedRemediation / longDescription always came back
// undefined. This asserts all SIX fields survive a realistic camelCase body.
test("withMeshkitErrorTransform maps all six fields from a camelCase server body", async () => {
  const meshkit = await run({
    error: "Failed to reach the connection",
    code: "meshery-server-1033",
    severity: "ERROR",
    probableCause: ["The connection endpoint is unreachable", "Credentials expired"],
    suggestedRemediation: ["Verify the endpoint URL", "Re-authenticate the connection"],
    longDescription: ["The server could not establish a session with the target."],
  });

  assert.ok(meshkit, "meshkit metadata should be attached");
  assert.equal(meshkit.message, "Failed to reach the connection");
  assert.equal(meshkit.code, "meshery-server-1033");
  assert.equal(meshkit.severity, "ERROR");
  assert.deepEqual(meshkit.probableCause, [
    "The connection endpoint is unreachable",
    "Credentials expired",
  ]);
  assert.deepEqual(meshkit.suggestedRemediation, [
    "Verify the endpoint URL",
    "Re-authenticate the connection",
  ]);
  assert.deepEqual(meshkit.longDescription, [
    "The server could not establish a session with the target.",
  ]);
});

// Transitional tolerance: a legacy producer still emitting snake_case must not
// silently drop the arrays.
test("withMeshkitErrorTransform falls back to legacy snake_case fields", async () => {
  const meshkit = await run({
    error: "Legacy producer error",
    probable_cause: ["legacy cause"],
    suggested_remediation: ["legacy remediation"],
    long_description: ["legacy detail"],
  });

  assert.ok(meshkit);
  assert.deepEqual(meshkit.probableCause, ["legacy cause"]);
  assert.deepEqual(meshkit.suggestedRemediation, ["legacy remediation"]);
  assert.deepEqual(meshkit.longDescription, ["legacy detail"]);
});

// camelCase must win when a producer somehow emits both spellings.
test("withMeshkitErrorTransform prefers camelCase over snake_case", async () => {
  const meshkit = await run({
    error: "Both casings present",
    probableCause: ["camel cause"],
    probable_cause: ["snake cause"],
    suggestedRemediation: ["camel remediation"],
    suggested_remediation: ["snake remediation"],
    longDescription: ["camel detail"],
    long_description: ["snake detail"],
  });

  assert.ok(meshkit);
  assert.deepEqual(meshkit.probableCause, ["camel cause"]);
  assert.deepEqual(meshkit.suggestedRemediation, ["camel remediation"]);
  assert.deepEqual(meshkit.longDescription, ["camel detail"]);
});

// A non-MeshKit error body (no string `error` field) passes through untouched.
test("withMeshkitErrorTransform leaves non-MeshKit error bodies untouched", async () => {
  const wrapped = withMeshkitErrorTransform(innerReturning({ notMeshkit: true }));
  const result = await wrapped({}, {} as never, {});
  assert.equal((result.error as { meshkit?: unknown }).meshkit, undefined);
});

/**
 * Smoke tests for the injectable share-endpoints module.
 *
 * These exercise the built output in `dist/` — so they cover both that the
 * module exists at the advertised path and that its runtime shape is what
 * consumers expect when they call `api.injectEndpoints(...)`.
 *
 * Type-level correctness is checked by the TypeScript compiler when
 * `npm run build` type-emits `dist/shareEndpoints.d.ts`, and additionally
 * by the scratch consumer described in `typescript/README.md`.
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const fs = require("node:fs");

const distDir = path.join(__dirname, "..", "dist");
const hasBuild = fs.existsSync(path.join(distDir, "shareEndpoints.js"));

test("shareEndpoints module resolves from the package", { skip: !hasBuild && "run `npm run build` first" }, () => {
  const mod = require("../dist/shareEndpoints.js");
  assert.equal(typeof mod.buildShareEndpoints, "function");
  assert.deepEqual([...mod.SHARE_ENDPOINT_TAG_TYPES], ["View_views", "Design_designs"]);
});

test("buildShareEndpoints produces the three expected share mutations bound to the provided builder", { skip: !hasBuild && "run `npm run build` first" }, () => {
  const { buildShareEndpoints } = require("../dist/shareEndpoints.js");

  // Minimal fake EndpointBuilder. `build.mutation` captures the definition so
  // we can assert the URLs and tag wiring match the OpenAPI contract.
  const fakeBuild = {
    mutation: (def) => ({ kind: "mutation", ...def }),
  };

  const endpoints = buildShareEndpoints(fakeBuild);

  assert.ok(endpoints.shareView, "shareView endpoint should exist");
  assert.ok(endpoints.shareDesign, "shareDesign endpoint should exist");
  assert.ok(endpoints.handleResourceShare, "handleResourceShare endpoint should exist");

  // URL contracts must match the generated cloud.ts so a consumer-injected
  // slice hits exactly the routes meshery-cloud (and the Kanvas extension
  // mount) expose.
  const viewReq = endpoints.shareView.query({
    body: { content_id: "abc", content_type: "view", emails: ["a@b.c"], share: true },
  });
  assert.equal(viewReq.url, "/api/content/view/share");
  assert.equal(viewReq.method, "POST");

  const designReq = endpoints.shareDesign.query({
    body: { content_id: "abc", content_type: "pattern", emails: ["a@b.c"], share: true },
  });
  assert.equal(designReq.url, "/api/content/design/share");
  assert.equal(designReq.method, "POST");

  const resourceReq = endpoints.handleResourceShare.query({
    resourceType: "design",
    resourceId: "42",
    body: {},
  });
  assert.equal(resourceReq.url, "/api/resource/design/share/42");
  assert.equal(resourceReq.method, "POST");

  assert.deepEqual(endpoints.shareView.invalidatesTags, ["View_views"]);
  assert.deepEqual(endpoints.shareDesign.invalidatesTags, ["Design_designs"]);
  assert.deepEqual(endpoints.handleResourceShare.invalidatesTags, ["Design_designs"]);
});

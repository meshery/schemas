/**
 * Type-level smoke test for the injectable share-endpoints module.
 *
 * Not executed at runtime — it exists so the TypeScript compiler (run
 * during `npm run build`'s dts emit, and by consumers via their own
 * `tsc --noEmit`) checks that:
 *
 *   1. A fresh `createApi` slice can consume `buildShareEndpoints` via
 *      `injectEndpoints`.
 *   2. The resulting slice exposes `useShareViewMutation`,
 *      `useShareDesignMutation`, and `useHandleResourceShareMutation`
 *      as hooks typed against the same `…ApiArg` shapes the generated
 *      `cloudApi` publishes.
 */

// Using the non-react entry so this type test does not require @types/react
// in the schemas repo; React consumers (the whole point of the module)
// should import from "@reduxjs/toolkit/query/react" instead. The builder
// factory is identical either way.
import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

import {
  buildShareEndpoints,
  SHARE_ENDPOINT_TAG_TYPES,
  type ShareEndpointsBaseQuery,
  type ShareViewApiArg,
  type ShareDesignApiArg,
  type HandleResourceShareApiArg,
} from "../typescript/rtk/shareEndpoints";

// The whole point: mount the share endpoints on an arbitrary slice whose
// baseUrl points wherever the consumer likes — here, a same-origin
// extension mount, not meshery-cloud's RTK_CLOUD_ENDPOINT_PREFIX.
const scratchApi = createApi({
  reducerPath: "scratchShareApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/extensions", credentials: "include" }),
  tagTypes: [...SHARE_ENDPOINT_TAG_TYPES],
  endpoints: () => ({}),
});

// RTK note: `EndpointBuilder<BaseQuery, …>` is invariant in `BaseQuery`, so
// TypeScript cannot unify the consumer slice's concrete base query with the
// wider `ShareEndpointsBaseQuery` parameter on `buildShareEndpoints`. The
// cast below is the one-line forced escape-hatch documented in the module
// header; runtime objects are structurally identical.
const sharing = scratchApi.injectEndpoints({
  endpoints: (build) =>
    buildShareEndpoints(
      build as unknown as EndpointBuilder<
        ShareEndpointsBaseQuery,
        (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
        "scratchShareApi"
      >,
    ),
});

// If any of these references fail to type-check, the module has drifted
// from the generated cloud.ts contract. We reach into the core mutation
// endpoints (not the react hooks) so this file stays type-checkable
// without @types/react pulled in by the schemas repo.
export const _shareView = sharing.endpoints.shareView.initiate;
export const _shareDesign = sharing.endpoints.shareDesign.initiate;
export const _handleResourceShare = sharing.endpoints.handleResourceShare.initiate;

// Arg shapes are the same ones consumers already import from `cloudApi`.
export const _viewArg: ShareViewApiArg = {
  body: { content_id: "id", content_type: "view", emails: [], share: true },
};
export const _designArg: ShareDesignApiArg = {
  body: { content_id: "id", content_type: "pattern", emails: [], share: true },
};
export const _resourceArg: HandleResourceShareApiArg = {
  resourceType: "design",
  resourceId: "id",
  body: {},
};

// --- pathPrefix option type-checks -----------------------------------------

// Positive: passing a well-formed `opts` object with `pathPrefix` type-checks
// and returns the same endpoint-definitions shape the consumer slice expects.
const sharingWithPrefix = scratchApi.injectEndpoints({
  endpoints: (build) =>
    buildShareEndpoints(
      build as unknown as EndpointBuilder<
        ShareEndpointsBaseQuery,
        (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
        "scratchShareApi"
      >,
      { pathPrefix: "/api/extensions" },
    ),
});
export const _shareViewPrefixed = sharingWithPrefix.endpoints.shareView.initiate;

// Negative: a numeric `pathPrefix` is not assignable to `string | undefined`.
const _castBuilder = undefined as unknown as EndpointBuilder<
  ShareEndpointsBaseQuery,
  (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
  "scratchShareApi"
>;

buildShareEndpoints(_castBuilder, {
  // @ts-expect-error -- pathPrefix must be a string
  pathPrefix: 42,
});

// Negative: an unknown option key is not part of the opts shape.
buildShareEndpoints(_castBuilder, {
  // @ts-expect-error -- `wrong` is not a valid option
  wrong: "key",
});

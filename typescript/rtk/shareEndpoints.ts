/**
 * shareEndpoints.ts
 *
 * Re-exports the content-share endpoints (shareView, shareDesign,
 * handleResourceShare) as an injectable factory so that consumers can mount
 * them on *their own* RTK Query slice with a base URL of their choosing —
 * instead of the baked-in `RTK_CLOUD_ENDPOINT_PREFIX` used by the
 * `cloudApi` slice exported from `./cloud`.
 *
 * This exists so extensions such as Kanvas (layer5labs/meshery-extensions)
 * can route these endpoints through a same-origin extension mount — for
 * example `/api/extensions/api/content/*\/share` — without spinning up a
 * second `createApi` and fighting the reducer/middleware wiring that a
 * parallel slice would require.
 *
 * The endpoint definitions here are kept in lock-step, by construction,
 * with the generated `./cloud.ts` slice: types are imported from there
 * (`ShareViewApiArg`, `ShareDesignApiArg`, `HandleResourceShareApiArg`)
 * and the URL paths match the generated ones. If the OpenAPI spec changes
 * and `npm run build:rtk` regenerates `cloud.ts` with a new URL or body
 * shape for any of the three share endpoints, update this file to match.
 * A `tsc` check on consumers will surface drift via the type re-exports.
 *
 * USAGE
 *
 *   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 *   import {
 *     buildShareEndpoints,
 *     SHARE_ENDPOINT_TAG_TYPES,
 *   } from "@meshery/schemas/shareEndpoints";
 *
 *   const extensionApi = createApi({
 *     reducerPath: "extensionApi",
 *     baseQuery: fetchBaseQuery({ baseUrl: "/api/extensions", credentials: "include" }),
 *     tagTypes: [...SHARE_ENDPOINT_TAG_TYPES],
 *     endpoints: () => ({}),
 *   });
 *
 *   export const sharingApi = extensionApi.injectEndpoints({
 *     endpoints: buildShareEndpoints,
 *   });
 *
 *   export const {
 *     useShareViewMutation,
 *     useShareDesignMutation,
 *     useHandleResourceShareMutation,
 *   } = sharingApi;
 */

import type { EndpointBuilder } from "@reduxjs/toolkit/query";

import type {
  HandleResourceShareApiArg,
  HandleResourceShareApiResponse,
  ShareDesignApiArg,
  ShareDesignApiResponse,
  ShareViewApiArg,
  ShareViewApiResponse,
} from "./cloud";

// Re-export types so callers can keep importing from a single entry point
// (`@meshery/schemas/shareEndpoints`) instead of reaching into `./cloudApi`
// as well.
export type {
  HandleResourceShareApiArg,
  HandleResourceShareApiResponse,
  ShareDesignApiArg,
  ShareDesignApiResponse,
  ShareViewApiArg,
  ShareViewApiResponse,
};

/**
 * Tag types the share endpoints invalidate. Callers should spread these
 * into their `createApi({ tagTypes: [...] })` list so cache invalidation
 * fires on successful share mutations.
 */
export const SHARE_ENDPOINT_TAG_TYPES = ["View_views", "Design_designs"] as const;
export type ShareEndpointTagType = (typeof SHARE_ENDPOINT_TAG_TYPES)[number];

/**
 * Injectable endpoints factory. Pass this directly to
 * `api.injectEndpoints({ endpoints: buildShareEndpoints })`.
 *
 * The consumer's base query determines the base URL the three endpoints
 * are issued against — this is the whole point of the module.
 *
 * The builder is typed against `EndpointBuilder<any, ..., any>` rather than
 * a generic `BaseQuery` because the endpoint bodies only need the `build`
 * helper and do not consult the base query's `ResultType`/`ErrorType`;
 * binding the base query generically prevents TypeScript from proving that
 * `ShareViewApiResponse` (a.k.a. `unknown`) is assignable to the base
 * query's result type for all choices of `BaseQuery`.
 */
export function buildShareEndpoints<ReducerPath extends string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  build: EndpointBuilder<any, ShareEndpointTagType, ReducerPath>,
) {
  return {
    shareView: build.mutation<ShareViewApiResponse, ShareViewApiArg>({
      query: (queryArg) => ({
        url: `/api/content/view/share`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["View_views"],
    }),
    shareDesign: build.mutation<ShareDesignApiResponse, ShareDesignApiArg>({
      query: (queryArg) => ({
        url: `/api/content/design/share`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["Design_designs"],
    }),
    handleResourceShare: build.mutation<
      HandleResourceShareApiResponse,
      HandleResourceShareApiArg
    >({
      query: (queryArg) => ({
        url: `/api/resource/${queryArg.resourceType}/share/${queryArg.resourceId}`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["Design_designs"],
    }),
  };
}


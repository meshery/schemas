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
 *   import type { EndpointBuilder } from "@reduxjs/toolkit/query";
 *   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 *   import {
 *     buildShareEndpoints,
 *     SHARE_ENDPOINT_TAG_TYPES,
 *     type ShareEndpointsBaseQuery,
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
 *     // RTK's `EndpointBuilder<BaseQuery, …>` is **invariant** in `BaseQuery`,
 *     // so a `fetchBaseQuery`-derived builder cannot be assigned directly to
 *     // the wider `ShareEndpointsBaseQuery`-typed parameter. One cast here
 *     // bridges the variance — the runtime object is identical.
 *     endpoints: (build) =>
 *       buildShareEndpoints(
 *         build as unknown as EndpointBuilder<
 *           ShareEndpointsBaseQuery,
 *           (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
 *           "extensionApi"
 *         >,
 *       ),
 *   });
 *
 *   export const {
 *     useShareViewMutation,
 *     useShareDesignMutation,
 *     useHandleResourceShareMutation,
 *   } = sharingApi;
 */

import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  MutationDefinition,
} from "@reduxjs/toolkit/query";

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
 * The base-query shape these endpoints are designed to run against.
 *
 * Every share endpoint's `query()` returns a `{ url, method, body }` object —
 * i.e. a {@link FetchArgs}. Naming the concrete input shape here (rather
 * than leaving the base query fully generic) documents the contract: any
 * slice wrapping `fetchBaseQuery` (directly or via `retry(fetchBaseQuery)`)
 * can mount these endpoints. Slices using a non-fetch transport can't —
 * the URLs wouldn't reach anything.
 */
export type ShareEndpointsBaseQuery = BaseQueryFn<string | FetchArgs>;

/**
 * Return shape of {@link buildShareEndpoints}. Exported so consumers can
 * reference the three fully-parameterised `MutationDefinition`s (e.g. to
 * wrap the factory in their own injection helper) without re-deriving them
 * from the function signature.
 *
 * The `ReducerPath` type parameter is generic so the returned definitions
 * slot cleanly into the consumer slice's selectors (which key on
 * `reducerPath`). `BaseQuery` is fixed to {@link ShareEndpointsBaseQuery}
 * for the reasons documented on that type.
 */
export type ShareEndpointDefinitions<ReducerPath extends string> = {
  shareView: MutationDefinition<
    ShareViewApiArg,
    ShareEndpointsBaseQuery,
    ShareEndpointTagType,
    ShareViewApiResponse,
    ReducerPath
  >;
  shareDesign: MutationDefinition<
    ShareDesignApiArg,
    ShareEndpointsBaseQuery,
    ShareEndpointTagType,
    ShareDesignApiResponse,
    ReducerPath
  >;
  handleResourceShare: MutationDefinition<
    HandleResourceShareApiArg,
    ShareEndpointsBaseQuery,
    ShareEndpointTagType,
    HandleResourceShareApiResponse,
    ReducerPath
  >;
};

/**
 * Injectable endpoints factory. Pass this directly to
 * `api.injectEndpoints({ endpoints: buildShareEndpoints })`.
 *
 * The consumer's base query determines the base URL the three endpoints
 * are issued against — this is the whole point of the module. The factory
 * is parameterised on `ReducerPath` so the returned `MutationDefinition`s
 * are keyed to the consumer slice's reducer path for selector purposes.
 *
 * The concrete response type is supplied as the first generic argument to
 * each `build.mutation<ResultType, QueryArg>()` call so TypeScript does
 * not have to prove `unknown ⊆ BaseQueryResult<BaseQuery>` — RTK's
 * `build.mutation` overload makes the result type covariant at the call
 * site, which is the idiomatic fix for the "unknown not assignable to
 * response" constraint the first pass papered over with `any`.
 */
export function buildShareEndpoints<ReducerPath extends string>(
  build: EndpointBuilder<ShareEndpointsBaseQuery, ShareEndpointTagType, ReducerPath>,
): ShareEndpointDefinitions<ReducerPath> {
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

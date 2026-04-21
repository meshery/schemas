/**
 * shareEndpoints.ts
 *
 * Injectable factory for the content-share endpoints (shareView,
 * shareDesign, handleResourceShare). The factory lets a consumer mount the
 * endpoints on *their own* RTK Query slice, so the consumer — not this
 * package — owns the reducer/middleware wiring, the cache tag namespace,
 * and the base URL.
 *
 * URL routing rule: the emitted URLs are exactly the meshery-cloud paths as
 * published by the schema codegen (e.g. `/api/content/view/share`) and are
 * never wrapped or prefixed by the factory. To change the base URL the
 * requests actually hit, configure the consuming slice's `baseUrl` via the
 * env-var convention established in `typescript/rtk/api.ts`
 * (`RTK_CLOUD_ENDPOINT_PREFIX`, `RTK_MESHERY_ENDPOINT_PREFIX`). Do NOT
 * introduce per-call URL arguments on this factory — the sanctioned
 * hand-written slices (`cloudBaseApi`, `mesheryBaseApi`) take their base
 * URL from deploy-time environment variables, and new slices should follow
 * that same convention.
 *
 * Architectural rule: **Kanvas -> Meshery Server -> Meshery Cloud; never
 * direct.** Any extension consumer (Kanvas, meshery-extensions) must route
 * share traffic through Meshery Server's `/api/extensions` mount, which
 * proxies to meshery-cloud. Meshery Cloud's own UI is same-origin. Both
 * consumers express the routing topology through their slice's `baseUrl`,
 * which is resolved from an env var at schemas build time — not through a
 * per-call argument here.
 *
 * The endpoint definitions here are kept in lock-step, by construction,
 * with the generated `./cloud.ts` slice: types are imported from there
 * (`ShareViewApiArg`, `ShareDesignApiArg`, `HandleResourceShareApiArg`)
 * and the URL paths match the generated ones. If the OpenAPI spec changes
 * and `npm run build:rtk` regenerates `cloud.ts` with a new URL or body
 * shape for any of the three share endpoints, update this file to match.
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
 *   const consumerApi = createApi({
 *     reducerPath: "consumerApi",
 *     // baseUrl is resolved at deploy time via env var, per the
 *     // cloudBaseApi / mesheryBaseApi convention.
 *     baseQuery: fetchBaseQuery({ baseUrl: "", credentials: "include" }),
 *     tagTypes: [...SHARE_ENDPOINT_TAG_TYPES],
 *     endpoints: () => ({}),
 *   });
 *
 *   export const sharingApi = consumerApi.injectEndpoints({
 *     // RTK's `EndpointBuilder<BaseQuery, …>` is **invariant** in `BaseQuery`,
 *     // so a `fetchBaseQuery`-derived builder cannot be assigned directly to
 *     // the wider `ShareEndpointsBaseQuery`-typed parameter. One cast here
 *     // bridges the variance — the runtime object is identical.
 *     endpoints: (build) =>
 *       buildShareEndpoints(
 *         build as unknown as EndpointBuilder<
 *           ShareEndpointsBaseQuery,
 *           (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
 *           "consumerApi"
 *         >,
 *       ),
 *   });
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
 * `api.injectEndpoints({ endpoints: buildShareEndpoints })` (or via a cast
 * if your slice's base query is narrower than `ShareEndpointsBaseQuery`).
 *
 * The emitted URLs are exactly the meshery-cloud paths as published by the
 * schema codegen (`/api/content/view/share`, `/api/content/design/share`,
 * `/api/resource/{resourceType}/share/{resourceId}`). The factory never
 * wraps or prefixes these. Consumers choose the effective base URL via
 * their consuming slice's `baseUrl`, which is a deploy-time env-var choice
 * (`RTK_CLOUD_ENDPOINT_PREFIX` / `RTK_MESHERY_ENDPOINT_PREFIX` — see
 * `typescript/rtk/api.ts`).
 *
 * The factory is parameterised on `ReducerPath` so the returned
 * `MutationDefinition`s are keyed to the consumer slice's reducer path for
 * selector purposes. The concrete response type is supplied as the first
 * generic argument to each `build.mutation<ResultType, QueryArg>()` call so
 * TypeScript does not have to prove `unknown ⊆ BaseQueryResult<BaseQuery>`.
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

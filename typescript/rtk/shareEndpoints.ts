/**
 * shareEndpoints.ts
 *
 * Injectable factory for the content-share endpoints (shareView,
 * shareDesign, handleResourceShare). Consumers mount the endpoints on
 * *their own* RTK Query slice, picking the base URL and — via the optional
 * `pathPrefix` — the URL prefix that fronts the meshery-cloud routes.
 *
 * Architectural rule: **Kanvas -> Meshery Server -> Meshery Cloud; never
 * direct.** Any extension consumer (Kanvas, meshery-extensions) must route
 * share traffic through Meshery Server's `/api/extensions` mount, which
 * proxies to meshery-cloud. Meshery Cloud's own UI is same-origin and calls
 * the routes directly (no prefix). The two modes are expressed here:
 *
 *   - `buildShareEndpoints(build)`                               -> URLs like
 *     `/api/content/view/share` (meshery-cloud's own UI, default).
 *   - `buildShareEndpoints(build, { pathPrefix: "/api/extensions" })` ->
 *     `/api/extensions/api/content/view/share` (extension, via Meshery
 *     Server).
 *
 * The endpoint definitions here are kept in lock-step, by construction,
 * with the generated `./cloud.ts` slice: types are imported from there
 * (`ShareViewApiArg`, `ShareDesignApiArg`, `HandleResourceShareApiArg`)
 * and the URL paths match the generated ones. If the OpenAPI spec changes
 * and `npm run build:rtk` regenerates `cloud.ts` with a new URL or body
 * shape for any of the three share endpoints, update this file to match.
 *
 * USAGE (extension consumer; Kanvas-shaped)
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
 *     baseQuery: fetchBaseQuery({ baseUrl: "", credentials: "include" }),
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
 *         { pathPrefix: "/api/extensions" },
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
 * Normalize a `pathPrefix` option:
 *   - `undefined` or `""` -> `""` (default; URLs emit unchanged).
 *   - A string with one or more trailing slashes -> trailing slashes
 *     stripped, so `"/api/extensions/"` and `"/api/extensions"` produce
 *     the same output.
 *
 * Kept internal on purpose — callers should pass whatever prefix reads best
 * at their call site and trust the factory to canonicalize it.
 */
function normalizePathPrefix(prefix: string | undefined): string {
  if (!prefix) return "";
  return prefix.replace(/\/+$/, "");
}

/**
 * Injectable endpoints factory. Pass this directly to
 * `api.injectEndpoints({ endpoints: buildShareEndpoints })` (or via a cast
 * if your slice's base query is narrower than `ShareEndpointsBaseQuery`).
 *
 * `opts.pathPrefix` is the explicit expression of the deployment topology:
 *
 *   - Omitted (or `""`): URLs stay `/api/content/view/share` etc. This is
 *     the shape meshery-cloud's own same-origin UI uses — the request hits
 *     `HandleShare` in meshery-cloud's own process.
 *   - `"/api/extensions"` (or any other prefix): URLs become
 *     `/api/extensions/api/content/view/share` etc. This is the shape
 *     extensions (Kanvas, meshery-extensions) must use — the request goes
 *     through Meshery Server's extension mount, which proxies to
 *     meshery-cloud. Do NOT bypass Meshery Server by pointing an extension
 *     slice's `baseUrl` directly at meshery-cloud.
 *
 * Trailing slashes in `pathPrefix` are stripped so callers can pass either
 * `"/api/extensions"` or `"/api/extensions/"` interchangeably.
 *
 * The factory is parameterised on `ReducerPath` so the returned
 * `MutationDefinition`s are keyed to the consumer slice's reducer path for
 * selector purposes. The concrete response type is supplied as the first
 * generic argument to each `build.mutation<ResultType, QueryArg>()` call so
 * TypeScript does not have to prove `unknown ⊆ BaseQueryResult<BaseQuery>`.
 */
export function buildShareEndpoints<ReducerPath extends string>(
  build: EndpointBuilder<ShareEndpointsBaseQuery, ShareEndpointTagType, ReducerPath>,
  opts?: { pathPrefix?: string },
): ShareEndpointDefinitions<ReducerPath> {
  const prefix = normalizePathPrefix(opts?.pathPrefix);
  return {
    shareView: build.mutation<ShareViewApiResponse, ShareViewApiArg>({
      query: (queryArg) => ({
        url: `${prefix}/api/content/view/share`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["View_views"],
    }),
    shareDesign: build.mutation<ShareDesignApiResponse, ShareDesignApiArg>({
      query: (queryArg) => ({
        url: `${prefix}/api/content/design/share`,
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
        url: `${prefix}/api/resource/${queryArg.resourceType}/share/${queryArg.resourceId}`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["Design_designs"],
    }),
  };
}

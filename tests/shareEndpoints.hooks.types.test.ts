/**
 * Hooks-level type-test for the injectable share-endpoints module.
 *
 * Unlike `shareEndpoints.types.test.ts` (which uses the non-react
 * `@reduxjs/toolkit/query` entry and asserts `endpoints.X.initiate`), this
 * file mirrors what actual React consumers — Kanvas in particular — do:
 *
 *   1. `createApi` from the `/react` entry so hooks get generated.
 *   2. `injectEndpoints({ endpoints: buildShareEndpoints })`.
 *   3. Reach for the generated `useShareViewMutation` /
 *      `useShareDesignMutation` / `useHandleResourceShareMutation` and
 *      check that the trigger-function arguments and result tuple are
 *      typed against the concrete `…ApiArg` / `…ApiResponse` shapes from
 *      the generated `cloud.ts`, not `any` / `unknown`.
 *
 * This is a type-only test — not executed at runtime. `npm run build` dts
 * emit and the `npx tsc --noEmit` invocation in CI/dev both cover it.
 */

import type { EndpointBuilder } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { expectTypeOf } from "expect-type";

import {
  buildShareEndpoints,
  SHARE_ENDPOINT_TAG_TYPES,
  type HandleResourceShareApiArg,
  type HandleResourceShareApiResponse,
  type ShareDesignApiArg,
  type ShareDesignApiResponse,
  type ShareEndpointsBaseQuery,
  type ShareViewApiArg,
  type ShareViewApiResponse,
} from "../typescript/rtk/shareEndpoints";

// Stand-in for a consumer's top-level slice. The baseUrl is intentionally
// a same-origin extension mount, exactly the shape Kanvas uses to route
// share traffic through its extension proxy rather than meshery-cloud.
const kanvasLikeApi = createApi({
  reducerPath: "kanvasLikeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/extensions",
    credentials: "include",
  }),
  tagTypes: [...SHARE_ENDPOINT_TAG_TYPES],
  endpoints: () => ({}),
});

// RTK variance note: see the shareEndpoints.ts module header. The cast
// bridges `fetchBaseQuery`'s concrete base query and
// `ShareEndpointsBaseQuery`; runtime objects are structurally identical.
export const sharingApi = kanvasLikeApi.injectEndpoints({
  endpoints: (build) =>
    buildShareEndpoints(
      build as unknown as EndpointBuilder<
        ShareEndpointsBaseQuery,
        (typeof SHARE_ENDPOINT_TAG_TYPES)[number],
        "kanvasLikeApi"
      >,
    ),
});

// Hooks exist on the injected slice. Pulling them out here is itself a
// compile-time assertion that `buildShareEndpoints` returns real
// `MutationDefinition`s (not `any`) that RTK Query's react module knows
// how to generate hooks for.
export const {
  useShareViewMutation,
  useShareDesignMutation,
  useHandleResourceShareMutation,
} = sharingApi;

// --- useShareViewMutation ---------------------------------------------------

// The mutation trigger is the first element of the tuple returned by the hook.
type ShareViewTrigger = ReturnType<typeof useShareViewMutation>[0];

// Trigger must accept exactly the ShareViewApiArg shape — not `any`, not
// `unknown`, not a widened union. This is the primary regression this file
// exists to guard.
expectTypeOf<Parameters<ShareViewTrigger>[0]>().toEqualTypeOf<ShareViewApiArg>();

// The fulfilled `.unwrap()` payload must flow through from
// `ShareViewApiResponse`. Checking through `.unwrap()` is the consumer-facing
// contract — a successfully awaited mutation yields the response type.
type ShareViewUnwrapped = Awaited<
  ReturnType<ReturnType<ShareViewTrigger>["unwrap"]>
>;
expectTypeOf<ShareViewUnwrapped>().toEqualTypeOf<ShareViewApiResponse>();

// --- useShareDesignMutation -------------------------------------------------

type ShareDesignTrigger = ReturnType<typeof useShareDesignMutation>[0];

expectTypeOf<Parameters<ShareDesignTrigger>[0]>().toEqualTypeOf<ShareDesignApiArg>();
type ShareDesignUnwrapped = Awaited<
  ReturnType<ReturnType<ShareDesignTrigger>["unwrap"]>
>;
expectTypeOf<ShareDesignUnwrapped>().toEqualTypeOf<ShareDesignApiResponse>();

// --- useHandleResourceShareMutation -----------------------------------------

type HandleResourceShareTrigger = ReturnType<typeof useHandleResourceShareMutation>[0];

expectTypeOf<
  Parameters<HandleResourceShareTrigger>[0]
>().toEqualTypeOf<HandleResourceShareApiArg>();
type HandleResourceShareUnwrapped = Awaited<
  ReturnType<ReturnType<HandleResourceShareTrigger>["unwrap"]>
>;
expectTypeOf<HandleResourceShareUnwrapped>().toEqualTypeOf<HandleResourceShareApiResponse>();

// --- Negative assertions: regressions we never want to see again ------------

// If `buildShareEndpoints` ever leaks `any` back onto the hook surface (the
// thing the first pass did), a `.toEqualTypeOf<X>()` above would silently
// pass against `any` and we'd never notice. The `.not.toBeAny()` assertions
// catch exactly that regression.
expectTypeOf<Parameters<ShareViewTrigger>[0]>().not.toBeAny();
expectTypeOf<Parameters<ShareDesignTrigger>[0]>().not.toBeAny();
expectTypeOf<Parameters<HandleResourceShareTrigger>[0]>().not.toBeAny();

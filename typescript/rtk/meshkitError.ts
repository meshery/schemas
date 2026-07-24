import type { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

/**
 * Pure MeshKit error-envelope handling, deliberately isolated from the
 * React-coupled RTK Query runtime in {@link ./api}.
 *
 * `./api` value-imports `createApi`/`fetchBaseQuery` from
 * `@reduxjs/toolkit/query/react`, whose entry point transitively requires
 * `react-redux` (and `react`) — peer dependencies that are present in a
 * consuming UI but not installed in this schema repo's test/CI environment.
 * Keeping this module's only RTK dependency an `import type` (fully erased at
 * runtime) lets {@link withMeshkitErrorTransform} be exercised under Node's
 * native TypeScript test runner without pulling in that runtime graph. `./api`
 * re-exports this surface so package consumers see no change.
 */

/**
 * Structured MeshKit error metadata extracted from a non-2xx JSON response body.
 *
 * Field names are JS-side camelCase, matching the server's camelCase wire
 * fields one-to-one. Pairs with the meshery server migration that promotes
 * every non-2xx response from `text/plain` to `application/json` with a MeshKit
 * error envelope.
 */
export interface MeshkitError {
  /** Human-readable short description (`error` on the wire). */
  message: string;
  /** Structured error code, e.g. `meshery-server-1033`. */
  code?: string;
  /** Severity level, e.g. `ERROR`, `WARNING`, `FATAL`. */
  severity?: string;
  /** Probable causes that produced the error (`probableCause` on the wire). */
  probableCause?: string[];
  /** Suggested remediations to recover (`suggestedRemediation` on the wire). */
  suggestedRemediation?: string[];
  /** Long-form description lines (`longDescription` on the wire). */
  longDescription?: string[];
}

/**
 * Extension of {@link FetchBaseQueryError} that carries optional MeshKit
 * metadata on `meshkit`. The raw response body is still available on `data`
 * for backward compatibility — `meshkit` is undefined when the response was
 * not a MeshKit JSON envelope.
 *
 * Defined as an intersection rather than an `interface ... extends` because
 * `FetchBaseQueryError` is a discriminated union (HTTP status / FETCH_ERROR /
 * PARSING_ERROR / TIMEOUT_ERROR / CUSTOM_ERROR), and TypeScript only allows
 * extending object types with statically known members.
 */
export type MeshkitFetchBaseQueryError = FetchBaseQueryError & {
  meshkit?: MeshkitError;
};

/**
 * Wire-shape of a MeshKit error JSON body.
 *
 * Meshery Server emits this envelope in camelCase (see
 * `server/models/httputil/httputil.go` in meshery/meshery, and the camelCase
 * wire contract in `docs/identifier-naming-contributor-guide.md`). The
 * snake_case variants are retained only as an optional transitional fallback in
 * case any deployed producer still emits the legacy spelling; camelCase takes
 * precedence when reading (see {@link withMeshkitErrorTransform}).
 */
interface MeshkitErrorBody {
  error: string;
  code?: string;
  severity?: string;
  probableCause?: string[];
  suggestedRemediation?: string[];
  longDescription?: string[];
  /** @deprecated legacy snake_case fallback; camelCase is the contract. */
  probable_cause?: string[];
  /** @deprecated legacy snake_case fallback; camelCase is the contract. */
  suggested_remediation?: string[];
  /** @deprecated legacy snake_case fallback; camelCase is the contract. */
  long_description?: string[];
}

/**
 * Wraps a {@link BaseQueryFn} so non-2xx responses carrying a MeshKit JSON
 * envelope have their structured fields surfaced onto `error.meshkit`.
 *
 * The error type widens from {@link FetchBaseQueryError} to
 * {@link MeshkitFetchBaseQueryError} — that propagates through `createApi`'s
 * type inference into endpoint hooks so consumers read `error?.meshkit.*`
 * with full IntelliSense. Non-MeshKit error bodies pass through untouched
 * (just typed under the wider error type with `meshkit` left undefined).
 *
 * The structured array fields are read in camelCase (the server's actual wire
 * form), falling back to the legacy snake_case spelling only if a deployed
 * producer still emits it. camelCase always wins when both are present.
 *
 * Exported for regression testing - the failure mode is invisible (optional
 * fields silently resolve to `undefined` when the casing is wrong).
 */
export function withMeshkitErrorTransform<Args, Result, DefinitionExtraOptions, Meta>(
  inner: BaseQueryFn<Args, Result, FetchBaseQueryError, DefinitionExtraOptions, Meta>,
): BaseQueryFn<Args, Result, MeshkitFetchBaseQueryError, DefinitionExtraOptions, Meta> {
  return async (args, api, extraOptions) => {
    const result = await inner(args, api, extraOptions);
    if (result.error) {
      const errData = result.error.data;
      if (typeof errData === "object" && errData !== null) {
        const body = errData as Partial<MeshkitErrorBody>;
        if (typeof body.error === "string") {
          const errorWithMeshkit: MeshkitFetchBaseQueryError = {
            ...result.error,
            meshkit: {
              message: body.error,
              code: body.code,
              severity: body.severity,
              probableCause: body.probableCause ?? body.probable_cause,
              suggestedRemediation: body.suggestedRemediation ?? body.suggested_remediation,
              longDescription: body.longDescription ?? body.long_description,
            },
          };
          return { error: errorWithMeshkit, meta: result.meta };
        }
      }
      // Non-MeshKit error body — widen the error type without adding `meshkit`.
      return { error: result.error as MeshkitFetchBaseQueryError, meta: result.meta };
    }
    // Success case — `data` is set, `error` is undefined.
    return { data: result.data as Result, meta: result.meta };
  };
}

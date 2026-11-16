/**
 * The `X-Current-Orgid` header the Cloud base query sends, kept apart from
 * {@link ./api} for the same reason as `./meshkitError`: `./api` value-imports
 * the React-coupled RTK runtime, and this logic must run under Node's native
 * TypeScript test runner.
 */

export const CURRENT_ORG_KEY = "X-Current-Orgid";

/** The slice of the consuming app's store this header reads. */
export interface CurrentOrgState {
  organization?: {
    value: {
      id?: string;
    } | null;
  };
}

/**
 * `prepareHeaders` for the Cloud base query. An endpoint that declares
 * `X-Current-Orgid` (for example `deregisterDesktopConnection`, which takes
 * `all`) keeps the value its caller passed. Only a request that does not set
 * the header gets the organization selected in the store.
 *
 * `fetchBaseQuery` applies an endpoint's own headers, dropping any whose value
 * is `undefined`, before it calls `prepareHeaders`, so an endpoint called
 * without the argument still falls back to the selected organization.
 */
export function prepareCloudHeaders(
  headers: Headers,
  { getState }: { getState: () => unknown },
): Headers {
  if (headers.has(CURRENT_ORG_KEY)) {
    return headers;
  }
  const orgId = (getState() as CurrentOrgState).organization?.value?.id;
  if (orgId) {
    headers.set(CURRENT_ORG_KEY, orgId);
  }
  return headers;
}

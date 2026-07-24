import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { withMeshkitErrorTransform } from "./meshkitError";

// The MeshKit error surface lives in ./meshkitError so it can be unit-tested
// without loading the React-coupled RTK runtime this module pulls in (see the
// module doc there). Re-exported here so `@meshery/schemas/api` consumers keep
// importing these from the same place; tsup inlines them into the `api` bundle.
export {
  withMeshkitErrorTransform,
  type MeshkitError,
  type MeshkitFetchBaseQueryError,
} from "./meshkitError";

// RootState interface for proper typing
interface RootState {
  organization: {
    value: {
      id?: string;
    } | null;
  };
}

export const SUPPORTED_SOCIAL_ACCOUNTS = ["github", "google"];

export const CURRENT_ORG_KEY = "X-Current-Orgid";
export const DEFAULT_DESIGN_VERSION = "0.0.1";
export const MESHERY_PROD_URL = "https://playground.meshery.io/";

// Environment variable defaults
const CLOUD_BASE_URL = process.env.RTK_CLOUD_ENDPOINT_PREFIX ?? "";
const MESHERY_BASE_URL = process.env.RTK_MESHERY_ENDPOINT_PREFIX ?? "";

const baseQueryCloud = fetchBaseQuery({
  baseUrl: CLOUD_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers: Headers, { getState }: { getState: () => unknown }) => {
    const state = getState() as RootState;
    const currentOrg = state.organization?.value;
    const orgId = currentOrg?.id;
    if (orgId) {
      headers.set(CURRENT_ORG_KEY, orgId);
    }
    return headers;
  }
});

// Wrap with MeshKit error transform so endpoint consumers can read
// error?.meshkit.suggestedRemediation etc.
const baseQueryCloudWithMeshkit = withMeshkitErrorTransform(baseQueryCloud);
const baseQueryMesheryWithMeshkit = withMeshkitErrorTransform(
  fetchBaseQuery({ baseUrl: MESHERY_BASE_URL, credentials: "include" }),
);

// API 1: Cloud Provider API
export const cloudBaseApi = createApi({
  reducerPath: "cloudRtkSchemasApi",
  baseQuery: baseQueryCloudWithMeshkit,
  tagTypes: [],
  endpoints: () => ({}),
});

// API 2: Meshery API
export const mesheryBaseApi = createApi({
  reducerPath: "mesheryRtkSchemasApi",
  baseQuery: baseQueryMesheryWithMeshkit,
  tagTypes: [],
  endpoints: () => ({}),
});

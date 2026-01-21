import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

// RootState interface for proper typing
interface RootState {
  organization: {
    value: {
      id?: string;
    } | null;
  };
}

export const SUPPORTED_SOCIAL_ACCOUNTS = ["github", "google"];

export const CURRENT_ORG_KEY = "Layer5-Current-Orgid";
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

// API 1: Cloud Provider API
export const cloudBaseApi = createApi({
  reducerPath: "cloudRtkSchemasApi",
  baseQuery: baseQueryCloud as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  tagTypes: [],
  endpoints: () => ({}),
});

// API 2: Meshery API
export const mesheryBaseApi = createApi({
  reducerPath: "mesheryRtkSchemasApi",
  baseQuery: fetchBaseQuery({ baseUrl: MESHERY_BASE_URL, credentials: "include" }),
  tagTypes: [],
  endpoints: () => ({}),
});

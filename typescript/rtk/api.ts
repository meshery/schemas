import { createApi, fetchBaseQuery,
  BaseQueryFn,} from "@reduxjs/toolkit/query/react";

declare global {
  interface Window {
    CLOUD_PROVIDER_BASE_URL: string;
    MESHERY_BASE_URL: string;
  }
}

export const SUPPORTED_SOCIAL_ACCOUNTS = ["github", "google"];

export const CURRENT_ORG_KEY = "Layer5-Current-Orgid";
export const DEFAULT_DESIGN_VERSION = "0.0.1";
export const MESHERY_PROD_URL = "https://playground.meshery.io/";


const baseQueryCloud :BaseQueryFn = fetchBaseQuery({
  baseUrl: process.env.RTK_CLOUD_ENDPOINT_PREFIX,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as unknown as any
    const currentOrg = state.organization.value
    headers.set(CURRENT_ORG_KEY, currentOrg?.id);
    return headers;
  }
});


// Wrap with enhanced error handling
const baseQueryWithLogging = async (args:any, api:any, extraOptions:any) => {
  const result = await baseQueryCloud(args, api, extraOptions);
  return result;
};

// API 1: Cloud Provider API
export const cloudBaseApi = createApi({
  // reducerPath: "cloudRtkSchemasApi",
  baseQuery: baseQueryWithLogging,
  tagTypes:[],
  endpoints: (build) => ({
    
  }), // Required
});

// export const {useGetPlansQuery} = cloudBaseApi

// API 2: Meshery API
export const mesheryBaseApi = createApi({
  reducerPath: "mesheryRtkSchemasApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.RTK_MESHERY_ENDPOINT_PREFIX,credentials:"include" }),
  endpoints: () => ({}), // Required
});

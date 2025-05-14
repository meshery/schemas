import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

declare global {
  interface Window {
    CLOUD_PROVIDER_BASE_URL: string;
    MESHERY_BASE_URL: string;
  }
}

// API 1: Cloud Provider API
export const cloudBaseApi = createApi({
  reducerPath: "cloudApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.CLOUD_PROVIDER_BASE_URL }),
  endpoints: () => ({}), // Required
});

// API 2: Meshery API
export const mesheryBaseApi = createApi({
  reducerPath: "mesheryApi",
  baseQuery: fetchBaseQuery({ baseUrl: window.MESHERY_BASE_URL }),
  endpoints: () => ({}), // Required
});

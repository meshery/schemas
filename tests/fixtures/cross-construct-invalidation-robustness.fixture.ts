// Robustness fixture for addCrossConstructInvalidation: deliberately varies the
// formatting the naive string match assumed, to prove the post-processing is
// resilient to it.
//   - addConnectionToEnvironment: extra spaces around the `:` after the op name
//   - removeConnectionFromEnvironment: single-quoted tags (quote-style detection)
//   - deleteConnection: an existing tag that CONTAINS "Environment_environments"
//       as a substring but is not it (precise per-tag membership must not
//       false-positive and skip the injection)
//   - deleteMesheryConnection: ordinary formatting
export const injectedRtkApi = {
  endpoints: (build) => ({
    getEnvironmentConnections: build.query<
      GetEnvironmentConnectionsApiResponse,
      GetEnvironmentConnectionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/environments/${queryArg.environmentId}/connections`,
      }),
      providesTags: ["Environment_environments"],
    }),
    addConnectionToEnvironment   :   build.mutation<
      AddConnectionToEnvironmentApiResponse,
      AddConnectionToEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/environments/${queryArg.environmentId}/connections/${queryArg.connectionId}`,
        method: "POST",
      }),
      invalidatesTags: ["Connection_API_Connections"],
    }),
    removeConnectionFromEnvironment: build.mutation<
      RemoveConnectionFromEnvironmentApiResponse,
      RemoveConnectionFromEnvironmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/environments/${queryArg.environmentId}/connections/${queryArg.connectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Connection_API_Connections'],
    }),
    deleteConnection: build.mutation<DeleteConnectionApiResponse, DeleteConnectionApiArg>({
      query: (queryArg) => ({
        url: `/api/integrations/connections/${queryArg.connectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Connection_API_Connections", "Environment_environmentsLegacy"],
    }),
    deleteMesheryConnection: build.mutation<
      DeleteMesheryConnectionApiResponse,
      DeleteMesheryConnectionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/integrations/connections/meshery/${queryArg.mesheryServerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Connection_API_Connections"],
    }),
  }),
};

export type GetEnvironmentConnectionsApiResponse = unknown;
export type GetEnvironmentConnectionsApiArg = { environmentId: string };
export type AddConnectionToEnvironmentApiResponse = unknown;
export type AddConnectionToEnvironmentApiArg = { environmentId: string; connectionId: string };
export type RemoveConnectionFromEnvironmentApiResponse = unknown;
export type RemoveConnectionFromEnvironmentApiArg = { environmentId: string; connectionId: string };
export type DeleteConnectionApiResponse = unknown;
export type DeleteConnectionApiArg = { connectionId: string };
export type DeleteMesheryConnectionApiResponse = unknown;
export type DeleteMesheryConnectionApiArg = { mesheryServerId: string };

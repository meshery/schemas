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
    addConnectionToEnvironment: build.mutation<
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
      invalidatesTags: ["Connection_API_Connections"],
    }),
    deleteConnection: build.mutation<DeleteConnectionApiResponse, DeleteConnectionApiArg>({
      query: (queryArg) => ({
        url: `/api/integrations/connections/${queryArg.connectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Connection_API_Connections"],
    }),
    performConnectionAction: build.mutation<
      PerformConnectionActionApiResponse,
      PerformConnectionActionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/integrations/connections/${queryArg.connectionId}/actions`,
        method: "POST",
        body: queryArg.body,
      }),
      invalidatesTags: ["Connection_API_Connections"],
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
export type PerformConnectionActionApiResponse = unknown;
export type PerformConnectionActionApiArg = { connectionId: string; body: unknown };
export type DeleteMesheryConnectionApiResponse = unknown;
export type DeleteMesheryConnectionApiArg = { mesheryServerId: string };

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
    // Simulates an upstream operationId rename: `deleteMesheryConnection` is
    // the fourth target addCrossConstructInvalidation looks for, and it must
    // not be present anywhere in this fixture.
    removeMesheryServerConnection: build.mutation<
      RemoveMesheryServerConnectionApiResponse,
      RemoveMesheryServerConnectionApiArg
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
export type RemoveMesheryServerConnectionApiResponse = unknown;
export type RemoveMesheryServerConnectionApiArg = { mesheryServerId: string };

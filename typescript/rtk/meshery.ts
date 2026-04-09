import { mesheryBaseApi as api } from "./api";
export const addTagTypes = [
  "Environment_environments",
  "Evaluation_Evaluation",
  "Key_users",
  "Model_Models",
  "Organization_Organizations",
  "Team_teams",
  "User_users",
  "Connection_API_Connections",
  "Design_designs",
  "Events_events",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createEnvironment: build.mutation<CreateEnvironmentApiResponse, CreateEnvironmentApiArg>({
        query: (queryArg) => ({ url: `/api/environments`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Environment_environments"],
      }),
      getEnvironments: build.query<GetEnvironmentsApiResponse, GetEnvironmentsApiArg>({
        query: (queryArg) => ({
          url: `/api/environments`,
          params: {
            search: queryArg.search,
            order: queryArg.order,
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            orgId: queryArg.orgId,
          },
        }),
        providesTags: ["Environment_environments"],
      }),
      getEnvironmentById: build.query<GetEnvironmentByIdApiResponse, GetEnvironmentByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/environments/${queryArg.environmentId}`,
          params: {
            orgId: queryArg.orgId,
          },
        }),
        providesTags: ["Environment_environments"],
      }),
      updateEnvironment: build.mutation<UpdateEnvironmentApiResponse, UpdateEnvironmentApiArg>({
        query: (queryArg) => ({
          url: `/api/environments/${queryArg.environmentId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Environment_environments"],
      }),
      deleteEnvironment: build.mutation<DeleteEnvironmentApiResponse, DeleteEnvironmentApiArg>({
        query: (queryArg) => ({ url: `/api/environments/${queryArg.environmentId}`, method: "DELETE" }),
        invalidatesTags: ["Environment_environments"],
      }),
      getEnvironmentConnections: build.query<GetEnvironmentConnectionsApiResponse, GetEnvironmentConnectionsApiArg>({
        query: (queryArg) => ({
          url: `/api/environments/${queryArg.environmentId}/connections`,
          params: {
            search: queryArg.search,
            order: queryArg.order,
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            filter: queryArg.filter,
          },
        }),
        providesTags: ["Environment_environments"],
      }),
      postEvaluate: build.mutation<PostEvaluateApiResponse, PostEvaluateApiArg>({
        query: (queryArg) => ({ url: `/evaluate`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Evaluation_Evaluation"],
      }),
      getUserKeys: build.query<GetUserKeysApiResponse, GetUserKeysApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/users/keys`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
          },
        }),
        providesTags: ["Key_users"],
      }),
      registerMeshmodels: build.mutation<RegisterMeshmodelsApiResponse, RegisterMeshmodelsApiArg>({
        query: (queryArg) => ({ url: `/api/meshmodels/register`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Model_Models"],
      }),
      getOrgs: build.query<GetOrgsApiResponse, GetOrgsApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
            all: queryArg.all,
          },
        }),
        providesTags: ["Organization_Organizations"],
      }),
      createOrg: build.mutation<CreateOrgApiResponse, CreateOrgApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      getOrgByDomain: build.query<GetOrgByDomainApiResponse, GetOrgByDomainApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/by-domain`,
          params: {
            domain: queryArg.domain,
          },
        }),
        providesTags: ["Organization_Organizations"],
      }),
      getOrg: build.query<GetOrgApiResponse, GetOrgApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}` }),
        providesTags: ["Organization_Organizations"],
      }),
      deleteOrg: build.mutation<DeleteOrgApiResponse, DeleteOrgApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}`, method: "DELETE" }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      handleUpdateOrg: build.mutation<HandleUpdateOrgApiResponse, HandleUpdateOrgApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      getOrgPreferences: build.query<GetOrgPreferencesApiResponse, GetOrgPreferencesApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}/preferences` }),
        providesTags: ["Organization_Organizations"],
      }),
      addTeamToOrg: build.mutation<AddTeamToOrgApiResponse, AddTeamToOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      getTeamById: build.query<GetTeamByIdApiResponse, GetTeamByIdApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}` }),
        providesTags: ["Team_teams"],
      }),
      updateTeam: build.mutation<UpdateTeamApiResponse, UpdateTeamApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Team_teams"],
      }),
      deleteTeam: build.mutation<DeleteTeamApiResponse, DeleteTeamApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Team_teams"],
      }),
      removeTeamFromOrg: build.mutation<RemoveTeamFromOrgApiResponse, RemoveTeamFromOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}/remove`,
          method: "POST",
        }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      addUserToOrg: build.mutation<AddUserToOrgApiResponse, AddUserToOrgApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}/users/${queryArg.userId}`, method: "POST" }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      deleteUserFromOrg: build.mutation<DeleteUserFromOrgApiResponse, DeleteUserFromOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/users/${queryArg.userId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Organization_Organizations"],
      }),
      getTeams: build.query<GetTeamsApiResponse, GetTeamsApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams`,
          params: {
            search: queryArg.search,
            order: queryArg.order,
            page: queryArg.page,
            pagesize: queryArg.pagesize,
          },
        }),
        providesTags: ["Team_teams"],
      }),
      createTeam: build.mutation<CreateTeamApiResponse, CreateTeamApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Team_teams"],
      }),
      getTeamUsers: build.query<GetTeamUsersApiResponse, GetTeamUsersApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/teams/${queryArg.teamId}/users`,
          params: {
            search: queryArg.search,
            order: queryArg.order,
            page: queryArg.page,
            pagesize: queryArg.pagesize,
          },
        }),
        providesTags: ["Team_teams"],
      }),
      addUserToTeam: build.mutation<AddUserToTeamApiResponse, AddUserToTeamApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}/users/${queryArg.userId}`,
          method: "POST",
        }),
        invalidatesTags: ["Team_teams"],
      }),
      removeUserFromTeam: build.mutation<RemoveUserFromTeamApiResponse, RemoveUserFromTeamApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}/users/${queryArg.userId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Team_teams"],
      }),
      listUsersNotInTeam: build.query<ListUsersNotInTeamApiResponse, ListUsersNotInTeamApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}/users`,
          params: {
            search: queryArg.search,
            order: queryArg.order,
            page: queryArg.page,
            pagesize: queryArg.pagesize,
          },
        }),
        providesTags: ["Team_teams"],
      }),
      getUsersForOrg: build.query<GetUsersForOrgApiResponse, GetUsersForOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/users`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
            filter: queryArg.filter,
            teamId: queryArg.teamId,
          },
        }),
        providesTags: ["User_users"],
      }),
      getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
        query: (queryArg) => ({
          url: `/api/users`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
            filter: queryArg.filter,
          },
        }),
        providesTags: ["User_users"],
      }),
      getUserProfileById: build.query<GetUserProfileByIdApiResponse, GetUserProfileByIdApiArg>({
        query: (queryArg) => ({ url: `/api/identity/users/profile/${queryArg.id}` }),
        providesTags: ["User_users"],
      }),
      getUser: build.query<GetUserApiResponse, GetUserApiArg>({
        query: () => ({ url: `/api/identity/users/profile` }),
        providesTags: ["User_users"],
      }),
      getConnections: build.query<GetConnectionsApiResponse, GetConnectionsApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/connections`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
            filter: queryArg.filter,
            kind: queryArg.kind,
            status: queryArg.status,
            type: queryArg["type"],
            name: queryArg.name,
          },
        }),
        providesTags: ["Connection_API_Connections"],
      }),
      registerConnection: build.mutation<RegisterConnectionApiResponse, RegisterConnectionApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/connections`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Connection_API_Connections"],
      }),
      getConnectionById: build.query<GetConnectionByIdApiResponse, GetConnectionByIdApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/connections/${queryArg.connectionId}` }),
        providesTags: ["Connection_API_Connections"],
      }),
      updateConnection: build.mutation<UpdateConnectionApiResponse, UpdateConnectionApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/connections/${queryArg.connectionId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Connection_API_Connections"],
      }),
      deleteConnection: build.mutation<DeleteConnectionApiResponse, DeleteConnectionApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/connections/${queryArg.connectionId}`, method: "DELETE" }),
        invalidatesTags: ["Connection_API_Connections"],
      }),
      deleteMesheryConnection: build.mutation<DeleteMesheryConnectionApiResponse, DeleteMesheryConnectionApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/connections/meshery/${queryArg.mesheryServerId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Connection_API_Connections"],
      }),
      getKubernetesContext: build.query<GetKubernetesContextApiResponse, GetKubernetesContextApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/connections/kubernetes/${queryArg.connectionId}/context` }),
        providesTags: ["Connection_API_Connections"],
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
      importDesign: build.mutation<ImportDesignApiResponse, ImportDesignApiArg>({
        query: (queryArg) => ({ url: `/api/pattern/import`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      deleteEventsById: build.mutation<DeleteEventsByIdApiResponse, DeleteEventsByIdApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Events_events"],
      }),
      postEvents: build.mutation<PostEventsApiResponse, PostEventsApiArg>({
        query: (queryArg) => ({ url: `/events`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      postEventsDelete: build.mutation<PostEventsDeleteApiResponse, PostEventsDeleteApiArg>({
        query: (queryArg) => ({ url: `/events/delete`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      putEventsStatus: build.mutation<PutEventsStatusApiResponse, PutEventsStatusApiArg>({
        query: (queryArg) => ({ url: `/events/status`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      putEventsByIdStatus: build.mutation<PutEventsByIdStatusApiResponse, PutEventsByIdStatusApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.id}/status`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as mesheryApi, injectedRtkApi };
export type CreateEnvironmentApiResponse = /** status 201 Created environment */ {
  /** ID */
  id: string;
  /** Specifies the version of the schema to which the environment conforms. */
  schemaVersion: string;
  /** Environment name */
  name: string;
  /** Environment description */
  description: string;
  /** Environment organization ID */
  organization_id: string;
  /** Environment owner */
  owner?: string;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Additional metadata associated with the environment. */
  metadata?: object;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
  /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
  deleted_at?: string | null;
};
export type CreateEnvironmentApiArg = {
  /** Body for creating environment */
  body: {
    /** An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation. */
    name: string;
    /** An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments). */
    description?: string;
    /** Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation. */
    organization_id: string;
  };
};
export type GetEnvironmentsApiResponse = /** status 200 Environments */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  /** Environments associated with this resource. */
  environments?: {
    /** ID */
    id: string;
    /** Specifies the version of the schema to which the environment conforms. */
    schemaVersion: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deleted_at?: string | null;
  }[];
};
export type GetEnvironmentsApiArg = {
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** User's organization ID */
  orgId: string;
};
export type GetEnvironmentByIdApiResponse = /** status 200 Environment page */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  /** Environments associated with this resource. */
  environments?: {
    /** ID */
    id: string;
    /** Specifies the version of the schema to which the environment conforms. */
    schemaVersion: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deleted_at?: string | null;
  }[];
};
export type GetEnvironmentByIdApiArg = {
  /** Environment ID */
  environmentId: string;
  /** User's organization ID */
  orgId: string;
};
export type UpdateEnvironmentApiResponse = /** status 200 Environment page */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  /** Environments associated with this resource. */
  environments?: {
    /** ID */
    id: string;
    /** Specifies the version of the schema to which the environment conforms. */
    schemaVersion: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deleted_at?: string | null;
  }[];
};
export type UpdateEnvironmentApiArg = {
  /** Environment ID */
  environmentId: string;
  /** Body for creating environment */
  body: {
    /** An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation. */
    name: string;
    /** An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments). */
    description?: string;
    /** Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation. */
    organization_id: string;
  };
};
export type DeleteEnvironmentApiResponse = unknown;
export type DeleteEnvironmentApiArg = {
  /** Environment ID */
  environmentId: string;
};
export type GetEnvironmentConnectionsApiResponse = /** status 200 Environment connections */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The connections of the environmentconnectionspage. */
  connections?: {
    [key: string]: any;
  }[];
};
export type GetEnvironmentConnectionsApiArg = {
  /** Environment ID */
  environmentId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  filter?: string;
};
export type PostEvaluateApiResponse = /** status 200 Successful evaluation */ {
  /** Specifies the version of the schema to which the evaluation response conforms. */
  schemaVersion: string;
  /** The final evaluated design, including all updated components and relationships. This can be either the complete updated design or only a diff of changes. The version of the design will be automatically incremented if any modifications are made during the evaluation process. This field provides a comprehensive view of the design state after all relationship evaluations and policy applications have been completed. */
  design: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Name of the design; a descriptive, but concise title for the design document. */
    name: string;
    /** Specifies the version of the schema to which the design conforms. */
    schemaVersion: string;
    /** Revision of the design as expressed by an auto-incremented, SemVer-compliant version number. May be manually set by a user or third-party system, but will always be required to be of version number higher than the previously defined version number. */
    version: string;
    metadata?: {
      /** Map of resolved aliases present in the design */
      resolvedAliases?: {
        [key: string]: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          relationship_id: string;
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          alias_component_id: string;
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          immediate_parent_id: string;
          immediate_ref_field_path: string[];
        } & {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          resolved_parent_id: string;
          resolved_ref_field_path: string[];
        };
      };
      [key: string]: any;
    };
    /** A list of one or more component declarations. */
    components: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Specifies the version of the schema to which the component definition conforms. */
      schemaVersion: string;
      /** Version of the component definition. */
      version: string;
      /** Name of the component in human-readible format. */
      displayName: string;
      /** A written representation of the purpose and characteristics of the component. */
      description: string;
      /** Format specifies the format used in the `component.schema` field. JSON is the default. */
      format: "JSON" | "CUE";
      /** Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
      model: {
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        id: string;
        /** Specifies the version of the schema used for the definition. */
        schemaVersion: string;
        /** Version of the model definition. */
        version: string;
        /** The unique name for the model within the scope of a registrant. */
        name: string;
        /** Human-readable name for the model. */
        displayName: string;
        /** Description of the model. */
        description: string;
        /** Status of model, including:
                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                - maintenance: model is unavailable for a period of time.
                - enabled: model is available for use for all users of this Meshery Server.
                - ignored: model is unavailable for use for all users of this Meshery Server. */
        status: "ignored" | "enabled" | "duplicate";
        /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
        registrant: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          id: string;
          /** Connection Name */
          name: string;
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          credentialId?: string;
          /** Connection Type (platform, telemetry, collaboration) */
          type: string;
          /** Connection Subtype (cloud, identity, metrics, chat, git, orchestration) */
          subType: string;
          /** Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github) */
          kind: string;
          /** Additional connection metadata */
          metadata?: object;
          /** Connection Status */
          status:
            | "discovered"
            | "registered"
            | "connected"
            | "ignored"
            | "maintenance"
            | "disconnected"
            | "deleted"
            | "not found";
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          /** SQL null Timestamp to handle null values of time. */
          deleted_at?: string;
          /** Associated environments for this connection */
          environments?: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id: string;
            /** Specifies the version of the schema to which the environment conforms. */
            schemaVersion: string;
            /** Environment name */
            name: string;
            /** Environment description */
            description: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            organization_id: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            owner?: string;
            /** Timestamp when the resource was created. */
            created_at?: string;
            /** Additional metadata associated with the environment. */
            metadata?: object;
            /** Timestamp when the resource was updated. */
            updated_at?: string;
            /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
            deleted_at?: string | null;
          }[];
          /** Specifies the version of the schema used for the definition. */
          schemaVersion: string;
        };
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        registrantId: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        categoryId: string;
        /** Category of the model. */
        category: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          id: string;
          /** The category of the model that determines the main grouping. */
          name:
            | "Analytics"
            | "App Definition and Development"
            | "Cloud Native Network"
            | "Cloud Native Storage"
            | "Database"
            | "Machine Learning"
            | "Observability and Analysis"
            | "Orchestration & Management"
            | "Platform"
            | "Provisioning"
            | "Runtime"
            | "Security & Compliance"
            | "Serverless"
            | "Tools"
            | "Uncategorized";
          /** Additional metadata associated with the category. */
          metadata: object;
        };
        /** Sub category of the model determines the secondary grouping. */
        subCategory:
          | "API Gateway"
          | "API Integration"
          | "Application Definition & Image Build"
          | "Automation & Configuration"
          | "Certified Kubernetes - Distribution"
          | "Chaos Engineering"
          | "Cloud Native Storage"
          | "Cloud Provider"
          | "CNI"
          | "Compute"
          | "Container Registry"
          | "Container Runtime"
          | "Container Security"
          | "Container"
          | "Content Delivery Network"
          | "Continuous Integration & Delivery"
          | "Coordination & Service Discovery"
          | "Database"
          | "Flowchart"
          | "Framework"
          | "Installable Platform"
          | "Key Management"
          | "Key Management Service"
          | "Kubernetes"
          | "Logging"
          | "Machine Learning"
          | "Management Governance"
          | "Metrics"
          | "Monitoring"
          | "Networking Content Delivery"
          | "Operating System"
          | "Query"
          | "Remote Procedure Call"
          | "Scheduling & Orchestration"
          | "Secrets Management"
          | "Security Identity & Compliance"
          | "Service Mesh"
          | "Service Proxy"
          | "Source Version Control"
          | "Storage"
          | "Specifications"
          | "Streaming & Messaging"
          | "Tools"
          | "Tracing"
          | "Uncategorized"
          | "Video Conferencing";
        /** Metadata containing additional information associated with the model. */
        metadata?: {
          /** Capabilities associated with the model */
          capabilities?: {
            /** Specifies the version of the schema to which the capability definition conforms. */
            schemaVersion: string;
            /** Version of the capability definition. */
            version: string;
            /** Name of the capability in human-readible format. */
            displayName: string;
            /** A written representation of the purpose and characteristics of the capability. */
            description: string;
            /** Top-level categorization of the capability */
            kind: "action" | "mutate" | "view" | "interaction";
            /** Classification of capabilities. Used to group capabilities similar in nature. */
            type: string;
            /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
            subType: string;
            /** Key that backs the capability. */
            key: string;
            /** State of the entity in which the capability is applicable. */
            entityState: ("declaration" | "instance")[];
            /** Status of the capability */
            status: "enabled" | "disabled";
            /** Metadata contains additional information associated with the capability. Extension point. */
            metadata?: {
              [key: string]: any;
            };
          }[];
          /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
          isAnnotation?: boolean;
          /** Primary color associated with the model. */
          primaryColor?: string;
          /** Secondary color associated with the model. */
          secondaryColor?: string;
          /** SVG representation of the model in white color. */
          svgWhite: string;
          /** SVG representation of the model in colored format. */
          svgColor: string;
          /** SVG representation of the complete model. */
          svgComplete?: string;
          /** The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
          shape?:
            | "ellipse"
            | "triangle"
            | "round-triangle"
            | "rectangle"
            | "round-rectangle"
            | "bottom-round-rectangle"
            | "cut-rectangle"
            | "barrel"
            | "rhomboid"
            | "diamond"
            | "round-diamond"
            | "pentagon"
            | "round-pentagon"
            | "hexagon"
            | "round-hexagon"
            | "concave-hexagon"
            | "heptagon"
            | "round-heptagon"
            | "octagon"
            | "round-octagon"
            | "star"
            | "tag"
            | "round-tag"
            | "vee"
            | "polygon";
          [key: string]: any;
        };
        /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
        model: {
          /** Version of the model as defined by the registrant. */
          version: string;
        };
        /** The relationships of the model. */
        relationships: any;
        /** The components of the model. */
        components: any;
        /** Number of components associated with the model. */
        componentsCount: number;
        /** Number of relationships associated with the model. */
        relationshipsCount: number;
        /** Timestamp when the resource was created. */
        created_at?: string;
        /** Timestamp when the resource was updated. */
        updated_at?: string;
      };
      /** Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
      modelReference: {
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        id: string;
        /** The unique name for the model within the scope of a registrant. */
        name: string;
        /** Version of the model definition. */
        version: string;
        /** Human-readable name for the model. */
        displayName: string;
        /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
        model: {
          /** Version of the model as defined by the registrant. */
          version: string;
        };
        registrant: {
          /** Kind of the registrant. */
          kind: string;
        };
      };
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      modelId?: string;
      /** Visualization styles for a component */
      styles?: {
        /** Primary color of the component used for UI representation. */
        primaryColor: string;
        /** Secondary color of the entity used for UI representation. */
        secondaryColor?: string;
        /** White SVG of the entity used for UI representation on dark background. */
        svgWhite: string;
        /** Colored SVG of the entity used for UI representation on light background. */
        svgColor: string;
        /** Complete SVG of the entity used for UI representation, often inclusive of background. */
        svgComplete: string;
        /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. */
        color?: string;
        /** The opacity of the label text, including its outline. */
        "text-opacity"?: number;
        /** A comma-separated list of font names to use on the label text. */
        "font-family"?: string;
        /** The size of the label text. */
        "font-size"?: string;
        /** A CSS font style to be applied to the label text. */
        "font-style"?: string;
        /** A CSS font weight to be applied to the label text. */
        "font-weight"?: string;
        /** A transformation to apply to the label text */
        "text-transform"?: "none" | "uppercase" | "lowercase";
        /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children. */
        opacity?: number;
        /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
        "z-index"?: number;
        /** The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id */
        label?: string;
        /** The animation to apply to the element. example ripple,bounce,etc */
        animation?: object;
        [key: string]: any;
      } & {
        /** The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
        shape:
          | "ellipse"
          | "triangle"
          | "round-triangle"
          | "rectangle"
          | "round-rectangle"
          | "bottom-round-rectangle"
          | "cut-rectangle"
          | "barrel"
          | "rhomboid"
          | "diamond"
          | "round-diamond"
          | "pentagon"
          | "round-pentagon"
          | "hexagon"
          | "round-hexagon"
          | "concave-hexagon"
          | "heptagon"
          | "round-heptagon"
          | "octagon"
          | "round-octagon"
          | "star"
          | "tag"
          | "round-tag"
          | "vee"
          | "polygon";
        /** The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position. */
        position?: {
          /** The x-coordinate of the node. */
          x: number;
          /** The y-coordinate of the node. */
          y: number;
        };
        /** The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id */
        "body-text"?: string;
        /** How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'. */
        "body-text-wrap"?: string;
        /** The maximum width for wrapping text in the node. */
        "body-text-max-width"?: string;
        /** The opacity of the node's body text, including its outline. */
        "body-text-opacity"?: number;
        /** The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g. */
        "body-text-background-color"?: string;
        /** The size of the node's body text. */
        "body-text-font-size"?: number;
        /** The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g. */
        "body-text-color"?: string;
        /** A CSS font weight to be applied to the node's body text. */
        "body-text-font-weight"?: string;
        /** A CSS horizontal alignment to be applied to the node's body text. */
        "body-text-horizontal-align"?: string;
        /** A CSS text decoration to be applied to the node's body text. */
        "body-text-decoration"?: string;
        /** A CSS vertical alignment to be applied to the node's body text. */
        "body-text-vertical-align"?: string;
        /** The width of the node's body or the width of an edge's line. */
        width?: number;
        /** The height of the node's body */
        height?: number;
        /** The URL that points to the image to show in the node. */
        "background-image"?: string;
        /** The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g. */
        "background-color"?: string;
        /** Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1. */
        "background-blacken"?: number;
        /** The opacity level of the node's background colour */
        "background-opacity"?: number;
        /** The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-position-x"?: string;
        /** The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-position-y"?: string;
        /** The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-offset-x"?: string;
        /** The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-offset-y"?: string;
        /** How the background image is fit to the node. Can be 'none', 'contain', or 'cover'. */
        "background-fit"?: string;
        /** How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'. */
        "background-clip"?: string;
        /** How the background image's width is determined. Can be 'none', 'inner', or 'outer'. */
        "background-width-relative-to"?: string;
        /** How the background image's height is determined. Can be 'none', 'inner', or 'outer'. */
        "background-height-relative-to"?: string;
        /** The size of the node's border. */
        "border-width"?: number;
        /** The style of the node's border */
        "border-style"?: "solid" | "dotted" | "dashed" | "double";
        /** The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g. */
        "border-color"?: string;
        /** The opacity of the node's border */
        "border-opacity"?: number;
        /** The amount of padding around all sides of the node. */
        padding?: number;
        /** The horizontal alignment of a node's label */
        "text-halign"?: "left" | "center" | "right";
        /** The vertical alignment of a node's label */
        "text-valign"?: "top" | "center" | "bottom";
        /** Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset. */
        ghost?: "yes" | "no";
        /** The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
        "active-bg-color"?: string;
        /** The opacity of the active background indicator. Selector needs to be *core*. */
        "active-bg-opacity"?: string;
        /** The opacity of the active background indicator. Selector needs to be *core*. */
        "active-bg-size"?: string;
        /** The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
        "selection-box-color"?: string;
        /** The size of the border on the selection box. Selector needs to be *core* */
        "selection-box-border-width"?: number;
        /** The opacity of the selection box. Selector needs to be *core* */
        "selection-box-opacity"?: number;
        /** The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
        "outside-texture-bg-color"?: string;
        /** The opacity of the area outside the viewport texture. Selector needs to be *core* */
        "outside-texture-bg-opacity"?: number;
        /** An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 ) */
        "shape-polygon-points"?: string;
        /** The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
        "menu-background-color"?: string;
        /** The opacity of the background of the component menu. */
        "menu-background-opacity"?: number;
        /** The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
        "menu-forground-color"?: string;
      };
      /** Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management. */
      capabilities?: {
        /** Specifies the version of the schema to which the capability definition conforms. */
        schemaVersion: string;
        /** Version of the capability definition. */
        version: string;
        /** Name of the capability in human-readible format. */
        displayName: string;
        /** A written representation of the purpose and characteristics of the capability. */
        description: string;
        /** Top-level categorization of the capability */
        kind: "action" | "mutate" | "view" | "interaction";
        /** Classification of capabilities. Used to group capabilities similar in nature. */
        type: string;
        /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
        subType: string;
        /** Key that backs the capability. */
        key: string;
        /** State of the entity in which the capability is applicable. */
        entityState: ("declaration" | "instance")[];
        /** Status of the capability */
        status: "enabled" | "disabled";
        /** Metadata contains additional information associated with the capability. Extension point. */
        metadata?: {
          [key: string]: any;
        };
      }[];
      /** Status of component, including:
            - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
            - maintenance: model is unavailable for a period of time.
            - enabled: model is available for use for all users of this Meshery Server.
            - ignored: model is unavailable for use for all users of this Meshery Server. */
      status?: "ignored" | "enabled" | "duplicate" | "resolved" | "open";
      /** Metadata contains additional information associated with the component. */
      metadata: {
        /** Genealogy represents the various representational states of the component. */
        genealogy: string;
        /** Identifies whether the component is semantically meaningful or not; identifies whether the component should be treated as deployable entity or is for purposes of logical representation. */
        isAnnotation: boolean;
        /** Identifies whether the component is scoped to namespace or clsuter wide. */
        isNamespaced: boolean;
        /** 'published' controls whether the component should be registered in Meshery Registry. When the same 'published' property in Models, is set to 'false', the Model property takes precedence with all Entities in the Model not being registered. */
        published: boolean;
        /** InstanceDetails contains information about the instance of the component. */
        instanceDetails: object;
        /** Defines the UI schema for rendering the component's configuration. For more details, visit: https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema/ . */
        configurationUISchema: string;
        [key: string]: any;
      };
      /** The configuration of the component. The configuration is based on the schema defined within the component definition(component.schema). */
      configuration: object;
      /** data related to the third party capability that Component Defintion wraps , this is herematicaly sealed an */
      component: {
        /** Version of the component produced by the registrant. Example: APIVersion of a Kubernetes Pod. */
        version: string;
        /** The unique identifier (name) assigned by the registrant to this component. Example: A Kubernetes Pod is of kind 'Pod'. */
        kind: string;
        /** JSON schema of the object as defined by the registrant. */
        schema: string;
      };
      /** Timestamp when the resource was created. */
      created_at?: string;
      /** Timestamp when the resource was updated. */
      updated_at?: string;
    }[];
    /** Design-level preferences */
    preferences?: {
      /** Map of available layers, where keys are layer names. */
      layers: object;
    };
    /** List of relationships between components */
    relationships: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Specifies the version of the schema used for the relationship definition. */
      schemaVersion: string;
      /** Specifies the version of the relationship definition. */
      version: string;
      /** Kind of the Relationship. Learn more about relationships - https://docs.meshery.io/concepts/logical/relationships. */
      kind: "hierarchical" | "edge" | "sibling";
      /** Classification of relationships. Used to group relationships similar in nature. */
      type: string;
      /** Most granular unit of relationship classification. The combination of Kind, Type and SubType together uniquely identify a Relationship. */
      subType: string;
      /** Status of the relationship. */
      status?: "enabled" | "ignored" | "deleted" | "approved" | "pending";
      /** Capabilities associated with the relationship. */
      capabilities?: {
        /** Specifies the version of the schema to which the capability definition conforms. */
        schemaVersion: string;
        /** Version of the capability definition. */
        version: string;
        /** Name of the capability in human-readible format. */
        displayName: string;
        /** A written representation of the purpose and characteristics of the capability. */
        description: string;
        /** Top-level categorization of the capability */
        kind: "action" | "mutate" | "view" | "interaction";
        /** Classification of capabilities. Used to group capabilities similar in nature. */
        type: string;
        /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
        subType: string;
        /** Key that backs the capability. */
        key: string;
        /** State of the entity in which the capability is applicable. */
        entityState: ("declaration" | "instance")[];
        /** Status of the capability */
        status: "enabled" | "disabled";
        /** Metadata contains additional information associated with the capability. Extension point. */
        metadata?: {
          [key: string]: any;
        };
      }[];
      /** Metadata contains additional information associated with the Relationship. */
      metadata?: {
        /** Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management. */
        description?: string;
        /** Visualization styles for a relationship */
        styles?: {
          /** Primary color of the component used for UI representation. */
          primaryColor: string;
          /** Secondary color of the entity used for UI representation. */
          secondaryColor?: string;
          /** White SVG of the entity used for UI representation on dark background. */
          svgWhite: string;
          /** Colored SVG of the entity used for UI representation on light background. */
          svgColor: string;
          /** Complete SVG of the entity used for UI representation, often inclusive of background. */
          svgComplete?: string;
          /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. */
          color?: string;
          /** The opacity of the label text, including its outline. */
          "text-opacity"?: number;
          /** A comma-separated list of font names to use on the label text. */
          "font-family"?: string;
          /** The size of the label text. */
          "font-size"?: string;
          /** A CSS font style to be applied to the label text. */
          "font-style"?: string;
          /** A CSS font weight to be applied to the label text. */
          "font-weight"?: string;
          /** A transformation to apply to the label text */
          "text-transform"?: "none" | "uppercase" | "lowercase";
          /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility */
          opacity?: number;
          /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
          "z-index"?: number;
          /** The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id */
          label?: string;
          /** The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc . */
          "edge-animation"?: string;
          /** The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges. */
          "curve-style"?: "haystack" | "straight" | "bezier" | "unbundled-bezier" | "segments" | "taxi";
          /** The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g. */
          "line-color"?: string;
          /** The style of the edge's line. */
          "line-style"?: "solid" | "dotted" | "dashed";
          /** The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge. */
          "line-cap"?: "butt" | "round" | "square";
          /** The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents. */
          "line-opacity"?: number;
          /** The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g. */
          "target-arrow-color"?: string;
          /** The shape of the edge's source arrow */
          "target-arrow-shape"?:
            | "triangle"
            | "triangle-tee"
            | "circle-triangle"
            | "triangle-cross"
            | "triangle-backcurve"
            | "vee"
            | "tee"
            | "square"
            | "circle"
            | "diamond"
            | "chevron"
            | "none";
          /** The fill state of the edge's source arrow */
          "target-arrow-fill"?: "filled" | "hollow";
          /** The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g. */
          "mid-target-arrow-color"?: string;
          /** The shape of the edge's source arrow */
          "mid-target-arrow-shape"?:
            | "triangle"
            | "triangle-tee"
            | "circle-triangle"
            | "triangle-cross"
            | "triangle-backcurve"
            | "vee"
            | "tee"
            | "square"
            | "circle"
            | "diamond"
            | "chevron"
            | "none";
          /** The fill state of the edge's source arrow */
          "mid-target-arrow-fill"?: "filled" | "hollow";
          /** Scaling for the arrow size. */
          "arrow-scale"?: number;
          /** The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id */
          "source-label"?: string;
          /** The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id */
          "target-label"?: string;
        };
        /** Indicates whether the relationship should be treated as a logical representation only */
        isAnnotation?: boolean;
        [key: string]: any;
      };
      /** Model Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
      model: {
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        id: string;
        /** The unique name for the model within the scope of a registrant. */
        name: string;
        /** Version of the model definition. */
        version: string;
        /** Human-readable name for the model. */
        displayName: string;
        /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
        model: {
          /** Version of the model as defined by the registrant. */
          version: string;
        };
        registrant: {
          /** Kind of the registrant. */
          kind: string;
        };
      };
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      modelId?: string;
      /** Optional. Assigns the policy to be used for the evaluation of the relationship. Deprecation Notice: In the future, this property is either to be removed or to it is to be an array of optional policy $refs. */
      evaluationQuery?: string;
      /** Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved. */
      selectors?: {
        /** Selectors used to define relationships which are allowed. */
        allow: {
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          from: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id?: string;
            kind?: string;
            /** Match configuration for selector */
            match?: {
              refs?: string[][];
              from?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
              to?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
            };
            /** Match strategy matrix for the selector */
            match_strategy_matrix?: string[][];
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Version of the model definition. */
              version: string;
              /** Human-readable name for the model. */
              displayName: string;
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
              model: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
              registrant: {
                /** Kind of the registrant. */
                kind: string;
              };
            };
            /** Patch configuration for the selector */
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value.
                             */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              /** JSON ref to value from where patch should be applied. */
              mutatorRef?: string[][];
              mutatedRef?: string[][];
            };
          }[];
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          to: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id?: string;
            kind?: string;
            /** Match configuration for selector */
            match?: {
              refs?: string[][];
              from?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
              to?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
            };
            /** Match strategy matrix for the selector */
            match_strategy_matrix?: string[][];
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Version of the model definition. */
              version: string;
              /** Human-readable name for the model. */
              displayName: string;
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
              model: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
              registrant: {
                /** Kind of the registrant. */
                kind: string;
              };
            };
            /** Patch configuration for the selector */
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value.
                             */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              /** JSON ref to value from where patch should be applied. */
              mutatorRef?: string[][];
              mutatedRef?: string[][];
            };
          }[];
        };
        /** Optional selectors used to define relationships which should not be created / is restricted. */
        deny?: {
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          from: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id?: string;
            kind?: string;
            /** Match configuration for selector */
            match?: {
              refs?: string[][];
              from?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
              to?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
            };
            /** Match strategy matrix for the selector */
            match_strategy_matrix?: string[][];
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Version of the model definition. */
              version: string;
              /** Human-readable name for the model. */
              displayName: string;
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
              model: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
              registrant: {
                /** Kind of the registrant. */
                kind: string;
              };
            };
            /** Patch configuration for the selector */
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value.
                             */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              /** JSON ref to value from where patch should be applied. */
              mutatorRef?: string[][];
              mutatedRef?: string[][];
            };
          }[];
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          to: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id?: string;
            kind?: string;
            /** Match configuration for selector */
            match?: {
              refs?: string[][];
              from?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
              to?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id?: string;
                kind: string;
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              }[];
            };
            /** Match strategy matrix for the selector */
            match_strategy_matrix?: string[][];
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Version of the model definition. */
              version: string;
              /** Human-readable name for the model. */
              displayName: string;
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
              model: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
              registrant: {
                /** Kind of the registrant. */
                kind: string;
              };
            };
            /** Patch configuration for the selector */
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value.
                             */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              /** JSON ref to value from where patch should be applied. */
              mutatorRef?: string[][];
              mutatedRef?: string[][];
            };
          }[];
        };
      }[];
    }[];
  };
  /** Hash of the input parameters and configuration used for this evaluation. Useful for identifying duplicate evaluations or caching results. */
  evaluationHash?: string;
  /** ISO 8601 formatted timestamp of when the evaluation was completed. */
  timestamp?: string;
  /** The actions of the evaluationresponse. */
  actions: {
    /** The op of the action. */
    op:
      | "update_component"
      | "update_component_configuration"
      | "add_component"
      | "delete_component"
      | "add_relationship"
      | "update_relationship"
      | "delete_relationship";
    /** The value of the action. */
    value: object;
  }[];
};
export type PostEvaluateApiArg = {
  body: {
    /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
    design: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Name of the design; a descriptive, but concise title for the design document. */
      name: string;
      /** Specifies the version of the schema to which the design conforms. */
      schemaVersion: string;
      /** Revision of the design as expressed by an auto-incremented, SemVer-compliant version number. May be manually set by a user or third-party system, but will always be required to be of version number higher than the previously defined version number. */
      version: string;
      metadata?: {
        /** Map of resolved aliases present in the design */
        resolvedAliases?: {
          [key: string]: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            relationship_id: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            alias_component_id: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            immediate_parent_id: string;
            immediate_ref_field_path: string[];
          } & {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            resolved_parent_id: string;
            resolved_ref_field_path: string[];
          };
        };
        [key: string]: any;
      };
      /** A list of one or more component declarations. */
      components: {
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        id: string;
        /** Specifies the version of the schema to which the component definition conforms. */
        schemaVersion: string;
        /** Version of the component definition. */
        version: string;
        /** Name of the component in human-readible format. */
        displayName: string;
        /** A written representation of the purpose and characteristics of the component. */
        description: string;
        /** Format specifies the format used in the `component.schema` field. JSON is the default. */
        format: "JSON" | "CUE";
        /** Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
        model: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          id: string;
          /** Specifies the version of the schema used for the definition. */
          schemaVersion: string;
          /** Version of the model definition. */
          version: string;
          /** The unique name for the model within the scope of a registrant. */
          name: string;
          /** Human-readable name for the model. */
          displayName: string;
          /** Description of the model. */
          description: string;
          /** Status of model, including:
                    - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                    - maintenance: model is unavailable for a period of time.
                    - enabled: model is available for use for all users of this Meshery Server.
                    - ignored: model is unavailable for use for all users of this Meshery Server. */
          status: "ignored" | "enabled" | "duplicate";
          /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
          registrant: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id: string;
            /** Connection Name */
            name: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            credentialId?: string;
            /** Connection Type (platform, telemetry, collaboration) */
            type: string;
            /** Connection Subtype (cloud, identity, metrics, chat, git, orchestration) */
            subType: string;
            /** Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github) */
            kind: string;
            /** Additional connection metadata */
            metadata?: object;
            /** Connection Status */
            status:
              | "discovered"
              | "registered"
              | "connected"
              | "ignored"
              | "maintenance"
              | "disconnected"
              | "deleted"
              | "not found";
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            user_id?: string;
            created_at?: string;
            updated_at?: string;
            /** SQL null Timestamp to handle null values of time. */
            deleted_at?: string;
            /** Associated environments for this connection */
            environments?: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id: string;
              /** Specifies the version of the schema to which the environment conforms. */
              schemaVersion: string;
              /** Environment name */
              name: string;
              /** Environment description */
              description: string;
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              organization_id: string;
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              owner?: string;
              /** Timestamp when the resource was created. */
              created_at?: string;
              /** Additional metadata associated with the environment. */
              metadata?: object;
              /** Timestamp when the resource was updated. */
              updated_at?: string;
              /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
              deleted_at?: string | null;
            }[];
            /** Specifies the version of the schema used for the definition. */
            schemaVersion: string;
          };
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          registrantId: string;
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          categoryId: string;
          /** Category of the model. */
          category: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            id: string;
            /** The category of the model that determines the main grouping. */
            name:
              | "Analytics"
              | "App Definition and Development"
              | "Cloud Native Network"
              | "Cloud Native Storage"
              | "Database"
              | "Machine Learning"
              | "Observability and Analysis"
              | "Orchestration & Management"
              | "Platform"
              | "Provisioning"
              | "Runtime"
              | "Security & Compliance"
              | "Serverless"
              | "Tools"
              | "Uncategorized";
            /** Additional metadata associated with the category. */
            metadata: object;
          };
          /** Sub category of the model determines the secondary grouping. */
          subCategory:
            | "API Gateway"
            | "API Integration"
            | "Application Definition & Image Build"
            | "Automation & Configuration"
            | "Certified Kubernetes - Distribution"
            | "Chaos Engineering"
            | "Cloud Native Storage"
            | "Cloud Provider"
            | "CNI"
            | "Compute"
            | "Container Registry"
            | "Container Runtime"
            | "Container Security"
            | "Container"
            | "Content Delivery Network"
            | "Continuous Integration & Delivery"
            | "Coordination & Service Discovery"
            | "Database"
            | "Flowchart"
            | "Framework"
            | "Installable Platform"
            | "Key Management"
            | "Key Management Service"
            | "Kubernetes"
            | "Logging"
            | "Machine Learning"
            | "Management Governance"
            | "Metrics"
            | "Monitoring"
            | "Networking Content Delivery"
            | "Operating System"
            | "Query"
            | "Remote Procedure Call"
            | "Scheduling & Orchestration"
            | "Secrets Management"
            | "Security Identity & Compliance"
            | "Service Mesh"
            | "Service Proxy"
            | "Source Version Control"
            | "Storage"
            | "Specifications"
            | "Streaming & Messaging"
            | "Tools"
            | "Tracing"
            | "Uncategorized"
            | "Video Conferencing";
          /** Metadata containing additional information associated with the model. */
          metadata?: {
            /** Capabilities associated with the model */
            capabilities?: {
              /** Specifies the version of the schema to which the capability definition conforms. */
              schemaVersion: string;
              /** Version of the capability definition. */
              version: string;
              /** Name of the capability in human-readible format. */
              displayName: string;
              /** A written representation of the purpose and characteristics of the capability. */
              description: string;
              /** Top-level categorization of the capability */
              kind: "action" | "mutate" | "view" | "interaction";
              /** Classification of capabilities. Used to group capabilities similar in nature. */
              type: string;
              /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
              subType: string;
              /** Key that backs the capability. */
              key: string;
              /** State of the entity in which the capability is applicable. */
              entityState: ("declaration" | "instance")[];
              /** Status of the capability */
              status: "enabled" | "disabled";
              /** Metadata contains additional information associated with the capability. Extension point. */
              metadata?: {
                [key: string]: any;
              };
            }[];
            /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
            isAnnotation?: boolean;
            /** Primary color associated with the model. */
            primaryColor?: string;
            /** Secondary color associated with the model. */
            secondaryColor?: string;
            /** SVG representation of the model in white color. */
            svgWhite: string;
            /** SVG representation of the model in colored format. */
            svgColor: string;
            /** SVG representation of the complete model. */
            svgComplete?: string;
            /** The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
            shape?:
              | "ellipse"
              | "triangle"
              | "round-triangle"
              | "rectangle"
              | "round-rectangle"
              | "bottom-round-rectangle"
              | "cut-rectangle"
              | "barrel"
              | "rhomboid"
              | "diamond"
              | "round-diamond"
              | "pentagon"
              | "round-pentagon"
              | "hexagon"
              | "round-hexagon"
              | "concave-hexagon"
              | "heptagon"
              | "round-heptagon"
              | "octagon"
              | "round-octagon"
              | "star"
              | "tag"
              | "round-tag"
              | "vee"
              | "polygon";
            [key: string]: any;
          };
          /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
          model: {
            /** Version of the model as defined by the registrant. */
            version: string;
          };
          /** The relationships of the model. */
          relationships: any;
          /** The components of the model. */
          components: any;
          /** Number of components associated with the model. */
          componentsCount: number;
          /** Number of relationships associated with the model. */
          relationshipsCount: number;
          /** Timestamp when the resource was created. */
          created_at?: string;
          /** Timestamp when the resource was updated. */
          updated_at?: string;
        };
        /** Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
        modelReference: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          id: string;
          /** The unique name for the model within the scope of a registrant. */
          name: string;
          /** Version of the model definition. */
          version: string;
          /** Human-readable name for the model. */
          displayName: string;
          /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
          model: {
            /** Version of the model as defined by the registrant. */
            version: string;
          };
          registrant: {
            /** Kind of the registrant. */
            kind: string;
          };
        };
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        modelId?: string;
        /** Visualization styles for a component */
        styles?: {
          /** Primary color of the component used for UI representation. */
          primaryColor: string;
          /** Secondary color of the entity used for UI representation. */
          secondaryColor?: string;
          /** White SVG of the entity used for UI representation on dark background. */
          svgWhite: string;
          /** Colored SVG of the entity used for UI representation on light background. */
          svgColor: string;
          /** Complete SVG of the entity used for UI representation, often inclusive of background. */
          svgComplete: string;
          /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. */
          color?: string;
          /** The opacity of the label text, including its outline. */
          "text-opacity"?: number;
          /** A comma-separated list of font names to use on the label text. */
          "font-family"?: string;
          /** The size of the label text. */
          "font-size"?: string;
          /** A CSS font style to be applied to the label text. */
          "font-style"?: string;
          /** A CSS font weight to be applied to the label text. */
          "font-weight"?: string;
          /** A transformation to apply to the label text */
          "text-transform"?: "none" | "uppercase" | "lowercase";
          /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children. */
          opacity?: number;
          /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
          "z-index"?: number;
          /** The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id */
          label?: string;
          /** The animation to apply to the element. example ripple,bounce,etc */
          animation?: object;
          [key: string]: any;
        } & {
          /** The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
          shape:
            | "ellipse"
            | "triangle"
            | "round-triangle"
            | "rectangle"
            | "round-rectangle"
            | "bottom-round-rectangle"
            | "cut-rectangle"
            | "barrel"
            | "rhomboid"
            | "diamond"
            | "round-diamond"
            | "pentagon"
            | "round-pentagon"
            | "hexagon"
            | "round-hexagon"
            | "concave-hexagon"
            | "heptagon"
            | "round-heptagon"
            | "octagon"
            | "round-octagon"
            | "star"
            | "tag"
            | "round-tag"
            | "vee"
            | "polygon";
          /** The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position. */
          position?: {
            /** The x-coordinate of the node. */
            x: number;
            /** The y-coordinate of the node. */
            y: number;
          };
          /** The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id */
          "body-text"?: string;
          /** How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'. */
          "body-text-wrap"?: string;
          /** The maximum width for wrapping text in the node. */
          "body-text-max-width"?: string;
          /** The opacity of the node's body text, including its outline. */
          "body-text-opacity"?: number;
          /** The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g. */
          "body-text-background-color"?: string;
          /** The size of the node's body text. */
          "body-text-font-size"?: number;
          /** The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g. */
          "body-text-color"?: string;
          /** A CSS font weight to be applied to the node's body text. */
          "body-text-font-weight"?: string;
          /** A CSS horizontal alignment to be applied to the node's body text. */
          "body-text-horizontal-align"?: string;
          /** A CSS text decoration to be applied to the node's body text. */
          "body-text-decoration"?: string;
          /** A CSS vertical alignment to be applied to the node's body text. */
          "body-text-vertical-align"?: string;
          /** The width of the node's body or the width of an edge's line. */
          width?: number;
          /** The height of the node's body */
          height?: number;
          /** The URL that points to the image to show in the node. */
          "background-image"?: string;
          /** The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g. */
          "background-color"?: string;
          /** Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1. */
          "background-blacken"?: number;
          /** The opacity level of the node's background colour */
          "background-opacity"?: number;
          /** The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-position-x"?: string;
          /** The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-position-y"?: string;
          /** The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-offset-x"?: string;
          /** The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-offset-y"?: string;
          /** How the background image is fit to the node. Can be 'none', 'contain', or 'cover'. */
          "background-fit"?: string;
          /** How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'. */
          "background-clip"?: string;
          /** How the background image's width is determined. Can be 'none', 'inner', or 'outer'. */
          "background-width-relative-to"?: string;
          /** How the background image's height is determined. Can be 'none', 'inner', or 'outer'. */
          "background-height-relative-to"?: string;
          /** The size of the node's border. */
          "border-width"?: number;
          /** The style of the node's border */
          "border-style"?: "solid" | "dotted" | "dashed" | "double";
          /** The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g. */
          "border-color"?: string;
          /** The opacity of the node's border */
          "border-opacity"?: number;
          /** The amount of padding around all sides of the node. */
          padding?: number;
          /** The horizontal alignment of a node's label */
          "text-halign"?: "left" | "center" | "right";
          /** The vertical alignment of a node's label */
          "text-valign"?: "top" | "center" | "bottom";
          /** Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset. */
          ghost?: "yes" | "no";
          /** The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
          "active-bg-color"?: string;
          /** The opacity of the active background indicator. Selector needs to be *core*. */
          "active-bg-opacity"?: string;
          /** The opacity of the active background indicator. Selector needs to be *core*. */
          "active-bg-size"?: string;
          /** The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
          "selection-box-color"?: string;
          /** The size of the border on the selection box. Selector needs to be *core* */
          "selection-box-border-width"?: number;
          /** The opacity of the selection box. Selector needs to be *core* */
          "selection-box-opacity"?: number;
          /** The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
          "outside-texture-bg-color"?: string;
          /** The opacity of the area outside the viewport texture. Selector needs to be *core* */
          "outside-texture-bg-opacity"?: number;
          /** An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 ) */
          "shape-polygon-points"?: string;
          /** The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
          "menu-background-color"?: string;
          /** The opacity of the background of the component menu. */
          "menu-background-opacity"?: number;
          /** The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
          "menu-forground-color"?: string;
        };
        /** Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management. */
        capabilities?: {
          /** Specifies the version of the schema to which the capability definition conforms. */
          schemaVersion: string;
          /** Version of the capability definition. */
          version: string;
          /** Name of the capability in human-readible format. */
          displayName: string;
          /** A written representation of the purpose and characteristics of the capability. */
          description: string;
          /** Top-level categorization of the capability */
          kind: "action" | "mutate" | "view" | "interaction";
          /** Classification of capabilities. Used to group capabilities similar in nature. */
          type: string;
          /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
          subType: string;
          /** Key that backs the capability. */
          key: string;
          /** State of the entity in which the capability is applicable. */
          entityState: ("declaration" | "instance")[];
          /** Status of the capability */
          status: "enabled" | "disabled";
          /** Metadata contains additional information associated with the capability. Extension point. */
          metadata?: {
            [key: string]: any;
          };
        }[];
        /** Status of component, including:
                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                - maintenance: model is unavailable for a period of time.
                - enabled: model is available for use for all users of this Meshery Server.
                - ignored: model is unavailable for use for all users of this Meshery Server. */
        status?: "ignored" | "enabled" | "duplicate" | "resolved" | "open";
        /** Metadata contains additional information associated with the component. */
        metadata: {
          /** Genealogy represents the various representational states of the component. */
          genealogy: string;
          /** Identifies whether the component is semantically meaningful or not; identifies whether the component should be treated as deployable entity or is for purposes of logical representation. */
          isAnnotation: boolean;
          /** Identifies whether the component is scoped to namespace or clsuter wide. */
          isNamespaced: boolean;
          /** 'published' controls whether the component should be registered in Meshery Registry. When the same 'published' property in Models, is set to 'false', the Model property takes precedence with all Entities in the Model not being registered. */
          published: boolean;
          /** InstanceDetails contains information about the instance of the component. */
          instanceDetails: object;
          /** Defines the UI schema for rendering the component's configuration. For more details, visit: https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema/ . */
          configurationUISchema: string;
          [key: string]: any;
        };
        /** The configuration of the component. The configuration is based on the schema defined within the component definition(component.schema). */
        configuration: object;
        /** data related to the third party capability that Component Defintion wraps , this is herematicaly sealed an */
        component: {
          /** Version of the component produced by the registrant. Example: APIVersion of a Kubernetes Pod. */
          version: string;
          /** The unique identifier (name) assigned by the registrant to this component. Example: A Kubernetes Pod is of kind 'Pod'. */
          kind: string;
          /** JSON schema of the object as defined by the registrant. */
          schema: string;
        };
        /** Timestamp when the resource was created. */
        created_at?: string;
        /** Timestamp when the resource was updated. */
        updated_at?: string;
      }[];
      /** Design-level preferences */
      preferences?: {
        /** Map of available layers, where keys are layer names. */
        layers: object;
      };
      /** List of relationships between components */
      relationships: {
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        id: string;
        /** Specifies the version of the schema used for the relationship definition. */
        schemaVersion: string;
        /** Specifies the version of the relationship definition. */
        version: string;
        /** Kind of the Relationship. Learn more about relationships - https://docs.meshery.io/concepts/logical/relationships. */
        kind: "hierarchical" | "edge" | "sibling";
        /** Classification of relationships. Used to group relationships similar in nature. */
        type: string;
        /** Most granular unit of relationship classification. The combination of Kind, Type and SubType together uniquely identify a Relationship. */
        subType: string;
        /** Status of the relationship. */
        status?: "enabled" | "ignored" | "deleted" | "approved" | "pending";
        /** Capabilities associated with the relationship. */
        capabilities?: {
          /** Specifies the version of the schema to which the capability definition conforms. */
          schemaVersion: string;
          /** Version of the capability definition. */
          version: string;
          /** Name of the capability in human-readible format. */
          displayName: string;
          /** A written representation of the purpose and characteristics of the capability. */
          description: string;
          /** Top-level categorization of the capability */
          kind: "action" | "mutate" | "view" | "interaction";
          /** Classification of capabilities. Used to group capabilities similar in nature. */
          type: string;
          /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
          subType: string;
          /** Key that backs the capability. */
          key: string;
          /** State of the entity in which the capability is applicable. */
          entityState: ("declaration" | "instance")[];
          /** Status of the capability */
          status: "enabled" | "disabled";
          /** Metadata contains additional information associated with the capability. Extension point. */
          metadata?: {
            [key: string]: any;
          };
        }[];
        /** Metadata contains additional information associated with the Relationship. */
        metadata?: {
          /** Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management. */
          description?: string;
          /** Visualization styles for a relationship */
          styles?: {
            /** Primary color of the component used for UI representation. */
            primaryColor: string;
            /** Secondary color of the entity used for UI representation. */
            secondaryColor?: string;
            /** White SVG of the entity used for UI representation on dark background. */
            svgWhite: string;
            /** Colored SVG of the entity used for UI representation on light background. */
            svgColor: string;
            /** Complete SVG of the entity used for UI representation, often inclusive of background. */
            svgComplete?: string;
            /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. */
            color?: string;
            /** The opacity of the label text, including its outline. */
            "text-opacity"?: number;
            /** A comma-separated list of font names to use on the label text. */
            "font-family"?: string;
            /** The size of the label text. */
            "font-size"?: string;
            /** A CSS font style to be applied to the label text. */
            "font-style"?: string;
            /** A CSS font weight to be applied to the label text. */
            "font-weight"?: string;
            /** A transformation to apply to the label text */
            "text-transform"?: "none" | "uppercase" | "lowercase";
            /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility */
            opacity?: number;
            /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
            "z-index"?: number;
            /** The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id */
            label?: string;
            /** The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc . */
            "edge-animation"?: string;
            /** The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges. */
            "curve-style"?: "haystack" | "straight" | "bezier" | "unbundled-bezier" | "segments" | "taxi";
            /** The colour of the edge's line. Colours may be specified by name (e.g. red), hex (e.g. */
            "line-color"?: string;
            /** The style of the edge's line. */
            "line-style"?: "solid" | "dotted" | "dashed";
            /** The cap style of the edge's line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge. */
            "line-cap"?: "butt" | "round" | "square";
            /** The opacity of the edge's line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents. */
            "line-opacity"?: number;
            /** The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g. */
            "target-arrow-color"?: string;
            /** The shape of the edge's source arrow */
            "target-arrow-shape"?:
              | "triangle"
              | "triangle-tee"
              | "circle-triangle"
              | "triangle-cross"
              | "triangle-backcurve"
              | "vee"
              | "tee"
              | "square"
              | "circle"
              | "diamond"
              | "chevron"
              | "none";
            /** The fill state of the edge's source arrow */
            "target-arrow-fill"?: "filled" | "hollow";
            /** The colour of the edge's source arrow. Colours may be specified by name (e.g. red), hex (e.g. */
            "mid-target-arrow-color"?: string;
            /** The shape of the edge's source arrow */
            "mid-target-arrow-shape"?:
              | "triangle"
              | "triangle-tee"
              | "circle-triangle"
              | "triangle-cross"
              | "triangle-backcurve"
              | "vee"
              | "tee"
              | "square"
              | "circle"
              | "diamond"
              | "chevron"
              | "none";
            /** The fill state of the edge's source arrow */
            "mid-target-arrow-fill"?: "filled" | "hollow";
            /** Scaling for the arrow size. */
            "arrow-scale"?: number;
            /** The text to display for an edge's source label. Can give a path, e.g. data(id) will label with the elements id */
            "source-label"?: string;
            /** The text to display for an edge's target label. Can give a path, e.g. data(id) will label with the elements id */
            "target-label"?: string;
          };
          /** Indicates whether the relationship should be treated as a logical representation only */
          isAnnotation?: boolean;
          [key: string]: any;
        };
        /** Model Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
        model: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          id: string;
          /** The unique name for the model within the scope of a registrant. */
          name: string;
          /** Version of the model definition. */
          version: string;
          /** Human-readable name for the model. */
          displayName: string;
          /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
          model: {
            /** Version of the model as defined by the registrant. */
            version: string;
          };
          registrant: {
            /** Kind of the registrant. */
            kind: string;
          };
        };
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        modelId?: string;
        /** Optional. Assigns the policy to be used for the evaluation of the relationship. Deprecation Notice: In the future, this property is either to be removed or to it is to be an array of optional policy $refs. */
        evaluationQuery?: string;
        /** Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved. */
        selectors?: {
          /** Selectors used to define relationships which are allowed. */
          allow: {
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            from: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id?: string;
              kind?: string;
              /** Match configuration for selector */
              match?: {
                refs?: string[][];
                from?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
                to?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
              };
              /** Match strategy matrix for the selector */
              match_strategy_matrix?: string[][];
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Version of the model definition. */
                version: string;
                /** Human-readable name for the model. */
                displayName: string;
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
                model: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
                registrant: {
                  /** Kind of the registrant. */
                  kind: string;
                };
              };
              /** Patch configuration for the selector */
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value.
                                 */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              };
            }[];
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            to: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id?: string;
              kind?: string;
              /** Match configuration for selector */
              match?: {
                refs?: string[][];
                from?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
                to?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
              };
              /** Match strategy matrix for the selector */
              match_strategy_matrix?: string[][];
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Version of the model definition. */
                version: string;
                /** Human-readable name for the model. */
                displayName: string;
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
                model: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
                registrant: {
                  /** Kind of the registrant. */
                  kind: string;
                };
              };
              /** Patch configuration for the selector */
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value.
                                 */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              };
            }[];
          };
          /** Optional selectors used to define relationships which should not be created / is restricted. */
          deny?: {
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            from: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id?: string;
              kind?: string;
              /** Match configuration for selector */
              match?: {
                refs?: string[][];
                from?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
                to?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
              };
              /** Match strategy matrix for the selector */
              match_strategy_matrix?: string[][];
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Version of the model definition. */
                version: string;
                /** Human-readable name for the model. */
                displayName: string;
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
                model: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
                registrant: {
                  /** Kind of the registrant. */
                  kind: string;
                };
              };
              /** Patch configuration for the selector */
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value.
                                 */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              };
            }[];
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            to: {
              /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
              id?: string;
              kind?: string;
              /** Match configuration for selector */
              match?: {
                refs?: string[][];
                from?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
                to?: {
                  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                  id?: string;
                  kind: string;
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                  mutatedRef?: string[][];
                }[];
              };
              /** Match strategy matrix for the selector */
              match_strategy_matrix?: string[][];
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
                id: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Version of the model definition. */
                version: string;
                /** Human-readable name for the model. */
                displayName: string;
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
                model: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
                registrant: {
                  /** Kind of the registrant. */
                  kind: string;
                };
              };
              /** Patch configuration for the selector */
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic: specific to Kubernetes and understands the structure of Kubernetes objects.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value.
                                 */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
                /** JSON ref to value from where patch should be applied. */
                mutatorRef?: string[][];
                mutatedRef?: string[][];
              };
            }[];
          };
        }[];
      }[];
    };
    /** The options of the evaluationrequest. */
    options?: {
      /** If true, only return the diff of changes instead of the complete updated design */
      returnDiffOnly?: boolean;
      /** If true, include detailed trace information in the response */
      enableTrace?: boolean;
    };
  };
};
export type GetUserKeysApiResponse = /** status 200 Returns user keys based on roles assigned to user */ {
  page: number;
  page_size: number;
  total_count: number;
  /** The keys of the keypage. */
  keys: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    owner: string;
    /** Operation permitted by the key. */
    function: string;
    /** Category for the key. */
    category: string;
    /** Subcategory for the key. */
    subcategory: string;
    /** Human readable description of the key. */
    description: string;
    /** Timestamp when the resource was created. */
    created_at: string;
    /** Timestamp when the resource was updated. */
    updated_at: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetUserKeysApiArg = {
  /** Organization ID */
  orgId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
};
export type RegisterMeshmodelsApiResponse = /** status 201 Successful registration */ {
  message?: string;
};
export type RegisterMeshmodelsApiArg = {
  body: {
    importBody:
      | {
          /** Name of the file being uploaded. */
          fileName: string;
          /** Supported model file formats are: .tar, .tar.gz, and .tgz. See [Import Models Documentation](https://docs.meshery.io/guides/configuration-management/importing-models#import-models-using-meshery-ui) for details */
          modelFile: string;
        }
      | {
          /** A direct URL to a single model file, for example: https://raw.github.com/your-model-file.tar. Supported model file formats are: .tar, .tar.gz, and .tgz. \n\nFor bulk import of your model use the GitHub connection or CSV files. See [Import Models Documentation](https://docs.meshery.io/guides/configuration-management/importing-models#import-models-using-meshery-ui) for details */
          url: string;
        }
      | {
          /** Upload a CSV file containing model definitions */
          modelCsv: Blob;
          /** Upload a CSV file containing component definitions */
          componentCsv: Blob;
          /** Upload a CSV file containing relationship definitions */
          relationshipCsv: Blob;
        }
      | {
          /** URI to the source code or package of the model. */
          url: string;
        };
    /** Choose the method you prefer to upload your model file. Select 'File Import' or 'CSV Import' if you have the file on your local system or 'URL Import' if you have the file hosted online. */
    uploadType: "file" | "urlImport" | "csv" | "url";
    /** The register of the importrequest. */
    register: boolean;
  };
};
export type GetOrgsApiResponse = /** status 200 Organizations response */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The organizations of the organizationspage. */
  organizations?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    name?: string;
    description?: string;
    country?: string;
    region?: string;
    owner?: string;
    metadata?: {
      preferences: {
        theme: {
          /** Theme ID. */
          id: string;
          logo: {
            desktopView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            mobileView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            darkDesktopView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            darkMobileView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
          };
          /** The vars of the theme. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  }[];
};
export type GetOrgsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get all possible entries */
  all?: boolean;
};
export type CreateOrgApiResponse = /** status 201 Single-organization page response */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The organizations of the organizationpage. */
  organizations?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    name?: string;
    description?: string;
    country?: string;
    region?: string;
    owner?: string;
    metadata?: {
      preferences: {
        theme: {
          /** Theme ID. */
          id: string;
          logo: {
            desktopView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            mobileView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            darkDesktopView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            darkMobileView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
          };
          /** The vars of the theme. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  }[];
};
export type CreateOrgApiArg = {
  /** Body for creating or updating an organization */
  body: {
    name?: string;
    country?: string;
    region?: string;
    description?: string;
    /** The notify org update of the organization. */
    notifyOrgUpdate?: boolean;
    preferences?: {
      theme: {
        /** Theme ID. */
        id: string;
        logo: {
          desktopView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          mobileView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          darkDesktopView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          darkMobileView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
        };
        /** The vars of the theme. */
        vars?: {
          [key: string]: any;
        };
      };
      /** Preferences specific to dashboard behavior */
      dashboard: {
        [key: string]: any;
      };
    };
  };
};
export type GetOrgByDomainApiResponse = /** status 200 Successful response */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** Name of the organization. */
  name: string;
  /** The country of the organization. */
  country: string;
  /** The region of the organization. */
  region: string;
  /** Description of the organization. */
  description: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  owner: string;
  metadata: {
    preferences: {
      theme: {
        /** Theme ID. */
        id: string;
        logo: {
          desktopView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          mobileView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          darkDesktopView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          darkMobileView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
        };
        /** The vars of the theme. */
        vars?: {
          [key: string]: any;
        };
      };
      /** Preferences specific to dashboard behavior */
      dashboard: {
        [key: string]: any;
      };
    };
  };
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  /** The domain of the organization. */
  domain?: string | null;
};
export type GetOrgByDomainApiArg = {
  domain: string;
};
export type GetOrgApiResponse = /** status 200 Single-organization page response */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The organizations of the organizationpage. */
  organizations?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    name?: string;
    description?: string;
    country?: string;
    region?: string;
    owner?: string;
    metadata?: {
      preferences: {
        theme: {
          /** Theme ID. */
          id: string;
          logo: {
            desktopView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            mobileView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            darkDesktopView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
            darkMobileView: {
              /** The svg of the location. */
              svg: string;
              /** The location of the location. */
              location: string;
            };
          };
          /** The vars of the theme. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  }[];
};
export type GetOrgApiArg = {
  orgId: string;
};
export type DeleteOrgApiResponse = unknown;
export type DeleteOrgApiArg = {
  orgId: string;
};
export type HandleUpdateOrgApiResponse =
  /** status 200 Single-organization page response for the updated organization */ {
    /** Current page number of the result set. */
    page?: number;
    /** Number of items per page. */
    page_size?: number;
    /** Total number of items available. */
    total_count?: number;
    /** The organizations of the organizationpage. */
    organizations?: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id?: string;
      name?: string;
      description?: string;
      country?: string;
      region?: string;
      owner?: string;
      metadata?: {
        preferences: {
          theme: {
            /** Theme ID. */
            id: string;
            logo: {
              desktopView: {
                /** The svg of the location. */
                svg: string;
                /** The location of the location. */
                location: string;
              };
              mobileView: {
                /** The svg of the location. */
                svg: string;
                /** The location of the location. */
                location: string;
              };
              darkDesktopView: {
                /** The svg of the location. */
                svg: string;
                /** The location of the location. */
                location: string;
              };
              darkMobileView: {
                /** The svg of the location. */
                svg: string;
                /** The location of the location. */
                location: string;
              };
            };
            /** The vars of the theme. */
            vars?: {
              [key: string]: any;
            };
          };
          /** Preferences specific to dashboard behavior */
          dashboard: {
            [key: string]: any;
          };
        };
      };
      created_at?: string;
      updated_at?: string;
      deleted_at?: string;
    }[];
  };
export type HandleUpdateOrgApiArg = {
  orgId: string;
  /** Body for creating or updating an organization */
  body: {
    name?: string;
    country?: string;
    region?: string;
    description?: string;
    /** The notify org update of the organization. */
    notifyOrgUpdate?: boolean;
    preferences?: {
      theme: {
        /** Theme ID. */
        id: string;
        logo: {
          desktopView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          mobileView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          darkDesktopView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
          darkMobileView: {
            /** The svg of the location. */
            svg: string;
            /** The location of the location. */
            location: string;
          };
        };
        /** The vars of the theme. */
        vars?: {
          [key: string]: any;
        };
      };
      /** Preferences specific to dashboard behavior */
      dashboard: {
        [key: string]: any;
      };
    };
  };
};
export type GetOrgPreferencesApiResponse = /** status 200 Organization metadata, including preferences */ {
  preferences: {
    theme: {
      /** Theme ID. */
      id: string;
      logo: {
        desktopView: {
          /** The svg of the location. */
          svg: string;
          /** The location of the location. */
          location: string;
        };
        mobileView: {
          /** The svg of the location. */
          svg: string;
          /** The location of the location. */
          location: string;
        };
        darkDesktopView: {
          /** The svg of the location. */
          svg: string;
          /** The location of the location. */
          location: string;
        };
        darkMobileView: {
          /** The svg of the location. */
          svg: string;
          /** The location of the location. */
          location: string;
        };
      };
      /** The vars of the theme. */
      vars?: {
        [key: string]: any;
      };
    };
    /** Preferences specific to dashboard behavior */
    dashboard: {
      [key: string]: any;
    };
  };
};
export type GetOrgPreferencesApiArg = {
  orgId: string;
};
export type AddTeamToOrgApiResponse = /** status 201 Team added to organization or team tombstoned */
  | {
      /** Current page number of the result set. */
      page?: number;
      /** Number of items per page. */
      page_size?: number;
      /** Total number of items available. */
      total_count?: number;
      /** The teams organizations mapping of the teamsorganizationsmappingpage. */
      teamsOrganizationsMapping?: {
        id?: string;
        orgId?: string;
        team_id?: string;
        created_at?: string;
        updated_at?: string;
        deleted_at?: string;
      }[];
    }
  | {
      /** Current page number of the result set. */
      page?: number;
      /** Number of items per page. */
      page_size?: number;
      /** Total number of items available. */
      total_count?: number;
      /** The teams of the teamspage. */
      teams?: {
        id?: string;
        name?: string;
        description?: string;
        owner?: string;
        metadata?: {
          [key: string]: string;
        };
        created_at?: string;
        updated_at?: string;
        deleted_at?: string;
      }[];
    };
export type AddTeamToOrgApiArg = {
  orgId: string;
  teamId: string;
  body: {
    /** Internal action to perform on the team resource. */
    action?: "delete";
  };
};
export type GetTeamByIdApiResponse = /** status 200 Team */ {
  /** Team ID */
  id: string;
  /** Team name */
  name: string;
  /** Team description */
  description?: string;
  /** User ID of the owner of the team */
  owner?: string;
  /** Additional metadata for the team */
  metadata?: object;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type GetTeamByIdApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
};
export type UpdateTeamApiResponse = /** status 200 Updated team */ {
  /** Team ID */
  id: string;
  /** Team name */
  name: string;
  /** Team description */
  description?: string;
  /** User ID of the owner of the team */
  owner?: string;
  /** Additional metadata for the team */
  metadata?: object;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type UpdateTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
  /** Body for updating a team */
  body: {
    /** Updated team name */
    name?: string;
    /** Updated team description */
    description?: string;
  };
};
export type DeleteTeamApiResponse = unknown;
export type DeleteTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
};
export type RemoveTeamFromOrgApiResponse = /** status 200 Team removed from organization */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The teams organizations mapping of the teamsorganizationsmappingpage. */
  teamsOrganizationsMapping?: {
    id?: string;
    orgId?: string;
    team_id?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  }[];
};
export type RemoveTeamFromOrgApiArg = {
  orgId: string;
  teamId: string;
};
export type AddUserToOrgApiResponse = /** status 201 User added to organization */ {
  [key: string]: any;
};
export type AddUserToOrgApiArg = {
  orgId: string;
  userId: string;
};
export type DeleteUserFromOrgApiResponse = unknown;
export type DeleteUserFromOrgApiArg = {
  orgId: string;
  userId: string;
};
export type GetTeamsApiResponse = /** status 200 Teams */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  /** The teams of the teampage. */
  teams?: {
    /** Team ID */
    id: string;
    /** Team name */
    name: string;
    /** Team description */
    description?: string;
    /** User ID of the owner of the team */
    owner?: string;
    /** Additional metadata for the team */
    metadata?: object;
    created_at?: string;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetTeamsApiArg = {
  /** Organization ID */
  orgId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
};
export type CreateTeamApiResponse = /** status 201 Created team */ {
  /** Team ID */
  id: string;
  /** Team name */
  name: string;
  /** Team description */
  description?: string;
  /** User ID of the owner of the team */
  owner?: string;
  /** Additional metadata for the team */
  metadata?: object;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type CreateTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Body for creating a team */
  body: {
    /** Team name. Provide a meaningful name that represents this team. */
    name: string;
    /** A detailed description of the team's purpose and responsibilities. */
    description?: string;
  };
};
export type GetTeamUsersApiResponse = /** status 200 Team users mapping */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  /** The teams users mapping of the teamsusersmappingpage. */
  teamsUsersMapping?: {
    id?: string;
    team_id?: string;
    /** user's email or username */
    user_id?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetTeamUsersApiArg = {
  /** Team ID */
  teamId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
};
export type AddUserToTeamApiResponse = /** status 201 User added to team */ {
  id?: string;
  team_id?: string;
  /** user's email or username */
  user_id?: string;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type AddUserToTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
  /** User ID */
  userId: string;
};
export type RemoveUserFromTeamApiResponse = unknown;
export type RemoveUserFromTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
  /** User ID */
  userId: string;
};
export type ListUsersNotInTeamApiResponse = /** status 200 Users not currently in the team */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The data of the teammemberspage. */
  data?: {
    [key: string]: any;
  }[];
};
export type ListUsersNotInTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
};
export type GetUsersForOrgApiResponse = /** status 200 Paginated list of organization users */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The data of the userspageforadmin. */
  data?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    user_id: string;
    /** Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    first_name: string;
    /** User's last name */
    last_name: string;
    /** URL to user's avatar image */
    avatar_url?: string;
    /** User account status */
    status: "active" | "inactive" | "pending" | "anonymous";
    /** User's biography or description */
    bio?: string;
    /** User's country information stored as JSONB */
    country?: {
      [key: string]: any;
    };
    /** User's region information stored as JSONB */
    region?: {
      [key: string]: any;
    };
    /** User preferences stored as JSONB */
    preferences?: {
      /** The mesh adapters of the preference. */
      meshAdapters?: object[];
      grafana?: {
        /** Grafana URL for the user configuration. */
        grafanaURL?: string;
        /** Grafana API key for the user configuration. */
        grafanaAPIKey?: string;
        /** Selected Grafana board configurations for the user. */
        selectedBoardsConfigs?: {
          /** Placeholder for GrafanaBoard definition (define fields as needed) */
          board?: object;
          /** Panels selected for the Grafana board configuration. */
          panels?: object[];
          /** Template variables applied to the selected Grafana board configuration. */
          templateVars?: string[];
        }[];
      };
      prometheus?: {
        /** The prometheus u r l of the prometheus. */
        prometheusURL?: string;
        /** The selected prometheus boards configs of the prometheus. */
        selectedPrometheusBoardsConfigs?: {
          /** Placeholder for GrafanaBoard definition (define fields as needed) */
          board?: object;
          /** Panels selected for the Grafana board configuration. */
          panels?: object[];
          /** Template variables applied to the selected Grafana board configuration. */
          templateVars?: string[];
        }[];
      };
      loadTestPrefs?: {
        /** Concurrent requests */
        c?: number;
        /** Queries per second */
        qps?: number;
        /** Duration */
        t?: string;
        /** Load generator */
        gen?: string;
      };
      /** The anonymous usage stats of the preference. */
      anonymousUsageStats: boolean;
      /** The anonymous perf results of the preference. */
      anonymousPerfResults: boolean;
      /** Timestamp of when the resource was last updated. */
      updated_at: string;
      /** The dashboard preferences of the preference. */
      dashboardPreferences: {
        [key: string]: any;
      };
      /** ID of the associated selectedOrganization. */
      selectedOrganizationId: string;
      /** The selected workspace for organizations of the preference. */
      selectedWorkspaceForOrganizations: {
        [key: string]: string;
      };
      /** The users extension preferences of the preference. */
      usersExtensionPreferences: {
        [key: string]: any;
      };
      /** The remote provider preferences of the preference. */
      remoteProviderPreferences: {
        [key: string]: any;
      };
    };
    /** Timestamp when user accepted terms and conditions */
    accepted_terms_at?: string;
    /** Timestamp of user's first login */
    first_login_time?: string;
    /** Timestamp of user's most recent login */
    last_login_time: string;
    /** Timestamp when the user record was created */
    created_at: string;
    /** Timestamp when the user record was last updated */
    updated_at: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deleted_at: string | null;
    /** List of global roles assigned to the user */
    role_names?: (
      | "admin"
      | "meshmap"
      | "curator"
      | "team admin"
      | "workspace admin"
      | "workspace manager"
      | "organization admin"
      | "user"
    )[];
    /** Teams the user belongs to with role information */
    teams?: {
      /** Team memberships for the user with their assigned roles. */
      teams_with_roles?: object[];
      /** Total number of team memberships returned for the user. */
      total_count?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizations_with_roles?: object[];
      /** Total number of organization memberships returned for the user. */
      total_count?: number;
    };
  }[];
};
export type GetUsersForOrgApiArg = {
  /** Organization ID */
  orgId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get filtered reponses */
  filter?: string;
  /** Optional team filter when listing organization users */
  teamId?: string;
};
export type GetUsersApiResponse = /** status 200 Paginated list of public users */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The data of the userspagefornonadmin. */
  data?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    user_id: string;
    /** Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    first_name: string;
    /** User's last name */
    last_name: string;
    /** URL to user's avatar image */
    avatar_url?: string;
    /** User account status */
    status: "active" | "inactive" | "pending" | "anonymous";
    /** User's biography or description */
    bio?: string;
    /** User's country information stored as JSONB */
    country?: {
      [key: string]: any;
    };
    /** User's region information stored as JSONB */
    region?: {
      [key: string]: any;
    };
    /** User preferences stored as JSONB */
    preferences?: {
      /** The mesh adapters of the preference. */
      meshAdapters?: object[];
      grafana?: {
        /** Grafana URL for the user configuration. */
        grafanaURL?: string;
        /** Grafana API key for the user configuration. */
        grafanaAPIKey?: string;
        /** Selected Grafana board configurations for the user. */
        selectedBoardsConfigs?: {
          /** Placeholder for GrafanaBoard definition (define fields as needed) */
          board?: object;
          /** Panels selected for the Grafana board configuration. */
          panels?: object[];
          /** Template variables applied to the selected Grafana board configuration. */
          templateVars?: string[];
        }[];
      };
      prometheus?: {
        /** The prometheus u r l of the prometheus. */
        prometheusURL?: string;
        /** The selected prometheus boards configs of the prometheus. */
        selectedPrometheusBoardsConfigs?: {
          /** Placeholder for GrafanaBoard definition (define fields as needed) */
          board?: object;
          /** Panels selected for the Grafana board configuration. */
          panels?: object[];
          /** Template variables applied to the selected Grafana board configuration. */
          templateVars?: string[];
        }[];
      };
      loadTestPrefs?: {
        /** Concurrent requests */
        c?: number;
        /** Queries per second */
        qps?: number;
        /** Duration */
        t?: string;
        /** Load generator */
        gen?: string;
      };
      /** The anonymous usage stats of the preference. */
      anonymousUsageStats: boolean;
      /** The anonymous perf results of the preference. */
      anonymousPerfResults: boolean;
      /** Timestamp of when the resource was last updated. */
      updated_at: string;
      /** The dashboard preferences of the preference. */
      dashboardPreferences: {
        [key: string]: any;
      };
      /** ID of the associated selectedOrganization. */
      selectedOrganizationId: string;
      /** The selected workspace for organizations of the preference. */
      selectedWorkspaceForOrganizations: {
        [key: string]: string;
      };
      /** The users extension preferences of the preference. */
      usersExtensionPreferences: {
        [key: string]: any;
      };
      /** The remote provider preferences of the preference. */
      remoteProviderPreferences: {
        [key: string]: any;
      };
    };
    /** Timestamp when user accepted terms and conditions */
    accepted_terms_at?: string;
    /** Timestamp of user's first login */
    first_login_time?: string;
    /** Timestamp of user's most recent login */
    last_login_time: string;
    /** Timestamp when the user record was created */
    created_at: string;
    /** Timestamp when the user record was last updated */
    updated_at: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deleted_at: string | null;
    /** List of global roles assigned to the user */
    role_names?: (
      | "admin"
      | "meshmap"
      | "curator"
      | "team admin"
      | "workspace admin"
      | "workspace manager"
      | "organization admin"
      | "user"
    )[];
    /** Teams the user belongs to with role information */
    teams?: {
      /** Team memberships for the user with their assigned roles. */
      teams_with_roles?: object[];
      /** Total number of team memberships returned for the user. */
      total_count?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizations_with_roles?: object[];
      /** Total number of organization memberships returned for the user. */
      total_count?: number;
    };
  }[];
};
export type GetUsersApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get filtered reponses */
  filter?: string;
};
export type GetUserProfileByIdApiResponse = /** status 200 User profile for the requested ID */ {
  /** Unique identifier for the user */
  id: string;
  /** User identifier (username or external ID) */
  user_id: string;
  /** Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github) */
  provider: string;
  /** User's email address */
  email: string;
  /** User's first name */
  first_name: string;
  /** User's last name */
  last_name: string;
  /** URL to user's avatar image */
  avatar_url?: string;
  /** User account status */
  status: "active" | "inactive" | "pending" | "anonymous";
  /** User's biography or description */
  bio?: string;
  /** User's country information stored as JSONB */
  country?: {
    [key: string]: any;
  };
  /** User's region information stored as JSONB */
  region?: {
    [key: string]: any;
  };
  /** User preferences stored as JSONB */
  preferences?: {
    /** The mesh adapters of the preference. */
    meshAdapters?: object[];
    grafana?: {
      /** Grafana URL for the user configuration. */
      grafanaURL?: string;
      /** Grafana API key for the user configuration. */
      grafanaAPIKey?: string;
      /** Selected Grafana board configurations for the user. */
      selectedBoardsConfigs?: {
        /** Placeholder for GrafanaBoard definition (define fields as needed) */
        board?: object;
        /** Panels selected for the Grafana board configuration. */
        panels?: object[];
        /** Template variables applied to the selected Grafana board configuration. */
        templateVars?: string[];
      }[];
    };
    prometheus?: {
      /** The prometheus u r l of the prometheus. */
      prometheusURL?: string;
      /** The selected prometheus boards configs of the prometheus. */
      selectedPrometheusBoardsConfigs?: {
        /** Placeholder for GrafanaBoard definition (define fields as needed) */
        board?: object;
        /** Panels selected for the Grafana board configuration. */
        panels?: object[];
        /** Template variables applied to the selected Grafana board configuration. */
        templateVars?: string[];
      }[];
    };
    loadTestPrefs?: {
      /** Concurrent requests */
      c?: number;
      /** Queries per second */
      qps?: number;
      /** Duration */
      t?: string;
      /** Load generator */
      gen?: string;
    };
    /** The anonymous usage stats of the preference. */
    anonymousUsageStats: boolean;
    /** The anonymous perf results of the preference. */
    anonymousPerfResults: boolean;
    /** Timestamp of when the resource was last updated. */
    updated_at: string;
    /** The dashboard preferences of the preference. */
    dashboardPreferences: {
      [key: string]: any;
    };
    /** ID of the associated selectedOrganization. */
    selectedOrganizationId: string;
    /** The selected workspace for organizations of the preference. */
    selectedWorkspaceForOrganizations: {
      [key: string]: string;
    };
    /** The users extension preferences of the preference. */
    usersExtensionPreferences: {
      [key: string]: any;
    };
    /** The remote provider preferences of the preference. */
    remoteProviderPreferences: {
      [key: string]: any;
    };
  };
  /** Timestamp when user accepted terms and conditions */
  accepted_terms_at?: string;
  /** Timestamp of user's first login */
  first_login_time?: string;
  /** Timestamp of user's most recent login */
  last_login_time: string;
  /** Timestamp when the user record was created */
  created_at: string;
  /** Timestamp when the user record was last updated */
  updated_at: string;
  /** Various online profiles associated with the user account */
  socials?: {
    /** The site of the social. */
    site: string;
    /** The link of the social. */
    link: string;
  }[];
  /** Timestamp when the user record was soft-deleted (null if not deleted) */
  deleted_at: string | null;
  /** List of global roles assigned to the user */
  role_names?: (
    | "admin"
    | "meshmap"
    | "curator"
    | "team admin"
    | "workspace admin"
    | "workspace manager"
    | "organization admin"
    | "user"
  )[];
  /** Teams the user belongs to with role information */
  teams?: {
    /** Team memberships for the user with their assigned roles. */
    teams_with_roles?: object[];
    /** Total number of team memberships returned for the user. */
    total_count?: number;
  };
  /** Organizations the user belongs to with role information */
  organizations?: {
    /** Organization memberships for the user with their assigned roles. */
    organizations_with_roles?: object[];
    /** Total number of organization memberships returned for the user. */
    total_count?: number;
  };
};
export type GetUserProfileByIdApiArg = {
  /** User ID */
  id: string;
};
export type GetUserApiResponse = /** status 200 Current user profile and role context */ {
  /** Unique identifier for the user */
  id: string;
  /** User identifier (username or external ID) */
  user_id: string;
  /** Authentication provider (e.g., Layer5 Cloud, Twitter, Facebook, Github) */
  provider: string;
  /** User's email address */
  email: string;
  /** User's first name */
  first_name: string;
  /** User's last name */
  last_name: string;
  /** URL to user's avatar image */
  avatar_url?: string;
  /** User account status */
  status: "active" | "inactive" | "pending" | "anonymous";
  /** User's biography or description */
  bio?: string;
  /** User's country information stored as JSONB */
  country?: {
    [key: string]: any;
  };
  /** User's region information stored as JSONB */
  region?: {
    [key: string]: any;
  };
  /** User preferences stored as JSONB */
  preferences?: {
    /** The mesh adapters of the preference. */
    meshAdapters?: object[];
    grafana?: {
      /** Grafana URL for the user configuration. */
      grafanaURL?: string;
      /** Grafana API key for the user configuration. */
      grafanaAPIKey?: string;
      /** Selected Grafana board configurations for the user. */
      selectedBoardsConfigs?: {
        /** Placeholder for GrafanaBoard definition (define fields as needed) */
        board?: object;
        /** Panels selected for the Grafana board configuration. */
        panels?: object[];
        /** Template variables applied to the selected Grafana board configuration. */
        templateVars?: string[];
      }[];
    };
    prometheus?: {
      /** The prometheus u r l of the prometheus. */
      prometheusURL?: string;
      /** The selected prometheus boards configs of the prometheus. */
      selectedPrometheusBoardsConfigs?: {
        /** Placeholder for GrafanaBoard definition (define fields as needed) */
        board?: object;
        /** Panels selected for the Grafana board configuration. */
        panels?: object[];
        /** Template variables applied to the selected Grafana board configuration. */
        templateVars?: string[];
      }[];
    };
    loadTestPrefs?: {
      /** Concurrent requests */
      c?: number;
      /** Queries per second */
      qps?: number;
      /** Duration */
      t?: string;
      /** Load generator */
      gen?: string;
    };
    /** The anonymous usage stats of the preference. */
    anonymousUsageStats: boolean;
    /** The anonymous perf results of the preference. */
    anonymousPerfResults: boolean;
    /** Timestamp of when the resource was last updated. */
    updated_at: string;
    /** The dashboard preferences of the preference. */
    dashboardPreferences: {
      [key: string]: any;
    };
    /** ID of the associated selectedOrganization. */
    selectedOrganizationId: string;
    /** The selected workspace for organizations of the preference. */
    selectedWorkspaceForOrganizations: {
      [key: string]: string;
    };
    /** The users extension preferences of the preference. */
    usersExtensionPreferences: {
      [key: string]: any;
    };
    /** The remote provider preferences of the preference. */
    remoteProviderPreferences: {
      [key: string]: any;
    };
  };
  /** Timestamp when user accepted terms and conditions */
  accepted_terms_at?: string;
  /** Timestamp of user's first login */
  first_login_time?: string;
  /** Timestamp of user's most recent login */
  last_login_time: string;
  /** Timestamp when the user record was created */
  created_at: string;
  /** Timestamp when the user record was last updated */
  updated_at: string;
  /** Various online profiles associated with the user account */
  socials?: {
    /** The site of the social. */
    site: string;
    /** The link of the social. */
    link: string;
  }[];
  /** Timestamp when the user record was soft-deleted (null if not deleted) */
  deleted_at: string | null;
  /** List of global roles assigned to the user */
  role_names?: (
    | "admin"
    | "meshmap"
    | "curator"
    | "team admin"
    | "workspace admin"
    | "workspace manager"
    | "organization admin"
    | "user"
  )[];
  /** Teams the user belongs to with role information */
  teams?: {
    /** Team memberships for the user with their assigned roles. */
    teams_with_roles?: object[];
    /** Total number of team memberships returned for the user. */
    total_count?: number;
  };
  /** Organizations the user belongs to with role information */
  organizations?: {
    /** Organization memberships for the user with their assigned roles. */
    organizations_with_roles?: object[];
    /** Total number of organization memberships returned for the user. */
    total_count?: number;
  };
};
export type GetUserApiArg = void;
export type GetConnectionsApiResponse = /** status 200 Paginated list of connections with summary information */ {
  /** List of connections on this page */
  connections: {
    /** Connection ID */
    id: string;
    /** Connection Name */
    name: string;
    /** Associated Credential ID */
    credential_id?: string;
    /** Connection Type (platform, telemetry, collaboration) */
    type: string;
    /** Connection Subtype (cloud, identity, metrics, chat, git, orchestration) */
    sub_type: string;
    /** Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github) */
    kind: string;
    /** Additional connection metadata */
    metadata?: object;
    /** Connection Status */
    status:
      | "discovered"
      | "registered"
      | "connected"
      | "ignored"
      | "maintenance"
      | "disconnected"
      | "deleted"
      | "not found";
    /** User ID who owns this connection */
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
    /** Associated environments for this connection */
    environments?: {
      /** ID */
      id: string;
      /** Specifies the version of the schema to which the environment conforms. */
      schemaVersion: string;
      /** Environment name */
      name: string;
      /** Environment description */
      description: string;
      /** Environment organization ID */
      organization_id: string;
      /** Environment owner */
      owner?: string;
      /** Timestamp when the resource was created. */
      created_at?: string;
      /** Additional metadata associated with the environment. */
      metadata?: object;
      /** Timestamp when the resource was updated. */
      updated_at?: string;
      /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
      deleted_at?: string | null;
    }[];
    /** Specifies the version of the schema used for the definition. */
    schemaVersion: string;
  }[];
  /** Total number of connections on all pages */
  total_count: number;
  /** Current page number */
  page: number;
  /** Number of elements per page */
  page_size: number;
  /** Aggregate count of connections grouped by status */
  statusSummary?: {
    [key: string]: number;
  };
};
export type GetConnectionsApiArg = {
  /** Page number */
  page?: number;
  /** Number of items per page */
  pagesize?: number;
  /** Search term */
  search?: string;
  /** Sort order */
  order?: string;
  /** Filter connections (general filter string) */
  filter?: string;
  /** Filter by connection kind (e.g., kubernetes, prometheus, grafana) */
  kind?: string[];
  /** Filter by connection status */
  status?: (
    | "discovered"
    | "registered"
    | "connected"
    | "ignored"
    | "maintenance"
    | "disconnected"
    | "deleted"
    | "not found"
  )[];
  /** Filter by connection type */
  type?: string[];
  /** Filter by connection name (partial match supported) */
  name?: string;
};
export type RegisterConnectionApiResponse = /** status 201 Connection registered */ {
  /** Connection ID */
  id: string;
  /** Connection Name */
  name: string;
  /** Associated Credential ID */
  credential_id?: string;
  /** Connection Type (platform, telemetry, collaboration) */
  type: string;
  /** Connection Subtype (cloud, identity, metrics, chat, git, orchestration) */
  sub_type: string;
  /** Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github) */
  kind: string;
  /** Additional connection metadata */
  metadata?: object;
  /** Connection Status */
  status:
    | "discovered"
    | "registered"
    | "connected"
    | "ignored"
    | "maintenance"
    | "disconnected"
    | "deleted"
    | "not found";
  /** User ID who owns this connection */
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
  /** Associated environments for this connection */
  environments?: {
    /** ID */
    id: string;
    /** Specifies the version of the schema to which the environment conforms. */
    schemaVersion: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deleted_at?: string | null;
  }[];
  /** Specifies the version of the schema used for the definition. */
  schemaVersion: string;
};
export type RegisterConnectionApiArg = {
  body: {
    /** Connection ID */
    id?: string;
    /** Connection name */
    name: string;
    /** Connection kind */
    kind: string;
    /** Connection type */
    type: string;
    /** Connection sub-type */
    subType: string;
    /** Credential secret data */
    credentialSecret?: object;
    /** Connection metadata */
    metadata?: object;
    /** Connection status */
    status: string;
    /** Associated credential ID */
    credentialId?: string;
  };
};
export type GetConnectionByIdApiResponse = /** status 200 Connection details */ {
  /** Connection ID */
  id: string;
  /** Connection Name */
  name: string;
  /** Associated Credential ID */
  credential_id?: string;
  /** Connection Type (platform, telemetry, collaboration) */
  type: string;
  /** Connection Subtype (cloud, identity, metrics, chat, git, orchestration) */
  sub_type: string;
  /** Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github) */
  kind: string;
  /** Additional connection metadata */
  metadata?: object;
  /** Connection Status */
  status:
    | "discovered"
    | "registered"
    | "connected"
    | "ignored"
    | "maintenance"
    | "disconnected"
    | "deleted"
    | "not found";
  /** User ID who owns this connection */
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
  /** Associated environments for this connection */
  environments?: {
    /** ID */
    id: string;
    /** Specifies the version of the schema to which the environment conforms. */
    schemaVersion: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deleted_at?: string | null;
  }[];
  /** Specifies the version of the schema used for the definition. */
  schemaVersion: string;
};
export type GetConnectionByIdApiArg = {
  /** Connection ID */
  connectionId: string;
};
export type UpdateConnectionApiResponse = /** status 200 Connection updated */ {
  /** Connection ID */
  id: string;
  /** Connection Name */
  name: string;
  /** Associated Credential ID */
  credential_id?: string;
  /** Connection Type (platform, telemetry, collaboration) */
  type: string;
  /** Connection Subtype (cloud, identity, metrics, chat, git, orchestration) */
  sub_type: string;
  /** Connection Kind (meshery, kubernetes, prometheus, grafana, gke, aws, azure, slack, github) */
  kind: string;
  /** Additional connection metadata */
  metadata?: object;
  /** Connection Status */
  status:
    | "discovered"
    | "registered"
    | "connected"
    | "ignored"
    | "maintenance"
    | "disconnected"
    | "deleted"
    | "not found";
  /** User ID who owns this connection */
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
  /** Associated environments for this connection */
  environments?: {
    /** ID */
    id: string;
    /** Specifies the version of the schema to which the environment conforms. */
    schemaVersion: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deleted_at?: string | null;
  }[];
  /** Specifies the version of the schema used for the definition. */
  schemaVersion: string;
};
export type UpdateConnectionApiArg = {
  /** Connection ID */
  connectionId: string;
  body: {
    /** Connection ID */
    id?: string;
    /** Connection name */
    name: string;
    /** Connection kind */
    kind: string;
    /** Connection type */
    type: string;
    /** Connection sub-type */
    subType: string;
    /** Credential secret data */
    credentialSecret?: object;
    /** Connection metadata */
    metadata?: object;
    /** Connection status */
    status: string;
    /** Associated credential ID */
    credentialId?: string;
  };
};
export type DeleteConnectionApiResponse = unknown;
export type DeleteConnectionApiArg = {
  /** Connection ID */
  connectionId: string;
};
export type DeleteMesheryConnectionApiResponse = unknown;
export type DeleteMesheryConnectionApiArg = {
  /** Meshery server ID */
  mesheryServerId: string;
};
export type GetKubernetesContextApiResponse = /** status 200 Kubernetes context */ object;
export type GetKubernetesContextApiArg = {
  /** Connection ID */
  connectionId: string;
};
export type AddConnectionToEnvironmentApiResponse = unknown;
export type AddConnectionToEnvironmentApiArg = {
  /** Environment ID */
  environmentId: string;
  /** Connection ID */
  connectionId: string;
};
export type RemoveConnectionFromEnvironmentApiResponse = unknown;
export type RemoveConnectionFromEnvironmentApiArg = {
  /** Environment ID */
  environmentId: string;
  /** Connection ID */
  connectionId: string;
};
export type ImportDesignApiResponse = /** status 200 Successful Import */ {
  message?: string;
};
export type ImportDesignApiArg = {
  body: {
    /** Supported formats: Kubernetes Manifests, Helm Charts, Docker Compose, and Meshery Designs. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    file?: string;
    /** The name of the pattern file being imported. */
    fileName?: string;
    /** Provide a name for your design file. This name will help you identify the file more easily. You can also change the name of your design after importing it. */
    name?: string;
    /** Provide the URL of the file you want to import. This should be a direct URL to a single file, for example: https://raw.github.com/your-design-file.yaml. Also, ensure that design is in a supported format: Kubernetes Manifest, Helm Chart, Docker Compose, or Meshery Design. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    url?: string;
  };
};
export type DeleteEventsByIdApiResponse = unknown;
export type DeleteEventsByIdApiArg = {
  /** ID of the event to delete */
  id: string;
};
export type PostEventsApiResponse = unknown;
export type PostEventsApiArg = {
  body: object;
};
export type PostEventsDeleteApiResponse = /** status 200 event deleted */ {
  deleted?: string[];
};
export type PostEventsDeleteApiArg = {
  body: {
    /** The ids of the bulkdeleterequest. */
    ids: string[];
  };
};
export type PutEventsStatusApiResponse = /** status 200 Events updated */ {
  updated?: string[];
};
export type PutEventsStatusApiArg = {
  body: {
    /** The ids of the bulkupdatestatusrequest. */
    ids: string[];
    /** Current status of the resource. */
    status: string;
  };
};
export type PutEventsByIdStatusApiResponse = /** status 200 Event status updated */ {
  message?: string;
  event_id?: string;
  status?: string;
};
export type PutEventsByIdStatusApiArg = {
  /** ID of the event */
  id: string;
  body: {
    /** Current status of the resource. */
    status: string;
  };
};
export const {
  useCreateEnvironmentMutation,
  useGetEnvironmentsQuery,
  useGetEnvironmentByIdQuery,
  useUpdateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useGetEnvironmentConnectionsQuery,
  usePostEvaluateMutation,
  useGetUserKeysQuery,
  useRegisterMeshmodelsMutation,
  useGetOrgsQuery,
  useCreateOrgMutation,
  useGetOrgByDomainQuery,
  useGetOrgQuery,
  useDeleteOrgMutation,
  useHandleUpdateOrgMutation,
  useGetOrgPreferencesQuery,
  useAddTeamToOrgMutation,
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useRemoveTeamFromOrgMutation,
  useAddUserToOrgMutation,
  useDeleteUserFromOrgMutation,
  useGetTeamsQuery,
  useCreateTeamMutation,
  useGetTeamUsersQuery,
  useAddUserToTeamMutation,
  useRemoveUserFromTeamMutation,
  useListUsersNotInTeamQuery,
  useGetUsersForOrgQuery,
  useGetUsersQuery,
  useGetUserProfileByIdQuery,
  useGetUserQuery,
  useGetConnectionsQuery,
  useRegisterConnectionMutation,
  useGetConnectionByIdQuery,
  useUpdateConnectionMutation,
  useDeleteConnectionMutation,
  useDeleteMesheryConnectionMutation,
  useGetKubernetesContextQuery,
  useAddConnectionToEnvironmentMutation,
  useRemoveConnectionFromEnvironmentMutation,
  useImportDesignMutation,
  useDeleteEventsByIdMutation,
  usePostEventsMutation,
  usePostEventsDeleteMutation,
  usePutEventsStatusMutation,
  usePutEventsByIdStatusMutation,
} = injectedRtkApi;

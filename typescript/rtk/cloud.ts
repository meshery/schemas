import { cloudBaseApi as api } from "./api";
export const addTagTypes = [
  "Academy_API_Academy",
  "Academy_API_other",
  "Badge_Badge",
  "Connection_API_Connections",
  "credential_credentials",
  "Design_designs",
  "Design_other",
  "Environment_environments",
  "Events_other",
  "Feature_Features",
  "Invitation_Invitation",
  "Key_users",
  "Key_Key",
  "Keychain_Keychain",
  "Model_other",
  "Organization_other",
  "Plan_Plans",
  "role_roles",
  "schedule_scheduler",
  "Subscription_subscription",
  "Subscription_other",
  "Team_teams",
  "Workspace_workspaces",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getMyAcademyCirricula: build.query<GetMyAcademyCirriculaApiResponse, GetMyAcademyCirriculaApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/cirricula/registered`,
          params: {
            contentType: queryArg.contentType,
            orgId: queryArg.orgId,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      createAcademyCurricula: build.mutation<CreateAcademyCurriculaApiResponse, CreateAcademyCurriculaApiArg>({
        query: (queryArg) => ({ url: `/api/academy/curricula`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAcademyCirricula: build.query<GetAcademyCirriculaApiResponse, GetAcademyCirriculaApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/cirricula`,
          params: {
            contentType: queryArg.contentType,
            visibility: queryArg.visibility,
            level: queryArg.level,
            orgId: queryArg.orgId,
            category: queryArg.category,
            status: queryArg.status,
            search: queryArg.search,
            sort: queryArg.sort,
            order: queryArg.order,
            pagesize: queryArg.pagesize,
            page: queryArg.page,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      getApiAcademyByTypeAndOrgIdSlug: build.query<
        GetApiAcademyByTypeAndOrgIdSlugApiResponse,
        GetApiAcademyByTypeAndOrgIdSlugApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/${queryArg["type"]}/${queryArg.orgId}/${queryArg.slug}` }),
        providesTags: ["Academy_API_other"],
      }),
      registerToAcademyContent: build.mutation<RegisterToAcademyContentApiResponse, RegisterToAcademyContentApiArg>({
        query: (queryArg) => ({ url: `/api/academy/register`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      withdrawFromAcademyContent: build.mutation<
        WithdrawFromAcademyContentApiResponse,
        WithdrawFromAcademyContentApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/curricula/registrations/${queryArg.id}/withdraw`, method: "POST" }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      updateAcademyCurriculaById: build.mutation<
        UpdateAcademyCurriculaByIdApiResponse,
        UpdateAcademyCurriculaByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/curricula/${queryArg.id}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      deleteAcademyCurriculaById: build.mutation<
        DeleteAcademyCurriculaByIdApiResponse,
        DeleteAcademyCurriculaByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/curricula/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAcademyCurriculaById: build.query<GetAcademyCurriculaByIdApiResponse, GetAcademyCurriculaByIdApiArg>({
        query: (queryArg) => ({ url: `/api/academy/curricula/${queryArg.id}` }),
        providesTags: ["Academy_API_Academy"],
      }),
      getApiAcademyRegistrationsByContentId: build.query<
        GetApiAcademyRegistrationsByContentIdApiResponse,
        GetApiAcademyRegistrationsByContentIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/academy/registrations/${queryArg.contentId}`,
          params: {
            status: queryArg.status,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      updateCurrentItemInProgressTracker: build.mutation<
        UpdateCurrentItemInProgressTrackerApiResponse,
        UpdateCurrentItemInProgressTrackerApiArg
      >({
        query: (queryArg) => ({
          url: `/api/academy/registrations/${queryArg.registrationId}/progress-tracker/update-current-item`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getTestByAbsPath: build.query<GetTestByAbsPathApiResponse, GetTestByAbsPathApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/registrations/tests`,
          params: {
            absPath: queryArg.absPath,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      startTestById: build.mutation<StartTestByIdApiResponse, StartTestByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/registrations/test-sessions/start`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAllTestSessionsForRegistration: build.query<
        GetAllTestSessionsForRegistrationApiResponse,
        GetAllTestSessionsForRegistrationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/academy/registrations/${queryArg.id}/test-sessions`,
          params: {
            testAbsPath: queryArg.testAbsPath,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      submitQuiz: build.mutation<SubmitQuizApiResponse, SubmitQuizApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/registrations/test-sessions/submit`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAcademyAdminSummary: build.query<GetAcademyAdminSummaryApiResponse, GetAcademyAdminSummaryApiArg>({
        query: () => ({ url: `/api/academy/admin/summary` }),
        providesTags: ["Academy_API_Academy"],
      }),
      getAcademyAdminRegistrations: build.query<
        GetAcademyAdminRegistrationsApiResponse,
        GetAcademyAdminRegistrationsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/academy/admin/registrations`,
          params: {
            pagesize: queryArg.pagesize,
            page: queryArg.page,
            content_type: queryArg.contentType,
            status: queryArg.status,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      getCertificateById: build.query<GetCertificateByIdApiResponse, GetCertificateByIdApiArg>({
        query: (queryArg) => ({ url: `/api/academy/certificates/${queryArg.certificateId}` }),
        providesTags: ["Academy_API_Academy"],
      }),
      deleteBadgeById: build.mutation<DeleteBadgeByIdApiResponse, DeleteBadgeByIdApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Badge_Badge"],
      }),
      getBadgeById: build.query<GetBadgeByIdApiResponse, GetBadgeByIdApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges/${queryArg.id}` }),
        providesTags: ["Badge_Badge"],
      }),
      createOrUpdateBadge: build.mutation<CreateOrUpdateBadgeApiResponse, CreateOrUpdateBadgeApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Badge_Badge"],
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
      getUserCredentials: build.query<GetUserCredentialsApiResponse, GetUserCredentialsApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/credentials`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["credential_credentials"],
      }),
      saveUserCredential: build.mutation<SaveUserCredentialApiResponse, SaveUserCredentialApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/credentials`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["credential_credentials"],
      }),
      updateUserCredential: build.mutation<UpdateUserCredentialApiResponse, UpdateUserCredentialApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/credentials`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["credential_credentials"],
      }),
      getCredentialById: build.query<GetCredentialByIdApiResponse, GetCredentialByIdApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/credentials/${queryArg.id}` }),
        providesTags: ["credential_credentials"],
      }),
      deleteUserCredential: build.mutation<DeleteUserCredentialApiResponse, DeleteUserCredentialApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/credentials/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["credential_credentials"],
      }),
      getPatterns: build.query<GetPatternsApiResponse, GetPatternsApiArg>({
        query: (queryArg) => ({
          url: `/api/content/patterns`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
            visibility: queryArg.visibility,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      upsertPattern: build.mutation<UpsertPatternApiResponse, UpsertPatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      deletePatterns: build.mutation<DeletePatternsApiResponse, DeletePatternsApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns`, method: "DELETE", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      getPatternResources: build.query<GetPatternResourcesApiResponse, GetPatternResourcesApiArg>({
        query: (queryArg) => ({
          url: `/api/content/patterns/resource`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      upsertPatternResource: build.mutation<UpsertPatternResourceApiResponse, UpsertPatternResourceApiArg>({
        query: () => ({ url: `/api/content/patterns/resource`, method: "POST" }),
        invalidatesTags: ["Design_designs"],
      }),
      getPatternResource: build.query<GetPatternResourceApiResponse, GetPatternResourceApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/resource/${queryArg.id}` }),
        providesTags: ["Design_designs"],
      }),
      deletePatternResource: build.mutation<DeletePatternResourceApiResponse, DeletePatternResourceApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/resource/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Design_designs"],
      }),
      getPattern: build.query<GetPatternApiResponse, GetPatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/${queryArg.id}` }),
        providesTags: ["Design_designs"],
      }),
      deletePattern: build.mutation<DeletePatternApiResponse, DeletePatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Design_designs"],
      }),
      clonePattern: build.mutation<ClonePatternApiResponse, ClonePatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/clone/${queryArg.id}`, method: "POST" }),
        invalidatesTags: ["Design_designs"],
      }),
      getDesignPatternFile: build.query<GetDesignPatternFileApiResponse, GetDesignPatternFileApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/download/${queryArg.id}` }),
        providesTags: ["Design_designs"],
      }),
      upsertPatternSourceContent: build.mutation<
        UpsertPatternSourceContentApiResponse,
        UpsertPatternSourceContentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/content/patterns/upload/${queryArg.id}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Design_designs"],
      }),
      importDesign: build.mutation<ImportDesignApiResponse, ImportDesignApiArg>({
        query: (queryArg) => ({ url: `/api/pattern/import`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_other"],
      }),
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
            orgID: queryArg.orgId,
          },
        }),
        providesTags: ["Environment_environments"],
      }),
      deleteEventsById: build.mutation<DeleteEventsByIdApiResponse, DeleteEventsByIdApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Events_other"],
      }),
      postEvents: build.mutation<PostEventsApiResponse, PostEventsApiArg>({
        query: (queryArg) => ({ url: `/events`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Events_other"],
      }),
      deleteEvents: build.mutation<DeleteEventsApiResponse, DeleteEventsApiArg>({
        query: (queryArg) => ({ url: `/events`, method: "DELETE", body: queryArg.body }),
        invalidatesTags: ["Events_other"],
      }),
      putEventsStatus: build.mutation<PutEventsStatusApiResponse, PutEventsStatusApiArg>({
        query: (queryArg) => ({ url: `/events/status`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Events_other"],
      }),
      putEventsByIdStatus: build.mutation<PutEventsByIdStatusApiResponse, PutEventsByIdStatusApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.id}/status`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Events_other"],
      }),
      getFeatures: build.query<GetFeaturesApiResponse, GetFeaturesApiArg>({
        query: () => ({ url: `/api/entitlement/features` }),
        providesTags: ["Feature_Features"],
      }),
      getFeaturesByOrganization: build.query<GetFeaturesByOrganizationApiResponse, GetFeaturesByOrganizationApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/organizations/${queryArg.organizationId}/features`,
        }),
        providesTags: ["Feature_Features"],
      }),
      getInvitation: build.query<GetInvitationApiResponse, GetInvitationApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/invitations/${queryArg.invitationId}` }),
        providesTags: ["Invitation_Invitation"],
      }),
      deleteInvitation: build.mutation<DeleteInvitationApiResponse, DeleteInvitationApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/invitations/${queryArg.invitationId}`, method: "DELETE" }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      updateInvitation: build.mutation<UpdateInvitationApiResponse, UpdateInvitationApiArg>({
        query: (queryArg) => ({
          url: `/api/organizations/invitations/${queryArg.invitationId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      getInvitations: build.query<GetInvitationsApiResponse, GetInvitationsApiArg>({
        query: () => ({ url: `/api/organizations/invitations` }),
        providesTags: ["Invitation_Invitation"],
      }),
      createInvitation: build.mutation<CreateInvitationApiResponse, CreateInvitationApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/invitations`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      acceptInvitation: build.mutation<AcceptInvitationApiResponse, AcceptInvitationApiArg>({
        query: (queryArg) => ({
          url: `/api/organizations/invitations/${queryArg.invitationId}/accept`,
          method: "POST",
        }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      getUserKeys: build.query<GetUserKeysApiResponse, GetUserKeysApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}/users/keys` }),
        providesTags: ["Key_users"],
      }),
      getKeys: build.query<GetKeysApiResponse, GetKeysApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/keys`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["Key_Key"],
      }),
      upsertKey: build.mutation<UpsertKeyApiResponse, UpsertKeyApiArg>({
        query: (queryArg) => ({ url: `/api/auth/keys`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Key_Key"],
      }),
      getKeyById: build.query<GetKeyByIdApiResponse, GetKeyByIdApiArg>({
        query: (queryArg) => ({ url: `/api/auth/key/${queryArg.keyId}` }),
        providesTags: ["Key_Key"],
      }),
      deleteKey: build.mutation<DeleteKeyApiResponse, DeleteKeyApiArg>({
        query: (queryArg) => ({ url: `/api/auth/key/${queryArg.keyId}`, method: "DELETE" }),
        invalidatesTags: ["Key_Key"],
      }),
      getKeychains: build.query<GetKeychainsApiResponse, GetKeychainsApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/keychains`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["Keychain_Keychain"],
      }),
      createKeychain: build.mutation<CreateKeychainApiResponse, CreateKeychainApiArg>({
        query: (queryArg) => ({ url: `/api/auth/keychains`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Keychain_Keychain"],
      }),
      getKeychainById: build.query<GetKeychainByIdApiResponse, GetKeychainByIdApiArg>({
        query: (queryArg) => ({ url: `/api/auth/keychains/${queryArg.keychainId}` }),
        providesTags: ["Keychain_Keychain"],
      }),
      updateKeychain: build.mutation<UpdateKeychainApiResponse, UpdateKeychainApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/keychains/${queryArg.keychainId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Keychain_Keychain"],
      }),
      deleteKeychain: build.mutation<DeleteKeychainApiResponse, DeleteKeychainApiArg>({
        query: (queryArg) => ({ url: `/api/auth/keychains/${queryArg.keychainId}`, method: "DELETE" }),
        invalidatesTags: ["Keychain_Keychain"],
      }),
      addKeyToKeychain: build.mutation<AddKeyToKeychainApiResponse, AddKeyToKeychainApiArg>({
        query: (queryArg) => ({ url: `/api/auth/keychains/${queryArg.keychainId}/${queryArg.keyId}`, method: "POST" }),
        invalidatesTags: ["Keychain_Keychain"],
      }),
      removeKeyFromKeychain: build.mutation<RemoveKeyFromKeychainApiResponse, RemoveKeyFromKeychainApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/keychains/${queryArg.keychainId}/${queryArg.keyId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Keychain_Keychain"],
      }),
      getKeysOfKeychain: build.query<GetKeysOfKeychainApiResponse, GetKeysOfKeychainApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/keychains/${queryArg.keychainId}/keys`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["Keychain_Keychain"],
      }),
      registerMeshmodels: build.mutation<RegisterMeshmodelsApiResponse, RegisterMeshmodelsApiArg>({
        query: (queryArg) => ({ url: `/api/meshmodels/register`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Model_other"],
      }),
      getOrgByDomain: build.query<GetOrgByDomainApiResponse, GetOrgByDomainApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/by-domain`,
          params: {
            domain: queryArg.domain,
          },
        }),
        providesTags: ["Organization_other"],
      }),
      addTeamToOrg: build.mutation<AddTeamToOrgApiResponse, AddTeamToOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Organization_other"],
      }),
      removeTeamFromOrg: build.mutation<RemoveTeamFromOrgApiResponse, RemoveTeamFromOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams/${queryArg.teamId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Organization_other"],
      }),
      getPlans: build.query<GetPlansApiResponse, GetPlansApiArg>({
        query: () => ({ url: `/api/entitlement/plans` }),
        providesTags: ["Plan_Plans"],
      }),
      addRoleHolder: build.mutation<AddRoleHolderApiResponse, AddRoleHolderApiArg>({
        query: (queryArg) => ({ url: `/api/identity/roles`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["role_roles"],
      }),
      deleteRole: build.mutation<DeleteRoleApiResponse, DeleteRoleApiArg>({
        query: (queryArg) => ({ url: `/api/identity/roles/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["role_roles"],
      }),
      getAllRoles: build.query<GetAllRolesApiResponse, GetAllRolesApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["role_roles"],
      }),
      upsertRoles: build.mutation<UpsertRolesApiResponse, UpsertRolesApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["role_roles"],
      }),
      bulkEditRoleHolder: build.mutation<BulkEditRoleHolderApiResponse, BulkEditRoleHolderApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["role_roles"],
      }),
      getRoleKeychains: build.query<GetRoleKeychainsApiResponse, GetRoleKeychainsApiArg>({
        query: (queryArg) => ({ url: `/api/identity/orgs/${queryArg.orgId}/roles/${queryArg.roleId}/keychains` }),
        providesTags: ["role_roles"],
      }),
      assignKeychainToRole: build.mutation<AssignKeychainToRoleApiResponse, AssignKeychainToRoleApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles/${queryArg.roleId}/keychains/${queryArg.keychainId}`,
          method: "POST",
        }),
        invalidatesTags: ["role_roles"],
      }),
      unassignKeychainFromRole: build.mutation<UnassignKeychainFromRoleApiResponse, UnassignKeychainFromRoleApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles/${queryArg.roleId}/keychains/${queryArg.keychainId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["role_roles"],
      }),
      getSchedules: build.query<GetSchedulesApiResponse, GetSchedulesApiArg>({
        query: (queryArg) => ({
          url: `/user/schedules`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            search: queryArg.search,
            order: queryArg.order,
          },
        }),
        providesTags: ["schedule_scheduler"],
      }),
      upsertSchedule: build.mutation<UpsertScheduleApiResponse, UpsertScheduleApiArg>({
        query: (queryArg) => ({ url: `/user/schedules`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["schedule_scheduler"],
      }),
      getSchedule: build.query<GetScheduleApiResponse, GetScheduleApiArg>({
        query: (queryArg) => ({ url: `/user/schedules/${queryArg.id}` }),
        providesTags: ["schedule_scheduler"],
      }),
      deleteSchedule: build.mutation<DeleteScheduleApiResponse, DeleteScheduleApiArg>({
        query: (queryArg) => ({ url: `/user/schedules/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["schedule_scheduler"],
      }),
      getSubscriptions: build.query<GetSubscriptionsApiResponse, GetSubscriptionsApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions`,
          params: {
            page: queryArg.page,
            pagesize: queryArg.pagesize,
            order: queryArg.order,
            status: queryArg.status,
          },
        }),
        providesTags: ["Subscription_subscription"],
      }),
      postApiEntitlementSubscriptionsBySubscriptionIdCancel: build.mutation<
        PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiResponse,
        PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/cancel`,
          method: "POST",
        }),
        invalidatesTags: ["Subscription_other"],
      }),
      postApiEntitlementSubscriptionsCreate: build.mutation<
        PostApiEntitlementSubscriptionsCreateApiResponse,
        PostApiEntitlementSubscriptionsCreateApiArg
      >({
        query: (queryArg) => ({ url: `/api/entitlement/subscriptions/create`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Subscription_other"],
      }),
      postApiEntitlementSubscriptionsBySubscriptionIdUpgrade: build.mutation<
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiResponse,
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/upgrade`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Subscription_other"],
      }),
      postApiEntitlementSubscriptionsBySubscriptionIdUpgradePreview: build.mutation<
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiResponse,
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/upgradePreview`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Subscription_other"],
      }),
      postApiEntitlementSubscriptionsWebhooks: build.mutation<
        PostApiEntitlementSubscriptionsWebhooksApiResponse,
        PostApiEntitlementSubscriptionsWebhooksApiArg
      >({
        query: (queryArg) => ({ url: `/api/entitlement/subscriptions/webhooks`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Subscription_other"],
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
      getTeamUsers: build.query<GetTeamUsersApiResponse, GetTeamUsersApiArg>({
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
      getApiWorkspaces: build.query<GetApiWorkspacesApiResponse, GetApiWorkspacesApiArg>({
        query: () => ({ url: `/api/workspaces` }),
        providesTags: ["Workspace_workspaces"],
      }),
      postApiWorkspaces: build.mutation<PostApiWorkspacesApiResponse, PostApiWorkspacesApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      getApiWorkspacesById: build.query<GetApiWorkspacesByIdApiResponse, GetApiWorkspacesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}` }),
        providesTags: ["Workspace_workspaces"],
      }),
      putApiWorkspacesById: build.mutation<PutApiWorkspacesByIdApiResponse, PutApiWorkspacesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      deleteApiWorkspacesById: build.mutation<DeleteApiWorkspacesByIdApiResponse, DeleteApiWorkspacesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as cloudApi };
export type GetMyAcademyCirriculaApiResponse = unknown;
export type GetMyAcademyCirriculaApiArg = {
  /** Filter content by content types */
  contentType?: string[];
  /** Filter content by organization IDs */
  orgId?: string[];
};
export type CreateAcademyCurriculaApiResponse = /** status 201 created the curricula */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the cirricula */
  visibility: "public" | "private";
  /** Status of the cirricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the cirricula */
  slug: string;
  /** Level of the cirricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailed_description?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
      /** Number of months after which the certificate expires */
      expires_in?: number;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
};
export type CreateAcademyCurriculaApiArg = {
  body: {
    /** Type of the curricula */
    type: "learning-path" | "challenge" | "certification";
    /** Title of the curricula */
    title: string;
    /** Organization ID that owns this learning path */
    orgId: string;
    /** ID of the workspace to which this cirricula belongs */
    workspace_id: string;
    /** ID of the badge to be awarded on completion of this curricula */
    badge_id?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    team_id: string;
    /** Expiry time for curricula access */
    access_expires_at?: string;
    /** Current access status of the curricula */
    access_status: "enabled" | "disabled";
    /** Additional metadata about the cirricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Short description of the curricula */
      description: string;
      /** Detailed description of the curricula */
      detailed_description?: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        org_id: string;
        /** ID of the recipient (user) who received the certificate */
        recipient_id: string;
        /** Name of the recipient (user) who received the certificate */
        recipient_name: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuing_authorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signature_url?: string;
        }[];
        /** Date when the certificate was issued */
        issued_date: string;
        /** Date when the certificate expires (optional) */
        expiration_date?: string;
        /** Number of months after which the certificate expires */
        expires_in?: number;
      };
      /** List of children items in the top-level curricula */
      children?: {
        /** Unique identifier for the course */
        id: string;
        /** Title of the course */
        title: string;
        /** URL to the course content */
        permalink: string;
        /** Course description */
        description: string;
        /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
        weight?: number;
        /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
        banner?: string | null;
        /** Type of the content (e.g., learning-path, challenge, certification) */
        type?: "learning-path" | "challenge" | "certification";
        /** List of child nodes (sub-courses or modules) */
        children?: object[];
      }[];
      [key: string]: any;
    };
  };
};
export type GetAcademyCirriculaApiResponse = unknown;
export type GetAcademyCirriculaApiArg = {
  /** Filter content by content types */
  contentType?: string[];
  /** Filter content by visibility (public/private) */
  visibility?: string[];
  /** Filter content by difficulty level */
  level?: string[];
  /** Filter content by organization IDs */
  orgId?: string[];
  /** Filter content by categories */
  category?: string[];
  /** Filter by registration status */
  status?: string[];
  /** Search content by title */
  search?: string;
  /** Sort results by a specific field (e.g., title, createdAt) */
  sort?: string;
  /** Order of sorting (asc or desc) */
  order?: "asc" | "desc";
  /** Number of results per page */
  pagesize?: number;
  /** Page number */
  page?: number;
};
export type GetApiAcademyByTypeAndOrgIdSlugApiResponse = /** status 200 A single academy content */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the cirricula */
  visibility: "public" | "private";
  /** Status of the cirricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the cirricula */
  slug: string;
  /** Level of the cirricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailed_description?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
      /** Number of months after which the certificate expires */
      expires_in?: number;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
};
export type GetApiAcademyByTypeAndOrgIdSlugApiArg = {
  type: string;
  orgId: string;
  slug: string;
};
export type RegisterToAcademyContentApiResponse = /** status 200 registered content */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  org_id: string;
  /** ID of the course content */
  content_id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  user_id: string;
  /** Status of the user's course registration */
  status: "registered" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updated_at: string;
  /** When the registration was created */
  created_at: string;
  /** Timestamp when the resource was deleted. */
  deleted_at?: string;
  /** Issued certificate for completing the curricula under registration */
  certificate: {
    /** Unique identifier for the certificate */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    org_id: string;
    /** ID of the recipient (user) who received the certificate */
    recipient_id: string;
    /** Name of the recipient (user) who received the certificate */
    recipient_name: string;
    /** Title of the certificate */
    title: string;
    /** Description of the certificate */
    description: string;
    /** List of issuing authorities for the certificate */
    issuing_authorities: {
      /** Name of the issuing authority */
      name: string;
      /** Role of the issuing authority */
      role?: string;
      /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
      signature_url?: string;
    }[];
    /** Date when the certificate was issued */
    issued_date: string;
    /** Date when the certificate expires (optional) */
    expiration_date?: string;
    /** Number of months after which the certificate expires */
    expires_in?: number;
  };
  /** Additional metadata about the registration */
  metadata: {
    [key: string]: any;
  };
};
export type RegisterToAcademyContentApiArg = {
  body: {
    /** ID of the academy content to register for */
    content_id: string;
    content_type?: "learning-path" | "challenge" | "certification";
  };
};
export type WithdrawFromAcademyContentApiResponse = /** status 200 registered content */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  org_id: string;
  /** ID of the course content */
  content_id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  user_id: string;
  /** Status of the user's course registration */
  status: "registered" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updated_at: string;
  /** When the registration was created */
  created_at: string;
  /** Timestamp when the resource was deleted. */
  deleted_at?: string;
  /** Issued certificate for completing the curricula under registration */
  certificate: {
    /** Unique identifier for the certificate */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    org_id: string;
    /** ID of the recipient (user) who received the certificate */
    recipient_id: string;
    /** Name of the recipient (user) who received the certificate */
    recipient_name: string;
    /** Title of the certificate */
    title: string;
    /** Description of the certificate */
    description: string;
    /** List of issuing authorities for the certificate */
    issuing_authorities: {
      /** Name of the issuing authority */
      name: string;
      /** Role of the issuing authority */
      role?: string;
      /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
      signature_url?: string;
    }[];
    /** Date when the certificate was issued */
    issued_date: string;
    /** Date when the certificate expires (optional) */
    expiration_date?: string;
    /** Number of months after which the certificate expires */
    expires_in?: number;
  };
  /** Additional metadata about the registration */
  metadata: {
    [key: string]: any;
  };
};
export type WithdrawFromAcademyContentApiArg = {
  /** The ID of the curricula */
  id: string;
};
export type UpdateAcademyCurriculaByIdApiResponse = /** status 200 updated the curricula */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the cirricula */
  visibility: "public" | "private";
  /** Status of the cirricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the cirricula */
  slug: string;
  /** Level of the cirricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailed_description?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
      /** Number of months after which the certificate expires */
      expires_in?: number;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
} & {
  RegistrationCount: number;
  Invitation?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type UpdateAcademyCurriculaByIdApiArg = {
  /** The ID of the curricula */
  id: string;
  body: {
    /** Type of the curricula */
    type: "learning-path" | "challenge" | "certification";
    /** Title of the curricula */
    title: string;
    /** Organization ID that owns this learning path */
    orgId: string;
    /** ID of the workspace to which this cirricula belongs */
    workspace_id: string;
    /** ID of the badge to be awarded on completion of this curricula */
    badge_id?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    team_id: string;
    /** Expiry time for curricula access */
    access_expires_at?: string;
    /** Current access status of the curricula */
    access_status: "enabled" | "disabled";
    /** Additional metadata about the cirricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Short description of the curricula */
      description: string;
      /** Detailed description of the curricula */
      detailed_description?: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        org_id: string;
        /** ID of the recipient (user) who received the certificate */
        recipient_id: string;
        /** Name of the recipient (user) who received the certificate */
        recipient_name: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuing_authorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signature_url?: string;
        }[];
        /** Date when the certificate was issued */
        issued_date: string;
        /** Date when the certificate expires (optional) */
        expiration_date?: string;
        /** Number of months after which the certificate expires */
        expires_in?: number;
      };
      /** List of children items in the top-level curricula */
      children?: {
        /** Unique identifier for the course */
        id: string;
        /** Title of the course */
        title: string;
        /** URL to the course content */
        permalink: string;
        /** Course description */
        description: string;
        /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
        weight?: number;
        /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
        banner?: string | null;
        /** Type of the content (e.g., learning-path, challenge, certification) */
        type?: "learning-path" | "challenge" | "certification";
        /** List of child nodes (sub-courses or modules) */
        children?: object[];
      }[];
      [key: string]: any;
    };
  };
};
export type DeleteAcademyCurriculaByIdApiResponse = unknown;
export type DeleteAcademyCurriculaByIdApiArg = {
  /** The ID of the curricula */
  id: string;
};
export type GetAcademyCurriculaByIdApiResponse = /** status 200 A single curricula */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the cirricula */
  visibility: "public" | "private";
  /** Status of the cirricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the cirricula */
  slug: string;
  /** Level of the cirricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailed_description?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
      /** Number of months after which the certificate expires */
      expires_in?: number;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
} & {
  RegistrationCount: number;
  Invitation?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type GetAcademyCurriculaByIdApiArg = {
  /** The ID of the curricula */
  id: string;
};
export type GetApiAcademyRegistrationsByContentIdApiResponse =
  /** status 200 Registration data for the specified content */ {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    org_id: string;
    /** ID of the course content */
    content_id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    user_id: string;
    /** Status of the user's course registration */
    status: "registered" | "completed" | "failed" | "withdrawn";
    /** When the registration was updated */
    updated_at: string;
    /** When the registration was created */
    created_at: string;
    /** Timestamp when the resource was deleted. */
    deleted_at?: string;
    /** Issued certificate for completing the curricula under registration */
    certificate: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
      /** Number of months after which the certificate expires */
      expires_in?: number;
    };
    /** Additional metadata about the registration */
    metadata: {
      [key: string]: any;
    };
  };
export type GetApiAcademyRegistrationsByContentIdApiArg = {
  /** The ID of the content to retrieve registration data for */
  contentId: string;
  /** Filter registrations by status (e.g., registered, completed) */
  status?: string;
};
export type UpdateCurrentItemInProgressTrackerApiResponse =
  /** status 200 Successfully updated the progress tracker */ {
    message?: string;
    progress_tracker?: {
      current_item: {
        [key: string]: {
          id: string;
          last_opened: string;
          content_type: "learning-path" | "challenge" | "certification";
        };
      };
      grades: {
        [key: string]: {
          score: number;
          passed: boolean;
          percentage_scored: number;
          total_marks: number;
          pass_percentage: number;
          correct_submissions: {
            [key: string]: boolean;
          };
          quiz: {
            id: string;
            /** Organization ID that owns this quiz */
            orgId: string;
            /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
            final: boolean;
            title: string;
            description: string;
            slug: string;
            relPermalink: string;
            permalink: string;
            type: string;
            section: string;
            layout: string;
            date: string;
            lastmod: string;
            draft: boolean;
            file_path: string;
            pass_percentage: number;
            /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
            time_limit: string;
            /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
            max_attempts: number;
            questions: {
              id: string;
              text: string;
              type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
              marks: number;
              multiple_answers?: boolean;
              options: {
                id: string;
                text: string;
                is_correct: boolean;
              }[];
              correct_answer: string;
            }[];
            total_questions: number;
            total_questions_in_bank: number;
            total_question_sets: number;
            total_marks: number;
            prerequisites: {
              id: string;
              title: string;
              relPermalink: string;
              type: string;
            }[];
            parent?: {
              id: string;
              title: string;
              relPermalink: string;
              type: string;
            };
            next_page: {
              id: string;
              title: string;
              relPermalink: string;
              type: string;
            };
          };
          attempted_at: string;
          attempts: number;
        };
      };
      /** Total time spent in seconds */
      time_spent: number;
      /** Items that have been completed (map of item IDs to item data) */
      completed_items: {
        [key: string]: {
          /** Timestamp when the item was completed */
          completed_at: string;
          item_data: {
            id: string;
            title: string;
            relPermalink: string;
            type: string;
          };
        };
      };
      completed: string;
    };
    registration_id?: string;
    content_type?: "learning-path" | "challenge" | "certification";
    item_data?: {
      id: string;
      last_opened: string;
      content_type: "learning-path" | "challenge" | "certification";
    };
  };
export type UpdateCurrentItemInProgressTrackerApiArg = {
  /** The ID of the registration */
  registrationId: string;
  body: {
    content_type: "learning-path" | "challenge" | "certification";
    item_data: {
      id: string;
      last_opened: string;
      content_type: "learning-path" | "challenge" | "certification";
    };
  };
};
export type GetTestByAbsPathApiResponse = /** status 200 A single test */ {
  id: string;
  /** Organization ID that owns this quiz */
  orgId: string;
  /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
  final: boolean;
  title: string;
  description: string;
  slug: string;
  relPermalink: string;
  permalink: string;
  type: string;
  section: string;
  layout: string;
  date: string;
  lastmod: string;
  draft: boolean;
  file_path: string;
  pass_percentage: number;
  /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
  time_limit: string;
  /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
  max_attempts: number;
  questions: {
    id: string;
    text: string;
    type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
    marks: number;
    multiple_answers?: boolean;
    options: {
      id: string;
      text: string;
      is_correct: boolean;
    }[];
    correct_answer: string;
  }[];
  total_questions: number;
  total_questions_in_bank: number;
  total_question_sets: number;
  total_marks: number;
  prerequisites: {
    id: string;
    title: string;
    relPermalink: string;
    type: string;
  }[];
  parent?: {
    id: string;
    title: string;
    relPermalink: string;
    type: string;
  };
  next_page: {
    id: string;
    title: string;
    relPermalink: string;
    type: string;
  };
};
export type GetTestByAbsPathApiArg = {
  /** The absolute path of the test to retrieve */
  absPath: string;
};
export type StartTestByIdApiResponse = /** status 200 A single test */ {
  id: string;
  /** Organization ID that owns this quiz */
  orgId: string;
  /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
  final: boolean;
  title: string;
  description: string;
  slug: string;
  relPermalink: string;
  permalink: string;
  type: string;
  section: string;
  layout: string;
  date: string;
  lastmod: string;
  draft: boolean;
  file_path: string;
  pass_percentage: number;
  /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
  time_limit: string;
  /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
  max_attempts: number;
  questions: {
    id: string;
    text: string;
    type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
    marks: number;
    multiple_answers?: boolean;
    options: {
      id: string;
      text: string;
      is_correct: boolean;
    }[];
    correct_answer: string;
  }[];
  total_questions: number;
  total_questions_in_bank: number;
  total_question_sets: number;
  total_marks: number;
  prerequisites: {
    id: string;
    title: string;
    relPermalink: string;
    type: string;
  }[];
  parent?: {
    id: string;
    title: string;
    relPermalink: string;
    type: string;
  };
  next_page: {
    id: string;
    title: string;
    relPermalink: string;
    type: string;
  };
};
export type StartTestByIdApiArg = {
  body: {
    test_abs_path: string;
    registration_id: string;
  };
};
export type GetAllTestSessionsForRegistrationApiResponse =
  /** status 200 A list of tests for the specified registration */ {
    score: number;
    passed: boolean;
    percentage_scored: number;
    total_marks: number;
    pass_percentage: number;
    correct_submissions: {
      [key: string]: boolean;
    };
    quiz: {
      id: string;
      /** Organization ID that owns this quiz */
      orgId: string;
      /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
      final: boolean;
      title: string;
      description: string;
      slug: string;
      relPermalink: string;
      permalink: string;
      type: string;
      section: string;
      layout: string;
      date: string;
      lastmod: string;
      draft: boolean;
      file_path: string;
      pass_percentage: number;
      /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
      time_limit: string;
      /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
      max_attempts: number;
      questions: {
        id: string;
        text: string;
        type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
        marks: number;
        multiple_answers?: boolean;
        options: {
          id: string;
          text: string;
          is_correct: boolean;
        }[];
        correct_answer: string;
      }[];
      total_questions: number;
      total_questions_in_bank: number;
      total_question_sets: number;
      total_marks: number;
      prerequisites: {
        id: string;
        title: string;
        relPermalink: string;
        type: string;
      }[];
      parent?: {
        id: string;
        title: string;
        relPermalink: string;
        type: string;
      };
      next_page: {
        id: string;
        title: string;
        relPermalink: string;
        type: string;
      };
    };
    attempted_at: string;
    attempts: number;
  }[][];
export type GetAllTestSessionsForRegistrationApiArg = {
  /** The ID of the registration to retrieve tests for */
  id: string;
  /** Filter tests by absolute path */
  testAbsPath?: string;
};
export type SubmitQuizApiResponse = /** status 200 Successfully updated the progress tracker */ {
  score: number;
  passed: boolean;
  percentage_scored: number;
  total_marks: number;
  pass_percentage: number;
  correct_submissions: {
    [key: string]: boolean;
  };
  quiz: {
    id: string;
    /** Organization ID that owns this quiz */
    orgId: string;
    /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
    final: boolean;
    title: string;
    description: string;
    slug: string;
    relPermalink: string;
    permalink: string;
    type: string;
    section: string;
    layout: string;
    date: string;
    lastmod: string;
    draft: boolean;
    file_path: string;
    pass_percentage: number;
    /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
    time_limit: string;
    /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
    max_attempts: number;
    questions: {
      id: string;
      text: string;
      type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
      marks: number;
      multiple_answers?: boolean;
      options: {
        id: string;
        text: string;
        is_correct: boolean;
      }[];
      correct_answer: string;
    }[];
    total_questions: number;
    total_questions_in_bank: number;
    total_question_sets: number;
    total_marks: number;
    prerequisites: {
      id: string;
      title: string;
      relPermalink: string;
      type: string;
    }[];
    parent?: {
      id: string;
      title: string;
      relPermalink: string;
      type: string;
    };
    next_page: {
      id: string;
      title: string;
      relPermalink: string;
      type: string;
    };
  };
  attempted_at: string;
  attempts: number;
};
export type SubmitQuizApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    test_session_id: string;
    quiz_abs_path: string;
    registration_id: string;
    user_id: string;
    answers: {
      question_id: string;
      selected_option_id: {
        [key: string]: boolean;
      };
      answer_text: string;
    }[];
  };
};
export type GetAcademyAdminSummaryApiResponse =
  /** status 200 A list of content with total count and registration metrics */ object;
export type GetAcademyAdminSummaryApiArg = void;
export type GetAcademyAdminRegistrationsApiResponse = /** status 200 List of registrations with pagination info */ {
  data: {
    /** Title of the curricula */
    curricula_title: string;
    /** Type of the curricula */
    curricula_type: "learning-path" | "challenge" | "certification";
    /** Permalink of the curricula */
    curricula_permalink: string;
    /** Unique ID of the registration */
    registration_id: string;
    /** Registration status */
    status: "registered" | "completed" | "failed" | "withdrawn";
    /** When the registration was created */
    created_at?: string;
    /** ID of the user */
    user_id: string;
    /** First name of the user */
    user_first_name: string;
    /** Last name of the user */
    user_last_name: string;
    /** Email of the user */
    user_email: string;
    /** Avatar URL of the user */
    user_avatar_url: string;
    /** Total count for pagination */
    total_count: number;
  }[];
  total_count: number;
  page_size: number;
  page: number;
};
export type GetAcademyAdminRegistrationsApiArg = {
  /** Number of results per page */
  pagesize?: number;
  /** Page number */
  page?: number;
  /** Filter by content types */
  contentType?: string[];
  /** Filter by registration status */
  status?: string[];
};
export type GetCertificateByIdApiResponse = /** status 200 A single certificate */ {
  /** Unique identifier for the certificate */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  org_id: string;
  /** ID of the recipient (user) who received the certificate */
  recipient_id: string;
  /** Name of the recipient (user) who received the certificate */
  recipient_name: string;
  /** Title of the certificate */
  title: string;
  /** Description of the certificate */
  description: string;
  /** List of issuing authorities for the certificate */
  issuing_authorities: {
    /** Name of the issuing authority */
    name: string;
    /** Role of the issuing authority */
    role?: string;
    /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
    signature_url?: string;
  }[];
  /** Date when the certificate was issued */
  issued_date: string;
  /** Date when the certificate expires (optional) */
  expiration_date?: string;
  /** Number of months after which the certificate expires */
  expires_in?: number;
};
export type GetCertificateByIdApiArg = {
  /** The ID of the certificate to retrieve */
  certificateId: string;
};
export type DeleteBadgeByIdApiResponse = unknown;
export type DeleteBadgeByIdApiArg = {
  /** Unique identifier */
  id: string;
};
export type GetBadgeByIdApiResponse = /** status 200 undefined */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** The ID of the organization in which this badge is available . */
  org_id: string;
  /** unique identifier for the badge ( auto generated ) */
  label: string;
  /** Concise descriptor for the badge or certificate. */
  name: string;
  /** A description of the milestone achieved, often including criteria for receiving this recognition. */
  description: string;
  /** URL to the badge image */
  image_url: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** Timestamp when the resource was deleted, if applicable */
  deleted_at: string;
};
export type GetBadgeByIdApiArg = {
  /** Unique identifier */
  id: string;
};
export type CreateOrUpdateBadgeApiResponse = /** status 201 undefined */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** The ID of the organization in which this badge is available . */
  org_id: string;
  /** unique identifier for the badge ( auto generated ) */
  label: string;
  /** Concise descriptor for the badge or certificate. */
  name: string;
  /** A description of the milestone achieved, often including criteria for receiving this recognition. */
  description: string;
  /** URL to the badge image */
  image_url: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** Timestamp when the resource was deleted, if applicable */
  deleted_at: string;
};
export type CreateOrUpdateBadgeApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** The ID of the organization in which this badge is available . */
    org_id: string;
    /** unique identifier for the badge ( auto generated ) */
    label: string;
    /** Concise descriptor for the badge or certificate. */
    name: string;
    /** A description of the milestone achieved, often including criteria for receiving this recognition. */
    description: string;
    /** URL to the badge image */
    image_url: string;
    /** Timestamp when the resource was created. */
    created_at: string;
    /** Timestamp when the resource was updated. */
    updated_at: string;
    /** Timestamp when the resource was deleted, if applicable */
    deleted_at: string;
  };
};
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
      created_at?: string;
      metadata?: object;
      updated_at?: string;
      /** SQL null Timestamp to handle null values of time. */
      deleted_at?: string;
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
  status_summary?: {
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
export type RegisterConnectionApiResponse = /** status 201 Connection registered successfully */ {
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
    created_at?: string;
    metadata?: object;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
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
    sub_type: string;
    /** Credential secret data */
    credential_secret?: object;
    /** Connection metadata */
    metadata?: object;
    /** Connection status */
    status: string;
    /** Associated credential ID */
    credential_id?: string;
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
    created_at?: string;
    metadata?: object;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
  /** Specifies the version of the schema used for the definition. */
  schemaVersion: string;
};
export type GetConnectionByIdApiArg = {
  /** Connection ID */
  connectionId: string;
};
export type UpdateConnectionApiResponse = /** status 200 Connection updated successfully */ {
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
    created_at?: string;
    metadata?: object;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
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
    sub_type: string;
    /** Credential secret data */
    credential_secret?: object;
    /** Connection metadata */
    metadata?: object;
    /** Connection status */
    status: string;
    /** Associated credential ID */
    credential_id?: string;
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
export type GetUserCredentialsApiResponse = /** status 200 Credentials fetched successfully */ {
  credentials: {
    /** Unique identifier for the credential. */
    id?: string;
    /** Human-readable name for the credential. */
    name: string;
    /** UUID of the user who owns this credential. */
    user_id?: string;
    /** Credential type (e.g. token, basic, AWS). */
    type: string;
    /** Key-value pairs containing the sensitive credential data. */
    secret?: object;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the credential was soft-deleted. */
    deleted_at?: string;
  }[];
  /** Total number of credentials across all pages. */
  total_count: number;
  /** Current page number (zero-based). */
  page: number;
  /** Number of credentials per page. */
  page_size: number;
};
export type GetUserCredentialsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type SaveUserCredentialApiResponse = /** status 201 Credential saved successfully */ {
  /** Unique identifier for the credential. */
  id?: string;
  /** Human-readable name for the credential. */
  name: string;
  /** UUID of the user who owns this credential. */
  user_id?: string;
  /** Credential type (e.g. token, basic, AWS). */
  type: string;
  /** Key-value pairs containing the sensitive credential data. */
  secret?: object;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
  /** Timestamp when the credential was soft-deleted. */
  deleted_at?: string;
};
export type SaveUserCredentialApiArg = {
  body: {
    /** Unique identifier for the credential. */
    id?: string;
    /** Human-readable name for the credential. */
    name: string;
    /** UUID of the user who owns this credential. */
    user_id?: string;
    /** Credential type (e.g. token, basic, AWS). */
    type: string;
    /** Key-value pairs containing the sensitive credential data. */
    secret?: object;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the credential was soft-deleted. */
    deleted_at?: string;
  };
};
export type UpdateUserCredentialApiResponse = /** status 200 Credential updated successfully */ {
  /** Unique identifier for the credential. */
  id?: string;
  /** Human-readable name for the credential. */
  name: string;
  /** UUID of the user who owns this credential. */
  user_id?: string;
  /** Credential type (e.g. token, basic, AWS). */
  type: string;
  /** Key-value pairs containing the sensitive credential data. */
  secret?: object;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
  /** Timestamp when the credential was soft-deleted. */
  deleted_at?: string;
};
export type UpdateUserCredentialApiArg = {
  body: {
    /** Unique identifier for the credential. */
    id?: string;
    /** Human-readable name for the credential. */
    name: string;
    /** UUID of the user who owns this credential. */
    user_id?: string;
    /** Credential type (e.g. token, basic, AWS). */
    type: string;
    /** Key-value pairs containing the sensitive credential data. */
    secret?: object;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the credential was soft-deleted. */
    deleted_at?: string;
  };
};
export type GetCredentialByIdApiResponse = /** status 200 Credential fetched successfully */ {
  /** Unique identifier for the credential. */
  id?: string;
  /** Human-readable name for the credential. */
  name: string;
  /** UUID of the user who owns this credential. */
  user_id?: string;
  /** Credential type (e.g. token, basic, AWS). */
  type: string;
  /** Key-value pairs containing the sensitive credential data. */
  secret?: object;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
  /** Timestamp when the credential was soft-deleted. */
  deleted_at?: string;
};
export type GetCredentialByIdApiArg = {
  /** Credential ID */
  id: string;
};
export type DeleteUserCredentialApiResponse = unknown;
export type DeleteUserCredentialApiArg = {
  /** Credential ID */
  id: string;
};
export type GetPatternsApiResponse = /** status 200 Designs fetched successfully */ {
  page?: number;
  page_size?: number;
  patterns?: {
    catalog_data?: {
      /** Tracks the specific content version that has been made available in the Catalog. */
      publishedVersion?: string;
      /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
      class?: "official" | "verified" | "reference architecture";
      /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
      compatibility: "kubernetes"[];
      /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
      pattern_caveats: string;
      /** Purpose of the design along with its intended and unintended uses. */
      pattern_info: string;
      /** Categorization of the type of design or operational flow depicted in this design. */
      type:
        | "Deployment"
        | "Observability"
        | "Resiliency"
        | "Scaling"
        | "Security"
        | "Traffic-management"
        | "Troubleshooting"
        | "Workloads";
      /** Contains reference to the dark and light mode snapshots of the design. */
      snapshotURL?: string[];
    };
    created_at?: string;
    user_id?: string;
    location?: {
      [key: string]: string;
    };
    name?: string;
    /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
    pattern_file?: {
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
              created_at?: string;
              metadata?: object;
              updated_at?: string;
              /** SQL null Timestamp to handle null values of time. */
              deleted_at?: string;
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
          relationships: any;
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
            kind: string;
          };
        };
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        modelId: string;
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
    updated_at?: string;
    id?: string;
    visibility?: string;
  }[];
  resultType?: string;
  total_count?: number;
};
export type GetPatternsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Filter by visibility (public, private, published) */
  visibility?: string;
};
export type UpsertPatternApiResponse = /** status 200 Design saved successfully */ {
  catalog_data?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    pattern_caveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    pattern_info: string;
    /** Categorization of the type of design or operational flow depicted in this design. */
    type:
      | "Deployment"
      | "Observability"
      | "Resiliency"
      | "Scaling"
      | "Security"
      | "Traffic-management"
      | "Troubleshooting"
      | "Workloads";
    /** Contains reference to the dark and light mode snapshots of the design. */
    snapshotURL?: string[];
  };
  created_at?: string;
  user_id?: string;
  location?: {
    [key: string]: string;
  };
  name?: string;
  /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
  pattern_file?: {
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
            created_at?: string;
            metadata?: object;
            updated_at?: string;
            /** SQL null Timestamp to handle null values of time. */
            deleted_at?: string;
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
        relationships: any;
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
          kind: string;
        };
      };
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      modelId: string;
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
  updated_at?: string;
  id?: string;
  visibility?: string;
};
export type UpsertPatternApiArg = {
  body: {
    path?: string;
    pattern_data?: {
      catalog_data?: {
        /** Tracks the specific content version that has been made available in the Catalog. */
        publishedVersion?: string;
        /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
        class?: "official" | "verified" | "reference architecture";
        /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
        compatibility: "kubernetes"[];
        /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
        pattern_caveats: string;
        /** Purpose of the design along with its intended and unintended uses. */
        pattern_info: string;
        /** Categorization of the type of design or operational flow depicted in this design. */
        type:
          | "Deployment"
          | "Observability"
          | "Resiliency"
          | "Scaling"
          | "Security"
          | "Traffic-management"
          | "Troubleshooting"
          | "Workloads";
        /** Contains reference to the dark and light mode snapshots of the design. */
        snapshotURL?: string[];
      };
      created_at?: string;
      user_id?: string;
      location?: {
        [key: string]: string;
      };
      name?: string;
      /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
      pattern_file?: {
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
                created_at?: string;
                metadata?: object;
                updated_at?: string;
                /** SQL null Timestamp to handle null values of time. */
                deleted_at?: string;
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
            relationships: any;
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
              kind: string;
            };
          };
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          modelId: string;
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
      updated_at?: string;
      id?: string;
      visibility?: string;
    };
    save?: boolean;
    /** endpoint */
    url?: string;
    name?: string;
  };
};
export type DeletePatternsApiResponse = unknown;
export type DeletePatternsApiArg = {
  body: {
    patterns?: {
      id?: string;
      name?: string;
    }[];
  };
};
export type GetPatternResourcesApiResponse = unknown;
export type GetPatternResourcesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type UpsertPatternResourceApiResponse = unknown;
export type UpsertPatternResourceApiArg = void;
export type GetPatternResourceApiResponse = unknown;
export type GetPatternResourceApiArg = {
  /** Design (Pattern) ID */
  id: string;
};
export type DeletePatternResourceApiResponse = unknown;
export type DeletePatternResourceApiArg = {
  /** Design (Pattern) ID */
  id: string;
};
export type GetPatternApiResponse = /** status 200 Design fetched successfully */ {
  catalog_data?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    pattern_caveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    pattern_info: string;
    /** Categorization of the type of design or operational flow depicted in this design. */
    type:
      | "Deployment"
      | "Observability"
      | "Resiliency"
      | "Scaling"
      | "Security"
      | "Traffic-management"
      | "Troubleshooting"
      | "Workloads";
    /** Contains reference to the dark and light mode snapshots of the design. */
    snapshotURL?: string[];
  };
  created_at?: string;
  user_id?: string;
  location?: {
    [key: string]: string;
  };
  name?: string;
  /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
  pattern_file?: {
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
            created_at?: string;
            metadata?: object;
            updated_at?: string;
            /** SQL null Timestamp to handle null values of time. */
            deleted_at?: string;
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
        relationships: any;
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
          kind: string;
        };
      };
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      modelId: string;
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
  updated_at?: string;
  id?: string;
  visibility?: string;
};
export type GetPatternApiArg = {
  /** Design (Pattern) ID */
  id: string;
};
export type DeletePatternApiResponse = unknown;
export type DeletePatternApiArg = {
  /** Design (Pattern) ID */
  id: string;
};
export type ClonePatternApiResponse = /** status 200 Design cloned successfully */ {
  catalog_data?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    pattern_caveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    pattern_info: string;
    /** Categorization of the type of design or operational flow depicted in this design. */
    type:
      | "Deployment"
      | "Observability"
      | "Resiliency"
      | "Scaling"
      | "Security"
      | "Traffic-management"
      | "Troubleshooting"
      | "Workloads";
    /** Contains reference to the dark and light mode snapshots of the design. */
    snapshotURL?: string[];
  };
  created_at?: string;
  user_id?: string;
  location?: {
    [key: string]: string;
  };
  name?: string;
  /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
  pattern_file?: {
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
            created_at?: string;
            metadata?: object;
            updated_at?: string;
            /** SQL null Timestamp to handle null values of time. */
            deleted_at?: string;
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
        relationships: any;
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
          kind: string;
        };
      };
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      modelId: string;
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
  updated_at?: string;
  id?: string;
  visibility?: string;
};
export type ClonePatternApiArg = {
  /** Design (Pattern) ID */
  id: string;
};
export type GetDesignPatternFileApiResponse = unknown;
export type GetDesignPatternFileApiArg = {
  /** Design (Pattern) ID */
  id: string;
};
export type UpsertPatternSourceContentApiResponse = unknown;
export type UpsertPatternSourceContentApiArg = {
  /** Design (Pattern) ID */
  id: string;
  body: {
    /** Supported formats: Kubernetes Manifests, Helm Charts, Docker Compose, and Meshery Designs. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    file?: string;
    /** The name of the pattern file being imported. */
    file_name?: string;
    /** Provide a name for your design file. This name will help you identify the file more easily. You can also change the name of your design after importing it. */
    name?: string;
    /** Provide the URL of the file you want to import. This should be a direct URL to a single file, for example: https://raw.github.com/your-design-file.yaml. Also, ensure that design is in a supported format: Kubernetes Manifest, Helm Chart, Docker Compose, or Meshery Design. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    url?: string;
  };
};
export type ImportDesignApiResponse = /** status 200 Successful Import */ {
  message?: string;
};
export type ImportDesignApiArg = {
  body: {
    /** Supported formats: Kubernetes Manifests, Helm Charts, Docker Compose, and Meshery Designs. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    file?: string;
    /** The name of the pattern file being imported. */
    file_name?: string;
    /** Provide a name for your design file. This name will help you identify the file more easily. You can also change the name of your design after importing it. */
    name?: string;
    /** Provide the URL of the file you want to import. This should be a direct URL to a single file, for example: https://raw.github.com/your-design-file.yaml. Also, ensure that design is in a supported format: Kubernetes Manifest, Helm Chart, Docker Compose, or Meshery Design. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    url?: string;
  };
};
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
  created_at?: string;
  metadata?: object;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type CreateEnvironmentApiArg = {
  /** Body for creating environment */
  body: {
    /** An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation. */
    name: string;
    /** An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments). */
    description?: string;
    /** Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation. */
    OrganizationID?: string;
  };
};
export type GetEnvironmentsApiResponse = /** status 200 Environments */ {
  page?: number;
  page_size?: number;
  total_count?: number;
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
    created_at?: string;
    metadata?: object;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
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
export type DeleteEventsByIdApiResponse = /** status 200 Event deleted successfully */ {
  message?: string;
  event_id?: string;
};
export type DeleteEventsByIdApiArg = {
  /** ID of the event to delete */
  id: string;
};
export type PostEventsApiResponse = unknown;
export type PostEventsApiArg = {
  body: object;
};
export type DeleteEventsApiResponse = /** status 200 event deleted */ {
  deleted?: string[];
};
export type DeleteEventsApiArg = {
  body: {
    ids: string[];
  };
};
export type PutEventsStatusApiResponse = /** status 200 Events updated successfully */ {
  updated?: string[];
};
export type PutEventsStatusApiArg = {
  body: {
    ids: string[];
    status: string;
  };
};
export type PutEventsByIdStatusApiResponse = /** status 200 Event status updated successfully */ {
  message?: string;
  event_id?: string;
  status?: string;
};
export type PutEventsByIdStatusApiArg = {
  /** ID of the event */
  id: string;
  body: {
    status: string;
  };
};
export type GetFeaturesApiResponse = /** status 200 Features fetched successfully */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  plan_id: string;
  plan?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Name of the plan */
    name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
    cadence: "monthly" | "yearly";
    unit: "user" | "free";
    /** Minimum number of units required for the plan */
    minimum_units: number;
    /** Price per unit of the plan */
    price_per_unit: number;
    currency: "usd";
  };
  /** Enumeration of possible feature types */
  name?:
    | "ComponentsInDesign"
    | "RelationshipsInDesign"
    | "DesignsInWorkspace"
    | "WorkspacesInOrganization"
    | "ImageSizeInDesign"
    | "SizePerDesign";
  /** Quantity of the feature allowed, use 9999999999 for unlimited */
  quantity: number;
  created_at?: string;
  updated_at?: string;
}[];
export type GetFeaturesApiArg = void;
export type GetFeaturesByOrganizationApiResponse = /** status 200 Features fetched successfully */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  plan_id: string;
  plan?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Name of the plan */
    name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
    cadence: "monthly" | "yearly";
    unit: "user" | "free";
    /** Minimum number of units required for the plan */
    minimum_units: number;
    /** Price per unit of the plan */
    price_per_unit: number;
    currency: "usd";
  };
  /** Enumeration of possible feature types */
  name?:
    | "ComponentsInDesign"
    | "RelationshipsInDesign"
    | "DesignsInWorkspace"
    | "WorkspacesInOrganization"
    | "ImageSizeInDesign"
    | "SizePerDesign";
  /** Quantity of the feature allowed, use 9999999999 for unlimited */
  quantity: number;
  created_at?: string;
  updated_at?: string;
}[];
export type GetFeaturesByOrganizationApiArg = {
  /** The ID of the organization */
  organizationId: string;
};
export type GetInvitationApiResponse = /** status 200 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type GetInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
};
export type DeleteInvitationApiResponse = unknown;
export type DeleteInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
};
export type UpdateInvitationApiResponse = /** status 200 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type UpdateInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
  body: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type GetInvitationsApiResponse = /** status 200 undefined */ {
  /** List of invitations */
  data: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  }[];
  /** Total number of invitations available */
  total: number;
};
export type GetInvitationsApiArg = void;
export type CreateInvitationApiResponse = /** status 201 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type CreateInvitationApiArg = {
  body: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type AcceptInvitationApiResponse = /** status 200 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type AcceptInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
};
export type GetUserKeysApiResponse = /** status 200 Returns user keys based on roles assigned to user */ {
  page: number;
  page_size: number;
  total_count: number;
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
};
export type GetKeysApiResponse = /** status 200 Keys fetched */ {
  page: number;
  page_size: number;
  total_count: number;
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
export type GetKeysApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type UpsertKeyApiResponse = /** status 200 Key upserted successfully */ {
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
};
export type UpsertKeyApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** Operation permitted by the key. */
    function?: string;
    /** Category for the key. */
    category?: string;
    /** Subcategory for the key. */
    subcategory?: string;
    /** Human readable description of the key. */
    description?: string;
  };
};
export type GetKeyByIdApiResponse = /** status 200 Key fetched successfully */ {
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
};
export type GetKeyByIdApiArg = {
  /** Key ID */
  keyId: string;
};
export type DeleteKeyApiResponse = unknown;
export type DeleteKeyApiArg = {
  /** Key ID */
  keyId: string;
};
export type GetKeychainsApiResponse = /** status 200 Keychain(s) fetched */ {
  page: number;
  page_size: number;
  total_count: number;
  keychains: {
    /** Unique identifier for the keychain. */
    id: string;
    /** Name of the keychain. */
    name: string;
    /** Owner of the keychain. */
    owner: string;
    /** Timestamp when the resource was created. */
    created_at: string;
    /** Timestamp when the resource was updated. */
    updated_at: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetKeychainsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type CreateKeychainApiResponse = /** status 200 Keychain created */ {
  /** Unique identifier for the keychain. */
  id: string;
  /** Name of the keychain. */
  name: string;
  /** Owner of the keychain. */
  owner: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type CreateKeychainApiArg = {
  body: {
    /** Unique identifier for the keychain. */
    id: string;
    /** Name of the keychain. */
    name: string;
    /** Owner of the keychain. */
    owner: string;
    /** Timestamp when the resource was created. */
    created_at: string;
    /** Timestamp when the resource was updated. */
    updated_at: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  };
};
export type GetKeychainByIdApiResponse = /** status 200 Keychain fetched */ {
  /** Unique identifier for the keychain. */
  id: string;
  /** Name of the keychain. */
  name: string;
  /** Owner of the keychain. */
  owner: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type GetKeychainByIdApiArg = {
  /** Keychain ID */
  keychainId: string;
};
export type UpdateKeychainApiResponse = /** status 200 Keychain updated */ {
  /** Unique identifier for the keychain. */
  id: string;
  /** Name of the keychain. */
  name: string;
  /** Owner of the keychain. */
  owner: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type UpdateKeychainApiArg = {
  /** Keychain ID */
  keychainId: string;
  body: {
    /** Unique identifier for the keychain. */
    id: string;
    /** Name of the keychain. */
    name: string;
    /** Owner of the keychain. */
    owner: string;
    /** Timestamp when the resource was created. */
    created_at: string;
    /** Timestamp when the resource was updated. */
    updated_at: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  };
};
export type DeleteKeychainApiResponse = unknown;
export type DeleteKeychainApiArg = {
  /** Keychain ID */
  keychainId: string;
};
export type AddKeyToKeychainApiResponse = unknown;
export type AddKeyToKeychainApiArg = {
  /** Keychain ID */
  keychainId: string;
  /** Key ID */
  keyId: string;
};
export type RemoveKeyFromKeychainApiResponse = unknown;
export type RemoveKeyFromKeychainApiArg = {
  /** Keychain ID */
  keychainId: string;
  /** Key ID */
  keyId: string;
};
export type GetKeysOfKeychainApiResponse = /** status 200 Keys fetched successfully */ {
  page: number;
  page_size: number;
  total_count: number;
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
export type GetKeysOfKeychainApiArg = {
  /** Keychain ID */
  keychainId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type RegisterMeshmodelsApiResponse = /** status 200 Successful registration */ {
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
    register: boolean;
  };
};
export type GetOrgByDomainApiResponse = /** status 200 Successful response */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  owner: string;
  metadata: {
    preferences: {
      theme: {
        id: string;
        logo: {
          desktop_view: {
            svg: string;
            location: string;
          };
          mobile_view: {
            svg: string;
            location: string;
          };
          dark_desktop_view: {
            svg: string;
            location: string;
          };
          dark_mobile_view: {
            svg: string;
            location: string;
          };
        };
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
  domain?: string | null;
};
export type GetOrgByDomainApiArg = {
  domain: string;
};
export type AddTeamToOrgApiResponse = /** status 200 Team added to organization or team tombstoned */
  | {
      page?: number;
      page_size?: number;
      total_count?: number;
      teams_organizations_mapping?: {
        ID?: string;
        org_id?: string;
        team_id?: string;
        created_at?: string;
        updated_at?: string;
        deleted_at?: string;
      }[];
    }
  | {
      page?: number;
      page_size?: number;
      total_count?: number;
      teams?: {
        ID?: string;
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
export type RemoveTeamFromOrgApiResponse = /** status 200 Team removed from organization */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  teams_organizations_mapping?: {
    ID?: string;
    org_id?: string;
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
export type GetPlansApiResponse = /** status 200 Plans fetched successfully */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** Name of the plan */
  name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
  cadence: "monthly" | "yearly";
  unit: "user" | "free";
  /** Minimum number of units required for the plan */
  minimum_units: number;
  /** Price per unit of the plan */
  price_per_unit: number;
  currency: "usd";
}[];
export type GetPlansApiArg = void;
export type AddRoleHolderApiResponse = unknown;
export type AddRoleHolderApiArg = {
  body: {
    /** Email of the user to assign roles to. */
    email: string;
    /** List of role names to assign. */
    role_names: string[];
  };
};
export type DeleteRoleApiResponse = unknown;
export type DeleteRoleApiArg = {
  /** Role ID */
  id: string;
};
export type GetAllRolesApiResponse = /** status 200 Roles fetched successfully */ {
  /** Current page number (zero-based). */
  page: number;
  /** Number of roles per page. */
  page_size: number;
  /** Total number of roles across all pages. */
  total_count: number;
  roles: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** Unique name of the role. */
    role_name: string;
    /** Human-readable description of the role. */
    description: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the role was soft-deleted. */
    deleted_at?: string;
  }[];
};
export type GetAllRolesApiArg = {
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
};
export type UpsertRolesApiResponse = /** status 200 Roles upserted successfully */ {
  /** Current page number (zero-based). */
  page: number;
  /** Number of roles per page. */
  page_size: number;
  /** Total number of roles across all pages. */
  total_count: number;
  roles: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** Unique name of the role. */
    role_name: string;
    /** Human-readable description of the role. */
    description: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the role was soft-deleted. */
    deleted_at?: string;
  }[];
};
export type UpsertRolesApiArg = {
  /** Organization ID */
  orgId: string;
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** Unique name of the role. */
    role_name: string;
    /** Human-readable description of the role. */
    description: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the role was soft-deleted. */
    deleted_at?: string;
  }[];
};
export type BulkEditRoleHolderApiResponse = unknown;
export type BulkEditRoleHolderApiArg = {
  /** Organization ID */
  orgId: string;
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    user_id?: string;
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    status?: string;
    role_names?: string[];
    created_at?: string;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetRoleKeychainsApiResponse = unknown;
export type GetRoleKeychainsApiArg = {
  /** Organization ID */
  orgId: string;
  /** Role ID */
  roleId: string;
};
export type AssignKeychainToRoleApiResponse = unknown;
export type AssignKeychainToRoleApiArg = {
  /** Organization ID */
  orgId: string;
  /** Role ID */
  roleId: string;
  /** Keychain ID */
  keychainId: string;
};
export type UnassignKeychainFromRoleApiResponse = unknown;
export type UnassignKeychainFromRoleApiArg = {
  /** Organization ID */
  orgId: string;
  /** Role ID */
  roleId: string;
  /** Keychain ID */
  keychainId: string;
};
export type GetSchedulesApiResponse = /** status 200 Schedules fetched successfully */ {
  /** Current page number (zero-based). */
  page: number;
  /** Number of schedules per page. */
  page_size: number;
  /** Total number of schedules across all pages. */
  total_count: number;
  schedules: {
    /** Unique identifier for the schedule. */
    id?: string;
    /** Human-readable name for the schedule. */
    name: string;
    /** UUID of the user who owns this schedule. */
    user_id: string;
    /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
     */
    cron_expression: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
  }[];
};
export type GetSchedulesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type UpsertScheduleApiResponse = /** status 200 Schedule upserted successfully */ {
  /** Unique identifier for the schedule. */
  id?: string;
  /** Human-readable name for the schedule. */
  name: string;
  /** UUID of the user who owns this schedule. */
  user_id: string;
  /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
   */
  cron_expression: string;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
};
export type UpsertScheduleApiArg = {
  body: {
    /** Unique identifier for the schedule. */
    id?: string;
    /** Human-readable name for the schedule. */
    name: string;
    /** UUID of the user who owns this schedule. */
    user_id: string;
    /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
     */
    cron_expression: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
  };
};
export type GetScheduleApiResponse = /** status 200 Schedule fetched successfully */ {
  /** Unique identifier for the schedule. */
  id?: string;
  /** Human-readable name for the schedule. */
  name: string;
  /** UUID of the user who owns this schedule. */
  user_id: string;
  /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
   */
  cron_expression: string;
  /** Timestamp when the resource was created. */
  created_at?: string;
  /** Timestamp when the resource was updated. */
  updated_at?: string;
};
export type GetScheduleApiArg = {
  /** Schedule ID */
  id: string;
};
export type DeleteScheduleApiResponse = unknown;
export type DeleteScheduleApiArg = {
  /** Schedule ID */
  id: string;
};
export type GetSubscriptionsApiResponse = /** status 200 Get subscription response */ {
  page: number;
  page_size: number;
  total_count: number;
  subscriptions: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    ID: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    org_id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    plan_id: string;
    plan?: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Name of the plan */
      name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
      cadence: "monthly" | "yearly";
      unit: "user" | "free";
      /** Minimum number of units required for the plan */
      minimum_units: number;
      /** Price per unit of the plan */
      price_per_unit: number;
      currency: "usd";
    };
    quantity: number;
    start_date?: string;
    end_date?: string;
    /** Possible statuses of a Stripe subscription. */
    status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    /** Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe */
    billing_id: string;
  }[];
};
export type GetSubscriptionsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get ordered responses */
  order?: string;
  /** Filter subscriptions by status */
  status?: string[];
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiResponse = /** status 200 undefined */ {
  page: number;
  page_size: number;
  total_count: number;
  subscriptions: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    ID: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    org_id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    plan_id: string;
    plan?: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Name of the plan */
      name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
      cadence: "monthly" | "yearly";
      unit: "user" | "free";
      /** Minimum number of units required for the plan */
      minimum_units: number;
      /** Price per unit of the plan */
      price_per_unit: number;
      currency: "usd";
    };
    quantity: number;
    start_date?: string;
    end_date?: string;
    /** Possible statuses of a Stripe subscription. */
    status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    /** Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe */
    billing_id: string;
  }[];
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiArg = {
  /** Subscription ID */
  subscriptionId: string;
};
export type PostApiEntitlementSubscriptionsCreateApiResponse = /** status 200 A new subscription has been created */ {
  subscription_id?: string;
  clientSecret?: string;
};
export type PostApiEntitlementSubscriptionsCreateApiArg = {
  body: {
    /** Organization ID */
    org_id?: string;
    /** Price ID from the payment processor */
    plan_id?: string;
    /** Coupon ID to apply */
    coupon_id?: string;
    /** Number of users in the organization */
    user_count?: number;
    /** Email of the customer */
    email?: string;
    /** Supported payment processors */
    payment_processor?: "stripe" | "paypal" | "braintree";
  };
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiResponse = /** status 200 undefined */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  ID: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  org_id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  plan_id: string;
  plan?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Name of the plan */
    name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
    cadence: "monthly" | "yearly";
    unit: "user" | "free";
    /** Minimum number of units required for the plan */
    minimum_units: number;
    /** Price per unit of the plan */
    price_per_unit: number;
    currency: "usd";
  };
  quantity: number;
  start_date?: string;
  end_date?: string;
  /** Possible statuses of a Stripe subscription. */
  status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  /** Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe */
  billing_id: string;
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiArg = {
  /** Subscription ID */
  subscriptionId: string;
  body: {
    /** Old Plan id that is being changed */
    old_plan_id?: string;
    /** New Plan id that is being changed to */
    new_plan_id?: string;
  };
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiResponse =
  /** status 200 Preview of the upgraded subscription invoice */ object;
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiArg = {
  /** Subscription ID */
  subscriptionId: string;
  body: {
    /** Old Plan id that is being changed */
    old_plan_id?: string;
    /** New Plan id that is being changed to */
    new_plan_id?: string;
  };
};
export type PostApiEntitlementSubscriptionsWebhooksApiResponse = unknown;
export type PostApiEntitlementSubscriptionsWebhooksApiArg = {
  body: object;
};
export type GetTeamsApiResponse = /** status 200 Teams */ {
  page?: number;
  page_size?: number;
  total_count?: number;
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
export type GetTeamUsersApiResponse = /** status 200 Team users mapping */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  teams_users_mapping?: {
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
export type AddUserToTeamApiResponse = /** status 200 User added to team */ {
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
export type RemoveUserFromTeamApiResponse = /** status 200 User removed from team */ {
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
export type RemoveUserFromTeamApiArg = {
  /** Organization ID */
  orgId: string;
  /** Team ID */
  teamId: string;
  /** User ID */
  userId: string;
};
export type GetApiWorkspacesApiResponse = /** status 200 List of workspaces */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  workspaces?: {
    ID?: string;
    name?: string;
    description?: string;
    organization_id?: string;
    owner?: string;
    created_at?: string;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetApiWorkspacesApiArg = void;
export type PostApiWorkspacesApiResponse = /** status 201 Workspace created successfully */ {
  ID?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type PostApiWorkspacesApiArg = {
  /** Body for creating workspace */
  body: {
    /** Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation. */
    name: string;
    /** Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces) */
    description?: string;
    /** Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation. */
    organization_id: string;
  };
};
export type GetApiWorkspacesByIdApiResponse = /** status 200 Workspace details */ {
  ID?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type GetApiWorkspacesByIdApiArg = {
  id: string;
};
export type PutApiWorkspacesByIdApiResponse = /** status 200 Workspace updated successfully */ {
  ID?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type PutApiWorkspacesByIdApiArg = {
  id: string;
  /** Body for updating workspace */
  body: {
    /** Name of workspace */
    name?: string;
    /** Environment description */
    description?: string;
    /** Organization ID */
    organization_id: string;
  };
};
export type DeleteApiWorkspacesByIdApiResponse = unknown;
export type DeleteApiWorkspacesByIdApiArg = {
  id: string;
};
export const {
  useGetMyAcademyCirriculaQuery,
  useCreateAcademyCurriculaMutation,
  useGetAcademyCirriculaQuery,
  useGetApiAcademyByTypeAndOrgIdSlugQuery,
  useRegisterToAcademyContentMutation,
  useWithdrawFromAcademyContentMutation,
  useUpdateAcademyCurriculaByIdMutation,
  useDeleteAcademyCurriculaByIdMutation,
  useGetAcademyCurriculaByIdQuery,
  useGetApiAcademyRegistrationsByContentIdQuery,
  useUpdateCurrentItemInProgressTrackerMutation,
  useGetTestByAbsPathQuery,
  useStartTestByIdMutation,
  useGetAllTestSessionsForRegistrationQuery,
  useSubmitQuizMutation,
  useGetAcademyAdminSummaryQuery,
  useGetAcademyAdminRegistrationsQuery,
  useGetCertificateByIdQuery,
  useDeleteBadgeByIdMutation,
  useGetBadgeByIdQuery,
  useCreateOrUpdateBadgeMutation,
  useGetConnectionsQuery,
  useRegisterConnectionMutation,
  useGetConnectionByIdQuery,
  useUpdateConnectionMutation,
  useDeleteConnectionMutation,
  useDeleteMesheryConnectionMutation,
  useGetKubernetesContextQuery,
  useAddConnectionToEnvironmentMutation,
  useRemoveConnectionFromEnvironmentMutation,
  useGetUserCredentialsQuery,
  useSaveUserCredentialMutation,
  useUpdateUserCredentialMutation,
  useGetCredentialByIdQuery,
  useDeleteUserCredentialMutation,
  useGetPatternsQuery,
  useUpsertPatternMutation,
  useDeletePatternsMutation,
  useGetPatternResourcesQuery,
  useUpsertPatternResourceMutation,
  useGetPatternResourceQuery,
  useDeletePatternResourceMutation,
  useGetPatternQuery,
  useDeletePatternMutation,
  useClonePatternMutation,
  useGetDesignPatternFileQuery,
  useUpsertPatternSourceContentMutation,
  useImportDesignMutation,
  useCreateEnvironmentMutation,
  useGetEnvironmentsQuery,
  useDeleteEventsByIdMutation,
  usePostEventsMutation,
  useDeleteEventsMutation,
  usePutEventsStatusMutation,
  usePutEventsByIdStatusMutation,
  useGetFeaturesQuery,
  useGetFeaturesByOrganizationQuery,
  useGetInvitationQuery,
  useDeleteInvitationMutation,
  useUpdateInvitationMutation,
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useGetUserKeysQuery,
  useGetKeysQuery,
  useUpsertKeyMutation,
  useGetKeyByIdQuery,
  useDeleteKeyMutation,
  useGetKeychainsQuery,
  useCreateKeychainMutation,
  useGetKeychainByIdQuery,
  useUpdateKeychainMutation,
  useDeleteKeychainMutation,
  useAddKeyToKeychainMutation,
  useRemoveKeyFromKeychainMutation,
  useGetKeysOfKeychainQuery,
  useRegisterMeshmodelsMutation,
  useGetOrgByDomainQuery,
  useAddTeamToOrgMutation,
  useRemoveTeamFromOrgMutation,
  useGetPlansQuery,
  useAddRoleHolderMutation,
  useDeleteRoleMutation,
  useGetAllRolesQuery,
  useUpsertRolesMutation,
  useBulkEditRoleHolderMutation,
  useGetRoleKeychainsQuery,
  useAssignKeychainToRoleMutation,
  useUnassignKeychainFromRoleMutation,
  useGetSchedulesQuery,
  useUpsertScheduleMutation,
  useGetScheduleQuery,
  useDeleteScheduleMutation,
  useGetSubscriptionsQuery,
  usePostApiEntitlementSubscriptionsBySubscriptionIdCancelMutation,
  usePostApiEntitlementSubscriptionsCreateMutation,
  usePostApiEntitlementSubscriptionsBySubscriptionIdUpgradeMutation,
  usePostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewMutation,
  usePostApiEntitlementSubscriptionsWebhooksMutation,
  useGetTeamsQuery,
  useCreateTeamMutation,
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetTeamUsersQuery,
  useAddUserToTeamMutation,
  useRemoveUserFromTeamMutation,
  useGetApiWorkspacesQuery,
  usePostApiWorkspacesMutation,
  useGetApiWorkspacesByIdQuery,
  usePutApiWorkspacesByIdMutation,
  useDeleteApiWorkspacesByIdMutation,
} = injectedRtkApi;

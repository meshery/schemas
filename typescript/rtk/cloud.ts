import { cloudBaseApi as api } from "./api";
export const addTagTypes = [
  "Feature_Features",
  "Support_Support",
  "Badge_Badge",
  "credential_credentials",
  "Key_users",
  "Key_Key",
  "Keychain_Keychain",
  "Model_Models",
  "Organization_Organizations",
  "Team_teams",
  "role_roles",
  "schedule_scheduler",
  "User_users",
  "View_views",
  "Academy_API_Academy",
  "Connection_API_Connections",
  "Design_designs",
  "Environment_environments",
  "Events_events",
  "Filter_filters",
  "Invitation_Invitation",
  "Performance_Profile_performance",
  "Plan_Plans",
  "Subscription_Subscriptions",
  "Subscription_Payment Processors",
  "token_tokens",
  "Workspace_workspaces",
  "Workspace_designs",
  "Workspace_views",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
      submitSupportRequest: build.mutation<SubmitSupportRequestApiResponse, SubmitSupportRequestApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/support`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Support_Support"],
      }),
      deleteBadgeById: build.mutation<DeleteBadgeByIdApiResponse, DeleteBadgeByIdApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges/${queryArg.badgeId}`, method: "DELETE" }),
        invalidatesTags: ["Badge_Badge"],
      }),
      getBadgeById: build.query<GetBadgeByIdApiResponse, GetBadgeByIdApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges/${queryArg.badgeId}` }),
        providesTags: ["Badge_Badge"],
      }),
      createOrUpdateBadge: build.mutation<CreateOrUpdateBadgeApiResponse, CreateOrUpdateBadgeApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Badge_Badge"],
      }),
      getAvailableBadges: build.query<GetAvailableBadgesApiResponse, GetAvailableBadgesApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/badges`,
          params: {
            orgId: queryArg?.orgId,
          },
        }),
        providesTags: ["Badge_Badge"],
      }),
      assignBadges: build.mutation<AssignBadgesApiResponse, AssignBadgesApiArg>({
        query: (queryArg) => ({ url: `/api/identity/users/badges`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Badge_Badge"],
      }),
      getUserCredentials: build.query<GetUserCredentialsApiResponse, GetUserCredentialsApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/credentials`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
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
      deleteUserCredential: build.mutation<DeleteUserCredentialApiResponse, DeleteUserCredentialApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/credentials`,
          method: "DELETE",
          params: {
            credentialId: queryArg?.credentialId,
          },
        }),
        invalidatesTags: ["credential_credentials"],
      }),
      getCredentialById: build.query<GetCredentialByIdApiResponse, GetCredentialByIdApiArg>({
        query: (queryArg) => ({ url: `/api/integrations/credentials/${queryArg.credentialId}` }),
        providesTags: ["credential_credentials"],
      }),
      getUserKeys: build.query<GetUserKeysApiResponse, GetUserKeysApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/users/keys`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
          },
        }),
        providesTags: ["Key_users"],
      }),
      getKeys: build.query<GetKeysApiResponse, GetKeysApiArg>({
        query: (queryArg) => ({
          url: `/api/auth/keys`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
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
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
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
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["Keychain_Keychain"],
      }),
      registerMeshmodels: build.mutation<RegisterMeshmodelsApiResponse, RegisterMeshmodelsApiArg>({
        query: (queryArg) => ({ url: `/api/meshmodels/register`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Model_Models"],
      }),
      getMeshModelModels: build.query<GetMeshModelModelsApiResponse, GetMeshModelModelsApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/meshmodels/models`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["Model_Models"],
      }),
      getOrgs: build.query<GetOrgsApiResponse, GetOrgsApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            all: queryArg?.all,
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
            domain: queryArg?.domain,
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
      updateOrg: build.mutation<UpdateOrgApiResponse, UpdateOrgApiArg>({
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
      addRoleHolder: build.mutation<AddRoleHolderApiResponse, AddRoleHolderApiArg>({
        query: (queryArg) => ({ url: `/api/identity/roles`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["role_roles"],
      }),
      deleteRole: build.mutation<DeleteRoleApiResponse, DeleteRoleApiArg>({
        query: (queryArg) => ({ url: `/api/identity/roles/${queryArg.roleId}`, method: "DELETE" }),
        invalidatesTags: ["role_roles"],
      }),
      getAllRoles: build.query<GetAllRolesApiResponse, GetAllRolesApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            all: queryArg?.all,
            selector: queryArg?.selector,
            teamId: queryArg?.teamId,
          },
        }),
        providesTags: ["role_roles"],
      }),
      upsertRole: build.mutation<UpsertRoleApiResponse, UpsertRoleApiArg>({
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
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/roles/${queryArg.roleId}/keychains`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
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
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["schedule_scheduler"],
      }),
      upsertSchedule: build.mutation<UpsertScheduleApiResponse, UpsertScheduleApiArg>({
        query: (queryArg) => ({ url: `/user/schedules`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["schedule_scheduler"],
      }),
      getSchedule: build.query<GetScheduleApiResponse, GetScheduleApiArg>({
        query: (queryArg) => ({ url: `/user/schedules/${queryArg.scheduleId}` }),
        providesTags: ["schedule_scheduler"],
      }),
      deleteSchedule: build.mutation<DeleteScheduleApiResponse, DeleteScheduleApiArg>({
        query: (queryArg) => ({ url: `/user/schedules/${queryArg.scheduleId}`, method: "DELETE" }),
        invalidatesTags: ["schedule_scheduler"],
      }),
      getTeams: build.query<GetTeamsApiResponse, GetTeamsApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/teams`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
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
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
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
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
          },
        }),
        providesTags: ["Team_teams"],
      }),
      getUsersForOrg: build.query<GetUsersForOrgApiResponse, GetUsersForOrgApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/users`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            filter: queryArg?.filter,
            teamId: queryArg?.teamId,
          },
        }),
        providesTags: ["User_users"],
      }),
      getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
        query: (queryArg) => ({
          url: `/api/users`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            filter: queryArg?.filter,
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
      createView: build.mutation<CreateViewApiResponse, CreateViewApiArg>({
        query: (queryArg) => ({ url: `/api/content/views`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["View_views"],
      }),
      getViews: build.query<GetViewsApiResponse, GetViewsApiArg>({
        query: (queryArg) => ({
          url: `/api/content/views`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
            shared: queryArg?.shared,
            visibility: queryArg?.visibility,
            orgId: queryArg?.orgId,
            userId: queryArg?.userId,
          },
        }),
        providesTags: ["View_views"],
      }),
      shareView: build.mutation<ShareViewApiResponse, ShareViewApiArg>({
        query: (queryArg) => ({ url: `/api/content/view/share`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["View_views"],
      }),
      getViewById: build.query<GetViewByIdApiResponse, GetViewByIdApiArg>({
        query: (queryArg) => ({ url: `/api/content/views/${queryArg.viewId}` }),
        providesTags: ["View_views"],
      }),
      updateView: build.mutation<UpdateViewApiResponse, UpdateViewApiArg>({
        query: (queryArg) => ({ url: `/api/content/views/${queryArg.viewId}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["View_views"],
      }),
      deleteView: build.mutation<DeleteViewApiResponse, DeleteViewApiArg>({
        query: (queryArg) => ({ url: `/api/content/views/${queryArg.viewId}`, method: "DELETE" }),
        invalidatesTags: ["View_views"],
      }),
      getMyAcademyCurricula: build.query<GetMyAcademyCurriculaApiResponse, GetMyAcademyCurriculaApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/curricula/registered`,
          params: {
            contentType: queryArg?.contentType,
            orgId: queryArg?.orgId,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      createAcademyCurricula: build.mutation<CreateAcademyCurriculaApiResponse, CreateAcademyCurriculaApiArg>({
        query: (queryArg) => ({ url: `/api/academy/curricula`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAcademyCurricula: build.query<GetAcademyCurriculaApiResponse, GetAcademyCurriculaApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/curricula`,
          params: {
            contentType: queryArg?.contentType,
            visibility: queryArg?.visibility,
            level: queryArg?.level,
            orgId: queryArg?.orgId,
            category: queryArg?.category,
            status: queryArg?.status,
            search: queryArg?.search,
            sort: queryArg?.sort,
            order: queryArg?.order,
            pagesize: queryArg?.pagesize,
            page: queryArg?.page,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      getAcademyContent: build.query<GetAcademyContentApiResponse, GetAcademyContentApiArg>({
        query: (queryArg) => ({ url: `/api/academy/${queryArg["type"]}/${queryArg.orgId}/${queryArg.slug}` }),
        providesTags: ["Academy_API_Academy"],
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
            status: queryArg?.status,
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
            absPath: queryArg?.absPath,
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
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            testAbsPath: queryArg?.testAbsPath,
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
            pagesize: queryArg?.pagesize,
            page: queryArg?.page,
            contentType: queryArg?.contentType,
            status: queryArg?.status,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      getCertificateById: build.query<GetCertificateByIdApiResponse, GetCertificateByIdApiArg>({
        query: (queryArg) => ({ url: `/api/academy/certificates/${queryArg.certificateId}` }),
        providesTags: ["Academy_API_Academy"],
      }),
      getConnections: build.query<GetConnectionsApiResponse, GetConnectionsApiArg>({
        query: (queryArg) => ({
          url: `/api/integrations/connections`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            orgId: queryArg?.orgId,
            filter: queryArg?.filter,
            kind: queryArg?.kind,
            status: queryArg?.status,
            type: queryArg?.["type"],
            name: queryArg?.name,
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
      getPatterns: build.query<GetPatternsApiResponse, GetPatternsApiArg>({
        query: (queryArg) => ({
          url: `/api/content/patterns`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            orgId: queryArg?.orgId,
            visibility: queryArg?.visibility,
            userId: queryArg?.userId,
            metrics: queryArg?.metrics,
            workspaceId: queryArg?.workspaceId,
            populate: queryArg?.populate,
            shared: queryArg?.shared,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      upsertPattern: build.mutation<UpsertPatternApiResponse, UpsertPatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      deletePatterns: build.mutation<DeletePatternsApiResponse, DeletePatternsApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/delete`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      getPatternResources: build.query<GetPatternResourcesApiResponse, GetPatternResourcesApiArg>({
        query: (queryArg) => ({
          url: `/api/content/patterns/resource`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      upsertPatternResource: build.mutation<UpsertPatternResourceApiResponse, UpsertPatternResourceApiArg>({
        query: () => ({ url: `/api/content/patterns/resource`, method: "POST" }),
        invalidatesTags: ["Design_designs"],
      }),
      getPatternResource: build.query<GetPatternResourceApiResponse, GetPatternResourceApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/resource/${queryArg.designId}` }),
        providesTags: ["Design_designs"],
      }),
      deletePatternResource: build.mutation<DeletePatternResourceApiResponse, DeletePatternResourceApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/resource/${queryArg.designId}`, method: "DELETE" }),
        invalidatesTags: ["Design_designs"],
      }),
      getPattern: build.query<GetPatternApiResponse, GetPatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/${queryArg.designId}` }),
        providesTags: ["Design_designs"],
      }),
      deletePattern: build.mutation<DeletePatternApiResponse, DeletePatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/${queryArg.designId}`, method: "DELETE" }),
        invalidatesTags: ["Design_designs"],
      }),
      clonePattern: build.mutation<ClonePatternApiResponse, ClonePatternApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/clone/${queryArg.designId}`, method: "POST" }),
        invalidatesTags: ["Design_designs"],
      }),
      getDesignPatternFile: build.query<GetDesignPatternFileApiResponse, GetDesignPatternFileApiArg>({
        query: (queryArg) => ({ url: `/api/content/patterns/download/${queryArg.designId}` }),
        providesTags: ["Design_designs"],
      }),
      upsertPatternSourceContent: build.mutation<
        UpsertPatternSourceContentApiResponse,
        UpsertPatternSourceContentApiArg
      >({
        query: (queryArg) => ({
          url: `/api/content/patterns/upload/${queryArg.designId}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Design_designs"],
      }),
      importDesign: build.mutation<ImportDesignApiResponse, ImportDesignApiArg>({
        query: (queryArg) => ({ url: `/api/pattern/import`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      getCatalogContent: build.query<GetCatalogContentApiResponse, GetCatalogContentApiArg>({
        query: (queryArg) => ({
          url: `/api/catalog/content/${queryArg.pathType}`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            type: queryArg?.queryType,
            technology: queryArg?.technology,
            metrics: queryArg?.metrics,
            class: queryArg?.["class"],
            userId: queryArg?.userId,
            orgId: queryArg?.orgId,
            workspaceId: queryArg?.workspaceId,
            teamId: queryArg?.teamId,
            populate: queryArg?.populate,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      publishCatalogContent: build.mutation<PublishCatalogContentApiResponse, PublishCatalogContentApiArg>({
        query: (queryArg) => ({ url: `/api/catalog/content/${queryArg["type"]}`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      unPublishCatalogContent: build.mutation<UnPublishCatalogContentApiResponse, UnPublishCatalogContentApiArg>({
        query: (queryArg) => ({
          url: `/api/catalog/content/${queryArg["type"]}/unpublish`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Design_designs"],
      }),
      getCatalogContentClasses: build.query<GetCatalogContentClassesApiResponse, GetCatalogContentClassesApiArg>({
        query: (queryArg) => ({
          url: `/api/catalog/content/classes`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      approveCatalogRequest: build.mutation<ApproveCatalogRequestApiResponse, ApproveCatalogRequestApiArg>({
        query: (queryArg) => ({ url: `/api/catalog/requests/approve`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      denyCatalogRequest: build.mutation<DenyCatalogRequestApiResponse, DenyCatalogRequestApiArg>({
        query: (queryArg) => ({ url: `/api/catalog/requests/deny`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      handleResourceShare: build.mutation<HandleResourceShareApiResponse, HandleResourceShareApiArg>({
        query: (queryArg) => ({
          url: `/api/resource/${queryArg.resourceType}/share/${queryArg.resourceId}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Design_designs"],
      }),
      getResourceAccessActorsByType: build.query<
        GetResourceAccessActorsByTypeApiResponse,
        GetResourceAccessActorsByTypeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/resource/${queryArg.resourceType}/share/${queryArg.resourceId}/${queryArg.actorType}`,
        }),
        providesTags: ["Design_designs"],
      }),
      shareDesign: build.mutation<ShareDesignApiResponse, ShareDesignApiArg>({
        query: (queryArg) => ({ url: `/api/content/design/share`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Design_designs"],
      }),
      getCatalogRequest: build.query<GetCatalogRequestApiResponse, GetCatalogRequestApiArg>({
        query: (queryArg) => ({
          url: `/api/catalog/requests`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Design_designs"],
      }),
      createEnvironment: build.mutation<CreateEnvironmentApiResponse, CreateEnvironmentApiArg>({
        query: (queryArg) => ({ url: `/api/environments`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Environment_environments"],
      }),
      getEnvironments: build.query<GetEnvironmentsApiResponse, GetEnvironmentsApiArg>({
        query: (queryArg) => ({
          url: `/api/environments`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            orgId: queryArg?.orgId,
          },
        }),
        providesTags: ["Environment_environments"],
      }),
      getEnvironmentById: build.query<GetEnvironmentByIdApiResponse, GetEnvironmentByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/environments/${queryArg.environmentId}`,
          params: {
            orgId: queryArg?.orgId,
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
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Environment_environments"],
      }),
      deleteEvent: build.mutation<DeleteEventApiResponse, DeleteEventApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.eventId}`, method: "DELETE" }),
        invalidatesTags: ["Events_events"],
      }),
      createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
        query: (queryArg) => ({ url: `/events`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      bulkDeleteEvents: build.mutation<BulkDeleteEventsApiResponse, BulkDeleteEventsApiArg>({
        query: (queryArg) => ({ url: `/events/delete`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      bulkUpdateEventStatus: build.mutation<BulkUpdateEventStatusApiResponse, BulkUpdateEventStatusApiArg>({
        query: (queryArg) => ({ url: `/events/status`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      updateEventStatus: build.mutation<UpdateEventStatusApiResponse, UpdateEventStatusApiArg>({
        query: (queryArg) => ({ url: `/events/${queryArg.eventId}/status`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Events_events"],
      }),
      getEventsOfWorkspace: build.query<GetEventsOfWorkspaceApiResponse, GetEventsOfWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/events`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["Events_events"],
      }),
      getEventsAggregate: build.query<GetEventsAggregateApiResponse, GetEventsAggregateApiArg>({
        query: (queryArg) => ({
          url: `/api/events`,
          params: {
            cumulative: queryArg?.cumulative,
          },
        }),
        providesTags: ["Events_events"],
      }),
      getEvents: build.query<GetEventsApiResponse, GetEventsApiArg>({
        query: (queryArg) => ({
          url: `/api/events/list`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Events_events"],
      }),
      getEventSummaryByUser: build.query<GetEventSummaryByUserApiResponse, GetEventSummaryByUserApiArg>({
        query: (queryArg) => ({
          url: `/api/events/summary`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Events_events"],
      }),
      getEventTypes: build.query<GetEventTypesApiResponse, GetEventTypesApiArg>({
        query: (queryArg) => ({
          url: `/api/events/types`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
          },
        }),
        providesTags: ["Events_events"],
      }),
      getFilters: build.query<GetFiltersApiResponse, GetFiltersApiArg>({
        query: (queryArg) => ({
          url: `/api/content/filters`,
          params: {
            page: queryArg?.page,
            pageSize: queryArg?.pageSize,
            search: queryArg?.search,
            order: queryArg?.order,
            orgId: queryArg?.orgId,
            visibility: queryArg?.visibility,
            userId: queryArg?.userId,
          },
        }),
        providesTags: ["Filter_filters"],
      }),
      upsertFilter: build.mutation<UpsertFilterApiResponse, UpsertFilterApiArg>({
        query: (queryArg) => ({ url: `/api/content/filters`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Filter_filters"],
      }),
      deleteFilters: build.mutation<DeleteFiltersApiResponse, DeleteFiltersApiArg>({
        query: (queryArg) => ({ url: `/api/content/filters/delete`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Filter_filters"],
      }),
      getFilter: build.query<GetFilterApiResponse, GetFilterApiArg>({
        query: (queryArg) => ({ url: `/api/content/filters/${queryArg.filterId}` }),
        providesTags: ["Filter_filters"],
      }),
      updateFilter: build.mutation<UpdateFilterApiResponse, UpdateFilterApiArg>({
        query: (queryArg) => ({ url: `/api/content/filters/${queryArg.filterId}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Filter_filters"],
      }),
      deleteFilter: build.mutation<DeleteFilterApiResponse, DeleteFilterApiArg>({
        query: (queryArg) => ({ url: `/api/content/filters/${queryArg.filterId}`, method: "DELETE" }),
        invalidatesTags: ["Filter_filters"],
      }),
      cloneFilter: build.mutation<CloneFilterApiResponse, CloneFilterApiArg>({
        query: (queryArg) => ({
          url: `/api/content/filters/clone/${queryArg.filterId}`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Filter_filters"],
      }),
      getFilterFile: build.query<GetFilterFileApiResponse, GetFilterFileApiArg>({
        query: (queryArg) => ({ url: `/api/content/filters/download/${queryArg.filterId}` }),
        providesTags: ["Filter_filters"],
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
      handleUserInvite: build.mutation<HandleUserInviteApiResponse, HandleUserInviteApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/orgs/${queryArg.orgId}/users/invite`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      signupRequest: build.mutation<SignupRequestApiResponse, SignupRequestApiArg>({
        query: (queryArg) => ({ url: `/api/identity/users/request`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      getSignupRequests: build.query<GetSignupRequestsApiResponse, GetSignupRequestsApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/users/request`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Invitation_Invitation"],
      }),
      approveSignupRequest: build.mutation<ApproveSignupRequestApiResponse, ApproveSignupRequestApiArg>({
        query: () => ({ url: `/api/identity/users/request/approve`, method: "POST" }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      denySignupRequest: build.mutation<DenySignupRequestApiResponse, DenySignupRequestApiArg>({
        query: () => ({ url: `/api/identity/users/request/deny`, method: "POST" }),
        invalidatesTags: ["Invitation_Invitation"],
      }),
      getSignupRequestNotification: build.query<
        GetSignupRequestNotificationApiResponse,
        GetSignupRequestNotificationApiArg
      >({
        query: () => ({ url: `/api/identity/users/request/notification` }),
        providesTags: ["Invitation_Invitation"],
      }),
      getPerformanceProfiles: build.query<GetPerformanceProfilesApiResponse, GetPerformanceProfilesApiArg>({
        query: (queryArg) => ({
          url: `/api/performance-profiles`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["Performance_Profile_performance"],
      }),
      upsertPerformanceProfile: build.mutation<UpsertPerformanceProfileApiResponse, UpsertPerformanceProfileApiArg>({
        query: (queryArg) => ({ url: `/api/performance-profiles`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Performance_Profile_performance"],
      }),
      getPerformanceProfile: build.query<GetPerformanceProfileApiResponse, GetPerformanceProfileApiArg>({
        query: (queryArg) => ({ url: `/api/performance-profiles/${queryArg.performanceProfileId}` }),
        providesTags: ["Performance_Profile_performance"],
      }),
      updatePerformanceProfile: build.mutation<UpdatePerformanceProfileApiResponse, UpdatePerformanceProfileApiArg>({
        query: (queryArg) => ({
          url: `/api/performance-profiles/${queryArg.performanceProfileId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Performance_Profile_performance"],
      }),
      deletePerformanceProfile: build.mutation<DeletePerformanceProfileApiResponse, DeletePerformanceProfileApiArg>({
        query: (queryArg) => ({ url: `/api/performance-profiles/${queryArg.performanceProfileId}`, method: "DELETE" }),
        invalidatesTags: ["Performance_Profile_performance"],
      }),
      getPlans: build.query<GetPlansApiResponse, GetPlansApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/plans`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
          },
        }),
        providesTags: ["Plan_Plans"],
      }),
      getSubscriptions: build.query<GetSubscriptionsApiResponse, GetSubscriptionsApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions`,
          params: {
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            order: queryArg?.order,
            status: queryArg?.status,
            planId: queryArg?.planId,
          },
        }),
        providesTags: ["Subscription_Subscriptions"],
      }),
      cancelSubscription: build.mutation<CancelSubscriptionApiResponse, CancelSubscriptionApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/cancel`,
          method: "POST",
        }),
        invalidatesTags: ["Subscription_Subscriptions"],
      }),
      createSubscription: build.mutation<CreateSubscriptionApiResponse, CreateSubscriptionApiArg>({
        query: (queryArg) => ({ url: `/api/entitlement/subscriptions/create`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Subscription_Subscriptions"],
      }),
      upgradeSubscription: build.mutation<UpgradeSubscriptionApiResponse, UpgradeSubscriptionApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/upgrade`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Subscription_Subscriptions"],
      }),
      previewSubscriptionUpgrade: build.mutation<
        PreviewSubscriptionUpgradeApiResponse,
        PreviewSubscriptionUpgradeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/upgrade-preview`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Subscription_Subscriptions"],
      }),
      handleSubscriptionWebhook: build.mutation<HandleSubscriptionWebhookApiResponse, HandleSubscriptionWebhookApiArg>({
        query: (queryArg) => ({ url: `/api/entitlement/subscriptions/webhooks`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Subscription_Payment Processors"],
      }),
      getUserTokens: build.query<GetUserTokensApiResponse, GetUserTokensApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/tokens`,
          params: {
            isOauth: queryArg?.isOauth,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            search: queryArg?.search,
            order: queryArg?.order,
          },
        }),
        providesTags: ["token_tokens"],
      }),
      generateToken: build.mutation<GenerateTokenApiResponse, GenerateTokenApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/tokens`,
          method: "POST",
          params: {
            name: queryArg?.name,
            purpose: queryArg?.purpose,
          },
        }),
        invalidatesTags: ["token_tokens"],
      }),
      deleteUserToken: build.mutation<DeleteUserTokenApiResponse, DeleteUserTokenApiArg>({
        query: (queryArg) => ({
          url: `/api/identity/tokens`,
          method: "DELETE",
          params: {
            tokenId: queryArg?.tokenId,
          },
        }),
        invalidatesTags: ["token_tokens"],
      }),
      getUserTokensById: build.query<GetUserTokensByIdApiResponse, GetUserTokensByIdApiArg>({
        query: (queryArg) => ({ url: `/api/identity/tokens/${queryArg.tokenId}` }),
        providesTags: ["token_tokens"],
      }),
      issueIndefiniteLifetimeToken: build.query<
        IssueIndefiniteLifetimeTokenApiResponse,
        IssueIndefiniteLifetimeTokenApiArg
      >({
        query: (queryArg) => ({
          url: `/api/identity/tokens/infinite`,
          params: {
            userId: queryArg?.userId,
            provider: queryArg?.provider,
          },
        }),
        providesTags: ["token_tokens"],
      }),
      getWorkspaces: build.query<GetWorkspacesApiResponse, GetWorkspacesApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces`,
          params: {
            orgId: queryArg?.orgId,
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Workspace_workspaces"],
      }),
      createWorkspace: build.mutation<CreateWorkspaceApiResponse, CreateWorkspaceApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      getWorkspaceById: build.query<GetWorkspaceByIdApiResponse, GetWorkspaceByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.workspaceId}` }),
        providesTags: ["Workspace_workspaces"],
      }),
      updateWorkspace: build.mutation<UpdateWorkspaceApiResponse, UpdateWorkspaceApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.workspaceId}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      deleteWorkspace: build.mutation<DeleteWorkspaceApiResponse, DeleteWorkspaceApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.workspaceId}`, method: "DELETE" }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      getTeamsOfWorkspace: build.query<GetTeamsOfWorkspaceApiResponse, GetTeamsOfWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/teams`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Workspace_workspaces"],
      }),
      assignTeamToWorkspace: build.mutation<AssignTeamToWorkspaceApiResponse, AssignTeamToWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/teams/${queryArg.teamId}`,
          method: "POST",
        }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      unassignTeamFromWorkspace: build.mutation<UnassignTeamFromWorkspaceApiResponse, UnassignTeamFromWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/teams/${queryArg.teamId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      getEnvironmentsOfWorkspace: build.query<GetEnvironmentsOfWorkspaceApiResponse, GetEnvironmentsOfWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/environments`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Workspace_workspaces"],
      }),
      assignEnvironmentToWorkspace: build.mutation<
        AssignEnvironmentToWorkspaceApiResponse,
        AssignEnvironmentToWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/environments/${queryArg.environmentId}`,
          method: "POST",
        }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      unassignEnvironmentFromWorkspace: build.mutation<
        UnassignEnvironmentFromWorkspaceApiResponse,
        UnassignEnvironmentFromWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/environments/${queryArg.environmentId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Workspace_workspaces"],
      }),
      getDesignsOfWorkspace: build.query<GetDesignsOfWorkspaceApiResponse, GetDesignsOfWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/designs`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Workspace_workspaces", "Workspace_designs"],
      }),
      assignDesignToWorkspace: build.mutation<AssignDesignToWorkspaceApiResponse, AssignDesignToWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/designs/${queryArg.designId}`,
          method: "POST",
        }),
        invalidatesTags: ["Workspace_workspaces", "Workspace_designs"],
      }),
      unassignDesignFromWorkspace: build.mutation<
        UnassignDesignFromWorkspaceApiResponse,
        UnassignDesignFromWorkspaceApiArg
      >({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/designs/${queryArg.designId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Workspace_workspaces", "Workspace_designs"],
      }),
      getViewsOfWorkspace: build.query<GetViewsOfWorkspaceApiResponse, GetViewsOfWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/views`,
          params: {
            search: queryArg?.search,
            order: queryArg?.order,
            page: queryArg?.page,
            pagesize: queryArg?.pagesize,
            filter: queryArg?.filter,
          },
        }),
        providesTags: ["Workspace_workspaces", "Workspace_views"],
      }),
      assignViewToWorkspace: build.mutation<AssignViewToWorkspaceApiResponse, AssignViewToWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/views/${queryArg.viewId}`,
          method: "POST",
        }),
        invalidatesTags: ["Workspace_workspaces", "Workspace_views"],
      }),
      unassignViewFromWorkspace: build.mutation<UnassignViewFromWorkspaceApiResponse, UnassignViewFromWorkspaceApiArg>({
        query: (queryArg) => ({
          url: `/api/workspaces/${queryArg.workspaceId}/views/${queryArg.viewId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Workspace_workspaces", "Workspace_views"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as cloudApi };
export type GetFeaturesApiResponse = /** status 200 Features response */ {
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
  name:
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
export type GetFeaturesByOrganizationApiResponse = /** status 200 Features response */ {
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
  name:
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
export type SubmitSupportRequestApiResponse = /** status 201 Support request submitted */ {
  message?: string;
};
export type SubmitSupportRequestApiArg = {
  body: {
    /** Concise and descriptive title for the support request. */
    subject: string;
    /** Detailed description of the issue or question. */
    message: string;
    /** Category that best represents the nature of the inquiry. */
    scope?: "Support" | "Community" | "Account" | "Commercial";
  };
};
export type DeleteBadgeByIdApiResponse = unknown;
export type DeleteBadgeByIdApiArg = {
  /** Badge ID */
  badgeId: string;
};
export type GetBadgeByIdApiResponse = /** status 200 Badge response */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  orgId: string;
  /** Unique identifier for the badge, typically slug-style (auto generated). */
  label: string;
  /** Concise descriptor for the badge or certificate. */
  name: string;
  /** A description of the milestone achieved, often including criteria for receiving this recognition. */
  description: string;
  /** URL to the badge image. */
  imageUrl: string;
  /** Timestamp when the badge was created. */
  createdAt: string;
  /** Timestamp when the badge was last updated. */
  updatedAt: string;
  /** Timestamp when the badge was soft-deleted, if applicable. */
  deletedAt: string;
};
export type GetBadgeByIdApiArg = {
  /** Badge ID */
  badgeId: string;
};
export type CreateOrUpdateBadgeApiResponse = /** status 200 Badge upserted */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  orgId: string;
  /** Unique identifier for the badge, typically slug-style (auto generated). */
  label: string;
  /** Concise descriptor for the badge or certificate. */
  name: string;
  /** A description of the milestone achieved, often including criteria for receiving this recognition. */
  description: string;
  /** URL to the badge image. */
  imageUrl: string;
  /** Timestamp when the badge was created. */
  createdAt: string;
  /** Timestamp when the badge was last updated. */
  updatedAt: string;
  /** Timestamp when the badge was soft-deleted, if applicable. */
  deletedAt: string;
};
export type CreateOrUpdateBadgeApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** Unique identifier for the badge, typically slug-style (auto generated). */
    label: string;
    /** Concise descriptor for the badge or certificate. */
    name: string;
    /** A description of the milestone achieved, often including criteria for receiving this recognition. */
    description: string;
    /** URL to the badge image. */
    imageUrl: string;
  };
};
export type GetAvailableBadgesApiResponse = /** status 200 Available badges */ {
  /** Available badges, keyed by badge label. */
  badges?: {
    [key: string]: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      orgId: string;
      /** Unique identifier for the badge, typically slug-style (auto generated). */
      label: string;
      /** Concise descriptor for the badge or certificate. */
      name: string;
      /** A description of the milestone achieved, often including criteria for receiving this recognition. */
      description: string;
      /** URL to the badge image. */
      imageUrl: string;
      /** Timestamp when the badge was created. */
      createdAt: string;
      /** Timestamp when the badge was last updated. */
      updatedAt: string;
      /** Timestamp when the badge was soft-deleted, if applicable. */
      deletedAt: string;
    };
  };
};
export type GetAvailableBadgesApiArg = {
  /** Organization ID to scope the badge listing to. */
  orgId?: string;
};
export type AssignBadgesApiResponse = /** status 200 Badge assignment result */ {
  [key: string]: any;
};
export type AssignBadgesApiArg = {
  body: {
    /** Labels of the badges being assigned to the user. */
    badges: string[];
    /** ID of the user to receive the badges. */
    userId: string;
    /** When true, send a notification to the user about the new badge assignment. */
    notify?: boolean;
  };
};
export type GetUserCredentialsApiResponse = /** status 200 Credentials response */ {
  /** The credentials returned on the current page. */
  credentials: {
    /** Unique identifier for the credential. */
    id: string;
    /** Human-readable name for the credential. */
    name: string;
    /** UUID of the user who owns this credential. */
    userId: string;
    /** Credential type (e.g. token, basic, AWS). */
    type: string;
    /** Key-value pairs containing the sensitive credential data. */
    secret?: object;
    /** Timestamp when the credential was created. */
    createdAt: string;
    /** Timestamp when the credential was last updated. */
    updatedAt: string;
    /** Timestamp when the credential was soft-deleted. */
    deletedAt?: string;
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
export type SaveUserCredentialApiResponse = /** status 201 Credential saved */ {
  /** Unique identifier for the credential. */
  id: string;
  /** Human-readable name for the credential. */
  name: string;
  /** UUID of the user who owns this credential. */
  userId: string;
  /** Credential type (e.g. token, basic, AWS). */
  type: string;
  /** Key-value pairs containing the sensitive credential data. */
  secret?: object;
  /** Timestamp when the credential was created. */
  createdAt: string;
  /** Timestamp when the credential was last updated. */
  updatedAt: string;
  /** Timestamp when the credential was soft-deleted. */
  deletedAt?: string;
};
export type SaveUserCredentialApiArg = {
  body: {
    /** Existing credential ID for updates; omit on create. */
    id?: string;
    /** Human-readable name for the credential. */
    name: string;
    /** UUID of the user who owns this credential. */
    userId?: string;
    /** Credential type (e.g. token, basic, AWS). */
    type: string;
    /** Key-value pairs containing the sensitive credential data. */
    secret?: object;
  };
};
export type UpdateUserCredentialApiResponse = /** status 200 Credential updated */ {
  /** Unique identifier for the credential. */
  id: string;
  /** Human-readable name for the credential. */
  name: string;
  /** UUID of the user who owns this credential. */
  userId: string;
  /** Credential type (e.g. token, basic, AWS). */
  type: string;
  /** Key-value pairs containing the sensitive credential data. */
  secret?: object;
  /** Timestamp when the credential was created. */
  createdAt: string;
  /** Timestamp when the credential was last updated. */
  updatedAt: string;
  /** Timestamp when the credential was soft-deleted. */
  deletedAt?: string;
};
export type UpdateUserCredentialApiArg = {
  body: {
    /** Existing credential ID for updates; omit on create. */
    id?: string;
    /** Human-readable name for the credential. */
    name: string;
    /** UUID of the user who owns this credential. */
    userId?: string;
    /** Credential type (e.g. token, basic, AWS). */
    type: string;
    /** Key-value pairs containing the sensitive credential data. */
    secret?: object;
  };
};
export type DeleteUserCredentialApiResponse = unknown;
export type DeleteUserCredentialApiArg = {
  /** Credential ID */
  credentialId: string;
};
export type GetCredentialByIdApiResponse = /** status 200 Credential response */ {
  /** Unique identifier for the credential. */
  id: string;
  /** Human-readable name for the credential. */
  name: string;
  /** UUID of the user who owns this credential. */
  userId: string;
  /** Credential type (e.g. token, basic, AWS). */
  type: string;
  /** Key-value pairs containing the sensitive credential data. */
  secret?: object;
  /** Timestamp when the credential was created. */
  createdAt: string;
  /** Timestamp when the credential was last updated. */
  updatedAt: string;
  /** Timestamp when the credential was soft-deleted. */
  deletedAt?: string;
};
export type GetCredentialByIdApiArg = {
  /** Credential ID */
  credentialId: string;
};
export type GetUserKeysApiResponse = /** status 200 Returns user keys based on roles assigned to user */ {
  /** Zero-based page index returned in this response. */
  page: number;
  /** Maximum number of items returned on each page. */
  pageSize: number;
  /** Total number of items across all pages. */
  totalCount: number;
  /** Keys returned on the current page. */
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
    /** Timestamp when the key was created. */
    createdAt: string;
    /** Timestamp when the key was last updated. */
    updatedAt: string;
    /** Timestamp when the key was soft-deleted. */
    deletedAt?: string | null;
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
export type GetKeysApiResponse = /** status 200 Keys fetched */ {
  /** Zero-based page index returned in this response. */
  page: number;
  /** Maximum number of items returned on each page. */
  pageSize: number;
  /** Total number of items across all pages. */
  totalCount: number;
  /** Keys returned on the current page. */
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
    /** Timestamp when the key was created. */
    createdAt: string;
    /** Timestamp when the key was last updated. */
    updatedAt: string;
    /** Timestamp when the key was soft-deleted. */
    deletedAt?: string | null;
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
export type UpsertKeyApiResponse = /** status 200 Key upserted */ {
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
  /** Timestamp when the key was created. */
  createdAt: string;
  /** Timestamp when the key was last updated. */
  updatedAt: string;
  /** Timestamp when the key was soft-deleted. */
  deletedAt?: string | null;
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
export type GetKeyByIdApiResponse = /** status 200 Key response */ {
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
  /** Timestamp when the key was created. */
  createdAt: string;
  /** Timestamp when the key was last updated. */
  updatedAt: string;
  /** Timestamp when the key was soft-deleted. */
  deletedAt?: string | null;
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
  /** Zero-based page index returned in this response. */
  page: number;
  /** Maximum number of items returned on each page. */
  pageSize: number;
  /** Total number of items across all pages. */
  totalCount: number;
  /** Keychains returned on the current page. */
  keychains: {
    /** Unique identifier for the keychain. */
    id: string;
    /** Name of the keychain. */
    name: string;
    /** Owner of the keychain. */
    owner: string;
    /** Timestamp when the keychain was created. */
    createdAt: string;
    /** Timestamp when the keychain was last updated. */
    updatedAt: string;
    /** Timestamp when the keychain was soft-deleted. */
    deletedAt?: string | null;
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
export type CreateKeychainApiResponse = /** status 201 Keychain created */ {
  /** Unique identifier for the keychain. */
  id: string;
  /** Name of the keychain. */
  name: string;
  /** Owner of the keychain. */
  owner: string;
  /** Timestamp when the keychain was created. */
  createdAt: string;
  /** Timestamp when the keychain was last updated. */
  updatedAt: string;
  /** Timestamp when the keychain was soft-deleted. */
  deletedAt?: string | null;
};
export type CreateKeychainApiArg = {
  body: {
    /** Name of the keychain. */
    name: string;
    /** Owner of the keychain. */
    owner?: string;
  };
};
export type GetKeychainByIdApiResponse = /** status 200 Keychain fetched */ {
  /** Unique identifier for the keychain. */
  id: string;
  /** Name of the keychain. */
  name: string;
  /** Owner of the keychain. */
  owner: string;
  /** Timestamp when the keychain was created. */
  createdAt: string;
  /** Timestamp when the keychain was last updated. */
  updatedAt: string;
  /** Timestamp when the keychain was soft-deleted. */
  deletedAt?: string | null;
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
  /** Timestamp when the keychain was created. */
  createdAt: string;
  /** Timestamp when the keychain was last updated. */
  updatedAt: string;
  /** Timestamp when the keychain was soft-deleted. */
  deletedAt?: string | null;
};
export type UpdateKeychainApiArg = {
  /** Keychain ID */
  keychainId: string;
  body: {
    /** Name of the keychain. */
    name: string;
    /** Owner of the keychain. */
    owner?: string;
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
export type GetKeysOfKeychainApiResponse = /** status 200 Keys response */ {
  /** Zero-based page index returned in this response. */
  page: number;
  /** Maximum number of items returned on each page. */
  pageSize: number;
  /** Total number of items across all pages. */
  totalCount: number;
  /** Keys returned on the current page. */
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
    /** Timestamp when the key was created. */
    createdAt: string;
    /** Timestamp when the key was last updated. */
    updatedAt: string;
    /** Timestamp when the key was soft-deleted. */
    deletedAt?: string | null;
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
export type RegisterMeshmodelsApiResponse = /** status 201 Model registered */ {
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
export type GetMeshModelModelsApiResponse = /** status 200 Model and capabilities registry entries retrieved. */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** The models of the meshmodelmodelspage. */
  models?: {
    [key: string]: any;
  }[];
};
export type GetMeshModelModelsApiArg = {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Free-text search query applied to model names. */
  search?: string;
  /** Sort order for the result set (e.g. "name asc"). */
  order?: string;
};
export type GetOrgsApiResponse = /** status 200 Organizations response */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Organizations in this page. */
  organizations?: {
    /** Organization ID. */
    id?: string;
    /** Name of the organization. */
    name?: string;
    /** Description of the organization. */
    description?: string;
    /** Country of the organization. */
    country?: string;
    /** Region of the organization. */
    region?: string;
    /** Display name of the organization owner. */
    owner?: string;
    /** Free-form metadata associated with an organization, including preferences. */
    metadata?: {
      /** Organization-level user experience preferences. */
      preferences: {
        /** UI theme configured for an organization. */
        theme: {
          /** Theme identifier. */
          id: string;
          /** Themed logo assets used across light and dark, desktop and mobile presentations. */
          logo: {
            /** Image asset anchored to a named location within an organization theme. */
            desktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            mobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkDesktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkMobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
          };
          /** Arbitrary theme variables keyed by name. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior. */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    /** Timestamp when the organization was created. */
    createdAt?: string;
    /** Timestamp when the organization was last updated. */
    updatedAt?: string;
    /** Timestamp when the organization was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type GetOrgsApiArg = {
  /** Zero-based index of the result page to return. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get all possible entries */
  all?: boolean;
};
export type CreateOrgApiResponse = /** status 201 Single-organization page response */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Organizations returned in this single-item page wrapper. */
  organizations?: {
    /** Organization ID. */
    id?: string;
    /** Name of the organization. */
    name?: string;
    /** Description of the organization. */
    description?: string;
    /** Country of the organization. */
    country?: string;
    /** Region of the organization. */
    region?: string;
    /** Display name of the organization owner. */
    owner?: string;
    /** Free-form metadata associated with an organization, including preferences. */
    metadata?: {
      /** Organization-level user experience preferences. */
      preferences: {
        /** UI theme configured for an organization. */
        theme: {
          /** Theme identifier. */
          id: string;
          /** Themed logo assets used across light and dark, desktop and mobile presentations. */
          logo: {
            /** Image asset anchored to a named location within an organization theme. */
            desktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            mobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkDesktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkMobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
          };
          /** Arbitrary theme variables keyed by name. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior. */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    /** Timestamp when the organization was created. */
    createdAt?: string;
    /** Timestamp when the organization was last updated. */
    updatedAt?: string;
    /** Timestamp when the organization was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type CreateOrgApiArg = {
  /** Body for creating or updating an organization */
  body: {
    /** Name of the organization. */
    name?: string;
    /** Country of the organization. */
    country?: string;
    /** Region of the organization. */
    region?: string;
    /** Description of the organization. */
    description?: string;
    /** Indicates whether organization members should be notified of this update. */
    notifyOrgUpdate?: boolean;
    /** Organization-level user experience preferences. */
    preferences?: {
      /** UI theme configured for an organization. */
      theme: {
        /** Theme identifier. */
        id: string;
        /** Themed logo assets used across light and dark, desktop and mobile presentations. */
        logo: {
          /** Image asset anchored to a named location within an organization theme. */
          desktopView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
          /** Image asset anchored to a named location within an organization theme. */
          mobileView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
          /** Image asset anchored to a named location within an organization theme. */
          darkDesktopView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
          /** Image asset anchored to a named location within an organization theme. */
          darkMobileView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
        };
        /** Arbitrary theme variables keyed by name. */
        vars?: {
          [key: string]: any;
        };
      };
      /** Preferences specific to dashboard behavior. */
      dashboard: {
        [key: string]: any;
      };
    };
  };
};
export type GetOrgByDomainApiResponse = /** status 200 Organization response */ {
  /** Organization ID. */
  id: string;
  /** Name of the organization. */
  name: string;
  /** Country of the organization. */
  country: string;
  /** Region of the organization. */
  region: string;
  /** Description of the organization. */
  description: string;
  /** Owner user ID of the organization. */
  owner: string;
  /** Free-form metadata associated with the organization, including preferences. */
  metadata: object;
  /** Domain of the organization. */
  domain?: string | null;
  /** Timestamp when the organization was created. */
  createdAt: string;
  /** Timestamp when the organization was last updated. */
  updatedAt: string;
  /** Timestamp when the organization was soft-deleted. Null while the organization is active. */
  deletedAt?: string;
};
export type GetOrgByDomainApiArg = {
  /** Domain name of the organization to look up. */
  domain: string;
};
export type GetOrgApiResponse = /** status 200 Single-organization page response */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Organizations returned in this single-item page wrapper. */
  organizations?: {
    /** Organization ID. */
    id?: string;
    /** Name of the organization. */
    name?: string;
    /** Description of the organization. */
    description?: string;
    /** Country of the organization. */
    country?: string;
    /** Region of the organization. */
    region?: string;
    /** Display name of the organization owner. */
    owner?: string;
    /** Free-form metadata associated with an organization, including preferences. */
    metadata?: {
      /** Organization-level user experience preferences. */
      preferences: {
        /** UI theme configured for an organization. */
        theme: {
          /** Theme identifier. */
          id: string;
          /** Themed logo assets used across light and dark, desktop and mobile presentations. */
          logo: {
            /** Image asset anchored to a named location within an organization theme. */
            desktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            mobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkDesktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkMobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
          };
          /** Arbitrary theme variables keyed by name. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior. */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    /** Timestamp when the organization was created. */
    createdAt?: string;
    /** Timestamp when the organization was last updated. */
    updatedAt?: string;
    /** Timestamp when the organization was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type GetOrgApiArg = {
  /** Organization ID. */
  orgId: string;
};
export type DeleteOrgApiResponse = unknown;
export type DeleteOrgApiArg = {
  /** Organization ID. */
  orgId: string;
};
export type UpdateOrgApiResponse = /** status 200 Single-organization page response for the updated organization */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Organizations returned in this single-item page wrapper. */
  organizations?: {
    /** Organization ID. */
    id?: string;
    /** Name of the organization. */
    name?: string;
    /** Description of the organization. */
    description?: string;
    /** Country of the organization. */
    country?: string;
    /** Region of the organization. */
    region?: string;
    /** Display name of the organization owner. */
    owner?: string;
    /** Free-form metadata associated with an organization, including preferences. */
    metadata?: {
      /** Organization-level user experience preferences. */
      preferences: {
        /** UI theme configured for an organization. */
        theme: {
          /** Theme identifier. */
          id: string;
          /** Themed logo assets used across light and dark, desktop and mobile presentations. */
          logo: {
            /** Image asset anchored to a named location within an organization theme. */
            desktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            mobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkDesktopView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
            /** Image asset anchored to a named location within an organization theme. */
            darkMobileView: {
              /** SVG markup for the asset. */
              svg: string;
              /** Named location of the asset (e.g. header, footer). */
              location: string;
            };
          };
          /** Arbitrary theme variables keyed by name. */
          vars?: {
            [key: string]: any;
          };
        };
        /** Preferences specific to dashboard behavior. */
        dashboard: {
          [key: string]: any;
        };
      };
    };
    /** Timestamp when the organization was created. */
    createdAt?: string;
    /** Timestamp when the organization was last updated. */
    updatedAt?: string;
    /** Timestamp when the organization was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type UpdateOrgApiArg = {
  /** Organization ID. */
  orgId: string;
  /** Body for creating or updating an organization */
  body: {
    /** Name of the organization. */
    name?: string;
    /** Country of the organization. */
    country?: string;
    /** Region of the organization. */
    region?: string;
    /** Description of the organization. */
    description?: string;
    /** Indicates whether organization members should be notified of this update. */
    notifyOrgUpdate?: boolean;
    /** Organization-level user experience preferences. */
    preferences?: {
      /** UI theme configured for an organization. */
      theme: {
        /** Theme identifier. */
        id: string;
        /** Themed logo assets used across light and dark, desktop and mobile presentations. */
        logo: {
          /** Image asset anchored to a named location within an organization theme. */
          desktopView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
          /** Image asset anchored to a named location within an organization theme. */
          mobileView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
          /** Image asset anchored to a named location within an organization theme. */
          darkDesktopView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
          /** Image asset anchored to a named location within an organization theme. */
          darkMobileView: {
            /** SVG markup for the asset. */
            svg: string;
            /** Named location of the asset (e.g. header, footer). */
            location: string;
          };
        };
        /** Arbitrary theme variables keyed by name. */
        vars?: {
          [key: string]: any;
        };
      };
      /** Preferences specific to dashboard behavior. */
      dashboard: {
        [key: string]: any;
      };
    };
  };
};
export type GetOrgPreferencesApiResponse = /** status 200 Organization metadata, including preferences */ {
  /** Organization-level user experience preferences. */
  preferences: {
    /** UI theme configured for an organization. */
    theme: {
      /** Theme identifier. */
      id: string;
      /** Themed logo assets used across light and dark, desktop and mobile presentations. */
      logo: {
        /** Image asset anchored to a named location within an organization theme. */
        desktopView: {
          /** SVG markup for the asset. */
          svg: string;
          /** Named location of the asset (e.g. header, footer). */
          location: string;
        };
        /** Image asset anchored to a named location within an organization theme. */
        mobileView: {
          /** SVG markup for the asset. */
          svg: string;
          /** Named location of the asset (e.g. header, footer). */
          location: string;
        };
        /** Image asset anchored to a named location within an organization theme. */
        darkDesktopView: {
          /** SVG markup for the asset. */
          svg: string;
          /** Named location of the asset (e.g. header, footer). */
          location: string;
        };
        /** Image asset anchored to a named location within an organization theme. */
        darkMobileView: {
          /** SVG markup for the asset. */
          svg: string;
          /** Named location of the asset (e.g. header, footer). */
          location: string;
        };
      };
      /** Arbitrary theme variables keyed by name. */
      vars?: {
        [key: string]: any;
      };
    };
    /** Preferences specific to dashboard behavior. */
    dashboard: {
      [key: string]: any;
    };
  };
};
export type GetOrgPreferencesApiArg = {
  /** Organization ID. */
  orgId: string;
};
export type AddTeamToOrgApiResponse = /** status 201 Team added to organization or team tombstoned */
  | {
      /** Zero-based page index returned in this response. */
      page?: number;
      /** Maximum number of items returned on each page. */
      pageSize?: number;
      /** Total number of items across all pages. */
      totalCount?: number;
      /** Team-organization mapping entries. */
      teamsOrganizationsMapping?: {
        /** Mapping record ID. */
        id?: string;
        /** Organization ID for this mapping. */
        orgId?: string;
        /** Team ID for this mapping. */
        teamId?: string;
        /** Timestamp when the mapping was created. */
        createdAt?: string;
        /** Timestamp when the mapping was last updated. */
        updatedAt?: string;
        /** Timestamp when the mapping was soft-deleted. */
        deletedAt?: string;
      }[];
    }
  | {
      /** Zero-based page index returned in this response. */
      page?: number;
      /** Maximum number of items returned on each page. */
      pageSize?: number;
      /** Total number of items across all pages. */
      totalCount?: number;
      /** Teams in this page. */
      teams?: {
        /** Team ID. */
        id?: string;
        /** Name of the team. */
        name?: string;
        /** Description of the team. */
        description?: string;
        /** Display name of the team owner. */
        owner?: string;
        /** Free-form team metadata. */
        metadata?: {
          [key: string]: string;
        };
        /** Timestamp when the team was created. */
        createdAt?: string;
        /** Timestamp when the team was last updated. */
        updatedAt?: string;
        /** Timestamp when the team was soft-deleted. */
        deletedAt?: string;
      }[];
    };
export type AddTeamToOrgApiArg = {
  /** Organization ID. */
  orgId: string;
  /** Team ID. */
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
  /** Timestamp when the team was created. */
  createdAt: string;
  /** Timestamp when the team was last updated. */
  updatedAt: string;
  /** Timestamp when the team was soft-deleted, if applicable. */
  deletedAt?: string;
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
  /** Timestamp when the team was created. */
  createdAt: string;
  /** Timestamp when the team was last updated. */
  updatedAt: string;
  /** Timestamp when the team was soft-deleted, if applicable. */
  deletedAt?: string;
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
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Team-organization mapping entries. */
  teamsOrganizationsMapping?: {
    /** Mapping record ID. */
    id?: string;
    /** Organization ID for this mapping. */
    orgId?: string;
    /** Team ID for this mapping. */
    teamId?: string;
    /** Timestamp when the mapping was created. */
    createdAt?: string;
    /** Timestamp when the mapping was last updated. */
    updatedAt?: string;
    /** Timestamp when the mapping was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type RemoveTeamFromOrgApiArg = {
  /** Organization ID. */
  orgId: string;
  /** Team ID. */
  teamId: string;
};
export type AddUserToOrgApiResponse = /** status 201 User added to organization */ {
  [key: string]: any;
};
export type AddUserToOrgApiArg = {
  /** Organization ID. */
  orgId: string;
  /** User ID. */
  userId: string;
};
export type DeleteUserFromOrgApiResponse = unknown;
export type DeleteUserFromOrgApiArg = {
  /** Organization ID. */
  orgId: string;
  /** User ID. */
  userId: string;
};
export type AddRoleHolderApiResponse = unknown;
export type AddRoleHolderApiArg = {
  body: {
    /** Email of the user to assign roles to. */
    email: string;
    /** List of role names to assign. */
    roleNames: string[];
  };
};
export type DeleteRoleApiResponse = unknown;
export type DeleteRoleApiArg = {
  /** Role ID */
  roleId: string;
};
export type GetAllRolesApiResponse = /** status 200 Roles response */ {
  /** Current page number (zero-based). */
  page: number;
  /** Number of roles per page. */
  pageSize: number;
  /** Total number of roles across all pages. */
  totalCount: number;
  /** The roles of the rolespage. */
  roles: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** Unique name of the role. */
    roleName: string;
    /** Human-readable description of the role. */
    description: string;
    /** Timestamp when the role was created. */
    createdAt?: string;
    /** Timestamp when the role was last updated. */
    updatedAt?: string;
    /** Timestamp when the role was soft-deleted, if applicable. */
    deletedAt?: string;
  }[];
};
export type GetAllRolesApiArg = {
  /** Organization ID */
  orgId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by page size */
  pageSize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get all possible entries */
  all?: boolean;
  /** Role grouping selector such as provider, organization, or team. */
  selector?: string;
  /** Team ID used when selector is team. */
  teamId?: string;
};
export type UpsertRoleApiResponse = /** status 200 Role upserted */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id?: string;
  /** Unique name of the role. */
  roleName: string;
  /** Human-readable description of the role. */
  description: string;
  /** Timestamp when the role was created. */
  createdAt?: string;
  /** Timestamp when the role was last updated. */
  updatedAt?: string;
  /** Timestamp when the role was soft-deleted, if applicable. */
  deletedAt?: string;
};
export type UpsertRoleApiArg = {
  /** Organization ID */
  orgId: string;
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** Unique name of the role. */
    roleName: string;
    /** Human-readable description of the role. */
    description: string;
  };
};
export type BulkEditRoleHolderApiResponse = unknown;
export type BulkEditRoleHolderApiArg = {
  /** Organization ID */
  orgId: string;
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    userId?: string;
    /** The username of the user. */
    username?: string;
    /** Email address of the user. */
    email?: string;
    /** First name of the user. */
    firstName?: string;
    /** Last name of the user. */
    lastName?: string;
    /** Current status of the user. */
    status?: string;
    /** Role names currently or newly assigned to the user. */
    roleNames?: string[];
    /** Timestamp when the user was created. */
    createdAt?: string;
    /** Timestamp when the user was last updated. */
    updatedAt?: string;
    /** Timestamp when the user was soft-deleted, if applicable. */
    deletedAt?: string;
  }[];
};
export type GetRoleKeychainsApiResponse = /** status 200 Keychains response */ {
  page: number;
  page_size: number;
  total_count: number;
  /** The keychains of the keychainpage. */
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
export type GetRoleKeychainsApiArg = {
  /** Organization ID */
  orgId: string;
  /** Role ID */
  roleId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by page size */
  pageSize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
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
export type GetSchedulesApiResponse = /** status 200 Schedules response */ {
  /** Current page number (zero-based). */
  page: number;
  /** Number of schedules per page. */
  pageSize: number;
  /** Total number of schedules across all pages. */
  totalCount: number;
  /** The schedules of the schedulepage. */
  schedules: {
    /** Unique identifier for the schedule. */
    id?: string;
    /** Human-readable name for the schedule. */
    name: string;
    /** UUID of the user who owns this schedule. */
    userId: string;
    /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
     */
    cronExpression: string;
    /** Server-computed timestamp of the schedule's most recent execution. Null until the first run completes. Server-managed; clients must not set this on create/update.
     */
    lastRun?: string;
    /** Server-computed timestamp of the schedule's next planned execution, derived from the cron expression. Server-managed; clients must not set this on create/update.
     */
    nextRun?: string;
    /** Timestamp when the schedule was created. */
    createdAt?: string;
    /** Timestamp when the schedule was last updated. */
    updatedAt?: string;
  }[];
};
export type GetSchedulesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by page size */
  pageSize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type UpsertScheduleApiResponse = /** status 200 Schedule upserted */ {
  /** Unique identifier for the schedule. */
  id?: string;
  /** Human-readable name for the schedule. */
  name: string;
  /** UUID of the user who owns this schedule. */
  userId: string;
  /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
   */
  cronExpression: string;
  /** Server-computed timestamp of the schedule's most recent execution. Null until the first run completes. Server-managed; clients must not set this on create/update.
   */
  lastRun?: string;
  /** Server-computed timestamp of the schedule's next planned execution, derived from the cron expression. Server-managed; clients must not set this on create/update.
   */
  nextRun?: string;
  /** Timestamp when the schedule was created. */
  createdAt?: string;
  /** Timestamp when the schedule was last updated. */
  updatedAt?: string;
};
export type UpsertScheduleApiArg = {
  body: {
    /** Existing schedule ID for updates; omit on create. */
    id?: string;
    /** Human-readable name for the schedule. */
    name: string;
    /** Owner user ID; inferred from the authenticated user when omitted. */
    userId?: string;
    /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
     */
    cronExpression: string;
  };
};
export type GetScheduleApiResponse = /** status 200 Schedule response */ {
  /** Unique identifier for the schedule. */
  id?: string;
  /** Human-readable name for the schedule. */
  name: string;
  /** UUID of the user who owns this schedule. */
  userId: string;
  /** Cron expression defining the schedule's recurrence (e.g. "0 0 * * *" for daily at midnight).
   */
  cronExpression: string;
  /** Server-computed timestamp of the schedule's most recent execution. Null until the first run completes. Server-managed; clients must not set this on create/update.
   */
  lastRun?: string;
  /** Server-computed timestamp of the schedule's next planned execution, derived from the cron expression. Server-managed; clients must not set this on create/update.
   */
  nextRun?: string;
  /** Timestamp when the schedule was created. */
  createdAt?: string;
  /** Timestamp when the schedule was last updated. */
  updatedAt?: string;
};
export type GetScheduleApiArg = {
  /** Schedule ID */
  scheduleId: string;
};
export type DeleteScheduleApiResponse = unknown;
export type DeleteScheduleApiArg = {
  /** Schedule ID */
  scheduleId: string;
};
export type GetTeamsApiResponse = /** status 200 Teams */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
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
    /** Timestamp when the team was created. */
    createdAt: string;
    /** Timestamp when the team was last updated. */
    updatedAt: string;
    /** Timestamp when the team was soft-deleted, if applicable. */
    deletedAt?: string;
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
  /** Timestamp when the team was created. */
  createdAt: string;
  /** Timestamp when the team was last updated. */
  updatedAt: string;
  /** Timestamp when the team was soft-deleted, if applicable. */
  deletedAt?: string;
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
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  page_size?: number;
  /** Total number of items available. */
  total_count?: number;
  /** The user-team mappings on the current page. */
  usersTeamsMapping?: {
    id?: string;
    /** Team ID */
    teamId?: string;
    /** User ID */
    userId?: string;
    /** Optional role assigned to this team membership. Nullable because a membership may exist without an explicit role (e.g., team-admin assignments are stamped on insert; non-owner adds may leave `role_id` null until a role is assigned). References `roles.id`.
     */
    roleId?: string;
    /** Timestamp when the mapping was created. */
    createdAt?: string;
    /** Timestamp when the mapping was last updated. */
    updatedAt?: string;
    /** Timestamp when the mapping was soft-deleted, if applicable. */
    deletedAt?: string;
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
  /** Team ID */
  teamId?: string;
  /** User ID */
  userId?: string;
  /** Optional role assigned to this team membership. Nullable because a membership may exist without an explicit role (e.g., team-admin assignments are stamped on insert; non-owner adds may leave `role_id` null until a role is assigned). References `roles.id`.
   */
  roleId?: string;
  /** Timestamp when the mapping was created. */
  createdAt?: string;
  /** Timestamp when the mapping was last updated. */
  updatedAt?: string;
  /** Timestamp when the mapping was soft-deleted, if applicable. */
  deletedAt?: string;
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
    /** Timestamp when the user joined the team. Server-computed from the earliest matching row in `users_teams_mapping` for this (team, user) pair. Server-managed; clients cannot set this.
     */
    joinedAt?: string;
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
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** The data of the userspageforadmin. */
  data?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    userId: string;
    /** Authentication provider (e.g., Google, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** URL to user's avatar image */
    avatarUrl?: string;
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
        grafanaUrl?: string;
        /** Grafana API key for the user configuration. */
        grafanaApiKey?: string;
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
        /** The prometheus URL of the prometheus. */
        prometheusUrl?: string;
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
      updatedAt: string;
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
    acceptedTermsAt?: string;
    /** Timestamp of user's first login */
    firstLoginTime?: string;
    /** Timestamp of user's most recent login */
    lastLoginTime: string;
    /** Timestamp when the user record was created */
    createdAt: string;
    /** Timestamp when the user record was last updated */
    updatedAt: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deletedAt: string | null;
    /** List of global roles assigned to the user */
    roleNames?: (
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
      teamsWithRoles?: object[];
      /** Total number of team memberships returned for the user. */
      totalCount?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizationsWithRoles?: object[];
      /** Total number of organization memberships returned for the user. */
      totalCount?: number;
    };
  }[];
};
export type GetUsersForOrgApiArg = {
  /** Organization ID */
  orgId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by page size */
  pageSize?: string;
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
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** The data of the userspagefornonadmin. */
  data?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    userId: string;
    /** Authentication provider (e.g., Google, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** URL to user's avatar image */
    avatarUrl?: string;
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
        grafanaUrl?: string;
        /** Grafana API key for the user configuration. */
        grafanaApiKey?: string;
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
        /** The prometheus URL of the prometheus. */
        prometheusUrl?: string;
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
      updatedAt: string;
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
    acceptedTermsAt?: string;
    /** Timestamp of user's first login */
    firstLoginTime?: string;
    /** Timestamp of user's most recent login */
    lastLoginTime: string;
    /** Timestamp when the user record was created */
    createdAt: string;
    /** Timestamp when the user record was last updated */
    updatedAt: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deletedAt: string | null;
    /** List of global roles assigned to the user */
    roleNames?: (
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
      teamsWithRoles?: object[];
      /** Total number of team memberships returned for the user. */
      totalCount?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizationsWithRoles?: object[];
      /** Total number of organization memberships returned for the user. */
      totalCount?: number;
    };
  }[];
};
export type GetUsersApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by page size */
  pageSize?: string;
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
  userId: string;
  /** Authentication provider (e.g., Google, Github) */
  provider: string;
  /** User's email address */
  email: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** URL to user's avatar image */
  avatarUrl?: string;
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
      grafanaUrl?: string;
      /** Grafana API key for the user configuration. */
      grafanaApiKey?: string;
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
      /** The prometheus URL of the prometheus. */
      prometheusUrl?: string;
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
    updatedAt: string;
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
  acceptedTermsAt?: string;
  /** Timestamp of user's first login */
  firstLoginTime?: string;
  /** Timestamp of user's most recent login */
  lastLoginTime: string;
  /** Timestamp when the user record was created */
  createdAt: string;
  /** Timestamp when the user record was last updated */
  updatedAt: string;
  /** Various online profiles associated with the user account */
  socials?: {
    /** The site of the social. */
    site: string;
    /** The link of the social. */
    link: string;
  }[];
  /** Timestamp when the user record was soft-deleted (null if not deleted) */
  deletedAt: string | null;
  /** List of global roles assigned to the user */
  roleNames?: (
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
    teamsWithRoles?: object[];
    /** Total number of team memberships returned for the user. */
    totalCount?: number;
  };
  /** Organizations the user belongs to with role information */
  organizations?: {
    /** Organization memberships for the user with their assigned roles. */
    organizationsWithRoles?: object[];
    /** Total number of organization memberships returned for the user. */
    totalCount?: number;
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
  userId: string;
  /** Authentication provider (e.g., Google, Github) */
  provider: string;
  /** User's email address */
  email: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** URL to user's avatar image */
  avatarUrl?: string;
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
      grafanaUrl?: string;
      /** Grafana API key for the user configuration. */
      grafanaApiKey?: string;
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
      /** The prometheus URL of the prometheus. */
      prometheusUrl?: string;
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
    updatedAt: string;
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
  acceptedTermsAt?: string;
  /** Timestamp of user's first login */
  firstLoginTime?: string;
  /** Timestamp of user's most recent login */
  lastLoginTime: string;
  /** Timestamp when the user record was created */
  createdAt: string;
  /** Timestamp when the user record was last updated */
  updatedAt: string;
  /** Various online profiles associated with the user account */
  socials?: {
    /** The site of the social. */
    site: string;
    /** The link of the social. */
    link: string;
  }[];
  /** Timestamp when the user record was soft-deleted (null if not deleted) */
  deletedAt: string | null;
  /** List of global roles assigned to the user */
  roleNames?: (
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
    teamsWithRoles?: object[];
    /** Total number of team memberships returned for the user. */
    totalCount?: number;
  };
  /** Organizations the user belongs to with role information */
  organizations?: {
    /** Organization memberships for the user with their assigned roles. */
    organizationsWithRoles?: object[];
    /** Total number of organization memberships returned for the user. */
    totalCount?: number;
  };
};
export type GetUserApiArg = void;
export type CreateViewApiResponse = /** status 201 Created view */ {
  /** Unique identifier for the view. */
  id: string;
  /** Display name of the view. */
  name: string;
  /** Visibility level of the view. */
  visibility: string;
  /** Filter configuration that defines which resources this view displays. */
  filters?: object;
  /** Additional metadata associated with the view. */
  metadata?: object;
  /** ID of the user who created the view. */
  userId: string;
  /** Timestamp when the view was created. */
  createdAt: string;
  /** Timestamp when the view was last updated. */
  updatedAt: string;
  /** Timestamp when the view was soft deleted. Null while the view remains active. */
  deletedAt?: string | null;
};
export type CreateViewApiArg = {
  /** Body for creating or updating a view */
  body: {
    /** Display name of the view. */
    name: string;
    /** Filter configuration for this view. */
    filters?: object;
    /** Visibility level of the view. */
    visibility?: string;
    /** Metadata associated with the view. */
    metadata?: object;
  };
};
export type GetViewsApiResponse = /** status 200 Views page */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Views in this page, enriched with workspace and organization context. */
  views?: {
    id?: string;
    /** Display name of the view. */
    name?: string;
    /** Visibility level of the view. */
    visibility?: string;
    /** Filter configuration for this view. */
    filters?: object;
    /** Metadata associated with the view. */
    metadata?: object;
    /** ID of the user who created the view. */
    userId?: string;
    /** Name of the workspace this view belongs to. */
    workspaceName?: string;
    /** ID of the workspace this view belongs to. */
    workspaceId: string;
    /** ID of the organization this view belongs to. */
    organizationId: string;
    /** Name of the organization this view belongs to. */
    organizationName?: string;
    /** Timestamp when the view was created. */
    createdAt?: string;
    /** Timestamp when the view was last updated. */
    updatedAt?: string;
    /** Timestamp when the view was soft deleted. Null while the view remains active. */
    deletedAt?: string | null;
  }[];
};
export type GetViewsApiArg = {
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** JSON-encoded filter string for assignment and soft-delete filters. */
  filter?: string;
  /** When true, include views shared with the user. */
  shared?: boolean;
  /** Filter by visibility level (public, private). */
  visibility?: string;
  /** Organization ID to scope the request. */
  orgId?: string;
  /** UUID of the user whose views to retrieve. */
  userId?: string;
};
export type ShareViewApiResponse = unknown;
export type ShareViewApiArg = {
  /** Body for sharing a view with recipients by email. */
  body: {
    /** Identifier of the view being shared. */
    contentId: string;
    /** The kind of content being shared. Only `view` is accepted on this
        endpoint.
         */
    contentType: "view";
    /** Email addresses of the recipients to share this view with. */
    emails: string[];
    /** When true, flip the view's visibility to public and send invitation
        emails to the recipients. When false, revert visibility to private.
         */
    share: boolean;
  };
};
export type GetViewByIdApiResponse = /** status 200 View */ {
  /** Unique identifier for the view. */
  id: string;
  /** Display name of the view. */
  name: string;
  /** Visibility level of the view. */
  visibility: string;
  /** Filter configuration that defines which resources this view displays. */
  filters?: object;
  /** Additional metadata associated with the view. */
  metadata?: object;
  /** ID of the user who created the view. */
  userId: string;
  /** Timestamp when the view was created. */
  createdAt: string;
  /** Timestamp when the view was last updated. */
  updatedAt: string;
  /** Timestamp when the view was soft deleted. Null while the view remains active. */
  deletedAt?: string | null;
};
export type GetViewByIdApiArg = {
  /** View ID */
  viewId: string;
};
export type UpdateViewApiResponse = /** status 200 Updated view */ {
  /** Unique identifier for the view. */
  id: string;
  /** Display name of the view. */
  name: string;
  /** Visibility level of the view. */
  visibility: string;
  /** Filter configuration that defines which resources this view displays. */
  filters?: object;
  /** Additional metadata associated with the view. */
  metadata?: object;
  /** ID of the user who created the view. */
  userId: string;
  /** Timestamp when the view was created. */
  createdAt: string;
  /** Timestamp when the view was last updated. */
  updatedAt: string;
  /** Timestamp when the view was soft deleted. Null while the view remains active. */
  deletedAt?: string | null;
};
export type UpdateViewApiArg = {
  /** View ID */
  viewId: string;
  /** Body for creating or updating a view */
  body: {
    /** Display name of the view. */
    name: string;
    /** Filter configuration for this view. */
    filters?: object;
    /** Visibility level of the view. */
    visibility?: string;
    /** Metadata associated with the view. */
    metadata?: object;
  };
};
export type DeleteViewApiResponse = unknown;
export type DeleteViewApiArg = {
  /** View ID */
  viewId: string;
};
export type GetMyAcademyCurriculaApiResponse = /** status 200 A list of content with total count */ {
  /** Total number of Curricula */
  total: number;
  /** The data of the academycurriculalistresponse. */
  data: {
    /** Id of the Curricula */
    id: string;
    type: "learning-path" | "challenge" | "certification";
    /** Organization ID that owns this learning path */
    orgId: string;
    /** Visibility of the Curricula */
    visibility: "public" | "private";
    /** Status of the Curricula */
    status: "ready" | "archived" | "not_ready";
    /** slug of the Curricula */
    slug: string;
    /** Level of the Curricula */
    level: "beginner" | "intermediate" | "advanced";
    /** ID of the badge to be awarded on completion of this curricula */
    badgeId?: string;
    /** ID of the invite associated with this Curricula */
    inviteId?: string;
    /** ID of the workspace to which this Curricula belongs */
    workspaceId?: string;
    /** When the Curricula item was created */
    createdAt: string;
    /** When the Curricula was last updated */
    updatedAt: string;
    deletedAt: string;
    /** Additional metadata about the Curricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Short description of the curricula */
      description: string;
      /** Detailed description of the curricula */
      detailedDescription?: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        orgId: string;
        /** ID of the recipient (user) who received the certificate */
        recipientId: string;
        /** Name of the recipient (user) who received the certificate */
        recipientName: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuingAuthorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signatureUrl?: string;
        }[];
        /** Date when the certificate was issued */
        issuedDate: string;
        /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
        expirationDate?: string;
        /** Number of months after which the certificate expires */
        expiresIn?: number;
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
  }[];
};
export type GetMyAcademyCurriculaApiArg = {
  /** Filter content by content types */
  contentType?: string[];
  /** Filter content by organization IDs */
  orgId?: string[];
};
export type CreateAcademyCurriculaApiResponse = /** status 201 created the curricula */ {
  /** Id of the Curricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the Curricula */
  visibility: "public" | "private";
  /** Status of the Curricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the Curricula */
  slug: string;
  /** Level of the Curricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badgeId?: string;
  /** ID of the invite associated with this Curricula */
  inviteId?: string;
  /** ID of the workspace to which this Curricula belongs */
  workspaceId?: string;
  /** When the Curricula item was created */
  createdAt: string;
  /** When the Curricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the Curricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailedDescription?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      orgId: string;
      /** ID of the recipient (user) who received the certificate */
      recipientId: string;
      /** Name of the recipient (user) who received the certificate */
      recipientName: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuingAuthorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signatureUrl?: string;
      }[];
      /** Date when the certificate was issued */
      issuedDate: string;
      /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
      expirationDate?: string;
      /** Number of months after which the certificate expires */
      expiresIn?: number;
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
    /** ID of the workspace to which this Curricula belongs */
    workspaceId: string;
    /** ID of the badge to be awarded on completion of this curricula */
    badgeId?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    teamId: string;
    /** Expiry time for curricula access */
    accessExpiresAt?: string;
    /** Current access status of the curricula */
    accessStatus: "enabled" | "disabled";
    /** Additional metadata about the Curricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Short description of the curricula */
      description: string;
      /** Detailed description of the curricula */
      detailedDescription?: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        orgId: string;
        /** ID of the recipient (user) who received the certificate */
        recipientId: string;
        /** Name of the recipient (user) who received the certificate */
        recipientName: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuingAuthorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signatureUrl?: string;
        }[];
        /** Date when the certificate was issued */
        issuedDate: string;
        /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
        expirationDate?: string;
        /** Number of months after which the certificate expires */
        expiresIn?: number;
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
export type GetAcademyCurriculaApiResponse = /** status 200 A list of content with total count */ {
  /** Total number of Curricula */
  total: number;
  /** The data of the academycurriculawithmetricslistresponse. */
  data: ({
    /** Id of the Curricula */
    id: string;
    type: "learning-path" | "challenge" | "certification";
    /** Organization ID that owns this learning path */
    orgId: string;
    /** Visibility of the Curricula */
    visibility: "public" | "private";
    /** Status of the Curricula */
    status: "ready" | "archived" | "not_ready";
    /** slug of the Curricula */
    slug: string;
    /** Level of the Curricula */
    level: "beginner" | "intermediate" | "advanced";
    /** ID of the badge to be awarded on completion of this curricula */
    badgeId?: string;
    /** ID of the invite associated with this Curricula */
    inviteId?: string;
    /** ID of the workspace to which this Curricula belongs */
    workspaceId?: string;
    /** When the Curricula item was created */
    createdAt: string;
    /** When the Curricula was last updated */
    updatedAt: string;
    deletedAt: string;
    /** Additional metadata about the Curricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Short description of the curricula */
      description: string;
      /** Detailed description of the curricula */
      detailedDescription?: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        orgId: string;
        /** ID of the recipient (user) who received the certificate */
        recipientId: string;
        /** Name of the recipient (user) who received the certificate */
        recipientName: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuingAuthorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signatureUrl?: string;
        }[];
        /** Date when the certificate was issued */
        issuedDate: string;
        /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
        expirationDate?: string;
        /** Number of months after which the certificate expires */
        expiresIn?: number;
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
    /** Number of registrations associated with this curriculum. */
    registrationCount: number;
  })[];
};
export type GetAcademyCurriculaApiArg = {
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
export type GetAcademyContentApiResponse = /** status 200 A single academy content */ {
  /** Id of the Curricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the Curricula */
  visibility: "public" | "private";
  /** Status of the Curricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the Curricula */
  slug: string;
  /** Level of the Curricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badgeId?: string;
  /** ID of the invite associated with this Curricula */
  inviteId?: string;
  /** ID of the workspace to which this Curricula belongs */
  workspaceId?: string;
  /** When the Curricula item was created */
  createdAt: string;
  /** When the Curricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the Curricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailedDescription?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      orgId: string;
      /** ID of the recipient (user) who received the certificate */
      recipientId: string;
      /** Name of the recipient (user) who received the certificate */
      recipientName: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuingAuthorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signatureUrl?: string;
      }[];
      /** Date when the certificate was issued */
      issuedDate: string;
      /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
      expirationDate?: string;
      /** Number of months after which the certificate expires */
      expiresIn?: number;
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
export type GetAcademyContentApiArg = {
  type: string;
  orgId: string;
  slug: string;
};
export type RegisterToAcademyContentApiResponse = /** status 201 registered content */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  orgId: string;
  /** ID of the course content */
  contentId: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  userId: string;
  /** Status of the user's course registration */
  status: "registered" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updatedAt: string;
  /** When the registration was created */
  createdAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt?: string;
  /** Issued certificate for completing the curricula under registration */
  certificate: {
    /** Unique identifier for the certificate */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** ID of the recipient (user) who received the certificate */
    recipientId: string;
    /** Name of the recipient (user) who received the certificate */
    recipientName: string;
    /** Title of the certificate */
    title: string;
    /** Description of the certificate */
    description: string;
    /** List of issuing authorities for the certificate */
    issuingAuthorities: {
      /** Name of the issuing authority */
      name: string;
      /** Role of the issuing authority */
      role?: string;
      /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
      signatureUrl?: string;
    }[];
    /** Date when the certificate was issued */
    issuedDate: string;
    /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
    expirationDate?: string;
    /** Number of months after which the certificate expires */
    expiresIn?: number;
  };
  /** Additional metadata about the registration */
  metadata: {
    [key: string]: any;
  };
};
export type RegisterToAcademyContentApiArg = {
  body: {
    /** ID of the academy content to register for */
    contentId: string;
    /** ID of the user registering for the content. */
    userId: string;
    contentType?: "learning-path" | "challenge" | "certification";
  };
};
export type WithdrawFromAcademyContentApiResponse = /** status 200 registered content */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  orgId: string;
  /** ID of the course content */
  contentId: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  userId: string;
  /** Status of the user's course registration */
  status: "registered" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updatedAt: string;
  /** When the registration was created */
  createdAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt?: string;
  /** Issued certificate for completing the curricula under registration */
  certificate: {
    /** Unique identifier for the certificate */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** ID of the recipient (user) who received the certificate */
    recipientId: string;
    /** Name of the recipient (user) who received the certificate */
    recipientName: string;
    /** Title of the certificate */
    title: string;
    /** Description of the certificate */
    description: string;
    /** List of issuing authorities for the certificate */
    issuingAuthorities: {
      /** Name of the issuing authority */
      name: string;
      /** Role of the issuing authority */
      role?: string;
      /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
      signatureUrl?: string;
    }[];
    /** Date when the certificate was issued */
    issuedDate: string;
    /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
    expirationDate?: string;
    /** Number of months after which the certificate expires */
    expiresIn?: number;
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
  /** Id of the Curricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the Curricula */
  visibility: "public" | "private";
  /** Status of the Curricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the Curricula */
  slug: string;
  /** Level of the Curricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badgeId?: string;
  /** ID of the invite associated with this Curricula */
  inviteId?: string;
  /** ID of the workspace to which this Curricula belongs */
  workspaceId?: string;
  /** When the Curricula item was created */
  createdAt: string;
  /** When the Curricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the Curricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailedDescription?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      orgId: string;
      /** ID of the recipient (user) who received the certificate */
      recipientId: string;
      /** Name of the recipient (user) who received the certificate */
      recipientName: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuingAuthorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signatureUrl?: string;
      }[];
      /** Date when the certificate was issued */
      issuedDate: string;
      /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
      expirationDate?: string;
      /** Number of months after which the certificate expires */
      expiresIn?: number;
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
  /** Number of registrations associated with this curriculum. */
  registrationCount: number;
  /** Invitation entity schema. */
  invitation?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    ownerId: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
    isDefault?: boolean;
    /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
    name: string;
    /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
    description: string;
    /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
    emails: string[];
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
    expiresAt?: string;
    /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
    quota?: number;
    /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
    acceptedBy: string[];
    /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
    roles: string[];
    /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
    teams: string[];
    /** Activation status of the invitation. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created. */
    createdAt: string;
    /** Timestamp when the invitation was last updated. */
    updatedAt: string;
    /** Timestamp when the invitation was deleted, if applicable. */
    deletedAt: string;
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
    /** ID of the workspace to which this Curricula belongs */
    workspaceId: string;
    /** ID of the badge to be awarded on completion of this curricula */
    badgeId?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    teamId: string;
    /** Expiry time for curricula access */
    accessExpiresAt?: string;
    /** Current access status of the curricula */
    accessStatus: "enabled" | "disabled";
    /** Additional metadata about the Curricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Short description of the curricula */
      description: string;
      /** Detailed description of the curricula */
      detailedDescription?: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        orgId: string;
        /** ID of the recipient (user) who received the certificate */
        recipientId: string;
        /** Name of the recipient (user) who received the certificate */
        recipientName: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuingAuthorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signatureUrl?: string;
        }[];
        /** Date when the certificate was issued */
        issuedDate: string;
        /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
        expirationDate?: string;
        /** Number of months after which the certificate expires */
        expiresIn?: number;
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
  /** Id of the Curricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the Curricula */
  visibility: "public" | "private";
  /** Status of the Curricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the Curricula */
  slug: string;
  /** Level of the Curricula */
  level: "beginner" | "intermediate" | "advanced";
  /** ID of the badge to be awarded on completion of this curricula */
  badgeId?: string;
  /** ID of the invite associated with this Curricula */
  inviteId?: string;
  /** ID of the workspace to which this Curricula belongs */
  workspaceId?: string;
  /** When the Curricula item was created */
  createdAt: string;
  /** When the Curricula was last updated */
  updatedAt: string;
  deletedAt: string;
  /** Additional metadata about the Curricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Short description of the curricula */
    description: string;
    /** Detailed description of the curricula */
    detailedDescription?: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      orgId: string;
      /** ID of the recipient (user) who received the certificate */
      recipientId: string;
      /** Name of the recipient (user) who received the certificate */
      recipientName: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuingAuthorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signatureUrl?: string;
      }[];
      /** Date when the certificate was issued */
      issuedDate: string;
      /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
      expirationDate?: string;
      /** Number of months after which the certificate expires */
      expiresIn?: number;
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
  /** Number of registrations associated with this curriculum. */
  registrationCount: number;
  /** Invitation entity schema. */
  invitation?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    ownerId: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
    isDefault?: boolean;
    /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
    name: string;
    /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
    description: string;
    /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
    emails: string[];
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
    expiresAt?: string;
    /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
    quota?: number;
    /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
    acceptedBy: string[];
    /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
    roles: string[];
    /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
    teams: string[];
    /** Activation status of the invitation. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created. */
    createdAt: string;
    /** Timestamp when the invitation was last updated. */
    updatedAt: string;
    /** Timestamp when the invitation was deleted, if applicable. */
    deletedAt: string;
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
    orgId: string;
    /** ID of the course content */
    contentId: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    userId: string;
    /** Status of the user's course registration */
    status: "registered" | "completed" | "failed" | "withdrawn";
    /** When the registration was updated */
    updatedAt: string;
    /** When the registration was created */
    createdAt: string;
    /** Timestamp when the resource was deleted. */
    deletedAt?: string;
    /** Issued certificate for completing the curricula under registration */
    certificate: {
      /** Unique identifier for the certificate */
      id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      orgId: string;
      /** ID of the recipient (user) who received the certificate */
      recipientId: string;
      /** Name of the recipient (user) who received the certificate */
      recipientName: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuingAuthorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signatureUrl?: string;
      }[];
      /** Date when the certificate was issued */
      issuedDate: string;
      /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
      expirationDate?: string;
      /** Number of months after which the certificate expires */
      expiresIn?: number;
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
export type UpdateCurrentItemInProgressTrackerApiResponse = /** status 200 Progress tracker updated */ {
  /** The message of the updatecurrentitemprogressresponse. */
  message?: string;
  progressTracker?: {
    /** The current item of the curriculaprogresstracker. */
    currentItem: {
      [key: string]: {
        /** CurriculaCurrentItemData ID. */
        id: string;
        /** The last opened of the curriculacurrentitemdata. */
        lastOpened: string;
        contentType: "learning-path" | "challenge" | "certification";
      };
    };
    /** The grades of the curriculaprogresstracker. */
    grades: {
      [key: string]: {
        /** The score of the quizevaluationresult. */
        score: number;
        /** The passed of the quizevaluationresult. */
        passed: boolean;
        /** The percentage scored of the quizevaluationresult. */
        percentageScored: number;
        /** The total marks of the quizevaluationresult. */
        totalMarks: number;
        /** The pass percentage of the quizevaluationresult. */
        passPercentage: number;
        /** The correct submissions of the quizevaluationresult. */
        correctSubmissions: {
          [key: string]: boolean;
        };
        quiz: {
          /** Quiz ID. */
          id: string;
          /** Organization ID that owns this quiz */
          orgId: string;
          /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
          final: boolean;
          /** The title of the quiz. */
          title: string;
          /** Description of the quiz. */
          description: string;
          /** The slug of the quiz. */
          slug: string;
          /** The rel permalink of the quiz. */
          relPermalink: string;
          /** The permalink of the quiz. */
          permalink: string;
          /** Type of the resource. */
          type: string;
          /** The section of the quiz. */
          section: string;
          /** The layout of the quiz. */
          layout: string;
          /** The date of the quiz. */
          date: string;
          /** The lastmod of the quiz. */
          lastmod: string;
          /** The draft of the quiz. */
          draft: boolean;
          /** The file path of the quiz. */
          filePath: string;
          /** The pass percentage of the quiz. */
          passPercentage: number;
          /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
          timeLimit: number;
          /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
          maxAttempts: number;
          /** The questions of the quiz. */
          questions: {
            /** Question ID. */
            id: string;
            /** The text of the question. */
            text: string;
            type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
            /** The marks of the question. */
            marks: number;
            /** The multiple answers of the question. */
            multipleAnswers?: boolean;
            /** The options of the question. */
            options: {
              /** QuestionOption ID. */
              id: string;
              /** The text of the questionoption. */
              text: string;
              /** The is correct of the questionoption. */
              isCorrect: boolean;
            }[];
            /** The correct answer of the question. */
            correctAnswer: string;
          }[];
          /** The total questions of the quiz. */
          totalQuestions: number;
          /** The total questions in bank of the quiz. */
          totalQuestionsInBank: number;
          /** The total question sets of the quiz. */
          totalQuestionSets: number;
          /** The total marks of the quiz. */
          totalMarks: number;
          /** The prerequisites of the quiz. */
          prerequisites: {
            /** Parent ID. */
            id: string;
            /** The title of the parent. */
            title: string;
            /** The rel permalink of the parent. */
            relPermalink: string;
            /** Type of the resource. */
            type: string;
          }[];
          parent?: {
            /** Parent ID. */
            id: string;
            /** The title of the parent. */
            title: string;
            /** The rel permalink of the parent. */
            relPermalink: string;
            /** Type of the resource. */
            type: string;
          };
          nextPage: {
            /** Parent ID. */
            id: string;
            /** The title of the parent. */
            title: string;
            /** The rel permalink of the parent. */
            relPermalink: string;
            /** Type of the resource. */
            type: string;
          };
        };
        /** The attempted at of the quizevaluationresult. */
        attemptedAt: string;
        /** The attempts of the quizevaluationresult. */
        attempts: number;
      };
    };
    /** Total time spent in seconds */
    timeSpent: number;
    /** Items that have been completed (map of item IDs to item data) */
    completedItems: {
      [key: string]: {
        /** Timestamp when the item was completed */
        completedAt: string;
        itemData: {
          /** Parent ID. */
          id: string;
          /** The title of the parent. */
          title: string;
          /** The rel permalink of the parent. */
          relPermalink: string;
          /** Type of the resource. */
          type: string;
        };
      };
    };
    /** The completed of the curriculaprogresstracker. */
    completed: string;
  };
  /** ID of the associated registration. */
  registrationId?: string;
  contentType?: "learning-path" | "challenge" | "certification";
  itemData?: {
    /** CurriculaCurrentItemData ID. */
    id: string;
    /** The last opened of the curriculacurrentitemdata. */
    lastOpened: string;
    contentType: "learning-path" | "challenge" | "certification";
  };
};
export type UpdateCurrentItemInProgressTrackerApiArg = {
  /** The ID of the registration */
  registrationId: string;
  body: {
    contentType: "learning-path" | "challenge" | "certification";
    itemData: {
      /** CurriculaCurrentItemData ID. */
      id: string;
      /** The last opened of the curriculacurrentitemdata. */
      lastOpened: string;
      contentType: "learning-path" | "challenge" | "certification";
    };
  };
};
export type GetTestByAbsPathApiResponse = /** status 200 A single test */ {
  /** Quiz ID. */
  id: string;
  /** Organization ID that owns this quiz */
  orgId: string;
  /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
  final: boolean;
  /** The title of the quiz. */
  title: string;
  /** Description of the quiz. */
  description: string;
  /** The slug of the quiz. */
  slug: string;
  /** The rel permalink of the quiz. */
  relPermalink: string;
  /** The permalink of the quiz. */
  permalink: string;
  /** Type of the resource. */
  type: string;
  /** The section of the quiz. */
  section: string;
  /** The layout of the quiz. */
  layout: string;
  /** The date of the quiz. */
  date: string;
  /** The lastmod of the quiz. */
  lastmod: string;
  /** The draft of the quiz. */
  draft: boolean;
  /** The file path of the quiz. */
  filePath: string;
  /** The pass percentage of the quiz. */
  passPercentage: number;
  /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
  timeLimit: number;
  /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
  maxAttempts: number;
  /** The questions of the quiz. */
  questions: {
    /** Question ID. */
    id: string;
    /** The text of the question. */
    text: string;
    type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
    /** The marks of the question. */
    marks: number;
    /** The multiple answers of the question. */
    multipleAnswers?: boolean;
    /** The options of the question. */
    options: {
      /** QuestionOption ID. */
      id: string;
      /** The text of the questionoption. */
      text: string;
      /** The is correct of the questionoption. */
      isCorrect: boolean;
    }[];
    /** The correct answer of the question. */
    correctAnswer: string;
  }[];
  /** The total questions of the quiz. */
  totalQuestions: number;
  /** The total questions in bank of the quiz. */
  totalQuestionsInBank: number;
  /** The total question sets of the quiz. */
  totalQuestionSets: number;
  /** The total marks of the quiz. */
  totalMarks: number;
  /** The prerequisites of the quiz. */
  prerequisites: {
    /** Parent ID. */
    id: string;
    /** The title of the parent. */
    title: string;
    /** The rel permalink of the parent. */
    relPermalink: string;
    /** Type of the resource. */
    type: string;
  }[];
  parent?: {
    /** Parent ID. */
    id: string;
    /** The title of the parent. */
    title: string;
    /** The rel permalink of the parent. */
    relPermalink: string;
    /** Type of the resource. */
    type: string;
  };
  nextPage: {
    /** Parent ID. */
    id: string;
    /** The title of the parent. */
    title: string;
    /** The rel permalink of the parent. */
    relPermalink: string;
    /** Type of the resource. */
    type: string;
  };
};
export type GetTestByAbsPathApiArg = {
  /** The absolute path of the test to retrieve */
  absPath: string;
};
export type StartTestByIdApiResponse = /** status 200 A single test */ {
  /** Quiz ID. */
  id: string;
  /** Organization ID that owns this quiz */
  orgId: string;
  /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
  final: boolean;
  /** The title of the quiz. */
  title: string;
  /** Description of the quiz. */
  description: string;
  /** The slug of the quiz. */
  slug: string;
  /** The rel permalink of the quiz. */
  relPermalink: string;
  /** The permalink of the quiz. */
  permalink: string;
  /** Type of the resource. */
  type: string;
  /** The section of the quiz. */
  section: string;
  /** The layout of the quiz. */
  layout: string;
  /** The date of the quiz. */
  date: string;
  /** The lastmod of the quiz. */
  lastmod: string;
  /** The draft of the quiz. */
  draft: boolean;
  /** The file path of the quiz. */
  filePath: string;
  /** The pass percentage of the quiz. */
  passPercentage: number;
  /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
  timeLimit: number;
  /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
  maxAttempts: number;
  /** The questions of the quiz. */
  questions: {
    /** Question ID. */
    id: string;
    /** The text of the question. */
    text: string;
    type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
    /** The marks of the question. */
    marks: number;
    /** The multiple answers of the question. */
    multipleAnswers?: boolean;
    /** The options of the question. */
    options: {
      /** QuestionOption ID. */
      id: string;
      /** The text of the questionoption. */
      text: string;
      /** The is correct of the questionoption. */
      isCorrect: boolean;
    }[];
    /** The correct answer of the question. */
    correctAnswer: string;
  }[];
  /** The total questions of the quiz. */
  totalQuestions: number;
  /** The total questions in bank of the quiz. */
  totalQuestionsInBank: number;
  /** The total question sets of the quiz. */
  totalQuestionSets: number;
  /** The total marks of the quiz. */
  totalMarks: number;
  /** The prerequisites of the quiz. */
  prerequisites: {
    /** Parent ID. */
    id: string;
    /** The title of the parent. */
    title: string;
    /** The rel permalink of the parent. */
    relPermalink: string;
    /** Type of the resource. */
    type: string;
  }[];
  parent?: {
    /** Parent ID. */
    id: string;
    /** The title of the parent. */
    title: string;
    /** The rel permalink of the parent. */
    relPermalink: string;
    /** Type of the resource. */
    type: string;
  };
  nextPage: {
    /** Parent ID. */
    id: string;
    /** The title of the parent. */
    title: string;
    /** The rel permalink of the parent. */
    relPermalink: string;
    /** Type of the resource. */
    type: string;
  };
};
export type StartTestByIdApiArg = {
  body: {
    /** The test abs path of the starttestrequest. */
    testAbsPath: string;
    /** ID of the associated registration. */
    registrationId: string;
  };
};
export type GetAllTestSessionsForRegistrationApiResponse =
  /** status 200 A list of tests for the specified registration */ {
    /** The score of the quizevaluationresult. */
    score: number;
    /** The passed of the quizevaluationresult. */
    passed: boolean;
    /** The percentage scored of the quizevaluationresult. */
    percentageScored: number;
    /** The total marks of the quizevaluationresult. */
    totalMarks: number;
    /** The pass percentage of the quizevaluationresult. */
    passPercentage: number;
    /** The correct submissions of the quizevaluationresult. */
    correctSubmissions: {
      [key: string]: boolean;
    };
    quiz: {
      /** Quiz ID. */
      id: string;
      /** Organization ID that owns this quiz */
      orgId: string;
      /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
      final: boolean;
      /** The title of the quiz. */
      title: string;
      /** Description of the quiz. */
      description: string;
      /** The slug of the quiz. */
      slug: string;
      /** The rel permalink of the quiz. */
      relPermalink: string;
      /** The permalink of the quiz. */
      permalink: string;
      /** Type of the resource. */
      type: string;
      /** The section of the quiz. */
      section: string;
      /** The layout of the quiz. */
      layout: string;
      /** The date of the quiz. */
      date: string;
      /** The lastmod of the quiz. */
      lastmod: string;
      /** The draft of the quiz. */
      draft: boolean;
      /** The file path of the quiz. */
      filePath: string;
      /** The pass percentage of the quiz. */
      passPercentage: number;
      /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
      timeLimit: number;
      /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
      maxAttempts: number;
      /** The questions of the quiz. */
      questions: {
        /** Question ID. */
        id: string;
        /** The text of the question. */
        text: string;
        type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
        /** The marks of the question. */
        marks: number;
        /** The multiple answers of the question. */
        multipleAnswers?: boolean;
        /** The options of the question. */
        options: {
          /** QuestionOption ID. */
          id: string;
          /** The text of the questionoption. */
          text: string;
          /** The is correct of the questionoption. */
          isCorrect: boolean;
        }[];
        /** The correct answer of the question. */
        correctAnswer: string;
      }[];
      /** The total questions of the quiz. */
      totalQuestions: number;
      /** The total questions in bank of the quiz. */
      totalQuestionsInBank: number;
      /** The total question sets of the quiz. */
      totalQuestionSets: number;
      /** The total marks of the quiz. */
      totalMarks: number;
      /** The prerequisites of the quiz. */
      prerequisites: {
        /** Parent ID. */
        id: string;
        /** The title of the parent. */
        title: string;
        /** The rel permalink of the parent. */
        relPermalink: string;
        /** Type of the resource. */
        type: string;
      }[];
      parent?: {
        /** Parent ID. */
        id: string;
        /** The title of the parent. */
        title: string;
        /** The rel permalink of the parent. */
        relPermalink: string;
        /** Type of the resource. */
        type: string;
      };
      nextPage: {
        /** Parent ID. */
        id: string;
        /** The title of the parent. */
        title: string;
        /** The rel permalink of the parent. */
        relPermalink: string;
        /** Type of the resource. */
        type: string;
      };
    };
    /** The attempted at of the quizevaluationresult. */
    attemptedAt: string;
    /** The attempts of the quizevaluationresult. */
    attempts: number;
  }[][];
export type GetAllTestSessionsForRegistrationApiArg = {
  /** The ID of the registration to retrieve tests for */
  id: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Filter tests by absolute path */
  testAbsPath?: string;
};
export type SubmitQuizApiResponse = /** status 200 Progress tracker updated */ {
  /** The score of the quizevaluationresult. */
  score: number;
  /** The passed of the quizevaluationresult. */
  passed: boolean;
  /** The percentage scored of the quizevaluationresult. */
  percentageScored: number;
  /** The total marks of the quizevaluationresult. */
  totalMarks: number;
  /** The pass percentage of the quizevaluationresult. */
  passPercentage: number;
  /** The correct submissions of the quizevaluationresult. */
  correctSubmissions: {
    [key: string]: boolean;
  };
  quiz: {
    /** Quiz ID. */
    id: string;
    /** Organization ID that owns this quiz */
    orgId: string;
    /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
    final: boolean;
    /** The title of the quiz. */
    title: string;
    /** Description of the quiz. */
    description: string;
    /** The slug of the quiz. */
    slug: string;
    /** The rel permalink of the quiz. */
    relPermalink: string;
    /** The permalink of the quiz. */
    permalink: string;
    /** Type of the resource. */
    type: string;
    /** The section of the quiz. */
    section: string;
    /** The layout of the quiz. */
    layout: string;
    /** The date of the quiz. */
    date: string;
    /** The lastmod of the quiz. */
    lastmod: string;
    /** The draft of the quiz. */
    draft: boolean;
    /** The file path of the quiz. */
    filePath: string;
    /** The pass percentage of the quiz. */
    passPercentage: number;
    /** Time limit for the quiz in minutes. A value of 0 indicates no time limit. */
    timeLimit: number;
    /** Maximum number of attempts allowed for the quiz. A value of 0 indicates unlimited attempts. */
    maxAttempts: number;
    /** The questions of the quiz. */
    questions: {
      /** Question ID. */
      id: string;
      /** The text of the question. */
      text: string;
      type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
      /** The marks of the question. */
      marks: number;
      /** The multiple answers of the question. */
      multipleAnswers?: boolean;
      /** The options of the question. */
      options: {
        /** QuestionOption ID. */
        id: string;
        /** The text of the questionoption. */
        text: string;
        /** The is correct of the questionoption. */
        isCorrect: boolean;
      }[];
      /** The correct answer of the question. */
      correctAnswer: string;
    }[];
    /** The total questions of the quiz. */
    totalQuestions: number;
    /** The total questions in bank of the quiz. */
    totalQuestionsInBank: number;
    /** The total question sets of the quiz. */
    totalQuestionSets: number;
    /** The total marks of the quiz. */
    totalMarks: number;
    /** The prerequisites of the quiz. */
    prerequisites: {
      /** Parent ID. */
      id: string;
      /** The title of the parent. */
      title: string;
      /** The rel permalink of the parent. */
      relPermalink: string;
      /** Type of the resource. */
      type: string;
    }[];
    parent?: {
      /** Parent ID. */
      id: string;
      /** The title of the parent. */
      title: string;
      /** The rel permalink of the parent. */
      relPermalink: string;
      /** Type of the resource. */
      type: string;
    };
    nextPage: {
      /** Parent ID. */
      id: string;
      /** The title of the parent. */
      title: string;
      /** The rel permalink of the parent. */
      relPermalink: string;
      /** Type of the resource. */
      type: string;
    };
  };
  /** The attempted at of the quizevaluationresult. */
  attemptedAt: string;
  /** The attempts of the quizevaluationresult. */
  attempts: number;
};
export type SubmitQuizApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    testSessionId: string;
    /** The quiz abs path of the quizsubmission. */
    quizAbsPath: string;
    /** ID of the associated registration. */
    registrationId: string;
    /** ID of the user who owns or created this resource. */
    userId: string;
    /** The answers of the quizsubmission. */
    answers: {
      /** ID of the associated question. */
      questionId: string;
      /** Map of selected option IDs to a boolean value indicating if it was selected. */
      selectedOptionId: {
        [key: string]: boolean;
      };
      /** The answer text of the submittedanswer. */
      answerText: string;
    }[];
  };
};
export type GetAcademyAdminSummaryApiResponse =
  /** status 200 A list of content with total count and registration metrics */ object;
export type GetAcademyAdminSummaryApiArg = void;
export type GetAcademyAdminRegistrationsApiResponse = /** status 200 List of registrations with pagination info */ {
  /** The data of the curricularegistrationsresponse. */
  data: {
    /** Title of the curricula */
    curriculaTitle: string;
    /** Type of the curricula */
    curriculaType: "learning-path" | "challenge" | "certification";
    /** Permalink of the curricula */
    curriculaPermalink: string;
    /** Unique ID of the registration */
    registrationId: string;
    /** Registration status */
    status: "registered" | "completed" | "failed" | "withdrawn";
    /** When the registration was created */
    createdAt?: string;
    /** ID of the user */
    userId: string;
    /** First name of the user */
    userFirstName: string;
    /** Last name of the user */
    userLastName: string;
    /** Email of the user */
    userEmail: string;
    /** Avatar URL of the user */
    userAvatarUrl: string;
    /** Total count for pagination */
    totalCount: number;
  }[];
  /** Total number of items available. */
  totalCount: number;
  /** Number of items per page. */
  pageSize: number;
  /** Current page number of the result set. */
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
  orgId: string;
  /** ID of the recipient (user) who received the certificate */
  recipientId: string;
  /** Name of the recipient (user) who received the certificate */
  recipientName: string;
  /** Title of the certificate */
  title: string;
  /** Description of the certificate */
  description: string;
  /** List of issuing authorities for the certificate */
  issuingAuthorities: {
    /** Name of the issuing authority */
    name: string;
    /** Role of the issuing authority */
    role?: string;
    /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
    signatureUrl?: string;
  }[];
  /** Date when the certificate was issued */
  issuedDate: string;
  /** Date when the certificate expires. Dynamically calculated from issued_date and expires_in; not specified by instructors. */
  expirationDate?: string;
  /** Number of months after which the certificate expires */
  expiresIn?: number;
};
export type GetCertificateByIdApiArg = {
  /** The ID of the certificate to retrieve */
  certificateId: string;
};
export type GetConnectionsApiResponse = /** status 200 Paginated list of connections with summary information */ {
  /** List of connections on this page */
  connections: {
    /** Connection ID */
    id: string;
    /** Connection Name */
    name: string;
    /** Human-readable description of the connection and its purpose. */
    description?: string;
    /** URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL). */
    url?: string;
    /** Associated Credential ID */
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
    /** User ID who owns this connection */
    userId?: string;
    /** Timestamp when the connection was created. */
    createdAt?: string;
    /** Timestamp when the connection was last updated. */
    updatedAt?: string;
    /** Timestamp when the connection was soft-deleted, if applicable. */
    deletedAt?: string;
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
      organizationId: string;
      /** Environment owner */
      owner?: string;
      /** Timestamp when the environment was created. */
      createdAt?: string;
      /** Additional metadata associated with the environment. */
      metadata?: object;
      /** Timestamp when the environment was last updated. */
      updatedAt?: string;
      /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
      deletedAt?: string | null;
    }[];
    /** Specifies the version of the schema used for the definition. */
    schemaVersion: string;
  }[];
  /** Total number of connections on all pages */
  totalCount: number;
  /** Current page number */
  page: number;
  /** Number of elements per page */
  pageSize: number;
  /** Aggregate count of connections grouped by status */
  statusSummary?: {
    [key: string]: number;
  };
};
export type GetConnectionsApiArg = {
  /** Page number */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Search term */
  search?: string;
  /** Sort order */
  order?: string;
  /** Organization ID to scope the request. */
  orgId?: string;
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
  /** Human-readable description of the connection and its purpose. */
  description?: string;
  /** URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL). */
  url?: string;
  /** Associated Credential ID */
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
  /** User ID who owns this connection */
  userId?: string;
  /** Timestamp when the connection was created. */
  createdAt?: string;
  /** Timestamp when the connection was last updated. */
  updatedAt?: string;
  /** Timestamp when the connection was soft-deleted, if applicable. */
  deletedAt?: string;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
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
  /** Human-readable description of the connection and its purpose. */
  description?: string;
  /** URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL). */
  url?: string;
  /** Associated Credential ID */
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
  /** User ID who owns this connection */
  userId?: string;
  /** Timestamp when the connection was created. */
  createdAt?: string;
  /** Timestamp when the connection was last updated. */
  updatedAt?: string;
  /** Timestamp when the connection was soft-deleted, if applicable. */
  deletedAt?: string;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
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
  /** Human-readable description of the connection and its purpose. */
  description?: string;
  /** URL of the remote resource this connection points to (e.g. the Helm repository URL, the Kubernetes API server endpoint, the Grafana instance URL). */
  url?: string;
  /** Associated Credential ID */
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
  /** User ID who owns this connection */
  userId?: string;
  /** Timestamp when the connection was created. */
  createdAt?: string;
  /** Timestamp when the connection was last updated. */
  updatedAt?: string;
  /** Timestamp when the connection was soft-deleted, if applicable. */
  deletedAt?: string;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
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
export type GetPatternsApiResponse = /** status 200 Designs response */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** Designs included on this page of results. */
  patterns?: {
    /** Server-generated design ID. */
    id?: string;
    /** Human-readable design name. */
    name?: string;
    /** Catalog metadata attached to the design when published. */
    catalogData?: {
      /** Tracks the specific content version that has been made available in the Catalog. */
      publishedVersion?: string;
      /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
      class?: "official" | "verified" | "reference architecture";
      /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
      compatibility: "kubernetes"[];
      /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
      patternCaveats: string;
      /** Purpose of the design along with its intended and unintended uses. */
      patternInfo: string;
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
    /** Owning user ID. */
    userId?: string;
    /** Owning user record, joined inline by the catalog list/get handlers when shaping responses. Server-projected from the users table via the design's userId; not a column on the meshery_patterns table itself, so the generated Go field is tagged `db:"-"` to keep it out of ORM column scans.
     */
    user?: {
      /** Unique identifier for the user */
      id: string;
      /** User identifier (username or external ID) */
      userId: string;
      /** Authentication provider (e.g., Google, Github) */
      provider: string;
      /** User's email address */
      email: string;
      /** User's first name */
      firstName: string;
      /** User's last name */
      lastName: string;
      /** URL to user's avatar image */
      avatarUrl?: string;
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
          grafanaUrl?: string;
          /** Grafana API key for the user configuration. */
          grafanaApiKey?: string;
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
          /** The prometheus URL of the prometheus. */
          prometheusUrl?: string;
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
        updatedAt: string;
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
      acceptedTermsAt?: string;
      /** Timestamp of user's first login */
      firstLoginTime?: string;
      /** Timestamp of user's most recent login */
      lastLoginTime: string;
      /** Timestamp when the user record was created */
      createdAt: string;
      /** Timestamp when the user record was last updated */
      updatedAt: string;
      /** Various online profiles associated with the user account */
      socials?: {
        /** The site of the social. */
        site: string;
        /** The link of the social. */
        link: string;
      }[];
      /** Timestamp when the user record was soft-deleted (null if not deleted) */
      deletedAt: string | null;
      /** List of global roles assigned to the user */
      roleNames?: (
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
        teamsWithRoles?: object[];
        /** Total number of team memberships returned for the user. */
        totalCount?: number;
      };
      /** Organizations the user belongs to with role information */
      organizations?: {
        /** Organization memberships for the user with their assigned roles. */
        organizationsWithRoles?: object[];
        /** Total number of organization memberships returned for the user. */
        totalCount?: number;
      };
    } | null;
    /** Optional structured location metadata (branch, host, path, ...). */
    location?: {
      [key: string]: string;
    };
    /** Raw design body as it is persisted in the meshery_patterns table's `pattern_file` column. The wire form is the YAML/JSON string the server stores verbatim; consumers that need the structured form transcode at the boundary by parsing the string into a PatternFile (see #/components/schemas/PatternFile) and marshalling it back when they write. Keeping the wire shape as a string mirrors the column's actual representation and avoids forcing every consumer through the structured-vs- string union that the previous *PatternFile typing implied.
     */
    patternFile?: string;
    /** Visibility scope of the design — controls whether non-owners may read or list it. `private` is owner-only, `public` is readable by anyone in the org, and `published` is visible in the catalog.
     */
    visibility?: "private" | "public" | "published";
    /** Discriminator identifying the source format of the design body, persisted in the meshery_patterns table's `source_type` column (nullable; null for legacy rows imported before the column was introduced). For catalog listings the server may also project this field from the attached catalog metadata. Use this field to branch rendering between native Meshery designs and imported Helm charts, Kubernetes manifests, and Docker Compose files.
     */
    designType?: ("Design" | "Helm Chart" | "Docker Compose" | "Kubernetes Manifest") | null;
    /** Raw bytes of the imported source artifact (Helm chart tarball, Kubernetes manifest, Docker Compose file, etc.) preserved in the meshery_patterns table's `source_content` column for non-Meshery-Design imports. Empty / null for native Meshery designs. Server-managed: populated by the import and upload handlers and scrubbed to null on most read responses, so clients should treat this as opaque base64-encoded bytes when it does appear on the wire.
     */
    sourceContent?: string | null;
    /** Server-aggregated count of views on this design in the catalog. Present on list/catalog responses; server-managed and ignored on writes.
     */
    viewCount?: number;
    /** Server-aggregated count of downloads of this design from the catalog. Server-managed and ignored on writes.
     */
    downloadCount?: number;
    /** Server-aggregated count of times this design has been cloned from the catalog. Server-managed and ignored on writes.
     */
    cloneCount?: number;
    /** Server-aggregated count of deployments originated from this design. Server-managed and ignored on writes.
     */
    deploymentCount?: number;
    /** Server-aggregated count of share events for this design. Server-managed and ignored on writes.
     */
    shareCount?: number;
    /** Timestamp of design creation. */
    createdAt?: string;
    /** Timestamp of last design modification. */
    updatedAt?: string;
  }[];
  /** Optional discriminator describing which collection the page represents. */
  resultType?: string;
};
export type GetPatternsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Number of items per page (canonical camelCase form). */
  pageSize?: number;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** User's organization ID */
  orgId?: string;
  /** Filter by visibility (public, private, published) */
  visibility?: string;
  /** UUID of User. Pass userId for fetching public and published designs. */
  userId?: string;
  /** Whether to include usage metrics in the response. */
  metrics?: boolean;
  /** Filter designs by workspace ID. */
  workspaceId?: string;
  /** Populate additional nested fields in the response. */
  populate?: boolean;
  /** Include designs shared with the caller. */
  shared?: boolean;
};
export type UpsertPatternApiResponse = /** status 200 Design saved */ {
  /** Server-generated design ID. */
  id?: string;
  /** Human-readable design name. */
  name?: string;
  /** Catalog metadata attached to the design when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Owning user ID. */
  userId?: string;
  /** Owning user record, joined inline by the catalog list/get handlers when shaping responses. Server-projected from the users table via the design's userId; not a column on the meshery_patterns table itself, so the generated Go field is tagged `db:"-"` to keep it out of ORM column scans.
   */
  user?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    userId: string;
    /** Authentication provider (e.g., Google, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** URL to user's avatar image */
    avatarUrl?: string;
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
        grafanaUrl?: string;
        /** Grafana API key for the user configuration. */
        grafanaApiKey?: string;
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
        /** The prometheus URL of the prometheus. */
        prometheusUrl?: string;
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
      updatedAt: string;
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
    acceptedTermsAt?: string;
    /** Timestamp of user's first login */
    firstLoginTime?: string;
    /** Timestamp of user's most recent login */
    lastLoginTime: string;
    /** Timestamp when the user record was created */
    createdAt: string;
    /** Timestamp when the user record was last updated */
    updatedAt: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deletedAt: string | null;
    /** List of global roles assigned to the user */
    roleNames?: (
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
      teamsWithRoles?: object[];
      /** Total number of team memberships returned for the user. */
      totalCount?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizationsWithRoles?: object[];
      /** Total number of organization memberships returned for the user. */
      totalCount?: number;
    };
  } | null;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Raw design body as it is persisted in the meshery_patterns table's `pattern_file` column. The wire form is the YAML/JSON string the server stores verbatim; consumers that need the structured form transcode at the boundary by parsing the string into a PatternFile (see #/components/schemas/PatternFile) and marshalling it back when they write. Keeping the wire shape as a string mirrors the column's actual representation and avoids forcing every consumer through the structured-vs- string union that the previous *PatternFile typing implied.
   */
  patternFile?: string;
  /** Visibility scope of the design — controls whether non-owners may read or list it. `private` is owner-only, `public` is readable by anyone in the org, and `published` is visible in the catalog.
   */
  visibility?: "private" | "public" | "published";
  /** Discriminator identifying the source format of the design body, persisted in the meshery_patterns table's `source_type` column (nullable; null for legacy rows imported before the column was introduced). For catalog listings the server may also project this field from the attached catalog metadata. Use this field to branch rendering between native Meshery designs and imported Helm charts, Kubernetes manifests, and Docker Compose files.
   */
  designType?: ("Design" | "Helm Chart" | "Docker Compose" | "Kubernetes Manifest") | null;
  /** Raw bytes of the imported source artifact (Helm chart tarball, Kubernetes manifest, Docker Compose file, etc.) preserved in the meshery_patterns table's `source_content` column for non-Meshery-Design imports. Empty / null for native Meshery designs. Server-managed: populated by the import and upload handlers and scrubbed to null on most read responses, so clients should treat this as opaque base64-encoded bytes when it does appear on the wire.
   */
  sourceContent?: string | null;
  /** Server-aggregated count of views on this design in the catalog. Present on list/catalog responses; server-managed and ignored on writes.
   */
  viewCount?: number;
  /** Server-aggregated count of downloads of this design from the catalog. Server-managed and ignored on writes.
   */
  downloadCount?: number;
  /** Server-aggregated count of times this design has been cloned from the catalog. Server-managed and ignored on writes.
   */
  cloneCount?: number;
  /** Server-aggregated count of deployments originated from this design. Server-managed and ignored on writes.
   */
  deploymentCount?: number;
  /** Server-aggregated count of share events for this design. Server-managed and ignored on writes.
   */
  shareCount?: number;
  /** Timestamp of design creation. */
  createdAt?: string;
  /** Timestamp of last design modification. */
  updatedAt?: string;
};
export type UpsertPatternApiArg = {
  body: {
    /** Optional source path the design was loaded from. */
    path?: string;
    /** Design body to persist. */
    patternData?: {
      /** Existing design ID for updates; omit on create. */
      id?: string;
      /** Human-readable design name. */
      name?: string;
      /** Owning user ID. Server overrides with the authenticated caller on create. */
      userId?: string;
      /** Catalog metadata to attach to the design when publishing. */
      catalogData?: {
        /** Tracks the specific content version that has been made available in the Catalog. */
        publishedVersion?: string;
        /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
        class?: "official" | "verified" | "reference architecture";
        /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
        compatibility: "kubernetes"[];
        /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
        patternCaveats: string;
        /** Purpose of the design along with its intended and unintended uses. */
        patternInfo: string;
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
      /** Optional structured location metadata (branch, host, path, ...). */
      location?: {
        [key: string]: string;
      };
      /** Raw design body to persist into the `pattern_file` column. See MesheryPattern.patternFile for the transcode boundary note that applies on both writes and reads.
       */
      patternFile?: string;
      /** Visibility scope of the design. */
      visibility?: "private" | "public" | "published";
      /** Discriminator identifying the source format of the design body, stored in the `source_type` column. Optional on create (the server defaults missing values to `Design`).
       */
      designType?: ("Design" | "Helm Chart" | "Docker Compose" | "Kubernetes Manifest") | null;
    };
    /** When true, persist the design in addition to parsing it. */
    save?: boolean;
    /** Optional source URL the design was fetched from. */
    url?: string;
    /** Human-readable design name. */
    name?: string;
  };
};
export type DeletePatternsApiResponse = unknown;
export type DeletePatternsApiArg = {
  body: {
    /** Designs targeted for deletion. */
    patterns?: {
      /** Design ID targeted for deletion. */
      id?: string;
      /** Human-readable design name (informational only; server matches on id). */
      name?: string;
    }[];
  };
};
export type GetPatternResourcesApiResponse = unknown;
export type GetPatternResourcesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Number of items per page (canonical camelCase form). */
  pageSize?: number;
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
  designId: string;
};
export type DeletePatternResourceApiResponse = unknown;
export type DeletePatternResourceApiArg = {
  /** Design (Pattern) ID */
  designId: string;
};
export type GetPatternApiResponse = /** status 200 Design response */ {
  /** Server-generated design ID. */
  id?: string;
  /** Human-readable design name. */
  name?: string;
  /** Catalog metadata attached to the design when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Owning user ID. */
  userId?: string;
  /** Owning user record, joined inline by the catalog list/get handlers when shaping responses. Server-projected from the users table via the design's userId; not a column on the meshery_patterns table itself, so the generated Go field is tagged `db:"-"` to keep it out of ORM column scans.
   */
  user?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    userId: string;
    /** Authentication provider (e.g., Google, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** URL to user's avatar image */
    avatarUrl?: string;
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
        grafanaUrl?: string;
        /** Grafana API key for the user configuration. */
        grafanaApiKey?: string;
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
        /** The prometheus URL of the prometheus. */
        prometheusUrl?: string;
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
      updatedAt: string;
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
    acceptedTermsAt?: string;
    /** Timestamp of user's first login */
    firstLoginTime?: string;
    /** Timestamp of user's most recent login */
    lastLoginTime: string;
    /** Timestamp when the user record was created */
    createdAt: string;
    /** Timestamp when the user record was last updated */
    updatedAt: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deletedAt: string | null;
    /** List of global roles assigned to the user */
    roleNames?: (
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
      teamsWithRoles?: object[];
      /** Total number of team memberships returned for the user. */
      totalCount?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizationsWithRoles?: object[];
      /** Total number of organization memberships returned for the user. */
      totalCount?: number;
    };
  } | null;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Raw design body as it is persisted in the meshery_patterns table's `pattern_file` column. The wire form is the YAML/JSON string the server stores verbatim; consumers that need the structured form transcode at the boundary by parsing the string into a PatternFile (see #/components/schemas/PatternFile) and marshalling it back when they write. Keeping the wire shape as a string mirrors the column's actual representation and avoids forcing every consumer through the structured-vs- string union that the previous *PatternFile typing implied.
   */
  patternFile?: string;
  /** Visibility scope of the design — controls whether non-owners may read or list it. `private` is owner-only, `public` is readable by anyone in the org, and `published` is visible in the catalog.
   */
  visibility?: "private" | "public" | "published";
  /** Discriminator identifying the source format of the design body, persisted in the meshery_patterns table's `source_type` column (nullable; null for legacy rows imported before the column was introduced). For catalog listings the server may also project this field from the attached catalog metadata. Use this field to branch rendering between native Meshery designs and imported Helm charts, Kubernetes manifests, and Docker Compose files.
   */
  designType?: ("Design" | "Helm Chart" | "Docker Compose" | "Kubernetes Manifest") | null;
  /** Raw bytes of the imported source artifact (Helm chart tarball, Kubernetes manifest, Docker Compose file, etc.) preserved in the meshery_patterns table's `source_content` column for non-Meshery-Design imports. Empty / null for native Meshery designs. Server-managed: populated by the import and upload handlers and scrubbed to null on most read responses, so clients should treat this as opaque base64-encoded bytes when it does appear on the wire.
   */
  sourceContent?: string | null;
  /** Server-aggregated count of views on this design in the catalog. Present on list/catalog responses; server-managed and ignored on writes.
   */
  viewCount?: number;
  /** Server-aggregated count of downloads of this design from the catalog. Server-managed and ignored on writes.
   */
  downloadCount?: number;
  /** Server-aggregated count of times this design has been cloned from the catalog. Server-managed and ignored on writes.
   */
  cloneCount?: number;
  /** Server-aggregated count of deployments originated from this design. Server-managed and ignored on writes.
   */
  deploymentCount?: number;
  /** Server-aggregated count of share events for this design. Server-managed and ignored on writes.
   */
  shareCount?: number;
  /** Timestamp of design creation. */
  createdAt?: string;
  /** Timestamp of last design modification. */
  updatedAt?: string;
};
export type GetPatternApiArg = {
  /** Design (Pattern) ID */
  designId: string;
};
export type DeletePatternApiResponse = unknown;
export type DeletePatternApiArg = {
  /** Design (Pattern) ID */
  designId: string;
};
export type ClonePatternApiResponse = /** status 200 Design cloned */ {
  /** Server-generated design ID. */
  id?: string;
  /** Human-readable design name. */
  name?: string;
  /** Catalog metadata attached to the design when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Owning user ID. */
  userId?: string;
  /** Owning user record, joined inline by the catalog list/get handlers when shaping responses. Server-projected from the users table via the design's userId; not a column on the meshery_patterns table itself, so the generated Go field is tagged `db:"-"` to keep it out of ORM column scans.
   */
  user?: {
    /** Unique identifier for the user */
    id: string;
    /** User identifier (username or external ID) */
    userId: string;
    /** Authentication provider (e.g., Google, Github) */
    provider: string;
    /** User's email address */
    email: string;
    /** User's first name */
    firstName: string;
    /** User's last name */
    lastName: string;
    /** URL to user's avatar image */
    avatarUrl?: string;
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
        grafanaUrl?: string;
        /** Grafana API key for the user configuration. */
        grafanaApiKey?: string;
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
        /** The prometheus URL of the prometheus. */
        prometheusUrl?: string;
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
      updatedAt: string;
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
    acceptedTermsAt?: string;
    /** Timestamp of user's first login */
    firstLoginTime?: string;
    /** Timestamp of user's most recent login */
    lastLoginTime: string;
    /** Timestamp when the user record was created */
    createdAt: string;
    /** Timestamp when the user record was last updated */
    updatedAt: string;
    /** Various online profiles associated with the user account */
    socials?: {
      /** The site of the social. */
      site: string;
      /** The link of the social. */
      link: string;
    }[];
    /** Timestamp when the user record was soft-deleted (null if not deleted) */
    deletedAt: string | null;
    /** List of global roles assigned to the user */
    roleNames?: (
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
      teamsWithRoles?: object[];
      /** Total number of team memberships returned for the user. */
      totalCount?: number;
    };
    /** Organizations the user belongs to with role information */
    organizations?: {
      /** Organization memberships for the user with their assigned roles. */
      organizationsWithRoles?: object[];
      /** Total number of organization memberships returned for the user. */
      totalCount?: number;
    };
  } | null;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Raw design body as it is persisted in the meshery_patterns table's `pattern_file` column. The wire form is the YAML/JSON string the server stores verbatim; consumers that need the structured form transcode at the boundary by parsing the string into a PatternFile (see #/components/schemas/PatternFile) and marshalling it back when they write. Keeping the wire shape as a string mirrors the column's actual representation and avoids forcing every consumer through the structured-vs- string union that the previous *PatternFile typing implied.
   */
  patternFile?: string;
  /** Visibility scope of the design — controls whether non-owners may read or list it. `private` is owner-only, `public` is readable by anyone in the org, and `published` is visible in the catalog.
   */
  visibility?: "private" | "public" | "published";
  /** Discriminator identifying the source format of the design body, persisted in the meshery_patterns table's `source_type` column (nullable; null for legacy rows imported before the column was introduced). For catalog listings the server may also project this field from the attached catalog metadata. Use this field to branch rendering between native Meshery designs and imported Helm charts, Kubernetes manifests, and Docker Compose files.
   */
  designType?: ("Design" | "Helm Chart" | "Docker Compose" | "Kubernetes Manifest") | null;
  /** Raw bytes of the imported source artifact (Helm chart tarball, Kubernetes manifest, Docker Compose file, etc.) preserved in the meshery_patterns table's `source_content` column for non-Meshery-Design imports. Empty / null for native Meshery designs. Server-managed: populated by the import and upload handlers and scrubbed to null on most read responses, so clients should treat this as opaque base64-encoded bytes when it does appear on the wire.
   */
  sourceContent?: string | null;
  /** Server-aggregated count of views on this design in the catalog. Present on list/catalog responses; server-managed and ignored on writes.
   */
  viewCount?: number;
  /** Server-aggregated count of downloads of this design from the catalog. Server-managed and ignored on writes.
   */
  downloadCount?: number;
  /** Server-aggregated count of times this design has been cloned from the catalog. Server-managed and ignored on writes.
   */
  cloneCount?: number;
  /** Server-aggregated count of deployments originated from this design. Server-managed and ignored on writes.
   */
  deploymentCount?: number;
  /** Server-aggregated count of share events for this design. Server-managed and ignored on writes.
   */
  shareCount?: number;
  /** Timestamp of design creation. */
  createdAt?: string;
  /** Timestamp of last design modification. */
  updatedAt?: string;
};
export type ClonePatternApiArg = {
  /** Design (Pattern) ID */
  designId: string;
};
export type GetDesignPatternFileApiResponse = unknown;
export type GetDesignPatternFileApiArg = {
  /** Design (Pattern) ID */
  designId: string;
};
export type UpsertPatternSourceContentApiResponse = unknown;
export type UpsertPatternSourceContentApiArg = {
  /** Design (Pattern) ID */
  designId: string;
  body: Blob;
};
export type ImportDesignApiResponse = /** status 200 Successful Import */ {
  message?: string;
};
export type ImportDesignApiArg = {
  body:
    | {
        /** Base64-encoded file bytes. Supported formats: Kubernetes Manifests, Helm Charts, Docker Compose, and Meshery Designs. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details. */
        file: string;
        /** The name of the pattern file being imported. Include the extension (e.g. `design.yaml`), as the server uses it to identify the file type. */
        fileName: string;
        /** Provide a name for your design. This name will help you identify the design later. You can also change the name of your design after importing it. */
        name?: string;
      }
    | {
        /** A direct URL to a single file, for example: https://raw.github.com/your-design-file.yaml. Ensure the resource is in a supported format: Kubernetes Manifest, Helm Chart, Docker Compose, or Meshery Design. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details. */
        url: string;
        /** Provide a name for your design. This name will help you identify the design later. You can also change the name of your design after importing it. */
        name?: string;
      };
};
export type GetCatalogContentApiResponse = /** status 200 Catalog content page */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** Published designs included on this page. */
  patterns?: {
    /** Server-generated design ID. */
    id?: string;
    /** Human-readable design name. */
    name?: string;
    /** Catalog metadata attached to the design when published. */
    catalogData?: {
      /** Tracks the specific content version that has been made available in the Catalog. */
      publishedVersion?: string;
      /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
      class?: "official" | "verified" | "reference architecture";
      /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
      compatibility: "kubernetes"[];
      /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
      patternCaveats: string;
      /** Purpose of the design along with its intended and unintended uses. */
      patternInfo: string;
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
    /** Owning user ID. */
    userId?: string;
    /** Owning user record, joined inline by the catalog list/get handlers when shaping responses. Server-projected from the users table via the design's userId; not a column on the meshery_patterns table itself, so the generated Go field is tagged `db:"-"` to keep it out of ORM column scans.
     */
    user?: {
      /** Unique identifier for the user */
      id: string;
      /** User identifier (username or external ID) */
      userId: string;
      /** Authentication provider (e.g., Google, Github) */
      provider: string;
      /** User's email address */
      email: string;
      /** User's first name */
      firstName: string;
      /** User's last name */
      lastName: string;
      /** URL to user's avatar image */
      avatarUrl?: string;
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
          grafanaUrl?: string;
          /** Grafana API key for the user configuration. */
          grafanaApiKey?: string;
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
          /** The prometheus URL of the prometheus. */
          prometheusUrl?: string;
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
        updatedAt: string;
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
      acceptedTermsAt?: string;
      /** Timestamp of user's first login */
      firstLoginTime?: string;
      /** Timestamp of user's most recent login */
      lastLoginTime: string;
      /** Timestamp when the user record was created */
      createdAt: string;
      /** Timestamp when the user record was last updated */
      updatedAt: string;
      /** Various online profiles associated with the user account */
      socials?: {
        /** The site of the social. */
        site: string;
        /** The link of the social. */
        link: string;
      }[];
      /** Timestamp when the user record was soft-deleted (null if not deleted) */
      deletedAt: string | null;
      /** List of global roles assigned to the user */
      roleNames?: (
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
        teamsWithRoles?: object[];
        /** Total number of team memberships returned for the user. */
        totalCount?: number;
      };
      /** Organizations the user belongs to with role information */
      organizations?: {
        /** Organization memberships for the user with their assigned roles. */
        organizationsWithRoles?: object[];
        /** Total number of organization memberships returned for the user. */
        totalCount?: number;
      };
    } | null;
    /** Optional structured location metadata (branch, host, path, ...). */
    location?: {
      [key: string]: string;
    };
    /** Raw design body as it is persisted in the meshery_patterns table's `pattern_file` column. The wire form is the YAML/JSON string the server stores verbatim; consumers that need the structured form transcode at the boundary by parsing the string into a PatternFile (see #/components/schemas/PatternFile) and marshalling it back when they write. Keeping the wire shape as a string mirrors the column's actual representation and avoids forcing every consumer through the structured-vs- string union that the previous *PatternFile typing implied.
     */
    patternFile?: string;
    /** Visibility scope of the design — controls whether non-owners may read or list it. `private` is owner-only, `public` is readable by anyone in the org, and `published` is visible in the catalog.
     */
    visibility?: "private" | "public" | "published";
    /** Discriminator identifying the source format of the design body, persisted in the meshery_patterns table's `source_type` column (nullable; null for legacy rows imported before the column was introduced). For catalog listings the server may also project this field from the attached catalog metadata. Use this field to branch rendering between native Meshery designs and imported Helm charts, Kubernetes manifests, and Docker Compose files.
     */
    designType?: ("Design" | "Helm Chart" | "Docker Compose" | "Kubernetes Manifest") | null;
    /** Raw bytes of the imported source artifact (Helm chart tarball, Kubernetes manifest, Docker Compose file, etc.) preserved in the meshery_patterns table's `source_content` column for non-Meshery-Design imports. Empty / null for native Meshery designs. Server-managed: populated by the import and upload handlers and scrubbed to null on most read responses, so clients should treat this as opaque base64-encoded bytes when it does appear on the wire.
     */
    sourceContent?: string | null;
    /** Server-aggregated count of views on this design in the catalog. Present on list/catalog responses; server-managed and ignored on writes.
     */
    viewCount?: number;
    /** Server-aggregated count of downloads of this design from the catalog. Server-managed and ignored on writes.
     */
    downloadCount?: number;
    /** Server-aggregated count of times this design has been cloned from the catalog. Server-managed and ignored on writes.
     */
    cloneCount?: number;
    /** Server-aggregated count of deployments originated from this design. Server-managed and ignored on writes.
     */
    deploymentCount?: number;
    /** Server-aggregated count of share events for this design. Server-managed and ignored on writes.
     */
    shareCount?: number;
    /** Timestamp of design creation. */
    createdAt?: string;
    /** Timestamp of last design modification. */
    updatedAt?: string;
  }[];
  /** Published filters included on this page. */
  filters?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Human-readable filter name; required, used for catalog listings. */
    name: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    userId: string;
    /** Raw filter source persisted as a byte array (`bytea` column
        `filter_file`). Wire form is base64 per OpenAPI `format: byte`.
         */
    filterFile?: string;
    /** Filter resource discriminator describing the filter body's source
        format (e.g. WASM module identifier or external resource path).
        Stored in the `filter_resource` text column.
         */
    filterResource?: string;
    /** Optional structured location metadata (branch, host, path, ...). */
    location?: {
      [key: string]: string;
    };
    /** Visibility scope (private, public, published). */
    visibility?: "private" | "public" | "published";
    /** Catalog metadata attached to the filter when published. */
    catalogData?: {
      /** Tracks the specific content version that has been made available in the Catalog. */
      publishedVersion?: string;
      /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
      class?: "official" | "verified" | "reference architecture";
      /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
      compatibility: "kubernetes"[];
      /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
      patternCaveats: string;
      /** Purpose of the design along with its intended and unintended uses. */
      patternInfo: string;
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
    /** Timestamp of filter creation. */
    createdAt: string;
    /** Timestamp of last filter modification. */
    updatedAt: string;
  }[];
  /** Model-by-count aggregates for the catalog page. */
  modelsCount?: {
    [key: string]: any;
  }[];
  /** Category-by-count aggregates for the catalog page. */
  categoryCount?: {
    [key: string]: any;
  }[];
};
export type GetCatalogContentApiArg = {
  pathType: string;
  /** Get responses by page */
  page?: string;
  /** Number of items per page (canonical camelCase form). */
  pageSize?: number;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  queryType?: string;
  technology?: string;
  metrics?: boolean;
  class?: string;
  userId?: string;
  orgId?: string;
  workspaceId?: string;
  teamId?: string;
  populate?: boolean;
};
export type PublishCatalogContentApiResponse = /** status 200 Catalog request result */ {
  [key: string]: any;
};
export type PublishCatalogContentApiArg = {
  type: string;
  body: {
    [key: string]: any;
  };
};
export type UnPublishCatalogContentApiResponse = /** status 200 Catalog request result */ {
  [key: string]: any;
};
export type UnPublishCatalogContentApiArg = {
  type: string;
  body: {
    [key: string]: any;
  };
};
export type GetCatalogContentClassesApiResponse = /** status 200 Catalog content classes */ {
  /** The class of the catalogcontentclass. */
  class?: string;
  /** Description of the catalogcontentclass. */
  description?: string;
  [key: string]: any;
}[];
export type GetCatalogContentClassesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Number of items per page (canonical camelCase form). */
  pageSize?: number;
};
export type ApproveCatalogRequestApiResponse = /** status 200 Request approved */ {
  [key: string]: any;
};
export type ApproveCatalogRequestApiArg = {
  body: {
    [key: string]: any;
  };
};
export type DenyCatalogRequestApiResponse = /** status 200 Request denied */ {
  [key: string]: any;
};
export type DenyCatalogRequestApiArg = {
  body: {
    [key: string]: any;
  };
};
export type HandleResourceShareApiResponse = /** status 200 Resource access mapping */ {
  [key: string]: any;
};
export type HandleResourceShareApiArg = {
  resourceType: string;
  resourceId: string;
  body: {
    [key: string]: any;
  };
};
export type GetResourceAccessActorsByTypeApiResponse = /** status 200 Resource access actors */ {
  /** The users of the resourceaccessactorsresponse. */
  users?: {
    [key: string]: any;
  }[];
};
export type GetResourceAccessActorsByTypeApiArg = {
  resourceType: string;
  resourceId: string;
  actorType: string;
};
export type ShareDesignApiResponse = unknown;
export type ShareDesignApiArg = {
  /** Body for sharing a design, filter, or view with recipients by email. */
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    contentId: string;
    /** The kind of content being shared. Must match the entity the handler
        expects — `pattern` and `filter` are valid on the design share
        endpoint; `view` is valid on the view share endpoint.
         */
    contentType: "pattern" | "filter" | "view";
    /** Email addresses of the recipients to share this content with. */
    emails: string[];
    /** When true, flip visibility to public and send invitation emails to
        the recipients. When false, revert visibility to private.
         */
    share: boolean;
  };
};
export type GetCatalogRequestApiResponse = /** status 200 Catalog requests page */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** Catalog requests included on this page. */
  catalogRequests?: {
    [key: string]: any;
  }[];
};
export type GetCatalogRequestApiArg = {
  /** Get responses by page */
  page?: string;
  /** Number of items per page (canonical camelCase form). */
  pageSize?: number;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  filter?: string;
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
  organizationId: string;
  /** Environment owner */
  owner?: string;
  /** Timestamp when the environment was created. */
  createdAt?: string;
  /** Additional metadata associated with the environment. */
  metadata?: object;
  /** Timestamp when the environment was last updated. */
  updatedAt?: string;
  /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
  deletedAt?: string | null;
};
export type CreateEnvironmentApiArg = {
  /** Body for creating environment */
  body: {
    /** An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation. */
    name: string;
    /** An environment is a collection of resources, such as connections & credentials. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments). */
    description?: string;
    /** Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation. */
    organizationId: string;
  };
};
export type GetEnvironmentsApiResponse = /** status 200 Environments */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
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
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
  }[];
};
export type GetEnvironmentByIdApiArg = {
  /** Environment ID */
  environmentId: string;
  /** User's organization ID */
  orgId: string;
};
export type UpdateEnvironmentApiResponse = /** status 200 Environment page */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
  }[];
};
export type UpdateEnvironmentApiArg = {
  /** Environment ID */
  environmentId: string;
  /** Body for creating environment */
  body: {
    /** An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation. */
    name: string;
    /** An environment is a collection of resources, such as connections & credentials. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments). */
    description?: string;
    /** Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation. */
    organizationId: string;
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
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
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
  /** JSON-encoded filter string used to scope the connection listing. */
  filter?: string;
};
export type DeleteEventApiResponse = unknown;
export type DeleteEventApiArg = {
  /** ID of the event. */
  eventId: string;
};
export type CreateEventApiResponse = unknown;
export type CreateEventApiArg = {
  body: {
    /** UUID of the user associated with the event. */
    userId?: string;
    /** The category of the event. */
    category?: string;
    /** The action of the event. */
    action?: string;
    /** Description of the event. */
    description?: string;
    [key: string]: any;
  };
};
export type BulkDeleteEventsApiResponse = /** status 200 Events deleted */ {
  /** UUIDs of events that were deleted. */
  deleted?: string[];
};
export type BulkDeleteEventsApiArg = {
  body: {
    /** UUIDs of the events to delete. */
    ids: string[];
  };
};
export type BulkUpdateEventStatusApiResponse = /** status 200 Events updated */ {
  /** UUIDs of events whose status was updated. */
  updated?: string[];
};
export type BulkUpdateEventStatusApiArg = {
  body: {
    /** UUIDs of the events to update. */
    ids: string[];
    /** New status to apply to the selected events. */
    status: string;
  };
};
export type UpdateEventStatusApiResponse = /** status 200 Event status updated */ {
  /** Human-readable status message. */
  message?: string;
  /** UUID of the event whose status was updated. */
  eventId?: string;
  /** Updated status of the event. */
  status?: string;
};
export type UpdateEventStatusApiArg = {
  /** ID of the event. */
  eventId: string;
  body: {
    /** Current status of the event. */
    status: string;
  };
};
export type GetEventsOfWorkspaceApiResponse = /** status 200 Workspace events */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** The events returned on the current page. */
  data?: {
    /** UUID of the user associated with the event. */
    userId: string;
    /** System identifier of the event source. */
    systemId?: string;
    /** The category of the event. */
    category: string;
    /** The action of the event. */
    action: string;
    /** Description of the event. */
    description?: string;
    /** The first name of the user associated with the event. */
    firstName?: string;
    /** The last name of the user associated with the event. */
    lastName?: string;
    /** Email address of the user associated with the event. */
    email?: string;
    /** Authentication provider of the user associated with the event. */
    provider?: string;
    /** Timestamp when the event was recorded. */
    createdAt?: string;
  }[];
};
export type GetEventsOfWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type GetEventsAggregateApiResponse = /** status 200 Events aggregate */ {
  /** Count of audit-category events. */
  audit?: number;
  [key: string]: any;
};
export type GetEventsAggregateApiArg = {
  /** When true, return cumulative aggregate counts across all time. */
  cumulative?: boolean;
};
export type GetEventsApiResponse = /** status 200 Events page */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** The events returned on the current page. */
  data?: {
    /** UUID of the user associated with the event. */
    userId: string;
    /** System identifier of the event source. */
    systemId?: string;
    /** The category of the event. */
    category: string;
    /** The action of the event. */
    action: string;
    /** Description of the event. */
    description?: string;
    /** The first name of the user associated with the event. */
    firstName?: string;
    /** The last name of the user associated with the event. */
    lastName?: string;
    /** Email address of the user associated with the event. */
    email?: string;
    /** Authentication provider of the user associated with the event. */
    provider?: string;
    /** Timestamp when the event was recorded. */
    createdAt?: string;
  }[];
};
export type GetEventsApiArg = {
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
export type GetEventSummaryByUserApiResponse = /** status 200 Event summary page */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** The event summaries returned on the current page. */
  data?: {
    [key: string]: any;
  }[];
};
export type GetEventSummaryByUserApiArg = {
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
export type GetEventTypesApiResponse = /** status 200 Event types */ {
  /** The category of the event type. */
  category?: string;
  /** The action of the event type. */
  action?: string;
}[];
export type GetEventTypesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
};
export type GetFiltersApiResponse = /** status 200 Filters response */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** Filters included on this page of results. */
  filters?: {
    /** Server-generated filter ID. */
    id: string;
    /** Human-readable filter name; required, used for catalog listings. */
    name: string;
    /** Owning user ID. */
    userId: string;
    /** Raw filter source persisted as a byte array (`bytea` column
        `filter_file`). Wire form is base64 per OpenAPI `format: byte`.
         */
    filterFile?: string;
    /** Filter resource discriminator describing the filter body's source
        format (e.g. WASM module identifier or external resource path).
        Stored in the `filter_resource` text column.
         */
    filterResource?: string;
    /** Optional structured location metadata (branch, host, path, ...). */
    location?: {
      [key: string]: string;
    };
    /** Visibility scope (private, public, published). */
    visibility?: "private" | "public" | "published";
    /** Catalog metadata attached to the filter when published. */
    catalogData?: {
      /** Tracks the specific content version that has been made available in the Catalog. */
      publishedVersion?: string;
      /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
      class?: "official" | "verified" | "reference architecture";
      /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
      compatibility: "kubernetes"[];
      /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
      patternCaveats: string;
      /** Purpose of the design along with its intended and unintended uses. */
      patternInfo: string;
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
    /** Timestamp of filter creation. */
    createdAt: string;
    /** Timestamp of last filter modification. */
    updatedAt: string;
  }[];
};
export type GetFiltersApiArg = {
  /** Get responses by page */
  page?: string;
  /** Number of items per page (canonical camelCase form). */
  pageSize?: number;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** User's organization ID */
  orgId?: string;
  /** Filter by visibility (public, private, published). May be repeated. */
  visibility?: string[];
  /** UUID of the owning user. Pass when fetching public/published
    filters for a specific user (public-profile lookups).
     */
  userId?: string;
};
export type UpsertFilterApiResponse = /** status 200 Filter saved */ {
  /** Server-generated filter ID. */
  id: string;
  /** Human-readable filter name; required, used for catalog listings. */
  name: string;
  /** Owning user ID. */
  userId: string;
  /** Raw filter source persisted as a byte array (`bytea` column
    `filter_file`). Wire form is base64 per OpenAPI `format: byte`.
     */
  filterFile?: string;
  /** Filter resource discriminator describing the filter body's source
    format (e.g. WASM module identifier or external resource path).
    Stored in the `filter_resource` text column.
     */
  filterResource?: string;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Visibility scope (private, public, published). */
  visibility?: "private" | "public" | "published";
  /** Catalog metadata attached to the filter when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Timestamp of filter creation. */
  createdAt: string;
  /** Timestamp of last filter modification. */
  updatedAt: string;
};
export type UpsertFilterApiArg = {
  body: {
    /** Optional source URL the filter was fetched from. */
    url?: string;
    /** Optional source path the filter was loaded from. */
    path?: string;
    /** When true, persist the filter in addition to parsing it.
        When false, the server returns the parsed payload without
        committing it to the database.
         */
    save?: boolean;
    /** Filter body to persist. */
    filterData?: {
      /** Existing filter ID for updates; omit on create. Wrapped in
            an `allOf` so we can attach the `json:"id,omitempty"` tag
            for upsert ergonomics without recursing into the underlying
            UUID definition.
             */
      id?: string;
      /** Human-readable filter name. */
      name: string;
      /** Raw filter source as base64-encoded bytes (`format: byte`).
            Optional on update — the server preserves the existing body
            when omitted.
             */
      filterFile?: string;
      /** Filter resource discriminator describing the body's source
            format (e.g. WASM module identifier or external resource
            path).
             */
      filterResource?: string;
      /** Optional structured location metadata. */
      location?: {
        [key: string]: string;
      };
      /** Requested visibility scope. The server may downgrade a
            requested `published` value to `private` for callers that
            do not own the filter.
             */
      visibility?: "private" | "public" | "published";
      /** Catalog metadata to attach when publishing. */
      catalogData?: {
        /** Tracks the specific content version that has been made available in the Catalog. */
        publishedVersion?: string;
        /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
        class?: "official" | "verified" | "reference architecture";
        /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
        compatibility: "kubernetes"[];
        /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
        patternCaveats: string;
        /** Purpose of the design along with its intended and unintended uses. */
        patternInfo: string;
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
    };
    /** Optional opaque configuration string passed through to the
        underlying filter runtime. Persisted only on the local
        meshery `MesheryFilterPayload` shape; meshery-cloud
        currently ignores the field, but it is documented here so
        the canonical contract is single-sourced.
         */
    config?: string;
  };
};
export type DeleteFiltersApiResponse = unknown;
export type DeleteFiltersApiArg = {
  body: {
    /** Filters targeted for deletion. */
    filters: {
      /** Filter ID targeted for deletion. */
      id?: string;
      /** Human-readable filter name (informational only; the server
            matches on `id`).
             */
      name?: string;
    }[];
  };
};
export type GetFilterApiResponse = /** status 200 Filter response */ {
  /** Server-generated filter ID. */
  id: string;
  /** Human-readable filter name; required, used for catalog listings. */
  name: string;
  /** Owning user ID. */
  userId: string;
  /** Raw filter source persisted as a byte array (`bytea` column
    `filter_file`). Wire form is base64 per OpenAPI `format: byte`.
     */
  filterFile?: string;
  /** Filter resource discriminator describing the filter body's source
    format (e.g. WASM module identifier or external resource path).
    Stored in the `filter_resource` text column.
     */
  filterResource?: string;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Visibility scope (private, public, published). */
  visibility?: "private" | "public" | "published";
  /** Catalog metadata attached to the filter when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Timestamp of filter creation. */
  createdAt: string;
  /** Timestamp of last filter modification. */
  updatedAt: string;
};
export type GetFilterApiArg = {
  /** Filter ID */
  filterId: string;
};
export type UpdateFilterApiResponse = /** status 200 Filter updated */ {
  /** Server-generated filter ID. */
  id: string;
  /** Human-readable filter name; required, used for catalog listings. */
  name: string;
  /** Owning user ID. */
  userId: string;
  /** Raw filter source persisted as a byte array (`bytea` column
    `filter_file`). Wire form is base64 per OpenAPI `format: byte`.
     */
  filterFile?: string;
  /** Filter resource discriminator describing the filter body's source
    format (e.g. WASM module identifier or external resource path).
    Stored in the `filter_resource` text column.
     */
  filterResource?: string;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Visibility scope (private, public, published). */
  visibility?: "private" | "public" | "published";
  /** Catalog metadata attached to the filter when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Timestamp of filter creation. */
  createdAt: string;
  /** Timestamp of last filter modification. */
  updatedAt: string;
};
export type UpdateFilterApiArg = {
  /** Filter ID */
  filterId: string;
  body: {
    /** Existing filter ID for updates; omit on create. Wrapped in
        an `allOf` so we can attach the `json:"id,omitempty"` tag
        for upsert ergonomics without recursing into the underlying
        UUID definition.
         */
    id?: string;
    /** Human-readable filter name. */
    name: string;
    /** Raw filter source as base64-encoded bytes (`format: byte`).
        Optional on update — the server preserves the existing body
        when omitted.
         */
    filterFile?: string;
    /** Filter resource discriminator describing the body's source
        format (e.g. WASM module identifier or external resource
        path).
         */
    filterResource?: string;
    /** Optional structured location metadata. */
    location?: {
      [key: string]: string;
    };
    /** Requested visibility scope. The server may downgrade a
        requested `published` value to `private` for callers that
        do not own the filter.
         */
    visibility?: "private" | "public" | "published";
    /** Catalog metadata to attach when publishing. */
    catalogData?: {
      /** Tracks the specific content version that has been made available in the Catalog. */
      publishedVersion?: string;
      /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
      class?: "official" | "verified" | "reference architecture";
      /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
      compatibility: "kubernetes"[];
      /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
      patternCaveats: string;
      /** Purpose of the design along with its intended and unintended uses. */
      patternInfo: string;
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
  };
};
export type DeleteFilterApiResponse = unknown;
export type DeleteFilterApiArg = {
  /** Filter ID */
  filterId: string;
};
export type CloneFilterApiResponse = /** status 200 Filter cloned */ {
  /** Server-generated filter ID. */
  id: string;
  /** Human-readable filter name; required, used for catalog listings. */
  name: string;
  /** Owning user ID. */
  userId: string;
  /** Raw filter source persisted as a byte array (`bytea` column
    `filter_file`). Wire form is base64 per OpenAPI `format: byte`.
     */
  filterFile?: string;
  /** Filter resource discriminator describing the filter body's source
    format (e.g. WASM module identifier or external resource path).
    Stored in the `filter_resource` text column.
     */
  filterResource?: string;
  /** Optional structured location metadata (branch, host, path, ...). */
  location?: {
    [key: string]: string;
  };
  /** Visibility scope (private, public, published). */
  visibility?: "private" | "public" | "published";
  /** Catalog metadata attached to the filter when published. */
  catalogData?: {
    /** Tracks the specific content version that has been made available in the Catalog. */
    publishedVersion?: string;
    /** Published content is classifed by its support level. Content classes help you understand the origin and expected support level for each piece of content. It is important to note that the level of support may vary within each class, and you should exercise discretion when using community-contributed content. Content produced and fully supported by Meshery maintainers. This represents the highest level of support and is considered the most reliable. Content produced by partners and verified by Meshery maintainers. While not directly maintained by Meshery, it has undergone a verification process to ensure quality and compatibility. Content produced and supported by the respective project or organization responsible for the specific technology. This class offers a level of support from the project maintainers themselves. Content produced and shared by Meshery users. This includes a wide range of content, such as performance profiles, test results, filters, patterns, and applications. Community content may have varying levels of support and reliability. */
    class?: "official" | "verified" | "reference architecture";
    /** One or more models associated with this catalog item. For designs, a list of one or more models implicated by components within the design. For models, this is self-referential. */
    compatibility: "kubernetes"[];
    /** Specific stipulations to consider and known behaviors to be aware of when using this design. */
    patternCaveats: string;
    /** Purpose of the design along with its intended and unintended uses. */
    patternInfo: string;
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
  /** Timestamp of filter creation. */
  createdAt: string;
  /** Timestamp of last filter modification. */
  updatedAt: string;
};
export type CloneFilterApiArg = {
  /** Filter ID */
  filterId: string;
  body: {
    /** Optional name to apply to the cloned filter. Defaults to a
        server-generated derivative of the source filter's name.
         */
    name?: string;
  };
};
export type GetFilterFileApiResponse = unknown;
export type GetFilterFileApiArg = {
  /** Filter ID */
  filterId: string;
};
export type GetInvitationApiResponse = /** status 200 Invitation fetched */ {
  /** Unique identifier for the invitation, also used as the invitation code. */
  id: string;
  /** ID of the user who created the invitation. Tracks who created the invitation for auditing purposes. */
  ownerId: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
  isDefault?: boolean;
  /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
  name: string;
  /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
  description: string;
  /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
  emails: string[];
  /** ID of the organization to which the user is invited. */
  orgId: string;
  /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
  expiresAt?: string;
  /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
  quota?: number;
  /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
  acceptedBy: string[];
  /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
  roles: string[];
  /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
  teams: string[];
  /** Activation status of the invitation. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created. */
  createdAt: string;
  /** Timestamp when the invitation was last updated. */
  updatedAt: string;
  /** Timestamp when the invitation was deleted, if applicable. */
  deletedAt: string;
};
export type GetInvitationApiArg = {
  /** The ID of the invitation. */
  invitationId: string;
};
export type DeleteInvitationApiResponse = unknown;
export type DeleteInvitationApiArg = {
  /** The ID of the invitation. */
  invitationId: string;
};
export type UpdateInvitationApiResponse = /** status 200 Invitation updated */ {
  /** Unique identifier for the invitation, also used as the invitation code. */
  id: string;
  /** ID of the user who created the invitation. Tracks who created the invitation for auditing purposes. */
  ownerId: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
  isDefault?: boolean;
  /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
  name: string;
  /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
  description: string;
  /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
  emails: string[];
  /** ID of the organization to which the user is invited. */
  orgId: string;
  /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
  expiresAt?: string;
  /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
  quota?: number;
  /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
  acceptedBy: string[];
  /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
  roles: string[];
  /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
  teams: string[];
  /** Activation status of the invitation. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created. */
  createdAt: string;
  /** Timestamp when the invitation was last updated. */
  updatedAt: string;
  /** Timestamp when the invitation was deleted, if applicable. */
  deletedAt: string;
};
export type UpdateInvitationApiArg = {
  /** The ID of the invitation. */
  invitationId: string;
  body: {
    /** Existing invitation ID for updates; omit on create. */
    id?: string;
    /** ID of the user who created the invitation. */
    ownerId?: string;
    /** Indicates whether the invitation is a default invitation (open invite). */
    isDefault?: boolean;
    /** Name of the invitation. */
    name: string;
    /** Description of the invitation. */
    description: string;
    /** Email addresses or patterns this invitation is valid for. */
    emails: string[];
    /** ID of the organization to which the user is invited. */
    orgId: string;
    /** Timestamp when the invitation expires, if applicable. */
    expiresAt?: string;
    /** Quota for the invitation; limits the number of users that can accept it. */
    quota?: number;
    /** Roles that the user will have when accepting the invitation. */
    roles: string[];
    /** Teams that the user will be added to when accepting the invitation. */
    teams: string[];
    /** Activation status of the invitation. */
    status: "enabled" | "disabled";
  };
};
export type GetInvitationsApiResponse = /** status 200 Invitations page */ {
  /** Invitations returned on the current page. */
  data: {
    /** Unique identifier for the invitation, also used as the invitation code. */
    id: string;
    /** ID of the user who created the invitation. Tracks who created the invitation for auditing purposes. */
    ownerId: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
    isDefault?: boolean;
    /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
    name: string;
    /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
    description: string;
    /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
    emails: string[];
    /** ID of the organization to which the user is invited. */
    orgId: string;
    /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
    expiresAt?: string;
    /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
    quota?: number;
    /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
    acceptedBy: string[];
    /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
    roles: string[];
    /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
    teams: string[];
    /** Activation status of the invitation. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created. */
    createdAt: string;
    /** Timestamp when the invitation was last updated. */
    updatedAt: string;
    /** Timestamp when the invitation was deleted, if applicable. */
    deletedAt: string;
  }[];
  /** Total number of invitations available. */
  total: number;
};
export type GetInvitationsApiArg = void;
export type CreateInvitationApiResponse = /** status 201 Invitation created */ {
  /** Unique identifier for the invitation, also used as the invitation code. */
  id: string;
  /** ID of the user who created the invitation. Tracks who created the invitation for auditing purposes. */
  ownerId: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
  isDefault?: boolean;
  /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
  name: string;
  /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
  description: string;
  /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
  emails: string[];
  /** ID of the organization to which the user is invited. */
  orgId: string;
  /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
  expiresAt?: string;
  /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
  quota?: number;
  /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
  acceptedBy: string[];
  /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
  roles: string[];
  /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
  teams: string[];
  /** Activation status of the invitation. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created. */
  createdAt: string;
  /** Timestamp when the invitation was last updated. */
  updatedAt: string;
  /** Timestamp when the invitation was deleted, if applicable. */
  deletedAt: string;
};
export type CreateInvitationApiArg = {
  body: {
    /** Existing invitation ID for updates; omit on create. */
    id?: string;
    /** ID of the user who created the invitation. */
    ownerId?: string;
    /** Indicates whether the invitation is a default invitation (open invite). */
    isDefault?: boolean;
    /** Name of the invitation. */
    name: string;
    /** Description of the invitation. */
    description: string;
    /** Email addresses or patterns this invitation is valid for. */
    emails: string[];
    /** ID of the organization to which the user is invited. */
    orgId: string;
    /** Timestamp when the invitation expires, if applicable. */
    expiresAt?: string;
    /** Quota for the invitation; limits the number of users that can accept it. */
    quota?: number;
    /** Roles that the user will have when accepting the invitation. */
    roles: string[];
    /** Teams that the user will be added to when accepting the invitation. */
    teams: string[];
    /** Activation status of the invitation. */
    status: "enabled" | "disabled";
  };
};
export type AcceptInvitationApiResponse = /** status 200 Invitation accepted */ {
  /** Unique identifier for the invitation, also used as the invitation code. */
  id: string;
  /** ID of the user who created the invitation. Tracks who created the invitation for auditing purposes. */
  ownerId: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain. An organization can only have one default invitation. */
  isDefault?: boolean;
  /** Name of the invitation, which can be used to identify it. Required; cannot be an empty string. */
  name: string;
  /** Description of the invitation, which can be used to provide additional context. Null or empty string means the invitation does not have a description. */
  description: string;
  /** Email addresses or patterns for which the invitation is valid. Null means the invitation is valid for any email address. */
  emails: string[];
  /** ID of the organization to which the user is invited. */
  orgId: string;
  /** Timestamp when the invitation expires, if applicable. Null or empty means the invitation does not expire. */
  expiresAt?: string;
  /** Quota for the invitation; limits the number of users that can accept it. Null or empty means the invitation is unlimited. */
  quota?: number;
  /** List of user ids that have already accepted the invitation. Empty means the invitation has not been used yet. */
  acceptedBy: string[];
  /** Roles that the user will have when accepting the invitation. Empty means the invitation does not specify any roles. */
  roles: string[];
  /** Teams that the user will be added to when accepting the invitation. Empty means the invitation does not specify any teams. */
  teams: string[];
  /** Activation status of the invitation. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created. */
  createdAt: string;
  /** Timestamp when the invitation was last updated. */
  updatedAt: string;
  /** Timestamp when the invitation was deleted, if applicable. */
  deletedAt: string;
};
export type AcceptInvitationApiArg = {
  /** The ID of the invitation. */
  invitationId: string;
};
export type HandleUserInviteApiResponse = /** status 200 Invitation request accepted */ {
  [key: string]: any;
};
export type HandleUserInviteApiArg = {
  /** The ID of the organization. */
  orgId: string;
  body: {
    [key: string]: any;
  };
};
export type SignupRequestApiResponse = /** status 201 Signup request created */ {
  [key: string]: any;
};
export type SignupRequestApiArg = {
  body: {
    [key: string]: any;
  };
};
export type GetSignupRequestsApiResponse = /** status 200 Signup requests page */ {
  /** Current page number of the result set. */
  page?: number;
  /** Number of items per page. */
  pageSize?: number;
  /** Total number of items available. */
  totalCount?: number;
  /** Signup requests returned on the current page. */
  data?: {
    [key: string]: any;
  }[];
};
export type GetSignupRequestsApiArg = {
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
export type ApproveSignupRequestApiResponse = /** status 200 Signup request approved */ {
  [key: string]: any;
};
export type ApproveSignupRequestApiArg = void;
export type DenySignupRequestApiResponse = /** status 200 Signup request denied */ {
  [key: string]: any;
};
export type DenySignupRequestApiArg = void;
export type GetSignupRequestNotificationApiResponse = /** status 200 Signup request notification payload */ {
  [key: string]: any;
};
export type GetSignupRequestNotificationApiArg = void;
export type GetPerformanceProfilesApiResponse = /** status 200 Performance profiles */ {
  /** Zero-based page index returned in this response. */
  page: number;
  /** Maximum number of items returned on each page. */
  pageSize: number;
  /** Total number of performance profiles across all pages. */
  totalCount: number;
  /** Performance profiles in this page. */
  profiles: {
    /** Unique identifier for the performance profile. */
    id: string;
    /** Human-readable name of the performance profile. */
    name: string;
    /** User ID of the profile owner. */
    userId: string;
    /** Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule. */
    schedule?: string | null;
    /** Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test. */
    loadGenerators?: string[];
    /** Endpoints (URLs) targeted by the performance profile's load test. */
    endpoints?: string[];
    /** Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic. */
    serviceMesh?: string;
    /** Number of concurrent requests issued by the load generator. */
    concurrentRequest?: number;
    /** Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled. */
    qps?: number;
    /** Duration of the load test, expressed as a Go duration string (e.g. "30s", "5m", "1h"). */
    duration?: string;
    /** HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured. */
    requestHeaders?: string;
    /** HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured. */
    requestCookies?: string;
    /** HTTP request body sent on each load-test request. Empty string when no body is configured. */
    requestBody?: string;
    /** Content-Type header value applied to each load-test request body (e.g. "application/json"). Empty string when no body is configured. */
    contentType?: string;
    /** Free-form metadata associated with the performance profile. */
    metadata?: {
      [key: string]: any;
    };
    /** Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update. */
    lastRun?: string | null;
    /** Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update. */
    totalResults?: number;
    /** Timestamp when the performance profile was created. */
    createdAt: string;
    /** Timestamp when the performance profile was last updated. */
    updatedAt: string;
  }[];
};
export type GetPerformanceProfilesApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type UpsertPerformanceProfileApiResponse = /** status 200 Performance profile upserted */ {
  /** Unique identifier for the performance profile. */
  id: string;
  /** Human-readable name of the performance profile. */
  name: string;
  /** User ID of the profile owner. */
  userId: string;
  /** Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule. */
  schedule?: string | null;
  /** Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test. */
  loadGenerators?: string[];
  /** Endpoints (URLs) targeted by the performance profile's load test. */
  endpoints?: string[];
  /** Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic. */
  serviceMesh?: string;
  /** Number of concurrent requests issued by the load generator. */
  concurrentRequest?: number;
  /** Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled. */
  qps?: number;
  /** Duration of the load test, expressed as a Go duration string (e.g. "30s", "5m", "1h"). */
  duration?: string;
  /** HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured. */
  requestHeaders?: string;
  /** HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured. */
  requestCookies?: string;
  /** HTTP request body sent on each load-test request. Empty string when no body is configured. */
  requestBody?: string;
  /** Content-Type header value applied to each load-test request body (e.g. "application/json"). Empty string when no body is configured. */
  contentType?: string;
  /** Free-form metadata associated with the performance profile. */
  metadata?: {
    [key: string]: any;
  };
  /** Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update. */
  lastRun?: string | null;
  /** Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update. */
  totalResults?: number;
  /** Timestamp when the performance profile was created. */
  createdAt: string;
  /** Timestamp when the performance profile was last updated. */
  updatedAt: string;
};
export type UpsertPerformanceProfileApiArg = {
  /** Body for creating or updating a performance profile. */
  body: {
    /** Existing performance-profile ID for updates; omit on create. */
    id?: string;
    /** Human-readable name of the performance profile. */
    name: string;
    /** Owner user ID. When omitted, the server infers it from the authenticated user. */
    userId?: string;
    /** Optional schedule ID associating the profile with a recurring run. */
    schedule?: string | null;
    /** Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test. */
    loadGenerators: string[];
    /** Endpoints (URLs) targeted by the performance profile's load test. */
    endpoints: string[];
    /** Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic. */
    serviceMesh?: string;
    /** Number of concurrent requests issued by the load generator. */
    concurrentRequest?: number;
    /** Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled. */
    qps?: number;
    /** Duration of the load test, expressed as a Go duration string (e.g. "30s", "5m", "1h"). */
    duration: string;
    /** HTTP request headers, serialized as JSON, sent on each load-test request. */
    requestHeaders?: string;
    /** HTTP request cookies, serialized as JSON, sent on each load-test request. */
    requestCookies?: string;
    /** HTTP request body sent on each load-test request. */
    requestBody?: string;
    /** Content-Type header value applied to each load-test request body (e.g. "application/json"). */
    contentType?: string;
    /** Free-form metadata associated with the performance profile. */
    metadata?: {
      [key: string]: any;
    };
  };
};
export type GetPerformanceProfileApiResponse = /** status 200 Performance profile */ {
  /** Unique identifier for the performance profile. */
  id: string;
  /** Human-readable name of the performance profile. */
  name: string;
  /** User ID of the profile owner. */
  userId: string;
  /** Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule. */
  schedule?: string | null;
  /** Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test. */
  loadGenerators?: string[];
  /** Endpoints (URLs) targeted by the performance profile's load test. */
  endpoints?: string[];
  /** Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic. */
  serviceMesh?: string;
  /** Number of concurrent requests issued by the load generator. */
  concurrentRequest?: number;
  /** Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled. */
  qps?: number;
  /** Duration of the load test, expressed as a Go duration string (e.g. "30s", "5m", "1h"). */
  duration?: string;
  /** HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured. */
  requestHeaders?: string;
  /** HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured. */
  requestCookies?: string;
  /** HTTP request body sent on each load-test request. Empty string when no body is configured. */
  requestBody?: string;
  /** Content-Type header value applied to each load-test request body (e.g. "application/json"). Empty string when no body is configured. */
  contentType?: string;
  /** Free-form metadata associated with the performance profile. */
  metadata?: {
    [key: string]: any;
  };
  /** Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update. */
  lastRun?: string | null;
  /** Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update. */
  totalResults?: number;
  /** Timestamp when the performance profile was created. */
  createdAt: string;
  /** Timestamp when the performance profile was last updated. */
  updatedAt: string;
};
export type GetPerformanceProfileApiArg = {
  /** Performance profile ID. */
  performanceProfileId: string;
};
export type UpdatePerformanceProfileApiResponse = /** status 200 Performance profile */ {
  /** Unique identifier for the performance profile. */
  id: string;
  /** Human-readable name of the performance profile. */
  name: string;
  /** User ID of the profile owner. */
  userId: string;
  /** Optional schedule ID associated with this performance profile. Null when the profile is not bound to a recurring schedule. */
  schedule?: string | null;
  /** Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test. */
  loadGenerators?: string[];
  /** Endpoints (URLs) targeted by the performance profile's load test. */
  endpoints?: string[];
  /** Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic. */
  serviceMesh?: string;
  /** Number of concurrent requests issued by the load generator. */
  concurrentRequest?: number;
  /** Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled. */
  qps?: number;
  /** Duration of the load test, expressed as a Go duration string (e.g. "30s", "5m", "1h"). */
  duration?: string;
  /** HTTP request headers, serialized as JSON, sent on each load-test request. Empty string when no headers are configured. */
  requestHeaders?: string;
  /** HTTP request cookies, serialized as JSON, sent on each load-test request. Empty string when no cookies are configured. */
  requestCookies?: string;
  /** HTTP request body sent on each load-test request. Empty string when no body is configured. */
  requestBody?: string;
  /** Content-Type header value applied to each load-test request body (e.g. "application/json"). Empty string when no body is configured. */
  contentType?: string;
  /** Free-form metadata associated with the performance profile. */
  metadata?: {
    [key: string]: any;
  };
  /** Server-computed timestamp of the most recent load-test run that used this profile. Null until the first run completes. Server-managed; clients must not set this on create/update. */
  lastRun?: string | null;
  /** Server-computed count of load-test results recorded for this profile. Server-managed; clients must not set this on create/update. */
  totalResults?: number;
  /** Timestamp when the performance profile was created. */
  createdAt: string;
  /** Timestamp when the performance profile was last updated. */
  updatedAt: string;
};
export type UpdatePerformanceProfileApiArg = {
  /** Performance profile ID. */
  performanceProfileId: string;
  /** Body for creating or updating a performance profile. */
  body: {
    /** Existing performance-profile ID for updates; omit on create. */
    id?: string;
    /** Human-readable name of the performance profile. */
    name: string;
    /** Owner user ID. When omitted, the server infers it from the authenticated user. */
    userId?: string;
    /** Optional schedule ID associating the profile with a recurring run. */
    schedule?: string | null;
    /** Load generators (e.g. fortio, wrk2, nighthawk) to drive the profile's load test. */
    loadGenerators: string[];
    /** Endpoints (URLs) targeted by the performance profile's load test. */
    endpoints: string[];
    /** Service mesh under test for the profile (e.g. istio, linkerd, consul). Empty string when the profile is mesh-agnostic. */
    serviceMesh?: string;
    /** Number of concurrent requests issued by the load generator. */
    concurrentRequest?: number;
    /** Target queries-per-second rate for the load generator. Zero indicates the generator runs unthrottled. */
    qps?: number;
    /** Duration of the load test, expressed as a Go duration string (e.g. "30s", "5m", "1h"). */
    duration: string;
    /** HTTP request headers, serialized as JSON, sent on each load-test request. */
    requestHeaders?: string;
    /** HTTP request cookies, serialized as JSON, sent on each load-test request. */
    requestCookies?: string;
    /** HTTP request body sent on each load-test request. */
    requestBody?: string;
    /** Content-Type header value applied to each load-test request body (e.g. "application/json"). */
    contentType?: string;
    /** Free-form metadata associated with the performance profile. */
    metadata?: {
      [key: string]: any;
    };
  };
};
export type DeletePerformanceProfileApiResponse = unknown;
export type DeletePerformanceProfileApiArg = {
  /** Performance profile ID. */
  performanceProfileId: string;
};
export type GetPlansApiResponse = /** status 200 Plans response */ {
  /** Unique identifier for the plan. */
  id: string;
  /** Display name of the plan. */
  name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
  /** Billing cadence for the plan (monthly, annually, or none). */
  cadence: "none" | "monthly" | "annually";
  /** Unit of consumption this plan charges against (e.g. user). */
  unit: "user" | "free";
  /** Minimum number of units required for the plan. */
  minimumUnits: number;
  /** Price per unit of the plan. */
  pricePerUnit: number;
  /** Currency in which the plan is priced. */
  currency: "usd";
}[];
export type GetPlansApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
};
export type GetSubscriptionsApiResponse = /** status 200 Subscriptions response */ {
  /** Current page number of the result set. */
  page: number;
  /** Number of items per page. */
  pageSize: number;
  /** Total number of items available. */
  totalCount: number;
  /** Subscriptions returned on the current page. */
  subscriptions: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    planId: string;
    /** Eager-loaded plan associated with this subscription. */
    plan?: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Display name of the plan. */
      name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
      /** Billing cadence for the plan (monthly, annually, or none). */
      cadence: "none" | "monthly" | "annually";
      /** Unit of consumption this plan charges against (e.g. user). */
      unit: "user" | "free";
      /** Minimum number of units required for the plan. */
      minimumUnits: number;
      /** Price per unit of the plan. */
      pricePerUnit: number;
      /** Currency in which the plan is priced. */
      currency: "usd";
    };
    /** Number of units subscribed (eg number of users). */
    quantity: number;
    /** Timestamp when the subscription period started. */
    startDate?: string;
    /** Timestamp when the current subscription period ends. */
    endDate?: string;
    /** Current status of the subscription (e.g. active, past_due, canceled). */
    status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
    /** Timestamp when the subscription was created. */
    createdAt?: string;
    /** Timestamp when the subscription was last updated. */
    updatedAt?: string;
    /** Timestamp when the subscription was soft-deleted, if applicable. */
    deletedAt?: string;
    /** Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe). */
    billingId: string;
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
  /** Filter subscriptions by plan UUID. Repeat for multiple values. */
  planId?: string[];
};
export type CancelSubscriptionApiResponse = /** status 200 Subscription cancellation scheduled */ {
  /** Current page number of the result set. */
  page: number;
  /** Number of items per page. */
  pageSize: number;
  /** Total number of items available. */
  totalCount: number;
  /** Subscriptions returned on the current page. */
  subscriptions: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    planId: string;
    /** Eager-loaded plan associated with this subscription. */
    plan?: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Display name of the plan. */
      name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
      /** Billing cadence for the plan (monthly, annually, or none). */
      cadence: "none" | "monthly" | "annually";
      /** Unit of consumption this plan charges against (e.g. user). */
      unit: "user" | "free";
      /** Minimum number of units required for the plan. */
      minimumUnits: number;
      /** Price per unit of the plan. */
      pricePerUnit: number;
      /** Currency in which the plan is priced. */
      currency: "usd";
    };
    /** Number of units subscribed (eg number of users). */
    quantity: number;
    /** Timestamp when the subscription period started. */
    startDate?: string;
    /** Timestamp when the current subscription period ends. */
    endDate?: string;
    /** Current status of the subscription (e.g. active, past_due, canceled). */
    status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
    /** Timestamp when the subscription was created. */
    createdAt?: string;
    /** Timestamp when the subscription was last updated. */
    updatedAt?: string;
    /** Timestamp when the subscription was soft-deleted, if applicable. */
    deletedAt?: string;
    /** Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe). */
    billingId: string;
  }[];
};
export type CancelSubscriptionApiArg = {
  /** Subscription ID */
  subscriptionId: string;
};
export type CreateSubscriptionApiResponse = /** status 201 A new subscription has been created */ {
  /** ID of the associated subscription in the payment processor. */
  subscriptionId?: string;
  /** Client secret returned by the payment processor for the subscription checkout flow. */
  clientSecret?: string;
};
export type CreateSubscriptionApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    orgId?: string;
    /** Price ID from the payment processor. */
    planId?: string;
    /** Coupon ID to apply. */
    couponId?: string;
    /** Number of users in the organization. */
    userCount?: number;
    /** Email of the customer. */
    email?: string;
    /** Payment processor used to complete the subscription checkout. */
    paymentProcessor?: "stripe" | "paypal" | "braintree";
  };
};
export type UpgradeSubscriptionApiResponse = /** status 200 Subscription upgraded */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  orgId: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  planId: string;
  /** Eager-loaded plan associated with this subscription. */
  plan?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Display name of the plan. */
    name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
    /** Billing cadence for the plan (monthly, annually, or none). */
    cadence: "none" | "monthly" | "annually";
    /** Unit of consumption this plan charges against (e.g. user). */
    unit: "user" | "free";
    /** Minimum number of units required for the plan. */
    minimumUnits: number;
    /** Price per unit of the plan. */
    pricePerUnit: number;
    /** Currency in which the plan is priced. */
    currency: "usd";
  };
  /** Number of units subscribed (eg number of users). */
  quantity: number;
  /** Timestamp when the subscription period started. */
  startDate?: string;
  /** Timestamp when the current subscription period ends. */
  endDate?: string;
  /** Current status of the subscription (e.g. active, past_due, canceled). */
  status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
  /** Timestamp when the subscription was created. */
  createdAt?: string;
  /** Timestamp when the subscription was last updated. */
  updatedAt?: string;
  /** Timestamp when the subscription was soft-deleted, if applicable. */
  deletedAt?: string;
  /** Billing ID of the subscription. The ID of the subscription in the external billing system (for example, Stripe). */
  billingId: string;
};
export type UpgradeSubscriptionApiArg = {
  /** Subscription ID */
  subscriptionId: string;
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    oldPlanId?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    newPlanId?: string;
  };
};
export type PreviewSubscriptionUpgradeApiResponse =
  /** status 200 Preview of the upgraded subscription invoice */ object;
export type PreviewSubscriptionUpgradeApiArg = {
  /** Subscription ID */
  subscriptionId: string;
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    oldPlanId?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    newPlanId?: string;
  };
};
export type HandleSubscriptionWebhookApiResponse = unknown;
export type HandleSubscriptionWebhookApiArg = {
  body: object;
};
export type GetUserTokensApiResponse = /** status 200 Tokens response */ {
  /** Tokens returned on the current page. */
  tokens: {
    /** Unique identifier for the token. */
    id: string;
    /** UUID of the user who owns the token. */
    userId: string;
    /** Authentication provider associated with the token. */
    provider: string;
    /** Access token value. */
    accessToken?: string;
    /** Refresh token value when applicable. */
    refreshToken?: string;
    /** Human-readable token name. */
    name?: string;
    /** Purpose for which the token was created. */
    purpose?: string;
    /** Whether this entry represents an OAuth session. */
    isOauth?: boolean;
    /** Timestamp when the token was created. */
    createdAt?: string;
    /** Timestamp when the token was last updated. */
    updatedAt?: string;
  }[];
  /** Total number of tokens across all pages. */
  totalCount: number;
  /** Current page number (zero-based). */
  page: number;
  /** Number of tokens per page. */
  pageSize: number;
};
export type GetUserTokensApiArg = {
  /** Whether to retrieve OAuth-backed sessions instead of API tokens. */
  isOauth?: boolean;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
};
export type GenerateTokenApiResponse = /** status 201 Token generated */ {
  /** Tokens returned on the current page. */
  tokens: {
    /** Unique identifier for the token. */
    id: string;
    /** UUID of the user who owns the token. */
    userId: string;
    /** Authentication provider associated with the token. */
    provider: string;
    /** Access token value. */
    accessToken?: string;
    /** Refresh token value when applicable. */
    refreshToken?: string;
    /** Human-readable token name. */
    name?: string;
    /** Purpose for which the token was created. */
    purpose?: string;
    /** Whether this entry represents an OAuth session. */
    isOauth?: boolean;
    /** Timestamp when the token was created. */
    createdAt?: string;
    /** Timestamp when the token was last updated. */
    updatedAt?: string;
  }[];
  /** Total number of tokens across all pages. */
  totalCount: number;
  /** Current page number (zero-based). */
  page: number;
  /** Number of tokens per page. */
  pageSize: number;
};
export type GenerateTokenApiArg = {
  /** Name of the token. */
  name: string;
  /** Purpose for which the token is generated. */
  purpose?: string;
};
export type DeleteUserTokenApiResponse = /** status 200 Token deleted */ {
  /** Tokens returned on the current page. */
  tokens: {
    /** Unique identifier for the token. */
    id: string;
    /** UUID of the user who owns the token. */
    userId: string;
    /** Authentication provider associated with the token. */
    provider: string;
    /** Access token value. */
    accessToken?: string;
    /** Refresh token value when applicable. */
    refreshToken?: string;
    /** Human-readable token name. */
    name?: string;
    /** Purpose for which the token was created. */
    purpose?: string;
    /** Whether this entry represents an OAuth session. */
    isOauth?: boolean;
    /** Timestamp when the token was created. */
    createdAt?: string;
    /** Timestamp when the token was last updated. */
    updatedAt?: string;
  }[];
  /** Total number of tokens across all pages. */
  totalCount: number;
  /** Current page number (zero-based). */
  page: number;
  /** Number of tokens per page. */
  pageSize: number;
};
export type DeleteUserTokenApiArg = {
  /** ID of the token to delete. */
  tokenId: string;
};
export type GetUserTokensByIdApiResponse = /** status 200 Token response */ {
  /** Unique identifier for the token. */
  id: string;
  /** UUID of the user who owns the token. */
  userId: string;
  /** Authentication provider associated with the token. */
  provider: string;
  /** Access token value. */
  accessToken?: string;
  /** Refresh token value when applicable. */
  refreshToken?: string;
  /** Human-readable token name. */
  name?: string;
  /** Purpose for which the token was created. */
  purpose?: string;
  /** Whether this entry represents an OAuth session. */
  isOauth?: boolean;
  /** Timestamp when the token was created. */
  createdAt?: string;
  /** Timestamp when the token was last updated. */
  updatedAt?: string;
};
export type GetUserTokensByIdApiArg = {
  /** Token ID */
  tokenId: string;
};
export type IssueIndefiniteLifetimeTokenApiResponse = /** status 200 Token generated */ {
  /** Tokens returned on the current page. */
  tokens: {
    /** Unique identifier for the token. */
    id: string;
    /** UUID of the user who owns the token. */
    userId: string;
    /** Authentication provider associated with the token. */
    provider: string;
    /** Access token value. */
    accessToken?: string;
    /** Refresh token value when applicable. */
    refreshToken?: string;
    /** Human-readable token name. */
    name?: string;
    /** Purpose for which the token was created. */
    purpose?: string;
    /** Whether this entry represents an OAuth session. */
    isOauth?: boolean;
    /** Timestamp when the token was created. */
    createdAt?: string;
    /** Timestamp when the token was last updated. */
    updatedAt?: string;
  }[];
  /** Total number of tokens across all pages. */
  totalCount: number;
  /** Current page number (zero-based). */
  page: number;
  /** Number of tokens per page. */
  pageSize: number;
};
export type IssueIndefiniteLifetimeTokenApiArg = {
  /** UUID of the user to issue the indefinite token for. */
  userId: string;
  /** Authentication provider to associate with the indefinite token. */
  provider: string;
};
export type GetWorkspacesApiResponse = /** status 200 Workspaces */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** List of workspaces with resolved owner details. */
  workspaces?: {
    id?: string;
    /** Name of the workspace. */
    name?: string;
    /** Description of the workspace. */
    description?: string;
    /** Name of the owning organization. */
    orgName?: string;
    /** Display name of the workspace owner. */
    owner?: string;
    /** User ID of the workspace owner. */
    ownerId?: string;
    /** Email address of the workspace owner. */
    ownerEmail?: string;
    /** Avatar URL of the workspace owner. */
    ownerAvatar?: string;
    /** Metadata associated with the workspace. */
    metadata?: object;
    /** Organization to which this workspace belongs. */
    organizationId?: string;
    /** Timestamp when the workspace was created. */
    createdAt?: string;
    /** Timestamp when the workspace was last updated. */
    updatedAt?: string;
    /** Timestamp when the workspace was soft-deleted. Null while the workspace is active. */
    deletedAt?: string;
  }[];
};
export type GetWorkspacesApiArg = {
  /** Organization ID used to scope the workspace listing. */
  orgId?: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** JSON-encoded filter string used for assignment and soft-delete filters. */
  filter?: string;
};
export type CreateWorkspaceApiResponse = /** status 201 Created workspace */ {
  id: string;
  /** Name of the workspace. */
  name: string;
  /** Description of the workspace. */
  description?: string;
  /** Organization to which this workspace belongs. */
  organizationId: string;
  /** User ID of the workspace owner. */
  owner?: string;
  /** Metadata associated with the workspace. */
  metadata?: object;
  /** Timestamp when the workspace was created. */
  createdAt: string;
  /** Timestamp when the workspace was last updated. */
  updatedAt: string;
  /** Timestamp when the workspace was soft-deleted. Null while the workspace is active. */
  deletedAt?: string;
};
export type CreateWorkspaceApiArg = {
  /** Body for creating a workspace */
  body: {
    /** Name of the workspace. */
    name: string;
    /** Description of the workspace. */
    description?: string;
    /** Organization ID. */
    organizationId: string;
    /** Metadata associated with the workspace. */
    metadata?: object;
  };
};
export type GetWorkspaceByIdApiResponse = /** status 200 Workspace */ {
  id: string;
  /** Name of the workspace. */
  name: string;
  /** Description of the workspace. */
  description?: string;
  /** Organization to which this workspace belongs. */
  organizationId: string;
  /** User ID of the workspace owner. */
  owner?: string;
  /** Metadata associated with the workspace. */
  metadata?: object;
  /** Timestamp when the workspace was created. */
  createdAt: string;
  /** Timestamp when the workspace was last updated. */
  updatedAt: string;
  /** Timestamp when the workspace was soft-deleted. Null while the workspace is active. */
  deletedAt?: string;
};
export type GetWorkspaceByIdApiArg = {
  /** Workspace ID */
  workspaceId: string;
};
export type UpdateWorkspaceApiResponse = /** status 200 Workspace */ {
  id: string;
  /** Name of the workspace. */
  name: string;
  /** Description of the workspace. */
  description?: string;
  /** Organization to which this workspace belongs. */
  organizationId: string;
  /** User ID of the workspace owner. */
  owner?: string;
  /** Metadata associated with the workspace. */
  metadata?: object;
  /** Timestamp when the workspace was created. */
  createdAt: string;
  /** Timestamp when the workspace was last updated. */
  updatedAt: string;
  /** Timestamp when the workspace was soft-deleted. Null while the workspace is active. */
  deletedAt?: string;
};
export type UpdateWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Body for updating a workspace */
  body: {
    /** Name of the workspace. */
    name?: string;
    /** Description of the workspace. */
    description?: string;
    /** Organization ID. */
    organizationId: string;
    /** Metadata associated with the workspace. */
    metadata?: object;
  };
};
export type DeleteWorkspaceApiResponse = unknown;
export type DeleteWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
};
export type GetTeamsOfWorkspaceApiResponse = /** status 200 Teams */ {
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
export type GetTeamsOfWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** JSON-encoded filter string used for assignment and soft-delete filters. */
  filter?: string;
};
export type AssignTeamToWorkspaceApiResponse = /** status 200 Workspace team mappings */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Workspace-team mapping entries. */
  workspacesTeamsMapping?: {
    id: string;
    /** Workspace ID for this mapping. */
    workspaceId: string;
    /** Team ID for this mapping. */
    teamId: string;
    /** Timestamp when the mapping was created. */
    createdAt?: string;
    /** Timestamp when the mapping was last updated. */
    updatedAt?: string;
    /** Timestamp when the mapping was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type AssignTeamToWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Team ID */
  teamId: string;
};
export type UnassignTeamFromWorkspaceApiResponse = unknown;
export type UnassignTeamFromWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Team ID */
  teamId: string;
};
export type GetEnvironmentsOfWorkspaceApiResponse = /** status 200 Environments */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
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
    organizationId: string;
    /** Environment owner */
    owner?: string;
    /** Timestamp when the environment was created. */
    createdAt?: string;
    /** Additional metadata associated with the environment. */
    metadata?: object;
    /** Timestamp when the environment was last updated. */
    updatedAt?: string;
    /** Timestamp when the environment was soft deleted. Null while the environment remains active. */
    deletedAt?: string | null;
  }[];
};
export type GetEnvironmentsOfWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** JSON-encoded filter string used for assignment and soft-delete filters. */
  filter?: string;
};
export type AssignEnvironmentToWorkspaceApiResponse = /** status 200 Workspace environment mappings */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Workspace-environment mapping entries. */
  workspacesEnvironmentsMapping?: {
    id: string;
    /** Workspace ID for this mapping. */
    workspaceId: string;
    /** Environment ID for this mapping. */
    environmentId: string;
    /** Timestamp when the mapping was created. */
    createdAt?: string;
    /** Timestamp when the mapping was last updated. */
    updatedAt?: string;
    /** Timestamp when the mapping was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type AssignEnvironmentToWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Environment ID */
  environmentId: string;
};
export type UnassignEnvironmentFromWorkspaceApiResponse = unknown;
export type UnassignEnvironmentFromWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Environment ID */
  environmentId: string;
};
export type GetDesignsOfWorkspaceApiResponse = /** status 200 Designs */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Designs in this page. */
  designs?: {
    catalogData?: {
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
    patternFile?: {
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
    updated_at?: string;
    id?: string;
    visibility?: string;
  }[];
};
export type GetDesignsOfWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** JSON-encoded filter string used for assignment and soft-delete filters. */
  filter?: string;
};
export type AssignDesignToWorkspaceApiResponse = /** status 200 Workspace design mappings */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Workspace-design mapping entries. */
  workspacesDesignsMapping?: {
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    workspaceId: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    designId: string;
    /** Timestamp when the mapping was created. */
    createdAt?: string;
    /** Timestamp when the mapping was last updated. */
    updatedAt?: string;
    /** Timestamp when the mapping was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type AssignDesignToWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Design ID */
  designId: string;
};
export type UnassignDesignFromWorkspaceApiResponse = unknown;
export type UnassignDesignFromWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Design ID */
  designId: string;
};
export type GetViewsOfWorkspaceApiResponse = /** status 200 Views */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  /** Views in this page, enriched with workspace and organization context. */
  views?: {
    id?: string;
    /** Display name of the view. */
    name?: string;
    /** Visibility level of the view. */
    visibility?: string;
    /** Filter configuration for this view. */
    filters?: object;
    /** Metadata associated with the view. */
    metadata?: object;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    user_id?: string;
    /** Name of the workspace this view belongs to. */
    workspace_name?: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    workspace_id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    organization_id: string;
    /** Name of the organization this view belongs to. */
    organization_name?: string;
    /** Timestamp when the resource was created. */
    created_at?: string;
    /** Timestamp when the resource was updated. */
    updated_at?: string;
    /** Timestamp when the view was soft deleted. Null while the view remains active. */
    deleted_at?: string;
  }[];
};
export type GetViewsOfWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** JSON-encoded filter string used for assignment and soft-delete filters. */
  filter?: string;
};
export type AssignViewToWorkspaceApiResponse = /** status 200 Workspace view mappings */ {
  /** Zero-based page index returned in this response. */
  page?: number;
  /** Maximum number of items returned on each page. */
  pageSize?: number;
  /** Total number of items across all pages. */
  totalCount?: number;
  /** Workspace-view mapping entries. */
  workspacesViewsMapping?: {
    id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    workspaceId: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    viewId: string;
    /** Timestamp when the resource was created. */
    createdAt?: string;
    /** Timestamp when the resource was updated. */
    updatedAt?: string;
    /** Timestamp when the mapping was soft-deleted. */
    deletedAt?: string;
  }[];
};
export type AssignViewToWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** View ID */
  viewId: string;
};
export type UnassignViewFromWorkspaceApiResponse = unknown;
export type UnassignViewFromWorkspaceApiArg = {
  /** Workspace ID */
  workspaceId: string;
  /** View ID */
  viewId: string;
};
export const {
  useGetFeaturesQuery,
  useGetFeaturesByOrganizationQuery,
  useSubmitSupportRequestMutation,
  useDeleteBadgeByIdMutation,
  useGetBadgeByIdQuery,
  useCreateOrUpdateBadgeMutation,
  useGetAvailableBadgesQuery,
  useAssignBadgesMutation,
  useGetUserCredentialsQuery,
  useSaveUserCredentialMutation,
  useUpdateUserCredentialMutation,
  useDeleteUserCredentialMutation,
  useGetCredentialByIdQuery,
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
  useGetMeshModelModelsQuery,
  useGetOrgsQuery,
  useCreateOrgMutation,
  useGetOrgByDomainQuery,
  useGetOrgQuery,
  useDeleteOrgMutation,
  useUpdateOrgMutation,
  useGetOrgPreferencesQuery,
  useAddTeamToOrgMutation,
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useRemoveTeamFromOrgMutation,
  useAddUserToOrgMutation,
  useDeleteUserFromOrgMutation,
  useAddRoleHolderMutation,
  useDeleteRoleMutation,
  useGetAllRolesQuery,
  useUpsertRoleMutation,
  useBulkEditRoleHolderMutation,
  useGetRoleKeychainsQuery,
  useAssignKeychainToRoleMutation,
  useUnassignKeychainFromRoleMutation,
  useGetSchedulesQuery,
  useUpsertScheduleMutation,
  useGetScheduleQuery,
  useDeleteScheduleMutation,
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
  useCreateViewMutation,
  useGetViewsQuery,
  useShareViewMutation,
  useGetViewByIdQuery,
  useUpdateViewMutation,
  useDeleteViewMutation,
  useGetMyAcademyCurriculaQuery,
  useCreateAcademyCurriculaMutation,
  useGetAcademyCurriculaQuery,
  useGetAcademyContentQuery,
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
  useGetConnectionsQuery,
  useRegisterConnectionMutation,
  useGetConnectionByIdQuery,
  useUpdateConnectionMutation,
  useDeleteConnectionMutation,
  useDeleteMesheryConnectionMutation,
  useGetKubernetesContextQuery,
  useAddConnectionToEnvironmentMutation,
  useRemoveConnectionFromEnvironmentMutation,
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
  useGetCatalogContentQuery,
  usePublishCatalogContentMutation,
  useUnPublishCatalogContentMutation,
  useGetCatalogContentClassesQuery,
  useApproveCatalogRequestMutation,
  useDenyCatalogRequestMutation,
  useHandleResourceShareMutation,
  useGetResourceAccessActorsByTypeQuery,
  useShareDesignMutation,
  useGetCatalogRequestQuery,
  useCreateEnvironmentMutation,
  useGetEnvironmentsQuery,
  useGetEnvironmentByIdQuery,
  useUpdateEnvironmentMutation,
  useDeleteEnvironmentMutation,
  useGetEnvironmentConnectionsQuery,
  useDeleteEventMutation,
  useCreateEventMutation,
  useBulkDeleteEventsMutation,
  useBulkUpdateEventStatusMutation,
  useUpdateEventStatusMutation,
  useGetEventsOfWorkspaceQuery,
  useGetEventsAggregateQuery,
  useGetEventsQuery,
  useGetEventSummaryByUserQuery,
  useGetEventTypesQuery,
  useGetFiltersQuery,
  useUpsertFilterMutation,
  useDeleteFiltersMutation,
  useGetFilterQuery,
  useUpdateFilterMutation,
  useDeleteFilterMutation,
  useCloneFilterMutation,
  useGetFilterFileQuery,
  useGetInvitationQuery,
  useDeleteInvitationMutation,
  useUpdateInvitationMutation,
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useHandleUserInviteMutation,
  useSignupRequestMutation,
  useGetSignupRequestsQuery,
  useApproveSignupRequestMutation,
  useDenySignupRequestMutation,
  useGetSignupRequestNotificationQuery,
  useGetPerformanceProfilesQuery,
  useUpsertPerformanceProfileMutation,
  useGetPerformanceProfileQuery,
  useUpdatePerformanceProfileMutation,
  useDeletePerformanceProfileMutation,
  useGetPlansQuery,
  useGetSubscriptionsQuery,
  useCancelSubscriptionMutation,
  useCreateSubscriptionMutation,
  useUpgradeSubscriptionMutation,
  usePreviewSubscriptionUpgradeMutation,
  useHandleSubscriptionWebhookMutation,
  useGetUserTokensQuery,
  useGenerateTokenMutation,
  useDeleteUserTokenMutation,
  useGetUserTokensByIdQuery,
  useIssueIndefiniteLifetimeTokenQuery,
  useGetWorkspacesQuery,
  useCreateWorkspaceMutation,
  useGetWorkspaceByIdQuery,
  useUpdateWorkspaceMutation,
  useDeleteWorkspaceMutation,
  useGetTeamsOfWorkspaceQuery,
  useAssignTeamToWorkspaceMutation,
  useUnassignTeamFromWorkspaceMutation,
  useGetEnvironmentsOfWorkspaceQuery,
  useAssignEnvironmentToWorkspaceMutation,
  useUnassignEnvironmentFromWorkspaceMutation,
  useGetDesignsOfWorkspaceQuery,
  useAssignDesignToWorkspaceMutation,
  useUnassignDesignFromWorkspaceMutation,
  useGetViewsOfWorkspaceQuery,
  useAssignViewToWorkspaceMutation,
  useUnassignViewFromWorkspaceMutation,
} = injectedRtkApi;

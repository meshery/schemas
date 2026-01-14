/**
 * Permission key constants generated from permissions.csv
 * This file is auto-generated - DO NOT EDIT MANUALLY.
 * To regenerate, run: node build/generate-permissions-ts.js
 */

/**
 * A branded type representing a permission key UUID.
 * This provides type safety while remaining compatible with string operations.
 */
export type PermissionKey = string & { readonly __brand: 'PermissionKey' };

/**
 * Permissions Index ID used for this generated file.
 */
export const PERMISSIONS_INDEX_ID = "5f793c7ea40d5f3b0aa28a0ba30b509e64c8fbe44241c2bd46fb67c38b2663be" as const;

/**
 * Creates a PermissionKey from a UUID string.
 * @param uuid - The UUID string to convert
 * @returns The branded PermissionKey
 */
export function createPermissionKey(uuid: string): PermissionKey {
  return uuid as PermissionKey;
}

/**
 * Permission key constants.
 * Each key represents a unique permission identified by its UUID.
 */
export const PermissionKeys = {
  /**
   * View your profile.
   */
  AccountManagementViewProfile: "fa7de118-2d08-4b07-b9d7-3e0baead6d04" as PermissionKey,

  /**
   * Update details of your user account.
   */
  AccountManagementEditAccount: "f5e6bb39-c89a-4172-86f9-14a4a59792c1" as PermissionKey,

  /**
   * Perform a password reset for your user account.
   */
  AccountManagementResetPasword: "ec8a4b2e-8323-4a96-86ef-ec7be8f58ef1" as PermissionKey,

  /**
   * Delete your user account.
   */
  AccountManagementDeleteAccount: "bbcb024b-78eb-48b0-8e99-f74d3862fe0f" as PermissionKey,

  /**
   * Link your social sign-in with GitHub to your existing user account.
   */
  AccountManagementConnectYourGithubAccount: "9ea3070a-f2a4-4655-8660-5dba692f3138" as PermissionKey,

  /**
   * Link your social sign-in with Google to your existing user account.
   */
  AccountManagementConnectYourGoogleAccount: "bab2c574-d4e8-4e1e-a9f8-48c10be66b62" as PermissionKey,

  /**
   * List and see details of active and inactive subscriptions.
   */
  AccountManagementViewSubcription: "9098e61d-deaa-43da-960c-1bc3d5a00495" as PermissionKey,

  /**
   * Create new subscriptions and update existing subscriptions
   */
  AccountManagementManageSubcriptions: "01462c43-dfa8-4a5e-805a-267c9b0ec7ec" as PermissionKey,

  /**
   * Explore subscription plans and compare their features.
   */
  AccountManagementViewPlans: "1907bd7a-5055-4e9b-98f6-7e8b720af887" as PermissionKey,

  /**
   * Export a copy of a design to your local system.
   */
  CatalogManagementDeployDesign: "7a7d3cad-4cf4-48fa-b69c-e6a5abc97a07" as PermissionKey,

  /**
   * Share design with anyone within your organization, and make your design easily accessible to all relevant team members.
   */
  CatalogManagementShareDesign: "d9ae2b08-762f-418f-916f-43de736b53e2" as PermissionKey,

  /**
   * Clone any published design to customise it according to your use cases
   */
  CatalogManagementCloneDesign: "94a12f80-3c45-4a1f-afb2-a68b909d0d7f" as PermissionKey,

  /**
   * Opens design in a Kanvas (currently, specifically in the playground.meshery.io Kanvas)
   */
  CatalogManagementOpenInPlayground: "c4d6c676-6e26-4b0c-9fdd-5eea1b780e98" as PermissionKey,

  /**
   * No description available
   */
  CatalogManagementViewApplications: "bfb200b6-0ba9-4783-95d4-eaf1c8fe004c" as PermissionKey,

  /**
   * View all public and published designs of other team members and private of signed-in user
   */
  CatalogManagementViewDesigns: "3798736d-1f5d-41b3-876f-f3f01453dd15" as PermissionKey,

  /**
   * View all public and published filters of other team members and private of signed-in user
   */
  CatalogManagementViewFilters: "df41c45f-7c73-49c2-a055-0584fdcec1c1" as PermissionKey,

  /**
   * View the catalog publication request queue
   */
  CatalogManagementViewCatalogRequests: "30b68d69-d199-48fd-b4ff-54b5282c5c03" as PermissionKey,

  /**
   * Approve catalog publication requests
   */
  CatalogManagementApproveCatalogRequest: "66fbc8c0-b08a-494b-8c60-68ee1b607176" as PermissionKey,

  /**
   * Deny catalog publication requests
   */
  CatalogManagementDenyCatalogRequest: "b9137717-a20a-44e8-a2f9-94dc3d1a6dcb" as PermissionKey,

  /**
   * View private designs of the org
   */
  CatalogManagementViewPrivateDesigns: "bedb8e5b-56bf-4caf-9e8b-258d30b9229b" as PermissionKey,

  /**
   * View public designs of the org
   */
  CatalogManagementViewPublicDesigns: "3f7cfb90-4267-4acf-868d-6ca0c24fb774" as PermissionKey,

  /**
   * View published designs of the org
   */
  CatalogManagementViewPublishedDesigns: "061e6194-d398-4d7e-94be-3a8bbf019b69" as PermissionKey,

  /**
   * Create new Meshery design
   */
  CatalogManagementCreateNewDesign: "14bd933e-83b7-464d-9a4d-d8c8eb9682ab" as PermissionKey,

  /**
   * Import a design
   */
  CatalogManagementImportDesign: "cc040d21-3160-4a96-8efa-833487a234cd" as PermissionKey,

  /**
   * Export a design in source type format (Kubernetes Manifest, Helm Chart, Docker Compose)
   */
  CatalogManagementExportDesign: "9a783f51-3b4a-47a6-a02e-b0db9e78cd85" as PermissionKey,

  /**
   * Publish a design
   */
  CatalogManagementPublishDesign: "9e66bdec-4177-42f9-8cec-d9eb52a12c38" as PermissionKey,

  /**
   * Unpublish a design
   */
  CatalogManagementUnpublishDesign: "c1595c90-b85b-4ac7-b921-f08959926db3" as PermissionKey,

  /**
   * Validate a design
   */
  CatalogManagementValidateDesign: "da5339dd-a4bc-4b91-8865-d8a703656516" as PermissionKey,

  /**
   * Retract all resources used in a Meshery design from the cluster
   */
  CatalogManagementUndeployDesign: "16b11ffa-7b92-4666-a0ff-191df9cd18b2" as PermissionKey,

  /**
   * Set design information or details of a design
   */
  CatalogManagementDetailsOfDesign: "10a03036-53a0-40b3-9f69-6daab852e434" as PermissionKey,

  /**
   * Edit a design
   */
  CatalogManagementEditDesign: "7f2b7084-4533-4824-b688-50cf35de7ef8" as PermissionKey,

  /**
   * Delete a design
   */
  CatalogManagementDeleteADesign: "f024fcf7-3c3d-4521-b83e-6d659353ca0e" as PermissionKey,

  /**
   * Download a Meshery design in OCI or YAML format
   */
  CatalogManagementDownloadADesign: "64de96b7-60db-4aab-b311-afc64066b2c4" as PermissionKey,

  /**
   * Import a filter
   */
  CatalogManagementImportFilter: "cb79d7fb-19de-45fa-aaf5-0a0afc832bf8" as PermissionKey,

  /**
   * Publish WASM Filter
   */
  CatalogManagementPublishWasmFilter: "173d99b7-3820-4c0c-88b2-a8455bd7a6b5" as PermissionKey,

  /**
   * Unpublish WASM Filter
   */
  CatalogManagementUnpublishWasmFilter: "773f0a4d-ba04-40ed-9298-59ac8749804a" as PermissionKey,

  /**
   * Download a WASM filter
   */
  CatalogManagementDownloadAWasmFilter: "24325b2c-5e08-4ba8-809f-8a4a1bf91084" as PermissionKey,

  /**
   * Check information or details of a WASM filter
   */
  CatalogManagementDetailsOfWasmFilter: "86c457b5-b9ec-4223-af1f-30a5be67d69d" as PermissionKey,

  /**
   * Edit WASM filter
   */
  CatalogManagementEditWasmFilter: "88cd144e-806e-472a-a31a-ef6d64643291" as PermissionKey,

  /**
   * Clone WASM filter from catalog, which allows customizing filter and use it in design
   */
  CatalogManagementCloneWasmFilter: "c84718ca-7479-4ad9-a2b7-a5784baa51fb" as PermissionKey,

  /**
   * Delete WASM filter permanently from catalog.
   */
  CatalogManagementDeleteWasmFilter: "9225d5a7-7255-49be-9233-daeabefae306" as PermissionKey,

  /**
   * Import, Unpublish, Publish, Download, Edit, Clone, Delete, Details of WASM Filter
   */
  CatalogManagementWasmFilterAndFilter: "9225d5a7-7255-49be-9233-daeabefae306" as PermissionKey,

  /**
   * Invite any Meshery Cloud user, or all Meshery users, to work with you on a public design that control – including making changes and releasing new versions.
   */
  CollaborationInviteAnyMesheryCloudUserOrAllMesheryUsers: "ccc4bc8d-f484-42b3-8a62-2667284605c3" as PermissionKey,

  /**
   * Invite any Meshery Cloud user to work with you on a private design that control – including making changes and releasing new versions.
   */
  CollaborationInviteAnyMesheryCloudUserToOnAPrivateDesign: "e28b851f-9a49-4ecf-a86e-493db1a27540" as PermissionKey,

  /**
   * Message in real-time, unattached to a specific design. Control who can pariticpate in the discussion.
   */
  CollaborationMessageInRealTime: "c42d08b2-c3e0-47b6-9e47-cfb149c0a5af" as PermissionKey,

  /**
   * Discuss any design by leaving review comments or notes on a specific design. Control who has access, notify discussion participants with updates, and link from anywhere.
   */
  CollaborationDiscussAnyDesignByLeavingReviewComments: "da5adf96-9fb5-49b2-a55e-dec9c9c4acba" as PermissionKey,

  /**
   * Manage access to designs on a team-by-team, or individual user, basis.
   */
  CollaborationManageAccessToDesigns: "7a17c8d3-bba2-474b-bb1e-be5b5eee5dad" as PermissionKey,

  /**
   * Create and collaborate in online designs in real-time.
   */
  CollaborationCreateAndCollaborateInOnlineDesignsInRealTime: "d5267c04-b3ee-43fe-8b97-2a3321eb7f8e" as PermissionKey,

  /**
   * No description available
   */
  ContentCatalogIstioVirtualServiceDestinationRules: "81e90a7a-fac7-40d1-bf7d-e8250d36fe5d" as PermissionKey,

  /**
   * No description available
   */
  ContentCatalogConsul: "bb345c3a-22f0-4377-8f55-8f6ebef5524d" as PermissionKey,

  /**
   * No description available
   */
  ContentCatalogKuma: "425d0113-0363-48fb-9698-4f392a4b7b48" as PermissionKey,

  /**
   * No description available
   */
  EventManagementViewStatistics: "d5fd3a6f-23a6-429c-b9b3-7ffa75d3f381" as PermissionKey,

  /**
   * No description available
   */
  EventsManagementViewEvents: "4fe3e6b9-3363-4e9d-bfd4-9cd5bd168e5a" as PermissionKey,

  /**
   * No description available
   */
  EventsManagementViewSummary: "82c04345-f7ba-4696-bddd-da7bd0046f38" as PermissionKey,

  /**
   * No description available
   */
  EventsManagementViewAudit: "80bb9c66-0657-49ff-a064-667e9875bb3f" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityDynamicInjectionViaRemoteProvider: "aee2b910-ab6b-4af5-b405-38fdbe11790d" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityNamespacedCustomEndpoints: "ee6562f9-eb5e-4978-9239-fc1ac18a06a2" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilitySwaggerIntegration: "045f4c47-95d7-4ee7-923e-b069faa75640" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityNamespacedCustomResolvers: "192cd281-234a-4127-b8a8-3e6f10d9e730" as PermissionKey,

  /**
   * Extend Meshery's capabilities behind a gRPC interface for Model registration and operation invocation
   */
  ExtensibilityAdapters: "65150884-c617-4aa4-bb0f-09dd0532bb83" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityLoadGenerators: "d63d7908-0699-4548-8493-bc3cb1b32699" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityAuthentication: "3073abac-9b60-4c9e-b8af-0bc3adeeb5a5" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityAuthorization: "e750108f-7659-48a8-8b24-a811f1852819" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityRemoteProviders: "be4505ae-b83e-479f-81f7-8f59eeae251d" as PermissionKey,

  /**
   * No description available
   */
  ExtensibilityUserPreferences: "39da55c3-68eb-4510-a115-bff559e648ef" as PermissionKey,

  /**
   * Propagate document updates peer-to-peer using WebRTC.
   */
  ExtensibilityPeerToPeer: "66f311bf-6b7e-41ee-bab6-5e671dd2f0e6" as PermissionKey,

  /**
   * Install or enable or disabble extensions in Meshery
   */
  ExtensibilityInstallExtension: "24f41e98-7ce1-40c4-a82d-4ae0294d237d" as PermissionKey,

  /**
   * View all user preferences in Meshery UI
   */
  ExtensibilityViewMesheryUserPreferences: "cdec6212-bbbf-4cab-b10d-76d12bee7e56" as PermissionKey,

  /**
   * View all extensions on the extension page
   */
  ExtensibilityViewExtensions: "c1330df4-1bbe-4d5d-8828-f4bd9ee989e5" as PermissionKey,

  /**
   * No description available
   */
  FinancialManagementShowback: "f1a4d8b0-a4f0-413f-83be-9f7fb9e48a08" as PermissionKey,

  /**
   * Per service, per authenticated user
   */
  FinancialManagementChargeback: "3a1c684a-dbde-4833-b592-e64f9c35a50e" as PermissionKey,

  /**
   * Visual insights in your pull requests in GitLab
   */
  GitopsSnapshots: "81287ea7-5e3f-480c-8b2e-211d62d08797" as PermissionKey,

  /**
   * Initiate deployment with creation of pull request
   */
  GitopsBitbucket: "9f236c99-b2ec-4474-9ec8-7c3f8a09e63e" as PermissionKey,

  /**
   * Initiate deployment with creation of pull request
   */
  GitopsGithub: "9f236c99-b2ec-4474-9ec8-7c3f8a09e63e" as PermissionKey,

  /**
   * Initiate deployment with creation of pull request
   */
  GitopsGitlab: "9f236c99-b2ec-4474-9ec8-7c3f8a09e63e" as PermissionKey,

  /**
   * Initiate deployment with creation of pull request
   */
  GitopsArgoevents: "81287ea7-5e3f-480c-8b2e-211d62d08797" as PermissionKey,

  /**
   * Signal pass or fail: to proceed or rollback a deployment
   */
  GitopsWebhook: "b2b183bd-9aff-469e-9c65-8027b75999aa" as PermissionKey,

  /**
   * Signal pass or fail: to proceed or rollback a deployment
   */
  GitopsAssessAndCharacterizeServicePerformance: "b869fa3d-bace-4e7a-9403-99e0b280ed56" as PermissionKey,

  /**
   * No description available
   */
  GitopsVerifyConformanceReturnResultsAndGreenRedLight: "995e6bbd-1015-4213-a859-14e983e42e7b" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementImplicitUserImplicitRoleAdmin: "d5591874-986c-471f-8631-0b0d87989b41" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementMultiTenancy: "18771b5f-6550-4ef2-ab95-cc7a93a12d16" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementAllowsPreferencesToBeSetPerUser: "9032e8f8-414e-462c-afa9-81c4e45f3eec" as PermissionKey,

  /**
   * Static - out of the box
   */
  IdentityAccessManagementBuiltInRoles: "99d7881c-ca1a-41f9-9c0a-fd36a619a110" as PermissionKey,

  /**
   * Customizable roles for specific permission assignments
   */
  IdentityAccessManagementUserDefinedRoles: "4b46c866-0d9e-43e6-8810-b0f8df9d0f8c" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementEnforcementOfTenancy: "6a31b997-9162-4022-87ae-c031bfba53d5" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementHierarchicalPermissioning: "36372d4f-5aea-4c2e-9938-59d7534bfc1b" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementAuthenticationOauth: "db96233e-047b-4e2f-b4e3-419c038e4b26" as PermissionKey,

  /**
   * Access Meshery Server using your existing accounts and centrally manage repository access.
   */
  IdentityAccessManagementAuthenticationLdap: "4d7cccf0-1831-4814-a5eb-2358b99c2870" as PermissionKey,

  /**
   * Use an identity provider to manage the identities of GitHub users and applications.
   */
  IdentityAccessManagementAuthenticationSaml: "59a839ba-277c-4e69-a559-2659a355bfa5" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementAzureActiveDirectory: "e013aebc-b245-451d-a330-423f629fa072" as PermissionKey,

  /**
   * Own and control the user accounts of your enterprise members through your identity provider (IdP).
   */
  IdentityAccessManagementMesheryAsAnIdp: "0b3313eb-5c77-4dba-9074-122cfb01bf55" as PermissionKey,

  /**
   * See public user profile details, public activities and public resources. 
   */
  IdentityAccessManagementViewUserPublicProfile: "daded1e9-ff0f-4259-86ac-e168fd5565d4" as PermissionKey,

  /**
   * See private user profile details, private activities and private resources. 
   */
  IdentityAccessManagementViewUserSettings: "e00cae57-6dc6-41ac-b174-f3b01b4adce0" as PermissionKey,

  /**
   * See all teams within an organization. See all members of all teams.
   */
  IdentityAccessManagementViewAllUsers: "382da488-9a92-4a5b-958d-c4bfe1e80253" as PermissionKey,

  /**
   * Directly create a new user account within a team.
   */
  IdentityAccessManagementUpdateUserProfile: "b9a86a74-d6e9-46e4-abae-fe5235ba0e26" as PermissionKey,

  /**
   * Send a request for a user to join a team.
   */
  IdentityAccessManagementInviteUserToTeam: "d3478829-9281-468e-9d49-f7aa659d0f89" as PermissionKey,

  /**
   * Discontinue user membership of a team and team resources.
   */
  IdentityAccessManagementRemoveUserFromTeam: "8b41825f-e840-42bf-81a8-2f962a6d134b" as PermissionKey,

  /**
   * Establish new team for organizing groups of users and resource access.
   */
  IdentityAccessManagementCreateTeam: "8608355a-bf35-4bd6-b339-2384d34ae2ed" as PermissionKey,

  /**
   * Dissolve a team and all user memberships. Leave associated resources intact.
   */
  IdentityAccessManagementDeleteTeam: "44ce4333-a138-42a3-9695-c6c1fcd2c301" as PermissionKey,

  /**
   * Delete a user account
   */
  IdentityAccessManagementDeleteUser: "8e077f96-c957-478f-aae1-0e96232dc3e7" as PermissionKey,

  /**
   * Edit user role, name, email etc
   */
  IdentityAccessManagementEditUser: "eb4dff91-a7c6-4167-aa2d-2e81539e6b62" as PermissionKey,

  /**
   * Create a new user
   */
  IdentityAccessManagementCreateUser: "032582e1-c406-4c75-8732-4f2ada0191b3" as PermissionKey,

  /**
   * Leave a team
   */
  IdentityAccessManagementLeaveTeam: "680b9fcb-6d8d-448d-8012-4b792d71c52e" as PermissionKey,

  /**
   * View all configured Kubernetes clusters
   */
  IdentityAccessManagementViewAllKubernetesClusters: "b99a9a0a-2cb9-4be7-8251-14a249e4038e" as PermissionKey,

  /**
   * See only teams to which you are a member. See all other members within those teams.
   */
  IdentityAccessManagementViewTeam: "27447fb0-be46-4497-8366-c34e24920f22" as PermissionKey,

  /**
   * See all teams of which you are an administrator. See all members of those teams.
   */
  IdentityAccessManagementViewTeams: "6ecbbe79-c392-43bd-b7b6-ecdec019e24c" as PermissionKey,

  /**
   * See all teams within an organization. See all members of all teams.
   */
  IdentityAccessManagementViewAllTeams: "8b94dd6b-234f-4c89-86cf-b029e0090255" as PermissionKey,

  /**
   * Directly create a new user account within a team.
   */
  IdentityAccessManagementAddUserToTeam: "88b9a857-d012-4c6d-a129-4ce65b63b018" as PermissionKey,

  /**
   * Edit a team and add new members to it.
   */
  IdentityAccessManagementEditTeam: "6cf69881-0be0-4723-b5f0-031b7847509a" as PermissionKey,

  /**
   * Remove roles from users in a team.
   */
  IdentityAccessManagementRemoveRolesFromTeamMembers: "ed3dbd2d-52f8-4608-87e0-7f2999a4518c" as PermissionKey,

  /**
   * Assign roles to users in a team
   */
  IdentityAccessManagementAssignRolesToTeamMembers: "06f33eca-950c-4daa-b46d-e73af39e0868" as PermissionKey,

  /**
   * This governs the team's invitation permissions, determining whether the team is allowed to extend invitations to new individuals to join through open invite link.
   */
  IdentityAccessManagementOpenTeamInvite: "6086c0a5-cd79-48ca-8c9f-a0e0ad75343c" as PermissionKey,

  /**
   * Establish new organization for organizing teams, users, and resource access.
   */
  IdentityAccessManagementCreateOrganization: "17a6fa82-cdab-46db-a7ce-a9d0a1bbf40f" as PermissionKey,

  /**
   * Edit organiaztions and add teams to it
   */
  IdentityAccessManagementEditOrganization: "d39a34fb-0ccf-4c80-8a6c-b545c8db869a" as PermissionKey,

  /**
   * Directly create a new user account within an organization.
   */
  IdentityAccessManagementAddUserToOrganization: "33bf7a57-f787-4208-b01c-ad9b9d9c6b6c" as PermissionKey,

  /**
   * Send a request for a user to join an organization.
   */
  IdentityAccessManagementInviteUserToOrganization: "c8489026-11ab-4753-a445-8e20fc032c38" as PermissionKey,

  /**
   * Discontinue user access to organization, teams and resources; cease billing accrual.
   */
  IdentityAccessManagementRemoveUserFromOrganization: "3ed858e4-418d-4220-9d4c-a217fd466d86" as PermissionKey,

  /**
   * Elevate or remove organization level administrative privileges.
   */
  IdentityAccessManagementPromoteOrDemoteUserToOrgAdmin: "0ddd82df-27ed-4781-a91a-ec1dbeb620d0" as PermissionKey,

  /**
   * See only organizations to which you are a member. See all other members within your membership teams.
   */
  IdentityAccessManagementViewOrg: "49f02947-0c8d-4b2d-af53-f50ce18f8861" as PermissionKey,

  /**
   * See all organizations of which you are an administrator. See all members of those organizations.
   */
  IdentityAccessManagementViewOrganizations: "172fa7d3-0d8a-4646-a789-bf64f52ba40b" as PermissionKey,

  /**
   * See all organizations within a Layer5 Cloud deployment. See all organizations, teams, and users.
   */
  IdentityAccessManagementViewAllOrganizations: "e996c998-a50f-4cb8-ae7b-f2f1b523c971" as PermissionKey,

  /**
   * Remove roles from users in an organization
   */
  IdentityAccessManagementRemoveRolesFromOrganizationMembers: "8a003a11-a909-425a-bd23-d8ba14972c89" as PermissionKey,

  /**
   * Assign roles to users in an organization
   */
  IdentityAccessManagementAssignRolesToOrganizationMembers: "0d455711-6205-422b-9de7-05933fe2aeb2" as PermissionKey,

  /**
   * Transfer organization ownership to another member of the organization.
   */
  IdentityAccessManagementTransferOrganizationOwnership: "c81764a3-9fb1-451e-8e80-693cba6f79bf" as PermissionKey,

  /**
   * Decommission organization and suspend account from additional accruals.
   */
  IdentityAccessManagementDeleteOrganization: "b3dc083c-fe8e-43a9-9bcd-ed93d4584f55" as PermissionKey,

  /**
   * Leave an organization
   */
  IdentityAccessManagementLeaveOrganization: "b249fb5f-bdae-4008-8aa6-862f9d911656" as PermissionKey,

  /**
   * Organizations can be assigned unique, validated custom domains through settings.
   */
  IdentityAccessManagementCustomDomain: "0c9da04b-9b9a-4b97-8c5d-3137df5d684f" as PermissionKey,

  /**
   * Assigned domains direct user traffic to organizations; clearing the field removes the assignment.
   */
  IdentityAccessManagementDomainRoutingAndRemoval: "88fc2f27-f9b2-42c8-99b5-e36389398796" as PermissionKey,

  /**
   * Create, update , delete and manage recogntions awarded by your organization
   */
  IdentityAccessManagementManageRecognitions: "0a887b7f-b6c2-4a33-b080-bec9c3894d0c" as PermissionKey,

  /**
   * Create, update , delete and manage invitations to your organization
   */
  IdentityAccessManagementManageInvitations: "0204fb47-b120-4074-83db-984d595d9f69" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementRoles: "9a84a5d0-0a16-11ee-be56-0242ac120002" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementAssignUserRoles: "9a84a76a-0a16-11ee-be56-0242ac120002" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementAssignKeychainsToRoles: "9a84abb6-0a16-11ee-be56-0242ac120002" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementCreateCustomRoles: "9a84ad00-0a16-11ee-be56-0242ac120002" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementUpdateCustomRoles: "9a84ad07-0a16-11ee-be56-0242ac120002" as PermissionKey,

  /**
   * Delete a user's role permanently
   */
  IdentityAccessManagementDeleteCustomRoles: "19b3b3a3-7dc9-4e2f-b984-69241ec90fc8" as PermissionKey,

  /**
   * No description available
   */
  IdentityAccessManagementExportCustomRoles: "9274af31-5166-4876-ab44-27f458c5082c" as PermissionKey,

  /**
   * Browse the list of open entitlement requests
   */
  IdentityAccessManagementViewAllAccessRequests: "070153eb-6dd5-4aad-95b4-fb0444c88a89" as PermissionKey,

  /**
   * Entitle user. Approve access request.
   */
  IdentityAccessManagementAcceptAccessRequest: "afded44a-8b17-4d4d-bfc3-a76eadcc37fe" as PermissionKey,

  /**
   * Restrict user access to requested resource.
   */
  IdentityAccessManagementDenyAccessRequest: "f25bea25-a33b-40e9-9621-bbc30888c11b" as PermissionKey,

  /**
   * Test and verify configuration changes in a separate environment.
   */
  LifecycleManagementDryRun: "161c2b67-ce61-4b4d-b47e-38fcd2e87b13" as PermissionKey,

  /**
   * Istio, Linkerd, Consul, Kuma, Traefik Mesh, AWS App Mesh, NGINX Service Mesh, Network Service Mesh, Cilium Service Mesh, VMware Tanzu Service Mesh
   */
  LifecycleManagementMesheryAdaptersProvisionConfigureAndManage10DifferentServiceMeshes: "9cbc1827-7650-4e5b-8259-0823fd11ba9d" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementProvisioningDeprovisioning: "ad2af8de-e4e6-4e4d-98e0-014220658e23" as PermissionKey,

  /**
   * MeshOpsv1
   */
  LifecycleManagementSimpleConfiguration: "89bab590-3f0c-44aa-a8f1-04ebb877e506" as PermissionKey,

  /**
   * MeshOpsv2
   */
  LifecycleManagementAdvancedConfiguration: "dd6d980c-23f2-4245-9f07-551de833c39a" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementManagedUpgrades: "7e0fe9a7-aae0-409a-9eec-08dc2ff2af21" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementAdHocAddOrRemove: "2399ea30-118d-4495-93b9-c53c961b5cb7" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementParseLogs: "1e927029-59db-4ede-88fc-ec0cb2756a79" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementExecShell: "e0c5f744-13e1-4bd2-bdb2-83f90581fdc2" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementDynamicLoadUnload: "4d4b7c26-4378-4e14-9741-edeb46789a71" as PermissionKey,

  /**
   * Day 2 support for ongoing synchronization of Kubernetes configuration, workloads and service mesh changes.
   */
  LifecycleManagementClusterDiscovery: "64a36679-68b2-4328-bb1c-7c577ef5267a" as PermissionKey,

  /**
   * Ongoing synchronization of Kubernetes configuration, workloads and service mesh changes across any number of Kubernetes clusters.
   */
  LifecycleManagementMultipleKubernetesClusters: "53c2c0e8-2403-475b-9ffc-0dd501bef8f6" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementEnvironments: "7953c71b-22a2-4b12-bead-8b3bf54ef3c6" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementAnnouncementAndSynchronization: "f59af5fd-b571-46f0-b8d1-09194434a38e" as PermissionKey,

  /**
   * No description available
   */
  LifecycleManagementOrganizationalPermissioning: "0ad304a3-973e-4855-aaed-f445870bbb35" as PermissionKey,

  /**
   * Add Kubernetes cluster
   */
  LifecycleManagementAddCluster: "fce15b20-78ac-42af-b79c-b8f19bdb0802" as PermissionKey,

  /**
   * Change connection state
   */
  LifecycleManagementChangeConnectionState: "14ac9622-3170-4580-8403-ed7a584f90ef" as PermissionKey,

  /**
   * Clearing the database by clicking on the `Flush MeshSync`
   */
  LifecycleManagementFlushMeshsyncData: "8dd4c54a-bccd-4fb3-a18c-269195653a91" as PermissionKey,

  /**
   * Register discovered Meshsync resource to change state to connection
   */
  LifecycleManagementRegisterDiscoveredMeshsyncResource: "214ad6b1-df4d-44a6-8872-8ad1f751ef68" as PermissionKey,

  /**
   * Delete a connection
   */
  LifecycleManagementDeleteAConnection: "61afb8c2-cda6-4175-aad9-74ff87fed323" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemStreamlinedCi: "ff2ea71f-2e28-4b21-89ef-352c509b1247" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemIntegrationTests: "1852b847-4906-442a-9887-76bdedfcc4da" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemReleaseChannelsStableAndEdge: "f17bb4cc-8d99-4443-858b-201cb9d77be8" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemTimeToValueEasySetupOfMeshery: "f75ee33b-914f-4d80-bfe4-da83764cb45d" as PermissionKey,

  /**
   * Windows, Linux, MacOS
   */
  MesherySystemMesheryctl: "a80495bb-1c2d-4b93-bffe-2ee5720fba90" as PermissionKey,

  /**
   * Minikube, Docker, OpenShift
   */
  MesherySystemMesheryServer: "f1399331-15ac-495a-b315-2afa5027288c" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemMeshsync: "424abe7b-c0e3-4a0d-88cb-44114ae5a465" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemScriptHomebrewScoop: "b850d27a-bcca-4400-b656-7ccac8f94bc4" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemFacilitateCollectionOfDebugForEaseOfIssueReporting: "eac85b45-2aef-4297-b1f4-286d8f5fb7ce" as PermissionKey,

  /**
   * No description available
   */
  MesherySystemEachComponent: "e9ed93eb-1c43-4aba-869f-ca780d491071" as PermissionKey,

  /**
   * Seamlessly manage your configurations, deployments, and interactions through our intuitive and powerful command-line interface: mesheryctl
   */
  MesherySystemCli: "55d44b27-10e2-4f23-a7c5-eefce75cfd69" as PermissionKey,

  /**
   * View settings in Meshery
   */
  MesherySystemViewSettings: "fdc038e3-1fdf-403a-af8a-53c0de8d7820" as PermissionKey,

  /**
   * Configure and connect to Meshery adapters
   */
  MesherySystemConnectAdapter: "c93bd211-1dac-42cc-9086-859288826d1b" as PermissionKey,

  /**
   * Configure and connect to metrics like Grafana and Promethues
   */
  MesherySystemConnectMetrics: "b0aee906-c549-445f-be0c-b98b04d47d09" as PermissionKey,

  /**
   * View already configured metrics
   */
  MesherySystemViewMetrics: "7fe36f60-fd0a-4fda-84e5-c64a04c3ad06" as PermissionKey,

  /**
   * Explore entities within capabilities registry
   */
  MesherySystemViewRegistry: "cc069117-08cc-44e3-9c61-ae0eeca0bcf1" as PermissionKey,

  /**
   * Reset Meshery database
   */
  MesherySystemResetDatabase: "84fc402c-f33e-4a21-a0e3-e14f9e20b125" as PermissionKey,

  /**
   * No description available
   */
  KanvasPlaybackServiceTransactionsScrubOverTheHistoryOfChangesToYourDeployments: "83784db9-bb58-4e15-aede-cbac7d01f431" as PermissionKey,

  /**
   * No description available
   */
  KanvasRepresentationOfInfrastructureConfigurationAndServices: "51481036-07fa-425b-89fb-cb6141a8d7b5" as PermissionKey,

  /**
   * Continuous visibility across all of your clusters and workloads.
   */
  KanvasServicePerformance: "54112584-8ba3-4a0e-b930-b32d0d054ae2" as PermissionKey,

  /**
   * Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to drag and drop a design onto the canvas to merge with exisitng nodes on canvas.
   */
  KanvasDragNDropPatternMergeWithExistingNodesOnCanvas: "f8434605-cf0d-44ae-8b5a-31bca20c3d06" as PermissionKey,

  /**
   * Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to drag and drop a design onto the canvas to displace the exisitng nodes on canvas.
   */
  KanvasLoadDesignPatternDisplaceCurrentNodesOnCanvas: "ccd8e0eb-5e2a-45e3-9b3d-3941b60dfed8" as PermissionKey,

  /**
   * In Meshery, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to configure a component currently present on canvas.
   */
  KanvasEditComponentConfugurationRjsfTooltips: "8154fa61-aca9-4274-bcdd-6f551e9b17eb" as PermissionKey,

  /**
   * No description available
   */
  KanvasConfigureFieldrefs: "4770f8cc-8f58-4da9-89e2-a7e7c2ea4e2f" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to delete a component from canvas.
   */
  KanvasDeleteComponents: "9f2264fa-9e40-4625-8bc0-5c9162d617a7" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to clone a component, along with it's configuration, on canvas.
   */
  KanvasCloneComponents: "8d640c90-8a8e-4ac0-a4bb-010f81cfc00a" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to clone a component, along with it's configuration, on canvas.
   */
  KanvasCopyComponents: "fbeacff4-9eed-4f55-aee3-9c3da53bdc9b" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to lock a component's state present on canvas.
   */
  KanvasLockComponents: "08ebbd83-870f-4267-b3b7-7e50669b1e26" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to copy a component present on canvas. The canvas is where the design and all it's components are displayed and configured. This permission grants the user the ability to cofigure/edit/update a design by adding new components to the canvas.
   */
  KanvasAddComponents: "3a345a78-2ac7-4916-bc99-91769f5c4959" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to configure the style of a component.
   */
  KanvasConfigureComponentStyles: "af9f2e20-1cae-41ac-94b2-379fddc2660f" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to reset a component to it's initial style.
   */
  KanvasResetComponentStyles: "faa0cb66-af78-4a6f-84f0-3bfae7254276" as PermissionKey,

  /**
   * In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to reset a component to it's initial style.
   */
  KanvasResizeComponents: "faa0cb66-af78-4a6f-84f0-3bfae7254276" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a shape from canvas.
   */
  KanvasDeleteShapes: "436d24e5-4a0d-4298-b94d-394d6e489ec3" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a shape  on canvas.
   */
  KanvasCloneShapes: "74a27b19-1614-46ca-94f2-c1cc96b1e610" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a shape on canvas.
   */
  KanvasCopyShapes: "7f5dd8ef-eef0-4693-b918-9571c1214ad3" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a shape on canvas.
   */
  KanvasLockShapes: "6f196e4d-0626-47af-8721-1364f5f2f5f2" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new shapes on canvas.
   */
  KanvasAddShapes: "35ce3654-7d96-4898-9398-364bcbe49c45" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of shapes present on canvas.
   */
  KanvasConfigureShapeStyles: "461c58a2-293d-40ef-bd85-16df143feea1" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of shapes present on canvas.
   */
  KanvasResetShapeStyles: "73d6fda8-8ea8-4b0f-ad89-ad6b549b28d0" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a textbox from canvas.
   */
  KanvasDeleteTextboxes: "67132e28-d52a-4fbd-a697-16d19f3505bd" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a textbox on canvas.
   */
  KanvasCloneTextboxes: "7dea5e81-a2cb-4f95-8855-b19e3756c0ab" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a textbox on canvas.
   */
  KanvasCopyTextboxes: "6dbd7813-a9c4-454b-b3a6-c1eae313c791" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a textbox on canvas.
   */
  KanvasLockTextboxes: "56c1ae0d-cf71-43ce-9453-6dd447e6dd8f" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new textboxes on canvas.
   */
  KanvasAddTextboxes: "9366be38-96f4-4a84-aff0-e17148a8a358" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of textboxes present on canvas.
   */
  KanvasConfigureTextboxStyles: "0653814a-0266-4d55-bc52-6ef17ebcf03d" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of textboxes present on canvas.
   */
  KanvasResetTextboxStyles: "26815ca4-1fec-43fc-a8aa-9669719632a4" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a section from canvas.
   */
  KanvasDeleteSections: "7b7377c8-2160-42eb-a130-4a69ab1225ed" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a section on canvas.
   */
  KanvasCloneSections: "41de8c25-71c1-4fc5-9230-c018af8f1e41" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a section on canvas.
   */
  KanvasCopySections: "c05ca2ed-262d-4dc1-aa10-69b93dbe4e39" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a section on canvas.
   */
  KanvasLockSections: "fcfbc9ee-3824-45e9-ba50-c4c6ec52779b" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new sections on canvas.
   */
  KanvasAddSections: "d15a960c-d4d5-4656-94e5-7a1e116fa610" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of sections present on canvas.
   */
  KanvasConfigureSectionStyles: "66c06b53-c174-415d-b88b-0d8c858c4034" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of sections present on canvas.
   */
  KanvasResetSectionStyles: "21bce984-73c1-4025-acd5-f18cdbd796db" as PermissionKey,

  /**
   * Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add text to the textboxes currently on canvas.
   */
  KanvasAddTextToTextboxes: "e0fabc93-1566-4780-934d-adddf2275f64" as PermissionKey,

  /**
   * No description available
   */
  KanvasCreateDynamicFieldrefs: "2a2a61b6-9fda-4cc6-86e9-1a71a54863c7" as PermissionKey,

  /**
   * No description available
   */
  KanvasConfigureEdgeHandles: "23f7adfe-de4b-42be-a3cd-f7f34d83c319" as PermissionKey,

  /**
   * No description available
   */
  KanvasDeleteEdgeHandles: "3e1b0633-06a9-4be9-a6fb-c15cc453834f" as PermissionKey,

  /**
   * No description available
   */
  KanvasUseHeirarchicalRelationships: "a6552d56-1712-45cc-8b96-05ba419c357c" as PermissionKey,

  /**
   * No description available
   */
  KanvasUseInventoryRelationships: "ab2bbc88-b0e2-4267-9663-a554cd0a7e26" as PermissionKey,

  /**
   * Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to change the layout of the components in the design.
   */
  KanvasChangeDesignLayout: "e4fcd40d-4e5d-4c2b-9d76-1f92ccfe8edd" as PermissionKey,

  /**
   * This permission grants the user the ability to undo/redo any action in done in Kanvas
   */
  KanvasUndoOrRedo: "1ae55743-0496-45f7-9a42-aabb7f0d6c70" as PermissionKey,

  /**
   * Pencil is mouse/tool mode available in Kanvas that allows users to draw freehand shapes. This permission grants user the ability to use the pencil mode in Kanvas.
   */
  KanvasUsePencil: "02c7afe9-44b2-4fe7-8c8b-1c12a0da600f" as PermissionKey,

  /**
   * Pen is a mouse/tool mode available in Kanvas that allows users to draw edges from one component to another. This permission grants user the ability to use the pencil mode in Kanvas.
   */
  KanvasUsePen: "b5aaeaf2-a563-4e7a-a556-7670a41cc946" as PermissionKey,

  /**
   * Ability to freeform draw any shapes, draw edges
   */
  KanvasWhiteboarding: "dd64b24d-fd22-4123-94fc-a1f235f7f514" as PermissionKey,

  /**
   * Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads
   */
  KanvasVisualDesign: "5ea237bb-013e-412f-9dbf-394a6d27a027" as PermissionKey,

  /**
   * Generator for GCP via K8s CRDs
   */
  KanvasModels: "8a10b666-b5f8-4310-90da-9c33ceae4058" as PermissionKey,

  /**
   * Help center houses various ways through which the users might try to learn more about the Kanvas and it's features or reach out through various channels for help. This permission grants the user the ability to view the help center and use it's features
   */
  KanvasViewHelpCenter: "1a7eab59-2f09-45a5-9ad3-b02faf0f8f6a" as PermissionKey,

  /**
   * The canvas is where the design and all it's components are displayed. This permission grants the user the ability to take a screenshot of the current state of canvas
   */
  KanvasScreenshotCanvas: "31994492-1bae-400d-835b-1a4ff63e9e15" as PermissionKey,

  /**
   * Layers refer to the collection of various entities present on the canvas, for example, components, relationships, component badges, etc. This permission grants the user the ability to decide which entities to display/hide on the canvas.
   */
  KanvasConfigureVisibleLayers: "5417ccdb-46fe-467d-b408-d4705cd4d78b" as PermissionKey,

  /**
   * The canvas is where the design and all it's components are displayed and configured. This permission grants the user the ability to remove all current entities from the canvas and create a new one to start from scratch
   */
  KanvasCreateBlankDesignInKanvas: "958e68aa-c8d4-4965-b094-636289d855f9" as PermissionKey,

  /**
   * Like a Google Doc, Designs are your primary tool for collaborative authorship of your infrastructure and services. A Design describes all the resources and their properties that you want for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to save a design (while logged in)
   */
  KanvasSaveDesignInKanvas: "31096e00-0142-41fd-8680-d5212bc13c2c" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to view comments in a design on canvas.
   */
  KanvasViewComments: "3c72993d-7ebe-4ce2-bbc5-64d9b0fbb65e" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to resolve a comment thread in a design on canvas.
   */
  KanvasResolveAComment: "1ba1822d-d6c0-4595-92e6-63d92f02e3a5" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to delete a comment on canvas.
   */
  KanvasDeleteComments: "6ff22145-7fa1-4a06-a986-5a3f5d5718ca" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to clone a comment on canvas.
   */
  KanvasCloneComments: "f325d8ec-d6c6-4367-9fe8-3affd9ba33b7" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to copy a comment on canvas.
   */
  KanvasCopyComments: "cfa66488-21aa-4f9c-8e98-bf6cf9ceb02d" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to lock a comment on canvas.
   */
  KanvasLockComments: "8f6e9ffa-8d7b-48ab-b0b2-f017fa6a99fe" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to add a comment on canvas.
   */
  KanvasAddComments: "2c47e53b-aea9-471f-8048-bd618c86418d" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to configure the styles of a comment on canvas.
   */
  KanvasConfigureCommentStyles: "4366c965-2914-4c3c-a52d-0f2b3a8eb22c" as PermissionKey,

  /**
   * Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to reset the styles of a comment on canvas.
   */
  KanvasResetCommentStyles: "c9c6d2bf-e566-49c8-bee0-bc6cf84cb8a8" as PermissionKey,

  /**
   * See all views withing a workspace
   */
  KanvasViewViews: "93cba7f8-82ec-4a64-b384-f81d6acc8db3" as PermissionKey,

  /**
   * Create a new view
   */
  KanvasCreateView: "47ba32dc-aaa3-4c75-afdd-07fb40f38f4f" as PermissionKey,

  /**
   * Dissolve environment and all connection memberships. Leave associated resources intact.
   */
  KanvasDeleteView: "48076416-bc07-456b-bbea-49bdca239d0f" as PermissionKey,

  /**
   * Edit environment and it connection membership
   */
  KanvasEditView: "2f8354bb-6855-4a42-8086-8d55c1c7e638" as PermissionKey,

  /**
   * Add new views to workspace
   */
  KanvasAssignViewsToWorkspace: "fb6c987b-e54c-4016-b3f3-0488228ee998" as PermissionKey,

  /**
   * Remove views from workspace
   */
  KanvasUnassignViewsFromWorkspace: "f77d74ef-1cae-4527-b45e-ecc1431681df" as PermissionKey,

  /**
   * Export views to JSON format
   */
  KanvasExportViews: "3bb16c17-79bb-4673-8287-e818b8aece5c" as PermissionKey,

  /**
   * View detailed information about a view and it's comopnent
   */
  KanvasViewViewComponentDetails: "d363b6a3-7ae5-4be0-a35f-91d9e5136b1a" as PermissionKey,

  /**
   * Open a pre-existing view
   */
  KanvasOpenView: "c47d29bc-7d23-433e-8140-ab273734b7df" as PermissionKey,

  /**
   * Saved view
   */
  KanvasSaveViews: "93250075-0994-4ff8-8ff3-7ecc74ca7956" as PermissionKey,

  /**
   * Share Views
   */
  KanvasShareViews: "631ebd8c-a084-4df0-be9b-de5abd2d8468" as PermissionKey,

  /**
   * Clone Views
   */
  KanvasCloneViews: "258c7e18-9ac4-41d7-a637-7f12a7f24df7" as PermissionKey,

  /**
   * Direct terminal access to one ore more pods/containers simultaneously. Integrated experience.
   */
  KanvasWebBasedTerminal: "4726da45-2108-409b-b94f-45bd1e199a78" as PermissionKey,

  /**
   * View Interactive Terminal
   */
  KanvasViewInteractiveTerminal: "4726da45-2108-409b-b94f-45bd1e199a78" as PermissionKey,

  /**
   * View managed infrastructure resources details in Kanvas Operator
   */
  KanvasViewComponentDetails: "5d1e226b-cc0c-407c-8fa7-37159d06698d" as PermissionKey,

  /**
   * View real-time resource metrics in Kanvas Operator
   */
  KanvasViewObservabilityMetrics: "2988a366-a743-48e7-9946-daff9b2ab0a1" as PermissionKey,

  /**
   * Perform a conformance test in Kanvas Operator
   */
  KanvasPerformConformanceTest: "901ca054-0656-4db5-8d58-d618e0b82b39" as PermissionKey,

  /**
   * Stream container logs in Kanvas Operator
   */
  KanvasStreamContainerLogs: "c1ff0f0d-95b5-4765-8c64-d77af99e5d4f" as PermissionKey,

  /**
   * Perform performance test in Kanvas Operator
   */
  KanvasPerformPerformanceTestInVisualizer: "88fe3781-bd53-4bfb-bab9-27e3ad06a9f5" as PermissionKey,

  /**
   * Select a performance profile to run tests using
   */
  KanvasSelectPerformanceProfileInVisualizer: "16d80ca9-c245-4622-9482-45303b963811" as PermissionKey,

  /**
   * Meshery Cloud
   */
  OfferManagementHelmBased: "bfcc083f-7918-4229-a20e-758661ed73b2" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementSmpCompatibleImportExport: "293cf5a4-512a-42aa-86e9-12882ec79a5e" as PermissionKey,

  /**
   * Baseline and track your service mesh performance from release to release.
   */
  PerformanceManagementPersistenceOfTestResults: "fc36a4cc-9f31-4784-8b9f-b38772d05425" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementLoadGeneratorInterfaceCommonInterfaceUsedAsAnExtensionPointForSupportingDifferentTypesOfLoadGenerators: "cd18ca8d-11e3-47cc-a68f-381c0a2561c5" as PermissionKey,

  /**
   * Single Load Generator: Support testing multiple endpoints simultaneously.
   */
  PerformanceManagementLoadGeneration: "826e1994-0bc3-4553-b20c-c62cabad98e6" as PermissionKey,

  /**
   * Multiple Meshery Servers or Meshery Adapters generating load, collecting and coalescing results into a single report.
   */
  PerformanceManagementDistributedLoadGenerator: "13a4dab9-018c-45ce-ac17-66721aa83ff0" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementDefineNameAndSavePerformanceProfiles: "679c7956-e1be-4f97-8400-f1d8fe90f856" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementIntegratePerformanceAnalysisAsAGateInYourGitopsPipelineUsingPerformanceProfilesToRunRepeatableTestsAndAvoidRegressionIssuesBeforeTheyStartConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent: "872dca45-cb80-4dfb-9421-1da1ffb6a265" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementUsingMesheryAsTheOfficalSmiConformanceValidationToolConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent: "b7128770-7dda-4556-be33-991d4173c546" as PermissionKey,

  /**
   * Share performance profiles and test results with individual users or teams.
   */
  PerformanceManagementPerformanceProfiles: "add7825b-355c-4d98-a706-ab8ce273ea21" as PermissionKey,

  /**
   * Historical views: Infrastructure-centric
   */
  PerformanceManagementComparativeTesting: "f480c87e-dc39-4877-9c6f-5e5d4f8f760a" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementExportableReport: "83cdf8a9-27cf-4020-86eb-98865a2a4c4c" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementSocialShare: "4ef3d7a9-23d6-4254-9ba9-e515edafe3da" as PermissionKey,

  /**
   * Experience uninterrupted oversight of your service quality with our Continuous Quality of Service Monitoring.
   */
  PerformanceManagementContinuousQualityOfServiceMonitoring: "bd26b342-2f5c-4985-97e5-aca532327951" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAdaptiveLoadControlOptimizeRps: "28c80137-f726-4366-940d-53f8d2feed13" as PermissionKey,

  /**
   * Schedule one-time or reoccurring performance tests.
   */
  PerformanceManagementSchedulingOfTests: "b1201553-c4b3-4212-9ac1-af11eaee6931" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementSophisticatedRecurringSchedulesOfPerformanceTestsOfConfigurationAnalyzers: "78e3febd-0003-4ac2-8c4f-3d4fefed69d7" as PermissionKey,

  /**
   * Schedule tests from your calendar
   */
  PerformanceManagementCalendarIntegration: "b4791193-0944-430d-b889-f3000e2dc885" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementListenAndLearnAverageRequestResponseTime: "4a5e66d1-a4cc-4aad-8e8a-ce605a3baef5" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementFormulaAndMeasurementScaleUsedToGaugeServiceMeshPerformanceInContextOfTheValueItSProvidingTheEnvironmentAndWorkloadsItSRunning: "cb10fc07-a626-4d25-801c-3fbb9f458206" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAbilityToMonitorSignalsDefinedInSmpAndGenerateAMeshmarkInRealTime: "eaedcc22-198e-4714-9c77-ba84a84dc471" as PermissionKey,

  /**
   * Identify the cost of a specific network function.
   */
  PerformanceManagementMeshmark: "e5620cc6-6a98-4146-966f-562114342aae" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementProtocolsHttp: "1364948f-3e28-4853-84a7-452ba1e7ee13" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementProtocolsGrpc: "3ab50aa9-6860-4618-b97e-b6144da69f12" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementProtocolsTcp: "3eab632b-0392-4bb8-8564-89e21166d902" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementDuration: "6ad02dc5-7e1d-443d-ba82-e4b63c91a402" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementMultipleThreads: "acfeaecf-ca09-43cb-8aa2-31ca688596a4" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementDefaultProfilesToFacilitateCapacitySoakAndOtherTesting: "d0a8cc17-5101-467b-bf7b-ac5b7346cee1" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementComparisonOfTwoOrMoreReports: "8f3061a3-a31d-4c61-9be6-cc002b713853" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementPersistInSmpFormat: "ca1200da-d3f3-4274-831a-2cd6102c5a1b" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementExportSingleOrMultipleResultsInSmpFormat: "0fe311a6-71cb-49d5-8971-b5eb164d973a" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementHistoricalView: "e5b12687-5fc8-49f5-8833-3e43ca652d80" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAnalysisLatencyThroughput: "68730e20-3174-4ac9-9e7b-d3c1bd179b8b" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAnalysisThresholdSettingsForPassFailWhenIntegratedIntoCiPipelines: "ed61627f-6736-4331-8d6d-dddcce98272a" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAnalysisIdentificationOfOpportunitiesToImprove: "37de75c5-b1d7-4358-946d-0a4d72a9d587" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAnalysisTrend: "2a5aedd5-095f-47ad-b4fb-9e9d9f97e8aa" as PermissionKey,

  /**
   * No description available
   */
  PerformanceManagementAnalysisAnomalyDetection: "5b9b0cc2-6ea9-45d3-b989-8bd034768a19" as PermissionKey,

  /**
   * Automatically suggest timeout settings for a given service.
   */
  PerformanceManagementAnalysis: "d9e286d5-54f1-446f-9c1a-ece361e5aca1" as PermissionKey,

  /**
   * Creation of Meshery Nighthawk Adapter. Refactoring of Nighhawk and decoupling it from Meshery container. Lifecycle management of adapter. Definition and registration of adapter capabilities.
   */
  PerformanceManagementMesheryAdapterForNighthawk: "72066352-d09b-494a-b02e-846676bd7a0a" as PermissionKey,

  /**
   * Allow users to identity Kubernetes clusters
   */
  PerformanceManagementDistributedTests: "72066352-d09b-494a-b02e-846676bd7a0a" as PermissionKey,

  /**
   * Add a new performace profile
   */
  PerformanceManagementAddPerformaceProfile: "b2861578-c573-45fe-a95e-0356d56e1d1b" as PermissionKey,

  /**
   * Run a test on performance profile
   */
  PerformanceManagementRunTest: "06de2b07-b4f4-4701-b87f-d92ebb66ba42" as PermissionKey,

  /**
   * View results of performance tests
   */
  PerformanceManagementViewResults: "0c757cc7-4038-4d9b-9b60-fa8d9fc9d27e" as PermissionKey,

  /**
   * Edit performance test
   */
  PerformanceManagementEditPerformanceTest: "33aa5c47-a8aa-4ad5-9950-7c17042c001d" as PermissionKey,

  /**
   * Delete performance test
   */
  PerformanceManagementDeletePerformanceTest: "84aa9d3c-3d4b-4587-947d-ae17b2dcd5f5" as PermissionKey,

  /**
   * View all performance profiles
   */
  PerformanceManagementViewPerformanceProfiles: "6593ac26-820b-4e87-be32-64ee740ea204" as PermissionKey,

  /**
   * No description available
   */
  PolicyNotificationSuppression: "5a3096b7-d7ce-497e-87f0-afc91fa7666e" as PermissionKey,

  /**
   * No description available
   */
  PolicyNotificationCorrelation: "3876eaf6-d02f-41d1-a8be-9887e8522334" as PermissionKey,

  /**
   * No description available
   */
  PolicyVersioned: "068257b7-348a-4f4b-96d1-e4606ef45c93" as PermissionKey,

  /**
   * No description available
   */
  PolicyLogOfAllActionsInvokedByUsers: "8465ed0b-63d4-4a28-944b-4cab4cd5bc7f" as PermissionKey,

  /**
   * No description available
   */
  PolicyNotificationOfAttemptsToInvokeUnauthorizedActions: "cc25afd4-777d-4768-a43f-d8c09ce978cf" as PermissionKey,

  /**
   * No description available
   */
  PolicyAdmissionControlForSpecificWorkloadsOnTheMesh: "7dccf200-eacc-4057-b3d7-ac15ccf70a38" as PermissionKey,

  /**
   * No description available
   */
  PolicyServiceRequestAuthorizationWithJwt: "cae1f1b8-2a88-4bc6-adb4-8e7b80d449ef" as PermissionKey,

  /**
   * No description available
   */
  PolicyPerformanceBudgetSupportInPatterns: "783e4277-4c89-4495-9e50-bbb6c2cd42fb" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementViewOverview: "12dc96f1-a3fa-4bae-9c5a-a280666f9fdb" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementViewCredentials: "96759f76-4add-45f8-b4ef-d4ace5ab1bc4" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementCreateCredential: "30023b1b-01a7-4613-8364-38d3487d1789" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementEditCredential: "e4cd5bb0-8afb-4b35-8716-0e2ead13c9b7" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementDeleteCredential: "cb09f530-aa87-4a18-b3d3-bbcc2d6ca1a6" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementViewSessions: "26cf042a-91db-4237-8644-4d617a0d49e1" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementLogoutFromASession: "177b928b-71ee-4ecd-a30b-3154ff4ba0d9" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementViewTokens: "46d914bc-18c1-438f-aa74-fb78823aa25c" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementDownloadToken: "ee5fc23e-d629-4c7b-8169-27e526394e8b" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementCreateToken: "8aa0df56-57e8-44b7-9d6e-7df413048ed5" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementViewKeys: "3cf506df-8398-49d2-b4e2-f06e3a0f87f0" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementEditKey: "605512d3-ff7f-456c-9230-b1d01c606d47" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementDeleteKey: "efa19dc3-02a3-49b7-a0ff-e4554a2da337" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementViewKeychains: "9e930568-6b55-43d2-91d8-abeafedc1550" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementCreateKeychain: "ec292de6-b62d-421b-94bf-ec5983faa6ff" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementEditKeychain: "163e807d-f508-49ca-9ba6-cc3badb22bb0" as PermissionKey,

  /**
   * No description available
   */
  SecurityManagementDeleteKeychain: "503a6b28-bd91-4dde-86ac-641567777515" as PermissionKey,

  /**
   * This permission grants the user the ability to manage infrastructure life cycles within meshery. Meshery allows users to visualize, work on and manage various cloud native technologies.
   */
  InfrastructureManagementManageCloudNativeInfrastructureLifeCycle: "255fd148-e3fd-4408-a48c-0d157a57d4d9" as PermissionKey,

  /**
   * Manage configuration for applications like EmojiVoto, HTTPBin, Image Hub, Istio Book Info
   */
  InfrastructureManagementManageCloudNativeInfrastructureConfiguration: "0eb0558d-9b21-4e50-b4c6-bd8e9e3414f5" as PermissionKey,

  /**
   * Configure infrastructure with some predefined options like Automatic Sidecar injection, Envoy Filter, Policy
   */
  InfrastructureManagementApplyCloudNativeInfrastructureConfiguration: "3f20a106-24f5-4da6-a8eb-6eddaad50944" as PermissionKey,

  /**
   * Validate cloud native infrastructure  configuration against best practices like Analyze Running Configuration, SMI conformance
   */
  InfrastructureManagementValidateCloudNativeInfrastructureConfiguration: "8bb93f97-fcfb-4827-9fed-f931fdca7b95" as PermissionKey,

  /**
   * This permission grants the user the ability to apply custom configuration and customize existing configuration of thier cloud native infrastructure
   */
  InfrastructureManagementApplyCustomCloudNativeConfiguration: "2f4e2300-4c7e-4d48-95aa-74614a4826fe" as PermissionKey,

  /**
   * This permission grants the user the ability to deploy their infrastructure to a cluster through Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies
   */
  InfrastructureManagementDeployCloudNativeInfrastructure: "f7e70ffb-333d-43b3-a76e-0e6c63b9fbfa" as PermissionKey,

  /**
   * This permission grants the user the ability to undeploy their infrastructure from a cluster through Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies
   */
  InfrastructureManagementUndeployCloudNativeInfrastructure: "6e7f6f4f-4321-4e42-9eff-6a8323f32e84" as PermissionKey,

  /**
   * This permission grants the user the ability to view all cloud native infrastructure in Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies.
   */
  InfrastructureManagementViewCloudNativeInfrastructure: "fdc485dc-f68b-405c-9e54-7b9a7254c282" as PermissionKey,

  /**
   * See all workspaces within an organization
   */
  WorkspaceManagementViewWorkspace: "bc9379e8-dc18-4655-b53c-c641271c4ba3" as PermissionKey,

  /**
   * Dissolve workspace and all team and environment memberships. Leave associated resources intact
   */
  WorkspaceManagementDeleteWorkspace: "09eb0507-2f14-4bc4-92c5-9e26a4efbd5e" as PermissionKey,

  /**
   * Edit workspace and it's team and environment membership
   */
  WorkspaceManagementEditWorkspace: "4112230f-5d1e-4d30-9790-942ad5c1dc50" as PermissionKey,

  /**
   * Create new workspace
   */
  WorkspaceManagementCreateWorkspace: "eb42ac41-a883-465e-843c-d64e962a3a0e" as PermissionKey,

  /**
   * Add new team to workspace
   */
  WorkspaceManagementAssignTeamToWorkspace: "6ab4263b-0bb3-492e-9878-6936a5b6312f" as PermissionKey,

  /**
   * Remove team from workspace
   */
  WorkspaceManagementRemoveTeamFromWorkspace: "c4ed82f5-783d-4451-9b34-44f50cae71df" as PermissionKey,

  /**
   * Add new environment to workspace
   */
  WorkspaceManagementAssignEnvironmentToWorkspace: "f421fc20-c14a-4282-b526-776c6cacfd99" as PermissionKey,

  /**
   * Remove environment from workspace
   */
  WorkspaceManagementRemoveEnvironmentFromWorkspace: "d0657715-80fb-4b00-af27-b78bb0fa56df" as PermissionKey,

  /**
   * Assign designs to workspaces
   */
  WorkspaceManagementAssignDesignsToWorkspaces: "64a1bad5-30f1-431a-aea0-8073d14a0262" as PermissionKey,

  /**
   * Remove designs from workspaces
   */
  WorkspaceManagementRemoveDesignsFromWorkspaces: "076515f1-f696-4211-ae27-58d5463a229e" as PermissionKey,

  /**
   * No description available
   */
  WorkspaceManagementConnectGithubAccountToWorkspace: "410b2d3c-8194-44d1-9f80-7b5fea689b4f" as PermissionKey,

  /**
   * View all connections within an environment
   */
  WorkspaceManagementViewConnections: "b35c9ce0-e787-4de6-8560-631007b0b947" as PermissionKey,

  /**
   * See all environments within an workspace.
   */
  WorkspaceManagementViewEnvironment: "e3656bbc-fba2-483d-9996-34f8614cd21b" as PermissionKey,

  /**
   * Create a new environment
   */
  WorkspaceManagementCreateEnvironment: "a97b7f3b-3349-4a86-b917-2ce0b64a540b" as PermissionKey,

  /**
   * Dissolve environment and all connection memberships. Leave associated resources intact.
   */
  WorkspaceManagementDeleteEnvironment: "70747966-dfad-4523-93ce-bd7421258955" as PermissionKey,

  /**
   * Edit environment and it connection membership
   */
  WorkspaceManagementEditEnvironment: "145ab6ed-b4b6-4e34-ada5-78dada250f89" as PermissionKey,

  /**
   * Add new connections to environments
   */
  WorkspaceManagementAssignConnectionsToEnvironment: "52cbe0b8-9aa7-4605-8eed-aa37e595adbb" as PermissionKey,

  /**
   * Remove connections from environment, 
   */
  WorkspaceManagementRemoveConnectionsFromEnvironments: "65648682-e47f-43d7-a5ad-dc042803f951" as PermissionKey,

  /**
   * View all items in catalog
   */
  CatalogManagementViewCatalog: "0cd05106-36b6-4393-a08e-4222fc10c8de" as PermissionKey,

  /**
   * Delete catalog items
   */
  CatalogManagementDeleteCatalogItems: "3264c9e7-d172-4b9f-bb5d-fe1bda1cdb20" as PermissionKey,

  /**
   * Edit catalog items
   */
  CatalogManagementEditCatalogItems: "86a43f77-9e7d-441a-8fc5-68ea521ea43a" as PermissionKey,

  /**
   * Unpublish items from catalog
   */
  CatalogManagementUnpublishCatalogItems: "03824b03-a61e-403a-b17f-d8f4aea854d2" as PermissionKey,

  /**
   * Set item information or details of a catalog item
   */
  CatalogManagementDetailsOfCatalogItem: "a52ee7bd-496c-4877-830e-f8812cd8d4b7" as PermissionKey,

  /**
   * Download a catalog item
   */
  CatalogManagementDownloadCatalogItem: "7b04ebf8-744e-426f-8075-828cdfe44d51" as PermissionKey,

  /**
   * Clone any item from catalog
   */
  CatalogManagementCloneCatalogItem: "091e083b-78ae-4f03-b028-e36354460c5b" as PermissionKey,

  /**
   * Browse the public catalog of learning paths, challenges, and certifications.
   */
  AcademyViewAcademyContent: "40eb4949-ca16-4b7b-a9ae-4fe18f26fe1d" as PermissionKey,

  /**
   * View and assess the performance of learners and of your organization's academy content.
   */
  AcademyAccessTheAcademyConsole: "045fad17-d2cc-46e8-bb10-f9ee026c799f" as PermissionKey,

  /**
   * No description available
   */
  AcademyAComprehensiveGuideToUsingTheInstructorConsoleLearnHowToTrackLearnerProgressAnalyzeTestPerformanceAndManageYourAcademySContentAndMetrics: "045fad17-d2cc-46e8-bb10-f9ee026c799f" as PermissionKey,

  /**
   * View all challenges
   */
  AcademyViewChallenges: "5996d6c9-4037-404c-af83-92a0895ff7f0" as PermissionKey,

  /**
   * No description available
   */
  AcademyCreateCertifications: "efd922b6-daff-4857-aaee-840637a5f696" as PermissionKey,

  /**
   * Layer5 Cloud uses webhooks to automate approval flows and email notifications. This guide will help you customize and add your own custom webhooks.
   */
  SupportAndDeploymentWebhooks: "df2c9b99-fad3-405b-9733-6cf10e1909ed" as PermissionKey,

  /**
   * Provides a powerful and flexible way to interact with the platform, enabling automation, integration, and customization to optimize your cloud native development and management processes.
   */
  SupportAndDeploymentRestApiUserDocumentation: "90c75125-6506-496b-8704-91bf74532bd2" as PermissionKey,

  /**
   * Provides a powerful and flexible way to interact with the platform, enabling automation, integration, and customization to optimize your cloud native development and management processes.
   */
  SupportAndDeploymentRestApiReference: "776ec711-26aa-47b1-a822-b1b14192b1e7" as PermissionKey,

  /**
   * Customize the appearance and branding of your engineering platform powered by Layer5 Cloud.
   */
  SupportAndDeploymentWhiteLabel: "a27a55af-b71b-400f-a8b1-3f3b1afff4f6" as PermissionKey,

  /**
   * Get help with most of your Meshery questions and issues in our Community Forum.
   */
  SupportAndDeploymentCommunitySupport: "1ae12fbe-32d9-46ef-9ae6-897f9a0017d6" as PermissionKey,

  /**
   * Layer5 Support can help you troubleshoot issues you run into while using Meshery. Get support via the web.
   */
  SupportAndDeploymentStandardSupport: "e2131b18-fe30-47c2-84e7-0207bdc89f0e" as PermissionKey,

  /**
   * With Premium, get a 30-minute SLA and 24/7 web and phone support. With Premium Plus, get everything in Premium plus your own Support Account Manager and more.
   */
  SupportAndDeploymentPremiumAndPremiumPlusSupport: "e49c8c16-58e5-465e-be6d-a81b115c31ee" as PermissionKey,

  /**
   * Self-hosted Layer5 Cloud for on-prem appliances or self-managed cloud tenants. Keep your Kanvas designs internal to your workplace. Get remote support from Layer5 when you need it.
   */
  SupportAndDeploymentSelfHostedDeployment: "3e0aa2da-ca58-4109-a0cc-0dece0ec47c3" as PermissionKey,

  /**
   * Layer5 Support can help you troubleshoot issues you run into while using Meshery. Get support via phone.
   */
  SupportAndDeploymentPhoneSupport: "4e7cf974-7f6e-461c-989b-1176f2d46448" as PermissionKey,

  /**
   * No description available
   */
  SupportAndDeploymentPayBillsViaInvoiceRatherThanUsingYourCreditCard: "f2d10bd7-62e3-4cc1-b376-a19e29d73b40" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementFacilitateANetworkTapOfAnyRequestTraffic: "5e5c5f1e-8bf5-4eaa-8f4e-78e7fabf857e" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementVisualDefinitionsOfTrafficRules: "9468ef99-04c5-43dc-b188-bd8fe03e4564" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementDynamicLoadUnloadOfWasmFilters: "cf3355b2-5bbc-43db-b464-4eb3a4c1a7c1" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementConfigurationOfWasmFilters: "a921366e-f158-479c-bfa7-6b8ec38016da" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementViaWasmFilter: "aef9dd7f-139f-497c-b601-41177a054f2a" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementFlaggerIntegration: "9278cea4-ff9b-4d76-a2e8-5002059aba05" as PermissionKey,

  /**
   * No description available
   */
  TrafficManagementArgoIntegration: "5d1e560b-d56c-4a56-b5f4-35ea18ab7a83" as PermissionKey,

  /**
   * No description available
   */
  ApplicationManagementGolangNativeExponentialBackoff: "ec9db4e8-671e-41ff-a0de-842c25d6f421" as PermissionKey,

  /**
   * No description available
   */
  ApplicationManagementGokit: "1b3e39ba-8d44-4d93-bd3c-202f6d111912" as PermissionKey,

  /**
   * No description available
   */
  ApplicationManagementSpringBoot: "39f0cb17-0d30-41c0-b305-04dd63f546cb" as PermissionKey,

  /**
   * No description available
   */
  ApplicationManagementHystrix: "d65229d7-341b-4986-8f1f-8dfb1673b909" as PermissionKey,

  /**
   * Open list of best practices for Istio
   */
  ConfigurationManagementOpenListOfBestPracticesForIstio: "2af886a2-c2a2-44e9-ba62-ba256c7634b0" as PermissionKey,

  /**
   * Proprietary list of best practices for Istio
   */
  ConfigurationManagementProprietaryListOfBestPracticesForIstio: "46f00b76-06ae-4b5c-9df5-3311e9fc4823" as PermissionKey,

  /**
   * VirtualService
   */
  ConfigurationManagementVirtualservice: "9a84a5d0-0a16-11ee-be56-0242ac120002" as PermissionKey,

  /**
   * DestinationRule
   */
  ConfigurationManagementDestinationrule: "12c5dbca-cdb4-4554-8a71-8c67c118071d" as PermissionKey,

  /**
   * mTLS (PeerAuthentication)
   */
  ConfigurationManagementMtlsPeerauthentication: "2e66a6b3-7ed5-4010-b1d2-f4d7035f0991" as PermissionKey,

  /**
   * Automatic Sidecar Injection on a Namespace
   */
  ConfigurationManagementAutomaticSidecarInjectionOnANamespace: "21bd0f2b-0ab6-4aac-a1aa-e4a02eb66b3c" as PermissionKey,

  /**
   * Sidecars
   */
  ConfigurationManagementSidecars: "34b68c99-8ef9-4542-8c34-bf7587bfa1b0" as PermissionKey,

  /**
   * AuthorizationPolicy
   */
  ConfigurationManagementAuthorizationpolicy: "d2eef103-0a0d-471f-b262-46af4f620826" as PermissionKey,

  /**
   * EnvoyFilters
   */
  ConfigurationManagementEnvoyfilters: "c4b1a799-0ab0-4262-b832-9a3d53cfd185" as PermissionKey,

  /**
   * PeerAuthentication
   */
  ConfigurationManagementPeerauthentication: "b8a9ad4b-1ee2-4460-a8c8-2d55fe47bbfd" as PermissionKey,

  /**
   * Istio Operator
   */
  ConfigurationManagementIstioOperator: "2209d9a6-c93b-4db1-894e-fdaacfcfc2d8" as PermissionKey,

  /**
   * Ingress Gateway (Gateways)
   */
  ConfigurationManagementIngressGatewayGateways: "00b3c489-b923-40e4-aba7-8742aed3c63c" as PermissionKey,

  /**
   * Egress Gateway (Gateways)
   */
  ConfigurationManagementEgressGatewayGateways: "3c22fb24-e768-4000-a6f4-1bf1b9a1aa83" as PermissionKey,

  /**
   * Add-on: Prometheus
   */
  ConfigurationManagementAddOnPrometheus: "a4d06ed9-958d-4a04-8d56-6658ebb9529e" as PermissionKey,

  /**
   * Add-on: Kiali
   */
  ConfigurationManagementAddOnKiali: "bcbc9ee9-cde6-4671-9317-bedd655dde83" as PermissionKey,

  /**
   * Add-on: Grafana
   */
  ConfigurationManagementAddOnGrafana: "d64b7b6b-5931-4b61-85a1-664d62da8ffe" as PermissionKey,

  /**
   * Add-on: Zipkin
   */
  ConfigurationManagementAddOnZipkin: "e1d939c7-de43-4d85-8ad4-eaada093467d" as PermissionKey,

  /**
   * Add-on: Jaeger
   */
  ConfigurationManagementAddOnJaeger: "0054fc37-636d-46d4-b5b9-b0f8c20b777c" as PermissionKey,

  /**
   * Custom Configuration
   */
  ConfigurationManagementCustomConfiguration: "2e32a426-c5a4-4ae3-83f1-1bd53b3adbe4" as PermissionKey,

  /**
   * Ingress
   */
  ConfigurationManagementIngress: "08872df8-e557-4cf2-85ce-1699a5ef5a65" as PermissionKey,

  /**
   * Canary Rollout
   */
  ConfigurationManagementCanaryRollout: "7258df9f-72d1-4491-9f06-a1e5fccbf3a4" as PermissionKey,

  /**
   * No description available
   */
  WorkflowManagementSingleAndMultipleApprovers: "8b8b8eb2-00d5-4501-8c94-529f1b0b0f27" as PermissionKey,

  /**
   * No description available
   */
  BusinessPerformanceShoppingCartBasedRealTimeDiscount: "b1e81301-0726-4d62-a920-c10ee5d563b0" as PermissionKey,

  /**
   * Subscription plan management. Transformation of workflow pricing model.
   */
  BusinessPerformanceServerlessPricing: "15d6ae21-7618-4511-afb8-044b7cd8249d" as PermissionKey,

  /**
   * No description available
   */
  DigitalExperienceManagementFullstoryLikeCapabilities: "08f20461-d2a7-44e4-91bb-e26d06cd4797" as PermissionKey,

  /**
   * No description available
   */
  DigitalExperienceManagementLikePendoTellingUsersWhatTheyAreMissingHowToUseTheProduct: "41239cec-2e8b-48d8-959b-f595f9bcf3ab" as PermissionKey,

  /**
   * No description available
   */
  DigitalExperienceManagementSimple: "fd9752ed-ce05-41b7-953c-e841e2697ae9" as PermissionKey,

  /**
   * No description available
   */
  DigitalExperienceManagementAdvanced: "488d1bf0-44dc-401b-a1c6-dfe0e334891f" as PermissionKey,

  /**
   * Capture and share visual snapshots of your work with ease using our Screenshots feature.
   */
  DigitalExperienceManagementScreenshots: "dfe77e40-9263-4345-9288-4da24f0352ba" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementEventsReportingOfAsynchronousEvents: "2ccbcdf6-5aa0-43f2-b725-80e14003fc0b" as PermissionKey,

  /**
   * Detailed accounting of user activity. Historical record or each action taken.
   */
  IncidentManagementAuditTrail: "27e30849-3184-4dd3-b9c3-17ce256c088e" as PermissionKey,

  /**
   * Dismiss individual; Dismiss bulk.
   */
  IncidentManagementAlertGeneration: "92bb8a04-8eb2-4486-bef9-1895ee6d6364" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementPolicyBased: "41897757-9d14-42df-b21d-aed6f83b2743" as PermissionKey,

  /**
   * Threaded Slack Notifications
   */
  IncidentManagementSlackNotifications: "9f5250ff-c67b-432f-95bc-e2f369f45a47" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementMesheryCloudNative: "d936a286-cc39-4fd2-9b55-ff2179d9e11b" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementIntegrationWGsuite: "3b03ce99-e380-4ee7-888d-adb7c076d4b8" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementIntegrationWMicrosoftOutlook: "83d4bc06-3e41-452f-bdb7-30a542330923" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementDatadog: "c0629e3a-767d-4ad2-9b75-219b08fd970a" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementEventRecording: "6d2799b7-640c-4ae9-8a37-2564077cc525" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementEventReplay: "3449fa41-bd7d-41c1-9533-af11d9eaff72" as PermissionKey,

  /**
   * Visual event replay in Kanvas
   */
  IncidentManagementTrafficReplay: "8f6d3691-e7ce-46fc-9311-b51447c3a54e" as PermissionKey,

  /**
   * No description available
   */
  IncidentManagementComponentLogging: "1a10bf40-e17c-4498-8131-f54268eb870b" as PermissionKey,

  /**
   * No description available
   */
  ChaosManagementLibraryOfExperiments: "599efa8b-0249-465b-8e68-bf65dcd58f72" as PermissionKey,

  /**
   * No description available
   */
  ChaosManagementAsWasmFilters: "6060683b-fe85-4ae4-9cf7-97e6eeab1d4f" as PermissionKey,

  /**
   * No description available
   */
  ChaosManagementAsSidecars: "c9bf2c2b-5095-49ac-9f78-8369e78e69a6" as PermissionKey,

  /**
   * No description available
   */
  ChaosManagementAsDaemonsets: "b73d71ec-f5b2-4d0b-83de-6e2dccff5041" as PermissionKey
} as const;

/**
 * Type representing all valid permission key names.
 */
export type PermissionKeyName = keyof typeof PermissionKeys;

/**
 * Type representing all valid permission key values.
 */
export type PermissionKeyValue = typeof PermissionKeys[PermissionKeyName];

/**
 * Array of all permission keys for iteration.
 */
export const AllPermissionKeys = Object.values(PermissionKeys);

/**
 * Array of all permission key names for iteration.
 */
export const AllPermissionKeyNames = Object.keys(PermissionKeys) as PermissionKeyName[];

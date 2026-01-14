// Package permissions contains auto-generated permission key constants.
// This file is generated from permissions.csv - DO NOT EDIT MANUALLY.
// To regenerate, run: node build/generate-permission-golang.js
package permissions

import "github.com/gofrs/uuid"

// PermissionKey represents a permission key identifier.
type PermissionKey uuid.UUID

// PermissionKeyFromUUID converts a uuid.UUID to PermissionKey.
func PermissionKeyFromUUID(id uuid.UUID) PermissionKey {
	return PermissionKey(id)
}

// UUID returns the underlying uuid.UUID value.
func (p PermissionKey) UUID() uuid.UUID {
	return uuid.UUID(p)
}

// String returns the string representation of the permission key.
func (p PermissionKey) String() string {
	return uuid.UUID(p).String()
}

var (
	// ProfileViewProfile - View your profile.
	ProfileViewProfile = PermissionKey(uuid.Must(uuid.FromString("fa7de118-2d08-4b07-b9d7-3e0baead6d04")))

	// ProfileEditAccount - Update details of your user account.
	ProfileEditAccount = PermissionKey(uuid.Must(uuid.FromString("f5e6bb39-c89a-4172-86f9-14a4a59792c1")))

	// ProfileResetPasword - Perform a password reset for your user account.
	ProfileResetPasword = PermissionKey(uuid.Must(uuid.FromString("ec8a4b2e-8323-4a96-86ef-ec7be8f58ef1")))

	// ProfileDeleteAccount - Delete your user account.
	ProfileDeleteAccount = PermissionKey(uuid.Must(uuid.FromString("bbcb024b-78eb-48b0-8e99-f74d3862fe0f")))

	// ProfileConnectYourGithubAccount - Link your social sign-in with GitHub to your existing user account.
	ProfileConnectYourGithubAccount = PermissionKey(uuid.Must(uuid.FromString("9ea3070a-f2a4-4655-8660-5dba692f3138")))

	// ProfileConnectYourGoogleAccount - Link your social sign-in with Google to your existing user account.
	ProfileConnectYourGoogleAccount = PermissionKey(uuid.Must(uuid.FromString("bab2c574-d4e8-4e1e-a9f8-48c10be66b62")))

	// SubscriptionViewSubcription - List and see details of active and inactive subscriptions.
	SubscriptionViewSubcription = PermissionKey(uuid.Must(uuid.FromString("9098e61d-deaa-43da-960c-1bc3d5a00495")))

	// SubscriptionManageSubcriptions - Create new subscriptions and update existing subscriptions
	SubscriptionManageSubcriptions = PermissionKey(uuid.Must(uuid.FromString("01462c43-dfa8-4a5e-805a-267c9b0ec7ec")))

	// PlansViewPlans - Explore subscription plans and compare their features.
	PlansViewPlans = PermissionKey(uuid.Must(uuid.FromString("1907bd7a-5055-4e9b-98f6-7e8b720af887")))

	// CatalogDeployDesign - Export a copy of a design to your local system.
	CatalogDeployDesign = PermissionKey(uuid.Must(uuid.FromString("7a7d3cad-4cf4-48fa-b69c-e6a5abc97a07")))

	// CatalogShareDesign - Share design with anyone within your organization, and make your design easily accessible to all relevant team members.
	CatalogShareDesign = PermissionKey(uuid.Must(uuid.FromString("d9ae2b08-762f-418f-916f-43de736b53e2")))

	// CatalogCloneDesign - Clone any published design to customise it according to your use cases
	CatalogCloneDesign = PermissionKey(uuid.Must(uuid.FromString("94a12f80-3c45-4a1f-afb2-a68b909d0d7f")))

	// CatalogOpenInPlayground - Opens design in a Kanvas (currently, specifically in the playground.meshery.io Kanvas)
	CatalogOpenInPlayground = PermissionKey(uuid.Must(uuid.FromString("c4d6c676-6e26-4b0c-9fdd-5eea1b780e98")))

	// ApplicationsViewApplications - No description available
	ApplicationsViewApplications = PermissionKey(uuid.Must(uuid.FromString("bfb200b6-0ba9-4783-95d4-eaf1c8fe004c")))

	// DesignsViewDesigns - View all public and published designs of other team members and private of signed-in user
	DesignsViewDesigns = PermissionKey(uuid.Must(uuid.FromString("3798736d-1f5d-41b3-876f-f3f01453dd15")))

	// FiltersViewFilters - View all public and published filters of other team members and private of signed-in user
	FiltersViewFilters = PermissionKey(uuid.Must(uuid.FromString("df41c45f-7c73-49c2-a055-0584fdcec1c1")))

	// CatalogRequestsViewCatalogRequests - View the catalog publication request queue
	CatalogRequestsViewCatalogRequests = PermissionKey(uuid.Must(uuid.FromString("30b68d69-d199-48fd-b4ff-54b5282c5c03")))

	// CatalogRequestsApproveCatalogRequest - Approve catalog publication requests
	CatalogRequestsApproveCatalogRequest = PermissionKey(uuid.Must(uuid.FromString("66fbc8c0-b08a-494b-8c60-68ee1b607176")))

	// CatalogRequestsDenyCatalogRequest - Deny catalog publication requests
	CatalogRequestsDenyCatalogRequest = PermissionKey(uuid.Must(uuid.FromString("b9137717-a20a-44e8-a2f9-94dc3d1a6dcb")))

	// DesignsViewPrivateDesigns - View private designs of the org
	DesignsViewPrivateDesigns = PermissionKey(uuid.Must(uuid.FromString("bedb8e5b-56bf-4caf-9e8b-258d30b9229b")))

	// DesignsViewPublicDesigns - View public designs of the org
	DesignsViewPublicDesigns = PermissionKey(uuid.Must(uuid.FromString("3f7cfb90-4267-4acf-868d-6ca0c24fb774")))

	// DesignsViewPublishedDesigns - View published designs of the org
	DesignsViewPublishedDesigns = PermissionKey(uuid.Must(uuid.FromString("061e6194-d398-4d7e-94be-3a8bbf019b69")))

	// DesignsCreateNewDesign - Create new Meshery design
	DesignsCreateNewDesign = PermissionKey(uuid.Must(uuid.FromString("14bd933e-83b7-464d-9a4d-d8c8eb9682ab")))

	// DesignsImportDesign - Import a design
	DesignsImportDesign = PermissionKey(uuid.Must(uuid.FromString("cc040d21-3160-4a96-8efa-833487a234cd")))

	// DesignsExportDesign - Export a design in source type format (Kubernetes Manifest, Helm Chart, Docker Compose)
	DesignsExportDesign = PermissionKey(uuid.Must(uuid.FromString("9a783f51-3b4a-47a6-a02e-b0db9e78cd85")))

	// DesignsPublishDesign - Publish a design
	DesignsPublishDesign = PermissionKey(uuid.Must(uuid.FromString("9e66bdec-4177-42f9-8cec-d9eb52a12c38")))

	// DesignsUnpublishDesign - Unpublish a design
	DesignsUnpublishDesign = PermissionKey(uuid.Must(uuid.FromString("c1595c90-b85b-4ac7-b921-f08959926db3")))

	// DesignsValidateDesign - Validate a design
	DesignsValidateDesign = PermissionKey(uuid.Must(uuid.FromString("da5339dd-a4bc-4b91-8865-d8a703656516")))

	// DesignsDeployDesign - Deploy a design
	DesignsDeployDesign = PermissionKey(uuid.Must(uuid.FromString("595b921a-ea1e-4611-83f0-503db0eeb94d")))

	// DesignsUndeployDesign - Retract all resources used in a Meshery design from the cluster
	DesignsUndeployDesign = PermissionKey(uuid.Must(uuid.FromString("16b11ffa-7b92-4666-a0ff-191df9cd18b2")))

	// DesignsDetailsOfDesign - Set design information or details of a design
	DesignsDetailsOfDesign = PermissionKey(uuid.Must(uuid.FromString("10a03036-53a0-40b3-9f69-6daab852e434")))

	// DesignsEditDesign - Edit a design
	DesignsEditDesign = PermissionKey(uuid.Must(uuid.FromString("7f2b7084-4533-4824-b688-50cf35de7ef8")))

	// DesignsDeleteADesign - Delete a design
	DesignsDeleteADesign = PermissionKey(uuid.Must(uuid.FromString("f024fcf7-3c3d-4521-b83e-6d659353ca0e")))

	// DesignsDownloadADesign - Download a Meshery design in OCI or YAML format
	DesignsDownloadADesign = PermissionKey(uuid.Must(uuid.FromString("64de96b7-60db-4aab-b311-afc64066b2c4")))

	// FiltersImportFilter - Import a filter
	FiltersImportFilter = PermissionKey(uuid.Must(uuid.FromString("cb79d7fb-19de-45fa-aaf5-0a0afc832bf8")))

	// FiltersPublishWasmFilter - Publish WASM Filter
	FiltersPublishWasmFilter = PermissionKey(uuid.Must(uuid.FromString("173d99b7-3820-4c0c-88b2-a8455bd7a6b5")))

	// FiltersUnpublishWasmFilter - Unpublish WASM Filter
	FiltersUnpublishWasmFilter = PermissionKey(uuid.Must(uuid.FromString("773f0a4d-ba04-40ed-9298-59ac8749804a")))

	// FiltersDownloadAWasmFilter - Download a WASM filter
	FiltersDownloadAWasmFilter = PermissionKey(uuid.Must(uuid.FromString("24325b2c-5e08-4ba8-809f-8a4a1bf91084")))

	// FiltersDetailsOfWasmFilter - Check information or details of a WASM filter
	FiltersDetailsOfWasmFilter = PermissionKey(uuid.Must(uuid.FromString("86c457b5-b9ec-4223-af1f-30a5be67d69d")))

	// FiltersEditWasmFilter - Edit WASM filter
	FiltersEditWasmFilter = PermissionKey(uuid.Must(uuid.FromString("88cd144e-806e-472a-a31a-ef6d64643291")))

	// FiltersCloneWasmFilter - Clone WASM filter from catalog, which allows customizing filter and use it in design
	FiltersCloneWasmFilter = PermissionKey(uuid.Must(uuid.FromString("c84718ca-7479-4ad9-a2b7-a5784baa51fb")))

	// FiltersDeleteWasmFilter - Delete WASM filter permanently from catalog.
	FiltersDeleteWasmFilter = PermissionKey(uuid.Must(uuid.FromString("9225d5a7-7255-49be-9233-daeabefae306")))

	// FiltersWasmFilterAndFilter - Import, Unpublish, Publish, Download, Edit, Clone, Delete, Details of WASM Filter
	FiltersWasmFilterAndFilter = PermissionKey(uuid.Must(uuid.FromString("9225d5a7-7255-49be-9233-daeabefae306")))

	// CollaboratorsForPublicDesignsInviteAnyMesheryCloudUserOrAllMesheryUsers - Invite any Meshery Cloud user, or all Meshery users, to work with you on a public design that control – including making changes and releasing new versions.
	CollaboratorsForPublicDesignsInviteAnyMesheryCloudUserOrAllMesheryUsers = PermissionKey(uuid.Must(uuid.FromString("ccc4bc8d-f484-42b3-8a62-2667284605c3")))

	// CollaboratorsForPrivateDesignsInviteAnyMesheryCloudUserToOnAPrivateDesign - Invite any Meshery Cloud user to work with you on a private design that control – including making changes and releasing new versions.
	CollaboratorsForPrivateDesignsInviteAnyMesheryCloudUserToOnAPrivateDesign = PermissionKey(uuid.Must(uuid.FromString("e28b851f-9a49-4ecf-a86e-493db1a27540")))

	// TeamChatMessageInRealTime - Message in real-time, unattached to a specific design. Control who can pariticpate in the discussion.
	TeamChatMessageInRealTime = PermissionKey(uuid.Must(uuid.FromString("c42d08b2-c3e0-47b6-9e47-cfb149c0a5af")))

	// DesignReviewsDiscussAnyDesignByLeavingReviewComments - Discuss any design by leaving review comments or notes on a specific design. Control who has access, notify discussion participants with updates, and link from anywhere.
	DesignReviewsDiscussAnyDesignByLeavingReviewComments = PermissionKey(uuid.Must(uuid.FromString("da5adf96-9fb5-49b2-a55e-dec9c9c4acba")))

	// OrganizationAndTeamManagementManageAccessToDesigns - Manage access to designs on a team-by-team, or individual user, basis.
	OrganizationAndTeamManagementManageAccessToDesigns = PermissionKey(uuid.Must(uuid.FromString("7a17c8d3-bba2-474b-bb1e-be5b5eee5dad")))

	// CollaborativeDesignCreateAndCollaborateInOnlineDesignsInRealTime - Create and collaborate in online designs in real-time.
	CollaborativeDesignCreateAndCollaborateInOnlineDesignsInRealTime = PermissionKey(uuid.Must(uuid.FromString("d5267c04-b3ee-43fe-8b97-2a3321eb7f8e")))

	// BestPracticesIstioVirtualServiceDestinationRules - No description available
	BestPracticesIstioVirtualServiceDestinationRules = PermissionKey(uuid.Must(uuid.FromString("81e90a7a-fac7-40d1-bf7d-e8250d36fe5d")))

	// BestPracticesConsul - No description available
	BestPracticesConsul = PermissionKey(uuid.Must(uuid.FromString("bb345c3a-22f0-4377-8f55-8f6ebef5524d")))

	// BestPracticesKuma - No description available
	BestPracticesKuma = PermissionKey(uuid.Must(uuid.FromString("425d0113-0363-48fb-9698-4f392a4b7b48")))

	// StatisticsViewStatistics - No description available
	StatisticsViewStatistics = PermissionKey(uuid.Must(uuid.FromString("d5fd3a6f-23a6-429c-b9b3-7ffa75d3f381")))

	// EventsViewEvents - No description available
	EventsViewEvents = PermissionKey(uuid.Must(uuid.FromString("4fe3e6b9-3363-4e9d-bfd4-9cd5bd168e5a")))

	// SummaryViewSummary - No description available
	SummaryViewSummary = PermissionKey(uuid.Must(uuid.FromString("82c04345-f7ba-4696-bddd-da7bd0046f38")))

	// AuditViewAudit - No description available
	AuditViewAudit = PermissionKey(uuid.Must(uuid.FromString("80bb9c66-0657-49ff-a064-667e9875bb3f")))

	// FrameworkDynamicInjectionViaRemoteProvider - No description available
	FrameworkDynamicInjectionViaRemoteProvider = PermissionKey(uuid.Must(uuid.FromString("aee2b910-ab6b-4af5-b405-38fdbe11790d")))

	// RestApiNamespacedCustomEndpoints - No description available
	RestApiNamespacedCustomEndpoints = PermissionKey(uuid.Must(uuid.FromString("ee6562f9-eb5e-4978-9239-fc1ac18a06a2")))

	// RestApiSwaggerIntegration - No description available
	RestApiSwaggerIntegration = PermissionKey(uuid.Must(uuid.FromString("045f4c47-95d7-4ee7-923e-b069faa75640")))

	// GraphqlApiNamespacedCustomResolvers - No description available
	GraphqlApiNamespacedCustomResolvers = PermissionKey(uuid.Must(uuid.FromString("192cd281-234a-4127-b8a8-3e6f10d9e730")))

	// ExtensionPointAdapters - Extend Meshery's capabilities behind a gRPC interface for Model registration and operation invocation
	ExtensionPointAdapters = PermissionKey(uuid.Must(uuid.FromString("65150884-c617-4aa4-bb0f-09dd0532bb83")))

	// ExtensionPointLoadGenerators - No description available
	ExtensionPointLoadGenerators = PermissionKey(uuid.Must(uuid.FromString("d63d7908-0699-4548-8493-bc3cb1b32699")))

	// ExtensionPointAuthentication - No description available
	ExtensionPointAuthentication = PermissionKey(uuid.Must(uuid.FromString("3073abac-9b60-4c9e-b8af-0bc3adeeb5a5")))

	// ExtensionPointAuthorization - No description available
	ExtensionPointAuthorization = PermissionKey(uuid.Must(uuid.FromString("e750108f-7659-48a8-8b24-a811f1852819")))

	// ExtensionPointRemoteProviders - No description available
	ExtensionPointRemoteProviders = PermissionKey(uuid.Must(uuid.FromString("be4505ae-b83e-479f-81f7-8f59eeae251d")))

	// ExtensionPointUserPreferences - No description available
	ExtensionPointUserPreferences = PermissionKey(uuid.Must(uuid.FromString("39da55c3-68eb-4510-a115-bff559e648ef")))

	// ExtensionPointPeerToPeer - Propagate document updates peer-to-peer using WebRTC.
	ExtensionPointPeerToPeer = PermissionKey(uuid.Must(uuid.FromString("66f311bf-6b7e-41ee-bab6-5e671dd2f0e6")))

	// ExtensionsInstallExtension - Install or enable or disabble extensions in Meshery
	ExtensionsInstallExtension = PermissionKey(uuid.Must(uuid.FromString("24f41e98-7ce1-40c4-a82d-4ae0294d237d")))

	// ExtensionsViewMesheryUserPreferences - View all user preferences in Meshery UI
	ExtensionsViewMesheryUserPreferences = PermissionKey(uuid.Must(uuid.FromString("cdec6212-bbbf-4cab-b10d-76d12bee7e56")))

	// ExtensionsViewExtensions - View all extensions on the extension page
	ExtensionsViewExtensions = PermissionKey(uuid.Must(uuid.FromString("c1330df4-1bbe-4d5d-8828-f4bd9ee989e5")))

	// AccountingShowback - No description available
	AccountingShowback = PermissionKey(uuid.Must(uuid.FromString("f1a4d8b0-a4f0-413f-83be-9f7fb9e48a08")))

	// BillingChargeback - Per service, per authenticated user
	BillingChargeback = PermissionKey(uuid.Must(uuid.FromString("3a1c684a-dbde-4833-b592-e64f9c35a50e")))

	// ReviewSnapshots - Visual insights in your pull requests in GitLab
	ReviewSnapshots = PermissionKey(uuid.Must(uuid.FromString("81287ea7-5e3f-480c-8b2e-211d62d08797")))

	// PipelineBitbucket - Initiate deployment with creation of pull request
	PipelineBitbucket = PermissionKey(uuid.Must(uuid.FromString("9f236c99-b2ec-4474-9ec8-7c3f8a09e63e")))

	// PipelineGithub - Initiate deployment with creation of pull request
	PipelineGithub = PermissionKey(uuid.Must(uuid.FromString("9f236c99-b2ec-4474-9ec8-7c3f8a09e63e")))

	// PipelineGitlab - Initiate deployment with creation of pull request
	PipelineGitlab = PermissionKey(uuid.Must(uuid.FromString("9f236c99-b2ec-4474-9ec8-7c3f8a09e63e")))

	// PipelineArgoevents - Initiate deployment with creation of pull request
	PipelineArgoevents = PermissionKey(uuid.Must(uuid.FromString("81287ea7-5e3f-480c-8b2e-211d62d08797")))

	// PipelineWebhook - Signal pass or fail: to proceed or rollback a deployment
	PipelineWebhook = PermissionKey(uuid.Must(uuid.FromString("b2b183bd-9aff-469e-9c65-8027b75999aa")))

	// PipelineAssessAndCharacterizeServicePerformance - Signal pass or fail: to proceed or rollback a deployment
	PipelineAssessAndCharacterizeServicePerformance = PermissionKey(uuid.Must(uuid.FromString("b869fa3d-bace-4e7a-9403-99e0b280ed56")))

	// SmiConformanceVerifyConformanceReturnResultsAndGreenRedLight - No description available
	SmiConformanceVerifyConformanceReturnResultsAndGreenRedLight = PermissionKey(uuid.Must(uuid.FromString("995e6bbd-1015-4213-a859-14e983e42e7b")))

	// SingleUserImplicitUserImplicitRoleAdmin - No description available
	SingleUserImplicitUserImplicitRoleAdmin = PermissionKey(uuid.Must(uuid.FromString("d5591874-986c-471f-8631-0b0d87989b41")))

	// MultipleUsersMultiTenancy - No description available
	MultipleUsersMultiTenancy = PermissionKey(uuid.Must(uuid.FromString("18771b5f-6550-4ef2-ab95-cc7a93a12d16")))

	// IndividualUserPreferencesAllowsPreferencesToBeSetPerUser - No description available
	IndividualUserPreferencesAllowsPreferencesToBeSetPerUser = PermissionKey(uuid.Must(uuid.FromString("9032e8f8-414e-462c-afa9-81c4e45f3eec")))

	// BuiltInRolesBuiltInRoles - Static - out of the box
	BuiltInRolesBuiltInRoles = PermissionKey(uuid.Must(uuid.FromString("99d7881c-ca1a-41f9-9c0a-fd36a619a110")))

	// UserDefinedRolesUserDefinedRoles - Customizable roles for specific permission assignments
	UserDefinedRolesUserDefinedRoles = PermissionKey(uuid.Must(uuid.FromString("4b46c866-0d9e-43e6-8810-b0f8df9d0f8c")))

	// MultipleOrganizationsEnforcementOfTenancy - No description available
	MultipleOrganizationsEnforcementOfTenancy = PermissionKey(uuid.Must(uuid.FromString("6a31b997-9162-4022-87ae-c031bfba53d5")))

	// MultipleOrganizationsHierarchicalPermissioning - No description available
	MultipleOrganizationsHierarchicalPermissioning = PermissionKey(uuid.Must(uuid.FromString("36372d4f-5aea-4c2e-9938-59d7534bfc1b")))

	// AuthenticationAuthenticationOauth - No description available
	AuthenticationAuthenticationOauth = PermissionKey(uuid.Must(uuid.FromString("db96233e-047b-4e2f-b4e3-419c038e4b26")))

	// AuthenticationLdapAuthenticationLdap - Access Meshery Server using your existing accounts and centrally manage repository access.
	AuthenticationLdapAuthenticationLdap = PermissionKey(uuid.Must(uuid.FromString("4d7cccf0-1831-4814-a5eb-2358b99c2870")))

	// AuthenticationSamlAuthenticationSaml - Use an identity provider to manage the identities of GitHub users and applications.
	AuthenticationSamlAuthenticationSaml = PermissionKey(uuid.Must(uuid.FromString("59a839ba-277c-4e69-a559-2659a355bfa5")))

	// AuthenticationAzureActiveDirectory - No description available
	AuthenticationAzureActiveDirectory = PermissionKey(uuid.Must(uuid.FromString("e013aebc-b245-451d-a330-423f629fa072")))

	// AuthorizationMesheryAsAnIdp - Own and control the user accounts of your enterprise members through your identity provider (IdP).
	AuthorizationMesheryAsAnIdp = PermissionKey(uuid.Must(uuid.FromString("0b3313eb-5c77-4dba-9074-122cfb01bf55")))

	// UsersViewUserPublicProfile - See public user profile details, public activities and public resources. 
	UsersViewUserPublicProfile = PermissionKey(uuid.Must(uuid.FromString("daded1e9-ff0f-4259-86ac-e168fd5565d4")))

	// UsersViewUserSettings - See private user profile details, private activities and private resources. 
	UsersViewUserSettings = PermissionKey(uuid.Must(uuid.FromString("e00cae57-6dc6-41ac-b174-f3b01b4adce0")))

	// UsersViewAllUsers - See all teams within an organization. See all members of all teams.
	UsersViewAllUsers = PermissionKey(uuid.Must(uuid.FromString("382da488-9a92-4a5b-958d-c4bfe1e80253")))

	// UsersUpdateUserProfile - Directly create a new user account within a team.
	UsersUpdateUserProfile = PermissionKey(uuid.Must(uuid.FromString("b9a86a74-d6e9-46e4-abae-fe5235ba0e26")))

	// UsersInviteUserToTeam - Send a request for a user to join a team.
	UsersInviteUserToTeam = PermissionKey(uuid.Must(uuid.FromString("d3478829-9281-468e-9d49-f7aa659d0f89")))

	// UsersRemoveUserFromTeam - Discontinue user membership of a team and team resources.
	UsersRemoveUserFromTeam = PermissionKey(uuid.Must(uuid.FromString("8b41825f-e840-42bf-81a8-2f962a6d134b")))

	// UsersCreateTeam - Establish new team for organizing groups of users and resource access.
	UsersCreateTeam = PermissionKey(uuid.Must(uuid.FromString("8608355a-bf35-4bd6-b339-2384d34ae2ed")))

	// UsersDeleteTeam - Dissolve a team and all user memberships. Leave associated resources intact.
	UsersDeleteTeam = PermissionKey(uuid.Must(uuid.FromString("44ce4333-a138-42a3-9695-c6c1fcd2c301")))

	// UsersDeleteUser - Delete a user account
	UsersDeleteUser = PermissionKey(uuid.Must(uuid.FromString("8e077f96-c957-478f-aae1-0e96232dc3e7")))

	// UsersEditUser - Edit user role, name, email etc
	UsersEditUser = PermissionKey(uuid.Must(uuid.FromString("eb4dff91-a7c6-4167-aa2d-2e81539e6b62")))

	// UsersCreateUser - Create a new user
	UsersCreateUser = PermissionKey(uuid.Must(uuid.FromString("032582e1-c406-4c75-8732-4f2ada0191b3")))

	// UsersLeaveTeam - Leave a team
	UsersLeaveTeam = PermissionKey(uuid.Must(uuid.FromString("680b9fcb-6d8d-448d-8012-4b792d71c52e")))

	// UsersViewAllKubernetesClusters - View all configured Kubernetes clusters
	UsersViewAllKubernetesClusters = PermissionKey(uuid.Must(uuid.FromString("b99a9a0a-2cb9-4be7-8251-14a249e4038e")))

	// TeamsViewTeam - See only teams to which you are a member. See all other members within those teams.
	TeamsViewTeam = PermissionKey(uuid.Must(uuid.FromString("27447fb0-be46-4497-8366-c34e24920f22")))

	// TeamsViewTeams - See all teams of which you are an administrator. See all members of those teams.
	TeamsViewTeams = PermissionKey(uuid.Must(uuid.FromString("6ecbbe79-c392-43bd-b7b6-ecdec019e24c")))

	// TeamsViewAllTeams - See all teams within an organization. See all members of all teams.
	TeamsViewAllTeams = PermissionKey(uuid.Must(uuid.FromString("8b94dd6b-234f-4c89-86cf-b029e0090255")))

	// TeamsAddUserToTeam - Directly create a new user account within a team.
	TeamsAddUserToTeam = PermissionKey(uuid.Must(uuid.FromString("88b9a857-d012-4c6d-a129-4ce65b63b018")))

	// TeamsInviteUserToTeam - Send a request for a user to join a team.
	TeamsInviteUserToTeam = PermissionKey(uuid.Must(uuid.FromString("f224ecf3-b105-4d81-9886-77127073a6ca")))

	// TeamsRemoveUserFromTeam - Discontinue user membership of a team and team resources.
	TeamsRemoveUserFromTeam = PermissionKey(uuid.Must(uuid.FromString("e996c998-a50f-4cb8-ae7b-77127073a6ca")))

	// TeamsCreateTeam - Establish new team for organizing groups of users and resource access.
	TeamsCreateTeam = PermissionKey(uuid.Must(uuid.FromString("41a9eb36-b99b-4715-8140-780f97d3c6a0")))

	// TeamsDeleteTeam - Dissolve a team and all user memberships. Leave associated resources intact.
	TeamsDeleteTeam = PermissionKey(uuid.Must(uuid.FromString("bbb691b6-8664-44c7-8ea7-9c46b1ca1e8b")))

	// TeamsEditTeam - Edit a team and add new members to it.
	TeamsEditTeam = PermissionKey(uuid.Must(uuid.FromString("6cf69881-0be0-4723-b5f0-031b7847509a")))

	// TeamsRemoveRolesFromTeamMembers - Remove roles from users in a team.
	TeamsRemoveRolesFromTeamMembers = PermissionKey(uuid.Must(uuid.FromString("ed3dbd2d-52f8-4608-87e0-7f2999a4518c")))

	// TeamsAssignRolesToTeamMembers - Assign roles to users in a team
	TeamsAssignRolesToTeamMembers = PermissionKey(uuid.Must(uuid.FromString("06f33eca-950c-4daa-b46d-e73af39e0868")))

	// TeamsOpenTeamInvite - This governs the team's invitation permissions, determining whether the team is allowed to extend invitations to new individuals to join through open invite link.
	TeamsOpenTeamInvite = PermissionKey(uuid.Must(uuid.FromString("6086c0a5-cd79-48ca-8c9f-a0e0ad75343c")))

	// OrganizationsCreateOrganization - Establish new organization for organizing teams, users, and resource access.
	OrganizationsCreateOrganization = PermissionKey(uuid.Must(uuid.FromString("17a6fa82-cdab-46db-a7ce-a9d0a1bbf40f")))

	// OrganizationsEditOrganization - Edit organiaztions and add teams to it
	OrganizationsEditOrganization = PermissionKey(uuid.Must(uuid.FromString("d39a34fb-0ccf-4c80-8a6c-b545c8db869a")))

	// OrganizationsAddUserToOrganization - Directly create a new user account within an organization.
	OrganizationsAddUserToOrganization = PermissionKey(uuid.Must(uuid.FromString("33bf7a57-f787-4208-b01c-ad9b9d9c6b6c")))

	// OrganizationsInviteUserToOrganization - Send a request for a user to join an organization.
	OrganizationsInviteUserToOrganization = PermissionKey(uuid.Must(uuid.FromString("c8489026-11ab-4753-a445-8e20fc032c38")))

	// OrganizationsRemoveUserFromOrganization - Discontinue user access to organization, teams and resources; cease billing accrual.
	OrganizationsRemoveUserFromOrganization = PermissionKey(uuid.Must(uuid.FromString("3ed858e4-418d-4220-9d4c-a217fd466d86")))

	// OrganizationsPromoteOrDemoteUserToOrgAdmin - Elevate or remove organization level administrative privileges.
	OrganizationsPromoteOrDemoteUserToOrgAdmin = PermissionKey(uuid.Must(uuid.FromString("0ddd82df-27ed-4781-a91a-ec1dbeb620d0")))

	// OrganizationsViewOrg - See only organizations to which you are a member. See all other members within your membership teams.
	OrganizationsViewOrg = PermissionKey(uuid.Must(uuid.FromString("49f02947-0c8d-4b2d-af53-f50ce18f8861")))

	// OrganizationsViewOrganizations - See all organizations of which you are an administrator. See all members of those organizations.
	OrganizationsViewOrganizations = PermissionKey(uuid.Must(uuid.FromString("172fa7d3-0d8a-4646-a789-bf64f52ba40b")))

	// OrganizationsViewAllOrganizations - See all organizations within a Layer5 Cloud deployment. See all organizations, teams, and users.
	OrganizationsViewAllOrganizations = PermissionKey(uuid.Must(uuid.FromString("e996c998-a50f-4cb8-ae7b-f2f1b523c971")))

	// OrganizationsRemoveRolesFromOrganizationMembers - Remove roles from users in an organization
	OrganizationsRemoveRolesFromOrganizationMembers = PermissionKey(uuid.Must(uuid.FromString("8a003a11-a909-425a-bd23-d8ba14972c89")))

	// OrganizationsAssignRolesToOrganizationMembers - Assign roles to users in an organization
	OrganizationsAssignRolesToOrganizationMembers = PermissionKey(uuid.Must(uuid.FromString("0d455711-6205-422b-9de7-05933fe2aeb2")))

	// OrganizationsTransferOrganizationOwnership - Transfer organization ownership to another member of the organization.
	OrganizationsTransferOrganizationOwnership = PermissionKey(uuid.Must(uuid.FromString("c81764a3-9fb1-451e-8e80-693cba6f79bf")))

	// OrganizationsDeleteOrganization - Decommission organization and suspend account from additional accruals.
	OrganizationsDeleteOrganization = PermissionKey(uuid.Must(uuid.FromString("b3dc083c-fe8e-43a9-9bcd-ed93d4584f55")))

	// OrganizationsLeaveOrganization - Leave an organization
	OrganizationsLeaveOrganization = PermissionKey(uuid.Must(uuid.FromString("b249fb5f-bdae-4008-8aa6-862f9d911656")))

	// OrganizationCustomDomain - Organizations can be assigned unique, validated custom domains through settings.
	OrganizationCustomDomain = PermissionKey(uuid.Must(uuid.FromString("0c9da04b-9b9a-4b97-8c5d-3137df5d684f")))

	// OrganizationDomainRoutingAndRemoval - Assigned domains direct user traffic to organizations; clearing the field removes the assignment.
	OrganizationDomainRoutingAndRemoval = PermissionKey(uuid.Must(uuid.FromString("88fc2f27-f9b2-42c8-99b5-e36389398796")))

	// OrganizationManageRecognitions - Create, update , delete and manage recogntions awarded by your organization
	OrganizationManageRecognitions = PermissionKey(uuid.Must(uuid.FromString("0a887b7f-b6c2-4a33-b080-bec9c3894d0c")))

	// OrganizationManageInvitations - Create, update , delete and manage invitations to your organization
	OrganizationManageInvitations = PermissionKey(uuid.Must(uuid.FromString("0204fb47-b120-4074-83db-984d595d9f69")))

	// RolesRoles - No description available
	RolesRoles = PermissionKey(uuid.Must(uuid.FromString("9a84a5d0-0a16-11ee-be56-0242ac120002")))

	// RolesAssignUserRoles - No description available
	RolesAssignUserRoles = PermissionKey(uuid.Must(uuid.FromString("9a84a76a-0a16-11ee-be56-0242ac120002")))

	// RolesAssignKeychainsToRoles - No description available
	RolesAssignKeychainsToRoles = PermissionKey(uuid.Must(uuid.FromString("9a84abb6-0a16-11ee-be56-0242ac120002")))

	// RolesCreateCustomRoles - No description available
	RolesCreateCustomRoles = PermissionKey(uuid.Must(uuid.FromString("9a84ad00-0a16-11ee-be56-0242ac120002")))

	// RolesUpdateCustomRoles - No description available
	RolesUpdateCustomRoles = PermissionKey(uuid.Must(uuid.FromString("9a84ad07-0a16-11ee-be56-0242ac120002")))

	// RolesDeleteCustomRoles - Delete a user's role permanently
	RolesDeleteCustomRoles = PermissionKey(uuid.Must(uuid.FromString("19b3b3a3-7dc9-4e2f-b984-69241ec90fc8")))

	// RolesExportCustomRoles - No description available
	RolesExportCustomRoles = PermissionKey(uuid.Must(uuid.FromString("9274af31-5166-4876-ab44-27f458c5082c")))

	// AccessRequestsViewAllAccessRequests - Browse the list of open entitlement requests
	AccessRequestsViewAllAccessRequests = PermissionKey(uuid.Must(uuid.FromString("070153eb-6dd5-4aad-95b4-fb0444c88a89")))

	// AccessRequestsAcceptAccessRequest - Entitle user. Approve access request.
	AccessRequestsAcceptAccessRequest = PermissionKey(uuid.Must(uuid.FromString("afded44a-8b17-4d4d-bfc3-a76eadcc37fe")))

	// AccessRequestsDenyAccessRequest - Restrict user access to requested resource.
	AccessRequestsDenyAccessRequest = PermissionKey(uuid.Must(uuid.FromString("f25bea25-a33b-40e9-9621-bbc30888c11b")))

	// DryRunDryRun - Test and verify configuration changes in a separate environment.
	DryRunDryRun = PermissionKey(uuid.Must(uuid.FromString("161c2b67-ce61-4b4d-b47e-38fcd2e87b13")))

	// ConfigureAndDeployAnyServiceMeshMesheryAdaptersProvisionConfigureAndManage10DifferentServiceMeshes - Istio, Linkerd, Consul, Kuma, Traefik Mesh, AWS App Mesh, NGINX Service Mesh, Network Service Mesh, Cilium Service Mesh, VMware Tanzu Service Mesh
	ConfigureAndDeployAnyServiceMeshMesheryAdaptersProvisionConfigureAndManage10DifferentServiceMeshes = PermissionKey(uuid.Must(uuid.FromString("9cbc1827-7650-4e5b-8259-0823fd11ba9d")))

	// OperationsProvisioningDeprovisioning - No description available
	OperationsProvisioningDeprovisioning = PermissionKey(uuid.Must(uuid.FromString("ad2af8de-e4e6-4e4d-98e0-014220658e23")))

	// OperationsSimpleConfiguration - MeshOpsv1
	OperationsSimpleConfiguration = PermissionKey(uuid.Must(uuid.FromString("89bab590-3f0c-44aa-a8f1-04ebb877e506")))

	// OperationsAdvancedConfiguration - MeshOpsv2
	OperationsAdvancedConfiguration = PermissionKey(uuid.Must(uuid.FromString("dd6d980c-23f2-4245-9f07-551de833c39a")))

	// OperationsManagedUpgrades - No description available
	OperationsManagedUpgrades = PermissionKey(uuid.Must(uuid.FromString("7e0fe9a7-aae0-409a-9eec-08dc2ff2af21")))

	// SidecarAdHocAddOrRemove - No description available
	SidecarAdHocAddOrRemove = PermissionKey(uuid.Must(uuid.FromString("2399ea30-118d-4495-93b9-c53c961b5cb7")))

	// SidecarParseLogs - No description available
	SidecarParseLogs = PermissionKey(uuid.Must(uuid.FromString("1e927029-59db-4ede-88fc-ec0cb2756a79")))

	// SidecarExecShell - No description available
	SidecarExecShell = PermissionKey(uuid.Must(uuid.FromString("e0c5f744-13e1-4bd2-bdb2-83f90581fdc2")))

	// FilterDynamicLoadUnload - No description available
	FilterDynamicLoadUnload = PermissionKey(uuid.Must(uuid.FromString("4d4b7c26-4378-4e14-9741-edeb46789a71")))

	// ClusterDiscoveryClusterDiscovery - Day 2 support for ongoing synchronization of Kubernetes configuration, workloads and service mesh changes.
	ClusterDiscoveryClusterDiscovery = PermissionKey(uuid.Must(uuid.FromString("64a36679-68b2-4328-bb1c-7c577ef5267a")))

	// MultipleKubernetesClustersMultipleKubernetesClusters - Ongoing synchronization of Kubernetes configuration, workloads and service mesh changes across any number of Kubernetes clusters.
	MultipleKubernetesClustersMultipleKubernetesClusters = PermissionKey(uuid.Must(uuid.FromString("53c2c0e8-2403-475b-9ffc-0dd501bef8f6")))

	// MeshFederationEnvironments - No description available
	MeshFederationEnvironments = PermissionKey(uuid.Must(uuid.FromString("7953c71b-22a2-4b12-bead-8b3bf54ef3c6")))

	// ServiceCatalogFederationAnnouncementAndSynchronization - No description available
	ServiceCatalogFederationAnnouncementAndSynchronization = PermissionKey(uuid.Must(uuid.FromString("f59af5fd-b571-46f0-b8d1-09194434a38e")))

	// ServiceCatalogFederationOrganizationalPermissioning - No description available
	ServiceCatalogFederationOrganizationalPermissioning = PermissionKey(uuid.Must(uuid.FromString("0ad304a3-973e-4855-aaed-f445870bbb35")))

	// ConnectionsAddCluster - Add Kubernetes cluster
	ConnectionsAddCluster = PermissionKey(uuid.Must(uuid.FromString("fce15b20-78ac-42af-b79c-b8f19bdb0802")))

	// ConnectionsChangeConnectionState - Change connection state
	ConnectionsChangeConnectionState = PermissionKey(uuid.Must(uuid.FromString("14ac9622-3170-4580-8403-ed7a584f90ef")))

	// ConnectionsFlushMeshsyncData - Clearing the database by clicking on the `Flush MeshSync`
	ConnectionsFlushMeshsyncData = PermissionKey(uuid.Must(uuid.FromString("8dd4c54a-bccd-4fb3-a18c-269195653a91")))

	// ConnectionsRegisterDiscoveredMeshsyncResource - Register discovered Meshsync resource to change state to connection
	ConnectionsRegisterDiscoveredMeshsyncResource = PermissionKey(uuid.Must(uuid.FromString("214ad6b1-df4d-44a6-8872-8ad1f751ef68")))

	// ConnectionsDeleteAConnection - Delete a connection
	ConnectionsDeleteAConnection = PermissionKey(uuid.Must(uuid.FromString("61afb8c2-cda6-4175-aad9-74ff87fed323")))

	// BuildReleaseStreamlinedCi - No description available
	BuildReleaseStreamlinedCi = PermissionKey(uuid.Must(uuid.FromString("ff2ea71f-2e28-4b21-89ef-352c509b1247")))

	// BuildReleaseIntegrationTests - No description available
	BuildReleaseIntegrationTests = PermissionKey(uuid.Must(uuid.FromString("1852b847-4906-442a-9887-76bdedfcc4da")))

	// BuildReleaseReleaseChannelsStableAndEdge - No description available
	BuildReleaseReleaseChannelsStableAndEdge = PermissionKey(uuid.Must(uuid.FromString("f17bb4cc-8d99-4443-858b-201cb9d77be8")))

	// ConfigurationWizardTimeToValueEasySetupOfMeshery - No description available
	ConfigurationWizardTimeToValueEasySetupOfMeshery = PermissionKey(uuid.Must(uuid.FromString("f75ee33b-914f-4d80-bfe4-da83764cb45d")))

	// PlatformSupportMesheryctl - Windows, Linux, MacOS
	PlatformSupportMesheryctl = PermissionKey(uuid.Must(uuid.FromString("a80495bb-1c2d-4b93-bffe-2ee5720fba90")))

	// PlatformSupportMesheryServer - Minikube, Docker, OpenShift
	PlatformSupportMesheryServer = PermissionKey(uuid.Must(uuid.FromString("f1399331-15ac-495a-b315-2afa5027288c")))

	// ServiceMeshDiscoveryMeshsync - No description available
	ServiceMeshDiscoveryMeshsync = PermissionKey(uuid.Must(uuid.FromString("424abe7b-c0e3-4a0d-88cb-44114ae5a465")))

	// PackageManagersScriptHomebrewScoop - No description available
	PackageManagersScriptHomebrewScoop = PermissionKey(uuid.Must(uuid.FromString("b850d27a-bcca-4400-b656-7ccac8f94bc4")))

	// ErrorReportingFacilitateCollectionOfDebugForEaseOfIssueReporting - No description available
	ErrorReportingFacilitateCollectionOfDebugForEaseOfIssueReporting = PermissionKey(uuid.Must(uuid.FromString("eac85b45-2aef-4297-b1f4-286d8f5fb7ce")))

	// UpgradesEachComponent - No description available
	UpgradesEachComponent = PermissionKey(uuid.Must(uuid.FromString("e9ed93eb-1c43-4aba-869f-ca780d491071")))

	// MesheryctlCli - Seamlessly manage your configurations, deployments, and interactions through our intuitive and powerful command-line interface: mesheryctl
	MesheryctlCli = PermissionKey(uuid.Must(uuid.FromString("55d44b27-10e2-4f23-a7c5-eefce75cfd69")))

	// SettingsViewSettings - View settings in Meshery
	SettingsViewSettings = PermissionKey(uuid.Must(uuid.FromString("fdc038e3-1fdf-403a-af8a-53c0de8d7820")))

	// SettingsConnectAdapter - Configure and connect to Meshery adapters
	SettingsConnectAdapter = PermissionKey(uuid.Must(uuid.FromString("c93bd211-1dac-42cc-9086-859288826d1b")))

	// SettingsConnectMetrics - Configure and connect to metrics like Grafana and Promethues
	SettingsConnectMetrics = PermissionKey(uuid.Must(uuid.FromString("b0aee906-c549-445f-be0c-b98b04d47d09")))

	// SettingsViewMetrics - View already configured metrics
	SettingsViewMetrics = PermissionKey(uuid.Must(uuid.FromString("7fe36f60-fd0a-4fda-84e5-c64a04c3ad06")))

	// SettingsViewRegistry - Explore entities within capabilities registry
	SettingsViewRegistry = PermissionKey(uuid.Must(uuid.FromString("cc069117-08cc-44e3-9c61-ae0eeca0bcf1")))

	// SettingsResetDatabase - Reset Meshery database
	SettingsResetDatabase = PermissionKey(uuid.Must(uuid.FromString("84fc402c-f33e-4a21-a0e3-e14f9e20b125")))

	// TimelineDvrPlaybackServiceTransactionsScrubOverTheHistoryOfChangesToYourDeployments - No description available
	TimelineDvrPlaybackServiceTransactionsScrubOverTheHistoryOfChangesToYourDeployments = PermissionKey(uuid.Must(uuid.FromString("83784db9-bb58-4e15-aede-cbac7d01f431")))

	// OperatorRepresentationOfInfrastructureConfigurationAndServices - No description available
	OperatorRepresentationOfInfrastructureConfigurationAndServices = PermissionKey(uuid.Must(uuid.FromString("51481036-07fa-425b-89fb-cb6141a8d7b5")))

	// ServicePerformanceServicePerformance - Continuous visibility across all of your clusters and workloads.
	ServicePerformanceServicePerformance = PermissionKey(uuid.Must(uuid.FromString("54112584-8ba3-4a0e-b930-b32d0d054ae2")))

	// DesignPatternsDragNDropPatternMergeWithExistingNodesOnCanvas - Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to drag and drop a design onto the canvas to merge with exisitng nodes on canvas.
	DesignPatternsDragNDropPatternMergeWithExistingNodesOnCanvas = PermissionKey(uuid.Must(uuid.FromString("f8434605-cf0d-44ae-8b5a-31bca20c3d06")))

	// DesignPatternsLoadDesignPatternDisplaceCurrentNodesOnCanvas - Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to drag and drop a design onto the canvas to displace the exisitng nodes on canvas.
	DesignPatternsLoadDesignPatternDisplaceCurrentNodesOnCanvas = PermissionKey(uuid.Must(uuid.FromString("ccd8e0eb-5e2a-45e3-9b3d-3941b60dfed8")))

	// DesignPatternsEditComponentConfugurationRjsfTooltips - In Meshery, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to configure a component currently present on canvas.
	DesignPatternsEditComponentConfugurationRjsfTooltips = PermissionKey(uuid.Must(uuid.FromString("8154fa61-aca9-4274-bcdd-6f551e9b17eb")))

	// DesignPatternsConfigureFieldrefs - No description available
	DesignPatternsConfigureFieldrefs = PermissionKey(uuid.Must(uuid.FromString("4770f8cc-8f58-4da9-89e2-a7e7c2ea4e2f")))

	// ComponentsDeleteComponents - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to delete a component from canvas.
	ComponentsDeleteComponents = PermissionKey(uuid.Must(uuid.FromString("9f2264fa-9e40-4625-8bc0-5c9162d617a7")))

	// ComponentsCloneComponents - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to clone a component, along with it's configuration, on canvas.
	ComponentsCloneComponents = PermissionKey(uuid.Must(uuid.FromString("8d640c90-8a8e-4ac0-a4bb-010f81cfc00a")))

	// ComponentsCopyComponents - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to clone a component, along with it's configuration, on canvas.
	ComponentsCopyComponents = PermissionKey(uuid.Must(uuid.FromString("fbeacff4-9eed-4f55-aee3-9c3da53bdc9b")))

	// ComponentsLockComponents - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to lock a component's state present on canvas.
	ComponentsLockComponents = PermissionKey(uuid.Must(uuid.FromString("08ebbd83-870f-4267-b3b7-7e50669b1e26")))

	// ComponentsAddComponents - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to copy a component present on canvas. The canvas is where the design and all it's components are displayed and configured. This permission grants the user the ability to cofigure/edit/update a design by adding new components to the canvas.
	ComponentsAddComponents = PermissionKey(uuid.Must(uuid.FromString("3a345a78-2ac7-4916-bc99-91769f5c4959")))

	// ComponentsConfigureComponentStyles - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to configure the style of a component.
	ComponentsConfigureComponentStyles = PermissionKey(uuid.Must(uuid.FromString("af9f2e20-1cae-41ac-94b2-379fddc2660f")))

	// ComponentsResetComponentStyles - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to reset a component to it's initial style.
	ComponentsResetComponentStyles = PermissionKey(uuid.Must(uuid.FromString("faa0cb66-af78-4a6f-84f0-3bfae7254276")))

	// ComponentsResizeComponents - In Kanvas, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to reset a component to it's initial style.
	ComponentsResizeComponents = PermissionKey(uuid.Must(uuid.FromString("faa0cb66-af78-4a6f-84f0-3bfae7254276")))

	// ShapesDeleteShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a shape from canvas.
	ShapesDeleteShapes = PermissionKey(uuid.Must(uuid.FromString("436d24e5-4a0d-4298-b94d-394d6e489ec3")))

	// ShapesCloneShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a shape  on canvas.
	ShapesCloneShapes = PermissionKey(uuid.Must(uuid.FromString("74a27b19-1614-46ca-94f2-c1cc96b1e610")))

	// ShapesCopyShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a shape on canvas.
	ShapesCopyShapes = PermissionKey(uuid.Must(uuid.FromString("7f5dd8ef-eef0-4693-b918-9571c1214ad3")))

	// ShapesLockShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a shape on canvas.
	ShapesLockShapes = PermissionKey(uuid.Must(uuid.FromString("6f196e4d-0626-47af-8721-1364f5f2f5f2")))

	// ShapesAddShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new shapes on canvas.
	ShapesAddShapes = PermissionKey(uuid.Must(uuid.FromString("35ce3654-7d96-4898-9398-364bcbe49c45")))

	// ShapesConfigureShapeStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of shapes present on canvas.
	ShapesConfigureShapeStyles = PermissionKey(uuid.Must(uuid.FromString("461c58a2-293d-40ef-bd85-16df143feea1")))

	// ShapesResetShapeStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of shapes present on canvas.
	ShapesResetShapeStyles = PermissionKey(uuid.Must(uuid.FromString("73d6fda8-8ea8-4b0f-ad89-ad6b549b28d0")))

	// TextboxesDeleteTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a textbox from canvas.
	TextboxesDeleteTextboxes = PermissionKey(uuid.Must(uuid.FromString("67132e28-d52a-4fbd-a697-16d19f3505bd")))

	// TextboxesCloneTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a textbox on canvas.
	TextboxesCloneTextboxes = PermissionKey(uuid.Must(uuid.FromString("7dea5e81-a2cb-4f95-8855-b19e3756c0ab")))

	// TextboxesCopyTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a textbox on canvas.
	TextboxesCopyTextboxes = PermissionKey(uuid.Must(uuid.FromString("6dbd7813-a9c4-454b-b3a6-c1eae313c791")))

	// TextboxesLockTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a textbox on canvas.
	TextboxesLockTextboxes = PermissionKey(uuid.Must(uuid.FromString("56c1ae0d-cf71-43ce-9453-6dd447e6dd8f")))

	// TextboxesAddTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new textboxes on canvas.
	TextboxesAddTextboxes = PermissionKey(uuid.Must(uuid.FromString("9366be38-96f4-4a84-aff0-e17148a8a358")))

	// TextboxesConfigureTextboxStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of textboxes present on canvas.
	TextboxesConfigureTextboxStyles = PermissionKey(uuid.Must(uuid.FromString("0653814a-0266-4d55-bc52-6ef17ebcf03d")))

	// TextboxesResetTextboxStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of textboxes present on canvas.
	TextboxesResetTextboxStyles = PermissionKey(uuid.Must(uuid.FromString("26815ca4-1fec-43fc-a8aa-9669719632a4")))

	// SectionsDeleteSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a section from canvas.
	SectionsDeleteSections = PermissionKey(uuid.Must(uuid.FromString("7b7377c8-2160-42eb-a130-4a69ab1225ed")))

	// SectionsCloneSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a section on canvas.
	SectionsCloneSections = PermissionKey(uuid.Must(uuid.FromString("41de8c25-71c1-4fc5-9230-c018af8f1e41")))

	// SectionsCopySections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a section on canvas.
	SectionsCopySections = PermissionKey(uuid.Must(uuid.FromString("c05ca2ed-262d-4dc1-aa10-69b93dbe4e39")))

	// SectionsLockSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a section on canvas.
	SectionsLockSections = PermissionKey(uuid.Must(uuid.FromString("fcfbc9ee-3824-45e9-ba50-c4c6ec52779b")))

	// SectionsAddSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new sections on canvas.
	SectionsAddSections = PermissionKey(uuid.Must(uuid.FromString("d15a960c-d4d5-4656-94e5-7a1e116fa610")))

	// SectionsConfigureSectionStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of sections present on canvas.
	SectionsConfigureSectionStyles = PermissionKey(uuid.Must(uuid.FromString("66c06b53-c174-415d-b88b-0d8c858c4034")))

	// SectionsResetSectionStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of sections present on canvas.
	SectionsResetSectionStyles = PermissionKey(uuid.Must(uuid.FromString("21bce984-73c1-4025-acd5-f18cdbd796db")))

	// DesignPatternsAddTextToTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add text to the textboxes currently on canvas.
	DesignPatternsAddTextToTextboxes = PermissionKey(uuid.Must(uuid.FromString("e0fabc93-1566-4780-934d-adddf2275f64")))

	// DesignPatternsCreateDynamicFieldrefs - No description available
	DesignPatternsCreateDynamicFieldrefs = PermissionKey(uuid.Must(uuid.FromString("2a2a61b6-9fda-4cc6-86e9-1a71a54863c7")))

	// DesignPatternsConfigureEdgeHandles - No description available
	DesignPatternsConfigureEdgeHandles = PermissionKey(uuid.Must(uuid.FromString("23f7adfe-de4b-42be-a3cd-f7f34d83c319")))

	// DesignPatternsDeleteEdgeHandles - No description available
	DesignPatternsDeleteEdgeHandles = PermissionKey(uuid.Must(uuid.FromString("3e1b0633-06a9-4be9-a6fb-c15cc453834f")))

	// DesignPatternsUseHeirarchicalRelationships - No description available
	DesignPatternsUseHeirarchicalRelationships = PermissionKey(uuid.Must(uuid.FromString("a6552d56-1712-45cc-8b96-05ba419c357c")))

	// DesignPatternsUseInventoryRelationships - No description available
	DesignPatternsUseInventoryRelationships = PermissionKey(uuid.Must(uuid.FromString("ab2bbc88-b0e2-4267-9663-a554cd0a7e26")))

	// DesignPatternsChangeDesignLayout - Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to change the layout of the components in the design.
	DesignPatternsChangeDesignLayout = PermissionKey(uuid.Must(uuid.FromString("e4fcd40d-4e5d-4c2b-9d76-1f92ccfe8edd")))

	// DesignPatternsUndoOrRedo - This permission grants the user the ability to undo/redo any action in done in Kanvas
	DesignPatternsUndoOrRedo = PermissionKey(uuid.Must(uuid.FromString("1ae55743-0496-45f7-9a42-aabb7f0d6c70")))

	// DesignPatternsUsePencil - Pencil is mouse/tool mode available in Kanvas that allows users to draw freehand shapes. This permission grants user the ability to use the pencil mode in Kanvas.
	DesignPatternsUsePencil = PermissionKey(uuid.Must(uuid.FromString("02c7afe9-44b2-4fe7-8c8b-1c12a0da600f")))

	// DesignPatternsUsePen - Pen is a mouse/tool mode available in Kanvas that allows users to draw edges from one component to another. This permission grants user the ability to use the pencil mode in Kanvas.
	DesignPatternsUsePen = PermissionKey(uuid.Must(uuid.FromString("b5aaeaf2-a563-4e7a-a556-7670a41cc946")))

	// DesignPatternsWhiteboarding - Ability to freeform draw any shapes, draw edges
	DesignPatternsWhiteboarding = PermissionKey(uuid.Must(uuid.FromString("dd64b24d-fd22-4123-94fc-a1f235f7f514")))

	// VisualDesignVisualDesign - Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads
	VisualDesignVisualDesign = PermissionKey(uuid.Must(uuid.FromString("5ea237bb-013e-412f-9dbf-394a6d27a027")))

	// MesheryModelModels - Generator for GCP via K8s CRDs
	MesheryModelModels = PermissionKey(uuid.Must(uuid.FromString("8a10b666-b5f8-4310-90da-9c33ceae4058")))

	// KanvasActionsViewHelpCenter - Help center houses various ways through which the users might try to learn more about the Kanvas and it's features or reach out through various channels for help. This permission grants the user the ability to view the help center and use it's features
	KanvasActionsViewHelpCenter = PermissionKey(uuid.Must(uuid.FromString("1a7eab59-2f09-45a5-9ad3-b02faf0f8f6a")))

	// KanvasActionsScreenshotCanvas - The canvas is where the design and all it's components are displayed. This permission grants the user the ability to take a screenshot of the current state of canvas
	KanvasActionsScreenshotCanvas = PermissionKey(uuid.Must(uuid.FromString("31994492-1bae-400d-835b-1a4ff63e9e15")))

	// KanvasActionsConfigureVisibleLayers - Layers refer to the collection of various entities present on the canvas, for example, components, relationships, component badges, etc. This permission grants the user the ability to decide which entities to display/hide on the canvas.
	KanvasActionsConfigureVisibleLayers = PermissionKey(uuid.Must(uuid.FromString("5417ccdb-46fe-467d-b408-d4705cd4d78b")))

	// DesignPatternsCreateBlankDesignInKanvas - The canvas is where the design and all it's components are displayed and configured. This permission grants the user the ability to remove all current entities from the canvas and create a new one to start from scratch
	DesignPatternsCreateBlankDesignInKanvas = PermissionKey(uuid.Must(uuid.FromString("958e68aa-c8d4-4965-b094-636289d855f9")))

	// DesignPatternsSaveDesignInKanvas - Like a Google Doc, Designs are your primary tool for collaborative authorship of your infrastructure and services. A Design describes all the resources and their properties that you want for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to save a design (while logged in)
	DesignPatternsSaveDesignInKanvas = PermissionKey(uuid.Must(uuid.FromString("31096e00-0142-41fd-8680-d5212bc13c2c")))

	// DesignReviewViewComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to view comments in a design on canvas.
	DesignReviewViewComments = PermissionKey(uuid.Must(uuid.FromString("3c72993d-7ebe-4ce2-bbc5-64d9b0fbb65e")))

	// DesignReviewResolveAComment - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to resolve a comment thread in a design on canvas.
	DesignReviewResolveAComment = PermissionKey(uuid.Must(uuid.FromString("1ba1822d-d6c0-4595-92e6-63d92f02e3a5")))

	// DesignReviewDeleteComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to delete a comment on canvas.
	DesignReviewDeleteComments = PermissionKey(uuid.Must(uuid.FromString("6ff22145-7fa1-4a06-a986-5a3f5d5718ca")))

	// DesignReviewCloneComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to clone a comment on canvas.
	DesignReviewCloneComments = PermissionKey(uuid.Must(uuid.FromString("f325d8ec-d6c6-4367-9fe8-3affd9ba33b7")))

	// DesignReviewCopyComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to copy a comment on canvas.
	DesignReviewCopyComments = PermissionKey(uuid.Must(uuid.FromString("cfa66488-21aa-4f9c-8e98-bf6cf9ceb02d")))

	// DesignReviewLockComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to lock a comment on canvas.
	DesignReviewLockComments = PermissionKey(uuid.Must(uuid.FromString("8f6e9ffa-8d7b-48ab-b0b2-f017fa6a99fe")))

	// DesignReviewAddComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to add a comment on canvas.
	DesignReviewAddComments = PermissionKey(uuid.Must(uuid.FromString("2c47e53b-aea9-471f-8048-bd618c86418d")))

	// DesignReviewConfigureCommentStyles - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to configure the styles of a comment on canvas.
	DesignReviewConfigureCommentStyles = PermissionKey(uuid.Must(uuid.FromString("4366c965-2914-4c3c-a52d-0f2b3a8eb22c")))

	// DesignReviewResetCommentStyles - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to reset the styles of a comment on canvas.
	DesignReviewResetCommentStyles = PermissionKey(uuid.Must(uuid.FromString("c9c6d2bf-e566-49c8-bee0-bc6cf84cb8a8")))

	// OperatorViewViews - See all views withing a workspace
	OperatorViewViews = PermissionKey(uuid.Must(uuid.FromString("93cba7f8-82ec-4a64-b384-f81d6acc8db3")))

	// OperatorCreateView - Create a new view
	OperatorCreateView = PermissionKey(uuid.Must(uuid.FromString("47ba32dc-aaa3-4c75-afdd-07fb40f38f4f")))

	// OperatorDeleteView - Dissolve environment and all connection memberships. Leave associated resources intact.
	OperatorDeleteView = PermissionKey(uuid.Must(uuid.FromString("48076416-bc07-456b-bbea-49bdca239d0f")))

	// OperatorEditView - Edit environment and it connection membership
	OperatorEditView = PermissionKey(uuid.Must(uuid.FromString("2f8354bb-6855-4a42-8086-8d55c1c7e638")))

	// OperatorAssignViewsToWorkspace - Add new views to workspace
	OperatorAssignViewsToWorkspace = PermissionKey(uuid.Must(uuid.FromString("fb6c987b-e54c-4016-b3f3-0488228ee998")))

	// OperatorUnassignViewsFromWorkspace - Remove views from workspace
	OperatorUnassignViewsFromWorkspace = PermissionKey(uuid.Must(uuid.FromString("f77d74ef-1cae-4527-b45e-ecc1431681df")))

	// OperatorExportViews - Export views to JSON format
	OperatorExportViews = PermissionKey(uuid.Must(uuid.FromString("3bb16c17-79bb-4673-8287-e818b8aece5c")))

	// OperatorViewViewComponentDetails - View detailed information about a view and it's comopnent
	OperatorViewViewComponentDetails = PermissionKey(uuid.Must(uuid.FromString("d363b6a3-7ae5-4be0-a35f-91d9e5136b1a")))

	// OperatorOpenView - Open a pre-existing view
	OperatorOpenView = PermissionKey(uuid.Must(uuid.FromString("c47d29bc-7d23-433e-8140-ab273734b7df")))

	// OperatorSaveViews - Saved view
	OperatorSaveViews = PermissionKey(uuid.Must(uuid.FromString("93250075-0994-4ff8-8ff3-7ecc74ca7956")))

	// OperatorShareViews - Share Views
	OperatorShareViews = PermissionKey(uuid.Must(uuid.FromString("631ebd8c-a084-4df0-be9b-de5abd2d8468")))

	// OperatorCloneViews - Clone Views
	OperatorCloneViews = PermissionKey(uuid.Must(uuid.FromString("258c7e18-9ac4-41d7-a637-7f12a7f24df7")))

	// OperatorWebBasedTerminal - Direct terminal access to one ore more pods/containers simultaneously. Integrated experience.
	OperatorWebBasedTerminal = PermissionKey(uuid.Must(uuid.FromString("4726da45-2108-409b-b94f-45bd1e199a78")))

	// OperatorViewInteractiveTerminal - View Interactive Terminal
	OperatorViewInteractiveTerminal = PermissionKey(uuid.Must(uuid.FromString("4726da45-2108-409b-b94f-45bd1e199a78")))

	// OperatorViewComponentDetails - View managed infrastructure resources details in Kanvas Operator
	OperatorViewComponentDetails = PermissionKey(uuid.Must(uuid.FromString("5d1e226b-cc0c-407c-8fa7-37159d06698d")))

	// OperatorViewObservabilityMetrics - View real-time resource metrics in Kanvas Operator
	OperatorViewObservabilityMetrics = PermissionKey(uuid.Must(uuid.FromString("2988a366-a743-48e7-9946-daff9b2ab0a1")))

	// OperatorPerformConformanceTest - Perform a conformance test in Kanvas Operator
	OperatorPerformConformanceTest = PermissionKey(uuid.Must(uuid.FromString("901ca054-0656-4db5-8d58-d618e0b82b39")))

	// OperatorStreamContainerLogs - Stream container logs in Kanvas Operator
	OperatorStreamContainerLogs = PermissionKey(uuid.Must(uuid.FromString("c1ff0f0d-95b5-4765-8c64-d77af99e5d4f")))

	// OperatorPerformPerformanceTestInVisualizer - Perform performance test in Kanvas Operator
	OperatorPerformPerformanceTestInVisualizer = PermissionKey(uuid.Must(uuid.FromString("88fe3781-bd53-4bfb-bab9-27e3ad06a9f5")))

	// OperatorSelectPerformanceProfileInVisualizer - Select a performance profile to run tests using
	OperatorSelectPerformanceProfileInVisualizer = PermissionKey(uuid.Must(uuid.FromString("16d80ca9-c245-4622-9482-45303b963811")))

	// OnPremiseDeploymentsHelmBased - Meshery Cloud
	OnPremiseDeploymentsHelmBased = PermissionKey(uuid.Must(uuid.FromString("bfcc083f-7918-4229-a20e-758661ed73b2")))

	// PerformanceTestsSmpCompatibleImportExport - No description available
	PerformanceTestsSmpCompatibleImportExport = PermissionKey(uuid.Must(uuid.FromString("293cf5a4-512a-42aa-86e9-12882ec79a5e")))

	// PerformanceProfilesPersistenceOfTestResults - Baseline and track your service mesh performance from release to release.
	PerformanceProfilesPersistenceOfTestResults = PermissionKey(uuid.Must(uuid.FromString("fc36a4cc-9f31-4784-8b9f-b38772d05425")))

	// LoadGenerationLoadGeneratorInterfaceCommonInterfaceUsedAsAnExtensionPointForSupportingDifferentTypesOfLoadGenerators - No description available
	LoadGenerationLoadGeneratorInterfaceCommonInterfaceUsedAsAnExtensionPointForSupportingDifferentTypesOfLoadGenerators = PermissionKey(uuid.Must(uuid.FromString("cd18ca8d-11e3-47cc-a68f-381c0a2561c5")))

	// LoadGenerationLoadGeneration - Single Load Generator: Support testing multiple endpoints simultaneously.
	LoadGenerationLoadGeneration = PermissionKey(uuid.Must(uuid.FromString("826e1994-0bc3-4553-b20c-c62cabad98e6")))

	// LoadGenerationDistributedLoadGenerator - Multiple Meshery Servers or Meshery Adapters generating load, collecting and coalescing results into a single report.
	LoadGenerationDistributedLoadGenerator = PermissionKey(uuid.Must(uuid.FromString("13a4dab9-018c-45ce-ac17-66721aa83ff0")))

	// PerformanceProfilesDefineNameAndSavePerformanceProfiles - No description available
	PerformanceProfilesDefineNameAndSavePerformanceProfiles = PermissionKey(uuid.Must(uuid.FromString("679c7956-e1be-4f97-8400-f1d8fe90f856")))

	// GitopsServiceMeshPerformaceGithubActionIntegratePerformanceAnalysisAsAGateInYourGitopsPipelineUsingPerformanceProfilesToRunRepeatableTestsAndAvoidRegressionIssuesBeforeTheyStartConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent - No description available
	GitopsServiceMeshPerformaceGithubActionIntegratePerformanceAnalysisAsAGateInYourGitopsPipelineUsingPerformanceProfilesToRunRepeatableTestsAndAvoidRegressionIssuesBeforeTheyStartConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent = PermissionKey(uuid.Must(uuid.FromString("872dca45-cb80-4dfb-9421-1da1ffb6a265")))

	// ServiceMeshInterfaceConformanceGithubActionsUsingMesheryAsTheOfficalSmiConformanceValidationToolConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent - No description available
	ServiceMeshInterfaceConformanceGithubActionsUsingMesheryAsTheOfficalSmiConformanceValidationToolConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent = PermissionKey(uuid.Must(uuid.FromString("b7128770-7dda-4556-be33-991d4173c546")))

	// PerformanceProfilesPerformanceProfiles - Share performance profiles and test results with individual users or teams.
	PerformanceProfilesPerformanceProfiles = PermissionKey(uuid.Must(uuid.FromString("add7825b-355c-4d98-a706-ab8ce273ea21")))

	// ComparativeTestingComparativeTesting - Historical views: Infrastructure-centric
	ComparativeTestingComparativeTesting = PermissionKey(uuid.Must(uuid.FromString("f480c87e-dc39-4877-9c6f-5e5d4f8f760a")))

	// PerformanceIndexExportableReport - No description available
	PerformanceIndexExportableReport = PermissionKey(uuid.Must(uuid.FromString("83cdf8a9-27cf-4020-86eb-98865a2a4c4c")))

	// PerformanceIndexSocialShare - No description available
	PerformanceIndexSocialShare = PermissionKey(uuid.Must(uuid.FromString("4ef3d7a9-23d6-4254-9ba9-e515edafe3da")))

	// ContinuousQualityOfServiceMonitoringContinuousQualityOfServiceMonitoring - Experience uninterrupted oversight of your service quality with our Continuous Quality of Service Monitoring.
	ContinuousQualityOfServiceMonitoringContinuousQualityOfServiceMonitoring = PermissionKey(uuid.Must(uuid.FromString("bd26b342-2f5c-4985-97e5-aca532327951")))

	// AutoTuningAdaptiveLoadControlOptimizeRps - No description available
	AutoTuningAdaptiveLoadControlOptimizeRps = PermissionKey(uuid.Must(uuid.FromString("28c80137-f726-4366-940d-53f8d2feed13")))

	// SchedulingSchedulingOfTests - Schedule one-time or reoccurring performance tests.
	SchedulingSchedulingOfTests = PermissionKey(uuid.Must(uuid.FromString("b1201553-c4b3-4212-9ac1-af11eaee6931")))

	// SchedulingSophisticatedRecurringSchedulesOfPerformanceTestsOfConfigurationAnalyzers - No description available
	SchedulingSophisticatedRecurringSchedulesOfPerformanceTestsOfConfigurationAnalyzers = PermissionKey(uuid.Must(uuid.FromString("78e3febd-0003-4ac2-8c4f-3d4fefed69d7")))

	// SchedulingCalendarIntegration - Schedule tests from your calendar
	SchedulingCalendarIntegration = PermissionKey(uuid.Must(uuid.FromString("b4791193-0944-430d-b889-f3000e2dc885")))

	// MeshmarkListenAndLearnAverageRequestResponseTime - No description available
	MeshmarkListenAndLearnAverageRequestResponseTime = PermissionKey(uuid.Must(uuid.FromString("4a5e66d1-a4cc-4aad-8e8a-ce605a3baef5")))

	// MeshmarkFormulaAndMeasurementScaleUsedToGaugeServiceMeshPerformanceInContextOfTheValueItSProvidingTheEnvironmentAndWorkloadsItSRunning - No description available
	MeshmarkFormulaAndMeasurementScaleUsedToGaugeServiceMeshPerformanceInContextOfTheValueItSProvidingTheEnvironmentAndWorkloadsItSRunning = PermissionKey(uuid.Must(uuid.FromString("cb10fc07-a626-4d25-801c-3fbb9f458206")))

	// MeshmarkAbilityToMonitorSignalsDefinedInSmpAndGenerateAMeshmarkInRealTime - No description available
	MeshmarkAbilityToMonitorSignalsDefinedInSmpAndGenerateAMeshmarkInRealTime = PermissionKey(uuid.Must(uuid.FromString("eaedcc22-198e-4714-9c77-ba84a84dc471")))

	// MeshmarkMeshmark - Identify the cost of a specific network function.
	MeshmarkMeshmark = PermissionKey(uuid.Must(uuid.FromString("e5620cc6-6a98-4146-966f-562114342aae")))

	// PerformanceTestProtocolsHttp - No description available
	PerformanceTestProtocolsHttp = PermissionKey(uuid.Must(uuid.FromString("1364948f-3e28-4853-84a7-452ba1e7ee13")))

	// PerformanceTestProtocolsGrpc - No description available
	PerformanceTestProtocolsGrpc = PermissionKey(uuid.Must(uuid.FromString("3ab50aa9-6860-4618-b97e-b6144da69f12")))

	// PerformanceTestProtocolsTcp - No description available
	PerformanceTestProtocolsTcp = PermissionKey(uuid.Must(uuid.FromString("3eab632b-0392-4bb8-8564-89e21166d902")))

	// PerformanceTestDuration - No description available
	PerformanceTestDuration = PermissionKey(uuid.Must(uuid.FromString("6ad02dc5-7e1d-443d-ba82-e4b63c91a402")))

	// PerformanceTestMultipleThreads - No description available
	PerformanceTestMultipleThreads = PermissionKey(uuid.Must(uuid.FromString("acfeaecf-ca09-43cb-8aa2-31ca688596a4")))

	// PerformanceTestDefaultProfilesToFacilitateCapacitySoakAndOtherTesting - No description available
	PerformanceTestDefaultProfilesToFacilitateCapacitySoakAndOtherTesting = PermissionKey(uuid.Must(uuid.FromString("d0a8cc17-5101-467b-bf7b-ac5b7346cee1")))

	// PerformanceTestComparisonOfTwoOrMoreReports - No description available
	PerformanceTestComparisonOfTwoOrMoreReports = PermissionKey(uuid.Must(uuid.FromString("8f3061a3-a31d-4c61-9be6-cc002b713853")))

	// PerformanceTestPersistInSmpFormat - No description available
	PerformanceTestPersistInSmpFormat = PermissionKey(uuid.Must(uuid.FromString("ca1200da-d3f3-4274-831a-2cd6102c5a1b")))

	// PerformanceTestExportSingleOrMultipleResultsInSmpFormat - No description available
	PerformanceTestExportSingleOrMultipleResultsInSmpFormat = PermissionKey(uuid.Must(uuid.FromString("0fe311a6-71cb-49d5-8971-b5eb164d973a")))

	// PerformanceTestHistoricalView - No description available
	PerformanceTestHistoricalView = PermissionKey(uuid.Must(uuid.FromString("e5b12687-5fc8-49f5-8833-3e43ca652d80")))

	// PerformanceResultsAnalysisLatencyThroughput - No description available
	PerformanceResultsAnalysisLatencyThroughput = PermissionKey(uuid.Must(uuid.FromString("68730e20-3174-4ac9-9e7b-d3c1bd179b8b")))

	// PerformanceResultsAnalysisThresholdSettingsForPassFailWhenIntegratedIntoCiPipelines - No description available
	PerformanceResultsAnalysisThresholdSettingsForPassFailWhenIntegratedIntoCiPipelines = PermissionKey(uuid.Must(uuid.FromString("ed61627f-6736-4331-8d6d-dddcce98272a")))

	// PerformanceResultsAnalysisIdentificationOfOpportunitiesToImprove - No description available
	PerformanceResultsAnalysisIdentificationOfOpportunitiesToImprove = PermissionKey(uuid.Must(uuid.FromString("37de75c5-b1d7-4358-946d-0a4d72a9d587")))

	// PerformanceResultsAnalysisTrend - No description available
	PerformanceResultsAnalysisTrend = PermissionKey(uuid.Must(uuid.FromString("2a5aedd5-095f-47ad-b4fb-9e9d9f97e8aa")))

	// PerformanceResultsAnalysisAnomalyDetection - No description available
	PerformanceResultsAnalysisAnomalyDetection = PermissionKey(uuid.Must(uuid.FromString("5b9b0cc2-6ea9-45d3-b989-8bd034768a19")))

	// DistributedPerformanceAnalysisAnalysis - Automatically suggest timeout settings for a given service.
	DistributedPerformanceAnalysisAnalysis = PermissionKey(uuid.Must(uuid.FromString("d9e286d5-54f1-446f-9c1a-ece361e5aca1")))

	// DistributedPerformanceAnalysisMesheryAdapterForNighthawk - Creation of Meshery Nighthawk Adapter. Refactoring of Nighhawk and decoupling it from Meshery container. Lifecycle management of adapter. Definition and registration of adapter capabilities.
	DistributedPerformanceAnalysisMesheryAdapterForNighthawk = PermissionKey(uuid.Must(uuid.FromString("72066352-d09b-494a-b02e-846676bd7a0a")))

	// DistributedPerformanceAnalysisDistributedTests - Allow users to identity Kubernetes clusters
	DistributedPerformanceAnalysisDistributedTests = PermissionKey(uuid.Must(uuid.FromString("72066352-d09b-494a-b02e-846676bd7a0a")))

	// DistributedPerformanceAnalysisPerformanceProfiles - Storage of n result sets in Provider for a given Performance Profile.
	DistributedPerformanceAnalysisPerformanceProfiles = PermissionKey(uuid.Must(uuid.FromString("72066352-d09b-494a-b02e-846676bd7a0a")))

	// PerformanceAddPerformaceProfile - Add a new performace profile
	PerformanceAddPerformaceProfile = PermissionKey(uuid.Must(uuid.FromString("b2861578-c573-45fe-a95e-0356d56e1d1b")))

	// PerformanceRunTest - Run a test on performance profile
	PerformanceRunTest = PermissionKey(uuid.Must(uuid.FromString("06de2b07-b4f4-4701-b87f-d92ebb66ba42")))

	// PerformanceViewResults - View results of performance tests
	PerformanceViewResults = PermissionKey(uuid.Must(uuid.FromString("0c757cc7-4038-4d9b-9b60-fa8d9fc9d27e")))

	// PerformanceEditPerformanceTest - Edit performance test
	PerformanceEditPerformanceTest = PermissionKey(uuid.Must(uuid.FromString("33aa5c47-a8aa-4ad5-9950-7c17042c001d")))

	// PerformanceDeletePerformanceTest - Delete performance test
	PerformanceDeletePerformanceTest = PermissionKey(uuid.Must(uuid.FromString("84aa9d3c-3d4b-4587-947d-ae17b2dcd5f5")))

	// PerformanceViewPerformanceProfiles - View all performance profiles
	PerformanceViewPerformanceProfiles = PermissionKey(uuid.Must(uuid.FromString("6593ac26-820b-4e87-be32-64ee740ea204")))

	// AlertManagementNotificationSuppression - No description available
	AlertManagementNotificationSuppression = PermissionKey(uuid.Must(uuid.FromString("5a3096b7-d7ce-497e-87f0-afc91fa7666e")))

	// AlertManagementNotificationCorrelation - No description available
	AlertManagementNotificationCorrelation = PermissionKey(uuid.Must(uuid.FromString("3876eaf6-d02f-41d1-a8be-9887e8522334")))

	// PoliciesVersioned - No description available
	PoliciesVersioned = PermissionKey(uuid.Must(uuid.FromString("068257b7-348a-4f4b-96d1-e4606ef45c93")))

	// AuditTrailLogOfAllActionsInvokedByUsers - No description available
	AuditTrailLogOfAllActionsInvokedByUsers = PermissionKey(uuid.Must(uuid.FromString("8465ed0b-63d4-4a28-944b-4cab4cd5bc7f")))

	// RbacViolationsNotificationOfAttemptsToInvokeUnauthorizedActions - No description available
	RbacViolationsNotificationOfAttemptsToInvokeUnauthorizedActions = PermissionKey(uuid.Must(uuid.FromString("cc25afd4-777d-4768-a43f-d8c09ce978cf")))

	// OpenPolicyAgentIntegrationAdmissionControlForSpecificWorkloadsOnTheMesh - No description available
	OpenPolicyAgentIntegrationAdmissionControlForSpecificWorkloadsOnTheMesh = PermissionKey(uuid.Must(uuid.FromString("7dccf200-eacc-4057-b3d7-ac15ccf70a38")))

	// OpenPolicyAgentIntegrationServiceRequestAuthorizationWithJwt - No description available
	OpenPolicyAgentIntegrationServiceRequestAuthorizationWithJwt = PermissionKey(uuid.Must(uuid.FromString("cae1f1b8-2a88-4bc6-adb4-8e7b80d449ef")))

	// OpenPolicyAgentIntegrationPerformanceBudgetSupportInPatterns - No description available
	OpenPolicyAgentIntegrationPerformanceBudgetSupportInPatterns = PermissionKey(uuid.Must(uuid.FromString("783e4277-4c89-4495-9e50-bbb6c2cd42fb")))

	// OverviewViewOverview - No description available
	OverviewViewOverview = PermissionKey(uuid.Must(uuid.FromString("12dc96f1-a3fa-4bae-9c5a-a280666f9fdb")))

	// CredentialsViewCredentials - No description available
	CredentialsViewCredentials = PermissionKey(uuid.Must(uuid.FromString("96759f76-4add-45f8-b4ef-d4ace5ab1bc4")))

	// CredentialsCreateCredential - No description available
	CredentialsCreateCredential = PermissionKey(uuid.Must(uuid.FromString("30023b1b-01a7-4613-8364-38d3487d1789")))

	// CredentialsEditCredential - No description available
	CredentialsEditCredential = PermissionKey(uuid.Must(uuid.FromString("e4cd5bb0-8afb-4b35-8716-0e2ead13c9b7")))

	// CredentialsDeleteCredential - No description available
	CredentialsDeleteCredential = PermissionKey(uuid.Must(uuid.FromString("cb09f530-aa87-4a18-b3d3-bbcc2d6ca1a6")))

	// SessionsViewSessions - No description available
	SessionsViewSessions = PermissionKey(uuid.Must(uuid.FromString("26cf042a-91db-4237-8644-4d617a0d49e1")))

	// SessionsLogoutFromASession - No description available
	SessionsLogoutFromASession = PermissionKey(uuid.Must(uuid.FromString("177b928b-71ee-4ecd-a30b-3154ff4ba0d9")))

	// TokensViewTokens - No description available
	TokensViewTokens = PermissionKey(uuid.Must(uuid.FromString("46d914bc-18c1-438f-aa74-fb78823aa25c")))

	// TokensDownloadToken - No description available
	TokensDownloadToken = PermissionKey(uuid.Must(uuid.FromString("ee5fc23e-d629-4c7b-8169-27e526394e8b")))

	// TokensCreateToken - No description available
	TokensCreateToken = PermissionKey(uuid.Must(uuid.FromString("8aa0df56-57e8-44b7-9d6e-7df413048ed5")))

	// KeysViewKeys - No description available
	KeysViewKeys = PermissionKey(uuid.Must(uuid.FromString("3cf506df-8398-49d2-b4e2-f06e3a0f87f0")))

	// KeysEditKey - No description available
	KeysEditKey = PermissionKey(uuid.Must(uuid.FromString("605512d3-ff7f-456c-9230-b1d01c606d47")))

	// KeysDeleteKey - No description available
	KeysDeleteKey = PermissionKey(uuid.Must(uuid.FromString("efa19dc3-02a3-49b7-a0ff-e4554a2da337")))

	// KeychainsViewKeychains - No description available
	KeychainsViewKeychains = PermissionKey(uuid.Must(uuid.FromString("9e930568-6b55-43d2-91d8-abeafedc1550")))

	// KeychainsCreateKeychain - No description available
	KeychainsCreateKeychain = PermissionKey(uuid.Must(uuid.FromString("ec292de6-b62d-421b-94bf-ec5983faa6ff")))

	// KeychainsEditKeychain - No description available
	KeychainsEditKeychain = PermissionKey(uuid.Must(uuid.FromString("163e807d-f508-49ca-9ba6-cc3badb22bb0")))

	// KeychainsDeleteKeychain - No description available
	KeychainsDeleteKeychain = PermissionKey(uuid.Must(uuid.FromString("503a6b28-bd91-4dde-86ac-641567777515")))

	// CloudNativeInfrastructureLifecycleManageCloudNativeInfrastructureLifeCycle - This permission grants the user the ability to manage infrastructure life cycles within meshery. Meshery allows users to visualize, work on and manage various cloud native technologies.
	CloudNativeInfrastructureLifecycleManageCloudNativeInfrastructureLifeCycle = PermissionKey(uuid.Must(uuid.FromString("255fd148-e3fd-4408-a48c-0d157a57d4d9")))

	// CloudNativeInfrastructureLifecycleManageCloudNativeInfrastructureConfiguration - Manage configuration for applications like EmojiVoto, HTTPBin, Image Hub, Istio Book Info
	CloudNativeInfrastructureLifecycleManageCloudNativeInfrastructureConfiguration = PermissionKey(uuid.Must(uuid.FromString("0eb0558d-9b21-4e50-b4c6-bd8e9e3414f5")))

	// CloudNativeInfrastructureLifecycleApplyCloudNativeInfrastructureConfiguration - Configure infrastructure with some predefined options like Automatic Sidecar injection, Envoy Filter, Policy
	CloudNativeInfrastructureLifecycleApplyCloudNativeInfrastructureConfiguration = PermissionKey(uuid.Must(uuid.FromString("3f20a106-24f5-4da6-a8eb-6eddaad50944")))

	// CloudNativeInfrastructureLifecycleValidateCloudNativeInfrastructureConfiguration - Validate cloud native infrastructure  configuration against best practices like Analyze Running Configuration, SMI conformance
	CloudNativeInfrastructureLifecycleValidateCloudNativeInfrastructureConfiguration = PermissionKey(uuid.Must(uuid.FromString("8bb93f97-fcfb-4827-9fed-f931fdca7b95")))

	// CloudNativeInfrastructureLifecycleApplyCustomCloudNativeConfiguration - This permission grants the user the ability to apply custom configuration and customize existing configuration of thier cloud native infrastructure
	CloudNativeInfrastructureLifecycleApplyCustomCloudNativeConfiguration = PermissionKey(uuid.Must(uuid.FromString("2f4e2300-4c7e-4d48-95aa-74614a4826fe")))

	// CloudNativeInfrastructureLifecycleDeployCloudNativeInfrastructure - This permission grants the user the ability to deploy their infrastructure to a cluster through Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies
	CloudNativeInfrastructureLifecycleDeployCloudNativeInfrastructure = PermissionKey(uuid.Must(uuid.FromString("f7e70ffb-333d-43b3-a76e-0e6c63b9fbfa")))

	// CloudNativeInfrastructureLifecycleUndeployCloudNativeInfrastructure - This permission grants the user the ability to undeploy their infrastructure from a cluster through Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies
	CloudNativeInfrastructureLifecycleUndeployCloudNativeInfrastructure = PermissionKey(uuid.Must(uuid.FromString("6e7f6f4f-4321-4e42-9eff-6a8323f32e84")))

	// CloudNativeInfrastructureLifecycleViewCloudNativeInfrastructure - This permission grants the user the ability to view all cloud native infrastructure in Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies.
	CloudNativeInfrastructureLifecycleViewCloudNativeInfrastructure = PermissionKey(uuid.Must(uuid.FromString("fdc485dc-f68b-405c-9e54-7b9a7254c282")))

	// WorkspaceViewWorkspace - See all workspaces within an organization
	WorkspaceViewWorkspace = PermissionKey(uuid.Must(uuid.FromString("bc9379e8-dc18-4655-b53c-c641271c4ba3")))

	// WorkspaceDeleteWorkspace - Dissolve workspace and all team and environment memberships. Leave associated resources intact
	WorkspaceDeleteWorkspace = PermissionKey(uuid.Must(uuid.FromString("09eb0507-2f14-4bc4-92c5-9e26a4efbd5e")))

	// WorkspaceEditWorkspace - Edit workspace and it's team and environment membership
	WorkspaceEditWorkspace = PermissionKey(uuid.Must(uuid.FromString("4112230f-5d1e-4d30-9790-942ad5c1dc50")))

	// WorkspaceCreateWorkspace - Create new workspace
	WorkspaceCreateWorkspace = PermissionKey(uuid.Must(uuid.FromString("eb42ac41-a883-465e-843c-d64e962a3a0e")))

	// WorkspaceAssignTeamToWorkspace - Add new team to workspace
	WorkspaceAssignTeamToWorkspace = PermissionKey(uuid.Must(uuid.FromString("6ab4263b-0bb3-492e-9878-6936a5b6312f")))

	// WorkspaceRemoveTeamFromWorkspace - Remove team from workspace
	WorkspaceRemoveTeamFromWorkspace = PermissionKey(uuid.Must(uuid.FromString("c4ed82f5-783d-4451-9b34-44f50cae71df")))

	// WorkspaceAssignEnvironmentToWorkspace - Add new environment to workspace
	WorkspaceAssignEnvironmentToWorkspace = PermissionKey(uuid.Must(uuid.FromString("f421fc20-c14a-4282-b526-776c6cacfd99")))

	// WorkspaceRemoveEnvironmentFromWorkspace - Remove environment from workspace
	WorkspaceRemoveEnvironmentFromWorkspace = PermissionKey(uuid.Must(uuid.FromString("d0657715-80fb-4b00-af27-b78bb0fa56df")))

	// WorkspaceAssignDesignsToWorkspaces - Assign designs to workspaces
	WorkspaceAssignDesignsToWorkspaces = PermissionKey(uuid.Must(uuid.FromString("64a1bad5-30f1-431a-aea0-8073d14a0262")))

	// WorkspaceRemoveDesignsFromWorkspaces - Remove designs from workspaces
	WorkspaceRemoveDesignsFromWorkspaces = PermissionKey(uuid.Must(uuid.FromString("076515f1-f696-4211-ae27-58d5463a229e")))

	// WorkspaceConnectGithubAccountToWorkspace - No description available
	WorkspaceConnectGithubAccountToWorkspace = PermissionKey(uuid.Must(uuid.FromString("410b2d3c-8194-44d1-9f80-7b5fea689b4f")))

	// ConnectionsViewConnections - View all connections within an environment
	ConnectionsViewConnections = PermissionKey(uuid.Must(uuid.FromString("b35c9ce0-e787-4de6-8560-631007b0b947")))

	// EnvironmentsViewEnvironment - See all environments within an workspace.
	EnvironmentsViewEnvironment = PermissionKey(uuid.Must(uuid.FromString("e3656bbc-fba2-483d-9996-34f8614cd21b")))

	// EnvironmentsCreateEnvironment - Create a new environment
	EnvironmentsCreateEnvironment = PermissionKey(uuid.Must(uuid.FromString("a97b7f3b-3349-4a86-b917-2ce0b64a540b")))

	// EnvironmentsDeleteEnvironment - Dissolve environment and all connection memberships. Leave associated resources intact.
	EnvironmentsDeleteEnvironment = PermissionKey(uuid.Must(uuid.FromString("70747966-dfad-4523-93ce-bd7421258955")))

	// EnvironmentsEditEnvironment - Edit environment and it connection membership
	EnvironmentsEditEnvironment = PermissionKey(uuid.Must(uuid.FromString("145ab6ed-b4b6-4e34-ada5-78dada250f89")))

	// EnvironmentsAssignConnectionsToEnvironment - Add new connections to environments
	EnvironmentsAssignConnectionsToEnvironment = PermissionKey(uuid.Must(uuid.FromString("52cbe0b8-9aa7-4605-8eed-aa37e595adbb")))

	// EnvironmentsRemoveConnectionsFromEnvironments - Remove connections from environment, 
	EnvironmentsRemoveConnectionsFromEnvironments = PermissionKey(uuid.Must(uuid.FromString("65648682-e47f-43d7-a5ad-dc042803f951")))

	// CatalogViewCatalog - View all items in catalog
	CatalogViewCatalog = PermissionKey(uuid.Must(uuid.FromString("0cd05106-36b6-4393-a08e-4222fc10c8de")))

	// CatalogDeleteCatalogItems - Delete catalog items
	CatalogDeleteCatalogItems = PermissionKey(uuid.Must(uuid.FromString("3264c9e7-d172-4b9f-bb5d-fe1bda1cdb20")))

	// CatalogEditCatalogItems - Edit catalog items
	CatalogEditCatalogItems = PermissionKey(uuid.Must(uuid.FromString("86a43f77-9e7d-441a-8fc5-68ea521ea43a")))

	// CatalogUnpublishCatalogItems - Unpublish items from catalog
	CatalogUnpublishCatalogItems = PermissionKey(uuid.Must(uuid.FromString("03824b03-a61e-403a-b17f-d8f4aea854d2")))

	// CatalogDetailsOfCatalogItem - Set item information or details of a catalog item
	CatalogDetailsOfCatalogItem = PermissionKey(uuid.Must(uuid.FromString("a52ee7bd-496c-4877-830e-f8812cd8d4b7")))

	// CatalogDownloadCatalogItem - Download a catalog item
	CatalogDownloadCatalogItem = PermissionKey(uuid.Must(uuid.FromString("7b04ebf8-744e-426f-8075-828cdfe44d51")))

	// CatalogCloneCatalogItem - Clone any item from catalog
	CatalogCloneCatalogItem = PermissionKey(uuid.Must(uuid.FromString("091e083b-78ae-4f03-b028-e36354460c5b")))

	// CurriculaViewAcademyContent - Browse the public catalog of learning paths, challenges, and certifications.
	CurriculaViewAcademyContent = PermissionKey(uuid.Must(uuid.FromString("40eb4949-ca16-4b7b-a9ae-4fe18f26fe1d")))

	// AdministrationAccessTheAcademyConsole - View and assess the performance of learners and of your organization's academy content.
	AdministrationAccessTheAcademyConsole = PermissionKey(uuid.Must(uuid.FromString("045fad17-d2cc-46e8-bb10-f9ee026c799f")))

	// AcademyInstructorConsoleGuideAComprehensiveGuideToUsingTheInstructorConsoleLearnHowToTrackLearnerProgressAnalyzeTestPerformanceAndManageYourAcademySContentAndMetrics - No description available
	AcademyInstructorConsoleGuideAComprehensiveGuideToUsingTheInstructorConsoleLearnHowToTrackLearnerProgressAnalyzeTestPerformanceAndManageYourAcademySContentAndMetrics = PermissionKey(uuid.Must(uuid.FromString("045fad17-d2cc-46e8-bb10-f9ee026c799f")))

	// ChallengesViewChallenges - View all challenges
	ChallengesViewChallenges = PermissionKey(uuid.Must(uuid.FromString("5996d6c9-4037-404c-af83-92a0895ff7f0")))

	// CertificationCreateCertifications - No description available
	CertificationCreateCertifications = PermissionKey(uuid.Must(uuid.FromString("efd922b6-daff-4857-aaee-840637a5f696")))

	// EnterpriseApiWebhooks - Layer5 Cloud uses webhooks to automate approval flows and email notifications. This guide will help you customize and add your own custom webhooks.
	EnterpriseApiWebhooks = PermissionKey(uuid.Must(uuid.FromString("df2c9b99-fad3-405b-9733-6cf10e1909ed")))

	// CloudApiRestApiUserDocumentation - Provides a powerful and flexible way to interact with the platform, enabling automation, integration, and customization to optimize your cloud native development and management processes.
	CloudApiRestApiUserDocumentation = PermissionKey(uuid.Must(uuid.FromString("90c75125-6506-496b-8704-91bf74532bd2")))

	// CloudApiRestApiReference - Provides a powerful and flexible way to interact with the platform, enabling automation, integration, and customization to optimize your cloud native development and management processes.
	CloudApiRestApiReference = PermissionKey(uuid.Must(uuid.FromString("776ec711-26aa-47b1-a822-b1b14192b1e7")))

	// WhiteLabelWhiteLabel - Customize the appearance and branding of your engineering platform powered by Layer5 Cloud.
	WhiteLabelWhiteLabel = PermissionKey(uuid.Must(uuid.FromString("a27a55af-b71b-400f-a8b1-3f3b1afff4f6")))

	// CommunitySupportCommunitySupport - Get help with most of your Meshery questions and issues in our Community Forum.
	CommunitySupportCommunitySupport = PermissionKey(uuid.Must(uuid.FromString("1ae12fbe-32d9-46ef-9ae6-897f9a0017d6")))

	// StandardSupportStandardSupport - Layer5 Support can help you troubleshoot issues you run into while using Meshery. Get support via the web.
	StandardSupportStandardSupport = PermissionKey(uuid.Must(uuid.FromString("e2131b18-fe30-47c2-84e7-0207bdc89f0e")))

	// PremiumAndPremiumPlusSupportPremiumAndPremiumPlusSupport - With Premium, get a 30-minute SLA and 24/7 web and phone support. With Premium Plus, get everything in Premium plus your own Support Account Manager and more.
	PremiumAndPremiumPlusSupportPremiumAndPremiumPlusSupport = PermissionKey(uuid.Must(uuid.FromString("e49c8c16-58e5-465e-be6d-a81b115c31ee")))

	// SelfHostedDeploymentSelfHostedDeployment - Self-hosted Layer5 Cloud for on-prem appliances or self-managed cloud tenants. Keep your Kanvas designs internal to your workplace. Get remote support from Layer5 when you need it.
	SelfHostedDeploymentSelfHostedDeployment = PermissionKey(uuid.Must(uuid.FromString("3e0aa2da-ca58-4109-a0cc-0dece0ec47c3")))

	// PhoneSupportPhoneSupport - Layer5 Support can help you troubleshoot issues you run into while using Meshery. Get support via phone.
	PhoneSupportPhoneSupport = PermissionKey(uuid.Must(uuid.FromString("4e7cf974-7f6e-461c-989b-1176f2d46448")))

	// InvoiceBillingPayBillsViaInvoiceRatherThanUsingYourCreditCard - No description available
	InvoiceBillingPayBillsViaInvoiceRatherThanUsingYourCreditCard = PermissionKey(uuid.Must(uuid.FromString("f2d10bd7-62e3-4cc1-b376-a19e29d73b40")))

	// TrafficCaptureFacilitateANetworkTapOfAnyRequestTraffic - No description available
	TrafficCaptureFacilitateANetworkTapOfAnyRequestTraffic = PermissionKey(uuid.Must(uuid.FromString("5e5c5f1e-8bf5-4eaa-8f4e-78e7fabf857e")))

	// TrafficConfigurationVisualDefinitionsOfTrafficRules - No description available
	TrafficConfigurationVisualDefinitionsOfTrafficRules = PermissionKey(uuid.Must(uuid.FromString("9468ef99-04c5-43dc-b188-bd8fe03e4564")))

	// TrafficFiltersDynamicLoadUnloadOfWasmFilters - No description available
	TrafficFiltersDynamicLoadUnloadOfWasmFilters = PermissionKey(uuid.Must(uuid.FromString("cf3355b2-5bbc-43db-b464-4eb3a4c1a7c1")))

	// TrafficFiltersConfigurationOfWasmFilters - No description available
	TrafficFiltersConfigurationOfWasmFilters = PermissionKey(uuid.Must(uuid.FromString("a921366e-f158-479c-bfa7-6b8ec38016da")))

	// FeatureFlaggingViaWasmFilter - No description available
	FeatureFlaggingViaWasmFilter = PermissionKey(uuid.Must(uuid.FromString("aef9dd7f-139f-497c-b601-41177a054f2a")))

	// CanaryRolloutFlaggerIntegration - No description available
	CanaryRolloutFlaggerIntegration = PermissionKey(uuid.Must(uuid.FromString("9278cea4-ff9b-4d76-a2e8-5002059aba05")))

	// CanaryRolloutArgoIntegration - No description available
	CanaryRolloutArgoIntegration = PermissionKey(uuid.Must(uuid.FromString("5d1e560b-d56c-4a56-b5f4-35ea18ab7a83")))

	// ClientLibraryMigrationGolangNativeExponentialBackoff - No description available
	ClientLibraryMigrationGolangNativeExponentialBackoff = PermissionKey(uuid.Must(uuid.FromString("ec9db4e8-671e-41ff-a0de-842c25d6f421")))

	// ClientLibraryMigrationGokit - No description available
	ClientLibraryMigrationGokit = PermissionKey(uuid.Must(uuid.FromString("1b3e39ba-8d44-4d93-bd3c-202f6d111912")))

	// ClientLibraryMigrationSpringBoot - No description available
	ClientLibraryMigrationSpringBoot = PermissionKey(uuid.Must(uuid.FromString("39f0cb17-0d30-41c0-b305-04dd63f546cb")))

	// ClientLibraryMigrationHystrix - No description available
	ClientLibraryMigrationHystrix = PermissionKey(uuid.Must(uuid.FromString("d65229d7-341b-4986-8f1f-8dfb1673b909")))

	// BestPracticesAnalyzerOpenListOfBestPracticesForIstio - Open list of best practices for Istio
	BestPracticesAnalyzerOpenListOfBestPracticesForIstio = PermissionKey(uuid.Must(uuid.FromString("2af886a2-c2a2-44e9-ba62-ba256c7634b0")))

	// BestPracticesAnalyzerProprietaryListOfBestPracticesForIstio - Proprietary list of best practices for Istio
	BestPracticesAnalyzerProprietaryListOfBestPracticesForIstio = PermissionKey(uuid.Must(uuid.FromString("46f00b76-06ae-4b5c-9df5-3311e9fc4823")))

	// PatternSupportIstioVirtualservice - VirtualService
	PatternSupportIstioVirtualservice = PermissionKey(uuid.Must(uuid.FromString("9a84a5d0-0a16-11ee-be56-0242ac120002")))

	// PatternSupportIstioDestinationrule - DestinationRule
	PatternSupportIstioDestinationrule = PermissionKey(uuid.Must(uuid.FromString("12c5dbca-cdb4-4554-8a71-8c67c118071d")))

	// PatternSupportIstioMtlsPeerauthentication - mTLS (PeerAuthentication)
	PatternSupportIstioMtlsPeerauthentication = PermissionKey(uuid.Must(uuid.FromString("2e66a6b3-7ed5-4010-b1d2-f4d7035f0991")))

	// PatternSupportIstioAutomaticSidecarInjectionOnANamespace - Automatic Sidecar Injection on a Namespace
	PatternSupportIstioAutomaticSidecarInjectionOnANamespace = PermissionKey(uuid.Must(uuid.FromString("21bd0f2b-0ab6-4aac-a1aa-e4a02eb66b3c")))

	// PatternSupportIstioSidecars - Sidecars
	PatternSupportIstioSidecars = PermissionKey(uuid.Must(uuid.FromString("34b68c99-8ef9-4542-8c34-bf7587bfa1b0")))

	// PatternSupportIstioAuthorizationpolicy - AuthorizationPolicy
	PatternSupportIstioAuthorizationpolicy = PermissionKey(uuid.Must(uuid.FromString("d2eef103-0a0d-471f-b262-46af4f620826")))

	// PatternSupportIstioEnvoyfilters - EnvoyFilters
	PatternSupportIstioEnvoyfilters = PermissionKey(uuid.Must(uuid.FromString("c4b1a799-0ab0-4262-b832-9a3d53cfd185")))

	// PatternSupportIstioPeerauthentication - PeerAuthentication
	PatternSupportIstioPeerauthentication = PermissionKey(uuid.Must(uuid.FromString("b8a9ad4b-1ee2-4460-a8c8-2d55fe47bbfd")))

	// PatternSupportIstioIstioOperator - Istio Operator
	PatternSupportIstioIstioOperator = PermissionKey(uuid.Must(uuid.FromString("2209d9a6-c93b-4db1-894e-fdaacfcfc2d8")))

	// PatternSupportIstioIngressGatewayGateways - Ingress Gateway (Gateways)
	PatternSupportIstioIngressGatewayGateways = PermissionKey(uuid.Must(uuid.FromString("00b3c489-b923-40e4-aba7-8742aed3c63c")))

	// PatternSupportIstioEgressGatewayGateways - Egress Gateway (Gateways)
	PatternSupportIstioEgressGatewayGateways = PermissionKey(uuid.Must(uuid.FromString("3c22fb24-e768-4000-a6f4-1bf1b9a1aa83")))

	// PatternSupportIstioAddOnPrometheus - Add-on: Prometheus
	PatternSupportIstioAddOnPrometheus = PermissionKey(uuid.Must(uuid.FromString("a4d06ed9-958d-4a04-8d56-6658ebb9529e")))

	// PatternSupportIstioAddOnKiali - Add-on: Kiali
	PatternSupportIstioAddOnKiali = PermissionKey(uuid.Must(uuid.FromString("bcbc9ee9-cde6-4671-9317-bedd655dde83")))

	// PatternSupportIstioAddOnGrafana - Add-on: Grafana
	PatternSupportIstioAddOnGrafana = PermissionKey(uuid.Must(uuid.FromString("d64b7b6b-5931-4b61-85a1-664d62da8ffe")))

	// PatternSupportIstioAddOnZipkin - Add-on: Zipkin
	PatternSupportIstioAddOnZipkin = PermissionKey(uuid.Must(uuid.FromString("e1d939c7-de43-4d85-8ad4-eaada093467d")))

	// PatternSupportIstioAddOnJaeger - Add-on: Jaeger
	PatternSupportIstioAddOnJaeger = PermissionKey(uuid.Must(uuid.FromString("0054fc37-636d-46d4-b5b9-b0f8c20b777c")))

	// PatternSupportIstioCustomConfiguration - Custom Configuration
	PatternSupportIstioCustomConfiguration = PermissionKey(uuid.Must(uuid.FromString("2e32a426-c5a4-4ae3-83f1-1bd53b3adbe4")))

	// PatternSupportKubernetesIngress - Ingress
	PatternSupportKubernetesIngress = PermissionKey(uuid.Must(uuid.FromString("08872df8-e557-4cf2-85ce-1699a5ef5a65")))

	// MultiMeshCanaryRollout - Canary Rollout
	MultiMeshCanaryRollout = PermissionKey(uuid.Must(uuid.FromString("7258df9f-72d1-4491-9f06-a1e5fccbf3a4")))

	// ChangeManagementSingleAndMultipleApprovers - No description available
	ChangeManagementSingleAndMultipleApprovers = PermissionKey(uuid.Must(uuid.FromString("8b8b8eb2-00d5-4501-8c94-529f1b0b0f27")))

	// InProductInsightShoppingCartBasedRealTimeDiscount - No description available
	InProductInsightShoppingCartBasedRealTimeDiscount = PermissionKey(uuid.Must(uuid.FromString("b1e81301-0726-4d62-a920-c10ee5d563b0")))

	// ServerlessPricingServerlessPricing - Subscription plan management. Transformation of workflow pricing model.
	ServerlessPricingServerlessPricing = PermissionKey(uuid.Must(uuid.FromString("15d6ae21-7618-4511-afb8-044b7cd8249d")))

	// InProductInsightLikePendoTellingUsersWhatTheyAreMissingHowToUseTheProduct - No description available
	InProductInsightLikePendoTellingUsersWhatTheyAreMissingHowToUseTheProduct = PermissionKey(uuid.Must(uuid.FromString("41239cec-2e8b-48d8-959b-f595f9bcf3ab")))

	// SyntheticsSimple - No description available
	SyntheticsSimple = PermissionKey(uuid.Must(uuid.FromString("fd9752ed-ce05-41b7-953c-e841e2697ae9")))

	// SyntheticsAdvanced - No description available
	SyntheticsAdvanced = PermissionKey(uuid.Must(uuid.FromString("488d1bf0-44dc-401b-a1c6-dfe0e334891f")))

	// ScreenshotsScreenshots - Capture and share visual snapshots of your work with ease using our Screenshots feature.
	ScreenshotsScreenshots = PermissionKey(uuid.Must(uuid.FromString("dfe77e40-9263-4345-9288-4da24f0352ba")))

	// NotificationCenterEventsReportingOfAsynchronousEvents - No description available
	NotificationCenterEventsReportingOfAsynchronousEvents = PermissionKey(uuid.Must(uuid.FromString("2ccbcdf6-5aa0-43f2-b725-80e14003fc0b")))

	// AuditTrailAuditTrail - Detailed accounting of user activity. Historical record or each action taken.
	AuditTrailAuditTrail = PermissionKey(uuid.Must(uuid.FromString("27e30849-3184-4dd3-b9c3-17ce256c088e")))

	// AlertGenerationAlertGeneration - Dismiss individual; Dismiss bulk.
	AlertGenerationAlertGeneration = PermissionKey(uuid.Must(uuid.FromString("92bb8a04-8eb2-4486-bef9-1895ee6d6364")))

	// AlertGenerationPolicyBased - No description available
	AlertGenerationPolicyBased = PermissionKey(uuid.Must(uuid.FromString("41897757-9d14-42df-b21d-aed6f83b2743")))

	// AlertGenerationSlackNotifications - Threaded Slack Notifications
	AlertGenerationSlackNotifications = PermissionKey(uuid.Must(uuid.FromString("9f5250ff-c67b-432f-95bc-e2f369f45a47")))

	// EventCorrelationPolicyBased - No description available
	EventCorrelationPolicyBased = PermissionKey(uuid.Must(uuid.FromString("9eb56700-766d-470b-bd0e-3d419bba13d1")))

	// CalendaringMesheryCloudNative - No description available
	CalendaringMesheryCloudNative = PermissionKey(uuid.Must(uuid.FromString("d936a286-cc39-4fd2-9b55-ff2179d9e11b")))

	// CalendaringIntegrationWGsuite - No description available
	CalendaringIntegrationWGsuite = PermissionKey(uuid.Must(uuid.FromString("3b03ce99-e380-4ee7-888d-adb7c076d4b8")))

	// CalendaringIntegrationWMicrosoftOutlook - No description available
	CalendaringIntegrationWMicrosoftOutlook = PermissionKey(uuid.Must(uuid.FromString("83d4bc06-3e41-452f-bdb7-30a542330923")))

	// AlertIntegrationDatadog - No description available
	AlertIntegrationDatadog = PermissionKey(uuid.Must(uuid.FromString("c0629e3a-767d-4ad2-9b75-219b08fd970a")))

	// TrafficCaptureEventRecording - No description available
	TrafficCaptureEventRecording = PermissionKey(uuid.Must(uuid.FromString("6d2799b7-640c-4ae9-8a37-2564077cc525")))

	// TrafficReplayEventReplay - No description available
	TrafficReplayEventReplay = PermissionKey(uuid.Must(uuid.FromString("3449fa41-bd7d-41c1-9533-af11d9eaff72")))

	// TrafficReplayTrafficReplay - Visual event replay in Kanvas
	TrafficReplayTrafficReplay = PermissionKey(uuid.Must(uuid.FromString("8f6d3691-e7ce-46fc-9311-b51447c3a54e")))

	// DiagnosticsComponentLogging - No description available
	DiagnosticsComponentLogging = PermissionKey(uuid.Must(uuid.FromString("1a10bf40-e17c-4498-8131-f54268eb870b")))

	// MeshmonkeyLibraryOfExperiments - No description available
	MeshmonkeyLibraryOfExperiments = PermissionKey(uuid.Must(uuid.FromString("599efa8b-0249-465b-8e68-bf65dcd58f72")))

	// MeshmonkeyAsWasmFilters - No description available
	MeshmonkeyAsWasmFilters = PermissionKey(uuid.Must(uuid.FromString("6060683b-fe85-4ae4-9cf7-97e6eeab1d4f")))

	// MeshmonkeyAsSidecars - No description available
	MeshmonkeyAsSidecars = PermissionKey(uuid.Must(uuid.FromString("c9bf2c2b-5095-49ac-9f78-8369e78e69a6")))

	// MeshmonkeyAsDaemonsets - No description available
	MeshmonkeyAsDaemonsets = PermissionKey(uuid.Must(uuid.FromString("b73d71ec-f5b2-4d0b-83de-6e2dccff5041")))

)

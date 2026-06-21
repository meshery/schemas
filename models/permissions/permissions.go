// Package permissions contains auto-generated permission key constants.
// This file is generated from permissions.csv - DO NOT EDIT MANUALLY.
// To regenerate, run: node build/generate-permission-golang.js
package permissions
import "github.com/google/uuid"

// Index ID used to generate this file
const IndexID = "8d7905beb07904185485104a47bb9916237daee1dc5573a431103fa4391a8170"


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
	// AccountManagementViewProfile - View your profile.
	AccountManagementViewProfile = PermissionKey(uuid.MustParse("fa7de118-2d08-4b07-b9d7-3e0baead6d04"))

	// AccountManagementEditAccount - Update details of your user account.
	AccountManagementEditAccount = PermissionKey(uuid.MustParse("f5e6bb39-c89a-4172-86f9-14a4a59792c1"))

	// AccountManagementResetPasword - Perform a password reset for your user account.
	AccountManagementResetPasword = PermissionKey(uuid.MustParse("ec8a4b2e-8323-4a96-86ef-ec7be8f58ef1"))

	// AccountManagementDeleteAccount - Delete your user account.
	AccountManagementDeleteAccount = PermissionKey(uuid.MustParse("bbcb024b-78eb-48b0-8e99-f74d3862fe0f"))

	// AccountManagementConnectYourGithubAccount - Link your social sign-in with GitHub to your existing user account.
	AccountManagementConnectYourGithubAccount = PermissionKey(uuid.MustParse("9ea3070a-f2a4-4655-8660-5dba692f3138"))

	// AccountManagementConnectYourGoogleAccount - Link your social sign-in with Google to your existing user account.
	AccountManagementConnectYourGoogleAccount = PermissionKey(uuid.MustParse("bab2c574-d4e8-4e1e-a9f8-48c10be66b62"))

	// AccountManagementViewSubcription - List and see details of active and inactive subscriptions.
	AccountManagementViewSubcription = PermissionKey(uuid.MustParse("9098e61d-deaa-43da-960c-1bc3d5a00495"))

	// AccountManagementManageSubcriptions - Create new subscriptions and update existing subscriptions
	AccountManagementManageSubcriptions = PermissionKey(uuid.MustParse("01462c43-dfa8-4a5e-805a-267c9b0ec7ec"))

	// AccountManagementViewPlans - Explore subscription plans and compare their features.
	AccountManagementViewPlans = PermissionKey(uuid.MustParse("1907bd7a-5055-4e9b-98f6-7e8b720af887"))

	// CatalogManagementDeployDesign - Export a copy of a design to your local system.
	CatalogManagementDeployDesign = PermissionKey(uuid.MustParse("7a7d3cad-4cf4-48fa-b69c-e6a5abc97a07"))

	// CatalogManagementShareDesign - Share design with anyone within your organization, and make your design easily accessible to all relevant team members.
	CatalogManagementShareDesign = PermissionKey(uuid.MustParse("d9ae2b08-762f-418f-916f-43de736b53e2"))

	// CatalogManagementCloneDesign - Clone any published design to customise it according to your use cases
	CatalogManagementCloneDesign = PermissionKey(uuid.MustParse("94a12f80-3c45-4a1f-afb2-a68b909d0d7f"))

	// CatalogManagementOpenInPlayground - Opens design in a Kanvas (currently, specifically in the playground.meshery.io Kanvas)
	CatalogManagementOpenInPlayground = PermissionKey(uuid.MustParse("c4d6c676-6e26-4b0c-9fdd-5eea1b780e98"))

	// CatalogManagementViewApplications - No description available
	CatalogManagementViewApplications = PermissionKey(uuid.MustParse("bfb200b6-0ba9-4783-95d4-eaf1c8fe004c"))

	// CatalogManagementViewDesigns - View all public and published designs of other team members and private of signed-in user
	CatalogManagementViewDesigns = PermissionKey(uuid.MustParse("3798736d-1f5d-41b3-876f-f3f01453dd15"))

	// CatalogManagementViewFilters - View all public and published filters of other team members and private of signed-in user
	CatalogManagementViewFilters = PermissionKey(uuid.MustParse("df41c45f-7c73-49c2-a055-0584fdcec1c1"))

	// CatalogManagementViewCatalogRequests - View the catalog publication request queue
	CatalogManagementViewCatalogRequests = PermissionKey(uuid.MustParse("30b68d69-d199-48fd-b4ff-54b5282c5c03"))

	// CatalogManagementApproveCatalogRequest - Approve catalog publication requests
	CatalogManagementApproveCatalogRequest = PermissionKey(uuid.MustParse("66fbc8c0-b08a-494b-8c60-68ee1b607176"))

	// CatalogManagementDenyCatalogRequest - Deny catalog publication requests
	CatalogManagementDenyCatalogRequest = PermissionKey(uuid.MustParse("b9137717-a20a-44e8-a2f9-94dc3d1a6dcb"))

	// CatalogManagementViewPrivateDesigns - View private designs of the org
	CatalogManagementViewPrivateDesigns = PermissionKey(uuid.MustParse("bedb8e5b-56bf-4caf-9e8b-258d30b9229b"))

	// CatalogManagementViewPublicDesigns - View public designs of the org
	CatalogManagementViewPublicDesigns = PermissionKey(uuid.MustParse("3f7cfb90-4267-4acf-868d-6ca0c24fb774"))

	// CatalogManagementViewPublishedDesigns - View published designs of the org
	CatalogManagementViewPublishedDesigns = PermissionKey(uuid.MustParse("061e6194-d398-4d7e-94be-3a8bbf019b69"))

	// CatalogManagementCreateNewDesign - Create new Meshery design
	CatalogManagementCreateNewDesign = PermissionKey(uuid.MustParse("14bd933e-83b7-464d-9a4d-d8c8eb9682ab"))

	// CatalogManagementImportDesign - Import a design
	CatalogManagementImportDesign = PermissionKey(uuid.MustParse("cc040d21-3160-4a96-8efa-833487a234cd"))

	// CatalogManagementExportDesign - Export a design in source type format (Kubernetes Manifest, Helm Chart, Docker Compose)
	CatalogManagementExportDesign = PermissionKey(uuid.MustParse("9a783f51-3b4a-47a6-a02e-b0db9e78cd85"))

	// CatalogManagementPublishDesign - Publish a design
	CatalogManagementPublishDesign = PermissionKey(uuid.MustParse("9e66bdec-4177-42f9-8cec-d9eb52a12c38"))

	// CatalogManagementUnpublishDesign - Unpublish a design
	CatalogManagementUnpublishDesign = PermissionKey(uuid.MustParse("c1595c90-b85b-4ac7-b921-f08959926db3"))

	// CatalogManagementValidateDesign - Validate a design
	CatalogManagementValidateDesign = PermissionKey(uuid.MustParse("da5339dd-a4bc-4b91-8865-d8a703656516"))

	// CatalogManagementUndeployDesign - Retract all resources used in a Meshery design from the cluster
	CatalogManagementUndeployDesign = PermissionKey(uuid.MustParse("16b11ffa-7b92-4666-a0ff-191df9cd18b2"))

	// CatalogManagementDetailsOfDesign - Set design information or details of a design
	CatalogManagementDetailsOfDesign = PermissionKey(uuid.MustParse("10a03036-53a0-40b3-9f69-6daab852e434"))

	// CatalogManagementEditDesign - Edit a design
	CatalogManagementEditDesign = PermissionKey(uuid.MustParse("7f2b7084-4533-4824-b688-50cf35de7ef8"))

	// CatalogManagementDeleteADesign - Delete a design
	CatalogManagementDeleteADesign = PermissionKey(uuid.MustParse("f024fcf7-3c3d-4521-b83e-6d659353ca0e"))

	// CatalogManagementEvaluateRelationships - Evaluate relationships inside a design
	CatalogManagementEvaluateRelationships = PermissionKey(uuid.MustParse("c7752be7-5c0f-465d-a8ba-5594acd08b93"))

	// CatalogManagementDownloadADesign - Download a Meshery design in OCI or YAML format
	CatalogManagementDownloadADesign = PermissionKey(uuid.MustParse("64de96b7-60db-4aab-b311-afc64066b2c4"))

	// CatalogManagementImportFilter - Import a filter
	CatalogManagementImportFilter = PermissionKey(uuid.MustParse("cb79d7fb-19de-45fa-aaf5-0a0afc832bf8"))

	// CatalogManagementPublishWasmFilter - Publish WASM Filter
	CatalogManagementPublishWasmFilter = PermissionKey(uuid.MustParse("173d99b7-3820-4c0c-88b2-a8455bd7a6b5"))

	// CatalogManagementUnpublishWasmFilter - Unpublish WASM Filter
	CatalogManagementUnpublishWasmFilter = PermissionKey(uuid.MustParse("773f0a4d-ba04-40ed-9298-59ac8749804a"))

	// CatalogManagementDownloadAWasmFilter - Download a WASM filter
	CatalogManagementDownloadAWasmFilter = PermissionKey(uuid.MustParse("24325b2c-5e08-4ba8-809f-8a4a1bf91084"))

	// CatalogManagementDetailsOfWasmFilter - Check information or details of a WASM filter
	CatalogManagementDetailsOfWasmFilter = PermissionKey(uuid.MustParse("86c457b5-b9ec-4223-af1f-30a5be67d69d"))

	// CatalogManagementEditWasmFilter - Edit WASM filter
	CatalogManagementEditWasmFilter = PermissionKey(uuid.MustParse("88cd144e-806e-472a-a31a-ef6d64643291"))

	// CatalogManagementCloneWasmFilter - Clone WASM filter from catalog, which allows customizing filter and use it in design
	CatalogManagementCloneWasmFilter = PermissionKey(uuid.MustParse("c84718ca-7479-4ad9-a2b7-a5784baa51fb"))

	// CatalogManagementDeleteWasmFilter - Delete WASM filter permanently from catalog.
	CatalogManagementDeleteWasmFilter = PermissionKey(uuid.MustParse("9225d5a7-7255-49be-9233-daeabefae306"))

	// CollaborationInviteAnyMesheryCloudUserOrAllMesheryUsers - Invite any Meshery Cloud user, or all Meshery users, to work with you on a public design that control – including making changes and releasing new versions.
	CollaborationInviteAnyMesheryCloudUserOrAllMesheryUsers = PermissionKey(uuid.MustParse("ccc4bc8d-f484-42b3-8a62-2667284605c3"))

	// CollaborationInviteAnyMesheryCloudUserToOnAPrivateDesign - Invite any Meshery Cloud user to work with you on a private design that control – including making changes and releasing new versions.
	CollaborationInviteAnyMesheryCloudUserToOnAPrivateDesign = PermissionKey(uuid.MustParse("e28b851f-9a49-4ecf-a86e-493db1a27540"))

	// CollaborationMessageInRealTime - Message in real-time, unattached to a specific design. Control who can pariticpate in the discussion.
	CollaborationMessageInRealTime = PermissionKey(uuid.MustParse("c42d08b2-c3e0-47b6-9e47-cfb149c0a5af"))

	// CollaborationDiscussAnyDesignByLeavingReviewComments - Discuss any design by leaving review comments or notes on a specific design. Control who has access, notify discussion participants with updates, and link from anywhere.
	CollaborationDiscussAnyDesignByLeavingReviewComments = PermissionKey(uuid.MustParse("da5adf96-9fb5-49b2-a55e-dec9c9c4acba"))

	// CollaborationManageAccessToDesigns - Manage access to designs on a team-by-team, or individual user, basis.
	CollaborationManageAccessToDesigns = PermissionKey(uuid.MustParse("7a17c8d3-bba2-474b-bb1e-be5b5eee5dad"))

	// CollaborationCreateAndCollaborateInOnlineDesignsInRealTime - Create and collaborate in online designs in real-time.
	CollaborationCreateAndCollaborateInOnlineDesignsInRealTime = PermissionKey(uuid.MustParse("d5267c04-b3ee-43fe-8b97-2a3321eb7f8e"))

	// ContentCatalogIstioVirtualServiceDestinationRules - No description available
	ContentCatalogIstioVirtualServiceDestinationRules = PermissionKey(uuid.MustParse("81e90a7a-fac7-40d1-bf7d-e8250d36fe5d"))

	// ContentCatalogConsul - No description available
	ContentCatalogConsul = PermissionKey(uuid.MustParse("bb345c3a-22f0-4377-8f55-8f6ebef5524d"))

	// ContentCatalogKuma - No description available
	ContentCatalogKuma = PermissionKey(uuid.MustParse("425d0113-0363-48fb-9698-4f392a4b7b48"))

	// EventManagementViewStatistics - No description available
	EventManagementViewStatistics = PermissionKey(uuid.MustParse("d5fd3a6f-23a6-429c-b9b3-7ffa75d3f381"))

	// EventsManagementViewEvents - No description available
	EventsManagementViewEvents = PermissionKey(uuid.MustParse("4fe3e6b9-3363-4e9d-bfd4-9cd5bd168e5a"))

	// EventsManagementViewSummary - No description available
	EventsManagementViewSummary = PermissionKey(uuid.MustParse("82c04345-f7ba-4696-bddd-da7bd0046f38"))

	// EventsManagementViewAudit - No description available
	EventsManagementViewAudit = PermissionKey(uuid.MustParse("80bb9c66-0657-49ff-a064-667e9875bb3f"))

	// ExtensibilityDynamicInjectionViaRemoteProvider - No description available
	ExtensibilityDynamicInjectionViaRemoteProvider = PermissionKey(uuid.MustParse("aee2b910-ab6b-4af5-b405-38fdbe11790d"))

	// ExtensibilityNamespacedCustomEndpoints - No description available
	ExtensibilityNamespacedCustomEndpoints = PermissionKey(uuid.MustParse("ee6562f9-eb5e-4978-9239-fc1ac18a06a2"))

	// ExtensibilitySwaggerIntegration - No description available
	ExtensibilitySwaggerIntegration = PermissionKey(uuid.MustParse("045f4c47-95d7-4ee7-923e-b069faa75640"))

	// ExtensibilityNamespacedCustomResolvers - No description available
	ExtensibilityNamespacedCustomResolvers = PermissionKey(uuid.MustParse("192cd281-234a-4127-b8a8-3e6f10d9e730"))

	// ExtensibilityAdapters - Extend Meshery's capabilities behind a gRPC interface for Model registration and operation invocation
	ExtensibilityAdapters = PermissionKey(uuid.MustParse("65150884-c617-4aa4-bb0f-09dd0532bb83"))

	// ExtensibilityLoadGenerators - No description available
	ExtensibilityLoadGenerators = PermissionKey(uuid.MustParse("d63d7908-0699-4548-8493-bc3cb1b32699"))

	// ExtensibilityAuthentication - No description available
	ExtensibilityAuthentication = PermissionKey(uuid.MustParse("3073abac-9b60-4c9e-b8af-0bc3adeeb5a5"))

	// ExtensibilityAuthorization - No description available
	ExtensibilityAuthorization = PermissionKey(uuid.MustParse("e750108f-7659-48a8-8b24-a811f1852819"))

	// ExtensibilityRemoteProviders - No description available
	ExtensibilityRemoteProviders = PermissionKey(uuid.MustParse("be4505ae-b83e-479f-81f7-8f59eeae251d"))

	// ExtensibilityUserPreferences - No description available
	ExtensibilityUserPreferences = PermissionKey(uuid.MustParse("39da55c3-68eb-4510-a115-bff559e648ef"))

	// ExtensibilityPeerToPeer - Propagate document updates peer-to-peer using WebRTC.
	ExtensibilityPeerToPeer = PermissionKey(uuid.MustParse("66f311bf-6b7e-41ee-bab6-5e671dd2f0e6"))

	// ExtensibilityInstallExtension - Install or enable or disabble extensions in Meshery
	ExtensibilityInstallExtension = PermissionKey(uuid.MustParse("24f41e98-7ce1-40c4-a82d-4ae0294d237d"))

	// ExtensibilityViewMesheryUserPreferences - View all user preferences in Meshery UI
	ExtensibilityViewMesheryUserPreferences = PermissionKey(uuid.MustParse("cdec6212-bbbf-4cab-b10d-76d12bee7e56"))

	// ExtensibilityViewExtensions - View all extensions on the extension page
	ExtensibilityViewExtensions = PermissionKey(uuid.MustParse("c1330df4-1bbe-4d5d-8828-f4bd9ee989e5"))

	// FinancialManagementShowback - No description available
	FinancialManagementShowback = PermissionKey(uuid.MustParse("f1a4d8b0-a4f0-413f-83be-9f7fb9e48a08"))

	// FinancialManagementChargeback - Per service, per authenticated user
	FinancialManagementChargeback = PermissionKey(uuid.MustParse("3a1c684a-dbde-4833-b592-e64f9c35a50e"))

	// GitopsSnapshots - Visual insights in your pull requests in GitLab
	GitopsSnapshots = PermissionKey(uuid.MustParse("81287ea7-5e3f-480c-8b2e-211d62d08797"))

	// GitopsBitbucket - Initiate deployment with creation of pull request
	GitopsBitbucket = PermissionKey(uuid.MustParse("9f236c99-b2ec-4474-9ec8-7c3f8a09e63e"))

	// GitopsGithub - Initiate deployment with creation of pull request
	GitopsGithub = PermissionKey(uuid.MustParse("9f236c99-b2ec-4474-9ec8-7c3f8a09e6aa"))

	// GitopsGitlab - Initiate deployment with creation of pull request
	GitopsGitlab = PermissionKey(uuid.MustParse("9f236c99-b2ec-4474-9ec8-7c3f8a09e6bb"))

	// GitopsArgoevents - Initiate deployment with creation of pull request
	GitopsArgoevents = PermissionKey(uuid.MustParse("81287ea7-5e3f-480c-8b2e-211d62d087c7"))

	// GitopsWebhook - Signal pass or fail: to proceed or rollback a deployment
	GitopsWebhook = PermissionKey(uuid.MustParse("b2b183bd-9aff-469e-9c65-8027b75999aa"))

	// GitopsAssessAndCharacterizeServicePerformance - Signal pass or fail: to proceed or rollback a deployment
	GitopsAssessAndCharacterizeServicePerformance = PermissionKey(uuid.MustParse("b869fa3d-bace-4e7a-9403-99e0b280ed56"))

	// GitopsVerifyConformanceReturnResultsAndGreenRedLight - No description available
	GitopsVerifyConformanceReturnResultsAndGreenRedLight = PermissionKey(uuid.MustParse("995e6bbd-1015-4213-a859-14e983e42e7b"))

	// IdentityAccessManagementImplicitUserImplicitRoleAdmin - No description available
	IdentityAccessManagementImplicitUserImplicitRoleAdmin = PermissionKey(uuid.MustParse("d5591874-986c-471f-8631-0b0d87989b41"))

	// IdentityAccessManagementMultiTenancy - No description available
	IdentityAccessManagementMultiTenancy = PermissionKey(uuid.MustParse("18771b5f-6550-4ef2-ab95-cc7a93a12d16"))

	// IdentityAccessManagementAllowsPreferencesToBeSetPerUser - No description available
	IdentityAccessManagementAllowsPreferencesToBeSetPerUser = PermissionKey(uuid.MustParse("9032e8f8-414e-462c-afa9-81c4e45f3eec"))

	// IdentityAccessManagementBuiltInRoles - Static - out of the box
	IdentityAccessManagementBuiltInRoles = PermissionKey(uuid.MustParse("99d7881c-ca1a-41f9-9c0a-fd36a619a110"))

	// IdentityAccessManagementUserDefinedRoles - Customizable roles for specific permission assignments
	IdentityAccessManagementUserDefinedRoles = PermissionKey(uuid.MustParse("4b46c866-0d9e-43e6-8810-b0f8df9d0f8c"))

	// IdentityAccessManagementEnforcementOfTenancy - No description available
	IdentityAccessManagementEnforcementOfTenancy = PermissionKey(uuid.MustParse("6a31b997-9162-4022-87ae-c031bfba53d5"))

	// IdentityAccessManagementHierarchicalPermissioning - No description available
	IdentityAccessManagementHierarchicalPermissioning = PermissionKey(uuid.MustParse("36372d4f-5aea-4c2e-9938-59d7534bfc1b"))

	// IdentityAccessManagementAuthenticationOauth - No description available
	IdentityAccessManagementAuthenticationOauth = PermissionKey(uuid.MustParse("db96233e-047b-4e2f-b4e3-419c038e4b26"))

	// IdentityAccessManagementAuthenticationLdap - Access Meshery Server using your existing accounts and centrally manage repository access.
	IdentityAccessManagementAuthenticationLdap = PermissionKey(uuid.MustParse("4d7cccf0-1831-4814-a5eb-2358b99c2870"))

	// IdentityAccessManagementAuthenticationSaml - Use an identity provider to manage the identities of GitHub users and applications.
	IdentityAccessManagementAuthenticationSaml = PermissionKey(uuid.MustParse("59a839ba-277c-4e69-a559-2659a355bfa5"))

	// IdentityAccessManagementAzureActiveDirectory - No description available
	IdentityAccessManagementAzureActiveDirectory = PermissionKey(uuid.MustParse("e013aebc-b245-451d-a330-423f629fa072"))

	// IdentityAccessManagementMesheryAsAnIdp - Own and control the user accounts of your enterprise members through your identity provider (IdP).
	IdentityAccessManagementMesheryAsAnIdp = PermissionKey(uuid.MustParse("0b3313eb-5c77-4dba-9074-122cfb01bf55"))

	// IdentityAccessManagementViewUserPublicProfile - See public user profile details, public activities and public resources. 
	IdentityAccessManagementViewUserPublicProfile = PermissionKey(uuid.MustParse("daded1e9-ff0f-4259-86ac-e168fd5565d4"))

	// IdentityAccessManagementViewUserSettings - See private user profile details, private activities and private resources. 
	IdentityAccessManagementViewUserSettings = PermissionKey(uuid.MustParse("e00cae57-6dc6-41ac-b174-f3b01b4adce0"))

	// IdentityAccessManagementViewAllUsers - See all teams within an organization. See all members of all teams.
	IdentityAccessManagementViewAllUsers = PermissionKey(uuid.MustParse("382da488-9a92-4a5b-958d-c4bfe1e80253"))

	// IdentityAccessManagementUpdateUserProfile - Directly create a new user account within a team.
	IdentityAccessManagementUpdateUserProfile = PermissionKey(uuid.MustParse("b9a86a74-d6e9-46e4-abae-fe5235ba0e26"))

	// IdentityAccessManagementInviteUserToTeam - Send a request for a user to join a team.
	IdentityAccessManagementInviteUserToTeam = PermissionKey(uuid.MustParse("d3478829-9281-468e-9d49-f7aa659d0f89"))

	// IdentityAccessManagementRemoveUserFromTeam - Discontinue user membership of a team and team resources.
	IdentityAccessManagementRemoveUserFromTeam = PermissionKey(uuid.MustParse("8b41825f-e840-42bf-81a8-2f962a6d134b"))

	// IdentityAccessManagementCreateTeam - Establish new team for organizing groups of users and resource access.
	IdentityAccessManagementCreateTeam = PermissionKey(uuid.MustParse("8608355a-bf35-4bd6-b339-2384d34ae2ed"))

	// IdentityAccessManagementDeleteTeam - Dissolve a team and all user memberships. Leave associated resources intact.
	IdentityAccessManagementDeleteTeam = PermissionKey(uuid.MustParse("44ce4333-a138-42a3-9695-c6c1fcd2c301"))

	// IdentityAccessManagementDeleteUser - Delete a user account
	IdentityAccessManagementDeleteUser = PermissionKey(uuid.MustParse("8e077f96-c957-478f-aae1-0e96232dc3e7"))

	// IdentityAccessManagementEditUser - Edit user role, name, email etc
	IdentityAccessManagementEditUser = PermissionKey(uuid.MustParse("eb4dff91-a7c6-4167-aa2d-2e81539e6b62"))

	// IdentityAccessManagementCreateUser - Create a new user
	IdentityAccessManagementCreateUser = PermissionKey(uuid.MustParse("032582e1-c406-4c75-8732-4f2ada0191b3"))

	// IdentityAccessManagementLeaveTeam - Leave a team
	IdentityAccessManagementLeaveTeam = PermissionKey(uuid.MustParse("680b9fcb-6d8d-448d-8012-4b792d71c52e"))

	// IdentityAccessManagementViewAllKubernetesClusters - View all configured Kubernetes clusters
	IdentityAccessManagementViewAllKubernetesClusters = PermissionKey(uuid.MustParse("b99a9a0a-2cb9-4be7-8251-14a249e4038e"))

	// IdentityAccessManagementViewTeam - See only teams to which you are a member. See all other members within those teams.
	IdentityAccessManagementViewTeam = PermissionKey(uuid.MustParse("27447fb0-be46-4497-8366-c34e24920f22"))

	// IdentityAccessManagementViewTeams - See all teams of which you are an administrator. See all members of those teams.
	IdentityAccessManagementViewTeams = PermissionKey(uuid.MustParse("6ecbbe79-c392-43bd-b7b6-ecdec019e24c"))

	// IdentityAccessManagementViewAllTeams - See all teams within an organization. See all members of all teams.
	IdentityAccessManagementViewAllTeams = PermissionKey(uuid.MustParse("8b94dd6b-234f-4c89-86cf-b029e0090255"))

	// IdentityAccessManagementAddUserToTeam - Directly create a new user account within a team.
	IdentityAccessManagementAddUserToTeam = PermissionKey(uuid.MustParse("88b9a857-d012-4c6d-a129-4ce65b63b018"))

	// IdentityAccessManagementEditTeam - Edit a team and add new members to it.
	IdentityAccessManagementEditTeam = PermissionKey(uuid.MustParse("6cf69881-0be0-4723-b5f0-031b7847509a"))

	// IdentityAccessManagementRemoveRolesFromTeamMembers - Remove roles from users in a team.
	IdentityAccessManagementRemoveRolesFromTeamMembers = PermissionKey(uuid.MustParse("ed3dbd2d-52f8-4608-87e0-7f2999a4518c"))

	// IdentityAccessManagementAssignRolesToTeamMembers - Assign roles to users in a team
	IdentityAccessManagementAssignRolesToTeamMembers = PermissionKey(uuid.MustParse("06f33eca-950c-4daa-b46d-e73af39e0868"))

	// IdentityAccessManagementOpenTeamInvite - This governs the team's invitation permissions, determining whether the team is allowed to extend invitations to new individuals to join through open invite link.
	IdentityAccessManagementOpenTeamInvite = PermissionKey(uuid.MustParse("6086c0a5-cd79-48ca-8c9f-a0e0ad75343c"))

	// IdentityAccessManagementCreateOrganization - Establish new organization for organizing teams, users, and resource access.
	IdentityAccessManagementCreateOrganization = PermissionKey(uuid.MustParse("17a6fa82-cdab-46db-a7ce-a9d0a1bbf40f"))

	// IdentityAccessManagementEditOrganization - Edit organiaztions and add teams to it
	IdentityAccessManagementEditOrganization = PermissionKey(uuid.MustParse("d39a34fb-0ccf-4c80-8a6c-b545c8db869a"))

	// IdentityAccessManagementAddUserToOrganization - Directly create a new user account within an organization.
	IdentityAccessManagementAddUserToOrganization = PermissionKey(uuid.MustParse("33bf7a57-f787-4208-b01c-ad9b9d9c6b6c"))

	// IdentityAccessManagementInviteUserToOrganization - Send a request for a user to join an organization.
	IdentityAccessManagementInviteUserToOrganization = PermissionKey(uuid.MustParse("c8489026-11ab-4753-a445-8e20fc032c38"))

	// IdentityAccessManagementRemoveUserFromOrganization - Discontinue user access to organization, teams and resources; cease billing accrual.
	IdentityAccessManagementRemoveUserFromOrganization = PermissionKey(uuid.MustParse("3ed858e4-418d-4220-9d4c-a217fd466d86"))

	// IdentityAccessManagementPromoteOrDemoteUserToOrgAdmin - Elevate or remove organization level administrative privileges.
	IdentityAccessManagementPromoteOrDemoteUserToOrgAdmin = PermissionKey(uuid.MustParse("0ddd82df-27ed-4781-a91a-ec1dbeb620d0"))

	// IdentityAccessManagementViewOrg - See only organizations to which you are a member. See all other members within your membership teams.
	IdentityAccessManagementViewOrg = PermissionKey(uuid.MustParse("49f02947-0c8d-4b2d-af53-f50ce18f8861"))

	// IdentityAccessManagementViewOrganizations - See all organizations of which you are an administrator. See all members of those organizations.
	IdentityAccessManagementViewOrganizations = PermissionKey(uuid.MustParse("172fa7d3-0d8a-4646-a789-bf64f52ba40b"))

	// IdentityAccessManagementViewAllOrganizations - See all organizations within a Cloud deployment. See all organizations, teams, and users.
	IdentityAccessManagementViewAllOrganizations = PermissionKey(uuid.MustParse("e996c998-a50f-4cb8-ae7b-f2f1b523c971"))

	// IdentityAccessManagementRemoveRolesFromOrganizationMembers - Remove roles from users in an organization
	IdentityAccessManagementRemoveRolesFromOrganizationMembers = PermissionKey(uuid.MustParse("8a003a11-a909-425a-bd23-d8ba14972c89"))

	// IdentityAccessManagementAssignRolesToOrganizationMembers - Assign roles to users in an organization
	IdentityAccessManagementAssignRolesToOrganizationMembers = PermissionKey(uuid.MustParse("0d455711-6205-422b-9de7-05933fe2aeb2"))

	// IdentityAccessManagementTransferOrganizationOwnership - Transfer organization ownership to another member of the organization.
	IdentityAccessManagementTransferOrganizationOwnership = PermissionKey(uuid.MustParse("c81764a3-9fb1-451e-8e80-693cba6f79bf"))

	// IdentityAccessManagementDeleteOrganization - Decommission organization and suspend account from additional accruals.
	IdentityAccessManagementDeleteOrganization = PermissionKey(uuid.MustParse("b3dc083c-fe8e-43a9-9bcd-ed93d4584f55"))

	// IdentityAccessManagementLeaveOrganization - Leave an organization
	IdentityAccessManagementLeaveOrganization = PermissionKey(uuid.MustParse("b249fb5f-bdae-4008-8aa6-862f9d911656"))

	// IdentityAccessManagementCustomDomain - Organizations can be assigned unique, validated custom domains through settings.
	IdentityAccessManagementCustomDomain = PermissionKey(uuid.MustParse("0c9da04b-9b9a-4b97-8c5d-3137df5d684f"))

	// IdentityAccessManagementDomainRoutingAndRemoval - Assigned domains direct user traffic to organizations; clearing the field removes the assignment.
	IdentityAccessManagementDomainRoutingAndRemoval = PermissionKey(uuid.MustParse("88fc2f27-f9b2-42c8-99b5-e36389398796"))

	// IdentityAccessManagementManageRecognitions - Create, update , delete and manage recogntions awarded by your organization
	IdentityAccessManagementManageRecognitions = PermissionKey(uuid.MustParse("0a887b7f-b6c2-4a33-b080-bec9c3894d0c"))

	// IdentityAccessManagementManageInvitations - Create, update , delete and manage invitations to your organization
	IdentityAccessManagementManageInvitations = PermissionKey(uuid.MustParse("0204fb47-b120-4074-83db-984d595d9f69"))

	// IdentityAccessManagementAllOrgSelector - Ability to use all selector to filter view
	IdentityAccessManagementAllOrgSelector = PermissionKey(uuid.MustParse("17447fb0-be46-1497-1366-c34e24920f22"))

	// IdentityAccessManagementRoles - No description available
	IdentityAccessManagementRoles = PermissionKey(uuid.MustParse("9a84a5d0-0a16-11ee-be56-0242ac120002"))

	// IdentityAccessManagementAssignUserRoles - No description available
	IdentityAccessManagementAssignUserRoles = PermissionKey(uuid.MustParse("9a84a76a-0a16-11ee-be56-0242ac120002"))

	// IdentityAccessManagementAssignKeychainsToRoles - No description available
	IdentityAccessManagementAssignKeychainsToRoles = PermissionKey(uuid.MustParse("9a84abb6-0a16-11ee-be56-0242ac120002"))

	// IdentityAccessManagementCreateCustomRoles - No description available
	IdentityAccessManagementCreateCustomRoles = PermissionKey(uuid.MustParse("9a84ad00-0a16-11ee-be56-0242ac120002"))

	// IdentityAccessManagementUpdateCustomRoles - No description available
	IdentityAccessManagementUpdateCustomRoles = PermissionKey(uuid.MustParse("9a84ad07-0a16-11ee-be56-0242ac120002"))

	// IdentityAccessManagementDeleteCustomRoles - Delete a user's role permanently
	IdentityAccessManagementDeleteCustomRoles = PermissionKey(uuid.MustParse("19b3b3a3-7dc9-4e2f-b984-69241ec90fc8"))

	// IdentityAccessManagementExportCustomRoles - No description available
	IdentityAccessManagementExportCustomRoles = PermissionKey(uuid.MustParse("9274af31-5166-4876-ab44-27f458c5082c"))

	// IdentityAccessManagementViewAllAccessRequests - Browse the list of open entitlement requests
	IdentityAccessManagementViewAllAccessRequests = PermissionKey(uuid.MustParse("070153eb-6dd5-4aad-95b4-fb0444c88a89"))

	// IdentityAccessManagementAcceptAccessRequest - Entitle user. Approve access request.
	IdentityAccessManagementAcceptAccessRequest = PermissionKey(uuid.MustParse("afded44a-8b17-4d4d-bfc3-a76eadcc37fe"))

	// IdentityAccessManagementDenyAccessRequest - Restrict user access to requested resource.
	IdentityAccessManagementDenyAccessRequest = PermissionKey(uuid.MustParse("f25bea25-a33b-40e9-9621-bbc30888c11b"))

	// LifecycleManagementDryRun - Test and verify configuration changes in a separate environment.
	LifecycleManagementDryRun = PermissionKey(uuid.MustParse("161c2b67-ce61-4b4d-b47e-38fcd2e87b13"))

	// LifecycleManagementMesheryAdaptersProvisionConfigureAndManage10DifferentServiceMeshes - Istio, Linkerd, Consul, Kuma, Traefik Mesh, AWS App Mesh, NGINX Service Mesh, Network Service Mesh, Cilium Service Mesh, VMware Tanzu Service Mesh
	LifecycleManagementMesheryAdaptersProvisionConfigureAndManage10DifferentServiceMeshes = PermissionKey(uuid.MustParse("9cbc1827-7650-4e5b-8259-0823fd11ba9d"))

	// LifecycleManagementProvisioningDeprovisioning - No description available
	LifecycleManagementProvisioningDeprovisioning = PermissionKey(uuid.MustParse("ad2af8de-e4e6-4e4d-98e0-014220658e23"))

	// LifecycleManagementSimpleConfiguration - MeshOpsv1
	LifecycleManagementSimpleConfiguration = PermissionKey(uuid.MustParse("89bab590-3f0c-44aa-a8f1-04ebb877e506"))

	// LifecycleManagementAdvancedConfiguration - MeshOpsv2
	LifecycleManagementAdvancedConfiguration = PermissionKey(uuid.MustParse("dd6d980c-23f2-4245-9f07-551de833c39a"))

	// LifecycleManagementManagedUpgrades - No description available
	LifecycleManagementManagedUpgrades = PermissionKey(uuid.MustParse("7e0fe9a7-aae0-409a-9eec-08dc2ff2af21"))

	// LifecycleManagementAdHocAddOrRemove - No description available
	LifecycleManagementAdHocAddOrRemove = PermissionKey(uuid.MustParse("2399ea30-118d-4495-93b9-c53c961b5cb7"))

	// LifecycleManagementParseLogs - No description available
	LifecycleManagementParseLogs = PermissionKey(uuid.MustParse("1e927029-59db-4ede-88fc-ec0cb2756a79"))

	// LifecycleManagementExecShell - No description available
	LifecycleManagementExecShell = PermissionKey(uuid.MustParse("e0c5f744-13e1-4bd2-bdb2-83f90581fdc2"))

	// LifecycleManagementDynamicLoadUnload - No description available
	LifecycleManagementDynamicLoadUnload = PermissionKey(uuid.MustParse("4d4b7c26-4378-4e14-9741-edeb46789a71"))

	// LifecycleManagementClusterDiscovery - Day 2 support for ongoing synchronization of Kubernetes configuration, workloads and service mesh changes.
	LifecycleManagementClusterDiscovery = PermissionKey(uuid.MustParse("64a36679-68b2-4328-bb1c-7c577ef5267a"))

	// LifecycleManagementMultipleKubernetesClusters - Ongoing synchronization of Kubernetes configuration, workloads and service mesh changes across any number of Kubernetes clusters.
	LifecycleManagementMultipleKubernetesClusters = PermissionKey(uuid.MustParse("53c2c0e8-2403-475b-9ffc-0dd501bef8f6"))

	// LifecycleManagementEnvironments - No description available
	LifecycleManagementEnvironments = PermissionKey(uuid.MustParse("7953c71b-22a2-4b12-bead-8b3bf54ef3c6"))

	// LifecycleManagementAnnouncementAndSynchronization - No description available
	LifecycleManagementAnnouncementAndSynchronization = PermissionKey(uuid.MustParse("f59af5fd-b571-46f0-b8d1-09194434a38e"))

	// LifecycleManagementOrganizationalPermissioning - No description available
	LifecycleManagementOrganizationalPermissioning = PermissionKey(uuid.MustParse("0ad304a3-973e-4855-aaed-f445870bbb35"))

	// LifecycleManagementAddCluster - Add Kubernetes cluster
	LifecycleManagementAddCluster = PermissionKey(uuid.MustParse("fce15b20-78ac-42af-b79c-b8f19bdb0802"))

	// LifecycleManagementChangeConnectionState - Change connection state
	LifecycleManagementChangeConnectionState = PermissionKey(uuid.MustParse("14ac9622-3170-4580-8403-ed7a584f90ef"))

	// LifecycleManagementFlushMeshsyncData - Clearing the database by clicking on the `Flush MeshSync`
	LifecycleManagementFlushMeshsyncData = PermissionKey(uuid.MustParse("8dd4c54a-bccd-4fb3-a18c-269195653a91"))

	// LifecycleManagementRegisterDiscoveredMeshsyncResource - Register discovered Meshsync resource to change state to connection
	LifecycleManagementRegisterDiscoveredMeshsyncResource = PermissionKey(uuid.MustParse("214ad6b1-df4d-44a6-8872-8ad1f751ef68"))

	// LifecycleManagementDeleteAConnection - Delete a connection
	LifecycleManagementDeleteAConnection = PermissionKey(uuid.MustParse("61afb8c2-cda6-4175-aad9-74ff87fed323"))

	// LifecycleManagementEditConnection - Reconfigure the existing connection or edit the connection information
	LifecycleManagementEditConnection = PermissionKey(uuid.MustParse("5385852a-8cb7-498c-b3a6-9a0059c25017"))

	// MesherySystemStreamlinedCi - No description available
	MesherySystemStreamlinedCi = PermissionKey(uuid.MustParse("ff2ea71f-2e28-4b21-89ef-352c509b1247"))

	// MesherySystemIntegrationTests - No description available
	MesherySystemIntegrationTests = PermissionKey(uuid.MustParse("1852b847-4906-442a-9887-76bdedfcc4da"))

	// MesherySystemReleaseChannelsStableAndEdge - No description available
	MesherySystemReleaseChannelsStableAndEdge = PermissionKey(uuid.MustParse("f17bb4cc-8d99-4443-858b-201cb9d77be8"))

	// MesherySystemTimeToValueEasySetupOfMeshery - No description available
	MesherySystemTimeToValueEasySetupOfMeshery = PermissionKey(uuid.MustParse("f75ee33b-914f-4d80-bfe4-da83764cb45d"))

	// MesherySystemMesheryctl - Windows, Linux, MacOS
	MesherySystemMesheryctl = PermissionKey(uuid.MustParse("a80495bb-1c2d-4b93-bffe-2ee5720fba90"))

	// MesherySystemMesheryServer - Minikube, Docker, OpenShift
	MesherySystemMesheryServer = PermissionKey(uuid.MustParse("f1399331-15ac-495a-b315-2afa5027288c"))

	// MesherySystemMeshsync - No description available
	MesherySystemMeshsync = PermissionKey(uuid.MustParse("424abe7b-c0e3-4a0d-88cb-44114ae5a465"))

	// MesherySystemScriptHomebrewScoop - No description available
	MesherySystemScriptHomebrewScoop = PermissionKey(uuid.MustParse("b850d27a-bcca-4400-b656-7ccac8f94bc4"))

	// MesherySystemFacilitateCollectionOfDebugForEaseOfIssueReporting - No description available
	MesherySystemFacilitateCollectionOfDebugForEaseOfIssueReporting = PermissionKey(uuid.MustParse("eac85b45-2aef-4297-b1f4-286d8f5fb7ce"))

	// MesherySystemEachComponent - No description available
	MesherySystemEachComponent = PermissionKey(uuid.MustParse("e9ed93eb-1c43-4aba-869f-ca780d491071"))

	// MesherySystemCli - Seamlessly manage your configurations, deployments, and interactions through our intuitive and powerful command-line interface: mesheryctl
	MesherySystemCli = PermissionKey(uuid.MustParse("55d44b27-10e2-4f23-a7c5-eefce75cfd69"))

	// MesherySystemViewSettings - View settings in Meshery
	MesherySystemViewSettings = PermissionKey(uuid.MustParse("fdc038e3-1fdf-403a-af8a-53c0de8d7820"))

	// MesherySystemConnectAdapter - Configure and connect to Meshery adapters
	MesherySystemConnectAdapter = PermissionKey(uuid.MustParse("c93bd211-1dac-42cc-9086-859288826d1b"))

	// MesherySystemConnectMetrics - Configure and connect to metrics like Grafana and Promethues
	MesherySystemConnectMetrics = PermissionKey(uuid.MustParse("b0aee906-c549-445f-be0c-b98b04d47d09"))

	// MesherySystemViewMetrics - View already configured metrics
	MesherySystemViewMetrics = PermissionKey(uuid.MustParse("7fe36f60-fd0a-4fda-84e5-c64a04c3ad06"))

	// MesherySystemViewRegistry - Explore entities within capabilities registry
	MesherySystemViewRegistry = PermissionKey(uuid.MustParse("cc069117-08cc-44e3-9c61-ae0eeca0bcf1"))

	// MesherySystemResetDatabase - Reset Meshery database
	MesherySystemResetDatabase = PermissionKey(uuid.MustParse("84fc402c-f33e-4a21-a0e3-e14f9e20b125"))

	// KanvasPlaybackServiceTransactionsScrubOverTheHistoryOfChangesToYourDeployments - No description available
	KanvasPlaybackServiceTransactionsScrubOverTheHistoryOfChangesToYourDeployments = PermissionKey(uuid.MustParse("83784db9-bb58-4e15-aede-cbac7d01f431"))

	// KanvasRepresentationOfInfrastructureConfigurationAndServices - No description available
	KanvasRepresentationOfInfrastructureConfigurationAndServices = PermissionKey(uuid.MustParse("51481036-07fa-425b-89fb-cb6141a8d7b5"))

	// KanvasServicePerformance - Continuous visibility across all of your clusters and workloads.
	KanvasServicePerformance = PermissionKey(uuid.MustParse("54112584-8ba3-4a0e-b930-b32d0d054ae2"))

	// KanvasDragNDropPatternMergeWithExistingNodesOnCanvas - Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to drag and drop a design onto the canvas to merge with exisitng nodes on canvas.
	KanvasDragNDropPatternMergeWithExistingNodesOnCanvas = PermissionKey(uuid.MustParse("f8434605-cf0d-44ae-8b5a-31bca20c3d06"))

	// KanvasLoadDesignPatternDisplaceCurrentNodesOnCanvas - Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to drag and drop a design onto the canvas to displace the exisitng nodes on canvas.
	KanvasLoadDesignPatternDisplaceCurrentNodesOnCanvas = PermissionKey(uuid.MustParse("ccd8e0eb-5e2a-45e3-9b3d-3941b60dfed8"))

	// KanvasEditComponentConfugurationRjsfTooltips - In Meshery, a Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to configure a component currently present on canvas.
	KanvasEditComponentConfugurationRjsfTooltips = PermissionKey(uuid.MustParse("8154fa61-aca9-4274-bcdd-6f551e9b17eb"))

	// KanvasConfigureFieldrefs - No description available
	KanvasConfigureFieldrefs = PermissionKey(uuid.MustParse("4770f8cc-8f58-4da9-89e2-a7e7c2ea4e2f"))

	// KanvasDeleteComponents - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to delete a component from canvas.
	KanvasDeleteComponents = PermissionKey(uuid.MustParse("9f2264fa-9e40-4625-8bc0-5c9162d617a7"))

	// KanvasCloneComponents - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to clone a component, along with it's configuration, on canvas.
	KanvasCloneComponents = PermissionKey(uuid.MustParse("8d640c90-8a8e-4ac0-a4bb-010f81cfc00a"))

	// KanvasCopyComponents - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to clone a component, along with it's configuration, on canvas.
	KanvasCopyComponents = PermissionKey(uuid.MustParse("fbeacff4-9eed-4f55-aee3-9c3da53bdc9b"))

	// KanvasLockComponents - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to lock a component's state present on canvas.
	KanvasLockComponents = PermissionKey(uuid.MustParse("08ebbd83-870f-4267-b3b7-7e50669b1e26"))

	// KanvasAddComponents - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to copy a component present on canvas. The canvas is where the design and all it's components are displayed and configured. This permission grants the user the ability to cofigure/edit/update a design by adding new components to the canvas.
	KanvasAddComponents = PermissionKey(uuid.MustParse("3a345a78-2ac7-4916-bc99-91769f5c4959"))

	// KanvasConfigureComponentStyles - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to configure the style of a component.
	KanvasConfigureComponentStyles = PermissionKey(uuid.MustParse("af9f2e20-1cae-41ac-94b2-379fddc2660f"))

	// KanvasResetComponentStyles - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to reset a component to it's initial style.
	KanvasResetComponentStyles = PermissionKey(uuid.MustParse("faa0cb66-af78-4a6f-84f0-3bfae7254276"))

	// KanvasResizeComponents - A Component is a fundamental building block used to represent and define the infrastructure under management. Each component provides granular and specific support for your infrastructure and applications. This permission grants the user the ability to reset a component to it's initial style.
	KanvasResizeComponents = PermissionKey(uuid.MustParse("faa0cb66-af78-4a6f-84f0-3bfae72542aa"))

	// KanvasDeleteShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a shape from canvas.
	KanvasDeleteShapes = PermissionKey(uuid.MustParse("436d24e5-4a0d-4298-b94d-394d6e489ec3"))

	// KanvasCloneShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a shape  on canvas.
	KanvasCloneShapes = PermissionKey(uuid.MustParse("74a27b19-1614-46ca-94f2-c1cc96b1e610"))

	// KanvasCopyShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a shape on canvas.
	KanvasCopyShapes = PermissionKey(uuid.MustParse("7f5dd8ef-eef0-4693-b918-9571c1214ad3"))

	// KanvasLockShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a shape on canvas.
	KanvasLockShapes = PermissionKey(uuid.MustParse("6f196e4d-0626-47af-8721-1364f5f2f5f2"))

	// KanvasAddShapes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new shapes on canvas.
	KanvasAddShapes = PermissionKey(uuid.MustParse("35ce3654-7d96-4898-9398-364bcbe49c45"))

	// KanvasConfigureShapeStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of shapes present on canvas.
	KanvasConfigureShapeStyles = PermissionKey(uuid.MustParse("461c58a2-293d-40ef-bd85-16df143feea1"))

	// KanvasResetShapeStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of shapes present on canvas.
	KanvasResetShapeStyles = PermissionKey(uuid.MustParse("73d6fda8-8ea8-4b0f-ad89-ad6b549b28d0"))

	// KanvasDeleteTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a textbox from canvas.
	KanvasDeleteTextboxes = PermissionKey(uuid.MustParse("67132e28-d52a-4fbd-a697-16d19f3505bd"))

	// KanvasCloneTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a textbox on canvas.
	KanvasCloneTextboxes = PermissionKey(uuid.MustParse("7dea5e81-a2cb-4f95-8855-b19e3756c0ab"))

	// KanvasCopyTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a textbox on canvas.
	KanvasCopyTextboxes = PermissionKey(uuid.MustParse("6dbd7813-a9c4-454b-b3a6-c1eae313c791"))

	// KanvasLockTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a textbox on canvas.
	KanvasLockTextboxes = PermissionKey(uuid.MustParse("56c1ae0d-cf71-43ce-9453-6dd447e6dd8f"))

	// KanvasAddTextboxes - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new textboxes on canvas.
	KanvasAddTextboxes = PermissionKey(uuid.MustParse("9366be38-96f4-4a84-aff0-e17148a8a358"))

	// KanvasConfigureTextboxStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of textboxes present on canvas.
	KanvasConfigureTextboxStyles = PermissionKey(uuid.MustParse("0653814a-0266-4d55-bc52-6ef17ebcf03d"))

	// KanvasResetTextboxStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of textboxes present on canvas.
	KanvasResetTextboxStyles = PermissionKey(uuid.MustParse("26815ca4-1fec-43fc-a8aa-9669719632a4"))

	// KanvasDeleteSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to delete a section from canvas.
	KanvasDeleteSections = PermissionKey(uuid.MustParse("7b7377c8-2160-42eb-a130-4a69ab1225ed"))

	// KanvasCloneSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a section on canvas.
	KanvasCloneSections = PermissionKey(uuid.MustParse("41de8c25-71c1-4fc5-9230-c018af8f1e41"))

	// KanvasCopySections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to clone a section on canvas.
	KanvasCopySections = PermissionKey(uuid.MustParse("c05ca2ed-262d-4dc1-aa10-69b93dbe4e39"))

	// KanvasLockSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to lock a section on canvas.
	KanvasLockSections = PermissionKey(uuid.MustParse("fcfbc9ee-3824-45e9-ba50-c4c6ec52779b"))

	// KanvasAddSections - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add new sections on canvas.
	KanvasAddSections = PermissionKey(uuid.MustParse("d15a960c-d4d5-4656-94e5-7a1e116fa610"))

	// KanvasConfigureSectionStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to configure the styles of sections present on canvas.
	KanvasConfigureSectionStyles = PermissionKey(uuid.MustParse("66c06b53-c174-415d-b88b-0d8c858c4034"))

	// KanvasResetSectionStyles - Kanvas Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to reset the styles of sections present on canvas.
	KanvasResetSectionStyles = PermissionKey(uuid.MustParse("21bce984-73c1-4025-acd5-f18cdbd796db"))

	// KanvasAddTextToTextboxes - Designer allows users to draw shapes, lines, text, add custom styles, images and icons to represent the components and relationships of Kubernetes clusters as they see fit. This permission grants the user the ability to add text to the textboxes currently on canvas.
	KanvasAddTextToTextboxes = PermissionKey(uuid.MustParse("e0fabc93-1566-4780-934d-adddf2275f64"))

	// KanvasCreateDynamicFieldrefs - No description available
	KanvasCreateDynamicFieldrefs = PermissionKey(uuid.MustParse("2a2a61b6-9fda-4cc6-86e9-1a71a54863c7"))

	// KanvasConfigureEdgeHandles - No description available
	KanvasConfigureEdgeHandles = PermissionKey(uuid.MustParse("23f7adfe-de4b-42be-a3cd-f7f34d83c319"))

	// KanvasDeleteEdgeHandles - No description available
	KanvasDeleteEdgeHandles = PermissionKey(uuid.MustParse("3e1b0633-06a9-4be9-a6fb-c15cc453834f"))

	// KanvasUseHeirarchicalRelationships - No description available
	KanvasUseHeirarchicalRelationships = PermissionKey(uuid.MustParse("a6552d56-1712-45cc-8b96-05ba419c357c"))

	// KanvasUseInventoryRelationships - No description available
	KanvasUseInventoryRelationships = PermissionKey(uuid.MustParse("ab2bbc88-b0e2-4267-9663-a554cd0a7e26"))

	// KanvasChangeDesignLayout - Like a Google Doc, Designs are a user's primary tool for collaborative authorship of their infrastructure and services. A Design describes all the resources and their properties that users wants for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to change the layout of the components in the design.
	KanvasChangeDesignLayout = PermissionKey(uuid.MustParse("e4fcd40d-4e5d-4c2b-9d76-1f92ccfe8edd"))

	// KanvasUndoOrRedo - This permission grants the user the ability to undo/redo any action in done in Kanvas
	KanvasUndoOrRedo = PermissionKey(uuid.MustParse("1ae55743-0496-45f7-9a42-aabb7f0d6c70"))

	// KanvasUsePencil - Pencil is a tool mode that allows users to draw freehand shapes. This permission grants user the ability to use the pencil mode.
	KanvasUsePencil = PermissionKey(uuid.MustParse("02c7afe9-44b2-4fe7-8c8b-1c12a0da600f"))

	// KanvasUsePen - Pen is a tool mode that allows users to draw edges (connections) from one component to another. This permission grants user the ability to use the pencil mode.
	KanvasUsePen = PermissionKey(uuid.MustParse("b5aaeaf2-a563-4e7a-a556-7670a41cc946"))

	// KanvasWhiteboarding - Ability to freeform draw any shapes, draw edges
	KanvasWhiteboarding = PermissionKey(uuid.MustParse("dd64b24d-fd22-4123-94fc-a1f235f7f514"))

	// KanvasVisualDesign - Drag-n-drop cloud native infrastructure designer to configure, model, and deploy your workloads
	KanvasVisualDesign = PermissionKey(uuid.MustParse("5ea237bb-013e-412f-9dbf-394a6d27a027"))

	// KanvasModels - Generator for GCP via K8s CRDs
	KanvasModels = PermissionKey(uuid.MustParse("8a10b666-b5f8-4310-90da-9c33ceae4058"))

	// KanvasViewHelpCenter - The Help Center contains various ways through which the users might try to learn more about the tooling and it's features or reach out through various channels for help. This permission grants the user the ability to view the help center and use it's features.
	KanvasViewHelpCenter = PermissionKey(uuid.MustParse("1a7eab59-2f09-45a5-9ad3-b02faf0f8f6a"))

	// KanvasScreenshotCanvas - The canvas is where the design and all it's components are displayed. This permission grants the user the ability to take a screenshot of the current state of canvas.
	KanvasScreenshotCanvas = PermissionKey(uuid.MustParse("31994492-1bae-400d-835b-1a4ff63e9e15"))

	// KanvasConfigureVisibleLayers - Layers refer to the collection of various entities present on the canvas, for example, components, relationships, component badges, etc. This permission grants the user the ability to decide which entities to display/hide on the canvas.
	KanvasConfigureVisibleLayers = PermissionKey(uuid.MustParse("5417ccdb-46fe-467d-b408-d4705cd4d78b"))

	// KanvasCreateBlankDesignInKanvas - The canvas is where the design and all it's components are displayed and configured. This permission grants the user the ability to remove all current entities from the canvas and create a new one to start from scratch
	KanvasCreateBlankDesignInKanvas = PermissionKey(uuid.MustParse("958e68aa-c8d4-4965-b094-636289d855f9"))

	// KanvasSaveDesignInKanvas - Like a Google Doc, Designs are your primary tool for collaborative authorship of your infrastructure and services. A Design describes all the resources and their properties that you want for a single deployment based on Meshery’s declarative syntax. This permission grants the user the ability to save a design (while logged in)
	KanvasSaveDesignInKanvas = PermissionKey(uuid.MustParse("31096e00-0142-41fd-8680-d5212bc13c2c"))

	// KanvasViewComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to view comments in a design on canvas.
	KanvasViewComments = PermissionKey(uuid.MustParse("3c72993d-7ebe-4ce2-bbc5-64d9b0fbb65e"))

	// KanvasResolveAComment - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to resolve a comment thread in a design on canvas.
	KanvasResolveAComment = PermissionKey(uuid.MustParse("1ba1822d-d6c0-4595-92e6-63d92f02e3a5"))

	// KanvasDeleteComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to delete a comment on canvas.
	KanvasDeleteComments = PermissionKey(uuid.MustParse("6ff22145-7fa1-4a06-a986-5a3f5d5718ca"))

	// KanvasCloneComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to clone a comment on canvas.
	KanvasCloneComments = PermissionKey(uuid.MustParse("f325d8ec-d6c6-4367-9fe8-3affd9ba33b7"))

	// KanvasCopyComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to copy a comment on canvas.
	KanvasCopyComments = PermissionKey(uuid.MustParse("cfa66488-21aa-4f9c-8e98-bf6cf9ceb02d"))

	// KanvasLockComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to lock a comment on canvas.
	KanvasLockComments = PermissionKey(uuid.MustParse("8f6e9ffa-8d7b-48ab-b0b2-f017fa6a99fe"))

	// KanvasAddComments - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to add a comment on canvas.
	KanvasAddComments = PermissionKey(uuid.MustParse("2c47e53b-aea9-471f-8048-bd618c86418d"))

	// KanvasConfigureCommentStyles - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to configure the styles of a comment on canvas.
	KanvasConfigureCommentStyles = PermissionKey(uuid.MustParse("4366c965-2914-4c3c-a52d-0f2b3a8eb22c"))

	// KanvasResetCommentStyles - Kanvas’s Designer enables users to place comments “inline” within designs. Comments can be used to offer feedback to team members, take detailed design notes, capture helpful tips for team members, and include justification as to infrastructure and application configuration decisions. This permission grants the user the ability to reset the styles of a comment on canvas.
	KanvasResetCommentStyles = PermissionKey(uuid.MustParse("c9c6d2bf-e566-49c8-bee0-bc6cf84cb8a8"))

	// KanvasViewViews - See all views withing a workspace
	KanvasViewViews = PermissionKey(uuid.MustParse("93cba7f8-82ec-4a64-b384-f81d6acc8db3"))

	// KanvasCreateView - Create a new view
	KanvasCreateView = PermissionKey(uuid.MustParse("47ba32dc-aaa3-4c75-afdd-07fb40f38f4f"))

	// KanvasDeleteView - Dissolve environment and all connection memberships. Leave associated resources intact.
	KanvasDeleteView = PermissionKey(uuid.MustParse("48076416-bc07-456b-bbea-49bdca239d0f"))

	// KanvasEditView - Edit environment and it connection membership
	KanvasEditView = PermissionKey(uuid.MustParse("2f8354bb-6855-4a42-8086-8d55c1c7e638"))

	// KanvasAssignViewsToWorkspace - Add new views to workspace
	KanvasAssignViewsToWorkspace = PermissionKey(uuid.MustParse("fb6c987b-e54c-4016-b3f3-0488228ee998"))

	// KanvasUnassignViewsFromWorkspace - Remove views from workspace
	KanvasUnassignViewsFromWorkspace = PermissionKey(uuid.MustParse("f77d74ef-1cae-4527-b45e-ecc1431681df"))

	// KanvasExportViews - Export views to JSON format
	KanvasExportViews = PermissionKey(uuid.MustParse("3bb16c17-79bb-4673-8287-e818b8aece5c"))

	// KanvasViewViewComponentDetails - View detailed information about a view and it's comopnent
	KanvasViewViewComponentDetails = PermissionKey(uuid.MustParse("d363b6a3-7ae5-4be0-a35f-91d9e5136b1a"))

	// KanvasOpenView - Open a pre-existing view
	KanvasOpenView = PermissionKey(uuid.MustParse("c47d29bc-7d23-433e-8140-ab273734b7df"))

	// KanvasSaveViews - Saved view
	KanvasSaveViews = PermissionKey(uuid.MustParse("93250075-0994-4ff8-8ff3-7ecc74ca7956"))

	// KanvasShareViews - Share Views
	KanvasShareViews = PermissionKey(uuid.MustParse("631ebd8c-a084-4df0-be9b-de5abd2d8468"))

	// KanvasCloneViews - Clone Views
	KanvasCloneViews = PermissionKey(uuid.MustParse("258c7e18-9ac4-41d7-a637-7f12a7f24df7"))

	// KanvasWebBasedTerminal - Direct terminal access to one ore more pods/containers simultaneously. Integrated experience.
	KanvasWebBasedTerminal = PermissionKey(uuid.MustParse("4726da45-2108-409b-b94f-45bd1e199a78"))

	// KanvasViewInteractiveTerminal - View Interactive Terminal
	KanvasViewInteractiveTerminal = PermissionKey(uuid.MustParse("4726da45-2108-409b-b94f-45bd1e199c78"))

	// KanvasViewComponentDetails - View managed infrastructure resources details in Kanvas Operator
	KanvasViewComponentDetails = PermissionKey(uuid.MustParse("5d1e226b-cc0c-407c-8fa7-37159d06698d"))

	// KanvasViewObservabilityMetrics - View real-time resource metrics in Kanvas Operator
	KanvasViewObservabilityMetrics = PermissionKey(uuid.MustParse("2988a366-a743-48e7-9946-daff9b2ab0a1"))

	// KanvasPerformConformanceTest - Perform a conformance test in Kanvas Operator
	KanvasPerformConformanceTest = PermissionKey(uuid.MustParse("901ca054-0656-4db5-8d58-d618e0b82b39"))

	// KanvasStreamContainerLogs - Stream container logs in Kanvas Operator
	KanvasStreamContainerLogs = PermissionKey(uuid.MustParse("c1ff0f0d-95b5-4765-8c64-d77af99e5d4f"))

	// KanvasPerformPerformanceTestInVisualizer - Perform performance test in Kanvas Operator
	KanvasPerformPerformanceTestInVisualizer = PermissionKey(uuid.MustParse("88fe3781-bd53-4bfb-bab9-27e3ad06a9f5"))

	// KanvasSelectPerformanceProfileInVisualizer - Select a performance profile to run tests using
	KanvasSelectPerformanceProfileInVisualizer = PermissionKey(uuid.MustParse("16d80ca9-c245-4622-9482-45303b963811"))

	// OfferManagementHelmBased - Meshery Cloud
	OfferManagementHelmBased = PermissionKey(uuid.MustParse("bfcc083f-7918-4229-a20e-758661ed73b2"))

	// PerformanceManagementSmpCompatibleImportExport - No description available
	PerformanceManagementSmpCompatibleImportExport = PermissionKey(uuid.MustParse("293cf5a4-512a-42aa-86e9-12882ec79a5e"))

	// PerformanceManagementPersistenceOfTestResults - Baseline and track your service mesh performance from release to release.
	PerformanceManagementPersistenceOfTestResults = PermissionKey(uuid.MustParse("fc36a4cc-9f31-4784-8b9f-b38772d05425"))

	// PerformanceManagementLoadGeneratorInterfaceCommonInterfaceUsedAsAnExtensionPointForSupportingDifferentTypesOfLoadGenerators - No description available
	PerformanceManagementLoadGeneratorInterfaceCommonInterfaceUsedAsAnExtensionPointForSupportingDifferentTypesOfLoadGenerators = PermissionKey(uuid.MustParse("cd18ca8d-11e3-47cc-a68f-381c0a2561c5"))

	// PerformanceManagementLoadGeneration - Single Load Generator: Support testing multiple endpoints simultaneously.
	PerformanceManagementLoadGeneration = PermissionKey(uuid.MustParse("826e1994-0bc3-4553-b20c-c62cabad98e6"))

	// PerformanceManagementDistributedLoadGenerator - Multiple Meshery Servers or Meshery Adapters generating load, collecting and coalescing results into a single report.
	PerformanceManagementDistributedLoadGenerator = PermissionKey(uuid.MustParse("13a4dab9-018c-45ce-ac17-66721aa83ff0"))

	// PerformanceManagementDefineNameAndSavePerformanceProfiles - No description available
	PerformanceManagementDefineNameAndSavePerformanceProfiles = PermissionKey(uuid.MustParse("679c7956-e1be-4f97-8400-f1d8fe90f856"))

	// PerformanceManagementIntegratePerformanceAnalysisAsAGateInYourGitopsPipelineUsingPerformanceProfilesToRunRepeatableTestsAndAvoidRegressionIssuesBeforeTheyStartConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent - No description available
	PerformanceManagementIntegratePerformanceAnalysisAsAGateInYourGitopsPipelineUsingPerformanceProfilesToRunRepeatableTestsAndAvoidRegressionIssuesBeforeTheyStartConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent = PermissionKey(uuid.MustParse("872dca45-cb80-4dfb-9421-1da1ffb6a265"))

	// PerformanceManagementUsingMesheryAsTheOfficalSmiConformanceValidationToolConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent - No description available
	PerformanceManagementUsingMesheryAsTheOfficalSmiConformanceValidationToolConfigureThisActionToTriggerWithEachOfYourReleasesOnEveryPullRequestOrAnyGithubWorkflowTriggerEvent = PermissionKey(uuid.MustParse("b7128770-7dda-4556-be33-991d4173c546"))

	// PerformanceManagementPerformanceProfiles - Share performance profiles and test results with individual users or teams.
	PerformanceManagementPerformanceProfiles = PermissionKey(uuid.MustParse("add7825b-355c-4d98-a706-ab8ce273ea21"))

	// PerformanceManagementComparativeTesting - Historical views: Infrastructure-centric
	PerformanceManagementComparativeTesting = PermissionKey(uuid.MustParse("f480c87e-dc39-4877-9c6f-5e5d4f8f760a"))

	// PerformanceManagementExportableReport - No description available
	PerformanceManagementExportableReport = PermissionKey(uuid.MustParse("83cdf8a9-27cf-4020-86eb-98865a2a4c4c"))

	// PerformanceManagementSocialShare - No description available
	PerformanceManagementSocialShare = PermissionKey(uuid.MustParse("4ef3d7a9-23d6-4254-9ba9-e515edafe3da"))

	// PerformanceManagementContinuousQualityOfServiceMonitoring - Experience uninterrupted oversight of your service quality with our Continuous Quality of Service Monitoring.
	PerformanceManagementContinuousQualityOfServiceMonitoring = PermissionKey(uuid.MustParse("bd26b342-2f5c-4985-97e5-aca532327951"))

	// PerformanceManagementAdaptiveLoadControlOptimizeRps - No description available
	PerformanceManagementAdaptiveLoadControlOptimizeRps = PermissionKey(uuid.MustParse("28c80137-f726-4366-940d-53f8d2feed13"))

	// PerformanceManagementSchedulingOfTests - Schedule one-time or reoccurring performance tests.
	PerformanceManagementSchedulingOfTests = PermissionKey(uuid.MustParse("b1201553-c4b3-4212-9ac1-af11eaee6931"))

	// PerformanceManagementSophisticatedRecurringSchedulesOfPerformanceTestsOfConfigurationAnalyzers - No description available
	PerformanceManagementSophisticatedRecurringSchedulesOfPerformanceTestsOfConfigurationAnalyzers = PermissionKey(uuid.MustParse("78e3febd-0003-4ac2-8c4f-3d4fefed69d7"))

	// PerformanceManagementCalendarIntegration - Schedule tests from your calendar
	PerformanceManagementCalendarIntegration = PermissionKey(uuid.MustParse("b4791193-0944-430d-b889-f3000e2dc885"))

	// PerformanceManagementListenAndLearnAverageRequestResponseTime - No description available
	PerformanceManagementListenAndLearnAverageRequestResponseTime = PermissionKey(uuid.MustParse("4a5e66d1-a4cc-4aad-8e8a-ce605a3baef5"))

	// PerformanceManagementFormulaAndMeasurementScaleUsedToGaugeServiceMeshPerformanceInContextOfTheValueItSProvidingTheEnvironmentAndWorkloadsItSRunning - No description available
	PerformanceManagementFormulaAndMeasurementScaleUsedToGaugeServiceMeshPerformanceInContextOfTheValueItSProvidingTheEnvironmentAndWorkloadsItSRunning = PermissionKey(uuid.MustParse("cb10fc07-a626-4d25-801c-3fbb9f458206"))

	// PerformanceManagementAbilityToMonitorSignalsDefinedInSmpAndGenerateAMeshmarkInRealTime - No description available
	PerformanceManagementAbilityToMonitorSignalsDefinedInSmpAndGenerateAMeshmarkInRealTime = PermissionKey(uuid.MustParse("eaedcc22-198e-4714-9c77-ba84a84dc471"))

	// PerformanceManagementMeshmark - Identify the cost of a specific network function.
	PerformanceManagementMeshmark = PermissionKey(uuid.MustParse("e5620cc6-6a98-4146-966f-562114342aae"))

	// PerformanceManagementProtocolsHttp - No description available
	PerformanceManagementProtocolsHttp = PermissionKey(uuid.MustParse("1364948f-3e28-4853-84a7-452ba1e7ee13"))

	// PerformanceManagementProtocolsGrpc - No description available
	PerformanceManagementProtocolsGrpc = PermissionKey(uuid.MustParse("3ab50aa9-6860-4618-b97e-b6144da69f12"))

	// PerformanceManagementProtocolsTcp - No description available
	PerformanceManagementProtocolsTcp = PermissionKey(uuid.MustParse("3eab632b-0392-4bb8-8564-89e21166d902"))

	// PerformanceManagementDuration - No description available
	PerformanceManagementDuration = PermissionKey(uuid.MustParse("6ad02dc5-7e1d-443d-ba82-e4b63c91a402"))

	// PerformanceManagementMultipleThreads - No description available
	PerformanceManagementMultipleThreads = PermissionKey(uuid.MustParse("acfeaecf-ca09-43cb-8aa2-31ca688596a4"))

	// PerformanceManagementDefaultProfilesToFacilitateCapacitySoakAndOtherTesting - No description available
	PerformanceManagementDefaultProfilesToFacilitateCapacitySoakAndOtherTesting = PermissionKey(uuid.MustParse("d0a8cc17-5101-467b-bf7b-ac5b7346cee1"))

	// PerformanceManagementComparisonOfTwoOrMoreReports - No description available
	PerformanceManagementComparisonOfTwoOrMoreReports = PermissionKey(uuid.MustParse("8f3061a3-a31d-4c61-9be6-cc002b713853"))

	// PerformanceManagementPersistInSmpFormat - No description available
	PerformanceManagementPersistInSmpFormat = PermissionKey(uuid.MustParse("ca1200da-d3f3-4274-831a-2cd6102c5a1b"))

	// PerformanceManagementExportSingleOrMultipleResultsInSmpFormat - No description available
	PerformanceManagementExportSingleOrMultipleResultsInSmpFormat = PermissionKey(uuid.MustParse("0fe311a6-71cb-49d5-8971-b5eb164d973a"))

	// PerformanceManagementHistoricalView - No description available
	PerformanceManagementHistoricalView = PermissionKey(uuid.MustParse("e5b12687-5fc8-49f5-8833-3e43ca652d80"))

	// PerformanceManagementAnalysisLatencyThroughput - No description available
	PerformanceManagementAnalysisLatencyThroughput = PermissionKey(uuid.MustParse("68730e20-3174-4ac9-9e7b-d3c1bd179b8b"))

	// PerformanceManagementAnalysisThresholdSettingsForPassFailWhenIntegratedIntoCiPipelines - No description available
	PerformanceManagementAnalysisThresholdSettingsForPassFailWhenIntegratedIntoCiPipelines = PermissionKey(uuid.MustParse("ed61627f-6736-4331-8d6d-dddcce98272a"))

	// PerformanceManagementAnalysisIdentificationOfOpportunitiesToImprove - No description available
	PerformanceManagementAnalysisIdentificationOfOpportunitiesToImprove = PermissionKey(uuid.MustParse("37de75c5-b1d7-4358-946d-0a4d72a9d587"))

	// PerformanceManagementAnalysisTrend - No description available
	PerformanceManagementAnalysisTrend = PermissionKey(uuid.MustParse("2a5aedd5-095f-47ad-b4fb-9e9d9f97e8aa"))

	// PerformanceManagementAnalysisAnomalyDetection - No description available
	PerformanceManagementAnalysisAnomalyDetection = PermissionKey(uuid.MustParse("5b9b0cc2-6ea9-45d3-b989-8bd034768a19"))

	// PerformanceManagementAnalysis - Automatically suggest timeout settings for a given service.
	PerformanceManagementAnalysis = PermissionKey(uuid.MustParse("d9e286d5-54f1-446f-9c1a-ece361e5aca1"))

	// PerformanceManagementMesheryAdapterForNighthawk - Creation of Meshery Nighthawk Adapter. Refactoring of Nighhawk and decoupling it from Meshery container. Lifecycle management of adapter. Definition and registration of adapter capabilities.
	PerformanceManagementMesheryAdapterForNighthawk = PermissionKey(uuid.MustParse("72066352-d09b-aa4a-b02e-846676bd7aca"))

	// PerformanceManagementDistributedTests - Allow users to identity Kubernetes clusters
	PerformanceManagementDistributedTests = PermissionKey(uuid.MustParse("72066352-d09b-bb4a-b02e-846676bd7ada"))

	// PerformanceManagementAddPerformaceProfile - Add a new performace profile
	PerformanceManagementAddPerformaceProfile = PermissionKey(uuid.MustParse("b2861578-c573-45fe-a95e-0356d56e1d1b"))

	// PerformanceManagementRunTest - Run a test on performance profile
	PerformanceManagementRunTest = PermissionKey(uuid.MustParse("06de2b07-b4f4-4701-b87f-d92ebb66ba42"))

	// PerformanceManagementViewResults - View results of performance tests
	PerformanceManagementViewResults = PermissionKey(uuid.MustParse("0c757cc7-4038-4d9b-9b60-fa8d9fc9d27e"))

	// PerformanceManagementEditPerformanceTest - Edit performance test
	PerformanceManagementEditPerformanceTest = PermissionKey(uuid.MustParse("33aa5c47-a8aa-4ad5-9950-7c17042c001d"))

	// PerformanceManagementDeletePerformanceTest - Delete performance test
	PerformanceManagementDeletePerformanceTest = PermissionKey(uuid.MustParse("84aa9d3c-3d4b-4587-947d-ae17b2dcd5f5"))

	// PerformanceManagementViewPerformanceProfiles - View all performance profiles
	PerformanceManagementViewPerformanceProfiles = PermissionKey(uuid.MustParse("6593ac26-820b-4e87-be32-64ee740ea204"))

	// PolicyNotificationSuppression - No description available
	PolicyNotificationSuppression = PermissionKey(uuid.MustParse("5a3096b7-d7ce-497e-87f0-afc91fa7666e"))

	// PolicyNotificationCorrelation - No description available
	PolicyNotificationCorrelation = PermissionKey(uuid.MustParse("3876eaf6-d02f-41d1-a8be-9887e8522334"))

	// PolicyVersioned - No description available
	PolicyVersioned = PermissionKey(uuid.MustParse("068257b7-348a-4f4b-96d1-e4606ef45c93"))

	// PolicyLogOfAllActionsInvokedByUsers - No description available
	PolicyLogOfAllActionsInvokedByUsers = PermissionKey(uuid.MustParse("8465ed0b-63d4-4a28-944b-4cab4cd5bc7f"))

	// PolicyNotificationOfAttemptsToInvokeUnauthorizedActions - No description available
	PolicyNotificationOfAttemptsToInvokeUnauthorizedActions = PermissionKey(uuid.MustParse("cc25afd4-777d-4768-a43f-d8c09ce978cf"))

	// PolicyAdmissionControlForSpecificWorkloadsOnTheMesh - No description available
	PolicyAdmissionControlForSpecificWorkloadsOnTheMesh = PermissionKey(uuid.MustParse("7dccf200-eacc-4057-b3d7-ac15ccf70a38"))

	// PolicyServiceRequestAuthorizationWithJwt - No description available
	PolicyServiceRequestAuthorizationWithJwt = PermissionKey(uuid.MustParse("cae1f1b8-2a88-4bc6-adb4-8e7b80d449ef"))

	// PolicyPerformanceBudgetSupportInPatterns - No description available
	PolicyPerformanceBudgetSupportInPatterns = PermissionKey(uuid.MustParse("783e4277-4c89-4495-9e50-bbb6c2cd42fb"))

	// SecurityManagementViewOverview - No description available
	SecurityManagementViewOverview = PermissionKey(uuid.MustParse("12dc96f1-a3fa-4bae-9c5a-a280666f9fdb"))

	// SecurityManagementViewCredentials - No description available
	SecurityManagementViewCredentials = PermissionKey(uuid.MustParse("96759f76-4add-45f8-b4ef-d4ace5ab1bc4"))

	// SecurityManagementCreateCredential - No description available
	SecurityManagementCreateCredential = PermissionKey(uuid.MustParse("30023b1b-01a7-4613-8364-38d3487d1789"))

	// SecurityManagementEditCredential - No description available
	SecurityManagementEditCredential = PermissionKey(uuid.MustParse("e4cd5bb0-8afb-4b35-8716-0e2ead13c9b7"))

	// SecurityManagementDeleteCredential - No description available
	SecurityManagementDeleteCredential = PermissionKey(uuid.MustParse("cb09f530-aa87-4a18-b3d3-bbcc2d6ca1a6"))

	// SecurityManagementViewSessions - No description available
	SecurityManagementViewSessions = PermissionKey(uuid.MustParse("26cf042a-91db-4237-8644-4d617a0d49e1"))

	// SecurityManagementLogoutFromASession - No description available
	SecurityManagementLogoutFromASession = PermissionKey(uuid.MustParse("177b928b-71ee-4ecd-a30b-3154ff4ba0d9"))

	// SecurityManagementViewTokens - No description available
	SecurityManagementViewTokens = PermissionKey(uuid.MustParse("46d914bc-18c1-438f-aa74-fb78823aa25c"))

	// SecurityManagementDownloadToken - No description available
	SecurityManagementDownloadToken = PermissionKey(uuid.MustParse("ee5fc23e-d629-4c7b-8169-27e526394e8b"))

	// SecurityManagementCreateToken - No description available
	SecurityManagementCreateToken = PermissionKey(uuid.MustParse("8aa0df56-57e8-44b7-9d6e-7df413048ed5"))

	// SecurityManagementDeleteToken - Delete a Token
	SecurityManagementDeleteToken = PermissionKey(uuid.MustParse("ddba5064-ac3c-470e-b405-d2a0e99db477"))

	// SecurityManagementViewKeys - No description available
	SecurityManagementViewKeys = PermissionKey(uuid.MustParse("3cf506df-8398-49d2-b4e2-f06e3a0f87f0"))

	// SecurityManagementEditKey - No description available
	SecurityManagementEditKey = PermissionKey(uuid.MustParse("605512d3-ff7f-456c-9230-b1d01c606d47"))

	// SecurityManagementDeleteKey - No description available
	SecurityManagementDeleteKey = PermissionKey(uuid.MustParse("efa19dc3-02a3-49b7-a0ff-e4554a2da337"))

	// SecurityManagementViewKeychains - No description available
	SecurityManagementViewKeychains = PermissionKey(uuid.MustParse("9e930568-6b55-43d2-91d8-abeafedc1550"))

	// SecurityManagementCreateKeychain - No description available
	SecurityManagementCreateKeychain = PermissionKey(uuid.MustParse("ec292de6-b62d-421b-94bf-ec5983faa6ff"))

	// SecurityManagementEditKeychain - No description available
	SecurityManagementEditKeychain = PermissionKey(uuid.MustParse("163e807d-f508-49ca-9ba6-cc3badb22bb0"))

	// SecurityManagementDeleteKeychain - No description available
	SecurityManagementDeleteKeychain = PermissionKey(uuid.MustParse("503a6b28-bd91-4dde-86ac-641567777515"))

	// InfrastructureManagementManageCloudNativeInfrastructureLifeCycle - This permission grants the user the ability to manage infrastructure life cycles within meshery. Meshery allows users to visualize, work on and manage various cloud native technologies.
	InfrastructureManagementManageCloudNativeInfrastructureLifeCycle = PermissionKey(uuid.MustParse("255fd148-e3fd-4408-a48c-0d157a57d4d9"))

	// InfrastructureManagementManageCloudNativeInfrastructureConfiguration - Manage configuration for applications like EmojiVoto, HTTPBin, Image Hub, Istio Book Info
	InfrastructureManagementManageCloudNativeInfrastructureConfiguration = PermissionKey(uuid.MustParse("0eb0558d-9b21-4e50-b4c6-bd8e9e3414f5"))

	// InfrastructureManagementApplyCloudNativeInfrastructureConfiguration - Configure infrastructure with some predefined options like Automatic Sidecar injection, Envoy Filter, Policy
	InfrastructureManagementApplyCloudNativeInfrastructureConfiguration = PermissionKey(uuid.MustParse("3f20a106-24f5-4da6-a8eb-6eddaad50944"))

	// InfrastructureManagementValidateCloudNativeInfrastructureConfiguration - Validate cloud native infrastructure  configuration against best practices like Analyze Running Configuration, SMI conformance
	InfrastructureManagementValidateCloudNativeInfrastructureConfiguration = PermissionKey(uuid.MustParse("8bb93f97-fcfb-4827-9fed-f931fdca7b95"))

	// InfrastructureManagementApplyCustomCloudNativeConfiguration - This permission grants the user the ability to apply custom configuration and customize existing configuration of thier cloud native infrastructure
	InfrastructureManagementApplyCustomCloudNativeConfiguration = PermissionKey(uuid.MustParse("2f4e2300-4c7e-4d48-95aa-74614a4826fe"))

	// InfrastructureManagementDeployCloudNativeInfrastructure - This permission grants the user the ability to deploy their infrastructure to a cluster through Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies
	InfrastructureManagementDeployCloudNativeInfrastructure = PermissionKey(uuid.MustParse("f7e70ffb-333d-43b3-a76e-0e6c63b9fbfa"))

	// InfrastructureManagementUndeployCloudNativeInfrastructure - This permission grants the user the ability to undeploy their infrastructure from a cluster through Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies
	InfrastructureManagementUndeployCloudNativeInfrastructure = PermissionKey(uuid.MustParse("6e7f6f4f-4321-4e42-9eff-6a8323f32e84"))

	// InfrastructureManagementViewCloudNativeInfrastructure - This permission grants the user the ability to view all cloud native infrastructure in Meshery. Meshery allows users to visualize, work on and manage various cloud native technologies.
	InfrastructureManagementViewCloudNativeInfrastructure = PermissionKey(uuid.MustParse("fdc485dc-f68b-405c-9e54-7b9a7254c282"))

	// WorkspaceManagementViewWorkspace - See all workspaces within an organization
	WorkspaceManagementViewWorkspace = PermissionKey(uuid.MustParse("bc9379e8-dc18-4655-b53c-c641271c4ba3"))

	// WorkspaceManagementDeleteWorkspace - Dissolve workspace and all team and environment memberships. Leave associated resources intact
	WorkspaceManagementDeleteWorkspace = PermissionKey(uuid.MustParse("09eb0507-2f14-4bc4-92c5-9e26a4efbd5e"))

	// WorkspaceManagementEditWorkspace - Edit workspace and it's team and environment membership
	WorkspaceManagementEditWorkspace = PermissionKey(uuid.MustParse("4112230f-5d1e-4d30-9790-942ad5c1dc50"))

	// WorkspaceManagementCreateWorkspace - Create new workspace
	WorkspaceManagementCreateWorkspace = PermissionKey(uuid.MustParse("eb42ac41-a883-465e-843c-d64e962a3a0e"))

	// WorkspaceManagementAssignTeamToWorkspace - Add new team to workspace
	WorkspaceManagementAssignTeamToWorkspace = PermissionKey(uuid.MustParse("6ab4263b-0bb3-492e-9878-6936a5b6312f"))

	// WorkspaceManagementRemoveTeamFromWorkspace - Remove team from workspace
	WorkspaceManagementRemoveTeamFromWorkspace = PermissionKey(uuid.MustParse("c4ed82f5-783d-4451-9b34-44f50cae71df"))

	// WorkspaceManagementAssignEnvironmentToWorkspace - Add new environment to workspace
	WorkspaceManagementAssignEnvironmentToWorkspace = PermissionKey(uuid.MustParse("f421fc20-c14a-4282-b526-776c6cacfd99"))

	// WorkspaceManagementRemoveEnvironmentFromWorkspace - Remove environment from workspace
	WorkspaceManagementRemoveEnvironmentFromWorkspace = PermissionKey(uuid.MustParse("d0657715-80fb-4b00-af27-b78bb0fa56df"))

	// WorkspaceManagementAssignDesignsToWorkspaces - Assign designs to workspaces
	WorkspaceManagementAssignDesignsToWorkspaces = PermissionKey(uuid.MustParse("64a1bad5-30f1-431a-aea0-8073d14a0262"))

	// WorkspaceManagementRemoveDesignsFromWorkspaces - Remove designs from workspaces
	WorkspaceManagementRemoveDesignsFromWorkspaces = PermissionKey(uuid.MustParse("076515f1-f696-4211-ae27-58d5463a229e"))

	// WorkspaceManagementConnectGithubAccountToWorkspace - No description available
	WorkspaceManagementConnectGithubAccountToWorkspace = PermissionKey(uuid.MustParse("410b2d3c-8194-44d1-9f80-7b5fea689b4f"))

	// WorkspaceManagementConnectGoogleAccountToWorkspace - Connect Google Account to Workspace
	WorkspaceManagementConnectGoogleAccountToWorkspace = PermissionKey(uuid.MustParse("69179641-6c41-40d8-87a0-81dd99bcb396"))

	// WorkspaceManagementViewConnections - View all connections within an environment
	WorkspaceManagementViewConnections = PermissionKey(uuid.MustParse("b35c9ce0-e787-4de6-8560-631007b0b947"))

	// WorkspaceManagementViewEnvironment - See all environments within an workspace.
	WorkspaceManagementViewEnvironment = PermissionKey(uuid.MustParse("e3656bbc-fba2-483d-9996-34f8614cd21b"))

	// WorkspaceManagementCreateEnvironment - Create a new environment
	WorkspaceManagementCreateEnvironment = PermissionKey(uuid.MustParse("a97b7f3b-3349-4a86-b917-2ce0b64a540b"))

	// WorkspaceManagementDeleteEnvironment - Dissolve environment and all connection memberships. Leave associated resources intact.
	WorkspaceManagementDeleteEnvironment = PermissionKey(uuid.MustParse("70747966-dfad-4523-93ce-bd7421258955"))

	// WorkspaceManagementEditEnvironment - Edit environment and it connection membership
	WorkspaceManagementEditEnvironment = PermissionKey(uuid.MustParse("145ab6ed-b4b6-4e34-ada5-78dada250f89"))

	// WorkspaceManagementAssignConnectionsToEnvironment - Add new connections to environments
	WorkspaceManagementAssignConnectionsToEnvironment = PermissionKey(uuid.MustParse("52cbe0b8-9aa7-4605-8eed-aa37e595adbb"))

	// WorkspaceManagementRemoveConnectionsFromEnvironments - Remove connections from environment, 
	WorkspaceManagementRemoveConnectionsFromEnvironments = PermissionKey(uuid.MustParse("65648682-e47f-43d7-a5ad-dc042803f951"))

	// WorkspaceManagementViewProjects - View all of your projects
	WorkspaceManagementViewProjects = PermissionKey(uuid.MustParse("141a5f3d-b5e2-4f36-8f83-df7f73744ee1"))

	// CatalogManagementViewCatalog - View all items in catalog
	CatalogManagementViewCatalog = PermissionKey(uuid.MustParse("0cd05106-36b6-4393-a08e-4222fc10c8de"))

	// CatalogManagementDeleteCatalogItems - Delete catalog items
	CatalogManagementDeleteCatalogItems = PermissionKey(uuid.MustParse("3264c9e7-d172-4b9f-bb5d-fe1bda1cdb20"))

	// CatalogManagementEditCatalogItems - Edit catalog items
	CatalogManagementEditCatalogItems = PermissionKey(uuid.MustParse("86a43f77-9e7d-441a-8fc5-68ea521ea43a"))

	// CatalogManagementUnpublishCatalogItems - Unpublish items from catalog
	CatalogManagementUnpublishCatalogItems = PermissionKey(uuid.MustParse("03824b03-a61e-403a-b17f-d8f4aea854d2"))

	// CatalogManagementDetailsOfCatalogItem - Set item information or details of a catalog item
	CatalogManagementDetailsOfCatalogItem = PermissionKey(uuid.MustParse("a52ee7bd-496c-4877-830e-f8812cd8d4b7"))

	// CatalogManagementDownloadCatalogItem - Download a catalog item
	CatalogManagementDownloadCatalogItem = PermissionKey(uuid.MustParse("7b04ebf8-744e-426f-8075-828cdfe44d51"))

	// CatalogManagementCloneCatalogItem - Clone any item from catalog
	CatalogManagementCloneCatalogItem = PermissionKey(uuid.MustParse("091e083b-78ae-4f03-b028-e36354460c5b"))

	// AcademyViewAcademyContent - Browse the public catalog of learning paths, challenges, and certifications.
	AcademyViewAcademyContent = PermissionKey(uuid.MustParse("40eb4949-ca16-4b7b-a9ae-4fe18f26fe1d"))

	// AcademyAccessTheAcademyConsole - View and assess the performance of learners and of your organization's academy content.
	AcademyAccessTheAcademyConsole = PermissionKey(uuid.MustParse("045fad17-d2cc-46e8-bb10-f9ee026c799f"))

	// AcademyAComprehensiveGuideToUsingTheInstructorConsoleLearnHowToTrackLearnerProgressAnalyzeTestPerformanceAndManageYourAcademySContentAndMetrics - No description available
	AcademyAComprehensiveGuideToUsingTheInstructorConsoleLearnHowToTrackLearnerProgressAnalyzeTestPerformanceAndManageYourAcademySContentAndMetrics = PermissionKey(uuid.MustParse("045fad17-d2cc-46e8-bb10-f9ee026c79cf"))

	// LearningPathManagementViewLearningPaths - View all learning paths
	LearningPathManagementViewLearningPaths = PermissionKey(uuid.MustParse("7116c095-d7b4-4ab8-9d55-f33bf9d13ecd"))

	// AcademyViewChallenges - View all challenges
	AcademyViewChallenges = PermissionKey(uuid.MustParse("5996d6c9-4037-404c-af83-92a0895ff7f0"))

	// AcademyCreateCertifications - No description available
	AcademyCreateCertifications = PermissionKey(uuid.MustParse("efd922b6-daff-4857-aaee-840637a5f696"))

	// SupportAndDeploymentWebhooks - Cloud uses webhooks to automate approval flows and email notifications. This guide will help you customize and add your own custom webhooks.
	SupportAndDeploymentWebhooks = PermissionKey(uuid.MustParse("df2c9b99-fad3-405b-9733-6cf10e1909ed"))

	// SupportAndDeploymentRestApiUserDocumentation - Provides a powerful and flexible way to interact with the platform, enabling automation, integration, and customization to optimize your cloud native development and management processes.
	SupportAndDeploymentRestApiUserDocumentation = PermissionKey(uuid.MustParse("90c75125-6506-496b-8704-91bf74532bd2"))

	// SupportAndDeploymentRestApiReference - Provides a powerful and flexible way to interact with the platform, enabling automation, integration, and customization to optimize your cloud native development and management processes.
	SupportAndDeploymentRestApiReference = PermissionKey(uuid.MustParse("776ec711-26aa-47b1-a822-b1b14192b1e7"))

	// SupportAndDeploymentWhiteLabel - Customize the appearance and branding of your engineering platform powered by Cloud.
	SupportAndDeploymentWhiteLabel = PermissionKey(uuid.MustParse("a27a55af-b71b-400f-a8b1-3f3b1afff4f6"))

	// SupportAndDeploymentCommunitySupport - Get help with most of your Meshery questions and issues in our Community Forum.
	SupportAndDeploymentCommunitySupport = PermissionKey(uuid.MustParse("1ae12fbe-32d9-46ef-9ae6-897f9a0017d6"))

	// SupportAndDeploymentStandardSupport - Support can help you troubleshoot issues you run into while using Meshery. Get support via the web.
	SupportAndDeploymentStandardSupport = PermissionKey(uuid.MustParse("e2131b18-fe30-47c2-84e7-0207bdc89f0e"))

	// SupportAndDeploymentPremiumAndPremiumPlusSupport - With Premium, get a 30-minute SLA and 24/7 web and phone support. With Premium Plus, get everything in Premium plus your own Support Account Manager and more.
	SupportAndDeploymentPremiumAndPremiumPlusSupport = PermissionKey(uuid.MustParse("e49c8c16-58e5-465e-be6d-a81b115c31ee"))

	// SupportAndDeploymentSelfHostedDeployment - Self-hosted Cloud for on-prem appliances or self-managed cloud tenants. Keep your designs internal to your workplace. Get remote support when you need it.
	SupportAndDeploymentSelfHostedDeployment = PermissionKey(uuid.MustParse("3e0aa2da-ca58-4109-a0cc-0dece0ec47c3"))

	// SupportAndDeploymentPhoneSupport - Support can help you troubleshoot issues you run into while using Meshery. Get support via phone.
	SupportAndDeploymentPhoneSupport = PermissionKey(uuid.MustParse("4e7cf974-7f6e-461c-989b-1176f2d46448"))

	// SupportAndDeploymentPayBillsViaInvoiceRatherThanUsingYourCreditCard - No description available
	SupportAndDeploymentPayBillsViaInvoiceRatherThanUsingYourCreditCard = PermissionKey(uuid.MustParse("f2d10bd7-62e3-4cc1-b376-a19e29d73b40"))

	// TrafficManagementFacilitateANetworkTapOfAnyRequestTraffic - No description available
	TrafficManagementFacilitateANetworkTapOfAnyRequestTraffic = PermissionKey(uuid.MustParse("5e5c5f1e-8bf5-4eaa-8f4e-78e7fabf857e"))

	// TrafficManagementVisualDefinitionsOfTrafficRules - No description available
	TrafficManagementVisualDefinitionsOfTrafficRules = PermissionKey(uuid.MustParse("9468ef99-04c5-43dc-b188-bd8fe03e4564"))

	// TrafficManagementDynamicLoadUnloadOfWasmFilters - No description available
	TrafficManagementDynamicLoadUnloadOfWasmFilters = PermissionKey(uuid.MustParse("cf3355b2-5bbc-43db-b464-4eb3a4c1a7c1"))

	// TrafficManagementConfigurationOfWasmFilters - No description available
	TrafficManagementConfigurationOfWasmFilters = PermissionKey(uuid.MustParse("a921366e-f158-479c-bfa7-6b8ec38016da"))

	// TrafficManagementViaWasmFilter - No description available
	TrafficManagementViaWasmFilter = PermissionKey(uuid.MustParse("aef9dd7f-139f-497c-b601-41177a054f2a"))

	// TrafficManagementFlaggerIntegration - No description available
	TrafficManagementFlaggerIntegration = PermissionKey(uuid.MustParse("9278cea4-ff9b-4d76-a2e8-5002059aba05"))

	// TrafficManagementArgoIntegration - No description available
	TrafficManagementArgoIntegration = PermissionKey(uuid.MustParse("5d1e560b-d56c-4a56-b5f4-35ea18ab7a83"))

	// ApplicationManagementGolangNativeExponentialBackoff - No description available
	ApplicationManagementGolangNativeExponentialBackoff = PermissionKey(uuid.MustParse("ec9db4e8-671e-41ff-a0de-842c25d6f421"))

	// ApplicationManagementGokit - No description available
	ApplicationManagementGokit = PermissionKey(uuid.MustParse("1b3e39ba-8d44-4d93-bd3c-202f6d111912"))

	// ApplicationManagementSpringBoot - No description available
	ApplicationManagementSpringBoot = PermissionKey(uuid.MustParse("39f0cb17-0d30-41c0-b305-04dd63f546cb"))

	// ApplicationManagementHystrix - No description available
	ApplicationManagementHystrix = PermissionKey(uuid.MustParse("d65229d7-341b-4986-8f1f-8dfb1673b909"))

	// ConfigurationManagementOpenListOfBestPracticesForIstio - Open list of best practices for Istio
	ConfigurationManagementOpenListOfBestPracticesForIstio = PermissionKey(uuid.MustParse("2af886a2-c2a2-44e9-ba62-ba256c7634b0"))

	// ConfigurationManagementProprietaryListOfBestPracticesForIstio - Proprietary list of best practices for Istio
	ConfigurationManagementProprietaryListOfBestPracticesForIstio = PermissionKey(uuid.MustParse("46f00b76-06ae-4b5c-9df5-3311e9fc4823"))

	// ConfigurationManagementVirtualservice - VirtualService
	ConfigurationManagementVirtualservice = PermissionKey(uuid.MustParse("9a84a5d0-0a16-11ee-be56-0242ac12fff2"))

	// ConfigurationManagementDestinationrule - DestinationRule
	ConfigurationManagementDestinationrule = PermissionKey(uuid.MustParse("12c5dbca-cdb4-4554-8a71-8c67c118071d"))

	// ConfigurationManagementMtlsPeerauthentication - mTLS (PeerAuthentication)
	ConfigurationManagementMtlsPeerauthentication = PermissionKey(uuid.MustParse("2e66a6b3-7ed5-4010-b1d2-f4d7035f0991"))

	// ConfigurationManagementAutomaticSidecarInjectionOnANamespace - Automatic Sidecar Injection on a Namespace
	ConfigurationManagementAutomaticSidecarInjectionOnANamespace = PermissionKey(uuid.MustParse("21bd0f2b-0ab6-4aac-a1aa-e4a02eb66b3c"))

	// ConfigurationManagementSidecars - Sidecars
	ConfigurationManagementSidecars = PermissionKey(uuid.MustParse("34b68c99-8ef9-4542-8c34-bf7587bfa1b0"))

	// ConfigurationManagementAuthorizationpolicy - AuthorizationPolicy
	ConfigurationManagementAuthorizationpolicy = PermissionKey(uuid.MustParse("d2eef103-0a0d-471f-b262-46af4f620826"))

	// ConfigurationManagementEnvoyfilters - EnvoyFilters
	ConfigurationManagementEnvoyfilters = PermissionKey(uuid.MustParse("c4b1a799-0ab0-4262-b832-9a3d53cfd185"))

	// ConfigurationManagementPeerauthentication - PeerAuthentication
	ConfigurationManagementPeerauthentication = PermissionKey(uuid.MustParse("b8a9ad4b-1ee2-4460-a8c8-2d55fe47bbfd"))

	// ConfigurationManagementIstioOperator - Istio Operator
	ConfigurationManagementIstioOperator = PermissionKey(uuid.MustParse("2209d9a6-c93b-4db1-894e-fdaacfcfc2d8"))

	// ConfigurationManagementIngressGatewayGateways - Ingress Gateway (Gateways)
	ConfigurationManagementIngressGatewayGateways = PermissionKey(uuid.MustParse("00b3c489-b923-40e4-aba7-8742aed3c63c"))

	// ConfigurationManagementEgressGatewayGateways - Egress Gateway (Gateways)
	ConfigurationManagementEgressGatewayGateways = PermissionKey(uuid.MustParse("3c22fb24-e768-4000-a6f4-1bf1b9a1aa83"))

	// ConfigurationManagementAddOnPrometheus - Add-on: Prometheus
	ConfigurationManagementAddOnPrometheus = PermissionKey(uuid.MustParse("a4d06ed9-958d-4a04-8d56-6658ebb9529e"))

	// ConfigurationManagementAddOnKiali - Add-on: Kiali
	ConfigurationManagementAddOnKiali = PermissionKey(uuid.MustParse("bcbc9ee9-cde6-4671-9317-bedd655dde83"))

	// ConfigurationManagementAddOnGrafana - Add-on: Grafana
	ConfigurationManagementAddOnGrafana = PermissionKey(uuid.MustParse("d64b7b6b-5931-4b61-85a1-664d62da8ffe"))

	// ConfigurationManagementAddOnZipkin - Add-on: Zipkin
	ConfigurationManagementAddOnZipkin = PermissionKey(uuid.MustParse("e1d939c7-de43-4d85-8ad4-eaada093467d"))

	// ConfigurationManagementAddOnJaeger - Add-on: Jaeger
	ConfigurationManagementAddOnJaeger = PermissionKey(uuid.MustParse("0054fc37-636d-46d4-b5b9-b0f8c20b777c"))

	// ConfigurationManagementCustomConfiguration - Custom Configuration
	ConfigurationManagementCustomConfiguration = PermissionKey(uuid.MustParse("2e32a426-c5a4-4ae3-83f1-1bd53b3adbe4"))

	// ConfigurationManagementIngress - Ingress
	ConfigurationManagementIngress = PermissionKey(uuid.MustParse("08872df8-e557-4cf2-85ce-1699a5ef5a65"))

	// ConfigurationManagementCanaryRollout - Canary Rollout
	ConfigurationManagementCanaryRollout = PermissionKey(uuid.MustParse("7258df9f-72d1-4491-9f06-a1e5fccbf3a4"))

	// WorkflowManagementSingleAndMultipleApprovers - No description available
	WorkflowManagementSingleAndMultipleApprovers = PermissionKey(uuid.MustParse("8b8b8eb2-00d5-4501-8c94-529f1b0b0f27"))

	// BusinessPerformanceShoppingCartBasedRealTimeDiscount - No description available
	BusinessPerformanceShoppingCartBasedRealTimeDiscount = PermissionKey(uuid.MustParse("b1e81301-0726-4d62-a920-c10ee5d563b0"))

	// BusinessPerformanceServerlessPricing - Subscription plan management. Transformation of workflow pricing model.
	BusinessPerformanceServerlessPricing = PermissionKey(uuid.MustParse("15d6ae21-7618-4511-afb8-044b7cd8249d"))

	// DigitalExperienceManagementFullstoryLikeCapabilities - No description available
	DigitalExperienceManagementFullstoryLikeCapabilities = PermissionKey(uuid.MustParse("08f20461-d2a7-44e4-91bb-e26d06cd4797"))

	// DigitalExperienceManagementLikePendoTellingUsersWhatTheyAreMissingHowToUseTheProduct - No description available
	DigitalExperienceManagementLikePendoTellingUsersWhatTheyAreMissingHowToUseTheProduct = PermissionKey(uuid.MustParse("41239cec-2e8b-48d8-959b-f595f9bcf3ab"))

	// DigitalExperienceManagementSimple - No description available
	DigitalExperienceManagementSimple = PermissionKey(uuid.MustParse("fd9752ed-ce05-41b7-953c-e841e2697ae9"))

	// DigitalExperienceManagementAdvanced - No description available
	DigitalExperienceManagementAdvanced = PermissionKey(uuid.MustParse("488d1bf0-44dc-401b-a1c6-dfe0e334891f"))

	// DigitalExperienceManagementScreenshots - Capture and share visual snapshots of your work with ease using our Screenshots feature.
	DigitalExperienceManagementScreenshots = PermissionKey(uuid.MustParse("dfe77e40-9263-4345-9288-4da24f0352ba"))

	// IncidentManagementEventsReportingOfAsynchronousEvents - No description available
	IncidentManagementEventsReportingOfAsynchronousEvents = PermissionKey(uuid.MustParse("2ccbcdf6-5aa0-43f2-b725-80e14003fc0b"))

	// IncidentManagementAuditTrail - Detailed accounting of user activity. Historical record or each action taken.
	IncidentManagementAuditTrail = PermissionKey(uuid.MustParse("27e30849-3184-4dd3-b9c3-17ce256c088e"))

	// IncidentManagementAlertGeneration - Dismiss individual; Dismiss bulk.
	IncidentManagementAlertGeneration = PermissionKey(uuid.MustParse("92bb8a04-8eb2-4486-bef9-1895ee6d6364"))

	// IncidentManagementPolicyBased - No description available
	IncidentManagementPolicyBased = PermissionKey(uuid.MustParse("41897757-9d14-42df-b21d-aed6f83b2743"))

	// IncidentManagementSlackNotifications - Threaded Slack Notifications
	IncidentManagementSlackNotifications = PermissionKey(uuid.MustParse("9f5250ff-c67b-432f-95bc-e2f369f45a47"))

	// IncidentManagementMesheryCloudNative - No description available
	IncidentManagementMesheryCloudNative = PermissionKey(uuid.MustParse("d936a286-cc39-4fd2-9b55-ff2179d9e11b"))

	// IncidentManagementIntegrationWGsuite - No description available
	IncidentManagementIntegrationWGsuite = PermissionKey(uuid.MustParse("3b03ce99-e380-4ee7-888d-adb7c076d4b8"))

	// IncidentManagementIntegrationWMicrosoftOutlook - No description available
	IncidentManagementIntegrationWMicrosoftOutlook = PermissionKey(uuid.MustParse("83d4bc06-3e41-452f-bdb7-30a542330923"))

	// IncidentManagementDatadog - No description available
	IncidentManagementDatadog = PermissionKey(uuid.MustParse("c0629e3a-767d-4ad2-9b75-219b08fd970a"))

	// IncidentManagementEventRecording - No description available
	IncidentManagementEventRecording = PermissionKey(uuid.MustParse("6d2799b7-640c-4ae9-8a37-2564077cc525"))

	// IncidentManagementEventReplay - No description available
	IncidentManagementEventReplay = PermissionKey(uuid.MustParse("3449fa41-bd7d-41c1-9533-af11d9eaff72"))

	// IncidentManagementTrafficReplay - Visual event replay in Kanvas
	IncidentManagementTrafficReplay = PermissionKey(uuid.MustParse("8f6d3691-e7ce-46fc-9311-b51447c3a54e"))

	// IncidentManagementComponentLogging - No description available
	IncidentManagementComponentLogging = PermissionKey(uuid.MustParse("1a10bf40-e17c-4498-8131-f54268eb870b"))

	// ChaosManagementLibraryOfExperiments - No description available
	ChaosManagementLibraryOfExperiments = PermissionKey(uuid.MustParse("599efa8b-0249-465b-8e68-bf65dcd58f72"))

	// ChaosManagementAsWasmFilters - No description available
	ChaosManagementAsWasmFilters = PermissionKey(uuid.MustParse("6060683b-fe85-4ae4-9cf7-97e6eeab1d4f"))

	// ChaosManagementAsSidecars - No description available
	ChaosManagementAsSidecars = PermissionKey(uuid.MustParse("c9bf2c2b-5095-49ac-9f78-8369e78e69a6"))

	// ChaosManagementAsDaemonsets - No description available
	ChaosManagementAsDaemonsets = PermissionKey(uuid.MustParse("b73d71ec-f5b2-4d0b-83de-6e2dccff5041"))

)

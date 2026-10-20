# Profile contract

A **profile** (`schemas/constructs/v1beta3/profile`) is a publishing or persona
profile: a named set of settings, owned by an organization, that a person or
brand publishes as, with the platform accounts it acts through linked to it as
Connections. It is its own construct.

It is **not**:

- the user account profile (`/api/identity/users/profile`, `getUserProfileById`),
- a performance profile (`v1beta3/performance_profile`, `/api/performance/profiles`),
- an environment (see [Moving off `purpose: profile`](#moving-off-purpose-profile)),
- a workspace.

## Why its own construct

Profiles were first carried as environments with `purpose: profile`
(meshery/schemas #1271). That mapping is deprecated. Access to a profile is
controlled through workspaces, the same way access to designs and environments
is, so a profile is modelled like an environment: an entity of its own,
assigned to any number of workspaces through a junction record.

## Shape

| Field | Owner | Notes |
| --- | --- | --- |
| `id`, `createdAt`, `updatedAt`, `deletedAt` | server | |
| `name` | client | Short handle. Not unique, like environment names. |
| `description` | client | Optional. |
| `organizationId` | client on create | Fixed after creation. |
| `owner` | required | Defaults to the creating user. The owner, or a holder of Edit Profile in a workspace the profile is assigned to, may transfer it. On account deletion it follows the same succession rule as designs. |
| `userId` | client | The user the profile represents, if any. Not unique. |
| `metadata` | client | Free-form settings. Credentials never belong here; link a Connection and its Credential instead. |

There is no uniqueness constraint on any client field.

## Access

- **Read:** members of any workspace the profile is assigned to, plus
  organization admins, holding View Profiles. A profile in no workspace is
  visible to its owner and organization admins only.
- **Write:** Create Profile, Edit Profile, Delete Profile. Edit Profile also
  covers linking and unlinking connections and transferring the owner. The
  owner may always edit their own profile.
- **Workspace assignment:** Assign profile to workspace, Remove profile from
  workspace.

## Routes

| Category (API Endpoints sheet) | Route | Operations |
| --- | --- | --- |
| Integrations / Profiles | `/api/profiles` | `getProfiles` (filters: `search`, `orgId`, `userId`), `createProfile` |
| Integrations / Profiles | `/api/profiles/{profileId}` | `getProfileById`, `updateProfile`, `deleteProfile` |
| Integrations / Profiles | `/api/profiles/{profileId}/connections` | `getProfileConnections` |
| Integrations / Profiles | `/api/profiles/{profileId}/connections/{connectionId}` | `addConnectionToProfile`, `removeConnectionFromProfile` |
| Workspaces / Workspaces | `/api/workspaces/{workspaceId}/profiles` | `getProfilesOfWorkspace` |
| Workspaces / Workspaces | `/api/workspaces/{workspaceId}/profiles/{profileId}` | `assignProfileToWorkspace`, `unassignProfileFromWorkspace` |

All operations are `x-internal: ["cloud"]`; Meshery Server does not serve
profiles. Connection links reuse the existing Connection construct through
`ProfileConnectionMapping`, which mirrors `EnvironmentConnectionMapping`.

## Permission keys

| Key | Key ID | Moniker | Guards |
| --- | --- | --- | --- |
| View Profiles | `77f8a444-f9ac-4cb5-bb26-832b53addf01` | `WorkspaceManagementViewProfiles` | `getProfiles`, `getProfileById`, `getProfileConnections` |
| Create Profile | `b71221e9-3247-4510-9175-14b9de4fb06e` | `WorkspaceManagementCreateProfile` | `createProfile` |
| Edit Profile | `b8f0c75c-39f6-488f-92c0-ab6add761266` | `WorkspaceManagementEditProfile` | `updateProfile`, `addConnectionToProfile`, `removeConnectionFromProfile` |
| Delete Profile | `cad76a9d-5718-4503-8293-570b495d82bc` | `WorkspaceManagementDeleteProfile` | `deleteProfile` |
| Assign profile to workspace | `d02cab86-8c22-411e-a82a-50b7a8446b6c` | `WorkspaceManagementAssignProfileToWorkspace` | `assignProfileToWorkspace` |
| Remove profile from workspace | `1d8adb54-5e28-419f-83b6-2ea5ab6843a0` | `WorkspaceManagementRemoveProfileFromWorkspace` | `unassignProfileFromWorkspace` |

`getProfilesOfWorkspace` is guarded the same way as the other workspace
listings.

## Moving off `purpose: profile`

Each environment with `purpose: profile` maps to one profile: the environment's
`name`, `owner` and `metadata` become the profile's `name`, `owner` and
`metadata` (and `owner` also its `userId`), its environment-connection links
become profile-connection links, and its workspace-environment mappings become
workspace-profile mappings. Once no consumer stores the value, `profile` is
removed from the environment `purpose` enum.

## Consumers

| Repo | What it must do |
| --- | --- |
| `layer5io/meshery-cloud` | Add the profile, profile-connection and workspace-profile tables, serve the routes above with the keys above, migrate `purpose = 'profile'` environments, then stop accepting that purpose. |
| Clients that read profiles | Move from environment purpose `profile` (or any project-specific profile route) to `/api/profiles`. |

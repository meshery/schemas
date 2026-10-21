package validation

import (
	"os"
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

const (
	profileEntitySpec       = "schemas/constructs/v1beta3/profile/profile.yaml"
	profileAPISpec          = "schemas/constructs/v1beta3/profile/api.yml"
	workspaceV1beta3APISpec = "schemas/constructs/v1beta3/workspace/api.yml"
)

// A profile is its own construct, assigned to workspaces the way designs and
// environments are, so access to it is controlled through workspaces. It
// replaced the environment `purpose: profile` value, which is removed from
// the enum with no migration.

// TestProfilePayloadIsClientSettableOnly pins the payload to the fields a
// client may supply. owner, id and the timestamps are server-owned.
func TestProfilePayloadIsClientSettableOnly(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), profileAPISpec))
	got := mappingKeys(mustLookup(t, doc, "components", "schemas", "ProfilePayload", "properties"))
	sort.Strings(got)
	want := []string{"description", "metadata", "name", "organizationId", "owner", "userId"}
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("ProfilePayload properties = %v, want exactly %v", got, want)
	}
	for _, method := range []string{"post"} {
		ref, _ := mappingValue(mustLookup(t, doc, "paths", "/api/profiles", method, "requestBody"), "$ref")
		if ref != "#/components/requestBodies/profilePayload" {
			t.Errorf("%s /api/profiles requestBody must reference profilePayload, got %v", method, ref)
		}
	}
	ref, _ := mappingValue(mustLookup(t, doc, "paths", "/api/profiles/{profileId}", "put", "requestBody"), "$ref")
	if ref != "#/components/requestBodies/profilePayload" {
		t.Errorf("PUT /api/profiles/{profileId} requestBody must reference profilePayload, got %v", ref)
	}
	if _, ok := mappingValue(mustLookup(t, doc, "paths", "/api/profiles", "post", "responses"), "201"); !ok {
		t.Error("createProfile must answer 201")
	}
}

// TestProfileEntityShape pins the entity's required server fields and the
// absence of any authority-bearing or project-specific field.
func TestProfileEntityShape(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), profileEntitySpec))
	if v, _ := mappingValue(doc, "additionalProperties"); v != false {
		t.Error("profile.yaml must set additionalProperties: false")
	}
	required := stringSliceOf(mustLookup(t, doc, "required"))
	for _, field := range []string{"id", "name", "organizationId", "owner", "createdAt", "updatedAt"} {
		found := false
		for _, r := range required {
			if r == field {
				found = true
			}
		}
		if !found {
			t.Errorf("profile.yaml must require %q", field)
		}
	}
	props := mappingKeys(mustLookup(t, doc, "properties"))
	for _, p := range props {
		if p == "purpose" || p == "workspaceId" || p == "slug" {
			t.Errorf("profile.yaml must not carry %q: a profile is not an environment, workspace access is a many-to-many mapping, and like environments it has no unique handle", p)
		}
	}
}

// TestProfileWorkspaceAssignmentMirrorsEnvironments pins the workspace
// sub-routes that make workspaces the access boundary for profiles.
func TestProfileWorkspaceAssignmentMirrorsEnvironments(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), workspaceV1beta3APISpec))
	paths := mustLookup(t, doc, "paths")
	cases := map[string]map[string]string{
		"/api/workspaces/{workspaceId}/profiles":             {"get": "getProfilesOfWorkspace"},
		"/api/workspaces/{workspaceId}/profiles/{profileId}": {"post": "assignProfileToWorkspace", "delete": "unassignProfileFromWorkspace"},
	}
	for path, ops := range cases {
		for method, want := range ops {
			got, _ := mappingValue(mustLookup(t, paths, path, method), "operationId")
			if got != want {
				t.Errorf("%s %s operationId = %v, want %s", method, path, got, want)
			}
		}
	}
	page, _ := mappingValue(mustLookup(t, paths, "/api/workspaces/{workspaceId}/profiles", "get", "responses", "200", "content", "application/json", "schema"), "$ref")
	if page != "../profile/api.yml#/components/schemas/ProfilePage" {
		t.Errorf("getProfilesOfWorkspace must return ProfilePage, got %v", page)
	}
	mustLookup(t, doc, "components", "schemas", "WorkspacesProfilesMapping", "properties", "profileId")
}

// TestEnvironmentPurposeHasNoProfileValue pins the removal of `profile` from
// both environment purpose enums and their generated constant names. A
// profile is never an environment, so neither the entity nor the payload may
// admit the value again.
func TestEnvironmentPurposeHasNoProfileValue(t *testing.T) {
	root := repoRootDir(t)
	entity := loadOpenAPIDocument(t, filepath.Join(root, environmentEntitySpec))
	purpose := mustLookup(t, entity, "properties", "purpose")
	api := loadOpenAPIDocument(t, filepath.Join(root, environmentAPISpec))
	payload := mustLookup(t, api, "components", "schemas", "EnvironmentPayloadPurpose")
	for name, schema := range map[string]any{"Environment.purpose": purpose, "EnvironmentPayloadPurpose": payload} {
		for _, v := range stringSliceOf(mustLookup(t, schema, "enum")) {
			if v == "profile" {
				t.Errorf("%s enum must not admit `profile`: profiles are their own construct", name)
			}
		}
		for _, v := range stringSliceOf(mustLookup(t, schema, "x-enum-varnames")) {
			if strings.HasSuffix(v, "Profile") {
				t.Errorf("%s x-enum-varnames must not carry %s", name, v)
			}
		}
	}
}

// TestProfileConstructIsGeneric keeps project names out of the construct.
func TestProfileConstructIsGeneric(t *testing.T) {
	root := repoRootDir(t)
	for _, rel := range []string{profileEntitySpec, profileAPISpec} {
		raw, err := os.ReadFile(filepath.Join(root, rel))
		if err != nil {
			t.Fatal(err)
		}
		if strings.Contains(strings.ToLower(string(raw)), "blowhorn") {
			t.Errorf("%s must not name a project", rel)
		}
	}
}

// TestProfileVisibilityWording keeps the read-access contract stated the same
// way everywhere: the owner always sees their own profile (even when it is in
// no workspace), seeing a profile does not reach its connections, and
// provider admins are not granted visibility automatically.
func TestProfileVisibilityWording(t *testing.T) {
	root := repoRootDir(t)
	raw, err := os.ReadFile(filepath.Join(root, profileAPISpec))
	if err != nil {
		t.Fatal(err)
	}
	api := string(raw)
	if strings.Contains(api, "visible to its owner and to organization admins only") {
		t.Error("profile API must not limit owner visibility to unassigned profiles")
	}
	for _, want := range []string{
		"whether or not it is assigned to any workspace",
		"does not grant access to its linked connections",
		"Provider admins do not see profiles automatically",
	} {
		if !strings.Contains(api, want) {
			t.Errorf("profile API description must state %q", want)
		}
	}
	doc := loadOpenAPIDocument(t, filepath.Join(root, profileAPISpec))
	desc, _ := mappingValue(mustLookup(t, doc, "paths", "/api/profiles/{profileId}", "get"), "description")
	if s, _ := desc.(string); !strings.Contains(s, "its owner") {
		t.Error("getProfileById description must name the owner as able to see the profile")
	}

	// The owner reads their own profile's connections without View Profiles,
	// so getProfileConnections must not demand that key of every caller.
	connDesc, _ := mappingValue(mustLookup(t, doc, "paths", "/api/profiles/{profileId}/connections", "get"), "description")
	cs, _ := connDesc.(string)
	if strings.Contains(cs, "Requires View Profiles and visibility of the profile") {
		t.Error("getProfileConnections description must not require View Profiles of the profile owner")
	}
	for _, want := range []string{
		"its owner",
		"The owner needs no permission key",
		"Provider admins are not granted visibility automatically",
		"does not grant access to its linked connections",
	} {
		if !strings.Contains(cs, want) {
			t.Errorf("getProfileConnections description must state %q", want)
		}
	}
}

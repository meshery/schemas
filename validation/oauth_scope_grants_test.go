package validation

import (
	"reflect"
	"sort"
	"strings"
	"testing"
)

// The scope map (build/oauth-scopes.json) says what each OAuth scope grants: one
// keychain and the permission keys that keychain carries. The sheet that
// build/permissions.csv is generated from can be refreshed, and a refresh that
// changes a keychain name or ID, or a key, would change what a token can do
// without any other check failing. The grants below are written out literally,
// copied from the map and the sheet. To change a grant, change this table in
// the same change.

type oauthScopeKeyPin struct {
	name string
	id   string
}

type oauthScopePin struct {
	keychain   string
	keychainID string
	keys       []oauthScopeKeyPin
}

var oauthScopePins = map[string]oauthScopePin{
	"content:read": {
		keychain:   "Content View",
		keychainID: "8108fb73-4fb2-4b57-87e7-6e18cb540b4b",
		keys: []oauthScopeKeyPin{
			{"CatalogManagementViewContentItems", "5cd87dc9-02c6-44a0-a019-281f7295ad08"},
		},
	},
	"content:write": {
		keychain:   "Content Edit",
		keychainID: "f6f0a84a-29f5-4dd4-ba0c-b9c300429406",
		keys: []oauthScopeKeyPin{
			{"CatalogManagementCreateContentItem", "5fb97ae1-49ed-490c-b17a-377bf5558585"},
			{"CatalogManagementEditContentItem", "06858261-c7eb-464a-a4b7-e29792a7ae54"},
		},
	},
	"schedule:read": {
		keychain:   "Schedule View",
		keychainID: "e3d90ac5-2bfa-4e5d-b7e8-356d3a258698",
		keys: []oauthScopeKeyPin{
			{"WorkflowManagementViewSchedules", "9eba0b6a-08d1-42a2-a2fa-dd5fc5aeb542"},
		},
	},
	"schedule:write": {
		keychain:   "Schedule Edit",
		keychainID: "7d41ff30-4224-4724-a944-9f9b9d7bbe68",
		keys: []oauthScopeKeyPin{
			{"WorkflowManagementCreateSchedule", "135c39f9-0a98-4db6-a7cd-42e903ab9d32"},
			{"WorkflowManagementEditSchedule", "6767b9a0-d138-4672-a8ba-26ce6e217c48"},
			{"WorkflowManagementPauseSchedules", "652c24f7-7fce-47c8-8bef-785ea4e788c4"},
		},
	},
	"connections:read": {
		keychain:   "Connection View",
		keychainID: "2c6d7797-aff8-431c-90aa-36971b871e88",
		keys: []oauthScopeKeyPin{
			{"WorkspaceManagementViewConnections", "b35c9ce0-e787-4de6-8560-631007b0b947"},
		},
	},
	"events:read": {
		keychain:   "Event View",
		keychainID: "25b6fbbb-6f83-43f9-a2d6-d5b722113665",
		keys: []oauthScopeKeyPin{
			{"EventsManagementViewEvents", "4fe3e6b9-3363-4e9d-bfd4-9cd5bd168e5a"},
		},
	},
	"account:read": {
		keychain:   "Account View",
		keychainID: "d33444c0-59b2-42e2-9f14-e9ce9ead9206",
		keys: []oauthScopeKeyPin{
			{"AccountManagementViewProfile", "fa7de118-2d08-4b07-b9d7-3e0baead6d04"},
		},
	},
}

// The keys added with the scopes and the request construct. WorkflowManagementPauseSchedules
// is granted by schedule:write above. The other two are granted by no scope:
// the deciding key is checked against every scope in TestScopeKeychainKeyMap.
var oauthNewKeyPins = []oauthScopeKeyPin{
	{"WorkflowManagementPauseSchedules", "652c24f7-7fce-47c8-8bef-785ea4e788c4"},
	{"WorkflowManagementViewRequests", "471f38b7-c09a-4ff8-9620-0e5f5fdc822a"},
	{"CatalogManagementDecideContentItemApprovals", "c7bbef80-dd16-4396-b028-152f1f85f080"},
}

// Each scope grants exactly its pinned keychain (by name and ID) and exactly its
// pinned keys (by name and ID), and each of those exists in build/permissions.csv
// with the pinned ID.
func TestOAuthScopeGrantsArePinned(t *testing.T) {
	root := repoRootDir(t)
	sf := readScopeFile(t, root)
	keys, keychains := readPermissionsCSV(t, root)

	var pinned, mapped []string
	for scope := range oauthScopePins {
		pinned = append(pinned, scope)
	}
	for scope := range sf.Scopes {
		mapped = append(mapped, scope)
	}
	sort.Strings(pinned)
	sort.Strings(mapped)
	if !reflect.DeepEqual(pinned, mapped) {
		t.Fatalf("scopes in build/oauth-scopes.json = %v, pinned = %v", mapped, pinned)
	}

	for _, scope := range pinned {
		want := oauthScopePins[scope]
		entry := sf.Scopes[scope]
		if entry.Keychain != want.keychain {
			t.Errorf("scope %s names keychain %q, pinned %q", scope, entry.Keychain, want.keychain)
		}
		if got, ok := keychains[want.keychain]; !ok {
			t.Errorf("scope %s: keychain %q is missing from build/permissions.csv", scope, want.keychain)
		} else if strings.TrimSpace(got) != want.keychainID {
			t.Errorf("scope %s: keychain %q has ID %s in build/permissions.csv, pinned %s", scope, want.keychain, got, want.keychainID)
		}

		var wantNames, gotNames []string
		for _, k := range want.keys {
			wantNames = append(wantNames, k.name)
			row, ok := keys[k.name]
			if !ok {
				t.Errorf("scope %s: key %s is missing from build/permissions.csv", scope, k.name)
				continue
			}
			if strings.TrimSpace(row.id) != k.id {
				t.Errorf("scope %s: key %s has ID %s in build/permissions.csv, pinned %s", scope, k.name, row.id, k.id)
			}
		}
		gotNames = append(gotNames, entry.Keys...)
		sort.Strings(wantNames)
		sort.Strings(gotNames)
		if !reflect.DeepEqual(gotNames, wantNames) {
			t.Errorf("scope %s grants keys %v, pinned %v", scope, gotNames, wantNames)
		}
	}

	for _, k := range oauthNewKeyPins {
		row, ok := keys[k.name]
		if !ok {
			t.Errorf("new key %s is missing from build/permissions.csv", k.name)
			continue
		}
		if strings.TrimSpace(row.id) != k.id {
			t.Errorf("new key %s has ID %s in build/permissions.csv, pinned %s", k.name, row.id, k.id)
		}
	}

	// A scope is exactly one keychain: no two scopes share one.
	seen := map[string]string{}
	for _, scope := range pinned {
		name := oauthScopePins[scope].keychain
		if other, dup := seen[name]; dup {
			t.Errorf("scopes %s and %s are pinned to keychain %q", other, scope, name)
		}
		seen[name] = scope
	}
}

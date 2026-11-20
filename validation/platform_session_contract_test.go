package validation

import (
	"encoding/json"
	"path/filepath"
	"strings"
	"testing"
)

// A desktop install reports which browser sign-ins it holds
// (reportDesktopPlatformSessions) and a hosted MCP tool answers "where is this
// account signed in?" from those reports (getPlatformSessions). Neither shape
// may carry a cookie, a token, a credential or a Google account email.
const platformSessionSpec = "schemas/constructs/v1beta3/connection/api.yml"

func TestPlatformSessionOperations(t *testing.T) {
	root := repoRootDir(t)
	doc := loadOpenAPIDocument(t, filepath.Join(root, platformSessionSpec))

	put := mustLookup(t, doc, "paths", "/api/integrations/connections/desktop/{installationId}/platform-sessions", "put")
	if got := mustValue(put, "operationId"); got != "reportDesktopPlatformSessions" {
		t.Errorf("report operationId = %v", got)
	}
	if _, ok := mappingValue(put, "x-mcp"); ok {
		t.Error("reportDesktopPlatformSessions writes; it must never carry x-mcp")
	}
	for _, code := range []string{"200", "400", "401", "403", "404", "429", "500"} {
		if _, ok := mappingValue(mustLookup(t, put, "responses"), code); !ok {
			t.Errorf("reportDesktopPlatformSessions must document a %s response", code)
		}
	}

	get := mustLookup(t, doc, "paths", "/api/integrations/platform-sessions", "get")
	if got := mustValue(get, "operationId"); got != "getPlatformSessions" {
		t.Errorf("read operationId = %v", got)
	}
	mcp := mustLookup(t, get, "x-mcp")
	if got := mustValue(mcp, "scope"); got != "connections:read" {
		t.Errorf("getPlatformSessions scope = %v, want connections:read", got)
	}
	params, _ := mustValue(get, "parameters").([]any)
	seen := map[string]bool{}
	for _, p := range params {
		if name, ok := mappingValue(p, "name"); ok {
			seen[name.(string)] = true
		}
	}
	for _, name := range []string{"platform", "handle", "state", "installationId"} {
		if !seen[name] {
			t.Errorf("getPlatformSessions must take the %q filter", name)
		}
	}

	// Tenancy is Cloud's: the read declares the 404 for a non-member and the
	// 403 for a member without permission, says so, and takes no parameter
	// that lets a caller name another user or a tenant except the organization
	// selector.
	for _, code := range []string{"400", "401", "403", "404", "500"} {
		if _, ok := mappingValue(mustLookup(t, get, "responses"), code); !ok {
			t.Errorf("getPlatformSessions must document a %s response", code)
		}
	}
	desc, _ := mustValue(get, "description").(string)
	for _, want := range []string{"Tenancy is enforced by the server", "never by a client, a gateway or an MCP tool", "`getConnections`", "`404`", "`403`"} {
		if !strings.Contains(strings.Join(strings.Fields(desc), " "), want) {
			t.Errorf("getPlatformSessions description must state %q", want)
		}
	}
	allowed := map[string]bool{"page": true, "pageSize": true, "platform": true, "handle": true, "state": true, "installationId": true}
	for _, p := range params {
		if ref, ok := mappingValue(p, "$ref"); ok {
			if !strings.HasSuffix(ref.(string), "/currentOrgId") && !strings.HasSuffix(ref.(string), "/page") && !strings.HasSuffix(ref.(string), "/pageSize") {
				t.Errorf("getPlatformSessions takes an unexpected parameter %v", ref)
			}
			continue
		}
		if name, ok := mappingValue(p, "name"); ok && !allowed[name.(string)] {
			t.Errorf("getPlatformSessions must not take %q: it could name another user or tenant", name)
		}
	}

	// Only the report writes the stored sessions: an edit carries them forward.
	upd := mustLookup(t, doc, "paths", "/api/integrations/connections/{connectionId}", "put")
	updDesc := strings.Join(strings.Fields(mustValue(upd, "description").(string)), " ")
	for _, want := range []string{"`platformSessions`", "`platformSessionsReportedAt`", "carried forward from the stored row", "reportDesktopPlatformSessions"} {
		if !strings.Contains(updDesc, want) {
			t.Errorf("updateConnection description must say %q", want)
		}
	}
	// The permission behind the read is named, and totalCount is counted after scoping.
	for _, want := range []string{"`View Connections`", "`totalCount` counts only rows the caller may see"} {
		if !strings.Contains(strings.Join(strings.Fields(desc), " "), want) {
			t.Errorf("getPlatformSessions description must state %q", want)
		}
	}

	meta := mustLookup(t, doc, "components", "schemas", "DesktopConnectionMetadata", "properties")
	for _, name := range []string{"platformSessions", "platformSessionsReportedAt"} {
		if _, ok := mappingValue(meta, name); !ok {
			t.Errorf("DesktopConnectionMetadata must define %q", name)
		}
	}
}

// secretKeys are property names no platform session shape may define.
var platformSessionSecretKeys = []string{
	"cookie", "token", "password", "secret", "credential", "authorization", "email",
	"account", "gaia", "sessiondir", "lockpid",
}

func TestPlatformSessionShapesCarryNoSecrets(t *testing.T) {
	doc := loadSpec(t, platformSessionSpec)
	for _, name := range []string{
		"PlatformSession", "PlatformSessionChromeProfile", "PlatformSessionsReport",
		"DesktopPlatformSessions", "PlatformSessionHost", "PlatformSessionLocation", "PlatformSessionLocationPage",
	} {
		schema := schemaOf(t, doc, name)
		if schema.AdditionalProperties.Has == nil || *schema.AdditionalProperties.Has {
			t.Errorf("%s must set additionalProperties: false so an unnamed key is refused", name)
		}
		for prop := range schema.Properties {
			for _, bad := range platformSessionSecretKeys {
				if strings.Contains(strings.ToLower(prop), bad) {
					t.Errorf("%s defines %q, which could carry a secret or a Google account email", name, prop)
				}
			}
		}
	}
}

// The acceptance sample: the answer for "where is X @blowhorn_ai signed in?".
func TestPlatformSessionSamplesValidate(t *testing.T) {
	doc := loadSpec(t, platformSessionSpec)
	var report, page map[string]any
	if err := json.Unmarshal([]byte(`{
	  "sessions": [{
	    "platform": "x",
	    "handle": "blowhorn_ai",
	    "state": "signed_in",
	    "lastVerifiedAt": "2026-11-20T21:30:00Z",
	    "blowhornProfile": "blowhorn",
	    "chromeProfile": {"directory": "Profile 1", "displayName": "Blowhorn"},
	    "identity": "ok",
	    "socialConnectionId": "6f1d3a52-8f0b-4c0e-9d57-2b1e4a7c9a10"
	  }]
	}`), &report); err != nil {
		t.Fatal(err)
	}
	if err := schemaOf(t, doc, "PlatformSessionsReport").VisitJSON(report); err != nil {
		t.Errorf("sample report does not validate: %v", err)
	}
	if err := json.Unmarshal([]byte(`{
	  "locations": [{
	    "desktop": {
	      "connectionId": "0b9c1f7e-3d4a-4e8b-a6c2-5f7d8e9a1b23",
	      "installationId": "3f1c2d4e-5a6b-4c7d-8e9f-0a1b2c3d4e5f",
	      "hostname": "MacBook-Air.local",
	      "os": "macos",
	      "status": "connected",
	      "lastSeenAt": "2026-11-20T21:31:10Z",
	      "reportedAt": "2026-11-20T21:30:02Z"
	    },
	    "session": {
	      "platform": "x",
	      "handle": "blowhorn_ai",
	      "state": "signed_in",
	      "lastVerifiedAt": "2026-11-20T21:30:00Z",
	      "blowhornProfile": "blowhorn",
	      "chromeProfile": {"directory": "Profile 1", "displayName": "Blowhorn"},
	      "identity": "ok"
	    }
	  }],
	  "totalCount": 1, "page": 0, "pageSize": 10
	}`), &page); err != nil {
		t.Fatal(err)
	}
	if err := schemaOf(t, doc, "PlatformSessionLocationPage").VisitJSON(page); err != nil {
		t.Errorf("sample answer does not validate: %v", err)
	}

	// A report that smuggles a cookie, or a Google account email, is refused.
	for name, extra := range map[string]map[string]any{
		"cookie":        {"cookie": "x"},
		"google email":  {"email": "someone@example.com"},
		"unknown state": {"state": "maybe"},
	} {
		session := map[string]any{"platform": "x", "state": "signed_in", "lastVerifiedAt": "2026-11-20T21:30:00Z"}
		for k, v := range extra {
			session[k] = v
		}
		if err := schemaOf(t, doc, "PlatformSession").VisitJSON(session); err == nil {
			t.Errorf("a session with %s validated; it must be refused", name)
		}
	}
	// An email cannot ride in a free-text field, and every closed shape refuses an extra key.
	for name, bad := range map[string]map[string]any{
		"handle email":     {"handle": "someone@example.com"},
		"handle with @":    {"handle": "@blowhorn_ai"},
		"profile email":    {"blowhornProfile": "someone@example.com"},
		"chrome with mail": {"chromeProfile": map[string]any{"directory": "Profile 1", "displayName": "someone@example.com"}},
		"chrome extra key": {"chromeProfile": map[string]any{"directory": "Profile 1", "account": "someone@example.com"}},
	} {
		session := map[string]any{"platform": "x", "state": "signed_in", "lastVerifiedAt": "2026-11-20T21:30:00Z"}
		for k, v := range bad {
			session[k] = v
		}
		if err := schemaOf(t, doc, "PlatformSession").VisitJSON(session); err == nil {
			t.Errorf("a session with %s validated; it must be refused", name)
		}
	}
	if err := schemaOf(t, doc, "PlatformSessionsReport").VisitJSON(map[string]any{"sessions": []any{}, "cookie": "x"}); err == nil {
		t.Error("a report with an extra key validated; it must be refused")
	}
	if err := schemaOf(t, doc, "PlatformSessionHost").VisitJSON(map[string]any{
		"connectionId": "0b9c1f7e-3d4a-4e8b-a6c2-5f7d8e9a1b23", "installationId": "i", "status": "connected", "metadata": map[string]any{},
	}); err == nil {
		t.Error("a host with an extra key validated; it must be refused")
	}
	// The report is bounded.
	many := make([]any, 65)
	for i := range many {
		many[i] = map[string]any{"platform": "x", "state": "unknown", "lastVerifiedAt": "2026-11-20T21:30:00Z"}
	}
	if err := schemaOf(t, doc, "PlatformSessionsReport").VisitJSON(map[string]any{"sessions": many}); err == nil {
		t.Error("a report of 65 sessions validated; it must be bounded at 64")
	}
}

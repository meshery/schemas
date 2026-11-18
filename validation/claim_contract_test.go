package validation

import (
	"path/filepath"
	"reflect"
	"testing"
)

// A claim is held by a connection on behalf of the session user, keeps its
// history, and records the outcome its releaser reports.
func TestClaimHolderAndOutcomeContract(t *testing.T) {
	entity := loadYAMLMap(t, claimV1beta3Entity)
	props := entity["properties"].(map[string]any)

	if _, has := props["claimant"]; has {
		t.Errorf("Claim must not carry the free-text claimant; the holder is claimantConnectionId")
	}
	for _, name := range []string{"claimantConnectionId", "claimantUserId", "renewedAt", "outcome", "outcomeError", "outcomeEventId", "releasedBy"} {
		if _, ok := props[name]; !ok {
			t.Errorf("Claim must carry %q", name)
		}
	}
	for name, db := range map[string]string{
		"claimantConnectionId": "claimant_connection_id",
		"claimantUserId":       "claimant_user_id",
		"renewedAt":            "renewed_at",
		"outcome":              "outcome",
		"outcomeError":         "outcome_error",
		"outcomeEventId":       "outcome_event_id",
		"releasedBy":           "released_by",
	} {
		tags, _ := props[name].(map[string]any)["x-oapi-codegen-extra-tags"].(map[string]any)
		if got, _ := tags["db"].(string); got != db {
			t.Errorf("Claim.%s db tag = %q, want %q", name, got, db)
		}
	}
	if got := sequenceStrings(props["outcome"].(map[string]any)["enum"]); !reflect.DeepEqual(got, []string{"completed", "failed", "cancelled"}) {
		t.Errorf("Claim outcome enum = %v", got)
	}
	required := sequenceStrings(entity["required"])
	for _, name := range []string{"claimantUserId", "outcome", "releasedBy"} {
		for _, r := range required {
			if r == name {
				t.Errorf("Claim.%s is absent on some rows and must not be required", name)
			}
		}
	}

	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), claimV1beta3Spec))
	// The holder is a connection; the user comes from the session, never the body.
	for _, payload := range []string{"ClaimPayload", "ClaimRenewPayload"} {
		props := mustLookup(t, doc, "components", "schemas", payload, "properties")
		if _, has := mappingValue(props, "connectionId"); !has {
			t.Errorf("%s must name the claiming connection", payload)
		}
		for _, name := range []string{"claimant", "claimantUserId", "organizationId", "status", "expiresAt"} {
			if _, has := mappingValue(props, name); has {
				t.Errorf("%s must not carry %q", payload, name)
			}
		}
		if got := sequenceStrings(mustLookup(t, doc, "components", "schemas", payload, "required")); !containsString(got, "connectionId") {
			t.Errorf("%s must require connectionId, got %v", payload, got)
		}
	}
	// The release route takes the outcome.
	release := mustLookup(t, doc, "components", "schemas", "ClaimReleasePayload")
	if got := sequenceStrings(mustValue(release, "required")); !reflect.DeepEqual(got, []string{"outcome"}) {
		t.Errorf("ClaimReleasePayload required = %v, want [outcome]", got)
	}
	for _, name := range []string{"outcome", "outcomeError", "outcomeEventId"} {
		if _, has := mappingValue(mustValue(release, "properties"), name); !has {
			t.Errorf("ClaimReleasePayload must carry %q", name)
		}
	}
	// A replay of a claim the same connection holds answers 200.
	if _, ok := mappingValue(mustLookup(t, doc, "paths", "/api/claims", "post", "responses"), "200"); !ok {
		t.Errorf("createClaim must answer 200 for a replay")
	}
	// The list filters by holder, user, outcome and claim time.
	params := mustLookup(t, doc, "paths", "/api/claims", "get", "parameters")
	names := map[string]bool{}
	for _, p := range params.([]any) {
		if m, ok := p.(map[string]any); ok {
			if n, ok := m["name"].(string); ok {
				names[n] = true
			}
		}
	}
	for _, n := range []string{"claimantConnectionId", "claimantUserId", "status", "outcome", "claimedSince", "claimedUntil", "resourceType", "resourceId"} {
		if !names[n] {
			t.Errorf("listClaims must filter by %q", n)
		}
	}
	if names["claimant"] {
		t.Errorf("listClaims must not filter by the retired claimant")
	}
}

// Members read a narrow summary of the organization's desktop connections.
func TestDesktopConnectionsOfOrganizationContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/connection/api.yml"))
	op := mustLookup(t, doc, "paths", "/api/integrations/connections/desktop", "get")
	if got := mustValue(op, "operationId"); got != "getDesktopConnectionsOfOrganization" {
		t.Errorf("operationId = %v", got)
	}
	props := mustLookup(t, doc, "components", "schemas", "ConnectionSummary", "properties").(map[string]any)
	got := []string{}
	for k := range props {
		got = append(got, k)
	}
	// organizationId is declared because this projection is additionalProperties: false.
	// Without it the server could not return the connection's organization on the list.
	want := map[string]bool{"id": true, "name": true, "kind": true, "owner": true, "status": true, "lastSeenAt": true, "organizationId": true}
	if len(got) != len(want) {
		t.Errorf("ConnectionSummary properties = %v, want exactly %v", got, want)
	}
	for _, k := range got {
		if !want[k] {
			t.Errorf("ConnectionSummary must not carry %q", k)
		}
	}
	if v, _ := mustLookup(t, doc, "components", "schemas", "ConnectionSummary").(map[string]any)["additionalProperties"].(bool); v {
		t.Errorf("ConnectionSummary must set additionalProperties: false")
	}
}

func containsString(list []string, s string) bool {
	for _, v := range list {
		if v == s {
			return true
		}
	}
	return false
}

// A content item records who created it, from the session.
func TestContentItemCreatedByContract(t *testing.T) {
	entity := loadYAMLMap(t, "schemas/constructs/v1beta3/content_item/content_item.yaml")
	props := entity["properties"].(map[string]any)
	cb, ok := props["createdBy"].(map[string]any)
	if !ok {
		t.Fatalf("ContentItem must carry createdBy")
	}
	if got, _ := cb["x-oapi-codegen-extra-tags"].(map[string]any)["db"].(string); got != "created_by" {
		t.Errorf("createdBy db tag = %q", got)
	}
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), "schemas/constructs/v1beta3/content_item/api.yml"))
	if _, has := mappingValue(mustLookup(t, doc, "components", "schemas", "ContentItemPayload", "properties"), "createdBy"); has {
		t.Errorf("ContentItemPayload must not carry the server-derived createdBy")
	}
}

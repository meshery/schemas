package validation

import (
	"path/filepath"
	"sort"
	"strings"
	"testing"
)

const (
	mentionAliasEntitySpec = "schemas/constructs/v1beta3/mention_alias/mention_alias.yaml"
	mentionAliasAPISpec    = "schemas/constructs/v1beta3/mention_alias/api.yml"
)

// A mention alias is keyed by (organization, lower(entity), platform). The
// organization comes from the session and the confirming user from the
// caller, so neither may ever reach the write payload; and because the write
// replaces the stored handle, handle stays required (an empty handle is the
// confirmed answer "plain text", never "keep what is stored").
// docs/mention-alias-contract.md is the prose form of this contract.

func TestMentionAliasPayloadIsClientSettableOnly(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mentionAliasAPISpec))
	payload := mustLookup(t, doc, "components", "schemas", "MentionAliasPayload")

	got := mappingKeys(mustLookup(t, payload, "properties"))
	sort.Strings(got)
	want := []string{"entity", "handle", "platform"}
	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("MentionAliasPayload properties = %v, want exactly %v", got, want)
	}
	required := stringSliceOf(mustLookup(t, payload, "required"))
	sort.Strings(required)
	if strings.Join(required, ",") != strings.Join(want, ",") {
		t.Errorf("MentionAliasPayload required = %v, want %v (the write replaces the handle)", required, want)
	}

	upsert := mustLookup(t, doc, "paths", "/api/mention-aliases", "post")
	if id, _ := mappingValue(upsert, "operationId"); id != "upsertMentionAliases" {
		t.Errorf("POST /api/mention-aliases operationId = %v, want upsertMentionAliases", id)
	}
	ref, _ := mustLookup(t, upsert, "requestBody", "content", "application/json", "schema", "$ref").(string)
	if ref != "#/components/schemas/MentionAliasesPayload" {
		t.Errorf("upsertMentionAliases body = %q, want MentionAliasesPayload", ref)
	}
	items, _ := mustLookup(t, doc, "components", "schemas", "MentionAliasesPayload", "properties", "mentionAliases", "items", "$ref").(string)
	if items != "#/components/schemas/MentionAliasPayload" {
		t.Errorf("MentionAliasesPayload items = %q, want MentionAliasPayload", items)
	}
	responses := mustLookup(t, upsert, "responses")
	if _, ok := mappingValue(responses, "201"); ok {
		t.Error("upsertMentionAliases is an upsert and answers 200, never 201")
	}
	if got, _ := mustLookup(t, responses, "200", "content", "application/json", "schema", "items", "$ref").(string); got != "#/components/schemas/MentionAlias" {
		t.Errorf("upsertMentionAliases 200 items = %q, want MentionAlias", got)
	}
}

func TestMentionAliasEntityShape(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mentionAliasEntitySpec))
	if v, _ := mappingValue(doc, "additionalProperties"); v != false {
		t.Error("mention_alias.yaml must set additionalProperties: false")
	}
	required := stringSliceOf(mustLookup(t, doc, "required"))
	sort.Strings(required)
	want := []string{"createdAt", "entity", "handle", "id", "organizationId", "platform", "updatedAt"}
	if strings.Join(required, ",") != strings.Join(want, ",") {
		t.Errorf("mention_alias.yaml required = %v, want %v", required, want)
	}
	if _, ok := mappingValue(mustLookup(t, doc, "properties"), "deletedAt"); ok {
		t.Error("a mention alias is removed, not soft-deleted, so its key can be written again")
	}
}

func TestMentionAliasRoutes(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mentionAliasAPISpec))
	paths := mustLookup(t, doc, "paths")
	got := mappingKeys(paths)
	sort.Strings(got)
	if strings.Join(got, ",") != "/api/mention-aliases,/api/mention-aliases/{mentionAliasId}" {
		t.Errorf("mention alias paths = %v; the organization comes from the session, never the path", got)
	}

	cases := []struct{ path, method, operationID string }{
		{"/api/mention-aliases", "get", "getMentionAliases"},
		{"/api/mention-aliases", "post", "upsertMentionAliases"},
		{"/api/mention-aliases/{mentionAliasId}", "delete", "deleteMentionAlias"},
	}
	for _, c := range cases {
		op := mustLookup(t, paths, c.path, c.method)
		if id, _ := mappingValue(op, "operationId"); id != c.operationID {
			t.Errorf("%s %s operationId = %v, want %s", c.method, c.path, id, c.operationID)
		}
		if got := sequenceStrings(mustLookup(t, op, "x-internal")); len(got) != 1 || got[0] != "cloud" {
			t.Errorf("%s x-internal = %v, want [cloud]", c.operationID, got)
		}
		responses := mustLookup(t, op, "responses")
		for _, code := range []string{"401", "403", "404", "429", "500"} {
			if _, ok := mappingValue(responses, code); !ok {
				t.Errorf("%s must document %s", c.operationID, code)
			}
		}
	}

	list := mustLookup(t, paths, "/api/mention-aliases", "get")
	if ref, _ := mustLookup(t, list, "responses", "200", "content", "application/json", "schema", "$ref").(string); ref != "#/components/schemas/MentionAliasPage" {
		t.Errorf("getMentionAliases 200 = %q, want MentionAliasPage", ref)
	}
	page := mustLookup(t, doc, "components", "schemas", "MentionAliasPage", "properties")
	keys := mappingKeys(page)
	sort.Strings(keys)
	if strings.Join(keys, ",") != "mentionAliases,page,pageSize,totalCount" {
		t.Errorf("MentionAliasPage properties = %v, want the camelCase page envelope", keys)
	}
	entity := mustLookup(t, doc, "components", "parameters", "entity", "schema")
	if typ, _ := mappingValue(entity, "type"); typ != "array" {
		t.Errorf("entity query parameter type = %v, want a repeatable array", typ)
	}
}

func TestMentionAliasPlatformEnum(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mentionAliasAPISpec))
	platform := mustLookup(t, doc, "components", "schemas", "MentionAliasPlatform")
	values := stringSliceOf(mustLookup(t, platform, "enum"))
	names := stringSliceOf(mustLookup(t, platform, "x-enum-varnames"))
	if strings.Join(values, ",") != "linkedin,x,bluesky,reddit,slack" {
		t.Errorf("MentionAliasPlatform enum = %v", values)
	}
	if len(names) != len(values) {
		t.Fatalf("x-enum-varnames has %d names for %d values", len(names), len(values))
	}
	for _, name := range names {
		if !strings.HasPrefix(name, "MentionAliasPlatform") {
			t.Errorf("enum varname %q must be qualified with MentionAliasPlatform", name)
		}
	}
}

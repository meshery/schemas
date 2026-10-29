package validation

import (
	"path/filepath"
	"strings"
	"testing"
)

// The media asset contract (docs/media-asset-contract.md): an asset is
// referenced by id, a transfer URL is minted per use and never stored, no
// schema carries a storage credential, and the create payload cannot set a
// server-owned field.

const mediaAssetDir = "schemas/constructs/v1beta3/media_asset"

// Substrings that name a storage credential or a storage location. None may
// appear in a property name anywhere in the construct.
var mediaAssetForbiddenPropertyParts = []string{
	"secret", "token", "password", "credential", "bucket",
	"accesskey", "objectkey", "storagekey", "apikey", "authorization",
}

func collectPropertyNames(node any, out map[string]bool) {
	switch n := node.(type) {
	case map[string]any:
		if props, ok := n["properties"].(map[string]any); ok {
			for name := range props {
				out[name] = true
			}
		}
		for _, v := range n {
			collectPropertyNames(v, out)
		}
	case []any:
		for _, v := range n {
			collectPropertyNames(v, out)
		}
	}
}

func TestMediaAssetCarriesNoStorageCredential(t *testing.T) {
	root := repoRootDir(t)
	for _, file := range []string{"api.yml", "media_asset.yaml"} {
		doc := loadOpenAPIDocument(t, filepath.Join(root, mediaAssetDir, file))
		names := map[string]bool{}
		collectPropertyNames(doc, names)
		for name := range names {
			lower := strings.ToLower(name)
			for _, part := range mediaAssetForbiddenPropertyParts {
				if strings.Contains(lower, part) {
					t.Errorf("%s: property %q names a storage credential or location (%q)", file, name, part)
				}
			}
		}
	}
}

// The stored asset never holds a URL: a download URL is minted per use.
func TestMediaAssetEntityStoresNoURL(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mediaAssetDir, "media_asset.yaml"))
	if got := mustValue(doc, "additionalProperties"); got != false {
		t.Errorf("media_asset.yaml additionalProperties = %v, want false", got)
	}
	props, _ := mustValue(doc, "properties").(map[string]any)
	for name := range props {
		if strings.Contains(strings.ToLower(name), "url") {
			t.Errorf("MediaAsset property %q stores a URL; a URL is minted by getMediaAssetDownload and never stored", name)
		}
	}
}

func TestMediaAssetPayloadExcludesServerOwnedFields(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mediaAssetDir, "api.yml"))
	for _, schema := range []string{"MediaAssetPayload", "MediaAssetUpdatePayload"} {
		payload := mustLookup(t, doc, "components", "schemas", schema)
		if got := mustValue(payload, "additionalProperties"); got != false {
			t.Errorf("%s additionalProperties = %v, want false", schema, got)
		}
		props, _ := mustValue(payload, "properties").(map[string]any)
		for _, owned := range []string{
			"id", "organizationId", "createdBy", "kind", "status", "rejectionReason",
			"externalId", "completedAt", "expiresAt", "createdAt", "updatedAt", "deletedAt",
		} {
			if _, ok := props[owned]; ok {
				t.Errorf("%s must not accept server-owned %q", schema, owned)
			}
		}
	}
	update, _ := mustValue(mustLookup(t, doc, "components", "schemas", "MediaAssetUpdatePayload"), "properties").(map[string]any)
	if len(update) != 1 {
		t.Errorf("MediaAssetUpdatePayload must carry retainUntil alone, got %d properties", len(update))
	}
}

func TestMediaAssetOperations(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mediaAssetDir, "api.yml"))

	cases := []struct {
		path, method, id, success, schemaRef string
	}{
		{"/api/media-assets", "get", "listMediaAssets", "200", "#/components/schemas/MediaAssetPage"},
		{"/api/media-assets", "post", "createMediaAsset", "201", "#/components/schemas/MediaAssetUpload"},
		{"/api/media-assets/quota", "get", "getMediaAssetQuota", "200", "#/components/schemas/MediaAssetQuota"},
		{"/api/media-assets/{mediaAssetId}", "get", "getMediaAsset", "200", "#/components/schemas/MediaAsset"},
		{"/api/media-assets/{mediaAssetId}", "put", "updateMediaAsset", "200", "#/components/schemas/MediaAsset"},
		{"/api/media-assets/{mediaAssetId}", "delete", "deleteMediaAsset", "204", ""},
		{"/api/media-assets/{mediaAssetId}/complete", "post", "completeMediaAsset", "200", "#/components/schemas/MediaAsset"},
		{"/api/media-assets/{mediaAssetId}/download", "get", "getMediaAssetDownload", "200", "#/components/schemas/MediaAssetTransfer"},
		{"/api/media-assets/{mediaAssetId}/content", "get", "getMediaAssetContent", "200", ""},
	}
	for _, c := range cases {
		op := mustLookup(t, doc, "paths", c.path, c.method)
		if got := mustValue(op, "operationId"); got != c.id {
			t.Errorf("%s %s operationId = %v, want %s", c.method, c.path, got, c.id)
		}
		if got := sequenceStrings(mustLookup(t, op, "x-internal")); len(got) != 1 || got[0] != "cloud" {
			t.Errorf("%s x-internal = %v, want [cloud]", c.id, got)
		}
		resp := mustLookup(t, op, "responses", c.success)
		if c.schemaRef != "" {
			if got := mustLookup(t, resp, "content", "application/json", "schema", "$ref"); got != c.schemaRef {
				t.Errorf("%s %s schema = %v, want %s", c.id, c.success, got, c.schemaRef)
			}
		}
		_, overridesSecurity := mappingValue(op, "security")
		if c.id == "getMediaAssetContent" {
			// The signed relay is reached without a session: the signature is the grant.
			if sec, _ := mappingValue(op, "security"); sec == nil || len(sec.([]any)) != 0 {
				t.Errorf("getMediaAssetContent security = %v, want []", sec)
			}
		} else if overridesSecurity {
			t.Errorf("%s must keep the session (jwt) security", c.id)
		}
	}

	for _, id := range []string{"createMediaAsset", "completeMediaAsset", "getMediaAssetDownload", "updateMediaAsset"} {
		found := false
		for _, c := range cases {
			if c.id != id {
				continue
			}
			found = true
			if _, ok := mappingValue(mustLookup(t, doc, "paths", c.path, c.method, "responses"), "409"); !ok {
				t.Errorf("%s must document 409", id)
			}
		}
		if !found {
			t.Errorf("no case for %s", id)
		}
	}

	content := mustLookup(t, doc, "paths", "/api/media-assets/{mediaAssetId}/content", "get")
	required := map[string]bool{}
	params, _ := mustValue(content, "parameters").([]any)
	for _, p := range params {
		if name, ok := mappingValue(p, "name"); ok {
			if req, _ := mappingValue(p, "required"); req == true {
				required[name.(string)] = true
			}
		}
	}
	for _, name := range []string{"expires", "signature"} {
		if !required[name] {
			t.Errorf("getMediaAssetContent must require the %q query parameter", name)
		}
	}
}

// bytesUsed must be able to say "not measured" rather than publish a 0
// nobody measured (schema-review-checklist Common Mistake 34).
func TestMediaAssetQuotaUsageCanBeUnmeasured(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), mediaAssetDir, "api.yml"))
	used := mustLookup(t, doc, "components", "schemas", "MediaAssetQuota", "properties", "bytesUsed")
	if got := mustValue(used, "nullable"); got != true {
		t.Errorf("MediaAssetQuota.bytesUsed nullable = %v, want true", got)
	}
}

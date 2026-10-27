package validation

import (
	"fmt"
	"path/filepath"
	"testing"
)

const meshkitError429Ref = "../../v1beta2/core/api.yml#/components/responses/MeshkitError429"

// Layer5 Cloud rate-limits the Blowhorn route families per user. A construct
// listed with nil operations declares 429 on every operation; otherwise only on
// the named ones.
var rateLimitedOperations = map[string][]string{
	"claim":               nil,
	"schedule":            nil,
	"ledger":              nil,
	"content_item":        nil,
	"event":               nil,
	"profile":             nil,
	"provider_capability": nil,
	"blowhorn_health":     nil,
	"connection":          {"registerConnection", "recordConnectionHeartbeat", "deregisterDesktopConnection"},
}

// MeshkitError429 answers the MeshKit JSON error body with a required integer
// Retry-After header.
func TestMeshkitError429Contract(t *testing.T) {
	core := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), "schemas/constructs/v1beta2/core/api.yml"))
	resp := mustLookup(t, core, "components", "responses", "MeshkitError429")

	schema := mustLookup(t, resp, "content", "application/json", "schema")
	if got := mustValue(schema, "$ref"); got != "../../v1beta2/core/api.yml#/components/schemas/MeshkitError" {
		t.Errorf("MeshkitError429 schema $ref = %v, want the external MeshkitError ref", got)
	}

	header := mustLookup(t, resp, "headers", "Retry-After")
	if got := mustValue(header, "required"); got != true {
		t.Errorf("Retry-After required = %v, want true", got)
	}
	if got := mustValue(mustValue(header, "schema"), "type"); got != "integer" {
		t.Errorf("Retry-After schema type = %v, want integer", got)
	}
}

func TestRateLimitedOperationsDeclare429(t *testing.T) {
	root := repoRootDir(t)
	for construct, only := range rateLimitedOperations {
		t.Run(construct, func(t *testing.T) {
			doc := loadOpenAPIDocument(t, filepath.Join(root, "schemas/constructs/v1beta3", construct, "api.yml"))

			alias := mustLookup(t, doc, "components", "responses", "MeshkitError429")
			if got := mustValue(alias, "$ref"); got != meshkitError429Ref {
				t.Errorf("components.responses.MeshkitError429 $ref = %v, want %s", got, meshkitError429Ref)
			}

			want := map[string]bool{}
			for _, id := range only {
				want[id] = true
			}
			seen := map[string]bool{}

			paths, _ := mustValue(doc, "paths").(map[string]any)
			for path, item := range paths {
				for _, method := range []string{"get", "post", "put", "patch", "delete"} {
					op, ok := mappingValue(item, method)
					if !ok {
						continue
					}
					id := fmt.Sprint(mustValue(op, "operationId"))
					if only != nil && !want[id] {
						continue
					}
					seen[id] = true
					ref, _ := mappingValue(mustLookup(t, op, "responses"), "429")
					if got := mustValue(ref, "$ref"); got != "#/components/responses/MeshkitError429" {
						t.Errorf("%s %s (%s) 429 $ref = %v, want #/components/responses/MeshkitError429", method, path, id, got)
					}
				}
			}
			for id := range want {
				if !seen[id] {
					t.Errorf("operation %s not found in %s", id, construct)
				}
			}
		})
	}
}

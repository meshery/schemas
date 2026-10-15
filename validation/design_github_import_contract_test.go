package validation

import (
	"path/filepath"
	"reflect"
	"sort"
	"testing"
)

// The GitHub import contract (layer5io/meshery-cloud#6118) is three operations
// Meshery Cloud serves and its UI consumes through the generated cloudApi hooks:
//
//   - refreshPatternFromSource (POST /api/content/patterns/refresh/{designId})
//     rewrites a design in place from the GitHub file its `location` records;
//   - getGithubImportedDesigns (GET /api/integrations/github/designs/{connectionId})
//     lists the designs imported from GitHub, derived from `location`;
//   - importGithubRepository (POST /api/integrations/github/import/{connectionId})
//     imports selected files, handling already-imported ones per `onExisting`.
//
// These tests pin the operation IDs, field names, enum values and status codes
// the Cloud server and UI are coded against, so a rename cannot slip through as
// a clean diff.

const (
	designV1beta3Spec = "schemas/constructs/v1beta3/design/api.yml"
	eventV1beta3Spec  = "schemas/constructs/v1beta3/event/api.yml"
	coreV1beta2Spec   = "schemas/constructs/v1beta2/core/api.yml"
)

type githubImportOperation struct {
	path          string
	method        string
	operationID   string
	requestBody   string // $ref of the JSON request body; empty when there is none
	successSchema string // $ref of the 200 application/json schema
	responseCodes []string
}

var githubImportOperations = []githubImportOperation{
	{
		path:          "/api/content/patterns/refresh/{designId}",
		method:        "post",
		operationID:   "refreshPatternFromSource",
		successSchema: "#/components/schemas/MesheryPattern",
		responseCodes: []string{"200", "400", "401", "403", "404", "409", "500", "502"},
	},
	{
		path:          "/api/integrations/github/designs/{connectionId}",
		method:        "get",
		operationID:   "getGithubImportedDesigns",
		successSchema: "#/components/schemas/MesheryPatternPage",
		responseCodes: []string{"200", "400", "401", "404", "500"},
	},
	{
		path:          "/api/integrations/github/import/{connectionId}",
		method:        "post",
		operationID:   "importGithubRepository",
		requestBody:   "#/components/schemas/GithubImportPayload",
		successSchema: "#/components/schemas/GithubImportResponse",
		responseCodes: []string{"200", "400", "401", "403", "404", "500", "502"},
	},
}

func TestGithubImportOperationsContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), designV1beta3Spec))

	for _, op := range githubImportOperations {
		op := op
		t.Run(op.operationID, func(t *testing.T) {
			operation := mustLookup(t, doc, "paths", op.path, op.method)

			if got := mustValue(operation, "operationId"); got != op.operationID {
				t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
			}

			if got := sequenceStrings(mustValue(operation, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
				t.Errorf("%s x-internal = %v, want [cloud] (Meshery Cloud serves it; nothing else calls it)", op.operationID, got)
			}

			body, hasBody := mappingValue(operation, "requestBody")
			switch {
			case op.requestBody == "" && hasBody:
				t.Errorf("%s declares a requestBody; it takes none", op.operationID)
			case op.requestBody != "":
				if got := mustLookup(t, body, "content", "application/json", "schema", "$ref"); got != op.requestBody {
					t.Errorf("%s requestBody $ref = %v, want %q", op.operationID, got, op.requestBody)
				}
			}

			responses := mustValue(operation, "responses")
			if got := sortedMappingKeys(responses); !reflect.DeepEqual(got, op.responseCodes) {
				t.Errorf("%s responses = %v, want %v", op.operationID, got, op.responseCodes)
			}

			if got := mustLookup(t, responses, "200", "content", "application/json", "schema", "$ref"); got != op.successSchema {
				t.Errorf("%s 200 schema $ref = %v, want %q", op.operationID, got, op.successSchema)
			}

			// Every error response must resolve, so a status the Cloud server
			// answers with is never a dangling reference.
			for _, code := range op.responseCodes[1:] {
				ref, _ := mappingValue(mustValue(responses, code), "$ref")
				if ref != "#/components/responses/"+code {
					t.Errorf("%s %s response $ref = %v, want the construct's shared #/components/responses/%s", op.operationID, code, ref, code)
					continue
				}
				if _, err := lookupPath(doc, "components", "responses", code); err != nil {
					t.Errorf("%s %s response does not resolve: %v", op.operationID, code, err)
				}
			}
		})
	}
}

// RTK cache tags are the declaring construct's info.title joined to the
// operation's tag (build/bundle-openapi.js prefixTags), so `designs` here is the
// `Design_designs` tag. The GitHub operations live in the design construct so
// they share it with getPatterns and deletePattern: an import or a refresh
// refetches every design list, and a delete or refresh refetches the
// imported-designs inventory. Moving them to their own construct would silently
// give them a different tag and break that cache coherence.
func TestGithubImportOperationsShareTheDesignsCacheTag(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), designV1beta3Spec))

	if got := mustLookup(t, doc, "info", "title"); got != "Design" {
		t.Fatalf("design construct info.title = %v, want \"Design\" (it names the generated Design_designs cache tag)", got)
	}

	sharing := []struct{ path, method string }{
		{"/api/content/patterns", "get"},
		{"/api/content/patterns/{designId}", "delete"},
	}
	for _, op := range githubImportOperations {
		sharing = append(sharing, struct{ path, method string }{op.path, op.method})
	}

	for _, op := range sharing {
		if !operationHasTag(mustLookup(t, doc, "paths", op.path, op.method), "designs") {
			t.Errorf("%s %s is not tagged `designs`, so it does not share the Design_designs cache tag", op.method, op.path)
		}
	}
}

func TestGithubImportPayloadContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), designV1beta3Spec))
	payload := mustLookup(t, doc, "components", "schemas", "GithubImportPayload")

	if got := sequenceStrings(mustValue(payload, "required")); !reflect.DeepEqual(got, []string{"name", "paths"}) {
		t.Errorf("GithubImportPayload required = %v, want [name paths]", got)
	}

	onExisting := mustLookup(t, payload, "properties", "onExisting")
	if got := sequenceStrings(mustValue(onExisting, "enum")); !reflect.DeepEqual(got, []string{"update", "skip", "new"}) {
		t.Errorf("onExisting enum = %v, want [update skip new]", got)
	}
	if got := mustValue(onExisting, "default"); got != "skip" {
		t.Errorf("onExisting default = %v, want \"skip\" (a request that omits it must never overwrite an existing design)", got)
	}

	if got := mustLookup(t, payload, "properties", "paths", "items", "$ref"); got != "#/components/schemas/GithubImportPath" {
		t.Errorf("GithubImportPayload.paths items $ref = %v, want GithubImportPath", got)
	}

	path := mustLookup(t, doc, "components", "schemas", "GithubImportPath")
	if got := sequenceStrings(mustLookup(t, path, "properties", "type", "enum")); !reflect.DeepEqual(got, []string{"file", "dir"}) {
		t.Errorf("GithubImportPath.type enum = %v, want [file dir]", got)
	}
	if got := mustValue(path, "additionalProperties"); got != true {
		t.Errorf("GithubImportPath additionalProperties = %v, want true (the remaining scan fields are accepted and ignored)", got)
	}
}

func TestGithubImportResponseContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), designV1beta3Spec))
	properties := mustLookup(t, doc, "components", "schemas", "GithubImportResponse", "properties")

	if got, want := sortedMappingKeys(properties), []string{"errors", "patterns", "skippedPaths", "updatedIds"}; !reflect.DeepEqual(got, want) {
		t.Errorf("GithubImportResponse properties = %v, want %v", got, want)
	}

	if got := mustLookup(t, properties, "patterns", "items", "$ref"); got != "#/components/schemas/MesheryPattern" {
		t.Errorf("patterns items $ref = %v, want the canonical MesheryPattern", got)
	}

	// The Cloud server serializes MeshKit events.Event values here; the
	// reference must stay on the canonical (v1beta3) event construct and
	// resolve there.
	if got := mustLookup(t, properties, "errors", "items", "$ref"); got != "../event/api.yml#/components/schemas/Event" {
		t.Errorf("errors items $ref = %v, want ../event/api.yml#/components/schemas/Event", got)
	}
	eventDoc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventV1beta3Spec))
	if _, err := lookupPath(eventDoc, "components", "schemas", "Event"); err != nil {
		t.Errorf("errors items reference an Event the v1beta3 event construct does not define: %v", err)
	}

	coreDoc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), coreV1beta2Spec))
	if _, err := lookupPath(coreDoc, "components", "responses", "502"); err != nil {
		t.Errorf("the shared 502 response refreshPatternFromSource and importGithubRepository reference is not defined in v1beta2 core: %v", err)
	}
}

// Event must describe the bytes MeshKit's models/events.Event marshals
// (meshery/meshkit models/events/events.go): every JSON name it writes, with
// `required` holding exactly the fields it writes without omitempty.
func TestEventMirrorsMeshkitEventWireShape(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventV1beta3Spec))
	event := mustLookup(t, doc, "components", "schemas", "Event")

	alwaysWritten := []string{
		"actedUpon", "action", "category", "createdAt", "description", "id",
		"metadata", "operationId", "severity", "status", "systemId", "updatedAt",
	}
	omitEmpty := []string{"deletedAt", "owner"}

	wantProperties := append(append([]string{}, alwaysWritten...), omitEmpty...)
	sort.Strings(wantProperties)
	if got := sortedMappingKeys(mustValue(event, "properties")); !reflect.DeepEqual(got, wantProperties) {
		t.Errorf("Event properties = %v, want %v", got, wantProperties)
	}

	gotRequired := sequenceStrings(mustValue(event, "required"))
	sort.Strings(gotRequired)
	if !reflect.DeepEqual(gotRequired, alwaysWritten) {
		t.Errorf("Event required = %v, want %v", gotRequired, alwaysWritten)
	}

	// MeshKit marshals a nil metadata map as JSON null.
	if got := mustLookup(t, event, "properties", "metadata", "nullable"); got != true {
		t.Errorf("Event.metadata nullable = %v, want true", got)
	}
}

// sortedMappingKeys returns the keys of a decoded YAML mapping in sorted order.
func sortedMappingKeys(node any) []string {
	keys := mappingKeys(node)
	sort.Strings(keys)
	return keys
}

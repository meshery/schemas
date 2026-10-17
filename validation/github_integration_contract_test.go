package validation

import (
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

// The GitHub integration contract: every operation acts only through the
// caller's own verified GitHub App installations, and refuses everything else
// with one uniform MeshKit JSON 403. The v1beta3 github construct declares the
// integration operations that do not read or write designs; the design
// construct keeps the ones that do (design_github_import_contract_test.go).
// These tests pin the operation IDs, parameters, status codes and error bodies
// Meshery Cloud's server and UI are coded against.

const (
	githubV1beta3Spec     = "schemas/constructs/v1beta3/github/api.yml"
	connectionV1beta3Spec = "schemas/constructs/v1beta3/connection/api.yml"
	invitationV1beta3Spec = "schemas/constructs/v1beta3/invitation/api.yml"
	coreV1alpha1Spec      = "schemas/constructs/v1alpha1/core/api.yml"
)

type githubIntegrationOperation struct {
	path          string
	method        string
	operationID   string
	requestBody   string // $ref of the JSON request body; empty when there is none
	successSchema string // $ref of the 2xx application/json schema; empty when there is no body
	responseCodes []string
	params        []string // parameter $refs, in order
}

var githubIntegrationOperations = []githubIntegrationOperation{
	{
		path:          "/api/integrations/github/status",
		method:        "get",
		operationID:   "getGithubAppStatus",
		responseCodes: []string{"200", "401", "403", "404", "500", "502"},
	},
	{
		path:          "/api/integrations/github",
		method:        "get",
		operationID:   "getGithubInstallationRepositories",
		successSchema: "#/components/schemas/GithubInstallationRepositoryPage",
		responseCodes: []string{"200", "400", "401", "403", "500", "502"},
		params:        []string{"installationIdQuery", "page"},
	},
	{
		path:          "/api/integrations/github/scan",
		method:        "get",
		operationID:   "scanGithubRepository",
		successSchema: "#/components/schemas/GithubRepositoryTree",
		responseCodes: []string{"200", "206", "400", "401", "403", "500", "502"},
		params:        []string{"repositoryName", "page", "pageSize"},
	},
	{
		path:          "/api/integrations/github/verify/{owner}/{repo}",
		method:        "post",
		operationID:   "verifyGithubRepositoryWorkflow",
		successSchema: "#/components/schemas/GithubWorkflowVerification",
		responseCodes: []string{"200", "400", "401", "403", "500", "502"},
		params:        []string{"owner", "repo", "ignoredInstallationId"},
	},
	{
		path:          "/api/integrations/github/install",
		method:        "post",
		operationID:   "installGithubWorkflow",
		requestBody:   "#/components/schemas/GithubWorkflowInstallPayload",
		successSchema: "#/components/schemas/GithubWorkflowInstallResponse",
		responseCodes: []string{"200", "400", "401", "403", "500", "502"},
		params:        []string{"ignoredInstallationId"},
	},
	{
		path:          "/api/integrations/github/authorize",
		method:        "get",
		operationID:   "startGithubAuthorization",
		responseCodes: []string{"302", "401"},
		params:        []string{"flow"},
	},
	{
		path:          "/api/integrations/github/callback",
		method:        "get",
		operationID:   "githubAppCallback",
		responseCodes: []string{"302", "401"},
		params:        []string{"state", "code", "githubInstallationId", "githubSetupAction"},
	},
}

// Meshery Cloud answers 400/403/404/500 from these routes as a MeshKit JSON
// body; 401 and 502 keep the shared core responses.
var githubIntegrationErrorResponse = map[string]string{
	"400": "#/components/responses/MeshkitError400",
	"401": "#/components/responses/401",
	"403": "#/components/responses/MeshkitError403",
	"404": "#/components/responses/MeshkitError404",
	"500": "#/components/responses/MeshkitError500",
	"502": "#/components/responses/502",
}

func TestGithubIntegrationOperationsContract(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), githubV1beta3Spec))

	if got := mustLookup(t, doc, "info", "title"); got != "GitHub" {
		t.Errorf("github construct info.title = %v, want \"GitHub\" (it names the generated GitHub_github cache tag)", got)
	}

	for _, op := range githubIntegrationOperations {
		op := op
		t.Run(op.operationID, func(t *testing.T) {
			operation := mustLookup(t, doc, "paths", op.path, op.method)

			if got := mustValue(operation, "operationId"); got != op.operationID {
				t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
			}
			if got := sequenceStrings(mustValue(operation, "x-internal")); !reflect.DeepEqual(got, []string{"cloud"}) {
				t.Errorf("%s x-internal = %v, want [cloud]", op.operationID, got)
			}
			if got := sequenceStrings(mustValue(operation, "tags")); !reflect.DeepEqual(got, []string{"github"}) {
				t.Errorf("%s tags = %v, want [github]", op.operationID, got)
			}

			var params []string
			if raw, ok := mappingValue(operation, "parameters"); ok {
				for _, p := range raw.([]any) {
					ref, _ := mappingValue(p, "$ref")
					params = append(params, strings.TrimPrefix(ref.(string), "#/components/parameters/"))
				}
			}
			if !reflect.DeepEqual(params, op.params) {
				t.Errorf("%s parameters = %v, want %v", op.operationID, params, op.params)
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
			for _, code := range op.responseCodes {
				response := mustValue(responses, code)
				if want, isError := githubIntegrationErrorResponse[code]; isError {
					if ref, _ := mappingValue(response, "$ref"); ref != want {
						t.Errorf("%s %s response $ref = %v, want %q", op.operationID, code, ref, want)
					}
					if _, err := lookupPath(doc, "components", "responses", strings.TrimPrefix(want, "#/components/responses/")); err != nil {
						t.Errorf("%s %s response does not resolve: %v", op.operationID, code, err)
					}
					continue
				}
				_, hasContent := mappingValue(response, "content")
				if op.successSchema == "" {
					if hasContent {
						t.Errorf("%s %s declares a body; it answers none", op.operationID, code)
					}
					continue
				}
				if got := mustLookup(t, response, "content", "application/json", "schema", "$ref"); got != op.successSchema {
					t.Errorf("%s %s schema $ref = %v, want %q", op.operationID, code, got, op.successSchema)
				}
			}
		})
	}
}

func TestGithubIntegrationParameters(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), githubV1beta3Spec))
	params := mustLookup(t, doc, "components", "parameters")

	for _, want := range []struct{ key, name, in string }{
		{"installationIdQuery", "id", "query"},
		{"ignoredInstallationId", "id", "query"},
		{"repositoryName", "name", "query"},
		{"owner", "owner", "path"},
		{"repo", "repo", "path"},
		{"flow", "flow", "query"},
		{"state", "state", "query"},
		{"code", "code", "query"},
		// GitHub names these on its redirect; the server reads them as sent.
		{"githubInstallationId", "installation_id", "query"},
		{"githubSetupAction", "setup_action", "query"},
	} {
		param := mustValue(params, want.key)
		if got := mustValue(param, "name"); got != want.name {
			t.Errorf("parameter %s name = %v, want %q", want.key, got, want.name)
		}
		if got := mustValue(param, "in"); got != want.in {
			t.Errorf("parameter %s in = %v, want %q", want.key, got, want.in)
		}
	}

	if got := mustLookup(t, params, "installationIdQuery", "required"); got != true {
		t.Errorf("installationIdQuery required = %v, want true", got)
	}
	if got := mustLookup(t, params, "installationIdQuery", "schema", "pattern"); got != "^[1-9][0-9]*$" {
		t.Errorf("installationIdQuery pattern = %v, want a positive decimal installation id", got)
	}
	if got := mustLookup(t, params, "ignoredInstallationId", "deprecated"); got != true {
		t.Errorf("ignoredInstallationId deprecated = %v, want true (the server does not consult it)", got)
	}
	if got := sequenceStrings(mustLookup(t, params, "flow", "schema", "enum")); !reflect.DeepEqual(got, []string{"install", "authorize"}) {
		t.Errorf("flow enum = %v, want [install authorize]", got)
	}
	if got := sequenceStrings(mustLookup(t, params, "githubSetupAction", "schema", "enum")); !reflect.DeepEqual(got, []string{"install", "update", "request"}) {
		t.Errorf("setup_action enum = %v, want [install update request]", got)
	}
}

func TestGithubIntegrationSchemas(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), githubV1beta3Spec))
	schemas := mustLookup(t, doc, "components", "schemas")

	verification := mustValue(schemas, "GithubWorkflowVerification")
	if got := sequenceStrings(mustValue(verification, "required")); !reflect.DeepEqual(got, []string{"status"}) {
		t.Errorf("GithubWorkflowVerification required = %v, want [status]", got)
	}
	if got := sequenceStrings(mustLookup(t, verification, "properties", "status", "enum")); !reflect.DeepEqual(got, []string{"ok", "error"}) {
		t.Errorf("GithubWorkflowVerification.status enum = %v, want [ok error]", got)
	}
	if got := sortedMappingKeys(mustValue(verification, "properties")); !reflect.DeepEqual(got, []string{"error", "fileUrl", "status"}) {
		t.Errorf("GithubWorkflowVerification properties = %v, want [error fileUrl status]", got)
	}

	install := mustValue(schemas, "GithubWorkflowInstallPayload")
	if got := sequenceStrings(mustValue(install, "required")); !reflect.DeepEqual(got, []string{"repositories"}) {
		t.Errorf("GithubWorkflowInstallPayload required = %v, want [repositories]", got)
	}
	if got := mustLookup(t, schemas, "GithubWorkflowInstallResponse", "items", "additionalProperties", "$ref"); got != "#/components/schemas/GithubWorkflowInstallResult" {
		t.Errorf("GithubWorkflowInstallResponse entries = %v, want GithubWorkflowInstallResult keyed by repository", got)
	}
	if got := sortedMappingKeys(mustLookup(t, schemas, "GithubWorkflowInstallResult", "properties")); !reflect.DeepEqual(got, []string{"code", "description"}) {
		t.Errorf("GithubWorkflowInstallResult properties = %v, want [code description]", got)
	}

	if got := mustLookup(t, schemas, "GithubRepositoryTree", "items", "$ref"); got != "#/components/schemas/GithubRepositoryTreeItem" {
		t.Errorf("GithubRepositoryTree items = %v, want GithubRepositoryTreeItem", got)
	}
	if got := sortedMappingKeys(mustLookup(t, schemas, "GithubRepositoryTreeItem", "properties")); !reflect.DeepEqual(got, []string{"children", "entry", "id", "label", "type"}) {
		t.Errorf("GithubRepositoryTreeItem properties = %v", got)
	}

	metadata := mustValue(schemas, "GithubConnectionMetadata")
	if got := sortedMappingKeys(mustValue(metadata, "properties")); !reflect.DeepEqual(got, []string{"installationId", "installations", "installationsVerifiedAt", "snapshotPaths"}) {
		t.Errorf("GithubConnectionMetadata properties = %v", got)
	}
	if got := mustLookup(t, metadata, "properties", "installations", "items", "$ref"); got != "#/components/schemas/GithubInstallation" {
		t.Errorf("GithubConnectionMetadata.installations items = %v, want GithubInstallation", got)
	}
	installation := mustValue(schemas, "GithubInstallation")
	if got := sequenceStrings(mustValue(installation, "required")); !reflect.DeepEqual(got, []string{"id"}) {
		t.Errorf("GithubInstallation required = %v, want [id]", got)
	}
	if got := sequenceStrings(mustLookup(t, installation, "properties", "accountType", "enum")); !reflect.DeepEqual(got, []string{"User", "Organization"}) {
		t.Errorf("GithubInstallation.accountType enum = %v, want GitHub's [User Organization]", got)
	}
}

// The four design operations that reach GitHub share one 403 meaning: the
// repository is not reachable through the caller's verified installations,
// answered uniformly, plus the re-authorization 403 a pre-verification
// connection gets.
func TestDesignGithubOperationsDescribeVerifiedInstallation403(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), designV1beta3Spec))

	for _, op := range []struct{ path, method string }{
		{"/api/content/patterns/refresh/{designId}", "post"},
		{"/api/content/patterns/{designId}/source", "patch"},
		{"/api/integrations/github/import/{connectionId}", "post"},
		{"/api/integrations/github/branches/{connectionId}", "get"},
	} {
		operation := mustLookup(t, doc, "paths", op.path, op.method)
		description := strings.Join(strings.Fields(mustValue(operation, "description").(string)), " ")
		for _, want := range []string{
			"`403` means the repository is not reachable through one of the caller's verified GitHub App installations",
			"The refusal is deliberately uniform",
			"`meshery_cloud-3381`",
			"`startGithubAuthorization`",
		} {
			if !strings.Contains(description, want) {
				t.Errorf("%s %s description lacks %q", op.method, op.path, want)
			}
		}
		if strings.Contains(description, "has no GitHub App installation with access") {
			t.Errorf("%s %s still carries the superseded 403 wording", op.method, op.path)
		}
		if _, ok := mappingValue(mustValue(operation, "responses"), "403"); !ok {
			t.Errorf("%s %s must keep declaring 403", op.method, op.path)
		}
	}
}

// registerConnection and updateConnection refuse a write that would give a
// connection the GitHub App connection's reserved identity with 409.
func TestConnectionWritesDeclareReservedIdentity409(t *testing.T) {
	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), connectionV1beta3Spec))

	for _, op := range []struct {
		path, method, operationID string
		codes                     []string
	}{
		{"/api/integrations/connections", "post", "registerConnection", []string{"201", "400", "401", "409", "500"}},
		{"/api/integrations/connections/{connectionId}", "put", "updateConnection", []string{"200", "400", "401", "404", "409", "500"}},
	} {
		operation := mustLookup(t, doc, "paths", op.path, op.method)
		if got := mustValue(operation, "operationId"); got != op.operationID {
			t.Errorf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
		}
		responses := mustValue(operation, "responses")
		if got := sortedMappingKeys(responses); !reflect.DeepEqual(got, op.codes) {
			t.Errorf("%s responses = %v, want %v", op.operationID, got, op.codes)
		}
		if ref, _ := mappingValue(mustValue(responses, "409"), "$ref"); ref != "#/components/responses/409" {
			t.Errorf("%s 409 $ref = %v, want #/components/responses/409", op.operationID, ref)
		}
		description := strings.Join(strings.Fields(mustValue(operation, "description").(string)), " ")
		for _, want := range []string{"`meshery_cloud-3397`", "name `GitHub App`, sub_type `git`"} {
			if !strings.Contains(description, want) {
				t.Errorf("%s description lacks %q", op.operationID, want)
			}
		}
	}
	if _, err := lookupPath(doc, "components", "responses", "409"); err != nil {
		t.Errorf("connection construct must declare a shared 409 response: %v", err)
	}
}

// Meshery Cloud answers the invitation-write and events-aggregate refusals as
// MeshKit JSON error bodies.
func TestInvitationAndEventsDeclareMeshkitErrorBodies(t *testing.T) {
	invitations := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), invitationV1beta3Spec))
	for _, op := range []struct {
		path, method, operationID string
		meshkitCodes              []string
	}{
		{"/api/organizations/invitations", "post", "createInvitation", []string{"400", "403", "500"}},
		{"/api/organizations/invitations/{invitationId}", "put", "updateInvitation", []string{"400", "403", "404", "500"}},
	} {
		operation := mustLookup(t, invitations, "paths", op.path, op.method)
		if got := mustValue(operation, "operationId"); got != op.operationID {
			t.Fatalf("%s %s operationId = %v, want %q", op.method, op.path, got, op.operationID)
		}
		responses := mustValue(operation, "responses")
		for _, code := range op.meshkitCodes {
			want := "#/components/responses/MeshkitError" + code
			if ref, _ := mappingValue(mustValue(responses, code), "$ref"); ref != want {
				t.Errorf("%s %s $ref = %v, want %q", op.operationID, code, ref, want)
			}
		}
		if ref, _ := mappingValue(mustValue(responses, "401"), "$ref"); ref != "#/components/responses/401" {
			t.Errorf("%s 401 $ref = %v, want the shared 401", op.operationID, ref)
		}
	}

	events := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), eventV1beta3Spec))
	aggregate := mustLookup(t, events, "paths", "/api/events", "get")
	if got := mustValue(aggregate, "operationId"); got != "getEventsAggregate" {
		t.Fatalf("GET /api/events operationId = %v, want getEventsAggregate", got)
	}
	responses := mustValue(aggregate, "responses")
	if ref, _ := mappingValue(mustValue(responses, "403"), "$ref"); ref != "#/components/responses/MeshkitError403" {
		t.Errorf("getEventsAggregate 403 $ref = %v, want MeshkitError403", ref)
	}
	if got := mustLookup(t, responses, "404", "content", "text/plain", "schema", "type"); got != "string" {
		t.Errorf("getEventsAggregate 404 body = %v, want text/plain string", got)
	}
}

// MeshkitError is declared in v1beta2/core and mirrored in v1alpha1/core,
// which generates the unversioned models/core Go package every v1beta2/core
// $ref resolves to. The two must not drift, and the shared JSON responses
// must point at it.
func TestMeshkitErrorContract(t *testing.T) {
	root := repoRootDir(t)
	v1beta2 := loadOpenAPIDocument(t, filepath.Join(root, coreV1beta2Spec))
	v1alpha1 := loadOpenAPIDocument(t, filepath.Join(root, coreV1alpha1Spec))

	canonical := mustLookup(t, v1beta2, "components", "schemas", "MeshkitError")
	mirror := mustLookup(t, v1alpha1, "components", "schemas", "MeshkitError")
	if !reflect.DeepEqual(canonical, mirror) {
		t.Errorf("v1alpha1/core MeshkitError differs from v1beta2/core MeshkitError; keep the mirror identical")
	}

	if got := sequenceStrings(mustValue(canonical, "required")); !reflect.DeepEqual(got, []string{"error"}) {
		t.Errorf("MeshkitError required = %v, want [error]", got)
	}
	if got := sortedMappingKeys(mustValue(canonical, "properties")); !reflect.DeepEqual(got, []string{"code", "error", "probableCause", "severity", "suggestedRemediation"}) {
		t.Errorf("MeshkitError properties = %v", got)
	}
	if got := sequenceStrings(mustLookup(t, canonical, "properties", "severity", "enum")); !reflect.DeepEqual(got, []string{"emergency", "alert", "critical", "fatal"}) {
		t.Errorf("MeshkitError.severity enum = %v", got)
	}

	for _, code := range []string{"400", "403", "404", "500"} {
		ref := mustLookup(t, v1beta2, "components", "responses", "MeshkitError"+code, "content", "application/json", "schema", "$ref")
		if ref != "../../v1beta2/core/api.yml#/components/schemas/MeshkitError" {
			t.Errorf("MeshkitError%s schema $ref = %v, want the external form (consumers' Go aliases resolve it to core.MeshkitError)", code, ref)
		}
		// The plain-text shared response every other operation uses is untouched.
		if got := mustLookup(t, v1beta2, "components", "responses", code, "content", "text/plain", "schema", "type"); got != "string" {
			t.Errorf("core %s response body = %v, want text/plain string", code, got)
		}
	}
}

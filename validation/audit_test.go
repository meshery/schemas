package validation

import (
	"os"
	"path/filepath"
	"testing"
)

// minimalOpenAPIDoc returns a valid OpenAPI 3.0 document as YAML bytes.
func minimalOpenAPIDoc(deprecated bool) string {
	doc := "openapi: \"3.0.0\"\ninfo:\n  title: Test Construct\n  version: \"1.0.0\"\n"
	if deprecated {
		doc += "  x-deprecated: true\n"
	}
	doc += "paths: {}\ncomponents:\n  schemas: {}\n"
	return doc
}

// writeTestAPIYML creates a construct directory with an api.yml under the
// given root, following the schemas/constructs/<version>/<construct>/ layout.
func writeTestAPIYML(t *testing.T, root, version, construct string, deprecated bool) string {
	t.Helper()
	dir := filepath.Join(root, "schemas", "constructs", version, construct)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", dir, err)
	}
	path := filepath.Join(dir, "api.yml")
	if err := os.WriteFile(path, []byte(minimalOpenAPIDoc(deprecated)), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}
	return path
}

// TestWalkValidatedConstructSpecs_SkipsDeprecated verifies that deprecated
// constructs are skipped by walkValidatedConstructSpecs, keeping it the
// canonical non-deprecated walker for consumer-audit; deprecated-version
// selection lives in walkAuditConstructSpecs (issue #730).
func TestWalkValidatedConstructSpecs_SkipsDeprecated(t *testing.T) {
	root := t.TempDir()

	writeTestAPIYML(t, root, "v1beta1", "deprecated-construct", true)
	writeTestAPIYML(t, root, "v1beta2", "active-construct", false)

	var visited []constructSpec
	err := walkValidatedConstructSpecs(root, func(spec constructSpec) error {
		visited = append(visited, spec)
		return nil
	})
	if err != nil {
		t.Fatalf("walkValidatedConstructSpecs: %v", err)
	}

	if len(visited) != 1 {
		t.Fatalf("expected 1 visited spec, got %d", len(visited))
	}
	if visited[0].Construct != "active-construct" {
		t.Fatalf("expected only active-construct to be visited, got %s", visited[0].Construct)
	}
	if visited[0].Deprecated {
		t.Errorf("active-construct should have Deprecated=false")
	}
}

// TestAuditEntitySchemas_DeprecatedOnlyBlockingRules verifies that when
// deprecated=true, auditEntitySchemas only runs blocking rules (Rule 1 and
// Rule 20) and skips advisory rules like Rule 6 (casing).
func TestAuditEntitySchemas_DeprecatedOnlyBlockingRules(t *testing.T) {
	dir := t.TempDir()

	// Entity missing additionalProperties: false -> Rule 1 violation (blocking).
	// Has Snake_Case property -> Rule 6 violation (advisory, should be skipped).
	content := "type: object\nproperties:\n  Snake_Case:\n    type: string\n"
	path := filepath.Join(dir, "entity.yaml")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}

	result := &AuditResult{}
	auditEntitySchemas(dir, AuditOptions{}, make(map[string]bool), result, true)

	var rule1, rule20, rule6 bool
	for _, v := range result.Blocking {
		switch v.RuleNumber {
		case 1:
			rule1 = true
		case 20:
			rule20 = true
		}
	}
	for _, v := range result.Advisory {
		if v.RuleNumber == 6 {
			rule6 = true
		}
	}

	if !rule1 {
		t.Errorf("expected Rule 1 blocking violation for deprecated entity without additionalProperties: false")
	}
	if !rule20 {
		t.Errorf("expected Rule 20 blocking violation for deprecated entity without required")
	}
	if rule6 {
		t.Errorf("expected NO Rule 6 advisory violation for deprecated entity")
	}
}

// TestAuditAPISpec_DeprecatedOnlyBlockingRules verifies that when deprecated=true,
// auditAPISpec only runs blocking rules and skips advisory rules like Rule 6
// (casing) and Rule 28 (determinism).
func TestAuditAPISpec_DeprecatedOnlyBlockingRules(t *testing.T) {
	dir := t.TempDir()

	content := `openapi: "3.0.0"
info:
  title: Test
  version: "1.0.0"
  x-deprecated: true
paths:
  /delete:
    delete:
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                value:
                  type: string
      responses:
        "200":
          description: ok
components:
  schemas:
    Example:
      type: object
      properties:
        snake_case:
          type: string
`
	apiPath := filepath.Join(dir, "api.yml")
	if err := os.WriteFile(apiPath, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", apiPath, err)
	}
	doc, err := loadAPISpec(apiPath)
	if err != nil {
		t.Fatalf("loadAPISpec %s: %v", apiPath, err)
	}

	result := &AuditResult{}
	auditAPISpec(apiPath, dir, AuditOptions{}, make(map[string]bool), result,
		make(map[string][]schemaLocation), "", doc, true)

	var rule5, rule6 bool
	for _, v := range result.Blocking {
		if v.RuleNumber == 5 {
			rule5 = true
		}
	}
	for _, v := range result.Advisory {
		if v.RuleNumber == 6 {
			rule6 = true
		}
	}

	if !rule5 {
		t.Errorf("expected Rule 5 blocking violation for deprecated DELETE with a requestBody")
	}
	if rule6 {
		t.Errorf("expected NO Rule 6 advisory violation for deprecated api.yml")
	}
}

// TestAuditAPISpec_Rule2SeverityByDeprecation verifies deprecated APIs retain
// blocking Rule 2 findings while suppressing its advisory findings. Active APIs
// keep both existing Rule 2 severities.
func TestAuditAPISpec_Rule2SeverityByDeprecation(t *testing.T) {
	for _, tc := range []struct {
		name       string
		deprecated bool
	}{
		{name: "active"},
		{name: "deprecated", deprecated: true},
	} {
		t.Run(tc.name, func(t *testing.T) {
			dir := t.TempDir()
			deprecatedExtension := ""
			if tc.deprecated {
				deprecatedExtension = "  x-deprecated: true\n"
			}
			content := `openapi: "3.0.0"
info:
  title: Test
  version: "1.0.0"
` + deprecatedExtension + `paths:
  /legacy:
    post:
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/LegacyBody"
      responses:
        "200":
          description: ok
  /server-generated:
    put:
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [id]
              properties:
                id:
                  type: string
      responses:
        "200":
          description: ok
components:
  schemas:
    LegacyBody:
      type: object
      properties:
        name:
          type: string
`
			path := filepath.Join(dir, "api.yml")
			if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
				t.Fatalf("write %s: %v", path, err)
			}
			doc, err := loadAPISpec(path)
			if err != nil {
				t.Fatalf("loadAPISpec %s: %v", path, err)
			}

			result := &AuditResult{}
			auditAPISpec(path, dir, AuditOptions{}, make(map[string]bool), result,
				make(map[string][]schemaLocation), "", doc, tc.deprecated)

			var blocking, advisory bool
			for _, v := range result.Blocking {
				if v.RuleNumber == 2 {
					blocking = true
				}
			}
			for _, v := range result.Advisory {
				if v.RuleNumber == 2 {
					advisory = true
				}
			}
			if !blocking {
				t.Error("expected blocking Rule 2 for required server-generated id")
			}
			if advisory != !tc.deprecated {
				t.Errorf("Rule 2 advisory present = %t, want %t", advisory, !tc.deprecated)
			}
		})
	}
}

// TestAuditAPISpec_DeprecatedLoadFailure verifies that a deprecated construct
// whose api.yml fails to load still reports a blocking Rule 12 violation.
func TestAuditAPISpec_DeprecatedLoadFailure(t *testing.T) {
	dir := t.TempDir()
	nonexistent := filepath.Join(dir, "does_not_exist.yml")

	result := &AuditResult{}
	auditAPISpec(nonexistent, dir, AuditOptions{}, make(map[string]bool), result,
		make(map[string][]schemaLocation), "", nil, true)

	var rule12 bool
	for _, v := range result.Blocking {
		if v.RuleNumber == 12 {
			rule12 = true
		}
	}
	if !rule12 {
		t.Errorf("expected Rule 12 blocking violation for deprecated api.yml load failure")
	}
}

// TestAuditAPISpec_DeprecatedRule27Blocking verifies that when deprecated=true,
// auditAPISpec reports Rule 27 blocking violations (non-snake_case db tag)
// and suppresses Rule 27 advisory violations (manual yaml tags).
func TestAuditAPISpec_DeprecatedRule27Blocking(t *testing.T) {
	dir := t.TempDir()
	content := `openapi: "3.0.0"
info:
  title: Test Construct
  version: "1.0.0"
  x-deprecated: true
paths: {}
components:
  schemas:
    TestSchema:
      type: object
      properties:
        myProp:
          type: string
          x-oapi-codegen-extra-tags:
            db: CamelCase
            yaml: myProp
`
	path := filepath.Join(dir, "api.yml")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}

	doc, err := loadAPISpec(path)
	if err != nil {
		t.Fatalf("loadAPISpec %s: %v", path, err)
	}

	result := &AuditResult{}
	auditAPISpec(path, dir, AuditOptions{}, make(map[string]bool), result,
		make(map[string][]schemaLocation), "", doc, true)

	var rule27Blocking, rule27Advisory bool
	for _, v := range result.Blocking {
		if v.RuleNumber == 27 {
			rule27Blocking = true
		}
	}
	for _, v := range result.Advisory {
		if v.RuleNumber == 27 {
			rule27Advisory = true
		}
	}

	if !rule27Blocking {
		t.Error("expected Rule 27 blocking violation for deprecated API with non-snake_case db tag")
	}
	if rule27Advisory {
		t.Error("expected no Rule 27 advisory violation for deprecated API")
	}
}

// TestAuditAPISpec_DeprecatedRule27NormalAndStrict verifies deprecated Rule 27
// blocking/advisory behavior in normal and Strict modes: a genuine blocking
// Rule 27 finding (non-snake_case db tag) is always reported, while advisory
// findings (manual yaml tag) are suppressed and are never elevated to blocking
// under Strict for deprecated constructs.
func TestAuditAPISpec_DeprecatedRule27NormalAndStrict(t *testing.T) {
	for _, strict := range []bool{false, true} {
		t.Run(map[bool]string{false: "normal", true: "strict"}[strict], func(t *testing.T) {
			dir := t.TempDir()
			content := `openapi: "3.0.0"
info:
  title: Test Construct
  version: "1.0.0"
  x-deprecated: true
paths: {}
components:
  schemas:
    TestSchema:
      type: object
      properties:
        myProp:
          type: string
          x-oapi-codegen-extra-tags:
            db: CamelCase
            yaml: myProp
`
			path := filepath.Join(dir, "api.yml")
			if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
				t.Fatalf("write %s: %v", path, err)
			}

			doc, err := loadAPISpec(path)
			if err != nil {
				t.Fatalf("loadAPISpec %s: %v", path, err)
			}

			result := &AuditResult{}
			auditAPISpec(path, dir, AuditOptions{Strict: strict}, make(map[string]bool), result,
				make(map[string][]schemaLocation), "", doc, true)

			var rule27Blocking, rule27Advisory bool
			for _, v := range result.Blocking {
				if v.RuleNumber == 27 {
					rule27Blocking = true
				}
			}
			for _, v := range result.Advisory {
				if v.RuleNumber == 27 {
					rule27Advisory = true
				}
			}

			if !rule27Blocking {
				t.Errorf("strict=%t: expected blocking Rule 27 for non-snake_case db tag on deprecated API", strict)
			}
			if rule27Advisory {
				t.Errorf("strict=%t: expected no Rule 27 advisory for deprecated API", strict)
			}
		})
	}
}

// TestAuditAPISpec_DeprecatedRule27AdvisoryOnlySuppressed verifies that a
// deprecated construct with only advisory Rule 27 findings (manual yaml tag)
// reports no Rule 27 in normal mode and is not elevated to blocking in Strict.
func TestAuditAPISpec_DeprecatedRule27AdvisoryOnlySuppressed(t *testing.T) {
	for _, strict := range []bool{false, true} {
		t.Run(map[bool]string{false: "normal", true: "strict"}[strict], func(t *testing.T) {
			dir := t.TempDir()
			content := `openapi: "3.0.0"
info:
  title: Test Construct
  version: "1.0.0"
  x-deprecated: true
paths: {}
components:
  schemas:
    TestSchema:
      type: object
      properties:
        myProp:
          type: string
          x-oapi-codegen-extra-tags:
            yaml: myProp
`
			path := filepath.Join(dir, "api.yml")
			if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
				t.Fatalf("write %s: %v", path, err)
			}

			doc, err := loadAPISpec(path)
			if err != nil {
				t.Fatalf("loadAPISpec %s: %v", path, err)
			}

			result := &AuditResult{}
			auditAPISpec(path, dir, AuditOptions{Strict: strict}, make(map[string]bool), result,
				make(map[string][]schemaLocation), "", doc, true)

			for _, v := range result.Blocking {
				if v.RuleNumber == 27 {
					t.Errorf("strict=%t: expected no blocking Rule 27 for advisory-only manual yaml tag, got %+v", strict, v)
				}
			}
			for _, v := range result.Advisory {
				if v.RuleNumber == 27 {
					t.Errorf("strict=%t: expected no advisory Rule 27 for deprecated API, got %+v", strict, v)
				}
			}
		})
	}
}

// TestAuditAPISpec_DeprecatedRule5Blocking verifies that when deprecated=true,
// auditAPISpec reports Rule 5 blocking violations (DELETE with requestBody).
func TestAuditAPISpec_DeprecatedRule5Blocking(t *testing.T) {
	dir := t.TempDir()
	content := `openapi: "3.0.0"
info:
  title: Test
  version: "1.0.0"
  x-deprecated: true
paths:
  /test/{id}:
    delete:
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/DeleteBody"
components:
  schemas:
    DeleteBody:
      type: object
      properties:
        id:
          type: string
`
	path := filepath.Join(dir, "api.yml")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}

	doc, err := loadAPISpec(path)
	if err != nil {
		t.Fatalf("loadAPISpec %s: %v", path, err)
	}

	result := &AuditResult{}
	auditAPISpec(path, dir, AuditOptions{}, make(map[string]bool), result,
		make(map[string][]schemaLocation), "", doc, true)

	var rule5 bool
	for _, v := range result.Blocking {
		if v.RuleNumber == 5 {
			rule5 = true
		}
	}

	if !rule5 {
		t.Error("expected Rule 5 blocking violation for deprecated API with DELETE requestBody")
	}
}

// TestAuditRule22ValidatesDeprecatedVersionHelper verifies the global helper
// file audit still runs for model files associated with deprecated versions.
func TestAuditRule22ValidatesDeprecatedVersionHelper(t *testing.T) {
	root := t.TempDir()
	writeTestAPIYML(t, root, "v1beta1", "legacy-construct", true)
	helperPath := filepath.Join(root, "models", "v1beta1", "legacy_construct", "manual_helper.go")
	if err := os.MkdirAll(filepath.Dir(helperPath), 0o755); err != nil {
		t.Fatalf("mkdir helper directory: %v", err)
	}
	if err := os.WriteFile(helperPath, []byte("package legacy_construct\n\nfunc helper() {}\n"), 0o644); err != nil {
		t.Fatalf("write helper: %v", err)
	}

	result := Audit(AuditOptions{RootDir: root, NoBaseline: true})
	wantFile := relativeToRoot(helperPath, root)
	for _, v := range result.Blocking {
		if v.File == wantFile && v.RuleNumber == 22 && v.Severity == SeverityBlocking {
			return
		}
	}
	t.Errorf("expected blocking Rule 22 for helper belonging to deprecated version %s", wantFile)
}

// TestWalkValidatedConstructSpecs_MixedDeprecation verifies that when multiple
// versions of the same construct exist with different deprecation states,
// walkValidatedConstructSpecs skips deprecated versions and visits only the
// latest non-deprecated version per construct for the consumer-audit indexer.
func TestWalkValidatedConstructSpecs_MixedDeprecation(t *testing.T) {
	root := t.TempDir()

	// v1beta1: active (lower version), valid api.yml
	v1beta1Dir := filepath.Join(root, "schemas", "constructs", "v1beta1", "mixed-construct")
	if err := os.MkdirAll(v1beta1Dir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", v1beta1Dir, err)
	}
	v1beta1Content := `openapi: "3.0.0"
info:
  title: Mixed Construct
  version: "1.0.0"
paths: {}
components:
  schemas:
    TestSchema:
      type: object
      properties:
        myProp:
          type: string
`
	if err := os.WriteFile(filepath.Join(v1beta1Dir, "api.yml"), []byte(v1beta1Content), 0o644); err != nil {
		t.Fatalf("write v1beta1 api.yml: %v", err)
	}

	// v1beta1 entity schema: missing additionalProperties: false -> Rule 1 blocking
	v1beta1EntityContent := `type: object
properties:
  myProp:
    type: string
`
	if err := os.WriteFile(filepath.Join(v1beta1Dir, "mixed-construct.yaml"), []byte(v1beta1EntityContent), 0o644); err != nil {
		t.Fatalf("write v1beta1 entity yaml: %v", err)
	}

	// v1beta2: deprecated (higher version, but skipped by the walker)
	v1beta2Dir := filepath.Join(root, "schemas", "constructs", "v1beta2", "mixed-construct")
	if err := os.MkdirAll(v1beta2Dir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", v1beta2Dir, err)
	}
	v1beta2Content := `openapi: "3.0.0"
info:
  title: Mixed Construct
  version: "1.0.0"
  x-deprecated: true
paths: {}
components:
  schemas:
    TestSchema:
      type: object
      properties:
        snake_case_prop:
          type: string
        myProp:
          type: string
          x-oapi-codegen-extra-tags:
            db: CamelCase
`
	if err := os.WriteFile(filepath.Join(v1beta2Dir, "api.yml"), []byte(v1beta2Content), 0o644); err != nil {
		t.Fatalf("write v1beta2 api.yml: %v", err)
	}

	// Directly exercise walkValidatedConstructSpecs. It visits only the latest
	// non-deprecated version per construct; deprecated versions are skipped.
	var visited []constructSpec
	err := walkValidatedConstructSpecs(root, func(spec constructSpec) error {
		visited = append(visited, spec)
		return nil
	})
	if err != nil {
		t.Fatalf("walkValidatedConstructSpecs failed: %v", err)
	}

	// Only v1beta1 (latest non-deprecated version) should be visited.
	if len(visited) != 1 {
		t.Fatalf("expected 1 visited spec (latest non-deprecated version), got %d", len(visited))
	}
	if visited[0].Version != "v1beta1" {
		t.Fatalf("expected visited spec to be v1beta1 (latest non-deprecated), got %s", visited[0].Version)
	}
	if visited[0].Deprecated {
		t.Error("expected visited version v1beta1 to not be deprecated")
	}

	// v1beta2 should NOT be visited (it is deprecated).
	v1beta2Visited := false
	for _, spec := range visited {
		if spec.Version == "v1beta2" {
			v1beta2Visited = true
		}
	}
	if v1beta2Visited {
		t.Error("expected v1beta2 to NOT be visited (deprecated versions are skipped)")
	}
}

// TestAuditEntitySchemas_NonDeprecatedFullValidation verifies active entity
// schemas receive advisory validation, including Rule 6 (property casing).
func TestAuditEntitySchemas_NonDeprecatedFullValidation(t *testing.T) {
	dir := t.TempDir()

	// Entity with snake_case property -> Rule 6 violation (advisory, should be reported)
	content := "type: object\nproperties:\n  snake_case:\n    type: string\n"
	path := filepath.Join(dir, "entity.yaml")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write %s: %v", path, err)
	}

	result := &AuditResult{}
	auditEntitySchemas(dir, AuditOptions{StyleDebt: true}, make(map[string]bool), result, false)

	var rule6 bool
	for _, v := range result.Advisory {
		if v.RuleNumber == 6 {
			rule6 = true
		}
	}

	if !rule6 {
		t.Error("expected Rule 6 advisory violation for non-deprecated entity with snake_case property")
	}
}

// TestWalkAuditConstructSpecs_SingleActive verifies that when a construct
// has only one active version (no deprecated versions), it is visited
// with full validation rules.
func TestWalkAuditConstructSpecs_SingleActive(t *testing.T) {
	root := t.TempDir()

	// v1beta1: active construct (only version)
	v1beta1Dir := filepath.Join(root, "schemas", "constructs", "v1beta1", "my-construct")
	if err := os.MkdirAll(v1beta1Dir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", v1beta1Dir, err)
	}
	v1beta1Content := `openapi: "3.0.0"
info:
  title: My Construct
  version: "1.0.0"
paths: {}
components:
  schemas:
    MySchema:
      type: object
      properties:
        prop:
          type: string
`
	if err := os.WriteFile(filepath.Join(v1beta1Dir, "api.yml"), []byte(v1beta1Content), 0o644); err != nil {
		t.Fatalf("write v1beta1 api.yml: %v", err)
	}

	// Use the new walkAuditConstructSpecs walker
	var visited []constructSpec
	err := walkAuditConstructSpecs(root, func(spec constructSpec) error {
		visited = append(visited, spec)
		return nil
	})
	if err != nil {
		t.Fatalf("walkAuditConstructSpecs failed: %v", err)
	}

	// The single active version should be visited with full validation
	if len(visited) != 1 {
		t.Fatalf("expected 1 visited spec, got %d", len(visited))
	}
	if visited[0].Construct != "my-construct" {
		t.Fatalf("expected v1beta1 to be visited, got %s", visited[0].Construct)
	}
	if visited[0].Deprecated {
		t.Error("expected the single version to NOT be deprecated")
	}
}

// TestWalkAuditConstructSpecs_IntegrationActiveDeprecated verifies that
// active constructs receive full validation rules while deprecated constructs
// receive only blocking-only rules (Issue #730). Uses the same construct name
// "my-construct" across version directories to exercise version selection.
func TestWalkAuditConstructSpecs_IntegrationActiveDeprecated(t *testing.T) {
	root := t.TempDir()
	// Two active and two deprecated versions of the same construct exercise the
	// real walker and Audit orchestration. The latest active is v1beta2; v1beta1
	// must be skipped, while both deprecated versions must be audited.
	versions := []struct {
		version    string
		deprecated bool
	}{
		{version: "v1beta1"},
		{version: "v1beta2"},
		{version: "v1beta3", deprecated: true},
		{version: "v1beta4", deprecated: true},
	}

	for _, tc := range versions {
		deprecatedExtension := ""
		if tc.deprecated {
			deprecatedExtension = "  x-deprecated: true\n"
		}
		apiContent := `openapi: "3.0.0"
info:
  title: My Construct
  version: "1.0.0"
` + deprecatedExtension + `paths: {}
components:
  schemas:
    MySchema:
      type: object
      properties:
        snake_case:
          type: string
          x-oapi-codegen-extra-tags:
            db: "Not_Snake"
            yaml: "snake_case"
`
		apiPath := filepath.Join(root, "schemas", "constructs", tc.version, "my-construct", "api.yml")
		if err := os.MkdirAll(filepath.Dir(apiPath), 0o755); err != nil {
			t.Fatalf("mkdir api directory for %s: %v", tc.version, err)
		}
		if err := os.WriteFile(apiPath, []byte(apiContent), 0o644); err != nil {
			t.Fatalf("write %s: %v", apiPath, err)
		}
		doc, err := loadAPISpec(apiPath)
		if err != nil {
			t.Fatalf("loadAPISpec(%s): fixture must be valid YAML/OpenAPI: %v", tc.version, err)
		}
		if got := isDeprecatedDoc(doc); got != tc.deprecated {
			t.Errorf("isDeprecatedDoc(%s) = %t, want %t", tc.version, got, tc.deprecated)
		}

		entity := `type: object
properties:
  snake_case:
    type: string
`
		entityPath := filepath.Join(filepath.Dir(apiPath), "my-construct.yaml")
		if err := os.WriteFile(entityPath, []byte(entity), 0o644); err != nil {
			t.Fatalf("write %s: %v", entityPath, err)
		}
	}

	// Audit the fixture root, exercising walkAuditConstructSpecs and the same
	// callback/rule dispatch used for a repository audit.
	result := Audit(AuditOptions{RootDir: root, StyleDebt: true, NoBaseline: true})
	violationsByFile := make(map[string][]Violation)
	for _, v := range append(result.Blocking, result.Advisory...) {
		violationsByFile[v.File] = append(violationsByFile[v.File], v)
	}

	for _, tc := range versions {
		entityFile := filepath.ToSlash(filepath.Join("schemas", "constructs", tc.version, "my-construct", "my-construct.yaml"))
		apiFile := filepath.ToSlash(filepath.Join("schemas", "constructs", tc.version, "my-construct", "api.yml"))
		entityViolations := violationsByFile[entityFile]
		apiViolations := violationsByFile[apiFile]
		if tc.version == "v1beta1" {
			if len(entityViolations) != 0 || len(apiViolations) != 0 {
				t.Errorf("older active version %s should be skipped, got entity violations: %+v, API violations: %+v", tc.version, entityViolations, apiViolations)
			}
			continue
		}

		if !hasRule(entityViolations, 1, SeverityBlocking) {
			t.Errorf("selected version %s should receive blocking Rule 1", tc.version)
		}
		if !hasRule(entityViolations, 20, SeverityBlocking) {
			t.Errorf("selected version %s should receive blocking Rule 20", tc.version)
		}

		if !hasRule(apiViolations, 27, SeverityBlocking) {
			t.Errorf("selected API spec %s should receive blocking Rule 27", tc.version)
		}
		if tc.version == "v1beta2" {
			if !hasRule(entityViolations, 6, SeverityAdvisory) {
				t.Error("latest active version v1beta2 should receive full entity validation, including advisory Rule 6")
			}
			if !hasRule(apiViolations, 6, SeverityAdvisory) || !hasRule(apiViolations, 27, SeverityAdvisory) {
				t.Error("latest active API spec v1beta2 should receive full validation, including advisory Rules 6 and 27")
			}
		} else {
			if hasRule(entityViolations, 6, SeverityAdvisory) {
				t.Errorf("deprecated version %s must not receive advisory entity Rule 6", tc.version)
			}
			if hasRule(apiViolations, 6, SeverityAdvisory) || hasRule(apiViolations, 27, SeverityAdvisory) {
				t.Errorf("deprecated API spec %s must suppress advisory Rules 6 and 27", tc.version)
			}
		}
	}
}

func hasRule(violations []Violation, rule int, severity Severity) bool {
	for _, v := range violations {
		if v.RuleNumber == rule && v.Severity == severity {
			return true
		}
	}
	return false
}

// TestAuditMalformedAPIReportsBlockingViolation verifies that an existing
// but malformed api.yml produces a blocking validation violation instead
// of silently disappearing from the audit.
func TestAuditMalformedAPIReportsBlockingViolation(t *testing.T) {
	root := t.TempDir()

	// Create a version directory with a malformed api.yml
	versionDir := filepath.Join(root, "schemas", "constructs", "v1beta1", "malformed-construct")
	if err := os.MkdirAll(versionDir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", versionDir, err)
	}

	// Write a malformed api.yml (invalid YAML)
	malformedContent := `openapi: "3.0.0"
info:
  title: Malformed Construct
  version: "1.0.0"
paths: {}
components:
  schemas:
    BadSchema:
      type: object
      properties:
        prop:
          type: string
  # Invalid YAML: unclosed bracket
  schemas2: [
`
	if err := os.WriteFile(filepath.Join(versionDir, "api.yml"), []byte(malformedContent), 0o644); err != nil {
		t.Fatalf("write malformed api.yml: %v", err)
	}

	// Run Audit
	result := Audit(AuditOptions{
		RootDir:   root,
		StyleDebt: true,
	})

	// Verify a blocking violation was reported with the exact expected attributes
	var found bool
	for _, v := range result.Blocking {
		if v.Severity == SeverityBlocking && v.RuleNumber == 12 && v.Message == "Failed to load api.yml" && v.File == "schemas/constructs/v1beta1/malformed-construct/api.yml" {
			found = true
			break
		}
	}

	if !found {
		t.Error("expected a blocking violation: File=malformed-construct/api.yml, RuleNumber=12, Message=Failed to load api.yml")
	}
}

// TestAuditMalformedAPIStillAuditsEntityAndTemplates verifies that an existing
// but malformed api.yml keeps its blocking Rule 12 violation while entity
// schemas and template files in the same construct are still independently
// audited (Rule 1/20 entity checks and template checks are not suppressed).
func TestAuditMalformedAPIStillAuditsEntityAndTemplates(t *testing.T) {
	root := t.TempDir()
	constructDir := filepath.Join(root, "schemas", "constructs", "v1beta1", "malformed-construct")
	templatesDir := filepath.Join(constructDir, "templates")
	if err := os.MkdirAll(templatesDir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", templatesDir, err)
	}

	// Malformed api.yml: unclosed bracket.
	if err := os.WriteFile(filepath.Join(constructDir, "api.yml"), []byte("openapi: [invalid\n"), 0o644); err != nil {
		t.Fatalf("write malformed api.yml: %v", err)
	}

	// Independently loadable entity schema: missing additionalProperties: false
	// (Rule 1) and missing required (Rule 20).
	entityPath := filepath.Join(constructDir, "malformed-construct.yaml")
	entity := "type: object\nproperties:\n  name:\n    type: string\n"
	if err := os.WriteFile(entityPath, []byte(entity), 0o644); err != nil {
		t.Fatalf("write entity schema: %v", err)
	}

	// Independently loadable template file: name is an object but schema
	// declares type: string (Rule 34).
	templatePath := filepath.Join(templatesDir, "malformed-construct_template.json")
	if err := os.WriteFile(templatePath, []byte(`{"name": {}}`), 0o644); err != nil {
		t.Fatalf("write template: %v", err)
	}

	result := Audit(AuditOptions{RootDir: root, NoBaseline: true})

	entityFile := relativeToRoot(entityPath, root)
	apiFile := relativeToRoot(filepath.Join(constructDir, "api.yml"), root)
	templateFile := relativeToRoot(templatePath, root)

	var rule12, rule1, rule20, rule34 bool
	for _, v := range result.Blocking {
		switch {
		case v.File == apiFile && v.RuleNumber == 12:
			rule12 = true
		case v.File == entityFile && v.RuleNumber == 1:
			rule1 = true
		case v.File == entityFile && v.RuleNumber == 20:
			rule20 = true
		case v.File == templateFile && v.RuleNumber == 34:
			rule34 = true
		}
	}

	if !rule12 {
		t.Error("expected blocking Rule 12 for malformed api.yml")
	}
	if !rule1 {
		t.Errorf("expected blocking Rule 1 for independently loadable entity %s", entityFile)
	}
	if !rule20 {
		t.Errorf("expected blocking Rule 20 for independently loadable entity %s", entityFile)
	}
	if !rule34 {
		t.Errorf("expected blocking Rule 34 for independently loadable template %s", templateFile)
	}
}

// TestAuditMalformedNewerAPIDoesNotHideOlderActive verifies a malformed newer
// api.yml still reports blocking Rule 12 without displacing the latest valid
// active version or suppressing valid deprecated versions.
func TestAuditMalformedNewerAPIDoesNotHideOlderActive(t *testing.T) {
	root := t.TempDir()

	writeEntity := func(version string) string {
		t.Helper()
		apiPath := writeTestAPIYML(t, root, version, "selection-construct", version == "v1beta4")
		entityPath := filepath.Join(filepath.Dir(apiPath), "selection-construct.yaml")
		entity := "type: object\nproperties:\n  name:\n    type: string\n"
		if err := os.WriteFile(entityPath, []byte(entity), 0o644); err != nil {
			t.Fatalf("write %s: %v", entityPath, err)
		}
		return entityPath
	}

	activeEntity := writeEntity("v1beta1")
	deprecatedEntity := writeEntity("v1beta4")

	malformedDir := filepath.Join(root, "schemas", "constructs", "v1beta3", "selection-construct")
	if err := os.MkdirAll(malformedDir, 0o755); err != nil {
		t.Fatalf("mkdir %s: %v", malformedDir, err)
	}
	malformedPath := filepath.Join(malformedDir, "api.yml")
	if err := os.WriteFile(malformedPath, []byte("openapi: [invalid\n"), 0o644); err != nil {
		t.Fatalf("write malformed api.yml: %v", err)
	}

	result := Audit(AuditOptions{RootDir: root, NoBaseline: true})

	var malformedRule12, activeRule1, activeRule20, deprecatedRule1, deprecatedRule20 bool
	for _, v := range result.Blocking {
		if v.File == relativeToRoot(malformedPath, root) && v.RuleNumber == 12 && v.Message == "Failed to load api.yml" {
			malformedRule12 = true
		}
		if v.File == relativeToRoot(activeEntity, root) && v.RuleNumber == 1 {
			activeRule1 = true
		}
		if v.File == relativeToRoot(activeEntity, root) && v.RuleNumber == 20 {
			activeRule20 = true
		}
		if v.File == relativeToRoot(deprecatedEntity, root) && v.RuleNumber == 1 {
			deprecatedRule1 = true
		}
		if v.File == relativeToRoot(deprecatedEntity, root) && v.RuleNumber == 20 {
			deprecatedRule20 = true
		}
	}

	if !malformedRule12 {
		t.Error("expected malformed newer api.yml to produce blocking Rule 12")
	}
	if !activeRule1 || !activeRule20 {
		t.Error("expected older valid active version to remain audited for Rules 1 and 20")
	}
	if !deprecatedRule1 || !deprecatedRule20 {
		t.Error("expected valid deprecated version to remain audited for Rules 1 and 20")
	}
}

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

// TestWalkValidatedConstructSpecs_IncludesDeprecated verifies that deprecated
// constructs are no longer skipped by walkValidatedConstructSpecs (issue #730).
func TestWalkValidatedConstructSpecs_IncludesDeprecated(t *testing.T) {
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

	if len(visited) != 2 {
		t.Fatalf("expected 2 visited specs, got %d", len(visited))
	}

	deprecatedCount := 0
	activeCount := 0
	for _, spec := range visited {
		if spec.Construct == "deprecated-construct" {
			if !spec.Deprecated {
				t.Errorf("deprecated-construct should have Deprecated=true")
			}
			deprecatedCount++
		}
		if spec.Construct == "active-construct" {
			if spec.Deprecated {
				t.Errorf("active-construct should have Deprecated=false")
			}
			activeCount++
		}
	}
	if deprecatedCount != 1 {
		t.Errorf("expected 1 deprecated spec, got %d", deprecatedCount)
	}
	if activeCount != 1 {
		t.Errorf("expected 1 active spec, got %d", activeCount)
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

	// api.yml missing openapi version -> Rule 2 violation (blocking).
	badOpenAPI := filepath.Join(dir, "bad_openapi.yml")
	if err := os.WriteFile(badOpenAPI, []byte("info:\n  title: Test\n  version: \"1.0.0\"\n"), 0o644); err != nil {
		t.Fatalf("write %s: %v", badOpenAPI, err)
	}

	result := &AuditResult{}
	auditAPISpec(badOpenAPI, dir, AuditOptions{}, make(map[string]bool), result,
		make(map[string][]schemaLocation), "", nil, true)

	var rule12, rule6 bool
	for _, v := range result.Blocking {
		if v.RuleNumber == 12 {
			rule12 = true
		}
	}
	for _, v := range result.Advisory {
		if v.RuleNumber == 6 {
			rule6 = true
		}
	}

	if !rule12 {
		t.Errorf("expected Rule 12 blocking violation for deprecated api.yml missing openapi version")
	}
	if rule6 {
		t.Errorf("expected NO Rule 6 advisory violation for deprecated api.yml")
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

// TestWalkValidatedConstructSpecs_MixedDeprecation verifies that when multiple
// versions of the same construct exist with different deprecation states,
// only the latest version is visited and validated, and a selected deprecated
// version receives blocking-only validation (Rule 27 blocking fires, advisory
// Rule 6 is suppressed).
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

	// v1beta2: deprecated (higher version, selected as latest)
	// Contains a Rule 27 blocking violation (non-snake_case db tag) and would
	// trigger a Rule 6 advisory (snake_case property name) if audited as active.
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

	// Control: run auditEntitySchemas directly on the v1beta1 directory with
	// deprecated=false. The v1beta1 entity schema is missing
	// additionalProperties: false, so Rule 1 must fire when audited directly.
	v1beta1Direct := &AuditResult{}
	auditEntitySchemas(v1beta1Dir, AuditOptions{StyleDebt: true},
		make(map[string]bool), v1beta1Direct, false)
	var v1beta1Rule1 bool
	for _, v := range v1beta1Direct.Blocking {
		if v.Severity == SeverityBlocking && v.RuleNumber == 1 {
			v1beta1Rule1 = true
		}
	}
	if !v1beta1Rule1 {
		t.Error("expected Rule 1 blocking violation for active v1beta1 entity missing additionalProperties: false")
	}

	// Run the full top-level audit orchestration on the temp repo root.
	// This exercises walkValidatedConstructSpecs -> auditAPISpec with the
	// Deprecated flag propagated from the construct spec, not hardcoded.
	result := Audit(AuditOptions{
		RootDir:   root,
		StyleDebt: true,
	})

	// Group violations by file path.
	violationsByFile := make(map[string][]Violation)
	for _, v := range result.Blocking {
		violationsByFile[v.File] = append(violationsByFile[v.File], v)
	}
	for _, v := range result.Advisory {
		violationsByFile[v.File] = append(violationsByFile[v.File], v)
	}

	v1beta1APIPath := relativeToRoot(filepath.Join(v1beta1Dir, "api.yml"), root)
	v1beta1EntityPath := relativeToRoot(filepath.Join(v1beta1Dir, "mixed-construct.yaml"), root)
	v1beta2Path := relativeToRoot(filepath.Join(v1beta2Dir, "api.yml"), root)

	// Only v1beta2 (deprecated, latest) should be audited; v1beta1 must not appear.
	if _, ok := violationsByFile[v1beta1APIPath]; ok {
		t.Errorf("v1beta1 api.yml should not produce audit violations; only latest version v1beta2 should be audited")
	}
	if _, ok := violationsByFile[v1beta1EntityPath]; ok {
		t.Errorf("v1beta1 entity schema should not produce audit violations; only latest version v1beta2 should be audited")
	}

	// v1beta2 should have a Rule 27 blocking violation (non-snake_case db tag).
	var rule27Blocking bool
	for _, v := range violationsByFile[v1beta2Path] {
		if v.Severity == SeverityBlocking && v.RuleNumber == 27 {
			rule27Blocking = true
		}
	}
	if !rule27Blocking {
		t.Error("expected Rule 27 blocking violation for deprecated v1beta2 with non-snake_case db tag")
	}

	// v1beta2 should NOT have a Rule 6 advisory violation (suppressed for deprecated constructs).
	var rule6Advisory bool
	for _, v := range violationsByFile[v1beta2Path] {
		if v.Severity == SeverityAdvisory && v.RuleNumber == 6 {
			rule6Advisory = true
		}
	}
	if rule6Advisory {
		t.Error("expected no Rule 6 advisory violation for deprecated v1beta2")
	}
}

// TestAuditEntitySchemas_NonDeprecatedFullValidation verifies that when
// deprecated=false, auditEntitySchemas runs all rules including advisory
// rules like Rule 6 (casing).
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

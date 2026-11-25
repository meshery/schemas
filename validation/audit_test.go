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

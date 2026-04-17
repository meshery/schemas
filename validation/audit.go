package validation

import (
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
)

// validatedVersions are the API versions that are audited.
// v1alpha* schemas are legacy and kept for backward compatibility.
var validatedVersions = []string{"v1beta1", "v1beta2"}

// httpMethods are the HTTP methods checked in path-item operations.
var httpMethods = []string{"get", "post", "put", "patch", "delete"}

// Audit runs the full schema design validation across all constructs in the
// repository. It returns blocking and advisory violations.
func Audit(opts AuditOptions) AuditResult {
	result := AuditResult{}
	constructsDir := filepath.Join(opts.RootDir, "schemas", "constructs")
	modelsDir := filepath.Join(opts.RootDir, "models")
	baselinePath := filepath.Join(opts.RootDir, "build", "validate-schemas.advisory-baseline.txt")

	// Load advisory baseline.
	var baseline map[string]bool
	if opts.Warn && !opts.NoBaseline {
		baseline = loadAdvisoryBaseline(baselinePath)
	} else {
		baseline = make(map[string]bool)
	}

	// Detect git baseline for enum comparison.
	enumBaselineRef := detectEnumBaselineRef(opts.RootDir)

	// Cross-construct fingerprints for Rule 29.
	fingerprints := make(map[string][]schemaLocation)

	// Walk validated versions.
	if info, err := os.Stat(constructsDir); err != nil || !info.IsDir() {
		return result
	}

	versionEntries, err := os.ReadDir(constructsDir)
	if err != nil {
		return result
	}
	sort.Slice(versionEntries, func(i, j int) bool {
		return versionEntries[i].Name() < versionEntries[j].Name()
	})

	for _, vEntry := range versionEntries {
		if !vEntry.IsDir() {
			continue
		}
		version := vEntry.Name()
		if !shouldValidateVersion(version) {
			continue
		}

		versionDir := filepath.Join(constructsDir, version)
		constructEntries, err := os.ReadDir(versionDir)
		if err != nil {
			continue
		}
		sort.Slice(constructEntries, func(i, j int) bool {
			return constructEntries[i].Name() < constructEntries[j].Name()
		})

		for _, cEntry := range constructEntries {
			if !cEntry.IsDir() {
				continue
			}
			constructDir := filepath.Join(versionDir, cEntry.Name())
			apiYmlPath := filepath.Join(constructDir, "api.yml")

			// Load api.yml once and check deprecation from the same doc to
			// avoid redundant file I/O. If the file doesn't exist or fails to
			// load, we still run entity/template audits.
			var apiDoc *openapi3.T
			apiExists := false
			if _, err := os.Stat(apiYmlPath); err == nil {
				apiExists = true
				doc, loadErr := loadAPISpec(apiYmlPath)
				if loadErr == nil {
					// Skip deprecated constructs entirely.
					if isDeprecatedDoc(doc) {
						continue
					}
					apiDoc = doc
				}
			}

			// Validate entity schemas (*.yaml, not api.yml).
			auditEntitySchemas(constructDir, opts, baseline, &result)

			// Validate template files (Rule 18, 34).
			auditTemplateFiles(constructDir, cEntry.Name(), opts, baseline, &result)

			// Validate api.yml if it exists.
			if apiExists {
				auditAPISpec(apiYmlPath, constructDir, opts, baseline, &result,
					fingerprints, enumBaselineRef, apiDoc)
			}
		}
	}

	// Rule 29: report cross-construct duplicates.
	for _, v := range reportDuplicateSchemas(fingerprints, opts) {
		addViolation(&result, v, baseline)
	}

	// Rule 22: validate helper files in models/.
	auditHelperFiles(modelsDir, opts, baseline, &result)

	return result
}

// shouldValidateVersion returns true if the version should be audited.
func shouldValidateVersion(version string) bool {
	for _, v := range validatedVersions {
		if version == v || strings.HasPrefix(version, v) {
			return true
		}
	}
	return false
}

// isDeprecatedDoc checks if a loaded api.yml has x-deprecated: true in info.
func isDeprecatedDoc(doc *openapi3.T) bool {
	if doc == nil || doc.Info == nil {
		return false
	}
	deprecated, _ := doc.Info.Extensions["x-deprecated"].(bool)
	return deprecated
}

// auditEntitySchemas validates all *.yaml entity files in a construct directory.
func auditEntitySchemas(constructDir string, opts AuditOptions,
	baseline map[string]bool, result *AuditResult) {

	entries, err := os.ReadDir(constructDir)
	if err != nil {
		return
	}
	sort.Slice(entries, func(i, j int) bool {
		return entries[i].Name() < entries[j].Name()
	})

	for _, e := range entries {
		name := e.Name()
		if !strings.HasSuffix(name, ".yaml") {
			continue
		}
		if name == "api.yml" || strings.Contains(name, "_template") {
			continue
		}

		entityPath := filepath.Join(constructDir, name)
		entity, err := loadEntitySchema(entityPath)
		if err != nil || entity == nil {
			continue
		}
		relPath := relativeToRoot(entityPath, opts.RootDir)

		// Rule 1: additionalProperties: false.
		for _, v := range checkRule1(relPath, entity, opts) {
			addViolation(result, v, baseline)
		}

		// Rule 20: properties and required sections.
		for _, v := range checkRule20(relPath, entity, opts) {
			addViolation(result, v, baseline)
		}

		// Rule 6: entity property casing must match contract/DB-backed rules.
		for _, v := range checkRule6ForEntity(relPath, entity, opts) {
			addViolation(result, v, baseline)
		}

		// Rule 32: DB-backed fields must use the exact snake_case db column name.
		for _, v := range checkRule32ForEntity(relPath, entity, opts) {
			addViolation(result, v, baseline)
		}

		// Rule 35: entity property x-go-type / x-go-type-import consistency.
		for _, v := range checkRule35ForEntity(relPath, entity, opts) {
			addViolation(result, v, baseline)
		}

		// Rules 37–41: property-constraint advisories.
		for _, v := range checkEntityPropertyConstraints(relPath, entity, opts) {
			addViolation(result, v, baseline)
		}
	}
}

// auditTemplateFiles validates template files in a construct directory.
func auditTemplateFiles(constructDir, constructName string, opts AuditOptions,
	baseline map[string]bool, result *AuditResult) {

	relDir := relativeToRoot(constructDir, opts.RootDir)

	// Rule 18: template files must exist.
	for _, v := range checkRule18(relDir, constructDir, constructName, opts) {
		addViolation(result, v, baseline)
	}

	// Rule 34: template value types must match schema.
	for _, v := range checkRule34(relDir, constructDir, opts) {
		addViolation(result, v, baseline)
	}
}

// auditAPISpec validates an api.yml file using kin-openapi. The doc is
// preloaded by the caller to avoid redundant file I/O — pass nil if the
// file failed to load, and this function will report it as blocking.
func auditAPISpec(apiYmlPath, constructDir string, opts AuditOptions,
	baseline map[string]bool, result *AuditResult,
	fingerprints map[string][]schemaLocation, enumBaselineRef string,
	doc *openapi3.T) {

	relPath := relativeToRoot(apiYmlPath, opts.RootDir)

	if doc == nil {
		// Structural load failure — report as blocking.
		addViolation(result, Violation{
			File:       relPath,
			Message:    "Failed to load api.yml",
			Severity:   SeverityBlocking,
			RuleNumber: 12,
		}, baseline)
		return
	}

	// Load the raw YAML doc once for rules that need $ref sibling access
	// (Rule 15/16). kin-openapi resolves $ref and discards siblings.
	rawDoc, _ := loadAPISpecRaw(apiYmlPath)

	// Run all API spec rules.
	ruleChecks := []func(string, *openapi3.T, AuditOptions) []Violation{
		checkRule2, checkRule3, checkRule4, checkRule5,
		checkRule6ForAPI, checkRule7, checkRule9, checkRule10,
		checkRule11, checkRule12, checkRule13, checkRule14,
		checkRule17, checkRule19, checkRule21, checkRule23,
		checkRule24, checkRule25, checkRule26, checkRule27,
		checkRule28, checkRule30, checkRule31, checkRule35,
		checkRule36,
	}

	for _, check := range ruleChecks {
		for _, v := range check(relPath, doc, opts) {
			addViolation(result, v, baseline)
		}
	}

	// Rules 15-16: cross-construct refs (raw YAML needed for $ref siblings).
	for _, v := range checkRule15(relPath, rawDoc, doc, opts) {
		addViolation(result, v, baseline)
	}

	// Rule 8: enum values.
	for _, v := range checkRule8(apiYmlPath, relPath, doc, opts, enumBaselineRef) {
		addViolation(result, v, baseline)
	}

	// Rule 32: DB-backed property names.
	for _, v := range checkRule32ForAPI(relPath, doc, opts) {
		addViolation(result, v, baseline)
	}

	// Rule 33: pagination envelope fields.
	for _, v := range checkRule33(relPath, doc, opts) {
		addViolation(result, v, baseline)
	}

	// Rules 37-41: property constraints.
	for _, v := range checkPropertyConstraints(relPath, doc, opts) {
		addViolation(result, v, baseline)
	}

	// Rule 29: collect fingerprints.
	collectSchemaFingerprints(relPath, doc, fingerprints)
}

// auditHelperFiles validates *_helper.go files in the models directory.
func auditHelperFiles(modelsDir string, opts AuditOptions,
	baseline map[string]bool, result *AuditResult) {

	if _, err := os.Stat(modelsDir); err != nil {
		return
	}

	versionEntries, err := os.ReadDir(modelsDir)
	if err != nil {
		return
	}

	for _, vEntry := range versionEntries {
		if !vEntry.IsDir() {
			continue
		}
		versionDir := filepath.Join(modelsDir, vEntry.Name())
		pkgEntries, err := os.ReadDir(versionDir)
		if err != nil {
			continue
		}
		for _, pkgEntry := range pkgEntries {
			if !pkgEntry.IsDir() {
				continue
			}
			pkgDir := filepath.Join(versionDir, pkgEntry.Name())
			files, err := os.ReadDir(pkgDir)
			if err != nil {
				continue
			}
			for _, f := range files {
				if strings.HasSuffix(f.Name(), "_helper.go") {
					helperPath := filepath.Join(pkgDir, f.Name())
					relPath := relativeToRoot(helperPath, opts.RootDir)
					for _, v := range checkRule22(relPath, helperPath, opts) {
						addViolation(result, v, baseline)
					}
				}
			}
		}
	}
}

// addViolation adds a violation to the result, applying baseline filtering
// for advisory violations.
func addViolation(result *AuditResult, v Violation, baseline map[string]bool) {
	if v.Severity == SeverityAdvisory {
		if isBaselined(baseline, v.File, v.Message) {
			return
		}
		result.Advisory = append(result.Advisory, v)
	} else {
		result.Blocking = append(result.Blocking, v)
	}
}

// relativeToRoot converts an absolute path to a path relative to the repo root.
func relativeToRoot(absPath, rootDir string) string {
	rel, err := filepath.Rel(rootDir, absPath)
	if err != nil {
		return absPath
	}
	return filepath.ToSlash(rel)
}

// This file uses openapi3.T directly via the import above.

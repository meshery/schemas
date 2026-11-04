package validation

import (
	"fmt"
	"net/url"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

// --- Rule 48: a $ref with no fragment must not point at an OpenAPI document ---
//
// A $ref with no `#` fragment makes the whole target file the schema at that
// spot. That is right for a plain schema file such as
// `../../v1beta1/category/category.yaml`. When the target is a full OpenAPI
// document instead (its root has an `openapi` key), the document's `openapi`,
// `info`, `paths` and `components` keys are read as schema keywords: code
// generation types the value as `unknown`, every bundle carries a copy of the
// whole document, and structural OpenAPI linters reject the bundle.
//
// Canonical example: meshery/schemas#1304. `RegistryRelationshipsPage` in
// v1beta1/registry/api.yml pointed its `relationships` items at
// `../../v1alpha3/relationship/relationship.yaml`, so the generated
// `relationships` was `unknown[]` and RegistrySchema.ts held four copies of
// the relationship document. The fix points the $ref at
// `#/components/schemas/RelationshipDefinition` inside that file.
//
// The rule reads raw YAML so it sees every $ref exactly as written, wherever
// it sits in the file (schemas, parameters, responses, paths). That includes
// a $ref inside an `example` value: the bundler
// (@apidevtools/json-schema-ref-parser) dereferences every $ref it finds, so
// it would inline the whole document there too. Local paths are
// percent-decoded first, as the bundler does. Refs to local files that cannot
// be read are skipped: this rule only judges what a whole-file $ref points at,
// not whether the target exists.
//
// A remote $ref with no fragment is also reported. That covers a URL with a
// scheme (`https://...`) and a network-path ref (`//host/...`), which the
// bundler fetches over HTTPS. The validator does not fetch remote files, so it
// cannot tell whether the target is an OpenAPI document, while the bundler
// would fetch and inline the whole file. A remote $ref with a fragment is
// allowed.

// checkRule48 reports every $ref in a raw YAML document (an api.yml or an
// entity schema) that has no fragment and resolves to a file whose root is an
// OpenAPI document. relPath is the path used in messages; absPath is where the
// file lives on disk, used to resolve relative refs.
func checkRule48(relPath, absPath string, raw map[string]any) []Violation {
	if raw == nil {
		return nil
	}
	baseDir := filepath.Dir(absPath)

	// Each target file is read at most once per checked document.
	type targetInfo struct {
		version   string
		isOpenAPI bool
	}
	targets := map[string]targetInfo{}

	var out []Violation
	walkRefs(raw, "", func(pointer, ref string) {
		if isRemoteWholeFileRef(ref) {
			out = append(out, Violation{
				File: relPath,
				Message: fmt.Sprintf(
					"#%s - $ref %q is a remote URL with no fragment. The validator does not fetch remote files, "+
						"so it cannot check whether the target is an OpenAPI document. "+
						"Point the $ref at one schema with a fragment, for example %q, "+
						"or copy the schema into this repository and use a relative $ref.",
					pointer, ref,
					strings.TrimSuffix(ref, "#")+"#/components/schemas/<SchemaName>"),
				Severity:   SeverityBlocking,
				RuleNumber: 48,
			})
			return
		}
		target, ok := wholeFileRefTarget(baseDir, ref)
		if !ok {
			return
		}
		info, seen := targets[target]
		if !seen {
			info.version, info.isOpenAPI = openAPIVersionOf(target)
			targets[target] = info
		}
		if !info.isOpenAPI {
			return
		}
		out = append(out, Violation{
			File: relPath,
			Message: fmt.Sprintf(
				"#%s - $ref %q has no fragment, but its target is an OpenAPI document (openapi: %s), "+
					"so the whole document (openapi, info, paths, components) becomes the schema here. "+
					"Point the $ref at one schema inside that document, for example %q.",
				pointer, ref, info.version,
				strings.TrimSuffix(ref, "#")+"#/components/schemas/<SchemaName>"),
			Severity:   SeverityBlocking,
			RuleNumber: 48,
		})
	})
	return out
}

// walkRefs calls visit for every `$ref` string in a decoded YAML node, passing
// the JSON pointer of the mapping that holds the $ref. Mapping keys are visited
// in sorted order so violations are reported in a stable order.
//
// yaml.v3 decodes a mapping with any non-string key (an unquoted response code
// such as `200:`) as map[any]any, so both mapping forms are handled.
func walkRefs(node any, pointer string, visit func(pointer, ref string)) {
	switch n := node.(type) {
	case map[string]any:
		keys := make([]string, 0, len(n))
		for k := range n {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			if k == "$ref" {
				if ref, ok := n[k].(string); ok {
					visit(pointer, ref)
				}
				continue
			}
			walkRefs(n[k], pointer+"/"+escapeJSONPointerToken(k), visit)
		}
	case map[any]any:
		converted := make(map[string]any, len(n))
		for k, v := range n {
			converted[fmt.Sprint(k)] = v
		}
		walkRefs(converted, pointer, visit)
	case []any:
		for i, v := range n {
			walkRefs(v, pointer+"/"+strconv.Itoa(i), visit)
		}
	}
}

// jsonPointerEscaper escapes a mapping key for use as a JSON pointer token
// (RFC 6901), so path keys such as `/api/registry/relationships` stay readable.
var jsonPointerEscaper = strings.NewReplacer("~", "~0", "/", "~1")

func escapeJSONPointerToken(key string) string {
	return jsonPointerEscaper.Replace(key)
}

// isRemoteRef reports whether ref names a remote file: a URL with a scheme
// (`https://...`) or a network-path ref (`//host/...`).
func isRemoteRef(ref string) bool {
	if strings.HasPrefix(ref, "#") {
		return false
	}
	return strings.HasPrefix(ref, "//") || strings.Contains(ref, "://")
}

// isRemoteWholeFileRef reports whether ref is a remote ref with no fragment or
// an empty one.
func isRemoteWholeFileRef(ref string) bool {
	if !isRemoteRef(ref) {
		return false
	}
	_, fragment, _ := strings.Cut(ref, "#")
	return fragment == ""
}

// wholeFileRefTarget returns the local file a $ref names when the ref has no
// fragment (or an empty one), so it pulls in the whole file. Local refs
// (`#/...`) and remote refs are not local whole-file refs. The path is
// percent-decoded, as the bundler decodes it, so `doc%2Eyaml` names
// `doc.yaml`. A path that does not decode is skipped.
func wholeFileRefTarget(baseDir, ref string) (string, bool) {
	if ref == "" || strings.HasPrefix(ref, "#") || isRemoteRef(ref) {
		return "", false
	}
	file, fragment, _ := strings.Cut(ref, "#")
	if file == "" || fragment != "" {
		return "", false
	}
	decoded, err := url.PathUnescape(file)
	if err != nil {
		return "", false
	}
	return filepath.Clean(filepath.Join(baseDir, filepath.FromSlash(decoded))), true
}

// openAPIVersionOf reports whether the YAML file at path is an OpenAPI
// document (its root mapping has an `openapi` key) and returns that key's
// value, or "unknown" when the key has no value. A file that cannot be read
// or parsed is not reported as one.
func openAPIVersionOf(path string) (string, bool) {
	doc, err := loadYAMLDoc(path)
	if err != nil || doc == nil {
		return "", false
	}
	version, ok := doc["openapi"]
	if !ok {
		return "", false
	}
	if version == nil || strings.TrimSpace(fmt.Sprint(version)) == "" {
		return "unknown", true
	}
	return fmt.Sprint(version), true
}

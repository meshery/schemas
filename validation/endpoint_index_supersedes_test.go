package validation

import (
	"path/filepath"
	"strings"
	"testing"
)

// Every operation that a newer version owns with x-supersedes is indexed once,
// under the owner's version and source file. The index walks each construct's
// latest non-deprecated version, so this holds while the owner is that version,
// and the superseded declaration of an older version is never indexed beside it.
// The index has no ownership logic: this test only reads what it builds.
func TestEndpointIndexIndexesEverySupersedingOwnerOnce(t *testing.T) {
	root := repoRootDir(t)
	idx, err := buildEndpointIndex(root)
	if err != nil {
		t.Fatalf("buildEndpointIndex: %v", err)
	}

	apiFiles, err := filepath.Glob(filepath.Join(root, "schemas", "constructs", "*", "*", "api.yml"))
	if err != nil {
		t.Fatalf("glob construct api.yml files: %v", err)
	}

	owners := 0
	for _, apiFile := range apiFiles {
		rel := relativeToRoot(apiFile, root)
		doc := loadSpec(t, rel)
		if doc.Paths == nil {
			continue
		}
		version := filepath.Base(filepath.Dir(filepath.Dir(apiFile)))

		for route, pathItem := range doc.Paths.Map() {
			for _, method := range httpMethods {
				op := getOperation(pathItem, method)
				if op == nil {
					continue
				}
				if _, ok := op.Extensions["x-supersedes"]; !ok {
					continue
				}
				owners++

				upper := strings.ToUpper(method)
				var found []schemaEndpoint
				for _, ep := range idx.Endpoints {
					if ep.Path == route && ep.Method == upper {
						found = append(found, ep)
					}
				}
				if len(found) != 1 {
					t.Errorf("%s %s owned by %s (%s) is indexed %d times, want once", upper, route, version, rel, len(found))
					continue
				}
				if ep := found[0]; ep.Version != version || ep.SourceFile != rel {
					t.Errorf("%s %s is indexed from %s %s, want the owner %s %s", upper, route, ep.Version, ep.SourceFile, version, rel)
				}
			}
		}
	}

	if owners == 0 {
		t.Fatal("no x-supersedes owner found under schemas/constructs, so the check would pass vacuously")
	}
}

package validation

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// TestWalkValidatedConstructSpecs_VisitsAllNonDeprecatedVersions ensures the
// walker validates every non-deprecated version of a construct independently,
// rather than only the highest version. An older, non-deprecated version must
// not be shadowed by a newer one; only versions marked x-deprecated are skipped.
func TestWalkValidatedConstructSpecs_VisitsAllNonDeprecatedVersions(t *testing.T) {
	root := t.TempDir()
	write := func(version, construct, body string) {
		dir := filepath.Join(root, "schemas", "constructs", version, construct)
		require.NoError(t, os.MkdirAll(dir, 0o755))
		require.NoError(t, os.WriteFile(filepath.Join(dir, "api.yml"), []byte(body), 0o644))
	}
	const live = "openapi: 3.0.0\ninfo:\n  title: t\n  version: 1.0.0\npaths: {}\n"
	const deprecated = "openapi: 3.0.0\ninfo:\n  title: t\n  version: 1.0.0\n  x-deprecated: true\npaths: {}\n"

	write("v1alpha1", "widget", live) // older, non-deprecated -> must be visited
	write("v1beta1", "widget", live)  // newer, non-deprecated -> must be visited
	write("v1alpha1", "legacy", deprecated)

	visited := map[string]bool{}
	require.NoError(t, walkValidatedConstructSpecs(root, func(s constructSpec) error {
		visited[s.Version+"/"+s.Construct] = true
		return nil
	}))

	assert.True(t, visited["v1alpha1/widget"], "older non-deprecated version must still be validated")
	assert.True(t, visited["v1beta1/widget"], "newer non-deprecated version must be validated")
	assert.False(t, visited["v1alpha1/legacy"], "deprecated version must be skipped")
}

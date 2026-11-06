package component

import (
	"encoding/json"
	"os"
	"path/filepath"
	"sort"
	"testing"

	"gopkg.in/yaml.v3"
)

func componentOf(kind, apiVersion string) ComponentDefinition {
	return ComponentDefinition{Component: Component{Kind: kind, Version: apiVersion}}
}

func filesIn(t *testing.T, dir string) []string {
	t.Helper()
	entries, err := os.ReadDir(dir)
	if err != nil {
		t.Fatal(err)
	}
	var names []string
	for _, e := range entries {
		names = append(names, e.Name())
	}
	sort.Strings(names)
	return names
}

func storedAPIVersion(t *testing.T, path, fileType string) string {
	t.Helper()
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatal(err)
	}
	var stored struct {
		Component struct {
			Version string `json:"version" yaml:"version"`
		} `json:"component" yaml:"component"`
	}
	if fileType == "yaml" {
		err = yaml.Unmarshal(data, &stored)
	} else {
		err = json.Unmarshal(data, &stored)
	}
	if err != nil {
		t.Fatalf("%s: %v", path, err)
	}
	return stored.Component.Version
}

func write(t *testing.T, c ComponentDefinition, dir, fileType string) bool {
	t.Helper()
	alreadyExists, err := c.WriteComponentDefinition(dir, fileType)
	if err != nil {
		t.Fatalf("WriteComponentDefinition(%s %s): %v", c.Component.Kind, c.Component.Version, err)
	}
	return alreadyExists
}

// TestWriteComponentDefinitionSameKindDifferentGroup guards against dropping a
// component whose Kind is already written by a component from another API
// group. The Linkerd chart ships both the Gateway API HTTPRoute and its own
// policy.linkerd.io HTTPRoute; both must end up on disk.
func TestWriteComponentDefinitionSameKindDifferentGroup(t *testing.T) {
	for _, fileType := range []string{"json", "yaml"} {
		t.Run(fileType, func(t *testing.T) {
			dir := t.TempDir()
			gateway := componentOf("HTTPRoute", "gateway.networking.k8s.io/v1")
			linkerd := componentOf("HTTPRoute", "policy.linkerd.io/v1beta3")

			if write(t, gateway, dir, fileType) {
				t.Fatal("first component reported as already present")
			}
			if write(t, linkerd, dir, fileType) {
				t.Fatal("component from another group reported as already present")
			}

			plain := "HTTPRoute." + fileType
			qualified := "HTTPRoute.policy.linkerd.io." + fileType
			if got, want := filesIn(t, dir), []string{plain, qualified}; !equal(got, want) {
				t.Fatalf("files = %v, want %v", got, want)
			}
			if got := storedAPIVersion(t, filepath.Join(dir, plain), fileType); got != "gateway.networking.k8s.io/v1" {
				t.Fatalf("%s holds %q, want the first component", plain, got)
			}
			if got := storedAPIVersion(t, filepath.Join(dir, qualified), fileType); got != "policy.linkerd.io/v1beta3" {
				t.Fatalf("%s holds %q, want the second component", qualified, got)
			}

			// Generating into the same directory again writes nothing new.
			if !write(t, gateway, dir, fileType) || !write(t, linkerd, dir, fileType) {
				t.Fatal("re-run must report both components as already present")
			}
			if got := filesIn(t, dir); len(got) != 2 {
				t.Fatalf("re-run changed the directory: %v", got)
			}
		})
	}
}

// TestWriteComponentDefinitionSameGroupIsAlreadyPresent keeps the existing
// behaviour for the same group: another version of a Kind does not create a
// second file, and the stored file is left alone.
func TestWriteComponentDefinitionSameGroupIsAlreadyPresent(t *testing.T) {
	dir := t.TempDir()
	if write(t, componentOf("HorizontalPodAutoscaler", "autoscaling/v2"), dir, "json") {
		t.Fatal("first component reported as already present")
	}
	if !write(t, componentOf("HorizontalPodAutoscaler", "autoscaling/v1"), dir, "json") {
		t.Fatal("same group, other version must count as already present")
	}
	if got, want := filesIn(t, dir), []string{"HorizontalPodAutoscaler.json"}; !equal(got, want) {
		t.Fatalf("files = %v, want %v", got, want)
	}
	if got := storedAPIVersion(t, filepath.Join(dir, "HorizontalPodAutoscaler.json"), "json"); got != "autoscaling/v2" {
		t.Fatalf("stored file was overwritten: %q", got)
	}
}

// TestWriteComponentDefinitionCoreGroup names the core group ("v1"), which
// has no group name, "core".
func TestWriteComponentDefinitionCoreGroup(t *testing.T) {
	dir := t.TempDir()
	write(t, componentOf("Event", "events.k8s.io/v1"), dir, "json")
	if write(t, componentOf("Event", "v1"), dir, "json") {
		t.Fatal("core Event reported as already present")
	}
	if got, want := filesIn(t, dir), []string{"Event.core.json", "Event.json"}; !equal(got, want) {
		t.Fatalf("files = %v, want %v", got, want)
	}
}

// TestWriteComponentDefinitionThreeGroups writes one file per group.
func TestWriteComponentDefinitionThreeGroups(t *testing.T) {
	dir := t.TempDir()
	for _, v := range []string{"a.example.com/v1", "b.example.com/v1", "c.example.com/v1"} {
		if write(t, componentOf("Usage", v), dir, "json") {
			t.Fatalf("Usage %s reported as already present", v)
		}
	}
	want := []string{"Usage.b.example.com.json", "Usage.c.example.com.json", "Usage.json"}
	if got := filesIn(t, dir); !equal(got, want) {
		t.Fatalf("files = %v, want %v", got, want)
	}
}

// TestWriteComponentDefinitionGroupStaysInDirectory makes sure a malformed
// apiVersion cannot turn the group part of the name into a path.
func TestWriteComponentDefinitionGroupStaysInDirectory(t *testing.T) {
	dir := t.TempDir()
	write(t, componentOf("Thing", "example.com/v1"), dir, "json")
	if write(t, componentOf("Thing", "../../evil/v1"), dir, "json") {
		t.Fatal("component from another group reported as already present")
	}
	if got, want := filesIn(t, dir), []string{"Thing...-..-evil.json", "Thing.json"}; !equal(got, want) {
		t.Fatalf("files = %v, want %v", got, want)
	}
}

// TestWriteComponentDefinitionUnreadableFile keeps the old answer for a
// <Kind> file that cannot be parsed: it counts as present and is not touched.
func TestWriteComponentDefinitionUnreadableFile(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "Widget.json")
	if err := os.WriteFile(path, []byte("not json"), 0o644); err != nil {
		t.Fatal(err)
	}
	if !write(t, componentOf("Widget", "example.com/v1"), dir, "json") {
		t.Fatal("unreadable existing file must count as already present")
	}
	if got := filesIn(t, dir); len(got) != 1 {
		t.Fatalf("files = %v, want only Widget.json", got)
	}
}

// TestWriteComponentDefinitionEmptyKind writes nothing for a component
// without a Kind, as before.
func TestWriteComponentDefinitionEmptyKind(t *testing.T) {
	dir := t.TempDir()
	if write(t, componentOf("", "v1"), dir, "json") {
		t.Fatal("empty Kind reported as already present")
	}
	if got := filesIn(t, dir); len(got) != 0 {
		t.Fatalf("files = %v, want none", got)
	}
}

// equal reports whether got (already sorted) holds exactly the names in want.
func equal(got, want []string) bool {
	want = append([]string(nil), want...)
	sort.Strings(want)
	a, b := got, want
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

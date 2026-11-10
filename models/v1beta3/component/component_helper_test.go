package component

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"sync"
	"testing"

	"gopkg.in/yaml.v3"
)

// componentOf returns a component definition with only Kind and apiVersion set.
func componentOf(kind, apiVersion string) ComponentDefinition {
	return ComponentDefinition{Component: Component{Kind: kind, Version: apiVersion}}
}

// filesIn returns the sorted names of the entries in dir.
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

// storedAPIVersion returns component.version of the component stored at path.
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

// write calls WriteComponentDefinition, fails the test on an error, and
// returns its alreadyExists result.
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

// TestWriteComponentDefinitionSharedGroupLabel covers two groups with the same
// file label: the core group ("v1") and a group named "core" ("core/v1") both
// map to <Kind>.core.json. Neither may be dropped, in either write order, and
// a re-run must write nothing new.
func TestWriteComponentDefinitionSharedGroupLabel(t *testing.T) {
	for _, order := range [][]string{{"v1", "core/v1"}, {"core/v1", "v1"}} {
		t.Run(order[0]+" first", func(t *testing.T) {
			dir := t.TempDir()
			versions := append([]string{"example.com/v1"}, order...)
			for _, v := range versions {
				if write(t, componentOf("Thing", v), dir, "json") {
					t.Fatalf("Thing %s reported as already present", v)
				}
			}
			assertOneFilePerVersion(t, dir, "json", versions)

			for _, v := range versions {
				if !write(t, componentOf("Thing", v), dir, "json") {
					t.Fatalf("re-run: Thing %s must be reported as already present", v)
				}
			}
			assertOneFilePerVersion(t, dir, "json", versions)
		})
	}
}

// TestWriteComponentDefinitionBaseFileRemoved covers a <Kind> file deleted by
// hand while a group-qualified file remains: the group stored in the
// qualified file must still count as present instead of being written again.
func TestWriteComponentDefinitionBaseFileRemoved(t *testing.T) {
	dir := t.TempDir()
	a := componentOf("Usage", "a.example.com/v1")
	b := componentOf("Usage", "b.example.com/v1")
	write(t, a, dir, "json")
	write(t, b, dir, "json")
	if err := os.Remove(filepath.Join(dir, "Usage.json")); err != nil {
		t.Fatal(err)
	}

	if !write(t, b, dir, "json") {
		t.Fatal("b is stored in Usage.b.example.com.json and must count as present")
	}
	if write(t, a, dir, "json") {
		t.Fatal("a was removed and must be written again")
	}
	if got, want := filesIn(t, dir), []string{"Usage.b.example.com.json", "Usage.json"}; !equal(got, want) {
		t.Fatalf("files = %v, want %v", got, want)
	}
	assertOneFilePerVersion(t, dir, "json", []string{"a.example.com/v1", "b.example.com/v1"})
}

// TestWriteComponentDefinitionConcurrentWriters writes the same Kind from
// several groups at once. Each group must end up in exactly one file. Run
// with -race to also check for data races.
func TestWriteComponentDefinitionConcurrentWriters(t *testing.T) {
	versions := []string{"v1", "core/v1", "a.example.com/v1", "b.example.com/v1", "c.example.com/v1", "d.example.com/v1"}
	for round := 0; round < 20; round++ {
		dir := t.TempDir()
		var wg sync.WaitGroup
		errs := make(chan error, len(versions))
		for _, v := range versions {
			wg.Add(1)
			go func(v string) {
				defer wg.Done()
				if alreadyExists, err := componentOf("Gizmo", v).WriteComponentDefinition(dir, "json"); err != nil || alreadyExists {
					errs <- fmt.Errorf("Gizmo %s: alreadyExists=%v err=%v", v, alreadyExists, err)
				}
			}(v)
		}
		wg.Wait()
		close(errs)
		for err := range errs {
			t.Fatalf("round %d: %v", round, err)
		}
		assertOneFilePerVersion(t, dir, "json", versions)
	}
}

// assertOneFilePerVersion fails the test unless dir holds exactly one file
// per apiVersion in versions.
func assertOneFilePerVersion(t *testing.T, dir, fileType string, versions []string) {
	t.Helper()
	files := filesIn(t, dir)
	count := map[string]int{}
	for _, name := range files {
		count[storedAPIVersion(t, filepath.Join(dir, name), fileType)]++
	}
	if len(files) != len(versions) {
		t.Fatalf("files = %v, want one per version %v", files, versions)
	}
	for _, v := range versions {
		if count[v] != 1 {
			t.Fatalf("%s is stored in %d files, want 1 (files %v)", v, count[v], files)
		}
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

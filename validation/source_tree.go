package validation

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
)

// sourceTree abstracts access to a consumer repo's source files.
type sourceTree interface {
	// ReadFile returns the contents of a file at the given path
	// (relative to the repo root).
	ReadFile(path string) ([]byte, error)

	// Walk calls fn for every file under dir (relative to repo root),
	// in deterministic sorted order. Directories are not visited.
	Walk(dir string, fn func(path string) error) error

	// Ref returns a human-readable label for log/note output.
	Ref() string
}

// localTree is a sourceTree backed by the OS filesystem.
type localTree struct {
	root string
}

func (t localTree) ReadFile(path string) ([]byte, error) {
	return os.ReadFile(filepath.Join(t.root, filepath.FromSlash(path)))
}

func (t localTree) Walk(dir string, fn func(path string) error) error {
	abs := filepath.Join(t.root, filepath.FromSlash(dir))
	info, err := os.Stat(abs)
	if err != nil {
		// Missing directory is not an error: callers gracefully handle it.
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	if !info.IsDir() {
		return fmt.Errorf("source_tree: %q is not a directory", dir)
	}

	var paths []string
	err = filepath.WalkDir(abs, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			return walkErr
		}
		if d.IsDir() {
			return nil
		}
		rel, err := filepath.Rel(t.root, p)
		if err != nil {
			return err
		}
		paths = append(paths, filepath.ToSlash(rel))
		return nil
	})
	if err != nil {
		return err
	}

	sort.Strings(paths)
	for _, p := range paths {
		if err := fn(p); err != nil {
			return err
		}
	}
	return nil
}

func (t localTree) Ref() string {
	return "local:" + t.root
}

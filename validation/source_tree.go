package validation

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

// sourceTree abstracts access to a consumer repo's source files.
type sourceTree interface {
	// ReadFile returns the contents of a file at the given path
	// (relative to the repo root).
	ReadFile(path string) ([]byte, error)

	// Walk calls fn for every file under dir (relative to repo root),
	// in deterministic sorted order. Directories are not visited.
	Walk(dir string, fn func(path string) error) error

	// WalkFiltered is Walk restricted to files whose extension appears in
	// exts (matched case-insensitively, leading dot included), with the
	// directories in skipDirs pruned. Callers that need to sweep an entire
	// consumer checkout must use this rather than Walk.
	//
	// It returns the parts of the tree it could not read — a missing root,
	// an unreadable subtree — instead of silently treating them as empty.
	// A caller that ignored these would report "nothing found" for a tree it
	// never actually looked at.
	WalkFiltered(dir string, exts []string, fn func(path string) error) ([]ScanDefect, error)

	// Ref returns a human-readable label for log/note output.
	Ref() string
}

// ScanDefect is a part of a consumer tree the sweep could not read: a missing
// root, an unreadable subtree, or a file that could not be opened.
//
// Each one is a hole in the scan. A consumer with defects may hold references
// the audit never saw, so "no superseded usage found" for that consumer means
// only that — not that none exists.
type ScanDefect struct {
	// Path is the location that could not be read, repo-relative where
	// possible.
	Path string
	// Reason is the underlying error.
	Reason string
}

// skipDirs are directory names never worth descending into when sweeping a
// consumer checkout. This matters for correctness as much as for speed:
//
//   - node_modules contains an installed copy of @meshery/schemas itself,
//     whose own sources would otherwise be counted as consumer usage.
//   - worktrees holds nested checkouts, which produce phantom consumers.
//   - _consumer is where .github/workflows/schema-audit.yml checks the
//     consumer repos out, inside this repo's own working directory.
//
// The remainder are build outputs and caches that only duplicate sources
// already visited.
var skipDirs = map[string]bool{
	".git":         true,
	".cache":       true,
	".next":        true,
	".yarn":        true,
	"_consumer":    true,
	"coverage":     true,
	"dist":         true,
	"node_modules": true,
	"out":          true,
	"vendor":       true,
	"worktrees":    true,
}

// hasExt reports whether path ends in one of exts. An empty exts matches
// every file.
func hasExt(path string, exts []string) bool {
	if len(exts) == 0 {
		return true
	}
	ext := strings.ToLower(filepath.Ext(path))
	for _, want := range exts {
		if ext == strings.ToLower(want) {
			return true
		}
	}
	return false
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

func (t localTree) WalkFiltered(dir string, exts []string, fn func(path string) error) ([]ScanDefect, error) {
	var defects []ScanDefect

	abs := filepath.Join(t.root, filepath.FromSlash(dir))
	info, err := os.Stat(abs)
	if err != nil {
		// A missing directory stays non-fatal — .github/workflows/schema-audit.yml
		// passes every consumer path unconditionally and relies on absent
		// checkouts being skipped — but it is reported, so a caller can tell
		// "scanned and found nothing" from "never scanned".
		if os.IsNotExist(err) {
			return []ScanDefect{{
				Path:   filepath.ToSlash(filepath.Join(t.root, dir)),
				Reason: "directory does not exist; nothing was scanned",
			}}, nil
		}
		return []ScanDefect{{
			Path:   filepath.ToSlash(filepath.Join(t.root, dir)),
			Reason: err.Error(),
		}}, nil
	}
	if !info.IsDir() {
		return nil, fmt.Errorf("source_tree: %q is not a directory", dir)
	}

	var paths []string
	err = filepath.WalkDir(abs, func(p string, d fs.DirEntry, walkErr error) error {
		if walkErr != nil {
			// An unreadable subtree must not abort the whole sweep, but it
			// leaves a hole in it, so record what was missed.
			rel, relErr := filepath.Rel(t.root, p)
			if relErr != nil {
				rel = p
			}
			defects = append(defects, ScanDefect{
				Path:   filepath.ToSlash(rel),
				Reason: walkErr.Error(),
			})
			if d != nil && d.IsDir() {
				return filepath.SkipDir
			}
			return nil
		}
		if d.IsDir() {
			// Never prune the root itself, even if its basename
			// happens to collide with a skipDirs entry.
			if p != abs && skipDirs[d.Name()] {
				return filepath.SkipDir
			}
			return nil
		}
		if !hasExt(p, exts) {
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
		return defects, err
	}

	sort.Strings(paths)
	for _, p := range paths {
		if err := fn(p); err != nil {
			return defects, err
		}
	}
	return defects, nil
}

func (t localTree) Ref() string {
	return "local:" + t.root
}

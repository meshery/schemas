package validation

import (
	"bufio"
	"os"
	"strings"
)

// loadAdvisoryBaseline reads the advisory baseline file and returns a set of
// known issue keys (tab-separated "file\tmessage" lines). Issues matching the
// baseline are suppressed from advisory output.
func loadAdvisoryBaseline(path string) map[string]bool {
	baseline := make(map[string]bool)

	f, err := os.Open(path)
	if err != nil {
		return baseline
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		baseline[line] = true
	}

	return baseline
}

// isBaselined returns true if the given file+message combination is in the
// advisory baseline set.
func isBaselined(baseline map[string]bool, file, message string) bool {
	key := file + "\t" + message
	return baseline[key]
}

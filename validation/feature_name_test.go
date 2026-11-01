package validation

import (
	"fmt"
	"path/filepath"
	"strings"
	"testing"
)

// FeatureName (schemas/constructs/v1beta1/feature/api.yml) is the closed set of
// entitlements a Layer5 Cloud plan can grant. Every consumer keys on the
// literal string: meshery-cloud mirrors it as the Postgres `feature_name` enum
// and seeds plan features from it, and the Blowhorn entitlement client
// (leecalcote/blowhorn, outbox/entitlement.py) maps each Blowhorn* literal to a
// design flag and ignores names it does not know. A value that is renamed or
// dropped therefore fails silently downstream - the client reads an absent
// feature as "not granted", never as an error - and a reordered one would
// silently renumber any positional enum extension.
//
// These tests pin what that contract depends on: the published values in
// their published order, the Blowhorn set the client reads, the casing
// exemption that lets Rule 8 accept the PascalCase convention this enum was
// published with, and a description for every literal so the published
// OpenAPI documentation says how each quantity is read. See
// docs/feature-entitlement-contract.md.

const featureAPISpec = "schemas/constructs/v1beta1/feature/api.yml"

// publishedFeatureNames predate the Blowhorn set. Their order is part of the
// contract: new values are appended after them, never inserted between.
var publishedFeatureNames = []string{
	"ComponentsInDesign",
	"RelationshipsInDesign",
	"DesignsInWorkspace",
	"WorkspacesInOrganization",
	"ImageSizeInDesign",
	"SizePerDesign",
}

// blowhornFeatureNames is the set the Blowhorn entitlement client reads, in the
// order the schema declares them.
var blowhornFeatureNames = []string{
	"BlowhornProfiles",
	"BlowhornBrowserAutomation",
	"BlowhornScheduler",
	"BlowhornDevicesPerSeat",
	"BlowhornPlatformLinkedIn",
	"BlowhornPlatformX",
	"BlowhornPlatformReddit",
	"BlowhornPlatformHackerNews",
	"BlowhornPlatformSlack",
	"BlowhornPlatformBluesky",
	"BlowhornPlatformGitHub",
	"BlowhornPlatformBlog",
}

func featureNameSchema(t *testing.T) any {
	t.Helper()

	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), featureAPISpec))
	node, err := lookupPath(doc, "components", "schemas", "FeatureName")
	if err != nil {
		t.Fatalf("locating FeatureName: %v", err)
	}
	return node
}

func TestFeatureNameEnumKeepsPublishedValuesAndCarriesBlowhornSet(t *testing.T) {
	got := stringSliceOf(mustLookup(t, featureNameSchema(t), "enum"))

	want := make([]string, 0, len(publishedFeatureNames)+len(blowhornFeatureNames))
	want = append(want, publishedFeatureNames...)
	want = append(want, blowhornFeatureNames...)

	if strings.Join(got, ",") != strings.Join(want, ",") {
		t.Errorf("FeatureName enum = %v, want %v in that order. Published values keep "+
			"their position and spelling; new values are appended at the end.", got, want)
	}
}

func TestFeatureNameEnumStaysCasingExempt(t *testing.T) {
	exempt, present := mappingValue(featureNameSchema(t), "x-enum-casing-exempt")
	if !present || exempt != true {
		t.Errorf("FeatureName must declare x-enum-casing-exempt: true (present=%v, value=%v). "+
			"Its values were published PascalCase and later additions follow that "+
			"convention within v1beta1; without the exemption Rule 8 rejects every one.",
			present, exempt)
	}
}

func TestFeatureNameEnumDescribesEveryValue(t *testing.T) {
	schema := featureNameSchema(t)
	values := stringSliceOf(mustLookup(t, schema, "enum"))
	descriptions := mustLookup(t, schema, "x-enumDescriptions")

	inEnum := make(map[string]bool, len(values))
	for _, value := range values {
		inEnum[value] = true
		t.Run(value, func(t *testing.T) {
			text, ok := mappingValue(descriptions, value)
			if !ok {
				t.Fatalf("x-enumDescriptions has no entry for %q; every feature must say "+
					"how its quantity is read", value)
			}
			if strings.TrimSpace(fmt.Sprint(text)) == "" {
				t.Errorf("x-enumDescriptions[%q] is empty", value)
			}
		})
	}

	for _, key := range mappingKeys(descriptions) {
		if !inEnum[key] {
			t.Errorf("x-enumDescriptions describes %q, which is not an enum value - "+
				"the map and the enum must stay in lockstep", key)
		}
	}
}

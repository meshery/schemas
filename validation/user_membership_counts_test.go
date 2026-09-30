package validation

import (
	"fmt"
	"path/filepath"
	"strings"
	"testing"
)

// User.teams and User.organizations carry the membership counts the public
// profile renders as stat tiles, and those tiles are served to anonymous
// callers. A count is only ever the result of a read, and the read can fail.
// Before these properties were nullable the wire had no way to say "not
// measured", which left a server two dishonest choices when the membership
// read failed: publish an unmeasured 0 as fact, or fail the whole profile with
// a 500. `null` is the third answer: the read failed, the value is unknown, and
// the rest of the profile is still served.
//
// These tests pin that contract on every User schema that carries the counts,
// so a later edit that drops `nullable` (or rewords the property so it no
// longer says what null means) fails here instead of quietly reinstating the
// false zero.

var userMembershipCountSpecs = []string{
	"schemas/constructs/v1beta2/user/api.yml",
	"schemas/constructs/v1beta3/user/api.yml",
}

// userMembershipGroups maps each membership group on User to the list property
// read alongside its count. Both come from the same read, so when the count is
// unknown the list is too.
var userMembershipGroups = map[string]string{
	"teams":         "teamsWithRoles",
	"organizations": "organizationsWithRoles",
}

func TestUserMembershipCountsCanExpressUnmeasured(t *testing.T) {
	root := repoRootDir(t)
	for _, spec := range userMembershipCountSpecs {
		doc := loadOpenAPIDocument(t, filepath.Join(root, spec))
		for group, list := range userMembershipGroups {
			for _, property := range []string{"totalCount", list} {
				t.Run(fmt.Sprintf("%s/%s.%s", spec, group, property), func(t *testing.T) {
					node, err := lookupPath(doc, "components", "schemas", "User",
						"properties", group, "properties", property)
					if err != nil {
						t.Fatalf("locating User.%s.%s: %v", group, property, err)
					}

					nullable, _ := mappingValue(node, "nullable")
					if nullable != true {
						t.Errorf("User.%s.%s must declare nullable: true (got %v). "+
							"Without it a failed membership read can only be served "+
							"as a false 0/empty list or as a 500; null is how the "+
							"response says the value was not measured.",
							group, property, nullable)
					}

					description, _ := mappingValue(node, "description")
					text, _ := description.(string)
					if !strings.Contains(strings.ToLower(text), "null") ||
						!strings.Contains(strings.ToLower(text), "not measured") {
						t.Errorf("User.%s.%s description must state that null means "+
							"the value was not measured (got %q). Nullability "+
							"whose meaning is undocumented is read as zero by "+
							"consumers, which is the defect this contract closes.",
							group, property, text)
					}
				})
			}
		}
	}
}

// TestUserMembershipCountsStayNonNegative guards the other half: making the
// count nullable must not loosen what a measured value may be.
func TestUserMembershipCountsStayNonNegative(t *testing.T) {
	root := repoRootDir(t)
	for _, spec := range userMembershipCountSpecs {
		doc := loadOpenAPIDocument(t, filepath.Join(root, spec))
		for group := range userMembershipGroups {
			node, err := lookupPath(doc, "components", "schemas", "User",
				"properties", group, "properties", "totalCount")
			if err != nil {
				t.Fatalf("%s: locating User.%s.totalCount: %v", spec, group, err)
			}
			if typ, _ := mappingValue(node, "type"); typ != "integer" {
				t.Errorf("%s: User.%s.totalCount type = %v, want integer", spec, group, typ)
			}
			minimum, ok := mappingValue(node, "minimum")
			if !ok || fmt.Sprint(minimum) != "0" {
				t.Errorf("%s: User.%s.totalCount minimum = %v, want 0", spec, group, minimum)
			}
		}
	}
}

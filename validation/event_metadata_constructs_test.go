package validation

import (
	"encoding/json"
	"os"
	"path"
	"path/filepath"
	"reflect"
	"sort"
	"strings"
	"testing"
)

// Event-metadata constructs name the shape of an Event's metadata: they have
// no endpoints, the events service stores and returns the metadata verbatim,
// and nothing is server-generated, so the entity and its Payload must carry
// the same contract (docs/schema-authoring-reference.md, "Event-metadata
// constructs have no server-generated fields"). Both are restated by hand,
// so this pins them together.
var eventMetadataConstructs = []struct{ dir, entity string }{
	{"schemas/constructs/v1beta3/activity_metrics", "ActivityMetrics"},
	{"schemas/constructs/v1beta3/content_metrics", "ContentMetrics"},
	{"schemas/constructs/v1beta3/follower_demographics", "FollowerDemographics"},
	{"schemas/constructs/v1beta3/follower_metrics", "FollowerMetrics"},
}

// eventMetadataSchema returns a component schema, following a ./file $ref
// relative to the construct directory.
func eventMetadataSchema(t *testing.T, dir, name string) map[string]any {
	t.Helper()
	schema, ok := mustLookup(t, loadYAMLMap(t, path.Join(dir, "api.yml")), "components", "schemas", name).(map[string]any)
	if !ok {
		t.Fatalf("%s/api.yml: %s is not a mapping", dir, name)
	}
	if ref, ok := schema["$ref"].(string); ok {
		if !strings.HasPrefix(ref, "./") {
			t.Fatalf("%s/api.yml: %s $ref %q is not a ./file reference", dir, name, ref)
		}
		return loadYAMLMap(t, path.Join(dir, strings.TrimPrefix(ref, "./")))
	}
	return schema
}

func eventMetadataProperties(t *testing.T, label string, schema map[string]any) map[string]any {
	t.Helper()
	props, ok := schema["properties"].(map[string]any)
	if !ok {
		t.Fatalf("%s has no properties mapping", label)
	}
	return props
}

func eventMetadataRequired(t *testing.T, label string, schema map[string]any) []string {
	t.Helper()
	raw, _ := schema["required"].([]any)
	out := make([]string, 0, len(raw))
	for _, item := range raw {
		name, ok := item.(string)
		if !ok {
			t.Fatalf("%s required holds %T, want strings", label, item)
		}
		out = append(out, name)
	}
	sort.Strings(out)
	return out
}

// TestEventMetadataPayloadMatchesEntity pins each Payload to its entity:
// the same properties, the same required list, and the same Go field name
// per property, so a producer can always send what a reader decodes.
func TestEventMetadataPayloadMatchesEntity(t *testing.T) {
	for _, c := range eventMetadataConstructs {
		t.Run(c.entity, func(t *testing.T) {
			entity := eventMetadataSchema(t, c.dir, c.entity)
			payload := eventMetadataSchema(t, c.dir, c.entity+"Payload")
			entityProps := eventMetadataProperties(t, c.entity, entity)
			payloadProps := eventMetadataProperties(t, c.entity+"Payload", payload)

			if got, want := sortedKeys(payloadProps), sortedKeys(entityProps); !reflect.DeepEqual(got, want) {
				t.Errorf("%sPayload properties = %v, want the entity's %v", c.entity, got, want)
			}
			if got, want := eventMetadataRequired(t, c.entity+"Payload", payload), eventMetadataRequired(t, c.entity, entity); !reflect.DeepEqual(got, want) {
				t.Errorf("%sPayload required = %v, want the entity's %v", c.entity, got, want)
			}
			for name, raw := range entityProps {
				entityProp, _ := raw.(map[string]any)
				payloadProp, _ := payloadProps[name].(map[string]any)
				if entityProp["x-go-name"] != payloadProp["x-go-name"] {
					t.Errorf("%s.%s x-go-name: entity %v, payload %v - the two Go structs would spell the field differently", c.entity, name, entityProp["x-go-name"], payloadProp["x-go-name"])
				}
				// A producer checks a row against the Payload and a reader checks the
				// stored row against the entity, so a bound that one carries and the other
				// lacks lets a row be written that can never be read back (or refuses
				// a row a reader would accept).
				for _, bound := range []string{"type", "nullable", "minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum"} {
					if !reflect.DeepEqual(entityProp[bound], payloadProp[bound]) {
						t.Errorf("%s.%s %s: entity %v, payload %v - a row one accepts the other refuses", c.entity, name, bound, entityProp[bound], payloadProp[bound])
					}
				}
			}
		})
	}
}

func eventMetadataTemplate(t *testing.T, dir string) map[string]any {
	t.Helper()
	raw, err := os.ReadFile(filepath.Join(repoRootDir(t), dir, "templates", path.Base(dir)+"_template.json"))
	if err != nil {
		t.Fatalf("read template: %v", err)
	}
	var tmpl map[string]any
	if err := json.Unmarshal(raw, &tmpl); err != nil {
		t.Fatalf("parse template: %v", err)
	}
	return tmpl
}

// TestEventMetadataNetFiguresAcceptNegatives validates rows against each
// entity and Payload. LinkedIn nets reversals into the organic figures, and so
// into the totals and rates built from them; sponsored and auto-invited
// figures, impressions and clicks are never negative.
func TestEventMetadataNetFiguresAcceptNegatives(t *testing.T) {
	cases := []struct {
		dir, entity      string
		net, nonNegative []string
	}{
		{
			dir:         "schemas/constructs/v1beta3/follower_metrics",
			entity:      "FollowerMetrics",
			net:         []string{"newOrganic", "newTotal"},
			nonNegative: []string{"newSponsored", "newAutoInvited"},
		},
		{
			dir:    "schemas/constructs/v1beta3/content_metrics",
			entity: "ContentMetrics",
			net: []string{
				"reactionsOrganic", "reactions", "commentsOrganic", "comments",
				"repostsOrganic", "reposts", "engagementRateOrganic", "engagementRate",
			},
			nonNegative: []string{
				"impressionsOrganic", "impressionsSponsored", "impressions", "uniqueImpressions",
				"clicksOrganic", "clicksSponsored", "clicks",
				"reactionsSponsored", "commentsSponsored", "repostsSponsored", "engagementRateSponsored",
			},
		},
	}
	for _, c := range cases {
		doc := loadSpec(t, path.Join(c.dir, "api.yml"))
		for _, name := range []string{c.entity, c.entity + "Payload"} {
			t.Run(name, func(t *testing.T) {
				schema := schemaOf(t, doc, name)
				row := eventMetadataTemplate(t, c.dir)
				if err := schema.VisitJSON(row); err != nil {
					t.Fatalf("template row does not validate: %v", err)
				}
				check := func(field string, value float64, wantErr bool) {
					row[field] = value
					if err := schema.VisitJSON(row); (err != nil) != wantErr {
						t.Errorf("%s = %v: error = %v, wantErr %v", field, value, err, wantErr)
					}
					row[field] = nil
				}
				for _, field := range c.net {
					check(field, -1, false)
				}
				for _, field := range c.nonNegative {
					check(field, 1, false)
					check(field, -1, true)
				}
			})
		}
	}
}

// TestEventMetadataTemplateUsesNullForNullable pins each template to its
// entity: exactly the entity's properties, and null for every nullable one,
// because the constructs define a blank source cell as null, never 0 or "".
func TestEventMetadataTemplateUsesNullForNullable(t *testing.T) {
	for _, c := range eventMetadataConstructs {
		t.Run(c.entity, func(t *testing.T) {
			props := eventMetadataProperties(t, c.entity, eventMetadataSchema(t, c.dir, c.entity))
			tmpl := eventMetadataTemplate(t, c.dir)
			if got, want := sortedKeys(tmpl), sortedKeys(props); !reflect.DeepEqual(got, want) {
				t.Errorf("template keys = %v, want the entity's %v", got, want)
			}
			for key, value := range tmpl {
				prop, _ := props[key].(map[string]any)
				if prop["nullable"] == true && value != nil {
					t.Errorf("template %s = %v, want null: the property is nullable and its zero value would read as a measurement", key, value)
				}
			}
		})
	}
}

// TestActivityMetricsFiguresMatchActivityResult pins the per-activity figure
// set: ActivityResult.reception.metrics (activity_result's ActivityMetrics)
// is built from activity_metrics rows, so every figure declared there must be
// a row field, and vice versa.
func TestActivityMetricsFiguresMatchActivityResult(t *testing.T) {
	figures, ok := mustLookup(t, loadYAMLMap(t, "schemas/constructs/v1beta3/activity_result/api.yml"),
		"components", "schemas", "ActivityMetrics", "properties").(map[string]any)
	if !ok {
		t.Fatal("activity_result ActivityMetrics has no properties mapping")
	}
	row := eventMetadataProperties(t, "ActivityMetrics", eventMetadataSchema(t, "schemas/constructs/v1beta3/activity_metrics", "ActivityMetrics"))
	// A row's figures are its numeric fields; contentRow is a reference, not a figure.
	var rowFigures []string
	for name, raw := range row {
		prop, _ := raw.(map[string]any)
		if (prop["type"] == "integer" || prop["type"] == "number") && name != "contentRow" {
			rowFigures = append(rowFigures, name)
		}
	}
	sort.Strings(rowFigures)
	if got, want := rowFigures, sortedKeys(figures); !reflect.DeepEqual(got, want) {
		t.Errorf("activity_metrics figures = %v, want activity_result's ActivityMetrics figures %v", got, want)
	}
}

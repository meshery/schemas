package validation

import (
	"reflect"
	"strings"
	"testing"

	"github.com/getkin/kin-openapi/openapi3"
)

// capabilityLikeBad is the shape of the meshery/schemas#341 bug: an object
// schema whose default is an array of objects.
const capabilityLikeBad = `{type: object, properties: {name: {type: string}}, default: [{name: a}, {name: b}]}`

// loadDefaultsFixture parses an OpenAPI document whose component schemas are
// given as YAML flow mappings, through the same kin-openapi loader the
// validator uses.
func loadDefaultsFixture(t *testing.T, schemas map[string]string) *openapi3.T {
	t.Helper()
	var b strings.Builder
	b.WriteString("openapi: 3.0.0\ninfo: {title: t, version: v}\npaths: {}\ncomponents:\n  schemas:\n")
	for _, name := range sortedSchemaNames(schemas) {
		b.WriteString("    " + name + ": " + schemas[name] + "\n")
	}
	doc, err := openapi3.NewLoader().LoadFromData([]byte(b.String()))
	if err != nil {
		t.Fatalf("load fixture: %v\n%s", err, b.String())
	}
	return doc
}

// Each case puts the #341 mistake in a different subschema slot. If the walk
// ever stops descending into one of them, its case reports nothing and fails.
func TestDefaultTypeViolationsReportsMismatchInEverySubschemaSlot(t *testing.T) {
	const want = ": default is array, schema type is object"
	cases := []struct {
		slot, schema, where string
	}{
		{"top level", capabilityLikeBad, "fx Bad"},
		{"properties", `{type: object, properties: {cap: ` + capabilityLikeBad + `}}`, "fx Bad.properties.cap"},
		{"items", `{type: array, items: ` + capabilityLikeBad + `}`, "fx Bad.items"},
		{"additionalProperties", `{type: object, additionalProperties: ` + capabilityLikeBad + `}`, "fx Bad.additionalProperties"},
		{"not", `{not: ` + capabilityLikeBad + `}`, "fx Bad.not"},
		{"allOf", `{allOf: [{type: object}, ` + capabilityLikeBad + `]}`, "fx Bad.allOf[1]"},
		{"anyOf", `{anyOf: [` + capabilityLikeBad + `]}`, "fx Bad.anyOf[0]"},
		{"oneOf", `{oneOf: [{type: string}, ` + capabilityLikeBad + `]}`, "fx Bad.oneOf[1]"},
		{"through a $ref", `{type: object, properties: {cap: {$ref: '#/components/schemas/Cap'}}}`, "fx Bad.properties.cap"},
	}
	for _, tc := range cases {
		t.Run(tc.slot, func(t *testing.T) {
			schemas := map[string]string{"Bad": tc.schema}
			if strings.Contains(tc.schema, "#/components/schemas/Cap") {
				schemas["Cap"] = capabilityLikeBad
			}
			got := defaultTypeViolations(loadDefaultsFixture(t, schemas), "fx")
			if len(got) == 0 {
				t.Fatalf("mismatched default in %s was not reported", tc.slot)
			}
			if !containsString(got, tc.where+want) {
				t.Errorf("violations = %q, want one at %q", got, tc.where+want)
			}
		})
	}
}

func TestDefaultTypeViolationsAcceptsMatchingDefaults(t *testing.T) {
	doc := loadDefaultsFixture(t, map[string]string{
		"Good": `{type: object, default: {a: 1}, properties: {
			s: {type: string, default: x},
			b: {type: boolean, default: true},
			i: {type: integer, default: 3},
			n: {type: number, default: 3},
			f: {type: number, default: 1.5},
			l: {type: array, default: [1, 2], items: {type: integer}}}}`,
		"Caps": `{type: array, items: {type: object}, default: [{a: 1}]}`,
	})
	if got := defaultTypeViolations(doc, "fx"); len(got) != 0 {
		t.Errorf("matching defaults reported as violations: %q", got)
	}
}

func TestDefaultTypeViolationsRejectsFractionalIntegerDefault(t *testing.T) {
	doc := loadDefaultsFixture(t, map[string]string{"Count": `{type: integer, default: 1.5}`})
	want := []string{"fx Count: default is number, schema type is integer"}
	if got := defaultTypeViolations(doc, "fx"); !reflect.DeepEqual(got, want) {
		t.Errorf("violations = %q, want %q", got, want)
	}
}

// The documented blind spots: an untyped schema has nothing to compare a
// default against, and an explicit null default loads as no default at all.
// Pinned so that changing either is a deliberate decision.
func TestDefaultTypeViolationsDocumentedBlindSpots(t *testing.T) {
	doc := loadDefaultsFixture(t, map[string]string{
		"Untyped":  `{default: [1, 2]}`,
		"NullDflt": `{type: object, default: null}`,
	})
	if got := defaultTypeViolations(doc, "fx"); len(got) != 0 {
		t.Errorf("blind-spot schemas reported: %q", got)
	}
}

func TestDefaultTypeViolationsTerminatesOnRecursiveRef(t *testing.T) {
	doc := loadDefaultsFixture(t, map[string]string{
		"Node": `{type: object, default: [], properties: {child: {$ref: '#/components/schemas/Node'}}}`,
	})
	got := defaultTypeViolations(doc, "fx")
	want := []string{"fx Node: default is array, schema type is object"}
	if !reflect.DeepEqual(got, want) {
		t.Errorf("violations = %q, want %q (each schema reported once)", got, want)
	}
}

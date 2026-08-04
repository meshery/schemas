package validation

import "testing"

// TestDetectPrefixMismatches_MissingAPIPrefix reproduces the v1beta3 event
// defect: the schema declared `POST /events` while meshery-cloud registers the
// handler on the `/api` group, so the generated client posted to a path no
// route answered.
func TestDetectPrefixMismatches_MissingAPIPrefix(t *testing.T) {
	match := &matchResult{
		SchemaOnly: []schemaEndpoint{{
			Method:      "POST",
			Path:        "/events",
			OperationID: "createEvent",
			SourceFile:  "schemas/constructs/v1beta3/event/api.yml",
		}},
		ConsumerOnly: []consumerEndpoint{{
			Repo:       "meshery-cloud",
			Method:     "POST",
			Path:       "/api/events",
			RouterFile: "server/router/router.go",
			RouterLine: 587,
		}},
	}

	got := detectPrefixMismatches(match)
	if len(got) != 1 {
		t.Fatalf("expected 1 prefix mismatch, got %d: %+v", len(got), got)
	}

	m := got[0]
	if m.Method != "POST" {
		t.Errorf("Method = %q, want %q", m.Method, "POST")
	}
	if m.SchemaPath != "/events" {
		t.Errorf("SchemaPath = %q, want %q", m.SchemaPath, "/events")
	}
	if m.ConsumerPath != "/api/events" {
		t.Errorf("ConsumerPath = %q, want %q", m.ConsumerPath, "/api/events")
	}
	if m.OperationID != "createEvent" {
		t.Errorf("OperationID = %q, want %q", m.OperationID, "createEvent")
	}
	if m.Repo != "meshery-cloud" {
		t.Errorf("Repo = %q, want %q", m.Repo, "meshery-cloud")
	}
	if m.RouterLine != 587 {
		t.Errorf("RouterLine = %d, want 587", m.RouterLine)
	}
}

// TestDetectPrefixMismatches_SchemaCarriesPrefixRouterDoesNot covers the
// inverse: the schema declares `/api/...` but the router registers the route on
// the bare echo instance. Same silent-404 class, reported the same way.
func TestDetectPrefixMismatches_SchemaCarriesPrefixRouterDoesNot(t *testing.T) {
	match := &matchResult{
		SchemaOnly: []schemaEndpoint{{
			Method:      "GET",
			Path:        "/api/user/schedules",
			OperationID: "getSchedules",
			SourceFile:  "schemas/constructs/v1beta2/schedule/api.yml",
		}},
		ConsumerOnly: []consumerEndpoint{{
			Repo:   "meshery-cloud",
			Method: "GET",
			Path:   "/user/schedules",
		}},
	}

	got := detectPrefixMismatches(match)
	if len(got) != 1 {
		t.Fatalf("expected 1 prefix mismatch, got %d: %+v", len(got), got)
	}
	if got[0].ConsumerPath != "/user/schedules" {
		t.Errorf("ConsumerPath = %q, want %q", got[0].ConsumerPath, "/user/schedules")
	}
}

// TestDetectPrefixMismatches_ToleratesPathParamNameDrift covers the case that
// exact-key joining misses: the schema says `{eventId}` and the router says
// `{id}`. The prefix is still the defect; the parameter name is not.
func TestDetectPrefixMismatches_ToleratesPathParamNameDrift(t *testing.T) {
	match := &matchResult{
		SchemaOnly: []schemaEndpoint{{
			Method:      "DELETE",
			Path:        "/events/{eventId}",
			OperationID: "deleteEvent",
			SourceFile:  "schemas/constructs/v1beta3/event/api.yml",
		}},
		ConsumerOnly: []consumerEndpoint{{
			Repo:       "meshery-cloud",
			Method:     "DELETE",
			Path:       "/api/events/{id}",
			RouterFile: "server/router/router.go",
			RouterLine: 589,
		}},
	}

	got := detectPrefixMismatches(match)
	if len(got) != 1 {
		t.Fatalf("expected 1 prefix mismatch across param-name drift, got %d: %+v", len(got), got)
	}
	if got[0].SchemaPath != "/events/{eventId}" || got[0].ConsumerPath != "/api/events/{id}" {
		t.Errorf("unexpected pairing: %+v", got[0])
	}
}

// TestDetectPrefixMismatches_UnprefixedPathWithHandlerIsNotFlagged guards the
// real exception this detector must never break: `/user/schedules` is declared
// without `/api` because meshery-cloud genuinely serves it there. A matched
// endpoint never lands in SchemaOnly, so it cannot be reported.
func TestDetectPrefixMismatches_UnprefixedPathWithHandlerIsNotFlagged(t *testing.T) {
	match := &matchResult{
		Matched: []endpointMatch{{
			Schema: schemaEndpoint{Method: "GET", Path: "/user/schedules"},
			Consumers: []consumerEndpoint{{
				Repo: "meshery-cloud", Method: "GET", Path: "/user/schedules",
			}},
		}},
	}

	if got := detectPrefixMismatches(match); len(got) != 0 {
		t.Fatalf("matched endpoint must not be reported, got %+v", got)
	}
}

// TestDetectPrefixMismatches_UnrelatedGapsAreNotCorrelated ensures a genuinely
// unimplemented spec endpoint and an unrelated orphan handler are not paired
// just because both are unmatched.
func TestDetectPrefixMismatches_UnrelatedGapsAreNotCorrelated(t *testing.T) {
	match := &matchResult{
		SchemaOnly: []schemaEndpoint{{
			Method: "POST", Path: "/api/events/delete", OperationID: "bulkDeleteEvents",
		}},
		ConsumerOnly: []consumerEndpoint{
			{Repo: "meshery-cloud", Method: "DELETE", Path: "/api/events"},
			{Repo: "meshery-cloud", Method: "GET", Path: "/api/events/week"},
		},
	}

	if got := detectPrefixMismatches(match); len(got) != 0 {
		t.Fatalf("unrelated gaps must not be correlated, got %+v", got)
	}
}

// TestDetectPrefixMismatches_MethodMustMatch verifies the join is on
// (method, path), not path alone.
func TestDetectPrefixMismatches_MethodMustMatch(t *testing.T) {
	match := &matchResult{
		SchemaOnly: []schemaEndpoint{{
			Method: "POST", Path: "/events", OperationID: "createEvent",
		}},
		ConsumerOnly: []consumerEndpoint{{
			Repo: "meshery-cloud", Method: "DELETE", Path: "/api/events",
		}},
	}

	if got := detectPrefixMismatches(match); len(got) != 0 {
		t.Fatalf("differing methods must not be paired, got %+v", got)
	}
}

func TestHasAPIPrefix(t *testing.T) {
	cases := map[string]bool{
		"/api":            true,
		"/api/events":     true,
		"/api/events/{i}": true,
		"/apiary":         false, // must match a whole segment
		"/user/schedules": false,
		"/events":         false,
		"":                false,
	}
	for path, want := range cases {
		if got := hasAPIPrefix(path); got != want {
			t.Errorf("hasAPIPrefix(%q) = %v, want %v", path, got, want)
		}
	}
}

func TestDetectPrefixMismatches_NilMatchIsSafe(t *testing.T) {
	if got := detectPrefixMismatches(nil); got != nil {
		t.Fatalf("nil match must yield nil, got %+v", got)
	}
}

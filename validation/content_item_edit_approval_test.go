package validation

import (
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

// An update that changes what an item will run or publish re-resolves the
// item's approval in the same transaction, with the rule insert uses. These
// tests pin the rule in the updateContentItem description and check the
// reference resolver against the table of outcomes in
// docs/content-item-contract.md, "Approval on a content edit".

// itemContentFields are the fields an update compares with the stored values to
// decide whether it is a content edit: the fingerprint's canonical values. The
// server-owned Approved? mirror inside data is not content.
var itemContentFields = []string{"profile", "rowNumber", "data", "rulesOfEngagement", "mediaAssetIds"}

// itemBookkeepingFields never trigger a re-resolution. An omitted content field
// keeps its stored value, so it is not a change either.
var itemBookkeepingFields = []string{"approvalPolicy", "expectedFingerprint", "id", "threadId", "replyToId", "threadIndex"}

// itemWithoutMirror returns data without the server-owned Approved? mirror.
func itemWithoutMirror(data any) any {
	m, ok := data.(map[string]any)
	if !ok {
		return data
	}
	out := make(map[string]any, len(m))
	for k, v := range m {
		if k != "Approved?" {
			out[k] = v
		}
	}
	return out
}

// itemContentChanged is the reference for the content-edit test. next holds the
// fields the payload sends; a field it omits keeps its stored value.
func itemContentChanged(stored, next map[string]any) bool {
	for _, field := range itemContentFields {
		value, sent := next[field]
		if !sent {
			continue
		}
		want := stored[field]
		if field == "data" {
			value, want = itemWithoutMirror(value), itemWithoutMirror(want)
		}
		if !reflect.DeepEqual(value, want) {
			return true
		}
	}
	return false
}

// itemEditState is what an update finds stored: the approval fields, the
// stored approvalPolicy (after the write), and whether a pending
// content_item_approval request exists.
type itemEditState struct {
	approved bool
	pending  bool
	policy   string
	required bool
	source   string
}

// itemEditOutcome is what the update leaves stored.
type itemEditOutcome struct {
	approved    bool
	required    bool
	source      string
	openRequest bool
}

// itemEditApproval is the reference for an update. Without a content edit,
// nothing is re-resolved and the stored approval stays. With one, the approval
// is resolved as insert resolves it. Required resets approved to false and opens
// a request unless one is pending. Not required keeps approved and opens none.
// An update never sets approved to true.
func itemEditApproval(s itemEditState, changed bool) itemEditOutcome {
	if !changed {
		return itemEditOutcome{approved: s.approved, required: s.required, source: s.source}
	}
	required, source := itemInterimResolve(s.policy)
	out := itemEditOutcome{approved: s.approved, required: required, source: source}
	if required {
		out.approved = false
		out.openRequest = !s.pending
	}
	return out
}

// itemDescription returns a description string, failing the test when it is not one.
func itemDescription(t *testing.T, node any) string {
	t.Helper()
	s, ok := node.(string)
	if !ok {
		t.Fatalf("description is %T, want string", node)
	}
	return s
}

// itemFlatten collapses the whitespace of a folded YAML description so that a
// phrase can be matched across its line breaks.
func itemFlatten(s string) string {
	return strings.Join(strings.Fields(s), " ")
}

// The rule is pinned in the descriptions a reader and a generated client see:
// the three approval fields say when they are resolved, and the update says
// which fields are content, which are bookkeeping, and what each outcome is.
func TestContentItemUpdateApprovalRule(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/content_item")
	api := loadOpenAPIDocument(t, filepath.Join(dir, "api.yml"))
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "content_item.yaml"))

	const phrase = "resolved at insert and again at each content edit"
	for _, field := range []string{"approved", "approvalRequired", "approvalPolicySource"} {
		desc := itemFlatten(itemDescription(t, mustLookup(t, entity, "properties", field, "description")))
		if !strings.Contains(desc, phrase) {
			t.Errorf("ContentItem.%s description must say %q", field, phrase)
		}
	}

	update := itemFlatten(itemDescription(t, mustLookup(t, api, "paths", "/api/content-items/{contentItemId}", "put", "description")))
	for _, want := range []string{
		"Approval on a content edit.",
		"re-resolves its effective approval in the same transaction",
		"with the same rule as insert",
		"the `approvalPolicy` the update stores",
		"`approved` false and a pending `content_item_approval` request is opened",
		"already has a pending request keeps that request and opens no second one",
		"When approval resolves to not required, `approved` is unchanged and no request opens",
		"no update sets it to true",
		"A failed write keeps neither change",
		"This applies to every writer, a person included.",
		"a write-back that sends them unchanged is not an edit",
	} {
		if !strings.Contains(update, want) {
			t.Errorf("updateContentItem description must pin %q", want)
		}
	}
	for _, field := range itemContentFields {
		if !strings.Contains(update, "`"+field+"`") {
			t.Errorf("updateContentItem description must name content field `%s`", field)
		}
	}
	if !strings.Contains(update, "`data` (without the server-owned `Approved?` mirror)") {
		t.Error("updateContentItem description must exclude the Approved? mirror from content")
	}
	for _, field := range itemBookkeepingFields {
		if !strings.Contains(update, "`"+field+"`") {
			t.Errorf("updateContentItem description must name bookkeeping field `%s`", field)
		}
	}
}

// Each row is one outcome of the reference resolver. Interim: approval is
// required unless the item's own policy is not_required, and inherit or absent
// resolves to required.
func TestContentItemEditApprovalOutcomes(t *testing.T) {
	cases := []struct {
		name    string
		state   itemEditState
		changed bool
		want    itemEditOutcome
	}{
		{
			name:    "approved item, content edit, required: reset to unapproved and a request opens",
			state:   itemEditState{approved: true, policy: "required", required: false, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "item", openRequest: true},
		},
		{
			name:    "approved item, content edit, not_required: stays approved and no request opens",
			state:   itemEditState{approved: true, policy: "not_required", required: true, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: true, required: false, source: "item", openRequest: false},
		},
		{
			name:    "approved item, bookkeeping only: unchanged, the stored policy is not re-resolved",
			state:   itemEditState{approved: true, policy: "required", required: false, source: "item"},
			changed: false,
			want:    itemEditOutcome{approved: true, required: false, source: "item", openRequest: false},
		},
		{
			name:    "unapproved item with a pending request, content edit: still unapproved, no second request",
			state:   itemEditState{approved: false, pending: true, policy: "required", required: true, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "item", openRequest: false},
		},
		{
			name:    "unapproved item with no pending request, content edit, required: a request opens",
			state:   itemEditState{approved: false, pending: false, policy: "required", required: true, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "item", openRequest: true},
		},
		{
			name:    "interim, absent policy, content edit: resolves to required by fallback",
			state:   itemEditState{approved: true, policy: "", required: false, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "fallback", openRequest: true},
		},
		{
			name:    "interim, inherit policy, content edit: resolves to required by fallback",
			state:   itemEditState{approved: true, policy: "inherit", required: false, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "fallback", openRequest: true},
		},
		{
			name:    "unapproved item, content edit, not_required: stays unapproved and opens no request",
			state:   itemEditState{approved: false, pending: false, policy: "not_required", required: false, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: false, source: "item", openRequest: false},
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := itemEditApproval(tc.state, tc.changed); got != tc.want {
				t.Errorf("itemEditApproval(%+v, %v) = %+v, want %+v", tc.state, tc.changed, got, tc.want)
			}
		})
	}
}

// Which writes are content edits. The Approved? mirror, the policy, the
// precondition and the thread fields never are; a write-back of stored content
// is not one either, so an older client that sends the whole item does not
// reset approval.
func TestContentItemEditChangesContent(t *testing.T) {
	stored := map[string]any{
		"profile":           "maintainer",
		"rowNumber":         float64(7),
		"data":              map[string]any{"Approved?": "false", "body": "hello"},
		"rulesOfEngagement": map[string]any{"preset": "cautious"},
		"mediaAssetIds":     []any{"a1"},
		"approvalPolicy":    "inherit",
	}
	cases := []struct {
		name string
		next map[string]any
		want bool
	}{
		{"profile changed", map[string]any{"profile": "other"}, true},
		{"rowNumber changed", map[string]any{"rowNumber": float64(8)}, true},
		{"data changed", map[string]any{"data": map[string]any{"Approved?": "false", "body": "bye"}}, true},
		{"rulesOfEngagement changed", map[string]any{"rulesOfEngagement": map[string]any{"preset": "brisk"}}, true},
		{"rulesOfEngagement cleared with null", map[string]any{"rulesOfEngagement": nil}, true},
		{"mediaAssetIds changed", map[string]any{"mediaAssetIds": []any{"a2"}}, true},
		{"mediaAssetIds cleared with an empty list", map[string]any{"mediaAssetIds": []any{}}, true},
		{"Approved? mirror alone is bookkeeping", map[string]any{"data": map[string]any{"Approved?": "true", "body": "hello"}}, false},
		{"approvalPolicy alone is bookkeeping", map[string]any{"approvalPolicy": "required"}, false},
		{"expectedFingerprint and id are bookkeeping", map[string]any{"expectedFingerprint": "x", "id": "y"}, false},
		{"thread fields are bookkeeping", map[string]any{"threadId": "t", "replyToId": "r", "threadIndex": float64(2)}, false},
		{"a write-back of the stored content is not an edit", map[string]any{
			"profile":           "maintainer",
			"rowNumber":         float64(7),
			"data":              map[string]any{"Approved?": "true", "body": "hello"},
			"rulesOfEngagement": map[string]any{"preset": "cautious"},
			"mediaAssetIds":     []any{"a1"},
		}, false},
		{"an omitted payload is not an edit", map[string]any{}, false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := itemContentChanged(stored, tc.next); got != tc.want {
				t.Errorf("itemContentChanged(stored, %v) = %v, want %v", tc.next, got, tc.want)
			}
		})
	}
}

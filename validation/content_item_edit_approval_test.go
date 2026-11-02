package validation

import (
	"os"
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

// itemEditOutcome is what the write leaves stored. supersede is set when the
// write closes the item's open request as superseded. openRequest is set when the
// write opens a fresh pending request.
type itemEditOutcome struct {
	approved    bool
	required    bool
	source      string
	openRequest bool
	supersede   bool
}

// itemEditApproval is the reference for an update. Without a content change, nothing
// is re-resolved, nothing is superseded and no request opens or closes, so a denied
// item stays denied. With one, the approval is resolved as insert resolves it, and
// the open request, if any, is superseded in the same transaction. Required resets
// approved to false. Whatever the result, an item the edit leaves unapproved gets a
// fresh request, by the open-request invariant. An update never sets approved to true.
func itemEditApproval(s itemEditState, changed bool) itemEditOutcome {
	out := itemEditOutcome{approved: s.approved, required: s.required, source: s.source}
	if !changed {
		return out
	}
	out.required, out.source = itemInterimResolve(s.policy)
	out.supersede = s.pending
	if out.required {
		out.approved = false
	}
	return itemEnsureRequest(out, s.pending && !out.supersede)
}

// itemPolicyApproval is the reference for a write that changes the stored
// approvalPolicy and no content. The approval is re-resolved, but only a result of
// required changes approved: an approved item resets. A result of not required, and
// any change on an unapproved item, leaves approved and the open request as they are.
// Nothing is superseded, since the content did not change. An unapproved item
// with no open request gets one under either result.
func itemPolicyApproval(s itemEditState) itemEditOutcome {
	out := itemEditOutcome{approved: s.approved}
	out.required, out.source = itemInterimResolve(s.policy)
	if out.required && s.approved {
		out.approved = false
	}
	return itemEnsureRequest(out, s.pending)
}

// itemEnsureRequest is the open-request invariant: an unapproved live item always
// has an open pending request. A soft-delete is outside it and is not modelled
// here. pendingKept is whether the write leaves the item's
// existing request open. A fresh one opens when the item is unapproved and none
// is kept.
func itemEnsureRequest(out itemEditOutcome, pendingKept bool) itemEditOutcome {
	out.openRequest = !out.approved && !pendingKept
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

	const phrase = "resolved at insert, again at each content edit, and again when `approvalPolicy` changes"
	for _, field := range []string{"approved", "approvalRequired", "approvalPolicySource"} {
		desc := itemFlatten(itemDescription(t, mustLookup(t, entity, "properties", field, "description")))
		if !strings.Contains(desc, phrase) {
			t.Errorf("ContentItem.%s description must say %q", field, phrase)
		}
	}
	if desc := itemFlatten(itemDescription(t, mustLookup(t, entity, "properties", "approved", "description"))); !strings.Contains(desc, "supersedes an open request") {
		t.Error("ContentItem.approved description must say a content edit supersedes an open request")
	}

	update := itemFlatten(itemDescription(t, mustLookup(t, api, "paths", "/api/content-items/{contentItemId}", "put", "description")))
	for _, want := range []string{
		"Approval on a content edit.",
		"re-resolves its effective approval in the same transaction",
		"with the same rule as insert",
		"the `approvalPolicy` the update stores",
		"`approved` false",
		"The item's open `content_item_approval` request, if it has one, is superseded",
		"Whatever the resolved approval, an item the edit leaves unapproved gets a fresh pending request for the content as it now is",
		"so after the edit an unapproved item has an open request (the open-request invariant in docs/content-item-contract.md)",
		"A write that changes nothing (a whole-item write-back of the stored content and policy) opens no request and closes none, so a denied item stays denied until a content edit or an `approvalPolicy` change.",
		"An omitted `approvalPolicy` keeps the stored value and is not a change, so it is never refused.",
		"(absent, null and `inherit` count as one value, since the server stores `inherit` as null)",
		"When approval resolves to not required, `approved` is unchanged: an approved item stays approved and opens no request",
		"An update never approves: the item stays unapproved until a decider approves that request",
		"no update sets it to true",
		"A failed write keeps none of these changes",
		"Approval on an `approvalPolicy` change.",
		"Any other result changes no `approved` and closes no request",
		"An unapproved item with no open request, after a denial for example, gets a fresh pending request in the same write, whatever the result",
		"The stored `approvalRequired` and `approvalPolicySource` are rewritten to the new result",
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
			name:    "approved item, content edit, required: reset to unapproved and a fresh request opens",
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
			name:    "approved item, content edit, inherit resolves to required: reset to unapproved and a fresh request opens",
			state:   itemEditState{approved: true, policy: "inherit", required: false, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "fallback", openRequest: true},
		},
		{
			name:    "approved item, bookkeeping only: unchanged, the stored policy is not re-resolved",
			state:   itemEditState{approved: true, policy: "required", required: false, source: "item"},
			changed: false,
			want:    itemEditOutcome{approved: true, required: false, source: "item", openRequest: false},
		},
		{
			name:    "unapproved item with a pending request, content edit, required: old request superseded, new one opened",
			state:   itemEditState{approved: false, pending: true, policy: "required", required: true, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: true, source: "item", openRequest: true, supersede: true},
		},
		{
			name:    "unapproved item with a pending request, content edit, not_required: old request superseded, a fresh one opens",
			state:   itemEditState{approved: false, pending: true, policy: "not_required", required: true, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: false, source: "item", openRequest: true, supersede: true},
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
			name:    "unapproved item with no pending request, content edit, not_required: stays unapproved and a fresh request opens",
			state:   itemEditState{approved: false, pending: false, policy: "not_required", required: false, source: "item"},
			changed: true,
			want:    itemEditOutcome{approved: false, required: false, source: "item", openRequest: true},
		},
		{
			name:    "denied item (unapproved, no pending request), bookkeeping only: no request opens, the stored policy is not re-resolved",
			state:   itemEditState{approved: false, pending: false, policy: "not_required", required: true, source: "item"},
			changed: false,
			want:    itemEditOutcome{approved: false, required: true, source: "item", openRequest: false},
		},
		{
			name:    "unapproved item with a pending request, bookkeeping only: request kept, none opened",
			state:   itemEditState{approved: false, pending: true, policy: "required", required: true, source: "item"},
			changed: false,
			want:    itemEditOutcome{approved: false, required: true, source: "item", openRequest: false},
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

// Each row is one outcome of a write that changes approvalPolicy and no content.
// Only a result of required resets an approved item; a result of not required
// never changes approved and never supersedes a request.
func TestContentItemPolicyChangeOutcomes(t *testing.T) {
	cases := []struct {
		name  string
		state itemEditState
		want  itemEditOutcome
	}{
		{
			name:  "approved item, not_required to required: reset and a request opens",
			state: itemEditState{approved: true, policy: "required", required: false, source: "item"},
			want:  itemEditOutcome{approved: false, required: true, source: "item", openRequest: true},
		},
		{
			name:  "approved item, not_required to inherit: interim fallback resolves to required, reset and a request opens",
			state: itemEditState{approved: true, policy: "inherit", required: false, source: "fallback"},
			want:  itemEditOutcome{approved: false, required: true, source: "fallback", openRequest: true},
		},
		{
			name:  "approved item, not_required to absent: interim fallback resolves to required, reset and a request opens",
			state: itemEditState{approved: true, policy: "", required: false, source: "fallback"},
			want:  itemEditOutcome{approved: false, required: true, source: "fallback", openRequest: true},
		},
		{
			name:  "approved item, required to not_required: stays approved and no request opens",
			state: itemEditState{approved: true, policy: "not_required", required: true, source: "item"},
			want:  itemEditOutcome{approved: true, required: false, source: "item", openRequest: false},
		},
		{
			name:  "unapproved item with a pending request, required to not_required: stays unapproved, request kept pending",
			state: itemEditState{approved: false, pending: true, policy: "not_required", required: true, source: "item"},
			want:  itemEditOutcome{approved: false, required: false, source: "item", openRequest: false},
		},
		{
			name:  "unapproved item with a pending request, not_required to required: request kept as is, no second one",
			state: itemEditState{approved: false, pending: true, policy: "required", required: false, source: "item"},
			want:  itemEditOutcome{approved: false, required: true, source: "item", openRequest: false},
		},
		{
			name:  "unapproved item with no pending request, required to not_required: stays unapproved, a fresh request opens",
			state: itemEditState{approved: false, pending: false, policy: "not_required", required: true, source: "item"},
			want:  itemEditOutcome{approved: false, required: false, source: "item", openRequest: true},
		},
		{
			name:  "unapproved item with no pending request, not_required to required: a request opens",
			state: itemEditState{approved: false, pending: false, policy: "required", required: false, source: "item"},
			want:  itemEditOutcome{approved: false, required: true, source: "item", openRequest: true},
		},
		{
			name:  "unapproved item with no pending request, not_required to inherit: interim fallback resolves to required, a request opens",
			state: itemEditState{approved: false, pending: false, policy: "inherit", required: false, source: "fallback"},
			want:  itemEditOutcome{approved: false, required: true, source: "fallback", openRequest: true},
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := itemPolicyApproval(tc.state); got != tc.want {
				t.Errorf("itemPolicyApproval(%+v) = %+v, want %+v", tc.state, got, tc.want)
			}
		})
	}
}

// The open-request invariant, checked over every stored state and every write that
// can open a request: a content edit or an approvalPolicy change. After such a
// write, an item that is not approved has an open pending request, and no write
// sets approved to true. A write that changes nothing opens and closes no request,
// so it is checked for that instead: a denied item stays denied.
func TestContentItemUnapprovedAlwaysHasOpenRequest(t *testing.T) {
	check := func(t *testing.T, s itemEditState, got itemEditOutcome) {
		t.Helper()
		if got.approved && !s.approved {
			t.Errorf("state %+v: a write set approved to true", s)
		}
		pendingAfter := (s.pending && !got.supersede) || got.openRequest
		if !got.approved && !pendingAfter {
			t.Errorf("state %+v: write left an unapproved item with no open request: %+v", s, got)
		}
	}
	for _, approved := range []bool{false, true} {
		for _, pending := range []bool{false, true} {
			if approved && pending {
				continue // an approved item has no open request
			}
			for _, policy := range []string{"required", "not_required", "inherit", ""} {
				s := itemEditState{approved: approved, pending: pending, policy: policy}
				t.Run("no-change", func(t *testing.T) {
					got := itemEditApproval(s, false)
					if got.openRequest || got.supersede || got.approved != s.approved {
						t.Errorf("state %+v: a no-change write moved approval or a request: %+v", s, got)
					}
				})
				t.Run("content", func(t *testing.T) {
					check(t, s, itemEditApproval(s, true))
				})
				t.Run("policy", func(t *testing.T) {
					check(t, s, itemPolicyApproval(s))
				})
			}
		}
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
		{"approvalPolicy alone is not a content edit", map[string]any{"approvalPolicy": "required"}, false},
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

// The reset rule is stated by its result, not by a direction of change: a
// result of required resets an approved item, and inherit or absent is required
// in the interim, so moving to it resets too.
func TestApprovalPolicyResetWording(t *testing.T) {
	root := repoRootDir(t)
	dir := filepath.Join(root, "schemas/constructs/v1beta3/content_item")
	entity := loadOpenAPIDocument(t, filepath.Join(dir, "content_item.yaml"))
	policy := itemFlatten(itemDescription(t, mustLookup(t, entity, "properties", "approvalPolicy", "description")))
	if want := "A change whose result is required"; !strings.Contains(policy, want) {
		t.Errorf("ContentItem.approvalPolicy description must say %q", want)
	}

	doc, err := os.ReadFile(filepath.Join(root, "docs/content-item-contract.md"))
	if err != nil {
		t.Fatal(err)
	}
	flat := strings.Join(strings.Fields(string(doc)), " ")
	if want := "A change whose result is required resets an approved item, because its approval must now be given again."; !strings.Contains(flat, want) {
		t.Errorf("docs/content-item-contract.md must say %q", want)
	}
}

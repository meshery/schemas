package validation

import (
	"encoding/json"
	"testing"

	"github.com/oapi-codegen/nullable"
)

// agentsActWithoutApprovalPayload mirrors the Go field the spec generates for
// PreferencePayload.agentsActWithoutApproval: x-go-type nullable.Nullable[bool]
// with the json tag agentsActWithoutApproval,omitempty. The spec pin is in
// TestAgentsActWithoutApprovalPreference; this pins the three wire states.
type agentsActWithoutApprovalPayload struct {
	AgentsActWithoutApproval nullable.Nullable[bool] `json:"agentsActWithoutApproval,omitempty"`
}

func TestAgentsActWithoutApprovalGoClearsWithNull(t *testing.T) {
	cases := []struct {
		name string
		in   agentsActWithoutApprovalPayload
		want string
	}{
		{"omitted keeps the stored value", agentsActWithoutApprovalPayload{}, `{}`},
		{"true stores true", agentsActWithoutApprovalPayload{AgentsActWithoutApproval: nullable.NewNullableWithValue(true)}, `{"agentsActWithoutApproval":true}`},
		{"false stores false", agentsActWithoutApprovalPayload{AgentsActWithoutApproval: nullable.NewNullableWithValue(false)}, `{"agentsActWithoutApproval":false}`},
		{"null clears to absent", agentsActWithoutApprovalPayload{AgentsActWithoutApproval: nullable.NewNullNullable[bool]()}, `{"agentsActWithoutApproval":null}`},
	}
	for _, tc := range cases {
		t.Run("marshal "+tc.name, func(t *testing.T) {
			got, err := json.Marshal(tc.in)
			if err != nil {
				t.Fatal(err)
			}
			if string(got) != tc.want {
				t.Errorf("json.Marshal = %s, want %s", got, tc.want)
			}
		})
	}

	for _, tc := range cases {
		t.Run("unmarshal "+tc.name, func(t *testing.T) {
			var back agentsActWithoutApprovalPayload
			if err := json.Unmarshal([]byte(tc.want), &back); err != nil {
				t.Fatal(err)
			}
			if back.AgentsActWithoutApproval.IsSpecified() != (tc.want != `{}`) {
				t.Errorf("IsSpecified = %v for %s", back.AgentsActWithoutApproval.IsSpecified(), tc.want)
			}
			if back.AgentsActWithoutApproval.IsNull() != (tc.want == `{"agentsActWithoutApproval":null}`) {
				t.Errorf("IsNull = %v for %s", back.AgentsActWithoutApproval.IsNull(), tc.want)
			}
			if tc.in.AgentsActWithoutApproval.IsSpecified() && !tc.in.AgentsActWithoutApproval.IsNull() {
				wantVal := tc.in.AgentsActWithoutApproval.MustGet()
				if got := back.AgentsActWithoutApproval.MustGet(); got != wantVal {
					t.Errorf("value = %v, want %v", got, wantVal)
				}
			}
		})
	}
}

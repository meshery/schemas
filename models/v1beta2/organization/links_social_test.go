package organization

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
)

// Links.Social is deliberately a sibling of Links.Support rather than an entry
// in it: Support renders as support contacts on the auth and error pages, so a
// brand profile placed there would surface as a way to contact support. This
// test pins that separation behaviourally, and the JSONB shape the field is
// stored under.

func TestSocialAndSupportStaySeparateOnTheWire(t *testing.T) {
	assert := assert.New(t)

	linkedIn := "https://www.linkedin.com/company/layer5"
	x := "https://x.com/layer5"

	// Links lives inside organization.metadata, which is already JSONB - the
	// field needs no DDL migration, only this shape. Both social and support
	// are populated so the separation is actually exercised rather than
	// passing because support was never set.
	metadata := OrgMetadata{
		Preferences: Preferences{
			Links: &Links{
				Social:  &Social{LinkedIn: &linkedIn, X: &x},
				Support: &map[string]string{"slack": "https://slack.meshery.io"},
			},
		},
	}

	encoded, err := json.Marshal(metadata)
	assert.NoError(err)

	// Assert the wire shape by parsing it, so the lowercase platform keys are
	// proven rather than assumed - a symmetric struct round-trip would pass
	// under any tag names.
	var wire struct {
		Preferences struct {
			Links struct {
				Social  map[string]string `json:"social"`
				Support map[string]string `json:"support"`
			} `json:"links"`
		} `json:"preferences"`
	}
	assert.NoError(json.Unmarshal(encoded, &wire))

	assert.Equal(linkedIn, wire.Preferences.Links.Social["linkedin"])
	assert.Equal(x, wire.Preferences.Links.Social["x"])

	// The brand profiles must not leak into the support contact list, which
	// renders as ways to contact support.
	assert.Equal(map[string]string{"slack": "https://slack.meshery.io"}, wire.Preferences.Links.Support)
	assert.NotContains(wire.Preferences.Links.Support, "linkedin")
	assert.NotContains(wire.Preferences.Links.Support, "x")

	var decoded OrgMetadata
	assert.NoError(json.Unmarshal(encoded, &decoded))
	assert.Equal(linkedIn, *decoded.Preferences.Links.Social.LinkedIn)
	assert.Equal(x, *decoded.Preferences.Links.Social.X)
}

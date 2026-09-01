package credential

import (
	"encoding/json"
	"reflect"
	"testing"

	"github.com/gofrs/uuid"
	"github.com/stretchr/testify/assert"
)

// orgOwner designates the organization a credential belongs to, for brand
// profiles that are not owned by a person. It is independent of userId, which
// keeps its existing required shape and its existing meaning: credentials.owner
// is NOT NULL with a foreign key to users(id), so every credential still
// records the user who created it.

func TestUserIdRemainsRequiredAndNonNullable(t *testing.T) {
	assert := assert.New(t)

	field, ok := reflect.TypeOf(Credential{}).FieldByName("UserId")
	assert.True(ok, "Credential.UserId must exist")
	assert.NotEqual(reflect.Ptr, field.Type.Kind(),
		"Credential.UserId must stay a value type: credentials.owner is NOT NULL with a FK to users(id)")
	assert.Equal("owner", field.Tag.Get("db"))
	assert.Equal("userId", field.Tag.Get("json"),
		"userId stays mandatory on the wire, so it must not gain omitempty")
}

func TestOrgOwnerIsOptionalAndMapsToItsOwnColumn(t *testing.T) {
	assert := assert.New(t)

	field, ok := reflect.TypeOf(Credential{}).FieldByName("OrgOwner")
	assert.True(ok, "Credential.OrgOwner must exist")
	assert.Equal(reflect.Ptr, field.Type.Kind(),
		"OrgOwner must be nullable so a personally-owned credential carries no organization")
	assert.Equal("org_owner", field.Tag.Get("db"))
}

func TestOrgOwnerIsOmittedUnlessSet(t *testing.T) {
	user := uuid.Must(uuid.NewV4())
	org := uuid.Must(uuid.NewV4())

	tests := []struct {
		name    string
		cred    Credential
		wantOrg any
	}{
		{
			name:    "personally owned credential carries no organization",
			cred:    Credential{Name: "aws", Type: "token", UserId: user},
			wantOrg: nil,
		},
		{
			name:    "brand credential names its organization and still records the creating user",
			cred:    Credential{Name: "aws", Type: "token", UserId: user, OrgOwner: &org},
			wantOrg: org.String(),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert := assert.New(t)

			encoded, err := json.Marshal(tt.cred)
			assert.NoError(err)

			var wire map[string]any
			assert.NoError(json.Unmarshal(encoded, &wire))

			// userId is always present: it is the creating user, not an
			// alternative to orgOwner.
			assert.Equal(user.String(), wire["userId"])

			if tt.wantOrg == nil {
				assert.NotContains(wire, "orgOwner",
					"an unset organization must be omitted rather than serialized as the nil UUID")
			} else {
				assert.Equal(tt.wantOrg, wire["orgOwner"])
			}
		})
	}
}

func TestCredentialPayloadAcceptsOrgOwner(t *testing.T) {
	assert := assert.New(t)

	field, ok := reflect.TypeOf(CredentialPayload{}).FieldByName("OrgOwner")
	assert.True(ok, "CredentialPayload.OrgOwner must exist so a caller can name the organization")
	assert.Equal(reflect.Ptr, field.Type.Kind(), "CredentialPayload.OrgOwner must be optional")

	// The payload is a wire-only type and must not carry DB column tags.
	assert.Empty(field.Tag.Get("db"))

	org := uuid.Must(uuid.NewV4())
	encoded, err := json.Marshal(CredentialPayload{Name: "aws", Type: "token", OrgOwner: &org})
	assert.NoError(err)

	var wire map[string]any
	assert.NoError(json.Unmarshal(encoded, &wire))
	assert.Equal(org.String(), wire["orgOwner"])
}

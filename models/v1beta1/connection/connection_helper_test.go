package connection

import (
	"testing"

	"github.com/gofrs/uuid"
	"github.com/meshery/schemas/models/core"
	"github.com/stretchr/testify/assert"
)

// baseConnection returns a minimal, deterministic registrant-style Connection
// used as the fixed baseline for identity tests.
func baseConnection() *Connection {
	return &Connection{
		Name:    "artifacthub",
		Type:    "registry",
		SubType: "",
		Kind:    "artifacthub",
		Status:  ConnectionStatusRegistered,
	}
}

func uuidPtr(u core.Uuid) *core.Uuid {
	return &u
}

// TestGenerateID_EmptyCredentialAndUserAreIdentityNeutral asserts the core fix
// for meshery/meshery#20950: an absent (nil) identity field and a
// present-but-zero UUID must produce the same content-addressed id, because
// both are semantically empty.
func TestGenerateID_EmptyCredentialAndUserAreIdentityNeutral(t *testing.T) {
	zero := core.Uuid(uuid.Nil)

	cases := []struct {
		name         string
		credentialID *core.Uuid
		userID       *core.Uuid
	}{
		{"nil credential, nil user", nil, nil},
		{"zero credential, nil user", uuidPtr(zero), nil},
		{"nil credential, zero user", nil, uuidPtr(zero)},
		{"zero credential, zero user", uuidPtr(zero), uuidPtr(zero)},
	}

	// The nil/nil variant is the canonical baseline every other empty
	// variant must collapse onto.
	baseline := baseConnection()
	baselineID, err := baseline.GenerateID()
	assert.NoError(t, err)

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			conn := baseConnection()
			conn.CredentialID = tc.credentialID
			conn.UserID = tc.userID

			got, err := conn.GenerateID()
			assert.NoError(t, err)
			assert.Equal(t, baselineID, got,
				"semantically-empty credential/user must not change identity")
		})
	}
}

// TestGenerateID_DoesNotMutateCaller asserts normalization operates on a copy;
// the caller's zero-UUID pointers must survive the call untouched.
func TestGenerateID_DoesNotMutateCaller(t *testing.T) {
	zero := core.Uuid(uuid.Nil)
	conn := baseConnection()
	conn.CredentialID = uuidPtr(zero)
	conn.UserID = uuidPtr(zero)

	_, err := conn.GenerateID()
	assert.NoError(t, err)

	assert.NotNil(t, conn.CredentialID, "caller's CredentialID must not be nilled")
	assert.NotNil(t, conn.UserID, "caller's UserID must not be nilled")
	assert.Equal(t, zero, *conn.CredentialID)
	assert.Equal(t, zero, *conn.UserID)
}

// TestGenerateID_NonZeroCredentialParticipatesInIdentity asserts that a real,
// non-zero credential/user still contributes to identity - only the empty case
// is collapsed.
func TestGenerateID_NonZeroCredentialParticipatesInIdentity(t *testing.T) {
	nonZeroCred := core.Uuid(uuid.Must(uuid.NewV4()))
	nonZeroUser := core.Uuid(uuid.Must(uuid.NewV4()))

	emptyID, err := baseConnection().GenerateID()
	assert.NoError(t, err)

	withCred := baseConnection()
	withCred.CredentialID = uuidPtr(nonZeroCred)
	withCredID, err := withCred.GenerateID()
	assert.NoError(t, err)
	assert.NotEqual(t, emptyID, withCredID,
		"a non-zero credential must produce a distinct identity")

	withUser := baseConnection()
	withUser.UserID = uuidPtr(nonZeroUser)
	withUserID, err := withUser.GenerateID()
	assert.NoError(t, err)
	assert.NotEqual(t, emptyID, withUserID,
		"a non-zero user must produce a distinct identity")

	// Two distinct non-zero credentials must not collide.
	assert.NotEqual(t, withCredID, withUserID)
}

// TestGenerateID_IdenticalConnectionsHashEqual is the no-regression baseline:
// two fully-identical Connections must still hash equal.
func TestGenerateID_IdenticalConnectionsHashEqual(t *testing.T) {
	cred := core.Uuid(uuid.Must(uuid.NewV4()))

	a := baseConnection()
	a.CredentialID = uuidPtr(cred)
	b := baseConnection()
	b.CredentialID = uuidPtr(cred)

	aID, err := a.GenerateID()
	assert.NoError(t, err)
	bID, err := b.GenerateID()
	assert.NoError(t, err)

	assert.Equal(t, aID, bID)
}

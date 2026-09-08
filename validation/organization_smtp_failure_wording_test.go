package validation

import (
	"fmt"
	"path/filepath"
	"strings"
	"testing"
)

const organizationSMTPEntitySpec = "schemas/constructs/v1beta1/organization_smtp/organization_smtp.yaml"

// A schema description is a contract statement, and these two used to describe
// a failure circuit that no server implements. `disconnected` read "consecutive
// failures opened the circuit, so the server is no longer dialled", and
// `consecutiveFailures` read "Drives the circuit that stops dialling a
// persistently unreachable server". Neither is what happens: the recorded
// verdict writes `disconnected` on a SINGLE failed attempt with no threshold,
// nothing reads the count, and no code path takes a relay out of rotation. The
// stop-dialling circuit is deliberately unbuilt and tracked in
// layer5io/meshery-cloud#6057.
//
// That overstatement is load-bearing rather than cosmetic, which is why it is
// pinned by a test rather than left to review. A consumer that believes the
// circuit exists does not build one, and the harm lands where it is least
// visible: with `fallbackToProvider` off, a relay nothing has taken out of
// rotation keeps being handed account-verification and password-recovery mail.
//
// The enum VALUES are correct and are not what these tests guard. What they
// guard is that the prose does not re-acquire the claim - by an edit that
// restores the old wording, or by a new sentence asserting the same mechanism
// in different words - and that the pointer to the issue where the circuit is
// actually tracked survives, because a reader who is told the protection is
// absent needs somewhere to go next.

// TestOrganizationSmtpStatusDescriptionDoesNotClaimACircuit pins the
// `disconnected` half.
func TestOrganizationSmtpStatusDescriptionDoesNotClaimACircuit(t *testing.T) {
	description := organizationSMTPPropertyDescription(t, "status")

	assertNoCircuitClaim(t, "status", description)

	// The correction is only useful if it says what DOES happen. A description
	// that merely deleted the circuit sentence would leave a reader unable to
	// tell whether one failure or fifty produce this status.
	// "being dialled for the next message" is the one that carries the
	// operational consequence, and it is the one a forbidden-phrase check
	// cannot protect: deleting the sentence removes no banned wording, so
	// without this the description could quietly lose the only statement that
	// tells an operator a failing relay is still in rotation.
	for _, want := range []string{"single failure", "no failure threshold", "being dialled for the next message"} {
		if !strings.Contains(strings.ToLower(description), want) {
			t.Errorf("the status description is missing the required phrase %q. Deleting the "+
				"false circuit claim is not enough - a reader still needs to know the status "+
				"is a verdict on the last attempt alone and that the relay stays in rotation.", want)
		}
	}

	assertTracksTheUnbuiltCircuit(t, "status", description)
}

// TestOrganizationSmtpConsecutiveFailuresDescriptionDoesNotClaimACircuit pins
// the counter half. This is the one that carried the word "Drives".
func TestOrganizationSmtpConsecutiveFailuresDescriptionDoesNotClaimACircuit(t *testing.T) {
	description := organizationSMTPPropertyDescription(t, "consecutiveFailures")

	assertNoCircuitClaim(t, "consecutiveFailures", description)

	// The count is real and worth reading; what it must not be read as is
	// protection. Saying so explicitly is the whole point of the property's
	// description, so its absence is a failure and not a style note.
	if !strings.Contains(strings.ToLower(description), "not treat a non-zero count as protection") {
		t.Errorf("the consecutiveFailures description must tell a consumer not to read the "+
			"count as protection already in place; got:\n%s", description)
	}

	assertTracksTheUnbuiltCircuit(t, "consecutiveFailures", description)
}

// assertNoCircuitClaim rejects the phrasings that assert the mechanism. Each is
// checked on its own so a failure names the sentence to fix rather than the
// whole description.
//
// "circuit" alone is deliberately NOT forbidden: both descriptions legitimately
// name the circuit in order to say it does not exist yet. What is forbidden is
// the assertion - a circuit that opens, drives, or stops dialling.
func assertNoCircuitClaim(t *testing.T, property, description string) {
	t.Helper()

	lowered := strings.ToLower(description)
	forbidden := []struct {
		phrase string
		why    string
	}{
		{"opened the circuit", "no threshold opens anything; a single failed attempt records `disconnected`"},
		{"drives the circuit", "nothing reads consecutiveFailures"},
		{"no longer dialled", "a relay in this state is not taken out of rotation"},
		{"stops dialling", "no code path stops a relay being dialled"},
		{"the delivery circuit writes", "a delivery outcome writes the status; there is no circuit to write it"},
	}

	for _, f := range forbidden {
		if strings.Contains(lowered, f.phrase) {
			t.Errorf("the %s description asserts a failure circuit this platform does not implement: "+
				"it contains %q, but %s. The circuit is tracked in layer5io/meshery-cloud#6057; "+
				"describe what the server does today and point at the issue for what it does not.",
				property, f.phrase, f.why)
		}
	}
}

// assertTracksTheUnbuiltCircuit keeps the forward pointer attached. Telling a
// reader a protection is missing without saying where it is tracked invites the
// next author to assume it is simply an oversight and re-add the claim.
func assertTracksTheUnbuiltCircuit(t *testing.T, property, description string) {
	t.Helper()

	if !strings.Contains(description, "meshery-cloud#6057") {
		t.Errorf("the %s description must cite layer5io/meshery-cloud#6057, where the unbuilt "+
			"circuit is tracked; got:\n%s", property, description)
	}
}

func organizationSMTPPropertyDescription(t *testing.T, property string) string {
	t.Helper()

	doc := loadOpenAPIDocument(t, filepath.Join(repoRootDir(t), organizationSMTPEntitySpec))

	value, err := lookupPath(doc, "properties", property, "description")
	if err != nil {
		t.Fatalf("locating the %s description: %v", property, err)
	}

	description, ok := value.(string)
	if !ok {
		t.Fatalf("the %s description is %T, want a string: %v", property, value, fmt.Sprint(value))
	}

	return description
}

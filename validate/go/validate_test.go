package validate

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestValidate(t *testing.T) {
	t.Run("invalid model general test", func(t *testing.T) {
		validationMessages, err := ValidateFromFilePath(
			"./testdata/model.invalid.00.json",
			"constructs/v1beta1/model/model.json",
		)
		assert.NoError(t, err, "must not return error")
		t.Log(validationMessages)
		assert.True(t, len(validationMessages) > 0, "must return validation messages")
	})

	t.Run("valid model aws-ec2-controller v1.4.1", func(t *testing.T) {
		validationMessages, err := ValidateFromFilePath(
			"./testdata/model.aws-ec2-controller.v1.4.1.json",
			"constructs/v1beta1/model/model.json",
		)
		assert.NoError(t, err, "must not return error")
		t.Log(validationMessages)
		assert.Empty(t, validationMessages, "must return no validation messages")
	})
}

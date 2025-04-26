package validate

import (
	"errors"

	meshkitErrors "github.com/layer5io/meshkit/errors"
)

const (
	ErrValidateCode = "meshery.schemas-1"
)

func ErrValidate(errs ...error) error {
	return meshkitErrors.New(
		ErrValidateCode,
		meshkitErrors.Fatal,
		[]string{"Error validating document"},
		[]string{errors.Join(errs...).Error()},
		[]string{"TODO"},
		[]string{"TODO"},
	)
}

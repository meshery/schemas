package validate

import (
	"embed"
	"errors"
	"io"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/meshery/schemas"
	"github.com/santhosh-tekuri/jsonschema"
)

const mesheryFolder string = ".meshery"
const tmpFolderPrefix string = "tmp-schemas-*"

// constructPath relative to schemas folder in this repo
// f.e. "constructs/v1beta1/model/model.json"
func ValidateFromFilePath(documentPath string, constructPath string) ([]string, error) {
	f, err := os.Open(documentPath)
	if err != nil {
		return nil, ErrValidate(err)
	}
	defer f.Close()
	return Validate(f, constructPath)
}

// constructPath relative to schemas folder in this repo
// f.e. "constructs/v1beta1/model/model.json"
func Validate(document io.Reader, constructPath string) ([]string, error) {
	if err := initLoggerOnce(); err != nil {
		return nil, ErrValidate(
			errors.New("error init loggger"),
			err,
		)
	}

	log.Infof("Validating document over construct %s", constructPath)

	log.Debug("Creating temp folder")
	tempFolder, err := createTempFolder()
	if err != nil {
		return nil, ErrValidate(
			errors.New("failed to create temp folder"),
			err,
		)
	}
	defer func() {
		log.Debug("Removing temp folder")
		if err := os.RemoveAll(tempFolder); err != nil {
			log.Warnf("failed to remove temp folder %s", tempFolder)
		} else {
			log.Debugf("Removed temp folder %s", tempFolder)
		}
	}()
	log.Debugf("Created temp folder %s", tempFolder)
	setUpBaseFolder(filepath.Join(tempFolder, "constructs"))

	if err := copyEmbeddedDirToLocalFolder("schemas", schemas.Schemas, tempFolder); err != nil {
		return nil, ErrValidate(
			errors.New("error copying files from embedded schemas to temp folder"),
			err,
		)
	}

	schemaPath := filepath.Join(tempFolder, constructPath)

	{
		compiler := jsonschema.NewCompiler()
		sch, err := compiler.Compile(schemaPath)
		if err != nil {
			return nil, ErrValidate(
				errors.New("err compile schema"),
				err,
			)
		}

		if err := sch.Validate(document); err != nil {
			return []string{err.Error()}, nil
		}
	}

	return nil, nil
}

// returns temp dir path
func createTempFolder() (string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", err
	}

	// Define the base directory
	baseDir := filepath.Join(homeDir, mesheryFolder)

	// Create the base directory if it doesn't exist
	if err := os.MkdirAll(baseDir, 0755); err != nil {
		return "", err
	}

	// Create a temp directory inside .meshery
	tmpDir, err := os.MkdirTemp(baseDir, tmpFolderPrefix)
	if err != nil {
		return "", err
	}

	return tmpDir, nil
}

func copyEmbeddedDirToLocalFolder(embeddedPath string, efs embed.FS, targetPath string) error {
	return fs.WalkDir(efs, embeddedPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		relPath, err := filepath.Rel(embeddedPath, path)
		if err != nil {
			return err
		}
		target := filepath.Join(targetPath, relPath)

		if d.IsDir() {
			return os.MkdirAll(target, 0755)
		}

		data, err := efs.ReadFile(path)
		if err != nil {
			return err
		}

		return os.WriteFile(target, data, 0644)
	})
}

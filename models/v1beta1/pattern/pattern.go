// Package pattern provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.4.1 DO NOT EDIT.
package pattern

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/gofrs/uuid"
	"github.com/meshery/schemas/models/v1alpha1/core"
	"github.com/meshery/schemas/models/v1alpha2/catalog"
	"github.com/meshery/schemas/models/v1alpha3/relationship"
	"github.com/meshery/schemas/models/v1beta1/component"
)

// DeletePatternModel defines model for DeletePatternModel.
type DeletePatternModel struct {
	Id   uuid.UUID `json:"id,omitempty" yaml:"id,omitempty"`
	Name string    `json:"name,omitempty" yaml:"name,omitempty"`
}

// MesheryPattern defines model for MesheryPattern.
type MesheryPattern struct {
	CatalogData *catalog.CatalogData `json:"catalog_data,omitempty" yaml:"catalog_data,omitempty"`
	CreatedAt   time.Time            `json:"created_at,omitempty" yaml:"created_at,omitempty"`
	Id          uuid.UUID            `json:"id,omitempty" yaml:"id,omitempty"`
	Location    map[string]string    `json:"location,omitempty" yaml:"location,omitempty"`
	Name        string               `json:"name,omitempty" yaml:"name,omitempty"`

	// PatternFile Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes.
	PatternFile *PatternFile `json:"pattern_file,omitempty" yaml:"pattern_file,omitempty"`
	UpdatedAt   time.Time    `json:"updated_at,omitempty" yaml:"updated_at,omitempty"`
	UserId      uuid.UUID    `json:"user_id,omitempty" yaml:"user_id,omitempty"`
	Visibility  string       `json:"visibility,omitempty" yaml:"visibility,omitempty"`
}

// MesheryPatternDeleteRequestBody defines model for MesheryPatternDeleteRequestBody.
type MesheryPatternDeleteRequestBody struct {
	Patterns *[]DeletePatternModel `json:"patterns,omitempty" yaml:"patterns,omitempty"`
}

// MesheryPatternPage defines model for MesheryPatternPage.
type MesheryPatternPage struct {
	Page       *int              `json:"page,omitempty" yaml:"page,omitempty"`
	PageSize   *int              `json:"page_size,omitempty" yaml:"page_size,omitempty"`
	Patterns   *[]MesheryPattern `json:"patterns,omitempty" yaml:"patterns,omitempty"`
	ResultType *string           `json:"resultType,omitempty" yaml:"resultType,omitempty"`
	TotalCount *int              `json:"total_count,omitempty" yaml:"total_count,omitempty"`
}

// MesheryPatternRequestBody defines model for MesheryPatternRequestBody.
type MesheryPatternRequestBody struct {
	Name        *string         `json:"name,omitempty" yaml:"name,omitempty"`
	Path        string          `json:"path,omitempty" yaml:"path,omitempty"`
	PatternData *MesheryPattern `json:"pattern_data,omitempty" yaml:"pattern_data,omitempty"`
	Save        *bool           `json:"save,omitempty" yaml:"save,omitempty"`

	// Url endpoint
	Url string `json:"url,omitempty" yaml:"url,omitempty"`
}

// PatternFile Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes.
type PatternFile struct {
	// Id A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.
	Id uuid.UUID `json:"id" yaml:"id"`

	// Name Name of the design; a descriptive, but concise title for the design document.
	Name string `json:"name" yaml:"name"`

	// SchemaVersion Specifies the version of the schema to which the design conforms.
	SchemaVersion string `json:"schemaVersion" yaml:"schemaVersion"`

	// Version Revision of the design as expressed by an auto-incremented, SemVer-compliant version number. May be manually set by a user or third-party system, but will always be required to be of version number higher than the previously defined version number.
	Version  string                `json:"version" yaml:"version"`
	Metadata *PatternFile_Metadata `json:"metadata,omitempty" yaml:"metadata,omitempty"`

	// Components A list of one or more component declarations.
	Components []*component.ComponentDefinition `json:"components" yaml:"components"`

	// Preferences Design-level preferences
	Preferences *struct {
		// Layers List of available layers
		Layers map[string]interface{} `json:"layers" yaml:"layers"`
	} `json:"preferences,omitempty" yaml:"preferences,omitempty"`

	// Relationships List of relationships between components
	Relationships []*relationship.RelationshipDefinition `json:"relationships" yaml:"relationships"`
}

// PatternFile_Metadata defines model for PatternFile.Metadata.
type PatternFile_Metadata struct {
	// ResolvedAliases Map of resolved aliases present in the design
	ResolvedAliases      *map[string]core.ResolvedAlias `json:"resolvedAliases,omitempty" yaml:"resolvedAliases,omitempty"`
	AdditionalProperties map[string]interface{}         `json:"-" yaml:"-"`
}

// Getter for additional properties for PatternFile_Metadata. Returns the specified
// element and whether it was found
func (a PatternFile_Metadata) Get(fieldName string) (value interface{}, found bool) {
	if a.AdditionalProperties != nil {
		value, found = a.AdditionalProperties[fieldName]
	}
	return
}

// Setter for additional properties for PatternFile_Metadata
func (a *PatternFile_Metadata) Set(fieldName string, value interface{}) {
	if a.AdditionalProperties == nil {
		a.AdditionalProperties = make(map[string]interface{})
	}
	a.AdditionalProperties[fieldName] = value
}

// Override default JSON handling for PatternFile_Metadata to handle AdditionalProperties
func (a *PatternFile_Metadata) UnmarshalJSON(b []byte) error {
	object := make(map[string]json.RawMessage)
	err := json.Unmarshal(b, &object)
	if err != nil {
		return err
	}

	if raw, found := object["resolvedAliases"]; found {
		err = json.Unmarshal(raw, &a.ResolvedAliases)
		if err != nil {
			return fmt.Errorf("error reading 'resolvedAliases': %w", err)
		}
		delete(object, "resolvedAliases")
	}

	if len(object) != 0 {
		a.AdditionalProperties = make(map[string]interface{})
		for fieldName, fieldBuf := range object {
			var fieldVal interface{}
			err := json.Unmarshal(fieldBuf, &fieldVal)
			if err != nil {
				return fmt.Errorf("error unmarshaling field %s: %w", fieldName, err)
			}
			a.AdditionalProperties[fieldName] = fieldVal
		}
	}
	return nil
}

// Override default JSON handling for PatternFile_Metadata to handle AdditionalProperties
func (a PatternFile_Metadata) MarshalJSON() ([]byte, error) {
	var err error
	object := make(map[string]json.RawMessage)

	if a.ResolvedAliases != nil {
		object["resolvedAliases"], err = json.Marshal(a.ResolvedAliases)
		if err != nil {
			return nil, fmt.Errorf("error marshaling 'resolvedAliases': %w", err)
		}
	}

	for fieldName, field := range a.AdditionalProperties {
		object[fieldName], err = json.Marshal(field)
		if err != nil {
			return nil, fmt.Errorf("error marshaling '%s': %w", fieldName, err)
		}
	}
	return json.Marshal(object)
}

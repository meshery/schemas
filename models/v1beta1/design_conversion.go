package v1beta1

import (
	"fmt"

	"github.com/gofrs/uuid"
	"github.com/layer5io/meshkit/utils"
	models "github.com/meshery/schemas/models/conversion"
	"github.com/meshery/schemas/models/v1alpha2"
	"github.com/pkg/errors"
)

// The pattern file indicated by "p", is converted to the version pointed by "pattern", the version of the patternFile which implements the Hub interface indicates the version the conversion will happen.
// Only one version of the resource (patternfile in this case) should implement the Hub interface.
// "pattern" parameter acts as the destination and "p" the source.
func (p *PatternFile) ConvertTo(pattern models.Hub) error {
	patternFile, err := utils.Cast[*v1alpha2.PatternFile](pattern)
	if err != nil {
		return err
	}

	patternFile.Name = p.Name
	patternFile.PatternID = p.Id.String()
	patternFile.Version = p.Version

	for _, component := range p.Components {
		service := v1alpha2.Service{}

		service.ApiVersion = component.Component.Version
		service.Type = component.Kind
		service.Id = &component.Id
		service.IsAnnotation = component.Metadata.IsAnnotation
		service.Model = component.Model.Name
		service.Version = component.Version
		service.Name = component.DisplayName

		err := p.convertToSettings(&service, component)
		if err != nil {
			return err
		}

		err = p.convertToTraits(&service, component)
		if err != nil {
			return err
		}
		
		patternFile.Services[service.Id.String()] = &service
	}

	return nil
}

// The pattern file indicated by "pattern" is converted to the version to which *PatternFile belongs or simply the package version of the .go file.
// "pattern" parameter acts as the source and the "p" the destination.
func (p *PatternFile) ConvertFrom(pattern models.Hub) error {
	patternFile, err := utils.Cast[*v1alpha2.PatternFile](pattern)
	if err != nil {
		return err
	}

	p.Id = uuid.FromStringOrNil(patternFile.PatternID)
	p.Name = patternFile.Name
	p.SchemaVersion = "design.meshery.io/v1beta1"
	p.Version = patternFile.Version

	services := patternFile.Services

	for _, service := range services {
		// definition version
		compDefVersion := service.Version
		if compDefVersion == "" {
			compDefVersion = "v1.0.0"
		}
		component := ComponentDefinition{
			Version:     compDefVersion,
			DisplayName: service.Name,
			Component: Component{
				Kind:    service.Type,
				Version: service.ApiVersion,
			},
			Configuration: service.Settings,
			Model: ModelDefinition{
				Name: service.Model,
			},
		}
		err := p.convertFromSettings(&component, service)
		if err != nil {
			return err
		}

		err = p.convertFromTraits(&component, service)
		if err != nil {
			return err
		}

		p.Components = append(p.Components, &component)
	}
	return nil

}

func (p *PatternFile) convertFromTraits(component *ComponentDefinition, service *v1alpha2.Service) error {
	extensionsMetadata, err := utils.Cast[map[string]interface{}](service.Traits["meshmap"])
	if err != nil {
		return errors.Wrapf(err, "failed to extract meshmap traits for the design file")
	}

	// Handle node id: traits.meshmap.id
	compNodeID, err := utils.Cast[string](extensionsMetadata["id"])
	if err != nil {
		return errors.Wrapf(err, "failed to extract node id for the component \"%s\" of type %s", component.DisplayName, component.Kind)
	}

	compNodeUUID, err := uuid.FromString(compNodeID)
	if err != nil {
		return errors.Wrapf(err, "failed to convert node id \"%s\" for the component \"%s\" of type %s, to uuid.", compNodeID, component.DisplayName, component.Kind)
	}
	component.Id = compNodeUUID

	// Handle model: traits.meshmap.meshmodel-data

	model, err := utils.MarshalAndUnmarshal[interface{}, ModelDefinition](extensionsMetadata["meshmodel-data"])
	if err != nil {
		return errors.Wrapf(err, "unable to extract model data for \"%s\" from the design file", component.DisplayName)
	}
	component.Model = model

	// Handle component metadata: traits.meshmap.meshmodel-metadata
	_compMetadata, err := utils.MarshalAndUnmarshal[interface{}, ComponentDefinition_Metadata](extensionsMetadata["meshmodel-metadata"])
	if err != nil {
		return errors.Wrapf(err, "unable to extract component metadata for \"%s\" from the design file", component.DisplayName)
	}

	component.Metadata = &_compMetadata

	// Handle position properties: traits.meshmap.position
	component.Metadata.AdditionalProperties["position"] = extensionsMetadata["position"]

	// Handle position properties: service.dependsOn/
	component.Metadata.AdditionalProperties["dependsOn"] = service.DependsOn

	// Handle whiteboardData: service.traits.whiteboardData
	component.Metadata.AdditionalProperties["whiteboardData"] = extensionsMetadata["whiteboardData"]

	// Handle fieldRef data
	component.Metadata.AdditionalProperties["fieldRefData"] = extensionsMetadata["fieldRefData"]

	// Handle parentId for hierarchical relationships
	// hierarchicalRelationship := v1alpha3.RelationshipDefinition{
	// 	Kind: "Hierarchical",
	// 	Type: "Parent",
	// 	SubType: "Inventory",
	// 	Selectors: []v1alpha3.Selector{
	// 		{
	// 			Allow: v1alpha3.Configuration{
	// 				From: []v1alpha3.RelationshipConfiguration{
	// 					{
	// 						Id:
	// 					}
	// 				}
	// 			},
	// 		},
	// 	},
	// }

	// Handle edges
	return nil
}

func (p *PatternFile) convertToTraits(service *v1alpha2.Service, component *ComponentDefinition) error {
	extensionsMetadata := make(map[string]interface{}, 0)
	extensionsMetadata["meshmap"] = map[string]interface{}{
		"id":                 component.Id,
		"meshmodel-data":     component.Model,
		"meshmodel-metadata": component.Metadata,
		"position":           component.Metadata.AdditionalProperties["position"],
		"whiteboardData":     component.Metadata.AdditionalProperties["whiteboardData"],
		"fieldRefData":       component.Metadata.AdditionalProperties["fieldRefData"],
	}

	serviceDependencies, err := utils.Cast[[]string](component.Metadata.AdditionalProperties["dependsOn"])
	if err != nil {
		// this error can be ignored IMO
		return errors.Wrapf(err, "unable to extract dependOn (service.dependsOn)")
	}

	service.DependsOn = serviceDependencies
	service.Traits = extensionsMetadata
	// Handle relationships
	return nil
}

func (p *PatternFile) convertFromSettings(component *ComponentDefinition, service *v1alpha2.Service) error {
	if component.Configuration == nil {
		component.Configuration = make(map[string]interface{}, 0)
	}

	if component.Configuration["metadata"] == nil {
		component.Configuration["metadata"] = make(map[string]interface{})
	}

	metadata := component.Configuration["metadata"]

	_metadata, err := utils.Cast[map[string]interface{}](metadata)
	if err != nil {
		fmt.Println("Failed to convert from v1alpha2 to v1beta1", err)
		return err
	}

	if service.Labels != nil {
		_metadata["labels"] = service.Labels
	}

	if service.Annotations != nil {
		_metadata["annotations"] = service.Annotations
	}

	if service.Namespace != "" {
		_metadata["namespace"] = service.Namespace
	}

	component.Configuration = service.Settings
	component.Configuration["metadata"] = _metadata
	return nil
}

func (p *PatternFile) convertToSettings(service *v1alpha2.Service, component *ComponentDefinition) error {
	configurationMetadata := component.Configuration["metadata"]

	_configurationMetadata, err := utils.Cast[map[string]interface{}](configurationMetadata)
	if err != nil {
		// if errors occurs exit the conversion, do not perform partial conversion
		// Eventually ask the user whether partial conversion is ok or not and do accordingly
		return errors.Wrapf(err, "unable to extract configuration metdata (labels/annotations)")
	}

	labels := _configurationMetadata["labels"]
	_labels, err := utils.Cast[map[string]string](labels)
	if err != nil {
		return errors.Wrapf(err, "unable to extract metdata.labels")
	}

	annotations := _configurationMetadata["annotations"]
	_annotations, err := utils.Cast[map[string]string](annotations)
	if err != nil {
		return errors.Wrapf(err, "unable to extract metdata.annotations")
	}

	service.Labels = _labels
	service.Annotations = _annotations

	service.Namespace, err = utils.Cast[string](_configurationMetadata["namespace"])
	if err != nil {
		// assign "default" namespace if conversion fails, log it the err rand continue?
		return errors.Wrapf(err, "unable to extract metdata.namespace")
	}

	delete(_configurationMetadata, "labels")
	delete(_configurationMetadata, "annotations")
	delete(_configurationMetadata, "namespace")

	component.Configuration["metadata"] = _configurationMetadata // is this reassignment needed, map are references, check once.
	service.Settings = component.Configuration
	return nil
}

package v1beta1

import (
	"github.com/layer5io/meshkit/utils"
	models "github.com/meshery/schemas/models/conversion"
	"github.com/meshery/schemas/models/v1alpha2"
)

func (p *PatternFile) ConvertTo(convertedPattern models.Hub) {

}


func (p *PatternFile) ConvertFrom(patternToConvert models.Hub) error {
	patternFile, err := utils.Cast[*&v1alpha2.PatternFile{}](patternToConvert)
	if err != nil {
		return err
	}

	p.Name = patternFile.Name
	p.SchemaVersion = patternFile.SchemaVersion
	p.Version = patternFile.Version

	services := patternFile.Services

	for name, service := range services {
		component := Component{
			Id: service.ID,
			Component: Component,
		}
	}
	return nil

}


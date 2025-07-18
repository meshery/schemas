// Package plan provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.5.0 DO NOT EDIT.
package plan

import (
	"github.com/gofrs/uuid"
)

// Defines values for Currency.
const (
	Usd Currency = "usd"
)

// Defines values for PlanCadence.
const (
	Monthly PlanCadence = "monthly"
	Yearly  PlanCadence = "yearly"
)

// Defines values for PlanName.
const (
	PlanNameEnterprise   PlanName = "Enterprise"
	PlanNameFree         PlanName = "Free"
	PlanNameTeamDesigner PlanName = "Team Designer"
	PlanNameTeamOperator PlanName = "Team Operator"
)

// Defines values for PlanUnit.
const (
	PlanUnitFree PlanUnit = "free"
	PlanUnitUser PlanUnit = "user"
)

// Currency defines model for Currency.
type Currency string

// Plan defines model for Plan.
type Plan struct {
	Cadence  PlanCadence `json:"cadence" yaml:"cadence"`
	Currency Currency    `json:"currency" yaml:"currency"`

	// Id A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.
	Id uuid.UUID `json:"id" yaml:"id"`

	// Name Name of the plan
	Name PlanName `json:"name" yaml:"name"`

	// PricePerUnit Price per unit of the plan
	PricePerUnit float32  `db:"price_per_unit" json:"price_per_unit" yaml:"price_per_unit"`
	Unit         PlanUnit `json:"unit" yaml:"unit"`
}

// PlanCadence defines model for PlanCadence.
type PlanCadence string

// PlanName Name of the plan
type PlanName string

// PlanPage defines model for PlanPage.
type PlanPage struct {
	Page       int    `json:"page" yaml:"page"`
	PageSize   int    `json:"page_size" yaml:"page_size"`
	Plans      []Plan `json:"plans" yaml:"plans"`
	TotalCount int    `json:"total_count" yaml:"total_count"`
}

// PlanUnit defines model for PlanUnit.
type PlanUnit string

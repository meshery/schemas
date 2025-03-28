// Package connection provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.3.0 DO NOT EDIT.
package connection

import (
	"time"

	"github.com/gofrs/uuid"
	externalRef2 "github.com/meshery/schemas/models/core"
)

// Defines values for ConnectionStatus.
const (
	Connected    ConnectionStatus = "connected"
	Deleted      ConnectionStatus = "deleted"
	Disconnected ConnectionStatus = "disconnected"
	Discovered   ConnectionStatus = "discovered"
	Ignored      ConnectionStatus = "ignored"
	Maintenance  ConnectionStatus = "maintenance"
	NotFound     ConnectionStatus = "not found"
	Registered   ConnectionStatus = "registered"
)

// Connection Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections
// Connection Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections
type Connection struct {
    // Id ID
    Id uuid.UUID `json:"id" yaml:"id"`

    // Name Connection Name
    Name string `json:"name" yaml:"name"`

    // CredentialId Credential ID
    CredentialId uuid.UUID `json:"credential_id" yaml:"credential_id"`

    // Type Connection Type
    Type string `json:"type" yaml:"type"`

    // SubType Connection Subtype
    SubType string `json:"sub_type" yaml:"sub_type"`

    // Kind Connection Kind
    Kind string `json:"kind" yaml:"kind"`

    Metadata map[string]interface{} `json:"metadata,omitempty" yaml:"metadata,omitempty" gorm:"type:bytes;serializer:json"`

    // Status Connection Status
    Status ConnectionStatus `json:"status" yaml:"status"`

    // UserID A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas.
    UserID uuid.UUID `json:"user_id" yaml:"user_id"`

    CreatedAt time.Time `json:"created_at" yaml:"created_at"`

    UpdatedAt time.Time `json:"updated_at" yaml:"updated_at"`

    DeletedAt time.Time `json:"deleted_at" yaml:"deleted_at"`
}

// ConnectionStatus Connection Status
type ConnectionStatus string

// ConnectionPage defines model for connectionPage.
type ConnectionPage struct {
	Connections []Connection `json:"connections,omitempty"`
	Page        int          `json:"page,omitempty"`
	PageSize    int          `json:"page_size,omitempty"`
	ResultType  string       `json:"resultType,omitempty"`
	TotalCount  int          `json:"total_count,omitempty"`
}

// ConnectionStatusInfo defines model for connectionStatusInfo.
type ConnectionStatusInfo struct {
	// Count Number of connections having the status
	Count  int               `json:"count,omitempty"`
	Status externalRef2.Text `json:"status,omitempty"`
}

// ConnectionsStatusPage defines model for connectionsStatusPage.
type ConnectionsStatusPage struct {
	ConnectionsStatus []ConnectionStatusInfo `json:"connections_status,omitempty"`
}

// K8sContext defines model for k8sContext.
type K8sContext struct {
	Auth               externalRef2.MapObject `json:"auth,omitempty"`
	Cluster            externalRef2.MapObject `json:"cluster,omitempty"`
	CreatedAt          externalRef2.Time      `json:"created_at,omitempty"`
	CreatedBy          externalRef2.Id        `json:"created_by,omitempty"`
	DeploymentType     *string                `json:"deployment_type,omitempty"`
	Id                 externalRef2.Id        `json:"id,omitempty"`
	KubernetesServerId externalRef2.Id        `json:"kubernetes_server_id,omitempty"`
	MesheryInstanceId  externalRef2.Id        `json:"meshery_instance_id,omitempty"`
	Name               externalRef2.Text      `json:"name,omitempty"`
	Owner              externalRef2.Id        `json:"owner,omitempty"`
	Server             *string                `json:"server,omitempty"`
	UpdatedAt          externalRef2.Time      `json:"updated_at,omitempty"`
}

// K8sContextPersistResponse defines model for k8sContextPersistResponse.
type K8sContextPersistResponse struct {
	Inserted   *bool       `json:"inserted,omitempty"`
	K8sContext *K8sContext `json:"k8sContext,omitempty"`
}

// MesheryInstance defines model for mesheryInstance.
type MesheryInstance struct {
	CreatedAt      externalRef2.Time     `json:"created_at,omitempty"`
	DeletedAt      externalRef2.Time     `json:"deleted_at,omitempty"`
	Id             externalRef2.Id       `json:"id,omitempty"`
	Name           externalRef2.Text     `json:"name,omitempty"`
	ServerBuildSha externalRef2.Text     `json:"server_build_sha,omitempty"`
	ServerId       externalRef2.Text     `json:"server_id,omitempty"`
	ServerLocation externalRef2.Endpoint `json:"server_location,omitempty"`
	ServerVersion  externalRef2.Text     `json:"server_version,omitempty"`
	Status         externalRef2.Text     `json:"status,omitempty"`
	UpdatedAt      externalRef2.Time     `json:"updated_at,omitempty"`
}

// ConnectionId defines model for connectionId.
type ConnectionId = externalRef2.Id

// ConnectionKind defines model for connectionKind.
type ConnectionKind = externalRef2.Text

// ServerId defines model for serverId.
type ServerId = externalRef2.Id

// ConnectionPayload defines model for connectionPayload.
type ConnectionPayload struct {
	CredentialSecret externalRef2.MapObject `json:"credential_secret,omitempty"`
	Kind             externalRef2.Text      `json:"kind,omitempty"`
	Metadata         externalRef2.MapObject `json:"metadata,omitempty"`
	SubType          externalRef2.Text      `json:"sub_type,omitempty"`
	Type             externalRef2.Text      `json:"type,omitempty"`
}

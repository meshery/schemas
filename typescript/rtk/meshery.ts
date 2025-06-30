import { mesheryBaseApi as api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    importDesign: build.mutation<ImportDesignApiResponse, ImportDesignApiArg>({
      query: (queryArg) => ({ url: `/api/pattern/import`, method: "POST", body: queryArg.body }),
    }),
    registerMeshmodels: build.mutation<RegisterMeshmodelsApiResponse, RegisterMeshmodelsApiArg>({
      query: (queryArg) => ({ url: `/api/meshmodels/register`, method: "POST", body: queryArg.body }),
    }),
    getApiWorkspaces: build.query<GetApiWorkspacesApiResponse, GetApiWorkspacesApiArg>({
      query: () => ({ url: `/api/workspaces` }),
    }),
    postApiWorkspaces: build.mutation<PostApiWorkspacesApiResponse, PostApiWorkspacesApiArg>({
      query: (queryArg) => ({ url: `/api/workspaces`, method: "POST", body: queryArg.body }),
    }),
    getApiWorkspacesById: build.query<GetApiWorkspacesByIdApiResponse, GetApiWorkspacesByIdApiArg>({
      query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}` }),
    }),
    putApiWorkspacesById: build.mutation<PutApiWorkspacesByIdApiResponse, PutApiWorkspacesByIdApiArg>({
      query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}`, method: "PUT", body: queryArg.body }),
    }),
    deleteApiWorkspacesById: build.mutation<DeleteApiWorkspacesByIdApiResponse, DeleteApiWorkspacesByIdApiArg>({
      query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}`, method: "DELETE" }),
    }),
    createEnvironment: build.mutation<CreateEnvironmentApiResponse, CreateEnvironmentApiArg>({
      query: (queryArg) => ({ url: `/api/environments`, method: "POST", body: queryArg.body }),
    }),
    getEnvironments: build.query<GetEnvironmentsApiResponse, GetEnvironmentsApiArg>({
      query: (queryArg) => ({
        url: `/api/environments`,
        params: {
          search: queryArg.search,
          order: queryArg.order,
          page: queryArg.page,
          pagesize: queryArg.pagesize,
          orgID: queryArg.orgId,
        },
      }),
    }),
    postEvaluate: build.mutation<PostEvaluateApiResponse, PostEvaluateApiArg>({
      query: (queryArg) => ({ url: `/evaluate`, method: "POST", body: queryArg.body }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as mesheryApi };
export type ImportDesignApiResponse = /** status 200 Successful Import */ {
  message?: string;
};
export type ImportDesignApiArg = {
  body: {
    /** Supported formats: Kubernetes Manifests, Helm Charts, Docker Compose, and Meshery Designs. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    file?: string;
    /** The name of the pattern file being imported. */
    file_name?: string;
    /** Provide a name for your design file. This name will help you identify the file more easily. You can also change the name of your design after importing it. */
    name?: string;
    /** Provide the URL of the file you want to import. This should be a direct URL to a single file, for example: https://raw.github.com/your-design-file.yaml. Also, ensure that design is in a supported format: Kubernetes Manifest, Helm Chart, Docker Compose, or Meshery Design. See [Import Designs Documentation](https://docs.meshery.io/guides/configuration-management/importing-designs#import-designs-using-meshery-ui) for details */
    url?: string;
  };
};
export type RegisterMeshmodelsApiResponse = /** status 200 Successful registration */ {
  message?: string;
};
export type RegisterMeshmodelsApiArg = {
  body: {
    importBody:
      | {
          /** Name of the file being uploaded. */
          fileName: string;
          /** Supported model file formats are: .tar, .tar.gz, and .tgz. See [Import Models Documentation](https://docs.meshery.io/guides/configuration-management/importing-models#import-models-using-meshery-ui) for details */
          modelFile: string;
        }
      | {
          /** A direct URL to a single model file, for example: https://raw.github.com/your-model-file.tar. Supported model file formats are: .tar, .tar.gz, and .tgz. \n\nFor bulk import of your model use the GitHub connection or CSV files. See [Import Models Documentation](https://docs.meshery.io/guides/configuration-management/importing-models#import-models-using-meshery-ui) for details */
          url: string;
        }
      | {
          /** Upload a CSV file containing model definitions */
          modelCsv: Blob;
          /** Upload a CSV file containing component definitions */
          componentCsv: Blob;
          /** Upload a CSV file containing relationship definitions */
          relationshipCsv: Blob;
        }
      | {
          /** URI to the source code or package of the model. */
          url: string | string;
        };
    /** Choose the method you prefer to upload your model file. Select 'File Import' or 'CSV Import' if you have the file on your local system or 'URL Import' if you have the file hosted online. */
    uploadType: "file" | "urlImport" | "csv" | "url";
    register: boolean;
  };
};
export type GetApiWorkspacesApiResponse = /** status 200 List of workspaces */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  workspaces?: {
    ID?: string;
    name?: string;
    description?: string;
    organization_id?: string;
    owner?: string;
    created_at?: string;
    updated_at?: string;
    /** SQL null Timestamp to handle null values of time. */
    deleted_at?: string;
  }[];
};
export type GetApiWorkspacesApiArg = void;
export type PostApiWorkspacesApiResponse = /** status 201 Workspace created successfully */ {
  ID?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type PostApiWorkspacesApiArg = {
  /** Body for creating workspace */
  body: {
    /** Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation. */
    name: string;
    /** Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces) */
    description?: string;
    /** Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation. */
    organization_id: string;
  };
};
export type GetApiWorkspacesByIdApiResponse = /** status 200 Workspace details */ {
  ID?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type GetApiWorkspacesByIdApiArg = {
  id: string;
};
export type PutApiWorkspacesByIdApiResponse = /** status 200 Workspace updated successfully */ {
  ID?: string;
  name?: string;
  description?: string;
  organization_id?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
  /** SQL null Timestamp to handle null values of time. */
  deleted_at?: string;
};
export type PutApiWorkspacesByIdApiArg = {
  id: string;
  /** Body for updating workspace */
  body: {
    /** Name of workspace */
    name?: string;
    /** Environment description */
    description?: string;
    /** Organization ID */
    organization_id: string;
  };
};
export type DeleteApiWorkspacesByIdApiResponse = unknown;
export type DeleteApiWorkspacesByIdApiArg = {
  id: string;
};
export type CreateEnvironmentApiResponse = /** status 201 Created environment */ {
  /** ID */
  id: string;
  /** Environment name */
  name: string;
  /** Environment description */
  description: string;
  /** Environment organization ID */
  organization_id: string;
  /** Environment owner */
  owner: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
export type CreateEnvironmentApiArg = {
  /** Body for creating environment */
  body: {
    /** An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation. */
    name: string;
    /** An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any Time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments). */
    description?: string;
    /** Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation. */
    OrganizationID?: string;
  };
};
export type GetEnvironmentsApiResponse = /** status 200 Environments */ {
  page?: number;
  page_size?: number;
  total_count?: number;
  environments?: {
    /** ID */
    id: string;
    /** Environment name */
    name: string;
    /** Environment description */
    description: string;
    /** Environment organization ID */
    organization_id: string;
    /** Environment owner */
    owner: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
  }[];
};
export type GetEnvironmentsApiArg = {
  /** Get responses that match search param value */
  search?: string;
  /** Get ordered responses */
  order?: string;
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** User's organization ID */
  orgId: string;
};
export type PostEvaluateApiResponse = /** status 200 Successful evaluation */ {
  /** Specifies the version of the schema to which the evaluation response conforms. */
  schemaVersion: string;
  /** The final evaluated design, including all updated components and relationships. This can be either the complete updated design or only a diff of changes. The version of the design will be automatically incremented if any modifications are made during the evaluation process. This field provides a comprehensive view of the design state after all relationship evaluations and policy applications have been completed. */
  design: {
    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
    id: string;
    /** Name of the design; a descriptive, but concise title for the design document. */
    name: string;
    /** Specifies the version of the schema to which the design conforms. */
    schemaVersion: string;
    /** Revision of the design as expressed by an auto-incremented, SemVer-compliant version number. May be manually set by a user or third-party system, but will always be required to be of version number higher than the previously defined version number. */
    version: string;
    metadata?: {
      /** Map of resolved aliases present in the design */
      resolvedAliases?: {
        [key: string]: {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          relationship_id: string;
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          alias_component_id: string;
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          immediate_parent_id: string;
          immediate_ref_field_path: string[];
        } & {
          /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
          resolved_parent_id: string;
          resolved_ref_field_path: string[];
        };
      };
      [key: string]: any;
    };
    /** A list of one or more component declarations. */
    components: {
      /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
      id: string;
      /** Specifies the version of the schema to which the component definition conforms. */
      schemaVersion: string;
      /** Version of the component definition. */
      version: string;
      /** Name of the component in human-readible format. */
      displayName: string;
      /** A written representation of the purpose and characteristics of the component. */
      description: string;
      /** Format specifies the format used in the `component.schema` field. JSON is the default. */
      format: "JSON" | "CUE";
      /** Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
      model: {
        /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
        id: string;
        /** Specifies the version of the schema used for the definition. */
        schemaVersion: string;
        /** Version of the model definition. */
        version: string;
        /** The unique name for the model within the scope of a registrant. */
        name: string;
        /** Human-readable name for the model. */
        displayName: string;
        /** Description of the model. */
        description: string;
        /** Status of model, including:
                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                - maintenance: model is unavailable for a period of time.
                - enabled: model is available for use for all users of this Meshery Server.
                - ignored: model is unavailable for use for all users of this Meshery Server. */
        status: "ignored" | "enabled" | "duplicate";
        /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
        registrant: {
          /** ID */
          id: string;
          /** Connection Name */
          name: string;
          /** Credential ID */
          credential_id: string;
          /** Connection Type */
          type: string;
          /** Connection Subtype */
          sub_type: string;
          /** Connection Kind */
          kind: string;
          metadata: object;
          /** Connection Status */
          status:
            | "discovered"
            | "registered"
            | "connected"
            | "ignored"
            | "maintenance"
            | "disconnected"
            | "deleted"
            | "not found";
          /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
          user_id: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
          environments: {
            /** ID */
            id: string;
            /** Environment name */
            name: string;
            /** Environment description */
            description: string;
            /** Environment organization ID */
            organization_id: string;
            /** Environment owner */
            owner: string;
            created_at?: string;
            updated_at?: string;
            deleted_at?: string;
          }[];
        };
        /** ID of the registrant. */
        registrantId: string;
        /** ID of the category. */
        categoryId: string;
        /** Category of the model. */
        category: {
          /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
          id: string;
          /** The category of the model that determines the main grouping. */
          name:
            | "Analytics"
            | "App Definition and Development"
            | "Cloud Native Network"
            | "Cloud Native Storage"
            | "Database"
            | "Machine Learning"
            | "Observability and Analysis"
            | "Orchestration & Management"
            | "Platform"
            | "Provisioning"
            | "Runtime"
            | "Security & Compliance"
            | "Serverless"
            | "Tools"
            | "Uncategorized";
          metadata: object;
        };
        /** Sub category of the model determines the secondary grouping. */
        subCategory:
          | "API Gateway"
          | "API Integration"
          | "Application Definition & Image Build"
          | "Automation & Configuration"
          | "Certified Kubernetes - Distribution"
          | "Chaos Engineering"
          | "Cloud Native Storage"
          | "Cloud Provider"
          | "CNI"
          | "Compute"
          | "Container Registry"
          | "Container Runtime"
          | "Container Security"
          | "Container"
          | "Content Delivery Network"
          | "Continuous Integration & Delivery"
          | "Coordination & Service Discovery"
          | "Database"
          | "Flowchart"
          | "Framework"
          | "Installable Platform"
          | "Key Management"
          | "Key Management Service"
          | "Kubernetes"
          | "Logging"
          | "Machine Learning"
          | "Management Governance"
          | "Metrics"
          | "Monitoring"
          | "Networking Content Delivery"
          | "Operating System"
          | "Query"
          | "Remote Procedure Call"
          | "Scheduling & Orchestration"
          | "Secrets Management"
          | "Security Identity & Compliance"
          | "Service Mesh"
          | "Service Proxy"
          | "Source Version Control"
          | "Storage"
          | "Specifications"
          | "Streaming & Messaging"
          | "Tools"
          | "Tracing"
          | "Uncategorized"
          | "Video Conferencing";
        /** Metadata containing additional information associated with the model. */
        metadata?: {
          /** Capabilities associated with the model */
          capabilities?: {
            /** Specifies the version of the schema to which the capability definition conforms. */
            schemaVersion: string;
            /** Version of the capability definition. */
            version: string;
            /** Name of the capability in human-readible format. */
            displayName: string;
            /** A written representation of the purpose and characteristics of the capability. */
            description: string;
            /** Top-level categorization of the capability */
            kind: "action" | "mutate" | "view" | "interaction";
            /** Classification of capabilities. Used to group capabilities similar in nature. */
            type: string;
            /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
            subType: string;
            /** Key that backs the capability. */
            key: string;
            /** State of the entity in which the capability is applicable. */
            entityState: ("declaration" | "instance")[];
            /** Status of the capability */
            status: "enabled" | "disabled";
            /** Metadata contains additional information associated with the capability. Extension point. */
            metadata?: {
              [key: string]: any;
            };
          }[];
          /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
          isAnnotation?: boolean;
          /** Primary color associated with the model. */
          primaryColor?: string;
          /** Secondary color associated with the model. */
          secondaryColor?: string;
          /** SVG representation of the model in white color. */
          svgWhite: string;
          /** SVG representation of the model in colored format. */
          svgColor: string;
          /** SVG representation of the complete model. */
          svgComplete?: string;
          /** The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
          shape?:
            | "circle"
            | "ellipse"
            | "triangle"
            | "round-triangle"
            | "rectangle"
            | "round-rectangle"
            | "bottom-round-rectangle"
            | "cut-rectangle"
            | "barrel"
            | "rhomboid"
            | "diamond"
            | "round-diamond"
            | "pentagon"
            | "round-pentagon"
            | "hexagon"
            | "round-hexagon"
            | "concave-hexagon"
            | "heptagon"
            | "round-heptagon"
            | "octagon"
            | "round-octagon"
            | "star"
            | "tag"
            | "round-tag"
            | "vee"
            | "polygon";
          [key: string]: any;
        };
        /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
        model: {
          /** Version of the model as defined by the registrant. */
          version: string;
        };
        relationships: any;
        components: any;
        /** Number of components associated with the model. */
        componentsCount: number;
        /** Number of relationships associated with the model. */
        relationshipsCount: number;
      };
      /** ModelId is the foreign key to the model to which the component belongs. */
      modelId: string;
      /** Visualization styles for a component */
      styles?: {
        /** Primary color of the component used for UI representation. */
        primaryColor: string;
        /** Secondary color of the entity used for UI representation. */
        secondaryColor?: string;
        /** White SVG of the entity used for UI representation on dark background. */
        svgWhite: string;
        /** Colored SVG of the entity used for UI representation on light background. */
        svgColor: string;
        /** Complete SVG of the entity used for UI representation, often inclusive of background. */
        svgComplete: string;
        /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. */
        color?: string;
        /** The opacity of the label text, including its outline. */
        "text-opacity"?: number;
        /** A comma-separated list of font names to use on the label text. */
        "font-family"?: string;
        /** The size of the label text. */
        "font-size"?: string;
        /** A CSS font style to be applied to the label text. */
        "font-style"?: string;
        /** A CSS font weight to be applied to the label text. */
        "font-weight"?: string;
        /** A transformation to apply to the label text */
        "text-transform"?: "none" | "uppercase" | "lowercase";
        /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children. */
        opacity?: number;
        /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
        "z-index"?: number;
        /** The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id */
        label?: string;
        /** The animation to apply to the element. example ripple,bounce,etc */
        animation?: object;
        [key: string]: any;
      } & {
        /** The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
        shape:
          | "ellipse"
          | "triangle"
          | "round-triangle"
          | "rectangle"
          | "round-rectangle"
          | "bottom-round-rectangle"
          | "cut-rectangle"
          | "barrel"
          | "rhomboid"
          | "diamond"
          | "round-diamond"
          | "pentagon"
          | "round-pentagon"
          | "hexagon"
          | "round-hexagon"
          | "concave-hexagon"
          | "heptagon"
          | "round-heptagon"
          | "octagon"
          | "round-octagon"
          | "star"
          | "tag"
          | "round-tag"
          | "vee"
          | "polygon";
        /** The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position. */
        position?: {
          /** The x-coordinate of the node. */
          x: number;
          /** The y-coordinate of the node. */
          y: number;
        };
        /** The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id */
        "body-text"?: string;
        /** How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'. */
        "body-text-wrap"?: string;
        /** The maximum width for wrapping text in the node. */
        "body-text-max-width"?: string;
        /** The opacity of the node's body text, including its outline. */
        "body-text-opacity"?: number;
        /** The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g. */
        "body-text-background-color"?: string;
        /** The size of the node's body text. */
        "body-text-font-size"?: number;
        /** The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g. */
        "body-text-color"?: string;
        /** A CSS font weight to be applied to the node's body text. */
        "body-text-font-weight"?: string;
        /** A CSS horizontal alignment to be applied to the node's body text. */
        "body-text-horizontal-align"?: string;
        /** A CSS text decoration to be applied to the node's body text. */
        "body-text-decoration"?: string;
        /** A CSS vertical alignment to be applied to the node's body text. */
        "body-text-vertical-align"?: string;
        /** The width of the node's body or the width of an edge's line. */
        width?: number;
        /** The height of the node's body */
        height?: number;
        /** The URL that points to the image to show in the node. */
        "background-image"?: string;
        /** The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g. */
        "background-color"?: string;
        /** Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1. */
        "background-blacken"?: number;
        /** The opacity level of the node's background colour */
        "background-opacity"?: number;
        /** The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-position-x"?: string;
        /** The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-position-y"?: string;
        /** The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-offset-x"?: string;
        /** The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
        "background-offset-y"?: string;
        /** How the background image is fit to the node. Can be 'none', 'contain', or 'cover'. */
        "background-fit"?: string;
        /** How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'. */
        "background-clip"?: string;
        /** How the background image's width is determined. Can be 'none', 'inner', or 'outer'. */
        "background-width-relative-to"?: string;
        /** How the background image's height is determined. Can be 'none', 'inner', or 'outer'. */
        "background-height-relative-to"?: string;
        /** The size of the node's border. */
        "border-width"?: number;
        /** The style of the node's border */
        "border-style"?: "solid" | "dotted" | "dashed" | "double";
        /** The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g. */
        "border-color"?: string;
        /** The opacity of the node's border */
        "border-opacity"?: number;
        /** The amount of padding around all sides of the node. */
        padding?: number;
        /** The horizontal alignment of a node's label */
        "text-halign"?: "left" | "center" | "right";
        /** The vertical alignment of a node's label */
        "text-valign"?: "top" | "center" | "bottom";
        /** Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset. */
        ghost?: "yes" | "no";
        /** The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
        "active-bg-color"?: string;
        /** The opacity of the active background indicator. Selector needs to be *core*. */
        "active-bg-opacity"?: string;
        /** The opacity of the active background indicator. Selector needs to be *core*. */
        "active-bg-size"?: string;
        /** The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
        "selection-box-color"?: string;
        /** The size of the border on the selection box. Selector needs to be *core* */
        "selection-box-border-width"?: number;
        /** The opacity of the selection box. Selector needs to be *core* */
        "selection-box-opacity"?: number;
        /** The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
        "outside-texture-bg-color"?: string;
        /** The opacity of the area outside the viewport texture. Selector needs to be *core* */
        "outside-texture-bg-opacity"?: number;
        /** An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 ) */
        "shape-polygon-points"?: string;
        /** The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
        "menu-background-color"?: string;
        /** The opacity of the background of the component menu. */
        "menu-background-opacity"?: number;
        /** The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
        "menu-forground-color"?: string;
      };
      /** Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management. */
      capabilities?: {
        /** Specifies the version of the schema to which the capability definition conforms. */
        schemaVersion: string;
        /** Version of the capability definition. */
        version: string;
        /** Name of the capability in human-readible format. */
        displayName: string;
        /** A written representation of the purpose and characteristics of the capability. */
        description: string;
        /** Top-level categorization of the capability */
        kind: "action" | "mutate" | "view" | "interaction";
        /** Classification of capabilities. Used to group capabilities similar in nature. */
        type: string;
        /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
        subType: string;
        /** Key that backs the capability. */
        key: string;
        /** State of the entity in which the capability is applicable. */
        entityState: ("declaration" | "instance")[];
        /** Status of the capability */
        status: "enabled" | "disabled";
        /** Metadata contains additional information associated with the capability. Extension point. */
        metadata?: {
          [key: string]: any;
        };
      }[];
      /** Status of component, including:
            - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
            - maintenance: model is unavailable for a period of time.
            - enabled: model is available for use for all users of this Meshery Server.
            - ignored: model is unavailable for use for all users of this Meshery Server. */
      status?: "ignored" | "enabled" | "duplicate" | "resolved" | "open";
      /** Metadata contains additional information associated with the component. */
      metadata: {
        /** Genealogy represents the various representational states of the component. */
        genealogy: string;
        /** Identifies whether the component is semantically meaningful or not; identifies whether the component should be treated as deployable entity or is for purposes of logical representation. */
        isAnnotation: boolean;
        /** Identifies whether the component is scoped to namespace or clsuter wide. */
        isNamespaced: boolean;
        /** 'published' controls whether the component should be registered in Meshery Registry. When the same 'published' property in Models, is set to 'false', the Model property takes precedence with all Entities in the Model not being registered. */
        published: boolean;
        /** InstanceDetails contains information about the instance of the component. */
        instanceDetails: object;
        /** Defines the UI schema for rendering the component's configuration. For more details, visit: https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema/ . */
        configurationUISchema: string;
        [key: string]: any;
      };
      /** The configuration of the component. The configuration is based on the schema defined within the component definition(component.schema). */
      configuration: object;
      /** data related to the third party capability that Component Defintion wraps , this is herematicaly sealed an */
      component: {
        /** Version of the component produced by the registrant. Example: APIVersion of a Kubernetes Pod. */
        version: string;
        /** The unique identifier (name) assigned by the registrant to this component. Example: A Kubernetes Pod is of kind 'Pod'. */
        kind: string;
        /** JSON schema of the object as defined by the registrant. */
        schema: string;
      };
    }[];
    /** Design-level preferences */
    preferences?: {
      /** List of available layers */
      layers: object;
    };
    /** List of relationships between components */
    relationships: {
      /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
      id?: string;
      /** Specifies the version of the schema used for the relationship definition. */
      schemaVersion: string;
      /** A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1. */
      version: string;
      /** Name of the model in which this relationship is packaged. */
      model: {
        /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
        id?: string;
        /** Specifies the version of the schema used for the definition. */
        schemaVersion?: string;
        /** Version of the model definition. */
        version: string;
        /** The unique name for the model within the scope of a registrant. */
        name: string;
        /** Human-readable name for the model. */
        displayName?: string;
        /** Description of the model. */
        description?: string;
        /** Status of model, including:
                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                - maintenance: model is unavailable for a period of time.
                - enabled: model is available for use for all users of this Meshery Server.
                - ignored: model is unavailable for use for all users of this Meshery Server. */
        status?: "ignored" | "enabled" | "duplicate";
        /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
        registrant: {
          /** ID */
          id?: string;
          /** Connection Name */
          name?: string;
          /** Credential ID */
          credential_id?: string;
          /** Connection Type */
          type: string;
          /** Connection Subtype */
          sub_type?: string;
          /** Connection Kind */
          kind: string;
          metadata?: object;
          /** Connection Status */
          status:
            | "discovered"
            | "registered"
            | "connected"
            | "ignored"
            | "maintenance"
            | "disconnected"
            | "deleted"
            | "not found";
          /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string;
        };
        /** Category of the model. */
        category: {
          /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
          id?: string;
          name?: string;
          metadata?: object;
        };
        /** Sub-category of the model. */
        subCategory?: string;
        /** Metadata containing additional information associated with the model. */
        metadata?: {
          /** Capabilities associated with the model */
          capabilities?: {
            /** Specifies the version of the schema to which the capability definition conforms. */
            schemaVersion: string;
            /** Version of the capability definition. */
            version: string;
            /** Name of the capability in human-readible format. */
            displayName: string;
            /** A written representation of the purpose and characteristics of the capability. */
            description?: string;
            /** Top-level categorization of the capability */
            kind: "action" | "mutate" | "view" | "interaction";
            /** Classification of capabilities. Used to group capabilities similar in nature. */
            type: string;
            /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Relaationship. */
            subType?:
              | "inventory"
              | "matchLabels"
              | "permission"
              | "network"
              | "firewall"
              | "mount"
              | "alias"
              | "annotation"
              | "reference";
            /** Key that backs the capability. */
            key?: string;
            /** State of the entity in which the capability is applicable. */
            entityState: ("declaration" | "instance")[];
            /** Status of the capability */
            status: "enabled" | "disabled";
            /** Metadata contains additional information associated with the capability. Extension point. */
            metadata?: {
              [key: string]: any;
            };
          }[];
          /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
          isAnnotation?: boolean;
          /** Primary color associated with the model. */
          primaryColor?: string;
          /** Secondary color associated with the model. */
          secondaryColor?: string;
          /** SVG representation of the model in white color. */
          svgWhite?: string;
          /** SVG representation of the model in colored format. */
          svgColor?: string;
          /** SVG representation of the complete model. */
          svgComplete?: string;
          [key: string]: any;
        };
        /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
        model?: {
          /** Version of the model as defined by the registrant. */
          version: string;
        };
      };
      /** Kind of the Relationship. Learn more about relationships - https://docs.meshery.io/concepts/logical/relationships. */
      kind: "hierarchical" | "edge" | "sibling";
      /** Classification of relationships. Used to group relationships similar in nature. */
      type: string;
      /** Most granular unit of relationship classification. The combination of Kind, Type and SubType together uniquely identify a Relationship. */
      subType: string;
      /** Status of the relationship. */
      status?: "pending" | "approved" | "ignored" | "enabled" | "deleted";
      /** Optional. Assigns the policy to be used for the evaluation of the relationship. Deprecation Notice: In the future, this property is either to be removed or to it is to be an array of optional policy $refs. */
      evaluationQuery?: string;
      /** Capabilities associated with the relationship. */
      capabilities?: {
        /** Specifies the version of the schema to which the capability definition conforms. */
        schemaVersion: string;
        /** Version of the capability definition. */
        version: string;
        /** Name of the capability in human-readible format. */
        displayName: string;
        /** A written representation of the purpose and characteristics of the capability. */
        description?: string;
        /** Top-level categorization of the capability */
        kind: "action" | "mutate" | "view" | "interaction";
        /** Classification of capabilities. Used to group capabilities similar in nature. */
        type: string;
        /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
        subType?: string;
        /** Key that backs the capability. */
        key?: string;
        /** State of the entity in which the capability is applicable. */
        entityState: ("declaration" | "instance")[];
        /** Status of the capability */
        status: "enabled" | "disabled";
        /** Metadata contains additional information associated with the capability. Extension point. */
        metadata?: {
          [key: string]: any;
        };
      }[];
      /** Metadata contains additional information associated with the Relationship. */
      metadata?: {
        /** Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management. */
        description?: string;
        /** Indicates whether the relationship should be treated as a logical representation only */
        isAnnotation?: boolean;
        styles?:
          | ({
              /** Primary color of the component used for UI representation. */
              primaryColor: string;
              /** Secondary color of the entity used for UI representation. */
              secondaryColor?: string;
              /** White SVG of the entity used for UI representation on dark background. */
              svgWhite: string;
              /** Colored SVG of the entity used for UI representation on light background. */
              svgColor: string;
              /** Complete SVG of the entity used for UI representation, often inclusive of background. */
              svgComplete?: string;
              /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
              color?: string;
              /** The opacity of the label text, including its outline. */
              "text-opacity"?: number;
              /** A comma-separated list of font names to use on the label text. */
              "font-family"?: string;
              /** The size of the label text. */
              "font-size"?: string;
              /** A CSS font style to be applied to the label text. */
              "font-style"?: string;
              /** A CSS font weight to be applied to the label text. */
              "font-weight"?: string;
              /** A transformation to apply to the label text */
              "text-transform"?: "none" | "uppercase" | "lowercase";
              /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility */
              opacity?: number;
              /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
              "z-index"?: number;
              /** The text to display for an element’s label. Can give a path, e.g. data(id) will label with the elements id */
              label?: string;
            } & {
              /** The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc . */
              "edge-animation"?: string;
              /** The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges. */
              "curve-style"?: "straight" | "haystack" | "bezier" | "unbundled-bezier" | "segments" | "taxi";
              /** The colour of the edge’s line. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
              "line-color"?: string;
              /** The style of the edge’s line. */
              "line-style"?: "solid" | "dotted" | "dashed";
              /** The cap style of the edge’s line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge. */
              "line-cap"?: "butt" | "round" | "square";
              /** The opacity of the edge’s line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents. */
              "line-opacity"?: number;
              /** The colour of the edge’s source arrow. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
              "target-arrow-color"?: string;
              /** The shape of the edge’s source arrow */
              "target-arrow-shape"?:
                | "triangle"
                | "triangle-tee"
                | "circle-triangle"
                | "triangle-cross"
                | "triangle-backcurve"
                | "vee"
                | "tee"
                | "square"
                | "circle"
                | "diamond"
                | "chevron"
                | "none";
              /** The fill state of the edge’s source arrow */
              "target-arrow-fill"?: "filled" | "hollow";
              /** The colour of the edge’s source arrow. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
              "mid-target-arrow-color"?: string;
              /** The shape of the edge’s source arrow */
              "mid-target-arrow-shape"?:
                | "triangle"
                | "triangle-tee"
                | "circle-triangle"
                | "triangle-cross"
                | "triangle-backcurve"
                | "vee"
                | "tee"
                | "square"
                | "circle"
                | "diamond"
                | "chevron"
                | "none";
              /** The fill state of the edge’s source arrow */
              "mid-target-arrow-fill"?: "filled" | "hollow";
              /** Scaling for the arrow size. */
              "arrow-scale"?: number;
              /** The text to display for an edge’s source label. Can give a path, e.g. data(id) will label with the elements id */
              "source-label"?: string;
              /** The text to display for an edge’s target label. Can give a path, e.g. data(id) will label with the elements id */
              "target-label"?: string;
            })
          | {
              /** Primary color of the component used for UI representation. */
              primaryColor: string;
              /** Secondary color of the entity used for UI representation. */
              secondaryColor?: string;
              /** White SVG of the entity used for UI representation on dark background. */
              svgWhite: string;
              /** Colored SVG of the entity used for UI representation on light background. */
              svgColor: string;
              /** Complete SVG of the entity used for UI representation, often inclusive of background. */
              svgComplete?: string;
              /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
              color?: string;
              /** The opacity of the label text, including its outline. */
              "text-opacity"?: number;
              /** A comma-separated list of font names to use on the label text. */
              "font-family"?: string;
              /** The size of the label text. */
              "font-size"?: string;
              /** A CSS font style to be applied to the label text. */
              "font-style"?: string;
              /** A CSS font weight to be applied to the label text. */
              "font-weight"?: string;
              /** A transformation to apply to the label text */
              "text-transform"?: "none" | "uppercase" | "lowercase";
              /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility */
              opacity?: number;
              /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
              "z-index"?: number;
              /** The text to display for an element’s label. Can give a path, e.g. data(id) will label with the elements id */
              label?: string;
            };
        [key: string]: any;
      };
      /** Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved. */
      selectors?: {
        /** Optional selectors used to define relationships which should not be created / is restricted. */
        deny?: {
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          from: {
            kind?: string;
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
              id?: string;
              /** Specifies the version of the schema used for the definition. */
              schemaVersion?: string;
              /** Version of the model definition. */
              version: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Human-readable name for the model. */
              displayName?: string;
              /** Description of the model. */
              description?: string;
              /** Status of model, including:
                            - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                            - maintenance: model is unavailable for a period of time.
                            - enabled: model is available for use for all users of this Meshery Server.
                            - ignored: model is unavailable for use for all users of this Meshery Server. */
              status?: "ignored" | "enabled" | "duplicate";
              /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
              registrant: {
                /** ID */
                id?: string;
                /** Connection Name */
                name?: string;
                /** Credential ID */
                credential_id?: string;
                /** Connection Type */
                type: string;
                /** Connection Subtype */
                sub_type?: string;
                /** Connection Kind */
                kind: string;
                metadata?: object;
                /** Connection Status */
                status:
                  | "discovered"
                  | "registered"
                  | "connected"
                  | "ignored"
                  | "maintenance"
                  | "disconnected"
                  | "deleted"
                  | "not found";
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                user_id?: string;
                created_at?: string;
                updated_at?: string;
                deleted_at?: string;
              };
              /** Category of the model. */
              category: {
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                id?: string;
                name?: string;
                metadata?: object;
              };
              /** Sub-category of the model. */
              subCategory?: string;
              /** Metadata containing additional information associated with the model. */
              metadata?: {
                /** Capabilities associated with the model */
                capabilities?: {
                  /** Specifies the version of the schema to which the capability definition conforms. */
                  schemaVersion: string;
                  /** Version of the capability definition. */
                  version: string;
                  /** Name of the capability in human-readible format. */
                  displayName: string;
                  /** A written representation of the purpose and characteristics of the capability. */
                  description?: string;
                  /** Top-level categorization of the capability */
                  kind: "action" | "mutate" | "view" | "interaction";
                  /** Classification of capabilities. Used to group capabilities similar in nature. */
                  type: string;
                  /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                  subType?: string;
                  /** Key that backs the capability. */
                  key?: string;
                  /** State of the entity in which the capability is applicable. */
                  entityState: ("declaration" | "instance")[];
                  /** Status of the capability */
                  status: "enabled" | "disabled";
                  /** Metadata contains additional information associated with the capability. Extension point. */
                  metadata?: {
                    [key: string]: any;
                  };
                }[];
                /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                isAnnotation?: boolean;
                /** Primary color associated with the model. */
                primaryColor?: string;
                /** Secondary color associated with the model. */
                secondaryColor?: string;
                /** SVG representation of the model in white color. */
                svgWhite?: string;
                /** SVG representation of the model in colored format. */
                svgColor?: string;
                /** SVG representation of the complete model. */
                svgComplete?: string;
                [key: string]: any;
              };
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
              model?: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
            };
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            id?: string;
            match?:
              | string[][]
              | {
                  from?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                  to?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                };
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value. */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
            } & (
              | {
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                }
              | {
                  mutatedRef?: string[][];
                }
            );
          }[];
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          to: {
            kind?: string;
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
              id?: string;
              /** Specifies the version of the schema used for the definition. */
              schemaVersion?: string;
              /** Version of the model definition. */
              version: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Human-readable name for the model. */
              displayName?: string;
              /** Description of the model. */
              description?: string;
              /** Status of model, including:
                            - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                            - maintenance: model is unavailable for a period of time.
                            - enabled: model is available for use for all users of this Meshery Server.
                            - ignored: model is unavailable for use for all users of this Meshery Server. */
              status?: "ignored" | "enabled" | "duplicate";
              /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
              registrant: {
                /** ID */
                id?: string;
                /** Connection Name */
                name?: string;
                /** Credential ID */
                credential_id?: string;
                /** Connection Type */
                type: string;
                /** Connection Subtype */
                sub_type?: string;
                /** Connection Kind */
                kind: string;
                metadata?: object;
                /** Connection Status */
                status:
                  | "discovered"
                  | "registered"
                  | "connected"
                  | "ignored"
                  | "maintenance"
                  | "disconnected"
                  | "deleted"
                  | "not found";
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                user_id?: string;
                created_at?: string;
                updated_at?: string;
                deleted_at?: string;
              };
              /** Category of the model. */
              category: {
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                id?: string;
                name?: string;
                metadata?: object;
              };
              /** Sub-category of the model. */
              subCategory?: string;
              /** Metadata containing additional information associated with the model. */
              metadata?: {
                /** Capabilities associated with the model */
                capabilities?: {
                  /** Specifies the version of the schema to which the capability definition conforms. */
                  schemaVersion: string;
                  /** Version of the capability definition. */
                  version: string;
                  /** Name of the capability in human-readible format. */
                  displayName: string;
                  /** A written representation of the purpose and characteristics of the capability. */
                  description?: string;
                  /** Top-level categorization of the capability */
                  kind: "action" | "mutate" | "view" | "interaction";
                  /** Classification of capabilities. Used to group capabilities similar in nature. */
                  type: string;
                  /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                  subType?: string;
                  /** Key that backs the capability. */
                  key?: string;
                  /** State of the entity in which the capability is applicable. */
                  entityState: ("declaration" | "instance")[];
                  /** Status of the capability */
                  status: "enabled" | "disabled";
                  /** Metadata contains additional information associated with the capability. Extension point. */
                  metadata?: {
                    [key: string]: any;
                  };
                }[];
                /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                isAnnotation?: boolean;
                /** Primary color associated with the model. */
                primaryColor?: string;
                /** Secondary color associated with the model. */
                secondaryColor?: string;
                /** SVG representation of the model in white color. */
                svgWhite?: string;
                /** SVG representation of the model in colored format. */
                svgColor?: string;
                /** SVG representation of the complete model. */
                svgComplete?: string;
                [key: string]: any;
              };
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
              model?: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
            };
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            id?: string;
            match?:
              | string[][]
              | {
                  from?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                  to?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                };
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value. */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
            } & (
              | {
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                }
              | {
                  mutatedRef?: string[][];
                }
            );
          }[];
        };
        /** Selectors used to define relationships which are allowed. */
        allow: {
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          from: {
            kind?: string;
            /** Strategy criterion for determing how to match the values at mutator/mutated paths */
            match_strategy_matrix?: string[][];
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
              id?: string;
              /** Specifies the version of the schema used for the definition. */
              schemaVersion?: string;
              /** Version of the model definition. */
              version: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Human-readable name for the model. */
              displayName?: string;
              /** Description of the model. */
              description?: string;
              /** Status of model, including:
                            - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                            - maintenance: model is unavailable for a period of time.
                            - enabled: model is available for use for all users of this Meshery Server.
                            - ignored: model is unavailable for use for all users of this Meshery Server. */
              status?: "ignored" | "enabled" | "duplicate";
              /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
              registrant: {
                /** ID */
                id?: string;
                /** Connection Name */
                name?: string;
                /** Credential ID */
                credential_id?: string;
                /** Connection Type */
                type: string;
                /** Connection Subtype */
                sub_type?: string;
                /** Connection Kind */
                kind: string;
                metadata?: object;
                /** Connection Status */
                status:
                  | "discovered"
                  | "registered"
                  | "connected"
                  | "ignored"
                  | "maintenance"
                  | "disconnected"
                  | "deleted"
                  | "not found";
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                user_id?: string;
                created_at?: string;
                updated_at?: string;
                deleted_at?: string;
              };
              /** Category of the model. */
              category: {
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                id?: string;
                name?: string;
                metadata?: object;
              };
              /** Sub-category of the model. */
              subCategory?: string;
              /** Metadata containing additional information associated with the model. */
              metadata?: {
                /** Capabilities associated with the model */
                capabilities?: {
                  /** Specifies the version of the schema to which the capability definition conforms. */
                  schemaVersion: string;
                  /** Version of the capability definition. */
                  version: string;
                  /** Name of the capability in human-readible format. */
                  displayName: string;
                  /** A written representation of the purpose and characteristics of the capability. */
                  description?: string;
                  /** Top-level categorization of the capability */
                  kind: "action" | "mutate" | "view" | "interaction";
                  /** Classification of capabilities. Used to group capabilities similar in nature. */
                  type: string;
                  /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                  subType?: string;
                  /** Key that backs the capability. */
                  key?: string;
                  /** State of the entity in which the capability is applicable. */
                  entityState: ("declaration" | "instance")[];
                  /** Status of the capability */
                  status: "enabled" | "disabled";
                  /** Metadata contains additional information associated with the capability. Extension point. */
                  metadata?: {
                    [key: string]: any;
                  };
                }[];
                /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                isAnnotation?: boolean;
                /** Primary color associated with the model. */
                primaryColor?: string;
                /** Secondary color associated with the model. */
                secondaryColor?: string;
                /** SVG representation of the model in white color. */
                svgWhite?: string;
                /** SVG representation of the model in colored format. */
                svgColor?: string;
                /** SVG representation of the complete model. */
                svgComplete?: string;
                [key: string]: any;
              };
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
              model?: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
            };
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            id?: string;
            match?:
              | string[][]
              | {
                  from?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                  to?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                };
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value. */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
            } & (
              | {
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                }
              | {
                  mutatedRef?: string[][];
                }
            );
          }[];
          /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
          to: {
            kind?: string;
            /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
            model?: {
              /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
              id?: string;
              /** Specifies the version of the schema used for the definition. */
              schemaVersion?: string;
              /** Version of the model definition. */
              version: string;
              /** The unique name for the model within the scope of a registrant. */
              name: string;
              /** Human-readable name for the model. */
              displayName?: string;
              /** Description of the model. */
              description?: string;
              /** Status of model, including:
                            - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                            - maintenance: model is unavailable for a period of time.
                            - enabled: model is available for use for all users of this Meshery Server.
                            - ignored: model is unavailable for use for all users of this Meshery Server. */
              status?: "ignored" | "enabled" | "duplicate";
              /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
              registrant: {
                /** ID */
                id?: string;
                /** Connection Name */
                name?: string;
                /** Credential ID */
                credential_id?: string;
                /** Connection Type */
                type: string;
                /** Connection Subtype */
                sub_type?: string;
                /** Connection Kind */
                kind: string;
                metadata?: object;
                /** Connection Status */
                status:
                  | "discovered"
                  | "registered"
                  | "connected"
                  | "ignored"
                  | "maintenance"
                  | "disconnected"
                  | "deleted"
                  | "not found";
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                user_id?: string;
                created_at?: string;
                updated_at?: string;
                deleted_at?: string;
              };
              /** Category of the model. */
              category: {
                /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                id?: string;
                name?: string;
                metadata?: object;
              };
              /** Sub-category of the model. */
              subCategory?: string;
              /** Metadata containing additional information associated with the model. */
              metadata?: {
                /** Capabilities associated with the model */
                capabilities?: {
                  /** Specifies the version of the schema to which the capability definition conforms. */
                  schemaVersion: string;
                  /** Version of the capability definition. */
                  version: string;
                  /** Name of the capability in human-readible format. */
                  displayName: string;
                  /** A written representation of the purpose and characteristics of the capability. */
                  description?: string;
                  /** Top-level categorization of the capability */
                  kind: "action" | "mutate" | "view" | "interaction";
                  /** Classification of capabilities. Used to group capabilities similar in nature. */
                  type: string;
                  /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                  subType?: string;
                  /** Key that backs the capability. */
                  key?: string;
                  /** State of the entity in which the capability is applicable. */
                  entityState: ("declaration" | "instance")[];
                  /** Status of the capability */
                  status: "enabled" | "disabled";
                  /** Metadata contains additional information associated with the capability. Extension point. */
                  metadata?: {
                    [key: string]: any;
                  };
                }[];
                /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                isAnnotation?: boolean;
                /** Primary color associated with the model. */
                primaryColor?: string;
                /** Secondary color associated with the model. */
                secondaryColor?: string;
                /** SVG representation of the model in white color. */
                svgWhite?: string;
                /** SVG representation of the model in colored format. */
                svgColor?: string;
                /** SVG representation of the complete model. */
                svgComplete?: string;
                [key: string]: any;
              };
              /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
              model?: {
                /** Version of the model as defined by the registrant. */
                version: string;
              };
            };
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            id?: string;
            match?:
              | string[][]
              | {
                  from?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                  to?: ({
                    kind?: string;
                    /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                    id?: string;
                  } & (
                    | {
                        /** JSON ref to value from where patch should be applied. */
                        mutatorRef?: string[][];
                      }
                    | {
                        mutatedRef?: string[][];
                      }
                  ))[];
                };
            patch?: {
              /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                            
                            add: Inserts a value into an array or adds a member to an object.
                            replace: Replaces a value.
                            merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                            strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                            remove: Removes a value.
                            copy: Copies a value from one location to another.
                            move: Moves a value from one location to another.
                            test: Tests that a value at the target location is equal to a specified value. */
              patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
            } & (
              | {
                  /** JSON ref to value from where patch should be applied. */
                  mutatorRef?: string[][];
                }
              | {
                  mutatedRef?: string[][];
                }
            );
          }[];
        };
      }[];
    }[];
  };
  /** Hash of the input parameters and configuration used for this evaluation. Useful for identifying duplicate evaluations or caching results. */
  evaluationHash?: string;
  /** ISO 8601 formatted timestamp of when the evaluation was completed. */
  timestamp?: string;
  actions: any;
};
export type PostEvaluateApiArg = {
  body: {
    /** Designs are your primary tool for collaborative authorship of your infrastructure, workflow, and processes. */
    design: {
      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
      id: string;
      /** Name of the design; a descriptive, but concise title for the design document. */
      name: string;
      /** Specifies the version of the schema to which the design conforms. */
      schemaVersion: string;
      /** Revision of the design as expressed by an auto-incremented, SemVer-compliant version number. May be manually set by a user or third-party system, but will always be required to be of version number higher than the previously defined version number. */
      version: string;
      metadata?: {
        /** Map of resolved aliases present in the design */
        resolvedAliases?: {
          [key: string]: {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            relationship_id: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            alias_component_id: string;
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            immediate_parent_id: string;
            immediate_ref_field_path: string[];
          } & {
            /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
            resolved_parent_id: string;
            resolved_ref_field_path: string[];
          };
        };
        [key: string]: any;
      };
      /** A list of one or more component declarations. */
      components: {
        /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
        id: string;
        /** Specifies the version of the schema to which the component definition conforms. */
        schemaVersion: string;
        /** Version of the component definition. */
        version: string;
        /** Name of the component in human-readible format. */
        displayName: string;
        /** A written representation of the purpose and characteristics of the component. */
        description: string;
        /** Format specifies the format used in the `component.schema` field. JSON is the default. */
        format: "JSON" | "CUE";
        /** Reference to the specific registered model to which the component belongs and from which model version, category, and other properties may be referenced. Learn more at https://docs.meshery.io/concepts/models */
        model: {
          /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
          id: string;
          /** Specifies the version of the schema used for the definition. */
          schemaVersion: string;
          /** Version of the model definition. */
          version: string;
          /** The unique name for the model within the scope of a registrant. */
          name: string;
          /** Human-readable name for the model. */
          displayName: string;
          /** Description of the model. */
          description: string;
          /** Status of model, including:
                    - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                    - maintenance: model is unavailable for a period of time.
                    - enabled: model is available for use for all users of this Meshery Server.
                    - ignored: model is unavailable for use for all users of this Meshery Server. */
          status: "ignored" | "enabled" | "duplicate";
          /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
          registrant: {
            /** ID */
            id: string;
            /** Connection Name */
            name: string;
            /** Credential ID */
            credential_id: string;
            /** Connection Type */
            type: string;
            /** Connection Subtype */
            sub_type: string;
            /** Connection Kind */
            kind: string;
            metadata: object;
            /** Connection Status */
            status:
              | "discovered"
              | "registered"
              | "connected"
              | "ignored"
              | "maintenance"
              | "disconnected"
              | "deleted"
              | "not found";
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            user_id: string;
            created_at?: string;
            updated_at?: string;
            deleted_at?: string;
            environments: {
              /** ID */
              id: string;
              /** Environment name */
              name: string;
              /** Environment description */
              description: string;
              /** Environment organization ID */
              organization_id: string;
              /** Environment owner */
              owner: string;
              created_at?: string;
              updated_at?: string;
              deleted_at?: string;
            }[];
          };
          /** ID of the registrant. */
          registrantId: string;
          /** ID of the category. */
          categoryId: string;
          /** Category of the model. */
          category: {
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            id: string;
            /** The category of the model that determines the main grouping. */
            name:
              | "Analytics"
              | "App Definition and Development"
              | "Cloud Native Network"
              | "Cloud Native Storage"
              | "Database"
              | "Machine Learning"
              | "Observability and Analysis"
              | "Orchestration & Management"
              | "Platform"
              | "Provisioning"
              | "Runtime"
              | "Security & Compliance"
              | "Serverless"
              | "Tools"
              | "Uncategorized";
            metadata: object;
          };
          /** Sub category of the model determines the secondary grouping. */
          subCategory:
            | "API Gateway"
            | "API Integration"
            | "Application Definition & Image Build"
            | "Automation & Configuration"
            | "Certified Kubernetes - Distribution"
            | "Chaos Engineering"
            | "Cloud Native Storage"
            | "Cloud Provider"
            | "CNI"
            | "Compute"
            | "Container Registry"
            | "Container Runtime"
            | "Container Security"
            | "Container"
            | "Content Delivery Network"
            | "Continuous Integration & Delivery"
            | "Coordination & Service Discovery"
            | "Database"
            | "Flowchart"
            | "Framework"
            | "Installable Platform"
            | "Key Management"
            | "Key Management Service"
            | "Kubernetes"
            | "Logging"
            | "Machine Learning"
            | "Management Governance"
            | "Metrics"
            | "Monitoring"
            | "Networking Content Delivery"
            | "Operating System"
            | "Query"
            | "Remote Procedure Call"
            | "Scheduling & Orchestration"
            | "Secrets Management"
            | "Security Identity & Compliance"
            | "Service Mesh"
            | "Service Proxy"
            | "Source Version Control"
            | "Storage"
            | "Specifications"
            | "Streaming & Messaging"
            | "Tools"
            | "Tracing"
            | "Uncategorized"
            | "Video Conferencing";
          /** Metadata containing additional information associated with the model. */
          metadata?: {
            /** Capabilities associated with the model */
            capabilities?: {
              /** Specifies the version of the schema to which the capability definition conforms. */
              schemaVersion: string;
              /** Version of the capability definition. */
              version: string;
              /** Name of the capability in human-readible format. */
              displayName: string;
              /** A written representation of the purpose and characteristics of the capability. */
              description: string;
              /** Top-level categorization of the capability */
              kind: "action" | "mutate" | "view" | "interaction";
              /** Classification of capabilities. Used to group capabilities similar in nature. */
              type: string;
              /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
              subType: string;
              /** Key that backs the capability. */
              key: string;
              /** State of the entity in which the capability is applicable. */
              entityState: ("declaration" | "instance")[];
              /** Status of the capability */
              status: "enabled" | "disabled";
              /** Metadata contains additional information associated with the capability. Extension point. */
              metadata?: {
                [key: string]: any;
              };
            }[];
            /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
            isAnnotation?: boolean;
            /** Primary color associated with the model. */
            primaryColor?: string;
            /** Secondary color associated with the model. */
            secondaryColor?: string;
            /** SVG representation of the model in white color. */
            svgWhite: string;
            /** SVG representation of the model in colored format. */
            svgColor: string;
            /** SVG representation of the complete model. */
            svgComplete?: string;
            /** The shape of the node’s body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
            shape?:
              | "circle"
              | "ellipse"
              | "triangle"
              | "round-triangle"
              | "rectangle"
              | "round-rectangle"
              | "bottom-round-rectangle"
              | "cut-rectangle"
              | "barrel"
              | "rhomboid"
              | "diamond"
              | "round-diamond"
              | "pentagon"
              | "round-pentagon"
              | "hexagon"
              | "round-hexagon"
              | "concave-hexagon"
              | "heptagon"
              | "round-heptagon"
              | "octagon"
              | "round-octagon"
              | "star"
              | "tag"
              | "round-tag"
              | "vee"
              | "polygon";
            [key: string]: any;
          };
          /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31). */
          model: {
            /** Version of the model as defined by the registrant. */
            version: string;
          };
          relationships: any;
          components: any;
          /** Number of components associated with the model. */
          componentsCount: number;
          /** Number of relationships associated with the model. */
          relationshipsCount: number;
        };
        /** ModelId is the foreign key to the model to which the component belongs. */
        modelId: string;
        /** Visualization styles for a component */
        styles?: {
          /** Primary color of the component used for UI representation. */
          primaryColor: string;
          /** Secondary color of the entity used for UI representation. */
          secondaryColor?: string;
          /** White SVG of the entity used for UI representation on dark background. */
          svgWhite: string;
          /** Colored SVG of the entity used for UI representation on light background. */
          svgColor: string;
          /** Complete SVG of the entity used for UI representation, often inclusive of background. */
          svgComplete: string;
          /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. */
          color?: string;
          /** The opacity of the label text, including its outline. */
          "text-opacity"?: number;
          /** A comma-separated list of font names to use on the label text. */
          "font-family"?: string;
          /** The size of the label text. */
          "font-size"?: string;
          /** A CSS font style to be applied to the label text. */
          "font-style"?: string;
          /** A CSS font weight to be applied to the label text. */
          "font-weight"?: string;
          /** A transformation to apply to the label text */
          "text-transform"?: "none" | "uppercase" | "lowercase";
          /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children. */
          opacity?: number;
          /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
          "z-index"?: number;
          /** The text to display for an element's label. Can give a path, e.g. data(id) will label with the elements id */
          label?: string;
          /** The animation to apply to the element. example ripple,bounce,etc */
          animation?: object;
          [key: string]: any;
        } & {
          /** The shape of the node's body. Note that each shape fits within the specified width and height, and so you may have to adjust width and height if you desire an equilateral shape (i.e. width !== height for several equilateral shapes) */
          shape:
            | "ellipse"
            | "triangle"
            | "round-triangle"
            | "rectangle"
            | "round-rectangle"
            | "bottom-round-rectangle"
            | "cut-rectangle"
            | "barrel"
            | "rhomboid"
            | "diamond"
            | "round-diamond"
            | "pentagon"
            | "round-pentagon"
            | "hexagon"
            | "round-hexagon"
            | "concave-hexagon"
            | "heptagon"
            | "round-heptagon"
            | "octagon"
            | "round-octagon"
            | "star"
            | "tag"
            | "round-tag"
            | "vee"
            | "polygon";
          /** The position of the node. If the position is set, the node is drawn at that position in the given dimensions. If the position is not set, the node is drawn at a random position. */
          position?: {
            /** The x-coordinate of the node. */
            x: number;
            /** The y-coordinate of the node. */
            y: number;
          };
          /** The text to display for an element's body. Can give a path, e.g. data(id) will label with the elements id */
          "body-text"?: string;
          /** How to wrap the text in the node. Can be 'none', 'wrap', or 'ellipsis'. */
          "body-text-wrap"?: string;
          /** The maximum width for wrapping text in the node. */
          "body-text-max-width"?: string;
          /** The opacity of the node's body text, including its outline. */
          "body-text-opacity"?: number;
          /** The colour of the node's body text background. Colours may be specified by name (e.g. red), hex (e.g. */
          "body-text-background-color"?: string;
          /** The size of the node's body text. */
          "body-text-font-size"?: number;
          /** The colour of the node's body text. Colours may be specified by name (e.g. red), hex (e.g. */
          "body-text-color"?: string;
          /** A CSS font weight to be applied to the node's body text. */
          "body-text-font-weight"?: string;
          /** A CSS horizontal alignment to be applied to the node's body text. */
          "body-text-horizontal-align"?: string;
          /** A CSS text decoration to be applied to the node's body text. */
          "body-text-decoration"?: string;
          /** A CSS vertical alignment to be applied to the node's body text. */
          "body-text-vertical-align"?: string;
          /** The width of the node's body or the width of an edge's line. */
          width?: number;
          /** The height of the node's body */
          height?: number;
          /** The URL that points to the image to show in the node. */
          "background-image"?: string;
          /** The colour of the node's body. Colours may be specified by name (e.g. red), hex (e.g. */
          "background-color"?: string;
          /** Blackens the node's body for values from 0 to 1; whitens the node's body for values from 0 to -1. */
          "background-blacken"?: number;
          /** The opacity level of the node's background colour */
          "background-opacity"?: number;
          /** The x position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-position-x"?: string;
          /** The y position of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-position-y"?: string;
          /** The x offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-offset-x"?: string;
          /** The y offset of the background image, measured in percent (e.g. 50%) or pixels (e.g. 10px) */
          "background-offset-y"?: string;
          /** How the background image is fit to the node. Can be 'none', 'contain', or 'cover'. */
          "background-fit"?: string;
          /** How the background image is clipped to the node. Can be 'none', 'node', or 'node-border'. */
          "background-clip"?: string;
          /** How the background image's width is determined. Can be 'none', 'inner', or 'outer'. */
          "background-width-relative-to"?: string;
          /** How the background image's height is determined. Can be 'none', 'inner', or 'outer'. */
          "background-height-relative-to"?: string;
          /** The size of the node's border. */
          "border-width"?: number;
          /** The style of the node's border */
          "border-style"?: "solid" | "dotted" | "dashed" | "double";
          /** The colour of the node's border. Colours may be specified by name (e.g. red), hex (e.g. */
          "border-color"?: string;
          /** The opacity of the node's border */
          "border-opacity"?: number;
          /** The amount of padding around all sides of the node. */
          padding?: number;
          /** The horizontal alignment of a node's label */
          "text-halign"?: "left" | "center" | "right";
          /** The vertical alignment of a node's label */
          "text-valign"?: "top" | "center" | "bottom";
          /** Whether to use the ghost effect, a semitransparent duplicate of the element drawn at an offset. */
          ghost?: "yes" | "no";
          /** The colour of the indicator shown when the background is grabbed by the user. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
          "active-bg-color"?: string;
          /** The opacity of the active background indicator. Selector needs to be *core*. */
          "active-bg-opacity"?: string;
          /** The opacity of the active background indicator. Selector needs to be *core*. */
          "active-bg-size"?: string;
          /** The background colour of the selection box used for drag selection. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
          "selection-box-color"?: string;
          /** The size of the border on the selection box. Selector needs to be *core* */
          "selection-box-border-width"?: number;
          /** The opacity of the selection box. Selector needs to be *core* */
          "selection-box-opacity"?: number;
          /** The colour of the area outside the viewport texture when initOptions.textureOnViewport === true. Selector needs to be *core*. Colours may be specified by name (e.g. red), hex (e.g. */
          "outside-texture-bg-color"?: string;
          /** The opacity of the area outside the viewport texture. Selector needs to be *core* */
          "outside-texture-bg-opacity"?: number;
          /** An array (or a space-separated string) of numbers ranging on [-1, 1], representing alternating x and y values (i.e. x1 y1 x2 y2, x3 y3 ...). This represents the points in the polygon for the node's shape. The bounding box of the node is given by (-1, -1), (1, -1), (1, 1), (-1, 1). The node's position is the origin (0, 0 ) */
          "shape-polygon-points"?: string;
          /** The colour of the background of the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
          "menu-background-color"?: string;
          /** The opacity of the background of the component menu. */
          "menu-background-opacity"?: number;
          /** The colour of the text or icons in the component menu. Colours may be specified by name (e.g. red), hex (e.g. */
          "menu-forground-color"?: string;
        };
        /** Meshery manages components in accordance with their specific capabilities. This field explicitly identifies those capabilities largely by what actions a given component supports; e.g. metric-scrape, sub-interface, and so on. This field is extensible. ComponentDefinitions may define a broad array of capabilities, which are in-turn dynamically interpretted by Meshery for full lifecycle management. */
        capabilities?: {
          /** Specifies the version of the schema to which the capability definition conforms. */
          schemaVersion: string;
          /** Version of the capability definition. */
          version: string;
          /** Name of the capability in human-readible format. */
          displayName: string;
          /** A written representation of the purpose and characteristics of the capability. */
          description: string;
          /** Top-level categorization of the capability */
          kind: "action" | "mutate" | "view" | "interaction";
          /** Classification of capabilities. Used to group capabilities similar in nature. */
          type: string;
          /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
          subType: string;
          /** Key that backs the capability. */
          key: string;
          /** State of the entity in which the capability is applicable. */
          entityState: ("declaration" | "instance")[];
          /** Status of the capability */
          status: "enabled" | "disabled";
          /** Metadata contains additional information associated with the capability. Extension point. */
          metadata?: {
            [key: string]: any;
          };
        }[];
        /** Status of component, including:
                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                - maintenance: model is unavailable for a period of time.
                - enabled: model is available for use for all users of this Meshery Server.
                - ignored: model is unavailable for use for all users of this Meshery Server. */
        status?: "ignored" | "enabled" | "duplicate" | "resolved" | "open";
        /** Metadata contains additional information associated with the component. */
        metadata: {
          /** Genealogy represents the various representational states of the component. */
          genealogy: string;
          /** Identifies whether the component is semantically meaningful or not; identifies whether the component should be treated as deployable entity or is for purposes of logical representation. */
          isAnnotation: boolean;
          /** Identifies whether the component is scoped to namespace or clsuter wide. */
          isNamespaced: boolean;
          /** 'published' controls whether the component should be registered in Meshery Registry. When the same 'published' property in Models, is set to 'false', the Model property takes precedence with all Entities in the Model not being registered. */
          published: boolean;
          /** InstanceDetails contains information about the instance of the component. */
          instanceDetails: object;
          /** Defines the UI schema for rendering the component's configuration. For more details, visit: https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema/ . */
          configurationUISchema: string;
          [key: string]: any;
        };
        /** The configuration of the component. The configuration is based on the schema defined within the component definition(component.schema). */
        configuration: object;
        /** data related to the third party capability that Component Defintion wraps , this is herematicaly sealed an */
        component: {
          /** Version of the component produced by the registrant. Example: APIVersion of a Kubernetes Pod. */
          version: string;
          /** The unique identifier (name) assigned by the registrant to this component. Example: A Kubernetes Pod is of kind 'Pod'. */
          kind: string;
          /** JSON schema of the object as defined by the registrant. */
          schema: string;
        };
      }[];
      /** Design-level preferences */
      preferences?: {
        /** List of available layers */
        layers: object;
      };
      /** List of relationships between components */
      relationships: {
        /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
        id?: string;
        /** Specifies the version of the schema used for the relationship definition. */
        schemaVersion: string;
        /** A valid semantic version string between 5 and 256 characters. The pattern allows for a major.minor.patch version followed by an optional pre-release tag like '-alpha' or '-beta.2' and an optional build metadata tag like '+build.1. */
        version: string;
        /** Name of the model in which this relationship is packaged. */
        model: {
          /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
          id?: string;
          /** Specifies the version of the schema used for the definition. */
          schemaVersion?: string;
          /** Version of the model definition. */
          version: string;
          /** The unique name for the model within the scope of a registrant. */
          name: string;
          /** Human-readable name for the model. */
          displayName?: string;
          /** Description of the model. */
          description?: string;
          /** Status of model, including:
                    - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                    - maintenance: model is unavailable for a period of time.
                    - enabled: model is available for use for all users of this Meshery Server.
                    - ignored: model is unavailable for use for all users of this Meshery Server. */
          status?: "ignored" | "enabled" | "duplicate";
          /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
          registrant: {
            /** ID */
            id?: string;
            /** Connection Name */
            name?: string;
            /** Credential ID */
            credential_id?: string;
            /** Connection Type */
            type: string;
            /** Connection Subtype */
            sub_type?: string;
            /** Connection Kind */
            kind: string;
            metadata?: object;
            /** Connection Status */
            status:
              | "discovered"
              | "registered"
              | "connected"
              | "ignored"
              | "maintenance"
              | "disconnected"
              | "deleted"
              | "not found";
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            user_id?: string;
            created_at?: string;
            updated_at?: string;
            deleted_at?: string;
          };
          /** Category of the model. */
          category: {
            /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
            id?: string;
            name?: string;
            metadata?: object;
          };
          /** Sub-category of the model. */
          subCategory?: string;
          /** Metadata containing additional information associated with the model. */
          metadata?: {
            /** Capabilities associated with the model */
            capabilities?: {
              /** Specifies the version of the schema to which the capability definition conforms. */
              schemaVersion: string;
              /** Version of the capability definition. */
              version: string;
              /** Name of the capability in human-readible format. */
              displayName: string;
              /** A written representation of the purpose and characteristics of the capability. */
              description?: string;
              /** Top-level categorization of the capability */
              kind: "action" | "mutate" | "view" | "interaction";
              /** Classification of capabilities. Used to group capabilities similar in nature. */
              type: string;
              /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Relaationship. */
              subType?:
                | "inventory"
                | "matchLabels"
                | "permission"
                | "network"
                | "firewall"
                | "mount"
                | "alias"
                | "annotation"
                | "reference";
              /** Key that backs the capability. */
              key?: string;
              /** State of the entity in which the capability is applicable. */
              entityState: ("declaration" | "instance")[];
              /** Status of the capability */
              status: "enabled" | "disabled";
              /** Metadata contains additional information associated with the capability. Extension point. */
              metadata?: {
                [key: string]: any;
              };
            }[];
            /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
            isAnnotation?: boolean;
            /** Primary color associated with the model. */
            primaryColor?: string;
            /** Secondary color associated with the model. */
            secondaryColor?: string;
            /** SVG representation of the model in white color. */
            svgWhite?: string;
            /** SVG representation of the model in colored format. */
            svgColor?: string;
            /** SVG representation of the complete model. */
            svgComplete?: string;
            [key: string]: any;
          };
          /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
          model?: {
            /** Version of the model as defined by the registrant. */
            version: string;
          };
        };
        /** Kind of the Relationship. Learn more about relationships - https://docs.meshery.io/concepts/logical/relationships. */
        kind: "hierarchical" | "edge" | "sibling";
        /** Classification of relationships. Used to group relationships similar in nature. */
        type: string;
        /** Most granular unit of relationship classification. The combination of Kind, Type and SubType together uniquely identify a Relationship. */
        subType: string;
        /** Status of the relationship. */
        status?: "pending" | "approved" | "ignored" | "enabled" | "deleted";
        /** Optional. Assigns the policy to be used for the evaluation of the relationship. Deprecation Notice: In the future, this property is either to be removed or to it is to be an array of optional policy $refs. */
        evaluationQuery?: string;
        /** Capabilities associated with the relationship. */
        capabilities?: {
          /** Specifies the version of the schema to which the capability definition conforms. */
          schemaVersion: string;
          /** Version of the capability definition. */
          version: string;
          /** Name of the capability in human-readible format. */
          displayName: string;
          /** A written representation of the purpose and characteristics of the capability. */
          description?: string;
          /** Top-level categorization of the capability */
          kind: "action" | "mutate" | "view" | "interaction";
          /** Classification of capabilities. Used to group capabilities similar in nature. */
          type: string;
          /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
          subType?: string;
          /** Key that backs the capability. */
          key?: string;
          /** State of the entity in which the capability is applicable. */
          entityState: ("declaration" | "instance")[];
          /** Status of the capability */
          status: "enabled" | "disabled";
          /** Metadata contains additional information associated with the capability. Extension point. */
          metadata?: {
            [key: string]: any;
          };
        }[];
        /** Metadata contains additional information associated with the Relationship. */
        metadata?: {
          /** Characterization of the meaning of the relationship and its relevance to both Meshery and entities under management. */
          description?: string;
          /** Indicates whether the relationship should be treated as a logical representation only */
          isAnnotation?: boolean;
          styles?:
            | ({
                /** Primary color of the component used for UI representation. */
                primaryColor: string;
                /** Secondary color of the entity used for UI representation. */
                secondaryColor?: string;
                /** White SVG of the entity used for UI representation on dark background. */
                svgWhite: string;
                /** Colored SVG of the entity used for UI representation on light background. */
                svgColor: string;
                /** Complete SVG of the entity used for UI representation, often inclusive of background. */
                svgComplete?: string;
                /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
                color?: string;
                /** The opacity of the label text, including its outline. */
                "text-opacity"?: number;
                /** A comma-separated list of font names to use on the label text. */
                "font-family"?: string;
                /** The size of the label text. */
                "font-size"?: string;
                /** A CSS font style to be applied to the label text. */
                "font-style"?: string;
                /** A CSS font weight to be applied to the label text. */
                "font-weight"?: string;
                /** A transformation to apply to the label text */
                "text-transform"?: "none" | "uppercase" | "lowercase";
                /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility */
                opacity?: number;
                /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
                "z-index"?: number;
                /** The text to display for an element’s label. Can give a path, e.g. data(id) will label with the elements id */
                label?: string;
              } & {
                /** The animation to use for the edge. Can be like 'marching-ants' , 'blink' , 'moving-gradient',etc . */
                "edge-animation"?: string;
                /** The curving method used to separate two or more edges between two nodes; may be haystack (very fast, bundled straight edges for which loops and compounds are unsupported), straight (straight edges with all arrows supported), bezier (bundled curved edges), unbundled-bezier (curved edges for use with manual control points), segments (a series of straight lines), taxi (right-angled lines, hierarchically bundled). Note that haystack edges work best with ellipse, rectangle, or similar nodes. Smaller node shapes, like triangle, will not be as aesthetically pleasing. Also note that edge endpoint arrows are unsupported for haystack edges. */
                "curve-style"?: "straight" | "haystack" | "bezier" | "unbundled-bezier" | "segments" | "taxi";
                /** The colour of the edge’s line. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
                "line-color"?: string;
                /** The style of the edge’s line. */
                "line-style"?: "solid" | "dotted" | "dashed";
                /** The cap style of the edge’s line; may be butt (default), round, or square. The cap may or may not be visible, depending on the shape of the node and the relative size of the node and edge. Caps other than butt extend beyond the specified endpoint of the edge. */
                "line-cap"?: "butt" | "round" | "square";
                /** The opacity of the edge’s line and arrow. Useful if you wish to have a separate opacity for the edge label versus the edge line. Note that the opacity value of the edge element affects the effective opacity of its line and label subcomponents. */
                "line-opacity"?: number;
                /** The colour of the edge’s source arrow. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
                "target-arrow-color"?: string;
                /** The shape of the edge’s source arrow */
                "target-arrow-shape"?:
                  | "triangle"
                  | "triangle-tee"
                  | "circle-triangle"
                  | "triangle-cross"
                  | "triangle-backcurve"
                  | "vee"
                  | "tee"
                  | "square"
                  | "circle"
                  | "diamond"
                  | "chevron"
                  | "none";
                /** The fill state of the edge’s source arrow */
                "target-arrow-fill"?: "filled" | "hollow";
                /** The colour of the edge’s source arrow. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
                "mid-target-arrow-color"?: string;
                /** The shape of the edge’s source arrow */
                "mid-target-arrow-shape"?:
                  | "triangle"
                  | "triangle-tee"
                  | "circle-triangle"
                  | "triangle-cross"
                  | "triangle-backcurve"
                  | "vee"
                  | "tee"
                  | "square"
                  | "circle"
                  | "diamond"
                  | "chevron"
                  | "none";
                /** The fill state of the edge’s source arrow */
                "mid-target-arrow-fill"?: "filled" | "hollow";
                /** Scaling for the arrow size. */
                "arrow-scale"?: number;
                /** The text to display for an edge’s source label. Can give a path, e.g. data(id) will label with the elements id */
                "source-label"?: string;
                /** The text to display for an edge’s target label. Can give a path, e.g. data(id) will label with the elements id */
                "target-label"?: string;
              })
            | {
                /** Primary color of the component used for UI representation. */
                primaryColor: string;
                /** Secondary color of the entity used for UI representation. */
                secondaryColor?: string;
                /** White SVG of the entity used for UI representation on dark background. */
                svgWhite: string;
                /** Colored SVG of the entity used for UI representation on light background. */
                svgColor: string;
                /** Complete SVG of the entity used for UI representation, often inclusive of background. */
                svgComplete?: string;
                /** The color of the element's label. Colours may be specified by name (e.g. red), hex (e.g. #ff0000 or #f00), RGB (e.g. rgb(255, 0, 0)), or HSL (e.g. hsl(0, 100%, 50%)). */
                color?: string;
                /** The opacity of the label text, including its outline. */
                "text-opacity"?: number;
                /** A comma-separated list of font names to use on the label text. */
                "font-family"?: string;
                /** The size of the label text. */
                "font-size"?: string;
                /** A CSS font style to be applied to the label text. */
                "font-style"?: string;
                /** A CSS font weight to be applied to the label text. */
                "font-weight"?: string;
                /** A transformation to apply to the label text */
                "text-transform"?: "none" | "uppercase" | "lowercase";
                /** The opacity of the element, ranging from 0 to 1. Note that the opacity of a compound node parent affects the effective opacity of its children.See https://js.cytoscape.org/#style/visibility */
                opacity?: number;
                /** An integer value that affects the relative draw order of elements. In general, an element with a higher z-index will be drawn on top of an element with a lower z-index. Note that edges are under nodes despite z-index. */
                "z-index"?: number;
                /** The text to display for an element’s label. Can give a path, e.g. data(id) will label with the elements id */
                label?: string;
              };
          [key: string]: any;
        };
        /** Selectors are organized as an array, with each item containing a distinct set of selectors that share a common functionality. This structure allows for flexibility in defining relationships, even when different components are involved. */
        selectors?: {
          /** Optional selectors used to define relationships which should not be created / is restricted. */
          deny?: {
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            from: {
              kind?: string;
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
                id?: string;
                /** Specifies the version of the schema used for the definition. */
                schemaVersion?: string;
                /** Version of the model definition. */
                version: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Human-readable name for the model. */
                displayName?: string;
                /** Description of the model. */
                description?: string;
                /** Status of model, including:
                                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                                - maintenance: model is unavailable for a period of time.
                                - enabled: model is available for use for all users of this Meshery Server.
                                - ignored: model is unavailable for use for all users of this Meshery Server. */
                status?: "ignored" | "enabled" | "duplicate";
                /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
                registrant: {
                  /** ID */
                  id?: string;
                  /** Connection Name */
                  name?: string;
                  /** Credential ID */
                  credential_id?: string;
                  /** Connection Type */
                  type: string;
                  /** Connection Subtype */
                  sub_type?: string;
                  /** Connection Kind */
                  kind: string;
                  metadata?: object;
                  /** Connection Status */
                  status:
                    | "discovered"
                    | "registered"
                    | "connected"
                    | "ignored"
                    | "maintenance"
                    | "disconnected"
                    | "deleted"
                    | "not found";
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  user_id?: string;
                  created_at?: string;
                  updated_at?: string;
                  deleted_at?: string;
                };
                /** Category of the model. */
                category: {
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  id?: string;
                  name?: string;
                  metadata?: object;
                };
                /** Sub-category of the model. */
                subCategory?: string;
                /** Metadata containing additional information associated with the model. */
                metadata?: {
                  /** Capabilities associated with the model */
                  capabilities?: {
                    /** Specifies the version of the schema to which the capability definition conforms. */
                    schemaVersion: string;
                    /** Version of the capability definition. */
                    version: string;
                    /** Name of the capability in human-readible format. */
                    displayName: string;
                    /** A written representation of the purpose and characteristics of the capability. */
                    description?: string;
                    /** Top-level categorization of the capability */
                    kind: "action" | "mutate" | "view" | "interaction";
                    /** Classification of capabilities. Used to group capabilities similar in nature. */
                    type: string;
                    /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                    subType?: string;
                    /** Key that backs the capability. */
                    key?: string;
                    /** State of the entity in which the capability is applicable. */
                    entityState: ("declaration" | "instance")[];
                    /** Status of the capability */
                    status: "enabled" | "disabled";
                    /** Metadata contains additional information associated with the capability. Extension point. */
                    metadata?: {
                      [key: string]: any;
                    };
                  }[];
                  /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                  isAnnotation?: boolean;
                  /** Primary color associated with the model. */
                  primaryColor?: string;
                  /** Secondary color associated with the model. */
                  secondaryColor?: string;
                  /** SVG representation of the model in white color. */
                  svgWhite?: string;
                  /** SVG representation of the model in colored format. */
                  svgColor?: string;
                  /** SVG representation of the complete model. */
                  svgComplete?: string;
                  [key: string]: any;
                };
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
                model?: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
              };
              /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
              id?: string;
              match?:
                | string[][]
                | {
                    from?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                    to?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                  };
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value. */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              } & (
                | {
                    /** JSON ref to value from where patch should be applied. */
                    mutatorRef?: string[][];
                  }
                | {
                    mutatedRef?: string[][];
                  }
              );
            }[];
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            to: {
              kind?: string;
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
                id?: string;
                /** Specifies the version of the schema used for the definition. */
                schemaVersion?: string;
                /** Version of the model definition. */
                version: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Human-readable name for the model. */
                displayName?: string;
                /** Description of the model. */
                description?: string;
                /** Status of model, including:
                                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                                - maintenance: model is unavailable for a period of time.
                                - enabled: model is available for use for all users of this Meshery Server.
                                - ignored: model is unavailable for use for all users of this Meshery Server. */
                status?: "ignored" | "enabled" | "duplicate";
                /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
                registrant: {
                  /** ID */
                  id?: string;
                  /** Connection Name */
                  name?: string;
                  /** Credential ID */
                  credential_id?: string;
                  /** Connection Type */
                  type: string;
                  /** Connection Subtype */
                  sub_type?: string;
                  /** Connection Kind */
                  kind: string;
                  metadata?: object;
                  /** Connection Status */
                  status:
                    | "discovered"
                    | "registered"
                    | "connected"
                    | "ignored"
                    | "maintenance"
                    | "disconnected"
                    | "deleted"
                    | "not found";
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  user_id?: string;
                  created_at?: string;
                  updated_at?: string;
                  deleted_at?: string;
                };
                /** Category of the model. */
                category: {
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  id?: string;
                  name?: string;
                  metadata?: object;
                };
                /** Sub-category of the model. */
                subCategory?: string;
                /** Metadata containing additional information associated with the model. */
                metadata?: {
                  /** Capabilities associated with the model */
                  capabilities?: {
                    /** Specifies the version of the schema to which the capability definition conforms. */
                    schemaVersion: string;
                    /** Version of the capability definition. */
                    version: string;
                    /** Name of the capability in human-readible format. */
                    displayName: string;
                    /** A written representation of the purpose and characteristics of the capability. */
                    description?: string;
                    /** Top-level categorization of the capability */
                    kind: "action" | "mutate" | "view" | "interaction";
                    /** Classification of capabilities. Used to group capabilities similar in nature. */
                    type: string;
                    /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                    subType?: string;
                    /** Key that backs the capability. */
                    key?: string;
                    /** State of the entity in which the capability is applicable. */
                    entityState: ("declaration" | "instance")[];
                    /** Status of the capability */
                    status: "enabled" | "disabled";
                    /** Metadata contains additional information associated with the capability. Extension point. */
                    metadata?: {
                      [key: string]: any;
                    };
                  }[];
                  /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                  isAnnotation?: boolean;
                  /** Primary color associated with the model. */
                  primaryColor?: string;
                  /** Secondary color associated with the model. */
                  secondaryColor?: string;
                  /** SVG representation of the model in white color. */
                  svgWhite?: string;
                  /** SVG representation of the model in colored format. */
                  svgColor?: string;
                  /** SVG representation of the complete model. */
                  svgComplete?: string;
                  [key: string]: any;
                };
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
                model?: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
              };
              /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
              id?: string;
              match?:
                | string[][]
                | {
                    from?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                    to?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                  };
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value. */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              } & (
                | {
                    /** JSON ref to value from where patch should be applied. */
                    mutatorRef?: string[][];
                  }
                | {
                    mutatedRef?: string[][];
                  }
              );
            }[];
          };
          /** Selectors used to define relationships which are allowed. */
          allow: {
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            from: {
              kind?: string;
              /** Strategy criterion for determing how to match the values at mutator/mutated paths */
              match_strategy_matrix?: string[][];
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
                id?: string;
                /** Specifies the version of the schema used for the definition. */
                schemaVersion?: string;
                /** Version of the model definition. */
                version: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Human-readable name for the model. */
                displayName?: string;
                /** Description of the model. */
                description?: string;
                /** Status of model, including:
                                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                                - maintenance: model is unavailable for a period of time.
                                - enabled: model is available for use for all users of this Meshery Server.
                                - ignored: model is unavailable for use for all users of this Meshery Server. */
                status?: "ignored" | "enabled" | "duplicate";
                /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
                registrant: {
                  /** ID */
                  id?: string;
                  /** Connection Name */
                  name?: string;
                  /** Credential ID */
                  credential_id?: string;
                  /** Connection Type */
                  type: string;
                  /** Connection Subtype */
                  sub_type?: string;
                  /** Connection Kind */
                  kind: string;
                  metadata?: object;
                  /** Connection Status */
                  status:
                    | "discovered"
                    | "registered"
                    | "connected"
                    | "ignored"
                    | "maintenance"
                    | "disconnected"
                    | "deleted"
                    | "not found";
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  user_id?: string;
                  created_at?: string;
                  updated_at?: string;
                  deleted_at?: string;
                };
                /** Category of the model. */
                category: {
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  id?: string;
                  name?: string;
                  metadata?: object;
                };
                /** Sub-category of the model. */
                subCategory?: string;
                /** Metadata containing additional information associated with the model. */
                metadata?: {
                  /** Capabilities associated with the model */
                  capabilities?: {
                    /** Specifies the version of the schema to which the capability definition conforms. */
                    schemaVersion: string;
                    /** Version of the capability definition. */
                    version: string;
                    /** Name of the capability in human-readible format. */
                    displayName: string;
                    /** A written representation of the purpose and characteristics of the capability. */
                    description?: string;
                    /** Top-level categorization of the capability */
                    kind: "action" | "mutate" | "view" | "interaction";
                    /** Classification of capabilities. Used to group capabilities similar in nature. */
                    type: string;
                    /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                    subType?: string;
                    /** Key that backs the capability. */
                    key?: string;
                    /** State of the entity in which the capability is applicable. */
                    entityState: ("declaration" | "instance")[];
                    /** Status of the capability */
                    status: "enabled" | "disabled";
                    /** Metadata contains additional information associated with the capability. Extension point. */
                    metadata?: {
                      [key: string]: any;
                    };
                  }[];
                  /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                  isAnnotation?: boolean;
                  /** Primary color associated with the model. */
                  primaryColor?: string;
                  /** Secondary color associated with the model. */
                  secondaryColor?: string;
                  /** SVG representation of the model in white color. */
                  svgWhite?: string;
                  /** SVG representation of the model in colored format. */
                  svgColor?: string;
                  /** SVG representation of the complete model. */
                  svgComplete?: string;
                  [key: string]: any;
                };
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
                model?: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
              };
              /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
              id?: string;
              match?:
                | string[][]
                | {
                    from?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                    to?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                  };
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value. */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              } & (
                | {
                    /** JSON ref to value from where patch should be applied. */
                    mutatorRef?: string[][];
                  }
                | {
                    mutatedRef?: string[][];
                  }
              );
            }[];
            /** Describes the component(s) which are involved in the relationship along with a set of actions to perform upon selection match. */
            to: {
              kind?: string;
              /** Name of the model implicated by this selector. Learn more at https://docs.meshery.io/concepts/models */
              model?: {
                /** Uniquely identifies the entity (i.e. component) as defined in a declaration (i.e. design). */
                id?: string;
                /** Specifies the version of the schema used for the definition. */
                schemaVersion?: string;
                /** Version of the model definition. */
                version: string;
                /** The unique name for the model within the scope of a registrant. */
                name: string;
                /** Human-readable name for the model. */
                displayName?: string;
                /** Description of the model. */
                description?: string;
                /** Status of model, including:
                                - duplicate: this component is a duplicate of another. The component that is to be the canonical reference and that is duplicated by other components should not be assigned the 'duplicate' status.
                                - maintenance: model is unavailable for a period of time.
                                - enabled: model is available for use for all users of this Meshery Server.
                                - ignored: model is unavailable for use for all users of this Meshery Server. */
                status?: "ignored" | "enabled" | "duplicate";
                /** Meshery Connections are managed and unmanaged resources that either through discovery or manual entry are tracked by Meshery. Learn more at https://docs.meshery.io/concepts/logical/connections */
                registrant: {
                  /** ID */
                  id?: string;
                  /** Connection Name */
                  name?: string;
                  /** Credential ID */
                  credential_id?: string;
                  /** Connection Type */
                  type: string;
                  /** Connection Subtype */
                  sub_type?: string;
                  /** Connection Kind */
                  kind: string;
                  metadata?: object;
                  /** Connection Status */
                  status:
                    | "discovered"
                    | "registered"
                    | "connected"
                    | "ignored"
                    | "maintenance"
                    | "disconnected"
                    | "deleted"
                    | "not found";
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  user_id?: string;
                  created_at?: string;
                  updated_at?: string;
                  deleted_at?: string;
                };
                /** Category of the model. */
                category: {
                  /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                  id?: string;
                  name?: string;
                  metadata?: object;
                };
                /** Sub-category of the model. */
                subCategory?: string;
                /** Metadata containing additional information associated with the model. */
                metadata?: {
                  /** Capabilities associated with the model */
                  capabilities?: {
                    /** Specifies the version of the schema to which the capability definition conforms. */
                    schemaVersion: string;
                    /** Version of the capability definition. */
                    version: string;
                    /** Name of the capability in human-readible format. */
                    displayName: string;
                    /** A written representation of the purpose and characteristics of the capability. */
                    description?: string;
                    /** Top-level categorization of the capability */
                    kind: "action" | "mutate" | "view" | "interaction";
                    /** Classification of capabilities. Used to group capabilities similar in nature. */
                    type: string;
                    /** Most granular unit of capability classification. The combination of Kind, Type and SubType together uniquely identify a Capability. */
                    subType?: string;
                    /** Key that backs the capability. */
                    key?: string;
                    /** State of the entity in which the capability is applicable. */
                    entityState: ("declaration" | "instance")[];
                    /** Status of the capability */
                    status: "enabled" | "disabled";
                    /** Metadata contains additional information associated with the capability. Extension point. */
                    metadata?: {
                      [key: string]: any;
                    };
                  }[];
                  /** Indicates whether the model and its entities should be treated as deployable entities or as logical representations. */
                  isAnnotation?: boolean;
                  /** Primary color associated with the model. */
                  primaryColor?: string;
                  /** Secondary color associated with the model. */
                  secondaryColor?: string;
                  /** SVG representation of the model in white color. */
                  svgWhite?: string;
                  /** SVG representation of the model in colored format. */
                  svgColor?: string;
                  /** SVG representation of the complete model. */
                  svgComplete?: string;
                  [key: string]: any;
                };
                /** Registrant-defined data associated with the model. Properties pertain to the software being managed (e.g. Kubernetes v1.31) */
                model?: {
                  /** Version of the model as defined by the registrant. */
                  version: string;
                };
              };
              /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
              id?: string;
              match?:
                | string[][]
                | {
                    from?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                    to?: ({
                      kind?: string;
                      /** A Universally Unique Identifier used to uniquely identify entites in Meshery. The UUID core defintion is used across different schemas. */
                      id?: string;
                    } & (
                      | {
                          /** JSON ref to value from where patch should be applied. */
                          mutatorRef?: string[][];
                        }
                      | {
                          mutatedRef?: string[][];
                        }
                    ))[];
                  };
              patch?: {
                /** patchStrategy allows you to make specific changes to a resource using a standard JSON Patch format (RFC 6902).
                                
                                add: Inserts a value into an array or adds a member to an object.
                                replace: Replaces a value.
                                merge: Combines the values of the target location with the values from the patch. If the target location doesn't exist, it is created.
                                strategic:specific to Kubernetes and understands the structure of Kubernetes objects. It can handle complex changes like updating lists and maps, as well as preserving default values. However, it's not supported for custom resources. For custom resources, only JSON Patch and Merge Patch are typically supported.
                                remove: Removes a value.
                                copy: Copies a value from one location to another.
                                move: Moves a value from one location to another.
                                test: Tests that a value at the target location is equal to a specified value. */
                patchStrategy?: "merge" | "strategic" | "add" | "remove" | "copy" | "move" | "test";
              } & (
                | {
                    /** JSON ref to value from where patch should be applied. */
                    mutatorRef?: string[][];
                  }
                | {
                    mutatedRef?: string[][];
                  }
              );
            }[];
          };
        }[];
      }[];
    };
    options?: {
      /** If true, only return the diff of changes instead of the complete updated design */
      returnDiffOnly?: boolean;
      /** If true, include detailed trace information in the response */
      enableTrace?: boolean;
    };
  };
};
export const {
  useImportDesignMutation,
  useRegisterMeshmodelsMutation,
  useGetApiWorkspacesQuery,
  usePostApiWorkspacesMutation,
  useGetApiWorkspacesByIdQuery,
  usePutApiWorkspacesByIdMutation,
  useDeleteApiWorkspacesByIdMutation,
  useCreateEnvironmentMutation,
  useGetEnvironmentsQuery,
  usePostEvaluateMutation,
} = injectedRtkApi;

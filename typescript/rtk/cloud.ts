import { cloudBaseApi as api } from "./api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    importDesign: build.mutation<ImportDesignApiResponse, ImportDesignApiArg>({
      query: (queryArg) => ({ url: `/api/pattern/import`, method: "POST", body: queryArg.body }),
    }),
    registerMeshmodels: build.mutation<RegisterMeshmodelsApiResponse, RegisterMeshmodelsApiArg>({
      query: (queryArg) => ({ url: `/api/meshmodels/register`, method: "POST", body: queryArg.body }),
    }),
    getSubscriptions: build.query<GetSubscriptionsApiResponse, GetSubscriptionsApiArg>({
      query: (queryArg) => ({
        url: `/api/entitlement/subscriptions`,
        params: {
          page: queryArg.page,
          pagesize: queryArg.pagesize,
          order: queryArg.order,
          status: queryArg.status,
        },
      }),
    }),
    postApiEntitlementSubscriptionsBySubscriptionIdCancel: build.mutation<
      PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiResponse,
      PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiArg
    >({
      query: (queryArg) => ({
        url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/cancel`,
        method: "POST",
      }),
    }),
    postApiEntitlementSubscriptionsCreate: build.mutation<
      PostApiEntitlementSubscriptionsCreateApiResponse,
      PostApiEntitlementSubscriptionsCreateApiArg
    >({
      query: (queryArg) => ({ url: `/api/entitlement/subscriptions/create`, method: "POST", body: queryArg.body }),
    }),
    postApiEntitlementSubscriptionsWebhooks: build.mutation<
      PostApiEntitlementSubscriptionsWebhooksApiResponse,
      PostApiEntitlementSubscriptionsWebhooksApiArg
    >({
      query: (queryArg) => ({ url: `/api/entitlement/subscriptions/webhooks`, method: "POST", body: queryArg.body }),
    }),
    getPlans: build.query<GetPlansApiResponse, GetPlansApiArg>({
      query: () => ({ url: `/api/entitlement/plans` }),
    }),
    getFeatures: build.query<GetFeaturesApiResponse, GetFeaturesApiArg>({
      query: () => ({ url: `/api/entitlement/features` }),
    }),
    getFeaturesByOrganization: build.query<GetFeaturesByOrganizationApiResponse, GetFeaturesByOrganizationApiArg>({
      query: (queryArg) => ({
        url: `/api/entitlement/subscriptions/organizations/${queryArg.organizationId}/features`,
      }),
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
    getMyAcademyCirricula: build.query<GetMyAcademyCirriculaApiResponse, GetMyAcademyCirriculaApiArg>({
      query: (queryArg) => ({
        url: `/api/academy/cirricula/registered`,
        params: {
          contentType: queryArg.contentType,
          orgId: queryArg.orgId,
        },
      }),
    }),
    getAcademyCirricula: build.query<GetAcademyCirriculaApiResponse, GetAcademyCirriculaApiArg>({
      query: (queryArg) => ({
        url: `/api/academy/cirricula`,
        params: {
          contentType: queryArg.contentType,
          visibility: queryArg.visibility,
          level: queryArg.level,
          orgId: queryArg.orgId,
          category: queryArg.category,
          status: queryArg.status,
          search: queryArg.search,
        },
      }),
    }),
    getApiAcademyByTypeAndOrgIdSlug: build.query<
      GetApiAcademyByTypeAndOrgIdSlugApiResponse,
      GetApiAcademyByTypeAndOrgIdSlugApiArg
    >({
      query: (queryArg) => ({ url: `/api/academy/${queryArg["type"]}/${queryArg.orgId}/${queryArg.slug}` }),
    }),
    registerToAcademyContent: build.mutation<RegisterToAcademyContentApiResponse, RegisterToAcademyContentApiArg>({
      query: (queryArg) => ({ url: `/api/academy/register`, method: "POST", body: queryArg.body }),
    }),
    getApiAcademyRegistrationsByContentId: build.query<
      GetApiAcademyRegistrationsByContentIdApiResponse,
      GetApiAcademyRegistrationsByContentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/academy/registrations/${queryArg.contentId}`,
        params: {
          status: queryArg.status,
        },
      }),
    }),
    updateCurrentItemInProgressTracker: build.mutation<
      UpdateCurrentItemInProgressTrackerApiResponse,
      UpdateCurrentItemInProgressTrackerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/academy/registrations/${queryArg.registrationId}/progress-tracker/update-current-item`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    submitQuiz: build.mutation<SubmitQuizApiResponse, SubmitQuizApiArg>({
      query: (queryArg) => ({ url: `/api/academy/quiz/submit`, method: "POST", body: queryArg.body }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as cloudApi };
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
export type GetSubscriptionsApiResponse = /** status 200 Get subscription response */ {
  page: number;
  page_size: number;
  total_count: number;
  subscriptions: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    ID: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    org_id: string;
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    plan_id: string;
    plan?: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      id: string;
      /** Name of the plan */
      name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
      cadence: "monthly" | "yearly";
      unit: "user" | "free";
      /** Price per unit of the plan */
      price_per_unit: number;
      currency: "usd";
    };
    quantity: number;
    start_date?: string;
    end_date?: string;
    /** Possible statuses of a Stripe subscription. */
    status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    /** Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe */
    billing_id: string;
  }[];
};
export type GetSubscriptionsApiArg = {
  /** Get responses by page */
  page?: string;
  /** Get responses by pagesize */
  pagesize?: string;
  /** Get ordered responses */
  order?: string;
  /** Filter subscriptions by status */
  status?: string[];
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiResponse =
  /** status 200 Subscription created successfully */ {
    page: number;
    page_size: number;
    total_count: number;
    subscriptions: {
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      ID: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      org_id: string;
      /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
      plan_id: string;
      plan?: {
        /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
        id: string;
        /** Name of the plan */
        name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
        cadence: "monthly" | "yearly";
        unit: "user" | "free";
        /** Price per unit of the plan */
        price_per_unit: number;
        currency: "usd";
      };
      quantity: number;
      start_date?: string;
      end_date?: string;
      /** Possible statuses of a Stripe subscription. */
      status: "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid";
      created_at?: string;
      updated_at?: string;
      deleted_at?: string;
      /** Billing ID of the subscription. This is the ID of the subscription in the billing system. eg Stripe */
      billing_id: string;
    }[];
  };
export type PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiArg = {
  /** Subscription ID */
  subscriptionId: string;
};
export type PostApiEntitlementSubscriptionsCreateApiResponse = /** status 200 Subscription created successfully */ {
  subscription_id?: string;
  clientSecret?: string;
};
export type PostApiEntitlementSubscriptionsCreateApiArg = {
  body: {
    /** Organization ID */
    org_id?: string;
    /** Price ID from the payment processor */
    plan_id?: string;
    /** Number of users in the organization */
    user_count?: number;
    /** Email of the customer */
    email?: string;
    /** Supported payment processors */
    payment_processor?: "stripe" | "paypal" | "braintree";
  };
};
export type PostApiEntitlementSubscriptionsWebhooksApiResponse = unknown;
export type PostApiEntitlementSubscriptionsWebhooksApiArg = {
  body: object;
};
export type GetPlansApiResponse = /** status 200 Plans fetched successfully */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** Name of the plan */
  name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
  cadence: "monthly" | "yearly";
  unit: "user" | "free";
  /** Price per unit of the plan */
  price_per_unit: number;
  currency: "usd";
}[];
export type GetPlansApiArg = void;
export type GetFeaturesApiResponse = /** status 200 Features fetched successfully */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  plan_id: string;
  plan?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Name of the plan */
    name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
    cadence: "monthly" | "yearly";
    unit: "user" | "free";
    /** Price per unit of the plan */
    price_per_unit: number;
    currency: "usd";
  };
  /** Enumeration of possible feature types */
  name?:
    | "ComponentsInDesign"
    | "RelationshipsInDesign"
    | "DesignsInWorkspace"
    | "WorkspacesInOrganization"
    | "ImageSizeInDesign"
    | "SizePerDesign";
  /** Quantity of the feature allowed, use 9999999999 for unlimited */
  quantity: number;
  created_at?: string;
  updated_at?: string;
}[];
export type GetFeaturesApiArg = void;
export type GetFeaturesByOrganizationApiResponse = /** status 200 Features fetched successfully */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  plan_id: string;
  plan?: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** Name of the plan */
    name: "Free" | "Team Designer" | "Team Operator" | "Enterprise";
    cadence: "monthly" | "yearly";
    unit: "user" | "free";
    /** Price per unit of the plan */
    price_per_unit: number;
    currency: "usd";
  };
  /** Enumeration of possible feature types */
  name?:
    | "ComponentsInDesign"
    | "RelationshipsInDesign"
    | "DesignsInWorkspace"
    | "WorkspacesInOrganization"
    | "ImageSizeInDesign"
    | "SizePerDesign";
  /** Quantity of the feature allowed, use 9999999999 for unlimited */
  quantity: number;
  created_at?: string;
  updated_at?: string;
}[];
export type GetFeaturesByOrganizationApiArg = {
  /** The ID of the organization */
  organizationId: string;
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
  owner?: string;
  created_at?: string;
  metadata?: object;
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
    owner?: string;
    created_at?: string;
    metadata?: object;
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
export type GetMyAcademyCirriculaApiResponse = unknown;
export type GetMyAcademyCirriculaApiArg = {
  /** Filter content by content types */
  contentType?: string[];
  /** Filter content by organization IDs */
  orgId?: string[];
};
export type GetAcademyCirriculaApiResponse = unknown;
export type GetAcademyCirriculaApiArg = {
  /** Filter content by content types */
  contentType?: string[];
  /** Filter content by visibility (public/private) */
  visibility?: string[];
  /** Filter content by difficulty level */
  level?: string[];
  /** Filter content by organization IDs */
  orgId?: string[];
  /** Filter content by categories */
  category?: string[];
  /** Filter by registration status */
  status?: string[];
  /** Search content by title */
  search?: string;
};
export type GetApiAcademyByTypeAndOrgIdSlugApiResponse = /** status 200 A single academy content */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "exam";
  /** Organization ID that owns this learning path */
  orgId: string;
  /** Visibility of the cirricula */
  visibility: "public" | "private";
  /** Status of the cirricula */
  status: "ready" | "archived" | "not_ready";
  /** slug of the cirricula */
  slug: string;
  /** Level of the cirricula */
  level: "beginner" | "intermediate" | "advanced";
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata:
    | {
        /** Title of the learning path */
        title: string;
        /** Description of the learning path */
        description: string;
        /** Optional banner image */
        banner?: string | null;
        /** Canonical URL for the learning path */
        permalink: string;
        /** List of courses in this learning path */
        courses?: {
          /** Unique identifier for the course */
          id: string;
          /** Title of the course */
          title: string;
          /** URL to the course content */
          permalink: string;
          /** Course description */
          description: string;
          /** Order of the course in the list */
          weight?: number;
          /** Optional banner image */
          banner?: string | null;
        }[];
        [key: string]: any;
      }
    | {
        /** Title of the learning path */
        title: string;
        /** Description of the learning path */
        description: string;
        /** Optional banner image */
        banner?: string | null;
        /** Canonical URL for the learning path */
        permalink: string;
        /** List of courses in this learning path */
        courses?: {
          /** Unique identifier for the course */
          id: string;
          /** Title of the course */
          title: string;
          /** URL to the course content */
          permalink: string;
          /** Course description */
          description: string;
          /** Order of the course in the list */
          weight?: number;
          /** Optional banner image */
          banner?: string | null;
        }[];
        [key: string]: any;
      };
};
export type GetApiAcademyByTypeAndOrgIdSlugApiArg = {
  type: string;
  orgId: string;
  slug: string;
};
export type RegisterToAcademyContentApiResponse = /** status 200 registered content */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** ID of the organization */
  org_id: string;
  /** ID of the course content */
  content_id: string;
  /** ID of the user (foreign key to User) */
  user_id: string;
  /** Status of the user's course registration */
  status: "registered" | "in_progress" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updated_at: string;
  /** When the registration was created */
  created_at: string;
  /** Timestamp when the resource was deleted. */
  deleted_at?: string;
  /** Additional metadata about the registration */
  metadata: {
    [key: string]: any;
  };
};
export type RegisterToAcademyContentApiArg = {
  body: {
    /** ID of the academy content to register for */
    content_id: string;
    content_type?: "learning-path" | "challenge" | "exam";
  };
};
export type GetApiAcademyRegistrationsByContentIdApiResponse =
  /** status 200 Registration data for the specified content */ {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** ID of the organization */
    org_id: string;
    /** ID of the course content */
    content_id: string;
    /** ID of the user (foreign key to User) */
    user_id: string;
    /** Status of the user's course registration */
    status: "registered" | "in_progress" | "completed" | "failed" | "withdrawn";
    /** When the registration was updated */
    updated_at: string;
    /** When the registration was created */
    created_at: string;
    /** Timestamp when the resource was deleted. */
    deleted_at?: string;
    /** Additional metadata about the registration */
    metadata: {
      [key: string]: any;
    };
  };
export type GetApiAcademyRegistrationsByContentIdApiArg = {
  /** The ID of the content to retrieve registration data for */
  contentId: string;
  /** Filter registrations by status (e.g., registered, completed) */
  status?: string;
};
export type UpdateCurrentItemInProgressTrackerApiResponse =
  /** status 200 Successfully updated the progress tracker */ {
    message?: string;
    progress_tracker?: {
      current_item: {
        [key: string]: {
          id: string;
          last_opened: string;
          content_type: "learning-path" | "challenge" | "exam";
        };
      };
      grades: {
        [key: string]: {
          score: number;
          passed: boolean;
          percentage_scored: number;
          total_marks: number;
          pass_percentage: number;
          correct_submissions: {
            [key: string]: boolean;
          };
          quiz: {
            id: string;
            title: string;
            description: string;
            slug: string;
            relPermalink: string;
            permalink: string;
            type: string;
            section: string;
            layout: string;
            date: string;
            lastmod: string;
            draft: boolean;
            file_path: string;
            pass_percentage: number;
            time_limit: string;
            questions: {
              id: string;
              text: string;
              type: "mcq" | "short_answer" | "essay";
              marks: number;
              multiple_answers: boolean;
              options: {
                id: string;
                text: string;
                is_correct: boolean;
              }[];
              correct_answer: string;
            }[];
            total_questions: number;
            total_marks: number;
            parent?: {
              id: string;
              title: string;
              relPermalink: string;
              type: string;
            };
          };
          attempted_at: string;
          attempts: number;
        };
      };
      /** Total time spent in seconds */
      time_spent: number;
      completed: string;
    };
    registration_id?: string;
    content_type?: "learning-path" | "challenge" | "exam";
    item_data?: {
      id: string;
      last_opened: string;
      content_type: "learning-path" | "challenge" | "exam";
    };
  };
export type UpdateCurrentItemInProgressTrackerApiArg = {
  /** The ID of the registration */
  registrationId: string;
  body: {
    content_type: "learning-path" | "challenge" | "exam";
    item_data: {
      id: string;
      last_opened: string;
      content_type: "learning-path" | "challenge" | "exam";
    };
  };
};
export type SubmitQuizApiResponse = /** status 200 Successfully updated the progress tracker */ {
  score: number;
  passed: boolean;
  percentage_scored: number;
  total_marks: number;
  pass_percentage: number;
  correct_submissions: {
    [key: string]: boolean;
  };
  quiz: {
    id: string;
    title: string;
    description: string;
    slug: string;
    relPermalink: string;
    permalink: string;
    type: string;
    section: string;
    layout: string;
    date: string;
    lastmod: string;
    draft: boolean;
    file_path: string;
    pass_percentage: number;
    time_limit: string;
    questions: {
      id: string;
      text: string;
      type: "mcq" | "short_answer" | "essay";
      marks: number;
      multiple_answers: boolean;
      options: {
        id: string;
        text: string;
        is_correct: boolean;
      }[];
      correct_answer: string;
    }[];
    total_questions: number;
    total_marks: number;
    parent?: {
      id: string;
      title: string;
      relPermalink: string;
      type: string;
    };
  };
  attempted_at: string;
  attempts: number;
};
export type SubmitQuizApiArg = {
  body: {
    quiz_abs_path: string;
    registration_id: string;
    user_id: string;
    answers: {
      question_id: string;
      selected_option_id: {
        [key: string]: boolean;
      };
      answer_text: string;
    }[];
  };
};
export const {
  useImportDesignMutation,
  useRegisterMeshmodelsMutation,
  useGetSubscriptionsQuery,
  usePostApiEntitlementSubscriptionsBySubscriptionIdCancelMutation,
  usePostApiEntitlementSubscriptionsCreateMutation,
  usePostApiEntitlementSubscriptionsWebhooksMutation,
  useGetPlansQuery,
  useGetFeaturesQuery,
  useGetFeaturesByOrganizationQuery,
  useGetApiWorkspacesQuery,
  usePostApiWorkspacesMutation,
  useGetApiWorkspacesByIdQuery,
  usePutApiWorkspacesByIdMutation,
  useDeleteApiWorkspacesByIdMutation,
  useCreateEnvironmentMutation,
  useGetEnvironmentsQuery,
  useGetMyAcademyCirriculaQuery,
  useGetAcademyCirriculaQuery,
  useGetApiAcademyByTypeAndOrgIdSlugQuery,
  useRegisterToAcademyContentMutation,
  useGetApiAcademyRegistrationsByContentIdQuery,
  useUpdateCurrentItemInProgressTrackerMutation,
  useSubmitQuizMutation,
} = injectedRtkApi;

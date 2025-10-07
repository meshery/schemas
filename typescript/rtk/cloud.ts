import { cloudBaseApi as api } from "./api";
export const addTagTypes = [
  "design_other",
  "model_other",
  "subscription_subscription",
  "subscription_other",
  "plan_Plans",
  "feature_Features",
  "workspace_workspaces",
  "environment_environments",
  "Academy_API_Academy",
  "Academy_API_other",
  "invitation_Invitation",
  "badge_Badge",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      importDesign: build.mutation<ImportDesignApiResponse, ImportDesignApiArg>({
        query: (queryArg) => ({ url: `/api/pattern/import`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["design_other"],
      }),
      registerMeshmodels: build.mutation<RegisterMeshmodelsApiResponse, RegisterMeshmodelsApiArg>({
        query: (queryArg) => ({ url: `/api/meshmodels/register`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["model_other"],
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
        providesTags: ["subscription_subscription"],
      }),
      postApiEntitlementSubscriptionsBySubscriptionIdCancel: build.mutation<
        PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiResponse,
        PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/cancel`,
          method: "POST",
        }),
        invalidatesTags: ["subscription_other"],
      }),
      postApiEntitlementSubscriptionsCreate: build.mutation<
        PostApiEntitlementSubscriptionsCreateApiResponse,
        PostApiEntitlementSubscriptionsCreateApiArg
      >({
        query: (queryArg) => ({ url: `/api/entitlement/subscriptions/create`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["subscription_other"],
      }),
      postApiEntitlementSubscriptionsBySubscriptionIdUpgrade: build.mutation<
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiResponse,
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/upgrade`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["subscription_other"],
      }),
      postApiEntitlementSubscriptionsBySubscriptionIdUpgradePreview: build.mutation<
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiResponse,
        PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiArg
      >({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/${queryArg.subscriptionId}/upgradePreview`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["subscription_other"],
      }),
      postApiEntitlementSubscriptionsWebhooks: build.mutation<
        PostApiEntitlementSubscriptionsWebhooksApiResponse,
        PostApiEntitlementSubscriptionsWebhooksApiArg
      >({
        query: (queryArg) => ({ url: `/api/entitlement/subscriptions/webhooks`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["subscription_other"],
      }),
      getPlans: build.query<GetPlansApiResponse, GetPlansApiArg>({
        query: () => ({ url: `/api/entitlement/plans` }),
        providesTags: ["plan_Plans"],
      }),
      getFeatures: build.query<GetFeaturesApiResponse, GetFeaturesApiArg>({
        query: () => ({ url: `/api/entitlement/features` }),
        providesTags: ["feature_Features"],
      }),
      getFeaturesByOrganization: build.query<GetFeaturesByOrganizationApiResponse, GetFeaturesByOrganizationApiArg>({
        query: (queryArg) => ({
          url: `/api/entitlement/subscriptions/organizations/${queryArg.organizationId}/features`,
        }),
        providesTags: ["feature_Features"],
      }),
      getApiWorkspaces: build.query<GetApiWorkspacesApiResponse, GetApiWorkspacesApiArg>({
        query: () => ({ url: `/api/workspaces` }),
        providesTags: ["workspace_workspaces"],
      }),
      postApiWorkspaces: build.mutation<PostApiWorkspacesApiResponse, PostApiWorkspacesApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["workspace_workspaces"],
      }),
      getApiWorkspacesById: build.query<GetApiWorkspacesByIdApiResponse, GetApiWorkspacesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}` }),
        providesTags: ["workspace_workspaces"],
      }),
      putApiWorkspacesById: build.mutation<PutApiWorkspacesByIdApiResponse, PutApiWorkspacesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["workspace_workspaces"],
      }),
      deleteApiWorkspacesById: build.mutation<DeleteApiWorkspacesByIdApiResponse, DeleteApiWorkspacesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/workspaces/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["workspace_workspaces"],
      }),
      createEnvironment: build.mutation<CreateEnvironmentApiResponse, CreateEnvironmentApiArg>({
        query: (queryArg) => ({ url: `/api/environments`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["environment_environments"],
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
        providesTags: ["environment_environments"],
      }),
      getMyAcademyCirricula: build.query<GetMyAcademyCirriculaApiResponse, GetMyAcademyCirriculaApiArg>({
        query: (queryArg) => ({
          url: `/api/academy/cirricula/registered`,
          params: {
            contentType: queryArg.contentType,
            orgId: queryArg.orgId,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      createAcademyCurricula: build.mutation<CreateAcademyCurriculaApiResponse, CreateAcademyCurriculaApiArg>({
        query: (queryArg) => ({ url: `/api/academy/curricula`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
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
            sort: queryArg.sort,
            order: queryArg.order,
            pagesize: queryArg.pagesize,
            page: queryArg.page,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      getApiAcademyByTypeAndOrgIdSlug: build.query<
        GetApiAcademyByTypeAndOrgIdSlugApiResponse,
        GetApiAcademyByTypeAndOrgIdSlugApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/${queryArg["type"]}/${queryArg.orgId}/${queryArg.slug}` }),
        providesTags: ["Academy_API_other"],
      }),
      registerToAcademyContent: build.mutation<RegisterToAcademyContentApiResponse, RegisterToAcademyContentApiArg>({
        query: (queryArg) => ({ url: `/api/academy/register`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      withdrawFromAcademyContent: build.mutation<
        WithdrawFromAcademyContentApiResponse,
        WithdrawFromAcademyContentApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/curricula/registrations/${queryArg.id}/withdraw`, method: "POST" }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      updateAcademyCurriculaById: build.mutation<
        UpdateAcademyCurriculaByIdApiResponse,
        UpdateAcademyCurriculaByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/curricula/${queryArg.id}`, method: "PUT", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      deleteAcademyCurriculaById: build.mutation<
        DeleteAcademyCurriculaByIdApiResponse,
        DeleteAcademyCurriculaByIdApiArg
      >({
        query: (queryArg) => ({ url: `/api/academy/curricula/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAcademyCurriculaById: build.query<GetAcademyCurriculaByIdApiResponse, GetAcademyCurriculaByIdApiArg>({
        query: (queryArg) => ({ url: `/api/academy/curricula/${queryArg.id}` }),
        providesTags: ["Academy_API_Academy"],
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
        providesTags: ["Academy_API_Academy"],
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
        invalidatesTags: ["Academy_API_Academy"],
      }),
      submitQuiz: build.mutation<SubmitQuizApiResponse, SubmitQuizApiArg>({
        query: (queryArg) => ({ url: `/api/academy/quiz/submit`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["Academy_API_Academy"],
      }),
      getAcademyAdminSummary: build.query<GetAcademyAdminSummaryApiResponse, GetAcademyAdminSummaryApiArg>({
        query: () => ({ url: `/api/academy/admin/summary` }),
        providesTags: ["Academy_API_Academy"],
      }),
      getAcademyAdminRegistrations: build.query<
        GetAcademyAdminRegistrationsApiResponse,
        GetAcademyAdminRegistrationsApiArg
      >({
        query: (queryArg) => ({
          url: `/api/academy/admin/registrations`,
          params: {
            pagesize: queryArg.pagesize,
            page: queryArg.page,
            content_type: queryArg.contentType,
            status: queryArg.status,
          },
        }),
        providesTags: ["Academy_API_Academy"],
      }),
      getCertificateById: build.query<GetCertificateByIdApiResponse, GetCertificateByIdApiArg>({
        query: (queryArg) => ({ url: `/api/academy/certificates/${queryArg.certificateId}` }),
        providesTags: ["Academy_API_Academy"],
      }),
      getInvitation: build.query<GetInvitationApiResponse, GetInvitationApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/invitations/${queryArg.invitationId}` }),
        providesTags: ["invitation_Invitation"],
      }),
      deleteInvitation: build.mutation<DeleteInvitationApiResponse, DeleteInvitationApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/invitations/${queryArg.invitationId}`, method: "DELETE" }),
        invalidatesTags: ["invitation_Invitation"],
      }),
      updateInvitation: build.mutation<UpdateInvitationApiResponse, UpdateInvitationApiArg>({
        query: (queryArg) => ({
          url: `/api/organizations/invitations/${queryArg.invitationId}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["invitation_Invitation"],
      }),
      getInvitations: build.query<GetInvitationsApiResponse, GetInvitationsApiArg>({
        query: () => ({ url: `/api/organizations/invitations` }),
        providesTags: ["invitation_Invitation"],
      }),
      createInvitation: build.mutation<CreateInvitationApiResponse, CreateInvitationApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/invitations`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["invitation_Invitation"],
      }),
      acceptInvitation: build.mutation<AcceptInvitationApiResponse, AcceptInvitationApiArg>({
        query: (queryArg) => ({
          url: `/api/organizations/invitations/${queryArg.invitationId}/accept`,
          method: "POST",
        }),
        invalidatesTags: ["invitation_Invitation"],
      }),
      deleteBadgeById: build.mutation<DeleteBadgeByIdApiResponse, DeleteBadgeByIdApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges/${queryArg.id}`, method: "DELETE" }),
        invalidatesTags: ["badge_Badge"],
      }),
      getBadgeById: build.query<GetBadgeByIdApiResponse, GetBadgeByIdApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges/${queryArg.id}` }),
        providesTags: ["badge_Badge"],
      }),
      createOrUpdateBadge: build.mutation<CreateOrUpdateBadgeApiResponse, CreateOrUpdateBadgeApiArg>({
        query: (queryArg) => ({ url: `/api/organizations/badges`, method: "POST", body: queryArg.body }),
        invalidatesTags: ["badge_Badge"],
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
      /** Minimum number of units required for the plan */
      minimum_units: number;
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
export type PostApiEntitlementSubscriptionsBySubscriptionIdCancelApiResponse = /** status 200 undefined */ {
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
      /** Minimum number of units required for the plan */
      minimum_units: number;
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
export type PostApiEntitlementSubscriptionsCreateApiResponse = /** status 200 A new subscription has been created */ {
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
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiResponse = /** status 200 undefined */ {
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
    /** Minimum number of units required for the plan */
    minimum_units: number;
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
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradeApiArg = {
  /** Subscription ID */
  subscriptionId: string;
  body: {
    /** Old Plan id that is being changed */
    old_plan_id?: string;
    /** New Plan id that is being changed to */
    new_plan_id?: string;
  };
};
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiResponse =
  /** status 200 Preview of the upgraded subscription invoice */ object;
export type PostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewApiArg = {
  /** Subscription ID */
  subscriptionId: string;
  body: {
    /** Old Plan id that is being changed */
    old_plan_id?: string;
    /** New Plan id that is being changed to */
    new_plan_id?: string;
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
  /** Minimum number of units required for the plan */
  minimum_units: number;
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
    /** Minimum number of units required for the plan */
    minimum_units: number;
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
    /** Minimum number of units required for the plan */
    minimum_units: number;
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
export type CreateAcademyCurriculaApiResponse = /** status 201 created the curricula */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
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
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Description of the learning path */
    description: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** UUID of the organization that issued the certificate */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
};
export type CreateAcademyCurriculaApiArg = {
  body: {
    /** Type of the curricula */
    type: "learning-path" | "challenge" | "certification";
    /** Title of the curricula */
    title: string;
    /** Organization ID that owns this curricula */
    orgId: string;
    /** ID of the workspace to which this cirricula belongs */
    workspace_id: string;
    /** ID of the badge to be awarded on completion of this curricula */
    badge_id?: string;
    /** ID of the team associated with this curricula */
    team_id: string;
    /** Expiry time for curricula access */
    access_expires_at?: string;
    /** Current access status of the curricula */
    access_status: "enabled" | "disabled";
    /** Additional metadata about the cirricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Description of the learning path */
      description: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** UUID of the organization that issued the certificate */
        org_id: string;
        /** ID of the recipient (user) who received the certificate */
        recipient_id: string;
        /** Name of the recipient (user) who received the certificate */
        recipient_name: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuing_authorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signature_url?: string;
        }[];
        /** Date when the certificate was issued */
        issued_date: string;
        /** Date when the certificate expires (optional) */
        expiration_date?: string;
      };
      /** List of children items in the top-level curricula */
      children?: {
        /** Unique identifier for the course */
        id: string;
        /** Title of the course */
        title: string;
        /** URL to the course content */
        permalink: string;
        /** Course description */
        description: string;
        /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
        weight?: number;
        /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
        banner?: string | null;
        /** Type of the content (e.g., learning-path, challenge, certification) */
        type?: "learning-path" | "challenge" | "certification";
        /** List of child nodes (sub-courses or modules) */
        children?: object[];
      }[];
      [key: string]: any;
    };
  };
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
  /** Sort results by a specific field (e.g., title, createdAt) */
  sort?: string;
  /** Order of sorting (asc or desc) */
  order?: "asc" | "desc";
  /** Number of results per page */
  pagesize?: number;
  /** Page number */
  page?: number;
};
export type GetApiAcademyByTypeAndOrgIdSlugApiResponse = /** status 200 A single academy content */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
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
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Description of the learning path */
    description: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** UUID of the organization that issued the certificate */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
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
  status: "registered" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updated_at: string;
  /** When the registration was created */
  created_at: string;
  /** Timestamp when the resource was deleted. */
  deleted_at?: string;
  /** Issued certificate for completing the curricula under registration */
  certificate: {
    /** Unique identifier for the certificate */
    id: string;
    /** UUID of the organization that issued the certificate */
    org_id: string;
    /** ID of the recipient (user) who received the certificate */
    recipient_id: string;
    /** Name of the recipient (user) who received the certificate */
    recipient_name: string;
    /** Title of the certificate */
    title: string;
    /** Description of the certificate */
    description: string;
    /** List of issuing authorities for the certificate */
    issuing_authorities: {
      /** Name of the issuing authority */
      name: string;
      /** Role of the issuing authority */
      role?: string;
      /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
      signature_url?: string;
    }[];
    /** Date when the certificate was issued */
    issued_date: string;
    /** Date when the certificate expires (optional) */
    expiration_date?: string;
  };
  /** Test submissions made by the user (map of test IDs to Submissions) */
  test_submissions: {
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
        /** Organization ID that owns this quiz */
        orgId: string;
        /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
        final: boolean;
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
          type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
          marks: number;
          multiple_answers?: boolean;
          options: {
            id: string;
            text: string;
            is_correct: boolean;
          }[];
          correct_answer: string;
        }[];
        total_questions: number;
        total_marks: number;
        prerequisites: {
          id: string;
          title: string;
          relPermalink: string;
          type: string;
        }[];
        parent?: {
          id: string;
          title: string;
          relPermalink: string;
          type: string;
        };
      };
      attempted_at: string;
      attempts: number;
    }[];
  };
  /** Additional metadata about the registration */
  metadata: {
    [key: string]: any;
  };
};
export type RegisterToAcademyContentApiArg = {
  body: {
    /** ID of the academy content to register for */
    content_id: string;
    content_type?: "learning-path" | "challenge" | "certification";
  };
};
export type WithdrawFromAcademyContentApiResponse = /** status 200 registered content */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** ID of the organization */
  org_id: string;
  /** ID of the course content */
  content_id: string;
  /** ID of the user (foreign key to User) */
  user_id: string;
  /** Status of the user's course registration */
  status: "registered" | "completed" | "failed" | "withdrawn";
  /** When the registration was updated */
  updated_at: string;
  /** When the registration was created */
  created_at: string;
  /** Timestamp when the resource was deleted. */
  deleted_at?: string;
  /** Issued certificate for completing the curricula under registration */
  certificate: {
    /** Unique identifier for the certificate */
    id: string;
    /** UUID of the organization that issued the certificate */
    org_id: string;
    /** ID of the recipient (user) who received the certificate */
    recipient_id: string;
    /** Name of the recipient (user) who received the certificate */
    recipient_name: string;
    /** Title of the certificate */
    title: string;
    /** Description of the certificate */
    description: string;
    /** List of issuing authorities for the certificate */
    issuing_authorities: {
      /** Name of the issuing authority */
      name: string;
      /** Role of the issuing authority */
      role?: string;
      /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
      signature_url?: string;
    }[];
    /** Date when the certificate was issued */
    issued_date: string;
    /** Date when the certificate expires (optional) */
    expiration_date?: string;
  };
  /** Test submissions made by the user (map of test IDs to Submissions) */
  test_submissions: {
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
        /** Organization ID that owns this quiz */
        orgId: string;
        /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
        final: boolean;
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
          type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
          marks: number;
          multiple_answers?: boolean;
          options: {
            id: string;
            text: string;
            is_correct: boolean;
          }[];
          correct_answer: string;
        }[];
        total_questions: number;
        total_marks: number;
        prerequisites: {
          id: string;
          title: string;
          relPermalink: string;
          type: string;
        }[];
        parent?: {
          id: string;
          title: string;
          relPermalink: string;
          type: string;
        };
      };
      attempted_at: string;
      attempts: number;
    }[];
  };
  /** Additional metadata about the registration */
  metadata: {
    [key: string]: any;
  };
};
export type WithdrawFromAcademyContentApiArg = {
  /** The ID of the curricula */
  id: string;
};
export type UpdateAcademyCurriculaByIdApiResponse = /** status 200 updated the curricula */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
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
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Description of the learning path */
    description: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** UUID of the organization that issued the certificate */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
} & {
  RegistrationCount: number;
  Invitation?: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type UpdateAcademyCurriculaByIdApiArg = {
  /** The ID of the curricula */
  id: string;
  body: {
    /** Type of the curricula */
    type: "learning-path" | "challenge" | "certification";
    /** Title of the curricula */
    title: string;
    /** Organization ID that owns this curricula */
    orgId: string;
    /** ID of the workspace to which this cirricula belongs */
    workspace_id: string;
    /** ID of the badge to be awarded on completion of this curricula */
    badge_id?: string;
    /** ID of the team associated with this curricula */
    team_id: string;
    /** Expiry time for curricula access */
    access_expires_at?: string;
    /** Current access status of the curricula */
    access_status: "enabled" | "disabled";
    /** Additional metadata about the cirricula */
    metadata: {
      /** Title of the learning path */
      title: string;
      /** Description of the learning path */
      description: string;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Canonical URL for the learning path */
      permalink: string;
      certificate?: {
        /** Unique identifier for the certificate */
        id: string;
        /** UUID of the organization that issued the certificate */
        org_id: string;
        /** ID of the recipient (user) who received the certificate */
        recipient_id: string;
        /** Name of the recipient (user) who received the certificate */
        recipient_name: string;
        /** Title of the certificate */
        title: string;
        /** Description of the certificate */
        description: string;
        /** List of issuing authorities for the certificate */
        issuing_authorities: {
          /** Name of the issuing authority */
          name: string;
          /** Role of the issuing authority */
          role?: string;
          /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
          signature_url?: string;
        }[];
        /** Date when the certificate was issued */
        issued_date: string;
        /** Date when the certificate expires (optional) */
        expiration_date?: string;
      };
      /** List of children items in the top-level curricula */
      children?: {
        /** Unique identifier for the course */
        id: string;
        /** Title of the course */
        title: string;
        /** URL to the course content */
        permalink: string;
        /** Course description */
        description: string;
        /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
        weight?: number;
        /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
        banner?: string | null;
        /** Type of the content (e.g., learning-path, challenge, certification) */
        type?: "learning-path" | "challenge" | "certification";
        /** List of child nodes (sub-courses or modules) */
        children?: object[];
      }[];
      [key: string]: any;
    };
  };
};
export type DeleteAcademyCurriculaByIdApiResponse = unknown;
export type DeleteAcademyCurriculaByIdApiArg = {
  /** The ID of the curricula */
  id: string;
};
export type GetAcademyCurriculaByIdApiResponse = /** status 200 A single curricula */ {
  /** Id of the cirricula */
  id: string;
  type: "learning-path" | "challenge" | "certification";
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
  /** ID of the badge to be awarded on completion of this curricula */
  badge_id?: string;
  /** ID of the invite associated with this cirricula */
  invite_id?: string;
  /** ID of the workspace to which this cirricula belongs */
  workspace_id?: string;
  /** When the cirricula item was created */
  createdAt: string;
  /** When the cirricula was last updated */
  updatedAt: string;
  /** Timestamp when the resource was deleted. */
  deletedAt: string;
  /** Additional metadata about the cirricula */
  metadata: {
    /** Title of the learning path */
    title: string;
    /** Description of the learning path */
    description: string;
    /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
    banner?: string | null;
    /** Canonical URL for the learning path */
    permalink: string;
    certificate?: {
      /** Unique identifier for the certificate */
      id: string;
      /** UUID of the organization that issued the certificate */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
    };
    /** List of children items in the top-level curricula */
    children?: {
      /** Unique identifier for the course */
      id: string;
      /** Title of the course */
      title: string;
      /** URL to the course content */
      permalink: string;
      /** Course description */
      description: string;
      /** A numeric value to determine the display order. A smaller number appears first. If not specified, items will be sorted alphabetically by title. */
      weight?: number;
      /** Filename of the banner image, which should be placed in the same directory as the _index.md file */
      banner?: string | null;
      /** Type of the content (e.g., learning-path, challenge, certification) */
      type?: "learning-path" | "challenge" | "certification";
      /** List of child nodes (sub-courses or modules) */
      children?: object[];
    }[];
    [key: string]: any;
  };
} & {
  RegistrationCount: number;
  Invitation?: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type GetAcademyCurriculaByIdApiArg = {
  /** The ID of the curricula */
  id: string;
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
    status: "registered" | "completed" | "failed" | "withdrawn";
    /** When the registration was updated */
    updated_at: string;
    /** When the registration was created */
    created_at: string;
    /** Timestamp when the resource was deleted. */
    deleted_at?: string;
    /** Issued certificate for completing the curricula under registration */
    certificate: {
      /** Unique identifier for the certificate */
      id: string;
      /** UUID of the organization that issued the certificate */
      org_id: string;
      /** ID of the recipient (user) who received the certificate */
      recipient_id: string;
      /** Name of the recipient (user) who received the certificate */
      recipient_name: string;
      /** Title of the certificate */
      title: string;
      /** Description of the certificate */
      description: string;
      /** List of issuing authorities for the certificate */
      issuing_authorities: {
        /** Name of the issuing authority */
        name: string;
        /** Role of the issuing authority */
        role?: string;
        /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
        signature_url?: string;
      }[];
      /** Date when the certificate was issued */
      issued_date: string;
      /** Date when the certificate expires (optional) */
      expiration_date?: string;
    };
    /** Test submissions made by the user (map of test IDs to Submissions) */
    test_submissions: {
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
          /** Organization ID that owns this quiz */
          orgId: string;
          /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
          final: boolean;
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
            type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
            marks: number;
            multiple_answers?: boolean;
            options: {
              id: string;
              text: string;
              is_correct: boolean;
            }[];
            correct_answer: string;
          }[];
          total_questions: number;
          total_marks: number;
          prerequisites: {
            id: string;
            title: string;
            relPermalink: string;
            type: string;
          }[];
          parent?: {
            id: string;
            title: string;
            relPermalink: string;
            type: string;
          };
        };
        attempted_at: string;
        attempts: number;
      }[];
    };
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
          content_type: "learning-path" | "challenge" | "certification";
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
            /** Organization ID that owns this quiz */
            orgId: string;
            /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
            final: boolean;
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
              type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
              marks: number;
              multiple_answers?: boolean;
              options: {
                id: string;
                text: string;
                is_correct: boolean;
              }[];
              correct_answer: string;
            }[];
            total_questions: number;
            total_marks: number;
            prerequisites: {
              id: string;
              title: string;
              relPermalink: string;
              type: string;
            }[];
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
      /** Items that have been completed (map of item IDs to item data) */
      completed_items: {
        [key: string]: {
          /** Timestamp when the item was completed */
          completed_at: string;
          item_data: {
            id: string;
            title: string;
            relPermalink: string;
            type: string;
          };
        };
      };
      completed: string;
    };
    registration_id?: string;
    content_type?: "learning-path" | "challenge" | "certification";
    item_data?: {
      id: string;
      last_opened: string;
      content_type: "learning-path" | "challenge" | "certification";
    };
  };
export type UpdateCurrentItemInProgressTrackerApiArg = {
  /** The ID of the registration */
  registrationId: string;
  body: {
    content_type: "learning-path" | "challenge" | "certification";
    item_data: {
      id: string;
      last_opened: string;
      content_type: "learning-path" | "challenge" | "certification";
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
    /** Organization ID that owns this quiz */
    orgId: string;
    /** Indicates if the quiz is final . i.e this quiz will used to evaluate the completion of parent section eg course , module , learning path */
    final: boolean;
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
      type: "multiple-answers" | "single-answer" | "short-answer" | "essay";
      marks: number;
      multiple_answers?: boolean;
      options: {
        id: string;
        text: string;
        is_correct: boolean;
      }[];
      correct_answer: string;
    }[];
    total_questions: number;
    total_marks: number;
    prerequisites: {
      id: string;
      title: string;
      relPermalink: string;
      type: string;
    }[];
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
export type GetAcademyAdminSummaryApiResponse =
  /** status 200 A list of content with total count and registration metrics */ object;
export type GetAcademyAdminSummaryApiArg = void;
export type GetAcademyAdminRegistrationsApiResponse = /** status 200 List of registrations with pagination info */ {
  data: {
    /** Title of the curricula */
    curricula_title: string;
    /** Type of the curricula */
    curricula_type: "learning-path" | "challenge" | "certification";
    /** Permalink of the curricula */
    curricula_permalink: string;
    /** Unique ID of the registration */
    registration_id: string;
    /** Registration status */
    status: "registered" | "completed" | "failed" | "withdrawn";
    /** When the registration was created */
    created_at?: string;
    /** ID of the user */
    user_id: string;
    /** First name of the user */
    user_first_name: string;
    /** Last name of the user */
    user_last_name: string;
    /** Email of the user */
    user_email: string;
    /** Avatar URL of the user */
    user_avatar_url: string;
    /** Total count for pagination */
    total_count: number;
  }[];
  total_count: number;
  page_size: number;
  page: number;
};
export type GetAcademyAdminRegistrationsApiArg = {
  /** Number of results per page */
  pagesize?: number;
  /** Page number */
  page?: number;
  /** Filter by content types */
  contentType?: string[];
  /** Filter by registration status */
  status?: string[];
};
export type GetCertificateByIdApiResponse = /** status 200 A single certificate */ {
  /** Unique identifier for the certificate */
  id: string;
  /** UUID of the organization that issued the certificate */
  org_id: string;
  /** ID of the recipient (user) who received the certificate */
  recipient_id: string;
  /** Name of the recipient (user) who received the certificate */
  recipient_name: string;
  /** Title of the certificate */
  title: string;
  /** Description of the certificate */
  description: string;
  /** List of issuing authorities for the certificate */
  issuing_authorities: {
    /** Name of the issuing authority */
    name: string;
    /** Role of the issuing authority */
    role?: string;
    /** URL to the signature image of the issuing authority should be a publicly accessible URL and transparent PNG or SVG format */
    signature_url?: string;
  }[];
  /** Date when the certificate was issued */
  issued_date: string;
  /** Date when the certificate expires (optional) */
  expiration_date?: string;
};
export type GetCertificateByIdApiArg = {
  /** The ID of the certificate to retrieve */
  certificateId: string;
};
export type GetInvitationApiResponse = /** status 200 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type GetInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
};
export type DeleteInvitationApiResponse = unknown;
export type DeleteInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
};
export type UpdateInvitationApiResponse = /** status 200 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type UpdateInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
  body: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type GetInvitationsApiResponse = /** status 200 undefined */ {
  /** List of invitations */
  data: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  }[];
  /** Total number of invitations available */
  total: number;
};
export type GetInvitationsApiArg = void;
export type CreateInvitationApiResponse = /** status 201 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type CreateInvitationApiArg = {
  body: {
    /** Unique identifier for the invitation , is also used as the invitation code */
    id: string;
    /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
    owner_id: string;
    /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
    is_default?: boolean;
    /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
    name: string;
    /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
    description: string;
    emails: string[];
    /** ID of the organization to which the user is invited */
    org_id: string;
    /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
    expires_at?: string;
    /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
    quota?: number;
    /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
    accepted_by: string[];
    roles: string[];
    teams: string[];
    /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
    status: "enabled" | "disabled";
    /** Timestamp when the invitation was created */
    created_at: string;
    /** Timestamp when the invitation was last updated */
    updated_at: string;
    /** Timestamp when the invitation was deleted, if applicable */
    deleted_at: string;
  };
};
export type AcceptInvitationApiResponse = /** status 200 undefined */ {
  /** Unique identifier for the invitation , is also used as the invitation code */
  id: string;
  /** ID of the user who created the invitation, this is used to track who created the invitation and can be used for auditing purposes */
  owner_id: string;
  /** Indicates whether the invitation is a default invitation (open invite), which can be used to assign users when signing up from fqdn or custom domain, a organization can only have one default invitation */
  is_default?: boolean;
  /** Name of the invitation, which can be used to identify the invitation, required and cant be empty string, */
  name: string;
  /** Description of the invitation, which can be used to provide additional information about the invitation, null or empty string means the invitation does not have a description */
  description: string;
  emails: string[];
  /** ID of the organization to which the user is invited */
  org_id: string;
  /** Timestamp when the invitation expires, if applicable , null or empty string means the invitation does not expire */
  expires_at?: string;
  /** Quota for the invitation, which can be used to limit the number of users that can accept the invitation, null or empty string means the invitation does not have a quota */
  quota?: number;
  /** List of user ids that have already accepted the invitation, null or empty string means the invitation has not been used yet */
  accepted_by: string[];
  roles: string[];
  teams: string[];
  /** Status of the invitation, where enabled means the invitation is active and can be used, disabled means the invitation is no longer valid and is temporarily inactive, disabled invitations can be re-enabled later. */
  status: "enabled" | "disabled";
  /** Timestamp when the invitation was created */
  created_at: string;
  /** Timestamp when the invitation was last updated */
  updated_at: string;
  /** Timestamp when the invitation was deleted, if applicable */
  deleted_at: string;
};
export type AcceptInvitationApiArg = {
  /** The ID of the invitation */
  invitationId: string;
};
export type DeleteBadgeByIdApiResponse = unknown;
export type DeleteBadgeByIdApiArg = {
  /** Unique identifier */
  id: string;
};
export type GetBadgeByIdApiResponse = /** status 200 undefined */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** The ID of the organization in which this badge is available . */
  org_id: string;
  /** unique identifier for the badge ( auto generated ) */
  label: string;
  /** Concise descriptor for the badge or certificate. */
  name: string;
  /** A description of the milestone achieved, often including criteria for receiving this recognition. */
  description: string;
  /** URL to the badge image */
  image_url: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** Timestamp when the resource was deleted, if applicable */
  deleted_at: string;
};
export type GetBadgeByIdApiArg = {
  /** Unique identifier */
  id: string;
};
export type CreateOrUpdateBadgeApiResponse = /** status 201 undefined */ {
  /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
  id: string;
  /** The ID of the organization in which this badge is available . */
  org_id: string;
  /** unique identifier for the badge ( auto generated ) */
  label: string;
  /** Concise descriptor for the badge or certificate. */
  name: string;
  /** A description of the milestone achieved, often including criteria for receiving this recognition. */
  description: string;
  /** URL to the badge image */
  image_url: string;
  /** Timestamp when the resource was created. */
  created_at: string;
  /** Timestamp when the resource was updated. */
  updated_at: string;
  /** Timestamp when the resource was deleted, if applicable */
  deleted_at: string;
};
export type CreateOrUpdateBadgeApiArg = {
  body: {
    /** A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas. */
    id: string;
    /** The ID of the organization in which this badge is available . */
    org_id: string;
    /** unique identifier for the badge ( auto generated ) */
    label: string;
    /** Concise descriptor for the badge or certificate. */
    name: string;
    /** A description of the milestone achieved, often including criteria for receiving this recognition. */
    description: string;
    /** URL to the badge image */
    image_url: string;
    /** Timestamp when the resource was created. */
    created_at: string;
    /** Timestamp when the resource was updated. */
    updated_at: string;
    /** Timestamp when the resource was deleted, if applicable */
    deleted_at: string;
  };
};
export const {
  useImportDesignMutation,
  useRegisterMeshmodelsMutation,
  useGetSubscriptionsQuery,
  usePostApiEntitlementSubscriptionsBySubscriptionIdCancelMutation,
  usePostApiEntitlementSubscriptionsCreateMutation,
  usePostApiEntitlementSubscriptionsBySubscriptionIdUpgradeMutation,
  usePostApiEntitlementSubscriptionsBySubscriptionIdUpgradePreviewMutation,
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
  useCreateAcademyCurriculaMutation,
  useGetAcademyCirriculaQuery,
  useGetApiAcademyByTypeAndOrgIdSlugQuery,
  useRegisterToAcademyContentMutation,
  useWithdrawFromAcademyContentMutation,
  useUpdateAcademyCurriculaByIdMutation,
  useDeleteAcademyCurriculaByIdMutation,
  useGetAcademyCurriculaByIdQuery,
  useGetApiAcademyRegistrationsByContentIdQuery,
  useUpdateCurrentItemInProgressTrackerMutation,
  useSubmitQuizMutation,
  useGetAcademyAdminSummaryQuery,
  useGetAcademyAdminRegistrationsQuery,
  useGetCertificateByIdQuery,
  useGetInvitationQuery,
  useDeleteInvitationMutation,
  useUpdateInvitationMutation,
  useGetInvitationsQuery,
  useCreateInvitationMutation,
  useAcceptInvitationMutation,
  useDeleteBadgeByIdMutation,
  useGetBadgeByIdQuery,
  useCreateOrUpdateBadgeMutation,
} = injectedRtkApi;

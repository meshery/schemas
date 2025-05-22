import yaml
import json
import os

# NOTE: definitions_yaml_content is a very long multi-line string.
# It is critical that the closing triple quotes (""") are ONLY at the very end of the string content,
# and before any subsequent Python code.

definitions_yaml_content = """openapi: 3.1.0
components:
  schemas:
    id:
      type: string
      format: uuid
      x-go-type: uuid.UUID
      x-go-type-import: 
        path: github.com/gofrs/uuid
      x-oapi-codegen-extra-tags:
        db: id
      x-go-name: ID

    system_id: 
      type: string
      format: uuid
      x-go-type: uuid.UUID
      x-go-type-import: 
        path: github.com/gofrs/uuid
      x-oapi-codegen-extra-tags:
        db: system_id  
      x-go-name: SystemID

    user_uuid: 
      type: string
      format: uuid
      x-go-type: uuid.UUID
      x-go-type-import: 
        path: github.com/gofrs/uuid
      x-oapi-codegen-extra-tags:
        db: user_id  
      x-go-name: UserID

    operation_id: 
      type: string
      format: uuid
      x-go-type: uuid.UUID
      x-go-type-import: 
        path: github.com/gofrs/uuid
      x-oapi-codegen-extra-tags:
        db: operation_id  
      x-go-name: OperationID

    user_id:
      type: string
      description: user's email or username

    created_at:
      description: Timestamp when the resource was created.
      x-go-type: time.Time
      type: string
      format: date-time
      x-oapi-codegen-extra-tags:
        db: created_at
    

    updated_at:
      description: Timestamp when the resource was updated.
      x-go-type: time.Time
      type: string
      format: date-time
      x-oapi-codegen-extra-tags:
        db: updated_at
    
    deleted_at:
      description: Timestamp when the resource was deleted.
      x-go-type: time.Time
      type: string
      format: date-time
      x-oapi-codegen-extra-tags:
        db: deleted_at

    username:
      type: string

    provider:
      type: string
      description: One of (meshery-cloud, github, google)

    time:
      type: string
      format: date-time

    email:
        type: string
        format: "email"
        description: email

    text:
      type: string

    avatar_url:
        type: string
        description: Link for profile picture

    map_object:
      type: object
      additionalProperties:
        type: string

    status:
        type: string #oneOf: ["active", "pending", "inactive"]?

    bio:
        type: string

    accepted_terms_at:
        type: string

    emails:
      type: array
      items:
        $ref: '#/components/schemas/email'

    user_ids:
      type: array
      items:
        $ref: '#/components/schemas/id'

    price:
      type: integer
      format: int32

    endpoint:
      $ref: '#/components/schemas/text'
      description: endpoint
      format": "uri"
      pattern: "^https?://"

    empty:
      description: Body for empty request
      type: object
      properties: {}

    nullTime:
      properties:
        time:
          $ref: '#/components/schemas/time'
        valid:
          type: boolean
    
    eventType:
      type: string
      x-oapi-codegen-extra-tags:
        db: event_type

    event:
      description: Defines model for event_trackers
      properties:
        id:
          description: | 
            UUID of the event.
          $ref: "#/components/schemas/id"
        
        user_id:
          $ref: "#/components/schemas/user_uuid"
          description: |
            UUID of the user that initiated the event. In most cases this would be present, but not always.
          

        system_id:
          description: |
            The system from which the request is sourced. In the case of Meshery Server, 
            the ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).
          $ref: "#/components/schemas/system_id"

        operation_id: 
          description: |
            Each Event will have a OperationID. This field is never NULL, which is to say an operation can result in series of events, for eg: Different stages of Pattern Engine / activities of Workflow engine. Each operation (and sub-operation) will have a different operation ID.  
          $ref: "#/components/schemas/operation_id"

        category:
          description: |
            Resource name on which the operation is invoked.
          type: string
          example: pattern
          x-oapi-codegen-extra-tags:
            db: category
        
        action:
          description: |
            Action taken on the resource.
          type: string
          example: deployed
          x-oapi-codegen-extra-tags:
            db: action

        status:
          description: |
           Status for the event. 
          type: string
          enum: [
            "read",
            "unread",
          ]
          x-oapi-codegen-extra-tags:
            db: status

        acted_upon:
          type: string
          format: uuid
          description: |
            UUID of the entity on which the event was performed.
          example: 110020-123230-434231-000213
          x-go-type: uuid.UUID
          x-oapi-codegen-extra-tags:
            db: acted_upon

        description:
          description: |
            A summary/receipt of event that occured.
          type: string
          example: “Prometheus” pattern deployed in K8s ctx “Layer5 Cloud”.
          x-oapi-codegen-extra-tags:
            db: description


        severity:
          description: |
            A set of seven standard event levels.
          type: string
          enum: [
            emergency,
            critical,
            alert,
            error,
            warning,
            debug,
            informational,
            success
          ]
          example: info
          x-oapi-codegen-extra-tags:
            db: severity

        metadata: 
          description: |
            Contains meaningful information, specific to the type of event.
            Structure of metadata can be different for different events.
          type: object
          x-go-type: "[]byte"
          x-oapi-codegen-extra-tags:
            db: metadata

        created_at:
          $ref: "#/components/schemas/created_at"

        updated_at:
          $ref: "#/components/schemas/updated_at"

        deleted_at:
          $ref: "#/components/schemas/deleted_at"
      
      required: [
        "id",
        "system_id",
        "operation_id",
        "category",
        "action",
        "status",
        "acted_upon",
        "description",
        "severity",
        "metadata",
        "created_at",
        "updated_at"
      ]

    events_filter:
      type: object
      properties:
        provider:
          type: array
          items:
            type: string
        category:
          type: array
          items:
            type: string
        action:
          type: array
          items:
            type: string
        severity:
          type: array
          items:
            type: string
        limit:
          type: integer
        offset:
          type: integer
        sort_on:
          type: string
          description: 'Field on which records are sorted'
        order: 
          type: string
          description: 'order of sort asc/desc, default is asc'
      required: [ provider, category, action, severity, limit, offset, sort_on, order ]

    usersPageForAdmin:
      allOf:
        - $ref: '#/components/schemas/recordsPage'
        - type: object
          properties:
            data:
              type: array
              items:
                $ref: '#/components/schemas/usersWithRoles'

    teamMembersPage:
      allOf:
        - $ref: '#/components/schemas/recordsPage'
        - type: object
          properties:
            data:
              type: array
              items:
                $ref: '#/components/schemas/teamMembers'
              
    usersPageForNonAdmin:
      allOf:
        - $ref: '#/components/schemas/recordsPage'
        - type: object
          properties:
            data:
              type: array
              items:
                $ref: '#/components/schemas/usersForNonAdmin'

    email_preference:
        type: object
        properties:
          welcome_email:
            type: boolean
          notify_role_change:
            type: boolean

    resultsPage:
      type: object
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        resultType:
          type: string

    recordsPage:
      type: object
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        recordType:
          type: string

    roleNames:
      type: array
      items:
        type: string

    role:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        role_name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
          description: 'Role description'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    rolesPage:
      type: object
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        roles:
          type: array
          items:
            type: object
            $ref: '#/components/schemas/role'


    roles:
      type: array
      items:
        $ref: '#/components/schemas/role'

    roleHolderRequest:
      type: object
      properties:
        role_names:
          $ref: '#/components/schemas/roleNames'
        email:
          $ref: '#/components/schemas/email'
      required: [
        role_names,
        email
      ]

    rolesKeychainsMapping:
      properties:
        id:
          $ref: '#/components/schemas/id'
        keychain_id:
          $ref: '#/components/schemas/id'
        role_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    userInvite:
      properties:
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        email:
          $ref: '#/components/schemas/email'
        teams:
          type: array
          items:
            $ref: '#/components/schemas/team'
        team_roles:
          type: array
          description: Team level roles (team admin)
          items:
            $ref: '#/components/schemas/text'
        org_roles:
          type: array
          description: Organization level roles (organization admin)
          items:
            $ref: '#/components/schemas/text'
        roles:
          type: array
          description: Provider level roles (kanvas, admin, curator)
          items:
            $ref: '#/components/schemas/text'
      required: [
        first_name,
        last_name,
        email,
      ]

    user:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/user_id'
        provider:
          $ref: '#/components/schemas/provider'
        email:
          $ref: '#/components/schemas/email'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        avatar_url:
          $ref: '#/components/schemas/avatar_url'
        status:
          $ref: '#/components/schemas/status'
        bio:
          $ref: '#/components/schemas/bio'
        preferences:
          $ref: '#/components/schemas/map_object'
        accepted_terms_at:
          $ref: '#/components/schemas/accepted_terms_at'
        first_login_time:
          $ref: '#/components/schemas/time'
        last_login_time:
          $ref: '#/components/schemas/time'
        role_names:
          $ref: '#/components/schemas/roleNames'
        teams:
          type: object
          properties:
            total_count: 
              type: integer
            teams_with_roles:
              $ref: '#/components/schemas/teams'
      required: [
        id,
        user_id,
        provider,
        email,
        first_name,
        last_name,
        status,
        created_at,
        updated_at,
        last_login_time,
        deleted_at,
      ]

    userSummary:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/user_id'
        email:
          $ref: '#/components/schemas/email'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        avatar_url:
          $ref: '#/components/schemas/avatar_url'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    organizationWithRoles:
      type: object
      properties: 
        id: 
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description: 
          $ref: '#/components/schemas/text'
        country:
          $ref: '#/components/schemas/text'
        region:
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/id'
        metadata:
          $ref: '#/components/schemas/organizationMetadata'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
        role_names:
          $ref: '#/components/schemas/roleNames'

    actor:
      type: object
      properties: 
        actor_id: 
          $ref: '#/components/schemas/id'
          description: UUID of actor
        actor_type:
          $ref: '#/components/schemas/text'
          description: Type of actor, e.g user, team, system.

    githubRepo:
      type: object
      properties: 
        repoName: 
          type: string
          description: Relative path of designs of this repo

    teamsWithRoles:
      type: object
      properties: 
        id: 
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description: 
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
        role_names:
          $ref: '#/components/schemas/roleNames'

    usersWithRoles:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/user_id'
        username:
          $ref: '#/components/schemas/username'
        email:
          $ref: '#/components/schemas/email'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        status:
          $ref: '#/components/schemas/status'
        role_names:
          $ref: '#/components/schemas/roleNames'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        last_login_time:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
        prefs:
          $ref: '#/components/schemas/email_preference'
        avatar_url:
          $ref: '#/components/schemas/avatar_url'
        preferences:
          $ref: '#/components/schemas/map_object'
        organization_with_roles:
          $ref: '#/components/schemas/organizationWithRoles'
        teams_with_roles:
          type: array
          items:
            $ref: '#/components/schemas/teamsWithRoles'
      required: [
        id,
        user_id,
        username,
        email,
        first_name,
        last_name,
        status,
        role_names,
        created_at,
        updated_at,
        last_login_time,
        deleted_at,
      ]

    teamMembers:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/user_id'
        username:
          $ref: '#/components/schemas/username'
        email:
          $ref: '#/components/schemas/email'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        status:
          $ref: '#/components/schemas/status'
        role_names:
          $ref: '#/components/schemas/roleNames'
        joined_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        last_login_time:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
        prefs:
          $ref: '#/components/schemas/email_preference'
        avatar_url:
          $ref: '#/components/schemas/avatar_url'
      required: [
        id,
        user_id,
        username,
        email,
        first_name,
        last_name,
        status,
        role_names,
        joined_at,
        updated_at,
        last_login_time,
        deleted_at,
      ]

    usersForNonAdmin:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/user_id'
        username:
          $ref: '#/components/schemas/username'
        email:
          $ref: '#/components/schemas/email'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        prefs:
          $ref: '#/components/schemas/email_preference'
        avatar_url:
          $ref: '#/components/schemas/avatar_url'
        preferences:
          $ref: '#/components/schemas/map_object'
      required: [
        id,
        user_id,
        username,
        email,
        first_name,
        last_name,
      ]


    designShare:
      properties:
        emails:
          $ref: '#/components/schemas/emails'
        id:
          $ref: '#/components/schemas/id'
        content_type:
          type: string
        share:
          type: boolean
      required: [
        emails,
        id,
        share
      ]

    viewShare:
      properties:
        emails:
          $ref: '#/components/schemas/emails'
        id:
          $ref: '#/components/schemas/id'
        content_type:
          type: string
        share:
          type: boolean
      required: [
        emails,
        id,
        content_type,
        share
      ]

    deleteOn:
      type: string
      enum: [self, bulk]

    bulkDelete:
      properties:
        user_ids:
          $ref: '#/components/schemas/id'
        user_emails:
          $ref: '#/components/schemas/emails'
      required: [
        user_ids,
        user_emails
      ]

    performanceProfile:
      properties:
        id:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        user_id:
          $ref: '#/components/schemas/id'
        schedule:
          $ref: '#/components/schemas/id'
        load_generators:
          type: string
        endpoints:
          type: string
        service_mesh:
          type: string
        concurrent_request:
          type: integer
        qps:
          type: integer
        duration:
          type: string
        last_run:
          $ref: '#/components/schemas/time'
        total_results:
          type: integer
        request_headers:
          type: string
        request_cookies:
          type: string
        request_body:
          type: string
        metadata: 
          $ref: '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    performanceProfilePage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          profiles:
            type: array
            items:
              $ref: '#/components/schemas/performanceProfile'

    performanceResult:
      properties:
        id:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        test_start_time:
          $ref: '#/components/schemas/time'
        mesh:
          type: string
        runner_results:
          $ref: '#/components/schemas/map_object'
        deleted:
          type: boolean
        server_metrics:
          $ref: '#/components/schemas/map_object'
        server_board_config:
          $ref: '#/components/schemas/map_object'
        performance_profile:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    mesheryResultPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          results:
            type: array
            items:
              $ref: '#/components/schemas/performanceResult'

    schedule:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        cron_expression:
          type: string
        user_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    schedulePage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          profiles:
            type: array
            items:
              $ref: '#/components/schemas/schedule'

    k8sContext:
      properties:
        id:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        auth:
          $ref: '#/components/schemas/map_object'
        cluster:
          $ref: '#/components/schemas/map_object'
        server:
          type: string
        owner:
          $ref: '#/components/schemas/id'
        created_by:
          $ref: '#/components/schemas/id'
        meshery_instance_id:
          $ref: '#/components/schemas/id'
        kubernetes_server_id:
          $ref: '#/components/schemas/id'
        deployment_type:
          type: string
        updated_at:
          $ref: '#/components/schemas/time'
        created_at:
          $ref: '#/components/schemas/time'

    k8sContextPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          contexts:
            type: array
            items:
              $ref: '#/components/schemas/k8sContext'

    k8sContextPersistResponse:
      properties:
        k8sContext:
          $ref: '#/components/schemas/k8sContext'
        inserted:
          type: boolean

    userToken:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        provider:
          $ref: '#/components/schemas/provider'
        access_token:
          type: string
        refresh_token:
          type: string
        name:
          $ref: '#/components/schemas/text'
        purpose:
          type: string
        is_oauth:
          type: boolean
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    tokenPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          tokens:
            type: array
            items:
              $ref: '#/components/schemas/userToken'

    credential:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        type:
          type: string
        secret:
          $ref: '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    credentialsPage:
      allOf:
        - $ref: '#/components/schemas/resultsPage'
        - type: object
          properties:
            credential:
              type: array
              items:
                $ref: '#/components/schemas/credential'

    detail:
      properties:
        smi_specification:
          $ref: '#/components/schemas/text'
        smi_version:
          $ref: '#/components/schemas/text'
        time:
          $ref: '#/components/schemas/text'
        assertions:
          $ref: '#/components/schemas/text'
        result:
          $ref: '#/components/schemas/text'
        reason:
          $ref: '#/components/schemas/text'
        capability:
          $ref: '#/components/schemas/text'
        status:
          $ref: '#/components/schemas/text'

    smiResult:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        mesh_name:
          $ref: '#/components/schemas/text'
        mesh_version:
          $ref: '#/components/schemas/text'
        cases_passed:
          $ref: '#/components/schemas/text'
        passing_percentage:
          $ref: '#/components/schemas/text'
        status:
          $ref: '#/components/schemas/text'
        more_details:
          $ref: '#/components/schemas/detail'
        test_start_time:
          $ref: '#/components/schemas/time'

    smiResultPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          results:
            type: array
            items:
              $ref: '#/components/schemas/smiResult'

    eventTrackerGrouped:
      properties:
        count:
          type: integer
        event_type:
          $ref: '#/components/schemas/text'
        dt:
          $ref: '#/components/schemas/time'
        week:
          $ref: '#/components/schemas/text'
        month:
          $ref: '#/components/schemas/text'
        year:
          $ref: '#/components/schemas/text'

    eventTrackerGroupedArray:
        type: array
        items:
          $ref: '#/components/schemas/eventTrackerGrouped'

    eventResult:
      description: Defines model for event_result
      properties:
        user_id:
          $ref: "#/components/schemas/user_uuid"
          description: |
            UUID of the user that initiated the event. In most cases this would be present, but not always.
        system_id:
          description: |
            The system from which the request is sourced. In the case of Meshery Server, 
            the ID is meshery_instance_id of Meshery Server (which can be found in the metadata of`Connections` table).
          $ref: "#/components/schemas/system_id"
        category:
          description: |
            Resource name on which the operation is invoked.
          type: string
          example: pattern
          x-oapi-codegen-extra-tags:
            db: category
        action:
          description: |
            Action taken on the resource.
          type: string
          example: deployed
          x-oapi-codegen-extra-tags:
            db: action
        description:
          description: |
            A summary/receipt of event that occured.
          type: string
          example: “Prometheus” pattern deployed in K8s ctx “Layer5 Cloud”.
          x-oapi-codegen-extra-tags:
            db: description
        first_name:
          description: First name of the user that initiated the event.
          type: string
        last_name:
          description: Last name of the user that initiated the event.
          type: string
        email:
          $ref: '#/components/schemas/email'
        provider:
          $ref: "#/components/schemas/provider"
        created_at:
          $ref: "#/components/schemas/created_at"

    eventsPage:
      allOf:
      - $ref: '#/components/schemas/recordsPage'
      - type: object
        properties:
          data:
            type: array
            items:
              $ref: '#/components/schemas/eventResult'

    eventSummary:
      properties:
        user_id:
          type: string
          description: user's email or username
        provider:
          type: string
        email:
          type: string
        first_name:
          type: string
          description: First Name
        last_name:
          type: string
          description: Last Name
        activity_count:
          type: integer
        login_count:
          type: integer
        signup_count:
          type: integer
        perf_results_count:
          type: integer
        smi_results_count:
          type: integer
        meshery_apps_count:
          type: integer
        meshery_patterns_count:
          type: integer
        meshery_filters_count:
          type: integer
        last_login_time:
          type: string
          format: data-time
          x-go-type: time.Time
      required: [ user_id,
        provider,
        email,
        first_name,
        last_name,
        activity_count,
        login_count,
        signup_count,
        perf_results_count,
        smi_results_count,
        meshery_apps_count,
        meshery_patterns_count,
        meshery_filters_count,
        last_login_time
      ]

    eventSummaryPage:
      allOf:
      - $ref: '#/components/schemas/recordsPage'
      - type: object
        properties:
          data:
            type: array
            items:
              $ref: '#/components/schemas/eventSummary'

    recentActivityPage:
      type: object
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        activities:
          type: array
          items:
            $ref: '#/components/schemas/event'

    accountOverview:
      properties:
        k8s_count:
          type: integer
        app_count:
          type: integer
        pattern_count:
          type: integer

    recentUsers:
      properties:
        id:
          $ref: '#/components/schemas/id'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        avatar_url:
          $ref: '#/components/schemas/avatar_url'

    recentUsersPage:
      properties:
        recent_users:
          type: array
          items:
            $ref: '#/components/schemas/recentUsers'

    capabilityGeneralCapability:
      properties:
        feature:
          $ref: '#/components/schemas/text'
          description: Feature name
        endpoint:
          $ref: '#/components/schemas/endpoint'

    capabilityExtension:
      properties:
        navigator:
          type: array
          items:
            $ref: '#/components/schemas/capabilityNavigatorExtension'
        user_prefs:
          type: array
          items:
            $ref: '#/components/schemas/capabilityUserPrefExtension'
        graphql:
          type: array
          items:
            $ref: '#/components/schemas/capabilityGraphQLExtension'
        account:
          type: array
          items:
            $ref: '#/components/schemas/capabilitiesAccountExtension'
        collaborator:
          type: array
          items:
            $ref: '#/components/schemas/capabilityCollaboratorsExtension'

    capabilityNavigatorExtension:
      properties:
        title:
          $ref: '#/components/schemas/text'
          description: Title
        on_click_callback:
          type: integer
        href:
          properties:
            uri:
              type: string
              format: uri
            external:
              type: boolean
        component:
          $ref: '#/components/schemas/text'
          description: Component
        icon:
          $ref: '#/components/schemas/text'
          description: Icon link
        link:
          $ref: '#/components/schemas/text'
          description: link
          format: uri
        show:
          type: boolean
          description: Controls whether to show the extension or not
        isBeta:
          type: boolean
          description: Controls whether to show the isBeta label or not on title
        type:
          $ref: '#/components/schemas/text'
          description: Extension type
        allowedTo:
          type: object

    capabilityUserPrefExtension:
      properties:
        component:
          $ref: '#/components/schemas/text'
          description: Component
        type:
          $ref: '#/components/schemas/text'
          description: Extension type

    capabilityCollaboratorsExtension:
      properties:
        component:
          $ref: '#/components/schemas/text'
          description: Component
        type:
          $ref: '#/components/schemas/text'
          description: Extension type

    capabilityGraphQLExtension:
      properties:
        component:
          $ref: '#/components/schemas/text'
          description: Component
        path:
          $ref: '#/components/schemas/text'
          description: Path
        type:
          $ref: '#/components/schemas/text'
          description: Extension type

    capabilitiesAccountExtension:
      properties:
        title:
          $ref: '#/components/schemas/text'
          description: Title
        on_click_callback:
          type: integer
        href:
          properties:
            uri:
              type: string
              format: uri
            external:
              type: boolean
        component:
          $ref: '#/components/schemas/text'
          description: Component
        link:
          $ref: '#/components/schemas/text'
          description: link
          format: uri
        show:
          type: boolean
          description: Controls whether to show the extension or not
        type:
          $ref: '#/components/schemas/text'
          description: Extension type

    restrictedAccess:
      properties:
        isMesheryUIRestricted:
          type: boolean
        allowedComponents:
          properties:
            navigator:
              type: object
            header:
              type: object

    capability:
      properties:
        provider_type:
          $ref: '#/components/schemas/provider'
          description: Provider type
        package_version:
          $ref: '#/components/schemas/text'
          description: Package version
        package_url:
          $ref: '#/components/schemas/text'
          description: Package url
        provider_name:
          $ref: '#/components/schemas/text'
          description: Provider name
        provider_description:
          type: array
          items:
            $ref: '#/components/schemas/text'
        extensions:
          $ref: '#/components/schemas/capabilityExtension'
        capabilities:
          $ref: '#/components/schemas/capabilityGeneralCapability'
        restrictedAccess:
          $ref: '#/components/schemas/restrictedAccess'

    mesheryPatternResource:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
          description: Name
        namepace:
          $ref: '#/components/schemas/text'
          description: Namespace
        type:
          $ref: '#/components/schemas/text'
          description: Type
        oam_type:
          $ref: '#/components/schemas/text'
          description: OAM type
        deleted:
          type: boolean
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    mesheryPatternResourcePage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          resources:
            type: array
            items:
              $ref: '#/components/schemas/mesheryPatternResource'

    mesheryPatternRequestBody:
      properties:
        url:
          $ref: '#/components/schemas/endpoint'
        path:
          $ref: '#/components/schemas/text'
        save:
          type: boolean
        pattern_data:
          $ref: '#/components/schemas/mesheryPattern'

    mesheryPattern:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        user:
          $ref: '#/components/schemas/userSummary'
        pattern_file:
          $ref: '#/components/schemas/text'
          description: Pattern file
        name:
          $ref: '#/components/schemas/text'
          description: Pattern Name
        location:
          $ref: '#/components/schemas/map_object'
        visibility:
          $ref: '#/components/schemas/text'
        source_type:
          $ref: '#/components/schemas/text'
          description: Source type (K8s manifest, Helm chart, Docker compose, Design)
        source_content:
          type: string
          format: byte
          description: Source content
        catalog_data:
          $ref: '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    mesheryPatternPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          patterns:
            type: array
            items:
              $ref: '#/components/schemas/mesheryPattern'

    githubMetadataPage:
      properties:
        repoName:
          type: array
          items:
            $ref: '#/components/schemas/mesheryPattern'

    repositoryScanResultsPage:
      type: array
      items:
        type: object
        properties:
          label:
            type: string
          type: 
            type: string
            description: "Defines whether the current item is a directory or a file."
          file_info:
            type: object
            properties: 
              sha:
                type: string
              path:
                type: string
              mode:
                type: string
              type:
                type: string
              size:
                type: string
              url: 
                type: string
          children:
            $ref: '#/components/schemas/repositoryScanResultsPage'
            
    mesheryFilterRequestBody:
      properties:
        url:
          $ref: '#/components/schemas/endpoint'
        path:
          $ref: '#/components/schemas/text'
        save:
          type: boolean
        filter_data:
          $ref: '#/components/schemas/mesheryFilter'

    mesheryFilter:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        filter_file:
          type: string
          format: byte
          description: Filter file
        name:
          $ref: '#/components/schemas/text'
          description: Filter Name
        location:
          $ref: '#/components/schemas/map_object'
        visibility:
          $ref: '#/components/schemas/text'
        catalog_data:
          $ref: '#/components/schemas/map_object'
        config:
          $ref: '#/components/schemas/text'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    mesheryFilterPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          filters:
            type: array
            items:
              $ref: '#/components/schemas/mesheryFilter'

    mesheryApplicationRequestBody:
      properties:
        url:
          $ref: '#/components/schemas/endpoint'
        path:
          $ref: '#/components/schemas/text'
        save:
          type: boolean
        application_data:
          $ref: '#/components/schemas/mesheryApplication'
        source_type:
          $ref: '#/components/schemas/text'
          description: Source type (K8s manifest, Helm chart, Docker compose)

    mesheryApplication:
      properties:
        id:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        application_file:
          $ref: '#/components/schemas/text'
          description: Application file
        name:
          $ref: '#/components/schemas/text'
          description: Pattern Name
        location:
          $ref: '#/components/schemas/map_object'
        visibility:
          $ref: '#/components/schemas/text'
        source_type:
          $ref: '#/components/schemas/text'
          description: Source type (K8s manifest, Helm chart, Docker compose)
        source_content:
          type: string
          format: byte
          description: Source content
        catalog_data:
           $ref: '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    mesheryApplicationPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          applications:
            type: array
            items:
              $ref: '#/components/schemas/mesheryApplication'

    mesheryCatalogRequestBody:
      properties:
        id:
          $ref: '#/components/schemas/id'
        catalog_type:
          $ref: '#/components/schemas/catalogContentType'
          description: Catalog type (pattern / filter)
        catalog_data:
           $ref: '#/components/schemas/map_object'

    catalogContentType:
      type: string
      enum: ["pattern", "filter"]

    catalogRequest:
      properties:
        id:
          $ref: '#/components/schemas/id'
        content_id:
          $ref: '#/components/schemas/id'
        content_name:
          $ref: '#/components/schemas/text'
        content_type:
          $ref: '#/components/schemas/catalogContentType'
          description: Catalog type (pattern / filter)
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        user:
          $ref: '#/components/schemas/userSummary'
        email:
          $ref: '#/components/schemas/email'
        status:
          $ref: '#/components/schemas/text'
          description: Catalog request status (pending / approved / denied)
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    catalogRequestsPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          catalogRequests:
            type: array
            items:
              $ref: '#/components/schemas/catalogRequest'

    deletePatternModel:
      properties:
        id:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
          description: Pattern name

    mesheryPatternDeleteRequestBody:
      properties:
        patterns:
          type: array
          items:
            $ref: '#/components/schemas/deletePatternModel'

    signupData:
      properties:
        id:
          $ref: '#/components/schemas/id'
        first_name:
          $ref: '#/components/schemas/text'
          description: First Name
        last_name:
          $ref: '#/components/schemas/text'
          description: Last Name
        email:
          $ref: '#/components/schemas/email'
        occupation:
          $ref: '#/components/schemas/text'
          description: Occupation
        organization:
          $ref: '#/components/schemas/text'
          description: Organization
        role:
          $ref: '#/components/schemas/text'
          description: Role in organization
        form_type:
          $ref: '#/components/schemas/text'
          description: Form Type (Kanvas or Playground)
        status:
          $ref: '#/components/schemas/text'
          description: Status (approved / denied)
        task_id:
          $ref: '#/components/schemas/text'
          description: ClickUp task id
        task_link:
          $ref: '#/components/schemas/text'
          description: ClickUp task link
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'

    signupRequestsPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          signup_data:
            type: array
            items:
              $ref: '#/components/schemas/signupData'

    connectionPayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
          description: Name
        kind:
          $ref: '#/components/schemas/text'
          description: Kind
        type:
          $ref: '#/components/schemas/text'
          description: Connection type
        sub_type:
          $ref: '#/components/schemas/text'
          description: Connection subtype
        credential_secret:
          $ref: '#/components/schemas/map_object'
        metadata:
          $ref: '#/components/schemas/map_object'
        status:
          $ref: '#/components/schemas/text'
          description: Status of the connection

    resourceAccessMappingPayload:
      properties:
        grant_access:
          type: array
          items:
            type: object
            $ref: '#/components/schemas/actor'
          description: >
            An array containing objects representing actors who will be granted access to the specified resource.
        revoke_access:
          type: array
          items:
            type: object
            $ref: '#/components/schemas/actor'
          description: >
            An array containing objects representing actors whose access to the specified resource will be revoked.
        notify_users:
          type: boolean
          description: >
            When set to true, the system will send email notifications to all actors mentioned in the "grant_access" array within the payload.
      required:
        - notify_users

    githubRequestBody:
      properties:
        paths:
          type: array
          items:
            type: object
            $ref: '#/components/schemas/githubRepo'
            description: >
              An array containing objects key as repository name and value of relative path to designs to import and save in metadata.
        installationId:
            type: string
            description: >
              Installation Id of github connection.
    
    githubImportRequest:
      properties:
        paths:
          type: array
          items:
            type: object
            properties:
              label:
                type: string
              type: 
                type: string
                description: "Defines whether the current item is a directory or a file."
              file_info:
                type: object
                properties: 
                  sha:
                    type: string
                  path:
                    type: string
                  mode:
                    type: string
                  type:
                    type: string
                  size:
                    type: string
                  url: 
                    type: string
              children:
                $ref: '#/components/schemas/repositoryScanResultsPage'
        name:
          type: string
          description: >
            name of repository.

    repositoryScanPayload:
      properties:
        path:
          type: string
          description: >
           Name of the repository to scan (<owner/repo-name>). Eg: meshery/meshery
        installationId:
            type: string
            description: >
              Installation Id of github connection.
    
    connectionStatusInfo:
      properties:
        status:
          $ref: '#/components/schemas/text'
          description: Connection status
        count:
          type: integer
          description: Number of connections having the status
    
    connectionsStatusPage:
      properties:
        connections_status:
          type: array
          items:
            $ref: '#/components/schemas/connectionStatusInfo'

    connection:
      properties:
        id:
          $ref: '#/components/schemas/id'
          description: ID
        name:
          $ref: '#/components/schemas/text'
          description: Connection Name
        credential_id:
          $ref: '#/components/schemas/id'
          description: Credential ID
        type:
          $ref: '#/components/schemas/text'
          description: Connection Type
        sub_type:
          $ref: '#/components/schemas/text'
          description: Connection Subtype
        kind:
          $ref: '#/components/schemas/text'
          description: Connection Kind
        metadata:
          $ref: '#/components/schemas/map_object'
        status: 
          description: Connection Status
          type: string
          enum: [
            "discovered",
            "registered",
            "connected",
            "ignored",
            "maintenance",
            "disconnected",
            "deleted",
            "notfound"
          ]
        user_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
        environments:
          $ref: '#/components/schemas/environment'

    connectionPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        connections:
          type: array
          items:
            $ref: '#/components/schemas/connection'

    mesheryInstance:
      properties:
        id:
          $ref: '#/components/schemas/id'
          description: Connection id
        name:
          $ref: '#/components/schemas/text'
          description: Connection name
        server_id:
          $ref: '#/components/schemas/text'
          description: Connected server id
        server_version:
          $ref: '#/components/schemas/text'
          description: Running server version
        server_location:
          $ref: '#/components/schemas/endpoint'
        server_build_sha:
          $ref: '#/components/schemas/text'
          description: Server build SHA
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
        status:
          $ref: '#/components/schemas/text'
          description: Status

    planName:
      type: string
      enum: [personal, team, enterprise]
      description: A list of subscription plans offered for customers

    subscriptionStatus:
      type: string
      enum: [active, closed, overdue, expired]
      description: Status of the subscription

    planCadence:
      type: string
      enum:
        - annually
        - monthly
        - none


    availableOrganization:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
        country:
          $ref: '#/components/schemas/text'
        region:
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/text'
          description: UserID of user who created organization
        metadata:
          $ref: '#/components/schemas/organizationMetadata'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    organizationMetadata:
      type: object
      properties: 
        preferences:
          $ref: '#/components/schemas/organizationPreferences'
        
    organizationPreferences:
      type: object
      properties: 
        theme:
          type: object
          properties: 
            theme_id:
              type: string
              description: ID for the theme to load for the currently selected organization
            logo:
              type: object
              properties: 
                desktop_view:
                  type: string
                  description: Contains the location of the custom desktop view SVG.
                mobile_view:
                  type: string
                  description: Contains the location of the custom mobile view SVG.
        dashboard: 
          type: object
          properties: 
            layout:
              additionalProperties: 
                type: object
    organization:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        country:
          $ref: '#/components/schemas/text'
        region:
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/id'
          description: UUID of user who created organization
        metadata:
          $ref: '#/components/schemas/organizationMetadata'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
      required:
        - name

    organizationsPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        organizations:
          type: array
          items:
            $ref: '#/components/schemas/availableOrganization'

    organizationPayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
        country:
          $ref: '#/components/schemas/text'
        region:
          $ref: '#/components/schemas/text'
        description: 
          $ref: '#/components/schemas/text'
        notify_org_update:
          type: boolean
        preferences:
          $ref: '#/components/schemas/organizationPreferences'

    subscription:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        org_ID:
          $ref: '#/components/schemas/id'
        plan_ID:
          $ref: '#/components/schemas/id'
        subscription_status:
          $ref: '#/components/schemas/subscriptionStatus'
        start_date:
          $ref: '#/components/schemas/time'
        end_date:
          $ref: '#/components/schemas/time'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    subscriptionsPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          results:
            type: array
            items:
              $ref: '#/components/schemas/subscription'

    plan:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/planName'
        cadence:
          $ref: '#/components/schemas/planCadence'
        price:
          type: integer
          format: int32
          $ref: "#/components/schemas/price"
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
      required:
        - name
        - price
        - id

    planRequestBody:
      properties:
        name:
          $ref: '#/components/schemas/planName'
        cadence:
          $ref: '#/components/schemas/planCadence'
        price:
          $ref: "#/components/schemas/price"

    planPage:
        properties:
          page:
            type: integer
          page_size:
            type: integer
          total_count:
            type: integer
          plans:
            type: array
            items:
              $ref: '#/components/schemas/plan'

    users:
      type: array
      items:
        $ref: '#/components/schemas/user'

    team:
      type: object
      properties:
        ID:
          $ref: '#/components/schemas/id'
          description: 'Team ID'
        name:
          $ref: '#/components/schemas/text'
          description: 'Team name'
        description:
          $ref: '#/components/schemas/text'
          description: 'Team description'
        owner:
          $ref: '#/components/schemas/id'
          description: 'Team owner'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    availableTeam:
      type: object
      properties:
        ID:
          $ref: '#/components/schemas/id'
          description: 'Team ID'
        name:
          $ref: '#/components/schemas/text'
          description: 'Team name'
        description:
          $ref: '#/components/schemas/text'
          description: 'Team description'
        owner:
          $ref: '#/components/schemas/text'
          description: 'Team owner'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    teams:
      type: array
      items:
        $ref: '#/components/schemas/team'

    teamPayload:
      type: object
      properties:
        name:
          $ref: '#/components/schemas/team/properties/name'
          description: 'Team name'
        description:
          $ref: '#/components/schemas/text'
          description: 'Team description'
        notify_team_update:
          type: boolean
          description: 'Notify team members about team update'
        metadata:
          $ref: '#/components/schemas/map_object'


    teamPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        teams:
          type: array
          items:
            $ref: '#/components/schemas/availableTeam'

    usersTeamsMappingPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        users_teams_mapping:
          type: array
          items:
            $ref: '#/components/schemas/usersTeamsMapping'

    userSummaryPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        users:
          type: array
          items:
            $ref: '#/components/schemas/userSummary'

    usersTeamsMapping:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        team_id:
          $ref: '#/components/schemas/id'
        role_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    teamsOrganizationsMapping:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        org_id:
          $ref: '#/components/schemas/id'
        team_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    teamsOrganizationsMappingPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        teams_organizations_mapping:
          type: array
          items:
            $ref: '#/components/schemas/teamsOrganizationsMapping'

    rolePayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'

    key:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        subcategory:
          $ref: '#/components/schemas/text'
        function:
          $ref: '#/components/schemas/text'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'
        category:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/id'

    keysPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        keys:
          type: array
          items:
            $ref: '#/components/schemas/key'

    keychain:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'
    
    keychainFilter:
      properties:
        roleID:
          $ref: '#/components/schemas/id'

    keychainsPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        keychains:
          type: array
          items:
            $ref: '#/components/schemas/keychain'
    
    badgeRequest:
      properties:
        user_id:
          $ref: '#/components/schemas/id'
        badges:
          type: array
          items: 
            $ref: '#/components/schemas/text'

    userKeys:
      properties:
        keys:
          type: array
          items:
            $ref: '#/components/schemas/key'
        total_count: 
          type: integer

    badge:
      type: object
      properties:
        id: 
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
        label:
          $ref: '#/components/schemas/text'
        svg_location:
          $ref: '#/components/schemas/text'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    badgesObject:
      type: object
      additionalProperties:
        $ref: '#/components/schemas/badge'
  
    badges:
      properties:
        badges:
          $ref: '#/components/schemas/badgesObject'
        total_count: 
          type: integer

    meshmodelModel:
      properties:
        id: 
          $ref: '#/components/schemas/id'
        name: 
          $ref: '#/components/schemas/text'
        version:
          $ref: '#/components/schemas/text'
        display_name:
          $ref: '#/components/schemas/text'
        category_id:
          $ref: '#/components/schemas/id' 
        metadata:
          $ref:  '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    meshmodelCategory:
      properties:
        id: 
          $ref: '#/components/schemas/id'
        name: 
          $ref: '#/components/schemas/text'
        metadata:
          $ref:  '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'
  
    meshmodelModelsPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        models:
          type: array
          items:
            $ref: '#/components/schemas/meshmodelModel'
    
    meshmodelCategoriesPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        categories:
          type: array
          items:
            $ref: '#/components/schemas/meshmodelCategory'
    
    usersOrganizationsMapping:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        user_id:
          $ref: '#/components/schemas/id'
        organization_id:
          $ref: '#/components/schemas/id'
        role_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'
          
    environment:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
        organization_id:
          $ref: '#/components/schemas/id'
        owner:
          $ref: '#/components/schemas/text'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    workspace:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
        organization_id:
          $ref: '#/components/schemas/id'
        owner:
          $ref: '#/components/schemas/id'
        metadata:
          $ref: '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    availableWorkspace:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        description:
          $ref: '#/components/schemas/text'
        organization_id:
          $ref: '#/components/schemas/id'
        owner:
          $ref: '#/components/schemas/text'
        metadata:
          $ref: '#/components/schemas/map_object'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    mesheryView:
      properties:
        ID:
          $ref: '#/components/schemas/id'
        name:
          $ref: '#/components/schemas/text'
        filters:
          $ref: '#/components/schemas/map_object'
        visibility:
          $ref: '#/components/schemas/text'
        metadata:
          $ref: '#/components/schemas/map_object'
        user_id:
          $ref: '#/components/schemas/text'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'

    environmentPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        environments:
          type: array
          items:
            $ref: '#/components/schemas/environment'

    environmentPayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
          description: Name
        description:
          $ref: '#/components/schemas/text'
          description: Environment description
        OrganizationID:
           $ref: '#/components/schemas/id'
           description: Organization ID
      required:
        - name
        - organizationID

    workspacePage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        environments:
          type: array
          items:
            $ref: '#/components/schemas/workspace'

    mesheryViewPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        views:
          type: array
          items:
            $ref: '#/components/schemas/mesheryView'

    workspacePayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
          description: Name
        description:
          $ref: '#/components/schemas/text'
          description: Workspace description
        organization_id:
          $ref: '#/components/schemas/id'
          description: Organization ID
        metadata:
          $ref: '#/components/schemas/map_object'
          description: Metadata related to workspace
      required:
        - name
        - organization_id

    mesheryViewPayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
          description: Name of meshery view
        filters:
          $ref: '#/components/schemas/map_object'
          description: View's Filter
        metadata:
          $ref: '#/components/schemas/map_object'
          description: View's Metadata
      required:
        - name

    workspaceUpdatePayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
          description: Name of workspace
        description:
          $ref: '#/components/schemas/text'
          description: Environment description
        organization_id:
          $ref: '#/components/schemas/id'
          description: Organization ID
      required:
        - organization_id

    viewUpdatePayload:
      properties:
        name:
          $ref: '#/components/schemas/text'
          description: Name of view
        filters:
          $ref: '#/components/schemas/map_object'
          description: View's Filter
        metadata:
          $ref: '#/components/schemas/map_object'
          description: View's Metadata
        visibility:
          $ref: '#/components/schemas/text'
          description: View visibility (it should be only 'private' or 'public')

    eventsAggregate:
      properties:
        audit:
          type: integer
          description: Number of audit events
        summary:
          type: integer
          description: Number of summary events

    environmentConnectionMapping:
      properties:
        id:
          $ref: '#/components/schemas/id'
        environment_id:
          $ref: '#/components/schemas/id'
        connection_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    workspacesDesignsMapping:
      properties:
        id:
          $ref: '#/components/schemas/id'
        design_id:
          $ref: '#/components/schemas/id'
        workspace_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    workspacesViewsMapping:
      properties:
        id:
          $ref: '#/components/schemas/id'
        view_id:
          $ref: '#/components/schemas/id'
        workspace_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    workspacesEnvironmentsMapping:
      properties:
        id:
          $ref: '#/components/schemas/id'
        environment_id:
          $ref: '#/components/schemas/id'
        workspace_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    workspacesTeamsMapping:
      properties:
        id:
          $ref: '#/components/schemas/id'
        team_id:
          $ref: '#/components/schemas/id'
        workspace_id:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    workspacesDesignsMappingPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          workspaces_designs_mapping:
            type: array
            items:
              $ref: '#/components/schemas/workspacesDesignsMapping'

    workspacesViewsMappingPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          workspaces_views_mapping:
            type: array
            items:
              $ref: '#/components/schemas/workspacesViewsMapping'

    workspacesEnvironmentsMappingPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          workspaces_environments_mapping:
            type: array
            items:
              $ref: '#/components/schemas/workspacesEnvironmentsMapping'

    workspacesTeamsMappingPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          workspaces_teams_mapping:
            type: array
            items:
              $ref: '#/components/schemas/workspacesTeamsMapping'

    environmentConnectionMappingPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          environment_connection_mapping:
            type: array
            items:
              $ref: '#/components/schemas/environmentConnectionMapping'

    mesheryDesignPage:
      allOf:
      - $ref: '#/components/schemas/resultsPage'
      - type: object
        properties:
          designs:
            type: array
            items:
              $ref: '#/components/schemas/mesheryPattern'

    mentionRequestBody:
      properties:
        mention_users:
          $ref: '#/components/schemas/user_ids'
        participants:
          $ref: '#/components/schemas/user_ids'
        users_opted_out_of_notifications:
          $ref: '#/components/schemas/user_ids'
        design_id:
          $ref: '#/components/schemas/id'
        messages:
          type: array
          items:
            $ref: '#/components/schemas/commentMessage'  
      required:
        - design_id
    
    commentMessage:
      properties:
        firstName:
          $ref: '#/components/schemas/text'
        lastName:
          $ref: '#/components/schemas/text'
        avatarURL:
          $ref: '#/components/schemas/text'
        userId:
          $ref: '#/components/schemas/id'
        timestamp:
          $ref: '#/components/schemas/time'
      required:
        - firstName
        - lastName
        - avatarURL
        - userId
        - timestamp

    userFeedbackRequestBody:
      properties:
        message:
          $ref: '#/components/schemas/text'
          description: Feedback message.
        scope:
          $ref: '#/components/schemas/text'
          description: Scope of the feedback. The client can provide any scope, such as (Idea, Issue, Other).
        page_location:
          $ref: '#/components/schemas/text'
          description: The route URL of the page from which the user submitted the feedback.
        metadata:
          $ref: '#/components/schemas/map_object'
          description: "Additional information that the email should contain for better review. This field accepts an object; make sure the keys are in Sentence case, e.g., ('Design link': 'page link')."
      required:
        - message
        - scope
        - page_location
    
    notificationPreference:
      type: object
      properties:
        id: 
          $ref: '#/components/schemas/id'
        name: 
          $ref: '#/components/schemas/text'
        description: 
          $ref: '#/components/schemas/text'
        category: 
          $ref: '#/components/schemas/text'
        subcategory: 
          $ref: '#/components/schemas/text'
        created_at: 
          $ref: '#/components/schemas/time'
        updated_at: 
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/nullTime'
    
    notificationPreferencesObject: 
      type: object
      additionalProperties:
        $ref: '#/components/schemas/notificationPreference'
      
    availableNotificationPreferences:
      properties:
        notificationsPreferences:
          $ref: '#/components/schemas/notificationPreferencesObject'
        total_count: 
          type: integer

    notificationPreferenceRequest:
      type: object
      properties:
        notificationPreferences:
          type: array
          items:
            $ref: '#/components/schemas/text'  
        user_id:
          type: string
          $ref: '#/components/schemas/text'
      required: 
        - notificationPreferences
        - user_id

    schema:
      properties:
        rjsfSchema:
          type: object
        uiSchema:
          type: object

    resourceAccessMapping:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/id'
        actor_id:
          $ref: '#/components/schemas/id'
        action_type:
          $ref: '#/components/schemas/text'
        resource_id:
          $ref: '#/components/schemas/id'
        resource_type:
          $ref: '#/components/schemas/text'
        owner:
          $ref: '#/components/schemas/id'
        created_at:
          $ref: '#/components/schemas/time'
        updated_at:
          $ref: '#/components/schemas/time'
        deleted_at:
          $ref: '#/components/schemas/time'

    resourceAccessMappingPage:
      properties:
        page:
          type: integer
        page_size:
          type: integer
        total_count:
          type: integer
        data:
          type: array
          items:
            $ref: '#/components/schemas/resourceAccessMapping'


    sendSnapshotRequest:
      type: object
      properties:
        to:
          type: string
          description: Single recipient email address.
        subject:
          type: string
          description: Subject line of the snapshot email.
          default: "Kanvas Design Snapshot"
        image_uri:
          type: string
          description: The URI where the snapshot image can be accessed. Can be a URL or file path.
      required:
        - to
        - image_uri
"""

existing_schemas_list = ['schemas/constructs/role/v1beta1/role.json', 'schemas/constructs/user/v1beta1/user.json', 'schemas/constructs/v1beta1/category/category.json', 'schemas/constructs/v1beta1/component/component.json', 'schemas/constructs/v1beta1/connection.json', 'schemas/constructs/v1beta1/design/design.json', 'schemas/constructs/v1beta1/environment/environment.json', 'schemas/constructs/v1beta1/model/model.json', 'schemas/constructs/v1beta1/plan/plan.json', 'schemas/constructs/v1beta1/subscription/subscription.json', 'schemas/constructs/v1beta1/workspace/workspace.json']

# Ensure the root 'schemas/constructs' directory exists
if not os.path.exists('schemas/constructs'):
    os.makedirs('schemas/constructs', exist_ok=True)

data = yaml.safe_load(definitions_yaml_content)
schemas = data.get('components', {}).get('schemas', {})

newly_created_files = []
skipped_constructs_due_to_existence = [] 
skipped_constructs_due_to_primitive = []

if not schemas:
    print("No schemas found under components.schemas.")
else:
    for construct_name, schema_definition in schemas.items():
        lowercase_construct_name = construct_name.lower()
        
        schema_dir = os.path.join('schemas', 'constructs', lowercase_construct_name, 'v1beta1')
        expected_schema_path = os.path.join(schema_dir, f"{lowercase_construct_name}.json")

        is_primitive_or_scalar = False
        if isinstance(schema_definition, dict):
            schema_type = schema_definition.get('type')
            has_properties = 'properties' in schema_definition
            has_allof = 'allOf' in schema_definition
            has_items = 'items' in schema_definition
            
            items_details = schema_definition.get('items') if has_items else None
            items_is_ref = isinstance(items_details, dict) and '$ref' in items_details
            items_is_simple_type = isinstance(items_details, dict) and items_details.get('type') in ['string', 'integer', 'boolean', 'number']

            is_simple_type_field = schema_type in ['string', 'integer', 'boolean', 'number']

            if is_simple_type_field and not has_properties and not has_allof and not items_is_ref:
                 is_primitive_or_scalar = True
            elif '$ref' in schema_definition and not has_properties and not has_allof and not items_is_ref and len(schema_definition.keys()) <= 3:
                 is_primitive_or_scalar = True
            elif schema_type == 'array' and items_is_simple_type and not items_is_ref:
                is_primitive_or_scalar = True

        if expected_schema_path in existing_schemas_list:
            skipped_constructs_due_to_existence.append(construct_name)
        elif is_primitive_or_scalar:
            skipped_constructs_due_to_primitive.append(construct_name)
        else:
            # Conditions for creating a separate file:
            # - It's an object with 'properties'
            # - It uses 'allOf' for composition
            # - It's an array of '$ref' (array of other constructs)
            should_create_file = isinstance(schema_definition, dict) and \
                                ( (schema_type == 'object' and has_properties) or \
                                  (has_allof) or \
                                  (schema_type == 'array' and items_is_ref)
                                )

            if should_create_file: 
                try:
                    os.makedirs(schema_dir, exist_ok=True)
                    with open(expected_schema_path, 'w') as f:
                        json.dump(schema_definition, f, indent=2)
                    newly_created_files.append(expected_schema_path)
                except Exception as e:
                    print(f"Error creating file {expected_schema_path}: {e}")
            else:
                # If it doesn't meet specific criteria for a file, and wasn't caught as primitive initially,
                # class it as primitive for skipping.
                skipped_constructs_due_to_primitive.append(construct_name)


print("---NEWLY_CREATED_FILES_START---")
for f_path in newly_created_files:
    print(f_path)
print("---NEWLY_CREATED_FILES_END---")

# Combine all skipped constructs for the report
report_skipped_constructs = list(set(skipped_constructs_due_to_existence + skipped_constructs_due_to_primitive))

print("---REPORT_SKIPPED_CONSTRUCTS_START---")
for name in report_skipped_constructs:
    print(name)
print("---REPORT_SKIPPED_CONSTRUCTS_END---")

# Summary print statements
if not newly_created_files and not report_skipped_constructs:
     print("No schemas processed or found that meet the criteria for file creation or skipping.")

print(f"Total schemas analyzed: {len(schemas)}")
print(f"Number of new schema files created: {len(newly_created_files)}")
print(f"Number of constructs skipped (already exist or primitive/scalar): {len(report_skipped_constructs)}")

if not newly_created_files:
    print("No new files were created according to the processing logic.")
else:
    print(f"Successfully created {len(newly_created_files)} new JSON schema files.")

```

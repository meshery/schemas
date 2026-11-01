/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ActivityMetricsSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Activity Metrics",
    "description": "OpenAPI schema for per-activity reception figures for one post,\nconsumed by Blowhorn's analytics store. The rows have no endpoints of\ntheir own: they are recorded and read back as the `metadata` of events\non the events service (category `blowhorn`, action `activity_metrics`;\nsee the event construct), so this file declares the components only and\nthe paths stay with the event construct.\n",
    "version": "v1beta3",
    "contact": {
      "name": "Meshery Maintainers",
      "email": "maintainers@meshery.io",
      "url": "https://meshery.io"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "paths": {},
  "components": {
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "ActivityMetrics": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Activity Metrics Schema",
        "description": "Server-returned per-activity reception figures for one post, as recorded\nin the `metadata` of an event on the events service (category `blowhorn`,\naction `activity_metrics`); the event construct carries the envelope and\nthis construct names the metadata's own shape, which Event leaves open.\nOne row is one activity as one export read it, identified by\n(organizationId, platform, activityRef, readingDate): a later export adds a\nreading rather than replacing an earlier one, so the rows are a time series\nand the reading with the latest readingDate is an activity's current\nfigures. The events service appends and enforces no uniqueness, so\nre-importing an export records the same key twice: readers take, for each\nkey, the most recently recorded event and must not sum duplicates. The figures come from a\nLinkedIn page content export's \"All posts\" sheet, whose header sits under\na disclaimer row; readingDate is that export's date, the day the figures\nwere true as of. `matched` records whether the row's link resolved to a\nstored content activity at import (through `content.promotion_link`,\nper-profile entries of an `all` row included); an unmatched row is kept,\nnot dropped - the post was made outside Blowhorn and is still the page's\nreception. Every figure is nullable: a blank figure in the source export\nis not a zero.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "platform",
          "activityRef",
          "readingDate",
          "subject",
          "link",
          "matched",
          "sourceFile"
        ],
        "properties": {
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "Owning organization ID.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 1
          },
          "platform": {
            "type": "string",
            "maxLength": 64,
            "description": "The platform the activity was posted to (today only `linkedin` produces these exports).",
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 2
          },
          "activityRef": {
            "type": "string",
            "maxLength": 255,
            "description": "The activity's platform identifier, normalized to its URN (`urn:li:activity:<id>`, `urn:li:share:<id>` or `urn:li:ugcPost:<id>`) so the encoded and plain spellings of one link agree. The URN kind is kept, so one post reached as both an activity URN and a share URN is two activityRefs; the exports name each post by one link, so readings of the same post line up across exports.",
            "x-oapi-codegen-extra-tags": {
              "db": "activity_ref"
            },
            "x-order": 3
          },
          "readingDate": {
            "type": "string",
            "format": "date",
            "description": "The export's date - the day the figures were read as of, as an ISO calendar date.",
            "x-oapi-codegen-extra-tags": {
              "db": "reading_date"
            },
            "x-order": 4
          },
          "subject": {
            "type": "string",
            "maxLength": 255,
            "description": "The page the export belongs to, named as the source export names it.",
            "x-oapi-codegen-extra-tags": {
              "db": "subject"
            },
            "x-order": 5
          },
          "link": {
            "type": "string",
            "maxLength": 2048,
            "description": "The post link as the export spelled it, before normalization to `activityRef`.",
            "x-oapi-codegen-extra-tags": {
              "db": "link"
            },
            "x-order": 6
          },
          "title": {
            "type": "string",
            "maxLength": 3000,
            "nullable": true,
            "description": "The post's title as the export gives it; null when the export names none.",
            "x-oapi-codegen-extra-tags": {
              "db": "title"
            },
            "x-order": 7
          },
          "postType": {
            "type": "string",
            "maxLength": 64,
            "nullable": true,
            "description": "The post's type as the export gives it (for example `Organic`); null when the export names none.",
            "x-oapi-codegen-extra-tags": {
              "db": "post_type"
            },
            "x-order": 8
          },
          "postedBy": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "Who the export says posted the activity; null when the export names none.",
            "x-oapi-codegen-extra-tags": {
              "db": "posted_by"
            },
            "x-order": 9
          },
          "createdDate": {
            "type": "string",
            "format": "date",
            "nullable": true,
            "description": "The day the activity was created, as an ISO calendar date; null when the export names none.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_date"
            },
            "x-order": 10
          },
          "audience": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "The audience the export names for the activity; null when it names none.",
            "x-oapi-codegen-extra-tags": {
              "db": "audience"
            },
            "x-order": 11
          },
          "contentType": {
            "type": "string",
            "maxLength": 64,
            "nullable": true,
            "description": "The content type the export names for the activity; null when it names none.",
            "x-oapi-codegen-extra-tags": {
              "db": "content_type"
            },
            "x-order": 12
          },
          "impressions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Impressions the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "impressions"
            },
            "x-order": 13
          },
          "views": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Views the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "views"
            },
            "x-order": 14
          },
          "offsiteViews": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Offsite views the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "offsite_views"
            },
            "x-order": 15
          },
          "clicks": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Clicks the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "clicks"
            },
            "x-order": 16
          },
          "clickThroughRate": {
            "type": "number",
            "format": "double",
            "nullable": true,
            "minimum": 0,
            "description": "Click-through rate as a fraction (0.05 is 5%); null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "click_through_rate"
            },
            "x-order": 17
          },
          "likes": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Likes the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "likes"
            },
            "x-order": 18
          },
          "comments": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Comments the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "comments"
            },
            "x-order": 19
          },
          "reposts": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Reposts the activity had gathered by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reposts"
            },
            "x-order": 20
          },
          "follows": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Follows the activity had produced by the reading date; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "follows"
            },
            "x-order": 21
          },
          "engagementRate": {
            "type": "number",
            "format": "double",
            "nullable": true,
            "minimum": 0,
            "description": "Engagement rate as a fraction (0.05 is 5%); null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "engagement_rate"
            },
            "x-order": 22
          },
          "matched": {
            "type": "boolean",
            "description": "Whether the activity's link resolved to a stored content activity at import.",
            "x-oapi-codegen-extra-tags": {
              "db": "matched"
            },
            "x-order": 23
          },
          "contentRow": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "The content row the activity matched, when it matched; null for an unmatched activity.",
            "x-oapi-codegen-extra-tags": {
              "db": "content_row"
            },
            "x-order": 24
          },
          "contentProfile": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "The profile whose promotion link matched, for a matched activity shared by several profiles; null when no single profile matched.",
            "x-oapi-codegen-extra-tags": {
              "db": "content_profile"
            },
            "x-order": 25
          },
          "sourceFile": {
            "type": "string",
            "maxLength": 1024,
            "description": "The export file the row was read from; empty when the row did not come from a file export.",
            "x-oapi-codegen-extra-tags": {
              "db": "source_file"
            },
            "x-order": 26
          }
        }
      },
      "ActivityMetricsPayload": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Activity Metrics Payload Schema",
        "description": "Payload for recording one activity's reception figures as of one export,\nsent as the `metadata` of a create-event call. Contains only\nclient-settable fields; the row has no server-generated fields, because\nthe events service stores and returns event metadata verbatim, so the\npayload and the recorded row (ActivityMetrics) share one field set.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "platform",
          "activityRef",
          "readingDate",
          "subject",
          "link",
          "matched",
          "sourceFile"
        ],
        "properties": {
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "Owning organization ID.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            },
            "x-go-name": "OrganizationID"
          },
          "platform": {
            "type": "string",
            "maxLength": 64,
            "description": "The platform the activity was posted to (today only `linkedin` produces these exports)."
          },
          "activityRef": {
            "type": "string",
            "maxLength": 255,
            "description": "The activity's platform identifier, normalized to its URN (`urn:li:activity:<id>`, `urn:li:share:<id>` or `urn:li:ugcPost:<id>`) so the encoded and plain spellings of one link agree. The URN kind is kept, so one post reached as both an activity URN and a share URN is two activityRefs; the exports name each post by one link, so readings of the same post line up across exports."
          },
          "readingDate": {
            "type": "string",
            "format": "date",
            "description": "The export's date - the day the figures were read as of, as an ISO calendar date."
          },
          "subject": {
            "type": "string",
            "maxLength": 255,
            "description": "The page the export belongs to, named as the source export names it."
          },
          "link": {
            "type": "string",
            "maxLength": 2048,
            "description": "The post link as the export spelled it, before normalization to `activityRef`."
          },
          "title": {
            "type": "string",
            "maxLength": 3000,
            "nullable": true,
            "description": "The post's title as the export gives it; null when the export names none."
          },
          "postType": {
            "type": "string",
            "maxLength": 64,
            "nullable": true,
            "description": "The post's type as the export gives it (for example `Organic`); null when the export names none."
          },
          "postedBy": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "Who the export says posted the activity; null when the export names none."
          },
          "createdDate": {
            "type": "string",
            "format": "date",
            "nullable": true,
            "description": "The day the activity was created, as an ISO calendar date; null when the export names none."
          },
          "audience": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "The audience the export names for the activity; null when it names none."
          },
          "contentType": {
            "type": "string",
            "maxLength": 64,
            "nullable": true,
            "description": "The content type the export names for the activity; null when it names none."
          },
          "impressions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Impressions the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "views": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Views the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "offsiteViews": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Offsite views the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "clicks": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Clicks the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "clickThroughRate": {
            "type": "number",
            "format": "double",
            "nullable": true,
            "minimum": 0,
            "description": "Click-through rate as a fraction (0.05 is 5%); null when the export's cell is blank."
          },
          "likes": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Likes the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "comments": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Comments the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "reposts": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Reposts the activity had gathered by the reading date; null when the export's cell is blank."
          },
          "follows": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Follows the activity had produced by the reading date; null when the export's cell is blank."
          },
          "engagementRate": {
            "type": "number",
            "format": "double",
            "nullable": true,
            "minimum": 0,
            "description": "Engagement rate as a fraction (0.05 is 5%); null when the export's cell is blank."
          },
          "matched": {
            "type": "boolean",
            "description": "Whether the activity's link resolved to a stored content activity at import."
          },
          "contentRow": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "The content row the activity matched, when it matched; null for an unmatched activity."
          },
          "contentProfile": {
            "type": "string",
            "maxLength": 255,
            "nullable": true,
            "description": "The profile whose promotion link matched, for a matched activity shared by several profiles; null when no single profile matched."
          },
          "sourceFile": {
            "type": "string",
            "maxLength": 1024,
            "description": "The export file the row was read from; empty when the row did not come from a file export."
          }
        }
      }
    }
  }
};

export default ActivityMetricsSchema;

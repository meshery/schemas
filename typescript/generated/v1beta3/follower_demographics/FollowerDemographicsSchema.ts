/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const FollowerDemographicsSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Follower Demographics",
    "description": "OpenAPI schema for follower-breakdown snapshot rows for a page,\nconsumed by Blowhorn's analytics store. The rows have no endpoints\nof their own: they are recorded and read back as the `metadata` of\nevents on the events service (category `blowhorn`, action\n`follower_demographics`; see the event construct), so this file\ndeclares the components only and the paths stay with the event\nconstruct.\n",
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
        "scheme": "Bearer [REDACTED]",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "FollowerDemographics": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Follower Demographics Schema",
        "description": "Server-returned follower-breakdown snapshot row for one page, as\nrecorded in the `metadata` of an event on the events service (category\n`blowhorn`, action `follower_demographics`); the event construct carries\nthe envelope and this construct names the metadata's own shape, which\nEvent leaves open. One row is one category of one breakdown of one page\non one day, keyed by (organizationId, platform, subject, readingDate,\ndimension, category): the page's follower total on that snapshot day\nfalls into exactly one category of each dimension, so a dimension's\ncategories sum to the page's total. `followers` is a cumulative count\non the day, not a daily change, and is nullable: a blank figure in the\nsource export is not a zero.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "platform",
          "subject",
          "readingDate",
          "dimension",
          "category"
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
            "description": "The platform the page belongs to (today only `linkedin` produces these exports).",
            "x-oapi-codegen-extra-tags": {
              "db": "platform"
            },
            "x-order": 2
          },
          "subject": {
            "type": "string",
            "description": "The page the figures describe, named as the source export names it.",
            "x-oapi-codegen-extra-tags": {
              "db": "subject"
            },
            "x-order": 3
          },
          "readingDate": {
            "type": "string",
            "format": "date",
            "description": "The day the snapshot describes, as an ISO calendar date.",
            "x-oapi-codegen-extra-tags": {
              "db": "reading_date"
            },
            "x-order": 4
          },
          "dimension": {
            "type": "string",
            "enum": [
              "location",
              "job_function",
              "seniority",
              "industry",
              "company_size"
            ],
            "description": "The breakdown the category belongs to; one value per breakdown sheet the source export carries.",
            "x-oapi-codegen-extra-tags": {
              "db": "dimension"
            },
            "x-order": 5
          },
          "category": {
            "type": "string",
            "description": "The breakdown row's label, verbatim from the source export (e.g. a location or an industry name).",
            "x-oapi-codegen-extra-tags": {
              "db": "category"
            },
            "x-order": 6
          },
          "followers": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "The page's cumulative followers in this category on the snapshot day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "followers"
            },
            "x-order": 7
          },
          "sourceFile": {
            "type": "string",
            "description": "The export file the row was read from; empty when the row did not come from a file export.",
            "x-oapi-codegen-extra-tags": {
              "db": "source_file"
            },
            "x-order": 8
          }
        }
      },
      "FollowerDemographicsPayload": {
        "type": "object",
        "description": "Payload for recording one follower-breakdown snapshot row for a\npage, sent as the `metadata` of a create-event call. Contains\nonly client-settable fields; the row has no server-generated\nfields, because the events service stores and returns event\nmetadata verbatim, so the payload and the recorded row\n(FollowerDemographics) share one field set.\n",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "platform",
          "subject",
          "readingDate",
          "dimension",
          "category"
        ],
        "properties": {
          "organizationId": {
            "type": "string",
            "format": "uuid",
            "description": "Owning organization ID.",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "platform": {
            "type": "string",
            "description": "The platform the page belongs to (today only `linkedin` produces these exports)."
          },
          "subject": {
            "type": "string",
            "description": "The page the figures describe, named as the source export names it."
          },
          "readingDate": {
            "type": "string",
            "format": "date",
            "description": "The day the snapshot describes, as an ISO calendar date."
          },
          "dimension": {
            "type": "string",
            "enum": [
              "location",
              "job_function",
              "seniority",
              "industry",
              "company_size"
            ],
            "description": "The breakdown the category belongs to; one value per breakdown sheet the source export carries."
          },
          "category": {
            "type": "string",
            "description": "The breakdown row's label, verbatim from the source export (e.g. a location or an industry name)."
          },
          "followers": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "The page's cumulative followers in this category on the snapshot day; null when the export's cell is blank."
          },
          "sourceFile": {
            "type": "string",
            "description": "The export file the row was read from; empty when the row did not come from a file export."
          }
        }
      }
    }
  }
};

export default FollowerDemographicsSchema;

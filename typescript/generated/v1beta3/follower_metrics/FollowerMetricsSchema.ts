/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const FollowerMetricsSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Follower Metrics",
    "description": "OpenAPI schema for daily new-follower figures for a page, consumed by\nBlowhorn's analytics store. The rows have no endpoints of their own:\nthey are recorded and read back as the `metadata` of events on the\nevents service (category `blowhorn`, action `follower_metrics`; see\nthe event construct), so this file declares the components only and\nthe paths stay with the event construct.\n",
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
      "FollowerMetrics": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Follower Metrics Schema",
        "description": "Server-returned daily new-follower figures for one page, as recorded in\nthe `metadata` of an event on the events service (category `blowhorn`,\naction `follower_metrics`); the event construct carries the envelope and\nthis construct names the metadata's own shape, which Event leaves open.\nOne row is one page on one day, keyed by (organizationId, platform,\nsubject, readingDate): the day's NEW followers split by the source that\nproduced them. The source export's \"Total followers\" column is a day's\ntotal of new followers, not a lifetime count. Every figure is nullable:\na blank figure in the source export is not a zero.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "platform",
          "subject",
          "readingDate"
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
            "description": "The day the figures describe, as an ISO calendar date.",
            "x-oapi-codegen-extra-tags": {
              "db": "reading_date"
            },
            "x-order": 4
          },
          "newSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "New followers that day from sponsored content; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "new_sponsored"
            },
            "x-order": 5
          },
          "newOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "New followers that day from organic content; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "new_organic"
            },
            "x-order": 6
          },
          "newAutoInvited": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "New followers that day from auto-invites; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "new_auto_invited"
            },
            "x-order": 7
          },
          "newTotal": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All new followers that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "new_total"
            },
            "x-order": 8
          },
          "sourceFile": {
            "type": "string",
            "description": "The export file the row was read from; empty when the row did not come from a file export.",
            "x-oapi-codegen-extra-tags": {
              "db": "source_file"
            },
            "x-order": 9
          }
        }
      },
      "FollowerMetricsPayload": {
        "type": "object",
        "description": "Payload for recording one day's new-follower figures for a page,\nsent as the `metadata` of a create-event call. Contains only\nclient-settable fields; the row has no server-generated fields,\nbecause the events service stores and returns event metadata\nverbatim, so the payload and the recorded row (FollowerMetrics)\nshare one field set.\n",
        "additionalProperties": false,
        "required": [
          "organizationId",
          "platform",
          "subject",
          "readingDate"
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
            "description": "The platform the page belongs to (today only `linkedin` produces these exports)."
          },
          "subject": {
            "type": "string",
            "description": "The page the figures describe, named as the source export names it."
          },
          "readingDate": {
            "type": "string",
            "format": "date",
            "description": "The day the figures describe, as an ISO calendar date."
          },
          "newSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "New followers that day from sponsored content; null when the export's cell is blank."
          },
          "newOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "New followers that day from organic content; null when the export's cell is blank."
          },
          "newAutoInvited": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "New followers that day from auto-invites; null when the export's cell is blank."
          },
          "newTotal": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All new followers that day; null when the export's cell is blank."
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

export default FollowerMetricsSchema;

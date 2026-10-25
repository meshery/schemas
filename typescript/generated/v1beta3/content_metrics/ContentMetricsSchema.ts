/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ContentMetricsSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Content Metrics",
    "description": "OpenAPI schema for daily content figures for a page, consumed by\nBlowhorn's analytics store. The rows have no endpoints of their own:\nthey are recorded and read back as the `metadata` of events on the\nevents service (category `blowhorn`, action `content_metrics`; see\nthe event construct), so this file declares the components only and\nthe paths stay with the event construct.",
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
      "ContentMetrics": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Content Metrics Schema",
        "description": "Server-returned daily content figures for one page, as recorded in the\n`metadata` of an event on the events service (category `blowhorn`,\naction `content_metrics`); the event construct carries the envelope and\nthis construct names the metadata's own shape, which Event leaves open.\nOne row is one page on one day, keyed by (organizationId, platform,\nsubject, readingDate): the day's impressions, clicks, reactions,\ncomments and reposts, each split organic / sponsored alongside its\ntotal, plus the engagement rates the source export reports. A figure\nexists only when the export carries its column — an export without a\nsponsored breakdown records no sponsored figures — and every figure is\nnullable: a blank cell is not a zero.\n",
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
          "impressionsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic impressions that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "impressions_organic"
            },
            "x-order": 5
          },
          "impressionsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored impressions that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "impressions_sponsored"
            },
            "x-order": 6
          },
          "impressions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All impressions that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "impressions"
            },
            "x-order": 7
          },
          "uniqueImpressions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Unique impressions that day (the export reports this figure for organic only); null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "unique_impressions"
            },
            "x-order": 8
          },
          "clicksOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic clicks that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "clicks_organic"
            },
            "x-order": 9
          },
          "clicksSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored clicks that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "clicks_sponsored"
            },
            "x-order": 10
          },
          "clicks": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All clicks that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "clicks"
            },
            "x-order": 11
          },
          "reactionsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic reactions that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reactions_organic"
            },
            "x-order": 12
          },
          "reactionsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored reactions that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reactions_sponsored"
            },
            "x-order": 13
          },
          "reactions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All reactions that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reactions"
            },
            "x-order": 14
          },
          "commentsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic comments that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "comments_organic"
            },
            "x-order": 15
          },
          "commentsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored comments that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "comments_sponsored"
            },
            "x-order": 16
          },
          "comments": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All comments that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "comments"
            },
            "x-order": 17
          },
          "repostsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic reposts that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reposts_organic"
            },
            "x-order": 18
          },
          "repostsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored reposts that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reposts_sponsored"
            },
            "x-order": 19
          },
          "reposts": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All reposts that day; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "reposts"
            },
            "x-order": 20
          },
          "engagementRateOrganic": {
            "type": "number",
            "nullable": true,
            "minimum": 0,
            "description": "Organic engagement rate that day, as the export reports it; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "engagement_rate_organic"
            },
            "x-order": 21
          },
          "engagementRateSponsored": {
            "type": "number",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored engagement rate that day, as the export reports it; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "engagement_rate_sponsored"
            },
            "x-order": 22
          },
          "engagementRate": {
            "type": "number",
            "nullable": true,
            "minimum": 0,
            "description": "Overall engagement rate that day, as the export reports it; null when the export's cell is blank.",
            "x-oapi-codegen-extra-tags": {
              "db": "engagement_rate"
            },
            "x-order": 23
          },
          "sourceFile": {
            "type": "string",
            "description": "The export file the row was read from; empty when the row did not come from a file export.",
            "x-oapi-codegen-extra-tags": {
              "db": "source_file"
            },
            "x-order": 24
          }
        }
      },
      "ContentMetricsPayload": {
        "type": "object",
        "description": "Payload for recording one day's content figures for a page, sent as\nthe `metadata` of a create-event call. Contains only client-settable\nfields; the row has no server-generated fields, because the events\nservice stores and returns event metadata verbatim, so the payload\nand the recorded row (ContentMetrics) share one field set.",
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
            "description": "The day the figures describe, as an ISO calendar date."
          },
          "impressionsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic impressions that day; null when the export's cell is blank."
          },
          "impressionsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored impressions that day; null when the export's cell is blank."
          },
          "impressions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All impressions that day; null when the export's cell is blank."
          },
          "uniqueImpressions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Unique impressions that day (the export reports this figure for organic only); null when the export's cell is blank."
          },
          "clicksOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic clicks that day; null when the export's cell is blank."
          },
          "clicksSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored clicks that day; null when the export's cell is blank."
          },
          "clicks": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All clicks that day; null when the export's cell is blank."
          },
          "reactionsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic reactions that day; null when the export's cell is blank."
          },
          "reactionsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored reactions that day; null when the export's cell is blank."
          },
          "reactions": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All reactions that day; null when the export's cell is blank."
          },
          "commentsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic comments that day; null when the export's cell is blank."
          },
          "commentsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored comments that day; null when the export's cell is blank."
          },
          "comments": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All comments that day; null when the export's cell is blank."
          },
          "repostsOrganic": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Organic reposts that day; null when the export's cell is blank."
          },
          "repostsSponsored": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored reposts that day; null when the export's cell is blank."
          },
          "reposts": {
            "type": "integer",
            "nullable": true,
            "minimum": 0,
            "description": "All reposts that day; null when the export's cell is blank."
          },
          "engagementRateOrganic": {
            "type": "number",
            "nullable": true,
            "minimum": 0,
            "description": "Organic engagement rate that day, as the export reports it; null when the export's cell is blank."
          },
          "engagementRateSponsored": {
            "type": "number",
            "nullable": true,
            "minimum": 0,
            "description": "Sponsored engagement rate that day, as the export reports it; null when the export's cell is blank."
          },
          "engagementRate": {
            "type": "number",
            "nullable": true,
            "minimum": 0,
            "description": "Overall engagement rate that day, as the export reports it; null when the export's cell is blank."
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

export default ContentMetricsSchema;

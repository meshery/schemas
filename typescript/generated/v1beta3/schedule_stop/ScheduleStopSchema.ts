/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ScheduleStopSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Schedule Stop",
    "description": "OpenAPI schema for the organization-wide stop of scheduled work,\nconsumed by Blowhorn's kill switch (`blowhorn stop --all`). The stop\nhas no endpoints of its own: it is read and written as the\n`scheduleStop` member of the organization's preferences (the\norganization construct's getOrgPreferences and patchOrgPreferences\non /api/identity/orgs/{orgId}/preferences), beside `schedulePause`,\nso this file declares the components only and the paths stay with\nthe organization construct. Only organization admins may set or\nlift it, as with the pause; a preferences patch that omits\n`scheduleStop` keeps the current stop unchanged.\n",
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
      "ScheduleStop": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Schedule Stop Schema",
        "description": "The organization-wide stop of scheduled work - the kill switch beside\nthe schedule pause - stored in organization.metadata.preferences under\n`scheduleStop`. While `stopped` is true, every acting process in the\norganization stops at its next safe point, and the pause the stop raised\nholds new claims; a pause alone only holds claims and lets the work in\nflight finish, which is why the stop is a record of its own and not a\nmember of SchedulePause. Set or lift it by updating the organization's\npreferences; there is no stop route. Unset is treated as not stopped.\nLifting the stop (`stopped` false) clears `reason`, `raisedPause`,\n`stoppedAt` and `stoppedBy` on the server, so a stored `stopped` false\nnever carries a stale stop time or identity. `raisedPause` records\nwhether this stop raised the organization pause: the client that lifts\nthe stop reads it to lift only the pause the stop itself set, never one\nthat predates the stop or was re-set while the stop stood.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "stopped"
        ],
        "properties": {
          "stopped": {
            "type": "boolean",
            "description": "Whether every acting process in the organization is stopped.",
            "x-order": 1
          },
          "reason": {
            "type": "string",
            "maxLength": 1000,
            "description": "Reason given for the stop. Cleared when the stop is lifted.",
            "x-oapi-codegen-extra-tags": {
              "db": "stop_reason"
            },
            "x-order": 2
          },
          "raisedPause": {
            "type": "boolean",
            "description": "Whether this stop raised the organization-wide schedule pause. Recorded by the client that set the stop; cleared when the stop is lifted.",
            "x-oapi-codegen-extra-tags": {
              "db": "stop_raised_pause"
            },
            "x-order": 3
          },
          "stoppedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time the stop was set. Server-managed; recorded when `stopped` turns true and cleared when it is lifted.",
            "x-oapi-codegen-extra-tags": {
              "db": "stopped_at"
            },
            "x-order": 4
          },
          "stoppedBy": {
            "type": "string",
            "maxLength": 255,
            "description": "Identity that set the stop. Server-managed; recorded when `stopped` turns true and cleared when it is lifted.",
            "x-oapi-codegen-extra-tags": {
              "db": "stopped_by"
            },
            "x-order": 5
          }
        }
      },
      "ScheduleStopPayload": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Schedule Stop Payload Schema",
        "description": "Client-settable organization stop: the member a client sends under\n`scheduleStop` in an organization preferences patch. Carries only\n`stopped`, `reason` and `raisedPause`; `stoppedAt` and `stoppedBy` are\nrecorded by the server and refused here. `stopped` is required whenever\n`scheduleStop` is sent, so a write can never lift the stop by omission.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "stopped"
        ],
        "properties": {
          "stopped": {
            "type": "boolean",
            "description": "Whether every acting process in the organization is stopped.",
            "x-order": 1
          },
          "reason": {
            "type": "string",
            "maxLength": 1000,
            "description": "Reason given for the stop. Cleared when the stop is lifted.",
            "x-oapi-codegen-extra-tags": {
              "db": "stop_reason"
            },
            "x-order": 2
          },
          "raisedPause": {
            "type": "boolean",
            "description": "Whether this stop raised the organization-wide schedule pause. Recorded by the client that set the stop; cleared when the stop is lifted.",
            "x-oapi-codegen-extra-tags": {
              "db": "stop_raised_pause"
            },
            "x-order": 3
          }
        }
      }
    }
  }
};

export default ScheduleStopSchema;

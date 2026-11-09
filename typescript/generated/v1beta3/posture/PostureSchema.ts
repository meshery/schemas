/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const PostureSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Posture",
    "description": "OpenAPI schema for Postures: the named presets that decide how a\nworkload runs - its pace, its share of each built-in cap, its quiet\nhours and the pause it takes after a sign-in challenge. A Posture is a\nproduct-level concept, not a property of any one construct: the same\npreset value is referenced wherever a preset is chosen or resolved - a\nprofile's per-platform binding, an account default, and a schedule's\noptional `posture` override (Blowhorn #1009). The component has no\nendpoints of its own; referencing constructs declare the property, so\nthe paths stay with them.\n",
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
      "Posture": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Posture Schema",
        "description": "The Posture preset value. Wherever the value is carried, the workload\nruns that preset end to end - pace, share of each built-in cap, quiet\nhours and the pause after a sign-in challenge - instead of the preset\nthe surrounding resolution (profile x platform, configuration,\nenvironment, account preference, defaults) would otherwise produce;\nomitting the value inherits that resolution unchanged. The value is a\npreset name, never `custom`: custom is a reported state of a profile\nwhose dials sit outside its preset, not a choice anything can make.\nReferenced by the optional `posture` property on the schedule\nconstruct's `Schedule` and `SchedulePayload` components\n(`v1beta3/schedule`). A new carrier references this component rather\nthan restating the enum.\n",
        "type": "string",
        "enum": [
          "cautious",
          "standard",
          "brisk"
        ]
      }
    }
  }
};

export default PostureSchema;

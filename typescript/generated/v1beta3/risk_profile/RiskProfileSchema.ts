/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const RiskProfileSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "Risk Profile",
    "description": "OpenAPI schema for Risk Profiles: the named presets that decide how a\nworkload runs - its pace, its share of each built-in cap, its quiet\nhours and the pause it takes after a sign-in challenge. A Risk Profile\nis a product-level concept, not a property of any one construct: the\nsame preset value is referenced wherever a preset is chosen or\nresolved - a profile's per-platform binding, an account default, and a\nschedule's optional `riskProfile` override (Blowhorn #1009). The\ncomponent has no endpoints of its own; referencing constructs declare\nthe property, so the paths stay with them.\n",
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
      "RiskProfile": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Risk Profile Schema",
        "description": "The Risk Profile preset value. Wherever the value is carried, the\nworkload runs that preset end to end - pace, share of each built-in cap,\nquiet hours and the pause after a sign-in challenge - instead of the\npreset the surrounding resolution (profile x platform, configuration,\nenvironment, account preference, defaults) would otherwise produce;\nomitting the value inherits that resolution unchanged. The value is a\npreset name, never `custom`: custom is a reported state of a profile\nwhose dials sit outside its preset, not a choice anything can make.\nReferenced by the optional `riskProfile` property on the schedule\nconstruct's `Schedule` and `SchedulePayload` components\n(`v1beta3/schedule`). A new carrier references this component rather\nthan restating the enum.\n",
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

export default RiskProfileSchema;

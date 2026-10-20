/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const ActivityResultSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "ActivityResult",
    "description": "OpenAPI schema for the result of one activity: delivery per profile and\nplatform, reception where it is collected, and derived follower context.\nContract only; it declares no endpoints. Clients that assemble a result\nlocally (a command line, a desktop panel) and a server that later serves\nit share these types.\n",
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
    "schemas": {
      "ActivityResult": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Activity Result Schema",
        "description": "The result of one activity: whether it went out on each platform and for\neach profile it was addressed to, how it was received where reception is\ncollected, and the follower change around it. One entry per profile and\nplatform. Every figure says whether it was measured or derived, and\nanything not collected says so with a reason instead of a zero.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "activityId",
          "kind",
          "platform",
          "generatedAt",
          "entries"
        ],
        "properties": {
          "activityId": {
            "type": "string",
            "description": "Identifier of the activity the result describes (for a content piece, its row number as a string).",
            "minLength": 1,
            "maxLength": 255,
            "x-order": 1
          },
          "kind": {
            "type": "string",
            "description": "What the activity does, such as post, repost, comment, like, connect or invite.",
            "minLength": 1,
            "maxLength": 64,
            "x-order": 2
          },
          "platform": {
            "type": "string",
            "description": "Platform the activity targets (for example linkedin, x, bluesky).",
            "minLength": 1,
            "maxLength": 64,
            "x-order": 3
          },
          "title": {
            "type": "string",
            "description": "Short human-readable preview of the activity.",
            "maxLength": 512,
            "x-order": 4
          },
          "state": {
            "type": "string",
            "description": "The activity's queue state when the result was read (for example done, partial, pending, scheduled, draft).",
            "maxLength": 64,
            "x-order": 5
          },
          "generatedAt": {
            "description": "When this result was assembled.",
            "x-order": 6,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "entries": {
            "type": "array",
            "description": "One entry per profile and platform the activity is addressed to.",
            "items": {
              "type": "object",
              "description": "The result of an activity for one profile on one platform.",
              "additionalProperties": false,
              "required": [
                "profile",
                "platform",
                "delivery",
                "reception",
                "followerChange"
              ],
              "properties": {
                "profile": {
                  "type": "string",
                  "description": "Profile the entry is for.",
                  "minLength": 1,
                  "maxLength": 255
                },
                "platform": {
                  "type": "string",
                  "description": "Platform the entry is for.",
                  "minLength": 1,
                  "maxLength": 64
                },
                "delivery": {
                  "type": "object",
                  "description": "Whether the activity went out for this profile and platform, from the\nrecorded outcome and the run log. Measured, never derived.\n",
                  "additionalProperties": false,
                  "required": [
                    "status",
                    "evidence"
                  ],
                  "properties": {
                    "status": {
                      "type": "string",
                      "description": "delivered (it went out), unconfirmed (the action was taken but its\noutcome could not be read), failed (the last attempt failed and it\nhas not gone out), scheduled (due later), pending (due and not yet\nrun), draft (not approved, so it will not run).\n",
                      "enum": [
                        "delivered",
                        "unconfirmed",
                        "failed",
                        "scheduled",
                        "pending",
                        "draft"
                      ]
                    },
                    "evidence": {
                      "type": "string",
                      "description": "What the status rests on: recorded (the outcome stored on the\nactivity), run (a run log entry), or none (nothing has happened yet).\n",
                      "enum": [
                        "recorded",
                        "run",
                        "none"
                      ]
                    },
                    "deliveredAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When it went out, as recorded.",
                      "nullable": true
                    },
                    "scheduledFor": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When it is due, for a scheduled or pending activity.",
                      "nullable": true
                    },
                    "link": {
                      "type": "string",
                      "description": "Link to the live item on the platform.",
                      "maxLength": 2048,
                      "nullable": true
                    },
                    "computer": {
                      "type": "string",
                      "description": "Host name of the computer whose run delivered or attempted it.",
                      "maxLength": 255,
                      "nullable": true
                    },
                    "browserProfile": {
                      "type": "object",
                      "description": "The browser profile a run used on its computer, when one was mapped. Null when unknown.",
                      "nullable": true,
                      "additionalProperties": false,
                      "required": [
                        "directory"
                      ],
                      "properties": {
                        "directory": {
                          "type": "string",
                          "description": "Browser profile directory name.",
                          "minLength": 1,
                          "maxLength": 255
                        },
                        "displayName": {
                          "type": "string",
                          "description": "Name the browser showed for the profile.",
                          "maxLength": 255
                        }
                      }
                    },
                    "runId": {
                      "type": "string",
                      "description": "Run log identifier of the run that delivered or attempted it.",
                      "maxLength": 255,
                      "nullable": true
                    },
                    "attemptedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "When the matched run ended.",
                      "nullable": true
                    },
                    "durationSeconds": {
                      "type": "number",
                      "description": "How long the matched run took.",
                      "minimum": 0,
                      "nullable": true
                    },
                    "error": {
                      "type": "string",
                      "description": "The error the last failed attempt reported.",
                      "maxLength": 4096,
                      "nullable": true
                    },
                    "fix": {
                      "type": "object",
                      "description": "What to do about a failed delivery. Null when nothing failed.",
                      "nullable": true,
                      "additionalProperties": false,
                      "required": [
                        "summary"
                      ],
                      "properties": {
                        "summary": {
                          "type": "string",
                          "description": "One plain sentence saying what to do next.",
                          "minLength": 1,
                          "maxLength": 1024
                        },
                        "command": {
                          "type": "string",
                          "description": "A command line that performs the fix, when there is one.",
                          "maxLength": 1024,
                          "nullable": true
                        }
                      }
                    },
                    "logPath": {
                      "type": "string",
                      "description": "Log file of the matched run, on the computer that ran it.",
                      "maxLength": 2048,
                      "nullable": true
                    }
                  }
                },
                "reception": {
                  "type": "object",
                  "description": "How the activity was received. Measured figures with the date they were\nread, or collected false with a reason. Never zeros for missing data.\n",
                  "additionalProperties": false,
                  "required": [
                    "collected",
                    "measured"
                  ],
                  "properties": {
                    "collected": {
                      "type": "boolean",
                      "description": "Whether any reception figures exist for this entry."
                    },
                    "measured": {
                      "type": "boolean",
                      "description": "Always true; reception figures are read from the platform, not computed."
                    },
                    "reason": {
                      "type": "string",
                      "description": "Why reception is not collected: platform (nothing collects reception\nfor this platform yet), notdelivered (it has not gone out),\nnolink (no live link to match on), notmatched (no collected figures\nmatch its link yet), unavailable (the store does not hold reception\nfigures).\n",
                      "enum": [
                        "platform",
                        "notdelivered",
                        "nolink",
                        "notmatched",
                        "unavailable"
                      ]
                    },
                    "message": {
                      "type": "string",
                      "description": "One plain sentence for a person explaining the reason.",
                      "maxLength": 1024
                    },
                    "subject": {
                      "type": "string",
                      "description": "Account or page the figures belong to.",
                      "maxLength": 255
                    },
                    "source": {
                      "type": "string",
                      "description": "Where the figures came from, for example a platform analytics export.",
                      "maxLength": 255
                    },
                    "asOf": {
                      "type": "string",
                      "format": "date",
                      "description": "Date the figures were read; they do not change after it.",
                      "nullable": true
                    },
                    "metrics": {
                      "type": "object",
                      "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                      "additionalProperties": {
                        "type": "number"
                      },
                      "properties": {
                        "impressions": {
                          "type": "number",
                          "nullable": true,
                          "description": "Times the activity was shown."
                        },
                        "views": {
                          "type": "number",
                          "nullable": true,
                          "description": "Views, for media activities."
                        },
                        "offsiteViews": {
                          "type": "number",
                          "nullable": true,
                          "description": "Views outside the platform."
                        },
                        "clicks": {
                          "type": "number",
                          "nullable": true,
                          "description": "Clicks on the activity."
                        },
                        "clickThroughRate": {
                          "type": "number",
                          "nullable": true,
                          "description": "Clicks divided by impressions, as a fraction."
                        },
                        "likes": {
                          "type": "number",
                          "nullable": true,
                          "description": "Likes or reactions."
                        },
                        "comments": {
                          "type": "number",
                          "nullable": true,
                          "description": "Comments."
                        },
                        "reposts": {
                          "type": "number",
                          "nullable": true,
                          "description": "Reposts or shares."
                        },
                        "follows": {
                          "type": "number",
                          "nullable": true,
                          "description": "Follows attributed to the activity."
                        },
                        "engagementRate": {
                          "type": "number",
                          "nullable": true,
                          "description": "Engagements divided by impressions, as a fraction."
                        }
                      }
                    },
                    "comparison": {
                      "type": "object",
                      "description": "Derived. How this activity's figures compare with the same subject's\nother activities: the median of each figure and this activity's ratio\nto it. Null when there are too few other activities to compare with.\n",
                      "nullable": true,
                      "additionalProperties": false,
                      "required": [
                        "basis",
                        "sampleSize",
                        "median",
                        "ratio"
                      ],
                      "properties": {
                        "basis": {
                          "type": "string",
                          "description": "How the typical activity is computed.",
                          "enum": [
                            "median"
                          ]
                        },
                        "sampleSize": {
                          "type": "integer",
                          "description": "How many other activities the median is taken over.",
                          "minimum": 0
                        },
                        "median": {
                          "type": "object",
                          "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                          "additionalProperties": {
                            "type": "number"
                          },
                          "properties": {
                            "impressions": {
                              "type": "number",
                              "nullable": true,
                              "description": "Times the activity was shown."
                            },
                            "views": {
                              "type": "number",
                              "nullable": true,
                              "description": "Views, for media activities."
                            },
                            "offsiteViews": {
                              "type": "number",
                              "nullable": true,
                              "description": "Views outside the platform."
                            },
                            "clicks": {
                              "type": "number",
                              "nullable": true,
                              "description": "Clicks on the activity."
                            },
                            "clickThroughRate": {
                              "type": "number",
                              "nullable": true,
                              "description": "Clicks divided by impressions, as a fraction."
                            },
                            "likes": {
                              "type": "number",
                              "nullable": true,
                              "description": "Likes or reactions."
                            },
                            "comments": {
                              "type": "number",
                              "nullable": true,
                              "description": "Comments."
                            },
                            "reposts": {
                              "type": "number",
                              "nullable": true,
                              "description": "Reposts or shares."
                            },
                            "follows": {
                              "type": "number",
                              "nullable": true,
                              "description": "Follows attributed to the activity."
                            },
                            "engagementRate": {
                              "type": "number",
                              "nullable": true,
                              "description": "Engagements divided by impressions, as a fraction."
                            }
                          }
                        },
                        "ratio": {
                          "type": "object",
                          "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                          "additionalProperties": {
                            "type": "number"
                          },
                          "properties": {
                            "impressions": {
                              "type": "number",
                              "nullable": true,
                              "description": "Times the activity was shown."
                            },
                            "views": {
                              "type": "number",
                              "nullable": true,
                              "description": "Views, for media activities."
                            },
                            "offsiteViews": {
                              "type": "number",
                              "nullable": true,
                              "description": "Views outside the platform."
                            },
                            "clicks": {
                              "type": "number",
                              "nullable": true,
                              "description": "Clicks on the activity."
                            },
                            "clickThroughRate": {
                              "type": "number",
                              "nullable": true,
                              "description": "Clicks divided by impressions, as a fraction."
                            },
                            "likes": {
                              "type": "number",
                              "nullable": true,
                              "description": "Likes or reactions."
                            },
                            "comments": {
                              "type": "number",
                              "nullable": true,
                              "description": "Comments."
                            },
                            "reposts": {
                              "type": "number",
                              "nullable": true,
                              "description": "Reposts or shares."
                            },
                            "follows": {
                              "type": "number",
                              "nullable": true,
                              "description": "Follows attributed to the activity."
                            },
                            "engagementRate": {
                              "type": "number",
                              "nullable": true,
                              "description": "Engagements divided by impressions, as a fraction."
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "followerChange": {
                  "type": "object",
                  "description": "Derived. The subject's follower count at the reading before the activity\nand the first reading at least the stated number of days after it.\nCorrelation only; it does not claim the activity caused the change.\n",
                  "additionalProperties": false,
                  "required": [
                    "collected",
                    "derived"
                  ],
                  "properties": {
                    "collected": {
                      "type": "boolean",
                      "description": "Whether follower readings exist on both sides of the activity."
                    },
                    "derived": {
                      "type": "boolean",
                      "description": "Always true; the change is computed from two measured readings."
                    },
                    "reason": {
                      "type": "string",
                      "description": "Why there is no change: platform (followers are not collected for\nthis subject's platform), notdelivered, noreadings (no reading on\none side of the activity yet).\n",
                      "enum": [
                        "platform",
                        "notdelivered",
                        "noreadings"
                      ]
                    },
                    "message": {
                      "type": "string",
                      "description": "One plain sentence for a person explaining the reason.",
                      "maxLength": 1024
                    },
                    "subject": {
                      "type": "string",
                      "description": "Account or page whose followers were read.",
                      "maxLength": 255
                    },
                    "formula": {
                      "type": "string",
                      "description": "How the change is computed.",
                      "maxLength": 512
                    },
                    "windowDays": {
                      "type": "integer",
                      "description": "Days after the activity the later reading is taken from, at least.",
                      "minimum": 0
                    },
                    "before": {
                      "type": "object",
                      "description": "One measured follower reading. Null when there is none.",
                      "nullable": true,
                      "additionalProperties": false,
                      "required": [
                        "date",
                        "followers"
                      ],
                      "properties": {
                        "date": {
                          "type": "string",
                          "format": "date",
                          "description": "Date of the reading."
                        },
                        "followers": {
                          "type": "integer",
                          "description": "Followers at that reading.",
                          "minimum": 0
                        }
                      }
                    },
                    "after": {
                      "type": "object",
                      "description": "One measured follower reading. Null when there is none.",
                      "nullable": true,
                      "additionalProperties": false,
                      "required": [
                        "date",
                        "followers"
                      ],
                      "properties": {
                        "date": {
                          "type": "string",
                          "format": "date",
                          "description": "Date of the reading."
                        },
                        "followers": {
                          "type": "integer",
                          "description": "Followers at that reading.",
                          "minimum": 0
                        }
                      }
                    },
                    "change": {
                      "type": "integer",
                      "description": "after.followers minus before.followers.",
                      "nullable": true
                    }
                  }
                }
              }
            },
            "x-order": 7
          }
        }
      },
      "ActivityResultEntry": {
        "type": "object",
        "description": "The result of an activity for one profile on one platform.",
        "additionalProperties": false,
        "required": [
          "profile",
          "platform",
          "delivery",
          "reception",
          "followerChange"
        ],
        "properties": {
          "profile": {
            "type": "string",
            "description": "Profile the entry is for.",
            "minLength": 1,
            "maxLength": 255
          },
          "platform": {
            "type": "string",
            "description": "Platform the entry is for.",
            "minLength": 1,
            "maxLength": 64
          },
          "delivery": {
            "type": "object",
            "description": "Whether the activity went out for this profile and platform, from the\nrecorded outcome and the run log. Measured, never derived.\n",
            "additionalProperties": false,
            "required": [
              "status",
              "evidence"
            ],
            "properties": {
              "status": {
                "type": "string",
                "description": "delivered (it went out), unconfirmed (the action was taken but its\noutcome could not be read), failed (the last attempt failed and it\nhas not gone out), scheduled (due later), pending (due and not yet\nrun), draft (not approved, so it will not run).\n",
                "enum": [
                  "delivered",
                  "unconfirmed",
                  "failed",
                  "scheduled",
                  "pending",
                  "draft"
                ]
              },
              "evidence": {
                "type": "string",
                "description": "What the status rests on: recorded (the outcome stored on the\nactivity), run (a run log entry), or none (nothing has happened yet).\n",
                "enum": [
                  "recorded",
                  "run",
                  "none"
                ]
              },
              "deliveredAt": {
                "type": "string",
                "format": "date-time",
                "description": "When it went out, as recorded.",
                "nullable": true
              },
              "scheduledFor": {
                "type": "string",
                "format": "date-time",
                "description": "When it is due, for a scheduled or pending activity.",
                "nullable": true
              },
              "link": {
                "type": "string",
                "description": "Link to the live item on the platform.",
                "maxLength": 2048,
                "nullable": true
              },
              "computer": {
                "type": "string",
                "description": "Host name of the computer whose run delivered or attempted it.",
                "maxLength": 255,
                "nullable": true
              },
              "browserProfile": {
                "type": "object",
                "description": "The browser profile a run used on its computer, when one was mapped. Null when unknown.",
                "nullable": true,
                "additionalProperties": false,
                "required": [
                  "directory"
                ],
                "properties": {
                  "directory": {
                    "type": "string",
                    "description": "Browser profile directory name.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "displayName": {
                    "type": "string",
                    "description": "Name the browser showed for the profile.",
                    "maxLength": 255
                  }
                }
              },
              "runId": {
                "type": "string",
                "description": "Run log identifier of the run that delivered or attempted it.",
                "maxLength": 255,
                "nullable": true
              },
              "attemptedAt": {
                "type": "string",
                "format": "date-time",
                "description": "When the matched run ended.",
                "nullable": true
              },
              "durationSeconds": {
                "type": "number",
                "description": "How long the matched run took.",
                "minimum": 0,
                "nullable": true
              },
              "error": {
                "type": "string",
                "description": "The error the last failed attempt reported.",
                "maxLength": 4096,
                "nullable": true
              },
              "fix": {
                "type": "object",
                "description": "What to do about a failed delivery. Null when nothing failed.",
                "nullable": true,
                "additionalProperties": false,
                "required": [
                  "summary"
                ],
                "properties": {
                  "summary": {
                    "type": "string",
                    "description": "One plain sentence saying what to do next.",
                    "minLength": 1,
                    "maxLength": 1024
                  },
                  "command": {
                    "type": "string",
                    "description": "A command line that performs the fix, when there is one.",
                    "maxLength": 1024,
                    "nullable": true
                  }
                }
              },
              "logPath": {
                "type": "string",
                "description": "Log file of the matched run, on the computer that ran it.",
                "maxLength": 2048,
                "nullable": true
              }
            }
          },
          "reception": {
            "type": "object",
            "description": "How the activity was received. Measured figures with the date they were\nread, or collected false with a reason. Never zeros for missing data.\n",
            "additionalProperties": false,
            "required": [
              "collected",
              "measured"
            ],
            "properties": {
              "collected": {
                "type": "boolean",
                "description": "Whether any reception figures exist for this entry."
              },
              "measured": {
                "type": "boolean",
                "description": "Always true; reception figures are read from the platform, not computed."
              },
              "reason": {
                "type": "string",
                "description": "Why reception is not collected: platform (nothing collects reception\nfor this platform yet), notdelivered (it has not gone out),\nnolink (no live link to match on), notmatched (no collected figures\nmatch its link yet), unavailable (the store does not hold reception\nfigures).\n",
                "enum": [
                  "platform",
                  "notdelivered",
                  "nolink",
                  "notmatched",
                  "unavailable"
                ]
              },
              "message": {
                "type": "string",
                "description": "One plain sentence for a person explaining the reason.",
                "maxLength": 1024
              },
              "subject": {
                "type": "string",
                "description": "Account or page the figures belong to.",
                "maxLength": 255
              },
              "source": {
                "type": "string",
                "description": "Where the figures came from, for example a platform analytics export.",
                "maxLength": 255
              },
              "asOf": {
                "type": "string",
                "format": "date",
                "description": "Date the figures were read; they do not change after it.",
                "nullable": true
              },
              "metrics": {
                "type": "object",
                "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                "additionalProperties": {
                  "type": "number"
                },
                "properties": {
                  "impressions": {
                    "type": "number",
                    "nullable": true,
                    "description": "Times the activity was shown."
                  },
                  "views": {
                    "type": "number",
                    "nullable": true,
                    "description": "Views, for media activities."
                  },
                  "offsiteViews": {
                    "type": "number",
                    "nullable": true,
                    "description": "Views outside the platform."
                  },
                  "clicks": {
                    "type": "number",
                    "nullable": true,
                    "description": "Clicks on the activity."
                  },
                  "clickThroughRate": {
                    "type": "number",
                    "nullable": true,
                    "description": "Clicks divided by impressions, as a fraction."
                  },
                  "likes": {
                    "type": "number",
                    "nullable": true,
                    "description": "Likes or reactions."
                  },
                  "comments": {
                    "type": "number",
                    "nullable": true,
                    "description": "Comments."
                  },
                  "reposts": {
                    "type": "number",
                    "nullable": true,
                    "description": "Reposts or shares."
                  },
                  "follows": {
                    "type": "number",
                    "nullable": true,
                    "description": "Follows attributed to the activity."
                  },
                  "engagementRate": {
                    "type": "number",
                    "nullable": true,
                    "description": "Engagements divided by impressions, as a fraction."
                  }
                }
              },
              "comparison": {
                "type": "object",
                "description": "Derived. How this activity's figures compare with the same subject's\nother activities: the median of each figure and this activity's ratio\nto it. Null when there are too few other activities to compare with.\n",
                "nullable": true,
                "additionalProperties": false,
                "required": [
                  "basis",
                  "sampleSize",
                  "median",
                  "ratio"
                ],
                "properties": {
                  "basis": {
                    "type": "string",
                    "description": "How the typical activity is computed.",
                    "enum": [
                      "median"
                    ]
                  },
                  "sampleSize": {
                    "type": "integer",
                    "description": "How many other activities the median is taken over.",
                    "minimum": 0
                  },
                  "median": {
                    "type": "object",
                    "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                    "additionalProperties": {
                      "type": "number"
                    },
                    "properties": {
                      "impressions": {
                        "type": "number",
                        "nullable": true,
                        "description": "Times the activity was shown."
                      },
                      "views": {
                        "type": "number",
                        "nullable": true,
                        "description": "Views, for media activities."
                      },
                      "offsiteViews": {
                        "type": "number",
                        "nullable": true,
                        "description": "Views outside the platform."
                      },
                      "clicks": {
                        "type": "number",
                        "nullable": true,
                        "description": "Clicks on the activity."
                      },
                      "clickThroughRate": {
                        "type": "number",
                        "nullable": true,
                        "description": "Clicks divided by impressions, as a fraction."
                      },
                      "likes": {
                        "type": "number",
                        "nullable": true,
                        "description": "Likes or reactions."
                      },
                      "comments": {
                        "type": "number",
                        "nullable": true,
                        "description": "Comments."
                      },
                      "reposts": {
                        "type": "number",
                        "nullable": true,
                        "description": "Reposts or shares."
                      },
                      "follows": {
                        "type": "number",
                        "nullable": true,
                        "description": "Follows attributed to the activity."
                      },
                      "engagementRate": {
                        "type": "number",
                        "nullable": true,
                        "description": "Engagements divided by impressions, as a fraction."
                      }
                    }
                  },
                  "ratio": {
                    "type": "object",
                    "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                    "additionalProperties": {
                      "type": "number"
                    },
                    "properties": {
                      "impressions": {
                        "type": "number",
                        "nullable": true,
                        "description": "Times the activity was shown."
                      },
                      "views": {
                        "type": "number",
                        "nullable": true,
                        "description": "Views, for media activities."
                      },
                      "offsiteViews": {
                        "type": "number",
                        "nullable": true,
                        "description": "Views outside the platform."
                      },
                      "clicks": {
                        "type": "number",
                        "nullable": true,
                        "description": "Clicks on the activity."
                      },
                      "clickThroughRate": {
                        "type": "number",
                        "nullable": true,
                        "description": "Clicks divided by impressions, as a fraction."
                      },
                      "likes": {
                        "type": "number",
                        "nullable": true,
                        "description": "Likes or reactions."
                      },
                      "comments": {
                        "type": "number",
                        "nullable": true,
                        "description": "Comments."
                      },
                      "reposts": {
                        "type": "number",
                        "nullable": true,
                        "description": "Reposts or shares."
                      },
                      "follows": {
                        "type": "number",
                        "nullable": true,
                        "description": "Follows attributed to the activity."
                      },
                      "engagementRate": {
                        "type": "number",
                        "nullable": true,
                        "description": "Engagements divided by impressions, as a fraction."
                      }
                    }
                  }
                }
              }
            }
          },
          "followerChange": {
            "type": "object",
            "description": "Derived. The subject's follower count at the reading before the activity\nand the first reading at least the stated number of days after it.\nCorrelation only; it does not claim the activity caused the change.\n",
            "additionalProperties": false,
            "required": [
              "collected",
              "derived"
            ],
            "properties": {
              "collected": {
                "type": "boolean",
                "description": "Whether follower readings exist on both sides of the activity."
              },
              "derived": {
                "type": "boolean",
                "description": "Always true; the change is computed from two measured readings."
              },
              "reason": {
                "type": "string",
                "description": "Why there is no change: platform (followers are not collected for\nthis subject's platform), notdelivered, noreadings (no reading on\none side of the activity yet).\n",
                "enum": [
                  "platform",
                  "notdelivered",
                  "noreadings"
                ]
              },
              "message": {
                "type": "string",
                "description": "One plain sentence for a person explaining the reason.",
                "maxLength": 1024
              },
              "subject": {
                "type": "string",
                "description": "Account or page whose followers were read.",
                "maxLength": 255
              },
              "formula": {
                "type": "string",
                "description": "How the change is computed.",
                "maxLength": 512
              },
              "windowDays": {
                "type": "integer",
                "description": "Days after the activity the later reading is taken from, at least.",
                "minimum": 0
              },
              "before": {
                "type": "object",
                "description": "One measured follower reading. Null when there is none.",
                "nullable": true,
                "additionalProperties": false,
                "required": [
                  "date",
                  "followers"
                ],
                "properties": {
                  "date": {
                    "type": "string",
                    "format": "date",
                    "description": "Date of the reading."
                  },
                  "followers": {
                    "type": "integer",
                    "description": "Followers at that reading.",
                    "minimum": 0
                  }
                }
              },
              "after": {
                "type": "object",
                "description": "One measured follower reading. Null when there is none.",
                "nullable": true,
                "additionalProperties": false,
                "required": [
                  "date",
                  "followers"
                ],
                "properties": {
                  "date": {
                    "type": "string",
                    "format": "date",
                    "description": "Date of the reading."
                  },
                  "followers": {
                    "type": "integer",
                    "description": "Followers at that reading.",
                    "minimum": 0
                  }
                }
              },
              "change": {
                "type": "integer",
                "description": "after.followers minus before.followers.",
                "nullable": true
              }
            }
          }
        }
      },
      "ActivityDelivery": {
        "type": "object",
        "description": "Whether the activity went out for this profile and platform, from the\nrecorded outcome and the run log. Measured, never derived.\n",
        "additionalProperties": false,
        "required": [
          "status",
          "evidence"
        ],
        "properties": {
          "status": {
            "type": "string",
            "description": "delivered (it went out), unconfirmed (the action was taken but its\noutcome could not be read), failed (the last attempt failed and it\nhas not gone out), scheduled (due later), pending (due and not yet\nrun), draft (not approved, so it will not run).\n",
            "enum": [
              "delivered",
              "unconfirmed",
              "failed",
              "scheduled",
              "pending",
              "draft"
            ]
          },
          "evidence": {
            "type": "string",
            "description": "What the status rests on: recorded (the outcome stored on the\nactivity), run (a run log entry), or none (nothing has happened yet).\n",
            "enum": [
              "recorded",
              "run",
              "none"
            ]
          },
          "deliveredAt": {
            "type": "string",
            "format": "date-time",
            "description": "When it went out, as recorded.",
            "nullable": true
          },
          "scheduledFor": {
            "type": "string",
            "format": "date-time",
            "description": "When it is due, for a scheduled or pending activity.",
            "nullable": true
          },
          "link": {
            "type": "string",
            "description": "Link to the live item on the platform.",
            "maxLength": 2048,
            "nullable": true
          },
          "computer": {
            "type": "string",
            "description": "Host name of the computer whose run delivered or attempted it.",
            "maxLength": 255,
            "nullable": true
          },
          "browserProfile": {
            "type": "object",
            "description": "The browser profile a run used on its computer, when one was mapped. Null when unknown.",
            "nullable": true,
            "additionalProperties": false,
            "required": [
              "directory"
            ],
            "properties": {
              "directory": {
                "type": "string",
                "description": "Browser profile directory name.",
                "minLength": 1,
                "maxLength": 255
              },
              "displayName": {
                "type": "string",
                "description": "Name the browser showed for the profile.",
                "maxLength": 255
              }
            }
          },
          "runId": {
            "type": "string",
            "description": "Run log identifier of the run that delivered or attempted it.",
            "maxLength": 255,
            "nullable": true
          },
          "attemptedAt": {
            "type": "string",
            "format": "date-time",
            "description": "When the matched run ended.",
            "nullable": true
          },
          "durationSeconds": {
            "type": "number",
            "description": "How long the matched run took.",
            "minimum": 0,
            "nullable": true
          },
          "error": {
            "type": "string",
            "description": "The error the last failed attempt reported.",
            "maxLength": 4096,
            "nullable": true
          },
          "fix": {
            "type": "object",
            "description": "What to do about a failed delivery. Null when nothing failed.",
            "nullable": true,
            "additionalProperties": false,
            "required": [
              "summary"
            ],
            "properties": {
              "summary": {
                "type": "string",
                "description": "One plain sentence saying what to do next.",
                "minLength": 1,
                "maxLength": 1024
              },
              "command": {
                "type": "string",
                "description": "A command line that performs the fix, when there is one.",
                "maxLength": 1024,
                "nullable": true
              }
            }
          },
          "logPath": {
            "type": "string",
            "description": "Log file of the matched run, on the computer that ran it.",
            "maxLength": 2048,
            "nullable": true
          }
        }
      },
      "ActivityBrowserProfile": {
        "type": "object",
        "description": "The browser profile a run used on its computer, when one was mapped. Null when unknown.",
        "nullable": true,
        "additionalProperties": false,
        "required": [
          "directory"
        ],
        "properties": {
          "directory": {
            "type": "string",
            "description": "Browser profile directory name.",
            "minLength": 1,
            "maxLength": 255
          },
          "displayName": {
            "type": "string",
            "description": "Name the browser showed for the profile.",
            "maxLength": 255
          }
        }
      },
      "ActivityFix": {
        "type": "object",
        "description": "What to do about a failed delivery. Null when nothing failed.",
        "nullable": true,
        "additionalProperties": false,
        "required": [
          "summary"
        ],
        "properties": {
          "summary": {
            "type": "string",
            "description": "One plain sentence saying what to do next.",
            "minLength": 1,
            "maxLength": 1024
          },
          "command": {
            "type": "string",
            "description": "A command line that performs the fix, when there is one.",
            "maxLength": 1024,
            "nullable": true
          }
        }
      },
      "ActivityMetrics": {
        "type": "object",
        "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
        "additionalProperties": {
          "type": "number"
        },
        "properties": {
          "impressions": {
            "type": "number",
            "nullable": true,
            "description": "Times the activity was shown."
          },
          "views": {
            "type": "number",
            "nullable": true,
            "description": "Views, for media activities."
          },
          "offsiteViews": {
            "type": "number",
            "nullable": true,
            "description": "Views outside the platform."
          },
          "clicks": {
            "type": "number",
            "nullable": true,
            "description": "Clicks on the activity."
          },
          "clickThroughRate": {
            "type": "number",
            "nullable": true,
            "description": "Clicks divided by impressions, as a fraction."
          },
          "likes": {
            "type": "number",
            "nullable": true,
            "description": "Likes or reactions."
          },
          "comments": {
            "type": "number",
            "nullable": true,
            "description": "Comments."
          },
          "reposts": {
            "type": "number",
            "nullable": true,
            "description": "Reposts or shares."
          },
          "follows": {
            "type": "number",
            "nullable": true,
            "description": "Follows attributed to the activity."
          },
          "engagementRate": {
            "type": "number",
            "nullable": true,
            "description": "Engagements divided by impressions, as a fraction."
          }
        }
      },
      "ActivityComparison": {
        "type": "object",
        "description": "Derived. How this activity's figures compare with the same subject's\nother activities: the median of each figure and this activity's ratio\nto it. Null when there are too few other activities to compare with.\n",
        "nullable": true,
        "additionalProperties": false,
        "required": [
          "basis",
          "sampleSize",
          "median",
          "ratio"
        ],
        "properties": {
          "basis": {
            "type": "string",
            "description": "How the typical activity is computed.",
            "enum": [
              "median"
            ]
          },
          "sampleSize": {
            "type": "integer",
            "description": "How many other activities the median is taken over.",
            "minimum": 0
          },
          "median": {
            "type": "object",
            "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
            "additionalProperties": {
              "type": "number"
            },
            "properties": {
              "impressions": {
                "type": "number",
                "nullable": true,
                "description": "Times the activity was shown."
              },
              "views": {
                "type": "number",
                "nullable": true,
                "description": "Views, for media activities."
              },
              "offsiteViews": {
                "type": "number",
                "nullable": true,
                "description": "Views outside the platform."
              },
              "clicks": {
                "type": "number",
                "nullable": true,
                "description": "Clicks on the activity."
              },
              "clickThroughRate": {
                "type": "number",
                "nullable": true,
                "description": "Clicks divided by impressions, as a fraction."
              },
              "likes": {
                "type": "number",
                "nullable": true,
                "description": "Likes or reactions."
              },
              "comments": {
                "type": "number",
                "nullable": true,
                "description": "Comments."
              },
              "reposts": {
                "type": "number",
                "nullable": true,
                "description": "Reposts or shares."
              },
              "follows": {
                "type": "number",
                "nullable": true,
                "description": "Follows attributed to the activity."
              },
              "engagementRate": {
                "type": "number",
                "nullable": true,
                "description": "Engagements divided by impressions, as a fraction."
              }
            }
          },
          "ratio": {
            "type": "object",
            "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
            "additionalProperties": {
              "type": "number"
            },
            "properties": {
              "impressions": {
                "type": "number",
                "nullable": true,
                "description": "Times the activity was shown."
              },
              "views": {
                "type": "number",
                "nullable": true,
                "description": "Views, for media activities."
              },
              "offsiteViews": {
                "type": "number",
                "nullable": true,
                "description": "Views outside the platform."
              },
              "clicks": {
                "type": "number",
                "nullable": true,
                "description": "Clicks on the activity."
              },
              "clickThroughRate": {
                "type": "number",
                "nullable": true,
                "description": "Clicks divided by impressions, as a fraction."
              },
              "likes": {
                "type": "number",
                "nullable": true,
                "description": "Likes or reactions."
              },
              "comments": {
                "type": "number",
                "nullable": true,
                "description": "Comments."
              },
              "reposts": {
                "type": "number",
                "nullable": true,
                "description": "Reposts or shares."
              },
              "follows": {
                "type": "number",
                "nullable": true,
                "description": "Follows attributed to the activity."
              },
              "engagementRate": {
                "type": "number",
                "nullable": true,
                "description": "Engagements divided by impressions, as a fraction."
              }
            }
          }
        }
      },
      "ActivityReception": {
        "type": "object",
        "description": "How the activity was received. Measured figures with the date they were\nread, or collected false with a reason. Never zeros for missing data.\n",
        "additionalProperties": false,
        "required": [
          "collected",
          "measured"
        ],
        "properties": {
          "collected": {
            "type": "boolean",
            "description": "Whether any reception figures exist for this entry."
          },
          "measured": {
            "type": "boolean",
            "description": "Always true; reception figures are read from the platform, not computed."
          },
          "reason": {
            "type": "string",
            "description": "Why reception is not collected: platform (nothing collects reception\nfor this platform yet), notdelivered (it has not gone out),\nnolink (no live link to match on), notmatched (no collected figures\nmatch its link yet), unavailable (the store does not hold reception\nfigures).\n",
            "enum": [
              "platform",
              "notdelivered",
              "nolink",
              "notmatched",
              "unavailable"
            ]
          },
          "message": {
            "type": "string",
            "description": "One plain sentence for a person explaining the reason.",
            "maxLength": 1024
          },
          "subject": {
            "type": "string",
            "description": "Account or page the figures belong to.",
            "maxLength": 255
          },
          "source": {
            "type": "string",
            "description": "Where the figures came from, for example a platform analytics export.",
            "maxLength": 255
          },
          "asOf": {
            "type": "string",
            "format": "date",
            "description": "Date the figures were read; they do not change after it.",
            "nullable": true
          },
          "metrics": {
            "type": "object",
            "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
            "additionalProperties": {
              "type": "number"
            },
            "properties": {
              "impressions": {
                "type": "number",
                "nullable": true,
                "description": "Times the activity was shown."
              },
              "views": {
                "type": "number",
                "nullable": true,
                "description": "Views, for media activities."
              },
              "offsiteViews": {
                "type": "number",
                "nullable": true,
                "description": "Views outside the platform."
              },
              "clicks": {
                "type": "number",
                "nullable": true,
                "description": "Clicks on the activity."
              },
              "clickThroughRate": {
                "type": "number",
                "nullable": true,
                "description": "Clicks divided by impressions, as a fraction."
              },
              "likes": {
                "type": "number",
                "nullable": true,
                "description": "Likes or reactions."
              },
              "comments": {
                "type": "number",
                "nullable": true,
                "description": "Comments."
              },
              "reposts": {
                "type": "number",
                "nullable": true,
                "description": "Reposts or shares."
              },
              "follows": {
                "type": "number",
                "nullable": true,
                "description": "Follows attributed to the activity."
              },
              "engagementRate": {
                "type": "number",
                "nullable": true,
                "description": "Engagements divided by impressions, as a fraction."
              }
            }
          },
          "comparison": {
            "type": "object",
            "description": "Derived. How this activity's figures compare with the same subject's\nother activities: the median of each figure and this activity's ratio\nto it. Null when there are too few other activities to compare with.\n",
            "nullable": true,
            "additionalProperties": false,
            "required": [
              "basis",
              "sampleSize",
              "median",
              "ratio"
            ],
            "properties": {
              "basis": {
                "type": "string",
                "description": "How the typical activity is computed.",
                "enum": [
                  "median"
                ]
              },
              "sampleSize": {
                "type": "integer",
                "description": "How many other activities the median is taken over.",
                "minimum": 0
              },
              "median": {
                "type": "object",
                "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                "additionalProperties": {
                  "type": "number"
                },
                "properties": {
                  "impressions": {
                    "type": "number",
                    "nullable": true,
                    "description": "Times the activity was shown."
                  },
                  "views": {
                    "type": "number",
                    "nullable": true,
                    "description": "Views, for media activities."
                  },
                  "offsiteViews": {
                    "type": "number",
                    "nullable": true,
                    "description": "Views outside the platform."
                  },
                  "clicks": {
                    "type": "number",
                    "nullable": true,
                    "description": "Clicks on the activity."
                  },
                  "clickThroughRate": {
                    "type": "number",
                    "nullable": true,
                    "description": "Clicks divided by impressions, as a fraction."
                  },
                  "likes": {
                    "type": "number",
                    "nullable": true,
                    "description": "Likes or reactions."
                  },
                  "comments": {
                    "type": "number",
                    "nullable": true,
                    "description": "Comments."
                  },
                  "reposts": {
                    "type": "number",
                    "nullable": true,
                    "description": "Reposts or shares."
                  },
                  "follows": {
                    "type": "number",
                    "nullable": true,
                    "description": "Follows attributed to the activity."
                  },
                  "engagementRate": {
                    "type": "number",
                    "nullable": true,
                    "description": "Engagements divided by impressions, as a fraction."
                  }
                }
              },
              "ratio": {
                "type": "object",
                "description": "Per-activity engagement figures. The known keys are declared and are\nnull when the source did not report them, never zero. A\nplatform-specific figure not listed here is carried under its own key\nonly when it was reported.\n",
                "additionalProperties": {
                  "type": "number"
                },
                "properties": {
                  "impressions": {
                    "type": "number",
                    "nullable": true,
                    "description": "Times the activity was shown."
                  },
                  "views": {
                    "type": "number",
                    "nullable": true,
                    "description": "Views, for media activities."
                  },
                  "offsiteViews": {
                    "type": "number",
                    "nullable": true,
                    "description": "Views outside the platform."
                  },
                  "clicks": {
                    "type": "number",
                    "nullable": true,
                    "description": "Clicks on the activity."
                  },
                  "clickThroughRate": {
                    "type": "number",
                    "nullable": true,
                    "description": "Clicks divided by impressions, as a fraction."
                  },
                  "likes": {
                    "type": "number",
                    "nullable": true,
                    "description": "Likes or reactions."
                  },
                  "comments": {
                    "type": "number",
                    "nullable": true,
                    "description": "Comments."
                  },
                  "reposts": {
                    "type": "number",
                    "nullable": true,
                    "description": "Reposts or shares."
                  },
                  "follows": {
                    "type": "number",
                    "nullable": true,
                    "description": "Follows attributed to the activity."
                  },
                  "engagementRate": {
                    "type": "number",
                    "nullable": true,
                    "description": "Engagements divided by impressions, as a fraction."
                  }
                }
              }
            }
          }
        }
      },
      "ActivityFollowerChange": {
        "type": "object",
        "description": "Derived. The subject's follower count at the reading before the activity\nand the first reading at least the stated number of days after it.\nCorrelation only; it does not claim the activity caused the change.\n",
        "additionalProperties": false,
        "required": [
          "collected",
          "derived"
        ],
        "properties": {
          "collected": {
            "type": "boolean",
            "description": "Whether follower readings exist on both sides of the activity."
          },
          "derived": {
            "type": "boolean",
            "description": "Always true; the change is computed from two measured readings."
          },
          "reason": {
            "type": "string",
            "description": "Why there is no change: platform (followers are not collected for\nthis subject's platform), notdelivered, noreadings (no reading on\none side of the activity yet).\n",
            "enum": [
              "platform",
              "notdelivered",
              "noreadings"
            ]
          },
          "message": {
            "type": "string",
            "description": "One plain sentence for a person explaining the reason.",
            "maxLength": 1024
          },
          "subject": {
            "type": "string",
            "description": "Account or page whose followers were read.",
            "maxLength": 255
          },
          "formula": {
            "type": "string",
            "description": "How the change is computed.",
            "maxLength": 512
          },
          "windowDays": {
            "type": "integer",
            "description": "Days after the activity the later reading is taken from, at least.",
            "minimum": 0
          },
          "before": {
            "type": "object",
            "description": "One measured follower reading. Null when there is none.",
            "nullable": true,
            "additionalProperties": false,
            "required": [
              "date",
              "followers"
            ],
            "properties": {
              "date": {
                "type": "string",
                "format": "date",
                "description": "Date of the reading."
              },
              "followers": {
                "type": "integer",
                "description": "Followers at that reading.",
                "minimum": 0
              }
            }
          },
          "after": {
            "type": "object",
            "description": "One measured follower reading. Null when there is none.",
            "nullable": true,
            "additionalProperties": false,
            "required": [
              "date",
              "followers"
            ],
            "properties": {
              "date": {
                "type": "string",
                "format": "date",
                "description": "Date of the reading."
              },
              "followers": {
                "type": "integer",
                "description": "Followers at that reading.",
                "minimum": 0
              }
            }
          },
          "change": {
            "type": "integer",
            "description": "after.followers minus before.followers.",
            "nullable": true
          }
        }
      },
      "ActivityFollowerReading": {
        "type": "object",
        "description": "One measured follower reading. Null when there is none.",
        "nullable": true,
        "additionalProperties": false,
        "required": [
          "date",
          "followers"
        ],
        "properties": {
          "date": {
            "type": "string",
            "format": "date",
            "description": "Date of the reading."
          },
          "followers": {
            "type": "integer",
            "description": "Followers at that reading.",
            "minimum": 0
          }
        }
      }
    }
  }
};

export default ActivityResultSchema;

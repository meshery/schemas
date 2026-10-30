/**
 * This file was automatically generated from OpenAPI schema.
 * Do not manually modify this file.
 */

const MediaAssetSchema: Record<string, unknown> = {
  "openapi": "3.0.0",
  "info": {
    "title": "MediaAsset",
    "description": "OpenAPI schema for media assets - image and video files an organization\nuploads so content items can post them without a link. A content item\nrefers to an asset by its ID; a download URL is minted only when the\nfile is about to be used and is never stored.\nUpload flow: `createMediaAsset` records the declared size, type and\nSHA-256 and answers a short-lived upload URL; the client sends the file\nto that URL with one `PUT`; `completeMediaAsset` checks the stored bytes\nagainst the declaration and makes the asset `ready` (or `rejected`).\n`getMediaAssetDownload` then answers a short-lived download URL each\ntime the file is needed.\nStorage: `backend` `r2` stores the bytes in the provider's own private\nobject storage; `gdrive` stores them in the uploading person's Google\nDrive, through their Google Drive connection. The quota names the\nbackends a provider serves, and a create names one of them: neither\nis a default. No request or response carries a storage\ncredential, an access token, a bucket name or an object key: an upload\nor download URL is the only grant, it covers one transfer of one file,\nand it lapses at its `expiresAt`.\nOrganization scope: every operation but `getMediaAssetContent` acts only\nin the organization the session resolved to (X-Current-Orgid, then the\nuser's selected organization), and only when the caller is a live member\nof it. An id that does not name a live media asset of the organization,\nand a caller who is not a live member of it, receive the same 404, so\nthe existence of another organization's assets is never disclosed.\nAuthorization: media assets are the files of content items, so they take\nthe Content Items keys in the session organization: View Content Items\nfor the reads, the quota and downloads, Create Content Item to create\nand complete an asset, Edit Content Item to change its retention, and\nDelete Content Item to delete it. A caller without the key receives a\n403 before any row is read.\n",
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
  "security": [
    {
      "jwt": []
    }
  ],
  "tags": [
    {
      "name": "mediaAssets",
      "description": "Operations related to media assets."
    }
  ],
  "paths": {
    "/api/media-assets": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "List media assets",
        "operationId": "listMediaAssets",
        "description": "Returns a paginated list of the live media assets in the\norganization of the authenticated session, newest first unless\n`order` names another column (`createdAt`, `expiresAt`, `bytes`).\n`search` matches `name`, case-insensitively. Deleted assets are\nnever listed; `expired` and `rejected` assets are listed until they\nare deleted.\n",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Get responses by page",
            "schema": {
              "type": "integer",
              "minimum": 0
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "description": "Number of items per page.",
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          },
          {
            "name": "search",
            "in": "query",
            "description": "Get responses that match search param value",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "order",
            "in": "query",
            "description": "Get ordered responses",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "required": false,
            "description": "Filter by status, evaluated at read time (a `ready` asset past `expiresAt` matches `expired`).",
            "schema": {
              "type": "string",
              "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
              "enum": [
                "pending",
                "ready",
                "rejected",
                "expired"
              ],
              "x-enum-varnames": [
                "MediaAssetStatusPending",
                "MediaAssetStatusReady",
                "MediaAssetStatusRejected",
                "MediaAssetStatusExpired"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Media asset page",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Paginated collection of media assets.",
                  "properties": {
                    "page": {
                      "type": "integer",
                      "description": "Current page number of the result set.",
                      "minimum": 0
                    },
                    "pageSize": {
                      "type": "integer",
                      "description": "Number of items per page.",
                      "minimum": 1
                    },
                    "totalCount": {
                      "type": "integer",
                      "description": "Total number of items available.",
                      "minimum": 0
                    },
                    "mediaAssets": {
                      "type": "array",
                      "items": {
                        "x-go-type": "MediaAsset",
                        "$schema": "http://json-schema.org/draft-07/schema#",
                        "title": "Media Asset Schema",
                        "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                          "id",
                          "organizationId",
                          "backend",
                          "kind",
                          "contentType",
                          "bytes",
                          "sha256",
                          "locationStripped",
                          "status",
                          "expiresAt",
                          "createdAt",
                          "updatedAt"
                        ],
                        "properties": {
                          "id": {
                            "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "id"
                            },
                            "x-order": 1,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "organizationId": {
                            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                            "x-go-name": "OrganizationID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "organization_id"
                            },
                            "x-order": 2,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "createdBy": {
                            "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                            "x-go-name": "CreatedBy",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_by",
                              "json": "createdBy,omitempty"
                            },
                            "x-order": 3,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "backend": {
                            "description": "Where the bytes are stored (`r2` or `gdrive`).",
                            "x-oapi-codegen-extra-tags": {
                              "db": "backend"
                            },
                            "x-order": 4,
                            "type": "string",
                            "enum": [
                              "r2",
                              "gdrive"
                            ],
                            "x-enum-varnames": [
                              "MediaAssetBackendR2",
                              "MediaAssetBackendGdrive"
                            ]
                          },
                          "connectionId": {
                            "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                            "x-go-name": "ConnectionID",
                            "x-oapi-codegen-extra-tags": {
                              "db": "connection_id",
                              "json": "connectionId,omitempty"
                            },
                            "x-order": 5,
                            "type": "string",
                            "format": "uuid",
                            "x-go-type": "uuid.UUID",
                            "x-go-type-import": {
                              "path": "github.com/gofrs/uuid"
                            }
                          },
                          "externalId": {
                            "type": "string",
                            "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                            "x-id-format": "external",
                            "minLength": 1,
                            "maxLength": 255,
                            "pattern": "^[A-Za-z0-9_-]+$",
                            "x-oapi-codegen-extra-tags": {
                              "db": "external_id",
                              "json": "externalId,omitempty"
                            },
                            "x-order": 6
                          },
                          "kind": {
                            "description": "Image or video, derived by the server from `contentType`.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "kind"
                            },
                            "x-order": 7,
                            "type": "string",
                            "enum": [
                              "image",
                              "video"
                            ],
                            "x-enum-varnames": [
                              "MediaAssetKindImage",
                              "MediaAssetKindVideo"
                            ]
                          },
                          "contentType": {
                            "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "content_type"
                            },
                            "x-order": 8,
                            "type": "string",
                            "enum": [
                              "image/png",
                              "image/jpeg",
                              "image/gif",
                              "image/webp",
                              "image/heic",
                              "video/mp4",
                              "video/quicktime",
                              "video/webm"
                            ],
                            "x-enum-varnames": [
                              "MediaAssetContentTypeImagePng",
                              "MediaAssetContentTypeImageJpeg",
                              "MediaAssetContentTypeImageGif",
                              "MediaAssetContentTypeImageWebp",
                              "MediaAssetContentTypeImageHeic",
                              "MediaAssetContentTypeVideoMp4",
                              "MediaAssetContentTypeVideoQuicktime",
                              "MediaAssetContentTypeVideoWebm"
                            ]
                          },
                          "bytes": {
                            "type": "integer",
                            "format": "int64",
                            "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                            "minimum": 1,
                            "maximum": 5368709120,
                            "x-oapi-codegen-extra-tags": {
                              "db": "bytes"
                            },
                            "x-order": 9
                          },
                          "sha256": {
                            "type": "string",
                            "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                            "minLength": 64,
                            "maxLength": 64,
                            "pattern": "^[0-9a-f]{64}$",
                            "x-oapi-codegen-extra-tags": {
                              "db": "sha256"
                            },
                            "x-order": 10
                          },
                          "name": {
                            "type": "string",
                            "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                            "minLength": 1,
                            "maxLength": 255,
                            "x-oapi-codegen-extra-tags": {
                              "db": "name",
                              "json": "name,omitempty"
                            },
                            "x-order": 11
                          },
                          "locationStripped": {
                            "type": "boolean",
                            "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "location_stripped"
                            },
                            "x-order": 12
                          },
                          "status": {
                            "type": "string",
                            "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                            "enum": [
                              "pending",
                              "ready",
                              "rejected",
                              "expired"
                            ],
                            "x-enum-varnames": [
                              "MediaAssetStatusPending",
                              "MediaAssetStatusReady",
                              "MediaAssetStatusRejected",
                              "MediaAssetStatusExpired"
                            ],
                            "x-oapi-codegen-extra-tags": {
                              "db": "status"
                            },
                            "x-order": 13
                          },
                          "rejectionReason": {
                            "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "rejection_reason",
                              "json": "rejectionReason,omitempty"
                            },
                            "x-order": 14,
                            "type": "string",
                            "enum": [
                              "missing",
                              "size",
                              "type",
                              "checksum"
                            ],
                            "x-enum-varnames": [
                              "MediaAssetRejectionReasonMissing",
                              "MediaAssetRejectionReasonSize",
                              "MediaAssetRejectionReasonType",
                              "MediaAssetRejectionReasonChecksum"
                            ]
                          },
                          "retainUntil": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "retain_until"
                            },
                            "x-order": 15
                          },
                          "completedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "completed_at"
                            },
                            "x-order": 16
                          },
                          "expiresAt": {
                            "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                            "x-oapi-codegen-extra-tags": {
                              "db": "expires_at"
                            },
                            "x-order": 17,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "createdAt": {
                            "description": "Timestamp of media asset creation.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "created_at"
                            },
                            "x-order": 18,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "updatedAt": {
                            "description": "Timestamp of last media asset modification.",
                            "x-oapi-codegen-extra-tags": {
                              "db": "updated_at"
                            },
                            "x-order": 19,
                            "type": "string",
                            "format": "date-time",
                            "x-go-type-skip-optional-pointer": true
                          },
                          "deletedAt": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                            "nullable": true,
                            "x-go-type": "core.NullTime",
                            "x-go-type-import": {
                              "path": "github.com/meshery/schemas/models/core",
                              "name": "core"
                            },
                            "x-oapi-codegen-extra-tags": {
                              "db": "deleted_at",
                              "json": "deletedAt,omitempty"
                            },
                            "x-order": 20
                          }
                        }
                      },
                      "description": "Media assets included on this page of results."
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Create a media asset and its upload URL",
        "operationId": "createMediaAsset",
        "description": "Records a new `pending` asset from the declared `contentType`,\n`bytes` and `sha256`, and answers it with a short-lived upload URL.\nThe client sends the file's bytes to `upload.url` with one request\nusing `upload.method` and exactly the `upload.headers`, before\n`upload.expiresAt`, then calls `completeMediaAsset`. The server\nderives `kind` from `contentType` and sets `expiresAt` to the end\nof the upload window.\nRefused with 400 when `contentType` is not one the provider accepts\n(`MediaAssetQuota.contentTypes`), when `bytes` exceeds the\nper-kind limit (`maxImageBytes`, `maxVideoBytes`), when `backend`\nis one the provider does not serve, when `gdrive` is named without\na `connectionId` or `r2` with one, and when `retainUntil` is not in\nthe future or lies beyond `maxRetentionDays` from now. Refused with\n409 when the asset would take the organization past `bytesLimit`.\nA `connectionId` that is not the caller's own live Google Drive\nconnection in the session organization receives 404.\nEvery create is a new asset; nothing is deduplicated by `sha256`. A\ncreate that is never completed is reaped when its upload window\nends.\n",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for creating a media asset. Contains only client-settable\nfields; the owning `organizationId` and `createdBy` (from the\nsession), `kind` (derived from `contentType`), `status`,\n`rejectionReason`, `externalId`, `completedAt`, `expiresAt` and the\ntimestamps are server-owned and not accepted.\n",
                "additionalProperties": false,
                "required": [
                  "contentType",
                  "bytes",
                  "sha256",
                  "locationStripped",
                  "backend"
                ],
                "properties": {
                  "contentType": {
                    "type": "string",
                    "description": "Media type of the file, from a closed allowlist. The server sniffs the stored bytes on completion and rejects an upload whose real type differs. A provider may accept fewer types than this list (`MediaAssetQuota.contentTypes`).\n",
                    "enum": [
                      "image/png",
                      "image/jpeg",
                      "image/gif",
                      "image/webp",
                      "image/heic",
                      "video/mp4",
                      "video/quicktime",
                      "video/webm"
                    ],
                    "x-enum-varnames": [
                      "MediaAssetContentTypeImagePng",
                      "MediaAssetContentTypeImageJpeg",
                      "MediaAssetContentTypeImageGif",
                      "MediaAssetContentTypeImageWebp",
                      "MediaAssetContentTypeImageHeic",
                      "MediaAssetContentTypeVideoMp4",
                      "MediaAssetContentTypeVideoQuicktime",
                      "MediaAssetContentTypeVideoWebm"
                    ]
                  },
                  "bytes": {
                    "type": "integer",
                    "format": "int64",
                    "description": "Size of the file in bytes. Must not exceed the quota's limit for its kind.",
                    "minimum": 1,
                    "maximum": 5368709120
                  },
                  "sha256": {
                    "type": "string",
                    "description": "Lowercase hex SHA-256 of the exact bytes that will be uploaded.",
                    "minLength": 64,
                    "maxLength": 64,
                    "pattern": "^[0-9a-f]{64}$"
                  },
                  "name": {
                    "type": "string",
                    "description": "Display name of the file, typically its original file name.",
                    "minLength": 1,
                    "maxLength": 255
                  },
                  "locationStripped": {
                    "type": "boolean",
                    "description": "Whether the client removed location metadata (EXIF and XMP GPS, maker notes, device serial numbers) from the file before hashing and uploading it. Recorded as sent.\n"
                  },
                  "backend": {
                    "description": "Where to store the file. Required, with no default: the client picks one of the backends `getMediaAssetQuota` lists in `backends`, and a create naming any other answers `400`.\n",
                    "type": "string",
                    "enum": [
                      "r2",
                      "gdrive"
                    ],
                    "x-enum-varnames": [
                      "MediaAssetBackendR2",
                      "MediaAssetBackendGdrive"
                    ]
                  },
                  "connectionId": {
                    "description": "The caller's own live Google Drive connection in the session organization. Required when `backend` is `gdrive`, refused otherwise.\n",
                    "x-go-name": "ConnectionID",
                    "x-oapi-codegen-extra-tags": {
                      "json": "connectionId,omitempty"
                    },
                    "type": "string",
                    "format": "uuid",
                    "x-go-type": "uuid.UUID",
                    "x-go-type-import": {
                      "path": "github.com/gofrs/uuid"
                    }
                  },
                  "retainUntil": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Time the asset must stay downloadable until, for example a little after the post that uses it is scheduled. Omitted, the organization's default retention applies from completion.\n"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Media asset created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Answer to `createMediaAsset`: the new `pending` asset and the grant to upload its bytes.",
                  "additionalProperties": false,
                  "required": [
                    "mediaAsset",
                    "upload"
                  ],
                  "properties": {
                    "mediaAsset": {
                      "$schema": "http://json-schema.org/draft-07/schema#",
                      "title": "Media Asset Schema",
                      "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
                      "type": "object",
                      "additionalProperties": false,
                      "required": [
                        "id",
                        "organizationId",
                        "backend",
                        "kind",
                        "contentType",
                        "bytes",
                        "sha256",
                        "locationStripped",
                        "status",
                        "expiresAt",
                        "createdAt",
                        "updatedAt"
                      ],
                      "properties": {
                        "id": {
                          "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "id"
                          },
                          "x-order": 1,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "organizationId": {
                          "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                          "x-go-name": "OrganizationID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "organization_id"
                          },
                          "x-order": 2,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "createdBy": {
                          "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                          "x-go-name": "CreatedBy",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_by",
                            "json": "createdBy,omitempty"
                          },
                          "x-order": 3,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "backend": {
                          "description": "Where the bytes are stored (`r2` or `gdrive`).",
                          "x-oapi-codegen-extra-tags": {
                            "db": "backend"
                          },
                          "x-order": 4,
                          "type": "string",
                          "enum": [
                            "r2",
                            "gdrive"
                          ],
                          "x-enum-varnames": [
                            "MediaAssetBackendR2",
                            "MediaAssetBackendGdrive"
                          ]
                        },
                        "connectionId": {
                          "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                          "x-go-name": "ConnectionID",
                          "x-oapi-codegen-extra-tags": {
                            "db": "connection_id",
                            "json": "connectionId,omitempty"
                          },
                          "x-order": 5,
                          "type": "string",
                          "format": "uuid",
                          "x-go-type": "uuid.UUID",
                          "x-go-type-import": {
                            "path": "github.com/gofrs/uuid"
                          }
                        },
                        "externalId": {
                          "type": "string",
                          "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                          "x-id-format": "external",
                          "minLength": 1,
                          "maxLength": 255,
                          "pattern": "^[A-Za-z0-9_-]+$",
                          "x-oapi-codegen-extra-tags": {
                            "db": "external_id",
                            "json": "externalId,omitempty"
                          },
                          "x-order": 6
                        },
                        "kind": {
                          "description": "Image or video, derived by the server from `contentType`.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "kind"
                          },
                          "x-order": 7,
                          "type": "string",
                          "enum": [
                            "image",
                            "video"
                          ],
                          "x-enum-varnames": [
                            "MediaAssetKindImage",
                            "MediaAssetKindVideo"
                          ]
                        },
                        "contentType": {
                          "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "content_type"
                          },
                          "x-order": 8,
                          "type": "string",
                          "enum": [
                            "image/png",
                            "image/jpeg",
                            "image/gif",
                            "image/webp",
                            "image/heic",
                            "video/mp4",
                            "video/quicktime",
                            "video/webm"
                          ],
                          "x-enum-varnames": [
                            "MediaAssetContentTypeImagePng",
                            "MediaAssetContentTypeImageJpeg",
                            "MediaAssetContentTypeImageGif",
                            "MediaAssetContentTypeImageWebp",
                            "MediaAssetContentTypeImageHeic",
                            "MediaAssetContentTypeVideoMp4",
                            "MediaAssetContentTypeVideoQuicktime",
                            "MediaAssetContentTypeVideoWebm"
                          ]
                        },
                        "bytes": {
                          "type": "integer",
                          "format": "int64",
                          "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                          "minimum": 1,
                          "maximum": 5368709120,
                          "x-oapi-codegen-extra-tags": {
                            "db": "bytes"
                          },
                          "x-order": 9
                        },
                        "sha256": {
                          "type": "string",
                          "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                          "minLength": 64,
                          "maxLength": 64,
                          "pattern": "^[0-9a-f]{64}$",
                          "x-oapi-codegen-extra-tags": {
                            "db": "sha256"
                          },
                          "x-order": 10
                        },
                        "name": {
                          "type": "string",
                          "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                          "minLength": 1,
                          "maxLength": 255,
                          "x-oapi-codegen-extra-tags": {
                            "db": "name",
                            "json": "name,omitempty"
                          },
                          "x-order": 11
                        },
                        "locationStripped": {
                          "type": "boolean",
                          "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                          "x-oapi-codegen-extra-tags": {
                            "db": "location_stripped"
                          },
                          "x-order": 12
                        },
                        "status": {
                          "type": "string",
                          "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                          "enum": [
                            "pending",
                            "ready",
                            "rejected",
                            "expired"
                          ],
                          "x-enum-varnames": [
                            "MediaAssetStatusPending",
                            "MediaAssetStatusReady",
                            "MediaAssetStatusRejected",
                            "MediaAssetStatusExpired"
                          ],
                          "x-oapi-codegen-extra-tags": {
                            "db": "status"
                          },
                          "x-order": 13
                        },
                        "rejectionReason": {
                          "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "rejection_reason",
                            "json": "rejectionReason,omitempty"
                          },
                          "x-order": 14,
                          "type": "string",
                          "enum": [
                            "missing",
                            "size",
                            "type",
                            "checksum"
                          ],
                          "x-enum-varnames": [
                            "MediaAssetRejectionReasonMissing",
                            "MediaAssetRejectionReasonSize",
                            "MediaAssetRejectionReasonType",
                            "MediaAssetRejectionReasonChecksum"
                          ]
                        },
                        "retainUntil": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "retain_until"
                          },
                          "x-order": 15
                        },
                        "completedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "completed_at"
                          },
                          "x-order": 16
                        },
                        "expiresAt": {
                          "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                          "x-oapi-codegen-extra-tags": {
                            "db": "expires_at"
                          },
                          "x-order": 17,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "createdAt": {
                          "description": "Timestamp of media asset creation.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "created_at"
                          },
                          "x-order": 18,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "updatedAt": {
                          "description": "Timestamp of last media asset modification.",
                          "x-oapi-codegen-extra-tags": {
                            "db": "updated_at"
                          },
                          "x-order": 19,
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        },
                        "deletedAt": {
                          "type": "string",
                          "format": "date-time",
                          "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                          "nullable": true,
                          "x-go-type": "core.NullTime",
                          "x-go-type-import": {
                            "path": "github.com/meshery/schemas/models/core",
                            "name": "core"
                          },
                          "x-oapi-codegen-extra-tags": {
                            "db": "deleted_at",
                            "json": "deletedAt,omitempty"
                          },
                          "x-order": 20
                        }
                      }
                    },
                    "upload": {
                      "type": "object",
                      "description": "A short-lived grant to move one file's bytes: send one request with `method` to `url` carrying exactly `headers`, before `expiresAt`. The URL is the only credential, it covers this one file, and it must be treated as a secret: never store it, log it or put it in a content item.\n",
                      "additionalProperties": false,
                      "required": [
                        "method",
                        "url",
                        "headers",
                        "expiresAt"
                      ],
                      "properties": {
                        "method": {
                          "type": "string",
                          "description": "HTTP method to use. `PUT` for an upload, `GET` for a download.",
                          "enum": [
                            "PUT",
                            "GET"
                          ],
                          "x-enum-casing-exempt": true,
                          "x-enum-varnames": [
                            "MediaAssetTransferMethodPut",
                            "MediaAssetTransferMethodGet"
                          ]
                        },
                        "url": {
                          "type": "string",
                          "format": "uri",
                          "description": "Absolute HTTPS URL to send the request to.",
                          "maxLength": 4096
                        },
                        "headers": {
                          "type": "object",
                          "description": "Headers the request must carry, verbatim (for an upload, at least `Content-Type`, and any integrity header the signature binds). Empty when none are needed. Never contains an authorization header.\n",
                          "additionalProperties": {
                            "type": "string",
                            "maxLength": 1024
                          },
                          "x-go-type": "map[string]string"
                        },
                        "expiresAt": {
                          "description": "Time the URL stops working.",
                          "type": "string",
                          "format": "date-time",
                          "x-go-type-skip-optional-pointer": true
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "Conflict - the asset is not in a status the operation accepts, the uploaded bytes did not match the declared size, type or SHA-256 (or nothing was uploaded), or the asset would take the organization past its storage limit\n",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "502": {
            "description": "Bad gateway - an upstream service the operation depends on could not be reached or rejected the request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/media-assets/quota": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Get the media asset limits and usage of the organization",
        "operationId": "getMediaAssetQuota",
        "description": "Answers the limits `createMediaAsset` and `updateMediaAsset`\nenforce in the session organization, and how much of its storage\nis in use. A client reads it before uploading so it refuses an\noversized or unsupported file by name instead of meeting a 400.\n",
        "responses": {
          "200": {
            "description": "Media asset quota",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "The media asset limits of the session organization and its current storage use.",
                  "additionalProperties": false,
                  "required": [
                    "backends",
                    "contentTypes",
                    "maxImageBytes",
                    "maxVideoBytes",
                    "uploadWindowSeconds",
                    "defaultRetentionDays",
                    "maxRetentionDays",
                    "bytesLimit",
                    "bytesUsed"
                  ],
                  "properties": {
                    "backends": {
                      "type": "array",
                      "description": "Backends this provider serves for the organization, and the only statement of what it serves. A create must name one of them in `backend` (there is no default); naming another is refused with 400.\n",
                      "items": {
                        "type": "string",
                        "description": "Where the asset's bytes are stored. `r2` is the provider's own private object storage; `gdrive` is the uploading person's Google Drive, reached through their Google Drive connection. Neither is a default: a provider states the ones it serves in `MediaAssetQuota.backends`, and a create names one of them. A reader never branches on it: `getMediaAssetDownload` answers the same shape for both.\n",
                        "enum": [
                          "r2",
                          "gdrive"
                        ],
                        "x-enum-varnames": [
                          "MediaAssetBackendR2",
                          "MediaAssetBackendGdrive"
                        ]
                      }
                    },
                    "contentTypes": {
                      "type": "array",
                      "description": "Content types this provider accepts.",
                      "items": {
                        "type": "string",
                        "description": "Media type of the file, from a closed allowlist. The server sniffs the stored bytes on completion and rejects an upload whose real type differs. A provider may accept fewer types than this list (`MediaAssetQuota.contentTypes`).\n",
                        "enum": [
                          "image/png",
                          "image/jpeg",
                          "image/gif",
                          "image/webp",
                          "image/heic",
                          "video/mp4",
                          "video/quicktime",
                          "video/webm"
                        ],
                        "x-enum-varnames": [
                          "MediaAssetContentTypeImagePng",
                          "MediaAssetContentTypeImageJpeg",
                          "MediaAssetContentTypeImageGif",
                          "MediaAssetContentTypeImageWebp",
                          "MediaAssetContentTypeImageHeic",
                          "MediaAssetContentTypeVideoMp4",
                          "MediaAssetContentTypeVideoQuicktime",
                          "MediaAssetContentTypeVideoWebm"
                        ]
                      }
                    },
                    "maxImageBytes": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Largest image a create accepts, in bytes.",
                      "minimum": 1,
                      "maximum": 5368709120
                    },
                    "maxVideoBytes": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Largest video a create accepts, in bytes.",
                      "minimum": 1,
                      "maximum": 5368709120
                    },
                    "uploadWindowSeconds": {
                      "type": "integer",
                      "description": "How long a `pending` asset waits for its upload and completion before it expires, in seconds.",
                      "minimum": 60,
                      "maximum": 604800
                    },
                    "defaultRetentionDays": {
                      "type": "integer",
                      "description": "Days a `ready` asset is kept after completion when no `retainUntil` was set.",
                      "minimum": 1,
                      "maximum": 3650
                    },
                    "maxRetentionDays": {
                      "type": "integer",
                      "description": "Furthest `retainUntil` may lie from now, in days.",
                      "minimum": 1,
                      "maximum": 3650
                    },
                    "bytesLimit": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Total bytes the organization's live `pending` and `ready` assets may hold. Null when the organization has no storage limit.",
                      "minimum": 0,
                      "nullable": true
                    },
                    "bytesUsed": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Total bytes of the organization's live `pending` and `ready` assets. Null when it could not be measured, which must be presented as unknown; a number, including 0, is a measurement.\n",
                      "minimum": 0,
                      "nullable": true
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/media-assets/{mediaAssetId}": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Get a media asset by ID",
        "operationId": "getMediaAsset",
        "parameters": [
          {
            "name": "mediaAssetId",
            "in": "path",
            "description": "Media asset ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Media asset response",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Media Asset Schema",
                  "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "backend",
                    "kind",
                    "contentType",
                    "bytes",
                    "sha256",
                    "locationStripped",
                    "status",
                    "expiresAt",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdBy": {
                      "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "backend": {
                      "description": "Where the bytes are stored (`r2` or `gdrive`).",
                      "x-oapi-codegen-extra-tags": {
                        "db": "backend"
                      },
                      "x-order": 4,
                      "type": "string",
                      "enum": [
                        "r2",
                        "gdrive"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetBackendR2",
                        "MediaAssetBackendGdrive"
                      ]
                    },
                    "connectionId": {
                      "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                      "x-go-name": "ConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_id",
                        "json": "connectionId,omitempty"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "externalId": {
                      "type": "string",
                      "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                      "x-id-format": "external",
                      "minLength": 1,
                      "maxLength": 255,
                      "pattern": "^[A-Za-z0-9_-]+$",
                      "x-oapi-codegen-extra-tags": {
                        "db": "external_id",
                        "json": "externalId,omitempty"
                      },
                      "x-order": 6
                    },
                    "kind": {
                      "description": "Image or video, derived by the server from `contentType`.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "image",
                        "video"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetKindImage",
                        "MediaAssetKindVideo"
                      ]
                    },
                    "contentType": {
                      "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_type"
                      },
                      "x-order": 8,
                      "type": "string",
                      "enum": [
                        "image/png",
                        "image/jpeg",
                        "image/gif",
                        "image/webp",
                        "image/heic",
                        "video/mp4",
                        "video/quicktime",
                        "video/webm"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetContentTypeImagePng",
                        "MediaAssetContentTypeImageJpeg",
                        "MediaAssetContentTypeImageGif",
                        "MediaAssetContentTypeImageWebp",
                        "MediaAssetContentTypeImageHeic",
                        "MediaAssetContentTypeVideoMp4",
                        "MediaAssetContentTypeVideoQuicktime",
                        "MediaAssetContentTypeVideoWebm"
                      ]
                    },
                    "bytes": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                      "minimum": 1,
                      "maximum": 5368709120,
                      "x-oapi-codegen-extra-tags": {
                        "db": "bytes"
                      },
                      "x-order": 9
                    },
                    "sha256": {
                      "type": "string",
                      "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                      "minLength": 64,
                      "maxLength": 64,
                      "pattern": "^[0-9a-f]{64}$",
                      "x-oapi-codegen-extra-tags": {
                        "db": "sha256"
                      },
                      "x-order": 10
                    },
                    "name": {
                      "type": "string",
                      "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      },
                      "x-order": 11
                    },
                    "locationStripped": {
                      "type": "boolean",
                      "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "location_stripped"
                      },
                      "x-order": 12
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                      "enum": [
                        "pending",
                        "ready",
                        "rejected",
                        "expired"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetStatusPending",
                        "MediaAssetStatusReady",
                        "MediaAssetStatusRejected",
                        "MediaAssetStatusExpired"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 13
                    },
                    "rejectionReason": {
                      "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "rejection_reason",
                        "json": "rejectionReason,omitempty"
                      },
                      "x-order": 14,
                      "type": "string",
                      "enum": [
                        "missing",
                        "size",
                        "type",
                        "checksum"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetRejectionReasonMissing",
                        "MediaAssetRejectionReasonSize",
                        "MediaAssetRejectionReasonType",
                        "MediaAssetRejectionReasonChecksum"
                      ]
                    },
                    "retainUntil": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "retain_until"
                      },
                      "x-order": 15
                    },
                    "completedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "completed_at"
                      },
                      "x-order": 16
                    },
                    "expiresAt": {
                      "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at"
                      },
                      "x-order": 17,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdAt": {
                      "description": "Timestamp of media asset creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 18,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last media asset modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 19,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 20
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "put": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Change how long a media asset is kept",
        "operationId": "updateMediaAsset",
        "description": "Sets `retainUntil`, the only field of an asset that changes after\ncreate, for example when the post that uses it is rescheduled. On a\n`ready` asset `expiresAt` becomes `retainUntil`, so retention can be\nshortened as well as extended; on a `pending` asset it is recorded\nand applied when the asset is completed. Refused with 400 when\n`retainUntil` is not in the future or lies beyond\n`maxRetentionDays` from now, and with 409 when the asset is\n`rejected` or `expired`.\n",
        "parameters": [
          {
            "name": "mediaAssetId",
            "in": "path",
            "description": "Media asset ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "description": "Payload for changing how long a media asset is kept. Retention is the only field that changes after create.",
                "additionalProperties": false,
                "required": [
                  "retainUntil"
                ],
                "properties": {
                  "retainUntil": {
                    "type": "string",
                    "format": "date-time",
                    "description": "New time the asset must stay downloadable until. Must be in the future and within `maxRetentionDays` from now."
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Media asset updated",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Media Asset Schema",
                  "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "backend",
                    "kind",
                    "contentType",
                    "bytes",
                    "sha256",
                    "locationStripped",
                    "status",
                    "expiresAt",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdBy": {
                      "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "backend": {
                      "description": "Where the bytes are stored (`r2` or `gdrive`).",
                      "x-oapi-codegen-extra-tags": {
                        "db": "backend"
                      },
                      "x-order": 4,
                      "type": "string",
                      "enum": [
                        "r2",
                        "gdrive"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetBackendR2",
                        "MediaAssetBackendGdrive"
                      ]
                    },
                    "connectionId": {
                      "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                      "x-go-name": "ConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_id",
                        "json": "connectionId,omitempty"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "externalId": {
                      "type": "string",
                      "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                      "x-id-format": "external",
                      "minLength": 1,
                      "maxLength": 255,
                      "pattern": "^[A-Za-z0-9_-]+$",
                      "x-oapi-codegen-extra-tags": {
                        "db": "external_id",
                        "json": "externalId,omitempty"
                      },
                      "x-order": 6
                    },
                    "kind": {
                      "description": "Image or video, derived by the server from `contentType`.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "image",
                        "video"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetKindImage",
                        "MediaAssetKindVideo"
                      ]
                    },
                    "contentType": {
                      "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_type"
                      },
                      "x-order": 8,
                      "type": "string",
                      "enum": [
                        "image/png",
                        "image/jpeg",
                        "image/gif",
                        "image/webp",
                        "image/heic",
                        "video/mp4",
                        "video/quicktime",
                        "video/webm"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetContentTypeImagePng",
                        "MediaAssetContentTypeImageJpeg",
                        "MediaAssetContentTypeImageGif",
                        "MediaAssetContentTypeImageWebp",
                        "MediaAssetContentTypeImageHeic",
                        "MediaAssetContentTypeVideoMp4",
                        "MediaAssetContentTypeVideoQuicktime",
                        "MediaAssetContentTypeVideoWebm"
                      ]
                    },
                    "bytes": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                      "minimum": 1,
                      "maximum": 5368709120,
                      "x-oapi-codegen-extra-tags": {
                        "db": "bytes"
                      },
                      "x-order": 9
                    },
                    "sha256": {
                      "type": "string",
                      "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                      "minLength": 64,
                      "maxLength": 64,
                      "pattern": "^[0-9a-f]{64}$",
                      "x-oapi-codegen-extra-tags": {
                        "db": "sha256"
                      },
                      "x-order": 10
                    },
                    "name": {
                      "type": "string",
                      "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      },
                      "x-order": 11
                    },
                    "locationStripped": {
                      "type": "boolean",
                      "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "location_stripped"
                      },
                      "x-order": 12
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                      "enum": [
                        "pending",
                        "ready",
                        "rejected",
                        "expired"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetStatusPending",
                        "MediaAssetStatusReady",
                        "MediaAssetStatusRejected",
                        "MediaAssetStatusExpired"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 13
                    },
                    "rejectionReason": {
                      "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "rejection_reason",
                        "json": "rejectionReason,omitempty"
                      },
                      "x-order": 14,
                      "type": "string",
                      "enum": [
                        "missing",
                        "size",
                        "type",
                        "checksum"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetRejectionReasonMissing",
                        "MediaAssetRejectionReasonSize",
                        "MediaAssetRejectionReasonType",
                        "MediaAssetRejectionReasonChecksum"
                      ]
                    },
                    "retainUntil": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "retain_until"
                      },
                      "x-order": 15
                    },
                    "completedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "completed_at"
                      },
                      "x-order": 16
                    },
                    "expiresAt": {
                      "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at"
                      },
                      "x-order": 17,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdAt": {
                      "description": "Timestamp of media asset creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 18,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last media asset modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 19,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 20
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "Conflict - the asset is not in a status the operation accepts, the uploaded bytes did not match the declared size, type or SHA-256 (or nothing was uploaded), or the asset would take the organization past its storage limit\n",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "delete": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Delete a media asset",
        "operationId": "deleteMediaAsset",
        "description": "Deletes the asset, whatever its status: from then on it answers 404\nand no download is minted for it. The stored bytes of an `r2` asset\nare removed. The file of a `gdrive` asset is the person's and stays\nin their Drive. Deleting does not check whether a content item\nstill refers to the asset; a content item that does is refused by\nname when it is posted.\n",
        "parameters": [
          {
            "name": "mediaAssetId",
            "in": "path",
            "description": "Media asset ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Media asset deleted"
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/media-assets/{mediaAssetId}/complete": {
      "post": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Complete a media asset upload",
        "operationId": "completeMediaAsset",
        "description": "Checks the stored bytes of a `pending` asset against its\ndeclaration: the size must equal `bytes`, the type sniffed from the\nbytes must be `contentType` (the extension and any declared header\nare never trusted), and the SHA-256 must equal `sha256`. On a match\nthe asset becomes `ready`, `completedAt` is set and `expiresAt`\nmoves to the end of its retention. On a mismatch, or when nothing\nwas uploaded, the asset becomes `rejected` with a\n`rejectionReason`, its stored bytes are removed, and the call is\nrefused with 409; the client creates a new asset to try again.\nCompleting a `ready` asset answers it unchanged, so a retried\ncompletion is safe. Completing a `rejected` or `expired` asset is\nrefused with 409.\n",
        "parameters": [
          {
            "name": "mediaAssetId",
            "in": "path",
            "description": "Media asset ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Media asset ready",
            "content": {
              "application/json": {
                "schema": {
                  "$schema": "http://json-schema.org/draft-07/schema#",
                  "title": "Media Asset Schema",
                  "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
                  "type": "object",
                  "additionalProperties": false,
                  "required": [
                    "id",
                    "organizationId",
                    "backend",
                    "kind",
                    "contentType",
                    "bytes",
                    "sha256",
                    "locationStripped",
                    "status",
                    "expiresAt",
                    "createdAt",
                    "updatedAt"
                  ],
                  "properties": {
                    "id": {
                      "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "id"
                      },
                      "x-order": 1,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "organizationId": {
                      "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                      "x-go-name": "OrganizationID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "organization_id"
                      },
                      "x-order": 2,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "createdBy": {
                      "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                      "x-go-name": "CreatedBy",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_by",
                        "json": "createdBy,omitempty"
                      },
                      "x-order": 3,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "backend": {
                      "description": "Where the bytes are stored (`r2` or `gdrive`).",
                      "x-oapi-codegen-extra-tags": {
                        "db": "backend"
                      },
                      "x-order": 4,
                      "type": "string",
                      "enum": [
                        "r2",
                        "gdrive"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetBackendR2",
                        "MediaAssetBackendGdrive"
                      ]
                    },
                    "connectionId": {
                      "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                      "x-go-name": "ConnectionID",
                      "x-oapi-codegen-extra-tags": {
                        "db": "connection_id",
                        "json": "connectionId,omitempty"
                      },
                      "x-order": 5,
                      "type": "string",
                      "format": "uuid",
                      "x-go-type": "uuid.UUID",
                      "x-go-type-import": {
                        "path": "github.com/gofrs/uuid"
                      }
                    },
                    "externalId": {
                      "type": "string",
                      "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                      "x-id-format": "external",
                      "minLength": 1,
                      "maxLength": 255,
                      "pattern": "^[A-Za-z0-9_-]+$",
                      "x-oapi-codegen-extra-tags": {
                        "db": "external_id",
                        "json": "externalId,omitempty"
                      },
                      "x-order": 6
                    },
                    "kind": {
                      "description": "Image or video, derived by the server from `contentType`.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "kind"
                      },
                      "x-order": 7,
                      "type": "string",
                      "enum": [
                        "image",
                        "video"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetKindImage",
                        "MediaAssetKindVideo"
                      ]
                    },
                    "contentType": {
                      "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "content_type"
                      },
                      "x-order": 8,
                      "type": "string",
                      "enum": [
                        "image/png",
                        "image/jpeg",
                        "image/gif",
                        "image/webp",
                        "image/heic",
                        "video/mp4",
                        "video/quicktime",
                        "video/webm"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetContentTypeImagePng",
                        "MediaAssetContentTypeImageJpeg",
                        "MediaAssetContentTypeImageGif",
                        "MediaAssetContentTypeImageWebp",
                        "MediaAssetContentTypeImageHeic",
                        "MediaAssetContentTypeVideoMp4",
                        "MediaAssetContentTypeVideoQuicktime",
                        "MediaAssetContentTypeVideoWebm"
                      ]
                    },
                    "bytes": {
                      "type": "integer",
                      "format": "int64",
                      "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                      "minimum": 1,
                      "maximum": 5368709120,
                      "x-oapi-codegen-extra-tags": {
                        "db": "bytes"
                      },
                      "x-order": 9
                    },
                    "sha256": {
                      "type": "string",
                      "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                      "minLength": 64,
                      "maxLength": 64,
                      "pattern": "^[0-9a-f]{64}$",
                      "x-oapi-codegen-extra-tags": {
                        "db": "sha256"
                      },
                      "x-order": 10
                    },
                    "name": {
                      "type": "string",
                      "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                      "minLength": 1,
                      "maxLength": 255,
                      "x-oapi-codegen-extra-tags": {
                        "db": "name",
                        "json": "name,omitempty"
                      },
                      "x-order": 11
                    },
                    "locationStripped": {
                      "type": "boolean",
                      "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "location_stripped"
                      },
                      "x-order": 12
                    },
                    "status": {
                      "type": "string",
                      "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                      "enum": [
                        "pending",
                        "ready",
                        "rejected",
                        "expired"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetStatusPending",
                        "MediaAssetStatusReady",
                        "MediaAssetStatusRejected",
                        "MediaAssetStatusExpired"
                      ],
                      "x-oapi-codegen-extra-tags": {
                        "db": "status"
                      },
                      "x-order": 13
                    },
                    "rejectionReason": {
                      "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "rejection_reason",
                        "json": "rejectionReason,omitempty"
                      },
                      "x-order": 14,
                      "type": "string",
                      "enum": [
                        "missing",
                        "size",
                        "type",
                        "checksum"
                      ],
                      "x-enum-varnames": [
                        "MediaAssetRejectionReasonMissing",
                        "MediaAssetRejectionReasonSize",
                        "MediaAssetRejectionReasonType",
                        "MediaAssetRejectionReasonChecksum"
                      ]
                    },
                    "retainUntil": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "retain_until"
                      },
                      "x-order": 15
                    },
                    "completedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "completed_at"
                      },
                      "x-order": 16
                    },
                    "expiresAt": {
                      "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                      "x-oapi-codegen-extra-tags": {
                        "db": "expires_at"
                      },
                      "x-order": 17,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "createdAt": {
                      "description": "Timestamp of media asset creation.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "created_at"
                      },
                      "x-order": 18,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "updatedAt": {
                      "description": "Timestamp of last media asset modification.",
                      "x-oapi-codegen-extra-tags": {
                        "db": "updated_at"
                      },
                      "x-order": 19,
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    },
                    "deletedAt": {
                      "type": "string",
                      "format": "date-time",
                      "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                      "nullable": true,
                      "x-go-type": "core.NullTime",
                      "x-go-type-import": {
                        "path": "github.com/meshery/schemas/models/core",
                        "name": "core"
                      },
                      "x-oapi-codegen-extra-tags": {
                        "db": "deleted_at",
                        "json": "deletedAt,omitempty"
                      },
                      "x-order": 20
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "Conflict - the asset is not in a status the operation accepts, the uploaded bytes did not match the declared size, type or SHA-256 (or nothing was uploaded), or the asset would take the organization past its storage limit\n",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "502": {
            "description": "Bad gateway - an upstream service the operation depends on could not be reached or rejected the request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/media-assets/{mediaAssetId}/download": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Get a short-lived download URL for a media asset",
        "operationId": "getMediaAssetDownload",
        "description": "Mints a fresh download URL for a `ready` asset, valid for minutes.\nCall it just before the file is used and never store the answer: a\nscheduled post asks for a new URL when it runs. For `r2` the URL is\na signed URL on the provider's object storage; for `gdrive` it is a\nsigned `getMediaAssetContent` URL on the provider, which relays the\nbytes from the person's Drive so that no Google token leaves the\nprovider. A `pending`, `rejected` or `expired` asset is refused\nwith 409. The reader checks the downloaded bytes against `bytes`\nand `sha256` before using them.\n",
        "parameters": [
          {
            "name": "mediaAssetId",
            "in": "path",
            "description": "Media asset ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Media asset download",
            "headers": {
              "Cache-Control": {
                "description": "Always `no-store`; the answer is a grant and must not be cached.",
                "schema": {
                  "type": "string",
                  "maxLength": 64
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A short-lived grant to move one file's bytes: send one request with `method` to `url` carrying exactly `headers`, before `expiresAt`. The URL is the only credential, it covers this one file, and it must be treated as a secret: never store it, log it or put it in a content item.\n",
                  "additionalProperties": false,
                  "required": [
                    "method",
                    "url",
                    "headers",
                    "expiresAt"
                  ],
                  "properties": {
                    "method": {
                      "type": "string",
                      "description": "HTTP method to use. `PUT` for an upload, `GET` for a download.",
                      "enum": [
                        "PUT",
                        "GET"
                      ],
                      "x-enum-casing-exempt": true,
                      "x-enum-varnames": [
                        "MediaAssetTransferMethodPut",
                        "MediaAssetTransferMethodGet"
                      ]
                    },
                    "url": {
                      "type": "string",
                      "format": "uri",
                      "description": "Absolute HTTPS URL to send the request to.",
                      "maxLength": 4096
                    },
                    "headers": {
                      "type": "object",
                      "description": "Headers the request must carry, verbatim (for an upload, at least `Content-Type`, and any integrity header the signature binds). Empty when none are needed. Never contains an authorization header.\n",
                      "additionalProperties": {
                        "type": "string",
                        "maxLength": 1024
                      },
                      "x-go-type": "map[string]string"
                    },
                    "expiresAt": {
                      "description": "Time the URL stops working.",
                      "type": "string",
                      "format": "date-time",
                      "x-go-type-skip-optional-pointer": true
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "401": {
            "description": "Expired JWT token used or insufficient privilege",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "409": {
            "description": "Conflict - the asset is not in a status the operation accepts, the uploaded bytes did not match the declared size, type or SHA-256 (or nothing was uploaded), or the asset would take the organization past its storage limit\n",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/api/media-assets/{mediaAssetId}/content": {
      "get": {
        "x-internal": [
          "cloud"
        ],
        "tags": [
          "mediaAssets"
        ],
        "summary": "Download the bytes of a Drive-backed media asset",
        "operationId": "getMediaAssetContent",
        "description": "Streams the bytes of a `ready` `gdrive` asset from the person's\nGoogle Drive. This route is only ever reached through a URL that\n`getMediaAssetDownload` minted: it takes no session, and the\n`expires` and `signature` it carries are the whole grant, valid\nfor that one asset until `expires`. The response `Content-Type` is\nthe asset's `contentType`. A missing, altered or lapsed signature\nis refused with 403; an asset that was deleted, expired or is not\n`gdrive` since the URL was minted receives 404; a Drive file that\nwas removed, moved out of reach or whose grant was revoked is\nrefused with 502.\n",
        "security": [],
        "parameters": [
          {
            "name": "mediaAssetId",
            "in": "path",
            "description": "Media asset ID",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
              "x-go-type": "uuid.UUID",
              "x-go-type-import": {
                "path": "github.com/gofrs/uuid"
              }
            }
          },
          {
            "name": "expires",
            "in": "query",
            "required": true,
            "description": "Time the grant lapses, in seconds since the Unix epoch.",
            "schema": {
              "type": "integer",
              "format": "int64",
              "minimum": 0
            }
          },
          {
            "name": "signature",
            "in": "query",
            "required": true,
            "description": "Server-computed signature over the asset ID and `expires`. Opaque to clients.",
            "schema": {
              "type": "string",
              "minLength": 1,
              "maxLength": 512,
              "pattern": "^[A-Za-z0-9_-]+$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Media asset bytes",
            "content": {
              "application/octet-stream": {
                "schema": {
                  "type": "string",
                  "format": "binary"
                }
              }
            }
          },
          "400": {
            "description": "Invalid request body or request param",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "404": {
            "description": "Result not found",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "429": {
            "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
            "headers": {
              "Retry-After": {
                "description": "Number of seconds the caller must wait before retrying.",
                "required": true,
                "schema": {
                  "type": "integer",
                  "minimum": 1
                }
              }
            },
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            "description": "Internal server error",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          },
          "502": {
            "description": "Bad gateway - an upstream service the operation depends on could not be reached or rejected the request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
                  "required": [
                    "error"
                  ],
                  "additionalProperties": false,
                  "properties": {
                    "error": {
                      "type": "string",
                      "minLength": 1,
                      "description": "The sentence the caller is shown."
                    },
                    "code": {
                      "type": "string",
                      "minLength": 1,
                      "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                    },
                    "severity": {
                      "type": "string",
                      "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                      "enum": [
                        "emergency",
                        "alert",
                        "critical",
                        "fatal"
                      ]
                    },
                    "probableCause": {
                      "type": "array",
                      "description": "MeshKit's probable causes of the error.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "suggestedRemediation": {
                      "type": "array",
                      "description": "MeshKit's suggested remediations for the error.",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "jwt": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "responses": {
      "400": {
        "description": "Invalid request body or request param",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "401": {
        "description": "Expired JWT token used or insufficient privilege",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "403": {
        "description": "Forbidden",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "404": {
        "description": "Result not found",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "409": {
        "description": "Conflict - the asset is not in a status the operation accepts, the uploaded bytes did not match the declared size, type or SHA-256 (or nothing was uploaded), or the asset would take the organization past its storage limit\n",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "text/plain": {
            "schema": {
              "type": "string"
            }
          }
        }
      },
      "MeshkitError429": {
        "description": "Too many requests - the caller exceeded the server's per-user request rate for this route family. Wait the number of seconds in `Retry-After` before retrying.",
        "headers": {
          "Retry-After": {
            "description": "Number of seconds the caller must wait before retrying.",
            "required": true,
            "schema": {
              "type": "integer",
              "minimum": 1
            }
          }
        },
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
              "required": [
                "error"
              ],
              "additionalProperties": false,
              "properties": {
                "error": {
                  "type": "string",
                  "minLength": 1,
                  "description": "The sentence the caller is shown."
                },
                "code": {
                  "type": "string",
                  "minLength": 1,
                  "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                },
                "severity": {
                  "type": "string",
                  "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                  "enum": [
                    "emergency",
                    "alert",
                    "critical",
                    "fatal"
                  ]
                },
                "probableCause": {
                  "type": "array",
                  "description": "MeshKit's probable causes of the error.",
                  "items": {
                    "type": "string"
                  }
                },
                "suggestedRemediation": {
                  "type": "array",
                  "description": "MeshKit's suggested remediations for the error.",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      },
      "MeshkitError502": {
        "description": "Bad gateway - an upstream service the operation depends on could not be reached or rejected the request",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "description": "A MeshKit error answered as a JSON body. `error` is the sentence the caller is shown; MeshKit's long description is never serialized. Use the `MeshkitError400`, `MeshkitError403`, `MeshkitError404`, `MeshkitError409`, `MeshkitError429`, `MeshkitError500` and `MeshkitError502` responses for an operation whose server answers its refusals this way.",
              "required": [
                "error"
              ],
              "additionalProperties": false,
              "properties": {
                "error": {
                  "type": "string",
                  "minLength": 1,
                  "description": "The sentence the caller is shown."
                },
                "code": {
                  "type": "string",
                  "minLength": 1,
                  "description": "MeshKit error code, a component-scoped identifier allocated by the emitting service (e.g. `<component>-<number>`); it is not a stable part of this contract. Omitted for an error that is not a MeshKit error."
                },
                "severity": {
                  "type": "string",
                  "description": "MeshKit severity name. Omitted when MeshKit reports none.",
                  "enum": [
                    "emergency",
                    "alert",
                    "critical",
                    "fatal"
                  ]
                },
                "probableCause": {
                  "type": "array",
                  "description": "MeshKit's probable causes of the error.",
                  "items": {
                    "type": "string"
                  }
                },
                "suggestedRemediation": {
                  "type": "array",
                  "description": "MeshKit's suggested remediations for the error.",
                  "items": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "parameters": {
      "mediaAssetId": {
        "name": "mediaAssetId",
        "in": "path",
        "description": "Media asset ID",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid",
          "description": "A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core definition is used across different schemas.",
          "x-go-type": "uuid.UUID",
          "x-go-type-import": {
            "path": "github.com/gofrs/uuid"
          }
        }
      },
      "page": {
        "name": "page",
        "in": "query",
        "description": "Get responses by page",
        "schema": {
          "type": "integer",
          "minimum": 0
        }
      },
      "pageSize": {
        "name": "pageSize",
        "in": "query",
        "description": "Number of items per page.",
        "schema": {
          "type": "integer",
          "minimum": 1
        }
      },
      "search": {
        "name": "search",
        "in": "query",
        "description": "Get responses that match search param value",
        "schema": {
          "type": "string"
        }
      },
      "order": {
        "name": "order",
        "in": "query",
        "description": "Get ordered responses",
        "schema": {
          "type": "string"
        }
      }
    },
    "schemas": {
      "MediaAsset": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Media Asset Schema",
        "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
        "type": "object",
        "additionalProperties": false,
        "required": [
          "id",
          "organizationId",
          "backend",
          "kind",
          "contentType",
          "bytes",
          "sha256",
          "locationStripped",
          "status",
          "expiresAt",
          "createdAt",
          "updatedAt"
        ],
        "properties": {
          "id": {
            "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
            "x-oapi-codegen-extra-tags": {
              "db": "id"
            },
            "x-order": 1,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "organizationId": {
            "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
            "x-go-name": "OrganizationID",
            "x-oapi-codegen-extra-tags": {
              "db": "organization_id"
            },
            "x-order": 2,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "createdBy": {
            "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
            "x-go-name": "CreatedBy",
            "x-oapi-codegen-extra-tags": {
              "db": "created_by",
              "json": "createdBy,omitempty"
            },
            "x-order": 3,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "backend": {
            "description": "Where the bytes are stored (`r2` or `gdrive`).",
            "x-oapi-codegen-extra-tags": {
              "db": "backend"
            },
            "x-order": 4,
            "type": "string",
            "enum": [
              "r2",
              "gdrive"
            ],
            "x-enum-varnames": [
              "MediaAssetBackendR2",
              "MediaAssetBackendGdrive"
            ]
          },
          "connectionId": {
            "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
            "x-go-name": "ConnectionID",
            "x-oapi-codegen-extra-tags": {
              "db": "connection_id",
              "json": "connectionId,omitempty"
            },
            "x-order": 5,
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "externalId": {
            "type": "string",
            "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
            "x-id-format": "external",
            "minLength": 1,
            "maxLength": 255,
            "pattern": "^[A-Za-z0-9_-]+$",
            "x-oapi-codegen-extra-tags": {
              "db": "external_id",
              "json": "externalId,omitempty"
            },
            "x-order": 6
          },
          "kind": {
            "description": "Image or video, derived by the server from `contentType`.",
            "x-oapi-codegen-extra-tags": {
              "db": "kind"
            },
            "x-order": 7,
            "type": "string",
            "enum": [
              "image",
              "video"
            ],
            "x-enum-varnames": [
              "MediaAssetKindImage",
              "MediaAssetKindVideo"
            ]
          },
          "contentType": {
            "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
            "x-oapi-codegen-extra-tags": {
              "db": "content_type"
            },
            "x-order": 8,
            "type": "string",
            "enum": [
              "image/png",
              "image/jpeg",
              "image/gif",
              "image/webp",
              "image/heic",
              "video/mp4",
              "video/quicktime",
              "video/webm"
            ],
            "x-enum-varnames": [
              "MediaAssetContentTypeImagePng",
              "MediaAssetContentTypeImageJpeg",
              "MediaAssetContentTypeImageGif",
              "MediaAssetContentTypeImageWebp",
              "MediaAssetContentTypeImageHeic",
              "MediaAssetContentTypeVideoMp4",
              "MediaAssetContentTypeVideoQuicktime",
              "MediaAssetContentTypeVideoWebm"
            ]
          },
          "bytes": {
            "type": "integer",
            "format": "int64",
            "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
            "minimum": 1,
            "maximum": 5368709120,
            "x-oapi-codegen-extra-tags": {
              "db": "bytes"
            },
            "x-order": 9
          },
          "sha256": {
            "type": "string",
            "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
            "minLength": 64,
            "maxLength": 64,
            "pattern": "^[0-9a-f]{64}$",
            "x-oapi-codegen-extra-tags": {
              "db": "sha256"
            },
            "x-order": 10
          },
          "name": {
            "type": "string",
            "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
            "minLength": 1,
            "maxLength": 255,
            "x-oapi-codegen-extra-tags": {
              "db": "name",
              "json": "name,omitempty"
            },
            "x-order": 11
          },
          "locationStripped": {
            "type": "boolean",
            "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "location_stripped"
            },
            "x-order": 12
          },
          "status": {
            "type": "string",
            "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
            "enum": [
              "pending",
              "ready",
              "rejected",
              "expired"
            ],
            "x-enum-varnames": [
              "MediaAssetStatusPending",
              "MediaAssetStatusReady",
              "MediaAssetStatusRejected",
              "MediaAssetStatusExpired"
            ],
            "x-oapi-codegen-extra-tags": {
              "db": "status"
            },
            "x-order": 13
          },
          "rejectionReason": {
            "description": "Why the upload was rejected. Set only on a `rejected` asset.",
            "x-oapi-codegen-extra-tags": {
              "db": "rejection_reason",
              "json": "rejectionReason,omitempty"
            },
            "x-order": 14,
            "type": "string",
            "enum": [
              "missing",
              "size",
              "type",
              "checksum"
            ],
            "x-enum-varnames": [
              "MediaAssetRejectionReasonMissing",
              "MediaAssetRejectionReasonSize",
              "MediaAssetRejectionReasonType",
              "MediaAssetRejectionReasonChecksum"
            ]
          },
          "retainUntil": {
            "type": "string",
            "format": "date-time",
            "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "retain_until"
            },
            "x-order": 15
          },
          "completedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "completed_at"
            },
            "x-order": 16
          },
          "expiresAt": {
            "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
            "x-oapi-codegen-extra-tags": {
              "db": "expires_at"
            },
            "x-order": 17,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "createdAt": {
            "description": "Timestamp of media asset creation.",
            "x-oapi-codegen-extra-tags": {
              "db": "created_at"
            },
            "x-order": 18,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "updatedAt": {
            "description": "Timestamp of last media asset modification.",
            "x-oapi-codegen-extra-tags": {
              "db": "updated_at"
            },
            "x-order": 19,
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          },
          "deletedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
            "nullable": true,
            "x-go-type": "core.NullTime",
            "x-go-type-import": {
              "path": "github.com/meshery/schemas/models/core",
              "name": "core"
            },
            "x-oapi-codegen-extra-tags": {
              "db": "deleted_at",
              "json": "deletedAt,omitempty"
            },
            "x-order": 20
          }
        }
      },
      "MediaAssetBackend": {
        "type": "string",
        "description": "Where the asset's bytes are stored. `r2` is the provider's own private object storage; `gdrive` is the uploading person's Google Drive, reached through their Google Drive connection. Neither is a default: a provider states the ones it serves in `MediaAssetQuota.backends`, and a create names one of them. A reader never branches on it: `getMediaAssetDownload` answers the same shape for both.\n",
        "enum": [
          "r2",
          "gdrive"
        ],
        "x-enum-varnames": [
          "MediaAssetBackendR2",
          "MediaAssetBackendGdrive"
        ]
      },
      "MediaAssetKind": {
        "type": "string",
        "description": "Whether the asset is an image or a video. Derived by the server from `contentType`.",
        "enum": [
          "image",
          "video"
        ],
        "x-enum-varnames": [
          "MediaAssetKindImage",
          "MediaAssetKindVideo"
        ]
      },
      "MediaAssetContentType": {
        "type": "string",
        "description": "Media type of the file, from a closed allowlist. The server sniffs the stored bytes on completion and rejects an upload whose real type differs. A provider may accept fewer types than this list (`MediaAssetQuota.contentTypes`).\n",
        "enum": [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
          "image/heic",
          "video/mp4",
          "video/quicktime",
          "video/webm"
        ],
        "x-enum-varnames": [
          "MediaAssetContentTypeImagePng",
          "MediaAssetContentTypeImageJpeg",
          "MediaAssetContentTypeImageGif",
          "MediaAssetContentTypeImageWebp",
          "MediaAssetContentTypeImageHeic",
          "MediaAssetContentTypeVideoMp4",
          "MediaAssetContentTypeVideoQuicktime",
          "MediaAssetContentTypeVideoWebm"
        ]
      },
      "MediaAssetStatus": {
        "type": "string",
        "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
        "enum": [
          "pending",
          "ready",
          "rejected",
          "expired"
        ],
        "x-enum-varnames": [
          "MediaAssetStatusPending",
          "MediaAssetStatusReady",
          "MediaAssetStatusRejected",
          "MediaAssetStatusExpired"
        ]
      },
      "MediaAssetRejectionReason": {
        "type": "string",
        "description": "Why `completeMediaAsset` rejected the upload: `missing` when no bytes were stored, `size` when their size differs from `bytes`, `type` when the sniffed type differs from `contentType`, `checksum` when their SHA-256 differs from `sha256`. Set only on a `rejected` asset.\n",
        "enum": [
          "missing",
          "size",
          "type",
          "checksum"
        ],
        "x-enum-varnames": [
          "MediaAssetRejectionReasonMissing",
          "MediaAssetRejectionReasonSize",
          "MediaAssetRejectionReasonType",
          "MediaAssetRejectionReasonChecksum"
        ]
      },
      "MediaAssetPayload": {
        "type": "object",
        "description": "Payload for creating a media asset. Contains only client-settable\nfields; the owning `organizationId` and `createdBy` (from the\nsession), `kind` (derived from `contentType`), `status`,\n`rejectionReason`, `externalId`, `completedAt`, `expiresAt` and the\ntimestamps are server-owned and not accepted.\n",
        "additionalProperties": false,
        "required": [
          "contentType",
          "bytes",
          "sha256",
          "locationStripped",
          "backend"
        ],
        "properties": {
          "contentType": {
            "type": "string",
            "description": "Media type of the file, from a closed allowlist. The server sniffs the stored bytes on completion and rejects an upload whose real type differs. A provider may accept fewer types than this list (`MediaAssetQuota.contentTypes`).\n",
            "enum": [
              "image/png",
              "image/jpeg",
              "image/gif",
              "image/webp",
              "image/heic",
              "video/mp4",
              "video/quicktime",
              "video/webm"
            ],
            "x-enum-varnames": [
              "MediaAssetContentTypeImagePng",
              "MediaAssetContentTypeImageJpeg",
              "MediaAssetContentTypeImageGif",
              "MediaAssetContentTypeImageWebp",
              "MediaAssetContentTypeImageHeic",
              "MediaAssetContentTypeVideoMp4",
              "MediaAssetContentTypeVideoQuicktime",
              "MediaAssetContentTypeVideoWebm"
            ]
          },
          "bytes": {
            "type": "integer",
            "format": "int64",
            "description": "Size of the file in bytes. Must not exceed the quota's limit for its kind.",
            "minimum": 1,
            "maximum": 5368709120
          },
          "sha256": {
            "type": "string",
            "description": "Lowercase hex SHA-256 of the exact bytes that will be uploaded.",
            "minLength": 64,
            "maxLength": 64,
            "pattern": "^[0-9a-f]{64}$"
          },
          "name": {
            "type": "string",
            "description": "Display name of the file, typically its original file name.",
            "minLength": 1,
            "maxLength": 255
          },
          "locationStripped": {
            "type": "boolean",
            "description": "Whether the client removed location metadata (EXIF and XMP GPS, maker notes, device serial numbers) from the file before hashing and uploading it. Recorded as sent.\n"
          },
          "backend": {
            "description": "Where to store the file. Required, with no default: the client picks one of the backends `getMediaAssetQuota` lists in `backends`, and a create naming any other answers `400`.\n",
            "type": "string",
            "enum": [
              "r2",
              "gdrive"
            ],
            "x-enum-varnames": [
              "MediaAssetBackendR2",
              "MediaAssetBackendGdrive"
            ]
          },
          "connectionId": {
            "description": "The caller's own live Google Drive connection in the session organization. Required when `backend` is `gdrive`, refused otherwise.\n",
            "x-go-name": "ConnectionID",
            "x-oapi-codegen-extra-tags": {
              "json": "connectionId,omitempty"
            },
            "type": "string",
            "format": "uuid",
            "x-go-type": "uuid.UUID",
            "x-go-type-import": {
              "path": "github.com/gofrs/uuid"
            }
          },
          "retainUntil": {
            "type": "string",
            "format": "date-time",
            "description": "Time the asset must stay downloadable until, for example a little after the post that uses it is scheduled. Omitted, the organization's default retention applies from completion.\n"
          }
        }
      },
      "MediaAssetUpdatePayload": {
        "type": "object",
        "description": "Payload for changing how long a media asset is kept. Retention is the only field that changes after create.",
        "additionalProperties": false,
        "required": [
          "retainUntil"
        ],
        "properties": {
          "retainUntil": {
            "type": "string",
            "format": "date-time",
            "description": "New time the asset must stay downloadable until. Must be in the future and within `maxRetentionDays` from now."
          }
        }
      },
      "MediaAssetTransfer": {
        "type": "object",
        "description": "A short-lived grant to move one file's bytes: send one request with `method` to `url` carrying exactly `headers`, before `expiresAt`. The URL is the only credential, it covers this one file, and it must be treated as a secret: never store it, log it or put it in a content item.\n",
        "additionalProperties": false,
        "required": [
          "method",
          "url",
          "headers",
          "expiresAt"
        ],
        "properties": {
          "method": {
            "type": "string",
            "description": "HTTP method to use. `PUT` for an upload, `GET` for a download.",
            "enum": [
              "PUT",
              "GET"
            ],
            "x-enum-casing-exempt": true,
            "x-enum-varnames": [
              "MediaAssetTransferMethodPut",
              "MediaAssetTransferMethodGet"
            ]
          },
          "url": {
            "type": "string",
            "format": "uri",
            "description": "Absolute HTTPS URL to send the request to.",
            "maxLength": 4096
          },
          "headers": {
            "type": "object",
            "description": "Headers the request must carry, verbatim (for an upload, at least `Content-Type`, and any integrity header the signature binds). Empty when none are needed. Never contains an authorization header.\n",
            "additionalProperties": {
              "type": "string",
              "maxLength": 1024
            },
            "x-go-type": "map[string]string"
          },
          "expiresAt": {
            "description": "Time the URL stops working.",
            "type": "string",
            "format": "date-time",
            "x-go-type-skip-optional-pointer": true
          }
        }
      },
      "MediaAssetUpload": {
        "type": "object",
        "description": "Answer to `createMediaAsset`: the new `pending` asset and the grant to upload its bytes.",
        "additionalProperties": false,
        "required": [
          "mediaAsset",
          "upload"
        ],
        "properties": {
          "mediaAsset": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Media Asset Schema",
            "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
            "type": "object",
            "additionalProperties": false,
            "required": [
              "id",
              "organizationId",
              "backend",
              "kind",
              "contentType",
              "bytes",
              "sha256",
              "locationStripped",
              "status",
              "expiresAt",
              "createdAt",
              "updatedAt"
            ],
            "properties": {
              "id": {
                "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                "x-oapi-codegen-extra-tags": {
                  "db": "id"
                },
                "x-order": 1,
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "organizationId": {
                "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                "x-go-name": "OrganizationID",
                "x-oapi-codegen-extra-tags": {
                  "db": "organization_id"
                },
                "x-order": 2,
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "createdBy": {
                "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                "x-go-name": "CreatedBy",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_by",
                  "json": "createdBy,omitempty"
                },
                "x-order": 3,
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "backend": {
                "description": "Where the bytes are stored (`r2` or `gdrive`).",
                "x-oapi-codegen-extra-tags": {
                  "db": "backend"
                },
                "x-order": 4,
                "type": "string",
                "enum": [
                  "r2",
                  "gdrive"
                ],
                "x-enum-varnames": [
                  "MediaAssetBackendR2",
                  "MediaAssetBackendGdrive"
                ]
              },
              "connectionId": {
                "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                "x-go-name": "ConnectionID",
                "x-oapi-codegen-extra-tags": {
                  "db": "connection_id",
                  "json": "connectionId,omitempty"
                },
                "x-order": 5,
                "type": "string",
                "format": "uuid",
                "x-go-type": "uuid.UUID",
                "x-go-type-import": {
                  "path": "github.com/gofrs/uuid"
                }
              },
              "externalId": {
                "type": "string",
                "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                "x-id-format": "external",
                "minLength": 1,
                "maxLength": 255,
                "pattern": "^[A-Za-z0-9_-]+$",
                "x-oapi-codegen-extra-tags": {
                  "db": "external_id",
                  "json": "externalId,omitempty"
                },
                "x-order": 6
              },
              "kind": {
                "description": "Image or video, derived by the server from `contentType`.",
                "x-oapi-codegen-extra-tags": {
                  "db": "kind"
                },
                "x-order": 7,
                "type": "string",
                "enum": [
                  "image",
                  "video"
                ],
                "x-enum-varnames": [
                  "MediaAssetKindImage",
                  "MediaAssetKindVideo"
                ]
              },
              "contentType": {
                "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                "x-oapi-codegen-extra-tags": {
                  "db": "content_type"
                },
                "x-order": 8,
                "type": "string",
                "enum": [
                  "image/png",
                  "image/jpeg",
                  "image/gif",
                  "image/webp",
                  "image/heic",
                  "video/mp4",
                  "video/quicktime",
                  "video/webm"
                ],
                "x-enum-varnames": [
                  "MediaAssetContentTypeImagePng",
                  "MediaAssetContentTypeImageJpeg",
                  "MediaAssetContentTypeImageGif",
                  "MediaAssetContentTypeImageWebp",
                  "MediaAssetContentTypeImageHeic",
                  "MediaAssetContentTypeVideoMp4",
                  "MediaAssetContentTypeVideoQuicktime",
                  "MediaAssetContentTypeVideoWebm"
                ]
              },
              "bytes": {
                "type": "integer",
                "format": "int64",
                "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                "minimum": 1,
                "maximum": 5368709120,
                "x-oapi-codegen-extra-tags": {
                  "db": "bytes"
                },
                "x-order": 9
              },
              "sha256": {
                "type": "string",
                "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                "minLength": 64,
                "maxLength": 64,
                "pattern": "^[0-9a-f]{64}$",
                "x-oapi-codegen-extra-tags": {
                  "db": "sha256"
                },
                "x-order": 10
              },
              "name": {
                "type": "string",
                "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                "minLength": 1,
                "maxLength": 255,
                "x-oapi-codegen-extra-tags": {
                  "db": "name",
                  "json": "name,omitempty"
                },
                "x-order": 11
              },
              "locationStripped": {
                "type": "boolean",
                "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                "x-oapi-codegen-extra-tags": {
                  "db": "location_stripped"
                },
                "x-order": 12
              },
              "status": {
                "type": "string",
                "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                "enum": [
                  "pending",
                  "ready",
                  "rejected",
                  "expired"
                ],
                "x-enum-varnames": [
                  "MediaAssetStatusPending",
                  "MediaAssetStatusReady",
                  "MediaAssetStatusRejected",
                  "MediaAssetStatusExpired"
                ],
                "x-oapi-codegen-extra-tags": {
                  "db": "status"
                },
                "x-order": 13
              },
              "rejectionReason": {
                "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                "x-oapi-codegen-extra-tags": {
                  "db": "rejection_reason",
                  "json": "rejectionReason,omitempty"
                },
                "x-order": 14,
                "type": "string",
                "enum": [
                  "missing",
                  "size",
                  "type",
                  "checksum"
                ],
                "x-enum-varnames": [
                  "MediaAssetRejectionReasonMissing",
                  "MediaAssetRejectionReasonSize",
                  "MediaAssetRejectionReasonType",
                  "MediaAssetRejectionReasonChecksum"
                ]
              },
              "retainUntil": {
                "type": "string",
                "format": "date-time",
                "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "retain_until"
                },
                "x-order": 15
              },
              "completedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "completed_at"
                },
                "x-order": 16
              },
              "expiresAt": {
                "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                "x-oapi-codegen-extra-tags": {
                  "db": "expires_at"
                },
                "x-order": 17,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "createdAt": {
                "description": "Timestamp of media asset creation.",
                "x-oapi-codegen-extra-tags": {
                  "db": "created_at"
                },
                "x-order": 18,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "updatedAt": {
                "description": "Timestamp of last media asset modification.",
                "x-oapi-codegen-extra-tags": {
                  "db": "updated_at"
                },
                "x-order": 19,
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              },
              "deletedAt": {
                "type": "string",
                "format": "date-time",
                "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                "nullable": true,
                "x-go-type": "core.NullTime",
                "x-go-type-import": {
                  "path": "github.com/meshery/schemas/models/core",
                  "name": "core"
                },
                "x-oapi-codegen-extra-tags": {
                  "db": "deleted_at",
                  "json": "deletedAt,omitempty"
                },
                "x-order": 20
              }
            }
          },
          "upload": {
            "type": "object",
            "description": "A short-lived grant to move one file's bytes: send one request with `method` to `url` carrying exactly `headers`, before `expiresAt`. The URL is the only credential, it covers this one file, and it must be treated as a secret: never store it, log it or put it in a content item.\n",
            "additionalProperties": false,
            "required": [
              "method",
              "url",
              "headers",
              "expiresAt"
            ],
            "properties": {
              "method": {
                "type": "string",
                "description": "HTTP method to use. `PUT` for an upload, `GET` for a download.",
                "enum": [
                  "PUT",
                  "GET"
                ],
                "x-enum-casing-exempt": true,
                "x-enum-varnames": [
                  "MediaAssetTransferMethodPut",
                  "MediaAssetTransferMethodGet"
                ]
              },
              "url": {
                "type": "string",
                "format": "uri",
                "description": "Absolute HTTPS URL to send the request to.",
                "maxLength": 4096
              },
              "headers": {
                "type": "object",
                "description": "Headers the request must carry, verbatim (for an upload, at least `Content-Type`, and any integrity header the signature binds). Empty when none are needed. Never contains an authorization header.\n",
                "additionalProperties": {
                  "type": "string",
                  "maxLength": 1024
                },
                "x-go-type": "map[string]string"
              },
              "expiresAt": {
                "description": "Time the URL stops working.",
                "type": "string",
                "format": "date-time",
                "x-go-type-skip-optional-pointer": true
              }
            }
          }
        }
      },
      "MediaAssetQuota": {
        "type": "object",
        "description": "The media asset limits of the session organization and its current storage use.",
        "additionalProperties": false,
        "required": [
          "backends",
          "contentTypes",
          "maxImageBytes",
          "maxVideoBytes",
          "uploadWindowSeconds",
          "defaultRetentionDays",
          "maxRetentionDays",
          "bytesLimit",
          "bytesUsed"
        ],
        "properties": {
          "backends": {
            "type": "array",
            "description": "Backends this provider serves for the organization, and the only statement of what it serves. A create must name one of them in `backend` (there is no default); naming another is refused with 400.\n",
            "items": {
              "type": "string",
              "description": "Where the asset's bytes are stored. `r2` is the provider's own private object storage; `gdrive` is the uploading person's Google Drive, reached through their Google Drive connection. Neither is a default: a provider states the ones it serves in `MediaAssetQuota.backends`, and a create names one of them. A reader never branches on it: `getMediaAssetDownload` answers the same shape for both.\n",
              "enum": [
                "r2",
                "gdrive"
              ],
              "x-enum-varnames": [
                "MediaAssetBackendR2",
                "MediaAssetBackendGdrive"
              ]
            }
          },
          "contentTypes": {
            "type": "array",
            "description": "Content types this provider accepts.",
            "items": {
              "type": "string",
              "description": "Media type of the file, from a closed allowlist. The server sniffs the stored bytes on completion and rejects an upload whose real type differs. A provider may accept fewer types than this list (`MediaAssetQuota.contentTypes`).\n",
              "enum": [
                "image/png",
                "image/jpeg",
                "image/gif",
                "image/webp",
                "image/heic",
                "video/mp4",
                "video/quicktime",
                "video/webm"
              ],
              "x-enum-varnames": [
                "MediaAssetContentTypeImagePng",
                "MediaAssetContentTypeImageJpeg",
                "MediaAssetContentTypeImageGif",
                "MediaAssetContentTypeImageWebp",
                "MediaAssetContentTypeImageHeic",
                "MediaAssetContentTypeVideoMp4",
                "MediaAssetContentTypeVideoQuicktime",
                "MediaAssetContentTypeVideoWebm"
              ]
            }
          },
          "maxImageBytes": {
            "type": "integer",
            "format": "int64",
            "description": "Largest image a create accepts, in bytes.",
            "minimum": 1,
            "maximum": 5368709120
          },
          "maxVideoBytes": {
            "type": "integer",
            "format": "int64",
            "description": "Largest video a create accepts, in bytes.",
            "minimum": 1,
            "maximum": 5368709120
          },
          "uploadWindowSeconds": {
            "type": "integer",
            "description": "How long a `pending` asset waits for its upload and completion before it expires, in seconds.",
            "minimum": 60,
            "maximum": 604800
          },
          "defaultRetentionDays": {
            "type": "integer",
            "description": "Days a `ready` asset is kept after completion when no `retainUntil` was set.",
            "minimum": 1,
            "maximum": 3650
          },
          "maxRetentionDays": {
            "type": "integer",
            "description": "Furthest `retainUntil` may lie from now, in days.",
            "minimum": 1,
            "maximum": 3650
          },
          "bytesLimit": {
            "type": "integer",
            "format": "int64",
            "description": "Total bytes the organization's live `pending` and `ready` assets may hold. Null when the organization has no storage limit.",
            "minimum": 0,
            "nullable": true
          },
          "bytesUsed": {
            "type": "integer",
            "format": "int64",
            "description": "Total bytes of the organization's live `pending` and `ready` assets. Null when it could not be measured, which must be presented as unknown; a number, including 0, is a measurement.\n",
            "minimum": 0,
            "nullable": true
          }
        }
      },
      "MediaAssetPage": {
        "type": "object",
        "description": "Paginated collection of media assets.",
        "properties": {
          "page": {
            "type": "integer",
            "description": "Current page number of the result set.",
            "minimum": 0
          },
          "pageSize": {
            "type": "integer",
            "description": "Number of items per page.",
            "minimum": 1
          },
          "totalCount": {
            "type": "integer",
            "description": "Total number of items available.",
            "minimum": 0
          },
          "mediaAssets": {
            "type": "array",
            "items": {
              "x-go-type": "MediaAsset",
              "$schema": "http://json-schema.org/draft-07/schema#",
              "title": "Media Asset Schema",
              "description": "Server-returned media asset: one image or video file an organization\nuploaded so that a content item can post it without a link. A content\nitem refers to an asset by its `id`, never by a URL; a short-lived\ndownload URL is minted only when the file is about to be used\n(`getMediaAssetDownload`) and is never stored.\nAn asset is created `pending` with a short-lived upload URL, becomes\n`ready` once `completeMediaAsset` has checked the stored bytes against\nthe declared size, type and SHA-256, or `rejected` when they do not\nmatch. A `pending` asset that is never completed, and a `ready` asset\nwhose retention ended, read as `expired` from `expiresAt` on: expiry is\nevaluated when the asset is read, so an asset never reads `pending` or\n`ready` past its `expiresAt`.\nNo field carries a storage credential, a bucket name, an object key or a\nsigned URL. The bytes live in the backend `backend` names, under a\nlocation only the server knows.\n",
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "organizationId",
                "backend",
                "kind",
                "contentType",
                "bytes",
                "sha256",
                "locationStripped",
                "status",
                "expiresAt",
                "createdAt",
                "updatedAt"
              ],
              "properties": {
                "id": {
                  "description": "Server-generated media asset ID. Reveals nothing about the file or where it is stored.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "id"
                  },
                  "x-order": 1,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "organizationId": {
                  "description": "Owning organization ID. Derived from the authenticated session, never client-settable.",
                  "x-go-name": "OrganizationID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "organization_id"
                  },
                  "x-order": 2,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "createdBy": {
                  "description": "ID of the user whose session created the asset. Derived from the authenticated session, never client-settable. Omitted when that user was later purged.\n",
                  "x-go-name": "CreatedBy",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_by",
                    "json": "createdBy,omitempty"
                  },
                  "x-order": 3,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "backend": {
                  "description": "Where the bytes are stored (`r2` or `gdrive`).",
                  "x-oapi-codegen-extra-tags": {
                    "db": "backend"
                  },
                  "x-order": 4,
                  "type": "string",
                  "enum": [
                    "r2",
                    "gdrive"
                  ],
                  "x-enum-varnames": [
                    "MediaAssetBackendR2",
                    "MediaAssetBackendGdrive"
                  ]
                },
                "connectionId": {
                  "description": "ID of the Google Drive connection (`connections.id`) the file was uploaded through. Set only when `backend` is `gdrive`; omitted for `r2`, and when that connection was later deleted.\n",
                  "x-go-name": "ConnectionID",
                  "x-oapi-codegen-extra-tags": {
                    "db": "connection_id",
                    "json": "connectionId,omitempty"
                  },
                  "x-order": 5,
                  "type": "string",
                  "format": "uuid",
                  "x-go-type": "uuid.UUID",
                  "x-go-type-import": {
                    "path": "github.com/gofrs/uuid"
                  }
                },
                "externalId": {
                  "type": "string",
                  "description": "Identifier of the file in the person's own storage: the Google Drive file ID when `backend` is `gdrive`. Server-written once the upload is completed; omitted for `r2`, whose storage location is never on the wire, and while a `gdrive` asset is `pending`.\n",
                  "x-id-format": "external",
                  "minLength": 1,
                  "maxLength": 255,
                  "pattern": "^[A-Za-z0-9_-]+$",
                  "x-oapi-codegen-extra-tags": {
                    "db": "external_id",
                    "json": "externalId,omitempty"
                  },
                  "x-order": 6
                },
                "kind": {
                  "description": "Image or video, derived by the server from `contentType`.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "kind"
                  },
                  "x-order": 7,
                  "type": "string",
                  "enum": [
                    "image",
                    "video"
                  ],
                  "x-enum-varnames": [
                    "MediaAssetKindImage",
                    "MediaAssetKindVideo"
                  ]
                },
                "contentType": {
                  "description": "Media type of the file, from the closed allowlist; checked against the sniffed bytes on completion.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "content_type"
                  },
                  "x-order": 8,
                  "type": "string",
                  "enum": [
                    "image/png",
                    "image/jpeg",
                    "image/gif",
                    "image/webp",
                    "image/heic",
                    "video/mp4",
                    "video/quicktime",
                    "video/webm"
                  ],
                  "x-enum-varnames": [
                    "MediaAssetContentTypeImagePng",
                    "MediaAssetContentTypeImageJpeg",
                    "MediaAssetContentTypeImageGif",
                    "MediaAssetContentTypeImageWebp",
                    "MediaAssetContentTypeImageHeic",
                    "MediaAssetContentTypeVideoMp4",
                    "MediaAssetContentTypeVideoQuicktime",
                    "MediaAssetContentTypeVideoWebm"
                  ]
                },
                "bytes": {
                  "type": "integer",
                  "format": "int64",
                  "description": "Size of the file in bytes, as declared at create. `completeMediaAsset` refuses an upload whose stored size differs.\n",
                  "minimum": 1,
                  "maximum": 5368709120,
                  "x-oapi-codegen-extra-tags": {
                    "db": "bytes"
                  },
                  "x-order": 9
                },
                "sha256": {
                  "type": "string",
                  "description": "Lowercase hex SHA-256 of the file's bytes as uploaded (after any metadata stripping), as declared at create. `completeMediaAsset` refuses an upload whose stored bytes hash differently, and a reader compares the bytes it downloads against it before posting them.\n",
                  "minLength": 64,
                  "maxLength": 64,
                  "pattern": "^[0-9a-f]{64}$",
                  "x-oapi-codegen-extra-tags": {
                    "db": "sha256"
                  },
                  "x-order": 10
                },
                "name": {
                  "type": "string",
                  "description": "Display name of the file, typically its original file name. Shown to people only; the type is never inferred from it.\n",
                  "minLength": 1,
                  "maxLength": 255,
                  "x-oapi-codegen-extra-tags": {
                    "db": "name",
                    "json": "name,omitempty"
                  },
                  "x-order": 11
                },
                "locationStripped": {
                  "type": "boolean",
                  "description": "Whether the uploading client removed location metadata (EXIF and XMP GPS, plus maker notes and device serial numbers) from the file before uploading it. Declared by the client and recorded as sent; the server does not inspect the bytes for metadata. `false` records that the bytes may still carry where they were captured, for example a video whose location the client could not remove.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "location_stripped"
                  },
                  "x-order": 12
                },
                "status": {
                  "type": "string",
                  "description": "Lifecycle of the asset. `pending` from create until it is completed; `ready` once the stored bytes matched the declaration; `rejected` when they did not (see `rejectionReason`); `expired` once `expiresAt` passed, whether the upload was never completed or the retention of a `ready` asset ended. Evaluated when the asset is read.\n",
                  "enum": [
                    "pending",
                    "ready",
                    "rejected",
                    "expired"
                  ],
                  "x-enum-varnames": [
                    "MediaAssetStatusPending",
                    "MediaAssetStatusReady",
                    "MediaAssetStatusRejected",
                    "MediaAssetStatusExpired"
                  ],
                  "x-oapi-codegen-extra-tags": {
                    "db": "status"
                  },
                  "x-order": 13
                },
                "rejectionReason": {
                  "description": "Why the upload was rejected. Set only on a `rejected` asset.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "rejection_reason",
                    "json": "rejectionReason,omitempty"
                  },
                  "x-order": 14,
                  "type": "string",
                  "enum": [
                    "missing",
                    "size",
                    "type",
                    "checksum"
                  ],
                  "x-enum-varnames": [
                    "MediaAssetRejectionReasonMissing",
                    "MediaAssetRejectionReasonSize",
                    "MediaAssetRejectionReasonType",
                    "MediaAssetRejectionReasonChecksum"
                  ]
                },
                "retainUntil": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time the client asked the asset to stay downloadable until, from the create payload or the last `updateMediaAsset`. Null when the client never asked, in which case the organization's default retention applies once the asset is completed.\n",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "retain_until"
                  },
                  "x-order": 15
                },
                "completedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Time `completeMediaAsset` accepted the upload. Null until the asset is `ready`, and on a `rejected` asset.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "completed_at"
                  },
                  "x-order": 16
                },
                "expiresAt": {
                  "description": "Time the asset stops being usable. Always set by the server. While `pending` it is the end of the upload window (`uploadWindowSeconds` of the quota after creation). Once `ready` it is `retainUntil` when the client set one, otherwise `completedAt` plus the organization's `defaultRetentionDays`. Past it the asset reads `expired`, no download is minted, and the stored bytes of an `r2` asset are removed.\n",
                  "x-oapi-codegen-extra-tags": {
                    "db": "expires_at"
                  },
                  "x-order": 17,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "createdAt": {
                  "description": "Timestamp of media asset creation.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "created_at"
                  },
                  "x-order": 18,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "updatedAt": {
                  "description": "Timestamp of last media asset modification.",
                  "x-oapi-codegen-extra-tags": {
                    "db": "updated_at"
                  },
                  "x-order": 19,
                  "type": "string",
                  "format": "date-time",
                  "x-go-type-skip-optional-pointer": true
                },
                "deletedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Timestamp when the media asset was deleted. A deleted asset is never returned by the API.",
                  "nullable": true,
                  "x-go-type": "core.NullTime",
                  "x-go-type-import": {
                    "path": "github.com/meshery/schemas/models/core",
                    "name": "core"
                  },
                  "x-oapi-codegen-extra-tags": {
                    "db": "deleted_at",
                    "json": "deletedAt,omitempty"
                  },
                  "x-order": 20
                }
              }
            },
            "description": "Media assets included on this page of results."
          }
        }
      }
    }
  }
};

export default MediaAssetSchema;

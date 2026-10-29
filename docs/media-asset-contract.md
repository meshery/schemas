# Media asset contract

`schemas/constructs/v1beta3/media_asset` holds image and video files that an
organization uploads so a content item can post a file with no link. A
content item refers to an asset by its `id` and never by a URL: content
items list their assets in `mediaAssetIds`. A download
URL is minted only when the file is about to be used, and it is never stored.

## Upload flow

1. `createMediaAsset` (`POST /api/media-assets`) takes `MediaAssetPayload`:
   `contentType`, `bytes`, `sha256`, `locationStripped`, plus optional `name`,
   `backend`, `connectionId` and `retainUntil`. It answers `201` with
   `MediaAssetUpload`, which holds the new `pending` asset and an `upload`
   `MediaAssetTransfer` (`method` `PUT`, `url`, `headers`, `expiresAt`).
2. The client sends the bytes to `upload.url` in one request, carrying exactly
   `upload.headers`, before `upload.expiresAt`.
3. `completeMediaAsset` (`POST /api/media-assets/{mediaAssetId}/complete`)
   checks the stored bytes against the declaration: the size must equal
   `bytes`, the type sniffed from the bytes must equal `contentType`, and the
   SHA-256 must equal `sha256`. If they match, the asset becomes `ready`. If
   they do not, the asset becomes `rejected` with a `rejectionReason`
   (`missing`, `size`, `type` or `checksum`), its bytes are removed, and the
   call answers `409`. Completing a `ready` asset again answers it unchanged,
   so a retried completion is safe.
4. `getMediaAssetDownload` (`GET /api/media-assets/{mediaAssetId}/download`)
   answers a fresh `MediaAssetTransfer` (`method` `GET`) each time the file is
   needed, with `Cache-Control: no-store`. The reader checks the downloaded
   bytes against `bytes` and `sha256` before using them.

The server derives `kind` (`image` or `video`) from `contentType`. Nothing is
deduplicated by `sha256`: every create is a new asset.

## Backends and credentials

| `backend` | Bytes live in | Upload URL | Download URL |
| --- | --- | --- | --- |
| `r2` (the default) | The provider's private object storage | A signed `PUT` for that one object | A signed `GET` for that one object |
| `gdrive` | The uploading person's Google Drive, through their Google Drive connection (`connectionId`) | A Drive resumable-upload session for that one file | A signed `getMediaAssetContent` URL on the provider, which relays the bytes from Drive |

- No request or response carries a storage credential, an access token, a
  bucket name or an object key. The `r2` object location is derived by the
  server and is never on the wire. `externalId` (the Drive file ID) is set
  only for `gdrive`, where the file is the person's own.
- A transfer URL is the only grant. It covers one transfer of one file and
  lapses at its `expiresAt`. Treat it as a secret: never store it, log it or
  put it in a content item. `MediaAssetTransfer.headers` never contains an
  authorization header.
- `getMediaAssetContent` (`GET /api/media-assets/{mediaAssetId}/content`)
  takes no session (`security: []`). Its required `expires` and `signature`
  query parameters are the whole grant, so no Google token leaves the
  provider. A bad or lapsed signature answers `403`, and a Drive file that is
  gone or whose grant was revoked answers `502`.
- `MediaAssetQuota.backends` lists the backends a provider serves. A create
  that names any other backend answers `400`.

## Limits

`getMediaAssetQuota` (`GET /api/media-assets/quota`) publishes the limits
that the create and update operations enforce. A client reads it before
uploading, so it can refuse a file by name instead of meeting a `400`:

- `contentTypes`: the accepted subset of the closed allowlist (`image/png`,
  `image/jpeg`, `image/gif`, `image/webp`, `image/heic`, `video/mp4`,
  `video/quicktime`, `video/webm`).
- `maxImageBytes` and `maxVideoBytes`: the per-kind size limits. The schema
  also caps `bytes` at 5 GiB, the limit of a single `PUT`.
- `uploadWindowSeconds`, `defaultRetentionDays` and `maxRetentionDays`.
- `bytesLimit`: the organization's storage limit, or `null` for none. A create
  that would take the organization past it answers `409`.
- `bytesUsed`: `null` when it could not be measured. Present that as unknown,
  never as 0.

Per-platform limits (for example a platform's own image size limit) are the
posting client's to check before posting. They are not part of this
construct.

## Lifecycle

| Status | Meaning | `expiresAt` |
| --- | --- | --- |
| `pending` | Created, waiting for its upload and completion | End of the upload window |
| `ready` | Stored bytes matched the declaration | `retainUntil`, or `completedAt` plus `defaultRetentionDays` |
| `rejected` | Stored bytes did not match (`rejectionReason`) | Unchanged |
| `expired` | `expiresAt` passed | - |

- Expiry is evaluated when the asset is read, so an asset never reads
  `pending` or `ready` past its `expiresAt`. The server removes the stored
  bytes of an expired `r2` asset. An expired `gdrive` file stays in the
  person's Drive.
- `updateMediaAsset` (`PUT`, `MediaAssetUpdatePayload`) changes only
  `retainUntil`, for example when the post that uses the asset is
  rescheduled. It can shorten retention as well as extend it. A
  `retainUntil` that is in the past, or more than `maxRetentionDays` from
  now, answers `400`. Updating a `rejected` or `expired` asset answers `409`.
- `deleteMediaAsset` answers `204` and the asset answers `404` from then on.
  The bytes of an `r2` asset are removed. A `gdrive` file stays in the
  person's Drive. Delete does not check whether a content item still refers
  to the asset. Such a content item is refused by name when it posts.

## Privacy

`locationStripped` records whether the client removed location metadata
(EXIF and XMP GPS, maker notes, device serial numbers) before hashing and
uploading. Stripping happens on the client, so raw location never reaches
storage. The server records the value as sent and does not inspect the
bytes. `false` means the bytes may still show where they were captured, for
example a video whose location the client could not remove.

## Organization scope and authorization

- Every operation except `getMediaAssetContent` acts only in the session
  organization, and only for a live member of it. Another organization's
  asset, and a caller who is not a member, both get the same `404`.
- Media assets are the files of content items, so they reuse the Content
  Items keys. View Content Items covers list, get, the quota and downloads.
  Create Content Item covers create and complete. Edit Content Item covers
  update, and Delete Content Item covers delete.
- A `connectionId` that is not the caller's own live Google Drive connection
  in the session organization answers `404`.
- Every operation declares `429` (`MeshkitError429`), as the other Blowhorn
  route families do.

`validation/media_asset_contract_test.go` pins the absence of credential
and URL fields, the payload's server-owned exclusions, each operation's
success schema and security, and the nullable `bytesUsed`.

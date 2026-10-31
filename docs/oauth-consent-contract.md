# OAuth consent contract

`schemas/constructs/v1beta3/oauth_consent` lets a signed-in user see the OAuth
clients ("connected AI apps") they have allowed to act for them, and withdraw
that permission. No earlier construct covers OAuth clients or consents: the
`isOauth` flag on `token` marks a session, not a client's grant.

## Shape

An `OauthConsent` is read-only. The authorization server's consent step creates
it, so there is no write payload.

| Field | Notes |
| --- | --- |
| `id` | Server-generated consent ID (UUID, db `id`). Required. |
| `clientId` | OAuth client ID. Required. An identifier from the authorization server, not a UUID (`x-id-format: external`). Unique per user among live consents. |
| `clientName` | Display name the client registered. Required. |
| `clientUri`, `logoUri` | The client's home page and logo, when it registered them. Omitted otherwise. |
| `scopes` | Scopes granted, strings. Required. A scope names one keychain; see [token-scoping-contract.md](token-scoping-contract.md). |
| `organizationId` | The root organization the consent names. Required. The client acts only in it and its descendants. |
| `createdAt` | When the user granted the consent. Required. |
| `lastUsedAt` | When the client last used a token issued under the consent. Null when unused or not recorded. |
| `deletedAt` | When the consent was revoked (soft delete, db `deleted_at`, `core.NullTime`). Null while live. |

**Unique key:** (user, `clientId`) among live consents (`deletedAt` null). A
user has at most one live consent per client, so `clientId` identifies the
consent among the user's own and is what `deleteOauthConsent` takes. The
server enforces it with a unique index on (`user_id`, `client_id`) where
`deleted_at` is null, so a client the user revoked can be consented to again.
A re-consent to a live client replaces that consent's grant. There is no
`updatedAt`.

## Routes

| Route | Operation | Notes |
| --- | --- | --- |
| `GET /api/identity/oauth/consents` | `getOauthConsents` | Core `page` and `pageSize` query parameters. `200` with an `OauthConsentPage` (`page`, `pageSize`, `totalCount`, `oauthConsents`) of live consents, most recently granted first. An empty page when there are none. |
| `DELETE /api/identity/oauth/consents?clientId=...` | `deleteOauthConsent` | `clientId` is required. Soft-deletes the live consent (sets `deletedAt`). `204` with no body. `404` when the user has no live consent for that client. |

Both are `x-internal: ["cloud"]`.

## Rules for the server

- Both operations act only on the authenticated user's consents. No user is
  taken from the path, query or body, and another user's consent is never
  listed, revealed (the `404` is the same whether the client exists or not) or
  revoked.
- Revoking withdraws the consent and revokes every access and refresh token the
  client holds for that user, at once. The client's next call is refused and it
  must ask for consent again. Other users' consents for the same client, and the
  client itself, are untouched.
- `DELETE` uses a query parameter and no body, as `docs/http-api-design.md`
  requires, and answers `204` as a single-resource delete.
- Revoke is not idempotent in status: a second call answers `404`.
- Revoked (soft-deleted) consents are never listed and never returned.

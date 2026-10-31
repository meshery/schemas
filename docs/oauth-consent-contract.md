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
| `scopes` | Scopes granted, strings. Required, at least one (`minItems: 1`): a consent always names a keychain scope. A scope names one keychain; see [token-scoping-contract.md](token-scoping-contract.md). |
| `organizationId` | The root organization the consent names. Required. The client acts only in it and its descendants. |
| `createdAt` | When the user first granted the consent. Required. A re-consent keeps it. |
| `updatedAt` | When the consent was last granted or changed. Server-set and read-only (db `updated_at`). Required. Equal to `createdAt` on creation; advanced by a re-consent. |
| `lastUsedAt` | When the client last used a token issued under the consent. Null when unused or not recorded. |
| `deletedAt` | When the consent was revoked (soft delete, db `deleted_at`, `core.NullTime`). Null while live. |

**Unique key:** (user, `clientId`) among live consents (`deletedAt` null). A
user has at most one live consent per client, so `clientId` identifies the
consent among the user's own and is what `deleteOauthConsent` takes. The
server enforces it with a unique index on (`user_id`, `client_id`) where
`deleted_at` is null, so a client the user revoked can be consented to again.

## Re-consent

A re-consent by the same user to a client with a live consent updates that
consent in place. The server:

- replaces `scopes` with the newly granted scopes,
- advances `updatedAt`,
- keeps `id` and `createdAt`.

It does not insert a second row, so the unique key holds. A client the user revoked is not live: consenting to it
again creates a new consent with a new `id`.

### Scope changes and existing tokens

This section is the authoritative statement of the re-consent rule for existing
tokens. The `OauthConsent` schema description carries the same rule.

A re-consent that changes `scopes` changes the tokens the client already holds
for that user. The server applies the change in the same transaction as the
consent update, so the consent and the tokens change together or not at all.
Each existing token is recomputed by its stored `keychainScoped` flag, not by
whether its `keychainIds` is empty:

- **Scoped token** (`keychainScoped` true). Its `keychainIds` becomes the
  intersection of its keychains and the keychains of the new scopes. A
  re-consent never adds keychains to a scoped token: a narrower re-consent
  narrows it, and a broader one leaves it unchanged. A token whose intersection
  is empty is **revoked**, not left with an empty list, because an empty
  keychain list means unrestricted. This also holds when the token's keychains
  were all deleted: its intersection is empty, so it is revoked, and it never
  gains keys.
- **Unrestricted token** (`keychainScoped` false). Its `keychainIds` becomes
  exactly the keychains of the new scopes, and `keychainScoped` becomes `true`.
  The flag is never reset, so the token stays limited from then on.
- **No keychain scope granted.** A re-consent that grants no keychain scope is a
  revoke, not a stored consent with empty `scopes`: the consent is revoked
  (soft-deleted, `deletedAt` set) and every token issued to that client for that
  user is revoked, as in [Rules for the server](#rules-for-the-server). A token
  is never issued under a consent with an empty keychain list.
- **Added scopes.** A scope added by a re-consent takes effect only for tokens
  issued after that consent, which is the user's fresh consent. No existing
  token gains a key it did not have.

The token side is summarized in
[token-scoping-contract.md](token-scoping-contract.md#re-consent-and-existing-tokens).

## Routes

| Route | Operation | Notes |
| --- | --- | --- |
| `GET /api/identity/oauth/consents` | `getOauthConsents` | Core `page` and `pageSize` query parameters. `200` with an `OauthConsentPage` (`page`, `pageSize`, `totalCount`, `oauthConsents`) of live consents, ordered by `updatedAt` descending (a re-consent moves a consent to the top). An empty page when there are none. |
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

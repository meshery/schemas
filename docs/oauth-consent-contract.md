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
| `scopes` | Scopes granted, strings. Required, at least one (`minItems: 1`), and at least one must map to a keychain in the server's scope map; see [Scopes must name a keychain](#scopes-must-name-a-keychain). A scope names one keychain; see [token-scoping-contract.md](token-scoping-contract.md). |
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

## Scopes must name a keychain

A consent must name a keychain scope. The server refuses a first consent in
which no scope maps to a keychain in its scope map, with `400` and nothing
stored. A re-consent that names no keychain scope revokes instead (below). The rule is enforced by the server against the scope map, not by
the schema: `minItems: 1` on `scopes` stops only an empty list, and a list of
scopes that map to no keychain passes the schema. Specifically:

- A scope string the scope map does not know is refused with `400`. It is never
  silently dropped, so a consent cannot end up with fewer scopes than the
  client asked for without the user or the client seeing why.
- Standard non-keychain scopes, if the server accepts them at all (still an open
  question), never count toward the keychain-scope minimum. A consent that names
  only such scopes is refused.
- A token is never issued under a consent with an empty keychain list, because
  a token limited to no keychains would hold no keys (see [token-scoping-contract.md](token-scoping-contract.md)).

## Re-consent

A re-consent by the same user to a client with a live consent updates that
consent in place. The server:

- replaces `scopes` with the newly granted scopes,
- advances `updatedAt`,
- keeps `id` and `createdAt`.

It does not insert a second row, so the unique key holds. A client the user revoked is not live: consenting to it
again creates a new consent with a new `id`.

### Organization on re-consent

A re-consent keeps the consent's `organizationId`. It moves the consent to
another organization only when the user explicitly chooses that organization on
the consent screen. The consent then names the chosen root organization, and
every access and refresh token issued to that client for that user is revoked,
in the same transaction as the consent update, whatever its keychains. This
overrides the token rules below.

Tokens are never re-bound to a new organization silently. The client gets a
token for the new organization only under the consent that names it, after the
user has consented again.

### Scope changes and existing tokens

This section is the authoritative statement of the re-consent rule for existing
tokens. The `OauthConsent` schema description carries the same rule.

A re-consent that changes `scopes` changes the tokens the client already holds
for that user. The server applies the change in the same transaction as the
consent update, so the consent and the tokens change together or not at all.
Each existing token is recomputed by whether it is scoped: its stored
`keychainScoped` flag is true, or it has a non-empty `keychainIds`. Every token
matches exactly one branch below:

- **Scoped token** (`keychainScoped` true, or a non-empty `keychainIds`). Its `keychainIds` becomes the
  intersection of its keychains and the keychains of the new scopes. A
  re-consent never adds keychains to a scoped token: a narrower re-consent
  narrows it, and a broader one leaves it unchanged. A token whose intersection
  is empty is **revoked**, not left with an empty list, because a scoped token
  with no keychains holds no keys. This also holds when the token's keychains
  were all deleted: its intersection is empty, so it is revoked, and it never
  gains keys.
- **Unrestricted token** (`keychainScoped` false or absent and `keychainIds`
  empty or absent; see `docs/token-scoping-contract.md`). Its `keychainIds` becomes
  exactly the keychains of the new scopes, and `keychainScoped` becomes `true`.
  The flag is never reset, so the token stays limited from then on.
- **No keychain scope named.** A re-consent that names no keychain scope (an
  empty list, or only scopes that map to no keychain) is never stored: the
  consent is revoked (soft-deleted, `deletedAt` set) and every token issued to
  that client for that user is revoked, in the same transaction, as in
  [Rules for the server](#rules-for-the-server). A scope string the scope map
  does not know is still refused with `400` and changes nothing; see
  [Scopes must name a keychain](#scopes-must-name-a-keychain).
- **Added scopes.** A scope added by a re-consent takes effect only for tokens
  issued after that consent, which is the user's fresh consent. No existing
  token gains a key it did not have.

The token side is summarized in
[token-scoping-contract.md](token-scoping-contract.md#re-consent-and-existing-tokens).

## Routes

| Route | Operation | Notes |
| --- | --- | --- |
| `GET /api/identity/oauth/consents` | `getOauthConsents` | Core `page` and `pageSize` query parameters. `200` with an `OauthConsentPage` (`page`, `pageSize`, `totalCount`, `oauthConsents`) of live consents, ordered by `updatedAt` descending (a re-consent moves a consent to the top). An empty page when there are none. Session only: a token-authenticated call is `403` and lists nothing, because a page of every client's consents is not disclosed to a client. |
| `DELETE /api/identity/oauth/consents?clientId=...` | `deleteOauthConsent` | `clientId` is required. Soft-deletes the live consent (sets `deletedAt`) and revokes the client's tokens for the user. `204` with no body. `403` when the caller may not revoke that client (see [Who may revoke](#who-may-revoke)). `404` when the caller may revoke it but the user has no live consent for that client. |

Both are `x-internal: ["cloud"]`.

## Who may revoke

`deleteOauthConsent` depends on how the request is authenticated:

| Caller | May revoke | Otherwise |
| --- | --- | --- |
| Signed-in session of the person | Any of that user's consents. | `404` if the user has no live consent for `clientId`. |
| Token issued to an OAuth client | Only the consent of the client the token was issued to. | Any other `clientId` is `403`, whether or not that client has a live consent, and nothing changes. Its own client with no live consent is `404`. |
| Personal API token (not issued to a client) | Nothing. | `403` for every `clientId`, and nothing changes. |

The token rule is a `403` that does not depend on whether another client has a
live consent, so a token holder learns nothing about another client's consents
from it. A session is a person acting for themselves, so it may revoke any of
their own consents, and the `404` for a client with no live consent is the same
whether the client exists or not.

## Rules for the server

- Both operations act only on the authenticated user's consents. No user is
  taken from the path, query or body, and another user's consent is never
  listed, revealed or revoked.
- The rule in [Who may revoke](#who-may-revoke) decides which `clientId` a
  token may name. A token that names another client gets `403` before any
  lookup, so the result does not depend on whether that client has a live consent.
- Revoking withdraws the consent and revokes every access and refresh token the
  client holds for that user, at once. The client's next call is refused and it
  must ask for consent again. Other users' consents for the same client, and the
  client itself, are untouched.
- `DELETE` uses a query parameter and no body, as `docs/http-api-design.md`
  requires, and answers `204` as a single-resource delete.
- Revoke is not idempotent in status: a second call answers `404`.
- Revoked (soft-deleted) consents are never listed and never returned.

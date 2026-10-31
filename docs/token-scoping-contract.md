# Token scoping contract

`schemas/constructs/v1beta3/token` gains two optional limits on a token:
`keychainIds`, which restricts what the token may do, and `expiresAt`, which
ends its life. Both are returned on the `UserToken` entity and are settable at
creation through `TokenPayload`, the optional body of `generateToken`
(`POST /api/identity/tokens`). `name` and `purpose` stay query parameters.
The entity also carries `keychainScoped`, the server's stored record that the
token was created with a keychain limit, and the construct defines
`TokenStanding`, the read shape the server uses to accept or refuse a presented
token. These serve MCP/OAuth client token scoping as well as user API tokens.

Request shapes that an agent files for approval are not defined here; they live
in the generic `request` construct.

## Fields

| Field | Type | Meaning |
| --- | --- | --- |
| `keychainIds` | array of UUID (max 100, unique) | The keychains the token is limited to. |
| `expiresAt` | date-time, nullable | Time after which the token is no longer accepted. |
| `keychainScoped` | boolean, read-only | Whether the token is limited to its keychains' keys. Server-set. |

### `keychainIds`

- **Empty or absent means unrestricted.** A token with no `keychainIds` behaves
  exactly as every token did before the field existed, so no existing token
  changes behaviour and none needs migrating. Unrestricted is the default for a
  creation that omits the body.
- A non-empty list limits the token to the keys that belong to those keychains.
  The token never gains a key its owner lacks: scoping only narrows.
- The ids reference keychains (`schemas/constructs/v1beta1/keychain`). An id
  that names no keychain, or a keychain the caller cannot see, is refused with
  `400` at creation.
- An OAuth scope string names one keychain, so a scope granted at consent
  becomes one entry of `keychainIds` on the token issued for it. The consents
  that record those scopes are in [oauth-consent-contract.md](oauth-consent-contract.md).

### `expiresAt`

- Absent or `null` means the token never expires. Every token issued before the
  field existed stays without one.
- Set at creation and not changed afterwards. A time in the past is refused with
  `400`.
- A token past `expiresAt` is refused as an unauthenticated call (`401`), the same
  answer as an unknown token. Expiry is evaluated at read time, so no job needs
  to run for a token to stop working.

### `keychainScoped` versus `keychainIds`

`keychainIds` is what a client asks for; `keychainScoped` is what the server
records. They answer different questions and must not be derived from each
other at request time.

- **Set once, at creation.** A create with a non-empty `keychainIds` stores
  `keychainScoped = true` (column `user_tokens.keychain_scoped`). A create whose
  `keychainIds` is empty or absent stores `false`: the token is unscoped.
- **Never reset.** Once true, `keychainScoped` is never set back to false. No
  operation widens a scoped token into an unrestricted one.
- **Never inferred from mapping rows.** The token's keychain mappings can shrink
  after creation when a keychain is deleted. If scoping were inferred from the
  mappings, a scoped token whose keychains were all deleted would have none left
  and would look unrestricted, gaining every key its owner holds. The stored
  flag prevents that: **a scoped token whose keychains are all deleted holds no
  keys**, and is refused on every route that checks a key.
- `keychainScoped` is read-only. It is not part of `TokenPayload`; a client
  limits a token only through `keychainIds`.
- On the entity, `keychainIds` reports the keychains the token is limited to at
  read time. A scoped token can therefore report `keychainScoped: true` with an
  empty `keychainIds`; that token holds no keys, it is not unrestricted.
  Consumers must check `keychainScoped`, not the length of `keychainIds`, to
  decide whether a token is restricted.

## `TokenStanding`

`TokenStanding` (in `components/schemas` of the token construct's `api.yml`) is
the server-side read result of one lookup of a presented token by its ID (the
token's `jti`) in `user_tokens`. It is not a request or response body and no
operation returns it; it is defined here so the server's lookup has a
schema-owned type. The generated Go type is `TokenStanding` in
`github.com/meshery/schemas/models/v1beta3/token`.

| Field | Go field | DB column | Meaning |
| --- | --- | --- | --- |
| `id` | `ID core.Uuid` | `id` | The `user_tokens.id` the `jti` matched; the zero UUID when none matched. |
| `revoked` | `Revoked bool` | `revoked` | The row has been retired (`deleted_at` is set). |
| `expired` | `Expired bool` | `expired` | `expires_at <= now()`, evaluated by the database; a `NULL` `expires_at` never expires. |
| `keychainScoped` | `KeychainScoped bool` | `keychain_scoped` | The stored `user_tokens.keychain_scoped` flag. |

`revoked` and `expired` are computed in the lookup query, so the DB column names
are result-column aliases rather than `user_tokens` columns. The server refuses
the token (`401`) when no row matched, when `revoked` is true, or when `expired`
is true. When `keychainScoped` is true, the effective keys are computed from the
token's remaining keychains, which may be none.

## Enforcement expectations for the server

The schema states the shape; the server enforces it. For every token kind - user
API tokens, native client sign-in tokens, and OAuth access tokens - not only OAuth:

1. **Effective keys** for a request are the user's keys in the request's
   organization (the organization `X-Current-Orgid` resolves to) **intersected
   with** the keys of the token's keychains. An unrestricted token has the
   user's keys unchanged.
2. The intersection is computed per request, in the request's organization. A
   key the user later loses leaves the token at once; a key added to a keychain
   reaches the token only if the user also holds it.
3. A route that checks no key cannot be narrowed by a token. A scoped token is
   refused on such a route (default deny) until the route gains a key; an
   unrestricted token behaves as before.
4. The check runs before the handler, in the same permission middleware that
   checks a user's keys today, so a handler never sees a scoped token's wider
   keys.
5. Expired tokens are refused before any key is read.
6. Whether a token is scoped comes from its stored `keychainScoped` flag, never
   from counting its keychain mappings. A scoped token with no keychains left
   has no keys.

## Compatibility

All three entity fields are additive and optional, and `TokenStanding` is a
new schema with no operation. `generateToken`'s body is optional, so a
client that sends only `name` and `purpose` is unchanged. Entity consumers see
three new optional properties; Go consumers of `UserToken` get `KeychainIds
[]core.Uuid` (omitted when empty), `ExpiresAt *core.NullTime` and
`KeychainScoped bool` (omitted when false). Existing rows need `keychain_scoped` added with default
`false`, which keeps every existing token unrestricted.

# Token scoping contract

`schemas/constructs/v1beta3/token` gains two optional limits on a token:
`keychainIds`, which restricts what the token may do, and `expiresAt`, which
ends its life. Both are returned on the `UserToken` entity and are settable at
creation through `TokenPayload`, the optional body of `generateToken`
(`POST /api/identity/tokens`). `name` and `purpose` stay query parameters.

Request shapes that an agent files for approval are not defined here; they live
in the generic `request` construct.

## Fields

| Field | Type | Meaning |
| --- | --- | --- |
| `keychainIds` | array of UUID (max 100, unique) | The keychains the token is limited to. |
| `expiresAt` | date-time, nullable | Time after which the token is no longer accepted. |

### `keychainIds`

- **Empty or absent means unrestricted.** A token with no `keychainIds` behaves
  exactly as every token did before the field existed, so no existing token
  changes behaviour and none needs migrating. Unrestricted is the default for a
  creation that omits the body.
- A non-empty list limits the token to the keys that belong to those keychains.
  The token never gains a key its owner lacks: scoping only narrows.
- The ids reference keychains (`schemas/constructs/v1beta1/keychain`). An id
  that names no keychain is refused with `400` at creation.
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

## Compatibility

Both fields are additive and optional. `generateToken`'s body is optional, so a
client that sends only `name` and `purpose` is unchanged. Entity consumers see
two new optional properties; Go consumers get `KeychainIDs []uuid.UUID`
(omitted when empty) and `ExpiresAt core.NullTime`.

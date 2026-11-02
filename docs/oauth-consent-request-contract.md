# OAuth consent request contract

`schemas/constructs/v1beta3/oauth_consent_request` is the consent page's API.
When an OAuth client asks a signed-in user for access, the identity provider
sends the browser to Meshery Cloud's consent page with an opaque consent
challenge. The page reads the pending request, shows the user which client asks
and where it will send them, and the user allows or denies it. The construct is
cloud-only (`x-internal: ["cloud"]`) and keeps the session security of the
other `/api/identity/` routes (`jwt`).

Client registration itself (RFC 7591 dynamic client registration) is the
identity provider's protocol endpoint and is not modelled here. The remembered
consents a user can list and revoke afterwards are a separate construct.

## Routes

| Route | Operation | Answers |
| --- | --- | --- |
| `GET /api/identity/oauth/consent-requests?consentChallenge=...` | `getOauthConsentRequest` | `200` `OauthConsentRequest` |
| `POST /api/identity/oauth/consent-requests/accept` | `acceptOauthConsentRequest` | `200` `OauthConsentRedirect` |
| `POST /api/identity/oauth/consent-requests/reject` | `rejectOauthConsentRequest` | `200` `OauthConsentRedirect` |

Both decisions take `OauthConsentDecisionPayload` (`consentChallenge`
required, `remember` optional, default `false`; reject reads only
`consentChallenge`). The challenge is a required query parameter on the read,
not a path segment, because identity provider challenges are long opaque
strings. It is printable ASCII with no spaces, 1 to 8192 characters.

Every operation declares the same refusals. `400`, `403`, `404`, `500` and
`503` carry the MeshKit JSON error body; `401` is the shared plain-text
response of the authentication middleware.

| Code | Meaning |
| --- | --- |
| `400` | Malformed body, or a missing or blank challenge. |
| `401` | Not signed in. |
| `403` | The challenge was issued for a different user than the caller. |
| `404` | The challenge is unknown, has expired, or was already accepted or rejected. |
| `503` | The identity provider could not be reached. Nothing was read or decided; retry. |
| `500` | Any other failure. |

## Rules

- **Ownership.** The caller must be the signed-in user the challenge was issued
  for. The server compares the request's subject with the caller before it
  shows or decides anything; any other user gets `403`.
- **Single use.** A challenge is decided once. After an accept or a reject,
  and after it expires, every operation on it answers `404`.
- **Exact grant.** An accept grants the request's own `requestedScopes` and
  `requestedAudience`, never more. The payload carries no scopes, so a client
  cannot widen the grant through the page. `remember: true` asks the identity
  provider to remember the grant so the same client asking for the same scopes
  and audience is not shown the page again while the grant is remembered.
- **Navigate to `redirectTo`.** Both decisions answer `OauthConsentRedirect`.
  The browser must navigate to `redirectTo` (an absolute URL issued by the
  identity provider) to finish: after an accept it continues the authorization,
  after a reject it returns the user to the client with an `access_denied`
  error.
- **The verified mark marks trust, never blocks.** `client.verified` is true
  only when the client matches the operator-configured known-client list. An
  unverified client is shown as unverified; the user may still allow it.
  `client.dynamicallyRegistered` says whether the client registered itself.

## The client the page names

`OauthConsentClient` carries what the user needs to recognise the client:
`clientId` (an identity provider identifier, not a UUID), `clientName` (may be
empty), optional `clientUri` and `logoUri`, and `redirectHosts`. Each entry of
`redirectHosts` is one distinct target of the client's registered redirect
URIs: the host of an https URI (`app.example.com`), the loopback IP literal of
a loopback URI (`127.0.0.1`, `[::1]`), or the scheme of a private-use app URI
(`vscode`). Entries are lowercase, carry no port, path or `://`, and there is
at least one.

## No stored row

The server keeps no row for a pending request: it reads the request from the
identity provider on every call. So `OauthConsentRequest` has no `id` or
timestamps (like the provider capabilities document), and a `503` means the
identity provider was unreachable rather than a store failure.

`validation/oauth_consent_request_contract_test.go` pins the operations, the
required query parameter, the payload fields and the declared responses, and
runs the schemas against request and response bodies.

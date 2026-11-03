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

The read is tagged `oauthConsentRequests` and the two decisions
`oauthConsentDecisions`, so the generated RTK client gives them different cache
tags (`OauthConsentRequest_oauthConsentRequests` and
`OauthConsentRequest_oauthConsentDecisions`). A decision therefore does not
invalidate the read. If it did, RTK would refetch the request the page still
holds, and since the decision just consumed the single-use challenge, that
refetch would answer `404` and flip the page into an error while the browser
navigates to `redirectTo`. Keep the decisions off the read's tag.

Every operation declares the same refusals. `400`, `403`, `404`, `500` and
`503` carry the MeshKit JSON error body; `401` is the shared plain-text
response of the authentication middleware.

| Code | Meaning |
| --- | --- |
| `400` | Malformed body, or a missing or blank challenge. |
| `401` | Not signed in. |
| `403` | The challenge was issued for a different user than the caller. |
| `404` | The challenge is unknown, has expired, or was already accepted or rejected. |
| `503` | The identity provider could not be reached or did not answer. On the read, nothing was read; retry. On a decision, the outcome is unknown: the caller may retry, and a retry that answers `404` means the challenge was already decided, so the user should restart sign-in from the client. |
| `500` | Any other failure. |

## Rules

- **Ownership.** The caller must be the signed-in user the challenge was issued
  for. The server compares the request's subject with the caller before it
  shows or decides anything; any other user gets `403`.
- **Single use.** A challenge is decided once. After an accept or a reject,
  and after it expires, every operation on it answers `404`.
- **Exact grant.** An accept grants only what the client requested, never
  more: the request's `requestedScopes`, and any audience the client asked the
  identity provider for. The page does not show the audience, and the
  construct does not carry it. The payload carries no scopes, so a client
  cannot widen the grant through the page. `remember: true` asks the identity
  provider to remember the grant so the same client asking for the same scopes
  is not shown the page again while the grant is remembered.
- **Navigate to `redirectTo`.** Both decisions answer `OauthConsentRedirect`.
  The browser must navigate to `redirectTo` (an absolute URL issued by the
  identity provider) to finish: after an accept it continues the authorization,
  after a reject it returns the user to the client with an `access_denied`
  error.
- **The verified mark marks trust, never blocks.** `client.verified` is true
  only when the client matches the operator-configured known-client list. An
  unverified client is shown as unverified; the user may still allow it. It is
  the only trust mark. The page is shown only for dynamically registered
  clients, whose name is self-asserted, so the construct carries no
  client-chosen home page or logo that could help a client pose as a known
  brand, and no logo URL the browser would fetch from a host the client chose.

## The client the page names

`OauthConsentClient` carries what the user needs to recognise the client and
where it will send them: `clientId` (an identity provider identifier, not a
UUID), `clientName` (self-asserted, may be empty), `redirectHosts`,
`appSchemes` and `verified`.

Where the client can send the user is split by kind, so the page never shows an
app as a host. The server classifies each registered redirect URI by its scheme
into exactly one list:

- **`redirectHosts`** lists the network host of each `https` redirect URI and
  of each loopback `http` redirect URI: a DNS hostname of at least two labels
  whose last label starts with a letter (`app.example.com`,
  `1password.example.com`), a dotted-decimal IPv4 literal (`127.0.0.1`) or a
  bracketed hexadecimal IPv6 literal (`[::1]`). Loopback hosts appear as
  `127.0.0.1` or `[::1]`: Cloud rejects the `localhost` hostname at
  registration (loopback redirects must use an IP literal, RFC 8252 section
  8.3), so `localhost` is never registered and never listed. Entries are
  lowercase with no scheme, port or path; a colon appears only inside IPv6
  brackets, so `app.example.com:8080`, `127.0.0.1:8080` and `[::1]:8080` are
  rejected. A bare single-label name is not a host, so `localhost` and
  `vscode` are rejected here.
- **`appSchemes`** lists the private-use URI scheme (RFC 8252 section 7.1) of
  each app redirect URI, in lowercase RFC 3986 scheme form with no `:` or `//`
  (`vscode`, `com.example.app`). `http` and `https` are rejected here; their
  redirects belong in `redirectHosts`.

Both lists are deduplicated, and either may be empty, but never both: every
client has at least one redirect URI, and the server guarantees it. The two
patterns cannot keep every value out of the wrong list on their own: a
reverse-domain scheme such as `github.com` (from a redirect URI like
`github.com:/cb`) is both a valid scheme and a valid hostname. The split is
what keeps it honest: the server puts it in `appSchemes` because of its
redirect URI's scheme, and the page shows it as an app, never as a host.

## No stored row

The server keeps no row for a pending request: it reads the request from the
identity provider on every call. So `OauthConsentRequest` has no `id` or
timestamps (like the provider capabilities document), and a `503` means the
identity provider was unreachable or did not answer rather than a store
failure. A decision that answers `503` may still have reached the identity
provider, which is why its outcome is unknown and a retry can answer `404`.

This is the read-through exception to Rule 1 in
[the authoring reference](schema-authoring-reference.md#read-through-constructs-have-no-stored-row).

`validation/oauth_consent_request_contract_test.go` pins the operations and
their tags, the required query parameter, the payload fields and the declared responses, and
runs the schemas against request and response bodies.

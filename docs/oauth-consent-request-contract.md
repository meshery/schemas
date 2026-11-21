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
- **Two kinds of client get the page.** A *dynamically registered* client
  registered itself (RFC 7591), so its name is self-asserted. An
  *operator-managed* client is created by an operator through the identity
  provider's admin API, never through dynamic registration. It is not
  first-party and is not auto-accepted, so it still gets the consent page; its
  name (`clientName`) and logo (`logoUri`) are operator-set client metadata.
  The schema does not carry which kind a client is.
- **The verified mark marks trust, never blocks.** `client.verified` is never
  derived from a self-asserted name or from the client ID. For a dynamically
  registered client it is true only when every redirect URI of the client
  matches one operator-listed known-client entry (that entry's https hosts or
  its app schemes); a client that registers a known client's name, or only some
  of its redirect targets alongside its own, is not verified. For an
  operator-managed client it is true when the operator set the verified mark in
  the client's identity-provider metadata. Only the admin API can write that
  metadata, so a client can never set or clear the mark. An unverified client
  is shown as unverified; the user may still allow it. It is the only trust
  mark. Because a dynamically registered client's name and logo are
  self-asserted, `logoUri` is never sent for one: no logo URL the browser would
  fetch from a host the client chose, and no client-chosen home page, is
  carried.

## The client the page names

`OauthConsentClient` carries what the user needs to recognise the client and
where it will send them: `clientId` (an identity provider identifier, not a
UUID), `clientName` (may be empty; self-asserted for a dynamically registered
client, set by the operator for an operator-managed one, and never a trust
mark), `redirectHosts`, `appSchemes`, `verified` and the optional `logoUri`.

`logoUri` is an `https` URL (at most 2048 characters) of the client's logo
image. It is sent only for an operator-managed client whose operator set one,
and omitted otherwise; a dynamically registered client never has one. It is
optional, so a response without it stays valid.

Where the client can send the user is split by scheme, so the page never shows
an app as a host. The server puts each registered redirect URI in exactly one
list: an `http` or `https` redirect in `redirectHosts`, any other scheme in
`appSchemes`. For a dynamically registered client the registration policy
limits what can appear: `https` and loopback `http` redirects, and allowlisted
private-use schemes. For an operator-managed client there is no extra
constraint (no app-scheme screening, no https-only or loopback-only rule, no
special handling of `localhost`): the identity provider's exact-match
`redirect_uri` check is the only gate, and the split is display only.

- **`redirectHosts`** lists the host of each `http` or `https` redirect URI,
  with its port when the redirect has one, as the server sends it. An entry is
  a hostname or single label (`app.example.com`, `my_host`, and for an
  operator-managed client `localhost`), an IPv4 literal (`127.0.0.1`) or a
  bracketed IPv6 literal (`[::1]`, `[::ffff:127.0.0.1]`), optionally followed
  by `:port` (`app.example.com:8443`, `[::1]:8080`). It carries no scheme,
  path, userinfo or whitespace, and a bare `:port` is not a host. An item is
  at most 259 characters, so a 253-character hostname can still carry `:65535`.
  The pattern
  checks only that shape: it does not promise a case or character set, so an
  internationalized hostname may arrive as the server sends it. For a
  dynamically registered client, registration policy (enforced server-side)
  allows only `https` hosts and loopback IP literals, and rejects the
  `localhost` hostname (RFC 8252 section 8.3).
- **`appSchemes`** lists the scheme of each redirect URI whose scheme is not
  `http` or `https`, in lowercase RFC 3986 scheme form with no `:` or `//`
  (`vscode`, `com.example.app`). For a dynamically registered client, Cloud
  accepts a private-use scheme (RFC 8252 section 7.1) at registration only
  when it is on the server-side app-scheme allowlist, read from configuration
  (defaults `vscode` and `cursor`), so `appSchemes` only ever holds
  allowlisted schemes. For an operator-managed client any other scheme is
  listed, as registered. `http` and `https` are rejected here; their redirects
  belong in `redirectHosts`.

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
their tags, the required query parameter, the payload fields and the declared
responses, and runs the schemas against request and response bodies.

# Diagnostics and anonymous support contract

Schema-side contract for Blowhorn issue #771 (schema step, first in the
issue's sequence). The Cloud and Blowhorn workers build against this
document plus the specs; where they disagree, the specs win and this
document is updated.

## Constructs

- `schemas/constructs/v1beta1/support/api.yml` — `SupportRequest`
  (unchanged), `AnonymousSupportRequest`, `POST /api/support/anonymous`.
- `schemas/constructs/v1beta1/diagnostics/api.yml` — `FailureDiagnostic`,
  `POST /api/diagnostics/failures`.

## The support drift decision

`SupportRequest` at `POST /api/integrations/support` is NOT reshaped to
match what Layer5 Cloud serves today. Cloud's live route is
`POST /api/webhook/support` with a `memberFormOne` payload
(`server/handlers/webhooks.go`, `server/models/webhooks_payload.go`), and
no `/api/integrations/support` route exists on Cloud master. Per this
repo's source-of-truth rule, the schema is authoritative post-migration:
Cloud adopts `SupportRequest` at `POST /api/integrations/support`
(authenticated, as today) and keeps `/api/webhook/support` as a
deprecated alias for its own UI until that moves. The alias is
deliberately NOT declared here: declaring it would bake the legacy
`memberFormOne` shape into the canonical contract. The drift fix
therefore lands on the Cloud side, not in this repo. Pinned by
`validation/diagnostics_support_contract_test.go`
(`TestSupportRequestUnchanged`).

## Anonymous support

`AnonymousSupportRequest` is `SupportRequest` plus two optional fields,
spelled out flat rather than composed with `allOf`, so generated clients
expose the fields exactly like `SupportRequest`:

- `email` (`format: email`): only ever sent when the person types it in
  for a follow-up; never inferred from an account, because the request
  may come from a signed-out client.
- `diagnosticId` (`format: uuid`): links the human report to the
  automatic `FailureDiagnostic` for the same incident, when one exists.

`POST /api/support/anonymous` carries `security: []`: no auth is
required. A signed-in caller may additionally send its bearer token;
Cloud then attaches the organization, and only then.

## FailureDiagnostic

- One anonymous, redacted report per occurrence window. The same failure
  is deduplicated per install per day: `firstSeenAt` opens the window,
  `count` (minimum 1) counts occurrences inside it, `occurredAt` is the
  latest occurrence.
- Every object is closed (`additionalProperties: false`), so an unknown
  field is a 400, not a silently widened report.
- `diagnosticId` is client-generated, `format: uuid`. The client, not
  the server, mints it, because the human support request must be able
  to reference it before any server round trip.
- `failure.cause` is a patterned string (`^[a-z][a-z0-9_]*$`), NOT a
  closed enum. New failure causes are named by clients over time, and a
  closed enum would make the server reject reports carrying a cause it
  does not know yet. Consumers must treat an unknown cause as opaque,
  never as an error. The description lists the known causes today (the
  Blowhorn engine's `StoreUnavailable.cause` names).
- `failure.message` is redacted, max 500 characters: only the cause
  sentence survives.
- `failure.code` is a string so numeric and symbolic codes both fit;
  empty when the failure carries no code beyond its cause.
- `client.channel` is a free string, not an enum: channel names are
  release-process values, and a new channel must not make older
  clients' reports undecodable.
- `compat` carries `requiresSchema` and `contractVersion` as strings, so
  dotted versions and plain numbers both fit.
- `installId` is optional and deliberately NOT `format: uuid`: the
  per-install id's format is not fixed to UUID, and a uuid format would
  reject reports from clients whose id takes another shape. It is a
  random per-install id, never a hardware id, and it is omitted entirely
  when the person has opted out of failure reports.

## Authentication on POST /api/diagnostics/failures

`security` lists two alternatives: the `X-Client-Key` pre-shared key
(per client kind, per release channel, `<key id>.<secret>`, at least two
valid at any time so rotation never breaks old builds) or a bearer
token for a signed-in caller (organization attached only then). The key
is a speed bump plus a revocation handle, not a strong secret: it ships
in the app and can be extracted. Body cap, strict decode, rate limits,
server-side re-redaction, and 90-day retention are server-side
behaviour owned by the Cloud step, described in the operation text but
not enforceable from this repo.

## Schema-first status

Both new operations are declared before Cloud serves them, by design:
the issue sequences schemas first, Cloud second. Until the Cloud step
lands, these operations have no live server; generated clients built
from this schema will 404 against Cloud until then. Do not read
declaration as availability.

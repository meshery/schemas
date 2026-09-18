# Model import preflight

`POST /api/registry/models/preflight` is a non-mutating Meshery-only action,
authenticated through the same provider and session middleware as registration.
Its contract lives in `schemas/constructs/v1beta2/registry/api.yml`; existing
registry endpoints remain in v1beta1 without a wire-format migration.

The payload contains `source` (`github` or `artifacthub`), `url`, and `modelName`.
The response always includes `valid`, `source`, `name`, `version`, `errors`, and
`warnings`. Source validation failures return HTTP 200 with `valid: false`;
malformed or oversized JSON returns HTTP 400. Empty strings denote unavailable
metadata, and arrays are always present.

GitHub checks the public repository and the specified branch/path through
api.github.com, including the latest published release tag when available.
Artifact Hub checks Helm package metadata or searches Helm
packages by model name. Search results use official/verified-publisher weights
matching MeshKit's current ranking, but metadata remains advisory. A package URL
must match the model name; a search URL contains only a matching `ts_query_web`.

Preflight never downloads charts, clones repositories, invokes generation,
writes model files, or persists registry entities. It only sends bounded GET
requests to fixed public API origins, rejects redirects, caps metadata at 1 MiB,
and uses the incoming request context with a ten-second deadline.

This is not a generation guarantee or version pin. MeshKit's current Artifact
Hub generator selects packages by name independently of the URL, and its GitHub
generator selects release tags independently of the checked branch. Consumers
display those limitations and clear previews whenever source inputs change.

The coordinated Meshery consumer uses the generated Go registry models and RTK
`usePreviewModelImportMutation`. Release the schema additions before updating
the consumer's published dependency pins; local replacement/linking is for
development only. Generated output is not included in the schema source PR.

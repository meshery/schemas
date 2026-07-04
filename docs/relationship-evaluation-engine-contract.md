# Relationship Evaluation Engine Contract

**Status:** authoritative. This document is the source of truth for the
relationship-evaluation contract. Downstream repositories conform to this
contract, not the reverse (see `AGENTS.md § Source of Truth`).

## Scope

Relationship evaluation takes a design plus the registered relationship
definitions and returns the design with policy-driven additions, removals,
and updates applied. The wire contract is defined by the OpenAPI construct
`schemas/constructs/v1beta1/evaluation/api.yml`:

- `EvaluationRequest` - `{ design: PatternFile, options?: { returnDiffOnly?, enableTrace? } }`
- `EvaluationResponse` - `{ schemaVersion, design: PatternFile, evaluationHash?, timestamp?, actions[] }`

This contract is **engine-agnostic**. The same `EvaluationResponse` is
produced by either of two interchangeable engines:

1. **Server engine** - `POST /evaluate` (the OpenAPI operation above). The
   always-available, default path.
2. **In-browser WASM engine** - the same Meshery Go policy engine compiled to
   WebAssembly and run in a Web Worker by the in-browser policy-engine
   consumer. It eliminates network round-trips on the evaluation hot path.
   The WASM binary is built and shipped by Meshery; Meshery remains the
   source of truth for the engine.

Because both engines satisfy this one contract, every downstream consumer is
engine-agnostic by construction. This closes the long-standing action item
"standardize the response shape of policy evaluations": the canonical shape
is `v1beta1` `EvaluationResponse`, defined by the OpenAPI construct and
specified here.

## In-browser engine global surface

When present, the WASM module attaches the following object to the worker
global scope:

```ts
globalThis.__mesheryRelationshipEngine = {
  contract: number,   // integer; a consumer MUST refuse a mismatched contract
  version: string,    // meshery build version / SHA - diagnostics only
  init(relationshipsJson: string): string,                    // "{}" | {"error":"..."}
  evaluate(designJson: string, optionsJson: string): string,  // EvaluationResponse JSON | {"error":"..."}
  selfTest(): string                                          // {"ok":true,...} | {"error":"..."}
}
```

Rules:

- **Current contract version: `1`.** Bump on any breaking change to the
  exported surface or to the registry-independent evaluation behavior. A
  consumer that observes a `contract` it was not built against MUST NOT use
  the WASM engine and MUST fall back to the server engine.
- All functions are **synchronous, string→string, JSON in/out**. Errors are
  **returned** as `{"error":"..."}`; they are never thrown across the
  boundary, and the module never panics across it.
- `init` input is the registered relationship-definition array (the same set
  the server resolves from its registry). `init` MUST be called before
  `evaluate`; calling `evaluate` first returns `{"error":"engine not initialized"}`.
- `evaluate` input is a `PatternFile` (the request `design`) and an options
  object equivalent to `EvaluationRequest.options`
  (`{ enableTrace?, returnDiffOnly? }`). Output is an `EvaluationResponse`.
- The WASM engine replicates the registry-**independent** evaluation
  orchestration so its output matches the server: the re-evaluation loop,
  alias resolution, design version bump, unique trace merge, cross-iteration
  action de-duplication, and the completed-at timestamp.

## Hydration boundary (the one documented difference)

Registry-bound hydration of evaluator-added components cannot run in a
browser (there is no component registry there). The WASM engine therefore
ships `trace.componentsAdded` as **bare component declarations**. This is not
a regression: the server already ships bare declarations for wildcard-model
selectors, and the in-browser consumer compensates by hydrating any
evaluator-added component whose styles are empty from the registry on its
side. With that client-side hydration pass, the server and WASM outputs are
behaviorally equivalent.

## Determinism

For a fixed `(relationships, design, options)`, the response is identical
except for `timestamp` and `evaluationHash`. Consumers may rely on this for
content-hash-based skip/caching of redundant evaluations.

## Versioning

The contract integer above is independent of the OpenAPI construct version.
A wire-shape change to `EvaluationRequest`/`EvaluationResponse` follows the
normal schema-construct versioning in `schemas/constructs/`; a change to the
in-browser engine's exported surface or registry-independent behavior bumps
the `contract` integer. Both producer (Meshery) and the in-browser consumer
pin the same `contract` value.

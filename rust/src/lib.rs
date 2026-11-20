// HAND-MAINTAINED SCAFFOLD - not generator output.
//
// Each construct lives in its own generated module (e.g. `key`, from
// src/key/), written by build/generate-rust.js. This file only declares
// those modules and re-exports the HTTP stack they are built on. Do not put
// generated code here.

// The crate documentation is the README, so its example is compiled by
// `cargo test` and cannot drift from the generated API.
#![doc = include_str!("../README.md")]

/// The `reqwest` the generated clients are built on, re-exported so callers
/// configure the HTTP client (headers, TLS, timeouts) with the same version.
pub use reqwest;

/// The `v1beta2` key construct: authorization keys.
pub mod key;

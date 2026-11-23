//! Thin glue around the pinned `progenitor` library, run by
//! `build/generate-rust.js` once per pilot construct.
//!
//! Usage: `meshery-schemas-rust-gen <bundled-openapi.json> <output-dir>`
//!
//! It does what `cargo-progenitor` 0.17.0 does (positional interface,
//! merged tags, `progenitor-client` as a dependency, the token text run
//! through rustfmt and then `space_out_items`), except that it passes
//! rustfmt no options: that binary asks for the nightly-only
//! `normalize_doc_attributes` and `wrap_comments` and fails on a stable
//! toolchain. Doc comments therefore stay `#[doc = "..."]` attributes, whose
//! text rustfmt never re-indents. `rustfmt` is the one on PATH, run from the
//! caller's working directory, so rustup picks the toolchain pinned in
//! `rust-toolchain.toml` when `build/generate-rust.js` runs this from the
//! repository root. It also trims a trailing slash off `baseurl` in the
//! generated client's shared constructor: progenitor stores it verbatim and
//! every operation formats `{baseurl}/api/...`, so a trailing slash would
//! double the separator.
//!
//! The client lands in `mod.rs` and the models in `types/`. The
//! dependencies the generated code needs are printed to stdout as JSON for
//! the manifest.

use std::{
    fs,
    io::Write,
    path::{Path, PathBuf},
    process::{Command, ExitCode, Stdio},
};

use anyhow::{Context, Result, bail};
use openapiv3::OpenAPI;
use progenitor::{GenerationSettings, Generator, InterfaceStyle, TagStyle};
use serde_json::json;

fn run() -> Result<()> {
    let mut args = std::env::args().skip(1);
    let (Some(input), Some(output), None) = (args.next(), args.next(), args.next()) else {
        bail!("usage: meshery-schemas-rust-gen <bundled-openapi.json> <output-dir>");
    };
    let output = PathBuf::from(output);

    let spec_bytes = fs::read(&input).with_context(|| format!("reading {input}"))?;
    let spec: OpenAPI = serde_json::from_slice(&spec_bytes)
        .with_context(|| format!("parsing {input} as OpenAPI 3.0"))?;

    let mut settings = GenerationSettings::default();
    settings
        .with_interface(InterfaceStyle::Positional)
        .with_tag(TagStyle::Merged);
    let generator = Generator::build(&settings, &spec).context("progenitor rejected the spec")?;
    let sdk = generator.generate_sdk();

    let dependencies: Vec<_> = sdk
        .dependencies()
        .map(|dep| {
            json!({
                "name": dep.name,
                "toml": dep.to_toml_inline(),
            })
        })
        .collect();

    fs::create_dir_all(&output).with_context(|| format!("creating {}", output.display()))?;
    for (path, tokens) in sdk.into_files() {
        let formatted = rustfmt(&tokens.to_string())
            .with_context(|| format!("formatting {}", path.display()))?;
        let mut text = progenitor_impl::space_out_items(formatted)?;
        // The root module is the construct's module, not a crate root.
        let name = if path.as_path() == Path::new("lib.rs") {
            PathBuf::from("mod.rs")
        } else {
            path
        };
        if name.as_path() == Path::new("mod.rs") {
            text = normalize_baseurl(&text)?;
        }
        let dest = output.join(&name);
        if let Some(parent) = dest.parent() {
            fs::create_dir_all(parent)?;
        }
        fs::write(&dest, text).with_context(|| format!("writing {}", dest.display()))?;
    }

    println!(
        "{}",
        serde_json::to_string(&json!({ "dependencies": dependencies }))?
    );
    Ok(())
}

/// Progenitor stores `baseurl` verbatim and every operation formats
/// `{baseurl}/api/...`, so a caller passing a trailing slash (or a path stem
/// with one) gets a doubled separator and a route that never matches. Trim
/// it in the shared constructor (`new_with_client`, which `new` also uses)
/// so every operation inherits the fix. The match must be exactly one
/// occurrence: a progenitor upgrade that changes the constructor shape fails
/// loudly here instead of silently shipping the old behaviour.
fn normalize_baseurl(text: &str) -> Result<String> {
    const NEEDLE: &str = "baseurl: baseurl.to_string(),";
    const REPLACEMENT: &str = "baseurl: baseurl.trim_end_matches('/').to_string(),";
    let count = text.matches(NEEDLE).count();
    if count != 1 {
        bail!(
            "expected exactly one `{NEEDLE}` in the generated client, found {count}; \
             the progenitor output shape changed, update normalize_baseurl"
        );
    }
    Ok(text.replacen(NEEDLE, REPLACEMENT, 1))
}

/// Format Rust source with the `rustfmt` on PATH, as `cargo-progenitor` does
/// through `rustfmt-wrapper`, but with no unstable options.
fn rustfmt(source: &str) -> Result<String> {
    let mut child = Command::new("rustfmt")
        .args(["--edition", "2024", "--emit", "stdout"])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .context("starting rustfmt")?;
    child
        .stdin
        .take()
        .context("rustfmt stdin")?
        .write_all(source.as_bytes())
        .context("writing to rustfmt")?;
    let output = child.wait_with_output().context("waiting for rustfmt")?;
    if !output.status.success() || !output.stderr.is_empty() {
        bail!(
            "rustfmt failed ({}):\n{}",
            output.status,
            String::from_utf8_lossy(&output.stderr)
        );
    }
    String::from_utf8(output.stdout).context("rustfmt printed non-UTF-8 output")
}

fn main() -> ExitCode {
    match run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(err) => {
            eprintln!("meshery-schemas-rust-gen: {err:#}");
            ExitCode::FAILURE
        }
    }
}

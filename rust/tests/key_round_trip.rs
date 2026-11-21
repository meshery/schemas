//! Pilot round-trip tests for the generated key models.
//!
//! The fixture is the construct's own template
//! (`schemas/constructs/v1beta2/key/templates/key_template.json`), so the
//! wire contract the schemas declare is what gets verified, as in
//! `python/tests/test_key_round_trip.py`.

use std::path::PathBuf;

use meshery_schemas::key::types::{Key, KeyPayload};
use serde_json::{Value, json};

fn template() -> Value {
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../schemas/constructs/v1beta2/key/templates/key_template.json");
    let text = std::fs::read_to_string(&path)
        .unwrap_or_else(|err| panic!("reading {}: {err}", path.display()));
    serde_json::from_str(&text).expect("key template is valid JSON")
}

#[test]
fn key_template_round_trip_is_semantically_stable() {
    let fixture = template();
    let key: Key = serde_json::from_value(fixture.clone()).expect("template deserializes as Key");
    assert_eq!(key.id.to_string(), "00000000-0000-0000-0000-000000000000");

    // An explicit `"deletedAt": null` reads as `None`, which serializes by
    // omission (absent and null are the same value in Rust), so the template
    // round-trips once its null members are dropped.
    let mut expected = fixture;
    expected
        .as_object_mut()
        .unwrap()
        .retain(|_, value| !value.is_null());
    assert_eq!(serde_json::to_value(&key).unwrap(), expected);

    let again: Key = serde_json::from_value(serde_json::to_value(&key).unwrap()).unwrap();
    assert_eq!(serde_json::to_value(again).unwrap(), expected);
}

#[test]
fn key_wire_mapping_uses_camel_case() {
    let key: Key = serde_json::from_value(template()).unwrap();
    let wire = serde_json::to_value(&key).unwrap();

    assert_eq!(wire["createdAt"], "0001-01-01T00:00:00Z");
    assert_eq!(wire["updatedAt"], "0001-01-01T00:00:00Z");
    assert!(wire.get("created_at").is_none());
    assert!(wire.get("updated_at").is_none());
}

#[test]
fn key_null_deleted_at_reads_as_none_and_is_omitted() {
    let key: Key = serde_json::from_value(template()).unwrap();

    assert!(key.deleted_at.is_none());
    assert!(
        serde_json::to_value(&key)
            .unwrap()
            .get("deletedAt")
            .is_none()
    );
}

#[test]
fn key_rejects_members_the_schema_does_not_declare() {
    // key.yaml sets `additionalProperties: false`, so the model is closed.
    let mut fixture = template();
    fixture["unexpected"] = json!(true);

    assert!(serde_json::from_value::<Key>(fixture).is_err());
}

#[test]
fn key_enforces_declared_string_limits() {
    let mut fixture = template();
    fixture["description"] = json!("x".repeat(5001));

    assert!(serde_json::from_value::<Key>(fixture).is_err());
}

#[test]
fn key_payload_omits_id_for_upsert() {
    let payload = KeyPayload {
        function: Some("read".parse().unwrap()),
        category: Some("api".parse().unwrap()),
        subcategory: Some("keys".parse().unwrap()),
        description: Some("test key".parse().unwrap()),
        id: None,
    };

    assert_eq!(
        serde_json::to_value(&payload).unwrap(),
        json!({"function": "read", "category": "api", "subcategory": "keys", "description": "test key"}),
    );
}

#[test]
fn crate_identity_matches_the_repository_naming() {
    // crates.io name, beside @meshery/schemas (npm), meshery-schemas (PyPI)
    // and github.com/meshery/schemas (Go); the lib is `meshery_schemas`.
    assert_eq!(env!("CARGO_PKG_NAME"), "meshery-schemas");
}

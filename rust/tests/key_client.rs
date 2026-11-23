//! Pilot client test: one generated call against a local mock server,
//! checking what goes over the wire (method, path, auth header, JSON body)
//! and that the response decodes into the generated model.

use std::path::PathBuf;

use meshery_schemas::key::{Client, types};
use meshery_schemas::reqwest;
use serde_json::{Value, json};
use wiremock::matchers::{body_json, header, method, path};
use wiremock::{Mock, MockServer, ResponseTemplate};

const TOKEN: &str = "test-token";

fn template() -> Value {
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../schemas/constructs/v1beta2/key/templates/key_template.json");
    serde_json::from_str(&std::fs::read_to_string(path).expect("key template is readable")).unwrap()
}

fn authenticated_client(base_url: &str) -> Client {
    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert(
        reqwest::header::AUTHORIZATION,
        reqwest::header::HeaderValue::from_str(&format!("Bearer {TOKEN}")).unwrap(),
    );
    let http = reqwest::Client::builder()
        .default_headers(headers)
        .build()
        .unwrap();
    Client::new_with_client(base_url, http)
}

#[tokio::test]
async fn upsert_key_posts_the_payload_and_decodes_the_key() {
    let server = MockServer::start().await;
    let payload = json!({"function": "read", "category": "api", "subcategory": "keys", "description": "test key"});
    let mut stored = template();
    stored["function"] = json!("read");
    stored["category"] = json!("api");
    stored["subcategory"] = json!("keys");
    stored["description"] = json!("test key");

    Mock::given(method("POST"))
        .and(path("/api/auth/keys"))
        .and(header("authorization", format!("Bearer {TOKEN}").as_str()))
        .and(body_json(&payload))
        .respond_with(ResponseTemplate::new(200).set_body_json(&stored))
        .expect(1)
        .mount(&server)
        .await;

    let body: types::UpsertKeyBody = serde_json::from_value(payload.clone()).unwrap();
    let response = authenticated_client(&server.uri())
        .upsert_key(&body)
        .await
        .expect("upsert succeeds against the mock");

    assert_eq!(response.status(), 200);
    let key = response.into_inner();
    assert_eq!(key.id.to_string(), "00000000-0000-0000-0000-000000000000");
    assert_eq!(key.function.as_str(), "read");
    assert_eq!(key.description.as_str(), "test key");
    assert!(key.deleted_at.is_none());

    // The matchers above already gate the response; check the recorded
    // request too, so a mismatch reports what was actually sent.
    let requests = server
        .received_requests()
        .await
        .expect("request recording is on");
    assert_eq!(requests.len(), 1);
    let request = &requests[0];
    assert_eq!(request.method.as_str(), "POST");
    assert_eq!(request.url.path(), "/api/auth/keys");
    assert_eq!(
        request.headers.get("authorization").unwrap(),
        &format!("Bearer {TOKEN}")
    );
    assert_eq!(
        request.headers.get("content-type").unwrap(),
        "application/json"
    );
    assert_eq!(
        serde_json::from_slice::<Value>(&request.body).unwrap(),
        payload
    );
}

#[tokio::test]
async fn get_key_by_id_puts_the_id_in_the_path() {
    let server = MockServer::start().await;
    let key_id = "11111111-2222-3333-4444-555555555555";
    let mut stored = template();
    stored["id"] = json!(key_id);

    Mock::given(method("GET"))
        .and(path(format!("/api/auth/keys/{key_id}")))
        .and(header("authorization", format!("Bearer {TOKEN}").as_str()))
        .respond_with(ResponseTemplate::new(200).set_body_json(&stored))
        .expect(1)
        .mount(&server)
        .await;

    let key = authenticated_client(&server.uri())
        .get_key_by_id(&key_id.parse().unwrap())
        .await
        .expect("get succeeds against the mock")
        .into_inner();

    assert_eq!(key.id.to_string(), key_id);
}

#[tokio::test]
async fn trailing_slash_in_base_url_does_not_double_the_separator() {
    let server = MockServer::start().await;
    let key_id = "11111111-2222-3333-4444-555555555555";
    let mut stored = template();
    stored["id"] = json!(key_id);

    Mock::given(method("GET"))
        .and(path(format!("/api/auth/keys/{key_id}")))
        .respond_with(ResponseTemplate::new(200).set_body_json(&stored))
        .expect(1)
        .mount(&server)
        .await;

    let key = authenticated_client(&format!("{}/", server.uri()))
        .get_key_by_id(&key_id.parse().unwrap())
        .await
        .expect("get succeeds with a trailing-slash base URL")
        .into_inner();

    assert_eq!(key.id.to_string(), key_id);
}

#[tokio::test]
async fn path_stem_with_trailing_slash_is_normalized() {
    let server = MockServer::start().await;
    let key_id = "11111111-2222-3333-4444-555555555555";
    let mut stored = template();
    stored["id"] = json!(key_id);

    Mock::given(method("GET"))
        .and(path(format!("/meshery/api/auth/keys/{key_id}")))
        .respond_with(ResponseTemplate::new(200).set_body_json(&stored))
        .expect(1)
        .mount(&server)
        .await;

    let key = authenticated_client(&format!("{}/meshery/", server.uri()))
        .get_key_by_id(&key_id.parse().unwrap())
        .await
        .expect("get succeeds with a path stem and trailing slash")
        .into_inner();

    assert_eq!(key.id.to_string(), key_id);
}

#[tokio::test]
async fn a_documented_error_status_surfaces_as_an_error() {
    let server = MockServer::start().await;
    Mock::given(method("GET"))
        .and(path("/api/auth/keys/11111111-2222-3333-4444-555555555555"))
        .respond_with(ResponseTemplate::new(404).set_body_string("key not found"))
        .mount(&server)
        .await;

    let err = authenticated_client(&server.uri())
        .get_key_by_id(&"11111111-2222-3333-4444-555555555555".parse().unwrap())
        .await
        .expect_err("a 404 is not a success");

    assert_eq!(err.status().map(|status| status.as_u16()), Some(404));
}

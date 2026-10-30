"""Pilot round-trip tests for the generated key client (issue #1240, Phase 1).

These tests run against the installed ``meshery-schemas`` distribution
(``make test-python`` pip-installs ``./python/generated`` first) and use the
construct's own template JSON as the fixture, so the wire contract the
schemas declare is what gets verified.
"""

import json
import tomllib
from pathlib import Path
from uuid import UUID

from meshery_schemas.key.api.key import delete_key, get_key_by_id, get_keys, upsert_key
from meshery_schemas.key.api.users import get_user_keys
from meshery_schemas.key.client import AuthenticatedClient, Client
from meshery_schemas.key.models.key import Key
from meshery_schemas.key.models.key_payload import KeyPayload
from meshery_schemas.key.types import UNSET

REPO_ROOT = Path(__file__).resolve().parents[2]
TEMPLATE = REPO_ROOT / "schemas" / "constructs" / "v1beta2" / "key" / "templates" / "key_template.json"
PYPROJECT = REPO_ROOT / "python" / "generated" / "pyproject.toml"


def load_template() -> dict:
    return json.loads(TEMPLATE.read_text())


def test_key_template_round_trip_is_semantically_stable():
    key = Key.from_dict(load_template())

    assert key.id == UUID("00000000-0000-0000-0000-000000000000")
    assert Key.from_dict(key.to_dict()) == key


def test_key_wire_mapping_uses_camel_case():
    wire = Key.from_dict(load_template()).to_dict()

    assert wire["createdAt"] == "0001-01-01T00:00:00+00:00"
    assert wire["updatedAt"] == "0001-01-01T00:00:00+00:00"
    assert "created_at" not in wire
    assert "updated_at" not in wire


def test_key_explicit_null_deleted_at_is_preserved():
    key = Key.from_dict(load_template())

    assert key.deleted_at is None
    assert key.to_dict()["deletedAt"] is None


def test_key_unset_deleted_at_is_omitted_from_wire():
    key = Key.from_dict(load_template())
    key.deleted_at = UNSET

    assert "deletedAt" not in key.to_dict()


def test_key_payload_omits_id_for_upsert():
    payload = KeyPayload(function="read", category="api", subcategory="keys", description="test key")
    wire = payload.to_dict()

    assert "id" not in wire
    assert wire == {"function": "read", "category": "api", "subcategory": "keys", "description": "test key"}


def test_key_endpoint_modules_expose_sync_and_async_variants():
    for module in (delete_key, get_key_by_id, get_keys, upsert_key, get_user_keys):
        assert callable(module.sync)
        assert callable(module.asyncio)

    for cls, kwargs in (
        (Client, {"base_url": "https://example.com"}),
        (AuthenticatedClient, {"base_url": "https://example.com", "token": "token"}),
    ):
        client = cls(**kwargs)
        assert callable(client.get_httpx_client)
        assert callable(client.get_async_httpx_client)


def test_distribution_identity_and_hatch_wheel_packages():
    pyproject = tomllib.loads(PYPROJECT.read_text())

    assert pyproject["project"]["name"] == "meshery-schemas"
    assert pyproject["build-system"]["build-backend"] == "hatchling.build"
    assert pyproject["tool"]["hatch"]["build"]["targets"]["wheel"]["packages"] == ["src/meshery_schemas"]

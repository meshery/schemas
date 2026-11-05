from __future__ import annotations

import datetime
from collections.abc import Mapping
from typing import Any, Self, TypeVar, cast
from uuid import UUID

from attrs import define as _attrs_define

from ..types import UNSET, Unset

T = TypeVar("T", bound="UpsertKeyResponse200")


@_attrs_define
class UpsertKeyResponse200:
    """Represents an authorization key used for access control.

    Attributes:
        id (UUID): A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core
            definition is used across different schemas.
        owner (UUID): A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core
            definition is used across different schemas.
        function (str): Operation permitted by the key.
        category (str): Category for the key.
        subcategory (str): Subcategory for the key.
        description (str): Human readable description of the key.
        created_at (datetime.datetime): Timestamp when the key was created.
        updated_at (datetime.datetime): Timestamp when the key was last updated.
        deleted_at (datetime.datetime | None | Unset): Timestamp when the key was soft-deleted.
    """

    id: UUID
    owner: UUID
    function: str
    category: str
    subcategory: str
    description: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    deleted_at: datetime.datetime | None | Unset = UNSET

    def to_dict(self) -> dict[str, Any]:
        id = str(self.id)

        owner = str(self.owner)

        function = self.function

        category = self.category

        subcategory = self.subcategory

        description = self.description

        created_at = self.created_at.isoformat()

        updated_at = self.updated_at.isoformat()

        deleted_at: None | str | Unset
        if isinstance(self.deleted_at, Unset):
            deleted_at = UNSET
        elif isinstance(self.deleted_at, datetime.datetime):
            deleted_at = self.deleted_at.isoformat()
        else:
            deleted_at = self.deleted_at

        field_dict: dict[str, Any] = {}

        field_dict.update(
            {
                "id": id,
                "owner": owner,
                "function": function,
                "category": category,
                "subcategory": subcategory,
                "description": description,
                "createdAt": created_at,
                "updatedAt": updated_at,
            }
        )
        if deleted_at is not UNSET:
            field_dict["deletedAt"] = deleted_at

        return field_dict

    @classmethod
    def from_dict(cls, src_dict: Mapping[str, Any]) -> Self:
        d = dict(src_dict)
        id = UUID(d.pop("id"))

        owner = UUID(d.pop("owner"))

        function = d.pop("function")

        category = d.pop("category")

        subcategory = d.pop("subcategory")

        description = d.pop("description")

        created_at = datetime.datetime.fromisoformat(d.pop("createdAt"))

        updated_at = datetime.datetime.fromisoformat(d.pop("updatedAt"))

        def _parse_deleted_at(data: object) -> datetime.datetime | None | Unset:
            if data is None:
                return data
            if isinstance(data, Unset):
                return data
            try:
                if not isinstance(data, str):
                    raise TypeError()
                deleted_at_type_0 = datetime.datetime.fromisoformat(data)

                return deleted_at_type_0
            except (TypeError, ValueError, AttributeError, KeyError):
                pass
            return cast(datetime.datetime | None | Unset, data)

        deleted_at = _parse_deleted_at(d.pop("deletedAt", UNSET))

        upsert_key_response_200 = cls(
            id=id,
            owner=owner,
            function=function,
            category=category,
            subcategory=subcategory,
            description=description,
            created_at=created_at,
            updated_at=updated_at,
            deleted_at=deleted_at,
        )

        return upsert_key_response_200

from __future__ import annotations

from collections.abc import Mapping
from typing import Any, Self, TypeVar
from uuid import UUID

from attrs import define as _attrs_define
from attrs import field as _attrs_field

from ..types import UNSET, Unset

T = TypeVar("T", bound="KeyPayload")


@_attrs_define
class KeyPayload:
    """Payload for creating or updating a key.

    Attributes:
        id (UUID | Unset): A Universally Unique Identifier used to uniquely identify entities in Meshery. The UUID core
            definition is used across different schemas.
        function (str | Unset): Operation permitted by the key.
        category (str | Unset): Category for the key.
        subcategory (str | Unset): Subcategory for the key.
        description (str | Unset): Human readable description of the key.
    """

    id: UUID | Unset = UNSET
    function: str | Unset = UNSET
    category: str | Unset = UNSET
    subcategory: str | Unset = UNSET
    description: str | Unset = UNSET
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        id: str | Unset = UNSET
        if not isinstance(self.id, Unset):
            id = str(self.id)

        function = self.function

        category = self.category

        subcategory = self.subcategory

        description = self.description

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update({})
        if id is not UNSET:
            field_dict["id"] = id
        if function is not UNSET:
            field_dict["function"] = function
        if category is not UNSET:
            field_dict["category"] = category
        if subcategory is not UNSET:
            field_dict["subcategory"] = subcategory
        if description is not UNSET:
            field_dict["description"] = description

        return field_dict

    @classmethod
    def from_dict(cls, src_dict: Mapping[str, Any]) -> Self:
        d = dict(src_dict)
        _id = d.pop("id", UNSET)
        id: UUID | Unset
        if isinstance(_id, Unset):
            id = UNSET
        else:
            id = UUID(_id)

        function = d.pop("function", UNSET)

        category = d.pop("category", UNSET)

        subcategory = d.pop("subcategory", UNSET)

        description = d.pop("description", UNSET)

        key_payload = cls(
            id=id,
            function=function,
            category=category,
            subcategory=subcategory,
            description=description,
        )

        key_payload.additional_properties = d
        return key_payload

    @property
    def additional_keys(self) -> list[str]:
        return list(self.additional_properties.keys())

    def __getitem__(self, key: str) -> Any:
        return self.additional_properties[key]

    def __setitem__(self, key: str, value: Any) -> None:
        self.additional_properties[key] = value

    def __delitem__(self, key: str) -> None:
        del self.additional_properties[key]

    def __contains__(self, key: str) -> bool:
        return key in self.additional_properties

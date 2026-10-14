from __future__ import annotations

from collections.abc import Mapping
from typing import TYPE_CHECKING, Any, Self, TypeVar

from attrs import define as _attrs_define
from attrs import field as _attrs_field

if TYPE_CHECKING:
    from ..models.key_page_keys_item import KeyPageKeysItem


T = TypeVar("T", bound="KeyPage")


@_attrs_define
class KeyPage:
    """A paginated list of authorization keys.

    Attributes:
        page (int): Zero-based page index returned in this response.
        page_size (int): Maximum number of items returned on each page.
        total_count (int): Total number of items across all pages.
        keys (list[KeyPageKeysItem]): Keys returned on the current page.
    """

    page: int
    page_size: int
    total_count: int
    keys: list[KeyPageKeysItem]
    additional_properties: dict[str, Any] = _attrs_field(init=False, factory=dict)

    def to_dict(self) -> dict[str, Any]:
        page = self.page

        page_size = self.page_size

        total_count = self.total_count

        keys = []
        for keys_item_data in self.keys:
            keys_item = keys_item_data.to_dict()
            keys.append(keys_item)

        field_dict: dict[str, Any] = {}
        field_dict.update(self.additional_properties)
        field_dict.update(
            {
                "page": page,
                "pageSize": page_size,
                "totalCount": total_count,
                "keys": keys,
            }
        )

        return field_dict

    @classmethod
    def from_dict(cls, src_dict: Mapping[str, Any]) -> Self:
        from ..models.key_page_keys_item import KeyPageKeysItem

        d = dict(src_dict)
        page = d.pop("page")

        page_size = d.pop("pageSize")

        total_count = d.pop("totalCount")

        keys = []
        _keys = d.pop("keys")
        for keys_item_data in _keys:
            keys_item = KeyPageKeysItem.from_dict(keys_item_data)

            keys.append(keys_item)

        key_page = cls(
            page=page,
            page_size=page_size,
            total_count=total_count,
            keys=keys,
        )

        key_page.additional_properties = d
        return key_page

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

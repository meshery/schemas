from http import HTTPStatus
from typing import Any

import httpx

from ... import errors
from ...client import AuthenticatedClient, Client
from ...models.get_keys_response_200 import GetKeysResponse200
from ...types import UNSET, Response, Unset


def _get_kwargs(
    *,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
    search: str | Unset = UNSET,
    order: str | Unset = UNSET,
) -> dict[str, Any]:

    params: dict[str, Any] = {}

    params["page"] = page

    params["pageSize"] = page_size

    params["pagesize"] = pagesize

    params["search"] = search

    params["order"] = order

    params = {k: v for k, v in params.items() if v is not UNSET and v is not None}

    _kwargs: dict[str, Any] = {
        "method": "get",
        "url": "/api/auth/keys",
        "params": params,
    }

    return _kwargs


def _parse_response(
    *, client: AuthenticatedClient | Client, response: httpx.Response
) -> GetKeysResponse200 | str | None:
    if response.status_code == 200:
        response_200 = GetKeysResponse200.from_dict(response.json())

        return response_200

    if response.status_code == 400:
        response_400 = response.text
        return response_400

    if response.status_code == 401:
        response_401 = response.text
        return response_401

    if response.status_code == 500:
        response_500 = response.text
        return response_500

    if client.raise_on_unexpected_status:
        raise errors.UnexpectedStatus(response.status_code, response.content)
    else:
        return None


def _build_response(
    *, client: AuthenticatedClient | Client, response: httpx.Response
) -> Response[GetKeysResponse200 | str]:
    return Response(
        status_code=HTTPStatus(response.status_code),
        content=response.content,
        headers=response.headers,
        parsed=_parse_response(client=client, response=response),
    )


def sync_detailed(
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
    search: str | Unset = UNSET,
    order: str | Unset = UNSET,
) -> Response[GetKeysResponse200 | str]:
    """List key

    Args:
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):
        search (str | Unset):
        order (str | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[GetKeysResponse200 | str]
    """

    kwargs = _get_kwargs(
        page=page,
        page_size=page_size,
        pagesize=pagesize,
        search=search,
        order=order,
    )

    response = client.get_httpx_client().request(
        **kwargs,
    )

    return _build_response(client=client, response=response)


def sync(
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
    search: str | Unset = UNSET,
    order: str | Unset = UNSET,
) -> GetKeysResponse200 | str | None:
    """List key

    Args:
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):
        search (str | Unset):
        order (str | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        GetKeysResponse200 | str
    """

    return sync_detailed(
        client=client,
        page=page,
        page_size=page_size,
        pagesize=pagesize,
        search=search,
        order=order,
    ).parsed


async def asyncio_detailed(
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
    search: str | Unset = UNSET,
    order: str | Unset = UNSET,
) -> Response[GetKeysResponse200 | str]:
    """List key

    Args:
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):
        search (str | Unset):
        order (str | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[GetKeysResponse200 | str]
    """

    kwargs = _get_kwargs(
        page=page,
        page_size=page_size,
        pagesize=pagesize,
        search=search,
        order=order,
    )

    response = await client.get_async_httpx_client().request(**kwargs)

    return _build_response(client=client, response=response)


async def asyncio(
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
    search: str | Unset = UNSET,
    order: str | Unset = UNSET,
) -> GetKeysResponse200 | str | None:
    """List key

    Args:
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):
        search (str | Unset):
        order (str | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        GetKeysResponse200 | str
    """

    return (
        await asyncio_detailed(
            client=client,
            page=page,
            page_size=page_size,
            pagesize=pagesize,
            search=search,
            order=order,
        )
    ).parsed

from http import HTTPStatus
from typing import Any
from urllib.parse import quote
from uuid import UUID

import httpx

from ... import errors
from ...client import AuthenticatedClient, Client
from ...models.get_user_keys_response_200 import GetUserKeysResponse200
from ...types import UNSET, Response, Unset


def _get_kwargs(
    org_id: UUID,
    *,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
) -> dict[str, Any]:

    params: dict[str, Any] = {}

    params["page"] = page

    params["pageSize"] = page_size

    params["pagesize"] = pagesize

    params = {k: v for k, v in params.items() if v is not UNSET and v is not None}

    _kwargs: dict[str, Any] = {
        "method": "get",
        "url": "/api/identity/orgs/{org_id}/users/keys".format(
            org_id=quote(str(org_id), safe=""),
        ),
        "params": params,
    }

    return _kwargs


def _parse_response(
    *, client: AuthenticatedClient | Client, response: httpx.Response
) -> GetUserKeysResponse200 | str | None:
    if response.status_code == 200:
        response_200 = GetUserKeysResponse200.from_dict(response.json())

        return response_200

    if response.status_code == 401:
        response_401 = response.text
        return response_401

    if response.status_code == 404:
        response_404 = response.text
        return response_404

    if response.status_code == 500:
        response_500 = response.text
        return response_500

    if client.raise_on_unexpected_status:
        raise errors.UnexpectedStatus(response.status_code, response.content)
    else:
        return None


def _build_response(
    *, client: AuthenticatedClient | Client, response: httpx.Response
) -> Response[GetUserKeysResponse200 | str]:
    return Response(
        status_code=HTTPStatus(response.status_code),
        content=response.content,
        headers=response.headers,
        parsed=_parse_response(client=client, response=response),
    )


def sync_detailed(
    org_id: UUID,
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
) -> Response[GetUserKeysResponse200 | str]:
    """Get User Keys

     Get all keys based on roles assigned to user

    Args:
        org_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[GetUserKeysResponse200 | str]
    """

    kwargs = _get_kwargs(
        org_id=org_id,
        page=page,
        page_size=page_size,
        pagesize=pagesize,
    )

    response = client.get_httpx_client().request(
        **kwargs,
    )

    return _build_response(client=client, response=response)


def sync(
    org_id: UUID,
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
) -> GetUserKeysResponse200 | str | None:
    """Get User Keys

     Get all keys based on roles assigned to user

    Args:
        org_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        GetUserKeysResponse200 | str
    """

    return sync_detailed(
        org_id=org_id,
        client=client,
        page=page,
        page_size=page_size,
        pagesize=pagesize,
    ).parsed


async def asyncio_detailed(
    org_id: UUID,
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
) -> Response[GetUserKeysResponse200 | str]:
    """Get User Keys

     Get all keys based on roles assigned to user

    Args:
        org_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[GetUserKeysResponse200 | str]
    """

    kwargs = _get_kwargs(
        org_id=org_id,
        page=page,
        page_size=page_size,
        pagesize=pagesize,
    )

    response = await client.get_async_httpx_client().request(**kwargs)

    return _build_response(client=client, response=response)


async def asyncio(
    org_id: UUID,
    *,
    client: AuthenticatedClient | Client,
    page: int | Unset = UNSET,
    page_size: int | Unset = UNSET,
    pagesize: int | Unset = UNSET,
) -> GetUserKeysResponse200 | str | None:
    """Get User Keys

     Get all keys based on roles assigned to user

    Args:
        org_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.
        page (int | Unset):
        page_size (int | Unset):
        pagesize (int | Unset):

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        GetUserKeysResponse200 | str
    """

    return (
        await asyncio_detailed(
            org_id=org_id,
            client=client,
            page=page,
            page_size=page_size,
            pagesize=pagesize,
        )
    ).parsed

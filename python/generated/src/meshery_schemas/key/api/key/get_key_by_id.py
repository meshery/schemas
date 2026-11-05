from http import HTTPStatus
from typing import Any
from urllib.parse import quote
from uuid import UUID

import httpx

from ... import errors
from ...client import AuthenticatedClient, Client
from ...models.get_key_by_id_response_200 import GetKeyByIdResponse200
from ...types import Response


def _get_kwargs(
    key_id: UUID,
) -> dict[str, Any]:

    _kwargs: dict[str, Any] = {
        "method": "get",
        "url": "/api/auth/keys/{key_id}".format(
            key_id=quote(str(key_id), safe=""),
        ),
    }

    return _kwargs


def _parse_response(
    *, client: AuthenticatedClient | Client, response: httpx.Response
) -> GetKeyByIdResponse200 | str | None:
    if response.status_code == 200:
        response_200 = GetKeyByIdResponse200.from_dict(response.json())

        return response_200

    if response.status_code == 400:
        response_400 = response.text
        return response_400

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
) -> Response[GetKeyByIdResponse200 | str]:
    return Response(
        status_code=HTTPStatus(response.status_code),
        content=response.content,
        headers=response.headers,
        parsed=_parse_response(client=client, response=response),
    )


def sync_detailed(
    key_id: UUID,
    *,
    client: AuthenticatedClient | Client,
) -> Response[GetKeyByIdResponse200 | str]:
    """Get key by ID

    Args:
        key_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[GetKeyByIdResponse200 | str]
    """

    kwargs = _get_kwargs(
        key_id=key_id,
    )

    response = client.get_httpx_client().request(
        **kwargs,
    )

    return _build_response(client=client, response=response)


def sync(
    key_id: UUID,
    *,
    client: AuthenticatedClient | Client,
) -> GetKeyByIdResponse200 | str | None:
    """Get key by ID

    Args:
        key_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        GetKeyByIdResponse200 | str
    """

    return sync_detailed(
        key_id=key_id,
        client=client,
    ).parsed


async def asyncio_detailed(
    key_id: UUID,
    *,
    client: AuthenticatedClient | Client,
) -> Response[GetKeyByIdResponse200 | str]:
    """Get key by ID

    Args:
        key_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        Response[GetKeyByIdResponse200 | str]
    """

    kwargs = _get_kwargs(
        key_id=key_id,
    )

    response = await client.get_async_httpx_client().request(**kwargs)

    return _build_response(client=client, response=response)


async def asyncio(
    key_id: UUID,
    *,
    client: AuthenticatedClient | Client,
) -> GetKeyByIdResponse200 | str | None:
    """Get key by ID

    Args:
        key_id (UUID): A Universally Unique Identifier used to uniquely identify entities in
            Meshery. The UUID core definition is used across different schemas.

    Raises:
        errors.UnexpectedStatus: If the server returns an undocumented status code and Client.raise_on_unexpected_status is True.
        httpx.TimeoutException: If the request takes longer than Client.timeout.

    Returns:
        GetKeyByIdResponse200 | str
    """

    return (
        await asyncio_detailed(
            key_id=key_id,
            client=client,
        )
    ).parsed

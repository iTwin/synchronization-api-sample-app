/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { storage_connection_create } from '../models/storage_connection_create';
import type { storage_connection_response } from '../models/storage_connection_response';
import type { storage_run_response } from '../models/storage_run_response';
import type { storage_runs_prefer_return_representation } from '../models/storage_runs_prefer_return_representation';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StorageConnectionsService {
  /**
   * Update StorageConnection
   * ---
   *
   * Update an existing StorageConnection.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Associated entities
   *
   * A connection is linked with an iModel. The iModel ID is required to be set when updating a StorageConnection.
   *
   * ---
   *
   * @param connectionId Connection Id
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns storage_connection_response Connection successfully updated.
   * @throws ApiError
   */
  public static updateStorageConnection(
    connectionId: string,
    authorization: string,
    requestBody?: storage_connection_create,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_connection_response> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/imodels/storageConnections/{connectionId}',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `This response indicates that the specified connection not found.`,
        422: `Invalid request to update connection. Request payload might be missing some of the required properties.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Delete StorageConnection
   * ---
   *
   * Delete connection
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   *
   * ---
   *
   * @param connectionId Connection Id
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static deleteStorageConnection(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/imodels/storageConnections/{connectionId}',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `This response indicates that the specified connection not found.`,
        422: `Invalid request to delete connection.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get Storage Connection
   * ---
   *
   * Retrieves a StorageConnection with the specified ID.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ---
   * @param connectionId Connection Id
   * @param authorization OAuth access token with scope `synchronization:read`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns storage_connection_response OK
   * @throws ApiError
   */
  public static getStorageConnection(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_connection_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/storageConnections/{connectionId}',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to get specified connection.`,
        404: `This response indicates that the specified connection not found.`,
        422: `Invalid request to get a connection.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Create StorageConnection
   * ---
   *
   * Create a StorageConnection that describes files from Storage to synchronize to the iModel.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Associated entities
   *
   * A connection is linked with an iModel. An iModel ID is required to be set when creating a StorageConnection.
   *
   * ---
   *
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns storage_connection_response Connection successfully created.
   * @throws ApiError
   */
  public static createStorageConnection(
    authorization: string,
    requestBody?: storage_connection_create,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_connection_response> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/imodels/storageConnections',
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        409: `One or more SourceFiles are already mapped to the iModel.`,
        422: `Invalid request to create connection. Request payload might be missing some of the required properties.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Run StorageConnection
   * ---
   *
   * Runs the specified StorageConnection.
   *
   * ### Notes
   *
   * When a run is successfully created, the operation returns HTTP status code 202/accepted - the request is accepted for processing and will execute in background. The response will include a location header pointing to the created run. If an existing active run already exists for the iModel, a new run is not initiated, instead 303/see other is returned along with location header pointing to that existing active run.
   * In the rare event that multiple create run requests are being made simultaneously, only the first request is processed and 409/conflict is returned for others.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ---
   * @param connectionId Connection Id
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns any Accepted
   * @throws ApiError
   */
  public static runStorageConnection(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/imodels/storageConnections/{connectionId}/run',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        303: `This response indicates that an active run is in progress and link is provided in location header.`,
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to run specified connection.`,
        404: `This response indicates that the specified connection not found.`,
        409: `A run request is already being processed.`,
        422: `Invalid request to get run connection.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get StorageConnection Runs
   * ---
   *
   * Retrieves all Runs for the specified connection.
   *
   * ### Notes
   *
   * The `Prefer` header can be used to specify how much result metadata is desired by the client. The `Prefer` request header field is used to indicate that particular server behaviors are preferred by the client but are not required for successful completion of the request.
   *
   * This operation supports `"return=representation"` and `"return=minimal"` preferences.
   *
   * The `"return=representation"` preference indicates that the client prefers that the server include an entity representing the current state of the resource in the response to a successful request.
   * The `"return=minimal"` preference indicates that the client wishes the server to return only a minimal response to a successful request. This is the default preference if `Prefer` header is not specified.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ---
   * @param connectionId Connection Id
   * @param authorization OAuth access token with scope `synchronization:read`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns storage_runs_prefer_return_minimal OK
   * @throws ApiError
   */
  public static getStorageConnectionRuns(
    connectionId: string,
    authorization: string,
    prefer?: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_runs_prefer_return_representation> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/storageConnections/{connectionId}/runs',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
        Prefer: prefer,
      },
      query: {
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to get specified connection runs.`,
        422: `Invalid request to get connection.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get Storage Connection Run
   * ---
   *
   * Retrieves a StorageConnection Run with the specified ID.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ---
   * @param connectionId Connection Id
   * @param runId Run Id
   * @param authorization OAuth access token with scope `synchronization:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns storage_run_response OK
   * @throws ApiError
   */
  public static getStorageConnectionRun(
    connectionId: string,
    runId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_run_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/storageConnections/{connectionId}/runs/{runId}',
      path: {
        connectionId: connectionId,
        runId: runId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to get specified connection run.`,
        404: `This response indicates that the specified connection run not found.`,
        422: `Invalid request to get connection run.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }
}

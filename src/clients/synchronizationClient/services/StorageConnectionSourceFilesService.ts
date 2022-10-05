/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { storage_file_create } from '../models/storage_file_create';
import type { storage_file_prefer_return_minimal } from '../models/storage_file_prefer_return_minimal';
import type { storage_file_response } from '../models/storage_file_response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StorageConnectionSourceFilesService {
  /**
   * Update StorageConnection SourceFile
   * ---
   *
   * Update an existing StorageConnection SourceFile.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Associated entities
   * SourceFile is related to a Connection. The path must contain a valid Connection ID.
   *
   * ---
   *
   * @param connectionId Connection Id
   * @param sourceFileId
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns storage_file_response Connection sourceFile successfully updated.
   * @throws ApiError
   */
  public static updateStorageConnectionSourcefile(
    connectionId: string,
    sourceFileId: string,
    authorization: string,
    requestBody?: storage_file_create,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_file_response> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/imodels/storageConnections/{connectionId}/sourcefiles/{sourceFileId}',
      path: {
        connectionId: connectionId,
        sourceFileId: sourceFileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `This response indicates that one of the associated entities could not be found.`,
        422: `Invalid request to update connection sourcefile. Request payload might be missing some of the required properties.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get StorageConnection SourceFile
   * ---
   *
   * Retrieves StorageConnection's SourceFile with the specified ID.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ---
   * @param connectionId Connection Id
   * @param sourceFileId
   * @param authorization OAuth access token with scope `synchronization:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns storage_file_response OK
   * @throws ApiError
   */
  public static getStorageConnectionSourcefile(
    connectionId: string,
    sourceFileId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_file_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/storageConnections/{connectionId}/sourcefiles/{sourceFileId}',
      path: {
        connectionId: connectionId,
        sourceFileId: sourceFileId,
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
        400: `Invalid request to get connection sourceFile`,
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to get specified connection sourceFile.`,
        404: `This response indicates that the specified connection sourceFile not found.`,
        422: `Invalid request to get connection sourcefile.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Remove StorageConnection SourceFile
   * ---
   *
   * Delete StorageConnection SourceFile
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
   * @param sourceFileId SourceFile Id
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static removeStorageConnectionSourcefile(
    connectionId: string,
    sourceFileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/imodels/storageConnections/{connectionId}/sourcefiles/{sourceFileId}',
      path: {
        connectionId: connectionId,
        sourceFileId: sourceFileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `This response indicates that one of the associated entities could not be found.`,
        422: `Invalid request to remove connection sourcefile.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get StorageConnection SourceFiles
   * ---
   *
   * Retrieves SourceFiles for specified StorageConnection.
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
   * @returns storage_file_prefer_return_minimal OK
   * @throws ApiError
   */
  public static getStorageConnectionSourcefiles(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_file_prefer_return_minimal> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/storageConnections/{connectionId}/sourcefiles',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to get specified connection sourceFiles.`,
        422: `Invalid request to get connection sourcefiles.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Add StorageConnection SourceFile
   * ---
   *
   * Add a new Storage Source File to a Storage Connection
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Associated entities
   * SourceFile is added to a Connection. The reuqest path must contain a valid Connection ID
   *
   * ---
   *
   * @param connectionId Connection Id
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns storage_file_response Storage Connection sourceFile successfully added.
   * @throws ApiError
   */
  public static addStorageConnectionSourcefile(
    connectionId: string,
    authorization: string,
    requestBody?: storage_file_create,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<storage_file_response> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/imodels/storageConnections/{connectionId}/sourcefiles',
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
        409: `The SourceFile is already mapped to the iModel.`,
        422: `Invalid request to add connection sourcefile. Request payload might be missing some of the required properties.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }
}

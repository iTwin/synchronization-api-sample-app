/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { manifest_connection_create } from '../models/manifest_connection_create';
import type { manifest_connection_response } from '../models/manifest_connection_response';
import type { manifest_run_create } from '../models/manifest_run_create';
import type { manifest_run_response } from '../models/manifest_run_response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ManifestConnectionsService {
  /**
   * Get Manifest Connection
   * ---
   *
   * Retrieves a ManifestConnection with the specified ID.
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
   * @returns manifest_connection_response OK
   * @throws ApiError
   */
  public static getManifestConnection(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<manifest_connection_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/manifestConnections/{connectionId}',
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
        404: `This response indicates that the specified connection was not found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Delete ManifestConnection
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
  public static deleteManifestConnection(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/imodels/manifestConnections/{connectionId}',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `This response indicates that the specified connection was not found.`,
        422: `Invalid request to delete connection.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Create ManifestConnection
   * ---
   *
   * Create a ManifestConnection that describes which files from a manifest will be synchronized to the iModel.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Associated entities
   *
   * A connection is linked with an iModel. An iModel ID is required to be set when creating a ManifestConnection.
   *
   * ---
   *
   * @param authorization OAuth access token with scope `synchronization:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns manifest_connection_response Connection successfully created.
   * @throws ApiError
   */
  public static createManifestConnection(
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json',
    requestBody?: manifest_connection_create
  ): CancelablePromise<manifest_connection_response> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/imodels/manifestConnections',
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
   * Get ManifestConnection Run
   * ---
   *
   * Retrieves a ManifestConnection Run with the specified ID.
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
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns manifest_run_response OK
   * @throws ApiError
   */
  public static getManifestConnectionRun(
    connectionId: string,
    runId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<manifest_run_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/manifestConnections/{connectionId}/runs/{runId}',
      path: {
        connectionId: connectionId,
        runId: runId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
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

  /**
   * Create ManifestConnection Run
   * ---
   *
   * Runs the specified ManifestConnection.
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
   * @param requestBody
   * @returns string Accepted
   * @throws ApiError
   */
  public static createManifestConnectionRun(
    connectionId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json',
    requestBody?: manifest_run_create
  ): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/imodels/manifestConnections/{connectionId}/runs',
      path: {
        connectionId: connectionId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      body: requestBody,
      mediaType: 'application/json',
      responseHeader: 'Location',
      errors: {
        303: `This response indicates that an active run is in progress and link is provided in location header.`,
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to run specified connection.`,
        404: `This response indicates that the specified connection not found.`,
        409: `A run request is already being processed.`,
        422: `Invalid request to create a connection run.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }
}

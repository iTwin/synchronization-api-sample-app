/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { connections_prefer_return_minimal } from '../models/connections_prefer_return_minimal';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConnectionsService {
  /**
   * Get Connections
   * ---
   *
   * Retrieves connections for the specified iModel.
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
   * @param imodelId iModel Id
   * @param authorization OAuth access token with scope `synchronization:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns connections_prefer_return_minimal OK
   * @throws ApiError
   */
  public static getConnections(
    imodelId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<connections_prefer_return_minimal> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/connections',
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        imodelId: imodelId,
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        403: `This response indicates that user does not have required permissions to get specified connections.`,
        422: `Invalid request to get connections.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }
}

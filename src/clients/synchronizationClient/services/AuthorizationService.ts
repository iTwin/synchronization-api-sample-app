/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { authorization_information_response } from '../models/authorization_information_response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthorizationService {
  /**
   * Get AuthorizationInformation
   * ---
   *
   * Retrieves the calling user's AuthorizationInformation.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `synchronization:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ---
   * @param redirectUrl URL to redirect back to after authorization
   * @param authorization OAuth access token with scope `synchronization:read`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns authorization_information_response OK
   * @throws ApiError
   */
  public static getAuthorizationInformation(
    redirectUrl: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<authorization_information_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/imodels/connections/authorizationInformation',
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        redirectUrl: redirectUrl,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        422: `Invalid request to get a connection.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }
}

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { UserManager } from 'oidc-client';
import { client_id, authority } from '../env';

const scopes =
  'itwin-platform';

/**
 * Authentication uses OAuth2 flow assisted by `oidc-client` package.
 * In this function we simply create `UserManager` which can be used for signing in and redirecting to
 * post-login page for initializing `User` object. `User` is necessary for this application to function as
 * all further requests will require `User#access_token` for Authorization header.
 *
 * The `scopes` and `client_id` are copied from your application at iTwin Developer Platform (found under My Apps).
 * `client_id` must be set in .env file at project root.
 *
 * See `app.tsx`, `auth/login.tsx`, `auth/authContext.tsx`, `auth/completeSignIn.tsx`
 * for authentication flow implementation details.
 */
export const createUserManager = () => {
  return new UserManager({
    authority,
    client_id,
    redirect_uri: `${window.location.origin}/signin-oidc`,
    silent_redirect_uri: `${window.location.origin}/silent-signin-oidc`, //Not Implemented
    automaticSilentRenew: true,
    response_type: 'code',
    query_status_response_type: 'code',
    scope: scopes,
    post_logout_redirect_uri: `${window.location.origin}/signout-oidc`, //Not implemented
  });
};

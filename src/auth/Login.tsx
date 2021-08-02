/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { RouteComponentProps } from '@reach/router';
import { useEffect } from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { useAuthContext } from './AuthContext';

/**
 * First step in the authentication flow. Application will redirect to this page in case
 * `user` object is not initialized or it has expired.
 *
 * Will call `userManager#signinRedirect` function which will manage sign-in for us
 * by implementing OpenID Connect protocol. At this point, we will save our current location
 * by passing in `{state: { from: window.location.href }}` and then get navigated to Bentley sign in page.
 */
export const Login = (_props: RouteComponentProps<{}>) => {
  const { user, userManager } = useAuthContext();
  useEffect(() => {
    const fetchUser = () => {
      userManager?.signinRedirect({
        state: { from: window.location.href },
      });
    };
    if (user === null || user.expired) {
      fetchUser();
    }
  }, [user, userManager]);

  return <LoadingOverlay text="Logging in..." />;
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useEffect } from 'react';
import { User } from 'oidc-client';
import { useAuthContext } from './AuthContext';
import { navigate, RouteComponentProps } from '@reach/router';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';

/**
 * This page is a final post-login step that is navigated to after
 * we are finished signing in at Bentley's authorization endpoint.
 *
 * This page simply initializes our global `user` object and navigates to the last pre-login
 * location that was saved in `auth/Login.tsx` page.
 */
export const CompleteSignIn = (_props: RouteComponentProps<{}>) => {
  const { userManager, setUser } = useAuthContext();
  useEffect(() => {
    userManager?.signinRedirectCallback().then((user: User) => {
      setUser(user);
      navigate(user.state.from);
    });
  }, [userManager, setUser]);
  return <LoadingOverlay text="Completing sign in..." />;
};

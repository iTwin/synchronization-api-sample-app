/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useEffect } from 'react';
import { User } from 'oidc-client';
import { useAuthContext } from './authContext';
import { navigate, RouteComponentProps } from '@reach/router';
import { LoadingOverlay } from '../components/loadingOverlay/loadingOverlay';

export const CompleteSignIn = (props: RouteComponentProps<{}>) => {
  const { userManager, setUser } = useAuthContext();
  useEffect(() => {
    userManager?.signinRedirectCallback().then((user: User) => {
      setUser(user);
      navigate(user.state.from);
    });
  }, [userManager, setUser]);
  return <LoadingOverlay text="Completing sign in..." />;
};

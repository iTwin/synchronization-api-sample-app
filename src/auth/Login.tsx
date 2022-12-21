/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { RouteComponentProps } from '@reach/router';
import { useEffect } from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { useAuthContext } from './AuthContext';

export const Login = (props: RouteComponentProps<{}>) => {
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

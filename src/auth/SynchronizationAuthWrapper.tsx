/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { navigate, RouteComponentProps } from '@reach/router';
import { User } from 'oidc-client';
import { useEffect, useState } from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { definitions } from '../dto/synchronization';
import { apiDomain } from '../setup';

type AuthorizationInformationDTO = {
  authorizationInformation: definitions['AuthorizationInformation'];
};

export interface SynchronizationAuthWrapperProps {
  user: User;
  children: React.ReactNode;
}

export const SynchronizationAuthWrapper = (
  props: RouteComponentProps & SynchronizationAuthWrapperProps
) => {
  const { user, children } = props;
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const authorizeAsync = async () => {
      const requestHeaders = {
        Authorization: `Bearer ${user.access_token}`,
      };

      const authInfo: AuthorizationInformationDTO = await (
        await fetch(
          `${apiDomain}/synchronization/imodels/connections/authorizationInformation?redirectUrl=${window.location.href}`,
          { headers: requestHeaders }
        )
      ).json();
      if (!authInfo.authorizationInformation.isUserAuthorized) {
        const authRedirectUrl =
          authInfo.authorizationInformation._links.authorizationUrl.href;
        navigate(authRedirectUrl);
      } else {
        setIsAuthorized(true);
      }
    };

    authorizeAsync();
  }, [user]);

  return (
    <>
      {isAuthorized ? (
        children
      ) : (
        <LoadingOverlay text="Authorizing for synchronization" />
      )}
    </>
  );
};

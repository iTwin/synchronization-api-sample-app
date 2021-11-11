/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button } from '@itwin/itwinui-react';
import { RouteComponentProps } from '@reach/router';
import { User } from 'oidc-client';
import { useEffect, useState } from 'react';
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
  const [authorizationUrl, setAuthorizationUrl] = useState<string | null>(null);

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
        setAuthorizationUrl(authRedirectUrl);
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
      ) : authorizationUrl ? (
        <div className="auth-wrapper-container">
          <Button
            onClick={() => {
              window.open(authorizationUrl);
              setIsAuthorized(true);
              setAuthorizationUrl(null);
            }}
          >
            Authenticate
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

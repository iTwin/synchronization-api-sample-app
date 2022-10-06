/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useAuthContext } from './auth/authContext';
import { LocationProvider, Router } from '@reach/router';
import { Layout } from './components/layout/layout';
import './app.scss';
import { CompleteSignIn } from './auth/completeSignIn';
import { Login } from './auth/login';
import { SynchronizationAuthWrapper } from './auth/synchronizationAuthWrapper';
import { SyncView } from './components/syncView/syncView';

/**
 * Application entry point, uses `@reach/router` package for managing navigation.
 * Refer to each component here for more details about each page.
 */
function App() {
  const { user } = useAuthContext();

  return (
    <LocationProvider>
      <Layout>
        <Router>
          <CompleteSignIn path="/signin-oidc" />
          {user === null || user.expired ? (
            <>
              <Login path="/*" />
            </>
          ) : (
            <SynchronizationAuthWrapper path="/" user={user}>
              <SyncView path="/" />
            </SynchronizationAuthWrapper>
          )}
        </Router>
      </Layout>
    </LocationProvider>
  );
}

export default App;

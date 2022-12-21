/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useAuthContext } from './auth/AuthContext';
import { LocationProvider, Router } from '@reach/router';
import { Layout } from './components/Layout/Layout';
import './App.scss';
import { CompleteSignIn } from './auth/CompleteSignIn';
import { Login } from './auth/Login';
import { SynchronizationAuthWrapper } from './auth/SynchronizationAuthWrapper';
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

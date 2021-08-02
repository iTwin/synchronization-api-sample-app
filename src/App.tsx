/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useAuthContext } from './auth/AuthContext';
import { LocationProvider, Router } from '@reach/router';
import { ConnectionsPage } from './components/ConnectionsPage/ConnectionsPage';
import { NewConnectionPage } from './components/NewConnectionPage/NewConnectionPage';
import { Layout } from './components/Layout/Layout';
import './App.scss';
import { CompleteSignIn } from './auth/CompleteSignIn';
import { Login } from './auth/Login';
import { ConnectionRunsPage } from './components/ConnectionRunsPage/ConnectionRunsPage';
import { SynchronizationAuthWrapper } from './auth/SynchronizationAuthWrapper';

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
              <ConnectionsPage path="/" />
              <NewConnectionPage path="newConnection" />
              <ConnectionRunsPage path=":connectionId" />
            </SynchronizationAuthWrapper>
          )}
        </Router>
      </Layout>
    </LocationProvider>
  );
}

export default App;

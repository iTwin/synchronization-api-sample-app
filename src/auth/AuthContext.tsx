/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { User, UserManager } from 'oidc-client';
import React, { useContext, useEffect, useState } from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { createUserManager } from './userManager';

export interface IAuthContext {
  user: User | null;
  authorization: string;
  setUser: (user: User) => void;
  userManager: UserManager | null;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext
);

/**
 * This context provider essentially acts as a `user` and `userManager` global variable provider.
 * `user` will be required by every request for providing Bearer token for Authorization header.
 * `userManager` is used for managing signing in and providing `user` object.
 */
export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authorization, setAuthorization] = useState('');
  const [userManager, setUserManager] = useState<UserManager | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const userManager = createUserManager();
      const user = await userManager.getUser();
      setUserManager(userManager);
      setUser(user);
      setIsLoaded(true);
    };

    initializeUser();
  }, []);

  useEffect(() => {
    setAuthorization(`Bearer ${user?.access_token}`);
  }, [user]);

  return isLoaded ? (
    <AuthContext.Provider value={{ user, setUser, userManager, authorization }}>
      {children}
    </AuthContext.Provider>
  ) : (
    <LoadingOverlay text="" />
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

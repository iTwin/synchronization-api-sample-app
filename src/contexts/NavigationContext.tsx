/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React, { Dispatch, SetStateAction, useContext } from 'react';
import { definitions } from '../dto/synchronization';

type ConnectionDTO = definitions['Connection'];

export interface INavigationContext {
  setConnection: Dispatch<SetStateAction<ConnectionDTO | null>>;
}

export const NavigationContext = React.createContext<INavigationContext>(
  {} as INavigationContext
);

export const useNavigationContext = () => {
  return useContext(NavigationContext);
};

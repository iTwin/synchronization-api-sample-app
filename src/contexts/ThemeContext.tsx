/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, useState } from 'react';
import { ThemeProvider, ThemeType } from '@itwin/itwinui-react';

export interface IThemeContext {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<IThemeContext>(
  {} as IThemeContext
);

export const ThemeContextProvider = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeType>('light');
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React, { useMemo, useState } from 'react';
import {
  Footer,
  Header,
  HeaderBreadcrumbs,
  HeaderButton,
  HeaderLogo,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgImodelHollow, SvgMoon, SvgSun } from '@itwin/itwinui-icons-react';
import './Layout.scss';
import { useThemeContext } from '../../contexts/ThemeContext';
import { NavigationContext } from '../../contexts/NavigationContext';
import { navigate, useMatch } from '@reach/router';
import { useAuthContext } from '../../auth/AuthContext';
import { definitions } from '../../dto/synchronization';

type ConnectionDTO = definitions['Connection'];

export interface LayoutProps {
  children: React.ReactNode;
}

export interface BreadCrumb {
  key: string;
  name: string;
  path: string;
}

/**
 * This component provides page layout which should be used for rendering all page components.
 * Its needed for rendering Header, Footer and providing some layout styles for pages.
 */
export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { theme, setTheme } = useThemeContext();
  const { user } = useAuthContext();
  const connectionsPageMatch = useMatch('/');
  const newConnectionsPageMatch = useMatch('/newConnection');
  const connectionRunsPageMatch = useMatch('/:connectionId');
  const [connection, setConnection] = useState<ConnectionDTO | null>(null);

  /**
   * Breadcrumbs used in Header for navigation. We use `@reach/router`'s `useMatch` hooks that use location
   * listener and return an object in case our location matches. If it doesn't match, null is returned.
   */
  const breadcrumbs = useMemo<BreadCrumb[]>(() => {
    if (!user) {
      return [];
    }
    if (connectionsPageMatch) {
      return [{ name: 'Home', key: 'home', path: '/' }];
    }
    if (newConnectionsPageMatch) {
      return [
        { name: 'Home', key: 'home', path: '/' },
        {
          name: 'New connection',
          key: 'newConnection',
          path: newConnectionsPageMatch.uri,
        },
      ];
    }
    if (connectionRunsPageMatch) {
      return [
        { name: 'Home', key: 'home', path: '/' },
        {
          name: connection?.displayName ?? 'Loading connection...',
          key: 'connection',
          path: connectionRunsPageMatch.uri,
        },
      ];
    }

    return [];
  }, [
    connection?.displayName,
    connectionRunsPageMatch,
    connectionsPageMatch,
    newConnectionsPageMatch,
    user,
  ]);

  return (
    <div className="app-container">
      <Header
        appLogo={
          <HeaderLogo logo={<SvgImodelHollow />}>iTwin Application</HeaderLogo>
        }
        breadcrumbs={
          <HeaderBreadcrumbs
            items={breadcrumbs.map((bc, index) => (
              <HeaderButton
                key={bc.key}
                name={bc.name}
                onClick={() => {
                  navigate(bc.path);
                }}
                isActive={index === breadcrumbs.length - 1}
              />
            ))}
          />
        }
        actions={[
          <IconButton
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
            }}
            styleType="borderless"
          >
            {theme === 'light' ? <SvgSun /> : <SvgMoon />}
          </IconButton>,
        ]}
      />
      <div className="content-and-footer">
        <NavigationContext.Provider value={{ setConnection }}>
          <div className="app-content">{children}</div>
        </NavigationContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

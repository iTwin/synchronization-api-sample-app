/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import { Footer, Header, HeaderLogo } from '@itwin/itwinui-react';
import { SvgImodelHollow } from '@itwin/itwinui-icons-react';
import './Layout.scss';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className="app-container">
      <Header
        appLogo={
          <HeaderLogo logo={<SvgImodelHollow />}>iTwin Application</HeaderLogo>
        }
      />
      <div className="content-and-footer">
        <div className="app-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

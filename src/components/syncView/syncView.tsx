/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { RouteComponentProps } from '@reach/router';
import './syncView.scss';
import { Title } from '@itwin/itwinui-react';
import { IModelFilesTable } from '../iModelFilesTable/iModelFilesTable';

export const SyncView = (props: RouteComponentProps) => {
  const headerText = 'Synchronized files';
  return (
    <div className="page-layout">
      <div className="column">
        <Title>{headerText}</Title>
        <div className="file-table">
          <IModelFilesTable />
        </div>
      </div>
    </div>
  );
};

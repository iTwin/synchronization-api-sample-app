/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Table } from '@itwin/itwinui-react';
import { useState } from 'react';
import { getFileIcon } from '../fileIcon/fileIcon';
import { utcTimeStringToFormattedDateTime } from '../../services/uiUtils/dateFormatter';
import { getFormattedFileRunStatus } from '../../services/uiUtils/fileStatusFormatter';
import { DragAndDrop } from '../dragAndDrop/dragAndDrop';
import { FileRun, State, Status } from '../../typedef/types';
import { useConnectionFileRunHandle } from '../../hooks/useConnectionFileRunHandle';
import './iModelFilesTable.scss';

/*
 * IModelFilesTable a component represents and manages all data about iModel Files
 */
export const IModelFilesTable = () => {
  const [workflowStatus, setWorkflowStatus] = useState<Status | null>(null);
  const disableDropping = workflowStatus?.state === State.InProgress;

  const workflowStatusHandler = (state: Status | null) => {
    if (state !== workflowStatus) {
      setWorkflowStatus(state);
    }
  };

  const [connectionFilesWithLastRun] = useConnectionFileRunHandle(
    workflowStatus,
    workflowStatusHandler
  );

  const areRunsLoading: boolean = !connectionFilesWithLastRun;
  const showDefaultOverlay = connectionFilesWithLastRun?.length === 0;

  return (
    <DragAndDrop
      handleWorkflowStatus={workflowStatusHandler}
      disableDropping={disableDropping}
      showDefaultOverlay={showDefaultOverlay}
      areRunsLoading={areRunsLoading}
    >
      <Table<{ [P in keyof FileRun]: FileRun[P] }>
        columns={[
          {
            Header: 'Table',
            columns: [
              {
                id: 'fileType',
                Header: 'File Type',
                accessor: 'displayName',
                maxWidth: 75,
                minWidth: 50,
                Cell: ({ row: { original } }) => {
                  return (
                    <div className="align-file-icon">
                      {getFileIcon(original)}
                    </div>
                  );
                },
              },
              {
                id: 'name',
                Header: 'Name',
                accessor: 'displayName',
                minWidth: 120,
              },
              {
                id: 'connector',
                Header: 'Connector',
                accessor: 'connectorType',
                minWidth: 120,
                maxWidth: 200,
              },
              {
                id: 'state',
                Header: 'State',
                accessor: 'displayName',
                minWidth: 130,
                maxWidth: 220,
                Cell: ({ row: { original } }) => {
                  return (
                    <div>
                      {getFormattedFileRunStatus(original, workflowStatus)}
                    </div>
                  );
                },
              },
              {
                id: 'lastSync',
                Header: 'Last sync',
                accessor: 'id',
                minWidth: 100,
                maxWidth: 300,
                Cell: ({ row: { original } }) => {
                  const formattedDate = utcTimeStringToFormattedDateTime(
                    original?.endDateTime || null
                  );
                  return <div>{formattedDate}</div>;
                },
              },
            ],
          },
        ]}
        data={connectionFilesWithLastRun ?? []}
        emptyTableContent="No synchronized files."
        isLoading={areRunsLoading}
      />
    </DragAndDrop>
  );
};

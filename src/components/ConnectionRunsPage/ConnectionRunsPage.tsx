/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  SvgPlay,
  SvgPropertiesList,
  SvgRefresh,
} from '@itwin/itwinui-icons-react';
import {
  Button,
  ButtonGroup,
  Headline,
  IconButton,
  Table,
} from '@itwin/itwinui-react';
import { RouteComponentProps } from '@reach/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CellProps, Column } from 'react-table';
import { useAuthContext } from '../../auth/AuthContext';
import { definitions } from '../../dto/synchronization';
import { iModelID } from '../../env';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';
import './ConnectionRunsPage.scss';
import { TasksModal } from '../TasksModal/TasksModal';
import { mapResultToIcon, mapStateToIcon } from './iconMapping';
import { useNavigationContext } from '../../contexts/NavigationContext';
import { apiDomain } from '../../setup';

type RunsDTO = definitions['runs-prefer-return-representation'];
type RunDTO = definitions['Run'];
type ConnectionDTO = definitions['Connection'];

export interface ConnectionRunsPageProps {
  connectionId: string;
}

export const ConnectionRunsPage = (
  props: RouteComponentProps<ConnectionRunsPageProps>
) => {
  const { connectionId } = props;
  const { user } = useAuthContext();
  const { setConnection } = useNavigationContext();
  const [connectionData, setConnectionData] =
    useState<ConnectionDTO | null>(null);
  const [runsData, setRunsData] = useState<RunsDTO | null>(null);
  const [selectedRun, setSelectedRun] = useState<RunDTO | null>(null);
  const [isRunInitializing, setIsRunInitializing] = useState(false);

  const fetchRunsData = useCallback(async () => {
    const requestHeaders = {
      Authorization: `Bearer ${user?.access_token}`,
      Prefer: 'return=representation',
    };
    setRunsData(null);

    const getConnectionRunsResponse: RunsDTO = await (
      await fetch(
        `${apiDomain}/synchronization/imodels/storageConnections/${connectionId}/runs?imodelId=${iModelID}`,
        { headers: requestHeaders }
      )
    ).json();
    setRunsData(getConnectionRunsResponse);
  }, [user, connectionId]);

  const runConnection = useCallback(async () => {
    const requestHeaders = {
      Authorization: `Bearer ${user?.access_token}`,
    };
    setIsRunInitializing(true);
    /**
     * [Run Connection](https://developer.bentley.com/api-groups/synchronization/apis/synchronization/operations/run-storage-connection/)
     * A simple POST request that queues a connection for synchronization.
     */
    await fetch(
      `${apiDomain}/synchronization/imodels/storageConnections/${connectionId}/run?imodelId=${iModelID}`,
      { method: 'POST', headers: requestHeaders }
    );
    await fetchRunsData();
    setIsRunInitializing(false);
  }, [user, connectionId, fetchRunsData]);

  useEffect(() => {
    const fetchData = async () => {
      const requestHeaders = {
        Authorization: `Bearer ${user?.access_token}`,
        Prefer: 'return=representation',
      };
      /**
       * (Get Connection Runs)[https://developer.bentley.com/api-groups/synchronization/apis/synchronization/operations/get-storage-connection-runs/]
       * This request fetches a structure that has a fixed `runs <- jobs <- tasks` tree representation
       * (runs at the top, jobs as children and tasks as grandchildren).
       * In this page we chose to display runs only data on the main page table.
       * For each row there is a "Details" button that displays all tasks that are under a specific run.
       */
      const getConnectionResponse: ConnectionDTO = (
        await (
          await fetch(
            `${apiDomain}/synchronization/imodels/storageConnections/${connectionId}?imodelId=${iModelID}`,
            { headers: requestHeaders }
          )
        ).json()
      ).connection;
      setConnectionData(getConnectionResponse);
    };

    fetchData();
  }, [user, connectionId]);

  // Setting connection for navigation header so that it can show `connectionData.displayName`
  useEffect(() => {
    if (connectionData) {
      setConnection(connectionData);
    }
  }, [connectionData, setConnection]);

  // Cleaning up connection so that next revisit on this page doesn't briefly display older connection first.
  useEffect(() => {
    return () => {
      setConnection(null);
    };
  }, [setConnection]);

  useEffect(() => {
    fetchRunsData();
  }, [fetchRunsData]);

  const tableData = useMemo(() => (runsData ? runsData.runs : []), [runsData]);
  const tableColumns = React.useMemo<Column<RunDTO>[]>(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'state',
            Header: 'State',
            Cell: ({ row: { original } }: CellProps<RunDTO>) => {
              return (
                <>
                  <div className="cell-icon">
                    {mapStateToIcon(original.state)}
                  </div>
                  <span>{original.state}</span>
                </>
              );
            },
          },
          {
            id: 'result',
            Header: 'Result',
            Cell: ({ row: { original } }: CellProps<RunDTO>) => {
              return (
                <>
                  <div className="cell-icon">
                    {mapResultToIcon(original.result)}
                  </div>
                  <span>{original.result}</span>
                </>
              );
            },
          },
          {
            id: 'startTime',
            Header: 'Start time',
            Cell: ({ row: { original } }: CellProps<RunDTO>) => {
              return (
                <span>
                  {new Date(original.startDateTime).toLocaleString('en-GB')}
                </span>
              );
            },
          },
          {
            id: 'endTime',
            Header: 'End time',
            Cell: ({ row: { original } }: CellProps<RunDTO>) => {
              return (
                <span>
                  {new Date(original.endDateTime).toLocaleString('en-GB')}
                </span>
              );
            },
          },
          {
            id: 'detailsButton',
            width: 100,
            cellClassName: 'iui-slot',
            columnClassName: 'iui-slot',
            Cell: ({ row: { original } }: CellProps<RunDTO>) => {
              return (
                <Button
                  onClick={() => {
                    setSelectedRun(original);
                  }}
                  startIcon={<SvgPropertiesList />}
                  styleType="borderless"
                  className="full-cell-button"
                >
                  Details
                </Button>
              );
            },
          },
        ],
      },
    ],
    []
  );

  return connectionData !== null ? (
    <>
      <TasksModal
        selectedRun={selectedRun}
        isOpen={selectedRun !== null}
        onClose={() => {
          setSelectedRun(null);
        }}
      />
      <div className="connection-runs-page">
        <Headline>{connectionData.displayName} - Connection runs</Headline>
        <div className="tile-card">
          <div className="table-toolbar">
            <ButtonGroup>
              <Button
                startIcon={<SvgPlay />}
                styleType="high-visibility"
                disabled={isRunInitializing}
                onClick={async () => {
                  await runConnection();
                }}
              >
                Synchronize
              </Button>
              <IconButton
                onClick={() => {
                  fetchRunsData();
                }}
                disabled={runsData === null}
              >
                <SvgRefresh />
              </IconButton>
            </ButtonGroup>
          </div>
          <Table<RunDTO>
            columns={tableColumns}
            data={tableData}
            emptyTableContent="No runs for this connection"
            isLoading={runsData === null}
            className="iui-table-fixed iui-condensed"
          />
        </div>
      </div>
    </>
  ) : (
    <LoadingOverlay text="Loading connection..." />
  );
};

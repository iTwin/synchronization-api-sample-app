/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { SvgAdd } from '@itwin/itwinui-icons-react';
import { Button, Headline, Table } from '@itwin/itwinui-react';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect, useMemo, useState } from 'react';
import { CellProps } from 'react-table';
import { useAuthContext } from '../../auth/AuthContext';
import { definitions } from '../../dto/synchronization';
import { iModelID } from '../../env';
import { apiDomain } from '../../setup';
import { mapResultToIcon } from '../ConnectionRunsPage/iconMapping';
import './ConnectionsPage.scss';

type ConnectionsDTO = definitions['connections-prefer-return-representation'];
type ConnectionDTO = definitions['Connection'];
type RunWrappedDTO = { run: definitions['Run'] };

/**
 * The home page of this application that fetches and displays all connections for a specific iModel.
 */
export const ConnectionsPage = (_props: RouteComponentProps<{}>) => {
  const { user } = useAuthContext();

  const [connectionsData, setConnectionsData] =
    useState<ConnectionsDTO | null>(null);
  const [lastRunMap, setLastRunMap] = useState<Record<string, RunWrappedDTO>>(
    {}
  );
  useEffect(() => {
    const fetchData = async () => {
      const requestHeaders = {
        Authorization: `Bearer ${user?.access_token}`,
        /**
         * We use this header to get full connections information. This convention is followed for
         * several requests. Default is 'return=minimal' which only returns displayName and id objects
         */
        Prefer: 'return=representation',
      };

      /**
       * [Get Connections](https://developer.bentley.com/api-groups/synchronization/apis/synchronization/operations/get-connections/)
       * Fetches all connections for the provided iModel. This data is later mapped to table rows.
       */
      const connectionsData: ConnectionsDTO = await (
        await fetch(
          `${apiDomain}/synchronization/imodels/connections?imodelId=${iModelID}`,
          { method: 'GET', headers: requestHeaders }
        )
      ).json();

      const lastRunMap: Record<string, RunWrappedDTO> = {};
      for (const connection of connectionsData.connections) {
        if (connection._links.lastRun) {
          const lastRunHref = connection._links.lastRun.href;
          const lastRunResponse = await fetch(lastRunHref, {
            method: 'GET',
            headers: requestHeaders,
          });
          const lastRunData: RunWrappedDTO = await lastRunResponse.json();
          lastRunMap[connection.id] = lastRunData;
        }
      }

      setConnectionsData(connectionsData);
      setLastRunMap(lastRunMap);
    };

    fetchData();
  }, [user]);

  /**
   * Memoize table data and columns. The Table implementation uses react-table
   * package that would otherwise perform a lot of unnecessary calculations on each render.
   * [react-table quick start](https://react-table.tanstack.com/docs/quick-start)
   */
  const tableData = useMemo<ConnectionDTO[]>(
    () => (connectionsData ? connectionsData.connections : []),
    [connectionsData]
  );
  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'connection',
            Header: 'Connection',
            Cell: ({ row: { original } }: CellProps<ConnectionDTO>) => {
              return (
                <Link to={`/${original.id}`} className="iui-anchor">
                  {original.displayName}
                </Link>
              );
            },
          },
          {
            id: 'lastSyncTime',
            Header: 'Last synced at',
            Cell: ({ row: { original } }: CellProps<ConnectionDTO>) => {
              return lastRunMap[original.id] ? (
                <span>
                  {new Date(
                    lastRunMap[original.id].run.startDateTime
                  ).toLocaleString('en-GB')}
                </span>
              ) : null;
            },
          },
          {
            id: 'lastSyncStatus',
            Header: 'Last sync result',
            Cell: ({ row: { original } }: CellProps<ConnectionDTO>) => {
              return lastRunMap[original.id] ? (
                <>
                  <div className="cell-icon">
                    {mapResultToIcon(lastRunMap[original.id].run.result)}
                  </div>
                  <span>{lastRunMap[original.id].run.result}</span>
                </>
              ) : null;
            },
          },
        ],
      },
    ],
    [lastRunMap]
  );

  return (
    <div className="connections-page">
      <Headline>Connections</Headline>
      <div className="tile-card">
        <Button
          className="add-connection-button"
          styleType="high-visibility"
          startIcon={<SvgAdd />}
          onClick={() => {
            navigate('/newConnection');
          }}
        >
          New connection
        </Button>
        <Table<ConnectionDTO>
          data={tableData}
          columns={tableColumns}
          emptyTableContent="No connections for this iModel"
          isLoading={connectionsData === null}
        />
      </div>
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { SvgFiletypeMicrostation } from '@itwin/itwinui-icons-color-react';
import { SvgPlay } from '@itwin/itwinui-icons-react';
import {
  Button,
  Headline,
  LabeledInput,
  LabeledSelect,
  ProgressLinear,
  Subheading,
  Table,
} from '@itwin/itwinui-react';
import { navigate, RouteComponentProps } from '@reach/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Cell } from 'react-table';
import { useAuthContext } from '../../auth/AuthContext';
import { definitions as ProjectDefinitions } from '../../dto/projects';
import { definitions as StorageDefinitions } from '../../dto/storage';
import { definitions as SynchronizationDefinitions } from '../../dto/synchronization';
import { iModelID, contextId } from '../../env';
import './NewConnectionPage.scss';
import { toaster } from '@itwin/itwinui-react';
import { apiDomain } from '../../setup';

type FileDTO = StorageDefinitions['file'];
type FilesDTO = StorageDefinitions['files'];

type ConnectionDTO = SynchronizationDefinitions['Connection'];
type CreateConnectionDTO =
  SynchronizationDefinitions['storage-connection-create'];

type ProjectDTO = { project: ProjectDefinitions['Project'] };

type BridgeType = 'MSTN' | 'OBD' | 'CIVIL';

/**
 * Page that is used for creating new connections.
 */
export const NewConnectionPage = (props: RouteComponentProps<{}>) => {
  const [name, setName] = useState('');
  const { user } = useAuthContext();
  const [filesData, setFilesData] = useState<FileDTO[] | null>(null);
  const [selectedBridge, setSelectedBridge] = useState<BridgeType>('MSTN');
  const [selectedFiles, setSelectedFiles] = useState<FileDTO[]>([]);
  const [isConnectionCreating, setIsConnectionCreating] =
    useState<boolean>(false);

  useEffect(() => {
    const requestHeaders = {
      Authorization: `Bearer ${user?.access_token}`,
    };
    const fetchData = async () => {
      /**
       * [Get Project](https://developer.bentley.com/api-groups/administration/apis/projects/operations/get-project/)
       * We use this endpoint to get some information about a specific project.
       * In this case we need a storage url that references the root folder in the storage system.
       */
      const projectResponse: ProjectDTO = await (
        await fetch(`${apiDomain}/projects/${contextId}`, {
          headers: requestHeaders,
        })
      ).json();

      const storageUrl = projectResponse.project._links?.storage?.href;
      /**
       * [Get files in folder](https://developer.bentley.com/api-groups/data-management/apis/storage/operations/get-files-in-folder/)
       * Use the returned `storageUrl` for fetching files by appending `/files` path token.
       */
      const filesResponse: FilesDTO = await (
        await fetch(`${storageUrl}/files`, { headers: requestHeaders })
      ).json();

      setFilesData(
        filesResponse.files?.filter(file => file.displayName?.endsWith('.dgn'))
      );
    };
    fetchData();
  }, [user]);

  const runConnection = useCallback(
    async (connectionId: string) => {
      const requestHeaders = {
        Authorization: `Bearer ${user?.access_token}`,
      };
      /**
       * [Run Connection](https://developer.bentley.com/api-groups/synchronization/apis/synchronization/operations/run-storage-connection/)
       * A simple POST request that queues connection for synchronization.
       */
      await fetch(
        `${apiDomain}/synchronization/imodels/storageConnections/${connectionId}/run?imodelId=${iModelID}`,
        { method: 'POST', headers: requestHeaders }
      );
    },
    [user]
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'fileName',
            Header: 'File name',
            Cell: ({ row: { original } }: Cell<FileDTO>) => {
              return (
                <>
                  <SvgFiletypeMicrostation className="file-icon" />
                  <span>{original.displayName}</span>
                </>
              );
            },
          },
        ],
      },
    ],
    []
  );
  const tableData = useMemo(() => (filesData ? filesData : []), [filesData]);

  const createConnection = async () => {
    const requestHeaders = {
      Authorization: `Bearer ${user?.access_token}`,
    };
    const requestBody: CreateConnectionDTO = {
      displayName: name,
      iModelId: iModelID,
      sourceFiles: selectedFiles.map(file => ({
        storageFileId: file.id,
        connectorType: selectedBridge,
      })),
    };
    setIsConnectionCreating(true);
    /**
     * [Create Connection](https://developer.bentley.com/api-groups/synchronization/apis/synchronization/operations/create-storage-connection/)
     * When user provides required information, we store it in `requestBody` and perform a POST request that will create a new connection under the specified iModel.
     */
    const response = await fetch(
      `${apiDomain}/synchronization/imodels/storageConnections?imodelId=${iModelID}`,
      {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      }
    );
    setIsConnectionCreating(false);
    if (!response.ok) {
      const errorMessage = (await response.json()).error.message;
      toaster.negative(errorMessage);
    }

    return response;
  };

  return (
    <div className="create-connection-page">
      <Headline>Create connection</Headline>
      <div className="create-connection-container">
        <div className="table-container tile-card">
          <Subheading>Select files</Subheading>
          <Table<FileDTO>
            data={tableData}
            columns={tableColumns}
            emptyTableContent="No files found"
            isLoading={filesData === null}
            isSelectable
            onSelect={selectedFiles => {
              setSelectedFiles(selectedFiles ?? []);
            }}
            className="iui-table-fixed"
          />
        </div>
        <div className="input-form tile-card">
          <Subheading className="input-form-subheading">
            New connection properties
          </Subheading>
          <LabeledInput
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            label="Connection name"
          />
          <LabeledSelect<BridgeType>
            options={[
              { value: 'MSTN', label: 'Microstation' },
              { value: 'OBD', label: 'OpenBuildings' },
              { value: 'CIVIL', label: 'Bentley Civil' },
            ]}
            onChange={value => {
              setSelectedBridge(value);
            }}
            value={selectedBridge}
            label="iModel connection type"
          />
          <div className="create-connection-button-bar">
            <Button
              disabled={
                selectedFiles.length === 0 ||
                name === '' ||
                isConnectionCreating
              }
              className="create-connection-btn"
              onClick={async () => {
                await createConnection();
                navigate('/');
              }}
            >
              Create connection
            </Button>
            <Button
              styleType="high-visibility"
              startIcon={<SvgPlay />}
              disabled={
                selectedFiles.length === 0 ||
                name === '' ||
                isConnectionCreating
              }
              onClick={async () => {
                const newConnectionResponse = await createConnection();
                if (newConnectionResponse.ok) {
                  const newConnection: ConnectionDTO = (
                    await newConnectionResponse.json()
                  ).connection;
                  await runConnection(newConnection.id);
                  navigate(`/${newConnection.id}`);
                } else {
                  navigate('/');
                }
              }}
            >
              Create connection and sync
            </Button>
          </div>
          {isConnectionCreating && (
            <ProgressLinear indeterminate className="creating-con-progress" />
          )}
        </div>
      </div>
    </div>
  );
};

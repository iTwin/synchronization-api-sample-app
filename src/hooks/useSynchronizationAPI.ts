/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useAuthContext } from '../auth/authContext';
import {
  ConnectionsService,
  connector_type,
  StorageConnectionSourceFilesService,
  StorageConnectionsService,
  storage_file_prefer_return_minimal,
  storage_run,
} from '../clients/synchronizationClient';
import { getConnectorType } from '../services/connectorLogic';
import { DroppedFileSummary, StorageTaskWithConnector } from '../typedef/types';
import { iModelID } from '../env';

export const useSynchronizationAPI = (): [
  (files: DroppedFileSummary[]) => Promise<string>,
  () => Promise<storage_file_prefer_return_minimal | null>,
  () => Promise<[storage_run | null, StorageTaskWithConnector[] | null]>
] => {
  const { authorization } = useAuthContext();
  const accreditationAppConnectionName = 'accreditation-storage-connection';

  const createStorageConnection = async (file: DroppedFileSummary) => {
    return (
      await StorageConnectionsService.createStorageConnection(authorization, {
        iModelId: iModelID,
        sourceFiles: [
          {
            connectorType: getConnectorType(
              file.fileName
            ) as unknown as connector_type,
            storageFileId: file.fileId,
          },
        ],
        displayName: accreditationAppConnectionName,
      })
    ).connection;
  };

  const runConnection = async (connectionId: string) => {
    return StorageConnectionsService.runStorageConnection(
      connectionId,
      authorization
    );
  };

  const getLatestRun = async () => {
    const connectionId = await getConnection();
    if (!connectionId) {
      return null;
    }
    const runsResponse =
      await StorageConnectionsService.getStorageConnectionRuns(
        connectionId,
        authorization,
        'return=representation'
      );
    return runsResponse.runs != null
      ? runsResponse.runs[runsResponse.runs.length - 1]
      : null;
  };

  const getConnection = async (file?: DroppedFileSummary) => {
    /*
     * This application works on a single connection basis
     * The function gets the connection or creates if it does not exist
     */
    const connectionsResponse = await ConnectionsService.getConnections(
      iModelID,
      authorization
    );
    let acreditationConnection = connectionsResponse.connections?.find(
      connection => connection.displayName === accreditationAppConnectionName
    );
    if (acreditationConnection == null && file) {
      acreditationConnection = await createStorageConnection(file);
    }
    return acreditationConnection?.id ?? '';
  };

  const addFileToConnection = async (
    connectionId: string,
    file: DroppedFileSummary
  ) => {
    const sourceFiles =
      await StorageConnectionSourceFilesService.getStorageConnectionSourcefiles(
        connectionId,
        authorization
      );

    const doesFileAlreadyExist =
      sourceFiles.sourceFiles?.find(
        sourceFile => sourceFile.storageFileId === file.fileId
      ) != null;
    if (doesFileAlreadyExist) {
      return;
    }
    await StorageConnectionSourceFilesService.addStorageConnectionSourcefile(
      connectionId,
      authorization,
      {
        connectorType: getConnectorType(
          file.fileName
        ) as unknown as connector_type,
        storageFileId: file.fileId,
      }
    );
  };

  const synchronizeFiles = async (files: DroppedFileSummary[]) => {
    const connectionId = await getConnection(files[0]);
    for await (const file of files) {
      await addFileToConnection(connectionId, file);
    }
    await runConnection(connectionId);
    return connectionId;
  };

  const getConnectionFiles = async () => {
    const connectionId = await getConnection();
    return connectionId
      ? StorageConnectionSourceFilesService.getStorageConnectionSourcefiles(
          connectionId,
          authorization
        )
      : null;
  };

  const getLatestRunTasks = async (): Promise<
    [storage_run | null, StorageTaskWithConnector[] | null]
  > => {
    const run = await getLatestRun();
    if (!run) {
      return [null, null];
    }
    const executedJobs = run?.jobs;
    const initialTaskArray: StorageTaskWithConnector[] = [];
    const executedTasks: StorageTaskWithConnector[] = executedJobs!.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        ...currentValue.tasks!.map(task => {
          return {
            connectorType: currentValue.connectorType,
            ...task,
          } as StorageTaskWithConnector;
        }),
      ],
      initialTaskArray
    );
    return [run, executedTasks];
  };

  return [synchronizeFiles, getConnectionFiles, getLatestRunTasks];
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState, useEffect } from 'react';
import { file_typed } from '../clients/storageClient';
import { storage_run } from '../clients/synchronizationClient';
import { FileRun, StorageTaskWithConnector } from '../typedef/types';
import { State, Status } from '../typedef/types';
import { formatWorkflowState } from '../typedef/typeUtils';
import { useStorageAPI } from './useStorageAPI';
import { useSynchronizationAPI } from './useSynchronizationAPI';

export const useConnectionFileRunHandle = (
  workflowStatus: Status | null,
  handleWorkflowStatus: (state: Status | null) => void
): [FileRun[] | null] => {
  const [, getConnectionFiles, getLatestConnectionRunTasks] =
    useSynchronizationAPI();
  const [connectionFiles, setConnectionFiles] = useState<file_typed[] | null>(
    null
  );
  const [lastRun, setLastRun] = useState<storage_run | null>(null);
  const [lastRunTasks, setLastRunTasks] = useState<
    StorageTaskWithConnector[] | null
  >(null);
  const [, getFilesInFolder] = useStorageAPI();
  const [status, setStatus] = useState<Status | null>(null);
  const [filesWithLastRun, setFilesWithLastRun] = useState<FileRun[] | null>(
    null
  );

  const getCurrentConnectionFiles = async () => {
    const getStorageFiles = async () => {
      const filesInFolder = await getFilesInFolder();
      return filesInFolder?.files || [];
    };

    const getConnectionFileIds = async () => {
      const connectionFileIdPairs = (await getConnectionFiles())?.sourceFiles;
      return connectionFileIdPairs || [];
    };

    const storageFiles = await getStorageFiles();
    const connectionFileIds = await getConnectionFileIds();
    const connectionFilesInfo = connectionFileIds.map(connectionFileId => {
      return (
        storageFiles.find(
          storageFile => storageFile.id === connectionFileId.storageFileId
        ) || {
          id: connectionFileId.storageFileId,
          displayName: 'Deleted file',
        }
      );
    });
    setConnectionFiles(connectionFilesInfo);
  };

  const updateLastRunAndTasks = async () => {
    const [run, tasks] = await getLatestConnectionRunTasks();
    setLastRun(run);
    setLastRunTasks(tasks);
  };

  // useConnectionFileRunHandle receives workflowStatus as a parameter.
  useEffect(() => {
    setStatus(workflowStatus);
  }, [workflowStatus]);

  useEffect(() => {
    // A callback function that is defined in the function that calls useConnectionFileRunHandle.
    handleWorkflowStatus(status);
    // Status changes when files have finished uploading to storage and synchronization has started (or finished).
    // That means a new run has started and the last run information needs to be fetched.
    updateLastRunAndTasks();
    // The connection files information changes either when synchronization begins or ends (represented by status variable).
    getCurrentConnectionFiles();
  }, [status]);

  // useEffect which checks the current status of the last run. If the run is not completed, it waits 10 seconds and
  // fetches the last run information again. If it is completed, the status of the workflow is updated.
  useEffect(() => {
    if (lastRun && lastRun.state !== 'Completed') {
      if (status?.state !== State.InProgress) {
        setStatus(
          formatWorkflowState(State.InProgress, 'Synchronization in progress')
        );
      }
      if (!lastRun?.jobs) {
        updateLastRunAndTasks();
        return;
      }
      const timeout = setTimeout(updateLastRunAndTasks, 10000);
      return () => clearTimeout(timeout);
    } else if (lastRun && status?.message === 'Synchronization in progress') {
      setStatus(
        formatWorkflowState(State.Success, 'Synchronization completed')
      );
    }
  }, [lastRun]);

  // Takes a filtered storage file and combines it with a task (each task has a defined fileId) from the last run into one object.
  useEffect(() => {
    if (lastRunTasks && connectionFiles) {
      const fileRun = connectionFiles.map(file => {
        const task = lastRunTasks?.find(task => task.storageFileId === file.id);
        return { ...task, ...file };
      });
      setFilesWithLastRun(fileRun);
    } else {
      setFilesWithLastRun([]);
    }
  }, [lastRunTasks, connectionFiles]);

  return [filesWithLastRun];
};

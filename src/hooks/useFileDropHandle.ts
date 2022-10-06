/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useState } from 'react';
import { DroppedFileSummary } from '../typedef/types';
import { State, Status } from '../typedef/types';
import { formatWorkflowState } from '../typedef/typeUtils';
import { useStorageAPI } from './useStorageAPI';
import { useSynchronizationAPI } from './useSynchronizationAPI';

export const useFileDropHandle = (): [
  (files: File[]) => Promise<void>,
  Status | null
] => {
  const [status, setState] = useState<Status | null>(null);
  const [uploadFile] = useStorageAPI();
  const [synchronizeFiles] = useSynchronizationAPI();

  const handleFileDrop = async (files: File[]) => {
    setState(
      formatWorkflowState(State.InProgress, 'Uploading file to iTwin Storage')
    );
    const filesSummary: DroppedFileSummary[] = [];
    for await (const file of files) {
      filesSummary.push({
        fileId: await uploadFile(file),
        fileName: file.name,
      });
    }
    await synchronizeFiles(filesSummary);
    setState(
      formatWorkflowState(State.InProgress, 'Synchronization in progress')
    );
    return;
  };
  return [handleFileDrop, status];
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { SvgFiletypeMicrostation } from '@itwin/itwinui-icons-color-react';
import { Body, Modal, Table } from '@itwin/itwinui-react';
import { useEffect, useMemo, useState } from 'react';
import { CellProps } from 'react-table';
import { useAuthContext } from '../../auth/AuthContext';
import { definitions as StorageDefinitions } from '../../dto/storage';
import { definitions as SynchronizationDefinitions } from '../../dto/synchronization';
import { apiDomain } from '../../setup';
import {
  mapResultToIcon,
  mapStateToIcon,
} from '../ConnectionRunsPage/iconMapping';
import './TasksModal.scss';

type FileResponseDTO = StorageDefinitions['file-response'];
type FileDTO = StorageDefinitions['file'];

type TaskDTO = SynchronizationDefinitions['Task'];
type RunDTO = SynchronizationDefinitions['Run'];

export interface TasksModalProps {
  selectedRun: RunDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

type TasksTableDataType = { [P in keyof TaskDTO]: TaskDTO[P] };

export const TasksModal = (props: TasksModalProps) => {
  const { selectedRun, isOpen, onClose } = props;

  const { user } = useAuthContext();
  const [filesMap, setFilesMap] = useState<Record<string, FileDTO>>({});
  const [areFilesLoading, setAreFilesLoading] = useState(false);
  const tableData = useMemo(
    () => (selectedRun ? selectedRun.jobs.flatMap(job => job.tasks) : []),
    [selectedRun]
  );
  useEffect(() => {
    const fetchFileById = async (fileId: string) => {
      const requestHeaders = {
        Authorization: `Bearer ${user?.access_token}`,
      };
      /**
       * [Get file](https://developer.bentley.com/api-groups/data-management/apis/storage/operations/get-file/)
       * Fetch a file by id from storage API, used for file name.
       */
      return await (
        await fetch(`${apiDomain}/storage/files/${fileId}`, {
          headers: requestHeaders,
        })
      ).json();
    };

    const fetchFiles = async (fileIds: string[]) => {
      setAreFilesLoading(true);

      const filePromises: Promise<FileResponseDTO>[] = [];
      for (const fileId of fileIds) {
        filePromises.push(fetchFileById(fileId));
      }
      // Promise.all for better optimization - fetch separate files in parellel instead of consecutively
      const files = await Promise.all(filePromises);
      const filesMap: Record<string, FileDTO> = {};
      for (const file of files) {
        filesMap[file.file.id] = file.file;
      }
      setFilesMap(filesMap);
      setAreFilesLoading(false);
    };

    const fileIds = [];
    for (const task of tableData) {
      fileIds.push(task.storageFileId);
    }
    fetchFiles(fileIds);
  }, [tableData, user?.access_token]);

  const tableColumns = useMemo(
    () => [
      {
        Header: 'Table',
        columns: [
          {
            id: 'file',
            Header: 'File',
            minWidth: 100,
            Cell: ({ row: { original } }: CellProps<TasksTableDataType>) => {
              return (
                <>
                  {!areFilesLoading && (
                    <SvgFiletypeMicrostation className="file-icon" />
                  )}
                  <Body isSkeleton={areFilesLoading}>
                    {!areFilesLoading
                      ? filesMap[original.storageFileId]?.displayName
                      : 'Placeholder skeleton'}
                  </Body>
                </>
              );
            },
          },
          {
            id: 'state',
            Header: 'State',
            width: 155,
            Cell: ({ row: { original } }: CellProps<TasksTableDataType>) => {
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
            width: 155,

            Cell: ({ row: { original } }: CellProps<TasksTableDataType>) => {
              return (
                <>
                  <div className="cell-icon">
                    {mapResultToIcon(original.result)}
                  </div>
                  <span>{original.state}</span>
                </>
              );
            },
          },
          {
            id: 'startTime',
            Header: 'Start time',
            width: 180,
            Cell: ({ row: { original } }: CellProps<TasksTableDataType>) => {
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
            width: 180,
            Cell: ({ row: { original } }: CellProps<TasksTableDataType>) => {
              return (
                <span>
                  {new Date(original.endDateTime).toLocaleString('en-GB')}
                </span>
              );
            },
          },
        ],
      },
    ],
    [filesMap, areFilesLoading]
  );

  return (
    <Modal
      title="Tasks for selected run"
      isOpen={isOpen}
      isDismissible
      closeOnExternalClick
      closeOnEsc
      onClose={onClose}
      className="tasks-modal"
    >
      <Table<TasksTableDataType>
        columns={tableColumns}
        data={tableData}
        emptyTableContent="No tasks for this run"
        className="iui-condensed"
      />
    </Modal>
  );
};

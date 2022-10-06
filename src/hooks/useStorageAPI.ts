/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useAuthContext } from '../auth/authContext';
import {
  files,
  FilesService,
  file_typed,
  FoldersService,
} from '../clients/storageClient';
import { contextId } from '../env';
const accreditationFilesFolderName = ' AccreditationAppFiles';

export const useStorageAPI = (): [
  (file: File) => Promise<string>,
  () => Promise<files | null>
] => {
  const { authorization } = useAuthContext();
  const getAccreditationFolderId = async () => {
    const itemsResponse =
      await FilesService.getTopLevelFoldersAndFilesByProject(
        contextId,
        authorization
      );

    let accreditationFolder = itemsResponse.items?.find(
      (item: any) => item.displayName === accreditationFilesFolderName
    );

    if (accreditationFolder == null) {
      const rootFolderLink = itemsResponse._links?.folder?.href;
      const rootId = rootFolderLink?.split('/').reverse()[0] as string;
      accreditationFolder = await (
        await FoldersService.createFolder(rootId, authorization, {
          displayName: accreditationFilesFolderName,
        })
      ).folder;
    }
    return accreditationFolder!.id ?? '';
  };

  const createFileInStorage = async (folderId: string, file: File) => {
    const createFileResponse = await FilesService.createFile(
      folderId,
      authorization,
      { displayName: file.name }
    );
    return createFileResponse;
  };

  const getStoredFile = async (folderId: string, fileName: string) => {
    const filesResponse: files = await FilesService.getFilesInFolder(
      folderId,
      authorization
    );

    return filesResponse.files?.find(
      (file: file_typed) => file.displayName === fileName
    );
  };

  const getFilesInFolder = async () => {
    const folder = await getAccreditationFolderId();
    return folder ? FilesService.getFilesInFolder(folder, authorization) : null;
  };

  const updateFile = async (fileId: string) => {
    return FilesService.updateFileContent(fileId, authorization);
  };
  const uploadFile = async (url: string, file: File) => {
    return fetch(url, {
      method: 'PUT',
      headers: { 'x-ms-blob-type': 'BlockBlob' },
      body: file,
    });
  };

  const uploadFileToStorage = async (file: File) => {
    const folderId = await getAccreditationFolderId();
    const storageFile = await getStoredFile(folderId, file.name);

    let fileId = '';
    let uploadUrl = '';
    if (storageFile == null) {
      const createFileResponse = await createFileInStorage(folderId, file);
      uploadUrl = createFileResponse?._links?.uploadUrl?.href as string;
      const completeUrl = createFileResponse?._links?.completeUrl
        ?.href as string;
      fileId = completeUrl?.split('/').reverse()[1] as string;
    } else {
      const updateFileResponse = await updateFile(storageFile.id ?? '');
      uploadUrl = updateFileResponse._links?.uploadUrl?.href ?? '';
      fileId = storageFile.id ?? '';
    }

    await uploadFile(uploadUrl, file);

    if (storageFile == null) {
      await FilesService.completeFileCreation(fileId, authorization);
    }

    return fileId;
  };

  return [uploadFileToStorage, getFilesInFolder];
};

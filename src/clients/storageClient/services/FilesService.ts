/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { file_create } from '../models/file_create';
import type { file_response } from '../models/file_response';
import type { file_update } from '../models/file_update';
import type { file_upload } from '../models/file_upload';
import type { files } from '../models/files';
import type { items } from '../models/items';
import type { items_with_folder_link } from '../models/items_with_folder_link';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FilesService {
  /**
   * Restore file
   * ---
   *
   * Restore deleted file from the recycle bin
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_delete` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static restoreFile(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/recycleBin/files/{fileId}/restore',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Delete file
   * ---
   *
   * Delete a file
   *
   * ### Notes
   *
   * File moved to the recycle bin will be completely removed after 30 days.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_delete` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static deleteFile(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/files/{fileId}',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get file
   * ---
   *
   * Retrieves file
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:read`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns file_response OK
   * @throws ApiError
   */
  public static getFile(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<file_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/files/{fileId}',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Update file
   * ---
   *
   * Update file
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_write` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ### Errors
   *
   * This request can return InvalidCreateFileRequest error with 422 status code. This could happen because of these reasons:
   *
   * - File name contains invalid characters.
   * - File name's length is larger than 255 characters.
   * - File could be harmful. For example, executable files are not accepted.
   *
   * ---
   *
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns file_response OK
   * @throws ApiError
   */
  public static updateFile(
    fileId: string,
    authorization: string,
    requestBody?: file_update,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<file_response> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/files/{fileId}',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        422: `Invalid request to update a file. Make sure that a valid file ID and file details were passed in.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Download file
   * ---
   *
   * Retrieves file
   *
   * ### Notes
   *
   * This endpoint returns 302 status code with Location header, which on success contains a link to the file. Redirection is not supported by developer portal and an error could be returned while using the "Try it" feature for this API. However, this endpoint will work if a request is sent from a different http client or by using the link specified in the response Location header.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:read`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+octet-stream` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static downloadFile(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+octet-stream'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/files/{fileId}/download',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        302: `Found`,
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Delete file from recycle bin
   * ---
   *
   * Delete a file from the recycle bin
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_delete` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static deleteFileFromRecycleBin(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/recycleBin/files/{fileId}',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Complete file upload
   * ---
   *
   * Complete file creation
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_write` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   *
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns file_response OK
   * @throws ApiError
   */
  public static completeFileCreation(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<file_response> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/files/{fileId}/complete',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Search for folders and files in folder
   * ---
   *
   * Finds files and folders in folder by name
   *
   * ### Notes
   *
   * This query supports wildcard characters in the name parameter
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param folderId Folder Id
   * @param name Item name
   * @param authorization OAuth access token with scope `storage:read`
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns items OK
   * @throws ApiError
   */
  public static searchForFoldersAndFilesInFolder(
    folderId: string,
    name: string,
    authorization: string,
    skip?: number,
    top?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<items> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/folders/{folderId}/search',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        name: name,
        $skip: skip,
        $top: top,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        422: `Invalid request to search for folders and files`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get folders and files in folder
   * ---
   *
   * Retrieves files and folders
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns items OK
   * @throws ApiError
   */
  public static getFoldersAndFilesInFolder(
    folderId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<items> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/folders/{folderId}/list',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        422: `Invalid request to get projects`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get top level folders and files by project
   * ---
   *
   * Retrieves top level files and folders by project
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param projectId Project Id
   * @param authorization OAuth access token with scope `storage:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns items_with_folder_link OK
   * @throws ApiError
   */
  public static getTopLevelFoldersAndFilesByProject(
    projectId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<items_with_folder_link> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/',
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        projectId: projectId,
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        422: `Invalid request to get top level folders and files`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get files in folder
   * ---
   *
   * Retrieves files
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns files OK
   * @throws ApiError
   */
  public static getFilesInFolder(
    folderId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<files> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/folders/{folderId}/files',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        422: `Invalid request to get files in folder`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Create file
   * ---
   *
   * Create new file
   *
   * ### Notes
   *
   * File creation is three steps operation. This request will create file's meta data. Next two requests need to be executed by using links from the response. Maximum file size to upload with single request is **256 MiB**. If bigger file needs to be uploaded there are possibility to use Azure libraries to upload file via given Azure SAS url or by uploading file with [multiple requests](https://docs.microsoft.com/en-us/rest/api/storageservices/operations-on-block-blobs).
   *
   * - **uploadUrl** is required for file upload. Upload can be done by sending http request and specifying x-ms-blob-type header to BlockBlob.
   * - **completeUrl** should be used to confirm file upload and it is final request for file creation.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_write` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ### Errors
   *
   * This request can return InvalidCreateFileRequest error with 422 status code. This could happen because of these reasons:
   *
   * - File name contains invalid characters.
   * - File name's length is larger than 255 characters.
   * - File could be harmful. For example, executable files are not accepted.
   *
   * ---
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns file_upload Accepted
   * @throws ApiError
   */
  public static createFile(
    folderId: string,
    authorization: string,
    requestBody?: file_create,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<file_upload> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/folders/{folderId}/files',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Parent folder cannot be found.`,
        422: `Invalid request to create a file. Make sure that a valid file ID and file details were passed in.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Update file content
   * ---
   *
   * Update file's content
   *
   * ### Notes
   *
   * File update is three steps operation. This request creates hyperlinks for file content update and confirmation. Next two requests need to be executed by using links from the response. Maximum file size to upload with single request is **256 MiB**. If bigger files needs to uploaded there are possibility to use Azure libraries or by uploading file with [multiple requests](https://docs.microsoft.com/en-us/rest/api/storageservices/operations-on-block-blobs).
   *
   * - **uploadUrl** is required for file upload. Upload can be done by sending http request and specifying x-ms-blob-type header to BlockBlob.
   * - **completeUrl** should be used to confirm file upload and it is final request for file creation.
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:modify`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_write` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param fileId File Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns file_upload Accepted
   * @throws ApiError
   */
  public static updateFileContent(
    fileId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<file_upload> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/files/{fileId}/updateContent',
      path: {
        fileId: fileId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `File cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get folders and files in recycle bin
   * ---
   *
   * Get deleted files and folders
   *
   * ### Authentication
   *
   * Requires `Authorization` header with valid Bearer token for scope `storage:read`.
   *
   * For more documentation on authorization and how to get access token visit [OAUTH2 Authorization](https://developer.bentley.com/apis/overview/authorization/) page.
   *
   * ### Authorization
   *
   * User must be an Organization Administrator for the Organization that owns a given Project or have `storage_read` permission assigned at the Project level.
   *
   * An Organization Administrator must have at least one of the following roles assigned in User Management: Account Administrator, Co-Administrator, or CONNECT Services Administrator. For more information about User Management please visit our Bentley Communities [Licensing, Cloud, and Web Services](https://communities.bentley.com/communities/other_communities/licensing_cloud_and_web_services/w/wiki/50711/user-management-2-0) wiki page.
   *
   * ---
   * @param projectId Project Id
   * @param authorization OAuth access token with scope `storage:read`
   * @param top The [$top](https://www.odata.org/getting-started/basic-tutorial/#topskip) system query option requests the number of items in the queried collection to be included in the result.
   * @param skip The [$skip](https://www.odata.org/getting-started/basic-tutorial/#topskip) query option requests the number of items in the queried collection that are to be skipped and not included in the result.
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns items OK
   * @throws ApiError
   */
  public static getFoldersAndFilesInRecycleBin(
    projectId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<items> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/recycleBin',
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      query: {
        projectId: projectId,
        $top: top,
        $skip: skip,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        422: `Invalid request to get folders and files in recycle bin`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }
}

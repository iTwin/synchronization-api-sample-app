/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { folder_create } from '../models/folder_create';
import type { folder_response } from '../models/folder_response';
import type { folder_update } from '../models/folder_update';
import type { folders } from '../models/folders';
import type { items } from '../models/items';
import type { items_with_folder_link } from '../models/items_with_folder_link';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FoldersService {
  /**
   * Restore folder
   * ---
   *
   * Restore deleted folder from the recycle bin
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
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static restoreFolder(
    folderId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/recycleBin/folders/{folderId}/restore',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Delete folder
   * ---
   *
   * Delete a folder
   *
   * ### Notes
   *
   * Folder moved to the recycle bin will be completely removed after 30 days.
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
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static deleteFolder(
    folderId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/folders/{folderId}',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get folder
   * ---
   *
   * Retrieves folder
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
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns folder_response OK
   * @throws ApiError
   */
  public static getFolder(
    folderId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<folder_response> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/folders/{folderId}',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Update folder
   * ---
   *
   * Update folder
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
   * This request can return InvalidCreateFolderRequest error with 422 status code. This could happen because of these reasons:
   *
   * - Folder name contains invalid characters.
   * - Folder name's length is larger than 255 characters.
   *
   * ---
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns folder_response OK
   * @throws ApiError
   */
  public static updateFolder(
    folderId: string,
    authorization: string,
    requestBody?: folder_update,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<folder_response> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/folders/{folderId}',
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
        422: `Invalid request to update a folder. Make sure that a valid folder ID and folder details were passed in.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Delete folder from recycle bin
   * ---
   *
   * Delete a folder from the recycle bin
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
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @returns void
   * @throws ApiError
   */
  public static deleteFolderFromRecycleBin(
    folderId: string,
    authorization: string,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/recycleBin/folders/{folderId}',
      path: {
        folderId: folderId,
      },
      headers: {
        Authorization: authorization,
        Accept: accept,
      },
      errors: {
        401: `This response indicates that request lacks valid authentication credentials. Access token might not been provided, issued by the wrong issuer, does not have required scopes or request headers were malformed.`,
        404: `Folder cannot be found.`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Get folders in folder
   * ---
   *
   * Retrieves folders
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
   * @returns folders OK
   * @throws ApiError
   */
  public static getFoldersInFolder(
    folderId: string,
    authorization: string,
    top?: number,
    skip?: number,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<folders> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/folders/{folderId}/folders',
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
        422: `Invalid request to get folders in folder`,
        429: `This response indicates that the user has sent too many requests in a given amount of time.`,
      },
    });
  }

  /**
   * Create folder
   * ---
   *
   * Create new folder
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
   * This request can return InvalidCreateFolderRequest error with 422 status code. This could happen because of these reasons:
   *
   * - Folder name contains invalid characters.
   * - Folder name's length is larger than 255 characters.
   *
   * ---
   * @param folderId Folder Id
   * @param authorization OAuth access token with scope `storage:modify`
   * @param accept Setting to `application/vnd.bentley.itwin-platform.v1+json` is recommended.
   * @param requestBody
   * @returns folder_response Created
   * @throws ApiError
   */
  public static createFolder(
    folderId: string,
    authorization: string,
    requestBody?: folder_create,
    accept?: 'application/vnd.bentley.itwin-platform.v1+json'
  ): CancelablePromise<folder_response> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/folders/{folderId}/folders',
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
        422: `Invalid request to create a folder. Make sure that a valid folder ID and folder details were passed in.`,
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

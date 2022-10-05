/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { links_item } from './links_item';

/**
 * Full representation of the folder with folder type.
 */
export type folder_typed = {
  /**
   * Unique Identifier of the folder.
   */
  id?: string;
  /**
   * Identification of the folder entity.
   */
  type?: folder_typed.type;
  /**
   * Display name of the folder.
   */
  displayName?: string;
  /**
   * Description of the folder.
   */
  description?: string;
  /**
   * Absolute path to the folder.
   */
  path?: string;
  /**
   * Display name of the user who modified folder last.
   */
  lastModifiedByDisplayName?: string;
  /**
   * Date when the folder was created.
   */
  createdDateTime?: string;
  /**
   * Date when the folder was last time modified.
   */
  lastModifiedDateTime?: string;
  /**
   * Unique Identifier of the parent folder.
   */
  parentFolderId?: string;
  _links?: links_item;
};

export namespace folder_typed {
  /**
   * Identification of the folder entity.
   */
  export enum type {
    FOLDER = 'folder',
  }
}

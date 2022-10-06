/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { links_item } from './links_item';

export type binary = {
  /**
   * Unique Identifier of the file.
   */
  id?: string;
  /**
   * Display name of the file.
   */
  displayName?: string;
  /**
   * Description of the file.
   */
  description?: string;
  /**
   * Absolute path to the file.
   */
  path?: string;
  /**
   * Size to the file in bytes.
   */
  size?: number;
  /**
   * Display name of the user who modified file last.
   */
  lastModifiedByDisplayName?: string;
  /**
   * Date when the file was created.
   */
  createdDateTime?: string;
  /**
   * Date when the file was last time modified.
   */
  lastModifiedDateTime?: string;
  /**
   * Unique Identifier of the parent folder.
   */
  parentFolderId?: string;
  _links?: links_item;
};

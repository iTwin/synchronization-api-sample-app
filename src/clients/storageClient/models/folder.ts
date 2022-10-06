/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { links_item } from './links_item';

/**
 * Full representation of the folder.
 */
export type folder = {
  /**
   * Unique Identifier of the folder.
   */
  id?: string;
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

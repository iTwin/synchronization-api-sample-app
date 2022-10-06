/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { file_typed } from './file_typed';
import type { folder_typed } from './folder_typed';
import type { links_paging } from './links_paging';

/**
 * List of folders and files.
 */
export type items = {
  /**
   * List of folders and files.
   */
  items?: Array<folder_typed | file_typed>;
  _links?: links_paging;
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { file_typed } from './file_typed';
import type { folder_typed } from './folder_typed';
import type { links_paging_with_folder_link } from './links_paging_with_folder_link';

export type items_with_folder_link = {
  items?: Array<folder_typed | file_typed>;
  _links?: links_paging_with_folder_link;
};

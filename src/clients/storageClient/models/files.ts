/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

// import type { files } from './files';
import { file_typed } from './file_typed';
import type { links_paging } from './links_paging';

/**
 * List of files.
 */
export type files = {
  files?: Array<file_typed>;
  _links?: links_paging;
};

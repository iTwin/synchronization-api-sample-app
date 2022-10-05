/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { folder } from './folder';
import type { links_paging } from './links_paging';

/**
 * List of folders.
 */
export type folders = {
  /**
   * List of folders.
   */
  folders?: Array<folder>;
  _links?: links_paging;
};

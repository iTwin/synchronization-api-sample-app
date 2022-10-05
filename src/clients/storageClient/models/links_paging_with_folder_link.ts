/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { link } from './link';

/**
 * URLs for redoing the current request, getting to the previous or next page of results, if applicable containg, and retrieving root folder.
 */
export type links_paging_with_folder_link = {
  self?: link;
  next?: link;
  prev?: link;
  folder?: link;
};

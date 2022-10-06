/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { link } from './link';

/**
 * URLs for accessing users' details and parent folder.
 */
export type links_item = {
  createdBy?: link;
  lastModifiedBy?: link;
  parentFolder?: link;
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { connector_type } from './connector_type';
import type { file_links } from './file_links';

export type StorageFile = {
  id?: string;
  storageFileId?: string;
  connectorType?: connector_type;
  lastKnownFileName?: string;
  _links?: file_links;
};

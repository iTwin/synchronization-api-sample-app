/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { authenticationType } from './authenticationType';
import type { storage_file_create } from './storage_file_create';

export type storage_connection_create = {
  authenticationType?: authenticationType;
  displayName?: string;
  iModelId: string;
  sourceFiles: Array<storage_file_create>;
};

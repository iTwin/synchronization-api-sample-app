/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { authenticationType } from './authenticationType';
import type { manifest_file_create } from './manifest_file_create';

export type manifest_connection_create = {
  authenticationType?: authenticationType;
  displayName?: string;
  iModelId: string;
  sourceFiles: Array<manifest_file_create>;
};

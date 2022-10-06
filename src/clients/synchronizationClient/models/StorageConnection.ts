/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { authenticationType } from './authenticationType';
import type { connection_links } from './connection_links';

export type StorageConnection = {
  authenticationType?: authenticationType;
  id?: string;
  displayName?: string;
  iModelId?: string;
  _links?: connection_links;
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { connection_links } from './connection_links';

export type Connection = {
  id?: string;
  displayName?: string;
  iModelId?: string;
  _links?: connection_links;
};

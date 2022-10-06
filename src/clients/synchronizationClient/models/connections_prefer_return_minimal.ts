/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { connection_summary } from './connection_summary';
import type { Links } from './Links';

export type connections_prefer_return_minimal = {
  connections?: Array<connection_summary>;
  _links?: Links;
};

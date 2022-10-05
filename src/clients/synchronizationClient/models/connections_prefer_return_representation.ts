/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Connection } from './Connection';
import type { Links } from './Links';

export type connections_prefer_return_representation = {
  connections?: Array<Connection>;
  _links?: Links;
};

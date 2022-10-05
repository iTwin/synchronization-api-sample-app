/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { connector_type } from './connector_type';
import type { manifest_task } from './manifest_task';

export type manifest_job = {
  id?: string;
  startDateTime?: string;
  endDateTime?: string;
  state?: string;
  result?: string;
  connectorType?: connector_type;
  tasks?: Array<manifest_task>;
};

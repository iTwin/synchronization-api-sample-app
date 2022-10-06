/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { task_error } from './task_error';

export type manifest_task = {
  id?: string;
  startDateTime?: string;
  endDateTime?: string;
  retryAttempts?: number;
  state?: string;
  result?: string;
  error?: task_error;
};

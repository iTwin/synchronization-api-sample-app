/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { execution_result } from './execution_result';
import type { execution_state } from './execution_state';
import type { job_phase } from './job_phase';
import type { storage_job } from './storage_job';

export type storage_run = {
  id?: string;
  connectionId?: string;
  startDateTime?: string;
  endDateTime?: string;
  phase?: job_phase;
  state?: execution_state;
  result?: execution_result;
  jobs?: Array<storage_job>;
};

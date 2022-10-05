/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * One of 'NotStarted', 'Idle', 'WaitingToExecute', 'WaitingToRetry', 'Executing', 'Finalizing', 'Completed', 'Queued'.
 */
export enum execution_state {
  NOT_STARTED = 'NotStarted',
  IDLE = 'Idle',
  WAITING_TO_EXECUTE = 'WaitingToExecute',
  WAITING_TO_RETRY = 'WaitingToRetry',
  EXECUTING = 'Executing',
  FINALIZING = 'Finalizing',
  COMPLETED = 'Completed',
  QUEUED = 'Queued',
}

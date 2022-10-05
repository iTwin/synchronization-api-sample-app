/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * One of 'Undetermined', 'Success', 'Error', 'PartialSuccess', 'Skipped', 'Cancelled', 'TimedOut'.
 */
export enum execution_result {
  UNDETERMINED = 'Undetermined',
  SUCCESS = 'Success',
  ERROR = 'Error',
  PARTIAL_SUCCESS = 'PartialSuccess',
  SKIPPED = 'Skipped',
  CANCELLED = 'Cancelled',
  TIMED_OUT = 'TimedOut',
}

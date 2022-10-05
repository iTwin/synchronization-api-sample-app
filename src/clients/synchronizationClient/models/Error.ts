/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorDetails } from './ErrorDetails';

/**
 * Contains error information and an optional array of more specific errors.
 */
export type Error = {
  /**
   * One of a server-defined set of error codes.
   */
  code: string;
  /**
   * A human-readable representation of the error.
   */
  message: string;
  /**
   * Optional array of more specific errors.
   */
  details?: Array<ErrorDetails>;
};

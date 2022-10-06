/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Contains error information.
 */
export type ErrorDetails = {
  /**
   * One of a server-defined set of error codes.
   */
  code: string;
  /**
   * A human-readable representation of the error.
   */
  message: string;
};

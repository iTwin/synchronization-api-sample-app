/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Error } from './Error';

/**
 * Gives details for an error that occurred while handling the request. Note that clients MUST NOT assume that every failed request will produce an object of this schema, or that all of the properties in the response will be non-null, as the error may have prevented this response from being constructed.
 */
export type ErrorResponse = {
  error: Error;
};

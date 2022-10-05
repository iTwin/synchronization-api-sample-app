/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { link } from './link';

/**
 * Hyperlinks for further file upload and confirmation.
 */
export type links_upload = {
  uploadUrl?: link;
  completeUrl?: link;
};

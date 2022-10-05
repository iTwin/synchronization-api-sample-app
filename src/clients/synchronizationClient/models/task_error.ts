/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type task_error = {
  errorCode?: string;
  message?: string;
  details?: string;
  bridgeExitCode?: number;
  system?: string;
  phase?: string;
  category?: string;
  descriptionKey?: string;
  description?: string;
  kbArticleLink?: string;
  canUserFix?: boolean;
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from '../../components/icons/icon';
import {
  SvgStatusError,
  SvgStatusRunning,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '@itwin/itwinui-icons-react';
import './fileStatusFormatter.scss';
import { FileRun, State, Status } from '../../typedef/types';

// fileRun variable is a combination of storage file and its last run information
export const getFormattedFileRunStatus = (
  fileRun: FileRun | null,
  workflowStatus: Status | null
) => {
  return (
    <span className="center-vertically">
      {getRunStatusIcon(fileRun, workflowStatus)}
      {getRunStatusText(fileRun, workflowStatus)}
    </span>
  );
};

export const getRunStatusText = (
  fileRun: FileRun | null,
  workflowStatus: Status | null
) => {
  if (!fileRun?.state && workflowStatus?.state !== State.InProgress) {
    return 'Never synchronized';
  } else if (fileRun?.result === 'Error') {
    return 'Error';
  } else if (fileRun?.result === 'Undetermined') {
    return 'Running';
  } else if (fileRun?.startDateTime! < fileRun?.lastModifiedDateTime!) {
    return 'Outdated';
  } else if (fileRun?.result === 'Success') {
    return 'Synchronized';
  } else {
    return 'Running';
  }
};

export const getRunStatusIcon = (
  fileRun: FileRun | null,
  workflowStatus: Status | null
) => {
  if (!fileRun?.state && workflowStatus?.state !== State.InProgress) {
    return (
      <Icon icon={SvgStatusWarning} color="warning" className="status-icon" />
    );
  } else if (fileRun?.result === 'Error') {
    return (
      <Icon icon={SvgStatusError} color="negative" className="status-icon" />
    );
  } else if (fileRun?.result === 'Undetermined') {
    return (
      <Icon icon={SvgStatusRunning} color="primary" className="status-icon" />
    );
  } else if (fileRun?.startDateTime! < fileRun?.lastModifiedDateTime!) {
    return (
      <Icon icon={SvgStatusWarning} color="warning" className="status-icon" />
    );
  } else if (fileRun?.result === 'Success') {
    return (
      <Icon icon={SvgStatusSuccess} color="positive" className="status-icon" />
    );
  } else
    return (
      <Icon icon={SvgStatusRunning} color="primary" className="status-icon" />
    );
};

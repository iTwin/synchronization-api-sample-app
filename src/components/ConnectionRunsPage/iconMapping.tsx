/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import {
  SvgCircle,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '@itwin/itwinui-icons-react';
import { ProgressRadial } from '@itwin/itwinui-react';
import './iconMapping.scss';

export const mapStateToIcon = (state: string): JSX.Element => {
  switch (state) {
    case 'Completed':
      return <SvgStatusSuccess />;
    case 'Finalizing':
    case 'Executing':
      return (
        <ProgressRadial
          indeterminate
          size="small"
          style={{ width: 16, height: 16 }}
        />
      );
    default:
      return <SvgCircle />;
  }
};

export const mapResultToIcon = (result: string): JSX.Element => {
  switch (result) {
    case 'Success':
      return <SvgStatusSuccess className="iui-positive" />;
    case 'PartialSuccess':
      return <SvgStatusWarning className="iui-warning" />;
    case 'Error':
      return <SvgStatusError className="iui-negative" />;
    default:
      return <SvgCircle />;
  }
};

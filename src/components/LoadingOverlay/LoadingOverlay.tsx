/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Body, ProgressRadial } from '@itwin/itwinui-react';
import './LoadingOverlay.scss';

interface LoadingOverlayProps {
  text: string;
}

export const LoadingOverlay = (props: LoadingOverlayProps) => {
  const { text } = props;

  return (
    <div className="loading-overlay">
      <ProgressRadial indeterminate />
      <Body className="progress-text">{text}</Body>
    </div>
  );
};

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import cx from 'classnames';
import './icon.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: 'small' | 'default' | 'large' | 'xl' | 'xxl' | '3xl';
  color?: 'default' | 'primary' | 'positive' | 'warning' | 'negative';
}

/*
 * Component to format icons
 */
export const Icon = (props: IconProps) => {
  const { icon: Icon, size = 'default', color, className, ...rest } = props;
  return (
    <Icon
      className={cx(className, `icon-size-${size}`, {
        [`icon-${color}`]: color,
      })}
      {...rest}
    />
  );
};

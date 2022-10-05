/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

export const getFileExtension = (name: string): string => {
  const normalizedName = name.toLowerCase();
  const nameParts: string[] = normalizedName.split('.');

  if (nameParts.length < 2) {
    return '';
  }

  if (normalizedName.endsWith('.i.dgn')) {
    return 'i.dgn';
  }

  if (normalizedName.endsWith('.shp.xml')) {
    return 'shp.xml';
  }
  return nameParts.pop()!;
};

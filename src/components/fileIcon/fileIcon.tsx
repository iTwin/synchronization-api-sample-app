/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { file_typed } from '../../clients/storageClient';
import { Icon } from '../icons/icon';
import {
  SvgFiletypeAutocad,
  SvgFiletypeImodel,
  SvgFiletypeMicrostation,
  SvgFiletypeRevit,
  SvgFiletypeXls,
} from '@itwin/itwinui-icons-color-react';
import { SvgDocument } from '@itwin/itwinui-icons-react';
import './fileIcon.scss';
import { getFileExtension } from '../../services/fileTypeLogic';

export const getFileIcon = (file: file_typed) => {
  return (
    <div className="file-icon-wrapper">
      <Icon icon={getIcon(file)} size="large" color="default" />
    </div>
  );
};

export const getIcon = (file: file_typed) => {
  const fileType = getFileType(file.displayName ?? '');

  switch (fileType) {
    case 'i-model':
      return SvgFiletypeImodel;
    case 'AutoCad':
      return SvgFiletypeAutocad;
    case 'Excel':
      return SvgFiletypeXls;
    case 'Document':
      return SvgDocument;
    case 'Revit':
      return SvgFiletypeRevit;
    case 'MicroStation':
      return SvgFiletypeMicrostation;
    default:
      return SvgDocument;
  }
};

export const getFileType = (name: string): string =>
  getFileTypeByExtension(getFileExtension(name).toLowerCase());

export const getFileTypeByExtension = (extension: string) => {
  switch (extension.toLowerCase()) {
    case 'i.dgn':
      return 'i-model';
    case 'dwg':
    case 'dxf':
    case 'skp':
    case 'obj':
      return 'AutoCad';
    case 'xls':
    case 'xlsx':
      return 'Excel';
    case 'xml':
      return 'Document';
    case 'rvt':
      return 'Revit';
    case 'zip':
      return 'Compressed';
    case 'dgn':
      return 'MicroStation';
    default:
      return 'Unknown';
  }
};

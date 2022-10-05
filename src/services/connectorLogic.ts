/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ConnectorType, ModelFileExtension } from '../typedef/types';
import { getFileExtension } from './fileTypeLogic';

export const getConnectorType = (fileName: string) => {
  const fileExtension = getFileExtension(fileName) as ModelFileExtension;
  return ConnectorTypeByFileExtension.get(fileExtension);
};

const ConnectorTypeByFileExtension = new Map<ModelFileExtension, ConnectorType>(
  [
    [ModelFileExtension.Csv, ConnectorType.PSEXCEL],
    [ModelFileExtension.Dgn, ConnectorType.Microstation],
    [ModelFileExtension.Dwg, ConnectorType.Dwg],
    [ModelFileExtension.Dxf, ConnectorType.Dwg],
    [ModelFileExtension.Fbx, ConnectorType.Microstation],
    [ModelFileExtension.GeoDb, ConnectorType.Geospatial],
    [ModelFileExtension.GeoJson, ConnectorType.Geospatial],
    [ModelFileExtension.Idgn, ConnectorType.Microstation],
    [ModelFileExtension.Ifc, ConnectorType.Ifc],
    [ModelFileExtension.Json, ConnectorType.IntelliPid],
    [ModelFileExtension.Kml, ConnectorType.Geospatial],
    [ModelFileExtension.Nwc, ConnectorType.Nwd],
    [ModelFileExtension.Nwd, ConnectorType.Nwd],
    [ModelFileExtension.Obj, ConnectorType.Microstation],
    [ModelFileExtension.OtXml, ConnectorType.OpenTower],
    [ModelFileExtension.Pid, ConnectorType.SPPID],
    [ModelFileExtension.Revit, ConnectorType.Revit],
    [ModelFileExtension.Shp, ConnectorType.Geospatial],
    [ModelFileExtension.Skp, ConnectorType.Microstation],
    [ModelFileExtension.ThreeDm, ConnectorType.Microstation],
    [ModelFileExtension.ThreeDs, ConnectorType.Microstation],
    [ModelFileExtension.Vsd, ConnectorType.AvevaDiagrams],
    [ModelFileExtension.Vue, ConnectorType.Vue],
    [ModelFileExtension.Xls, ConnectorType.PSEXCEL],
    [ModelFileExtension.Xlsx, ConnectorType.PSEXCEL],
    [ModelFileExtension.Xml, ConnectorType.OpenTower],
    [ModelFileExtension.Zip, ConnectorType.SPPID],
  ]
);

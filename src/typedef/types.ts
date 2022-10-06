/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { file_typed } from '../clients/storageClient';
import { connector_type, storage_task } from '../clients/synchronizationClient';

export type DroppedFileSummary = {
  fileId: string;
  fileName: string;
};

export type StorageTaskWithConnector = {
  connectorType?: connector_type;
} & storage_task;

export type FileRun = file_typed & StorageTaskWithConnector;

export enum State {
  Success = 'Success',
  InProgress = 'InProgress',
  Error = 'Error',
}
export interface Status {
  state: State;
  message: string;
}

export enum ConnectorType {
  AutoPlant = 'AUTOPLANT', // .dwg
  AvevaPid = 'AVEVAPID', //.dwg
  Civil = 'CIVIL', // .dgn
  Civil3D = 'CIVIL3D', // .dwg
  Dwg = 'DWG', //.dwg
  Geospatial = 'GEOSPATIAL', // .shp
  Ifc = 'IFC', //.ifc
  Microstation = 'MSTN', //.dgn
  Nwd = 'NWD', // .nwd .nwc
  OBD = 'OBD', // .dgn
  OpenTower = 'OPENTOWER', // .xml
  Revit = 'REVIT', //.rvt
  SPPID = 'SPPID', //.zip, .pid
  Vue = 'SPXREVIEW', //.vue
  AvevaDiagrams = 'AVEVADIAGRAMS', //.vsd
  ShellDWCSV = 'SHELLEDWCSV', // .cvs
  PSEXCEL = 'PSEXCEL',
  Prostructures = 'PROSTRUCTURES', // .dgn
  IntelliPid = 'INTELLIPID', // .json
}

export enum ModelFileExtension {
  Csv = 'csv',
  Dgn = 'dgn',
  Dwg = 'dwg',
  Dxf = 'dxf',
  Fbx = 'fbx',
  GeoDb = 'geodb',
  GeoJson = 'geojson',
  Idgn = 'i.dgn',
  Ifc = 'ifc',
  Json = 'json',
  Kml = 'kml',
  Nwc = 'nwc',
  Nwd = 'nwd',
  Obj = 'obj',
  OtXml = 'otxml',
  Pid = 'pid',
  Revit = 'rvt',
  Shp = 'shp',
  shpXml = 'shp.xml',
  Skp = 'skp',
  ThreeDm = '3dm',
  ThreeDs = '3ds',
  Vsd = 'vsd',
  Vue = 'vue',
  Xls = 'xls',
  Xlsx = 'xlsx',
  Xml = 'xml',
  Zip = 'zip',
}

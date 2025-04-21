/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.125
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  PrimitivePipeline_default
} from "./chunk-YSDDJID3.js";
import {
  createTaskProcessorWorker_default
} from "./chunk-SDEL6GIF.js";
import "./chunk-SCTMR5SF.js";
import "./chunk-D76E6PSV.js";
import "./chunk-GYLOWMRH.js";
import "./chunk-XVD2CHMP.js";
import "./chunk-NMWUSFG6.js";
import "./chunk-M44PODFC.js";
import "./chunk-NPIZDB6C.js";
import "./chunk-KWBBQWF2.js";
import "./chunk-EOMDP67A.js";
import "./chunk-2YCNCT5M.js";
import "./chunk-FUAOSJAR.js";
import "./chunk-T2ESMZCL.js";
import "./chunk-GMFVH7MP.js";
import "./chunk-PHKOGU5O.js";
import "./chunk-WKBHOKFD.js";
import "./chunk-BYPRNUCO.js";
import "./chunk-SGH7UNZN.js";
import "./chunk-N2TV4RJQ.js";
import "./chunk-6MI7ARVC.js";

// packages/engine/Source/Workers/combineGeometry.js
function combineGeometry(packedParameters, transferableObjects) {
  const parameters = PrimitivePipeline_default.unpackCombineGeometryParameters(packedParameters);
  const results = PrimitivePipeline_default.combineGeometry(parameters);
  return PrimitivePipeline_default.packCombineGeometryResults(
    results,
    transferableObjects
  );
}
var combineGeometry_default = createTaskProcessorWorker_default(combineGeometry);
export {
  combineGeometry_default as default
};

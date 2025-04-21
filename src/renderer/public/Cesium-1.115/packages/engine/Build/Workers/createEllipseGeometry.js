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
  EllipseGeometry_default
} from "./chunk-GUWFUMTY.js";
import "./chunk-5BPTXF7Z.js";
import "./chunk-KANO4ZD3.js";
import "./chunk-D76E6PSV.js";
import "./chunk-GYLOWMRH.js";
import "./chunk-XVD2CHMP.js";
import "./chunk-KGK6CWUW.js";
import "./chunk-35WWVBEN.js";
import "./chunk-NMWUSFG6.js";
import "./chunk-M44PODFC.js";
import "./chunk-NPIZDB6C.js";
import "./chunk-KWBBQWF2.js";
import "./chunk-EOMDP67A.js";
import "./chunk-2YCNCT5M.js";
import "./chunk-FUAOSJAR.js";
import "./chunk-T2ESMZCL.js";
import {
  Cartesian3_default,
  Ellipsoid_default
} from "./chunk-GMFVH7MP.js";
import "./chunk-PHKOGU5O.js";
import "./chunk-WKBHOKFD.js";
import "./chunk-BYPRNUCO.js";
import "./chunk-SGH7UNZN.js";
import "./chunk-N2TV4RJQ.js";
import {
  defined_default
} from "./chunk-6MI7ARVC.js";

// packages/engine/Source/Workers/createEllipseGeometry.js
function createEllipseGeometry(ellipseGeometry, offset) {
  if (defined_default(offset)) {
    ellipseGeometry = EllipseGeometry_default.unpack(ellipseGeometry, offset);
  }
  ellipseGeometry._center = Cartesian3_default.clone(ellipseGeometry._center);
  ellipseGeometry._ellipsoid = Ellipsoid_default.clone(ellipseGeometry._ellipsoid);
  return EllipseGeometry_default.createGeometry(ellipseGeometry);
}
var createEllipseGeometry_default = createEllipseGeometry;
export {
  createEllipseGeometry_default as default
};

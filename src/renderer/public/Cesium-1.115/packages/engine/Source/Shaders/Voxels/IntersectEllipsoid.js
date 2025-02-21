//This file is automatically rebuilt by the Cesium build process.
export default "// See IntersectionUtils.glsl for the definitions of Ray, Intersections,\n\
// setIntersection, setIntersectionPair, INF_HIT, NO_HIT\n\
// See IntersectLongitude.glsl for the definitions of intersectHalfPlane,\n\
// intersectFlippedWedge, intersectRegularWedge\n\
\n\
/* Ellipsoid defines (set in Scene/VoxelEllipsoidShape.js)\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE_RANGE_EQUAL_ZERO\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE_RANGE_UNDER_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE_RANGE_OVER_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_UNDER_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_EQUAL_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_OVER_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_UNDER_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_EQUAL_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_OVER_HALF\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_HEIGHT_MAX\n\
#define ELLIPSOID_HAS_RENDER_BOUNDS_HEIGHT_MIN\n\
#define ELLIPSOID_INTERSECTION_INDEX_LONGITUDE\n\
#define ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MAX\n\
#define ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MIN\n\
#define ELLIPSOID_INTERSECTION_INDEX_HEIGHT_MAX\n\
#define ELLIPSOID_INTERSECTION_INDEX_HEIGHT_MIN\n\
*/\n\
\n\
#if defined(ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE)\n\
    uniform vec2 u_ellipsoidRenderLongitudeMinMax;\n\
#endif\n\
#if defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_UNDER_HALF) || defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_OVER_HALF) || defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_UNDER_HALF) || defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_OVER_HALF)\n\
    uniform vec2 u_ellipsoidRenderLatitudeCosSqrHalfMinMax;\n\
#endif\n\
#if defined(ELLIPSOID_HAS_RENDER_BOUNDS_HEIGHT_MAX)\n\
    uniform float u_ellipsoidInverseOuterScaleUv;\n\
#endif\n\
#if defined(ELLIPSOID_HAS_RENDER_BOUNDS_HEIGHT_MIN)\n\
    uniform float u_ellipsoidInverseInnerScaleUv;\n\
#endif\n\
\n\
vec2 intersectZPlane(Ray ray)\n\
{\n\
    float o = ray.pos.z;\n\
    float d = ray.dir.z;\n\
    float t = -o / d;\n\
    float s = sign(o);\n\
\n\
    if (t >= 0.0 != s >= 0.0) return vec2(t, +INF_HIT);\n\
    else return vec2(-INF_HIT, t);\n\
}\n\
\n\
vec2 intersectUnitSphere(Ray ray)\n\
{\n\
    vec3 o = ray.pos;\n\
    vec3 d = ray.dir;\n\
\n\
    float b = dot(d, o);\n\
    float c = dot(o, o) - 1.0;\n\
    float det = b * b - c;\n\
\n\
    if (det < 0.0) {\n\
        return vec2(NO_HIT);\n\
    }\n\
\n\
    det = sqrt(det);\n\
    float t1 = -b - det;\n\
    float t2 = -b + det;\n\
    float tmin = min(t1, t2);\n\
    float tmax = max(t1, t2);\n\
\n\
    return vec2(tmin, tmax);\n\
}\n\
\n\
vec2 intersectUnitSphereUnnormalizedDirection(Ray ray)\n\
{\n\
    vec3 o = ray.pos;\n\
    vec3 d = ray.dir;\n\
\n\
    float a = dot(d, d);\n\
    float b = dot(d, o);\n\
    float c = dot(o, o) - 1.0;\n\
    float det = b * b - a * c;\n\
\n\
    if (det < 0.0) {\n\
        return vec2(NO_HIT);\n\
    }\n\
\n\
    det = sqrt(det);\n\
    float t1 = (-b - det) / a;\n\
    float t2 = (-b + det) / a;\n\
    float tmin = min(t1, t2);\n\
    float tmax = max(t1, t2);\n\
\n\
    return vec2(tmin, tmax);\n\
}\n\
\n\
vec2 intersectDoubleEndedCone(Ray ray, float cosSqrHalfAngle)\n\
{\n\
    vec3 o = ray.pos;\n\
    vec3 d = ray.dir;\n\
    float a = d.z * d.z - dot(d, d) * cosSqrHalfAngle;\n\
    float b = d.z * o.z - dot(o, d) * cosSqrHalfAngle;\n\
    float c = o.z * o.z - dot(o, o) * cosSqrHalfAngle;\n\
    float det = b * b - a * c;\n\
\n\
    if (det < 0.0) {\n\
        return vec2(NO_HIT);\n\
    }\n\
\n\
    det = sqrt(det);\n\
    float t1 = (-b - det) / a;\n\
    float t2 = (-b + det) / a;\n\
    float tmin = min(t1, t2);\n\
    float tmax = max(t1, t2);\n\
    return vec2(tmin, tmax);\n\
}\n\
\n\
vec4 intersectFlippedCone(Ray ray, float cosSqrHalfAngle) {\n\
    vec2 intersect = intersectDoubleEndedCone(ray, cosSqrHalfAngle);\n\
\n\
    if (intersect.x == NO_HIT) {\n\
        return vec4(-INF_HIT, +INF_HIT, NO_HIT, NO_HIT);\n\
    }\n\
\n\
    vec3 o = ray.pos;\n\
    vec3 d = ray.dir;\n\
    float tmin = intersect.x;\n\
    float tmax = intersect.y;\n\
    float zmin = o.z + tmin * d.z;\n\
    float zmax = o.z + tmax * d.z;\n\
\n\
    // One interval\n\
    if (zmin < 0.0 && zmax < 0.0) return vec4(-INF_HIT, +INF_HIT, NO_HIT, NO_HIT);\n\
    else if (zmin < 0.0) return vec4(-INF_HIT, tmax, NO_HIT, NO_HIT);\n\
    else if (zmax < 0.0) return vec4(tmin, +INF_HIT, NO_HIT, NO_HIT);\n\
    // Two intervals\n\
    else return vec4(-INF_HIT, tmin, tmax, +INF_HIT);\n\
}\n\
\n\
vec2 intersectRegularCone(Ray ray, float cosSqrHalfAngle) {\n\
    vec2 intersect = intersectDoubleEndedCone(ray, cosSqrHalfAngle);\n\
\n\
    if (intersect.x == NO_HIT) {\n\
        return vec2(NO_HIT);\n\
    }\n\
\n\
    vec3 o = ray.pos;\n\
    vec3 d = ray.dir;\n\
    float tmin = intersect.x;\n\
    float tmax = intersect.y;\n\
    float zmin = o.z + tmin * d.z;\n\
    float zmax = o.z + tmax * d.z;\n\
\n\
    if (zmin < 0.0 && zmax < 0.0) return vec2(NO_HIT);\n\
    else if (zmin < 0.0) return vec2(tmax, +INF_HIT);\n\
    else if (zmax < 0.0) return vec2(-INF_HIT, tmin);\n\
    else return vec2(tmin, tmax);\n\
}\n\
\n\
void intersectShape(in Ray ray, inout Intersections ix) {\n\
    // Position is converted from [0,1] to [-1,+1] because shape intersections assume unit space is [-1,+1].\n\
    // Direction is scaled as well to be in sync with position.\n\
    ray.pos = ray.pos * 2.0 - 1.0;\n\
    ray.dir *= 2.0;\n\
\n\
    #if defined(ELLIPSOID_HAS_RENDER_BOUNDS_HEIGHT_MAX)\n\
        Ray outerRay = Ray(ray.pos * u_ellipsoidInverseOuterScaleUv, ray.dir * u_ellipsoidInverseOuterScaleUv);\n\
    #else\n\
        Ray outerRay = ray;\n\
    #endif\n\
\n\
    // Outer ellipsoid\n\
    vec2 outerIntersect = intersectUnitSphereUnnormalizedDirection(outerRay);\n\
    setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_HEIGHT_MAX, outerIntersect);\n\
\n\
    // Exit early if the outer ellipsoid was missed.\n\
    if (outerIntersect.x == NO_HIT) {\n\
        return;\n\
    }\n\
\n\
    // Inner ellipsoid\n\
    #if defined(ELLIPSOID_HAS_RENDER_BOUNDS_HEIGHT_MIN)\n\
        Ray innerRay = Ray(ray.pos * u_ellipsoidInverseInnerScaleUv, ray.dir * u_ellipsoidInverseInnerScaleUv);\n\
        vec2 innerIntersect = intersectUnitSphereUnnormalizedDirection(innerRay);\n\
\n\
        if (innerIntersect == vec2(NO_HIT)) {\n\
            setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_HEIGHT_MIN, innerIntersect);\n\
        } else {\n\
            // When the ellipsoid is large and thin it's possible for floating point math\n\
            // to cause the ray to intersect the inner ellipsoid before the outer ellipsoid.\n\
            // To prevent this from happening, clamp innerIntersect to outerIntersect and\n\
            // sandwich the inner ellipsoid intersection inside the outer ellipsoid intersection.\n\
\n\
            // Without this special case,\n\
            // [outerMin, outerMax, innerMin, innerMax] will bubble sort to\n\
            // [outerMin, innerMin, outerMax, innerMax] which will cause the back\n\
            // side of the ellipsoid to be invisible because it will think the ray\n\
            // is still inside the inner (negative) ellipsoid after exiting the\n\
            // outer (positive) ellipsoid.\n\
\n\
            // With this special case,\n\
            // [outerMin, innerMin, innerMax, outerMax] will bubble sort to\n\
            // [outerMin, innerMin, innerMax, outerMax] which will work correctly.\n\
\n\
            // Note: If initializeIntersections() changes its sorting function\n\
            // from bubble sort to something else, this code may need to change.\n\
\n\
            // In theory a similar fix is needed for cylinders, however it's more\n\
            // complicated to implement because the inner shape is allowed to be\n\
            // intersected first.\n\
            innerIntersect.x = max(innerIntersect.x, outerIntersect.x);\n\
            innerIntersect.y = min(innerIntersect.y, outerIntersect.y);\n\
            setIntersection(ix, 0, outerIntersect.x, true, true);   // positive, enter\n\
            setIntersection(ix, 1, innerIntersect.x, false, true);  // negative, enter\n\
            setIntersection(ix, 2, innerIntersect.y, false, false); // negative, exit\n\
            setIntersection(ix, 3, outerIntersect.y, true, false);  // positive, exit\n\
        }\n\
    #endif\n\
\n\
    // Flip the ray because the intersection function expects a cone growing towards +Z.\n\
    #if defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_UNDER_HALF) || defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_EQUAL_HALF) || defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_UNDER_HALF)\n\
        Ray flippedRay = outerRay;\n\
        flippedRay.dir.z *= -1.0;\n\
        flippedRay.pos.z *= -1.0;\n\
    #endif\n\
\n\
    // Bottom cone\n\
    #if defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_UNDER_HALF)\n\
        vec2 bottomConeIntersection = intersectRegularCone(flippedRay, u_ellipsoidRenderLatitudeCosSqrHalfMinMax.x);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MIN, bottomConeIntersection);\n\
    #elif defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_EQUAL_HALF)\n\
        vec2 bottomConeIntersection = intersectZPlane(flippedRay);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MIN, bottomConeIntersection);\n\
    #elif defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MIN_OVER_HALF)\n\
        vec4 bottomConeIntersection = intersectFlippedCone(ray, u_ellipsoidRenderLatitudeCosSqrHalfMinMax.x);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MIN + 0, bottomConeIntersection.xy);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MIN + 1, bottomConeIntersection.zw);\n\
    #endif\n\
\n\
    // Top cone\n\
    #if defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_UNDER_HALF)\n\
        vec4 topConeIntersection = intersectFlippedCone(flippedRay, u_ellipsoidRenderLatitudeCosSqrHalfMinMax.y);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MAX + 0, topConeIntersection.xy);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MAX + 1, topConeIntersection.zw);\n\
    #elif defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_EQUAL_HALF)\n\
        vec2 topConeIntersection = intersectZPlane(ray);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MAX, topConeIntersection);\n\
    #elif defined(ELLIPSOID_HAS_RENDER_BOUNDS_LATITUDE_MAX_OVER_HALF)\n\
        vec2 topConeIntersection = intersectRegularCone(ray, u_ellipsoidRenderLatitudeCosSqrHalfMinMax.y);\n\
        setIntersectionPair(ix, ELLIPSOID_INTERSECTION_INDEX_LATITUDE_MAX, topConeIntersection);\n\
    #endif\n\
\n\
    // Wedge\n\
    #if defined(ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE_RANGE_EQUAL_ZERO)\n\
        RayShapeIntersection wedgeIntersects[2];\n\
        intersectHalfPlane(ray, u_ellipsoidRenderLongitudeMinMax.x, wedgeIntersects);\n\
        setShapeIntersection(ix, ELLIPSOID_INTERSECTION_INDEX_LONGITUDE + 0, wedgeIntersects[0]);\n\
        setShapeIntersection(ix, ELLIPSOID_INTERSECTION_INDEX_LONGITUDE + 1, wedgeIntersects[1]);\n\
    #elif defined(ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE_RANGE_UNDER_HALF)\n\
        RayShapeIntersection wedgeIntersect = intersectRegularWedge(ray, u_ellipsoidRenderLongitudeMinMax);\n\
        setShapeIntersection(ix, ELLIPSOID_INTERSECTION_INDEX_LONGITUDE, wedgeIntersect);\n\
    #elif defined(ELLIPSOID_HAS_RENDER_BOUNDS_LONGITUDE_RANGE_OVER_HALF)\n\
        RayShapeIntersection wedgeIntersects[2];\n\
        intersectFlippedWedge(ray, u_ellipsoidRenderLongitudeMinMax, wedgeIntersects);\n\
        setShapeIntersection(ix, ELLIPSOID_INTERSECTION_INDEX_LONGITUDE + 0, wedgeIntersects[0]);\n\
        setShapeIntersection(ix, ELLIPSOID_INTERSECTION_INDEX_LONGITUDE + 1, wedgeIntersects[1]);\n\
    #endif\n\
}\n\
";

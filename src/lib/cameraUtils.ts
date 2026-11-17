import { lineString, nearestPointOnLine, point } from "@turf/turf";
import { getRouteCoordinates } from "@/lib/routeUtils";
import type { CameraLocation } from "@/types/camera.types";
import type { RouteGeometry } from "@/types/route.types";

const CAMERA_IMAGE_BASE_URL = "https://ristmikud.tallinn.ee/last";

// Wide enough for dual carriageways, narrow enough to skip parallel streets.
export const CAMERA_ROUTE_BUFFER_METERS = 40;
export const CAMERA_REFRESH_INTERVAL_MS = 1000;

export function getCameraImageUrl(cameraId: string, cacheKey: string): string {
  return `${CAMERA_IMAGE_BASE_URL}/${cameraId}.jpg?t=${cacheKey}`;
}

/**
 * Returns the camera locations within the route buffer, ordered by where
 * the route passes them.
 */
export function findCameraLocationsOnRoute(
  locations: CameraLocation[],
  geometry: RouteGeometry,
): CameraLocation[] {
  const coordinates = getRouteCoordinates(geometry);
  if (coordinates.length < 2) {
    return [];
  }

  const route = lineString(coordinates);
  const matches: Array<{
    location: CameraLocation;
    distanceAlongRoute: number;
  }> = [];

  for (const location of locations) {
    const nearest = nearestPointOnLine(route, point(location.coordinates), {
      units: "meters",
    });

    if (nearest.properties.pointDistance <= CAMERA_ROUTE_BUFFER_METERS) {
      matches.push({
        location,
        distanceAlongRoute: nearest.properties.totalDistance,
      });
    }
  }

  return matches
    .sort((a, b) => a.distanceAlongRoute - b.distanceAlongRoute)
    .map((match) => match.location);
}

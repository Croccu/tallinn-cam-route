import polyline from "@mapbox/polyline";
import type { Coordinates } from "@/types/address.types";
import type { DirectionsRoute, DrivingRoute, RouteGeometry } from "@/types/route.types";

export function normalizeRoute(route: DirectionsRoute): DrivingRoute {
  return {
    ...route,
    // Directions v4 returns encoded polylines even with geometries: "geojson".
    geometry: typeof route.geometry === "string"
      ? polyline.toGeoJSON(route.geometry)
      : route.geometry,
  };
}

export function getRouteCoordinates(geometry: RouteGeometry): Coordinates[] {
  return geometry.coordinates.flatMap<Coordinates>(([longitude, latitude]) =>
    typeof longitude === "number" && Number.isFinite(longitude) &&
    typeof latitude === "number" && Number.isFinite(latitude)
      ? [[longitude, latitude]] : [],
  );
}

export function formatDistance(meters: number): string {
  return meters < 1000
    ? `${Math.round(meters)} m`
    : `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}`;
}

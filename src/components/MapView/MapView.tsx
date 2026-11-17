"use client";

import { useCameraLayer } from "@/hooks/useCameraLayer";
import { useMapbox } from "@/hooks/useMapbox";
import { MAPBOX_CONFIGURATION_MESSAGE } from "@/lib/env";
import type { Suggestion } from "@/types/address.types";
import type { CameraLocation } from "@/types/camera.types";
import type { RouteState } from "@/types/route.types";
import "./MapView.css";

type MapViewProps = {
  start: Suggestion | null;
  end: Suggestion | null;
  cameraLocations: CameraLocation[];
  routeCameraLocationIds: ReadonlySet<string>;
  onRouteChange: (state: RouteState) => void;
  onCameraSelect: (locationId: string) => void;
};

export function MapView({
  start,
  end,
  cameraLocations,
  routeCameraLocationIds,
  onRouteChange,
  onCameraSelect,
}: MapViewProps) {
  const { containerRef, map, mapError, hasMapboxToken } = useMapbox(
    start,
    end,
    onRouteChange,
  );
  const { cameraLayerError, isCameraHovered } = useCameraLayer(
    map,
    cameraLocations,
    routeCameraLocationIds,
    onCameraSelect,
  );
  const error = mapError ?? cameraLayerError;
  const containerClassName = isCameraHovered
    ? "map-view__container map-view__container--camera-hover"
    : "map-view__container";

  return (
    <div className="map-view">
      <div
        ref={containerRef}
        className={containerClassName}
        role="region"
        aria-label="Map of Tallinn"
      />
      {!hasMapboxToken && (
        <p className="map-view__configuration">
          {MAPBOX_CONFIGURATION_MESSAGE}
        </p>
      )}
      {hasMapboxToken && error && (
        <p
          role="alert"
          className="map-view__error"
        >
          {error}
        </p>
      )}
    </div>
  );
}

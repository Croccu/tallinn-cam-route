"use client";

import { useMapbox } from "@/hooks/useMapbox";
import { MAPBOX_CONFIGURATION_MESSAGE } from "@/lib/env";
import type { MapViewProps } from "./MapView.types";
import "./MapView.css";

export function MapView({ start, end, onRouteChange }: MapViewProps) {
  const { containerRef, mapError, hasMapboxToken } = useMapbox(start, end, onRouteChange);
  return (
    <div className="map-view">
      <div ref={containerRef} className="map-view__container" role="region" aria-label="Map of Tallinn" />
      {!hasMapboxToken && <p className="map-view__configuration">{MAPBOX_CONFIGURATION_MESSAGE}</p>}
      {hasMapboxToken && mapError && <p role="alert" className="map-view__error">{mapError}</p>}
    </div>
  );
}

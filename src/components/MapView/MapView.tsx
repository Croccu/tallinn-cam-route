"use client";

import { useMapbox } from "@/hooks/useMapbox";
import { MAPBOX_CONFIGURATION_MESSAGE } from "@/lib/env";
import type { Suggestion } from "@/types/address.types";
import type { RouteState } from "@/types/route.types";
import "./MapView.css";

type MapViewProps = {
  start: Suggestion | null;
  end: Suggestion | null;
  onRouteChange: (state: RouteState) => void;
};

export function MapView({ start, end, onRouteChange }: MapViewProps) {
  const { containerRef, mapError, hasMapboxToken } = useMapbox(
    start,
    end,
    onRouteChange,
  );
  return (
    <div className="map-view">
      <div
        ref={containerRef}
        className="map-view__container"
        role="region"
        aria-label="Map of Tallinn"
      />
      {!hasMapboxToken && (
        <p className="map-view__configuration">
          {MAPBOX_CONFIGURATION_MESSAGE}
        </p>
      )}
      {hasMapboxToken && mapError && (
        <p
          role="alert"
          className="map-view__error"
        >
          {mapError}
        </p>
      )}
    </div>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import { CameraFeed } from "@/components/CameraFeed/CameraFeed";
import { DirectionsList } from "@/components/DirectionsList/DirectionsList";
import { MapView } from "@/components/MapView/MapView";
import { RouteCameras } from "@/components/RouteCameras/RouteCameras";
import { RouteForm } from "@/components/RouteForm/RouteForm";
import { CAMERA_LOCATIONS } from "@/lib/cameraLocations";
import { findCameraLocationsOnRoute } from "@/lib/cameraUtils";
import type {
  RoutePoint,
  RoutePointKey,
  RoutePoints,
  Suggestion,
} from "@/types/address.types";
import type { CameraSelection } from "@/types/camera.types";
import type { RouteState } from "@/types/route.types";
import "./RoutePlanner.css";

type RoutePlannerState = {
  points: RoutePoints;
  route: RouteState;
};

const EMPTY_POINT: RoutePoint = {
  value: "",
  suggestion: null,
};

export function RoutePlanner() {
  const [{ points, route: routeState }, setState] = useState<RoutePlannerState>(
    {
      points: {
        start: EMPTY_POINT,
        end: EMPTY_POINT,
      },
      route: {
        status: "idle",
        route: null,
      },
    },
  );
  const [cameraSelection, setCameraSelection] =
    useState<CameraSelection | null>(null);

  const routeCameraLocations = useMemo(
    () =>
      routeState.status === "success"
        ? findCameraLocationsOnRoute(
            CAMERA_LOCATIONS,
            routeState.route.geometry,
          )
        : [],
    [routeState],
  );
  const routeCameraLocationIds = useMemo(
    () => new Set(routeCameraLocations.map((location) => location.id)),
    [routeCameraLocations],
  );
  const selectedCameraLocation = cameraSelection
    ? CAMERA_LOCATIONS.find(
        (location) => location.id === cameraSelection.locationId,
      )
    : undefined;

  const updateRoute = useCallback((route: RouteState) => {
    setState((current) => ({
      ...current,
      route,
    }));
  }, []);

  const selectCameraLocation = useCallback((locationId: string) => {
    setCameraSelection({
      locationId,
      openedAt: Date.now(),
    });
  }, []);

  function updatePoints(next: RoutePoints) {
    setState({
      points: next,
      route: {
        status:
          next.start.suggestion && next.end.suggestion ? "loading" : "idle",
        route: null,
      },
    });
  }

  function selectPoint(key: RoutePointKey, suggestion: Suggestion) {
    updatePoints({
      ...points,
      [key]: {
        value: suggestion.fullAddress,
        suggestion,
      },
    });
  }

  return (
    <div className="route-planner">
      <aside className="route-planner__sidebar">
        <RouteForm
          start={points.start}
          end={points.end}
          onChange={(key, value) =>
            updatePoints({
              ...points,
              [key]: {
                value,
                suggestion: null,
              },
            })
          }
          onSelect={selectPoint}
          onSwap={() =>
            updatePoints({
              start: points.end,
              end: points.start,
            })
          }
        />
        {routeState.status === "success" && (
          <RouteCameras
            locations={routeCameraLocations}
            selectedLocationId={cameraSelection?.locationId ?? null}
            onSelect={selectCameraLocation}
          />
        )}
        <DirectionsList state={routeState} />
      </aside>
      <main className="route-planner__map">
        <MapView
          start={points.start.suggestion}
          end={points.end.suggestion}
          cameraLocations={CAMERA_LOCATIONS}
          routeCameraLocationIds={routeCameraLocationIds}
          onRouteChange={updateRoute}
          onCameraSelect={selectCameraLocation}
        />
        {cameraSelection && selectedCameraLocation && (
          <CameraFeed
            key={cameraSelection.openedAt}
            location={selectedCameraLocation}
            openedAt={cameraSelection.openedAt}
            onClose={() => setCameraSelection(null)}
          />
        )}
      </main>
    </div>
  );
}

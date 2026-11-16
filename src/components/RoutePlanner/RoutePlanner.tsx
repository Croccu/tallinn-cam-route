"use client";

import { useCallback, useState } from "react";
import { RouteForm } from "@/components/RouteForm";
import { DirectionsList } from "@/components/DirectionsList";
import { MapView } from "@/components/MapView";
import type { RoutePoint, RoutePointKey, RoutePoints, Suggestion } from "@/types/address.types";
import type { RouteState } from "@/types/route.types";
import type { RoutePlannerState } from "./RoutePlanner.types";
import "./RoutePlanner.css";

const EMPTY_POINT: RoutePoint = { value: "", suggestion: null };

export function RoutePlanner() {
  const [{ points, route: routeState }, setState] = useState<RoutePlannerState>({
    points: { start: EMPTY_POINT, end: EMPTY_POINT },
    route: { status: "idle", route: null },
  });
  const updateRoute = useCallback((route: RouteState) => {
    setState((current) => ({ ...current, route }));
  }, []);

  function updatePoints(next: RoutePoints) {
    setState({
      points: next,
      route: {
        status: next.start.suggestion && next.end.suggestion ? "loading" : "idle",
        route: null,
      },
    });
  }

  function selectPoint(key: RoutePointKey, suggestion: Suggestion) {
    updatePoints({
      ...points,
      [key]: { value: suggestion.fullAddress, suggestion },
    });
  }

  return (
    <div className="route-planner">
      <aside className="route-planner__sidebar">
        <RouteForm
          start={points.start}
          end={points.end}
          onChange={(key, value) =>
            updatePoints({ ...points, [key]: { value, suggestion: null } })
          }
          onSelect={selectPoint}
          onSwap={() => updatePoints({ start: points.end, end: points.start })}
        />
        <DirectionsList state={routeState} />
      </aside>
      <main className="route-planner__map">
        <MapView
          start={points.start.suggestion}
          end={points.end.suggestion}
          onRouteChange={updateRoute}
        />
      </main>
    </div>
  );
}

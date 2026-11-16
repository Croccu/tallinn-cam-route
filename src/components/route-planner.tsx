"use client";

import { useState } from "react";
import type { Suggestion } from "@/components/address-input";
import RouteForm, { type RoutePoint } from "@/components/route-form";
import DirectionsList from "@/components/directions-list";
import Map from "@/components/map";
import type { RouteState } from "@/types/route";

const emptyPoint: RoutePoint = { value: "", suggestion: null };

export default function RoutePlanner() {
  const [points, setPoints] = useState({ start: emptyPoint, end: emptyPoint });
  const [routeState, setRouteState] = useState<RouteState>({
    status: "idle",
    route: null,
  });

  function updatePoints(next: typeof points) {
    setPoints(next);
    setRouteState({
      status: next.start.suggestion && next.end.suggestion ? "loading" : "idle",
      route: null,
    });
  }

  function selectPoint(key: "start" | "end", suggestion: Suggestion) {
    updatePoints({
      ...points,
      [key]: { value: suggestion.fullAddress, suggestion },
    });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
      <aside className="flex shrink-0 flex-col gap-6 border-zinc-200 p-4 md:w-96 md:overflow-y-auto md:border-r dark:border-zinc-800">
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
      <main className="min-h-80 shrink-0 flex-1 p-4">
        <Map
          start={points.start.suggestion}
          end={points.end.suggestion}
          onRouteChange={setRouteState}
        />
      </main>
    </div>
  );
}

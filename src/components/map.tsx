"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import polyline from "@mapbox/polyline";
import type { Suggestion } from "@/components/address-input";
import type { RouteState } from "@/types/route";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

type Props = {
  start: Suggestion | null;
  end: Suggestion | null;
  onRouteChange: (state: RouteState) => void;
};

export default function Map({ start, end, onRouteChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<MapboxDirections | null>(null);
  const [directionsReady, setDirectionsReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) {
      if (start && end) {
        onRouteChange({
          status: "error",
          route: null,
          error: "Set NEXT_PUBLIC_MAPBOX_TOKEN to calculate directions.",
        });
      }
      return;
    }
    if (!directionsReady || !directionsRef.current) return;
    const directions = directionsRef.current;
    // Clear first to abort any request and avoid routing to the old destination.
    directions.removeRoutes();
    if (!start || !end) return;
    onRouteChange({ status: "loading", route: null });
    directions.setOrigin(start.coordinates);
    directions.setDestination(end.coordinates);
  }, [start, end, directionsReady, onRouteChange]);

  useEffect(() => {
    if (!containerRef.current || !accessToken) return;
    let disposed = false;
    let directions: MapboxDirections | undefined;
    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      accessToken,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [24.7536, 59.437],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.on("error", () => {
      setMapError(
        "The map could not load. Check your Mapbox token and network connection.",
      );
    });
    const onLoad = async () => {
      setMapError(null);

      try {
        // The browser bundle inlines templates; the package entry uses Node's fs.
        // Load it only after mounting because it also accesses browser globals.
        const { default: MapboxDirections } = await import(
          "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"
        );
        if (disposed || !mapboxgl.accessToken) return;

        directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: "metric",
          profile: "mapbox/driving",
          geometries: "geojson",
          alternatives: false,
          interactive: false,
          controls: {
            inputs: false,
            instructions: false,
            profileSwitcher: false,
          },
        });
        directions.on("route", (e) => {
          if (disposed) return;
          // With alternatives disabled, the first route is the active route.
          const route = e.route[0];
          if (!route) {
            onRouteChange({
              status: "error",
              route: null,
              error: "No driving route found. Try different addresses.",
            });
            return;
          }
          // v4.3.3 hardcodes polyline responses despite the geometries option.
          const geometry =
            typeof route.geometry === "string"
              ? polyline.toGeoJSON(route.geometry)
              : route.geometry;
          onRouteChange({ status: "success", route: { ...route, geometry } });
          if (geometry.coordinates.length) {
            const bounds = new mapboxgl.LngLatBounds();
            for (const coordinate of geometry.coordinates) {
              bounds.extend([coordinate[0], coordinate[1]]);
            }
            map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
          }
        });
        directions.on("error", () => {
          if (!disposed) {
            onRouteChange({
              status: "error",
              route: null,
              error:
                "Could not find a driving route. Check your connection or try different addresses.",
            });
          }
        });
        map.addControl(directions, "top-left");
        directionsRef.current = directions;
        setDirectionsReady(true);
      } catch {
        if (!disposed) {
          setMapError("The directions control could not load. Please try again.");
          onRouteChange({
            status: "error",
            route: null,
            error: "Directions could not load. Please refresh to try again.",
          });
        }
      }
    };
    map.once("load", onLoad);

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      disposed = true;
      directionsRef.current = null;
      map.off("load", onLoad);
      resizeObserver.disconnect();
      if (directions && map.hasControl(directions)) {
        map.removeControl(directions);
      }
      map.remove();
    };
  }, [onRouteChange]);
  return (
    <div className="relative h-full min-h-72 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
      <div
        ref={containerRef}
        style={{ position: "absolute", inset: 0 }}
        role="region"
        aria-label="Map of Tallinn"
      />
      {!accessToken && (
        <p className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to display the map.
        </p>
      )}
      {accessToken && mapError && (
        <p
          role="alert"
          className="absolute inset-x-4 bottom-10 rounded-lg bg-white/95 p-3 text-sm text-red-700 shadow dark:bg-zinc-900/95 dark:text-red-400"
        >
          {mapError}
        </p>
      )}
    </div>
  );
}

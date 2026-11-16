"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import type { LineString } from "geojson";
import polyline from "@mapbox/polyline";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<LineString | null>(null);

  useEffect(() => {
    if (activeRoute) console.info("Active route GeoJSON geometry:", activeRoute);
  }, [activeRoute]);

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
        });
        directions.on("route", (e) => {
          if (disposed) return;
          // With alternatives disabled, the first route is the active route.
          const geometry = e.route[0]?.geometry;
          // v4.3.3 hardcodes polyline responses despite the geometries option.
          setActiveRoute(
            typeof geometry === "string"
              ? polyline.toGeoJSON(geometry)
              : (geometry ?? null),
          );
        });
        directions.on("clear", () => {
          if (!disposed) setActiveRoute(null);
        });
        map.addControl(directions, "top-left");
      } catch {
        if (!disposed) {
          setMapError("The directions control could not load. Please try again.");
        }
      }
    };
    map.once("load", onLoad);

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      disposed = true;
      map.off("load", onLoad);
      resizeObserver.disconnect();
      if (directions && map.hasControl(directions)) {
        map.removeControl(directions);
      }
      map.remove();
    };
  }, []);
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

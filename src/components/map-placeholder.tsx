"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapPlaceholder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !accessToken) return;

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
    map.on("load", () => setMapError(null));

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
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

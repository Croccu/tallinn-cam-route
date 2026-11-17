"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { ENV, MAPBOX_CONFIGURATION_MESSAGE } from "@/lib/env";
import { DEFAULT_TALLINN_CENTER, MAPBOX_STYLE } from "@/lib/mapConfig";
import { getRouteCoordinates, normalizeRoute } from "@/lib/routeUtils";
import type { Suggestion } from "@/types/address.types";
import type { DirectionsRoute, RouteState } from "@/types/route.types";

export function useMapbox(
  start: Suggestion | null,
  end: Suggestion | null,
  onRouteChange: (state: RouteState) => void,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<MapboxDirections | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isDirectionsReady, setIsDirectionsReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!ENV.mapboxToken) {
      if (start && end) {
        onRouteChange({
          status: "error",
          route: null,
          error: MAPBOX_CONFIGURATION_MESSAGE,
        });
      }
      return;
    }

    const directions = directionsRef.current;
    if (!isDirectionsReady || !directions) {
      return;
    }

    directions.removeRoutes();
    if (!start || !end) {
      return;
    }

    onRouteChange({
      status: "loading",
      route: null,
    });
    directions.setOrigin(start.coordinates);
    directions.setDestination(end.coordinates);
  }, [start, end, isDirectionsReady, onRouteChange]);

  useEffect(() => {
    const container = containerRef.current;
    const accessToken = ENV.mapboxToken;

    if (!container || !accessToken) {
      return;
    }

    let isDisposed = false;
    let map: mapboxgl.Map;

    try {
      map = new mapboxgl.Map({
        container,
        accessToken,
        style: MAPBOX_STYLE,
        center: DEFAULT_TALLINN_CENTER,
        zoom: 12,
      });
    } catch {
      // Defer the state update so setup failures are handled like map events.
      queueMicrotask(() => {
        if (!isDisposed) {
          setMapError(
            "The map could not initialize. Check browser WebGL support.",
          );
        }
      });

      return () => {
        isDisposed = true;
      };
    }

    let directions: MapboxDirections | undefined;
    const navigation = new mapboxgl.NavigationControl();

    const handleMapError = () => {
      if (!isDisposed) {
        setMapError(
          "The map could not load. Check your Mapbox token and network connection.",
        );
      }
    };

    const handleRoute = (event: { route: DirectionsRoute[] }) => {
      if (isDisposed) {
        return;
      }

      const route = event.route[0];
      if (!route) {
        onRouteChange({
          status: "error",
          route: null,
          error: "No driving route found. Try different addresses.",
        });
        return;
      }

      const normalizedRoute = normalizeRoute(route);
      onRouteChange({
        status: "success",
        route: normalizedRoute,
      });

      const coordinates = getRouteCoordinates(normalizedRoute.geometry);
      if (coordinates.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        for (const coordinate of coordinates) {
          bounds.extend(coordinate);
        }
        map.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
        });
      }
    };

    const handleDirectionsError = () => {
      if (!isDisposed) {
        onRouteChange({
          status: "error",
          route: null,
          error:
            "Could not find a driving route. Check your connection or try different addresses.",
        });
      }
    };

    const handleLoad = async () => {
      setMapError(null);

      try {
        // The browser distribution inlines templates; the entry point uses fs.
        const { default: DirectionsControl } =
          await import("@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions");

        if (isDisposed) {
          return;
        }

        directions = new DirectionsControl({
          accessToken,
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

        directions.on("route", handleRoute);
        directions.on("error", handleDirectionsError);
        map.addControl(directions, "top-left");
        directionsRef.current = directions;
        setIsDirectionsReady(true);
      } catch {
        if (!isDisposed) {
          setMapError(
            "The directions control could not load. Please try again.",
          );
          onRouteChange({
            status: "error",
            route: null,
            error: "Directions could not load. Please refresh to try again.",
          });
        }
      }

      // Expose the map last so overlays draw above the directions layers.
      if (!isDisposed) {
        setMap(map);
      }
    };

    map.addControl(navigation, "top-right");
    map.on("error", handleMapError);
    map.once("load", handleLoad);

    const resizeObserver = new ResizeObserver(() => {
      if (!isDisposed) {
        map.resize();
      }
    });
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      directionsRef.current = null;
      setMap(null);

      map.off("load", handleLoad);
      map.off("error", handleMapError);
      resizeObserver.disconnect();

      // The plugin exposes no off API. Its callbacks are guarded by isDisposed.
      if (directions && map.hasControl(directions)) {
        map.removeControl(directions);
      }
      if (map.hasControl(navigation)) {
        map.removeControl(navigation);
      }

      map.remove();
    };
  }, [onRouteChange]);

  return {
    containerRef,
    map,
    mapError,
    hasMapboxToken: Boolean(ENV.mapboxToken),
  };
}

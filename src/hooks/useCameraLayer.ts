"use client";

import { useEffect, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";
import type { FeatureCollection, Point } from "geojson";
import type { CameraLocation } from "@/types/camera.types";

const SOURCE_ID = "traffic-cameras";
const LAYER_ID = "traffic-cameras";
const ROUTE_ICON_ID = "traffic-camera-route";
const DEFAULT_ICON_ID = "traffic-camera-default";

const ICON_SIZE = 32;
const ICON_PIXEL_RATIO = 2;
const ROUTE_ICON_COLOR = "#2563eb";
const DEFAULT_ICON_COLOR = "#71717a";

type CameraFeatureProperties = {
  id: string;
  name: string;
  isOnRoute: boolean;
};

type CameraFeatureCollection = FeatureCollection<
  Point,
  CameraFeatureProperties
>;

// A video-camera glyph on a filled circle, drawn at ICON_PIXEL_RATIO.
function createCameraIconSvg(color: string): string {
  const size = ICON_SIZE * ICON_PIXEL_RATIO;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${color}" stroke="#ffffff" stroke-width="2" />
      <g transform="translate(8.8 8.8) scale(0.6)" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </g>
    </svg>
  `;
}

async function loadIcon(color: string): Promise<HTMLImageElement> {
  const size = ICON_SIZE * ICON_PIXEL_RATIO;
  const image = new Image(size, size);

  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    createCameraIconSvg(color),
  )}`;
  await image.decode();

  return image;
}

function toFeatureCollection(
  locations: CameraLocation[],
  routeLocationIds: ReadonlySet<string>,
): CameraFeatureCollection {
  return {
    type: "FeatureCollection",
    features: locations.map((location) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: location.coordinates,
      },
      properties: {
        id: location.id,
        name: location.name,
        isOnRoute: routeLocationIds.has(location.id),
      },
    })),
  };
}

export function useCameraLayer(
  map: mapboxgl.Map | null,
  locations: CameraLocation[],
  routeLocationIds: ReadonlySet<string>,
  onSelect: (locationId: string) => void,
) {
  const onSelectRef = useRef(onSelect);
  const [isLayerReady, setIsLayerReady] = useState(false);
  const [cameraLayerError, setCameraLayerError] = useState<string | null>(null);
  const [isCameraHovered, setIsCameraHovered] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!map) {
      return;
    }

    let isDisposed = false;
    let isMapRemoved = false;

    const handleClick = (event: mapboxgl.MapMouseEvent) => {
      const locationId = event.features?.[0]?.properties?.id;
      if (typeof locationId === "string") {
        onSelectRef.current(locationId);
      }
    };

    // The consumer turns this into a CSS cursor modifier.
    const handleMouseEnter = () => {
      setIsCameraHovered(true);
    };

    const handleMouseLeave = () => {
      setIsCameraHovered(false);
    };

    // useMapbox may remove the map before this hook's cleanup runs.
    const handleMapRemove = () => {
      isMapRemoved = true;
    };

    const addCameraLayer = async () => {
      try {
        const [routeIcon, defaultIcon] = await Promise.all([
          loadIcon(ROUTE_ICON_COLOR),
          loadIcon(DEFAULT_ICON_COLOR),
        ]);

        if (isDisposed) {
          return;
        }

        map.addImage(ROUTE_ICON_ID, routeIcon, {
          pixelRatio: ICON_PIXEL_RATIO,
        });
        map.addImage(DEFAULT_ICON_ID, defaultIcon, {
          pixelRatio: ICON_PIXEL_RATIO,
        });

        map.addSource(SOURCE_ID, {
          type: "geojson",
          data: toFeatureCollection([], new Set()),
        });
        map.addLayer({
          id: LAYER_ID,
          type: "symbol",
          source: SOURCE_ID,
          layout: {
            "icon-image": [
              "case",
              ["get", "isOnRoute"],
              ROUTE_ICON_ID,
              DEFAULT_ICON_ID,
            ],
            "icon-size": ["case", ["get", "isOnRoute"], 1, 0.7],
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            // Later sort keys draw on top, so route cameras stay visible.
            "symbol-sort-key": ["case", ["get", "isOnRoute"], 1, 0],
          },
          paint: {
            "icon-opacity": ["case", ["get", "isOnRoute"], 1, 0.75],
          },
        });

        map.on("click", LAYER_ID, handleClick);
        map.on("mouseenter", LAYER_ID, handleMouseEnter);
        map.on("mouseleave", LAYER_ID, handleMouseLeave);

        setCameraLayerError(null);
        setIsLayerReady(true);
      } catch {
        if (!isDisposed) {
          setCameraLayerError("Traffic cameras could not be shown on the map.");
        }
      }
    };

    map.once("remove", handleMapRemove);
    void addCameraLayer();

    return () => {
      isDisposed = true;
      setIsLayerReady(false);
      setIsCameraHovered(false);

      map.off("remove", handleMapRemove);
      map.off("click", LAYER_ID, handleClick);
      map.off("mouseenter", LAYER_ID, handleMouseEnter);
      map.off("mouseleave", LAYER_ID, handleMouseLeave);

      if (isMapRemoved) {
        return;
      }

      if (map.getLayer(LAYER_ID)) {
        map.removeLayer(LAYER_ID);
      }
      if (map.getSource(SOURCE_ID)) {
        map.removeSource(SOURCE_ID);
      }
      for (const iconId of [ROUTE_ICON_ID, DEFAULT_ICON_ID]) {
        if (map.hasImage(iconId)) {
          map.removeImage(iconId);
        }
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map || !isLayerReady) {
      return;
    }

    const source = map.getSource<mapboxgl.GeoJSONSource>(SOURCE_ID);
    source?.setData(toFeatureCollection(locations, routeLocationIds));
  }, [map, isLayerReady, locations, routeLocationIds]);

  return {
    cameraLayerError,
    isCameraHovered,
  };
}

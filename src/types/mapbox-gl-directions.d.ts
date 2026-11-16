// The plugin does not ship types and has no published DefinitelyTyped package.
declare module "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions" {
  import type { DirectionsRoute } from "@/types/route";
  import type { IControl, Map } from "mapbox-gl";

  interface DirectionsOptions {
    accessToken: string;
    unit: "metric" | "imperial";
    profile:
      | "mapbox/driving"
      | "mapbox/driving-traffic"
      | "mapbox/walking"
      | "mapbox/cycling";
    geometries: "geojson" | "polyline" | "polyline6";
    alternatives?: boolean;
    interactive?: boolean;
    controls?: {
      inputs?: boolean;
      instructions?: boolean;
      profileSwitcher?: boolean;
    };
  }

  export default class MapboxDirections implements IControl {
    constructor(options: DirectionsOptions);
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
    setOrigin(coordinates: [number, number]): this;
    setDestination(coordinates: [number, number]): this;
    removeRoutes(): this;
    on(
      type: "route",
      listener: (event: { route: DirectionsRoute[] }) => void,
    ): this;
    on(
      type: "clear",
      listener: (event: { type: "origin" | "destination" }) => void,
    ): this;
    on(type: "error", listener: (event: { error: string }) => void): this;
  }
}

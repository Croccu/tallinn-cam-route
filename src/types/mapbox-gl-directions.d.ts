// The plugin does not ship types and has no published DefinitelyTyped package.
declare module "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions" {
  import type { LineString } from "geojson";
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
  }

  export default class MapboxDirections implements IControl {
    constructor(options: DirectionsOptions);
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
    on(
      type: "route",
      listener: (event: { route: Array<{ geometry: LineString | string }> }) => void,
    ): this;
    on(
      type: "clear",
      listener: (event: { type: "origin" | "destination" }) => void,
    ): this;
  }
}

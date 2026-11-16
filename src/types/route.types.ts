import type { LineString } from "geojson";

export type RouteStep = {
  distance: number;
  maneuver: {
    type: string;
    modifier?: string;
    instruction: string;
  };
};

export type DirectionsRoute = {
  geometry: LineString | string;
  distance: number;
  duration: number;
  legs: Array<{ steps: RouteStep[] }>;
};

export type RouteGeometry = LineString;
export type DrivingRoute = Omit<DirectionsRoute, "geometry"> & {
  geometry: RouteGeometry;
};

export type RouteState =
  | {
      status: "idle" | "loading";
      route: null;
    }
  | {
      status: "success";
      route: DrivingRoute;
    }
  | {
      status: "error";
      route: null;
      error: string;
    };

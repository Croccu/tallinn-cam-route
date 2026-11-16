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

export type RouteState = {
  status: "idle" | "loading" | "success" | "error";
  route: DirectionsRoute | null;
  error?: string;
};

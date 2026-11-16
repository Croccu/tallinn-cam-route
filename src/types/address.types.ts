export type Coordinates = [number, number];

export type Suggestion = {
  id: string;
  name: string;
  context: string;
  fullAddress: string;
  coordinates: Coordinates;
};

export type RoutePoint = {
  value: string;
  suggestion: Suggestion | null;
};

export type RoutePoints = { start: RoutePoint; end: RoutePoint };
export type RoutePointKey = keyof RoutePoints;

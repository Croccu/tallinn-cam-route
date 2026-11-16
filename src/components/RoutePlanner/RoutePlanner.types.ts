import type { RoutePoints } from "@/types/address.types";
import type { RouteState } from "@/types/route.types";

export type RoutePlannerState = {
  points: RoutePoints;
  route: RouteState;
};

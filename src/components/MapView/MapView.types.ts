import type { Suggestion } from "@/types/address.types";
import type { RouteState } from "@/types/route.types";

export type MapViewProps = {
  start: Suggestion | null;
  end: Suggestion | null;
  onRouteChange: (state: RouteState) => void;
};

import type { RoutePoint, RoutePointKey, Suggestion } from "@/types/address.types";

export type RouteFormProps = {
  start: RoutePoint;
  end: RoutePoint;
  onChange: (key: RoutePointKey, value: string) => void;
  onSelect: (key: RoutePointKey, suggestion: Suggestion) => void;
  onSwap: () => void;
};

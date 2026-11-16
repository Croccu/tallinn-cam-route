import type { Coordinates } from "@/types/address.types";

export const DEFAULT_TALLINN_CENTER: Coordinates = [24.7536, 59.437];
export const TALLINN_BBOX = "24.55,59.35,25.0,59.52";
export const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

export function getStaticMapUrl(token: string | null): string | null {
  if (!token) return null;
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${DEFAULT_TALLINN_CENTER.join(",")},12.3,0/1280x640@2x?access_token=${encodeURIComponent(token)}`;
}

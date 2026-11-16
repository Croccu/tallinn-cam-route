import { ENV } from "@/lib/env";
import { DEFAULT_TALLINN_CENTER, TALLINN_BBOX } from "@/lib/mapConfig";
import type { Suggestion } from "@/types/address.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseSuggestion(feature: unknown): Suggestion | null {
  if (!isRecord(feature)) return null;
  const { geometry, properties } = feature;
  if (!isRecord(geometry) || !isRecord(properties)) return null;
  const coordinates: unknown = geometry.coordinates;
  if (!Array.isArray(coordinates)) return null;
  const [longitude, latitude] = coordinates;
  if (
    typeof longitude !== "number" || !Number.isFinite(longitude) ||
    typeof latitude !== "number" || !Number.isFinite(latitude) ||
    Math.abs(longitude) > 180 || Math.abs(latitude) > 90 ||
    typeof properties.mapbox_id !== "string" ||
    typeof properties.name !== "string"
  ) return null;
  const context = typeof properties.place_formatted === "string"
    ? properties.place_formatted : "";
  return {
    id: properties.mapbox_id,
    name: properties.name,
    context,
    fullAddress: typeof properties.full_address === "string"
      ? properties.full_address
      : [properties.name, context].filter(Boolean).join(", "),
    coordinates: [longitude, latitude],
  };
}

export async function fetchSuggestions(
  query: string,
  signal: AbortSignal,
): Promise<Suggestion[]> {
  if (!ENV.mapboxToken) return [];
  const params = new URLSearchParams({
    q: query,
    autocomplete: "true",
    limit: "3",
    country: "ee",
    proximity: DEFAULT_TALLINN_CENTER.join(","),
    bbox: TALLINN_BBOX,
    types: "address,street,neighborhood,locality,place",
    access_token: ENV.mapboxToken,
  });
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?${params}`,
    { signal },
  );
  if (!response.ok) throw new Error("Address suggestions could not load.");
  const data: unknown = await response.json();
  if (!isRecord(data) || !Array.isArray(data.features)) {
    throw new Error("Invalid geocoding response.");
  }
  return data.features.flatMap((feature: unknown) => {
    const suggestion = parseSuggestion(feature);
    return suggestion ? [suggestion] : [];
  });
}

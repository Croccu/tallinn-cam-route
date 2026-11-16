function validatePublicMapboxToken(value: string | undefined): string | null {
  const token = value?.trim();
  // Only public tokens are accepted for browser configuration.
  return token && /^pk\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)
    ? token
    : null;
}

export const ENV = {
  mapboxToken: validatePublicMapboxToken(process.env.NEXT_PUBLIC_MAPBOX_TOKEN),
};

export const MAPBOX_CONFIGURATION_MESSAGE =
  "Set a valid public NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to display the map and calculate directions.";

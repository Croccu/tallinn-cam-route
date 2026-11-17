import type { CameraStatus } from "@/types/camera.types";

function isCameraStatus(value: unknown): value is CameraStatus {
  return (
    typeof value === "object" &&
    value !== null &&
    "isOnline" in value &&
    typeof value.isOnline === "boolean"
  );
}

/**
 * Returns null when the status cannot be determined, so callers can fall
 * back to showing the feed.
 */
export async function fetchCameraStatus(
  cameraId: string,
  signal: AbortSignal,
): Promise<CameraStatus | null> {
  try {
    const response = await fetch(
      `/api/cameras/${encodeURIComponent(cameraId)}/status`,
      {
        cache: "no-store",
        signal,
      },
    );

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    return isCameraStatus(data) ? data : null;
  } catch {
    return null;
  }
}

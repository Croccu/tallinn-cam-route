import { NextResponse } from "next/server";
import { CAMERA_LOCATIONS } from "@/lib/cameraLocations";
import { getCameraImageUrl } from "@/lib/cameraUtils";
import type { CameraStatus } from "@/types/camera.types";

type CameraStatusContext = {
  params: Promise<{ cameraId: string }>;
};

// Live cameras update every few seconds; slow ones lag by a few minutes.
const CAMERA_OFFLINE_AFTER_MS = 10 * 60 * 1000;
const CAMERA_STATUS_TIMEOUT_MS = 5000;

// Only proxy cameras we list, so the route cannot probe arbitrary URLs.
const KNOWN_CAMERA_IDS = new Set(
  CAMERA_LOCATIONS.flatMap((location) =>
    location.cameras.map((camera) => camera.id),
  ),
);

/**
 * Offline cameras keep serving a placeholder JPEG that stops updating, so a
 * stale Last-Modified header means the camera is offline. The browser cannot
 * read that header itself because the camera server sends no CORS headers.
 */
export async function GET(_request: Request, { params }: CameraStatusContext) {
  const { cameraId } = await params;

  if (!KNOWN_CAMERA_IDS.has(cameraId)) {
    return NextResponse.json(
      {
        error: "Unknown camera.",
      },
      {
        status: 404,
      },
    );
  }

  try {
    const response = await fetch(
      getCameraImageUrl(cameraId, String(Date.now())),
      {
        method: "HEAD",
        cache: "no-store",
        signal: AbortSignal.timeout(CAMERA_STATUS_TIMEOUT_MS),
      },
    );
    const lastModified = Date.parse(
      response.headers.get("last-modified") ?? "",
    );
    const status: CameraStatus = {
      isOnline:
        response.ok &&
        Number.isFinite(lastModified) &&
        Date.now() - lastModified < CAMERA_OFFLINE_AFTER_MS,
    };

    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: "Camera status is unavailable.",
      },
      {
        status: 502,
      },
    );
  }
}

"use client";

import { useEffect, useState } from "react";
import { fetchCameraStatus } from "@/lib/cameraStatus";

const CAMERA_STATUS_INTERVAL_MS = 30_000;

export type CameraConnection = "checking" | "online" | "offline";

/**
 * Tracks whether a camera is sending images. Unknown results count as
 * online, so a failed check never hides a working feed.
 */
export function useCameraStatus(cameraId: string): CameraConnection {
  const [connection, setConnection] = useState<CameraConnection>("checking");

  useEffect(() => {
    const controller = new AbortController();

    const checkStatus = async () => {
      const status = await fetchCameraStatus(cameraId, controller.signal);

      if (controller.signal.aborted) {
        return;
      }

      if (status && !status.isOnline) {
        setConnection("offline");
      } else {
        setConnection("online");
      }
    };

    void checkStatus();
    const intervalId = window.setInterval(() => {
      void checkStatus();
    }, CAMERA_STATUS_INTERVAL_MS);

    return () => {
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, [cameraId]);

  return connection;
}

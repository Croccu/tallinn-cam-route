"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Video, VideoOff, X } from "lucide-react";
import { useCameraStatus } from "@/hooks/useCameraStatus";
import {
  CAMERA_REFRESH_INTERVAL_MS,
  getCameraImageUrl,
} from "@/lib/cameraUtils";
import type { CameraLocation, TrafficCamera } from "@/types/camera.types";
import "./CameraFeed.css";

type CameraFeedProps = {
  location: CameraLocation;
  openedAt: number;
  onClose: () => void;
};

type LiveCameraImageProps = {
  camera: TrafficCamera;
  openedAt: number;
};

type CameraViewProps = LiveCameraImageProps;

const CAMERA_IMAGE_WIDTH = 1280;
const CAMERA_IMAGE_HEIGHT = 720;

/**
 * The cameras publish still JPEGs. Each frame is requested only after the
 * previous one settles, so slow connections never abort frames mid-load.
 */
function LiveCameraImage({ camera, openedAt }: LiveCameraImageProps) {
  const [frame, setFrame] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scheduleNextFrame = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setFrame((current) => current + 1);
    }, CAMERA_REFRESH_INTERVAL_MS);
  };

  return (
    <Image
      className="camera-feed__image"
      src={getCameraImageUrl(camera.id, `${openedAt}-${frame}`)}
      alt={`Live view: ${camera.name}`}
      width={CAMERA_IMAGE_WIDTH}
      height={CAMERA_IMAGE_HEIGHT}
      unoptimized
      onLoad={scheduleNextFrame}
      onError={scheduleNextFrame}
    />
  );
}

function CameraView({ camera, openedAt }: CameraViewProps) {
  const connection = useCameraStatus(camera.id);

  if (connection === "checking") {
    return (
      <div
        className="camera-feed__placeholder"
        aria-busy
      />
    );
  }

  // Replaces the camera server's own offline placeholder image.
  if (connection === "offline") {
    return (
      <div className="camera-feed__placeholder camera-feed__placeholder--offline">
        <VideoOff
          className="camera-feed__offline-icon"
          aria-hidden
        />
        <p className="camera-feed__offline-message">
          Ühendus kaameraga puudub.
        </p>
      </div>
    );
  }

  return (
    <LiveCameraImage
      camera={camera}
      openedAt={openedAt}
    />
  );
}

export function CameraFeed({ location, openedAt, onClose }: CameraFeedProps) {
  return (
    <section
      className="camera-feed"
      aria-label={`Live cameras at ${location.name}`}
    >
      <header className="camera-feed__header">
        <Video
          className="camera-feed__icon"
          aria-hidden
        />
        <h2 className="camera-feed__title">{location.name}</h2>
        <button
          type="button"
          className="camera-feed__close"
          aria-label="Close camera feed"
          onClick={onClose}
        >
          <X
            className="camera-feed__close-icon"
            aria-hidden
          />
        </button>
      </header>
      <ul className="camera-feed__list">
        {location.cameras.map((camera) => (
          <li key={camera.id}>
            <figure className="camera-feed__figure">
              <CameraView
                camera={camera}
                openedAt={openedAt}
              />
              <figcaption className="camera-feed__caption">
                {camera.name}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

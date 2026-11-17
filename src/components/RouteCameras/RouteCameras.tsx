import { ChevronRight, Video } from "lucide-react";
import type { CameraLocation } from "@/types/camera.types";
import "./RouteCameras.css";

type RouteCamerasProps = {
  locations: CameraLocation[];
  selectedLocationId: string | null;
  onSelect: (locationId: string) => void;
};

function formatViewCount(count: number): string {
  return count === 1 ? "1 view" : `${count} views`;
}

export function RouteCameras({
  locations,
  selectedLocationId,
  onSelect,
}: RouteCamerasProps) {
  return (
    <section
      aria-label="Cameras on your route"
      className="route-cameras"
    >
      <h2 className="route-cameras__heading">
        Cameras on your route ({locations.length})
      </h2>
      {locations.length === 0 && (
        <p className="route-cameras__empty">
          No traffic cameras along this route yet.
        </p>
      )}
      {locations.length > 0 && (
        <ol className="route-cameras__list">
          {locations.map((location) => {
            const isSelected = location.id === selectedLocationId;

            return (
              <li key={location.id}>
                <button
                  type="button"
                  className={
                    isSelected
                      ? "route-cameras__item route-cameras__item--selected"
                      : "route-cameras__item"
                  }
                  aria-pressed={isSelected}
                  onClick={() => onSelect(location.id)}
                >
                  <Video
                    className="route-cameras__icon"
                    aria-hidden
                  />
                  <span className="route-cameras__text">
                    <span className="route-cameras__name">{location.name}</span>
                    <span className="route-cameras__count">
                      {formatViewCount(location.cameras.length)}
                    </span>
                  </span>
                  <ChevronRight
                    className="route-cameras__chevron"
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

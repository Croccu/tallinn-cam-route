import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CornerUpLeft,
  CornerUpRight,
  Flag,
  LoaderCircle,
  Route,
  RotateCcw,
  Undo2,
} from "lucide-react";
import { formatDistance, formatDuration } from "@/lib/routeUtils";
import type { DirectionsListProps, ManeuverIconProps } from "./DirectionsList.types";
import "./DirectionsList.css";

function ManeuverIcon({ step }: ManeuverIconProps) {
  const { type, modifier } = step.maneuver;
  const Icon =
    type === "arrive"
      ? Flag
      : type === "roundabout" || type === "rotary"
        ? RotateCcw
        : modifier === "uturn"
          ? Undo2
          : modifier === "sharp left"
            ? ArrowLeft
            : modifier === "sharp right"
              ? ArrowRight
              : modifier?.includes("left")
                ? CornerUpLeft
                : modifier?.includes("right")
                  ? CornerUpRight
                  : ArrowUp;
  return (
    <Icon
      className="directions-list__maneuver-icon"
      aria-hidden
    />
  );
}

export function DirectionsList({ state }: DirectionsListProps) {
  return (
    <section aria-label="Directions" className="directions-list">
      <h2 className="directions-list__heading">
        Directions
      </h2>
      <div role="status" aria-live="polite">
        {state.status === "idle" && (
          <div className="directions-list__empty">
            <Route className="directions-list__empty-icon" aria-hidden />
            <p className="directions-list__description">
              Choose a start point and destination to see turn-by-turn directions.
            </p>
          </div>
        )}
        {state.status === "loading" && (
          <p className="directions-list__loading">
            <LoaderCircle className="directions-list__spinner" aria-hidden />
            Finding your route…
          </p>
        )}
        {state.status === "success" && state.route && (
          <div className="directions-list__summary">
            <p className="directions-list__duration">
              {formatDuration(state.route.duration)}
            </p>
            <p className="directions-list__description">
              {formatDistance(state.route.distance)} · Driving
            </p>
          </div>
        )}
      </div>
      {state.status === "error" && (
        <p
          role="alert"
          className="directions-list__error"
        >
          {state.error}
        </p>
      )}
      {state.status === "success" && state.route && (
        <ol className="directions-list__steps">
          {state.route.legs.flatMap((leg) => leg.steps).map((step, index) => (
            <li key={index} className="directions-list__step">
              <span className="directions-list__maneuver">
                <ManeuverIcon step={step} />
              </span>
              <div className="directions-list__instruction">
                <p className="directions-list__description">{step.maneuver.instruction}</p>
                <p className="directions-list__distance">
                  {formatDistance(step.distance)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

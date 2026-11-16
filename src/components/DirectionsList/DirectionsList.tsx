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
import type { RouteState, RouteStep } from "@/types/route.types";
import "./DirectionsList.css";

type DirectionsListProps = { state: RouteState };
type ManeuverIconProps = { step: RouteStep };

function ManeuverIcon({ step }: ManeuverIconProps) {
  const { type, modifier } = step.maneuver;
  let Icon = ArrowUp;

  if (type === "arrive") {
    Icon = Flag;
  } else if (type === "roundabout" || type === "rotary") {
    Icon = RotateCcw;
  } else if (modifier === "uturn") {
    Icon = Undo2;
  } else if (modifier === "sharp left") {
    Icon = ArrowLeft;
  } else if (modifier === "sharp right") {
    Icon = ArrowRight;
  } else if (modifier?.includes("left")) {
    Icon = CornerUpLeft;
  } else if (modifier?.includes("right")) {
    Icon = CornerUpRight;
  }

  return (
    <Icon
      className="directions-list__maneuver-icon"
      aria-hidden
    />
  );
}

export function DirectionsList({ state }: DirectionsListProps) {
  return (
    <section
      aria-label="Directions"
      className="directions-list"
    >
      <h2 className="directions-list__heading">Directions</h2>
      <div
        role="status"
        aria-live="polite"
      >
        {state.status === "idle" && (
          <div className="directions-list__empty">
            <Route
              className="directions-list__empty-icon"
              aria-hidden
            />
            <p className="directions-list__description">
              Choose a start point and destination to see turn-by-turn
              directions.
            </p>
          </div>
        )}
        {state.status === "loading" && (
          <p className="directions-list__loading">
            <LoaderCircle
              className="directions-list__spinner"
              aria-hidden
            />
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
          {state.route.legs
            .flatMap((leg) => leg.steps)
            .map((step, index) => (
              <li
                key={index}
                className="directions-list__step"
              >
                <span className="directions-list__maneuver">
                  <ManeuverIcon step={step} />
                </span>
                <div className="directions-list__instruction">
                  <p className="directions-list__description">
                    {step.maneuver.instruction}
                  </p>
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

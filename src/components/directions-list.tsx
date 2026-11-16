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
import type { RouteState, RouteStep } from "@/types/route";

function formatDistance(meters: number) {
  return meters < 1000
    ? `${Math.round(meters)} m`
    : `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}`;
}

function ManeuverIcon({ step }: { step: RouteStep }) {
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
      className="size-4 shrink-0 text-blue-600 dark:text-blue-400"
      aria-hidden
    />
  );
}

export default function DirectionsList({ state }: { state: RouteState }) {
  return (
    <section aria-label="Directions" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Directions
      </h2>
      <div role="status" aria-live="polite">
        {state.status === "idle" && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center dark:border-zinc-700">
            <Route className="size-6 text-zinc-400" aria-hidden />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Choose a start point and destination to see turn-by-turn directions.
            </p>
          </div>
        )}
        {state.status === "loading" && (
          <p className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            Finding your route…
          </p>
        )}
        {state.status === "success" && state.route && (
          <div className="rounded-lg bg-blue-50 px-4 py-3 dark:bg-blue-950/40">
            <p className="font-semibold text-blue-700 dark:text-blue-300">
              {formatDuration(state.route.duration)}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {formatDistance(state.route.distance)} · Driving
            </p>
          </div>
        )}
      </div>
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-400"
        >
          {state.error}
        </p>
      )}
      {state.status === "success" && state.route && (
        <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {state.route.legs.flatMap((leg) => leg.steps).map((step, index) => (
            <li key={index} className="flex items-start gap-3 py-3">
              <span className="mt-0.5">
                <ManeuverIcon step={step} />
              </span>
              <div className="min-w-0">
                <p className="text-sm">{step.maneuver.instruction}</p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
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

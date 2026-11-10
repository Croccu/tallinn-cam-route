import { Camera } from "lucide-react";

export default function CameraList() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Cameras on route
      </h2>

      <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center dark:border-zinc-700">
        <Camera className="size-6 text-zinc-400" aria-hidden />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter a start point and destination to see the traffic cameras along
          your route.
        </p>
      </div>
    </section>
  );
}

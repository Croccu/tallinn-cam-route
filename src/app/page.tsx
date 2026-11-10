import { Cctv } from "lucide-react";
import RouteForm from "@/components/route-form";
import CameraList from "@/components/camera-list";
import MapPlaceholder from "@/components/map-placeholder";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Cctv className="size-5 text-blue-600 dark:text-blue-400" aria-hidden />
        <span className="font-semibold tracking-tight">Tallinn Cam Route</span>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside className="flex shrink-0 flex-col gap-6 border-zinc-200 p-4 md:w-96 md:overflow-y-auto md:border-r dark:border-zinc-800">
          <RouteForm />
          <CameraList />
        </aside>

        <main className="min-h-80 flex-1 p-4">
          <MapPlaceholder />
        </main>
      </div>
    </div>
  );
}

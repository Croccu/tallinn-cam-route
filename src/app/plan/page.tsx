import type { Metadata } from "next";
import Link from "next/link";
import { Cctv } from "lucide-react";
import RouteForm from "@/components/route-form";
import CameraList from "@/components/camera-list";
import Map from "@/components/map";

export const metadata: Metadata = {
  title: "Plan your route · Tallinn Cam Route",
};

export default function PlanPage() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-14 shrink-0 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-2">
          <Cctv className="size-5 text-blue-600 dark:text-blue-400" aria-hidden />
          <span className="font-semibold tracking-tight">Tallinn Cam Route</span>
        </Link>
      </header>

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside className="flex shrink-0 flex-col gap-6 border-zinc-200 p-4 md:w-96 md:overflow-y-auto md:border-r dark:border-zinc-800">
          <RouteForm />
          <CameraList />
        </aside>

        <main className="min-h-80 flex-1 p-4">
          <Map/>
        </main>
      </div>
    </div>
  );
}

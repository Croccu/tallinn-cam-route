import { Cctv } from "lucide-react";
import RoutePlanner from "@/components/route-planner";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Cctv className="size-5 text-blue-600 dark:text-blue-400" aria-hidden />
        <span className="font-semibold tracking-tight">Tallinn Cam Route</span>
      </header>

      <RoutePlanner />
    </div>
  );
}

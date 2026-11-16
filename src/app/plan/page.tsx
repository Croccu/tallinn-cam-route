import type { Metadata } from "next";
import Link from "next/link";
import { Cctv } from "lucide-react";
import RoutePlanner from "@/components/route-planner";

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

      <RoutePlanner />
    </div>
  );
}

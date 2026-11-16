import Link from "next/link";
import { Cctv } from "lucide-react";
import { RoutePlanner } from "@/components/RoutePlanner";
import type { PlannerPageProps } from "./PlannerPage.types";
import "./PlannerPage.css";

export function PlannerPage({ title }: PlannerPageProps) {
  return (
    <div className="planner-page">
      <header className="planner-page__header">
        <Link href="/" className="planner-page__brand">
          <Cctv className="planner-page__icon" aria-hidden />
          <span className="planner-page__title">{title}</span>
        </Link>
      </header>
      <RoutePlanner />
    </div>
  );
}

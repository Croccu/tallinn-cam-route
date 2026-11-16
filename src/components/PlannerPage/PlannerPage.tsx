import Link from "next/link";
import { Cctv } from "lucide-react";
import { RoutePlanner } from "@/components/RoutePlanner/RoutePlanner";
import "./PlannerPage.css";

type PlannerPageProps = { title: string };

export function PlannerPage({ title }: PlannerPageProps) {
  return (
    <div className="planner-page">
      <header className="planner-page__header">
        <Link
          href="/"
          className="planner-page__brand"
        >
          <Cctv
            className="planner-page__icon"
            aria-hidden
          />
          <span className="planner-page__title">{title}</span>
        </Link>
      </header>
      <RoutePlanner />
    </div>
  );
}

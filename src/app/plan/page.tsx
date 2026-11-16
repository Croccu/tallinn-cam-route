import type { Metadata } from "next";
import { PlannerPage } from "@/components/PlannerPage/PlannerPage";

export const metadata: Metadata = {
  title: "Plan your route · Tallinn Cam Route",
};

export default function PlanPage() {
  return <PlannerPage title="Tallinn Cam Route" />;
}

import { Hero } from "@/components/Hero";
import { MapSection } from "@/components/MapSection";
import { ENV } from "@/lib/env";
import { getStaticMapUrl } from "@/lib/mapConfig";

export default function Home() {
  return (
    <>
      <Hero title="Tallinn Cam Route" />
      <MapSection staticMapUrl={getStaticMapUrl(ENV.mapboxToken)} />
    </>
  );
}

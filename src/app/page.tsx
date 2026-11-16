import { Hero } from "@/components/Hero/Hero";
import { MapSection } from "@/components/MapSection/MapSection";
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

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Cctv, Flag, MapPin, Route, Search } from "lucide-react";
import { MAPBOX_CONFIGURATION_MESSAGE } from "@/lib/env";
import type { HowItWorksStep, MapSectionProps } from "./MapSection.types";
import "./MapSection.css";

const STEPS: HowItWorksStep[] = [
  { icon: Search, title: "Pick your start and destination", text: "Start typing an address and pick from the suggestions as you go." },
  { icon: Route, title: "Get your route", text: "See the way from A to B drawn across the Tallinn city map." },
  { icon: Camera, title: "Check the cameras", text: "Look at the traffic cameras along the way and spot jams before you leave." },
];

export function MapSection({ staticMapUrl }: MapSectionProps) {
  return (
    <section id="map" className="map-section">
      <div className="map-section__content">
        <p className="map-section__eyebrow">PLAN YOUR ROUTE</p>
        <h2 className="map-section__heading">All of Tallinn, one route at a time</h2>
        <p className="map-section__description">
          From Kopli to Lasnamäe, see which traffic cameras sit along your way before you set off.
        </p>
        <div className="map-section__preview">
          {staticMapUrl ? (
            <Image src={staticMapUrl} alt="Street map of central Tallinn" width={1280} height={640} unoptimized className="map-section__image" />
          ) : (
            <div className="map-section__placeholder">{MAPBOX_CONFIGURATION_MESSAGE}</div>
          )}
          <Link href="/plan" aria-label="Open the route planner" className="map-section__planner-link">
            <span className="map-section__field"><MapPin className="map-section__start-icon" aria-hidden />Choose starting point</span>
            <span className="map-section__field"><Flag className="map-section__end-icon" aria-hidden />Choose destination</span>
            <span className="map-section__find"><Search className="map-section__icon" aria-hidden />Find cameras on route</span>
          </Link>
        </div>
        <div id="how" className="map-section__how">
          <h2 className="map-section__how-heading">How it works</h2>
          <ol className="map-section__steps">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="map-section__step">
                <span className="map-section__step-mark"><Icon className="map-section__step-icon" aria-hidden /></span>
                <h3 className="map-section__step-heading"><span className="map-section__step-number">{index + 1}. </span>{title}</h3>
                <p className="map-section__step-description">{text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="map-section__cta">
          <h2 className="map-section__cta-heading">Ready to head out?</h2>
          <Link href="/plan" className="map-section__action">Plan your route<ArrowRight className="map-section__arrow" aria-hidden /></Link>
        </div>
        <footer className="map-section__footer">
          <span className="map-section__brand"><Cctv className="map-section__icon" aria-hidden />Tallinn Cam Route</span>
          <span>Map data © Mapbox © OpenStreetMap</span>
        </footer>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cctv, ChevronDown } from "lucide-react";
import heroImage from "../../../public/hero-traffic.jpg";
import "./Hero.css";

type HeroProps = { title: string };

export function Hero({ title }: HeroProps) {
  return (
    <section className="hero">
      <Image
        src={heroImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        className="hero__image"
      />
      <div
        className="hero__overlay"
        aria-hidden
      />
      <header className="hero__header">
        <Link
          href="/"
          className="hero__brand"
        >
          <span className="hero__brand-mark">
            <Cctv
              className="hero__brand-icon"
              aria-hidden
            />
          </span>
          <span className="hero__brand-name">{title}</span>
        </Link>
        <nav className="hero__navigation">
          <a
            href="#how"
            className="hero__how-link"
          >
            How it works
          </a>
          <Link
            href="/plan"
            className="hero__header-action"
          >
            Plan your route
          </Link>
        </nav>
      </header>
      <div className="hero__content">
        <p className="hero__eyebrow">
          Traffic cameras on your way through Tallinn
        </p>
        <h1 className="hero__heading">
          See the road
          <br />
          before you drive it
        </h1>
        <div className="hero__actions">
          <Link
            href="/plan"
            className="hero__primary-action"
          >
            Plan your route
            <ArrowRight
              className="hero__arrow"
              aria-hidden
            />
          </Link>
          <a
            href="#map"
            className="hero__map-link"
          >
            See the map
            <ChevronDown
              className="hero__icon"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}

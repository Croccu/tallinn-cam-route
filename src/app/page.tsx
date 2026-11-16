import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Cctv,
  ChevronDown,
  Flag,
  MapPin,
  Route,
  Search,
} from "lucide-react";
import heroImage from "../../public/hero-traffic.jpg";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// A single static image of Tallinn, so the landing page never loads the
// interactive map. Same style as the map on /plan.
const staticMapUrl = accessToken
  ? `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/24.7536,59.437,12.3,0/1280x640@2x?access_token=${accessToken}`
  : null;

const steps = [
  {
    icon: Search,
    title: "Pick your start and destination",
    text: "Start typing an address and pick from the suggestions as you go.",
  },
  {
    icon: Route,
    title: "Get your route",
    text: "See the way from A to B drawn across the Tallinn city map.",
  },
  {
    icon: Camera,
    title: "Check the cameras",
    text: "Look at the traffic cameras along the way and spot jams before you leave.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-950">
      <Hero />
      <MapSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-zinc-800 pb-24">
      <Image
        src={heroImage}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
      />
      {/* Darken the photo so the white text stays readable */}
      <div
        className="absolute inset-0 bg-linear-to-b from-black/60 via-black/35 to-black/55"
        aria-hidden
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 text-white sm:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Cctv className="size-5" aria-hidden />
          </span>
          <span className="font-semibold tracking-tight">Tallinn Cam Route</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <a href="#how" className="hidden hover:text-sky-100 sm:block">
            How it works
          </a>
          <Link
            href="/plan"
            className="rounded-full bg-white px-5 py-2.5 text-sky-700 shadow-sm transition hover:bg-sky-50"
          >
            Plan your route
          </Link>
        </nav>
      </header>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center text-white">
        <p className="text-base font-semibold drop-shadow-sm sm:text-xl">
          Traffic cameras on your way through Tallinn
        </p>
        <h1 className="mt-6 text-5xl leading-[0.95] font-extrabold tracking-tight drop-shadow-md sm:text-7xl lg:text-8xl">
          See the road
          <br />
          before you drive it
        </h1>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/plan"
            className="group flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 font-semibold shadow-lg shadow-blue-900/20 transition hover:bg-blue-700"
          >
            Plan your route
            <ArrowRight
              className="size-4 transition group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <a
            href="#map"
            className="flex items-center gap-1 rounded-full px-5 py-3.5 font-semibold hover:bg-white/10"
          >
            See the map
            <ChevronDown className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section
      id="map"
      className="relative z-10 -mt-12 rounded-t-[3rem] bg-zinc-950 px-4 pt-20 pb-16 text-white sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold tracking-[0.25em] text-sky-400">
          PLAN YOUR ROUTE
        </p>
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight sm:text-5xl">
          All of Tallinn, one route at a time
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-zinc-400">
          From Kopli to Lasnamäe, see which traffic cameras sit along your way
          before you set off.
        </p>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-zinc-900 ring-1 ring-white/10">
          {staticMapUrl ? (
            <Image
              src={staticMapUrl}
              alt="Street map of central Tallinn"
              width={1280}
              height={640}
              unoptimized
              className="h-[440px] w-full object-cover sm:h-auto"
            />
          ) : (
            <div className="flex h-[440px] items-center justify-center p-6 text-center text-sm text-zinc-400 sm:aspect-[2/1] sm:h-auto">
              Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to show the map.
            </div>
          )}

          <Link
            href="/plan"
            aria-label="Open the route planner"
            className="group absolute inset-x-4 bottom-4 flex flex-col gap-2 rounded-2xl bg-white p-4 text-sm text-zinc-500 shadow-2xl transition hover:-translate-y-0.5 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-80"
          >
            <span className="flex h-10 items-center gap-2 rounded-lg bg-zinc-100 px-3">
              <MapPin className="size-4 text-green-600" aria-hidden />
              Choose starting point
            </span>
            <span className="flex h-10 items-center gap-2 rounded-lg bg-zinc-100 px-3">
              <Flag className="size-4 text-red-600" aria-hidden />
              Choose destination
            </span>
            <span className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 font-medium text-white group-hover:bg-blue-700">
              <Search className="size-4" aria-hidden />
              Find cameras on route
            </span>
          </Link>
        </div>

        <div id="how" className="mt-24 scroll-mt-12">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                className="flex flex-col gap-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-sky-500/15 text-sky-400">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-semibold">
                  <span className="text-zinc-500">{i + 1}. </span>
                  {title}
                </h3>
                <p className="text-sm text-zinc-400">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24 flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to head out?
          </h2>
          <Link
            href="/plan"
            className="group flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-700"
          >
            Plan your route
            <ArrowRight
              className="size-4 transition group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-zinc-500 sm:flex-row">
          <span className="flex items-center gap-2 text-zinc-300">
            <Cctv className="size-4" aria-hidden />
            Tallinn Cam Route
          </span>
          <span>Map data © Mapbox © OpenStreetMap</span>
        </footer>
      </div>
    </section>
  );
}

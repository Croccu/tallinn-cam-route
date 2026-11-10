"use client";

import { useState } from "react";
import { ArrowUpDown, Flag, MapPin, Search } from "lucide-react";

export default function RouteForm() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const canSubmit = start.trim() !== "" && end.trim() !== "";

  function swap() {
    setStart(end);
    setEnd(start);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: geocode start/end, build the route and find cameras along it.
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Your route
      </h2>

      <div className="flex items-center gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <label className="relative">
            <span className="sr-only">Start point</span>
            <MapPin
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-green-600"
              aria-hidden
            />
            <input
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="Start point"
              className="h-10 w-full rounded-lg border border-zinc-300 bg-transparent pr-3 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Destination</span>
            <Flag
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-red-600"
              aria-hidden
            />
            <input
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              placeholder="Destination"
              className="h-10 w-full rounded-lg border border-zinc-300 bg-transparent pr-3 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap start and destination"
          className="flex size-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ArrowUpDown className="size-4" aria-hidden />
        </button>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Search className="size-4" aria-hidden />
        Find cameras on route
      </button>
    </form>
  );
}

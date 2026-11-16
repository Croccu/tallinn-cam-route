"use client";

import { useEffect, useId, useState } from "react";
import type { LucideIcon } from "lucide-react";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Bias and limit results to the Tallinn area.
const TALLINN_CENTER = "24.7536,59.437";
const TALLINN_BBOX = "24.55,59.35,25.0,59.52";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 250;

export type Suggestion = {
  id: string;
  name: string;
  context: string;
  fullAddress: string;
  coordinates: [number, number];
};

type GeocodeFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    mapbox_id: string;
    name: string;
    place_formatted?: string;
    full_address?: string;
  };
};

async function fetchSuggestions(
  query: string,
  signal: AbortSignal,
): Promise<Suggestion[]> {
  const params = new URLSearchParams({
    q: query,
    autocomplete: "true",
    limit: "3",
    country: "ee",
    proximity: TALLINN_CENTER,
    bbox: TALLINN_BBOX,
    types: "address,street,neighborhood,locality,place",
    access_token: accessToken ?? "",
  });
  const res = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?${params}`,
    { signal },
  );
  if (!res.ok) throw new Error(`Geocoding failed: ${res.status}`);

  const data: { features: GeocodeFeature[] } = await res.json();
  return data.features.map(({ geometry, properties }) => ({
    id: properties.mapbox_id,
    name: properties.name,
    context: properties.place_formatted ?? "",
    fullAddress:
      properties.full_address ??
      [properties.name, properties.place_formatted].filter(Boolean).join(", "),
    coordinates: geometry.coordinates,
  }));
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: Suggestion) => void;
  label: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export default function AddressInput({
  value,
  onChange,
  onSelect,
  label,
  icon: Icon,
  iconClassName,
}: Props) {
  const inputId = useId();
  const listId = useId();

  // `query` only changes when the user types, so picking a suggestion or
  // swapping fields doesn't trigger a new lookup.
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{
    query: string;
    items: Suggestion[];
  }>({ query: "", items: [] });
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmed = query.trim();

  useEffect(() => {
    if (!accessToken || trimmed.length < MIN_QUERY_LENGTH) return;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchSuggestions(trimmed, controller.signal)
        .then((items) => {
          setResults({ query: trimmed, items });
          setActiveIndex(-1);
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          console.error(err);
          setResults({ query: trimmed, items: [] });
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  // Only show results that belong to the current query, never stale ones.
  const suggestions =
    trimmed.length >= MIN_QUERY_LENGTH &&
    value.trim() === trimmed &&
    results.query === trimmed
      ? results.items
      : [];
  const showList = open && suggestions.length > 0;

  function select(suggestion: Suggestion) {
    onChange(suggestion.fullAddress);
    onSelect?.(suggestion);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
        break;
      case "Enter":
        if (activeIndex >= 0) {
          e.preventDefault();
          select(suggestions[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Icon
        className={`pointer-events-none absolute top-5 left-3 size-4 -translate-y-1/2 ${iconClassName ?? ""}`}
        aria-hidden
      />
      <input
        id={inputId}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        placeholder={label}
        autoComplete="off"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={
          showList && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
        }
        className="h-10 w-full rounded-lg border border-zinc-300 bg-transparent pr-3 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700"
      />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              // Keep focus in the input so blur doesn't close the list first.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => select(s)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex cursor-pointer flex-col px-3 py-2 text-sm ${
                i === activeIndex ? "bg-zinc-100 dark:bg-zinc-800" : ""
              }`}
            >
              <span className="truncate font-medium">{s.name}</span>
              {s.context && (
                <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  {s.context}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

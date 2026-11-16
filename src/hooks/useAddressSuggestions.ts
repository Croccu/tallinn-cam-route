"use client";

import { useEffect, useState } from "react";
import { ENV } from "@/lib/env";
import { fetchSuggestions } from "@/lib/geocoding";
import type { Suggestion } from "@/types/address.types";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 250;

export function useAddressSuggestions(query: string, value: string) {
  const [results, setResults] = useState<{
    query: string;
    items: Suggestion[];
  }>({ query: "", items: [] });
  const trimmedQuery = query.trim();

  useEffect(() => {
    if (!ENV.mapboxToken || trimmedQuery.length < MIN_QUERY_LENGTH) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchSuggestions(trimmedQuery, controller.signal)
        .then((items) => {
          if (!controller.signal.aborted) {
            setResults({ query: trimmedQuery, items });
          }
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setResults({ query: trimmedQuery, items: [] });
          }
        });
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmedQuery]);

  return trimmedQuery.length >= MIN_QUERY_LENGTH &&
    value.trim() === trimmedQuery && results.query === trimmedQuery
    ? results.items : [];
}

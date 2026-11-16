"use client";

import { ArrowUpDown, Flag, MapPin } from "lucide-react";
import AddressInput, { type Suggestion } from "@/components/address-input";

export type RoutePoint = {
  value: string;
  suggestion: Suggestion | null;
};

type Props = {
  start: RoutePoint;
  end: RoutePoint;
  onChange: (key: "start" | "end", value: string) => void;
  onSelect: (key: "start" | "end", suggestion: Suggestion) => void;
  onSwap: () => void;
};

export default function RouteForm({
  start,
  end,
  onChange,
  onSelect,
  onSwap,
}: Props) {
  return (
    <section aria-label="Your route" className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Your route
      </h2>

      <div className="flex items-center gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <AddressInput
            value={start.value}
            onChange={(value) => onChange("start", value)}
            onSelect={(suggestion) => onSelect("start", suggestion)}
            label="Start point"
            icon={MapPin}
            iconClassName="text-green-600"
          />
          <AddressInput
            value={end.value}
            onChange={(value) => onChange("end", value)}
            onSelect={(suggestion) => onSelect("end", suggestion)}
            label="Destination"
            icon={Flag}
            iconClassName="text-red-600"
          />
        </div>

        <button
          type="button"
          onClick={onSwap}
          aria-label="Swap start and destination"
          className="flex size-9 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ArrowUpDown className="size-4" aria-hidden />
        </button>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Select an address suggestion for each point to get driving directions.
      </p>
    </section>
  );
}

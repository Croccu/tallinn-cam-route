"use client";

import { ArrowUpDown, Flag, MapPin } from "lucide-react";
import { AddressInput } from "@/components/AddressInput";
import type { RouteFormProps } from "./RouteForm.types";
import "./RouteForm.css";

export function RouteForm({
  start,
  end,
  onChange,
  onSelect,
  onSwap,
}: RouteFormProps) {
  return (
    <section aria-label="Your route" className="route-form">
      <h2 className="route-form__heading">
        Your route
      </h2>

      <div className="route-form__controls">
        <div className="route-form__points">
          <AddressInput
            value={start.value}
            onChange={(value) => onChange("start", value)}
            onSelect={(suggestion) => onSelect("start", suggestion)}
            label="Start point"
            icon={MapPin}
            variant="start"
          />
          <AddressInput
            value={end.value}
            onChange={(value) => onChange("end", value)}
            onSelect={(suggestion) => onSelect("end", suggestion)}
            label="Destination"
            icon={Flag}
            variant="end"
          />
        </div>

        <button
          type="button"
          onClick={onSwap}
          aria-label="Swap start and destination"
          className="route-form__swap"
        >
          <ArrowUpDown className="route-form__swap-icon" aria-hidden />
        </button>
      </div>

      <p className="route-form__hint">
        Select an address suggestion for each point to get driving directions.
      </p>
    </section>
  );
}

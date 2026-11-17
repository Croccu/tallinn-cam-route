import type { Coordinates } from "@/types/address.types";

export type TrafficCamera = {
  id: string;
  name: string;
};

// One map icon per intersection; several cameras can watch the same one.
export type CameraLocation = {
  id: string;
  name: string;
  coordinates: Coordinates;
  cameras: TrafficCamera[];
};

export type CameraSelection = {
  locationId: string;
  // Unique per opening so the first frame never comes from the HTTP cache.
  openedAt: number;
};

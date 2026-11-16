import type { LucideIcon } from "lucide-react";
import type { Suggestion } from "@/types/address.types";

export type AddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: Suggestion) => void;
  label: string;
  icon: LucideIcon;
  variant: "start" | "end";
};

import { Map as MapIcon } from "lucide-react";

export default function MapPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl bg-zinc-100 text-zinc-400 dark:bg-zinc-900">
      <MapIcon className="size-10" aria-hidden />
      <p className="text-sm">Map coming soon</p>
    </div>
  );
}

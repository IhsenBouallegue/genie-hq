import type { GenieStore } from "@/lib/store/genie-store-type";
import type { OperatingSystem } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand/vanilla";

export interface OSSlice {
  currentOS: OperatingSystem;
}

export const createOSSlice: (
  initialOS: OperatingSystem,
) => StateCreator<GenieStore, [["zustand/immer", never]], [], OSSlice> =
  (initialOS) => () => ({
    currentOS: initialOS,
  });

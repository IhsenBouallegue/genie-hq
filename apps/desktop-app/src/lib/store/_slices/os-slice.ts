import type { OperatingSystem } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand/vanilla";
import type { GenieStore } from "../store-slices";

export interface OSSlice {
  currentOS: OperatingSystem;
}

export const createOSSlice: (
  initialOS: OperatingSystem,
) => StateCreator<GenieStore, [["zustand/immer", never]], [], OSSlice> =
  (initialOS) => () => ({
    currentOS: initialOS,
  });

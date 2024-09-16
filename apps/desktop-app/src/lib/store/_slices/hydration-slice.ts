import type { GenieStore } from "@/lib/store/genie-store-type";
import type { StateCreator } from "zustand";

export interface HydrationSlice {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const createHydrationSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  HydrationSlice
> = (set) => ({
  _hasHydrated: false,

  setHasHydrated: (state) => {
    set({
      _hasHydrated: state,
    });
  },
});

import { createApplicationsSlice } from "@/lib/store/_slices/applications-slice";
import { createHydrationSlice } from "@/lib/store/_slices/hydration-slice";
import { createInstallationSlice } from "@/lib/store/_slices/installation-slice";
import { createOSSlice } from "@/lib/store/_slices/os-slice";
import { createPackageManagerSlice } from "@/lib/store/_slices/package-manager-slice";
import { createProfilesSlice } from "@/lib/store/_slices/profiles-slice";
import type { GenieStore } from "@/lib/store/genie-store-type";
import { getStorage, privateStore } from "@/lib/store/tauri-storage";
import type { OperatingSystem } from "@geniehq/ui/lib/store/types";
import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const createGenieStore = (initialProps: {
  currentOS: OperatingSystem;
}) => {
  return createStore<GenieStore>()(
    persist(
      immer((...a) => ({
        ...createOSSlice(initialProps.currentOS)(...a),
        ...createProfilesSlice(...a),
        ...createPackageManagerSlice(...a),
        ...createApplicationsSlice(...a),
        ...createInstallationSlice(...a),
        ...createHydrationSlice(...a),
      })),
      {
        name: "storage-genie",
        storage: createJSONStorage(() => getStorage(privateStore)),
        onRehydrateStorage: (state) => {
          return () => {
            if (typeof window !== "undefined") {
              state.initializePackageManagers();
              state.setHasHydrated(true);
            }
          };
        },
      },
    ),
  );
};

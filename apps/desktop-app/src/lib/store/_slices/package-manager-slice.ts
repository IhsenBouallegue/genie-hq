import {
  type PackageManager,
  PackageManagerDetails,
  type PackageManagerInfo,
} from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";
import { getPackageManagerInfo } from "../../pm-logic";
import type { GenieStore } from "../store-slices";

export interface PackageManagerSlice {
  currentPackageManagerInfo: PackageManagerInfo | null;
  packageManagers: Record<PackageManager, PackageManagerInfo>;
  initializePackageManagers: () => Promise<void>;
  setCurrentPackageManager: (pm: PackageManager) => Promise<void>;
}

export const createPackageManagerSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  PackageManagerSlice
> = (set, get) => ({
  currentPackageManagerInfo: null,
  packageManagers: PackageManagerDetails,

  initializePackageManagers: async () => {
    const pmList = Object.keys(PackageManagerDetails) as PackageManager[];
    for (const pm of pmList) {
      const { version, status } = await getPackageManagerInfo(pm);
      set((state) => {
        state.packageManagers[pm] = {
          ...state.packageManagers[pm],
          version: version,
          status: status,
        };
      });
    }
  },

  setCurrentPackageManager: async (pm) => {
    const { packageManagers } = get();

    let packageManagerInfo = packageManagers[pm] || {
      ...PackageManagerDetails[pm],
    };

    const { version, status } = await getPackageManagerInfo(pm);

    packageManagerInfo = {
      ...packageManagerInfo,
      version: version,
      status: status,
    };

    set((state) => {
      state.currentPackageManagerInfo = packageManagerInfo;
      state.packageManagers[pm] = packageManagerInfo;
    });
  },
});

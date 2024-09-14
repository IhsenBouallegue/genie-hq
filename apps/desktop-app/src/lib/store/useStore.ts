import { applications, profiles } from "@geniehq/ui/lib/store/data";
import {
  type Application,
  type ApplicationId,
  type OperatingSystem,
  type PackageManager,
  PackageManagerDetails,
  type PackageManagerInfo,
  type Profile,
  type ProfileId,
  isSupportedPackageManager,
} from "@geniehq/ui/lib/store/types";
import { Store } from "@tauri-apps/plugin-store";
import { create } from "zustand";
import {
  type StateStorage,
  createJSONStorage,
  persist,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { detectOSType } from "../logic";
import { getPackageManagerStatus, getPackageManagerVersion } from "../pm-logic";

const privateStore = new Store("./store.bin");

const getStorage = (store: Store): StateStorage => ({
  getItem: async (name: string): Promise<string | null> => {
    const value = (await store.get(name)) || null;
    console.log("getItem", { name, value });

    return (await store.get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log("setItem", { name, value });
    await store.set(name, value);
    await store.save();
  },
  removeItem: async (name: string): Promise<void> => {
    console.log("removeItem", { name });
    await store.delete(name);
    await store.save();
  },
});

type State = {
  profiles: Record<ProfileId, Profile>;
  applications: Record<ApplicationId, Application>;
  selectedProfile: ProfileId | null;
  customApplicationIds: ApplicationId[];
  selectedApplicationIds: ApplicationId[];
  currentOS: OperatingSystem | null;
  currentPackageManagerInfo: PackageManagerInfo | null; // Specific package manager's info
  packageManagers: Record<PackageManager, PackageManagerInfo>; // Store all package managers
  _hasHydrated: boolean;
};

type Actions = {
  setHasHydrated: (state: boolean) => void;
  addProfile: (profile: Profile) => void;
  addApplication: (application: Application) => void;
  selectProfile: (profileId: ProfileId) => void;
  toggleApplication: (applicationId: ApplicationId) => void;
  setCurrentOS: () => void; // New action to set current OS
  setCurrentPackageManager: (pm: PackageManager) => Promise<void>; // Update the current package manager
  initializePackageManagers: () => Promise<void>; // New action to initialize and populate all package managers
  getSelectedProfile: () => Profile | null;
  getSelectedApplications: () => Application[];
};

export const useStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      profiles: Object.fromEntries(
        profiles.map((profile) => [profile.id, profile]),
      ),
      applications: Object.fromEntries(
        applications.map((app) => [app.id, app]),
      ),
      selectedProfile: null,
      customApplicationIds: [],
      selectedApplicationIds: [],
      currentOS: null,
      currentPackageManager: null,
      currentPackageManagerInfo: null,
      packageManagers: PackageManagerDetails,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      addProfile: (profile: Profile) =>
        set((state) => {
          state.profiles[profile.id] = profile;
        }),
      addApplication: (application: Application) =>
        set((state) => {
          state.applications[application.id] = application;
        }),
      selectProfile: (profileId: string) =>
        set((state) => {
          const profile = state.profiles[profileId];
          if (profile) {
            state.selectedProfile = profileId;
            state.selectedApplicationIds = profile.relevantApplications;
            state.customApplicationIds = [];
          }
        }),
      toggleApplication: (applicationId: string) =>
        set((state) => {
          const index = state.selectedApplicationIds.indexOf(applicationId);
          if (index > -1) {
            state.selectedApplicationIds.splice(index, 1);
          } else {
            state.selectedApplicationIds.push(applicationId);
            if (!state.selectedProfile) state.selectedProfile = "custom";
          }
        }),
      setCurrentOS: async () => {
        const os = await detectOSType();
        set((state) => {
          state.currentOS = os;
        });
      },

      getSelectedProfile: () => {
        const state = get();
        return state.selectedProfile
          ? state.profiles[state.selectedProfile] || null
          : null;
      },
      getSelectedApplications: () => {
        const state = get();
        return state.selectedApplicationIds
          .map((id) => state.applications[id])
          .filter((app): app is Application => app !== undefined);
      },

      initializePackageManagers: async () => {
        // const currentOs = get().currentOS;

        // const version = await getPackageManagerVersion(packageManager);
        // const status = await getPackageManagerStatus(packageManager);
        // const isSupported = currentOs
        // ? isSupportedPackageManager(packageManager, currentOs)
        // : false;

        get().packageManagers.Scoop.version = "1.0.0";
        get().packageManagers.Scoop.status = "available";
        get().packageManagers.Scoop.isSupported = true;

        // state.packageManagers[packageManager].isSupported = isSupported;
      },

      setCurrentPackageManager: async (pm: PackageManager) => {
        const { packageManagers } = get();

        // Get the base details for the selected package manager
        let packageManagerInfo = packageManagers[pm] || {
          ...PackageManagerDetails[pm],
        };

        // Dynamically fetch version and status
        const version = await getPackageManagerVersion(pm);
        const status = await getPackageManagerStatus(pm);

        // Update the info
        packageManagerInfo = {
          ...packageManagerInfo,
          version: version || "Unknown",
          status: status || "available",
        };

        // Update both the current package manager info and the whole packageManagers object
        set((state) => {
          state.currentPackageManagerInfo = packageManagerInfo;
          state.packageManagers[pm] = packageManagerInfo; // Update in the list of all managers
        });
      },
    })),
    {
      name: "storage-genie",
      storage: createJSONStorage(() => getStorage(privateStore)),

      onRehydrateStorage: (state) => {
        return () => {
          if (typeof window !== "undefined") {
            state?.setCurrentOS();
            state?.initializePackageManagers();
            state?.setHasHydrated(true);
          }
        };
      },
    },
  ),
);

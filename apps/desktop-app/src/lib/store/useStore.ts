import { applications, profiles } from "@geniehq/ui/lib/store/data";
import {
  type Application,
  type ApplicationId,
  type OperatingSystem,
  type PackageManager,
  type Profile,
  type ProfileId,
  supportedPackageManagerForOS,
} from "@geniehq/ui/lib/store/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { detectOSType } from "../logic";

type State = {
  openSteps: string[];
  profiles: Record<ProfileId, Profile>;
  applications: Record<ApplicationId, Application>;
  selectedProfile: ProfileId | null;
  customApplicationIds: ApplicationId[];
  selectedApplicationIds: ApplicationId[];
  currentOS: OperatingSystem | null;
  currentPackageManager: PackageManager | null;
};

type Actions = {
  setOpenSteps: (steps: string[]) => void;
  addProfile: (profile: Profile) => void;
  addApplication: (application: Application) => void;
  selectProfile: (profileId: ProfileId) => void;
  toggleApplication: (applicationId: ApplicationId) => void;
  setCurrentOS: () => void; // New action to set current OS
  setCurrentPackageManager: (pm: PackageManager) => void; // New action to set package manager
  getSelectedProfile: () => Profile | null;
  getSelectedApplications: () => Application[];
};

export const useStore = create<State & Actions>()(
  immer((set, get) => ({
    openSteps: ["profile-step"],
    profiles: Object.fromEntries(
      profiles.map((profile) => [profile.id, profile]),
    ),
    applications: Object.fromEntries(applications.map((app) => [app.id, app])),
    selectedProfile: null,
    customApplicationIds: [],
    selectedApplicationIds: [],
    currentOS: null,
    currentPackageManager: null,
    setOpenSteps: (steps: string[]) =>
      set((state) => {
        state.openSteps = steps;
      }),
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
          state.openSteps = [
            "profile-step",
            "applications-step",
            "summary-step",
          ];
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
    setCurrentPackageManager: (pm: PackageManager) =>
      set((state) => {
        state.currentPackageManager = pm;
      }),
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
  })),
);

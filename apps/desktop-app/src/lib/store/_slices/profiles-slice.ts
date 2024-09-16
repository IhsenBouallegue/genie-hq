import type { GenieStore } from "@/lib/store/genie-store-type";
import { profiles } from "@geniehq/ui/lib/store/data";
import type { ApplicationId, Profile, ProfileId } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";

export interface ProfilesSlice {
  profiles: Record<ProfileId, Profile>;
  selectedProfile: ProfileId | null;
  customApplicationIds: ApplicationId[];
  selectedApplicationIds: ApplicationId[];
  addProfile: (profile: Profile) => void;
  selectProfile: (profileId: ProfileId) => void;
  toggleApplication: (applicationId: ApplicationId) => void;
  getSelectedProfile: () => Profile | null;
}

export const createProfilesSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  ProfilesSlice
> = (set, get) => ({
  profiles: Object.fromEntries(profiles.map((profile) => [profile.id, profile])),
  selectedProfile: null,
  customApplicationIds: [],
  selectedApplicationIds: [],

  addProfile: (profile) =>
    set((state) => {
      state.profiles[profile.id] = profile;
    }),

  selectProfile: (profileId) =>
    set((state) => {
      const profile = state.profiles[profileId];
      if (profile) {
        state.selectedProfile = profileId;
        state.selectedApplicationIds = profile.relevantApplications;
        state.customApplicationIds = [];
      }
    }),

  toggleApplication: (applicationId) =>
    set((state) => {
      const index = state.selectedApplicationIds.indexOf(applicationId);
      if (index > -1) {
        state.selectedApplicationIds.splice(index, 1);
      } else {
        state.selectedApplicationIds.push(applicationId);
        if (!state.selectedProfile) state.selectedProfile = "custom";
      }
    }),

  getSelectedProfile: () => {
    const state = get();
    return state.selectedProfile ? state.profiles[state.selectedProfile] || null : null;
  },
});

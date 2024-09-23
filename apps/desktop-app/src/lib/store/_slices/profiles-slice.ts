import type { GenieStore } from "@/lib/store/genie-store-type";
import { profiles } from "@geniehq/ui/lib/store/data";
import type { ApplicationId, Profile, ProfileId } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";

export interface ProfilesSlice {
  profiles: Record<ProfileId, Profile>;
  selectedProfile: ProfileId | null;

  addProfile: (profile: Profile) => void;
  selectProfile: (profileId: ProfileId) => void;
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

  getSelectedProfile: () => {
    const state = get();
    return state.selectedProfile ? state.profiles[state.selectedProfile] || null : null;
  },
});

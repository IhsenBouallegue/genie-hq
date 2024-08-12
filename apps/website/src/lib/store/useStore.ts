import { track } from "@vercel/analytics/react";
// store/useStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { applications, profiles } from "./data";
import type { Application, ApplicationId, Profile, ProfileId } from "./types";

type State = {
  openSteps: string[];
  profiles: Record<ProfileId, Profile>;
  applications: Record<ApplicationId, Application>;
  selectedProfile: ProfileId | null;
  customApplicationIds: ApplicationId[];
  selectedApplicationIds: ApplicationId[];
};

type Actions = {
  setOpenSteps: (steps: string[]) => void;
  addProfile: (profile: Profile) => void;
  addApplication: (application: Application) => void;
  selectProfile: (profileId: ProfileId) => void;
  toggleApplication: (applicationId: ApplicationId) => void;
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
    setOpenSteps: (steps) =>
      set((state) => {
        state.openSteps = steps;
      }),
    addProfile: (profile) =>
      set((state) => {
        state.profiles[profile.id] = profile;
      }),
    addApplication: (application) =>
      set((state) => {
        state.applications[application.id] = application;
      }),
    selectProfile: (profileId) =>
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
    toggleApplication: (applicationId) =>
      set((state) => {
        const index = state.selectedApplicationIds.indexOf(applicationId);
        if (index > -1) {
          // Remove application
          state.selectedApplicationIds.splice(index, 1);
        } else {
          // Add application
          state.selectedApplicationIds.push(applicationId);
          if (!state.selectedProfile) {
            state.selectedProfile = "custom";
          }
        }
      }),
    getSelectedProfile: () => {
      const state = get();
      return state.selectedProfile
        ? state.profiles[state.selectedProfile]
        : null;
    },
    getSelectedApplications: () => {
      const state = get();
      return state.selectedApplicationIds.map((id) => state.applications[id]);
    },
  })),
);

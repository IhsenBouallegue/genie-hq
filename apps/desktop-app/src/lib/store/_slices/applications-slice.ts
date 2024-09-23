import type { GenieStore } from "@/lib/store/genie-store-type";
import { applications } from "@geniehq/ui/lib/store/data";
import type { Application, ApplicationId } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";

export interface ApplicationsSlice {
  applications: Record<ApplicationId, Application>;
  customApplicationIds: ApplicationId[];
  selectedApplicationIds: ApplicationId[];
  addApplication: (application: Application) => void;
  getSelectedApplications: () => Application[];
  toggleApplication: (applicationId: ApplicationId) => void;
}

export const createApplicationsSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  ApplicationsSlice
> = (set, get) => ({
  applications: Object.fromEntries(applications.map((app) => [app.id, app])),
  customApplicationIds: [],
  selectedApplicationIds: [],

  addApplication: (application) =>
    set((state) => {
      state.applications[application.id] = application;
    }),

  getSelectedApplications: () => {
    const state = get();
    return state.selectedApplicationIds
      .map((id) => state.applications[id])
      .filter((app): app is Application => app !== undefined);
  },

  toggleApplication: (applicationId) =>
    set((state) => {
      const index = state.selectedApplicationIds.indexOf(applicationId);
      if (index > -1) {
        state.selectedApplicationIds.splice(index, 1);
        delete state.installationQueue[applicationId];
      } else {
        state.selectedApplicationIds.push(applicationId);
        state.installationQueue[applicationId] = { status: "queued" };
        if (!state.selectedProfile) state.selectedProfile = "custom";
      }
    }),
});

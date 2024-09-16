import type { GenieStore } from "@/lib/store/genie-store-type";
import { applications } from "@geniehq/ui/lib/store/data";
import type { Application, ApplicationId } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";

export interface ApplicationsSlice {
  applications: Record<ApplicationId, Application>;
  addApplication: (application: Application) => void;
  getSelectedApplications: () => Application[];
}

export const createApplicationsSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  ApplicationsSlice
> = (set, get) => ({
  applications: Object.fromEntries(applications.map((app) => [app.id, app])),

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
});

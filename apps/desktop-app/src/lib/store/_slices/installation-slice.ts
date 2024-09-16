import type { GenieStore } from "@/lib/store/genie-store-type";
import type { ApplicationId } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";

export interface InstallationSlice {
  installingApps: ApplicationId[];
  completedApps: ApplicationId[];
  failedApps: Record<ApplicationId, string>;
  totalApps: number;
  progress: number;
  isLoading: boolean;
  installationQueue: ApplicationId[];
  startInstallation: (apps: ApplicationId[]) => void;
  markAppAsCompleted: (appId: ApplicationId) => void;
  markAppAsFailed: (appId: ApplicationId, error: string) => void;
  updateProgress: () => void;
  finishInstallation: () => void;
  queueApps: (apps: ApplicationId | ApplicationId[]) => void;
  processQueue: () => void;
}

export const createInstallationSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  InstallationSlice
> = (set, get) => ({
  installingApps: [],
  completedApps: [],
  failedApps: {},
  totalApps: 0,
  progress: 0,
  isLoading: false,
  installationQueue: [],

  startInstallation: (apps) => {
    set((state) => {
      state.installingApps = apps;
      state.totalApps = apps.length;
      state.isLoading = true;
      state.progress = 0;
    });
  },

  markAppAsCompleted: (appId) => {
    set((state) => {
      state.completedApps.push(appId);
      state.installingApps = state.installingApps.filter((id) => id !== appId);
      state.progress = (state.completedApps.length / state.totalApps) * 100;
    });
  },

  markAppAsFailed: (appId, error) => {
    set((state) => {
      state.failedApps[appId] = error;
      state.installingApps = state.installingApps.filter((id) => id !== appId);
      state.progress =
        ((state.completedApps.length + Object.keys(state.failedApps).length) /
          state.totalApps) *
        100;
    });
  },

  updateProgress: () => {
    set((state) => {
      const totalProcessed =
        state.completedApps.length + Object.keys(state.failedApps).length;
      state.progress = (totalProcessed / state.totalApps) * 100;
    });
  },

  finishInstallation: () => {
    set((state) => {
      state.isLoading = false;
      state.installingApps = [];
      state.totalApps = 0;
    });
  },

  queueApps: (apps) => {
    set((state) => {
      const appsToQueue = Array.isArray(apps) ? apps : [apps];
      state.installationQueue.push(...appsToQueue);
    });
  },

  processQueue: () => {
    const state = get();
    if (state.installationQueue.length > 0) {
      const appsToInstall = state.installationQueue;
      set((state) => {
        state.installationQueue = [];
      });
      state.startInstallation(appsToInstall);
    }
  },
});

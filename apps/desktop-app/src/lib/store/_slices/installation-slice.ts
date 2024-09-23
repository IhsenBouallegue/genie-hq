import { handleSequentialInstallations } from "@/lib/logic";
import type { GenieStore } from "@/lib/store/genie-store-type";
import type { ApplicationId } from "@geniehq/ui/lib/store/types";
import type { StateCreator } from "zustand";

type InstallationQueue = Record<
  string,
  { status: "installing" | "queued" | "finished" | "failed" }
>;
export interface InstallationSlice {
  progress: number;
  isLoading: boolean;
  installationQueue: InstallationQueue;
  startInstallation: () => void;
  markAppAsCompleted: (appId: ApplicationId) => void;
  markAppAsFailed: (appId: ApplicationId, error: string) => void;
  updateProgress: () => void;
  finishInstallation: () => void;
  queueApps: (apps: ApplicationId | ApplicationId[]) => void;
  processQueue: () => void;
  addAppToQueue: (appId: ApplicationId) => void;
  removeAppFromQueue: (appId: ApplicationId) => void;
}

export const createInstallationSlice: StateCreator<
  GenieStore,
  [["zustand/immer", never]],
  [],
  InstallationSlice
> = (set, get) => ({
  progress: 0,
  isLoading: false,
  installationQueue: {},

  startInstallation: () => {
    const applications = get().applications;
    set((state) => {
      if (state.currentPackageManagerInfo) {
        state.isLoading = true;
        state.progress = 0;
        for (const [_, appInfo] of Object.entries(state.installationQueue)) {
          appInfo.status = "installing";
        }

        handleSequentialInstallations(
          Object.values(applications).filter((app) => state.installationQueue[app.id]),
          state.currentPackageManagerInfo?.name,
          get().markAppAsCompleted,
          get().markAppAsFailed,
          get().updateProgress,
          get().finishInstallation,
        );
      }
    });
  },

  markAppAsCompleted: (appId) => {
    set((state) => {
      const app = state.installationQueue[appId];
      if (app) app.status = "finished";
    });
  },

  markAppAsFailed: (appId, error) => {
    set((state) => {
      const app = state.installationQueue[appId];
      if (app) app.status = "failed";
    });
  },

  updateProgress: () => {
    set((state) => {
      const totalApps = Object.keys(get().installationQueue).length;

      const completedApps = Object.values(state.installationQueue)
        .map((obj) => obj.status)
        .filter((status) => status === "failed" || status === "finished").length;
      state.progress = (completedApps / totalApps) * 100;
    });
  },

  finishInstallation: () => {
    set((state) => {
      state.isLoading = false;
    });
  },

  queueApps: (apps) => {
    set((state) => {
      const appsToQueue = Array.isArray(apps) ? apps : [apps];
      state.installationQueue = appsToQueue.reduce((acc: InstallationQueue, appId) => {
        acc[appId] = { status: "queued" };
        return acc;
      }, {});
    });
  },

  processQueue: () => {
    if (Object.keys(get().installationQueue).length > 0) {
      get().startInstallation();
    }
  },

  addAppToQueue: (appId) => {
    set((state) => {
      state.installationQueue[appId] = { status: "queued" };
    });
  },
  removeAppFromQueue: (appId) => {
    set((state) => {
      delete state.installationQueue[appId];
    });
  },
});

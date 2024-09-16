import type { ApplicationId } from "@geniehq/ui/lib/store/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type InstallationState = {
  installingApps: ApplicationId[]; // Apps currently being installed
  completedApps: ApplicationId[]; // Apps that have been successfully installed
  failedApps: Record<ApplicationId, string>; // Apps that failed with error messages
  totalApps: number; // Total number of apps being installed
  progress: number; // Overall progress in percentage
  isLoading: boolean; // Whether the installation is currently in progress
  installationQueue: ApplicationId[]; // Queue of apps waiting to be installed
};

type InstallationActions = {
  startInstallation: (apps: ApplicationId[]) => void;
  markAppAsCompleted: (appId: ApplicationId) => void;
  markAppAsFailed: (appId: ApplicationId, error: string) => void;
  updateProgress: () => void;
  finishInstallation: () => void;
  queueApps: (apps: ApplicationId | ApplicationId[]) => void; // New action to queue apps
  processQueue: () => void; // New action to process the queue
};

export const useInstallationStore = create<InstallationState & InstallationActions>()(
  immer((set, get) => ({
    installingApps: [],
    completedApps: [],
    failedApps: {},
    totalApps: 0,
    progress: 0,
    isLoading: false,
    installationQueue: [], // Initialize the queue

    // Start the installation process
    startInstallation: (apps: ApplicationId[]) => {
      set((state) => {
        state.installingApps = apps;
        state.totalApps = apps.length;
        state.isLoading = true;
        state.progress = 0;
      });
    },

    // Mark an app as completed
    markAppAsCompleted: (appId: ApplicationId) => {
      set((state) => {
        state.completedApps.push(appId);
        state.installingApps = state.installingApps.filter((id) => id !== appId);
        state.progress = (state.completedApps.length / state.totalApps) * 100;
      });
    },

    // Mark an app as failed with an error message
    markAppAsFailed: (appId: ApplicationId, error: string) => {
      set((state) => {
        state.failedApps[appId] = error;
        state.installingApps = state.installingApps.filter((id) => id !== appId);
        state.progress =
          ((state.completedApps.length + Object.keys(state.failedApps).length) / state.totalApps) *
          100;
      });
    },

    // Update the progress based on completed and failed apps
    updateProgress: () => {
      set((state) => {
        const totalProcessed = state.completedApps.length + Object.keys(state.failedApps).length;
        state.progress = (totalProcessed / state.totalApps) * 100;
      });
    },

    // Finish the installation process
    finishInstallation: () => {
      set((state) => {
        state.isLoading = false;
        state.installingApps = [];
        state.totalApps = 0;
      });
    },

    // Queue one or multiple apps for installation
    queueApps: (apps: ApplicationId | ApplicationId[]) => {
      set((state) => {
        const appsToQueue = Array.isArray(apps) ? apps : [apps];
        state.installationQueue.push(...appsToQueue);
      });
    },

    // Process the queue and start installation of queued apps
    processQueue: () => {
      const state = get();
      if (state.installationQueue.length > 0) {
        const appsToInstall = state.installationQueue;
        set((state) => {
          state.installationQueue = []; // Clear the queue after starting installation
        });
        state.startInstallation(appsToInstall);
      }
    },
  })),
);

import {
  type InstalledTool,
  type RegistryTool,
  type ToolVersion,
  checkMiseInstalled,
  installMise,
  installTool,
  installVersion,
  listAvailableVersions,
  listInstalledTools,
  listRegistry,
  uninstallVersion,
  useVersion,
} from "@/lib/mise-api";
import type { StateCreator } from "zustand";
import type { GenieStore } from "../genie-store-type";

export interface MiseEnvironmentState {
  isMiseInstalled: boolean;
  isLoading: boolean;
  installedTools: InstalledTool[];
  availableVersions: Record<string, ToolVersion[]>;
  registryTools: RegistryTool[];
  selectedTool: string | null;
  error: string | null;
}

export interface MiseEnvironmentActions {
  checkMiseInstallation: () => Promise<void>;
  installMise: () => Promise<void>;
  loadInstalledTools: () => Promise<void>;
  loadAvailableVersions: (tool: string) => Promise<void>;
  loadRegistryTools: () => Promise<void>;
  selectTool: (tool: string) => void;
  installToolVersion: (tool: string, version: string) => Promise<void>;
  setToolVersion: (tool: string, version: string, global?: boolean) => Promise<void>;
  uninstallToolVersion: (tool: string, version: string) => Promise<void>;
  installToolFromRegistry: (toolName: string) => Promise<void>;
  installRegistryToolVersion: (toolName: string, version: string) => Promise<void>;
  clearError: () => void;
}

export type MiseEnvironmentSlice = MiseEnvironmentState & MiseEnvironmentActions;

export const createMiseEnvironmentSlice: StateCreator<GenieStore, [], [], MiseEnvironmentSlice> = (
  set,
  get,
) => ({
  // State
  isMiseInstalled: false,
  isLoading: false,
  installedTools: [],
  availableVersions: {},
  registryTools: [],
  selectedTool: null,
  error: null,

  // Actions
  checkMiseInstallation: async () => {
    try {
      const isInstalled = await checkMiseInstalled();
      set({ isMiseInstalled: isInstalled });
    } catch (error) {
      console.error("Failed to check mise installation:", error);
      set({ error: "Failed to check mise installation" });
    }
  },

  installMise: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await installMise();
      if (result.success) {
        set({ isMiseInstalled: true });
      } else {
        set({ error: `Installation failed: ${result.stderr}` });
      }
    } catch (error) {
      console.error("Failed to install mise:", error);
      set({ error: "Failed to install mise" });
    } finally {
      set({ isLoading: false });
    }
  },

  loadInstalledTools: async () => {
    set({ isLoading: true, error: null });
    try {
      const tools = await listInstalledTools();
      set({ installedTools: tools });
    } catch (error) {
      console.error("Failed to load installed tools:", error);
      set({ error: "Failed to load installed tools" });
    } finally {
      set({ isLoading: false });
    }
  },

  loadAvailableVersions: async (tool: string) => {
    set({ isLoading: true, error: null });
    try {
      const versions = await listAvailableVersions(tool);
      set((state) => ({
        availableVersions: {
          ...state.availableVersions,
          [tool]: versions,
        },
      }));
    } catch (error) {
      console.error(`Failed to load versions for ${tool}:`, error);
      set({ error: `Failed to load versions for ${tool}` });
    } finally {
      set({ isLoading: false });
    }
  },

  loadRegistryTools: async () => {
    set({ isLoading: true, error: null });
    try {
      const tools = await listRegistry();
      set({ registryTools: tools });
    } catch (error) {
      console.error("Failed to load registry tools:", error);
      set({ error: "Failed to load registry tools" });
    } finally {
      set({ isLoading: false });
    }
  },

  selectTool: (tool: string) => {
    set({ selectedTool: tool });
    // Load available versions for the selected tool
    get().loadAvailableVersions(tool);
  },

  installToolVersion: async (tool: string, version: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await installVersion(tool, version);
      if (result.success) {
        // Refresh the installed tools and available versions
        await get().loadInstalledTools();
        await get().loadAvailableVersions(tool);
      } else {
        set({ error: `Failed to install ${tool}@${version}: ${result.stderr}` });
      }
    } catch (error) {
      console.error(`Failed to install ${tool}@${version}:`, error);
      set({ error: `Failed to install ${tool}@${version}` });
    } finally {
      set({ isLoading: false });
    }
  },

  setToolVersion: async (tool: string, version: string, global = false) => {
    set({ isLoading: true, error: null });
    const result = await useVersion(tool, version, global);
    try {
      if (result.success) {
        // Refresh the installed tools
        await get().loadInstalledTools();
      } else {
        set({ error: `Failed to set ${tool}@${version} as default: ${result.stderr}` });
      }
    } catch (error) {
      console.error(`Failed to set ${tool}@${version} as default:`, error);
      set({ error: `Failed to set ${tool}@${version} as default` });
    } finally {
      set({ isLoading: false });
    }
  },

  uninstallToolVersion: async (tool: string, version: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await uninstallVersion(tool, version);
      if (result.success) {
        // Refresh the installed tools and available versions
        await get().loadInstalledTools();
        await get().loadAvailableVersions(tool);
      } else {
        set({ error: `Failed to uninstall ${tool}@${version}: ${result.stderr}` });
      }
    } catch (error) {
      console.error(`Failed to uninstall ${tool}@${version}:`, error);
      set({ error: `Failed to uninstall ${tool}@${version}` });
    } finally {
      set({ isLoading: false });
    }
  },

  installToolFromRegistry: async (toolName: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await installTool(toolName);
      if (result.success) {
        // Refresh the installed tools
        await get().loadInstalledTools();
      } else {
        set({ error: `Failed to install tool ${toolName}: ${result.stderr}` });
      }
    } catch (error) {
      console.error(`Failed to install tool ${toolName}:`, error);
      set({ error: `Failed to install tool ${toolName}` });
    } finally {
      set({ isLoading: false });
    }
  },

  installRegistryToolVersion: async (toolName: string, version: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await installVersion(toolName, version);
      if (result.success) {
        // Refresh the installed tools
        await get().loadInstalledTools();
      } else {
        set({ error: `Failed to install ${toolName}@${version}: ${result.stderr}` });
      }
    } catch (error) {
      console.error(`Failed to install ${toolName}@${version}:`, error);
      set({ error: `Failed to install ${toolName}@${version}` });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => {
    set({ error: null });
  },
});

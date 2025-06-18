"use client";

import {
  EmptyState,
  ErrorAlert,
  InstalledToolsGrid,
  MiseInstallPrompt,
  RegistryToolsGrid,
  SearchBar,
  TabNavigation,
  ToolSettingsDialog,
} from "@/components/environment";
import { useGenieStore } from "@/providers/genie-store-provider";
import { useEffect, useState } from "react";

export default function Page() {
  const isMiseInstalled = useGenieStore((state) => state.isMiseInstalled);
  const installedTools = useGenieStore((state) => state.installedTools);
  const availableVersions = useGenieStore((state) => state.availableVersions);
  const registryTools = useGenieStore((state) => state.registryTools);
  const selectedTool = useGenieStore((state) => state.selectedTool);
  const checkMiseInstallation = useGenieStore((state) => state.checkMiseInstallation);
  const loadInstalledTools = useGenieStore((state) => state.loadInstalledTools);
  const loadRegistryTools = useGenieStore((state) => state.loadRegistryTools);
  const selectTool = useGenieStore((state) => state.selectTool);
  const uninstallToolVersion = useGenieStore((state) => state.uninstallToolVersion);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"installed" | "registry">("installed");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTool, setDialogTool] = useState<string | null>(null);

  useEffect(() => {
    checkMiseInstallation();
  }, [checkMiseInstallation]);

  useEffect(() => {
    if (isMiseInstalled) {
      loadInstalledTools();
      loadRegistryTools();
    }
  }, [isMiseInstalled, loadInstalledTools, loadRegistryTools]);

  // Filter installed tools based on search term
  const filteredInstalledTools = installedTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Filter registry tools based on search term
  const filteredRegistryTools = registryTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.backend.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Dialog open handler
  const openDialog = (toolName: string) => {
    setDialogTool(toolName);
    setDialogOpen(true);
    selectTool(toolName);
  };

  // Dialog close handler
  const closeDialog = () => {
    setDialogOpen(false);
    setDialogTool(null);
  };

  // Helper to get selected tool object
  const selectedToolObj = dialogTool
    ? installedTools.find((t) => t.name === dialogTool) || null
    : null;
  const allVersions = dialogTool ? availableVersions[dialogTool] || [] : [];

  // Uninstall tool handler (uninstalls all versions)
  const handleUninstallTool = async () => {
    if (!selectedToolObj) return;
    for (const v of selectedToolObj.versions) {
      if (v.installed) {
        await uninstallToolVersion(selectedToolObj.name, v.version);
      }
    }
    closeDialog();
  };

  if (!isMiseInstalled) {
    return <MiseInstallPrompt />;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Development Environments</h1>

      <ErrorAlert />

      <div className="space-y-4">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} activeTab={activeTab} />

        {/* Content */}
        {activeTab === "installed" && (
          <InstalledToolsGrid
            tools={filteredInstalledTools}
            selectedTool={selectedTool}
            onOpenDialog={openDialog}
          />
        )}

        {activeTab === "registry" && <RegistryToolsGrid tools={filteredRegistryTools} />}

        {/* Empty State */}
        {((activeTab === "installed" && filteredInstalledTools.length === 0) ||
          (activeTab === "registry" && filteredRegistryTools.length === 0)) && (
          <EmptyState activeTab={activeTab} />
        )}
      </div>

      {/* Tool Settings Modal */}
      <ToolSettingsDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        selectedToolObj={selectedToolObj}
        allVersions={allVersions}
        onUninstallTool={handleUninstallTool}
      />
    </div>
  );
}

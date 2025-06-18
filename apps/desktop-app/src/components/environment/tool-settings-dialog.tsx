"use client";

import type { InstalledTool, ToolVersion } from "@/lib/mise-api";
import { Button } from "@geniehq/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@geniehq/ui/components/dialog";
import { useState } from "react";
import { GeneralTab } from "./general-tab";
import { VersionsTab } from "./versions-tab";

interface ToolSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedToolObj: InstalledTool | null;
  allVersions: ToolVersion[];
  onUninstallTool: () => void;
}

export function ToolSettingsDialog({
  open,
  onOpenChange,
  selectedToolObj,
  allVersions,
  onUninstallTool,
}: ToolSettingsDialogProps) {
  const [settingsTab, setSettingsTab] = useState<"versions" | "general">("versions");

  if (!selectedToolObj) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{`Tool Settings: ${selectedToolObj.name}`}</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex gap-4 border-b mb-4 mt-2">
            <button
              type="button"
              className={`pb-2 px-2 border-b-2 ${
                settingsTab === "versions"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
              onClick={() => setSettingsTab("versions")}
            >
              Versions
            </button>
            <button
              type="button"
              className={`pb-2 px-2 border-b-2 ${
                settingsTab === "general"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
              onClick={() => setSettingsTab("general")}
            >
              General
            </button>
          </div>
          {settingsTab === "versions" ? (
            <VersionsTab selectedToolObj={selectedToolObj} allVersions={allVersions} />
          ) : (
            <GeneralTab selectedToolObj={selectedToolObj} onUninstallTool={onUninstallTool} />
          )}
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-6 w-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

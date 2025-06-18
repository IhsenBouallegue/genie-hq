"use client";

import type { InstalledTool } from "@/lib/mise-api";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";

interface GeneralTabProps {
  selectedToolObj: InstalledTool | null;
  onUninstallTool: () => void;
}

export function GeneralTab({ selectedToolObj, onUninstallTool }: GeneralTabProps) {
  const isLoading = useGenieStore((state) => state.isLoading);

  return (
    <div className="space-y-4">
      <div>
        <div className="font-semibold">Tool Name:</div>
        <div className="text-muted-foreground">{selectedToolObj?.name}</div>
      </div>
      <div>
        <div className="font-semibold">Installed Versions:</div>
        <div className="flex flex-wrap gap-2">
          {selectedToolObj?.versions
            .filter((v) => v.installed)
            .map((v) => (
              <Badge key={v.version} variant="outline">
                {v.version}
              </Badge>
            ))}
        </div>
      </div>
      <div>
        <div className="font-semibold">Active Version:</div>
        <div className="text-muted-foreground">
          {selectedToolObj?.versions.find((v) => v.active)?.version || "None"}
        </div>
      </div>
      <div className="pt-4">
        <Button variant="destructive" onClick={onUninstallTool} disabled={isLoading}>
          Uninstall Tool (Remove All Versions)
        </Button>
      </div>
    </div>
  );
}

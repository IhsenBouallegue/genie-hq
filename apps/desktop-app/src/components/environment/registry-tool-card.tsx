"use client";

import type { RegistryTool } from "@/lib/mise-api";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import { Selectable } from "@geniehq/ui/setup-configurator/selectable-card";
import { Download, Loader2, Package, Settings } from "lucide-react";
import { useState } from "react";
import { RegistryToolVersionDialog } from "./registry-tool-version-dialog";

interface RegistryToolCardProps {
  tool: RegistryTool;
}

export function RegistryToolCard({ tool }: RegistryToolCardProps) {
  const isLoading = useGenieStore((state) => state.isLoading);
  const installToolFromRegistry = useGenieStore((state) => state.installToolFromRegistry);
  const [showVersionDialog, setShowVersionDialog] = useState(false);

  return (
    <Selectable
      id={tool.name}
      isSelected={false}
      enableHover={true}
      enableBorder={true}
      className="h-auto min-h-[140px] flex flex-col"
    >
      <div className="flex flex-col gap-3 w-full h-full">
        {/* Header Section */}
        <div className="flex items-start gap-2 w-full">
          <Package className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate" title={tool.name}>
              {tool.name}
            </h3>
          </div>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {tool.backend.split(":")[0]}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Registry
          </Badge>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col gap-2 mt-auto">
          <Button
            size="sm"
            variant="default"
            onClick={(e) => {
              e.stopPropagation();
              installToolFromRegistry(tool.name);
            }}
            disabled={isLoading}
            className="w-full h-8 text-xs"
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <Download className="w-3 h-3 mr-1" />
            )}
            Install Latest
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setShowVersionDialog(true);
            }}
            disabled={isLoading}
            className="w-full h-8 text-xs"
          >
            <Settings className="w-3 h-3 mr-1" />
            Choose Version
          </Button>
        </div>
      </div>

      <RegistryToolVersionDialog
        open={showVersionDialog}
        onOpenChange={setShowVersionDialog}
        tool={tool}
      />
    </Selectable>
  );
}
